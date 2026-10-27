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

    RemoteServer(AssetManager assets, String code, Handler handler) {
        this.assets = assets; this.code = code; this.handler = handler;
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
