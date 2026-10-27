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
const WMO = (c) => c === 0 ? "☀️" : c <= 2 ? "🌤️" : c === 3 ? "☁️" : c <= 48 ? "🌫️" : c <= 67 ? "🌧️" : c <= 77 ? "❄️" : c <= 82 ? "🌦️" : "⛈️";
let weatherNow = null;
function locate() {
  return __async(this, null, function* () {
    const g = yield A.fetchJSON("https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + encodeURIComponent(S.city));
    if (!g.results) throw new Error("city");
    const p = g.results[0];
    S.loc = { lat: p.latitude, lon: p.longitude, name: p.name, city: S.city };
    return S.loc;
  });
}
function weather() {
  return __async(this, null, function* () {
    try {
      let loc = S.loc;
      if (!loc || loc.city !== S.city) loc = yield locate();
      const w = yield A.fetchJSON(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,weather_code`);
      weatherNow = { t: Math.round(w.current.temperature_2m), i: WMO(w.current.weather_code), city: loc.name };
      $("wTemp").textContent = weatherNow.t + "°";
      $("wIcon").textContent = weatherNow.i;
      $("wCity").textContent = loc.name;
      computePrayers();
      updateTicker();
    } catch (e) {
    }
  });
}
setInterval(weather, 30 * 6e4);
const METHODS = { egypt: { fajr: 19.5, isha: 17.5 }, makkah: { fajr: 18.5, ishaMin: 90 }, mwl: { fajr: 18, isha: 17 }, karachi: { fajr: 18, isha: 18 } };
const rad = (d) => d * Math.PI / 180, deg = (r) => r * 180 / Math.PI;
const dsin = (d) => Math.sin(rad(d)), dcos = (d) => Math.cos(rad(d)), dtan = (d) => Math.tan(rad(d));
const darcsin = (x) => deg(Math.asin(x)), darccos = (x) => deg(Math.acos(Math.max(-1, Math.min(1, x)))), darctan2 = (y, x) => deg(Math.atan2(y, x)), darccot = (x) => deg(Math.atan(1 / x));
const fixA = (a) => a - 360 * Math.floor(a / 360), fixH = (a) => a - 24 * Math.floor(a / 24);
function julian(y, m, d) {
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100), b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
}
function prayerTimes(date, lat, lng, method, hanafi) {
  const M = METHODS[method] || METHODS.egypt, jd = julian(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / (15 * 24);
  const sun = (t) => {
    const D = jd + t - 2451545, g = fixA(357.529 + 0.98560028 * D), q = fixA(280.459 + 0.98564736 * D), Lm = fixA(q + 1.915 * dsin(g) + 0.02 * dsin(2 * g)), e = 23.439 - 36e-8 * D;
    const RA = darctan2(dcos(e) * dsin(Lm), dcos(Lm)) / 15;
    return { decl: darcsin(dsin(e) * dsin(Lm)), eqt: q / 15 - fixH(RA) };
  };
  const mid = (t) => fixH(12 - sun(t).eqt);
  const angleT = (ang, t, ccw) => {
    const d = sun(t).decl, n = mid(t), x = darccos((-dsin(ang) - dsin(d) * dsin(lat)) / (dcos(d) * dcos(lat))) / 15;
    return n + (ccw ? -x : x);
  };
  const asrT = (f, t) => {
    const d = sun(t).decl;
    return angleT(-darccot(f + dtan(Math.abs(lat - d))), t);
  };
  const tz = -date.getTimezoneOffset() / 60, adj = tz - lng / 15;
  const sunset = angleT(0.833, 18 / 24) + adj;
  const h = [
    angleT(M.fajr, 5 / 24, true) + adj,
    angleT(0.833, 6 / 24, true) + adj,
    mid(12 / 24) + adj,
    asrT(hanafi ? 2 : 1, 13 / 24) + adj,
    sunset,
    M.ishaMin ? sunset + M.ishaMin / 60 : angleT(M.isha, 18 / 24) + adj
  ];
  return h.map((x) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return new Date(d.getTime() + Math.round(x * 60) * 6e4);
  });
}
let prayers = [], prayersTomorrow = [];
function computePrayers() {
  if (!S.loc) return;
  const d = /* @__PURE__ */ new Date(), t = new Date(d.getTime() + 864e5);
  prayers = prayerTimes(d, S.loc.lat, S.loc.lon, S.method, S.asrHanafi);
  prayersTomorrow = prayerTimes(t, S.loc.lat, S.loc.lon, S.method, S.asrHanafi);
}
function nextPrayer() {
  if (!prayers.length) return null;
  const now = Date.now();
  for (let i = 0; i < 6; i++) {
    if (i === 1) continue;
    if (prayers[i] > now) return { i, t: prayers[i] };
  }
  return prayersTomorrow.length ? { i: 0, t: prayersTomorrow[0] } : null;
}
const fired = {};
setInterval(() => {
  if (!S.prayerOn || !S.adhanOn) return;
  if (prayers.length && prayers[0].toDateString() !== (/* @__PURE__ */ new Date()).toDateString()) computePrayers();
  const now = Date.now();
  prayers.forEach((t, i) => {
    if (i === 1) return;
    const key = t.toDateString() + i, name = L("prayers")[i];
    if (now >= t && now < t.getTime() + 9e4 && !fired[key]) {
      fired[key] = 1;
      banner("🕌", `${L("adhanNow")} ${name}`, fmtTime(t), 15e3);
      playAdhan();
    }
    const b = +S.adhanBefore * 6e4;
    const kb = key + "b";
    if (b && now >= t - b && now < t - b + 9e4 && !fired[kb]) {
      fired[kb] = 1;
      banner("🕌", `${L("adhanSoon")} ${name}`, `${L("after")} ${S.adhanBefore} ${L("min")} · ${fmtTime(t)}`, 9e3);
    }
  });
}, 2e4);
let adhanAudio = null;
function playAdhan() {
  if (S.adhanUrl) {
    try {
      if (adhanAudio) adhanAudio.pause();
      adhanAudio = new Audio(S.adhanUrl);
      adhanAudio.play().catch(chime);
      return;
    } catch (e) {
    }
  }
  chime();
}
const LEAGUES = [
  ["4829", "الدوري المصري", "Egyptian Premier League"],
  ["4668", "الدوري السعودي", "Saudi Pro League"],
  ["4328", "الدوري الإنجليزي", "Premier League"],
  ["4335", "الدوري الإسباني", "La Liga"],
  ["4332", "الدوري الإيطالي", "Serie A"],
  ["4331", "الدوري الألماني", "Bundesliga"],
  ["4334", "الدوري الفرنسي", "Ligue 1"],
  ["4480", "دوري أبطال أوروبا", "Champions League"]
];
const lgName = (id) => {
  const l = LEAGUES.find((x) => x[0] === id);
  return l ? S.lang === "ar" ? l[1] : l[2] : "";
};
let matches = [], sportsT = null;
const evTime = (e) => {
  const ts = e.strTimestamp || (e.dateEvent && e.strTime ? e.dateEvent + "T" + e.strTime : "");
  if (!ts) return null;
  return new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(ts) ? ts : ts + "Z");
};
function evState(e) {
  const s = (e.strStatus || "").toUpperCase(), t = evTime(e), hasScore = e.intHomeScore != null && e.intHomeScore !== "";
  if (/FT|FINISHED|AET|PEN/.test(s)) return "ft";
  if (/NS|NOT STARTED|TBD|POSTPONED|CANC/.test(s) || !hasScore) return t && Date.now() > t && Date.now() - t < 2.2 * 36e5 && !/POSTPONED|CANC/.test(s) ? "live" : "ns";
  return t && Date.now() - t > 2.5 * 36e5 ? "ft" : "live";
}
function loadSports() {
  return __async(this, null, function* () {
    clearTimeout(sportsT);
    if (!S.sportsOn) {
      matches = [];
      renderMatchRow();
      updateTicker();
      return;
    }
    const d = /* @__PURE__ */ new Date(), day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, out = [];
    for (const id of S.leagues) {
      try {
        const r = yield A.fetchJSON(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${day}&l=${id}`);
        (r.events || []).forEach((e) => {
          e._lg = id;
          out.push(e);
        });
      } catch (e) {
      }
      yield new Promise((r) => setTimeout(r, 2200));
    }
    matches = out.filter((e) => evTime(e)).sort((a, b) => evTime(a) - evTime(b));
    renderMatchRow();
    updateTicker();
    sportsT = setTimeout(loadSports, (matches.some((e) => evState(e) === "live") ? 3 : 15) * 6e4);
  });
}
function matchTile(e) {
  var _a, _b;
  const st = evState(e), sc = st === "ns" ? fmtTime(evTime(e)) : `${(_a = e.intHomeScore) != null ? _a : 0} - ${(_b = e.intAwayScore) != null ? _b : 0}`;
  const team = (n, b) => `<div class="tm">${b ? `<img src="${esc(b)}/tiny" onerror="this.src='${esc(b)}';this.onerror=null" alt="">` : "⚽"}<span>${esc(n)}</span></div>`;
  return `<div class="app match f" tabindex="0" data-match="${esc(e.idEvent)}">
    <div class="lg">${esc(lgName(e._lg))}${st === "live" ? ` · <span class="live">● ${L("live")}</span>` : st === "ft" ? " · " + L("ft") : ""}</div>
    <div class="mt">${team(e.strHomeTeam, e.strHomeTeamBadge)}<div class="sc">${sc}</div>${team(e.strAwayTeam, e.strAwayTeamBadge)}</div></div>`;
}
function renderMatchRow() {
  setRow("matchRow", S.sportsOn && !isKids() ? matches.map(matchTile).join("") : "");
}
window.renderMatchRow = renderMatchRow;
window.matchShelf = (id) => {
  var _a, _b;
  const e = matches.find((m) => m.idEvent === id);
  if (!e) return;
  const st = evState(e);
  shelf(`${e.strHomeTeam} × ${e.strAwayTeam}`, `${lgName(e._lg)} · ${st === "ns" ? fmtTime(evTime(e)) : st === "live" ? L("live") : L("ft")} ${st !== "ns" ? `(${(_a = e.intHomeScore) != null ? _a : 0}-${(_b = e.intAwayScore) != null ? _b : 0})` : ""}`, e.strHomeTeamBadge);
};
activators.push((el) => {
  if (el.dataset.match) {
    const e = matches.find((m) => m.idEvent === el.dataset.match);
    if (e) openSearch(e.strHomeTeam.split(" ")[0]);
    return true;
  }
  return false;
});
const teamFav = (e) => {
  const t = S.favTeams.split(/[,،]/).map((x) => x.trim().toLowerCase()).filter(Boolean);
  const s = (e.strHomeTeam + " " + e.strAwayTeam).toLowerCase();
  return t.some((x) => s.includes(x));
};
setInterval(() => {
  const now = Date.now();
  matches.forEach((e) => {
    if (!teamFav(e)) return;
    const t = evTime(e);
    if (!t) return;
    const k = "m" + e.idEvent;
    if (now >= t - 15 * 6e4 && now < t - 13 * 6e4 && !fired[k + "s"]) {
      fired[k + "s"] = 1;
      banner("⚽", `${L("kickSoon")} 15 ${L("min")}`, `${e.strHomeTeam} × ${e.strAwayTeam}`, 1e4);
      chime();
    }
    if (now >= t && now < t + 2 * 6e4 && !fired[k + "k"]) {
      fired[k + "k"] = 1;
      banner("⚽", L("kickNow"), `${e.strHomeTeam} × ${e.strAwayTeam}`, 1e4);
    }
  });
}, 3e4);
function updateTicker() {
  var _a, _b;
  const showP = S.tickerOn && S.prayerOn, np = showP ? nextPrayer() : null;
  $("tPrayer").textContent = np ? `🕌 ${L("prayers")[np.i]} ${fmtTime(np.t)} · ${L("after")} ${fmtLeft(np.t - Date.now())}` : "";
  let m = null;
  if (S.tickerOn && S.sportsOn && !isKids()) {
    m = matches.find((e) => evState(e) === "live") || matches.find((e) => evState(e) === "ns");
  }
  $("tMatch").textContent = m ? evState(m) === "live" ? `⚽ ${m.strHomeTeam} ${(_a = m.intHomeScore) != null ? _a : 0}-${(_b = m.intAwayScore) != null ? _b : 0} ${m.strAwayTeam}` : `⚽ ${m.strHomeTeam} × ${m.strAwayTeam} ${fmtTime(evTime(m))}` : "";
  $("tSleep").textContent = sleepAt ? `😴 ${fmtLeft(sleepAt - Date.now())}` : "";
}
tickers.push(updateTicker);
let sleepAt = 0, sleepT = null, sleepWarn = null;
function sleepMenu() {
  const opts = [0, 15, 30, 45, 60, 90, 120];
  dialog(L("sleepT"), opts.map((m) => ({ label: m ? m >= 60 ? `${m / 60} ${L("hr")}` : `${m} ${L("min")}` : L("off"), pri: !m && !sleepAt, fn: () => setSleep(m) })), { grid: 4 });
}
function setSleep(m) {
  clearTimeout(sleepT);
  clearTimeout(sleepWarn);
  sleepAt = 0;
  if (!m) {
    banner("😴", L("sleepOff"));
    updateTicker();
    return;
  }
  sleepAt = Date.now() + m * 6e4;
  banner("😴", `${L("sleepSet")} ${m} ${L("min")}`);
  sleepWarn = setTimeout(() => banner("😴", `${L("sleepSet")} 1 ${L("min")}`, "", 15e3), (m - 1) * 6e4);
  sleepT = setTimeout(() => {
    sleepAt = 0;
    if (on("player")) stopPlayer();
    $("blackout").classList.add("on");
    updateTicker();
  }, m * 6e4);
  updateTicker();
}
layers.push({ test: () => on("blackout"), ownsEnter: true, key(e) {
  e.preventDefault && e.preventDefault();
  $("blackout").classList.remove("on");
  idleAt = Date.now();
  return true;
} });
let frameT = null, frameIdx = 0, frameFront = true;
function framePics() {
  const src = S.frameSrc === "mine" && S.frames.length ? "mine" : S.frameSrc;
  if (src === "mine") return S.frames.map((u) => `url("${u}")`);
  if (src === "grad") return DAILY;
  const seed = (/* @__PURE__ */ new Date()).toDateString().replace(/\s/g, "");
  return Array.from({ length: 24 }, (_, i) => `url("https://picsum.photos/seed/${seed}${i}/1920/1080")`);
}
function frameNext() {
  const pics = framePics();
  if (!pics.length) return;
  const bg = pics[frameIdx++ % pics.length];
  if (S.frameStyle === "art") {
    $("frameArtImg").style.background = `${bg} center/cover`;
    const mats = ["#d9d2c5", "#cfd6d3", "#e3ddd3", "#c9c2b8", "#2b2b2e"];
    $("frameArt").style.setProperty("--matte", mats[frameIdx % mats.length]);
    return;
  }
  const a = $(frameFront ? "frameA" : "frameB"), b = $(frameFront ? "frameB" : "frameA");
  a.style.background = `${bg} center/cover`;
  a.classList.add("show");
  b.classList.remove("show");
  frameFront = !frameFront;
}
function frameInfo() {
  var _a, _b;
  if (!on("frame")) return;
  const d = /* @__PURE__ */ new Date(), w = S.fw;
  $("fTime").textContent = w.clock ? fmtTime(d, true) : "";
  $("fDate").textContent = w.clock ? fmtDate(d) : "";
  $("fWeather").textContent = w.weather && weatherNow ? `${weatherNow.i} ${weatherNow.t}° ${weatherNow.city}` : "";
  const np = w.prayer && S.prayerOn ? nextPrayer() : null;
  $("fPrayer").textContent = np ? `🕌 ${L("prayers")[np.i]} ${fmtTime(np.t)}` : "";
  const m = w.match && S.sportsOn && !isKids() ? matches.find((e) => evState(e) === "live") || matches.find((e) => evState(e) === "ns") : null;
  $("fMatch").textContent = m ? `⚽ ${m.strHomeTeam} × ${m.strAwayTeam} ${evState(m) === "live" ? `${(_a = m.intHomeScore) != null ? _a : 0}-${(_b = m.intAwayScore) != null ? _b : 0}` : fmtTime(evTime(m))}` : "";
}
tickers.push(frameInfo);
function startFrame() {
  if (on("player") || on("frame")) return;
  if (on("tv")) pvStop();
  const f = $("frame");
  f.className = "on" + (S.frameStyle === "art" ? " art" : S.frameStyle === "clock" ? " clockmode" : "");
  frameIdx = Math.floor(Math.random() * 10);
  frameNext();
  frameInfo();
  clearInterval(frameT);
  frameT = setInterval(frameNext, Math.max(1, +S.frameEvery) * 6e4);
}
function stopFrame() {
  $("frame").className = "";
  clearInterval(frameT);
  idleAt = Date.now();
  unlockedUntil = 0;
}
layers.push({ test: () => on("frame"), ownsEnter: true, key(e) {
  e.preventDefault && e.preventDefault();
  stopFrame();
  return true;
} });
$("frame").addEventListener("click", stopFrame);
setInterval(() => {
  if (S.frameMin > 0 && !on("frame") && !on("player") && !on("blackout") && Date.now() - idleAt > S.frameMin * 6e4) startFrame();
}, 15e3);
window.onFramesAdded = (json) => {
  try {
    const add = JSON.parse(json);
    S.frames = [...S.frames, ...add];
    if (add.length) {
      S.frameSrc = "mine";
      banner("🖼️", L("saved"), add.length + " 📷");
    }
    if (window.renderSettings) renderSettings();
  } catch (e) {
  }
};
function quickSettings() {
  const st = "android.settings.";
  dialog(L("qTitle"), [
    { icon: "🖼️", label: L("frameNow"), fn: startFrame },
    { icon: "😴", label: L("sleepT") + (sleepAt ? " · " + fmtLeft(sleepAt - Date.now()) : ""), fn: sleepMenu },
    { icon: "👥", label: L("profiles"), fn: profileMenu },
    { icon: "🔍", label: L("aSearch"), fn: () => openSearch("") },
    { icon: "📶", label: L("wifi"), fn: () => A.openSettings(st + "WIFI_SETTINGS") },
    { icon: "🎧", label: L("bt"), fn: () => A.openSettings(st + "BLUETOOTH_SETTINGS") },
    { icon: "🔊", label: L("sound"), fn: () => A.openSettings(st + "SOUND_SETTINGS") },
    { icon: "🖥️", label: L("display"), fn: () => A.openSettings(st + "DISPLAY_SETTINGS") },
    { icon: "➕", label: L("volUp"), fn: () => A.volume("up"), keep: 1 },
    { icon: "➖", label: L("volDown"), fn: () => A.volume("down"), keep: 1 },
    { icon: "🔇", label: L("mute"), fn: () => A.volume("mute"), keep: 1 },
    { icon: "💾", label: L("storage"), fn: () => A.openSettings(st + "INTERNAL_STORAGE_SETTINGS") },
    { icon: "🕒", label: L("dateSet"), fn: () => A.openSettings(st + "DATE_SETTINGS") },
    { icon: "🧹", label: L("clearCache"), fn: doClearCache },
    { icon: "⚙️", label: L("allSet"), fn: () => isKids() ? null : A.openSettings("") }
  ].filter((x) => !isKids() || ["🖼️", "😴", "👥", "🔍", "➕", "➖", "🔇"].includes(x.icon)), { grid: 4 });
}
function doClearCache() {
  const n = A.clearCache();
  A.toast(L("cacheDone") + (n ? ` (${(n / 1048576).toFixed(1)} MB)` : ""));
}
activators.push((el) => {
  if (el.id === "qBtn") {
    quickSettings();
    return true;
  }
  if (el.id === "searchBtn") {
    openSearch("");
    return true;
  }
  return false;
});
let searchReturn = null;
function openSearch(q) {
  if (on("dlg")) closeDialog();
  searchReturn = focused;
  $("search").classList.add("on");
  $("sInput").value = q || "";
  renderSearch();
  focus(q ? $("sResults").querySelector(".f") || $("sInput") : $("sInput"));
}
function closeSearch() {
  $("search").classList.remove("on");
  focus(searchReturn && document.body.contains(searchReturn) ? searchReturn : fallbackFocus());
}
function settingsIndex() {
  return [...document.querySelectorAll("#setScroll .sec")].map((s, i) => ({ i, label: (s.querySelector("h3") || {}).textContent || "", text: s.textContent }));
}
let ACTIONS = () => [["🖼️", L("frameNow"), startFrame], ["😴", L("sleepT"), sleepMenu], ["⚡", L("qTitle"), quickSettings], ["👥", L("profiles"), profileMenu], ["🩺", L("checkCh"), () => runCheck(false)]];
function renderSearch() {
  const q = $("sInput").value.trim().toLowerCase(), box = $("sResults");
  if (!q) {
    box.innerHTML = `<h2>${L("actions")}</h2><div class="row">${ACTIONS().map((a, i) => `<button class="btn f" data-sact="${i}">${a[0]} ${esc(a[1])}</button>`).join("")}</div>`;
    return;
  }
  const has = (s) => String(s || "").toLowerCase().includes(q);
  const ap = visibleApps().filter((a) => has(appName(a)) || has(a.pkg)).slice(0, 14);
  const ch = channels.filter((c) => chAllowed(c) && (has(c.name) || String(c.no) === q)).slice(0, 24);
  const wt = S.watch.filter((w) => has(w.name));
  const st = isKids() ? [] : settingsIndex().filter((s) => has(s.text));
  const ac = ACTIONS().map((a, i) => ({ a, i })).filter((x) => has(x.a[1]));
  let h = "";
  if (ap.length) h += `<h2>${L("appsS")}</h2><div class="row">${ap.map(tile).join("")}</div>`;
  if (wt.length) h += `<h2>${L("watchS")}</h2><div class="row">${wt.map(watchTile).join("")}</div>`;
  if (ch.length) h += `<h2>${L("channelsS")}</h2><div class="grid" style="--cols:3;grid-gap:1vh 1.4vw;gap:1vh 1.4vw;padding-top:1.4vh">${ch.map(chRow).join("")}</div>`;
  if (st.length || ac.length) h += `<h2>${L("settingsS")} · ${L("actions")}</h2><div class="row">${ac.map((x) => `<button class="btn f" data-sact="${x.i}">${x.a[0]} ${esc(x.a[1])}</button>`).join("")}${st.map((s) => `<button class="btn f" data-gosec="${s.i}">⚙️ ${esc(s.label)}</button>`).join("")}</div>`;
  box.innerHTML = h || `<div class="empty">${L("noRes")}</div>`;
}
$("sInput").addEventListener("input", () => {
  clearTimeout(window._ss);
  window._ss = setTimeout(renderSearch, 200);
});
window.onVoice = (t) => {
  if (!on("search")) openSearch(t);
  else {
    $("sInput").value = t;
    renderSearch();
  }
  focus($("sResults").querySelector(".f") || $("sInput"));
};
layers.push({ test: () => on("search") && !on("dlg") && !on("player"), key(e) {
  const k = e.key;
  if (isBack(k) || k === "Backspace" && document.activeElement !== $("sInput")) {
    e.preventDefault && e.preventDefault();
    if (document.activeElement === $("sInput") && k !== "GoBack") {
      $("sInput").blur();
      return true;
    }
    closeSearch();
    return true;
  }
  if (k === "Enter" && document.activeElement === $("sInput")) {
    e.preventDefault();
    $("sInput").blur();
    focus($("sResults").querySelector(".f") || $("sInput"));
    return true;
  }
  return false;
} });
activators.push((el) => {
  if (el.id === "voiceBtn") {
    A.voice();
    return true;
  }
  if (el.dataset.sact !== void 0) {
    const a = ACTIONS()[+el.dataset.sact];
    closeSearch();
    a[2]();
    return true;
  }
  if (el.dataset.gosec !== void 0) {
    const i = +el.dataset.gosec;
    closeSearch();
    if (showPage("settings")) {
      const s = document.querySelectorAll("#setScroll .sec")[i];
      if (s) focus(s.querySelector(".f"));
    }
    return true;
  }
  return false;
});
const _launch = launch;
launch = function(p) {
  if (on("search")) $("search").classList.remove("on");
  _launch(p);
};
const _playUrl = playUrl;
playUrl = function(u) {
  if (on("search")) $("search").classList.remove("on");
  _playUrl(u);
};
const ACTION_DEFS = () => [
  ["tv", L("aTv"), "📺"],
  ["last", L("aLast"), "⏮️"],
  ["search", L("aSearch"), "🔍"],
  ["frame", L("aFrame"), "🖼️"],
  ["sleep", L("aSleep"), "😴"],
  ["quick", L("aQuick"), "⚡"],
  ["home", L("aHome"), "🏠"],
  ["profile", L("aProfile"), "👥"],
  ["app", L("aApp"), "📦"]
];
function actionLabel(a) {
  if (a.startsWith("app:")) {
    const x = byPkg(a.slice(4));
    return "📦 " + (x ? appName(x) : a.slice(4));
  }
  const d = ACTION_DEFS().find((x) => x[0] === a);
  return d ? d[2] + " " + d[1] : a;
}
function runAction(a) {
  if (on("frame")) stopFrame();
  if (on("blackout")) $("blackout").classList.remove("on");
  if (a.startsWith("app:")) return launch(a.slice(4));
  if (on("dlg")) closeDialog();
  switch (a) {
    case "tv":
      if (on("player")) stopPlayer();
      showPage("tv");
      focus(document.querySelector('.tab[data-page="tv"]'));
      {
        const r = document.querySelector("#channels .f");
        if (r) focus(r);
      }
      break;
    case "last":
      if (S.lastCh) playUrl(S.lastCh.url);
      break;
    case "search":
      openSearch("");
      break;
    case "frame":
      startFrame();
      break;
    case "sleep":
      sleepMenu();
      break;
    case "quick":
      quickSettings();
      break;
    case "home":
      if (on("player")) stopPlayer();
      showPage("home");
      focus(document.querySelector('.tab[data-page="home"]'));
      break;
    case "profile":
      profileMenu();
      break;
  }
}
window.onMappedKey = (a) => {
  idleAt = Date.now();
  runAction(a);
};
function syncKeyMap() {
  const m = {};
  Object.entries(S.keymap).forEach(([c, v]) => m[c] = v.a);
  A.setKeyMap(JSON.stringify(m));
}
function learnKey() {
  dialog(L("addKey"), [{ label: L("cancel"), fn: () => A.learnKey(false) }], { sub: L("pressKey"), onClose: () => A.learnKey(false) });
  A.learnKey(true);
  if (!NA) setTimeout(() => window.onKeyLearned(183, "KEYCODE_PROG_RED"), 800);
}
window.onKeyLearned = (code, name) => {
  closeDialog();
  const pretty = name.replace("KEYCODE_", "").replace(/_/g, " ");
  const save = (a) => {
    const m = S.keymap;
    m[code] = { a, name: pretty };
    S.keymap = m;
    syncKeyMap();
    if (window.renderSettings) renderSettings();
    A.toast(L("saved"));
  };
  dialog(`${L("keyFor")}  [${pretty}]`, ACTION_DEFS().map((d) => ({ icon: d[2], label: d[1], fn: () => {
    if (d[0] !== "app") return save(d[0]);
    setTimeout(() => dialog(L("chooseApp"), visibleApps().map((x) => ({ label: appName(x), fn: () => save("app:" + x.pkg) })), { grid: 3 }), 50);
  } })), { grid: 3 });
};
window.onSysNotif = (json) => {
  if (!S.notifSys || on("frame")) return;
  try {
    const n = JSON.parse(json);
    banner("🔔", `${n.app}: ${n.title}`, n.text);
  } catch (e) {
  }
};
function exportBackup() {
  const o = { app: "tvlauncher", v: 2, data: {} };
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    o.data[k] = localStorage.getItem(k);
  }
  A.exportBackup(JSON.stringify(o));
}
window.onBackupDone = () => A.toast(L("bkDone"));
window.onBackupLoaded = (txt) => {
  try {
    const o = JSON.parse(txt);
    if (o.app !== "tvlauncher") throw 0;
    if (o.data) Object.entries(o.data).forEach(([k, v]) => localStorage.setItem(k, v));
    else Object.entries(o).forEach(([k, v]) => {
      if (k !== "app" && k !== "v") localStorage.setItem(k, v);
    });
    A.toast(L("bkLoaded"));
    boot();
  } catch (e) {
    A.toast(L("bkBad"));
  }
};
$("dlg").addEventListener("click", (e) => {
  if (e.target.id === "dlg") closeDialog();
});
