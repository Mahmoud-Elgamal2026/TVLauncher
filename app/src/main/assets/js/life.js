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
Object.assign(DEF, { hijri: true, hijriAdj: 0, ramadan: "auto", radio: null });
function hijriParts(d) {
  d = new Date(d.getTime() + (+S.hijriAdj || 0) * 864e5);
  for (const cal of ["islamic-umalqura", "islamic"]) {
    try {
      const loc = (S.lang === "ar" ? "ar-EG" : "en") + "-u-ca-" + cal + "-nu-latn";
      const txt = new Intl.DateTimeFormat(loc, { day: "numeric", month: "long", year: "numeric" }).format(d);
      const m = +new Intl.DateTimeFormat("en-u-ca-" + cal + "-nu-latn", { month: "numeric" }).format(d);
      const day = +new Intl.DateTimeFormat("en-u-ca-" + cal + "-nu-latn", { day: "numeric" }).format(d);
      if (m) return { txt: txt.replace(/\s?(هـ|AH)$/, "") + (S.lang === "ar" ? " هـ" : " AH"), month: m, day };
    } catch (e) {
    }
  }
  return null;
}
tickers.push((d) => {
  if (!S.hijri) return;
  const h = hijriParts(d);
  if (h) $("date").textContent = fmtDate(d) + " · " + h.txt;
});
const isRamadan = () => S.ramadan === "on" || S.ramadan === "auto" && (hijriParts(/* @__PURE__ */ new Date()) || {}).month === 9;
function ramadanTicker() {
  if (!isRamadan() || !prayers.length) return "";
  const now = Date.now(), imsak = (t) => new Date(t.getTime() - 10 * 6e4);
  if (now < prayers[4] && now > prayers[0]) return `🌙 ${L("iftar")} ${fmtTime(prayers[4])} · ${L("after")} ${fmtLeft(prayers[4] - now)}`;
  const nf = now < prayers[0] ? prayers[0] : prayersTomorrow[0];
  return nf ? `🌙 ${L("imsak")} ${fmtTime(imsak(nf))} · ${L("after")} ${fmtLeft(imsak(nf) - now)}` : "";
}
tickers.push(() => {
  const r = S.tickerOn ? ramadanTicker() : "";
  if (r) $("tPrayer").textContent = r;
});
const _updTicker = updateTicker;
updateTicker = function() {
  _updTicker();
  const r = S.tickerOn ? ramadanTicker() : "";
  if (r) $("tPrayer").textContent = r;
};
setInterval(() => {
  if (!isRamadan() || !prayers.length) return;
  const now = Date.now(), day = (/* @__PURE__ */ new Date()).toDateString();
  const at = (t, key, icon, title, sub) => {
    if (now >= t && now < t + 9e4 && !fired[day + key]) {
      fired[day + key] = 1;
      banner(icon, title, sub, 15e3);
      chime();
    }
  };
  at(prayers[4].getTime() - 15 * 6e4, "if15", "🌙", `${L("iftar")} ${L("after")} 15 ${L("min")}`, fmtTime(prayers[4]));
  at(prayers[4].getTime(), "if0", "🍽️", L("iftarNow"), L("ramadanKareem"));
  at(prayers[0].getTime() - 40 * 6e4, "suh", "🌙", `${L("imsak")} ${L("after")} 30 ${L("min")}`, fmtTime(new Date(prayers[0].getTime() - 10 * 6e4)));
}, 2e4);
function imsakiya() {
  if (!S.loc) {
    A.toast(L("needCity"));
    return;
  }
  const rows = [], d0 = /* @__PURE__ */ new Date();
  d0.setHours(12, 0, 0, 0);
  for (let i = 0; i < 30; i++) {
    const d = new Date(d0.getTime() + i * 864e5), h = hijriParts(d);
    if (S.ramadan === "auto" && h && h.month !== 9 && i > 0) break;
    const p = prayerTimes(d, S.loc.lat, S.loc.lon, S.method, S.asrHanafi);
    rows.push(`<tr><td>${h ? h.day : ""}</td><td>${d.getDate()}/${d.getMonth() + 1}</td><td>${fmtTime(new Date(p[0] - 6e5), 1)}</td><td>${fmtTime(p[0], 1)}</td><td>${fmtTime(p[2], 1)}</td><td>${fmtTime(p[3], 1)}</td><td><b>${fmtTime(p[4], 1)}</b></td><td>${fmtTime(p[5], 1)}</td></tr>`);
  }
  const pr = L("prayers");
  dialog("🌙 " + L("imsakiya"), [{ label: L("done"), fn: () => {
  } }], { html: `<table class="imsak"><tr><th>${L("hDay")}</th><th>📅</th><th>${L("imsak")}</th><th>${pr[0]}</th><th>${pr[2]}</th><th>${pr[3]}</th><th>${pr[4]}</th><th>${pr[5]}</th></tr>${rows.join("")}</table>
    <div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>` });
}
let radioAudio = null, radios = [];
const RB = "https://backup.qurango.net/radio/";
const RADIO_FB = [["مشاري العفاسي", "mishary_alafasi"], ["محمود خليل الحصري", "mahmoud_khalil_alhussary"], ["الحصري مجود", "mahmoud_khalil_alhussary_mojawwad"], ["عبدالباسط عبدالصمد", "abdulbasit_abdulsamad"], ["عبدالباسط مجود", "abdulbasit_abdulsamad_mojawwad"], ["المنشاوي", "mohammed_siddiq_alminshawi"], ["المنشاوي مجود", "mohammed_siddiq_alminshawi_mojawwad"], ["محمد الطبلاوي", "mohammad_altablaway"], ["ماهر المعيقلي", "maher"], ["عبدالرحمن السديس", "abdulrahman_alsudaes"], ["سعود الشريم", "saud_alshuraim"], ["ياسر الدوسري", "yasser_aldosari"], ["سعد الغامدي", "saad_alghamdi"], ["أحمد العجمي", "ahmad_alajmy"], ["أحمد نعينع", "ahmad_nauina"], ["تلاوات خاشعة", "salma"], ["تفسير القرآن", "tafseer"], ["المختصر في التفسير", "mukhtasartafsir"], ["الرقية الشرعية", "roqiah"], ["أذكار الصباح", "athkar_sabah"], ["أذكار المساء", "athkar_masa"]].map((x) => ({ name: x[0], url: RB + x[1] }));
function radioMenu() {
  return __async(this, null, function* () {
    if (!radios.length) {
      try {
        const r = yield A.fetchJSON(`https://mp3quran.net/api/v3/radios?language=${S.lang === "ar" ? "ar" : "eng"}`);
        radios = (r.radios || []).map((x) => ({ name: x.name, url: x.url }));
      } catch (e) {
      }
    }
    const items = [];
    if (radioAudio) items.push({ icon: "⏹", label: L("stopRadio"), pri: 1, fn: stopRadio });
    const seen = {}, list = RADIO_FB.concat(radios).filter((r) => !seen[r.url] && (seen[r.url] = 1));
    list.slice(0, 80).forEach((r) => items.push({ icon: "📻", label: r.name, fn: () => playRadio(r) }));
    dialog("📻 " + L("quranRadio"), items, { grid: 3 });
  });
}
window.onRadioErr = () => {
  const r = S.radio;
  if (r && r.url.indexOf("https:") === 0 && !r._h) {
    playRadio({ name: r.name, url: "http:" + r.url.slice(6), _h: 1 });
    return;
  }
  A.toast(L("playErr"));
  stopRadio();
};
function playRadio(r) {
  stopRadio();
  S.radio = r;
  if (NA && NA.playAudio) {
    NA.playAudio(r.url);
    radioAudio = { native: 1 };
  } else {
    radioAudio = new Audio(r.url);
    radioAudio.onerror = onRadioErr;
    radioAudio.play().catch(() => {
    });
  }
  banner("📻", L("quranRadio"), r.name);
  updateTicker();
}
function stopRadio() {
  if (radioAudio) {
    if (radioAudio.native) {
      NA.stopAudio();
    } else {
      radioAudio.pause();
      radioAudio.src = "";
    }
    radioAudio = null;
  }
  S.radio = null;
  updateTicker();
}
tickers.push(() => {
  $("tSleep").textContent = [sleepAt ? `😴 ${fmtLeft(sleepAt - Date.now())}` : "", radioAudio && S.radio ? `📻 ${S.radio.name}` : ""].filter(Boolean).join("  ·  ");
});
const AZKAR = {
  m: [
    "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ — مِائَةَ مَرَّةٍ",
    "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
    "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ"
  ],
  e: [
    "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ"
  ],
  g: ["سُبْحَانَ اللَّهِ", "الْحَمْدُ لِلَّهِ", "لَا إِلَهَ إِلَّا اللَّهُ", "اللَّهُ أَكْبَرُ", "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ"]
};
function azkarSet() {
  if (!prayers.length) return AZKAR.g;
  const now = Date.now();
  if (now > prayers[0] && now < prayers[3]) return AZKAR.m;
  if (now > prayers[3] && now < prayers[5].getTime() + 36e5) return AZKAR.e;
  return AZKAR.g;
}
function azkarDialog() {
  const set = azkarSet();
  dialog("📿 " + L("azkar"), set.map((z) => ({ label: z, fn: () => {
  }, keep: 1 })).concat([{ label: L("done"), pri: 1, fn: () => {
  } }]));
}
let azIdx = 0;
tickers.push(() => {
  if (!on("frame") || !S.fw.azkar) {
    $("fAzkar").textContent = "";
    return;
  }
  const set = azkarSet();
  if (Date.now() % 6e4 < 5e3) azIdx++;
  $("fAzkar").textContent = set[azIdx % set.length];
});
let forecast = [];
function loadForecast() {
  return __async(this, null, function* () {
    try {
      const loc = S.loc;
      if (!loc) return;
      const r = yield A.fetchJSON(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`);
      forecast = (r.daily.time || []).map((t, i) => ({ d: /* @__PURE__ */ new Date(t + "T12:00:00"), c: r.daily.weather_code[i], hi: Math.round(r.daily.temperature_2m_max[i]), lo: Math.round(r.daily.temperature_2m_min[i]) }));
    } catch (e) {
    }
  });
}
setInterval(loadForecast, 3 * 36e5);
function forecastDialog() {
  if (!forecast.length) {
    loadForecast().then(() => forecast.length && forecastDialog());
    return;
  }
  dialog(`🌤 ${S.loc ? S.loc.name : ""}`, [{ label: L("done"), fn: () => {
  } }], { html: `<div class="fc">${forecast.map((f, i) => `<div class="fcd"><div>${i ? L("days")[f.d.getDay()] : L("today")}</div><b>${WMO(f.c)}</b><div><span>${f.hi}°</span> <small>${f.lo}°</small></div></div>`).join("")}</div>
    <div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>` });
}
tickers.push(() => {
  if (!on("frame") || !S.fw.weather || !forecast.length) {
    $("fForecast").textContent = "";
    return;
  }
  $("fForecast").textContent = forecast.slice(1, 4).map((f) => `${L("days")[f.d.getDay()].slice(0, S.lang === "ar" ? 20 : 3)} ${WMO(f.c)} ${f.hi}°`).join("   ");
});
const folderTile = (f) => {
  const ap = f.apps.map(byPkg).filter((a) => a && allowed(a.pkg));
  return `<div class="app folder f" tabindex="0" data-folder="${esc(f.id)}"><div class="fgrid">${ap.slice(0, 4).map((a) => a.icon ? `<img src="${a.icon}" alt="">` : `<span>${esc(appName(a)[0])}</span>`).join("")}</div>
    <div class="nm">${esc(f.emoji)} ${esc(f.name)} (${ap.length})</div></div>`;
};
function renderFolders() {
  const fs = S.folders.filter((f) => f.apps.some((p) => byPkg(p) && allowed(p)) || !isKids());
  setRow("folderRow", fs.map(folderTile).join(""));
}
const _renderHome = renderHome;
renderHome = function() {
  _renderHome();
  renderFolders();
  if (!isKids() && S.folders.length) $("appGrid").insertAdjacentHTML("afterbegin", S.folders.map(folderTile).join(""));
};
function openFolder(id) {
  const f = S.folders.find((x) => x.id === id);
  if (!f) return;
  const ap = f.apps.map(byPkg).filter((a) => a && allowed(a.pkg));
  dialog(`${f.emoji} ${f.name}`, ap.length ? ap.map((a) => ({ label: appName(a), fn: () => launch(a.pkg) })) : [{ label: L("folderEmpty"), fn: () => {
  } }], { grid: Math.min(4, Math.max(1, ap.length)) });
}
function addToFolder(pkg) {
  const fs = S.folders, items = fs.map((f) => ({ icon: f.emoji, label: f.name + (f.apps.includes(pkg) ? " ✓" : ""), fn: () => {
    const all = S.folders, x = all.find((y) => y.id === f.id);
    x.apps = x.apps.includes(pkg) ? x.apps.filter((p) => p !== pkg) : [...x.apps, pkg];
    S.folders = all;
    renderHome();
  } }));
  items.push({ icon: "➕", label: L("newFolder"), fn: () => setTimeout(() => prompt2(L("folderName"), "", (n) => {
    if (!n) return;
    S.folders = [...S.folders, { id: "f" + Date.now().toString(36), name: n, emoji: "📁", apps: [pkg] }];
    renderHome();
  }), 30) });
  dialog(L("addFolder"), items, { grid: 3 });
}
function folderMenu(id) {
  const f = S.folders.find((x) => x.id === id);
  if (!f || isKids()) return;
  dialog(f.name, [
    { label: L("open"), pri: 1, fn: () => openFolder(id) },
    { label: L("rename"), fn: () => setTimeout(() => prompt2(L("folderName"), f.name, (n) => {
      if (!n) return;
      const a = S.folders;
      a.find((x) => x.id === id).name = n;
      S.folders = a;
      renderHome();
    }), 30) },
    { label: L("emoji"), fn: () => setTimeout(() => dialog(L("emoji"), ["📁", "🎮", "🎬", "📺", "🎵", "🧒", "🛠️", "⚽", "📚", "⭐", "🕌", "🛒"].map((e) => ({ label: e, fn: () => {
      const a = S.folders;
      a.find((x) => x.id === id).emoji = e;
      S.folders = a;
      renderHome();
    } })), { grid: 6 }), 30) },
    { label: L("delFolder"), fn: () => {
      S.folders = S.folders.filter((x) => x.id !== id);
      renderHome();
    } },
    { label: L("cancel"), fn: () => {
    } }
  ]);
}
activators.push((el) => {
  if (el.dataset.folder) {
    openFolder(el.dataset.folder);
    return true;
  }
  return false;
});
optionHandlers.unshift((el) => {
  if (el.dataset.folder) {
    folderMenu(el.dataset.folder);
    return true;
  }
  return false;
});
const _appMenu = appMenu;
appMenu = function(pkg, fromFav, wk) {
  _appMenu(pkg, fromFav, wk);
  if (isKids()) return;
  const items = $("dbox")._items;
  items.splice(items.length - 1, 0, { label: "📁 " + L("addFolder"), fn: () => setTimeout(() => addToFolder(pkg), 30) });
  const box = $("dbox").querySelector(".dlist");
  box.innerHTML = items.map((it, i) => `<button class="btn f${it.pri ? " pri" : ""}" data-di="${i}">${esc(it.label)}</button>`).join("");
  focus(box.querySelector(".f"));
};
function inBedtime(p) {
  if (!p || !p.kids || !p.bedFrom) return false;
  const n = /* @__PURE__ */ new Date(), m = n.getHours() * 60 + n.getMinutes(), [a, b] = [p.bedFrom, p.bedTo || 7].map((h) => h * 60);
  return a > b ? m >= a || m < b : m >= a && m < b;
}
let bedLockShown = false;
setInterval(() => {
  if (!isKids() || !inBedtime(profile()) || Date.now() < unlockedUntil) {
    bedLockShown = false;
    return;
  }
  if (bedLockShown && on("dlg")) return;
  bedLockShown = true;
  if (on("player")) stopPlayer();
  if (on("frame")) stopFrame();
  askPin("🌙 " + L("bedtime"), (pin) => {
    if (pin !== S.pin) {
      A.toast(L("wrongPin"));
      return false;
    }
    unlockedUntil = Date.now() + 30 * 6e4;
    closeDialog();
  }, L("bedtimeSub"));
  dlgOnClose = () => {
    bedLockShown = false;
  };
}, 3e4);
let statCur = null;
const dayKey = (d) => {
  d = d || /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
function statStart(c) {
  statStop();
  statCur = { t: Date.now(), name: c.name, kind: c.kind ? "vod" : "live" };
}
function statStop() {
  if (!statCur) return;
  const s = Math.round((Date.now() - statCur.t) / 1e3);
  const c = statCur;
  statCur = null;
  if (s < 20) return;
  const st = S.stats;
  st.days = st.days || {};
  st.items = st.items || {};
  const k = dayKey();
  st.days[k] = (st.days[k] || 0) + s;
  st.items[c.name] = (st.items[c.name] || 0) + s;
  const keys = Object.keys(st.days).sort();
  while (keys.length > 60) delete st.days[keys.shift()];
  const ik = Object.entries(st.items).sort((a, b) => b[1] - a[1]);
  if (ik.length > 200) st.items = Object.fromEntries(ik.slice(0, 150));
  S.stats = st;
}
const _launch2 = launch;
launch = function(p) {
  _launch2(p);
  const st = S.stats;
  st.apps = st.apps || {};
  st.apps[p] = (st.apps[p] || 0) + 1;
  S.stats = st;
};
function statsFor(id) {
  try {
    return JSON.parse(localStorage.getItem(`p:${id}:stats`)) || {};
  } catch (e) {
    return {};
  }
}
const hm = (s) => {
  const m = Math.round(s / 60);
  return m >= 60 ? `${Math.floor(m / 60)}${L("hr")} ${m % 60}${L("min")}` : `${m}${L("min")}`;
};
function statsDialog() {
  if (statCur && on("player")) {
    const c = Object.assign({}, statCur);
    statStop();
    statCur = c;
    statCur.t = Date.now();
  }
  const today = dayKey(), week = [...Array(7)].map((_, i) => dayKey(new Date(Date.now() - i * 864e5)));
  const html = S.profiles.map((p) => {
    const st = statsFor(p.id), days = st.days || {}, t = days[today] || 0, w = week.reduce((a, k) => a + (days[k] || 0), 0);
    const top = Object.entries(st.items || {}).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([n, s]) => `${esc(n)} <small>${hm(s)}</small>`).join(" · ");
    const ta = Object.entries(st.apps || {}).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([pk, n]) => {
      const a = byPkg(pk);
      return a ? `${esc(appName(a))} <small>×${n}</small>` : "";
    }).filter(Boolean).join(" · ");
    const bars = week.slice().reverse().map((k) => {
      const v = days[k] || 0;
      return `<i style="height:${Math.max(4, Math.min(100, v / 36))}%" title="${k}"></i>`;
    }).join("");
    return `<div class="stp"><div class="sth"><b>${esc(p.emoji)} ${esc(p.name)}</b><span>${L("today")}: <b>${hm(t)}</b> · ${L("thisWeek")}: <b>${hm(w)}</b></span></div>
      <div class="bars">${bars}</div>${top ? `<div class="stl">📺 ${top}</div>` : ""}${ta ? `<div class="stl">📦 ${ta}</div>` : ""}</div>`;
  }).join("");
  dialog("📊 " + L("stats"), [{ label: L("done"), fn: () => {
  } }], { html: html + `<div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>` });
}
const events = [];
let evId = 0;
const _banner = banner;
banner = function(icon, title, text, ms) {
  _banner(icon, title, text, ms);
  events.push({ id: ++evId, icon, title, text: text || "", t: Date.now() });
  while (events.length > 30) events.shift();
};
const _remoteCmd = remoteCmd;
remoteCmd = function(m) {
  if (m.cmd === "backup") {
    if (isKids() && m.pin !== S.pin) return { error: "kids" };
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      data[k] = localStorage.getItem(k);
    }
    return { app: "tvlauncher", v: 2, data };
  }
  if (m.cmd === "restore") {
    if (isKids() && m.pin !== S.pin) return { error: "kids" };
    if (!m.data || m.data.app !== "tvlauncher") return { error: "file" };
    setTimeout(() => window.onBackupLoaded(JSON.stringify(m.data)), 50);
    return { ok: 1 };
  }
  if (m.cmd === "events") {
    return { events: events.filter((e) => e.id > (+m.since || 0)) };
  }
  const r = _remoteCmd(m);
  if (m.cmd === "state" && r && !r.error) r.evId = evId;
  return r;
};
const _quick2 = quickSettings;
quickSettings = function() {
  _quick2();
  const items = $("dbox")._items;
  if (!items) return;
  const add = [{ icon: "📻", label: L("quranRadio"), fn: () => setTimeout(radioMenu, 30) }, { icon: "📿", label: L("azkar"), fn: () => setTimeout(azkarDialog, 30) }, { icon: "🌤", label: L("forecast"), fn: () => setTimeout(forecastDialog, 30) }];
  if (isRamadan()) add.unshift({ icon: "🌙", label: L("imsakiya"), fn: () => setTimeout(imsakiya, 30) });
  if (!isKids()) add.push({ icon: "📊", label: L("stats"), fn: () => setTimeout(statsDialog, 30) });
  items.splice(2, 0, ...add);
  const g = $("dbox").querySelector(".mgrid");
  g.innerHTML = items.map((it, i) => `<button class="btn f${it.pri ? " pri" : ""}" data-di="${i}">${it.icon ? `<b>${esc(it.icon)}</b>` : ""}${esc(it.label)}</button>`).join("");
  focus(g.querySelector(".f"));
};
const _ACTIONS = ACTIONS;
ACTIONS = () => _ACTIONS().concat([["📻", L("quranRadio"), radioMenu], ["📿", L("azkar"), azkarDialog], ["🌤", L("forecast"), forecastDialog], ["🌙", L("imsakiya"), imsakiya], ["📊", L("stats"), statsDialog]]);
window.lifeSettings = () => sec(
  L("sHijri"),
  field(L("hijriShow"), seg("hijri", [[1, L("on")], [0, L("off")]]).replace(/<\/div>$/, `<span class="btn sm">${esc((hijriParts(/* @__PURE__ */ new Date()) || {}).txt || "")}</span></div>`)) + field(L("hijriAdj"), seg("hijriAdj", [[-1, "-1"], [0, "0"], [1, "+1"]])) + field(L("ramadanMode"), seg("ramadan", [["auto", L("auto")], ["on", L("on")], ["off", L("off")]]).replace(/<\/div>$/, `<button class="btn f" id="imsakBtn">🌙 ${L("imsakiya")}</button></div>`)) + field("", `<div class="inline"><button class="btn f" id="radioBtn">📻 ${L("quranRadio")}</button><button class="btn f" id="azkarBtn">📿 ${L("azkar")}</button><button class="btn f" id="fcBtn">🌤 ${L("forecast")}</button><button class="btn f" id="statsBtn">📊 ${L("stats")}</button></div>`)
) + sec(L("frameExtra"), field("", `<div class="inline"><button class="btn f${S.fw.azkar ? " pri" : ""}" data-tog="fw:azkar">📿 ${L("azkar")}</button></div>`));
AFTER.hijri = tick;
AFTER.hijriAdj = tick;
AFTER.ramadan = () => {
  tick();
  updateTicker();
};
activators.push((el) => {
  switch (el.id) {
    case "imsakBtn":
      imsakiya();
      return true;
    case "radioBtn":
      radioMenu();
      return true;
    case "azkarBtn":
      azkarDialog();
      return true;
    case "fcBtn":
      forecastDialog();
      return true;
    case "statsBtn":
      statsDialog();
      return true;
  }
  return false;
});
const _weather = weather;
weather = function() {
  return __async(this, null, function* () {
    yield _weather();
    loadForecast();
  });
};
DEF.wallAuto = "";
const WALL_CATS = () => [["bing", "🌍", L("wBing")], ["nature", "🌳", L("wNature")], ["space", "🌌", L("wSpace")], ["city", "🏙", L("wCity")], ["mountains", "🏔", L("wMount")], ["ocean", "🌊", L("wSea")], ["cars", "🚗", L("wCars")], ["minimalism", "◻️", L("wMinimal")], ["islamic architecture", "🕌", L("wMosque")]];
function wallMenu() {
  const items = [{ icon: "🔄", label: L("wBingAuto") + (S.wallAuto === "bing" ? " ✓" : ""), pri: S.wallAuto === "bing" ? 1 : 0, fn: () => {
    S.wallAuto = "bing";
    bingToday(true);
  } }].concat(WALL_CATS().map((c) => ({ icon: c[1], label: c[2], fn: () => setTimeout(() => wallBrowse(c[0], c[2], 1), 30) })));
  dialog("🖼 " + L("w4k"), items, { grid: 3 });
}
function wallList(src, page) {
  return __async(this, null, function* () {
    if (src === "bing") {
      const out = [];
      for (const idx of [0, 7]) {
        try {
          const r2 = yield A.fetchJSON(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=8&mkt=en-US`);
          (r2.images || []).forEach((i) => out.push({ full: "https://www.bing.com" + i.urlbase + "_UHD.jpg", thumb: "https://www.bing.com" + i.urlbase + "_400x240.jpg" }));
        } catch (e) {
        }
      }
      const seen = {};
      return out.filter((x) => !seen[x.full] && (seen[x.full] = 1));
    }
    const r = yield A.fetchJSON(`https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(src)}&categories=100&purity=100&atleast=3840x2160&ratios=16x9&sorting=toplist&page=${page}`);
    return (r.data || []).map((d) => ({ full: d.path, thumb: d.thumbs && (d.thumbs.small || d.thumbs.original) }));
  });
}
function wallBrowse(src, name, page) {
  return __async(this, null, function* () {
    banner("🖼", L("w4k"), "...", 2500);
    let list = [];
    try {
      list = yield wallList(src, page);
    } catch (e) {
    }
    if (!list.length) {
      A.toast(L("loadErr"));
      return;
    }
    const items = list.map((w) => ({ fn: () => {
      S.wallAuto = "";
      setWall(w.full, true);
    } }));
    const more = src !== "bing";
    if (more) items.push({ fn: () => setTimeout(() => wallBrowse(src, name, page + 1), 30) });
    dialog("🖼 " + name + " · 4K", items, { html: `<div class="wgrid">${list.map((w, i) => `<button class="btn f wthumb" data-di="${i}"><img src="${esc(w.thumb)}" alt=""></button>`).join("")}${more ? `<button class="btn f wthumb wmore" data-di="${list.length}">${esc(L("more"))} ›</button>` : ""}</div>` });
  });
}
function bingToday(force) {
  return __async(this, null, function* () {
    if (S.wallAuto !== "bing") return;
    const d = (/* @__PURE__ */ new Date()).toDateString();
    if (!force && S.wallDay === d) return;
    try {
      const r = yield A.fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US");
      const i = r.images && r.images[0];
      if (i) {
        S.wallDay = d;
        yield setWall("https://www.bing.com" + i.urlbase + "_1920x1080.jpg", force);
      }
    } catch (e) {
      if (force) A.toast(L("loadErr"));
    }
  });
}
setTimeout(() => bingToday(false), 4e3);
setInterval(() => bingToday(false), 36e5);
activators.push((el) => {
  if (el.id === "wall4k") {
    wallMenu();
    return true;
  }
  return false;
});
DEF.setupSeen = false;
DEF.lastBackup = 0;
const yes = (b) => b ? "✅" : "⚠️";
function setupWizard() {
  const home = NA && NA.isDefaultHome ? nat("isDefaultHome") : true, guard = NA ? !!nat("guardService") : true;
  const wv = window.__chromeVer || 0, wvOk = !wv || wv >= 70, bk = S.lastBackup > 0;
  const rows = [
    [yes(home), L("suHome"), home ? "" : L("suHomeBtn"), "suHome"],
    [yes(guard), L("suGuard"), guard ? "" : L("guardEnable"), "suGuard"],
    [yes(wvOk), L("suWv") + (wv ? " · Chrome " + wv : ""), wvOk ? "" : L("suWvBtn"), "suWv"],
    [yes(!NA || shz() !== "none"), "Shizuku", !NA || shz() !== "none" ? "" : L("stInstall"), "suShz"],
    [yes(bk), L("suBackup"), L("suBackupBtn"), "suBackup"],
    ["🧪", L("suTest"), L("suTestBtn"), "suTest"]
  ];
  const items = rows.map((r) => ({ fn: () => setupAct(r[3]) })).concat([{ fn: () => {
    S.setupSeen = true;
  } }]);
  dialog("🧭 " + L("setup"), items, { html: `<div class="sub">${esc(L("setupSub"))}</div><div class="dlist">${rows.map((r, i) => `<button class="btn f${r[2] && r[0] !== "✅" ? " pri" : ""}" data-di="${i}"><b>${r[0]}</b>${esc(r[1])}${r[2] ? ` — ${esc(r[2])}` : ""}</button>`).join("")}<div class="empty">🛡 ${esc(L("suStock"))}</div><button class="btn f" data-di="${rows.length}">${esc(L("ok"))}</button></div>` });
}
function setupAct(k) {
  if (k === "suHome") {
    A.toast(L("suHomeHint"));
    nat("askHome");
  } else if (k === "suGuard") nat("openAccessibility");
  else if (k === "suWv") {
    nat("openUri", "market://details?id=com.google.android.webview");
  } else if (k === "suBackup") {
    exportBackup();
    S.lastBackup = Date.now();
  } else if (k === "suShz") installShizuku();
  else if (k === "suTest") setTimeout(selfTest, 30);
}
function selfTest() {
  return __async(this, null, function* () {
    const res = [];
    const show = (done) => dialog("🧪 " + L("suTest"), [{ label: L("ok"), pri: 1, fn: () => {
    } }], { html: `<div class="dlist">${res.map((r) => `<div class="btn" style="text-align:start"><b>${r[0]}</b>${esc(r[1])}${r[2] ? ` <span style="opacity:.6">· ${esc(r[2])}</span>` : ""}</div>`).join("")}${done ? "" : `<div class="empty">⏳ ${esc(L("suTesting"))}</div>`}<button class="btn pri f" data-di="0">${esc(L("ok"))}</button></div>` });
    const t = (name, fn) => __async(this, null, function* () {
      show(false);
      let r;
      try {
        r = yield Promise.race([fn(), new Promise((_, j) => setTimeout(() => j(new Error("timeout")), 2e4))]);
      } catch (e) {
        r = [false, String(e.message || e).slice(0, 60)];
      }
      res.push([r[0] === null ? "➖" : r[0] ? "✅" : "❌", name, r[1] || ""]);
    });
    yield t(L("tNet"), () => __async(this, null, function* () {
      yield A.fetchText("https://www.google.com/generate_204");
      return [true];
    }));
    yield t(L("tLists"), () => __async(this, null, function* () {
      if (!(S.lists || []).length) return [null, L("tSkip")];
      return [channels.length > 0, channels.length + " " + L("channelsS")];
    }));
    yield t(L("tChan"), () => __async(this, null, function* () {
      const c = channels[0];
      if (!c) return [null, L("tSkip")];
      const r = yield A.checkStreams([c.url]);
      return [!!r[c.url], c.name];
    }));
    yield t(L("tEpg"), () => __async(this, null, function* () {
      if (typeof epgUrl !== "function" || !epgUrl()) return [null, L("tSkip")];
      return [Object.keys(epg).length > 0, Object.keys(epg).length + ""];
    }));
    yield t(L("tRadio"), () => __async(this, null, function* () {
      const r = JSON.parse(yield natAsync("resolveUrl", RADIO_FB[0].url));
      return [!!r.url, RADIO_FB[0].name];
    }));
    yield t(L("tWeather"), () => __async(this, null, function* () {
      const w = yield A.fetchJSON("https://api.open-meteo.com/v1/forecast?latitude=30.04&longitude=31.24&current=temperature_2m");
      return [!!w.current, w.current ? w.current.temperature_2m + "°" : ""];
    }));
    yield t(L("tMatches"), () => __async(this, null, function* () {
      const r = yield A.fetchJSON("https://www.thesportsdb.com/api/v1/json/123/all_leagues.php");
      return [!!(r && r.leagues)];
    }));
    yield t(L("tWall"), () => __async(this, null, function* () {
      const r = yield A.fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US");
      return [!!(r.images && r.images.length)];
    }));
    yield t(L("tCodes"), () => __async(this, null, function* () {
      yield natAsync("resolveUrl", "https://aftv.news/");
      return [true];
    }));
    yield t(L("tUpd"), () => __async(this, null, function* () {
      if (!S.repo) return [null, L("tSkip")];
      yield natAsync("checkUpdate", S.repo);
      return [true, S.repo];
    }));
    show(true);
  });
}
activators.push((el) => {
  if (el.id === "setupBtn") {
    setupWizard();
    return true;
  }
  return false;
});
setTimeout(() => {
  if (!S.setupSeen && NA && NA.isDefaultHome && !nat("isDefaultHome")) {
    S.setupSeen = true;
    setupWizard();
  }
}, 6e3);
function setWall(url, say) {
  return __async(this, null, function* () {
    if (say) banner("🖼", L("w4k"), "...", 2e3);
    let src = url;
    try {
      if (NA && NA.cacheImage) src = yield natAsync("cacheImage", url, Math.min(1920, Math.max(1280, Math.round(screen.width * (window.devicePixelRatio || 1)))));
    } catch (e) {
    }
    S.wallImg = src;
    S.wall = "image";
    applyLook();
    if (window.renderSettings && $("settings").classList.contains("on")) renderSettings();
    if (say) A.toast(L("saved"));
  });
}
window.setWall = setWall;
setTimeout(() => {
  if (/^https?:/.test(S.wallImg || "") && S.wall === "image") setWall(S.wallImg, false);
}, 5e3);
