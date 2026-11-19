package com.mahmoud.tvlauncher;

import android.accessibilityservice.AccessibilityService;
import android.os.Bundle;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;

/**
 * Typing from the phone into ANY app without Shizuku: once turned on in Accessibility settings (it stays on after a restart),
 * this service writes the phone's text into the field that has focus in the app in front.
 */
public class RemoteA11y extends AccessibilityService {
    static volatile RemoteA11y inst;

    @Override protected void onServiceConnected() { super.onServiceConnected(); inst = this; }
    @Override public void onDestroy() { if (inst == this) inst = null; super.onDestroy(); }
    @Override public boolean onUnbind(android.content.Intent i) { if (inst == this) inst = null; return super.onUnbind(i); }
    @Override public void onAccessibilityEvent(AccessibilityEvent e) {}
    @Override public void onInterrupt() {}

    private AccessibilityNodeInfo field() {
        AccessibilityNodeInfo root = getRootInActiveWindow(); if (root == null) return null;
        AccessibilityNodeInfo f = root.findFocus(AccessibilityNodeInfo.FOCUS_INPUT);
        if (f != null && f.isEditable()) return f;
        f = root.findFocus(AccessibilityNodeInfo.FOCUS_ACCESSIBILITY);
        if (f != null && f.isEditable()) return f;
        return firstEditable(root, 0);
    }
    private AccessibilityNodeInfo firstEditable(AccessibilityNodeInfo n, int depth) {
        if (n == null || depth > 25) return null; if (n.isEditable() && n.isVisibleToUser()) return n;
        for (int i = 0; i < n.getChildCount(); i++) { AccessibilityNodeInfo c = firstEditable(n.getChild(i), depth + 1); if (c != null) return c; }
        return null;
    }

    /** true = written; false = no text field found in the app in front */
    boolean write(String t, boolean submit) {
        AccessibilityNodeInfo f = field(); if (f == null) return false;
        Bundle b = new Bundle(); b.putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, t == null ? "" : t);
        f.performAction(AccessibilityNodeInfo.ACTION_FOCUS);
        boolean ok = f.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, b);
        // (Accessibility can't press Enter for another app: after the text arrives, OK on the remote / Enter on the screen keyboard searches)
        return ok;
    }
}
