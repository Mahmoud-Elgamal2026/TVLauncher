package com.mahmoud.tvlauncher;

import android.accessibilityservice.AccessibilityService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.Build;
import android.view.KeyEvent;
import android.view.accessibility.AccessibilityEvent;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Optional helper the user turns on in Accessibility settings:
 *  - brings this launcher back when the box opens its stock home screen,
 *  - runs mapped remote buttons even while another app is open,
 *  - lets the sleep timer put the device to sleep.
 */
public class HomeGuardService extends AccessibilityService {
    static HomeGuardService instance;
    private final Set<String> otherHomes = new HashSet<>();
    private long lastJump = 0;
    private SharedPreferences prefs;

    @Override
    protected void onServiceConnected() {
        instance = this;
        prefs = getSharedPreferences("launcher", MODE_PRIVATE);
        refreshHomes();
    }

    @Override
    public void onDestroy() { if (instance == this) instance = null; super.onDestroy(); }

    void refreshHomes() {
        otherHomes.clear();
        try {
            PackageManager pm = getPackageManager();
            List<ResolveInfo> l = pm.queryIntentActivities(new Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_HOME), 0);
            for (ResolveInfo r : l) {
                String p = r.activityInfo.packageName;
                if (!p.equals(getPackageName()) && !p.equals("com.android.settings") && !p.contains("fallbackhome")) otherHomes.add(p);
            }
        } catch (Exception ignored) {}
        otherHomes.add("com.google.android.tvlauncher");
        otherHomes.add("com.google.android.apps.tv.launcherx");
        otherHomes.add("com.google.android.leanbacklauncher");
        otherHomes.add("com.mitv.tvhome");
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent e) {
        if (e == null || e.getEventType() != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED || e.getPackageName() == null) return;
        if (prefs == null || !prefs.getBoolean("guard", true)) return;
        String pkg = e.getPackageName().toString();
        if (!otherHomes.contains(pkg)) return;
        long now = System.currentTimeMillis();
        if (now - lastJump < 1500) return;
        lastJump = now;
        openLauncher(null);
    }

    private void openLauncher(String action) {
        Intent i = new Intent(this, MainActivity.class)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_REORDER_TO_FRONT | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        if (action != null) i.putExtra("action", action);
        try { startActivity(i); } catch (Exception ignored) {}
    }

    /** Mapped buttons while another app is in front (inside the launcher the activity handles them). */
    @Override
    protected boolean onKeyEvent(KeyEvent e) {
        if (prefs == null || MainActivity.inFront) return false;
        String action = prefs.getString("key_" + e.getKeyCode(), null);
        if (action == null) return false;
        if (e.getAction() == KeyEvent.ACTION_UP) {
            if (action.startsWith("app:")) {
                Intent i = getPackageManager().getLeanbackLaunchIntentForPackage(action.substring(4));
                if (i == null) i = getPackageManager().getLaunchIntentForPackage(action.substring(4));
                if (i != null) { i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); try { startActivity(i); } catch (Exception ignored) {} }
            } else openLauncher(action);
        }
        return true;
    }

    boolean sleepDevice() {
        if (Build.VERSION.SDK_INT >= 28) return performGlobalAction(GLOBAL_ACTION_LOCK_SCREEN);
        return false;
    }

    @Override
    public void onInterrupt() {}
}
