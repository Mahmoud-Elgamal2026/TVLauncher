package com.mahmoud.tvlauncher;

import android.app.Notification;
import android.os.Bundle;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;

import org.json.JSONObject;

/** Forwards other apps' notifications to the launcher's on-screen banner (needs user-granted access). */
public class NotifService extends NotificationListenerService {
    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        try {
            if (sbn == null || sbn.isOngoing() || getPackageName().equals(sbn.getPackageName())) return;
            Notification n = sbn.getNotification();
            if (n == null) return;
            Bundle ex = n.extras;
            CharSequence title = ex == null ? null : ex.getCharSequence(Notification.EXTRA_TITLE);
            CharSequence text = ex == null ? null : ex.getCharSequence(Notification.EXTRA_TEXT);
            if (title == null && text == null) return;
            String app = sbn.getPackageName();
            try { app = getPackageManager().getApplicationLabel(getPackageManager().getApplicationInfo(app, 0)).toString(); }
            catch (Exception ignored) {}
            JSONObject o = new JSONObject();
            o.put("pkg", sbn.getPackageName());
            o.put("app", app);
            o.put("title", title == null ? "" : title.toString());
            o.put("text", text == null ? "" : text.toString());
            MainActivity a = MainActivity.instance;
            if (a != null) a.postNotif(o.toString());
        } catch (Throwable ignored) {}
    }
}
