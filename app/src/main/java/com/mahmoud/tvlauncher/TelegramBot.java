package com.mahmoud.tvlauncher;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Long-polls the Telegram Bot API and hands every message to the launcher (window.onTg).
 * Who may control the box (pairing, owner chat) is decided in JS; this class only relays.
 */
class TelegramBot {
    interface Sink { void onMessage(long chat, String from, String text); }

    private final String token;
    private final Sink sink;
    private volatile boolean running;
    private long offset = 0;

    TelegramBot(String token, Sink sink) { this.token = token; this.sink = sink; }

    void start() {
        running = true;
        new Thread(() -> {
            int backoff = 2000;
            while (running) {
                try {
                    JSONObject r = new JSONObject(get("getUpdates?timeout=50&offset=" + offset, 65000));
                    JSONArray res = r.optJSONArray("result");
                    if (res != null) for (int i = 0; i < res.length(); i++) {
                        JSONObject u = res.getJSONObject(i);
                        offset = u.getLong("update_id") + 1;
                        JSONObject m = u.optJSONObject("message");
                        if (m == null) {
                            JSONObject cq = u.optJSONObject("callback_query");
                            if (cq != null) {
                                post("answerCallbackQuery", new JSONObject().put("callback_query_id", cq.getString("id")));
                                JSONObject cm = cq.optJSONObject("message");
                                if (cm != null) sink.onMessage(cm.getJSONObject("chat").getLong("id"), name(cq.optJSONObject("from")), cq.optString("data"));
                            }
                            continue;
                        }
                        JSONObject doc = m.optJSONObject("document");
                        if (doc != null) { sink.onMessage(m.getJSONObject("chat").getLong("id"), name(m.optJSONObject("from")), "__doc:" + doc.optString("file_id") + ":" + doc.optString("file_name")); continue; }
                        String text = m.optString("text", "");
                        if (!text.isEmpty()) sink.onMessage(m.getJSONObject("chat").getLong("id"), name(m.optJSONObject("from")), text);
                    }
                    backoff = 2000;
                } catch (Throwable t) {
                    try { Thread.sleep(backoff); } catch (InterruptedException e) { return; }
                    backoff = Math.min(backoff * 2, 60000);
                }
            }
        }, "telegram").start();
    }

    void stop() { running = false; }

    /** buttons: JSON array of rows of [label, data] pairs, or null. */
    void send(long chat, String text, String buttons) {
        new Thread(() -> {
            try {
                JSONObject o = new JSONObject().put("chat_id", chat).put("text", text);
                if (buttons != null && !buttons.isEmpty()) {
                    JSONArray rows = new JSONArray(buttons), kb = new JSONArray();
                    for (int i = 0; i < rows.length(); i++) {
                        JSONArray row = rows.getJSONArray(i), r = new JSONArray();
                        for (int k = 0; k < row.length(); k++) { JSONArray b = row.getJSONArray(k); r.put(new JSONObject().put("text", b.getString(0)).put("callback_data", b.getString(1))); }
                        kb.put(r);
                    }
                    o.put("reply_markup", new JSONObject().put("inline_keyboard", kb));
                }
                post("sendMessage", o);
            } catch (Throwable ignored) {}
        }).start();
    }

    /** Sends a small text file (e.g. the settings backup) as a document. */
    void sendDocument(long chat, String fileName, String content, String caption) {
        new Thread(() -> {
            try {
                String b = "----tvl" + System.currentTimeMillis();
                HttpURLConnection c = (HttpURLConnection) new URL("https://api.telegram.org/bot" + token + "/sendDocument").openConnection();
                c.setConnectTimeout(15000); c.setReadTimeout(30000); c.setDoOutput(true);
                c.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + b);
                try (OutputStream o = c.getOutputStream()) {
                    String head = "--" + b + "\r\nContent-Disposition: form-data; name=\"chat_id\"\r\n\r\n" + chat + "\r\n"
                        + "--" + b + "\r\nContent-Disposition: form-data; name=\"caption\"\r\n\r\n" + caption + "\r\n"
                        + "--" + b + "\r\nContent-Disposition: form-data; name=\"document\"; filename=\"" + fileName + "\"\r\nContent-Type: application/json\r\n\r\n";
                    o.write(head.getBytes("UTF-8")); o.write(content.getBytes("UTF-8")); o.write(("\r\n--" + b + "--\r\n").getBytes("UTF-8"));
                }
                read(c);
            } catch (Throwable ignored) {}
        }).start();
    }

    /** Downloads a file the user sent to the bot (used to restore a backup). */
    String download(String fileId) throws Exception {
        JSONObject r = new JSONObject(get("getFile?file_id=" + fileId, 20000)).getJSONObject("result");
        HttpURLConnection c = (HttpURLConnection) new URL("https://api.telegram.org/file/bot" + token + "/" + r.getString("file_path")).openConnection();
        c.setConnectTimeout(15000); c.setReadTimeout(30000);
        return read(c);
    }

    private static String name(JSONObject f) { return f == null ? "" : f.optString("first_name", f.optString("username", "")); }

    private String get(String method, int timeout) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL("https://api.telegram.org/bot" + token + "/" + method).openConnection();
        c.setConnectTimeout(15000); c.setReadTimeout(timeout);
        return read(c);
    }

    private void post(String method, JSONObject body) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL("https://api.telegram.org/bot" + token + "/" + method).openConnection();
        c.setConnectTimeout(15000); c.setReadTimeout(20000); c.setDoOutput(true);
        c.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        try (OutputStream o = c.getOutputStream()) { o.write(body.toString().getBytes("UTF-8")); }
        read(c);
    }

    private static String read(HttpURLConnection c) throws Exception {
        InputStream in = c.getResponseCode() < 400 ? c.getInputStream() : c.getErrorStream();
        ByteArrayOutputStream b = new ByteArrayOutputStream(); byte[] buf = new byte[8192]; int n;
        try (InputStream i = in) { if (i != null) while ((n = i.read(buf)) > 0) b.write(buf, 0, n); }
        return b.toString("UTF-8");
    }
}
