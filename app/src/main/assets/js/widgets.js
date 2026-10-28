DEF.layouts = {};
const WT = {
  ar: {
    wEdit: "ترتيب الرئيسية (ويدجت)",
    wEditSub: "اختار جزء عشان تحرّكه أو تخفيه أو تكبّره",
    wMove: "حرّك بالأسهم",
    wMoveHint: "الأسهم = تحريك · OK = حفظ · رجوع = إلغاء · 1/3 = أصغر/أكبر",
    wHide: "إخفاء",
    wShow: "إظهار",
    wBigger: "تكبير",
    wSmaller: "تصغير",
    wUp: "لفوق في الترتيب",
    wDown: "لتحت في الترتيب",
    wReset: "رجّعه لمكانه",
    wResetAll: "رجّع كل حاجة زي الأول",
    wHidden: "مخفي",
    wMoved: "متحرّك",
    w_hero: "العنوان الكبير",
    w_watch: "كمّل المشاهدة",
    w_fav: "المفضلة",
    w_folders: "الفولدرات",
    w_matches: "ماتشات النهارده",
    w_favch: "القنوات المفضلة",
    w_quick: "اختصارات",
    w_recent: "آخر استخدام",
    w_clock: "الساعة والتاريخ",
    w_ticker: "الصلاة والماتشات",
    w_weather: "الطقس",
    w_sources: "المصادر",
    w_allapps: "زر كل التطبيقات"
  },
  en: {
    wEdit: "Arrange home (widgets)",
    wEditSub: "Pick a part to move, hide or resize",
    wMove: "Move with arrows",
    wMoveHint: "Arrows = move · OK = save · Back = cancel · 1/3 = smaller/bigger",
    wHide: "Hide",
    wShow: "Show",
    wBigger: "Bigger",
    wSmaller: "Smaller",
    wUp: "Earlier in order",
    wDown: "Later in order",
    wReset: "Put back",
    wResetAll: "Reset everything",
    wHidden: "hidden",
    wMoved: "moved",
    w_hero: "Big title",
    w_watch: "Continue watching",
    w_fav: "Favorites",
    w_folders: "Folders",
    w_matches: "Today's matches",
    w_favch: "Favorite channels",
    w_quick: "Shortcuts",
    w_recent: "Recently used",
    w_clock: "Clock & date",
    w_ticker: "Prayer & matches bar",
    w_weather: "Weather",
    w_sources: "Sources",
    w_allapps: "All apps button"
  }
};
Object.keys(WT).forEach((l) => Object.assign(T[l], WT[l]));
const WIDGETS = [
  ["hero", "#shelf", null, 1],
  ["watch", "#watchRow", 'h2[data-row="watchRow"]', 1],
  ["fav", "#favRow", 'h2[data-i18n="favorites"]', 1],
  ["folders", "#folderRow", 'h2[data-row="folderRow"]', 1],
  ["matches", "#matchRow", 'h2[data-row="matchRow"]', 1],
  ["favch", "#favChRow", 'h2[data-row="favChRow"]', 1],
  ["quick", "#quickRow", 'h2[data-row="quickRow"]', 1],
  ["recent", "#recentRow", 'h2[data-row="recentRow"]', 1],
  ["clock", ".top .clock", null, 0],
  ["ticker", "#ticker", null, 0],
  ["weather", ".top .weather", null, 0],
  ["sources", "#xSources", null, 0],
  ["allapps", "#xAllApps", null, 0]
];
const wEl = (w) => document.querySelector(w[1]), wHead = (w) => w[2] && document.querySelector(w[2]);
function lay() {
  const all = S.layouts || {};
  if (all.__all) return all.__all;
  const any = all[S.theme] || Object.keys(all).map((k) => all[k]).find((v) => v && Object.keys(v).length);
  return any || {};
}
function saveLay(l) {
  S.layouts = { __all: l };
}
function applyWidgets() {
  const l = lay(), scroll = document.querySelector("#home .scroll");
  if (scroll && l.order && l.order.length) {
    l.order.forEach((id) => {
      const w = WIDGETS.find((x) => x[0] === id);
      if (!w || !w[3] || w[0] === "hero") return;
      const h = wHead(w), e = wEl(w);
      if (h) scroll.appendChild(h);
      if (e) scroll.appendChild(e);
    });
    const dx = document.querySelector("#home .dockx");
    if (dx) scroll.appendChild(dx);
  }
  WIDGETS.forEach((w) => {
    const e = wEl(w), h = wHead(w), c = l[w[0]] || {};
    if (!e) return;
    [e, h].forEach((x) => {
      if (!x) return;
      if (x.dataset.wh) {
        x.style.removeProperty("display");
        delete x.dataset.wh;
      }
      x.style.position = x.style.left = x.style.top = x.style.right = x.style.zIndex = x.style.transform = x.style.transformOrigin = x.style.width = x.style.margin = "";
    });
    if (c.hide) {
      e.style.setProperty("display", "none", "important");
      e.dataset.wh = 1;
      if (h) {
        h.style.setProperty("display", "none", "important");
        h.dataset.wh = 1;
      }
      return;
    }
    if (c.x != null) {
      const st = { position: "fixed", left: c.x + "vw", top: c.y + "vh", right: "auto", zIndex: "7", margin: "0" };
      if (c.w) st.width = c.w + "vw";
      Object.assign(e.style, st);
      if (h) Object.assign(h.style, { position: "fixed", left: c.x + "vw", top: Math.max(0, c.y - 3.4) + "vh", right: "auto", zIndex: "7", margin: "0", width: c.w ? c.w + "vw" : "" });
    }
    if (c.s && c.s !== 1) {
      e.style.transform = "scale(" + c.s + ")";
      e.style.transformOrigin = document.documentElement.dir === "rtl" ? "top right" : "top left";
    }
  });
}
const _applyLookW = applyLook;
applyLook = function() {
  _applyLookW.apply(this, arguments);
  setTimeout(applyWidgets, 0);
};
function focusKey(el) {
  if (!el) return null;
  const row = el.parentElement && el.parentElement.id;
  for (const a of ["pkg", "chu", "wk", "folder", "froot", "fi", "scat", "page", "act"]) if (el.dataset && el.dataset[a] != null) return { row, sel: `[data-${a.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}="${String(el.dataset[a]).replace(/"/g, '\\"')}"]` };
  if (el.id) return { row, sel: "#" + el.id };
  return row ? { row, idx: [].indexOf.call(el.parentElement.children, el) } : null;
}
const _renderHomeW = renderHome;
renderHome = function() {
  const k = focusKey(focused);
  _renderHomeW.apply(this, arguments);
  applyWidgets();
  if (k && (!focused || !document.body.contains(focused))) {
    const box = k.row && document.getElementById(k.row);
    const el = k.sel ? box && box.querySelector(k.sel) || document.querySelector(k.sel) : box && (box.children[k.idx] || box.lastElementChild);
    focus(el && el.offsetParent !== null ? el : fallbackFocus());
  }
};
function widgetMenu() {
  const l = lay();
  const items = WIDGETS.filter((w) => wEl(w)).map((w) => {
    const c = l[w[0]] || {};
    return { icon: c.hide ? "🙈" : c.x != null ? "📍" : "▫️", label: L("w_" + w[0]) + (c.hide ? " · " + L("wHidden") : c.x != null ? " · " + L("wMoved") : ""), fn: () => setTimeout(() => widgetActions(w), 30) };
  });
  items.push({ icon: "♻️", label: L("wResetAll"), fn: () => {
    saveLay({});
    applyWidgets();
    renderHome();
  } });
  dialog("🧩 " + L("wEdit"), items, { grid: 3, sub: L("wEditSub") });
}
function widgetActions(w) {
  const l = lay(), c = l[w[0]] || {}, id = w[0], items = [];
  if (!c.hide) items.push({ icon: "✥", label: L("wMove"), pri: 1, fn: () => setTimeout(() => startMove(w), 30) });
  items.push({ icon: c.hide ? "👁" : "🙈", label: c.hide ? L("wShow") : L("wHide"), fn: () => {
    setW(id, { hide: !c.hide });
    setTimeout(widgetMenu, 30);
  } });
  if (!c.hide) {
    items.push({ icon: "➕", label: L("wBigger"), keep: 1, fn: () => {
      setW(id, { s: Math.min(1.8, +((lay()[id] || {}).s || 1) + 0.1) });
    } }, { icon: "➖", label: L("wSmaller"), keep: 1, fn: () => {
      setW(id, { s: Math.max(0.5, +((lay()[id] || {}).s || 1) - 0.1) });
    } });
  }
  if (w[3] && id !== "hero") {
    items.push({ icon: "⬆️", label: L("wUp"), keep: 1, fn: () => reorder(id, -1) }, { icon: "⬇️", label: L("wDown"), keep: 1, fn: () => reorder(id, 1) });
  }
  if (c.x != null || c.s || c.hide) items.push({ icon: "↩️", label: L("wReset"), fn: () => {
    const n = Object.assign({}, lay());
    delete n[id];
    saveLay(n);
    applyWidgets();
    setTimeout(widgetMenu, 30);
  } });
  items.push({ label: L("done"), fn: () => setTimeout(widgetMenu, 30) });
  dialog("🧩 " + L("w_" + id), items, { grid: 3 });
}
function setW(id, patch) {
  const n = Object.assign({}, lay());
  n[id] = Object.assign({}, n[id] || {}, patch);
  saveLay(n);
  applyWidgets();
}
function reorder(id, d) {
  const flow = WIDGETS.filter((w) => w[3] && w[0] !== "hero").map((w) => w[0]);
  const n = Object.assign({}, lay());
  let o = n.order && n.order.length ? n.order.slice() : flow;
  flow.forEach((f) => {
    if (o.indexOf(f) < 0) o.push(f);
  });
  const i = o.indexOf(id), j = i + d;
  if (j < 0 || j >= o.length) return;
  o.splice(i, 1);
  o.splice(j, 0, id);
  n.order = o;
  saveLay(n);
  applyWidgets();
  banner("🧩", L("w_" + id), j + 1 + " / " + o.length, 1500);
}
let moving = null;
function startMove(w) {
  const e = wEl(w);
  if (!e) return;
  showPage("home");
  const r = e.getBoundingClientRect(), vw = innerWidth / 100, vh = innerHeight / 100, c = lay()[w[0]] || {};
  moving = { w, x: c.x != null ? c.x : +(r.left / vw).toFixed(1), y: c.y != null ? c.y : +(r.top / vh).toFixed(1), wd: c.w || +(Math.min(r.width, innerWidth * 0.92) / vw).toFixed(1), s: c.s || 1, orig: Object.assign({}, c) };
  e.classList.add("wmoving");
  setW(w[0], { x: moving.x, y: moving.y, w: moving.wd });
  banner("✥", L("w_" + w[0]), L("wMoveHint"), 6e5);
}
function endMove(save) {
  if (!moving) return;
  const id = moving.w[0], e = wEl(moving.w);
  if (e) e.classList.remove("wmoving");
  if (!save) {
    const n = Object.assign({}, lay());
    if (Object.keys(moving.orig).length) n[id] = moving.orig;
    else delete n[id];
    saveLay(n);
  }
  moving = null;
  applyWidgets();
  $("banners").innerHTML = "";
  banner("🧩", L("w_" + id), save ? L("saved") : L("cancel"), 1500);
  setTimeout(widgetMenu, 300);
}
layers.unshift({ test: () => !!moving, key: (e) => {
  const k = e.key, step = e.repeat ? 2.5 : 1;
  if (e.preventDefault) e.preventDefault();
  if (k === "ArrowLeft") moving.x -= step;
  else if (k === "ArrowRight") moving.x += step;
  else if (k === "ArrowUp") moving.y -= step;
  else if (k === "ArrowDown") moving.y += step;
  else if (k === "1" || k === "-") moving.s = Math.max(0.5, +(moving.s - 0.1).toFixed(2));
  else if (k === "3" || k === "+") moving.s = Math.min(1.8, +(moving.s + 0.1).toFixed(2));
  else if (k === "Enter" || k === " " || e.keyCode === 13 || e.keyCode === 23) {
    held = true;
    endMove(true);
    return true;
  } else if (isBack(k)) {
    endMove(false);
    return true;
  } else return true;
  moving.x = Math.max(-5, Math.min(98, moving.x));
  moving.y = Math.max(0, Math.min(96, moving.y));
  setW(moving.w[0], { x: +moving.x.toFixed(1), y: +moving.y.toFixed(1), w: moving.wd, s: moving.s });
  return true;
} });
activators.push((el) => {
  if (el.id === "wEditBtn") {
    widgetMenu();
    return true;
  }
  return false;
});
if (typeof ACTIONS === "function") {
  const _AW = ACTIONS;
  ACTIONS = () => _AW().concat([["🧩", L("wEdit"), widgetMenu]]);
}
const _lookSec = window.lifeSettings;
window.widgetSettings = () => sec("🧩 " + L("wEdit"), field(L("wEditSub"), `<div class="inline"><button class="btn pri f" id="wEditBtn">🧩 ${L("wEdit")}</button></div>`));
setTimeout(applyWidgets, 800);
document.addEventListener("click", (e) => {
  if (!moving) return;
  e.preventDefault();
  e.stopPropagation();
  held = true;
  endMove(true);
}, true);
