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
const xtBase = (l) => String(l.server || "").trim().replace(/\/+$/, "").replace(/\/player_api\.php.*$/, "");
const xtApi = (l, action, extra) => `${xtBase(l)}/player_api.php?username=${encodeURIComponent(l.user)}&password=${encodeURIComponent(l.pass)}${action ? "&action=" + action : ""}${extra || ""}`;
const xtLists = () => S.lists.map((l, i) => Object.assign({ li: i }, l)).filter((l) => l.type === "xtream");
function xtUrl(l, kind, id, ext) {
  const b = xtBase(l), u = encodeURIComponent(l.user), p = encodeURIComponent(l.pass);
  return `${b}/${kind}/${u}/${p}/${id}.${ext || "mp4"}`;
}
function loadXtreamLive(l, li) {
  return __async(this, null, function* () {
    const [cats, streams] = yield Promise.all([A.fetchJSON(xtApi(l, "get_live_categories")), A.fetchJSON(xtApi(l, "get_live_streams"))]);
    const cn = {};
    (cats || []).forEach((c) => cn[c.category_id] = c.category_name);
    return (streams || []).map((s) => ({
      name: s.name,
      logo: s.stream_icon || "",
      group: cn[s.category_id] || l.name,
      id: s.epg_channel_id || s.name,
      country: "",
      list: l.name,
      url: xtUrl(l, "live", s.stream_id, "m3u8"),
      xt: { li, sid: s.stream_id, arch: +s.tv_archive || 0, days: +s.tv_archive_duration || 0 }
    }));
  });
}
function catchupUrl(c, start, end) {
  const l = S.lists[c.xt.li];
  if (!l) return "";
  const d = new Date(start), dur = Math.max(1, Math.round((end - start) / 6e4));
  const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}:${pad(d.getHours())}-${pad(d.getMinutes())}`;
  return `${xtBase(l)}/timeshift/${encodeURIComponent(l.user)}/${encodeURIComponent(l.pass)}/${dur}/${ts}/${c.xt.sid}.ts`;
}
let vodCats = [], vodItems = [], vodCat = null, vodShown = 0, vodLoaded = false, m3uVod = [];
const VOD_PAGE = 90;
function loadVodCats() {
  return __async(this, null, function* () {
    const out = [];
    for (const l of xtLists()) {
      try {
        const [mc, sc] = yield Promise.all([A.fetchJSON(xtApi(l, "get_vod_categories")), A.fetchJSON(xtApi(l, "get_series_categories"))]);
        (mc || []).forEach((c) => out.push({ key: `m:${l.li}:${c.category_id}`, label: c.category_name, kind: "movie", li: l.li, cid: c.category_id }));
        (sc || []).forEach((c) => out.push({ key: `s:${l.li}:${c.category_id}`, label: c.category_name, kind: "series", li: l.li, cid: c.category_id }));
      } catch (e) {
        A.toast(L("loadErr") + ": " + l.name);
      }
    }
    const g = /* @__PURE__ */ new Map();
    m3uVod.forEach((v) => g.set(v.cat, (g.get(v.cat) || 0) + 1));
    [...g].forEach(([n, c]) => out.push({ key: "u:" + n, label: n, kind: "movie", count: c }));
    vodCats = out;
    vodLoaded = true;
    renderVodCats();
  });
}
function vodAllowedCat(c) {
  if (!isKids()) return !S.lockedGroups.includes("v:" + c.key);
  return (profile().allowedGroups || []).includes("v:" + c.key);
}
function renderVodCats() {
  const box = $("vodCats");
  if (!vodCats.length && !S.watch.some((w) => w.kind)) {
    box.innerHTML = "";
    $("vodGrid").innerHTML = `<div class="empty">${L("vodEmpty")}</div>`;
    return;
  }
  const it = (key, label, icon) => `<div class="it f${key === vodCat ? " sel" : ""}" tabindex="0" data-vcat="${esc(key)}">${S.lockedGroups.includes("v:" + key) ? "🔒 " : ""}${icon || ""} ${esc(label)}</div>`;
  let h = it("__cont", L("continueW"), "⏯️") + it("__my", L("myList"), "⭐");
  const mv = vodCats.filter((c) => c.kind === "movie" && vodAllowedCat(c)), se = vodCats.filter((c) => c.kind === "series" && vodAllowedCat(c));
  if (mv.length) h += `<div class="cath">🎬 ${L("movies")}</div>` + mv.map((c) => it(c.key, c.label)).join("");
  if (se.length) h += `<div class="cath">📺 ${L("series")}</div>` + se.map((c) => it(c.key, c.label)).join("");
  box.innerHTML = h;
  if (!vodCat) selectVodCat("__cont", true);
}
function selectVodCat(key, silent) {
  return __async(this, null, function* () {
    vodCat = key;
    vodShown = 0;
    $("vodGrid").innerHTML = `<div class="empty">${L("loading")}</div>`;
    document.querySelectorAll("#vodCats .it").forEach((e) => e.classList.toggle("sel", e.dataset.vcat === key));
    try {
      if (key === "__cont") vodItems = S.watch.filter((w) => w.kind).map((w) => Object.assign({ fromWatch: 1 }, w.meta || {}, { name: w.name, poster: w.logo, url: w.url, kind: w.kind === "episode" ? "episode" : "movie", wkey: w.key }));
      else if (key === "__my") vodItems = S.myList.slice();
      else if (key.startsWith("u:")) vodItems = m3uVod.filter((v) => v.cat === key.slice(2));
      else {
        const c = vodCats.find((x) => x.key === key), l = S.lists[c.li];
        const isM = c.kind === "movie";
        const r = yield A.fetchJSON(xtApi(l, isM ? "get_vod_streams" : "get_series", "&category_id=" + encodeURIComponent(c.cid)));
        vodItems = (r || []).map((v) => isM ? { kind: "movie", li: c.li, id: v.stream_id, name: v.name, poster: v.stream_icon || "", rating: v.rating || "", ext: v.container_extension || "mp4", year: v.added ? new Date(+v.added * 1e3).getFullYear() : "" } : { kind: "series", li: c.li, id: v.series_id, name: v.name, poster: v.cover || "", rating: v.rating || "", year: (v.releaseDate || "").slice(0, 4), plot: v.plot || "" });
      }
    } catch (e) {
      vodItems = [];
      A.toast(L("loadErr"));
    }
    if (vodCat !== key) return;
    $("vodGrid").innerHTML = "";
    moreVod();
    if (!silent) {
      const f = $("vodGrid").querySelector(".f");
      if (f) focus(f);
    }
  });
}
function posterHtml(v) {
  const w = v.url && S.watch.find((x) => x.url === v.url), pct = w && w.dur ? Math.min(100, w.pos / w.dur * 100) : 0;
  return `<div class="poster f" tabindex="0" data-vod="${esc(JSON.stringify({ k: v.kind, li: v.li, id: v.id, u: v.url || "", wk: v.wkey || "" }))}">
    ${v.poster ? `<img loading="lazy" src="${esc(v.poster)}" onerror="this.remove()" alt="">` : ""}<div class="pname">${esc(v.name)}</div>
    ${v.rating && +v.rating ? `<span class="prate">★ ${(+v.rating).toFixed(1)}</span>` : ""}${pct ? `<div class="prog"><i style="width:${pct}%"></i></div>` : ""}</div>`;
}
function moreVod() {
  const g = $("vodGrid"), old = g.querySelector(".vmore");
  if (old) old.remove();
  if (!vodItems.length) {
    g.innerHTML = `<div class="empty">${L("noRes")}</div>`;
    return;
  }
  const next = vodItems.slice(vodShown, vodShown + VOD_PAGE);
  vodShown += next.length;
  g.insertAdjacentHTML("beforeend", next.map(posterHtml).join("") + (vodShown < vodItems.length ? `<button class="btn f vmore">⬇ ${L("more")} (${vodItems.length - vodShown})</button>` : ""));
}
const vodRef = (el) => {
  try {
    return JSON.parse(el.dataset.vod);
  } catch (e) {
    return null;
  }
};
const vodFind = (r) => vodItems.find((v) => r.u && v.url === r.u || v.kind === r.k && v.li === r.li && String(v.id) === String(r.id));
focusHooks.push((el) => {
  if (!el.dataset.vod) return;
  const v = vodFind(vodRef(el));
  if (!v) return;
  $("vodHeroTitle").textContent = v.name;
  $("vodHeroMeta").textContent = [v.year, v.rating && +v.rating ? "★ " + (+v.rating).toFixed(1) : "", v.kind === "series" ? L("series") : L("movie")].filter(Boolean).join(" · ");
  $("vodHeroPlot").textContent = v.plot || "";
  $("vodHero").style.backgroundImage = v.poster ? `url("${v.poster}")` : "";
  const all = $("vodGrid").querySelectorAll(".poster");
  if (all.length && [...all].indexOf(el) > all.length - 12 && vodShown < vodItems.length) moreVod();
});
let detail = null, detailReturn = null;
function openDetail(v) {
  return __async(this, null, function* () {
    detailReturn = focused;
    detail = { v, info: null, seasons: {}, season: null };
    const d = $("detail");
    d.classList.add("on");
    $("dTitle").textContent = v.name;
    $("dMeta").textContent = "";
    $("dPlot").textContent = v.plot || L("loading");
    $("dPoster").style.backgroundImage = v.poster ? `url("${v.poster}")` : "";
    $("dBack").style.backgroundImage = v.poster ? `url("${v.poster}")` : "";
    $("dEps").innerHTML = "";
    $("dSeasons").innerHTML = "";
    renderDetailBtns();
    focus($("dBtns").querySelector(".f"));
    if (v.li == null || v.kind === "episode" && !v.id) {
      $("dPlot").textContent = v.plot || "";
      return;
    }
    try {
      const l = S.lists[v.li];
      if (v.kind === "movie") {
        const r = yield A.fetchJSON(xtApi(l, "get_vod_info", "&vod_id=" + v.id));
        const i = r.info || {};
        detail.info = i;
        if (r.movie_data && r.movie_data.container_extension) v.ext = r.movie_data.container_extension;
        fillDetail(i.plot || i.description, [i.releasedate || i.release_date || v.year, i.genre, i.duration, i.rating ? "★ " + i.rating : ""], i.backdrop_path && i.backdrop_path[0] || i.movie_image || i.cover_big, i.cast ? L("cast") + ": " + i.cast : "");
      } else {
        const r = yield A.fetchJSON(xtApi(l, "get_series_info", "&series_id=" + (v.sid || v.id)));
        const i = r.info || {};
        detail.info = i;
        detail.seasons = r.episodes || {};
        const keys = Object.keys(detail.seasons).sort((a, b) => a - b);
        detail.season = v.season && detail.seasons[v.season] ? String(v.season) : keys[0];
        fillDetail(i.plot, [(i.releaseDate || "").slice(0, 4), i.genre, i.rating ? "★ " + i.rating : "", keys.length + " " + L("seasons")], i.backdrop_path && i.backdrop_path[0] || i.cover, i.cast ? L("cast") + ": " + i.cast : "");
        renderSeasons();
        renderDetailBtns();
      }
    } catch (e) {
      $("dPlot").textContent = v.plot || "";
    }
  });
}
function fillDetail(plot, meta, back, cast) {
  $("dPlot").textContent = (plot || "") + (cast ? "\n\n" + cast : "");
  $("dMeta").textContent = meta.filter(Boolean).join(" · ");
  if (back) $("dBack").style.backgroundImage = `url("${back}")`;
}
function movieUrl(v) {
  return v.url || xtUrl(S.lists[v.li], "movie", v.id, v.ext || "mp4");
}
function renderDetailBtns() {
  const v = detail.v, inMy = S.myList.some((m) => m.kind === v.kind && String(m.id) === String(v.id) && m.url === v.url);
  let h = "";
  if (v.kind === "movie") {
    const u = movieUrl(v), w = S.watch.find((x) => x.url === u);
    if (w && w.pos > 30) h += `<button class="btn pri f" data-dact="resume">⏯ ${L("resumeAt")} ${fmtDur(w.pos)}</button><button class="btn f" data-dact="play0">▶ ${L("fromStart")}</button>`;
    else h += `<button class="btn pri f" data-dact="play0">▶ ${L("play")}</button>`;
  } else if (v.kind === "series") {
    const nx = nextUnwatched();
    if (nx) h += `<button class="btn pri f" data-dact="ep:${esc(nx.s)}:${nx.i}">▶ ${L("season")} ${esc(nx.s)} · ${L("episode")} ${esc(nx.e.episode_num)}</button>`;
  }
  h += `<button class="btn f" data-dact="my">${inMy ? "✓ " + L("inMyList") : "＋ " + L("myList")}</button><button class="btn f" data-dact="ext">↗ ${L("external")}</button>`;
  $("dBtns").innerHTML = h;
}
function renderSeasons() {
  const keys = Object.keys(detail.seasons).sort((a, b) => a - b);
  $("dSeasons").innerHTML = keys.map((k) => `<button class="btn sm f${k === detail.season ? " pri" : ""}" data-season="${esc(k)}">${L("season")} ${esc(k)}</button>`).join("");
  const eps = detail.seasons[detail.season] || [], l = S.lists[detail.v.li];
  $("dEps").innerHTML = eps.map((e, i) => {
    const u = xtUrl(l, "series", e.id, e.container_extension), w = S.watch.find((x) => x.url === u), pct = w && w.dur ? w.pos / w.dur * 100 : (S.seen || []).includes(u) ? 100 : 0, inf = e.info || {};
    return `<div class="ep f" tabindex="0" data-ep="${esc(detail.season)}:${i}">${inf.movie_image ? `<img loading="lazy" src="${esc(inf.movie_image)}" onerror="this.remove()" alt="">` : `<span class="epn">${esc(e.episode_num)}</span>`}
      <div class="ept"><b>${esc(e.episode_num)}. ${esc(e.title || "")}</b><small>${esc(inf.duration || "")}${inf.plot ? " · " + esc(inf.plot) : ""}</small>${pct ? `<div class="prog"><i style="width:${pct}%"></i></div>` : ""}</div></div>`;
  }).join("");
}
function nextUnwatched() {
  const keys = Object.keys(detail.seasons).sort((a, b) => a - b), l = S.lists[detail.v.li], seen = S.seen || [];
  for (const s of keys) {
    const eps = detail.seasons[s];
    for (let i = 0; i < eps.length; i++) {
      const u = xtUrl(l, "series", eps[i].id, eps[i].container_extension);
      if (!seen.includes(u)) return { s, i, e: eps[i] };
    }
  }
  return keys.length ? { s: keys[0], i: 0, e: detail.seasons[keys[0]][0] } : null;
}
function playEpisode(s, i) {
  const v = detail.v, l = S.lists[v.li], eps = detail.seasons[s] || [], e = eps[i];
  if (!e) return;
  const keys = Object.keys(detail.seasons).sort((a, b) => a - b);
  let nx = null;
  if (i + 1 < eps.length) nx = { s, i: i + 1 };
  else {
    const k = keys[keys.indexOf(s) + 1];
    if (k) nx = { s: k, i: 0 };
  }
  const ctx = { v, seasons: detail.seasons };
  playVod({
    kind: "episode",
    name: `${v.name} · ${L("season")[0]}${s} ${L("episode")[0]}${e.episode_num}`,
    url: xtUrl(l, "series", e.id, e.container_extension),
    logo: e.info && e.info.movie_image || v.poster,
    meta: { kind: "episode", li: v.li, sid: v.id, season: s, name: v.name, poster: v.poster },
    next: nx ? () => {
      detail = detail && detail.v === v ? detail : Object.assign({}, ctx, { season: nx.s });
      playEpisode(nx.s, nx.i);
    } : null
  });
}
function playVod(o) {
  closeDetail(true);
  play({ name: o.name, url: o.url, logo: o.logo, group: "", kind: o.kind, meta: o.meta, next: o.next });
}
function closeDetail(keepReturn) {
  $("detail").classList.remove("on");
  if (!keepReturn) {
    const r = detailReturn;
    focus(r && document.body.contains(r) ? r : fallbackFocus());
  }
}
layers.push({ test: () => on("detail") && !on("dlg") && !on("player"), key(e) {
  if (isBack(e.key) || e.key === "Backspace") {
    e.preventDefault && e.preventDefault();
    closeDetail();
    return true;
  }
  return false;
} });
activators.push((el) => {
  if (el.dataset.vcat !== void 0) {
    guard(S.lockedGroups.includes("v:" + el.dataset.vcat), () => selectVodCat(el.dataset.vcat));
    return true;
  }
  if (el.classList.contains("vmore")) {
    const n = vodShown;
    moreVod();
    const p = $("vodGrid").querySelectorAll(".poster")[n];
    if (p) focus(p);
    return true;
  }
  if (el.dataset.vod) {
    const r = vodRef(el), v = vodFind(r);
    if (!v) return true;
    if (v.fromWatch && v.kind === "episode" && v.sid) {
      openDetail({ kind: "series", li: v.li, id: v.sid, name: v.name.split(" · ")[0], poster: v.poster, season: v.season });
      return true;
    }
    openDetail(v);
    return true;
  }
  if (el.dataset.season) {
    detail.season = el.dataset.season;
    renderSeasons();
    focus($("dSeasons").querySelector(`[data-season="${cssq(el.dataset.season)}"]`));
    return true;
  }
  if (el.dataset.ep) {
    const [s, i] = el.dataset.ep.split(":");
    playEpisode(s, +i);
    return true;
  }
  if (el.dataset.dact) {
    const a = el.dataset.dact, v = detail.v;
    if (a === "resume" || a === "play0") {
      const u = movieUrl(v);
      if (a === "play0") S.watch = S.watch.filter((x) => x.url !== u);
      playVod({ kind: "movie", name: v.name, url: u, logo: v.poster, meta: { kind: "movie", li: v.li, id: v.id, name: v.name, poster: v.poster } });
    } else if (a.startsWith("ep:")) {
      const [, s, i] = a.split(":");
      playEpisode(s, +i);
    } else if (a === "my") {
      const k = (m) => m.kind === v.kind && String(m.id) === String(v.id) && m.url === v.url;
      S.myList = S.myList.some(k) ? S.myList.filter((m) => !k(m)) : [{ kind: v.kind, li: v.li, id: v.id, name: v.name, poster: v.poster, url: v.url, rating: v.rating, year: v.year }, ...S.myList];
      renderDetailBtns();
      focus($("dBtns").querySelector('[data-dact="my"]'));
    } else if (a === "ext") {
      if (v.kind === "movie") A.playExternal(movieUrl(v));
      else {
        const nx = nextUnwatched();
        if (nx) A.playExternal(xtUrl(S.lists[v.li], "series", nx.e.id, nx.e.container_extension));
      }
    }
    return true;
  }
  return false;
});
optionHandlers.push((el) => {
  if (!el.dataset.vcat || el.dataset.vcat.startsWith("__") || isKids()) return false;
  const k = "v:" + el.dataset.vcat, lk = S.lockedGroups.includes(k);
  dialog(el.textContent.trim(), [{ label: lk ? L("unlockGroup") : L("lockGroup"), fn: () => {
    if (!S.pin) {
      A.toast(L("needPin"));
      return;
    }
    guard(true, () => {
      toggleList("lockedGroups", k);
      renderVodCats();
    });
  } }, { label: L("cancel"), fn: () => {
  } }]);
  return true;
});
pageHooks["vod:enter"] = () => {
  if (!vodLoaded) loadVodCats();
  else if (vodCat === "__cont" || vodCat === "__my") selectVodCat(vodCat, true);
};
