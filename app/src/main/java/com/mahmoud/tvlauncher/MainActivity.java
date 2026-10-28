package com.mahmoud.tvlauncher;

import android.app.Activity;
import android.content.ClipData;
import android.content.ComponentName;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.Intent;
import android.app.ActivityManager;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.media.AudioManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.StatFs;
import android.provider.Settings;
import android.speech.RecognizerIntent;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import android.util.Base64;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;

public class MainActivity extends Activity {
    private static final int REQ_IMAGE = 11, REQ_EXPORT = 12, REQ_IMPORT = 13, REQ_FRAMES = 14, REQ_VOICE = 15;
    static MainActivity instance;
    static volatile boolean inFront = false;
    private RemoteServer remote;
    private final AtomicInteger remoteSeq = new AtomicInteger();
    private final Map<String, String[]> remoteWait = new java.util.concurrent.ConcurrentHashMap<>();
    private String imagePurpose = "wall";
    private volatile boolean learningKey = false;
    private SharedPreferences prefs;
    private TelegramBot tg;
    private boolean okLong = false;
    private volatile boolean typingText = false;
    private WebView web;
    private final Map<String, String> iconCache = new HashMap<>();
    private final Handler ui = new Handler(Looper.getMainLooper());
    private String pendingExport = null;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        instance = this;
        prefs = getSharedPreferences("launcher", MODE_PRIVATE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        if ((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0) WebView.setWebContentsDebuggingEnabled(true);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        s.setAllowFileAccess(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        web.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        web.setWebViewClient(new WebViewClient());
        web.setWebChromeClient(new WebChromeClient());
        web.setBackgroundColor(0xFF000000);
        web.addJavascriptInterface(new Bridge(), "Android");
        web.setFocusable(true);
        web.requestFocus(View.FOCUS_DOWN);
        setContentView(web);
        web.loadUrl("file:///android_asset/index.html");
        String code = prefs.getString("remoteCode", null);
        if (code == null) { code = newCode(); prefs.edit().putString("remoteCode", code).apply(); }
        remote = new RemoteServer(getAssets(), code, this::remoteCall);
        if (prefs.getBoolean("remoteOn", true)) remote.start();
        handleAction(getIntent());
        ui.postDelayed(watchdog, 30000);
        try {
            rikka.shizuku.Shizuku.addRequestPermissionResultListener((reqCode, grant) -> js("window.onShizuku&&onShizuku()"));
            rikka.shizuku.Shizuku.addBinderReceivedListenerSticky(() -> js("window.onShizuku&&onShizuku()"));
        } catch (Throwable ignored) {}
    }

    private static String newCode() { return String.valueOf(1000 + new java.security.SecureRandom().nextInt(9000)); }

    @Override
    protected void onNewIntent(Intent i) { super.onNewIntent(i); setIntent(i); handleAction(i); }

    private void handleAction(Intent i) {
        if (i == null) return;
        if (i.getBooleanExtra("wake", false)) {
            i.removeExtra("wake");
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);
            try { android.os.PowerManager pm = (android.os.PowerManager) getSystemService(POWER_SERVICE);
                  pm.newWakeLock(android.os.PowerManager.SCREEN_BRIGHT_WAKE_LOCK | android.os.PowerManager.ACQUIRE_CAUSES_WAKEUP, "tvl:wake").acquire(15000); } catch (Throwable ignored) {}
            ui.postDelayed(() -> js("window.onScheduledWake&&onScheduledWake()"), 1500);
        }
        // Test builds only (debuggable): run a JS snippet sent by the automated device test over adb.
        // Release builds are not debuggable, so this is inert in the APK users install.
        String js64 = i.getStringExtra("js64");
        if (js64 != null && (getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
            i.removeExtra("js64");
            try { final String code = new String(Base64.decode(js64, Base64.DEFAULT), "UTF-8"); ui.postDelayed(() -> js(code), 200); } catch (Exception ignored) {}
        }
        String a = i.getStringExtra("action");
        if (a != null) { i.removeExtra("action"); ui.postDelayed(() -> js("window.onMappedKey&&onMappedKey(" + JSONObject.quote(a) + ")"), 400); }
    }

    @Override
    protected void onPause() { inFront = false; super.onPause(); }

    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        if (level >= TRIM_MEMORY_RUNNING_LOW) js("window.onLowMem&&onLowMem(" + level + ")");
    }

    /** Called on a server thread: hands the phone's command to the page and waits for its answer. */
    private String remoteCall(String json) {
        final String id = "r" + remoteSeq.incrementAndGet();
        final String[] box = new String[1];
        remoteWait.put(id, box);
        js("window.onRemote&&onRemote(" + JSONObject.quote(id) + "," + JSONObject.quote(json) + ")");
        synchronized (box) {
            long end = System.currentTimeMillis() + 5000;
            while (box[0] == null && System.currentTimeMillis() < end) {
                try { box.wait(Math.max(1, end - System.currentTimeMillis())); } catch (InterruptedException e) { break; }
            }
        }
        remoteWait.remove(id);
        return box[0] == null ? "{\"error\":\"timeout\"}" : box[0];
    }

    @Override
    protected void onResume() {
        super.onResume();
        inFront = true;
        js("window.onAppsChanged&&onAppsChanged()");
    }

    @Override
    protected void onDestroy() {
        stopRadioMp(); if (tg != null) tg.stop(); if (remote != null) remote.stop(); if (instance == this) instance = null; super.onDestroy(); }

    private static boolean isCoreKey(int c) {
        return c == KeyEvent.KEYCODE_DPAD_UP || c == KeyEvent.KEYCODE_DPAD_DOWN || c == KeyEvent.KEYCODE_DPAD_LEFT
            || c == KeyEvent.KEYCODE_DPAD_RIGHT || c == KeyEvent.KEYCODE_DPAD_CENTER || c == KeyEvent.KEYCODE_ENTER
            || c == KeyEvent.KEYCODE_BACK || c == KeyEvent.KEYCODE_HOME || c == KeyEvent.KEYCODE_POWER
            || c == KeyEvent.KEYCODE_VOLUME_UP || c == KeyEvent.KEYCODE_VOLUME_DOWN || c == KeyEvent.KEYCODE_VOLUME_MUTE;
    }

    /** Key learning (for remote-button mapping) and mapped buttons, before the WebView sees them. */
    @Override
    public boolean dispatchKeyEvent(KeyEvent e) {
        int c = e.getKeyCode();
        // OK button: decided here (short press vs hold) because old WebViews turn OK into an instant click,
        // which opened apps even when the user meant to hold for the options menu. On-screen keyboards pass through.
        if ((c == KeyEvent.KEYCODE_DPAD_CENTER || c == KeyEvent.KEYCODE_ENTER || c == KeyEvent.KEYCODE_NUMPAD_ENTER)
                && !typingText) {
            if (e.getAction() == KeyEvent.ACTION_DOWN) {
                if (e.getRepeatCount() == 0) okLong = false;
                else if (!okLong) { okLong = true; js("window.onLongOk&&onLongOk()"); }
            } else if (e.getAction() == KeyEvent.ACTION_UP) {
                if (!okLong) js("window.onShortOk&&onShortOk()");
                okLong = false;
            }
            return true;
        }
        // Emergency exit: holding Back ~1.5 s restarts the interface (stops any stuck channel), whatever the page is doing
        if (c == KeyEvent.KEYCODE_BACK && e.getAction() == KeyEvent.ACTION_DOWN && e.getRepeatCount() == 20) { restartUi("back-hold"); return true; }
        if ((c == KeyEvent.KEYCODE_SEARCH || c == KeyEvent.KEYCODE_VOICE_ASSIST) && !learningKey && prefs.getString("key_" + c, null) == null) {
            if (e.getAction() == KeyEvent.ACTION_UP) js("window.A&&A.voice()");
            return true;
        }
        if ((c == KeyEvent.KEYCODE_VOLUME_UP || c == KeyEvent.KEYCODE_VOLUME_DOWN || c == KeyEvent.KEYCODE_VOLUME_MUTE) && e.getAction() == KeyEvent.ACTION_DOWN)
            ui.postDelayed(this::volOsd, 80);
        if (!isCoreKey(c)) {
            if (learningKey) {
                if (e.getAction() == KeyEvent.ACTION_UP) {
                    learningKey = false;
                    js("window.onKeyLearned&&onKeyLearned(" + c + "," + JSONObject.quote(KeyEvent.keyCodeToString(c)) + ")");
                }
                return true;
            }
            String action = prefs.getString("key_" + c, null);
            if (action != null) {
                if (e.getAction() == KeyEvent.ACTION_UP) js("window.onMappedKey&&onMappedKey(" + JSONObject.quote(action) + ")");
                return true;
            }
        }
        return super.dispatchKeyEvent(e);
    }

    /** Our own volume bar (the stock one is missing or tiny on many boxes). */
    /** Reloads the web interface: stops playback and frees everything the page held. */
    void restartUi(String why) {
        try { stopRadioMp(); } catch (Throwable ignored) {}
        ui.post(() -> { try { web.stopLoading(); web.loadUrl("file:///android_asset/index.html"); Toast.makeText(this, "↻", Toast.LENGTH_SHORT).show(); } catch (Throwable ignored) {} });
        lastPing = System.currentTimeMillis() + 20000;
    }
    // Watchdog: the page pings every 2 s; if it stops answering for 12 s while on screen, reload it.
    private volatile long lastPing = 0;
    private final Runnable watchdog = new Runnable() { @Override public void run() {
        if (inFront && lastPing > 0 && System.currentTimeMillis() - lastPing > 25000) restartUi("watchdog");
        ui.postDelayed(this, 4000);
    } };

    void volOsd() {
        try {
            AudioManager am = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            boolean mute = android.os.Build.VERSION.SDK_INT >= 23 && am.isStreamMute(AudioManager.STREAM_MUSIC);
            js("window.onVolOsd&&onVolOsd(" + am.getStreamVolume(AudioManager.STREAM_MUSIC) + "," + am.getStreamMaxVolume(AudioManager.STREAM_MUSIC) + "," + mute + ")");
        } catch (Throwable ignored) {}
    }

    void postNotif(String json) { js("window.onSysNotif&&onSysNotif(" + JSONObject.quote(json) + ")"); }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent e) {
        if (keyCode == KeyEvent.KEYCODE_BACK) { js("window.onBack&&onBack()"); return true; }
        return super.onKeyDown(keyCode, e);
    }

    private void js(final String code) {
        ui.post(() -> { if (web != null) web.evaluateJavascript(code, null); });
    }

    private void callback(String id, boolean ok, String data) {
        js("window.__cb&&__cb(" + JSONObject.quote(id) + "," + ok + "," + JSONObject.quote(data == null ? "" : data) + ")");
    }

    // ---------- results from pickers ----------
    @Override
    protected void onActivityResult(int req, int res, Intent data) {
        super.onActivityResult(req, res, data);
        if (res != RESULT_OK || data == null) return;
        if (req == REQ_VOICE) {
            ArrayList<String> r = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            if (r != null && !r.isEmpty()) js("window.onVoice&&onVoice(" + JSONObject.quote(r.get(0)) + ")");
            return;
        }
        if (req == REQ_FRAMES) {
            final ArrayList<Uri> uris = new ArrayList<>();
            ClipData cd = data.getClipData();
            if (cd != null) for (int i = 0; i < cd.getItemCount(); i++) uris.add(cd.getItemAt(i).getUri());
            else if (data.getData() != null) uris.add(data.getData());
            new Thread(() -> {
                JSONArray out = new JSONArray();
                File dir = new File(getFilesDir(), "frames"); dir.mkdirs();
                for (Uri u : uris) {
                    try {
                        Bitmap bmp = loadScaled(u, 1920);
                        File f = new File(dir, "f" + System.currentTimeMillis() + "_" + out.length() + ".jpg");
                        try (OutputStream os = new java.io.FileOutputStream(f)) { bmp.compress(Bitmap.CompressFormat.JPEG, 85, os); }
                        bmp.recycle();
                        out.put("file://" + f.getAbsolutePath());
                    } catch (Throwable ignored) {}
                }
                js("window.onFramesAdded&&onFramesAdded(" + JSONObject.quote(out.toString()) + ")");
            }).start();
            return;
        }
        if (data.getData() == null) return;
        final Uri uri = data.getData();
        new Thread(() -> {
            try {
                if (req == REQ_IMAGE) {
                    Bitmap sc = loadScaled(uri, "wall".equals(imagePurpose) ? 1280 : 480);
                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    sc.compress(Bitmap.CompressFormat.JPEG, 80, bos);
                    String d = "data:image/jpeg;base64," + Base64.encodeToString(bos.toByteArray(), Base64.NO_WRAP);
                    js("window.onImagePicked&&onImagePicked(" + JSONObject.quote(imagePurpose) + "," + JSONObject.quote(d) + ")");
                } else if (req == REQ_EXPORT && pendingExport != null) {
                    try (OutputStream out = getContentResolver().openOutputStream(uri)) { out.write(pendingExport.getBytes("UTF-8")); }
                    pendingExport = null;
                    js("window.onBackupDone&&onBackupDone(true)");
                } else if (req == REQ_IMPORT) {
                    StringBuilder sb = new StringBuilder();
                    try (BufferedReader r = new BufferedReader(new InputStreamReader(getContentResolver().openInputStream(uri), "UTF-8"))) {
                        String line; while ((line = r.readLine()) != null) sb.append(line).append('\n');
                    }
                    js("window.onBackupLoaded&&onBackupLoaded(" + JSONObject.quote(sb.toString()) + ")");
                }
            } catch (Throwable t) {
                js("window.A&&A.toast('Error')");
            }
        }).start();
    }

    private Bitmap loadScaled(Uri uri, int maxW) throws Exception {
        BitmapFactory.Options o = new BitmapFactory.Options();
        o.inJustDecodeBounds = true;
        try (InputStream in = getContentResolver().openInputStream(uri)) { BitmapFactory.decodeStream(in, null, o); }
        int sample = 1;
        while (o.outWidth / sample > maxW * 2) sample *= 2;
        BitmapFactory.Options o2 = new BitmapFactory.Options();
        o2.inSampleSize = sample;
        Bitmap bmp;
        try (InputStream in = getContentResolver().openInputStream(uri)) { bmp = BitmapFactory.decodeStream(in, null, o2); }
        if (bmp == null) throw new Exception("decode");
        float k = Math.min(1f, (float) maxW / bmp.getWidth());
        if (k >= 1f) return bmp;
        return Bitmap.createScaledBitmap(bmp, Math.round(bmp.getWidth() * k), Math.round(bmp.getHeight() * k), true);
    }

    private String iconFor(ResolveInfo ri, PackageManager pm) {
        String pkg = ri.activityInfo.packageName;
        if (iconCache.containsKey(pkg)) return iconCache.get(pkg);
        String out = "";
        try {
            // icons are drawn once per app version and kept as files: later starts just point at them (fast cold start)
            long ver = 0; try { ver = pm.getPackageInfo(pkg, 0).lastUpdateTime; } catch (Exception ignored) {}
            File dir = new File(getFilesDir(), "icons"); dir.mkdirs();
            File f = new File(dir, pkg + "_" + ver + ".png");
            if (!f.exists() || f.length() == 0) {
                File[] old = dir.listFiles((dd, n) -> n.startsWith(pkg + "_")); if (old != null) for (File o : old) o.delete();
                Drawable d = null;
                try { d = pm.getApplicationBanner(pkg); } catch (Exception ignored) {}
                if (d == null) d = ri.loadIcon(pm);
                int w = Math.max(1, Math.min(d.getIntrinsicWidth() > 0 ? d.getIntrinsicWidth() : 192, 320));
                int h = Math.max(1, Math.min(d.getIntrinsicHeight() > 0 ? d.getIntrinsicHeight() : 192, 320));
                Bitmap bmp = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
                Canvas c = new Canvas(bmp);
                d.setBounds(0, 0, w, h);
                d.draw(c);
                try (OutputStream o = new java.io.FileOutputStream(f)) { bmp.compress(Bitmap.CompressFormat.PNG, 90, o); }
                bmp.recycle();
            }
            out = Uri.fromFile(f).toString();
        } catch (Exception ignored) {}
        iconCache.put(pkg, out);
        return out;
    }

    private static InputStream open(String url) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        c.setConnectTimeout(15000);
        c.setReadTimeout(60000);
        c.setInstanceFollowRedirects(true);
        c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android TV) TVLauncher");
        c.setRequestProperty("Accept-Encoding", "gzip");
        InputStream in = c.getInputStream();
        if ("gzip".equalsIgnoreCase(c.getContentEncoding()) || url.toLowerCase(Locale.US).endsWith(".gz"))
            in = new GZIPInputStream(in);
        return in;
    }

    private android.media.MediaPlayer radioMp;
    private void stopRadioMp(){ try{ if(radioMp!=null){ radioMp.release(); } }catch(Exception ignored){} radioMp=null; }

    class Bridge {
        @JavascriptInterface
        public void playAudio(final String url) {
            runOnUiThread(() -> {
                stopRadioMp();
                try {
                    android.media.MediaPlayer mp = new android.media.MediaPlayer();
                    radioMp = mp;
                    mp.setAudioStreamType(android.media.AudioManager.STREAM_MUSIC);
                    mp.setDataSource(url);
                    mp.setOnPreparedListener(m -> m.start());
                    mp.setOnErrorListener((m, w, x) -> { web.evaluateJavascript("window.onRadioErr&&onRadioErr()", null); return true; });
                    mp.prepareAsync();
                } catch (Exception e) { web.evaluateJavascript("window.onRadioErr&&onRadioErr()", null); }
            });
        }
        @JavascriptInterface
        public void stopAudio() { runOnUiThread(MainActivity.this::stopRadioMp); }

        @JavascriptInterface
        public String getApps() {
            PackageManager pm = getPackageManager();
            JSONArray arr = new JSONArray();
            HashSet<String> seen = new HashSet<>();
            String[] cats = {Intent.CATEGORY_LEANBACK_LAUNCHER, Intent.CATEGORY_LAUNCHER};
            for (String cat : cats) {
                Intent i = new Intent(Intent.ACTION_MAIN).addCategory(cat);
                List<ResolveInfo> list = pm.queryIntentActivities(i, 0);
                for (ResolveInfo ri : list) {
                    String pkg = ri.activityInfo.packageName;
                    if (pkg.equals(getPackageName()) || !seen.add(pkg)) continue;
                    try {
                        JSONObject o = new JSONObject();
                        o.put("pkg", pkg);
                        o.put("name", ri.loadLabel(pm).toString());
                        o.put("icon", iconFor(ri, pm));
                        arr.put(o);
                    } catch (Exception ignored) {}
                }
            }
            return arr.toString();
        }

        @JavascriptInterface
        public boolean launch(String pkg) {
            PackageManager pm = getPackageManager();
            Intent i = pm.getLeanbackLaunchIntentForPackage(pkg);
            if (i == null) i = pm.getLaunchIntentForPackage(pkg);
            if (i == null) return false;
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            try { startActivity(i); return true; } catch (Exception e) { return false; }
        }

        @JavascriptInterface
        public boolean isInstalled(String pkg) {
            try { getPackageManager().getPackageInfo(pkg, 0); return true; }
            catch (Exception e) { return false; }
        }

        @JavascriptInterface
        public void playExternal(String url) {
            ui.post(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_VIEW);
                    i.setDataAndType(Uri.parse(url), "video/*");
                    startActivity(Intent.createChooser(i, "Player"));
                } catch (Exception e) {
                    Toast.makeText(MainActivity.this, "No player found", Toast.LENGTH_SHORT).show();
                }
            });
        }

        /** Opens a system settings screen by action name, falls back to main settings. */
        @JavascriptInterface
        public void openSettings(String action) {
            ui.post(() -> {
                String a = (action == null || action.isEmpty()) ? Settings.ACTION_SETTINGS : action;
                try { startActivity(new Intent(a).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); }
                catch (Exception e) {
                    try { startActivity(new Intent(Settings.ACTION_SETTINGS)); } catch (Exception ignored) {}
                }
            });
        }

        @JavascriptInterface
        public void appInfo(String pkg) {
            ui.post(() -> {
                try { startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + pkg))); }
                catch (Exception ignored) {}
            });
        }

        @JavascriptInterface
        public void toast(String msg) {
            ui.post(() -> Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show());
        }

        @JavascriptInterface
        public String getStatus() {
            JSONObject o = new JSONObject();
            try {
                String net = "none";
                ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
                NetworkInfo ni = cm == null ? null : cm.getActiveNetworkInfo();
                if (ni != null && ni.isConnected()) {
                    net = ni.getType() == ConnectivityManager.TYPE_ETHERNET ? "eth"
                        : ni.getType() == ConnectivityManager.TYPE_WIFI ? "wifi" : "other";
                }
                o.put("net", net);
                StatFs st = new StatFs(Environment.getDataDirectory().getPath());
                o.put("free", st.getAvailableBytes());
                o.put("total", st.getTotalBytes());
            } catch (Exception ignored) {}
            return o.toString();
        }

        @JavascriptInterface
        public void volume(String dir) {
            AudioManager am = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            if (am == null) return;
            int d = "up".equals(dir) ? AudioManager.ADJUST_RAISE : "down".equals(dir) ? AudioManager.ADJUST_LOWER : AudioManager.ADJUST_TOGGLE_MUTE;
            am.adjustStreamVolume(AudioManager.STREAM_MUSIC, d, 0);
            ui.postDelayed(MainActivity.this::volOsd, 80);
        }

        /** Clears this launcher's own cache (other apps' caches need system rights). */
        @JavascriptInterface
        public long clearOwnCache() {
            long[] n = {0};
            deleteRec(getCacheDir(), n);
            ui.post(() -> { if (web != null) web.clearCache(true); });
            return n[0];
        }

        private void deleteRec(File f, long[] n) {
            if (f == null || !f.exists()) return;
            File[] kids = f.listFiles();
            if (kids != null) for (File k : kids) {
                if (k.isDirectory()) deleteRec(k, n);
                n[0] += k.length();
                k.delete();
            }
        }

        @JavascriptInterface
        public void pickImage(String purpose) {
            imagePurpose = purpose == null ? "wall" : purpose;
            ui.post(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_GET_CONTENT).setType("image/*").addCategory(Intent.CATEGORY_OPENABLE);
                    startActivityForResult(Intent.createChooser(i, "Image"), REQ_IMAGE);
                } catch (Exception e) { toast("No file picker on this device"); }
            });
        }

        @JavascriptInterface
        public void pickFrames() {
            ui.post(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_GET_CONTENT).setType("image/*").addCategory(Intent.CATEGORY_OPENABLE)
                        .putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                    startActivityForResult(Intent.createChooser(i, "Photos"), REQ_FRAMES);
                } catch (Exception e) { toast("No file picker on this device"); }
            });
        }

        @JavascriptInterface
        public void deleteFrame(String url) {
            if (url == null || !url.startsWith("file://")) return;
            File f = new File(url.substring(7));
            if (f.getParentFile() != null && f.getParentFile().getName().equals("frames")) f.delete();
        }

        @JavascriptInterface
        public void voiceSearch() {
            ui.post(() -> {
                try {
                    Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
                        .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                    startActivityForResult(i, REQ_VOICE);
                } catch (Exception e) { toast("Voice search not available"); }
            });
        }

        /** Remote-button mapping: keycode -> action string, stored natively so it works before the page loads. */
        @JavascriptInterface
        public void setKeyMap(String json) {
            try {
                SharedPreferences.Editor ed = prefs.edit();
                for (String k : prefs.getAll().keySet()) if (k.startsWith("key_")) ed.remove(k);
                JSONObject o = new JSONObject(json);
                java.util.Iterator<String> it = o.keys();
                while (it.hasNext()) { String k = it.next(); ed.putString("key_" + k, o.getString(k)); }
                ed.apply();
            } catch (Exception ignored) {}
        }

        @JavascriptInterface
        public void learnKey(boolean on) { learningKey = on; }

        // ---------- phone control ----------
        @JavascriptInterface
        public void remoteReply(String id, String json) {
            String[] box = remoteWait.get(id);
            if (box == null) return;
            synchronized (box) { box[0] = json; box.notifyAll(); }
        }

        @JavascriptInterface
        public String remoteInfo() {
            JSONObject o = new JSONObject();
            try {
                o.put("on", remote != null && remote.isRunning());
                o.put("ip", RemoteServer.localIp());
                o.put("port", RemoteServer.PORT);
                o.put("code", prefs.getString("remoteCode", ""));
            } catch (Exception ignored) {}
            return o.toString();
        }

        @JavascriptInterface
        public void setRemote(boolean on) {
            prefs.edit().putBoolean("remoteOn", on).apply();
            if (remote == null) return;
            if (on) remote.start(); else remote.stop();
        }

        @JavascriptInterface
        public String newRemoteCode() {
            String c = newCode();
            prefs.edit().putString("remoteCode", c).apply();
            if (remote != null) remote.setCode(c);
            return c;
        }




        /** Downloads an image once, scales it to at most maxW pixels wide and saves it locally (fast wallpapers on weak boxes). */
        @JavascriptInterface
        public void cacheImage(final String url, final int maxW, final String id) {
            new Thread(() -> {
                try {
                    File dir = new File(getFilesDir(), "wall"); dir.mkdirs();
                    File out = new File(dir, Integer.toHexString(url.hashCode()) + "_" + maxW + ".jpg");
                    if (!out.exists() || out.length() < 1000) {
                        File tmp = new File(dir, "dl.tmp");
                        try (InputStream in = open(url); OutputStream o = new java.io.FileOutputStream(tmp)) {
                            byte[] buf = new byte[65536]; int n; while ((n = in.read(buf)) > 0) o.write(buf, 0, n);
                        }
                        BitmapFactory.Options b = new BitmapFactory.Options(); b.inJustDecodeBounds = true;
                        BitmapFactory.decodeFile(tmp.getPath(), b);
                        int sample = 1; while (b.outWidth / (sample * 2) >= maxW) sample *= 2;
                        BitmapFactory.Options o2 = new BitmapFactory.Options(); o2.inSampleSize = sample; o2.inPreferredConfig = Bitmap.Config.RGB_565;
                        Bitmap bm = BitmapFactory.decodeFile(tmp.getPath(), o2);
                        if (bm == null) throw new Exception("not an image");
                        if (bm.getWidth() > maxW) { Bitmap sc = Bitmap.createScaledBitmap(bm, maxW, Math.max(1, bm.getHeight() * maxW / bm.getWidth()), true); bm.recycle(); bm = sc; }
                        try (OutputStream o = new java.io.FileOutputStream(out)) { bm.compress(Bitmap.CompressFormat.JPEG, 86, o); }
                        bm.recycle(); tmp.delete();
                        // keep the folder small: only the 12 newest wallpapers
                        File[] all = dir.listFiles();
                        if (all != null && all.length > 12) { java.util.Arrays.sort(all, (x, y) -> Long.compare(y.lastModified(), x.lastModified())); for (int k = 12; k < all.length; k++) all[k].delete(); }
                    }
                    callback(id, true, Uri.fromFile(out).toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
            }).start();
        }


        /** Closes an app that is in the background (every app is, while the launcher is on screen). No root needed. */
        @JavascriptInterface
        public boolean closeApp(String pkg) {
            if (pkg == null || pkg.equals(getPackageName())) return false;
            try { ((ActivityManager) getSystemService(ACTIVITY_SERVICE)).killBackgroundProcesses(pkg); return true; }
            catch (Throwable t) { return false; }
        }


        /** The page tells us while a text field has the keyboard, so OK/Enter reach it untouched. */
        @JavascriptInterface
        public void setTyping(boolean on) { typingText = on; }


        /** Live numbers for the device monitor widget: CPU %, RAM, network bytes, free storage. */
        @JavascriptInterface
        public String monitor() {
            JSONObject o = new JSONObject();
            try {
                ActivityManager.MemoryInfo mi = new ActivityManager.MemoryInfo();
                ((ActivityManager) getSystemService(ACTIVITY_SERVICE)).getMemoryInfo(mi);
                o.put("ramUsed", mi.totalMem - mi.availMem).put("ramTotal", mi.totalMem);
                o.put("rx", android.net.TrafficStats.getTotalRxBytes()).put("tx", android.net.TrafficStats.getTotalTxBytes());
                StatFs st = new StatFs(Environment.getDataDirectory().getPath());
                o.put("diskFree", st.getAvailableBytes()).put("diskTotal", st.getTotalBytes());
                try (BufferedReader r = new BufferedReader(new java.io.FileReader("/proc/stat"))) {
                    String[] p = r.readLine().trim().split("\\s+"); long idle = Long.parseLong(p[4]) + Long.parseLong(p[5]), tot = 0;
                    for (int k = 1; k < p.length && k < 9; k++) tot += Long.parseLong(p[k]);
                    o.put("cpuTot", tot).put("cpuIdle", idle);
                } catch (Throwable ignored) {}
                o.put("t", System.currentTimeMillis());
            } catch (Throwable ignored) {}
            return o.toString();
        }


        /** Daily wake-up (screen on + morning action). time = "HH:MM" or "" to cancel. */
        @JavascriptInterface
        public void scheduleWake(String hhmm) {
            android.app.AlarmManager am = (android.app.AlarmManager) getSystemService(ALARM_SERVICE);
            Intent it = new Intent(MainActivity.this, WakeReceiver.class);
            int fl = android.app.PendingIntent.FLAG_UPDATE_CURRENT | (android.os.Build.VERSION.SDK_INT >= 23 ? android.app.PendingIntent.FLAG_IMMUTABLE : 0);
            android.app.PendingIntent pi = android.app.PendingIntent.getBroadcast(MainActivity.this, 77, it, fl);
            am.cancel(pi);
            prefs.edit().putString("wakeAt", hhmm == null ? "" : hhmm).apply();
            if (hhmm == null || !hhmm.matches("\\d{1,2}:\\d{2}")) return;
            WakeReceiver.arm(MainActivity.this, hhmm);
        }

        // ---------- start-up: resume last channel ----------
        /** True once per boot, for the first launcher start within 10 minutes of the box turning on. */
        @JavascriptInterface
        public boolean bootFresh() {
            long up = android.os.SystemClock.elapsedRealtime();
            long bootAt = (System.currentTimeMillis() - up) / 60000;
            if (up > 10 * 60000 || Math.abs(prefs.getLong("bootSeen", 0) - bootAt) <= 1) return false;
            prefs.edit().putLong("bootSeen", bootAt).apply();
            return true;
        }
        @JavascriptInterface
        public void setBootPlay(boolean on) { prefs.edit().putBoolean("bootPlay", on).apply(); }

        // ---------- files: USB drives, internal storage, network (SMB) ----------
        @JavascriptInterface
        public String storageRoots() {
            JSONArray a = new JSONArray();
            HashSet<String> seen = new HashSet<>();
            try {
                File ext = Environment.getExternalStorageDirectory();
                a.put(new JSONObject().put("path", ext.getPath()).put("label", "internal")); seen.add(ext.getPath());
                String[] bases = {"/storage", "/mnt/usb_storage", "/mnt/media_rw", "/mnt/usb"};
                for (String b : bases) {
                    File[] l = new File(b).listFiles();
                    if (l == null) continue;
                    for (File f : l) {
                        String n = f.getName();
                        if (!f.isDirectory() || n.equals("emulated") || n.equals("self") || n.equals("sdcard0") || !f.canRead() || !seen.add(f.getCanonicalPath())) continue;
                        String[] kids = f.list(); if (kids == null) continue;
                        a.put(new JSONObject().put("path", f.getPath()).put("label", "usb").put("name", n));
                    }
                }
            } catch (Throwable ignored) {}
            return a.toString();
        }

        @JavascriptInterface
        public void listDir(final String path, final String id) {
            new Thread(() -> {
                try {
                    JSONArray a = new JSONArray();
                    if (path.startsWith("smb://")) {
                        String p = path.endsWith("/") ? path : path + "/";
                        jcifs.smb.SmbFile d = new jcifs.smb.SmbFile(p, MediaServer.Smb.ctx(p));
                        for (jcifs.smb.SmbFile f : d.listFiles()) {
                            String n = f.getName(); boolean dir = n.endsWith("/");
                            if (n.endsWith("$/") || n.startsWith(".")) continue;
                            a.put(new JSONObject().put("name", dir ? n.substring(0, n.length() - 1) : n).put("dir", dir)
                                .put("path", f.getPath()).put("size", dir ? 0 : f.length()));
                        }
                    } else {
                        File[] l = new File(path).listFiles();
                        if (l == null) throw new Exception("denied");
                        for (File f : l) if (!f.getName().startsWith("."))
                            a.put(new JSONObject().put("name", f.getName()).put("dir", f.isDirectory()).put("path", f.getPath()).put("size", f.isDirectory() ? 0 : f.length()).put("time", f.lastModified()));
                    }
                    callback(id, true, a.toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
            }).start();
        }

        @JavascriptInterface
        public String mediaUrl(String path) { MediaServer.get(); return MediaServer.urlFor(path); }

        @JavascriptInterface
        public void smbLogin(String host, String user, String pass, String domain) {
            MediaServer.Smb.creds.put(host.toLowerCase(Locale.US), new String[]{user, pass, domain});
        }

        /** Finds computers on the home network that share files (SMB port 445 open). */
        @JavascriptInterface
        public void smbScan(final String id) {
            new Thread(() -> {
                try {
                    String ip = RemoteServer.localIp();
                    if (ip.isEmpty()) throw new Exception("no network");
                    final String base = ip.substring(0, ip.lastIndexOf('.') + 1);
                    final JSONArray out = new JSONArray();
                    ExecutorService pool = Executors.newFixedThreadPool(48);
                    for (int i = 1; i < 255; i++) {
                        final String h = base + i;
                        if (h.equals(ip)) continue;
                        pool.execute(() -> {
                            try (java.net.Socket so = new java.net.Socket()) {
                                so.connect(new java.net.InetSocketAddress(h, 445), 350);
                                String name = h;
                                try { String cn = java.net.InetAddress.getByName(h).getCanonicalHostName(); if (cn != null && !cn.equals(h)) name = cn; } catch (Throwable ignored) {}
                                synchronized (out) { out.put(new JSONObject().put("host", h).put("name", name)); }
                            } catch (Throwable ignored) {}
                        });
                    }
                    pool.shutdown(); pool.awaitTermination(20, java.util.concurrent.TimeUnit.SECONDS);
                    callback(id, true, out.toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
            }).start();
        }

        // ---------- recording ----------
        @JavascriptInterface
        public void recStart(String url, String name, int minutes) { RecService.start(MainActivity.this, url, name, minutes); }
        @JavascriptInterface
        public void recStop(String rid) {
            Intent i = new Intent(MainActivity.this, RecService.class).setAction("stop").putExtra("id", rid);
            try { startService(i); } catch (Throwable t) { RecService.Job j = RecService.jobs.get(rid); if (j != null) j.stop = true; }
        }
        @JavascriptInterface
        public void recAt(String url, String name, double startMs, double endMs) { RecService.schedule(MainActivity.this, url, name, (long) startMs, (long) endMs); }
        @JavascriptInterface
        public String recState() {
            JSONObject o = new JSONObject();
            try {
                o.put("active", RecService.state()).put("dir", RecService.dir(MainActivity.this).getPath()).put("dirs", RecService.dirs(MainActivity.this));
                o.put("scheduled", new JSONArray(prefs.getString("recSched", "[]")));
            } catch (Exception ignored) {}
            return o.toString();
        }
        @JavascriptInterface
        public void recSetDir(String d) { prefs.edit().putString("recDir", d == null ? "" : d).apply(); }
        @JavascriptInterface
        public boolean deleteFile(String path) {
            File f = new File(path);
            File rec = RecService.dir(MainActivity.this);
            try { if (!f.getCanonicalPath().startsWith(rec.getCanonicalPath())) return false; } catch (Exception e) { return false; }
            return f.delete();
        }

        // ---------- Telegram control ----------
        @JavascriptInterface
        public void tgStart(String token) {
            if (tg != null) tg.stop();
            tg = null;
            if (token == null || !token.matches("\\d+:[A-Za-z0-9_-]{20,}")) return;
            tg = new TelegramBot(token, (chat, from, text) ->
                js("window.onTg&&onTg(" + JSONObject.quote(String.valueOf(chat)) + "," + JSONObject.quote(from) + "," + JSONObject.quote(text) + ")"));
            tg.start();
        }
        @JavascriptInterface
        public void tgSend(String chat, String text, String buttons) {
            try { if (tg != null) tg.send(Long.parseLong(chat), text, buttons); } catch (Throwable ignored) {}
        }


        @JavascriptInterface
        public void tgSendDoc(String chat, String fileName, String content, String caption) {
            try { if (tg != null) tg.sendDocument(Long.parseLong(chat), fileName, content, caption); } catch (Throwable ignored) {}
        }
        @JavascriptInterface
        public void tgGetFile(final String fileId, final String id) {
            new Thread(() -> { try { if (tg == null) throw new Exception("bot off"); callback(id, true, tg.download(fileId)); } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); } }).start();
        }


        @JavascriptInterface
        public void ping() { lastPing = System.currentTimeMillis(); }

        // ---------- setup wizard ----------
        @JavascriptInterface
        public boolean isDefaultHome() {
            try {
                ResolveInfo ri = getPackageManager().resolveActivity(new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_HOME), PackageManager.MATCH_DEFAULT_ONLY);
                return ri != null && ri.activityInfo != null && getPackageName().equals(ri.activityInfo.packageName);
            } catch (Throwable t) { return false; }
        }

        @JavascriptInterface
        public String homePackages() {
            JSONArray a = new JSONArray();
            try {
                for (ResolveInfo ri : getPackageManager().queryIntentActivities(new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_HOME), 0))
                    if (!getPackageName().equals(ri.activityInfo.packageName)) a.put(ri.activityInfo.packageName);
            } catch (Throwable ignored) {}
            return a.toString();
        }

        @JavascriptInterface
        public void openHomeSettings() {
            ui.post(() -> {
                String[] acts = {"android.settings.HOME_SETTINGS", Settings.ACTION_SETTINGS};
                for (String a : acts) { try { startActivity(new Intent(a).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); return; } catch (Throwable ignored) {} }
            });
        }

        @JavascriptInterface
        public void askHome() {
            ui.post(() -> {
                try {
                    // pressing Home with no default shows the system chooser; clearing our own default first makes it appear
                    getPackageManager().clearPackagePreferredActivities(getPackageName());
                    Intent i = new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_HOME).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(Intent.createChooser(i, "Home"));
                } catch (Throwable t) { openHomeSettings(); }
            });
        }

        // ---------- home guard (accessibility helper) ----------
        @JavascriptInterface
        public boolean guardService() {
            String flat = Settings.Secure.getString(getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
            return flat != null && flat.contains(getPackageName() + "/");
        }

        @JavascriptInterface
        public void openAccessibility() {
            ui.post(() -> {
                try { startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)); }
                catch (Exception e) { toast("adb shell settings put secure enabled_accessibility_services " + getPackageName() + "/.HomeGuardService"); }
            });
        }

        @JavascriptInterface
        public void setGuard(boolean on) {
            prefs.edit().putBoolean("guard", on).apply();
            if (on && HomeGuardService.instance != null) HomeGuardService.instance.refreshHomes();
        }

        @JavascriptInterface
        public boolean sleepNow() {
            HomeGuardService g = HomeGuardService.instance;
            return g != null && g.sleepDevice();
        }

        // ---------- self update from GitHub releases ----------
        @JavascriptInterface
        public int versionCode() {
            try { return getPackageManager().getPackageInfo(getPackageName(), 0).versionCode; } catch (Exception e) { return 0; }
        }

        @JavascriptInterface
        public String versionName() {
            try { return getPackageManager().getPackageInfo(getPackageName(), 0).versionName; } catch (Exception e) { return ""; }
        }

        /** repo = "owner/name"; answers {latest, current, url, notes} through window.__cb. */
        @JavascriptInterface
        public void checkUpdate(String repo, String id) {
            new Thread(() -> {
                try (InputStream in = open("https://api.github.com/repos/" + repo + "/releases/latest")) {
                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    byte[] buf = new byte[8192]; int n;
                    while ((n = in.read(buf)) > 0) bos.write(buf, 0, n);
                    JSONObject rel = new JSONObject(bos.toString("UTF-8"));
                    String tag = rel.optString("tag_name", "");
                    int latest = 0;
                    try { latest = Integer.parseInt(tag.replaceAll("[^0-9]", "")); } catch (Exception ignored) {}
                    String url = "";
                    JSONArray as = rel.optJSONArray("assets");
                    if (as != null) for (int i = 0; i < as.length(); i++) {
                        String u = as.getJSONObject(i).optString("browser_download_url", "");
                        if (u.endsWith(".apk")) { url = u; break; }
                    }
                    JSONObject o = new JSONObject();
                    o.put("latest", latest); o.put("tag", tag); o.put("current", versionCode());
                    o.put("url", url); o.put("notes", rel.optString("body", ""));
                    callback(id, true, o.toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
            }).start();
        }


        /** Follows redirects (Downloader-style short codes) and reports {url,type,apk}. */
        @JavascriptInterface
        public void resolveUrl(final String url, final String id) {
            new Thread(() -> {
                HttpURLConnection c = null;
                try {
                    URL u = new URL(url);
                    for (int hop = 0; hop < 8; hop++) {
                        c = (HttpURLConnection) u.openConnection();
                        c.setInstanceFollowRedirects(false);
                        c.setConnectTimeout(12000); c.setReadTimeout(15000);
                        c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android TV) TVLauncher");
                        int code = c.getResponseCode();
                        String loc = c.getHeaderField("Location");
                        if (code >= 300 && code < 400 && loc != null) { u = new URL(u, loc); c.disconnect(); continue; }
                        break;
                    }
                    String type = c == null ? "" : String.valueOf(c.getContentType());
                    String disp = c == null ? "" : String.valueOf(c.getHeaderField("Content-Disposition"));
                    String fu = u.toString();
                    boolean apk = type.contains("android.package-archive") || fu.toLowerCase(Locale.US).matches(".*\\.apk([?#].*)?$") || disp.toLowerCase(Locale.US).contains(".apk");
                    JSONObject o = new JSONObject(); o.put("url", fu); o.put("type", type); o.put("apk", apk);
                    callback(id, true, o.toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
                finally { if (c != null) c.disconnect(); }
            }).start();
        }


        @JavascriptInterface
        public boolean hasBundled(String name) {
            try { getAssets().open(name).close(); return true; } catch (Throwable t) { return false; }
        }

        /** Installs an APK shipped inside this launcher's assets (e.g. Shizuku). */
        @JavascriptInterface
        public void installBundled(final String name, final String id) {
            if (android.os.Build.VERSION.SDK_INT >= 26 && !getPackageManager().canRequestPackageInstalls()) {
                ui.post(() -> { try { startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getPackageName()))); } catch (Exception ignored) {} });
                apkProgress(id, -2); return;
            }
            new Thread(() -> {
                try {
                    File dir = new File(getCacheDir(), "update"); dir.mkdirs();
                    File f = new File(dir, "update.apk");
                    try (InputStream in = getAssets().open(name); OutputStream out = new java.io.FileOutputStream(f)) {
                        byte[] buf = new byte[65536]; int n; while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                    }
                    Uri uri = UpdateProvider.uriFor(MainActivity.this, f);
                    Intent i = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/vnd.android.package-archive")
                        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                    ui.post(() -> { try { startActivity(i); } catch (Exception e) { toast("Install failed"); } });
                    apkProgress(id, 100);
                } catch (Throwable t) { apkProgress(id, -1); }
            }).start();
        }

        @JavascriptInterface
        public void installUpdate(String url) { installApk(url, "update"); }

        /** Downloads any APK and opens the system installer. Progress: onApkProgress(id, pct); -2 = needs permission, -1 = error. */
        @JavascriptInterface
        public void installApk(String url, String id) {
            if (android.os.Build.VERSION.SDK_INT >= 26 && !getPackageManager().canRequestPackageInstalls()) {
                ui.post(() -> {
                    try { startActivity(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getPackageName()))); }
                    catch (Exception ignored) {}
                });
                apkProgress(id, -2);
                return;
            }
            new Thread(() -> {
                try {
                    File dir = new File(getCacheDir(), "update"); dir.mkdirs();
                    File f = new File(dir, "update.apk");
                    HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
                    c.setInstanceFollowRedirects(true);
                    c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android TV) TVLauncher");
                    c.setConnectTimeout(15000); c.setReadTimeout(60000);
                    // follow cross-protocol redirects (GitHub/F-Droid mirrors)
                    for (int hop = 0; hop < 5; hop++) {
                        int code = c.getResponseCode();
                        if (code >= 300 && code < 400 && c.getHeaderField("Location") != null) {
                            URL next = new URL(c.getURL(), c.getHeaderField("Location"));
                            c.disconnect();
                            c = (HttpURLConnection) next.openConnection();
                            c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android TV) TVLauncher");
                        } else break;
                    }
                    long total = c.getContentLengthLong(), got = 0; int lastPct = -1;
                    try (InputStream in = c.getInputStream(); OutputStream out = new java.io.FileOutputStream(f)) {
                        byte[] buf = new byte[65536]; int n;
                        while ((n = in.read(buf)) > 0) {
                            out.write(buf, 0, n); got += n;
                            int pct = total > 0 ? (int) (got * 100 / total) : -1;
                            if (pct != lastPct && pct % 5 == 0) { lastPct = pct; apkProgress(id, pct); }
                        }
                    }
                    Uri uri = UpdateProvider.uriFor(MainActivity.this, f);
                    Intent i = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/vnd.android.package-archive")
                        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                    ui.post(() -> { try { startActivity(i); } catch (Exception e) { toast("Install failed"); } });
                    apkProgress(id, 100);
                } catch (Throwable t) { apkProgress(id, -1); }
            }).start();
        }

        private void apkProgress(String id, int pct) {
            js("window.onApkProgress&&onApkProgress(" + JSONObject.quote(id) + "," + pct + ")");
            if ("update".equals(id)) js("window.onUpdateProgress&&onUpdateProgress(" + pct + ")");
        }

        @JavascriptInterface
        public void openUri(String uri) {
            ui.post(() -> {
                try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(uri)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); }
                catch (Exception e) {
                    if (uri.startsWith("market://")) {
                        try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(uri.replace("market://", "https://play.google.com/store/apps/"))).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); return; }
                        catch (Exception ignored) {}
                    }
                    toast("Can't open");
                }
            });
        }

        @JavascriptInterface
        public void uninstallApp(String pkg) {
            ui.post(() -> {
                try { startActivity(new Intent(Intent.ACTION_DELETE, Uri.parse("package:" + pkg)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); }
                catch (Exception e) { toast("Can't uninstall"); }
            });
        }

        @JavascriptInterface
        public String pkgInfo(String pkg) {
            try {
                PackageInfo pi = getPackageManager().getPackageInfo(pkg, 0);
                JSONObject o = new JSONObject();
                o.put("vn", pi.versionName == null ? "" : pi.versionName);
                o.put("vc", pi.versionCode);
                o.put("on", pi.applicationInfo.enabled);
                return o.toString();
            } catch (Exception e) { return ""; }
        }

        /** Every package, including system ones and ones removed for this user (so they can be restored). */
        @JavascriptInterface
        public String listPackages() {
            JSONArray arr = new JSONArray();
            PackageManager pm = getPackageManager();
            List<PackageInfo> list = pm.getInstalledPackages(PackageManager.MATCH_UNINSTALLED_PACKAGES);
            for (PackageInfo pi : list) {
                try {
                    ApplicationInfo ai = pi.applicationInfo;
                    if (ai == null) continue;
                    JSONObject o = new JSONObject();
                    o.put("pkg", pi.packageName);
                    String label = pi.packageName;
                    try { label = ai.loadLabel(pm).toString(); } catch (Exception ignored) {}
                    o.put("name", label);
                    o.put("sys", (ai.flags & ApplicationInfo.FLAG_SYSTEM) != 0);
                    o.put("upd", (ai.flags & ApplicationInfo.FLAG_UPDATED_SYSTEM_APP) != 0);
                    o.put("inst", (ai.flags & ApplicationInfo.FLAG_INSTALLED) != 0);
                    o.put("on", ai.enabled);
                    o.put("vn", pi.versionName == null ? "" : pi.versionName);
                    o.put("size", new File(ai.sourceDir == null ? "/" : ai.sourceDir).length());
                    arr.put(o);
                } catch (Exception ignored) {}
            }
            return arr.toString();
        }

        // ---------- storage cleaner ----------
        @JavascriptInterface
        public boolean hasStorageAccess() {
            return android.os.Build.VERSION.SDK_INT < 23
                || checkSelfPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
        }

        @JavascriptInterface
        public void askStorageAccess() {
            ui.post(() -> {
                if (android.os.Build.VERSION.SDK_INT >= 23)
                    requestPermissions(new String[]{android.Manifest.permission.READ_EXTERNAL_STORAGE, android.Manifest.permission.WRITE_EXTERNAL_STORAGE}, 21);
            });
        }

        @JavascriptInterface
        public String storageInfo() {
            JSONObject o = new JSONObject();
            try {
                StatFs in = new StatFs(Environment.getDataDirectory().getPath());
                o.put("free", in.getAvailableBytes()); o.put("total", in.getTotalBytes());
                File ext = Environment.getExternalStorageDirectory();
                if (ext != null && ext.exists()) { StatFs ex = new StatFs(ext.getPath()); o.put("extFree", ex.getAvailableBytes()); o.put("extTotal", ex.getTotalBytes()); }
                o.put("ip", RemoteServer.localIp());
            } catch (Exception ignored) {}
            return o.toString();
        }

        /** Walks shared storage and reports cleanup candidates: {apk:[],big:[],tmp:[],empty:[]} each [path,size,mtime]. */
        @JavascriptInterface
        public void scanStorage(String id) {
            new Thread(() -> {
                try {
                    File root = Environment.getExternalStorageDirectory();
                    JSONArray apk = new JSONArray(), big = new JSONArray(), tmp = new JSONArray(), empty = new JSONArray();
                    int[] seen = {0};
                    walk(root, 0, apk, big, tmp, empty, seen);
                    JSONObject o = new JSONObject();
                    o.put("apk", apk); o.put("big", big); o.put("tmp", tmp); o.put("empty", empty); o.put("files", seen[0]);
                    callback(id, true, o.toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
            }).start();
        }

        private void walk(File dir, int depth, JSONArray apk, JSONArray big, JSONArray tmp, JSONArray empty, int[] seen) throws Exception {
            if (dir == null || depth > 8 || seen[0] > 60000) return;
            File[] kids = dir.listFiles();
            if (kids == null) return;
            if (kids.length == 0 && depth > 0) { empty.put(new JSONArray().put(dir.getAbsolutePath()).put(0L).put(dir.lastModified())); return; }
            for (File f : kids) {
                if (f.isDirectory()) {
                    String n = f.getName();
                    if (depth == 0 && n.equals("Android")) {
                        File data = new File(f, "data");   // other apps' external caches (readable on Android 7–10)
                        File[] apps = data.listFiles();
                        if (apps != null) for (File a : apps) {
                            File c = new File(a, "cache"); long sz = size(c, 0);
                            if (sz > 1024 * 1024) tmp.put(new JSONArray().put(c.getAbsolutePath()).put(sz).put(c.lastModified()));
                        }
                        continue;
                    }
                    if (n.equals(".thumbnails") || n.equalsIgnoreCase("cache") || n.equalsIgnoreCase(".cache") || n.equalsIgnoreCase("temp") || n.equalsIgnoreCase("tmp")) {
                        long sz = size(f, 0);
                        if (sz > 0) tmp.put(new JSONArray().put(f.getAbsolutePath()).put(sz).put(f.lastModified()));
                        continue;
                    }
                    walk(f, depth + 1, apk, big, tmp, empty, seen);
                } else {
                    seen[0]++;
                    String n = f.getName().toLowerCase(Locale.US);
                    long len = f.length();
                    JSONArray row = new JSONArray().put(f.getAbsolutePath()).put(len).put(f.lastModified());
                    if (n.endsWith(".apk") || n.endsWith(".xapk") || n.endsWith(".apks")) apk.put(row);
                    else if (n.endsWith(".tmp") || n.endsWith(".log") || n.endsWith(".temp") || n.endsWith(".part") || n.endsWith(".crdownload")) tmp.put(row);
                    else if (len > 100L * 1024 * 1024) big.put(row);
                }
            }
        }

        private long size(File f, int depth) {
            if (f == null || !f.exists() || depth > 12) return 0;
            if (f.isFile()) return f.length();
            long s = 0; File[] k = f.listFiles();
            if (k != null) for (File c : k) s += size(c, depth + 1);
            return s;
        }

        /** Deletes only paths inside shared storage; folders are removed recursively. Returns {n, bytes}. */
        @JavascriptInterface
        public String deleteFiles(String pathsJson) {
            JSONObject o = new JSONObject();
            long[] freed = {0}; int n = 0;
            try {
                String root = Environment.getExternalStorageDirectory().getCanonicalPath() + "/";
                JSONArray arr = new JSONArray(pathsJson);
                for (int i = 0; i < arr.length(); i++) {
                    File f = new File(arr.getString(i));
                    String cp = f.getCanonicalPath();
                    if (!cp.startsWith(root) || cp.equals(root) || cp.startsWith(root + "Android/obb")) continue;
                    if (f.isDirectory()) { long[] c = {0}; deleteTree(f, c); freed[0] += c[0]; n++; }
                    else { long len = f.length(); if (f.delete()) { freed[0] += len; n++; } }
                }
                o.put("n", n); o.put("bytes", freed[0]);
            } catch (Exception e) { try { o.put("error", String.valueOf(e.getMessage())); } catch (Exception ignored) {} }
            return o.toString();
        }

        private void deleteTree(File f, long[] c) {
            File[] k = f.listFiles();
            if (k != null) for (File x : k) { if (x.isDirectory()) deleteTree(x, c); else { long l = x.length(); if (x.delete()) c[0] += l; } }
            f.delete();
        }

        @JavascriptInterface
        public String memInfo() {
            ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
            ActivityManager.MemoryInfo mi = new ActivityManager.MemoryInfo();
            am.getMemoryInfo(mi);
            JSONObject o = new JSONObject();
            try { o.put("avail", mi.availMem); o.put("total", mi.totalMem); o.put("low", mi.lowMemory); } catch (Exception ignored) {}
            return o.toString();
        }

        /** Light self-clean: old cache files, old slideshow photos, stale icons, WebView RAM. Returns freed bytes. */
        @JavascriptInterface
        public long selfClean() {
            long[] n = {0};
            long dayAgo = System.currentTimeMillis() - 86400000L;
            File[] c = getCacheDir().listFiles();
            if (c != null) for (File f : c) if (f.lastModified() < dayAgo) deleteRec(f, n);
            trimDir(new File(getFilesDir(), "wall"), 40, n);
            trimDir(new File(getFilesDir(), "icons"), 400, n);
            ui.post(() -> { if (web != null) { web.freeMemory(); web.clearHistory(); } });
            System.gc();
            return n[0];
        }

        private void trimDir(File d, int keep, long[] n) {
            File[] fs = d.listFiles();
            if (fs == null || fs.length <= keep) return;
            java.util.Arrays.sort(fs, (a, b) -> Long.compare(b.lastModified(), a.lastModified()));
            for (int i = keep; i < fs.length; i++) { n[0] += fs[i].length(); fs[i].delete(); }
        }

        /** Stops background processes of other apps (what a non-root app is allowed to do). */
        @JavascriptInterface
        public int cleanRam() {
            ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
            int n = 0;
            for (ApplicationInfo ai : getPackageManager().getInstalledApplications(0)) {
                if (ai.packageName.equals(getPackageName())) continue;
                if ((ai.flags & ApplicationInfo.FLAG_SYSTEM) != 0 && (ai.flags & ApplicationInfo.FLAG_UPDATED_SYSTEM_APP) == 0) continue;
                try { am.killBackgroundProcesses(ai.packageName); n++; } catch (Exception ignored) {}
            }
            return n;
        }

        // ---------- Shizuku (shell rights without root) ----------
        @JavascriptInterface
        public String shizukuState() {
            try { getPackageManager().getPackageInfo("moe.shizuku.privileged.api", 0); }
            catch (Exception e) {
                try { if (!rikka.shizuku.Shizuku.pingBinder()) return "none"; } catch (Throwable t) { return "none"; }
            }
            try {
                if (!rikka.shizuku.Shizuku.pingBinder()) return "stopped";
                return rikka.shizuku.Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED ? "ok" : "denied";
            } catch (Throwable t) { return "stopped"; }
        }

        @JavascriptInterface
        public void shizukuRequest() {
            ui.post(() -> { try { rikka.shizuku.Shizuku.requestPermission(77); } catch (Throwable t) { toast("Shizuku not running"); } });
        }

        @JavascriptInterface
        public void openShizuku() {
            ui.post(() -> {
                Intent i = getPackageManager().getLaunchIntentForPackage("moe.shizuku.privileged.api");
                if (i == null) i = getPackageManager().getLeanbackLaunchIntentForPackage("moe.shizuku.privileged.api");
                if (i != null) { i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); startActivity(i); }
            });
        }


        // ---------- network ----------
        @JavascriptInterface
        public void fetchText(final String url, final String id) {
            new Thread(() -> {
                try { callback(id, true, readAll(url)); }
                catch (Throwable t) {
                    if (url != null && url.startsWith("https://")) {
                        try { callback(id, true, readAll("http://" + url.substring(8))); return; } catch (Throwable ignored) {}
                    }
                    callback(id, false, String.valueOf(t.getMessage()));
                }
            }).start();
        }

        @JavascriptInterface
        public void fetchEpg(final String url, final String id) {
            new Thread(() -> {
                try (InputStream in = open(url)) {
                    SimpleDateFormat z = new SimpleDateFormat("yyyyMMddHHmmss Z", Locale.US);
                    SimpleDateFormat pl = new SimpleDateFormat("yyyyMMddHHmmss", Locale.US);
                    long now = System.currentTimeMillis(), min = now - 7L * 86400000, max = now + 2L * 86400000;
                    org.xmlpull.v1.XmlPullParser x = android.util.Xml.newPullParser();
                    x.setInput(in, null);
                    JSONObject out = new JSONObject();
                    String ch = null; long st = 0, en = 0; boolean inTitle = false; String title = null;
                    // <channel id><display-name> aliases, so channels can also be matched by name
                    HashMap<String, ArrayList<String>> names = new HashMap<>(); String chDef = null; boolean inName = false;
                    for (int ev = x.getEventType(); ev != org.xmlpull.v1.XmlPullParser.END_DOCUMENT; ev = x.next()) {
                        if (ev == org.xmlpull.v1.XmlPullParser.START_TAG) {
                            String n = x.getName();
                            if ("programme".equals(n)) {
                                ch = x.getAttributeValue(null, "channel");
                                st = parse(String.valueOf(x.getAttributeValue(null, "start")), z, pl);
                                en = parse(String.valueOf(x.getAttributeValue(null, "stop")), z, pl);
                                title = null;
                            } else if ("title".equals(n) && ch != null && title == null) inTitle = true;
                            else if ("channel".equals(n)) chDef = x.getAttributeValue(null, "id");
                            else if ("display-name".equals(n) && chDef != null) inName = true;
                        } else if (ev == org.xmlpull.v1.XmlPullParser.TEXT && inName) {
                            ArrayList<String> l = names.get(chDef); if (l == null) { l = new ArrayList<>(); names.put(chDef, l); }
                            l.add(unescape(x.getText().trim())); inName = false;
                        } else if (ev == org.xmlpull.v1.XmlPullParser.TEXT && inTitle) {
                            title = x.getText(); inTitle = false;
                        } else if (ev == org.xmlpull.v1.XmlPullParser.END_TAG && "programme".equals(x.getName())) {
                            if (ch != null && en > min && st < max) {
                                JSONArray l = out.optJSONArray(ch); if (l == null) { l = new JSONArray(); out.put(ch, l); }
                                l.put(new JSONArray().put(st).put(en).put(title == null ? "" : unescape(title)));
                            }
                            ch = null;
                        }
                    }
                    for (Map.Entry<String, ArrayList<String>> e : names.entrySet()) {
                        JSONArray l = out.optJSONArray(e.getKey()); if (l == null) continue;
                        for (String nm : e.getValue()) if (nm.length() > 0 && !out.has(nm)) out.put(nm, l);
                    }
                    callback(id, true, out.toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
            }).start();
        }

        @JavascriptInterface
        public void checkStreams(final String urlsJson, final String id) {
            new Thread(() -> {
                try {
                    final JSONArray a = new JSONArray(urlsJson);
                    final int n = a.length();
                    final JSONObject out = new JSONObject();
                    final AtomicInteger done = new AtomicInteger();
                    ExecutorService pool = Executors.newFixedThreadPool(12);
                    for (int i = 0; i < n; i++) {
                        final String u = a.getString(i);
                        pool.execute(() -> {
                            boolean ok = probe(u);
                            synchronized (out) { try { out.put(u, ok); } catch (Exception ignored) {} }
                            int d = done.incrementAndGet();
                            if (d % 25 == 0 || d == n) js("window.onCheckProgress&&onCheckProgress(" + d + "," + n + ")");
                        });
                    }
                    pool.shutdown();
                    pool.awaitTermination(30, java.util.concurrent.TimeUnit.MINUTES);
                    callback(id, true, out.toString());
                } catch (Throwable t) { callback(id, false, String.valueOf(t.getMessage())); }
            }).start();
        }

        // ---------- backup ----------
        @JavascriptInterface
        public void exportBackup(final String json) {
            pendingExport = json;
            ui.post(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE)
                        .setType("application/json").putExtra(Intent.EXTRA_TITLE, "tvlauncher-backup.json");
                    startActivityForResult(i, REQ_EXPORT);
                } catch (Throwable t) {
                    try {
                        File f = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "tvlauncher-backup.json");
                        try (OutputStream o = new java.io.FileOutputStream(f)) { o.write(json.getBytes("UTF-8")); }
                        pendingExport = null;
                        js("window.onBackupDone&&onBackupDone(true)");
                    } catch (Throwable t2) { js("window.A&&A.toast('Error')"); }
                }
            });
        }

        @JavascriptInterface
        public void importBackup() {
            ui.post(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*");
                    startActivityForResult(i, REQ_IMPORT);
                } catch (Throwable t) {
                    try {
                        File f = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "tvlauncher-backup.json");
                        StringBuilder sb = new StringBuilder();
                        try (BufferedReader r = new BufferedReader(new InputStreamReader(new java.io.FileInputStream(f), "UTF-8"))) { String l; while ((l = r.readLine()) != null) sb.append(l).append('\n'); }
                        js("window.onBackupLoaded&&onBackupLoaded(" + JSONObject.quote(sb.toString()) + ")");
                    } catch (Throwable t2) { js("window.A&&A.toast('Error')"); }
                }
            });
        }

        // ---------- notification access ----------
        @JavascriptInterface
        public boolean notifAccess() {
            String s = Settings.Secure.getString(getContentResolver(), "enabled_notification_listeners");
            return s != null && s.contains(getPackageName());
        }

        @JavascriptInterface
        public void openNotifAccess() {
            ui.post(() -> {
                try { startActivity(new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); }
                catch (Throwable t) { Toast.makeText(MainActivity.this, "Not supported on this device", Toast.LENGTH_LONG).show(); }
            });
        }

        /** Runs a pm/am command through Shizuku; answers {code,out} via window.__cb. Only pm and am are allowed. */
        @JavascriptInterface
        public void shell(String cmd, String id) {
            new Thread(() -> {
                try {
                    String c = cmd == null ? "" : cmd.trim();
                    boolean anim = c.matches("settings put global (window_animation_scale|transition_animation_scale|animator_duration_scale) [0-9.]+");
                    if (!(c.startsWith("pm ") || c.startsWith("cmd package ") || c.startsWith("am ") || anim) || c.matches(".*[;&|`$><\\n].*"))
                        throw new Exception("command not allowed");
                    java.lang.reflect.Method m = rikka.shizuku.Shizuku.class.getDeclaredMethod("newProcess", String[].class, String[].class, String.class);
                    m.setAccessible(true);
                    Process p = (Process) m.invoke(null, new String[]{"sh", "-c", c}, null, null);
                    StringBuilder sb = new StringBuilder();
                    try (BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()))) { String line; while ((line = r.readLine()) != null) sb.append(line).append('\n'); }
                    try (BufferedReader r = new BufferedReader(new InputStreamReader(p.getErrorStream()))) { String line; while ((line = r.readLine()) != null) sb.append(line).append('\n'); }
                    int code = p.waitFor();
                    JSONObject o = new JSONObject(); o.put("code", code); o.put("out", sb.toString().trim());
                    callback(id, true, o.toString());
                } catch (Throwable t) {
                    Throwable cause = t instanceof java.lang.reflect.InvocationTargetException && t.getCause() != null ? t.getCause() : t;
                    callback(id, false, String.valueOf(cause.getMessage()));
                }
            }).start();
        }
    }

    private static String readAll(String url) throws Exception {
        try (InputStream in = open(url)) {
            ByteArrayOutputStream b = new ByteArrayOutputStream(); byte[] buf = new byte[16384]; int r;
            while ((r = in.read(buf)) > 0) b.write(buf, 0, r);
            return b.toString("UTF-8");
        }
    }

    private static boolean probe(String url) {
        HttpURLConnection c = null;
        try {
            c = (HttpURLConnection) new URL(url).openConnection();
            c.setConnectTimeout(6000); c.setReadTimeout(6000);
            c.setInstanceFollowRedirects(true);
            c.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android TV) TVLauncher");
            c.setRequestProperty("Range", "bytes=0-2047");
            int code = c.getResponseCode();
            if (code >= 400) return false;
            try (InputStream in = c.getInputStream()) { return in.read(new byte[512]) > 0; }
        } catch (Throwable t) { return false; }
        finally { if (c != null) c.disconnect(); }
    }

    private static long parse(String s, SimpleDateFormat withZone, SimpleDateFormat plain) {
        try { return withZone.parse(s.trim()).getTime(); }
        catch (Exception e) {
            try { return plain.parse(s.trim().substring(0, 14)).getTime(); } catch (Exception e2) { return 0; }
        }
    }

    private static String unescape(String s) {
        return s.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", "\"").replace("&apos;", "'");
    }
}
