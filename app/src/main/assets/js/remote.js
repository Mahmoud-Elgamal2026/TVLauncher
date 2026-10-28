"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
Object.assign(DEF, { repo: "Mahmoud-Elgamal2026/TVLauncher", autoUpdate: true, guard: true, remoteOn: true });
const KEYMAP_REMOTE = { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", ok: "Enter", back: "GoBack" };
function pressKey(k) {
  idleAt = Date.now();
  if (k === "back") return window.onBack();
  if (k === "home") return runAction("home");
  if (k === "menu") {
    if (focused) openOptions(focused);
    return;
  }
  if (/^[0-9]$/.test(k)) return handleKey({ key: k, preventDefault() {
  } });
  const key = KEYMAP_REMOTE[k];
  if (!key) return;
  document.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
  if (key === "Enter") document.dispatchEvent(new KeyboardEvent("keyup", { key, bubbles: true }));
}
function remoteText(t, submit) {
  const el = document.activeElement && document.activeElement.tagName === "INPUT" ? document.activeElement : focused && focused.tagName === "INPUT" ? focused : null;
  if (el) {
    el.value = t;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    if (submit) {
      el.focus();
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    }
    return "input";
  }
  openSearch(t);
  return "search";
}
function remoteState() {
  return {
    profile: profile(),
    profiles: S.profiles.map((p) => ({ id: p.id, name: p.name, emoji: p.emoji, kids: !!p.kids })),
    kids: isKids(),
    lang: S.lang,
    lists: isKids() ? [] : S.lists.map((l) => l.type === "xtream" ? Object.assign({}, l, { pass: l.pass ? "••••" : "" }) : l),
    epg: isKids() ? "" : S.epg,
    city: S.city,
    favTeams: S.favTeams,
    adhanUrl: S.adhanUrl,
    favs: S.favs.map(byPkg).filter(Boolean).map((a) => ({ pkg: a.pkg, name: appName(a) })),
    apps: visibleApps().map((a) => ({ pkg: a.pkg, name: appName(a), fav: S.favs.includes(a.pkg) })),
    watch: S.watch.map((w) => ({ key: w.key, name: w.name, type: w.type, url: w.url, pkg: w.pkg, pct: w.dur ? Math.round(w.pos / w.dur * 100) : 0 })),
    favCh: S.favCh.filter(chAllowed).map((c) => ({ url: c.url, name: c.name, no: c.no })),
    last: S.lastCh ? { url: S.lastCh.url, name: S.lastCh.name } : null,
    playing: on("player") && playing ? { name: playing.name, no: playing.no } : null,
    page: (document.querySelector(".page.on") || {}).id
  };
}
const KID_SAFE = /* @__PURE__ */ new Set(["state", "key", "text", "launch", "play", "action", "volume", "profile", "search"]);
function remoteCmd(m) {
  if (isKids() && !KID_SAFE.has(m.cmd) && m.pin !== S.pin) return { error: "kids" };
  switch (m.cmd) {
    case "state":
      return remoteState();
    case "key":
      pressKey(String(m.k));
      return { ok: 1 };
    case "text":
      return { ok: 1, to: remoteText(String(m.t || ""), !!m.submit) };
    case "search":
      openSearch(String(m.t || ""));
      return { ok: 1 };
    case "launch":
      if (on("frame")) stopFrame();
      if (on("player")) stopPlayer();
      launch(String(m.pkg));
      return { ok: 1 };
    case "play":
      if (on("frame")) stopFrame();
      playUrl(String(m.url));
      return { ok: 1 };
    case "action":
      runAction(String(m.a));
      return { ok: 1 };
    case "volume":
      A.volume(m.d);
      return { ok: 1 };
    case "profile": {
      const p = S.profiles.find((x) => x.id === m.id);
      if (!p) return { error: "profile" };
      if (isKids() && S.pin && m.pin !== S.pin) return { error: "pin" };
      unlockedUntil = Date.now() + 6e4;
      switchProfile(p.id);
      return { ok: 1 };
    }
    case "set": {
      const allowed = ["epg", "city", "favTeams", "adhanUrl", "repo", "tgToken"];
      if (m.k === "tgToken") {
        S.tgToken = String(m.v || "").trim();
        S.tgChat = "";
        if (typeof tgInit === "function") tgInit();
        if (document.querySelector("#settings.on")) renderSettings();
        banner("🤖", "Telegram", L("saved"), 4e3);
        return { ok: 1 };
      }
      if (!allowed.includes(m.k)) return { error: "key" };
      S[m.k] = String(m.v || "").trim();
      if (m.k === "epg") loadEpg();
      if (m.k === "city") {
        S.loc = null;
        weather();
      }
      renderSettings();
      return { ok: 1 };
    }
    case "lists": {
      if (!Array.isArray(m.lists)) return { error: "lists" };
      const prev = S.lists;
      m.lists.forEach((l) => {
        if (l && l.type === "xtream" && l.pass === "••••") {
          const o = prev.find((x) => x.type === "xtream" && x.server === l.server && x.user === l.user);
          if (o) l.pass = o.pass;
        }
      });
      S.lists = m.lists.filter((l) => l && (l.url || l.server)).map((l) => l.type === "xtream" ? { type: "xtream", name: String(l.name || "Xtream").slice(0, 40), server: String(l.server).trim(), user: String(l.user || ""), pass: String(l.pass || "") } : { name: String(l.name || "IPTV").slice(0, 40), url: String(l.url).trim() });
      loadLists().then(loadEpg);
      renderSettings();
      return { ok: 1 };
    }
    case "favs": {
      if (!Array.isArray(m.order)) return { error: "favs" };
      S.favs = m.order.filter((p) => typeof p === "string" && byPkg(p));
      renderHome();
      return { ok: 1 };
    }
    case "fav":
      toggleList("favs", String(m.pkg));
      renderHome();
      return { ok: 1 };
    case "watchRemove":
      watchRemove(String(m.key));
      return { ok: 1 };
  }
  return { error: "cmd" };
}
window.onRemote = (id, json) => {
  let res;
  try {
    res = remoteCmd(JSON.parse(json));
  } catch (e) {
    res = { error: String(e.message || e) };
  }
  nat("remoteReply", id, JSON.stringify(res));
};
function remoteInfo() {
  try {
    return JSON.parse(nat("remoteInfo") || "{}");
  } catch (e) {
    return {};
  }
}
function remoteUrl() {
  const r = remoteInfo();
  return r.ip ? `http://${r.ip}:${r.port}/?k=${r.code}` : "";
}
function qrSvg(text, px) {
  if (!window.qrcode || !text) return "";
  try {
    const q = qrcode(0, "M");
    q.addData(text);
    q.make();
    return q.createSvgTag({ cellSize: Math.max(2, Math.floor(px / (q.getModuleCount() + 8))), margin: 4, scalable: false });
  } catch (e) {
    return "";
  }
}
function phoneDialog() {
  const r = remoteInfo(), url = remoteUrl();
  const html = url ? `<div style="display:flex;align-items:center;justify-content:center"><div style="background:#fff;padding:1.2vh;border-radius:1.4vh;line-height:0;margin:0 1.2vw">${qrSvg(url, 260) || ""}</div>
    <div style="font-size:2vh;line-height:1.9;margin:0 1.2vw"><div>${L("phoneStep1")}</div><div>${L("phoneStep2")}</div><div dir="ltr" style="font-weight:700;font-size:2.4vh">${esc(url.replace(/\?k=.*/, ""))}</div><div>${L("phoneCode")}: <b style="font-size:3vh;letter-spacing:.2em">${esc(r.code)}</b></div></div></div>` : `<div class="sub">${L("phoneNoNet")}</div>`;
  dialog("📱 " + L("phoneTitle"), [{ label: L("done"), fn: () => {
  } }], { html: html + `<div class="dlist" style="margin-top:1vh"><button class="btn pri f" data-di="0">${L("done")}</button></div>` });
}
function checkUpdates(manual) {
  return __async(this, null, function* () {
    if (!NA) {
      if (manual) A.toast(L("updNone"));
      return;
    }
    if (!S.repo) {
      if (manual) A.toast(L("updNoRepo"));
      return;
    }
    try {
      const r = JSON.parse(yield natAsync("checkUpdate", S.repo));
      store.set("lastUpdCheck", Date.now());
      if (r.latest > r.current && r.url) {
        const go = () => {
          banner("⬇️", L("updDownloading"), r.tag);
          nat("installUpdate", r.url);
        };
        if (manual) dialog(`⬆️ ${L("updAvail")} ${r.tag}`, [{ label: L("updInstall"), pri: 1, fn: go }, { label: L("later"), fn: () => {
        } }], { sub: (r.notes || "").slice(0, 200) });
        else banner("⬆️", `${L("updAvail")} ${r.tag}`, L("updHint"), 12e3);
        window._pendingUpdate = r;
      } else if (manual) A.toast(L("updNone") + ` (v${r.current})`);
    } catch (e) {
      if (manual) A.toast(L("loadErr") + ": " + e.message);
    }
  });
}
window.onUpdateProgress = (p) => {
  if (p === -2) banner("🔐", L("updPerm"), L("updPermSub"), 12e3);
  else if (p === -1) banner("⚠️", L("loadErr"));
  else if (p === 100) banner("✅", L("updReady"));
  else if (p % 25 === 0 && p > 0) banner("⬇️", L("updDownloading"), p + "%", 2500);
};
setInterval(() => {
  if (S.autoUpdate && Date.now() - store.get("lastUpdCheck", 0) > 12 * 36e5) checkUpdates(false);
}, 10 * 6e4);
const _setSleep = setSleep;
setSleep = function(m) {
  _setSleep(m);
  if (!m) return;
  clearTimeout(sleepT);
  sleepT = setTimeout(() => {
    sleepAt = 0;
    if (on("player")) stopPlayer();
    if (!nat("sleepNow")) $("blackout").classList.add("on");
    updateTicker();
  }, m * 6e4);
};
window.phaseFourSettings = function() {
  const r = remoteInfo(), url = remoteUrl(), guardOk = !!nat("guardService"), ver = nat("versionName") || "preview";
  return sec(
    L("sPhone"),
    field(L("phoneTitle"), seg("remoteOn", [[1, L("on")], [0, L("off")]]).replace(/<\/div>$/, `<button class="btn f" id="showQr">📱 ${L("showQr")}</button><button class="btn f" id="newCode">🔄 ${L("newCode")}</button></div>`)) + (url ? field("", `<div class="inline"><span class="btn sm" dir="ltr">${esc(url.replace(/\?k=.*/, ""))}</span><span class="btn sm">${L("phoneCode")}: <b>${esc(r.code)}</b></span></div>`) : "")
  ) + sec(
    L("sGuard"),
    field(L("guardDesc"), `<div class="inline"><button class="btn f${guardOk ? "" : " pri"}" id="openGuard">${guardOk ? "✅ " + L("guardOn") : "🔓 " + L("guardEnable")}</button></div>`) + field(L("guardHome"), seg("guard", [[1, L("on")], [0, L("off")]]))
  ) + sec(
    L("sUpdate"),
    field(`${L("updCurrent")}: ${ver}`, inputRow("repoInp", S.repo, "username/TVLauncher", "repoSave")) + field("", seg("autoUpdate", [[1, L("updAuto")], [0, L("updManual")]]).replace(/<\/div>$/, `<button class="btn pri f" id="checkUpd">🔎 ${L("updCheck")}</button></div>`))
  );
};
AFTER.remoteOn = () => nat("setRemote", !!S.remoteOn);
AFTER.guard = () => nat("setGuard", !!S.guard);
activators.push((el) => {
  switch (el.id) {
    case "showQr":
      phoneDialog();
      return true;
    case "newCode":
      nat("newRemoteCode");
      renderSettings();
      A.toast(L("saved"));
      return true;
    case "openGuard":
      nat("openAccessibility");
      return true;
    case "repoSave":
      S.repo = ($("repoInp").value || "").trim().replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "");
      renderSettings();
      checkUpdates(true);
      return true;
    case "checkUpd":
      checkUpdates(true);
      return true;
  }
  return false;
});
const _quick = quickSettings;
quickSettings = function() {
  _quick();
  const items = $("dbox")._items;
  if (!items || isKids()) return;
  items.splice(4, 0, { icon: "📱", label: L("phoneTitle"), fn: () => setTimeout(phoneDialog, 30) });
  const g = $("dbox").querySelector(".mgrid");
  if (!g) return;
  g.innerHTML = items.map((it, i) => `<button class="btn f${it.pri ? " pri" : ""}" data-di="${i}">${it.icon ? `<b>${esc(it.icon)}</b>` : ""}${esc(it.label)}</button>`).join("");
  focus(g.querySelector(".f"));
};
setTimeout(() => {
  if (S.autoUpdate && Date.now() - store.get("lastUpdCheck", 0) > 12 * 36e5) checkUpdates(false);
}, 3e4);
