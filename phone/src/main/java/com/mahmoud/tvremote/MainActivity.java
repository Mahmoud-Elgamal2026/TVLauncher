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
        String last = prefs.getString("host", null);
        if (last != null) check(last, ok -> { if (ok) open(last); else scan(); }); else scan();
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

    void open(String host) {
        web = new WebView(this);
        WebSettings s = web.getSettings(); s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true);
        web.setWebViewClient(new WebViewClient());
        web.addJavascriptInterface(new Bridge(), "PhoneApp");
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (fileCb != null) fileCb.onReceiveValue(null); fileCb = cb;
                Intent i = new Intent(Intent.ACTION_GET_CONTENT).addCategory(Intent.CATEGORY_OPENABLE).setType("image/*");
                if (p.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE) i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                try { startActivityForResult(Intent.createChooser(i, "اختار صورة"), REQ_FILE); } catch (Exception e) { fileCb = null; return false; }
                return true;
            }
        });
        web.loadUrl("http://" + host + ":" + PORT + "/");
        setContentView(web);
    }

    class Bridge {
        @JavascriptInterface public void voice() { runOnUiThread(() -> {
            try { Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
                    .putExtra(RecognizerIntent.EXTRA_LANGUAGE, "ar-EG").putExtra(RecognizerIntent.EXTRA_PROMPT, "قول اللي بتدوّر عليه");
                startActivityForResult(i, REQ_VOICE); } catch (Exception e) { js("alert('مفيش خدمة صوت على الموبايل')"); } }); }
        @JavascriptInterface public String pending() { String s = pendingShare; pendingShare = null; return s == null ? "" : s; }
    }

    void js(String code) { if (web != null) web.evaluateJavascript(code, null); }

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

    @Override public void onBackPressed() { if (web != null && web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}
