Object.assign(T.ar, {
  wlTitle: "أهلاً بيك 👋",
  wlLang: "اختار اللغة",
  wlCity: "مدينتك (للصلاة والطقس)",
  wlFav: "اختار التطبيقات اللي بتستخدمها (تظهر في الرئيسية)",
  wlDone: "خلصت ✓",
  wlSkip: "بعدين",
  advShow: "⚙️ إظهار الإعدادات المتقدمة (IPTV، تيليجرام، EPG…)",
  advHide: "⚙️ إخفاء الإعدادات المتقدمة",
  report: "📮 ابعت مشكلة أو اقتراح",
  reportSub: "صوّر الكود بالموبايل — هيفتح صفحة فيها بيانات جهازك جاهزة، اكتب المشكلة وابعت"
});
Object.assign(T.en, {
  wlTitle: "Welcome 👋",
  wlLang: "Choose your language",
  wlCity: "Your city (prayer times & weather)",
  wlFav: "Pick the apps you use (they show on Home)",
  wlDone: "Done ✓",
  wlSkip: "Later",
  advShow: "⚙️ Show advanced settings (IPTV, Telegram, EPG…)",
  advHide: "⚙️ Hide advanced settings",
  report: "📮 Report a problem or idea",
  reportSub: "Scan with your phone — a page opens with your device details filled in; describe the problem and send"
});
function welcome() {
  dialog(L("wlTitle") + " · " + L("wlLang"), [
    { label: "العربية", pri: S.lang === "ar", fn: () => {
      S.lang = "ar";
      applyLang();
      setTimeout(wlCity, 60);
    } },
    { label: "English", pri: S.lang !== "ar", fn: () => {
      S.lang = "en";
      applyLang();
      setTimeout(wlCity, 60);
    } },
    { label: L("wlSkip"), fn: () => {
      S.welcomed = true;
    } }
  ], { grid: 3 });
}
function wlCity() {
  prompt2(L("wlCity"), S.city || "", (v) => {
    if (v) {
      S.city = v;
      S.loc = null;
      try {
        weather();
      } catch (e) {
      }
    }
    setTimeout(wlFav, 60);
  }, "Cairo");
}
function wlFav() {
  const pick = new Set(S.favs || []), list = visibleApps().filter((a) => a.pkg !== "com.mahmoud.tvlauncher").slice(0, 60);
  const draw = () => dialog(L("wlFav"), list.map((a) => ({ icon: pick.has(a.pkg) ? "⭐" : "▫️", label: appName(a), keep: 1, fn: () => {
    pick.has(a.pkg) ? pick.delete(a.pkg) : pick.add(a.pkg);
    const f = focused && focused.dataset.di;
    draw();
    const b = $("dbox").querySelector('[data-di="' + f + '"]');
    if (b) focus(b);
  } })).concat([{ label: L("wlDone"), pri: 1, fn: () => {
    S.favs = [...pick];
    S.welcomed = true;
    S.favSeeded = true;
    renderHome();
  } }]), { grid: 3 });
  draw();
}
setTimeout(() => {
  if (!S.welcomed) {
    if ((S.favs || []).length && S.setupSeen) {
      S.welcomed = true;
      return;
    }
    closeDialog();
    welcome();
  }
}, 3500);
DEF.advanced = false;
const ADV_RX = /IPTV|تيليجرام|Telegram|^القنوات$|^Channels$|قنوات مجانية|Free channels|مشغّل القنوات|Channel player|تسجيل|Recording|زراير الريموت|Remote buttons|تشغيل البوكس|Start-up|جدول تشغيل|Screen schedule/i;
const _renderSettingsA = renderSettings;
renderSettings = function() {
  _renderSettingsA.apply(this, arguments);
  const box = $("setScroll");
  if (!box) return;
  box.querySelectorAll(".sec").forEach((sc) => {
    const h = sc.querySelector("h3");
    if (h && ADV_RX.test(h.textContent)) sc.classList.add("advsec");
  });
  document.body.classList.toggle("showadv", !!S.advanced);
  if (!$("advBtn")) box.insertAdjacentHTML("beforeend", `<div class="sec"><div class="inline"><button class="btn f" id="advBtn">${esc(L(S.advanced ? "advHide" : "advShow"))}</button><button class="btn pri f" id="reportBtn">${esc(L("report"))}</button></div></div>`);
};
pageHooks["settings:enter"] = renderSettings;
const errLog = [];
window.addEventListener("error", (e) => {
  errLog.push((e.message || "") + " @" + String(e.filename || "").split("/").pop() + ":" + e.lineno);
  if (errLog.length > 8) errLog.shift();
});
function reportDialog() {
  let dev = {};
  try {
    dev = JSON.parse(nat("memInfo") || "{}");
  } catch (e) {
  }
  const ver = nat("versionName") || "?", ua = navigator.userAgent.replace(/\s+/g, " ").slice(0, 160);
  const body = `**Version:** ${ver}
**WebView:** ${ua}
**RAM:** ${dev.total ? Math.round(dev.total / 1048576) + " MB" : "?"}
**Theme/Design:** ${S.theme}/${S.design || "-"}
**Recent errors:**
${errLog.join("\n") || "none"}

**What happened?**
`;
  const url = "https://github.com/Mahmoud-Elgamal2026/TVLauncher/issues/new?title=" + encodeURIComponent("[" + ver + "] ") + "&body=" + encodeURIComponent(body);
  dialog(L("report"), [{ label: L("done"), fn: () => {
  } }], { html: `<div style="display:flex;align-items:center;justify-content:center;gap:2vw"><div style="background:#fff;padding:1.2vh;border-radius:1.4vh;line-height:0">${qrSvg(url, 320)}</div><div style="font-size:2vh;line-height:1.8;max-width:30vw">${esc(L("reportSub"))}</div></div><div class="dlist" style="margin-top:1vh"><button class="btn pri f" data-di="0">${L("done")}</button></div>` });
}
activators.unshift((el) => {
  if (el.id === "advBtn") {
    S.advanced = !S.advanced;
    renderSettings();
    focus($("advBtn"));
    return true;
  }
  if (el.id === "reportBtn") {
    reportDialog();
    return true;
  }
  return false;
});
