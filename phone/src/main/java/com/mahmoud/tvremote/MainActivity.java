package com.mahmoud.tvremote;

import android.app.Activity;
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
    WebView web; TextView msg; SharedPreferences prefs;

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);
        prefs = getSharedPreferences("r", MODE_PRIVATE);
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
        WifiManager wm = (WifiManager) getApplicationContext().getSystemService(WIFI_SERVICE);
        int ip = wm != null ? wm.getConnectionInfo().getIpAddress() : 0;
        if (ip == 0) { msg.setText("وصّل الموبايل بنفس الواي فاي بتاع البوكس وافتح التطبيق تاني"); return; }
        String base = (ip & 0xff) + "." + ((ip >> 8) & 0xff) + "." + ((ip >> 16) & 0xff) + ".";
        ExecutorService ex = Executors.newFixedThreadPool(32); AtomicBoolean found = new AtomicBoolean(false);
        for (int i = 1; i < 255; i++) { final String h = base + i;
            ex.execute(() -> { if (found.get()) return; if (alive(h) && found.compareAndSet(false, true)) runOnUiThread(() -> { prefs.edit().putString("host", h).apply(); open(h); }); }); }
        ex.shutdown();
        new Thread(() -> { try { ex.awaitTermination(30, java.util.concurrent.TimeUnit.SECONDS); } catch (InterruptedException ignored) {}
            if (!found.get()) runOnUiThread(() -> msg.setText("ملقتش البوكس.\nاتأكد إن البوكس شغال وإن «التحكم من الموبايل» شغال في الإعدادات، وإن الموبايل على نفس الواي فاي.")); }).start();
    }

    void open(String host) {
        web = new WebView(this);
        WebSettings s = web.getSettings(); s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true);
        web.setWebViewClient(new WebViewClient());
        web.loadUrl("http://" + host + ":" + PORT + "/");
        setContentView(web);
    }

    @Override public void onBackPressed() { if (web != null && web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}
