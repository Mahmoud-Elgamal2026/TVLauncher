"use strict";
// Looks inspired by TV platforms and their versions (colors, card shape, focus style, tab position) — no logos.
// tabs: pill | underline | plain | bottom      focus: lift | ring | scale | glow
const THEMES=[
 // ---- Apple ----
 {id:"apple",g:"Apple TV",n:"tvOS 17 · Dark",builtIn:1,dot:"#ffffff"},
 {id:"tvos-light",g:"Apple TV",n:"tvOS · Light",light:1,bg:"linear-gradient(135deg,#f4f4f8,#dcdce6)",card:"linear-gradient(160deg,#fff,#e8e8ee)",sel:"#1c1c1e",selText:"#fff",glass:"rgba(0,0,0,.07)",r:"2vh",tabs:"pill",focus:"lift",dot:"#e8e8ee"},
 {id:"tvos-2012",g:"Apple TV",n:"Apple TV · 2012",bg:"radial-gradient(ellipse at 50% 0,#4a4a4a,#141414 70%)",card:"linear-gradient(180deg,#6a6a6a,#2c2c2c)",sel:"#fff",selText:"#000",glass:"rgba(255,255,255,.08)",r:".8vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #fff",dot:"#6a6a6a"},
 // ---- Google / Android TV ----
 {id:"google",g:"Google / Android TV",n:"Google TV",builtIn:1,dot:"#8ab4f8"},
 {id:"gtv-you",g:"Google / Android TV",n:"Google TV 2024 · Material You",bg:"linear-gradient(135deg,#1d1b22,#141218)",card:"#2b2930",sel:"#d0bcff",selText:"#381e72",glass:"#2b2930",r:"2.6vh",tabs:"underline",focus:"ring",ring:"0 0 0 .45vh #d0bcff",accent:"#d0bcff",dot:"#d0bcff"},
 {id:"atv-oreo",g:"Google / Android TV",n:"Android TV 8–11",bg:"linear-gradient(180deg,#212121,#121212)",card:"#303030",sel:"#fff",selText:"#000",glass:"#2a2a2a",r:".6vh",tabs:"plain",focus:"scale",ring:"0 0 0 .3vh #fff",dot:"#303030"},
 {id:"atv-leanback",g:"Google / Android TV",n:"Android TV 5–7 · Leanback",bg:"linear-gradient(135deg,#37474f,#1c262b)",card:"#546e7a",sel:"#26a69a",selText:"#fff",glass:"rgba(255,255,255,.08)",r:".3vh",tabs:"plain",focus:"scale",ring:"0 0 0 .35vh #fff",dot:"#26a69a"},
 {id:"shield",g:"Google / Android TV",n:"NVIDIA Shield",bg:"radial-gradient(circle at 80% 0,#203314,#0a0a0a 60%)",card:"#1f1f1f",sel:"#76b900",selText:"#000",glass:"#1c1c1c",r:".6vh",tabs:"underline",focus:"ring",ring:"0 0 0 .4vh #76b900",accent:"#76b900",dot:"#76b900"},
 {id:"bravia",g:"Google / Android TV",n:"Sony Bravia",bg:"linear-gradient(135deg,#1b2129,#0b0e12)",card:"#2a313b",sel:"#e6e6e6",selText:"#111",glass:"rgba(255,255,255,.07)",r:".5vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #e6e6e6",dot:"#2a313b"},
 // ---- Samsung ----
 {id:"tizen",g:"Samsung",n:"Tizen · One UI",bg:"linear-gradient(160deg,#0c1f45,#050a18 70%)",card:"rgba(255,255,255,.09)",sel:"#fff",selText:"#0c1f45",glass:"rgba(255,255,255,.1)",r:"1.6vh",tabs:"bottom",focus:"lift",ring:"0 0 0 .35vh #fff",dot:"#1d4ed8"},
 {id:"smarthub",g:"Samsung",n:"Smart Hub · 2016",bg:"radial-gradient(ellipse at 50% 100%,#1b2a52,#000 70%)",card:"linear-gradient(180deg,#2f4a85,#16264d)",sel:"#5ab0ff",selText:"#001",glass:"rgba(255,255,255,.08)",r:".4vh",tabs:"bottom",focus:"glow",ring:"0 0 0 .3vh #5ab0ff",accent:"#5ab0ff",dot:"#2f4a85"},
 // ---- LG ----
 {id:"webos",g:"LG",n:"webOS · Launcher bar",bg:"linear-gradient(135deg,#2b0d3f,#0f1238)",card:"linear-gradient(160deg,#3a1d5c,#1d1440)",sel:"#ff3d8b",selText:"#fff",glass:"rgba(255,255,255,.1)",r:"1vh",tabs:"bottom",focus:"lift",ring:"0 0 0 .4vh #ff3d8b",accent:"#ff3d8b",dot:"#ff3d8b"},
 {id:"webos22",g:"LG",n:"webOS 22+",bg:"linear-gradient(180deg,#1c1c1c,#0d0d0d)",card:"#2a2a2a",sel:"#c4024f",selText:"#fff",glass:"#262626",r:"2vh",tabs:"pill",focus:"ring",ring:"0 0 0 .4vh #fff",dot:"#c4024f"},
 // ---- Amazon / Roku / Xiaomi ----
 {id:"firetv",g:"Amazon · Roku · Xiaomi",n:"Fire TV",bg:"linear-gradient(180deg,#13233b,#0a1424)",card:"#1d2f4a",sel:"#ff9900",selText:"#111",glass:"#18273e",r:"1vh",tabs:"underline",focus:"ring",ring:"0 0 0 .4vh #fff",accent:"#ff9900",dot:"#ff9900"},
 {id:"roku",g:"Amazon · Roku · Xiaomi",n:"Roku",bg:"linear-gradient(135deg,#3b0d63,#1c0533)",card:"#4a1a75",sel:"#fff",selText:"#4a0d6b",glass:"rgba(255,255,255,.1)",r:"1vh",tabs:"plain",focus:"ring",ring:"0 0 0 .45vh #fff",dot:"#6c2bd9"},
 {id:"patchwall",g:"Amazon · Roku · Xiaomi",n:"Xiaomi PatchWall",light:1,bg:"linear-gradient(180deg,#fafafa,#ececf0)",card:"#ffffff",sel:"#ff6900",selText:"#fff",glass:"rgba(0,0,0,.06)",r:"1.4vh",tabs:"underline",focus:"ring",ring:"0 0 0 .4vh #ff6900",accent:"#ff6900",dot:"#ff6900"},
 // ---- Consoles & media centers ----
 {id:"xbox",g:"Consoles · Media centers",n:"Xbox",bg:"radial-gradient(circle at 75% 15%,#1d5a26,#0b0b0b 60%)",card:"#1f1f1f",sel:"#107c10",selText:"#fff",glass:"#1a1a1a",r:".3vh",tabs:"plain",focus:"ring",ring:"0 0 0 .45vh #fff",dot:"#107c10"},
 {id:"ps5",g:"Consoles · Media centers",n:"PlayStation 5",bg:"radial-gradient(circle at 70% -10%,#1d3f80,#05070f 65%)",card:"rgba(255,255,255,.08)",sel:"#fff",selText:"#000",glass:"rgba(255,255,255,.08)",r:"1.8vh",tabs:"plain",focus:"lift",ring:"0 0 0 .3vh #fff",dot:"#1d3f80"},
 {id:"wmc",g:"Consoles · Media centers",n:"Windows Media Center",bg:"radial-gradient(ellipse at 30% 20%,#2a7fd4,#062a5a 70%)",card:"linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.05))",sel:"#7cd651",selText:"#04210a",glass:"rgba(255,255,255,.1)",r:".6vh",tabs:"plain",focus:"glow",ring:"0 0 0 .3vh #b6ff8f",accent:"#7cd651",dot:"#2a7fd4"},
 {id:"kodi",g:"Consoles · Media centers",n:"Kodi · Estuary",bg:"linear-gradient(135deg,#132835,#0a141b)",card:"#1b3442",sel:"#12a0c7",selText:"#fff",glass:"#16303d",r:".4vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #12a0c7",accent:"#12a0c7",dot:"#12a0c7"},
 // ---- Launcher originals ----
 {id:"classic",g:"Originals",n:"Classic",builtIn:1,dot:"#4f7cff"},
 {id:"light",g:"Originals",n:"Light",builtIn:1,light:1,dot:"#eeeeee"},
 {id:"neon",g:"Originals",n:"Neon",builtIn:1,dot:"#b14bff"},
 {id:"amoled",g:"Originals",n:"AMOLED Black",bg:"#000",card:"#0c0c0c",sel:"#fff",selText:"#000",glass:"#111",r:"1.4vh",tabs:"pill",focus:"ring",ring:"0 0 0 .3vh #fff",dot:"#000"},
 {id:"ramadan",g:"Originals",n:"رمضاني · Ramadan",bg:"radial-gradient(circle at 80% 10%,#16305c,#070d1e 65%)",card:"linear-gradient(160deg,#1b2b52,#0d1630)",sel:"#d9b25c",selText:"#1a1203",glass:"rgba(217,178,92,.12)",r:"1.6vh",tabs:"pill",focus:"glow",ring:"0 0 0 .3vh #d9b25c",accent:"#d9b25c",dot:"#d9b25c"}
];
function themeCss(t){
  const b=`body[data-theme="${t.id}"]`;
  let c=`${b}{--card:${t.card};--sel:${t.sel};--selText:${t.selText};--glass:${t.glass};--r:${t.r};--ring:${t.ring||"0 0 0 0 transparent"}}
${b} #shelfBg{background:${t.bg}}`;
  c+=t.light?`
${b}{--text:#111;--mute:#666}
${b} #shelfImg{filter:blur(60px) saturate(1.3) brightness(1.2);opacity:.12}
${b} #shade{background:linear-gradient(180deg,rgba(245,245,248,.3) 0,rgba(245,245,248,.85) 42%,rgba(240,240,244,.98) 66%)}
${b} #shelfTitle{text-shadow:none}body.lite${b} .tabs,body.lite${b} .btn,body.lite${b} .inp,body.lite${b} .it,body.lite${b} .chrow,body.lite${b} .qbtn,body.lite${b} .key{background:rgba(0,0,0,.07)}body.lite${b} .mbox{background:#fff}${b} .mbox{background:rgba(255,255,255,.94)}${b} #search{background:rgba(245,245,248,.95)}${b} .app{box-shadow:0 .4vh 1.4vh rgba(0,0,0,.08)}`
  :`
${b} #shelfImg{opacity:${t.id==="amoled"?0:.16}}
${b} #shade{background:linear-gradient(180deg,rgba(0,0,0,0) 0,rgba(0,0,0,.18) 45%,rgba(0,0,0,.55) 100%)}`;
  if(t.accent) c+=`\n${b} .ticker span{border:1px solid ${t.accent}55}${b} .prog i,${b} .bar i{background:${t.accent}}`;
  // tabs
  if(t.tabs==="underline") c+=`
${b} .tabs{background:transparent;backdrop-filter:none;gap:.5vw}
${b} .tab{color:var(--mute)}${b} .tab.on{background:transparent;color:var(--text);box-shadow:inset 0 -.4vh 0 var(--sel);border-radius:0}
${b} .tab.f.focus{background:var(--sel);color:var(--selText);border-radius:99px;box-shadow:none}`;
  if(t.tabs==="plain") c+=`
${b} .tabs{background:transparent;backdrop-filter:none;gap:.4vw}${b} .tab{color:var(--mute)}
${b} .tab.on{background:transparent;color:var(--text);font-weight:700}${b} .tab.f.focus{background:var(--sel);color:var(--selText)}`;
  if(t.tabs==="bottom") c+=`
${b} .tabs{position:fixed;bottom:2.2vh;left:50%;transform:translateX(-50%);z-index:20;padding:.8vh;border-radius:2vh;background:rgba(10,12,20,.82);backdrop-filter:blur(24px);box-shadow:0 1.5vh 4vh rgba(0,0,0,.5)}
${b} .tab{padding:1.2vh 2vw}${b} .scroll{padding-bottom:16vh}${b} .hint{display:none}${b} #shelf{height:24vh}`;
  // focus
  if(t.focus==="ring") c+=`\n${b} .app.f.focus,${b} .poster.f.focus,${b} .chrow.f.focus,${b} .btn.f.focus,${b} .it.f.focus{transform:scale(1.05);box-shadow:var(--ring),0 1.4vh 3vh rgba(0,0,0,.5)}${b} .app.f.focus::after,${b} .it.f.focus::after{display:none}`;
  if(t.focus==="scale") c+=`\n${b} .app.f.focus,${b} .poster.f.focus{transform:scale(1.14);box-shadow:0 1.4vh 3vh rgba(0,0,0,.6)}${b} .app.f.focus::after{display:none}${b} .app .nm{opacity:1}`;
  if(t.focus==="glow") c+=`\n${b} .app.f.focus,${b} .poster.f.focus,${b} .chrow.f.focus,${b} .btn.f.focus,${b} .it.f.focus{transform:scale(1.06);box-shadow:var(--ring),0 0 4vh ${t.accent||t.sel}}`;
  return c;
}
(function(){ const st=document.createElement("style"); st.id="themeCss"; st.textContent=THEMES.filter(t=>!t.builtIn).map(themeCss).join("\n"); document.head.appendChild(st) })();
function themePicker(){
  const groups=[...new Set(THEMES.map(t=>t.g))];
  return groups.map(g=>`<div class="tgroup"><span class="tg">${esc(g==="Originals"?(S.lang==="ar"?"تصميمات اللانشر":"Launcher originals"):g)}</span><div class="inline">${THEMES.filter(t=>t.g===g).map(t=>
    `<button class="btn f tbtn${S.theme===t.id?" pri":""}" data-set="theme:${t.id}"><i class="tdot" style="background:${t.dot}"></i>${esc(t.n)}</button>`).join("")}</div></div>`).join("");
}
