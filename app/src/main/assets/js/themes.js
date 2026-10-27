"use strict";
const THEMES = [
  // ---- Apple ----
  { id: "apple", g: "Apple TV", n: "tvOS 17 · Dark", builtIn: 1, dot: "#ffffff" },
  { id: "tvos-light", g: "Apple TV", n: "tvOS · Light", light: 1, bg: "linear-gradient(135deg,#f4f4f8,#dcdce6)", card: "linear-gradient(160deg,#fff,#e8e8ee)", sel: "#1c1c1e", selText: "#fff", glass: "rgba(0,0,0,.07)", r: "2vh", tabs: "pill", focus: "lift", dot: "#e8e8ee", lay: "hero" },
  { id: "tvos-2012", g: "Apple TV", n: "Apple TV · 2012", bg: "radial-gradient(ellipse at 50% 0,#4a4a4a,#141414 70%)", card: "linear-gradient(180deg,#6a6a6a,#2c2c2c)", sel: "#fff", selText: "#000", glass: "rgba(255,255,255,.08)", r: ".8vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #fff", dot: "#6a6a6a", lay: "hero" },
  // ---- Google / Android TV ----
  { id: "google", g: "Google / Android TV", n: "Google TV", builtIn: 1, dot: "#8ab4f8", lay: "gtv" },
  { id: "gtv-you", g: "Google / Android TV", n: "Google TV 2024 · Material You", bg: "linear-gradient(135deg,#1d1b22,#141218)", card: "#2b2930", sel: "#d0bcff", selText: "#381e72", glass: "#2b2930", r: "2.6vh", tabs: "underline", focus: "ring", ring: "0 0 0 .45vh #d0bcff", accent: "#d0bcff", dot: "#d0bcff", lay: "gtv" },
  { id: "atv-oreo", g: "Google / Android TV", n: "Android TV 8–11", bg: "linear-gradient(180deg,#212121,#121212)", card: "#303030", sel: "#fff", selText: "#000", glass: "#2a2a2a", r: ".6vh", tabs: "plain", focus: "scale", ring: "0 0 0 .3vh #fff", dot: "#303030", classicAtv: 1 },
  { id: "atv-leanback", g: "Google / Android TV", n: "Android TV 5–7 · Leanback", bg: "linear-gradient(135deg,#37474f,#1c262b)", card: "#546e7a", sel: "#26a69a", selText: "#fff", glass: "rgba(255,255,255,.08)", r: ".3vh", tabs: "plain", focus: "scale", ring: "0 0 0 .35vh #fff", dot: "#26a69a", classicAtv: 1 },
  { id: "atv-2017", g: "Google / Android TV", n: "Android TV · Classic home", bg: "linear-gradient(115deg,#1f2a55 0%,#2c2f63 40%,#4a2d62 70%,#7a2f5a 100%)", card: "#f2f2f2", sel: "#fff", selText: "#202124", glass: "rgba(255,255,255,.1)", r: ".4vh", tabs: "plain", focus: "scale", ring: "0 0 0 .3vh #fff", dot: "#e53935", classicAtv: 1 },
  { id: "gtv-round", g: "Google / Android TV", n: "Google TV · Round apps", bg: "radial-gradient(ellipse at 70% 0,#2a3140 0,#14161b 60%,#0d0e11 100%)", card: "#262a31", sel: "#e8eaed", selText: "#202124", glass: "rgba(255,255,255,.08)", r: "1.2vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #fff", dot: "#8ab4f8", roundApps: 1 },
  { id: "shield", g: "Google / Android TV", n: "NVIDIA Shield", bg: "radial-gradient(circle at 80% 0,#203314,#0a0a0a 60%)", card: "#1f1f1f", sel: "#76b900", selText: "#000", glass: "#1c1c1c", r: ".6vh", tabs: "underline", focus: "ring", ring: "0 0 0 .4vh #76b900", accent: "#76b900", dot: "#76b900", lay: "poster" },
  { id: "bravia", g: "Google / Android TV", n: "Sony Bravia", bg: "linear-gradient(135deg,#1b2129,#0b0e12)", card: "#2a313b", sel: "#e6e6e6", selText: "#111", glass: "rgba(255,255,255,.07)", r: ".5vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #e6e6e6", dot: "#2a313b", lay: "poster" },
  // ---- Samsung ----
  { id: "tizen", g: "Samsung", n: "Tizen · One UI", bg: "linear-gradient(160deg,#0c1f45,#050a18 70%)", card: "rgba(255,255,255,.09)", sel: "#fff", selText: "#0c1f45", glass: "rgba(255,255,255,.1)", r: "1.6vh", tabs: "bottom", focus: "lift", ring: "0 0 0 .35vh #fff", dot: "#1d4ed8", lay: "bar" },
  { id: "smarthub", g: "Samsung", n: "Smart Hub · 2016", bg: "radial-gradient(ellipse at 50% 100%,#1b2a52,#000 70%)", card: "linear-gradient(180deg,#2f4a85,#16264d)", sel: "#5ab0ff", selText: "#001", glass: "rgba(255,255,255,.08)", r: ".4vh", tabs: "bottom", focus: "glow", ring: "0 0 0 .3vh #5ab0ff", accent: "#5ab0ff", dot: "#2f4a85", lay: "bar" },
  // ---- LG ----
  { id: "webos", g: "LG", n: "webOS · Launcher bar", bg: "linear-gradient(135deg,#2b0d3f,#0f1238)", card: "linear-gradient(160deg,#3a1d5c,#1d1440)", sel: "#ff3d8b", selText: "#fff", glass: "rgba(255,255,255,.1)", r: "1vh", tabs: "bottom", focus: "lift", ring: "0 0 0 .4vh #ff3d8b", accent: "#ff3d8b", dot: "#ff3d8b", lay: "bar" },
  { id: "webos22", g: "LG", n: "webOS 22+", bg: "linear-gradient(180deg,#1c1c1c,#0d0d0d)", card: "#2a2a2a", sel: "#c4024f", selText: "#fff", glass: "#262626", r: "2vh", tabs: "pill", focus: "ring", ring: "0 0 0 .4vh #fff", dot: "#c4024f", lay: "bar" },
  // ---- Amazon / Roku / Xiaomi ----
  { id: "firetv", g: "Amazon · Roku · Xiaomi", n: "Fire TV", bg: "linear-gradient(180deg,#13233b,#0a1424)", card: "#1d2f4a", sel: "#ff9900", selText: "#111", glass: "#18273e", r: "1vh", tabs: "underline", focus: "ring", ring: "0 0 0 .4vh #fff", accent: "#ff9900", dot: "#ff9900", lay: "grid" },
  { id: "roku", g: "Amazon · Roku · Xiaomi", n: "Roku", bg: "linear-gradient(135deg,#3b0d63,#1c0533)", card: "#4a1a75", sel: "#fff", selText: "#4a0d6b", glass: "rgba(255,255,255,.1)", r: "1vh", tabs: "plain", focus: "ring", ring: "0 0 0 .45vh #fff", dot: "#6c2bd9", lay: "grid" },
  { id: "patchwall", g: "Amazon · Roku · Xiaomi", n: "Xiaomi PatchWall", light: 1, bg: "linear-gradient(180deg,#fafafa,#ececf0)", card: "#ffffff", sel: "#ff6900", selText: "#fff", glass: "rgba(0,0,0,.06)", r: "1.4vh", tabs: "underline", focus: "ring", ring: "0 0 0 .4vh #ff6900", accent: "#ff6900", dot: "#ff6900", lay: "poster" },
  // ---- Consoles & media centers ----
  { id: "xbox", g: "Consoles · Media centers", n: "Xbox", bg: "radial-gradient(circle at 75% 15%,#1d5a26,#0b0b0b 60%)", card: "#1f1f1f", sel: "#107c10", selText: "#fff", glass: "#1a1a1a", r: ".3vh", tabs: "plain", focus: "ring", ring: "0 0 0 .45vh #fff", dot: "#107c10", lay: "xbox" },
  { id: "ps5", g: "Consoles · Media centers", n: "PlayStation 5", bg: "radial-gradient(circle at 70% -10%,#1d3f80,#05070f 65%)", card: "rgba(255,255,255,.08)", sel: "#fff", selText: "#000", glass: "rgba(255,255,255,.08)", r: "1.8vh", tabs: "plain", focus: "lift", ring: "0 0 0 .3vh #fff", dot: "#1d3f80", lay: "psrow" },
  { id: "wmc", g: "Consoles · Media centers", n: "Windows Media Center", bg: "radial-gradient(ellipse at 30% 20%,#2a7fd4,#062a5a 70%)", card: "linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.05))", sel: "#7cd651", selText: "#04210a", glass: "rgba(255,255,255,.1)", r: ".6vh", tabs: "plain", focus: "glow", ring: "0 0 0 .3vh #b6ff8f", accent: "#7cd651", dot: "#2a7fd4", lay: "sidelist" },
  { id: "plex", g: "Consoles · Media centers", n: "Plex", bg: "radial-gradient(ellipse at 75% 0,#3a3325 0,#1f1f1f 55%,#141414 100%)", card: "#2b2b2b", sel: "#e5a00d", selText: "#000", glass: "rgba(255,255,255,.07)", r: ".5vh", tabs: "underline", focus: "ring", ring: "0 0 0 .35vh #e5a00d", accent: "#e5a00d", dot: "#e5a00d", lay: "sidelist" },
  { id: "kodi", g: "Consoles · Media centers", n: "Kodi · Estuary", bg: "linear-gradient(135deg,#132835,#0a141b)", card: "#1b3442", sel: "#12a0c7", selText: "#fff", glass: "#16303d", r: ".4vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #12a0c7", accent: "#12a0c7", dot: "#12a0c7", lay: "sidelist" },
  // ---- Launcher originals ----
  { id: "classic", g: "Originals", n: "Classic", builtIn: 1, dot: "#4f7cff", lay: "grid" },
  { id: "light", g: "Originals", n: "Light", builtIn: 1, light: 1, dot: "#eeeeee" },
  { id: "neon", g: "Originals", n: "Neon", builtIn: 1, dot: "#b14bff", lay: "psrow" },
  { id: "startpage", g: "Originals", n: "Start page · صفحة البداية", bg: "linear-gradient(110deg,#0d3b55 0%,#1d2a33 30%,#24262b 55%,#5a2f1a 85%,#7a3a17 100%)", card: "rgba(255,255,255,.06)", sel: "#e8eaed", selText: "#111", glass: "rgba(255,255,255,.07)", r: "1.6vh", tabs: "underline", focus: "ring", ring: "0 0 0 .3vh rgba(255,255,255,.85)", dot: "#7a3a17", startPage: 1 },
  { id: "dock", g: "Originals", n: "Dock · لوحات جانبية", bg: "radial-gradient(ellipse at 60% 30%,#16263f 0,#070b14 70%)", card: "rgba(20,24,36,.72)", sel: "#8b8cff", selText: "#fff", glass: "rgba(12,16,26,.62)", r: "1.6vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #fff", dot: "#8b8cff", dock: 1 },
  { id: "amoled", g: "Originals", n: "AMOLED Black", bg: "#000", card: "#0c0c0c", sel: "#fff", selText: "#000", glass: "#111", r: "1.4vh", tabs: "pill", focus: "ring", ring: "0 0 0 .3vh #fff", dot: "#000", lay: "bar" },
  { id: "ramadan", g: "Originals", n: "رمضاني · Ramadan", bg: "radial-gradient(circle at 80% 10%,#16305c,#070d1e 65%)", card: "linear-gradient(160deg,#1b2b52,#0d1630)", sel: "#d9b25c", selText: "#1a1203", glass: "rgba(217,178,92,.12)", r: "1.6vh", tabs: "pill", focus: "glow", ring: "0 0 0 .3vh #d9b25c", accent: "#d9b25c", dot: "#d9b25c", lay: "poster" },
  { id: "vidaa", g: "Hisense · Others", n: "Hisense VIDAA", bg: "linear-gradient(120deg,#1a0b3d 0%,#3a136e 45%,#7b1fa2 75%,#b0326e 100%)", card: "#ffffff", sel: "#fff", selText: "#3a136e", glass: "rgba(255,255,255,.1)", r: ".5vh", tabs: "plain", focus: "ring", ring: "0 0 0 .35vh #fff", dot: "#7b1fa2", vidaa: 1 }
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
${b} .tab.on:not(.focus){color:#e5a00d!important;box-shadow:inset 0 -.4vh 0 #e5a00d!important}
${b} h2{color:#fff;font-weight:700;font-size:2.3vh;letter-spacing:.02em}
${b} .app{border:1px solid rgba(255,255,255,.06)}
${b} .app .nm{color:#bbb}${b} .app.focus .nm{color:#e5a00d}
${b} .btn.pri,${b} .it.sel{background:#e5a00d;color:#000}`;
  if (t.lay === "gtv") c += `
${b}[data-page=home] #shelf{height:44vh}${b}[data-page=home] #shelfTitle{font-size:6.4vh;font-weight:500}
${b}[data-page=home] #home .scroll{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}
${b}[data-page=home] #home h2[data-row=recentRow]{-webkit-order:1;order:1}${b}[data-page=home] #recentRow{-webkit-order:2;order:2}${b}[data-page=home] #home h2[data-i18n=favorites]{-webkit-order:3;order:3}${b}[data-page=home] #favRow{-webkit-order:4;order:4}${b}[data-page=home] #watchRow,${b}[data-page=home] #folderRow,${b}[data-page=home] #matchRow,${b}[data-page=home] #favChRow,${b}[data-page=home] #quickRow,${b}[data-page=home] h2[data-row=watchRow],${b}[data-page=home] h2[data-row=folderRow],${b}[data-page=home] h2[data-row=matchRow],${b}[data-page=home] h2[data-row=favChRow],${b}[data-page=home] h2[data-row=quickRow],${b}[data-page=home] .dockx{-webkit-order:5;order:5}${b}[data-page=home] #home h2[data-row=watchRow],${b}[data-page=home] #watchRow{-webkit-order:6;order:6}${b}[data-page=home] #shelf{-webkit-order:0;order:0}${b}[data-page=home] #home .scroll>.row{margin-bottom:0}${b}[data-page=home] #home .scroll>*{-webkit-flex-shrink:0;flex-shrink:0}
${b}[data-page=home] #home .row .app{width:calc(var(--tile,16vw) * .78)}`;
  if (t.lay === "bar") c += `
${b}[data-page=home] #shelf{height:58vh;padding-bottom:4vh}${b}[data-page=home] #shelfTitle{font-size:8vh}
${b}[data-page=home] #home .scroll>h2,${b}[data-page=home] #watchRow,${b}[data-page=home] #folderRow,${b}[data-page=home] #matchRow,${b}[data-page=home] #favChRow,${b}[data-page=home] #quickRow,${b}[data-page=home] #recentRow{display:none}
${b}[data-page=home] #favRow{position:fixed;left:0;right:0;bottom:12vh;padding:2.4vh 4vw 3vh;background:linear-gradient(0deg,rgba(0,0,0,.75),rgba(0,0,0,0));gap:1.2vw;z-index:5}
${b}[data-page=home] #favRow .app{width:11.5vw;border-radius:1vh}${b}[data-page=home] #favRow .app .nm{opacity:1}`;
  if (t.lay === "grid") c += `
${b}[data-page=home] #shelf{height:4vh}${b}[data-page=home] #shelfTitle,${b}[data-page=home] #shelfSub{display:none}
${b}[data-page=home] #favRow{-webkit-flex-wrap:wrap;flex-wrap:wrap;overflow:visible;gap:2.6vh 1.6vw;padding-bottom:4vh}
${b}[data-page=home] #favRow .app{width:20vw}${b}[data-page=home] #favRow .app .nm{opacity:1;position:static;margin-top:0}
${b}[data-page=home] #favRow .app{-webkit-flex-direction:column;flex-direction:column}`;
  if (t.lay === "xbox") c += `
${b}[data-page=home] #shelf{height:20vh}
${b}[data-page=home] #favRow{-webkit-flex-wrap:wrap;flex-wrap:wrap;overflow:visible;gap:1vw;padding-bottom:3vh;max-height:52vh}
${b}[data-page=home] #favRow .app{width:14vw;border-radius:.4vh}
${b}[data-page=home] #favRow .app:first-child{width:29vw;height:calc(28vw * 9.6 / 16 + 1vw)}
${b}[data-page=home] #favRow .app .nm{position:absolute;top:auto;bottom:.8vh;margin:0;opacity:1;font-size:1.5vh;text-shadow:0 .2vh .6vh #000}`;
  if (t.lay === "psrow") c += `
${b}[data-page=home] #shelf{height:50vh;padding-top:22vh}${b}[data-page=home] #shelfTitle{font-size:6vh}
${b}[data-page=home] #home h2[data-i18n=favorites]{display:none}
${b}[data-page=home] #favRow{position:fixed;top:12vh;inset-inline-start:3vw;inset-inline-end:3vw;padding:1vh 1vw;gap:1vw;z-index:5;overflow:visible}
${b}[data-page=home] #favRow .app{width:8.6vh!important;height:8.6vh!important;aspect-ratio:1/1;border-radius:1.6vh}
${b}[data-page=home] #favRow .app.f.focus{width:15vh!important;height:15vh!important;transform:none}
${b}[data-page=home] #favRow .app img{max-width:62%;max-height:62%}${b}[data-page=home] #favRow .app .nm{opacity:0}${b}[data-page=home] #favRow .app.focus .nm{opacity:1}`;
  if (t.lay === "sidelist") c += `
${b}[data-page=home] #shelf{margin-inline-start:26vw;height:40vh}
${b}[data-page=home] #home h2[data-i18n=favorites]{position:fixed;top:13vh;inset-inline-start:3vw;width:22vw;z-index:5;font-size:2.2vh;color:var(--text)}
${b}[data-page=home] #favRow{position:fixed;top:18vh;inset-inline-start:3vw;width:22vw;bottom:6vh;display:block;overflow:hidden;padding:0;z-index:5}
${b}[data-page=home] #favRow .app{width:100%!important;height:7.4vh!important;aspect-ratio:auto;margin-bottom:.9vh;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:flex-start;justify-content:flex-start;padding:0 1vw}
${b}[data-page=home] #favRow .app img{position:static!important;width:4.6vh!important;height:4.6vh!important;max-width:none;max-height:none;border-radius:1vh;object-fit:contain}
${b}[data-page=home] #favRow .app .nm{position:static;opacity:1!important;margin:0 1vw;font-size:2vh;font-weight:600;text-align:start}
${b}[data-page=home] #favRow .app.f.focus{transform:scale(1.04)}
${b}[data-page=home] #home .scroll>h2:not([data-i18n=favorites]),${b}[data-page=home] #home .scroll>.row:not(#favRow){margin-inline-start:26vw}`;
  if (t.lay === "poster") c += `
${b}[data-page=home] #shelf{height:30vh}
${b}[data-page=home] #favRow .app{width:12vw;aspect-ratio:2/3;border-radius:1.2vh}
${b}[data-page=home] #favRow .app img{max-width:64%;max-height:40%}
${b}[data-page=home] #favRow .app .nm{opacity:1;top:auto;bottom:1.2vh;margin:0;position:absolute;font-weight:600}`;
  if (t.vidaa) c += `
${b} #shade{background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(10,4,30,.75) 100%)}
${b} #favRow .app,${b} #recentRow .app{background:#fff;width:calc(var(--tile,16vw) * .78)}
${b} #favRow .app .nm,${b} #recentRow .app .nm{color:#fff}
${b} #shelfTitle{font-weight:800;letter-spacing:.06em;text-transform:uppercase}
${b} .tab.on:not(.focus){color:#fff!important}${b} h2{color:#fff}
${b} .app .lbl{color:#3a136e;text-shadow:none}`;
  if (t.startPage) c += `
${b} #shelfImg,${b} #shelfTitle,${b} #shelfSub{display:none}
${b} #shade{background:transparent}
${b} #shelf{height:24vh}
${b} .top .clock{position:fixed;top:9vh;left:0;right:0;text-align:center;pointer-events:none;z-index:4}
${b} .top .clock #time{font-size:9.5vh;font-weight:200;letter-spacing:-.02em;line-height:1}
${b} .top .clock #date{font-size:1.8vh;opacity:.55;margin-top:1.2vh}
${b} #home h2{text-align:center;color:#e8eaed;font-weight:600;font-size:1.9vh}
${b} #home .row{-webkit-justify-content:center;justify-content:center;-webkit-flex-wrap:wrap;flex-wrap:wrap;overflow:visible;gap:2.2vh 1.6vw}
${b} #home .row .app{width:8.4vh!important;height:8.4vh!important;aspect-ratio:1/1;border-radius:1.8vh;border:1px solid rgba(255,255,255,.08);margin-bottom:3.4vh}
${b} #home .row .app img{max-width:52%;max-height:52%}
${b} #home .row .app img.banner,${b} #home .row .app img.cover{border-radius:1.8vh}
${b} #home .row .app .nm{opacity:.85!important;font-size:1.55vh;margin-top:.9vh}
${b} #home .row .app .badge{display:none}
${b} #home .row .app.f.focus{transform:scale(1.1);box-shadow:0 0 0 .3vh rgba(255,255,255,.85),0 1vh 2.4vh rgba(0,0,0,.5)}
${b} #favRow .app:nth-child(7n+1),${b} #recentRow .app:nth-child(7n+1),${b} #folderRow .app:nth-child(7n+1){background:#0f3d33;border-color:#2ed3a055}${b} #favRow .app:nth-child(7n+2),${b} #recentRow .app:nth-child(7n+2),${b} #folderRow .app:nth-child(7n+2){background:#16294d;border-color:#5b8cff55}${b} #favRow .app:nth-child(7n+3),${b} #recentRow .app:nth-child(7n+3),${b} #folderRow .app:nth-child(7n+3){background:#2a2154;border-color:#a98bff55}${b} #favRow .app:nth-child(7n+4),${b} #recentRow .app:nth-child(7n+4),${b} #folderRow .app:nth-child(7n+4){background:#3d1a22;border-color:#ff6b8155}${b} #favRow .app:nth-child(7n+5),${b} #recentRow .app:nth-child(7n+5),${b} #folderRow .app:nth-child(7n+5){background:#3d2a14;border-color:#ffa94d55}${b} #favRow .app:nth-child(7n+6),${b} #recentRow .app:nth-child(7n+6),${b} #folderRow .app:nth-child(7n+6){background:#123842;border-color:#3cc8e655}${b} #favRow .app:nth-child(7n+7),${b} #recentRow .app:nth-child(7n+7),${b} #folderRow .app:nth-child(7n+7){background:#3a1838;border-color:#e66bd155}
${b} .tabs{background:transparent}`;
  if (t.dock) c += `
${b} #shade{background:linear-gradient(90deg,rgba(0,0,0,.55) 0,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(0,0,0,.55) 100%),linear-gradient(0deg,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 35%)}
${b} #shelfImg{opacity:.35}
${b} .tab{border:1px solid rgba(255,255,255,.22);border-radius:99px;margin:0 .25vw;background:rgba(10,14,24,.45)}
${b} .tab.on:not(.focus){background:#8b8cff!important;color:#fff!important;border-color:transparent}
${b} .tabs{background:transparent}
${b}[data-page=home] #shelf{height:0;padding:0;overflow:hidden}
${b}[data-page=home] #home h2{display:none}
${b}[data-page=home] #watchRow,${b}[data-page=home] #folderRow,${b}[data-page=home] #matchRow,${b}[data-page=home] #favChRow{display:none!important}
${b}[data-page=home] #home h2[data-row=recentRow]{display:block!important;position:fixed;top:30vh;inset-inline-start:1.3vw;width:14vw;z-index:6;color:#fff;font-size:2.1vh;font-weight:700;text-align:center;margin:0;padding:1.6vh 0 .6vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.18);border-bottom:0;border-radius:1.8vh 1.8vh 0 0}
${b}[data-page=home] #recentRow{position:fixed;top:35.6vh;inset-inline-start:1.3vw;width:14vw;max-height:48vh;z-index:6;display:block!important;overflow:hidden;padding:.4vh .8vw 1vh;margin:0;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.18);border-top:0;border-radius:0 0 1.8vh 1.8vh}
${b}[data-page=home] #recentRow .app{width:100%!important;height:7.6vh!important;aspect-ratio:auto;background:transparent;border-bottom:1px solid rgba(255,255,255,.1);border-radius:1vh;display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:flex-start;justify-content:flex-start;padding:0 .6vw}
${b}[data-page=home] #recentRow .app img{position:static!important;width:4.4vh!important;height:4.4vh!important;max-width:none;max-height:none;border-radius:1vh;object-fit:contain;background:#fff;padding:.3vh}
${b}[data-page=home] #recentRow .app .nm{position:static;opacity:1!important;margin:0 .8vw;font-size:1.7vh;font-weight:700;text-align:start}
${b}[data-page=home] #recentRow .app .badge{display:none}
${b}[data-page=home] #recentRow .app.f.focus{transform:none;background:rgba(255,255,255,.14);box-shadow:0 0 0 .25vh #fff}
${b}[data-page=home] #quickRow{position:fixed;top:24vh;max-height:68vh;inset-inline-end:1.3vw;width:6.8vw;z-index:6;display:block!important;overflow:visible;padding:0;margin:0}
${b}[data-page=home] #quickRow .app{width:100%!important;height:11.6vh!important;aspect-ratio:auto;margin-bottom:1.6vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.2);border-radius:1.8vh;-webkit-flex-direction:column;flex-direction:column}
${b}[data-page=home] #quickRow .app img{position:static!important;width:4.6vh!important;height:4.6vh!important;max-width:none;max-height:none;border-radius:1.1vh;object-fit:contain}
${b}[data-page=home] #quickRow .app .lbl{font-size:1.6vh;padding:0 .3vw}${b}[data-page=home] #quickRow .app .lbl~.nm{display:none}${b}[data-page=home] #quickRow .app .nm{position:static;opacity:1!important;font-size:1.45vh;margin-top:.8vh;font-weight:600}
${b}[data-page=home] #favRow{position:fixed;bottom:5vh;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);max-width:58vw;z-index:6;overflow:visible;padding:1vh 1vw 5vh;gap:1.6vw;-webkit-justify-content:center;justify-content:center;margin:0}
${b}[data-page=home] #favRow .app{width:11vh!important;height:11vh!important;aspect-ratio:1/1;border-radius:2vh;background:linear-gradient(160deg,rgba(255,255,255,.28),rgba(255,255,255,.06));border:1px solid rgba(255,255,255,.3);-webkit-box-reflect:below .8vh linear-gradient(transparent 55%,rgba(255,255,255,.22))}
${b}[data-page=home] #favRow .app img{max-width:58%;max-height:58%}
${b}[data-page=home] #favRow .app img.banner{border-radius:2vh;object-fit:cover}
${b}[data-page=home] #favRow .app .nm{opacity:0;font-size:1.6vh;margin-top:1.6vh}${b}[data-page=home] #favRow .app.focus .nm{opacity:1!important}
${b}[data-page=home] #favRow .app .badge{display:none}
${b}[data-page=home] #favRow .app.f.focus{transform:scale(1.14) translateY(-1vh);background:#fff;box-shadow:0 0 0 .35vh #fff,0 1.4vh 3vh rgba(0,0,0,.6)}
${b}[data-page=home] .top .clock{inset-inline-end:auto;inset-inline-start:1.3vw;text-align:center}
${b}[data-page=home] .top .clock #time{font-size:5vh;font-weight:700}
${b}[data-page=home] .ticker{inset-inline-end:auto;inset-inline-start:1.3vw;top:15vh;width:14vw;-webkit-flex-direction:column;flex-direction:column;gap:.6vh;padding:1.6vh 1vw;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.18);border-radius:1.8vh;color:#fff;text-align:center;font-size:1.9vh}
${b}[data-page=home] .ticker span{border:0!important;background:transparent!important}
${b}[data-page=home] .top .left{display:none}
${b} .xtab{display:inline-block}
${b} .tab{font-size:1.5vh;padding:.7vh .7vw;margin:0 .15vw}${b} .tabs{margin-inline-start:11vw;max-width:80vw;flex-wrap:nowrap}
${b}[data-page=home] .dockx{display:block}
${b}[data-page=home] #xAllApps{position:fixed;top:85vh;inset-inline-start:2.6vw;z-index:6;border-radius:99px;padding:.9vh 1.4vw;font-size:1.7vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.25)}
${b}[data-page=home] #xSources{position:fixed;top:30vh;inset-inline-start:16.4vw;z-index:6;display:flex;align-items:center;gap:.8vw;text-align:start;padding:1.4vh 1.2vw;min-width:12vw;border-radius:1.6vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.22)}
${b}[data-page=home] #xSources b{display:flex;align-items:center;justify-content:center;width:4.4vh;height:4.4vh;border-radius:1vh;background:#6b6ef0;font-size:2.2vh}
${b}[data-page=home] #xSources span span{display:block;font-weight:700;font-size:1.8vh}${b}[data-page=home] #xSources small{display:block;opacity:.6;font-size:1.3vh}`;
  if (t.roundApps) c += `
${b} .tab{border-radius:99px;padding:.8vh 1.4vw}${b} .tab.on:not(.focus){background:rgba(255,255,255,.14)!important;color:#fff}
${b} .tab.f.focus{background:#e8eaed!important;color:#202124!important}
${b} h2{color:#e8eaed;font-weight:500;font-size:2vh}
${b} #favRow,${b} #recentRow{gap:1.6vw}
${b} #favRow .app,${b} #recentRow .app{width:10.5vh!important;height:10.5vh!important;border-radius:50%!important;aspect-ratio:1/1;background:#fff;overflow:hidden}
${b} #favRow .app img,${b} #recentRow .app img{max-width:64%;max-height:64%}
${b} #favRow .app img.banner,${b} #recentRow .app img.banner{border-radius:50%;object-fit:cover}
${b} #favRow .app .nm,${b} #recentRow .app .nm{font-size:1.5vh}
${b} #favRow .app .badge,${b} #recentRow .app .badge{display:none}
${b} #favRow .app.f.focus,${b} #recentRow .app.f.focus{transform:scale(1.12);box-shadow:0 0 0 .35vh #fff,0 1.2vh 2.6vh rgba(0,0,0,.6)}
${b} #shelfTitle{font-weight:500}`;
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
function physicalCss(css) {
  const map = (d, dir) => {
    const st = dir === "rtl" ? "right" : "left", en = dir === "rtl" ? "left" : "right";
    return d.replace(/inset-inline-start/g, st).replace(/inset-inline-end/g, en).replace(/(margin|padding)-inline-start/g, "$1-" + st).replace(/(margin|padding)-inline-end/g, "$1-" + en).replace(/text-align:start/g, "text-align:" + st).replace(/text-align:end/g, "text-align:" + en);
  };
  return css.replace(/([^{}]+)\{([^{}]*)\}/g, (m, sel, decl) => {
    if (!/inline-(start|end)|text-align:(start|end)/.test(decl)) return m;
    const pre = (dir) => sel.split(",").map((x) => `html[dir=${dir}] ${x.trim()}`).join(",");
    return `${sel}{${decl}}${pre("ltr")}{${map(decl, "ltr")}}${pre("rtl")}{${map(decl, "rtl")}}`;
  });
}
(function() {
  const st = document.createElement("style");
  st.id = "themeCss";
  st.textContent = physicalCss(THEMES.filter((t) => !t.builtIn).map(themeCss).join("\n"));
  document.head.appendChild(st);
})();
function themePicker() {
  const groups = [...new Set(THEMES.map((t) => t.g))];
  return groups.map((g) => `<div class="tgroup"><span class="tg">${esc(g === "Originals" ? S.lang === "ar" ? "تصميمات اللانشر" : "Launcher originals" : g)}</span><div class="inline">${THEMES.filter((t) => t.g === g).map((t) => `<button class="btn f tbtn${S.theme === t.id ? " pri" : ""}" data-set="theme:${t.id}"><i class="tdot" style="background:${t.dot}"></i>${esc(t.n)}</button>`).join("")}</div></div>`).join("");
}
