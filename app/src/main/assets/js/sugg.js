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
Object.assign(DEF, { qLast: "", autoSleepMin: 60, adhanOn: true });
Object.assign(T.ar, {
  libCont: "⏯ كمّل من حيث وقفت",
  qLastR: "⭐ آخر قارئ سمعته",
  hwWird: "ورد اليوم",
  autoSleep: "قفل تلقائي لو مفيش استخدام",
  min_: "دقيقة",
  asOff: "إيقاف",
  usbBk: "نسخة احتياطية على الفلاشة",
  usbSave: "احفظ على الفلاشة",
  usbLoad: "رجّع من الفلاشة",
  usbNone: "مفيش فلاشة متوصلة",
  usbSaved: "اتحفظت على الفلاشة",
  usbLoaded: "اترجعت الإعدادات",
  usbNoFile: "مفيش نسخة على الفلاشة",
  sleepIdle: "البوكس هيقفل بعد دقيقة لعدم الاستخدام — دوس أي زرار للإلغاء",
  adhanVid: "الأذان — الفيديو اتوقف مؤقتاً"
});
Object.assign(T.en, {
  libCont: "⏯ Continue where you stopped",
  qLastR: "⭐ Last reciter",
  hwWird: "Daily wird",
  autoSleep: "Auto sleep when idle",
  min_: "min",
  asOff: "Off",
  usbBk: "Backup to USB stick",
  usbSave: "Save to USB",
  usbLoad: "Restore from USB",
  usbNone: "No USB stick connected",
  usbSaved: "Saved to USB",
  usbLoaded: "Settings restored",
  usbNoFile: "No backup on the USB stick",
  sleepIdle: "Box sleeps in 1 minute (idle) — press any key to cancel",
  adhanVid: "Adhan — video paused"
});
const _renderLibS = renderLib;
renderLib = function() {
  return __async(this, arguments, function* () {
    yield _renderLibS.apply(this, arguments);
    const cont = (S.watch || []).filter((w) => w.url && /archive\.org|mp3quran\.net/.test(w.url)).slice(0, 12);
    if (!cont.length) return;
    const h = `<h3 class="sph">${esc(L("libCont"))}</h3><div class="lbgrid">${cont.map((w) => libCard({ attr: `data-libres="${esc(w.key)}"`, img: w.logo || "", icon: "⏯", title: w.name, sub: w.dur ? fmtDur(w.pos) + " / " + fmtDur(w.dur) : "" })).join("")}</div>`;
    $("libMain").insertAdjacentHTML("afterbegin", h);
  });
};
activators.unshift((el) => {
  if (el.dataset && el.dataset.libres) {
    const w = S.watch.find((x) => x.key === el.dataset.libres);
    if (w) play({ name: w.name, url: w.url, logo: w.logo, kind: w.kind || "movie" });
    return true;
  }
  if (el.dataset && el.dataset.reciter) S.qLast = el.dataset.reciter;
  return false;
});
const _quranRecS = quranReciters;
quranReciters = function() {
  return __async(this, arguments, function* () {
    yield _quranRecS.apply(this, arguments);
    const r = (qReciters || []).find((x) => String(x.id) === String(S.qLast));
    if (!r) return;
    $("libMain").insertAdjacentHTML("afterbegin", `<h3 class="sph">${esc(L("qLastR"))}</h3><div class="lbgrid small">${libCard({ attr: `data-reciter="${r.id}"`, icon: "⭐", title: r.name, sub: r.moshaf[0].name })}</div>`);
  });
};
const ADHAN_DEF = "https://www.islamcan.com/audio/adhan/azan2.mp3";
playAdhan = function() {
  const v = on("player") ? document.querySelector("#player video,video") : null, wasPlaying = v && !v.paused;
  if (wasPlaying) {
    v.pause();
    banner("🕌", L("adhanVid"), "", 8e3);
  }
  try {
    if (adhanAudio) adhanAudio.pause();
    adhanAudio = new Audio(S.adhanUrl || ADHAN_DEF);
    const back = () => {
      if (wasPlaying && v) v.play().catch(() => {
      });
    };
    adhanAudio.onended = back;
    adhanAudio.onerror = () => {
      chime();
      setTimeout(back, 3e3);
    };
    adhanAudio.play().catch(() => {
      chime();
      setTimeout(back, 3e3);
    });
  } catch (e) {
    chime();
  }
};
window.playAdhan = playAdhan;
HW_TYPES.push(["wird", "📖", "hwWird"]);
const HADITH = ["«إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى»", "«الكلمة الطيبة صدقة»", "«خيركم من تعلّم القرآن وعلّمه»", "«تبسمك في وجه أخيك صدقة»", "«من كان يؤمن بالله واليوم الآخر فليقل خيرًا أو ليصمت»", "«أحب الأعمال إلى الله أدومها وإن قلّ»", "«لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه»"];
let wird = null;
function loadWird() {
  return __async(this, null, function* () {
    const day = Math.floor(Date.now() / 864e5);
    if (S.wird && S.wird.day === day) {
      wird = S.wird;
      return;
    }
    try {
      const n = day * 7919 % 6236 + 1, r = yield A.fetchJSON("https://api.alquran.cloud/v1/ayah/" + n + "/ar");
      wird = { day, text: r.data.text, ref: "سورة " + r.data.surah.name.replace(/^سُورَةُ\s*/, "") + " · " + r.data.numberInSurah };
    } catch (e) {
      wird = { day, text: HADITH[day % HADITH.length], ref: "حديث شريف" };
    }
    S.wird = wird;
    renderHW();
  });
}
const _hwBodyS = hwBody;
hwBody = function(w) {
  if (w.t !== "wird") return _hwBodyS(w);
  if (!wird) {
    if (!S.wird || S.wird.day !== Math.floor(Date.now() / 864e5)) loadWird();
    else wird = S.wird;
  }
  return wird ? `<div class="hwzk">${esc(wird.text)}</div><div class="hwsub dim">${esc(wird.ref)}</div>` : `<div class="hwico">📖</div>`;
};
let idleWarned = false;
setInterval(() => {
  const m = +S.autoSleepMin || 0;
  if (!m || $("blackout").classList.contains("on")) {
    idleWarned = false;
    return;
  }
  const idle = (Date.now() - idleAt) / 6e4, limit = on("player") ? Math.max(m, 180) : m;
  if (idle >= limit - 1 && !idleWarned) {
    idleWarned = true;
    banner("😴", L("sleepIdle"), "", 55e3);
  }
  if (idle >= limit) {
    idleWarned = false;
    if (on("player")) stopPlayer();
    $("blackout").classList.add("on");
    if (typeof updateTicker === "function") updateTicker();
  }
  if (idle < limit - 1) idleWarned = false;
}, 3e4);
function usbRoot() {
  try {
    return JSON.parse(nat("storageRoots") || "[]").find((r) => r.label === "usb");
  } catch (e) {
    return null;
  }
}
function usbSave() {
  const r = usbRoot();
  if (!r) return A.toast(L("usbNone"));
  const o = { app: "tvlauncher", v: 2, data: {} };
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    o.data[k] = localStorage.getItem(k);
  }
  const ok = nat("writeText", r.path + "/tvlauncher-backup.json", JSON.stringify(o));
  A.toast(ok ? L("usbSaved") + " ✅" : "Error");
}
function usbLoad() {
  const r = usbRoot();
  if (!r) return A.toast(L("usbNone"));
  const t = nat("readText", r.path + "/tvlauncher-backup.json");
  if (!t) return A.toast(L("usbNoFile"));
  if (window.onBackupLoaded) {
    onBackupLoaded(t);
    A.toast(L("usbLoaded"));
  }
}
activators.push((el) => {
  if (el.id === "usbSaveBtn") {
    usbSave();
    return true;
  }
  if (el.id === "usbLoadBtn") {
    usbLoad();
    return true;
  }
  return false;
});
const _lifeSetSg = window.lifeSettings;
window.lifeSettings = function() {
  return sec("😴 " + L("autoSleep"), field("", seg("autoSleepMin", [[0, L("asOff")], [30, "30 " + L("min_")], [60, "60 " + L("min_")], [120, "120 " + L("min_")]]))) + sec("💾 " + L("usbBk"), field("", `<div class="inline"><button class="btn f" id="usbSaveBtn">${esc(L("usbSave"))}</button><button class="btn f" id="usbLoadBtn">${esc(L("usbLoad"))}</button></div>`)) + (_lifeSetSg ? _lifeSetSg() : "");
};
