package com.mahmoud.tvlauncher;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Opens the launcher when the box starts, so it can resume the last channel if the user turned that on. */
public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent i) {
        // always come up on this launcher after a restart (some boxes open their stock home first)
        boolean play = c.getSharedPreferences("launcher", 0).getBoolean("bootPlay", false);
        try {
            c.startActivity(new Intent(c, MainActivity.class).putExtra("fromBoot", play)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP));
        } catch (Throwable ignored) {}
    }
}
