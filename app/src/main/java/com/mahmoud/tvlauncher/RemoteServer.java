package com.mahmoud.tvlauncher;

import android.content.res.AssetManager;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Tiny HTTP server for the phone-control page. Only serves the page itself and one
 * JSON endpoint guarded by a 4-digit pairing code shown on the TV.
 */
class RemoteServer {
    interface Handler { String call(String json); }

    static final int PORT = 8765;
    private final AssetManager assets;
    private final Handler handler;
    private volatile String code;
    private ServerSocket server;
    private ExecutorService pool;
    private volatile boolean running;

    private final java.io.File cacheDir;
    static volatile android.content.Context ctx;

    RemoteServer(AssetManager assets, String code, Handler handler, java.io.File cacheDir) {
        this.assets = assets; this.code = code; this.handler = handler; this.cacheDir = cacheDir;
    }

    void setCode(String c) { code = c; }
    boolean isRunning() { return running; }

    synchronized void start() {
        if (running) return;
        running = true;
        pool = Executors.newFixedThreadPool(4);
        new Thread(() -> {
            try (ServerSocket ss = new ServerSocket(PORT)) {
                server = ss;
                while (running) {
                    final Socket s = ss.accept();
                    pool.submit(() -> serve(s));
                }
            } catch (Throwable ignored) {
            } finally { running = false; }
        }, "remote-server").start();
    }

    synchronized void stop() {
        running = false;
        try { if (server != null) server.close(); } catch (Exception ignored) {}
        if (pool != null) pool.shutdownNow();
    }

    private void serve(Socket s) {
        try (Socket sock = s) {
            sock.setSoTimeout(10000);
            InputStream in = new BufferedInputStream(sock.getInputStream());
            String reqLine = readLine(in);
            if (reqLine == null) return;
            String[] parts = reqLine.split(" ");
            if (parts.length < 2) return;
            String method = parts[0], target = parts[1];
            Map<String, String> headers = new HashMap<>();
            String line;
            while ((line = readLine(in)) != null && !line.isEmpty()) {
                int i = line.indexOf(':');
                if (i > 0) headers.put(line.substring(0, i).trim().toLowerCase(Locale.US), line.substring(i + 1).trim());
            }
            String path = target, query = "";
            int q = target.indexOf('?');
            if (q >= 0) { path = target.substring(0, q); query = target.substring(q + 1); }
            OutputStream out = sock.getOutputStream();

            if ("GET".equals(method) && ("/".equals(path) || "/index.html".equals(path))) {
                byte[] page = readAsset("remote.html");
                send(out, 200, "text/html; charset=utf-8", page);
                return;
            }
            // an APK sent from the phone: saved as the installer file, then the launcher opens the system installer
            if ("POST".equals(method) && "/apk".equals(path)) {
                String k = param(query, "k");
                if (k == null || !k.equals(code)) { send(out, 403, "application/json", "{\"error\":\"code\"}".getBytes("UTF-8")); return; }
                long len = 0;
                try { len = Long.parseLong(headers.getOrDefault("content-length", "0")); } catch (Exception ignored) {}
                if (len <= 0 || len > 400_000_000L) { send(out, 413, "application/json", "{\"error\":\"size\"}".getBytes("UTF-8")); return; }
                sock.setSoTimeout(60000);
                java.io.File dir = new java.io.File(cacheDir, "update"); dir.mkdirs();
                java.io.File f = new java.io.File(dir, "update.apk");
                long got = 0;
                try (OutputStream fo = new java.io.FileOutputStream(f)) {
                    byte[] buf = new byte[65536];
                    while (got < len) { int n = in.read(buf, 0, (int) Math.min(buf.length, len - got)); if (n < 0) break; fo.write(buf, 0, n); got += n; }
                }
                if (got < len) { send(out, 400, "application/json", "{\"error\":\"short\"}".getBytes("UTF-8")); return; }
                String res = handler.call("{\"cmd\":\"apkReady\",\"name\":" + org.json.JSONObject.quote(param(query, "n") == null ? "" : java.net.URLDecoder.decode(param(query, "n"), "UTF-8")) + "}");
                send(out, 200, "application/json; charset=utf-8", (res == null ? "{}" : res).getBytes("UTF-8"));
                return;
            }
            // ---- files on the box, for the phone's file browser; and installed apps' APKs, for the phone's full backup
            if (("GET".equals(method) || "POST".equals(method)) && ("/ls".equals(path) || "/get".equals(path) || "/put".equals(path) || "/pkg".equals(path))) {
                String k = param(query, "k");
                if (k == null || !k.equals(code)) { send(out, 403, "application/json", "{\"error\":\"code\"}".getBytes("UTF-8")); return; }
                if ("/pkg".equals(path)) {
                    String pkg = param(query, "p"); java.io.File f = null;
                    try { f = new java.io.File(ctx.getPackageManager().getApplicationInfo(pkg, 0).sourceDir); } catch (Exception ignored) {}
                    if (f == null || !f.canRead()) { send(out, 404, "application/json", "{}".getBytes("UTF-8")); return; }
                    sendFile(sock, out, f, pkg + ".apk"); return;
                }
                if (!storageOk()) { handler.call("{\"cmd\":\"needStorage\"}"); send(out, 200, "application/json", "{\"error\":\"perm\"}".getBytes("UTF-8")); return; }
                String pp = param(query, "p");
                if ("/ls".equals(path)) {
                    org.json.JSONObject o = new org.json.JSONObject(); org.json.JSONArray arr = new org.json.JSONArray();
                    if (pp == null || pp.isEmpty()) {
                        java.io.File ext = android.os.Environment.getExternalStorageDirectory();
                        arr.put(new org.json.JSONObject().put("n", "📦 ذاكرة البوكس").put("p", ext.getAbsolutePath()).put("d", true));
                        java.io.File[] vols = new java.io.File("/storage").listFiles();
                        if (vols != null) for (java.io.File v : vols) { String n = v.getName(); if (n.equals("emulated") || n.equals("self") || !v.canRead()) continue;
                            arr.put(new org.json.JSONObject().put("n", "💾 " + n).put("p", v.getAbsolutePath()).put("d", true)); }
                        o.put("path", "");
                    } else {
                        java.io.File d = safe(pp); if (d == null || !d.isDirectory()) { send(out, 404, "application/json", "{\"error\":\"path\"}".getBytes("UTF-8")); return; }
                        java.io.File[] fs = d.listFiles(); if (fs != null) { java.util.Arrays.sort(fs, (a, b) -> a.isDirectory() != b.isDirectory() ? (a.isDirectory() ? -1 : 1) : a.getName().compareToIgnoreCase(b.getName()));
                            for (java.io.File f : fs) { if (f.getName().startsWith(".")) continue;
                                arr.put(new org.json.JSONObject().put("n", f.getName()).put("p", f.getAbsolutePath()).put("d", f.isDirectory()).put("s", f.length()).put("t", f.lastModified())); } }
                        o.put("path", d.getAbsolutePath());
                    }
                    o.put("items", arr); send(out, 200, "application/json; charset=utf-8", o.toString().getBytes("UTF-8")); return;
                }
                if ("/get".equals(path)) { java.io.File f = safe(pp); if (f == null || !f.isFile()) { send(out, 404, "text/plain", "no".getBytes("UTF-8")); return; } sendFile(sock, out, f, f.getName()); return; }
                // /put: upload from the phone into a folder on the box
                java.io.File d = safe(pp); String n = param(query, "n");
                if (d == null || !d.isDirectory() || n == null || n.isEmpty() || n.contains("/") || n.startsWith(".")) { send(out, 400, "application/json", "{\"error\":\"path\"}".getBytes("UTF-8")); return; }
                long len = 0; try { len = Long.parseLong(headers.getOrDefault("content-length", "0")); } catch (Exception ignored) {}
                if (len < 0 || len > 4_000_000_000L) { send(out, 413, "application/json", "{}".getBytes("UTF-8")); return; }
                sock.setSoTimeout(60000);
                java.io.File f = new java.io.File(d, n); long got = 0;
                try (OutputStream fo = new java.io.FileOutputStream(f)) { byte[] buf = new byte[65536];
                    while (got < len) { int r = in.read(buf, 0, (int) Math.min(buf.length, len - got)); if (r < 0) break; fo.write(buf, 0, r); got += r; } }
                if (got < len) { f.delete(); send(out, 400, "application/json", "{\"error\":\"short\"}".getBytes("UTF-8")); return; }
                send(out, 200, "application/json", "{\"ok\":1}".getBytes("UTF-8")); return;
            }
            if ("POST".equals(method) && "/api".equals(path)) {
                String k = param(query, "k");
                if (k == null || !k.equals(code)) { send(out, 403, "application/json", "{\"error\":\"code\"}".getBytes("UTF-8")); return; }
                int len = 0;
                try { len = Integer.parseInt(headers.getOrDefault("content-length", "0")); } catch (Exception ignored) {}
                if (len > 2_000_000) { send(out, 413, "application/json", "{}".getBytes("UTF-8")); return; }
                byte[] body = new byte[len];
                int r = 0;
                while (r < len) { int n = in.read(body, r, len - r); if (n < 0) break; r += n; }
                String res = handler.call(new String(body, 0, r, "UTF-8"));
                send(out, 200, "application/json; charset=utf-8", (res == null ? "{}" : res).getBytes("UTF-8"));
                return;
            }
            send(out, 404, "text/plain", "Not found".getBytes("UTF-8"));
        } catch (Throwable ignored) {}
    }


    private static boolean storageOk() {
        return android.os.Build.VERSION.SDK_INT < 23 || ctx == null
            || ctx.checkSelfPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE) == android.content.pm.PackageManager.PERMISSION_GRANTED;
    }

    /** Only paths under /storage (internal shared storage and USB drives / SD cards). */
    private static java.io.File safe(String p) {
        if (p == null || p.isEmpty()) return null;
        try { java.io.File f = new java.io.File(p).getCanonicalFile(); String c = f.getPath();
            String ext = android.os.Environment.getExternalStorageDirectory().getCanonicalPath();
            return (c.startsWith("/storage/") || c.equals(ext) || c.startsWith(ext + "/")) ? f : null; } catch (Exception e) { return null; }
    }

    private static void sendFile(Socket sock, OutputStream out, java.io.File f, String name) throws Exception {
        sock.setSoTimeout(60000);
        String safeName = name.replaceAll("[\\r\\n\"]", "_");
        String head = "HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: " + f.length()
            + "\r\nContent-Disposition: attachment; filename=\"" + safeName + "\"\r\nCache-Control: no-store\r\nConnection: close\r\n\r\n";
        out.write(head.getBytes("UTF-8"));
        try (InputStream fi = new java.io.FileInputStream(f)) { byte[] buf = new byte[65536]; int n; while ((n = fi.read(buf)) > 0) out.write(buf, 0, n); }
        out.flush();
    }

    private byte[] readAsset(String name) throws Exception {
        try (InputStream a = assets.open(name)) {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] buf = new byte[8192]; int n;
            while ((n = a.read(buf)) > 0) bos.write(buf, 0, n);
            return bos.toByteArray();
        }
    }

    private static void send(OutputStream out, int status, String type, byte[] body) throws Exception {
        String reason = status == 200 ? "OK" : status == 403 ? "Forbidden" : status == 404 ? "Not Found" : "Error";
        String head = "HTTP/1.1 " + status + " " + reason + "\r\nContent-Type: " + type + "\r\nContent-Length: " + body.length
            + "\r\nCache-Control: no-store\r\nConnection: close\r\n\r\n";
        out.write(head.getBytes("UTF-8"));
        out.write(body);
        out.flush();
    }

    private static String readLine(InputStream in) throws Exception {
        StringBuilder sb = new StringBuilder();
        int c;
        while ((c = in.read()) >= 0) {
            if (c == '\n') break;
            if (c != '\r') sb.append((char) c);
            if (sb.length() > 8192) break;
        }
        return c < 0 && sb.length() == 0 ? null : sb.toString();
    }

    private static String param(String query, String key) {
        for (String kv : query.split("&")) {
            int i = kv.indexOf('=');
            if (i > 0 && kv.substring(0, i).equals(key)) {
                try { return URLDecoder.decode(kv.substring(i + 1), "UTF-8"); } catch (Exception e) { return null; }
            }
        }
        return null;
    }

    static String localIp() {
        try {
            for (NetworkInterface ni : Collections.list(NetworkInterface.getNetworkInterfaces())) {
                if (!ni.isUp() || ni.isLoopback()) continue;
                for (InetAddress a : Collections.list(ni.getInetAddresses())) {
                    if (a instanceof java.net.Inet4Address && !a.isLoopbackAddress() && a.isSiteLocalAddress()) return a.getHostAddress();
                }
            }
        } catch (Exception ignored) {}
        return "";
    }
}
