package com.mahmoud.tvlauncher;

import android.inputmethodservice.InputMethodService;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputConnection;

/**
 * Invisible keyboard used only while typing from the phone: the launcher switches to it (through Shizuku),
 * writes the phone's text into whatever field is open in ANY app, then switches back to the normal keyboard.
 */
public class RemoteIME extends InputMethodService {
    static volatile RemoteIME inst;
    static volatile String pending; static volatile boolean pendingSubmit;

    @Override public void onCreate() { super.onCreate(); inst = this; }
    @Override public void onDestroy() { if (inst == this) inst = null; super.onDestroy(); }
    @Override public boolean onEvaluateInputViewShown() { return false; }
    @Override public boolean onEvaluateFullscreenMode() { return false; }
    @Override public View onCreateInputView() { return new View(this); }

    @Override public void onStartInput(EditorInfo info, boolean restarting) {
        super.onStartInput(info, restarting);
        String p = pending; if (p != null) { pending = null; write(p, pendingSubmit); }
    }

    /** Replaces the field's text with t (the phone always sends the whole text); submit = press the field's action / Enter. */
    boolean write(String t, boolean submit) {
        InputConnection ic = getCurrentInputConnection(); if (ic == null) return false;
        ic.beginBatchEdit();
        ic.performContextMenuAction(android.R.id.selectAll);
        ic.commitText(t == null ? "" : t, 1);
        ic.endBatchEdit();
        if (submit) {
            EditorInfo e = getCurrentInputEditorInfo();
            int act = e == null ? 0 : (e.imeOptions & EditorInfo.IME_MASK_ACTION);
            if (act != 0 && act != EditorInfo.IME_ACTION_NONE && act != EditorInfo.IME_ACTION_UNSPECIFIED) ic.performEditorAction(act);
            else { ic.sendKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_ENTER)); ic.sendKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_ENTER)); }
        }
        return true;
    }
}
