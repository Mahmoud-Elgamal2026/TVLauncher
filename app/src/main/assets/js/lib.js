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
Object.assign(T.ar, {
  libTab: "📚 المكتبة",
  libQuran: "القرآن الكريم",
  libKhutab: "خطب ودروس",
  libOldAr: "أفلام عربي قديمة",
  libClassic: "أفلام كلاسيك",
  libDocs: "وثائقي",
  libCartoon: "كرتون قديم",
  libBooks: "كتب مسموعة",
  libPlays: "مسرحيات",
  libArabic: "أفلام عربي",
  libHorror: "رعب",
  libRomance: "رومانسي",
  libAction: "أكشن",
  libComedy: "كوميدي",
  libForeign: "أفلام أجنبي",
  libSearch: "بحث في المكتبة",
  libLoading: "بيحمّل…",
  libEmpty: "مفيش نتايج",
  libReciter: "اختار القارئ",
  libSurah: "اختار السورة",
  libFiles: "اختار الحلقة/الجزء",
  libAll: "شغّل الكل"
});
Object.assign(T.en, {
  libTab: "📚 Library",
  libQuran: "Holy Quran",
  libKhutab: "Sermons & lessons",
  libOldAr: "Classic Arabic films",
  libClassic: "Classic films",
  libDocs: "Documentaries",
  libCartoon: "Old cartoons",
  libBooks: "Audiobooks",
  libPlays: "Plays",
  libArabic: "Arabic films",
  libHorror: "Horror",
  libRomance: "Romance",
  libAction: "Action",
  libComedy: "Comedy",
  libForeign: "Foreign films",
  libSearch: "Search the library",
  libLoading: "Loading…",
  libEmpty: "No results",
  libReciter: "Pick a reciter",
  libSurah: "Pick a surah",
  libFiles: "Pick a part",
  libAll: "Play all"
});
const LIB_CATS = [
  ["quran", "📖", null],
  ["khutab", "🕌", 'subject:("خطب الجمعة" OR "خطبة الجمعة" OR "دروس دينية" OR محاضرات OR "تفسير القرآن" OR "السيرة النبوية") AND mediatype:audio'],
  ["oldar", "🎞", 'mediatype:movies AND title:(فيلم) AND (subject:("ابيض واسود" OR "أبيض وأسود" OR "الزمن الجميل" OR "افلام قديمة" OR "أفلام قديمة" OR "افلام مصرية" OR "سينما مصرية" OR "egyptian cinema" OR "egyptian movie" OR "classic arabic" OR "افلام زمان" OR "فيلم مصري" OR "افلام مصرية قديمة" OR "افلام عربي قديمة" OR "السينما المصرية" OR "افلام عربية قديمة" OR "egyptian films" OR "arabic cinema") OR title:(19*))'],
  ["plays", "🎭", "mediatype:movies AND title:(مسرحية OR مسرحيه) AND NOT title:(تريلر OR اعلان OR مقطع OR مشهد)"],
  ["arabic", "🇪🇬", "mediatype:movies AND title:(فيلم OR افلام) AND NOT title:(تريلر OR اعلان OR مقطع)"],
  ["horror", "👻", "mediatype:movies AND (subject:(horror OR رعب) OR title:(رعب)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],
  ["romance", "💕", "mediatype:movies AND (subject:(romance OR رومانسي OR رومانسية) OR title:(رومانسي)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],
  ["action", "💥", "mediatype:movies AND (subject:(action OR اكشن OR أكشن OR western) OR title:(اكشن)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],
  ["comedy", "😂", "mediatype:movies AND (subject:(comedy OR كوميدي OR كوميديا) OR title:(كوميدي)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],
  ["foreign", "🌐", "mediatype:movies AND collection:(feature_films OR moviesandfilms OR film_noir OR scifi_horror)"],
  ["classic", "🎬", "collection:feature_films AND mediatype:movies"],
  ["docs", "🌍", "collection:(documentaries OR ephemera) AND mediatype:movies"],
  ["cartoon", "🐭", "collection:classic_cartoons AND mediatype:movies"],
  ["books", "🎧", "collection:librivoxaudio AND mediatype:audio"]
];
const LIBN = { arabic: "libArabic", horror: "libHorror", romance: "libRomance", action: "libAction", comedy: "libComedy", foreign: "libForeign", plays: "libPlays", quran: "libQuran", khutab: "libKhutab", oldar: "libOldAr", classic: "libClassic", docs: "libDocs", cartoon: "libCartoon", books: "libBooks" };
let libCat = "quran", libCache = {}, libQ = "";
(function() {
  const st = document.querySelector('.tab[data-page="settings"]');
  if (!st) return;
  const b = document.createElement("button");
  b.className = "tab f";
  b.dataset.page = "lib";
  b.setAttribute("data-i18n", "libTab");
  b.textContent = L("libTab");
  st.parentNode.insertBefore(b, st);
  const sec = document.createElement("section");
  sec.className = "page";
  sec.id = "lib";
  sec.innerHTML = `<div class="vodw"><div class="list" id="libCats"></div><div class="scroll" id="libMain"></div></div>`;
  $("settings").parentNode.insertBefore(sec, $("settings"));
})();
function libCatsHtml() {
  return LIB_CATS.filter((c) => c[0] !== "search").map((c) => `<div class="it f${c[0] === libCat ? " on" : ""}" tabindex="0" data-libcat="${c[0]}">${c[1]} ${esc(L(LIBN[c[0]]))}</div>`).join("") + `<div class="it f" tabindex="0" id="libSearchBtn">🔍 ${esc(L("libSearch"))}</div>`;
}
const libCard = (x) => `<div class="lbc f" tabindex="0" ${x.attr}><div class="lbi"${x.img ? ` style="background-image:url('${esc(x.img)}')"` : ""}>${x.img ? "" : `<b>${esc(x.icon || "🎬")}</b>`}</div><div class="lbt">${esc(x.title)}</div>${x.sub ? `<div class="lbs">${esc(x.sub)}</div>` : ""}</div>`;
function libMsg(t) {
  $("libMain").innerHTML = `<p class="hint">${esc(t)}</p>`;
}
function renderLib() {
  return __async(this, null, function* () {
    $("libCats").innerHTML = libCatsHtml();
    if (libCat === "quran") return quranReciters();
    const key = libCat + "|" + libQ;
    let items = libCache[key];
    if (!items) {
      libMsg(L("libLoading"));
      const cat = LIB_CATS.find((c) => c[0] === libCat), q = libQ ? `(${libQ}) AND mediatype:(movies OR audio)` : cat[2];
      try {
        const r = yield A.fetchJSON("https://archive.org/advancedsearch.php?q=" + encodeURIComponent(q) + "&fl[]=identifier&fl[]=title&fl[]=mediatype&fl[]=year&sort[]=downloads+desc&rows=200&output=json");
        items = ((r.response || {}).docs || []).filter((d) => !libBlocked(Array.isArray(d.title) ? d.title[0] : d.title || "")).map((d) => ({ id: d.identifier, title: Array.isArray(d.title) ? d.title[0] : d.title || d.identifier, mt: d.mediatype, year: d.year }));
        libCache[key] = items;
      } catch (e) {
        items = [];
      }
    }
    if (!items.length) return libMsg(L("libEmpty"));
    $("libMain").innerHTML = `<div class="lbgrid">${items.map((i) => libCard({ attr: `data-arch="${esc(i.id)}"`, img: "https://archive.org/services/img/" + i.id, title: i.title, sub: i.year ? String(i.year) : "" })).join("")}</div>`;
  });
}
function openArch(id) {
  return __async(this, null, function* () {
    dialog("⏳ " + L("libLoading"), [{ label: L("cancel"), fn: () => {
    } }]);
    let md = {};
    try {
      md = yield A.fetchJSON("https://archive.org/metadata/" + encodeURIComponent(id));
    } catch (e) {
    }
    const title = md.metadata && md.metadata.title || id;
    const files = (md.files || []).filter((f) => /\.(mp4|m4v|webm|ogv|mp3|ogg|m4a)$/i.test(f.name) && !/_sample|thumb/i.test(f.name));
    let pick = files.filter((f) => /\.mp4$/i.test(f.name));
    if (!pick.length) pick = files.filter((f) => /\.mp3$/i.test(f.name));
    if (!pick.length) pick = files;
    pick.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true }));
    closeDialog();
    if (!pick.length) {
      A.toast(L("libEmpty"));
      return;
    }
    const mk = (f) => ({ name: (pick.length > 1 ? (f.title || f.name.replace(/\.[^.]+$/, "")) + " — " : "") + title, url: "https://archive.org/download/" + encodeURIComponent(id) + "/" + f.name.split("/").map(encodeURIComponent).join("/"), logo: "https://archive.org/services/img/" + id, kind: "movie" });
    if (pick.length === 1) return libPlay([mk(pick[0])], 0);
    const list = pick.map(mk);
    dialog("🎞 " + title, [{ icon: "▶️", label: L("libAll"), pri: 1, fn: () => libPlay(list, 0) }].concat(list.slice(0, 80).map((c, i) => ({ label: pick[i].title || pick[i].name, fn: () => libPlay(list, i) }))), { sub: L("libFiles") });
  });
}
function libPlay(list, i) {
  if (typeof playList !== "undefined") playList = list;
  play(list[i]);
}
let qReciters = null, qSuwar = null;
function quranReciters() {
  return __async(this, null, function* () {
    if (!qReciters) {
      libMsg(L("libLoading"));
      try {
        const lg = S.lang === "ar" ? "ar" : "eng";
        const [r, s] = yield Promise.all([A.fetchJSON("https://mp3quran.net/api/v3/reciters?language=" + lg), A.fetchJSON("https://mp3quran.net/api/v3/suwar?language=" + lg)]);
        qReciters = (r.reciters || []).filter((x) => x.moshaf && x.moshaf.length);
        qSuwar = s.suwar || [];
      } catch (e) {
        qReciters = null;
        return libMsg(L("loadErr"));
      }
    }
    const fav = ["ماهر المعيقلي", "عبدالباسط عبدالصمد", "محمد صديق المنشاوي", "مشاري العفاسي", "سعد الغامدي", "محمود خليل الحصري", "ياسر الدوسري", "عبدالرحمن السديس"];
    const list = qReciters.slice().sort((a, b) => {
      const fa = fav.findIndex((n) => a.name.indexOf(n) >= 0), fb = fav.findIndex((n) => b.name.indexOf(n) >= 0);
      return (fa < 0 ? 99 : fa) - (fb < 0 ? 99 : fb);
    });
    $("libMain").innerHTML = `<h3 class="sph">${esc(L("libReciter"))}</h3><div class="lbgrid small">${list.slice(0, 200).map((r) => libCard({ attr: `data-reciter="${r.id}"`, icon: "🎙", title: r.name, sub: r.moshaf[0].name })).join("")}</div>`;
  });
}
function quranSurahs(rid) {
  const r = (qReciters || []).find((x) => String(x.id) === String(rid));
  if (!r) return;
  const m = r.moshaf[0];
  const have = String(m.surah_list || "").split(",").map(Number);
  const list = qSuwar.filter((s) => have.indexOf(+s.id) >= 0).map((s) => ({ name: s.name + " — " + r.name, url: m.server + String(s.id).padStart(3, "0") + ".mp3", logo: "", kind: "movie" }));
  dialog("📖 " + r.name, [{ icon: "▶️", label: L("libAll"), pri: 1, fn: () => libPlay(list, 0) }].concat(list.map((c, i) => ({ label: i + 1 + ". " + c.name.split(" — ")[0], fn: () => libPlay(list, i) }))), { sub: L("libSurah") });
}
activators.push((el) => {
  if (el.dataset.libcat) {
    libCat = el.dataset.libcat;
    libQ = "";
    renderLib().then(() => focus(document.querySelector(`[data-libcat="${libCat}"]`)));
    return true;
  }
  if (el.id === "libSearchBtn") {
    prompt2(L("libSearch"), libQ, (v) => {
      libQ = v;
      libCat = "search";
      renderLib();
    });
    return true;
  }
  if (el.dataset.arch) {
    openArch(el.dataset.arch);
    return true;
  }
  if (el.dataset.reciter) {
    quranSurahs(el.dataset.reciter);
    return true;
  }
  return false;
});
pageHooks["lib:enter"] = () => {
  if (!$("libMain").innerHTML) renderLib();
};
LIB_CATS.push(["search", "🔍", ""]);
LIBN.search = "libSearch";
const LIB_BLOCK = /جيش|إصدار|اصدار|مؤسسة|تحرير|معركة|غزو|مجاهد|جهاد|انغماس|الدولة الإسلامية|الدولة الاسلامية|ولاية|استشهاد|عملية|قصف|سرايا|كتائب|فصائل|كتيبة|طلائع|أحرار|احرار|isis|daesh|jihad|mujahid|militant|\+18|sex|xxx/i;
function libBlocked(t) {
  return LIB_BLOCK.test(String(t || ""));
}
const PLAY_STARS = ["سمير غانم", "عادل إمام", "إسماعيل ياسين", "فؤاد المهندس", "محمد صبحي", "ريا وسكينة", "شادية", "سعيد صالح", "يونس شلبي", "محمد نجم", "نجيب الريحاني"];
const _renderLibP = renderLib;
renderLib = function() {
  return __async(this, arguments, function* () {
    if (libCat !== "plays") return _renderLibP.apply(this, arguments);
    $("libCats").innerHTML = libCatsHtml();
    const key = "plays|" + libQ;
    let items = libCache[key];
    if (!items) {
      libMsg(L("libLoading"));
      const q = LIB_CATS.find((c) => c[0] === "plays")[2] + (libQ ? ` AND (title:("${libQ}") OR subject:("${libQ}") OR description:("${libQ}"))` : "");
      try {
        const r = yield A.fetchJSON("https://archive.org/advancedsearch.php?q=" + encodeURIComponent(q) + "&fl[]=identifier&fl[]=title&fl[]=year&sort[]=downloads+desc&rows=300&output=json");
        const seen = {};
        items = ((r.response || {}).docs || []).map((d) => ({ id: d.identifier, title: Array.isArray(d.title) ? d.title[0] : d.title || d.identifier, year: d.year })).filter((i) => !libBlocked(i.title)).filter((i) => {
          const k = i.title.replace(/[^\u0600-\u06ff]/g, "").slice(0, 25);
          if (seen[k]) return false;
          seen[k] = 1;
          return true;
        });
        libCache[key] = items;
      } catch (e) {
        items = [];
      }
    }
    const chips = `<div class="inline lbchips"><button class="btn f${!libQ ? " on" : ""}" data-playstar="">${S.lang === "ar" ? "الكل" : "All"}</button>${PLAY_STARS.map((n) => `<button class="btn f${libQ === n ? " on" : ""}" data-playstar="${esc(n)}">${esc(n)}</button>`).join("")}</div>`;
    $("libMain").innerHTML = chips + (items.length ? `<div class="lbgrid">${items.map((i) => libCard({ attr: `data-arch="${esc(i.id)}"`, img: "https://archive.org/services/img/" + i.id, title: i.title, sub: i.year ? String(i.year) : "" })).join("")}</div>` : `<p class="hint">${esc(L("libEmpty"))}</p>`);
  });
};
activators.unshift((el) => {
  if (el.dataset && el.dataset.playstar != null) {
    libQ = el.dataset.playstar;
    libCat = "plays";
    renderLib().then(() => focus(document.querySelector(`[data-playstar="${libQ}"]`)));
    return true;
  }
  return false;
});
const FREE_APPS = [["Tubi", "com.tubitv", "🎬"], ["Pluto TV", "tv.pluto.android", "📺"], ["شاهد Shahid", "net.mbc.shahidTV", "🇸🇦"], ["Watch It", "com.watchit.tv", "🇪🇬"], ["YouTube", "com.google.android.youtube.tv", "▶️"], ["Plex", "com.plexapp.android", "🍿"]];
const _renderLibF = renderLib;
renderLib = function() {
  return __async(this, arguments, function* () {
    yield _renderLibF.apply(this, arguments);
    if (libCat !== "quran" && libCat !== "arabic") return;
    const h = `<h3 class="sph">${S.lang === "ar" ? "📺 تطبيقات أفلام ببلاش" : "📺 Free movie apps"}</h3><div class="lbgrid small">${FREE_APPS.map((a) => libCard({ attr: `data-freeapp="${a[1]}"`, icon: a[2], title: a[0], sub: A.isInstalled(a[1]) ? S.lang === "ar" ? "افتح" : "Open" : S.lang === "ar" ? "نزّل من المتجر" : "Install" })).join("")}</div>`;
    $("libMain").insertAdjacentHTML("afterbegin", h);
  });
};
activators.unshift((el) => {
  if (el.dataset && el.dataset.freeapp) {
    const p = el.dataset.freeapp;
    if (A.isInstalled(p)) launch(p);
    else nat("openUri", "market://details?id=" + p);
    return true;
  }
  return false;
});
