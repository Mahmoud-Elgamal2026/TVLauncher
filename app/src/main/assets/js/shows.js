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
Object.assign(DEF, { shows: [] });
Object.assign(T.ar, {
  hwShows: "مسلسلاتي",
  shAdd: "＋ تابع مسلسل",
  shName: "اسم المسلسل (عربي أو إنجليزي)",
  shApp: "بتتفرج عليه منين؟",
  shNone: "اضغط OK وضيف مسلسل بتتابعه",
  shLast: "آخر حلقة نزلت",
  shNext: "الجاية",
  shMine: "إنت وقفت عند",
  shEp: "حلقة",
  shNew: "جديد",
  shWatched: "✓ اتفرجت على الحلقة دي",
  shBack: "↩ رجّع حلقة",
  shOpen: "▶ افتح",
  shRemove: "🗑 بطّل متابعة",
  shManual: "ملقتش بيانات أونلاين — هتابعه معاك يدوي (إنت تحدد الحلقة)",
  shUpdated: "اتحدّث"
});
Object.assign(T.en, {
  hwShows: "My shows",
  shAdd: "＋ Follow a show",
  shName: "Show name",
  shApp: "Which app do you watch it on?",
  shNone: "Press OK and add a show you follow",
  shLast: "Latest aired",
  shNext: "Next",
  shMine: "You stopped at",
  shEp: "ep",
  shNew: "NEW",
  shWatched: "✓ Watched this episode",
  shBack: "↩ One episode back",
  shOpen: "▶ Open",
  shRemove: "🗑 Unfollow",
  shManual: "No online data — tracking it manually (you set the episode)",
  shUpdated: "Updated"
});
HW_TYPES.push(["shows", "🎬", "hwShows"]);
const epTag = (e) => e ? `S${e.season}·E${e.number}` : "";
function showFetch(sh) {
  return __async(this, null, function* () {
    try {
      const r = yield A.fetchJSON("https://api.tvmaze.com/singlesearch/shows?q=" + encodeURIComponent(sh.q) + "&embed[]=previousepisode&embed[]=nextepisode");
      const em = r._embedded || {}, pe = em.previousepisode, ne = em.nextepisode;
      Object.assign(sh, { tv: r.id, name: r.name || sh.q, img: r.image && r.image.medium || "", last: pe ? { season: pe.season, number: pe.number, date: pe.airdate } : null, next: ne ? { season: ne.season, number: ne.number, date: ne.airdate } : null, at: Date.now(), manual: false });
    } catch (e) {
      sh.manual = true;
      sh.at = Date.now();
    }
    return sh;
  });
}
function showsRefresh(force) {
  return __async(this, null, function* () {
    const l = (S.shows || []).map((x) => Object.assign({}, x));
    let ch = false;
    for (const sh of l) {
      if (force || !sh.at || Date.now() - sh.at > 6 * 36e5) {
        yield showFetch(sh);
        ch = true;
      }
    }
    if (ch) {
      S.shows = l;
      renderHW();
    }
  });
}
const behind = (sh) => sh.last && sh.mine ? sh.last.season > sh.mine.season || sh.last.season === sh.mine.season && sh.last.number > sh.mine.number : !!sh.last;
const _hwBodySh = hwBody;
hwBody = function(w) {
  if (w.t !== "shows") return _hwBodySh(w);
  const l = (S.shows || []).slice(0, w.sz > 2 ? 4 : w.sz > 1 ? 3 : 1);
  if (!l.length) return `<div class="hwico">🎬</div><div class="hwsub dim">${esc(L("shNone"))}</div>`;
  return `<div class="hwml">${l.map((sh) => `<div class="hwm"><span class="tn" style="text-align:start">${behind(sh) ? `<b style="color:#ff5d5d;font-size:1.2vh">${esc(L("shNew"))}</b> ` : ""}${esc(sh.name || sh.q)}</span><b style="font-size:1.6vh">${sh.last ? esc(epTag(sh.last)) : sh.mine ? esc(L("shEp")) + " " + sh.mine.number : "—"}</b></div>`).join("")}</div>`;
};
activators.unshift((el) => {
  if (!el.dataset || !el.dataset.hw) return false;
  const w = hwGet(el.dataset.hw);
  if (!w || w.t !== "shows") return false;
  showsMenu();
  return true;
});
function showsMenu() {
  const l = S.shows || [];
  dialog("🎬 " + L("hwShows"), l.map((sh, i) => ({ icon: behind(sh) ? "🔴" : "🎬", label: `${sh.name || sh.q} — ${sh.last ? L("shLast") + " " + epTag(sh.last) : ""}${sh.mine ? " · " + L("shMine") + " " + epTag(sh.mine) : ""}`, fn: () => setTimeout(() => showMenu(i), 30) })).concat([{ icon: "＋", label: L("shAdd"), pri: 1, fn: () => setTimeout(showAdd, 30) }]));
}
function showAdd() {
  prompt2(L("shName"), "", (v) => __async(this, null, function* () {
    if (!v) return;
    let sh = { q: v, mine: null };
    sh = yield showFetch(sh);
    if (sh.manual) A.toast(L("shManual"));
    dialog(L("shApp"), visibleApps().slice(0, 50).map((a) => ({ label: appName(a), fn: () => {
      sh.app = a.pkg;
      S.shows = (S.shows || []).concat([sh]);
      if (!hwHas("shows")) hwSave(hwList().concat([{ id: "shows", t: "shows", sz: 2, st: "glass" }]));
      else renderHW();
    } })));
  }));
}
function showMenu(i) {
  const l = (S.shows || []).map((x) => Object.assign({}, x)), sh = l[i];
  if (!sh) return;
  const save = () => {
    S.shows = l;
    renderHW();
    setTimeout(() => showMenu(i), 30);
  };
  const step = (d) => {
    let m = sh.mine || (sh.last ? { season: sh.last.season, number: 0 } : { season: 1, number: 0 });
    m = { season: m.season, number: Math.max(0, m.number + d) };
    sh.mine = m;
    save();
  };
  const app = sh.app && byPkg(sh.app);
  dialog(
    `🎬 ${sh.name || sh.q}`,
    [
      { icon: "▶", label: L("shOpen") + (app ? " " + appName(app) : ""), pri: 1, fn: () => {
        if (app) launch(app.pkg);
      } },
      { icon: "✓", label: L("shWatched") + (sh.mine ? ` (${L("shEp")} ${sh.mine.number + 1})` : ""), keep: 1, fn: () => step(1) },
      { icon: "↩", label: L("shBack"), keep: 1, fn: () => step(-1) },
      { icon: "📱", label: L("shApp"), fn: () => setTimeout(() => dialog(L("shApp"), visibleApps().slice(0, 50).map((a) => ({ label: appName(a), fn: () => {
        sh.app = a.pkg;
        S.shows = l;
      } }))), 30) },
      { icon: "🗑", label: L("shRemove"), fn: () => {
        l.splice(i, 1);
        S.shows = l;
        renderHW();
      } },
      { label: L("done"), fn: () => {
      } }
    ],
    { sub: `${sh.last ? L("shLast") + ": " + epTag(sh.last) + " (" + sh.last.date + ")" : L("shManual")}${sh.next ? " · " + L("shNext") + ": " + epTag(sh.next) + " (" + sh.next.date + ")" : ""}${sh.mine ? " · " + L("shMine") + " " + epTag(sh.mine) : ""}` }
  );
}
setTimeout(() => showsRefresh(false), 12e3);
setInterval(() => showsRefresh(false), 36e5);
