package com.mahmoud.tvlauncher;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import java.util.Calendar;

/** Fires at the user's morning time: opens the launcher with the screen on, then re-arms for tomorrow. Also re-armed after a reboot. */
public class WakeReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent i) {
        String at = c.getSharedPreferences("launcher", 0).getString("wakeAt", "");
        if (at == null || at.isEmpty()) return;
        if (!Intent.ACTION_BOOT_COMPLETED.equals(i.getAction())) {
            try { c.startActivity(new Intent(c, MainActivity.class).putExtra("wake", true).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP)); } catch (Throwable ignored) {}
        }
        arm(c, at);
    }

    static void arm(Context c, String hhmm) {
        String[] p = hhmm.split(":");
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, Integer.parseInt(p[0])); cal.set(Calendar.MINUTE, Integer.parseInt(p[1])); cal.set(Calendar.SECOND, 0); cal.set(Calendar.MILLISECOND, 0);
        if (cal.getTimeInMillis() <= System.currentTimeMillis() + 5000) cal.add(Calendar.DAY_OF_MONTH, 1);
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        int fl = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0);
        PendingIntent pi = PendingIntent.getBroadcast(c, 77, new Intent(c, WakeReceiver.class), fl);
        if (Build.VERSION.SDK_INT >= 31 && !am.canScheduleExactAlarms()) am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), pi);
        else am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, cal.getTimeInMillis(), pi);
    }
}
