package com.mahmoud.tvlauncher;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Environment;
import android.os.IBinder;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/** Records live channels (raw TS/HTTP streams and HLS playlists) to files, now or at a scheduled time. */
public class RecService extends Service {
    static final Map<String, Job> jobs = new ConcurrentHashMap<>();
    static final String CH = "rec";

    static class Job {
        String id, name, url, file; long end, bytes; volatile boolean stop; String error;
    }

    static File dir(Context c) {
        String pref = c.getSharedPreferences("launcher", 0).getString("recDir", "");
        if (!pref.isEmpty()) { File d = new File(pref); if (d.isDirectory() || d.mkdirs()) return d; }
        File pub = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES), "TVLauncher");
        if ((pub.isDirectory() || pub.mkdirs()) && pub.canWrite()) return pub;
        File app = c.getExternalFilesDir(Environment.DIRECTORY_MOVIES);
        if (app != null) { app.mkdirs(); return app; }
        return new File(c.getFilesDir(), "rec");
    }

    /** Folders recordings can go to: shared Movies folder and each storage volume's app folder (USB drives included). */
    static JSONArray dirs(Context c) {
        JSONArray a = new JSONArray();
        try {
            a.put(new JSONObject().put("path", new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES), "TVLauncher").getPath()).put("label", "Movies"));
            File[] vols = c.getExternalFilesDirs(Environment.DIRECTORY_MOVIES);
            for (int i = 0; i < vols.length; i++) if (vols[i] != null)
                a.put(new JSONObject().put("path", vols[i].getPath()).put("label", i == 0 ? "Internal" : "USB " + i));
        } catch (Exception ignored) {}
        return a;
    }

    static String start(Context c, String url, String name, long minutes) {
        Intent i = new Intent(c, RecService.class).putExtra("url", url).putExtra("name", name).putExtra("min", minutes);
        if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(i); else c.startService(i);
        return "ok";
    }

    static void schedule(Context c, String url, String name, long startMs, long endMs) {
        AlarmManager am = (AlarmManager) c.getSystemService(ALARM_SERVICE);
        Intent i = new Intent(c, Alarm.class).putExtra("url", url).putExtra("name", name).putExtra("min", Math.max(1, (endMs - startMs) / 60000 + 2));
        int code = (int) (startMs / 1000 % Integer.MAX_VALUE);
        int fl = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0);
        PendingIntent pi = PendingIntent.getBroadcast(c, code, i, fl);
        long at = Math.max(System.currentTimeMillis() + 2000, startMs - 60000);
        if (Build.VERSION.SDK_INT >= 31 && !am.canScheduleExactAlarms()) am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
        else am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
        // keep a list so the launcher can show upcoming recordings
        try {
            android.content.SharedPreferences p = c.getSharedPreferences("launcher", 0);
            JSONArray a = new JSONArray(p.getString("recSched", "[]")), keep = new JSONArray();
            for (int k = 0; k < a.length(); k++) if (a.getJSONObject(k).optLong("end") > System.currentTimeMillis()) keep.put(a.get(k));
            keep.put(new JSONObject().put("name", name).put("start", startMs).put("end", endMs).put("url", url));
            p.edit().putString("recSched", keep.toString()).apply();
        } catch (Exception ignored) {}
    }

    public static class Alarm extends BroadcastReceiver {
        @Override public void onReceive(Context c, Intent i) {
            start(c, i.getStringExtra("url"), i.getStringExtra("name"), i.getLongExtra("min", 60));
        }
    }

    static JSONArray state() {
        JSONArray a = new JSONArray();
        for (Job j : jobs.values()) try {
            a.put(new JSONObject().put("id", j.id).put("name", j.name).put("file", j.file).put("end", j.end).put("bytes", j.bytes).put("error", j.error == null ? "" : j.error));
        } catch (Exception ignored) {}
        return a;
    }

    @Override public IBinder onBind(Intent i) { return null; }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        foreground();
        if (intent == null) { if (jobs.isEmpty()) stopSelf(); return START_NOT_STICKY; }
        if ("stop".equals(intent.getAction())) {
            Job j = jobs.get(String.valueOf(intent.getStringExtra("id"))); if (j != null) j.stop = true;
            return START_NOT_STICKY;
        }
        final Job j = new Job();
        j.url = intent.getStringExtra("url"); j.name = String.valueOf(intent.getStringExtra("name"));
        j.end = System.currentTimeMillis() + intent.getLongExtra("min", 60) * 60000;
        j.id = "r" + System.currentTimeMillis();
        String stamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm", Locale.US).format(new Date());
        File f = new File(dir(this), safe(j.name) + "_" + stamp + ".ts");
        j.file = f.getPath();
        jobs.put(j.id, j);
        new Thread(() -> { run(j, f); jobs.remove(j.id); if (jobs.isEmpty()) stopSelf(); else foreground(); }, "rec").start();
        foreground();
        return START_NOT_STICKY;
    }

    private void foreground() {
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CH) == null)
            nm.createNotificationChannel(new NotificationChannel(CH, "Recording", NotificationManager.IMPORTANCE_LOW));
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(this, CH) : new Notification.Builder(this);
        StringBuilder names = new StringBuilder();
        for (Job j : jobs.values()) names.append(names.length() > 0 ? ", " : "").append(j.name);
        b.setSmallIcon(android.R.drawable.ic_media_play).setContentTitle("⏺ " + (names.length() > 0 ? names : "Recording")).setOngoing(true);
        try {
            if (Build.VERSION.SDK_INT >= 29) startForeground(42, b.build(), android.content.pm.ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC);
            else startForeground(42, b.build());
        } catch (Throwable ignored) {}
    }

    private static String safe(String s) { return s.replaceAll("[\\\\/:*?\"<>|]", "_").trim(); }

    private void run(Job j, File f) {
        try (OutputStream out = new FileOutputStream(f, true)) {
            boolean hls = j.url.toLowerCase(Locale.US).contains(".m3u8");
            if (!hls) {
                // probe: some "live" URLs are HLS without the extension
                HttpURLConnection c = open(j.url);
                String type = String.valueOf(c.getContentType()).toLowerCase(Locale.US);
                if (type.contains("mpegurl")) { c.disconnect(); hls = true; }
                else { raw(j, c, out); return; }
            }
            hls(j, out);
        } catch (Throwable t) { j.error = String.valueOf(t.getMessage()); }
    }

    private void raw(Job j, HttpURLConnection c, OutputStream out) throws Exception {
        int retries = 0;
        while (!j.stop && System.currentTimeMillis() < j.end && retries < 30) {
            try (InputStream in = c.getInputStream()) {
                byte[] buf = new byte[128 * 1024]; int n;
                while (!j.stop && System.currentTimeMillis() < j.end && (n = in.read(buf)) > 0) { out.write(buf, 0, n); j.bytes += n; }
            } catch (Throwable t) { retries++; Thread.sleep(2000); }
            if (j.stop || System.currentTimeMillis() >= j.end) break;
            c = open(j.url);
        }
    }

    private void hls(Job j, OutputStream out) throws Exception {
        HashSet<String> seen = new HashSet<>();
        String playlist = j.url; int fails = 0;
        while (!j.stop && System.currentTimeMillis() < j.end && fails < 30) {
            try {
                String body = read(playlist);
                // master playlist → pick the highest bandwidth variant
                if (body.contains("#EXT-X-STREAM-INF")) {
                    String best = null; long bw = -1; String[] ls = body.split("\n");
                    for (int i = 0; i < ls.length; i++) if (ls[i].startsWith("#EXT-X-STREAM-INF")) {
                        long b = 0; java.util.regex.Matcher m = java.util.regex.Pattern.compile("BANDWIDTH=(\\d+)").matcher(ls[i]);
                        if (m.find()) b = Long.parseLong(m.group(1));
                        for (int k = i + 1; k < ls.length; k++) { String u = ls[k].trim(); if (!u.isEmpty() && !u.startsWith("#")) { if (b > bw) { bw = b; best = u; } break; } }
                    }
                    if (best != null) { playlist = new URL(new URL(playlist), best).toString(); continue; }
                }
                List<String> segs = new ArrayList<>(); double target = 4;
                for (String l : body.split("\n")) {
                    l = l.trim();
                    if (l.startsWith("#EXT-X-TARGETDURATION:")) try { target = Double.parseDouble(l.substring(22)); } catch (Exception ignored) {}
                    if (!l.isEmpty() && !l.startsWith("#")) segs.add(new URL(new URL(playlist), l).toString());
                }
                for (String s : segs) {
                    if (j.stop || System.currentTimeMillis() >= j.end) break;
                    if (!seen.add(s)) continue;
                    HttpURLConnection c = open(s);
                    try (InputStream in = c.getInputStream()) { byte[] buf = new byte[128 * 1024]; int n; while ((n = in.read(buf)) > 0) { out.write(buf, 0, n); j.bytes += n; } }
                }
                if (body.contains("#EXT-X-ENDLIST")) break;
                fails = 0;
                Thread.sleep((long) Math.max(1000, target * 500));
            } catch (InterruptedException e) { break; }
            catch (Throwable t) { fails++; Thread.sleep(2000); }
        }
    }

    private static HttpURLConnection open(String u) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(u).openConnection();
        c.setConnectTimeout(15000); c.setReadTimeout(30000); c.setInstanceFollowRedirects(true);
        c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android TV) TVLauncher");
        return c;
    }

    private static String read(String u) throws Exception {
        HttpURLConnection c = open(u);
        try (InputStream in = c.getInputStream()) {
            java.io.ByteArrayOutputStream b = new java.io.ByteArrayOutputStream(); byte[] buf = new byte[16384]; int n;
            while ((n = in.read(buf)) > 0) b.write(buf, 0, n);
            return b.toString("UTF-8");
        }
    }
}
