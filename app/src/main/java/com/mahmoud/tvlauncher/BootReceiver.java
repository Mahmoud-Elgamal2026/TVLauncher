package com.mahmoud.tvlauncher;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Opens the launcher when the box starts, so it can resume the last channel if the user turned that on. */
public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent i) {
        if (!c.getSharedPreferences("launcher", 0).getBoolean("bootPlay", false)) return;
        try {
            c.startActivity(new Intent(c, MainActivity.class).putExtra("fromBoot", true)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP));
        } catch (Throwable ignored) {}
    }
}
