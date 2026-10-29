Object.assign(T.ar, {
  gmTitle: "صباح الخير ☀️",
  gmEve: "مساء الخير 🌙",
  gmMatches: "ماتشات النهارده",
  gmNew: "حلقات جديدة",
  gmNone: "مفيش جديد",
  gmPrayer: "الصلاة الجاية",
  shSave: "تحفظ اللينك ده في مسلسل؟",
  shLink: "▶ افتح آخر لينك اتبعت",
  shSaved: "اتحفظ في",
  guest: "وضع الضيوف",
  guestOn: "👥 وضع الضيوف شغال — الحاجات الشخصية مستخبية",
  guestOff: "رجعت للوضع العادي"
});
Object.assign(T.en, {
  gmTitle: "Good morning ☀️",
  gmEve: "Good evening 🌙",
  gmMatches: "Today's matches",
  gmNew: "New episodes",
  gmNone: "Nothing new",
  gmPrayer: "Next prayer",
  shSave: "Save this link to a show?",
  shLink: "▶ Open the last link sent",
  shSaved: "Saved to",
  guest: "Guest mode",
  guestOn: "👥 Guest mode on — personal items hidden",
  guestOff: "Back to normal"
});
function greet() {
  const d = /* @__PURE__ */ new Date(), key = d.toDateString();
  if (S.greetDay === key || d.getHours() < 5 || on("dlg") || on("player") || S.guest) return;
  S.greetDay = key;
  const lines = [];
  if (typeof weatherNow !== "undefined" && weatherNow) lines.push(`${weatherNow.i} ${weatherNow.t}° ${weatherNow.city || ""}`);
  const np = S.prayerOn && window.nextPrayer && typeof prayers !== "undefined" && prayers.length ? nextPrayer() : null;
  if (np) lines.push(`🕌 ${L("gmPrayer")}: ${L("prayers")[np.i]} ${fmtTime(np.t)}`);
  const ms = (typeof matches !== "undefined" ? matches : []).filter((e) => evState(e) !== "ft");
  if (ms.length) lines.push(`⚽ ${L("gmMatches")}: ` + ms.slice(0, 3).map((e) => `${e.strHomeTeam}×${e.strAwayTeam} ${fmtTime(evTime(e))}`).join(" · "));
  const nw = (S.shows || []).filter((sh) => typeof behind === "function" && behind(sh));
  lines.push(`🎬 ${L("gmNew")}: ` + (nw.length ? nw.map((x) => x.name || x.q).join("، ") : L("gmNone")));
  dialog(d.getHours() < 15 ? L("gmTitle") : L("gmEve"), [{ label: "👍", pri: 1, fn: () => {
  } }], { sub: lines.join("\n") });
}
document.addEventListener("keydown", () => {
  if (document.querySelector("#home.on")) setTimeout(greet, 300);
}, true);
setTimeout(greet, 15e3);
const _remoteCmdD = remoteCmd;
remoteCmd = function(m) {
  const r = _remoteCmdD.apply(this, arguments);
  if (m && m.cmd === "share" && (S.shows || []).length) {
    const u = String(m.u || "");
    setTimeout(() => {
      if (on("player")) return;
      dialog("🎬 " + L("shSave"), (S.shows || []).map((sh, i) => ({ label: sh.name || sh.q, fn: () => {
        const l = (S.shows || []).map((x) => Object.assign({}, x));
        l[i].link = u;
        S.shows = l;
        banner("🎬", L("shSaved") + " " + (sh.name || sh.q), "", 3e3);
      } })).concat([{ label: L("cancel"), fn: () => {
      } }]));
    }, 1500);
  }
  if (m && m.cmd === "voice") {
    if (window.onVoice) onVoice(String(m.t || ""));
    return { ok: 1 };
  }
  if (m && m.cmd === "guest") {
    setGuest(!S.guest);
    return { ok: 1, guest: !!S.guest };
  }
  return r;
};
const _showMenuL = showMenu;
showMenu = function(i) {
  _showMenuL(i);
  const sh = (S.shows || [])[i];
  if (!sh || !sh.link) return;
  const box = $("dbox"), items = box._items, g = box.querySelector(".mgrid,.dlist");
  if (!items || !g) return;
  items.unshift({ icon: "🔗", label: L("shLink"), pri: 1, fn: () => {
    const v = sh.link.match(/(?:youtu\.be\/|v=|shorts\/|live\/)([\w-]{11})/);
    if (v && window.openYt) openYt(v[1]);
    else nat("openUri", sh.link);
  } });
  g.innerHTML = items.map((it, k) => `<button class="btn f${it.pri ? " pri" : ""}" data-di="${k}">${it.icon ? `<b>${esc(it.icon)}</b>` : ""}${esc(it.label)}</button>`).join("");
  focus(g.querySelector(".f"));
};
const VOICE_MAP = [[/^(علي|علّي|ارفع|زود)\s*الصوت/, "vol+"], [/^(وطي|وطّي|قلل|نزل)\s*الصوت/, "vol-"], [/^(الرئيسية|روح الرئيسية|home)$/i, "home"], [/^(رجوع|ارجع|back)$/i, "back"]];
const _onVoiceD = window.onVoice;
window.onVoice = (t) => {
  const s = String(t || "").trim();
  for (const [rx, cmd] of VOICE_MAP) if (rx.test(s)) {
    try {
      tgCmd(cmd);
    } catch (e) {
    }
    banner("🎙", s, "✓", 2500);
    return;
  }
  if (/(سرّع|سرع|تسريع|نضف|نضّف)/.test(s)) {
    boostNow();
    return;
  }
  if (/(اقفل الصوت|كتم|mute)/i.test(s)) {
    try {
      A.volume("mute");
    } catch (e) {
    }
    banner("🔇", s, "", 2e3);
    return;
  }
  if (/^(شغل|شغّل|افتح)?\s*(القرآن|القران|إذاعة القرآن|اذاعة القران)/.test(s)) {
    showPage("lib");
    libCat = "radio";
    renderLib();
    return;
  }
  if (/(وضع الضيوف|guest)/i.test(s)) {
    setGuest(!S.guest);
    return;
  }
  if (/(وضع السينما|سينما|cinema)/i.test(s)) {
    toggleCinema();
    return;
  }
  return _onVoiceD(t);
};
function setGuest(v) {
  const go = () => {
    S.guest = v;
    document.body.classList.toggle("guest", !!v);
    banner("👥", L(v ? "guestOn" : "guestOff"), "", 3e3);
    renderHome();
    if (typeof renderPager === "function") renderPager();
  };
  if (!v && S.pin) guard(true, go);
  else go();
}
document.body.classList.toggle("guest", !!S.guest);
const _renderPagerG = renderPager;
renderPager = function() {
  _renderPagerG();
  const d = $("homePager");
  if (!d) return;
  let b = $("railGuest");
  if (!b) {
    const m = $("railBoost");
    const h = `<button class="rb f" id="railGuest"><b>👥</b><span>${esc(L("guest"))}</span></button>`;
    if (m) m.insertAdjacentHTML("beforebegin", h);
    else d.insertAdjacentHTML("beforeend", h);
    b = $("railGuest");
  }
  b.classList.toggle("on", !!S.guest);
};
activators.unshift((el) => {
  if (el.id === "railGuest") {
    setGuest(!S.guest);
    return true;
  }
  return false;
});
try {
  const v = nat("getPref", "hw");
  if (v) {
    const l = JSON.parse(v);
    if (Array.isArray(l) && l.length && JSON.stringify(l) !== JSON.stringify(S.hw)) S.hw = l;
  }
} catch (e) {
}
