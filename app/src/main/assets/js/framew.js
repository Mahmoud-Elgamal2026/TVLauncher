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
Object.assign(DEF, { frameSec: 30, frameCat: "bing", frameLay: {} });
const FT = {
  ar: {
    fwEdit: "ترتيب البرواز (ويدجت)",
    fwClock: "الساعة والتاريخ",
    fwWeather: "الطقس",
    fwPrayer: "الصلاة الجاية",
    fwMatch: "الماتش",
    fwMon: "مراقبة الجهاز",
    fwAzkar: "ذكر",
    fCat: "صور البرواز",
    fcBing: "صور Bing الطبيعية",
    sec: "ث",
    cpu: "المعالج",
    ram: "الرامات",
    net: "النت",
    disk: "مساحة فاضية"
  },
  en: {
    fwEdit: "Arrange frame (widgets)",
    fwClock: "Clock & date",
    fwWeather: "Weather",
    fwPrayer: "Next prayer",
    fwMatch: "Match",
    fwMon: "Device monitor",
    fwAzkar: "Dhikr",
    fCat: "Frame photos",
    fcBing: "Bing nature photos",
    sec: "s",
    cpu: "CPU",
    ram: "RAM",
    net: "Network",
    disk: "Free space"
  }
};
Object.keys(FT).forEach((l) => Object.assign(T[l], FT[l]));
const FWS = [["clock", "fwClock", 4, 66, 1], ["weather", "fwWeather", 76, 6, 1], ["prayer", "fwPrayer", 4, 6, 1], ["match", "fwMatch", 58, 82, 1], ["mon", "fwMon", 36, 6, 0], ["azkar", "fwAzkar", 30, 44, 0]];
(function() {
  const box = document.createElement("div");
  box.id = "fwBox";
  box.innerHTML = FWS.map((w) => `<div class="fw" id="fw_${w[0]}"></div>`).join("");
  $("frame").appendChild(box);
})();
function fwCfg(id) {
  const w = FWS.find((x) => x[0] === id), c = (S.frameLay || {})[id] || {};
  return { x: c.x != null ? c.x : w[2], y: c.y != null ? c.y : w[3], s: c.s || 1, on: c.on != null ? c.on : id === "clock" ? S.fw.clock : id === "weather" ? S.fw.weather : id === "prayer" ? S.fw.prayer : id === "match" ? S.fw.match : !!w[4] };
}
function fwSet(id, patch) {
  const all = Object.assign({}, S.frameLay || {});
  all[id] = Object.assign({}, all[id] || {}, patch);
  S.frameLay = all;
  fwApply();
}
function fwApply() {
  const rtl = document.documentElement.dir === "rtl";
  FWS.forEach((w) => {
    const e = $("fw_" + w[0]), c = fwCfg(w[0]);
    e.style.display = c.on && e.innerHTML ? "" : "none";
    e.style.left = c.x + "vw";
    e.style.top = c.y + "vh";
    e.style.transform = c.s !== 1 ? "scale(" + c.s + ")" : "";
    e.style.transformOrigin = rtl ? "top right" : "top left";
  });
}
let monPrev = null, monTxt = "";
function monRead() {
  let m = {};
  try {
    m = JSON.parse(nat("monitor") || "{}");
  } catch (e) {
  }
  const gb = (x) => (x / 1073741824).toFixed(1), parts = [];
  if (monPrev && m.t) {
    const dt = (m.t - monPrev.t) / 1e3;
    if (m.cpuTot && monPrev.cpuTot) {
      const dT = m.cpuTot - monPrev.cpuTot, dI = m.cpuIdle - monPrev.cpuIdle;
      if (dT > 0) parts.push(`🧠 ${L("cpu")} ${Math.round(100 * (1 - dI / dT))}%`);
    }
    if (dt > 0) {
      const sp = (m.rx - monPrev.rx) / dt;
      parts.push(`📶 ${L("net")} ${sp > 1048576 ? (sp / 1048576).toFixed(1) + " MB/s" : Math.round(sp / 1024) + " KB/s"}`);
    }
  }
  if (m.ramTotal) parts.push(`💾 ${L("ram")} ${Math.round(100 * m.ramUsed / m.ramTotal)}% (${gb(m.ramUsed)}/${gb(m.ramTotal)} GB)`);
  if (m.diskFree) parts.push(`🗄 ${L("disk")} ${gb(m.diskFree)} GB`);
  monPrev = m;
  monTxt = parts.join("<br>");
}
const AZKAR_F = ["سبحان الله وبحمده، سبحان الله العظيم", "لا إله إلا الله وحده لا شريك له", "اللهم صلِّ وسلم على نبينا محمد", "أستغفر الله وأتوب إليه", "لا حول ولا قوة إلا بالله", "الحمد لله رب العالمين"];
function fwFill() {
  if (!on("frame")) return;
  const d = /* @__PURE__ */ new Date();
  $("fw_clock").innerHTML = `<div class="fwt">${esc(fmtTime(d, true))}</div><div class="fwd">${esc(fmtDate(d))}</div>`;
  $("fw_weather").innerHTML = weatherNow ? `<b>${esc(weatherNow.i)}</b> ${esc(weatherNow.t)}°<div class="fws">${esc(weatherNow.city || "")}</div>` : "";
  const np = S.prayerOn && window.nextPrayer ? nextPrayer() : null;
  $("fw_prayer").innerHTML = np ? `🕌 ${esc(L("prayers")[np.i])}<div class="fwt2">${esc(fmtTime(np.t))}</div>` : "";
  const m = S.sportsOn && typeof matches !== "undefined" ? matches.find((e) => evState(e) === "live") || matches.find((e) => evState(e) === "ns") : null;
  $("fw_match").innerHTML = m ? `⚽ ${esc(m.strHomeTeam)} × ${esc(m.strAwayTeam)}<div class="fws">${evState(m) === "live" ? `${m.intHomeScore || 0} - ${m.intAwayScore || 0}` : esc(fmtTime(evTime(m)))}</div>` : "";
  if (fwCfg("mon").on) {
    if (!(d.getSeconds() % 2)) monRead();
    $("fw_mon").innerHTML = monTxt;
  }
  if (!(d.getSeconds() % 20) || !$("fw_azkar").innerHTML) $("fw_azkar").innerHTML = esc(AZKAR_F[Math.floor(d.getTime() / 2e4) % AZKAR_F.length]);
  fwApply();
}
tickers.push(fwFill);
let fPool = [], fPoolAt = 0, fBusy = false;
function fBuildPool() {
  return __async(this, null, function* () {
    try {
      fPool = (yield wallList(S.frameCat === "bing" ? "bing" : S.frameCat, 1 + Math.floor(Math.random() * 3))).map((w) => w.full);
    } catch (e) {
      fPool = [];
    }
    fPoolAt = Date.now();
    for (let i = fPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = fPool[i];
      fPool[i] = fPool[j];
      fPool[j] = t;
    }
  });
}
function fNext() {
  return __async(this, null, function* () {
    if (fBusy || !on("frame")) return;
    fBusy = true;
    try {
      const src = S.frameSrc === "mine" && S.frames.length ? "mine" : S.frameSrc;
      let bg;
      if (src === "mine") bg = `url("${S.frames[frameIdx++ % S.frames.length]}")`;
      else if (src === "grad") bg = DAILY[frameIdx++ % DAILY.length];
      else {
        if (!fPool.length || Date.now() - fPoolAt > 3 * 36e5) yield fBuildPool();
        const u = fPool.length ? fPool[frameIdx++ % fPool.length] : null;
        let local = u;
        if (u && NA && NA.cacheImage) {
          try {
            local = yield natAsync("cacheImage", u, 1920);
          } catch (e) {
            local = null;
          }
        }
        if (local) {
          yield new Promise((r) => {
            const im = new Image();
            im.onload = im.onerror = r;
            im.src = local;
          });
          bg = `url("${local}")`;
        } else bg = DAILY[frameIdx++ % DAILY.length];
      }
      if (S.frameStyle === "art") {
        $("frameArtImg").style.background = `${bg} center/cover`;
      } else {
        const a = $(frameFront ? "frameA" : "frameB"), b = $(frameFront ? "frameB" : "frameA");
        a.style.background = `${bg} center/cover`;
        a.classList.add("show");
        b.classList.remove("show");
        frameFront = !frameFront;
      }
    } finally {
      fBusy = false;
    }
  });
}
frameNext = fNext;
const _startFrameF = startFrame;
startFrame = function() {
  _startFrameF.apply(this, arguments);
  clearInterval(frameT);
  frameT = setInterval(fNext, Math.max(10, +S.frameSec || 30) * 1e3);
  monPrev = null;
  monRead();
  fwFill();
};
let fMove = null;
function frameWidgetMenu() {
  const items = FWS.map((w) => {
    const c = fwCfg(w[0]);
    return { icon: c.on ? "👁" : "🙈", label: L(w[1]), fn: () => setTimeout(() => fwActions(w[0]), 30) };
  });
  items.push({ icon: "♻️", label: L("wResetAll"), fn: () => {
    S.frameLay = {};
    fwApply();
  } });
  dialog("🧩 " + L("fwEdit"), items, { grid: 3, sub: L("wEditSub") });
}
function fwActions(id) {
  const c = fwCfg(id), items = [];
  if (c.on) items.push({ icon: "✥", label: L("wMove"), pri: 1, fn: () => setTimeout(() => fwStartMove(id), 30) });
  items.push({ icon: c.on ? "🙈" : "👁", label: c.on ? L("wHide") : L("wShow"), fn: () => {
    fwSet(id, { on: !c.on });
    setTimeout(frameWidgetMenu, 30);
  } });
  if (c.on) items.push({ icon: "➕", label: L("wBigger"), keep: 1, fn: () => fwSet(id, { s: Math.min(2.5, +(fwCfg(id).s + 0.15).toFixed(2)) }) }, { icon: "➖", label: L("wSmaller"), keep: 1, fn: () => fwSet(id, { s: Math.max(0.5, +(fwCfg(id).s - 0.15).toFixed(2)) }) });
  items.push({ icon: "↩️", label: L("wReset"), fn: () => {
    const a = Object.assign({}, S.frameLay || {});
    delete a[id];
    S.frameLay = a;
    setTimeout(frameWidgetMenu, 30);
  } }, { label: L("done"), fn: () => setTimeout(frameWidgetMenu, 30) });
  dialog("🧩 " + L(FWS.find((w) => w[0] === id)[1]), items, { grid: 3 });
}
function fwStartMove(id) {
  const c = fwCfg(id);
  fMove = { id, x: c.x, y: c.y, s: c.s, orig: Object.assign({}, (S.frameLay || {})[id] || {}) };
  startFrame();
  $("fw_" + id).classList.add("wmoving");
  banner("✥", L(FWS.find((w) => w[0] === id)[1]), L("wMoveHint"), 6e5);
}
function fwEndMove(save) {
  if (!fMove) return;
  const id = fMove.id;
  $("fw_" + id).classList.remove("wmoving");
  if (!save) {
    const a = Object.assign({}, S.frameLay || {});
    if (Object.keys(fMove.orig).length) a[id] = fMove.orig;
    else delete a[id];
    S.frameLay = a;
  }
  fMove = null;
  $("banners").innerHTML = "";
  stopFrame();
  setTimeout(frameWidgetMenu, 200);
}
layers.unshift({ test: () => !!fMove, ownsEnter: true, key: (e) => {
  const k = e.key, st = e.repeat ? 2.5 : 1;
  if (e.preventDefault) e.preventDefault();
  if (k === "ArrowLeft") fMove.x -= st;
  else if (k === "ArrowRight") fMove.x += st;
  else if (k === "ArrowUp") fMove.y -= st;
  else if (k === "ArrowDown") fMove.y += st;
  else if (k === "1" || k === "-") fMove.s = Math.max(0.5, +(fMove.s - 0.1).toFixed(2));
  else if (k === "3" || k === "+") fMove.s = Math.min(2.5, +(fMove.s + 0.1).toFixed(2));
  else if (k === "Enter" || k === " " || e.keyCode === 13 || e.keyCode === 23) {
    held = true;
    fwEndMove(true);
    return true;
  } else if (isBack(k)) {
    fwEndMove(false);
    return true;
  } else return true;
  fMove.x = Math.max(0, Math.min(95, fMove.x));
  fMove.y = Math.max(0, Math.min(95, fMove.y));
  fwSet(fMove.id, { x: +fMove.x.toFixed(1), y: +fMove.y.toFixed(1), s: fMove.s, on: true });
  return true;
} });
activators.push((el) => {
  if (el.id === "fwEditBtn") {
    frameWidgetMenu();
    return true;
  }
  return false;
});
DEF.frameFree = false;
const _fwApplyP = fwApply;
fwApply = function() {
  _fwApplyP.apply(this, arguments);
  document.body.classList.toggle("fwpro", !S.frameFree && !fMove);
  if (!S.frameFree && !fMove) FWS.forEach((w) => {
    const e = $("fw_" + w[0]);
    e.style.left = e.style.top = e.style.transform = "";
  });
};
const _fwStartMoveP = fwStartMove;
fwStartMove = function(id) {
  S.frameFree = true;
  _fwStartMoveP(id);
};
const _frameWidgetMenuP = frameWidgetMenu;
frameWidgetMenu = function() {
  _frameWidgetMenuP();
  const box = $("dbox"), items = box._items, g = box.querySelector(".mgrid,.dlist");
  if (!items || !g) return;
  items.push({ icon: "✨", label: (S.lang === "ar" ? "ترتيب احترافي تلقائي" : "Professional auto layout") + (S.frameFree ? "" : " ✓"), fn: () => {
    S.frameFree = false;
    fwApply();
  } });
  g.innerHTML = items.map((it, i) => `<button class="btn f${it.pri ? " pri" : ""}" data-di="${i}">${it.icon ? `<b>${esc(it.icon)}</b>` : ""}${esc(it.label)}</button>`).join("");
  focus(g.querySelector(".f"));
};
