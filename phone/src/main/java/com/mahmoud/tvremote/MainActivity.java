package com.mahmoud.tvremote;

import android.app.Activity;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.net.Uri;
import org.json.JSONObject;
import android.content.SharedPreferences;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.view.Gravity;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

/** Phone remote for the TV Launcher: finds the box on the Wi-Fi by itself and opens its control page. */
public class MainActivity extends Activity {
    static final int PORT = 8765;
    String boxBase = null;
    WebView web; TextView msg; SharedPreferences prefs; String pendingShare;
    static final int REQ_VOICE = 7, REQ_FILE = 8; ValueCallback<Uri[]> fileCb;

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);
        prefs = getSharedPreferences("r", MODE_PRIVATE);
        pendingShare = sharedText(getIntent());
        msg = new TextView(this); msg.setTextSize(20); msg.setGravity(Gravity.CENTER); msg.setPadding(40, 40, 40, 40);
        msg.setBackgroundColor(0xFF0B0E1A); msg.setTextColor(0xFFFFFFFF);
        msg.setText("بيدوّر على البوكس في الواي فاي…");
        setContentView(msg);
        // open the last box straight away; only search the network if it doesn't answer
        String last = prefs.getString("host", null);
        if (last != null) open(last); else scan();
    }

    interface Cb { void done(boolean ok); }

    void check(String host, Cb cb) {
        new Thread(() -> { boolean ok = alive(host); runOnUiThread(() -> cb.done(ok)); }).start();
    }

    static boolean alive(String host) {
        try { HttpURLConnection c = (HttpURLConnection) new URL("http://" + host + ":" + PORT + "/").openConnection();
            c.setConnectTimeout(700); c.setReadTimeout(1500); int r = c.getResponseCode(); c.disconnect(); return r == 200; }
        catch (Exception e) { return false; }
    }

    void scan() {
        String base = localBase();
        if (base == null) { askAddress("مش لاقي الواي فاي. اكتب عنوان البوكس اللي ظاهر على التليفزيون في «التحكم من الموبايل» (زي 192.168.1.5):"); return; }
        ExecutorService ex = Executors.newFixedThreadPool(32); AtomicBoolean found = new AtomicBoolean(false);
        for (int i = 1; i < 255; i++) { final String h = base + i;
            ex.execute(() -> { if (found.get()) return; if (alive(h) && found.compareAndSet(false, true)) runOnUiThread(() -> { prefs.edit().putString("host", h).apply(); open(h); }); }); }
        ex.shutdown();
        new Thread(() -> { try { ex.awaitTermination(30, java.util.concurrent.TimeUnit.SECONDS); } catch (InterruptedException ignored) {}
            if (!found.get()) runOnUiThread(() -> askAddress("ملقتش البوكس لوحدي. اكتب العنوان اللي ظاهر على التليفزيون في الإعدادات ← «التحكم من الموبايل» (زي 192.168.1.5):")); }).start();
    }

    /** First private IPv4 of the phone (works on all Android versions, no location permission). */
    static String localBase() {
        try { for (java.net.NetworkInterface ni : java.util.Collections.list(java.net.NetworkInterface.getNetworkInterfaces())) {
            if (!ni.isUp() || ni.isLoopback()) continue; String n = ni.getName();
            for (java.net.InetAddress a : java.util.Collections.list(ni.getInetAddresses())) {
                if (!(a instanceof java.net.Inet4Address)) continue; String h = a.getHostAddress();
                if (h.startsWith("192.168.") || h.startsWith("10.") || h.matches("172\\.(1[6-9]|2\\d|3[01])\\..*")) {
                    if (n.startsWith("rmnet") || n.startsWith("ccmni")) continue;
                    return h.substring(0, h.lastIndexOf('.') + 1); } } } } catch (Exception ignored) {}
        return null;
    }

    void askAddress(String text) {
        android.widget.LinearLayout l = new android.widget.LinearLayout(this); l.setOrientation(android.widget.LinearLayout.VERTICAL); l.setPadding(50, 120, 50, 50); l.setBackgroundColor(0xFF0B0E1A);
        TextView t = new TextView(this); t.setText(text); t.setTextColor(0xFFFFFFFF); t.setTextSize(18);
        final android.widget.EditText e = new android.widget.EditText(this); e.setHint("192.168.1.5"); e.setTextColor(0xFFFFFFFF); e.setHintTextColor(0xFF777777);
        e.setInputType(android.text.InputType.TYPE_CLASS_PHONE); String last = prefs.getString("host", null); if (last != null) e.setText(last);
        android.widget.Button go = new android.widget.Button(this); go.setText("اتصل");
        android.widget.Button again = new android.widget.Button(this); again.setText("دوّر تاني");
        go.setOnClickListener(v -> { String h = e.getText().toString().trim().replaceAll("^https?://", "").replaceAll("[:/].*$", ""); if (h.isEmpty()) return;
            msg.setText("بيتصل…"); setContentView(msg); check(h, ok -> { if (ok) { prefs.edit().putString("host", h).apply(); open(h); } else askAddress("العنوان ده مش بيرد. اتأكد منه ومن إن الموبايل على نفس الواي فاي:"); }); });
        again.setOnClickListener(v -> { msg.setText("بيدوّر على البوكس في الواي فاي…"); setContentView(msg); scan(); });
        l.addView(t); l.addView(e); l.addView(go); l.addView(again); setContentView(l);
    }

    void open(final String host) {
        web = new WebView(this);
        WebSettings s = web.getSettings(); s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true);
        // the remote screen ships inside this app (independent of the TV's version); it talks to the box over the Wi-Fi
        s.setAllowFileAccess(true); s.setAllowFileAccessFromFileURLs(true); s.setAllowUniversalAccessFromFileURLs(true);
        boxBase = "http://" + host + ":" + PORT;
        web.setWebViewClient(new WebViewClient() {
            @Override public void onReceivedError(WebView v, int code, String desc, String url) {
                if (url != null && url.startsWith("http://" + host)) runOnUiThread(() -> { msg.setText("بيدوّر على البوكس في الواي فاي…"); setContentView(msg); web = null; scan(); });
            }
        });
        web.addJavascriptInterface(new Bridge(), "PhoneApp");
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (fileCb != null) fileCb.onReceiveValue(null); fileCb = cb;
                String type = "*/*"; String[] acc = p.getAcceptTypes();
                if (acc != null) { boolean img = acc.length > 0; for (String a : acc) if (a == null || !a.startsWith("image/")) img = false; if (img) type = "image/*"; }
                Intent i = new Intent(Intent.ACTION_GET_CONTENT).addCategory(Intent.CATEGORY_OPENABLE).setType(type);
                if (p.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE) i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                try { startActivityForResult(Intent.createChooser(i, "image/*".equals(type) ? "اختار صورة" : "اختار ملف"), REQ_FILE); } catch (Exception e) { fileCb = null; return false; }
                return true;
            }
        });
        // downloads from the box (file browser) go to the phone's Downloads through Android's download manager
        web.setDownloadListener((url, ua, cd, mime, len) -> { String n = android.webkit.URLUtil.guessFileName(url, cd, mime); download(url, n); });
        web.loadUrl("file:///android_asset/remote.html");
        checkSelfUpdate();
        setContentView(web);
    }

    class Bridge {
        @JavascriptInterface public void voice() { runOnUiThread(() -> {
            try { Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                    .putExtra(RecognizerIntent.EXTRA_LANGUAGE, "ar-EG").putExtra(RecognizerIntent.EXTRA_PROMPT, "قول اللي بتدوّر عليه");
                startActivityForResult(i, REQ_VOICE); } catch (Exception e) { js("alert('مفيش خدمة صوت على الموبايل')"); } }); }
        @JavascriptInterface public String base() { return boxBase == null ? "" : boxBase; }
        @JavascriptInterface public void rescan() { runOnUiThread(() -> { msg.setText("بيدوّر على البوكس في الواي فاي…"); setContentView(msg); web = null; scan(); }); }
        // ---- full backup kept on the phone: settings (JSON) + the APKs of the box's apps
        @JavascriptInterface public void saveBackup(String json) { try { writeFile(new java.io.File(getFilesDir(), "backup.json"), json.getBytes("UTF-8")); prefs.edit().putLong("bkAt", System.currentTimeMillis()).apply(); } catch (Exception ignored) {} }
        @JavascriptInterface public String loadBackup() { try { return new String(readAll(new java.io.FileInputStream(new java.io.File(getFilesDir(), "backup.json"))), "UTF-8"); } catch (Exception e) { return ""; } }
        @JavascriptInterface public long backupAt() { return prefs.getLong("bkAt", 0); }
        /** {pkg: versionCode} of the APKs already saved on the phone */
        @JavascriptInterface public String savedApks() { JSONObject o = new JSONObject(); java.io.File[] fs = apkDir().listFiles();
            if (fs != null) for (java.io.File f : fs) { String n = f.getName(); if (!n.endsWith(".apk")) continue; try { o.put(n.substring(0, n.length() - 4), prefs.getInt("v_" + n, 0)); } catch (Exception ignored) {} } return o.toString(); }
        @JavascriptInterface public void pullApk(String url, String pkg, int ver) { new Thread(() -> { boolean ok = false;
            java.io.File tmp = new java.io.File(apkDir(), pkg + ".part"), f = new java.io.File(apkDir(), pkg + ".apk");
            try { HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection(); c.setConnectTimeout(5000); c.setReadTimeout(60000);
                if (c.getResponseCode() == 200) { try (java.io.InputStream in = c.getInputStream(); java.io.OutputStream out = new java.io.FileOutputStream(tmp)) { byte[] b = new byte[65536]; int n; while ((n = in.read(b)) > 0) out.write(b, 0, n); }
                    ok = tmp.length() > 0 && tmp.renameTo(f); if (ok) prefs.edit().putInt("v_" + pkg + ".apk", ver).apply(); } } catch (Exception ignored) {}
            if (!ok) tmp.delete(); final boolean r = ok; runOnUiThread(() -> js("window.onApkSaved&&onApkSaved(" + JSONObject.quote(pkg) + "," + r + ")")); }).start(); }
        @JavascriptInterface public void pushApk(String url, String pkg) { new Thread(() -> { int code = 0;
            java.io.File f = new java.io.File(apkDir(), pkg + ".apk");
            try { HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection(); c.setDoOutput(true); c.setRequestMethod("POST"); c.setFixedLengthStreamingMode(f.length());
                c.setConnectTimeout(5000); c.setReadTimeout(120000);
                try (java.io.InputStream in = new java.io.FileInputStream(f); java.io.OutputStream out = c.getOutputStream()) { byte[] b = new byte[65536]; int n; while ((n = in.read(b)) > 0) out.write(b, 0, n); }
                code = c.getResponseCode(); } catch (Exception ignored) {}
            final int r = code; runOnUiThread(() -> js("window.onApkPushed&&onApkPushed(" + JSONObject.quote(pkg) + "," + r + ")")); }).start(); }
        @JavascriptInterface public void download(String url, String name) { MainActivity.this.download(url, name); }
        @JavascriptInterface public void updateSelf() { runOnUiThread(MainActivity.this::updateSelf); }
        @JavascriptInterface public String pending() { String s = pendingShare; pendingShare = null; return s == null ? "" : s; }
    }

    void js(String code) { runOnUiThread(() -> { if (web != null) web.evaluateJavascript(code, null); }); }

    @Override protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (req == REQ_FILE) {
            Uri[] out = null;
            if (res == RESULT_OK && data != null) {
                if (data.getClipData() != null) { int n = data.getClipData().getItemCount(); out = new Uri[n]; for (int k = 0; k < n; k++) out[k] = data.getClipData().getItemAt(k).getUri(); }
                else if (data.getData() != null) out = new Uri[]{ data.getData() };
            }
            if (fileCb != null) fileCb.onReceiveValue(out); fileCb = null; return;
        }
        if (req == REQ_VOICE && res == RESULT_OK && data != null) {
            java.util.ArrayList<String> r = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            if (r != null && !r.isEmpty()) js("window.onPhoneVoice&&onPhoneVoice(" + JSONObject.quote(r.get(0)) + ")");
        }
    }

    static String sharedText(Intent i) {
        if (i == null || !Intent.ACTION_SEND.equals(i.getAction())) return null;
        String t = i.getStringExtra(Intent.EXTRA_TEXT); if (t == null) return null;
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("https?://\\S+").matcher(t);
        return m.find() ? m.group() : t.trim();
    }

    @Override protected void onNewIntent(Intent i) { super.onNewIntent(i); String s = sharedText(i);
        if (s != null) { if (web != null) js("window.onPhoneShare&&onPhoneShare(" + JSONObject.quote(s) + ")"); else pendingShare = s; } }

    // the phone's volume buttons change the TV volume while the app is open
    @Override public boolean dispatchKeyEvent(KeyEvent e) {
        int c = e.getKeyCode();
        if (web != null && (c == KeyEvent.KEYCODE_VOLUME_UP || c == KeyEvent.KEYCODE_VOLUME_DOWN)) {
            if (e.getAction() == KeyEvent.ACTION_DOWN) js("window.onPhoneVolume&&onPhoneVolume('" + (c == KeyEvent.KEYCODE_VOLUME_UP ? "up" : "down") + "')");
            return true;
        }
        return super.dispatchKeyEvent(e);
    }


    java.io.File apkDir() { java.io.File d = new java.io.File(getFilesDir(), "apks"); d.mkdirs(); return d; }
    static void writeFile(java.io.File f, byte[] b) throws Exception { try (java.io.OutputStream o = new java.io.FileOutputStream(f)) { o.write(b); } }
    static byte[] readAll(java.io.InputStream in) throws Exception { try (java.io.InputStream i = in) { java.io.ByteArrayOutputStream bo = new java.io.ByteArrayOutputStream(); byte[] b = new byte[65536]; int n; while ((n = i.read(b)) > 0) bo.write(b, 0, n); return bo.toByteArray(); } }

    void download(String url, String name) {
        try { android.app.DownloadManager dm = (android.app.DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            android.app.DownloadManager.Request r = new android.app.DownloadManager.Request(Uri.parse(url)).setTitle(name)
                .setNotificationVisibility(android.app.DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                .setDestinationInExternalPublicDir(android.os.Environment.DIRECTORY_DOWNLOADS, name);
            dm.enqueue(r); js("window.toast&&toast('⬇️ بينزل في Downloads')");
        } catch (Exception e) { js("window.toast&&toast('مقدرتش أنزّله')"); }
    }

    // ---- the app updates itself: the GitHub "phone" release says which version of the remote it holds
    static final String REL = "https://api.github.com/repos/Mahmoud-Elgamal2026/TVLauncher/releases/tags/phone";
    static final String APK = "https://github.com/Mahmoud-Elgamal2026/TVLauncher/releases/download/phone/PhoneRemote.apk";
    String mySrc() { try { return new String(readAll(getAssets().open("src.txt")), "UTF-8").trim(); } catch (Exception e) { return ""; } }
    void checkSelfUpdate() {
        if (System.currentTimeMillis() - prefs.getLong("updChk", 0) < 6 * 3600000L) { if (prefs.getBoolean("updAvail", false)) js("window.onPhoneUpdate&&onPhoneUpdate()"); return; }
        new Thread(() -> { try { HttpURLConnection c = (HttpURLConnection) new URL(REL).openConnection(); c.setConnectTimeout(8000); c.setReadTimeout(15000);
            String body = new JSONObject(new String(readAll(c.getInputStream()), "UTF-8")).optString("body", "");
            java.util.regex.Matcher m = java.util.regex.Pattern.compile("src:([0-9a-f]{8,})").matcher(body); String mine = mySrc();
            boolean avail = m.find() && !mine.isEmpty() && !m.group(1).equals(mine);
            prefs.edit().putLong("updChk", System.currentTimeMillis()).putBoolean("updAvail", avail).apply();
            if (avail) runOnUiThread(() -> js("window.onPhoneUpdate&&onPhoneUpdate()")); } catch (Exception ignored) {} }).start();
    }
    void updateSelf() {
        try { android.app.DownloadManager dm = (android.app.DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            java.io.File old = new java.io.File(getExternalFilesDir(null), "PhoneRemote.apk"); old.delete();
            final long id = dm.enqueue(new android.app.DownloadManager.Request(Uri.parse(APK)).setTitle("Phone Remote")
                .setDestinationInExternalFilesDir(this, null, "PhoneRemote.apk"));
            android.content.BroadcastReceiver rc = new android.content.BroadcastReceiver() { @Override public void onReceive(android.content.Context c, Intent i) {
                if (i.getLongExtra(android.app.DownloadManager.EXTRA_DOWNLOAD_ID, -1) != id) return; try { unregisterReceiver(this); } catch (Exception ignored) {}
                Uri u = dm.getUriForDownloadedFile(id); if (u == null) { js("toast('التحميل ماكملش، جرّب تاني')"); return; }
                prefs.edit().putBoolean("updAvail", false).putLong("updChk", 0).apply();
                Intent in = new Intent(Intent.ACTION_VIEW).setDataAndType(u, "application/vnd.android.package-archive").addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                try { startActivity(in); } catch (Exception e) { js("toast('افتح الملف من الإشعارات')"); } } };
            android.content.IntentFilter flt = new android.content.IntentFilter(android.app.DownloadManager.ACTION_DOWNLOAD_COMPLETE);
            if (android.os.Build.VERSION.SDK_INT >= 33) registerReceiver(rc, flt, android.content.Context.RECEIVER_EXPORTED); else registerReceiver(rc, flt);
            js("toast('⬇️ بينزّل النسخة الجديدة…')");
        } catch (Exception e) { js("toast('مقدرتش أنزّل التحديث')"); }
    }

    @Override public void onBackPressed() { if (web != null && web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}
