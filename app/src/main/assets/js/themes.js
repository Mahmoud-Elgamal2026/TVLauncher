"use strict";
const THEMES = [
  // ---- Apple ----
  { id: "apple", g: "Apple TV", n: "tvOS 17 · Dark", builtIn: 1, dot: "#ffffff" },
  { id: "tvos-light", g: "Apple TV", n: "tvOS · Light", light: 1, bg: "linear-gradient(135deg,#f4f4f8,#dcdce6)", card: "linear-gradient(160deg,#fff,#e8e8ee)", sel: "#1c1c1e", selText: "#fff", glass: "rgba(0,0,0,.07)", r: "2vh", tabs: "pill", focus: "lift", dot: "#e8e8ee" },
  { id: "tvos-2012", g: "Apple TV", n: "Apple TV · 2012", bg: "radial-gradient(ellipse at 50% 0,#4a4a4a,#141414 70%)", card: "linear-gradient(180deg,#6a6a6a,#2c2c2c)", sel: "#fff", selText: "#000", glass: "rgba(255,255,255,.08)", r: ".8vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #fff", dot: "#6a6a6a" },
  // ---- Google / Android TV ----
  { id: "google", g: "Google / Android TV", n: "Google TV", builtIn: 1, dot: "#8ab4f8" },
  { id: "gtv-you", g: "Google / Android TV", n: "Google TV 2024 · Material You", bg: "linear-gradient(135deg,#1d1b22,#141218)", card: "#2b2930", sel: "#d0bcff", selText: "#381e72", glass: "#2b2930", r: "2.6vh", tabs: "underline", focus: "ring", ring: "0 0 0 .45vh #d0bcff", accent: "#d0bcff", dot: "#d0bcff" },
  { id: "atv-oreo", g: "Google / Android TV", n: "Android TV 8–11", bg: "linear-gradient(180deg,#212121,#121212)", card: "#303030", sel: "#fff", selText: "#000", glass: "#2a2a2a", r: ".6vh", tabs: "plain", focus: "scale", ring: "0 0 0 .3vh #fff", dot: "#303030" },
  { id: "atv-leanback", g: "Google / Android TV", n: "Android TV 5–7 · Leanback", bg: "linear-gradient(135deg,#37474f,#1c262b)", card: "#546e7a", sel: "#26a69a", selText: "#fff", glass: "rgba(255,255,255,.08)", r: ".3vh", tabs: "plain", focus: "scale", ring: "0 0 0 .35vh #fff", dot: "#26a69a" },
  { id: "atv-2017", g: "Google / Android TV", n: "Android TV · Classic home", bg: "linear-gradient(115deg,#1f2a55 0%,#2c2f63 40%,#4a2d62 70%,#7a2f5a 100%)", card: "#f2f2f2", sel: "#fff", selText: "#202124", glass: "rgba(255,255,255,.1)", r: ".4vh", tabs: "plain", focus: "scale", ring: "0 0 0 .3vh #fff", dot: "#e53935", classicAtv: 1 },
  { id: "shield", g: "Google / Android TV", n: "NVIDIA Shield", bg: "radial-gradient(circle at 80% 0,#203314,#0a0a0a 60%)", card: "#1f1f1f", sel: "#76b900", selText: "#000", glass: "#1c1c1c", r: ".6vh", tabs: "underline", focus: "ring", ring: "0 0 0 .4vh #76b900", accent: "#76b900", dot: "#76b900" },
  { id: "bravia", g: "Google / Android TV", n: "Sony Bravia", bg: "linear-gradient(135deg,#1b2129,#0b0e12)", card: "#2a313b", sel: "#e6e6e6", selText: "#111", glass: "rgba(255,255,255,.07)", r: ".5vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #e6e6e6", dot: "#2a313b" },
  // ---- Samsung ----
  { id: "tizen", g: "Samsung", n: "Tizen · One UI", bg: "linear-gradient(160deg,#0c1f45,#050a18 70%)", card: "rgba(255,255,255,.09)", sel: "#fff", selText: "#0c1f45", glass: "rgba(255,255,255,.1)", r: "1.6vh", tabs: "bottom", focus: "lift", ring: "0 0 0 .35vh #fff", dot: "#1d4ed8" },
  { id: "smarthub", g: "Samsung", n: "Smart Hub · 2016", bg: "radial-gradient(ellipse at 50% 100%,#1b2a52,#000 70%)", card: "linear-gradient(180deg,#2f4a85,#16264d)", sel: "#5ab0ff", selText: "#001", glass: "rgba(255,255,255,.08)", r: ".4vh", tabs: "bottom", focus: "glow", ring: "0 0 0 .3vh #5ab0ff", accent: "#5ab0ff", dot: "#2f4a85" },
  // ---- LG ----
  { id: "webos", g: "LG", n: "webOS · Launcher bar", bg: "linear-gradient(135deg,#2b0d3f,#0f1238)", card: "linear-gradient(160deg,#3a1d5c,#1d1440)", sel: "#ff3d8b", selText: "#fff", glass: "rgba(255,255,255,.1)", r: "1vh", tabs: "bottom", focus: "lift", ring: "0 0 0 .4vh #ff3d8b", accent: "#ff3d8b", dot: "#ff3d8b" },
  { id: "webos22", g: "LG", n: "webOS 22+", bg: "linear-gradient(180deg,#1c1c1c,#0d0d0d)", card: "#2a2a2a", sel: "#c4024f", selText: "#fff", glass: "#262626", r: "2vh", tabs: "pill", focus: "ring", ring: "0 0 0 .4vh #fff", dot: "#c4024f" },
  // ---- Amazon / Roku / Xiaomi ----
  { id: "firetv", g: "Amazon · Roku · Xiaomi", n: "Fire TV", bg: "linear-gradient(180deg,#13233b,#0a1424)", card: "#1d2f4a", sel: "#ff9900", selText: "#111", glass: "#18273e", r: "1vh", tabs: "underline", focus: "ring", ring: "0 0 0 .4vh #fff", accent: "#ff9900", dot: "#ff9900" },
  { id: "roku", g: "Amazon · Roku · Xiaomi", n: "Roku", bg: "linear-gradient(135deg,#3b0d63,#1c0533)", card: "#4a1a75", sel: "#fff", selText: "#4a0d6b", glass: "rgba(255,255,255,.1)", r: "1vh", tabs: "plain", focus: "ring", ring: "0 0 0 .45vh #fff", dot: "#6c2bd9" },
  { id: "patchwall", g: "Amazon · Roku · Xiaomi", n: "Xiaomi PatchWall", light: 1, bg: "linear-gradient(180deg,#fafafa,#ececf0)", card: "#ffffff", sel: "#ff6900", selText: "#fff", glass: "rgba(0,0,0,.06)", r: "1.4vh", tabs: "underline", focus: "ring", ring: "0 0 0 .4vh #ff6900", accent: "#ff6900", dot: "#ff6900" },
  // ---- Consoles & media centers ----
  { id: "xbox", g: "Consoles · Media centers", n: "Xbox", bg: "radial-gradient(circle at 75% 15%,#1d5a26,#0b0b0b 60%)", card: "#1f1f1f", sel: "#107c10", selText: "#fff", glass: "#1a1a1a", r: ".3vh", tabs: "plain", focus: "ring", ring: "0 0 0 .45vh #fff", dot: "#107c10" },
  { id: "ps5", g: "Consoles · Media centers", n: "PlayStation 5", bg: "radial-gradient(circle at 70% -10%,#1d3f80,#05070f 65%)", card: "rgba(255,255,255,.08)", sel: "#fff", selText: "#000", glass: "rgba(255,255,255,.08)", r: "1.8vh", tabs: "plain", focus: "lift", ring: "0 0 0 .3vh #fff", dot: "#1d3f80" },
  { id: "wmc", g: "Consoles · Media centers", n: "Windows Media Center", bg: "radial-gradient(ellipse at 30% 20%,#2a7fd4,#062a5a 70%)", card: "linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.05))", sel: "#7cd651", selText: "#04210a", glass: "rgba(255,255,255,.1)", r: ".6vh", tabs: "plain", focus: "glow", ring: "0 0 0 .3vh #b6ff8f", accent: "#7cd651", dot: "#2a7fd4" },
  { id: "plex", g: "Consoles · Media centers", n: "Plex", bg: "radial-gradient(ellipse at 75% 0,#3a3325 0,#1f1f1f 55%,#141414 100%)", card: "#2b2b2b", sel: "#e5a00d", selText: "#000", glass: "rgba(255,255,255,.07)", r: ".5vh", tabs: "underline", focus: "ring", ring: "0 0 0 .35vh #e5a00d", accent: "#e5a00d", dot: "#e5a00d" },
  { id: "kodi", g: "Consoles · Media centers", n: "Kodi · Estuary", bg: "linear-gradient(135deg,#132835,#0a141b)", card: "#1b3442", sel: "#12a0c7", selText: "#fff", glass: "#16303d", r: ".4vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #12a0c7", accent: "#12a0c7", dot: "#12a0c7" },
  // ---- Launcher originals ----
  { id: "classic", g: "Originals", n: "Classic", builtIn: 1, dot: "#4f7cff" },
  { id: "light", g: "Originals", n: "Light", builtIn: 1, light: 1, dot: "#eeeeee" },
  { id: "neon", g: "Originals", n: "Neon", builtIn: 1, dot: "#b14bff" },
  { id: "amoled", g: "Originals", n: "AMOLED Black", bg: "#000", card: "#0c0c0c", sel: "#fff", selText: "#000", glass: "#111", r: "1.4vh", tabs: "pill", focus: "ring", ring: "0 0 0 .3vh #fff", dot: "#000" },
  { id: "ramadan", g: "Originals", n: "رمضاني · Ramadan", bg: "radial-gradient(circle at 80% 10%,#16305c,#070d1e 65%)", card: "linear-gradient(160deg,#1b2b52,#0d1630)", sel: "#d9b25c", selText: "#1a1203", glass: "rgba(217,178,92,.12)", r: "1.6vh", tabs: "pill", focus: "glow", ring: "0 0 0 .3vh #d9b25c", accent: "#d9b25c", dot: "#d9b25c" }
];
function themeCss(t) {
  const b = `body[data-theme="${t.id}"]`;
  let c = `${b}{--card:${t.card};--sel:${t.sel};--selText:${t.selText};--glass:${t.glass};--r:${t.r};--ring:${t.ring || "0 0 0 0 transparent"}}
${b} #shelfBg{background:${t.bg}}`;
  c += t.light ? `
${b}{--text:#111;--mute:#666}
${b} #shelfImg{filter:blur(60px) saturate(1.3) brightness(1.2);opacity:.12}
${b} #shade{background:linear-gradient(180deg,rgba(245,245,248,.3) 0,rgba(245,245,248,.85) 42%,rgba(240,240,244,.98) 66%)}
${b} #shelfTitle{text-shadow:none}body.lite${b} .tabs,body.lite${b} .btn,body.lite${b} .inp,body.lite${b} .it,body.lite${b} .chrow,body.lite${b} .qbtn,body.lite${b} .key{background:rgba(0,0,0,.07)}body.lite${b} .mbox{background:#fff}${b} .mbox{background:rgba(255,255,255,.94)}${b} #search{background:rgba(245,245,248,.95)}${b} .app{box-shadow:0 .4vh 1.4vh rgba(0,0,0,.08)}` : `
${b} #shelfImg{opacity:${t.id === "amoled" ? 0 : 0.16}}
${b} #shade{background:linear-gradient(180deg,rgba(0,0,0,0) 0,rgba(0,0,0,.18) 45%,rgba(0,0,0,.55) 100%)}`;
  if (t.accent) c += `
${b} .ticker span{border:1px solid ${t.accent}55}${b} .prog i,${b} .bar i{background:${t.accent}}`;
  if (t.tabs === "underline") c += `
${b} .tabs{background:transparent;backdrop-filter:none;gap:.5vw}
${b} .tab{color:var(--mute)}${b} .tab.on{background:transparent;color:var(--text);box-shadow:inset 0 -.4vh 0 var(--sel);border-radius:0}
${b} .tab.f.focus{background:var(--sel);color:var(--selText);border-radius:99px;box-shadow:none}`;
  if (t.tabs === "plain") c += `
${b} .tabs{background:transparent;backdrop-filter:none;gap:.4vw}${b} .tab{color:var(--mute)}
${b} .tab.on{background:transparent;color:var(--text);font-weight:700}${b} .tab.f.focus{background:var(--sel);color:var(--selText)}`;
  if (t.tabs === "bottom") c += `
${b} .tabs{position:fixed;bottom:2.2vh;left:50%;transform:translateX(-50%);z-index:20;padding:.8vh;border-radius:2vh;background:rgba(10,12,20,.82);backdrop-filter:blur(24px);box-shadow:0 1.5vh 4vh rgba(0,0,0,.5)}
${b} .tab{padding:1.2vh 2vw}${b} .scroll{padding-bottom:16vh}${b} .hint{display:none}${b} #shelf{height:24vh}`;
  if (t.focus === "ring") c += `
${b} .app.f.focus,${b} .poster.f.focus,${b} .chrow.f.focus,${b} .btn.f.focus,${b} .it.f.focus{transform:scale(1.05);box-shadow:var(--ring),0 1.4vh 3vh rgba(0,0,0,.5)}${b} .app.f.focus::after,${b} .it.f.focus::after{display:none}`;
  if (t.focus === "scale") c += `
${b} .app.f.focus,${b} .poster.f.focus{transform:scale(1.14);box-shadow:0 1.4vh 3vh rgba(0,0,0,.6)}${b} .app.f.focus::after{display:none}${b} .app .nm{opacity:1}`;
  if (t.focus === "glow") c += `
${b} .app.f.focus,${b} .poster.f.focus,${b} .chrow.f.focus,${b} .btn.f.focus,${b} .it.f.focus{transform:scale(1.06);box-shadow:var(--ring),0 0 4vh ${t.accent || t.sel}}`;
  if (t.id === "plex") c += `
${b} .tab.on{color:#e5a00d!important;box-shadow:inset 0 -.4vh 0 #e5a00d!important}
${b} h2{color:#fff;font-weight:700;font-size:2.3vh;letter-spacing:.02em}
${b} .app{border:1px solid rgba(255,255,255,.06)}
${b} .app .nm{color:#bbb}${b} .app.focus .nm{color:#e5a00d}
${b} .btn.pri,${b} .it.sel{background:#e5a00d;color:#000}`;
  if (t.classicAtv) c += `
${b} #shelfImg,${b} #shade{display:none}
${b} #shelf{height:3vh;padding:0}${b} #shelfTitle,${b} #shelfSub{display:none}
${b} #home .scroll{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-content:flex-start;align-content:flex-start;padding-top:0}
${b} #home .scroll>#shelf{width:100%}
${b} #home h2{width:9vw;-webkit-flex:none;flex:none;margin:0;padding-top:4.2vh;text-align:center;font-size:1.55vh;font-weight:500;color:rgba(255,255,255,.85)}
${b} #home h2::before{content:"";display:block;width:6.4vh;height:6.4vh;margin:0 auto 1vh;border-radius:50%;background:#e53935 center/55% no-repeat;box-shadow:0 .6vh 1.4vh rgba(0,0,0,.35)}
${b} #home h2[data-i18n=favorites]::before{background-color:#e53935;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z'/%3E%3C/svg%3E")}
${b} #home h2[data-row=watchRow]::before{background-color:#4285f4;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E")}
${b} #home h2[data-row=favChRow]::before{background-color:#e53935;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M21 6h-7.6l3.3-3.3-.7-.7L12 6 8 2l-.7.7L10.6 6H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm0 14H3V8h18z'/%3E%3C/svg%3E")}
${b} #home h2[data-row=matchRow]::before{background-color:#0f9d58;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M12 7l4 3-1.5 4.5h-5L8 10z'/%3E%3C/svg%3E")}
${b} #home h2[data-row=folderRow]::before{background-color:#f4b400;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z'/%3E%3C/svg%3E")}
${b} #home h2[data-row=quickRow]::before{background-color:#7e57c2;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 2v11h3v9l7-12h-4l4-8z'/%3E%3C/svg%3E")}
${b} #home h2[data-row=recentRow]::before{background-color:#546e7a;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7zm-1 5v5l4 2.5.8-1.3-3.3-2V8z'/%3E%3C/svg%3E")}
${b} #home .row{width:calc(100% - 9vw);-webkit-flex:none;flex:none;padding:3.2vh 1vw 3.4vh;margin-bottom:0}
${b} #home .row .app{width:calc(var(--tile,16vw) * .82);border-radius:.3vh}
${b} #home #favRow .app{background:#f2f2f2}${b} #home .app .lbl{color:#202124;text-shadow:none}
${b} #home #favRow .app img:not(.banner):not(.cover){max-width:62%;max-height:62%}
${b} #home .app .nm{color:#fff;font-size:1.6vh;opacity:0}${b} #home .app.focus .nm{opacity:1}
${b} #home .app.f.focus{transform:scale(1.18);box-shadow:0 1.6vh 3.2vh rgba(0,0,0,.55)}
${b} .top .tabs{background:rgba(255,255,255,.08)}
${b} .qbtn{background:rgba(255,255,255,.1)}`;
  return c;
}
(function() {
  const st = document.createElement("style");
  st.id = "themeCss";
  st.textContent = THEMES.filter((t) => !t.builtIn).map(themeCss).join("\n");
  document.head.appendChild(st);
})();
function themePicker() {
  const groups = [...new Set(THEMES.map((t) => t.g))];
  return groups.map((g) => `<div class="tgroup"><span class="tg">${esc(g === "Originals" ? S.lang === "ar" ? "تصميمات اللانشر" : "Launcher originals" : g)}</span><div class="inline">${THEMES.filter((t) => t.g === g).map((t) => `<button class="btn f tbtn${S.theme === t.id ? " pri" : ""}" data-set="theme:${t.id}"><i class="tdot" style="background:${t.dot}"></i>${esc(t.n)}</button>`).join("")}</div></div>`).join("");
}
