package com.mahmoud.tvlauncher;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import jcifs.CIFSContext;
import jcifs.smb.SmbFile;
import jcifs.smb.SmbRandomAccessFile;

/**
 * Loopback-only HTTP server that streams local files (USB, recordings) and SMB files to the
 * player (the WebView video tag or an external player like VLC), with Range support for seeking.
 */
class MediaServer {
    static final int PORT = 8766;
    private static MediaServer inst;
    private volatile boolean running;
    private final ExecutorService pool = Executors.newFixedThreadPool(6);

    static synchronized MediaServer get() {
        if (inst == null) { inst = new MediaServer(); inst.start(); }
        return inst;
    }

    static String urlFor(String path) {
        try {
            String kind = path.startsWith("smb://") ? "s" : "f";
            return "http://127.0.0.1:" + PORT + "/" + kind + "?p=" + URLEncoder.encode(path, "UTF-8") + "&n=" + URLEncoder.encode(new File(path).getName(), "UTF-8");
        } catch (Exception e) { return ""; }
    }

    private void start() {
        running = true;
        new Thread(() -> {
            try (ServerSocket ss = new ServerSocket(PORT, 16, InetAddress.getByName("127.0.0.1"))) {
                while (running) { final Socket s = ss.accept(); pool.submit(() -> serve(s)); }
            } catch (Throwable ignored) { running = false; }
        }, "media-server").start();
    }

    private void serve(Socket s) {
        try (Socket sock = s) {
            InputStream in = new BufferedInputStream(sock.getInputStream());
            String req = readLine(in); if (req == null) return;
            String[] parts = req.split(" "); if (parts.length < 2) return;
            long from = 0, to = -1; String line;
            while ((line = readLine(in)) != null && !line.isEmpty()) {
                String l = line.toLowerCase(Locale.US);
                if (l.startsWith("range:") && l.contains("bytes=")) {
                    String r = l.substring(l.indexOf("bytes=") + 6).trim();
                    int d = r.indexOf('-');
                    try { from = Long.parseLong(r.substring(0, d)); } catch (Exception ignored) {}
                    try { if (d + 1 < r.length()) to = Long.parseLong(r.substring(d + 1)); } catch (Exception ignored) {}
                }
            }
            String target = parts[1]; int q = target.indexOf('?');
            String route = q >= 0 ? target.substring(0, q) : target, path = null;
            if (q >= 0) for (String kv : target.substring(q + 1).split("&"))
                if (kv.startsWith("p=")) path = URLDecoder.decode(kv.substring(2), "UTF-8");
            OutputStream out = sock.getOutputStream();
            if (path == null) { head(out, 404, "text/plain", 0, -1, -1, -1); return; }
            boolean headOnly = "HEAD".equals(parts[0]);
            if ("/f".equals(route)) {
                File f = new File(path);
                if (!f.isFile()) { head(out, 404, "text/plain", 0, -1, -1, -1); return; }
                long len = f.length(); if (to < 0 || to >= len) to = len - 1;
                head(out, from > 0 || to < len - 1 ? 206 : 200, mime(path), to - from + 1, from, to, len);
                if (headOnly) return;
                try (RandomAccessFile raf = new RandomAccessFile(f, "r")) { raf.seek(from); copy(raf, null, out, to - from + 1); }
            } else if ("/s".equals(route)) {
                SmbFile f = new SmbFile(path, Smb.ctx(path));
                long len = f.length(); if (to < 0 || to >= len) to = len - 1;
                head(out, from > 0 || to < len - 1 ? 206 : 200, mime(path), to - from + 1, from, to, len);
                if (headOnly) return;
                try (SmbRandomAccessFile raf = new SmbRandomAccessFile(f, "r")) { raf.seek(from); copy(null, raf, out, to - from + 1); }
            } else head(out, 404, "text/plain", 0, -1, -1, -1);
        } catch (Throwable ignored) {}
    }

    private static void copy(RandomAccessFile a, SmbRandomAccessFile b, OutputStream out, long n) throws Exception {
        byte[] buf = new byte[256 * 1024];
        while (n > 0) {
            int r = a != null ? a.read(buf, 0, (int) Math.min(buf.length, n)) : b.read(buf, 0, (int) Math.min(buf.length, n));
            if (r <= 0) break;
            out.write(buf, 0, r); n -= r;
        }
        out.flush();
    }

    private static void head(OutputStream out, int st, String type, long clen, long from, long to, long total) throws Exception {
        StringBuilder h = new StringBuilder("HTTP/1.1 ").append(st).append(st == 206 ? " Partial Content" : st == 200 ? " OK" : " Not Found").append("\r\n");
        h.append("Content-Type: ").append(type).append("\r\nAccept-Ranges: bytes\r\nContent-Length: ").append(clen).append("\r\n");
        if (st == 206) h.append("Content-Range: bytes ").append(from).append('-').append(to).append('/').append(total).append("\r\n");
        h.append("Access-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n");
        out.write(h.toString().getBytes("UTF-8"));
    }

    static String mime(String p) {
        String e = p.toLowerCase(Locale.US);
        if (e.endsWith(".mp4") || e.endsWith(".m4v")) return "video/mp4";
        if (e.endsWith(".mkv")) return "video/x-matroska";
        if (e.endsWith(".webm")) return "video/webm";
        if (e.endsWith(".ts") || e.endsWith(".m2ts")) return "video/mp2t";
        if (e.endsWith(".avi")) return "video/x-msvideo";
        if (e.endsWith(".mov")) return "video/quicktime";
        if (e.endsWith(".mp3")) return "audio/mpeg";
        if (e.endsWith(".m4a") || e.endsWith(".aac")) return "audio/mp4";
        if (e.endsWith(".flac")) return "audio/flac";
        if (e.endsWith(".jpg") || e.endsWith(".jpeg")) return "image/jpeg";
        if (e.endsWith(".png")) return "image/png";
        return "application/octet-stream";
    }

    private static String readLine(InputStream in) throws Exception {
        StringBuilder sb = new StringBuilder(); int c;
        while ((c = in.read()) >= 0) { if (c == '\n') break; if (c != '\r') sb.append((char) c); if (sb.length() > 8192) break; }
        return c < 0 && sb.length() == 0 ? null : sb.toString();
    }

    /** SMB credentials per server, kept in memory and in prefs by MainActivity. */
    static class Smb {
        static final java.util.Map<String, String[]> creds = new java.util.concurrent.ConcurrentHashMap<>();
        private static CIFSContext base;
        static synchronized CIFSContext ctx(String url) throws Exception {
            if (base == null) {
                java.util.Properties p = new java.util.Properties();
                p.setProperty("jcifs.smb.client.minVersion", "SMB1");
                p.setProperty("jcifs.smb.client.maxVersion", "SMB311");
                p.setProperty("jcifs.smb.client.responseTimeout", "15000");
                p.setProperty("jcifs.smb.client.connTimeout", "8000");
                p.setProperty("jcifs.resolveOrder", "DNS,BCAST");
                base = new jcifs.context.BaseContext(new jcifs.config.PropertyConfiguration(p));
            }
            String host = hostOf(url);
            String[] c = creds.get(host);
            if (c == null || c[0] == null || c[0].isEmpty()) return base.withGuestCrendentials();
            return base.withCredentials(new jcifs.smb.NtlmPasswordAuthenticator(c[2] == null ? "" : c[2], c[0], c[1]));
        }
        static String hostOf(String url) {
            String s = url.substring(6); int i = s.indexOf('/'); return (i < 0 ? s : s.substring(0, i)).toLowerCase(Locale.US);
        }
    }
}
