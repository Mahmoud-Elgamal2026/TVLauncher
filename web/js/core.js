"use strict";
// ================= native bridge (falls back to browser for previews) =================
const cbs={}; let cbN=0;
window.__cb=(id,ok,data)=>{const f=cbs[id];delete cbs[id];if(f)f(ok,data)};
const NA=window.Android;
const nat=(fn,...a)=>{ try{ return NA&&NA[fn]?NA[fn](...a):undefined }catch(e){ console.log(fn,e); return undefined } };
function natAsync(fn,...a){ return new Promise((res,rej)=>{ const id="c"+(++cbN); cbs[id]=(ok,d)=>ok?res(d):rej(new Error(d)); NA[fn](...a,id) }) }
const A={
  getApps:()=>nat("getApps")||"[]", launch:p=>!!nat("launch",p), isInstalled:p=>!!nat("isInstalled",p),
  playExternal:u=>NA?nat("playExternal",u):window.open(u), openSettings:a=>nat("openSettings",a||""), appInfo:p=>nat("appInfo",p),
  toast:m=>NA?nat("toast",String(m)):banner("ℹ️",String(m)), status:()=>{try{return JSON.parse(nat("getStatus")||'{}')}catch(e){return{}}},
  volume:d=>nat("volume",d), clearCache:()=>nat("clearOwnCache")||0, pickImage:p=>nat("pickImage",p), pickFrames:()=>nat("pickFrames"),
  deleteFrame:u=>nat("deleteFrame",u), voice:()=>NA?nat("voiceSearch"):A.toast(L("voiceNA")), setKeyMap:j=>nat("setKeyMap",j), learnKey:b=>nat("learnKey",!!b),
  notifAccess:()=>!!nat("notifAccess"), openNotifAccess:()=>nat("openNotifAccess"),
  exportBackup:j=>NA?nat("exportBackup",j):console.log(j), importBackup:()=>nat("importBackup"),
  fetchText(url){ return NA?natAsync("fetchText",url):fetch(url).then(r=>{if(!r.ok)throw new Error(r.status);return r.text()}) },
  async fetchJSON(url){ return JSON.parse(await A.fetchText(url)) },
  async fetchEpg(url){ if(!NA) throw new Error("preview"); return JSON.parse(await natAsync("fetchEpg",url)) },
  async checkStreams(urls){ if(!NA) throw new Error("preview"); return JSON.parse(await natAsync("checkStreams",JSON.stringify(urls))) }
};
window.A=A;

// ================= storage: global + per-profile =================
const DEF={design:"",perfChosen:false,lang:"ar",theme:"apple",size:"m",wall:"dynamic",wallImg:"",h24:false,lite:false,showHidden:false,
  lists:[],epg:"",ext:false,preview:true,hideDead:false,autoCheck:true,chStatus:{},lastCheck:0,
  city:"Cairo",loc:null,pin:"",lockSettings:false,custom:{},keymap:{},
  frameMin:10,frameStyle:"gallery",frameSrc:"online",frameEvery:5,frames:[],fw:{clock:true,weather:true,prayer:true,match:true},
  prayerOn:true,method:"egypt",asrHanafi:false,adhanOn:true,adhanUrl:"",adhanBefore:10,
  sportsOn:true,leagues:["4829","4668","4328","4335","4480"],favTeams:"",
  notifSys:true,tickerOn:true,aspect:"contain",profiles:[{id:"main",name:"أنا",emoji:"😎",kids:false}],cur:"main"};
const PDEF={favs:[],hidden:[],locked:[],recent:[],favCh:[],lockedGroups:[],lastCh:null,watch:[],usage:null,chHist:[],myList:[],seen:[],stats:{},folders:[]};
const KIDS_DEF={allowedApps:[],allowedGroups:[],limit:0};
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){A.toast("Storage full");return false}}};
const pkey=k=>"p:"+store.get("cur",DEF.cur)+":"+k;
const S=new Proxy({},{
  get:(_,k)=>k in PDEF?store.get(pkey(k),clone(PDEF[k])):store.get(k,clone(DEF[k])),
  set:(_,k,v)=>{ store.set(k in PDEF?pkey(k):k,v); return true }});
function clone(v){ return v&&typeof v==="object"?JSON.parse(JSON.stringify(v)):v }
// migrate single M3U from the first version
(function(){ const old=store.get("m3u",""); if(old&&!store.get("lists",null)){ store.set("lists",[{name:"IPTV",url:old}]); localStorage.removeItem("m3u") }
  ["favs","hidden","locked","recent","favCh","lockedGroups","lastCh"].forEach(k=>{ const v=localStorage.getItem(k); if(v!=null&&localStorage.getItem("p:main:"+k)==null){ localStorage.setItem("p:main:"+k,v); localStorage.removeItem(k) } }) })();

const profile=()=>S.profiles.find(p=>p.id===S.cur)||S.profiles[0];
const isKids=()=>!!(profile()&&profile().kids);
const L=k=>{const v=T[S.lang][k]; return v==null?(T.en[k]==null?k:T.en[k]):v};
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cssq=s=>window.CSS&&CSS.escape?CSS.escape(s):String(s).replace(/["\\]/g,"\\$&");
const pad=n=>String(n).padStart(2,"0");
function toggleList(key,item){ const l=S[key]; S[key]=l.includes(item)?l.filter(x=>x!==item):[...l,item] }
const on=id=>$(id).classList.contains("on");

// ================= time =================
function fmtTime(d,noSuffix){
  const h=d.getHours(), m=pad(d.getMinutes());
  if(S.h24) return pad(h)+":"+m;
  return (h%12||12)+":"+m+(noSuffix?"":" "+(h<12?L("am"):L("pm")));
}
function fmtDate(d){ return S.lang==="ar"?`${L("days")[d.getDay()]}، ${d.getDate()} ${L("months")[d.getMonth()]}`:`${L("days")[d.getDay()]}, ${L("months")[d.getMonth()]} ${d.getDate()}` }
function fmtLeft(ms){ const m=Math.max(0,Math.round(ms/60000)); return m>=60?`${Math.floor(m/60)}${L("hr")} ${m%60}${L("min")}`:`${m} ${L("min")}` }
const tickers=[];
function tick(){ const d=new Date(); $("time").textContent=fmtTime(d); $("date").textContent=fmtDate(d); tickers.forEach(f=>{try{f(d)}catch(e){console.log(e)}}) }

// ================= look =================
const DAILY=["linear-gradient(135deg,#0f2027,#2c5364)","linear-gradient(135deg,#3a1c71,#d76d77)","linear-gradient(135deg,#134e5e,#71b280)",
 "linear-gradient(135deg,#232526,#414345)","linear-gradient(135deg,#1e3c72,#2a5298)","linear-gradient(135deg,#42275a,#734b6d)","linear-gradient(135deg,#0b486b,#f56217)"];
function applyLook(){
  const b=document.body; b.dataset.theme=S.theme; b.dataset.size=S.size; b.classList.toggle("lite",!!S.lite); { const th=typeof THEMES!=="undefined"&&THEMES.find(t=>t.id===S.theme); b.classList.toggle("lighttheme",S.theme==="light"||!!(th&&th.light)); b.dataset.lay=S.design||(typeof designOf==="function"?designOf(th):"hero") } b.classList.toggle("kids",isKids());
  const img=S.wall==="image"&&S.wallImg;
  b.classList.toggle("wallimg",!!img);
  $("wall").style.backgroundImage=img?`url("${S.wallImg}")`:"";
  if(S.wall==="daily"&&!img){ $("shelfBg").style.background=DAILY[new Date().getDay()]; $("shelfImg").style.opacity=0 }
  else { $("shelfBg").style.background=""; $("shelfImg").style.opacity="" }
  const p=profile(); $("profBtn").textContent=p?p.emoji:"🙂";
}
function applyLang(){
  document.documentElement.lang=S.lang; document.documentElement.dir=S.lang==="ar"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(e=>e.textContent=L(e.dataset.i18n));
  document.querySelectorAll("[data-i18n-ph]").forEach(e=>e.placeholder=L(e.dataset.i18nPh));
}
function status(){
  const s=A.status();
  $("sNet").textContent=s.net==="eth"?"🔌":s.net==="wifi"?"📶":s.net==="none"?"⚠️ "+L("netNone"):s.net?"🌐":"";
  $("sDisk").textContent=s.free?"💾 "+(s.free/1073741824).toFixed(1)+" GB "+L("free"):"";
}

// ================= banners (on-screen notifications) =================
function banner(icon,title,text,ms){
  const el=document.createElement("div"); el.className="bn";
  el.innerHTML=`<b>${esc(icon)}</b><div><div class="bt">${esc(title)}</div>${text?`<div class="bx">${esc(text)}</div>`:""}</div>`;
  const box=$("banners"); box.prepend(el); while(box.children.length>3) box.lastChild.remove();
  setTimeout(()=>{el.classList.add("out");setTimeout(()=>el.remove(),450)},ms||6500);
}
function chime(){
  try{ const C=window.AudioContext||window.webkitAudioContext; const c=new C();
    [[660,0],[880,.35],[990,.7]].forEach(([f,t])=>{ const o=c.createOscillator(),g=c.createGain(); o.frequency.value=f; o.type="sine";
      g.gain.setValueAtTime(0,c.currentTime+t); g.gain.linearRampToValueAtTime(.25,c.currentTime+t+.05); g.gain.exponentialRampToValueAtTime(.001,c.currentTime+t+1.2);
      o.connect(g).connect(c.destination); o.start(c.currentTime+t); o.stop(c.currentTime+t+1.3) }); setTimeout(()=>c.close(),2500) }catch(e){}
}

// ================= dialogs =================
let dlgReturn=null, dlgOnKey=null, dlgOnClose=null;
function dialog(title,items,opt){
  opt=opt||{}; if(!on("dlg")) dlgReturn=focused;
  const cls=opt.grid?("mgrid"+(opt.grid===3?" c3":"")):"dlist";
  const body=opt.html||`<div class="${cls}">`+items.map((it,i)=>`<button class="btn f${it.pri?" pri":""}" data-di="${i}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join("")+`</div>`;
  $("dbox").innerHTML=`<h3>${esc(title)}</h3>${opt.sub?`<div class="sub">${esc(opt.sub)}</div>`:""}${body}`;
  $("dbox")._items=items||[]; dlgOnKey=opt.onKey||null; dlgOnClose=opt.onClose||null;
  $("dlg").classList.add("on"); focus($("dbox").querySelector(opt.focusSel||".f"));
}
function closeDialog(){ if(!on("dlg")) return; $("dlg").classList.remove("on"); dlgOnKey=null; const oc=dlgOnClose; dlgOnClose=null;
  const r=dlgReturn; dlgReturn=null; focus(r&&document.body.contains(r)&&r.offsetParent!==null?r:fallbackFocus()); if(oc) oc() }
function prompt2(title,value,cb,ph){
  dialog(title,[{label:L("save"),pri:1,fn:()=>cb($("dIn").value.trim())},{label:L("cancel"),fn:()=>{}}],
    {html:`<input class="inp f" id="dIn" value="${esc(value||"")}" placeholder="${esc(ph||"")}"><div class="dlist"><button class="btn pri f" data-di="0">${L("save")}</button><button class="btn f" data-di="1">${L("cancel")}</button></div>`});
}

// ================= PIN =================
let unlockedUntil=0;
function guard(needed,fn){
  if(!needed||!S.pin||Date.now()<unlockedUntil) return fn();
  askPin(L("enterPin"),pin=>{ if(pin===S.pin){ unlockedUntil=Date.now()+5*60000; closeDialog(); fn() } else { A.toast(L("wrongPin")); return false } });
}
function askPin(title,onDone,sub){
  let v="";
  const draw=()=>{ const d=$("dbox").querySelector(".pinDots"); if(d) d.innerHTML=[0,1,2,3].map(i=>`<i class="${i<v.length?"on":""}"></i>`).join("") };
  const press=k=>{ if(k==="⌫") v=v.slice(0,-1); else if(v.length<4) v+=k; draw();
    if(v.length===4){ const r=onDone(v); if(r===false){v="";setTimeout(draw,150)} } };
  const keys=["1","2","3","4","5","6","7","8","9","⌫","0","✕"];
  dialog(title,keys.map(k=>({label:k,fn:()=>k==="✕"?closeDialog():press(k),keep:true})),{sub,
    html:`<div class="pinDots"></div><div class="keys">${keys.map((k,i)=>`<button class="key f" data-di="${i}">${k}</button>`).join("")}</div>`,
    onKey:k=>{ if(/^[0-9]$/.test(k)){press(k);return true} if(k==="Backspace"||k==="Delete"){press("⌫");return true} return false }});
  draw();
}
function setPin(){
  askPin(L("newPin"),p1=>{ setTimeout(()=>askPin(L("confirmPin"),p2=>{ if(p1!==p2){A.toast(L("pinMismatch"));closeDialog();return}
    S.pin=p2; unlockedUntil=Date.now()+5*60000; closeDialog(); if(window.renderSettings) renderSettings(); A.toast(L("saved")) }),50) });
}

// ================= pages =================
const pageHooks={};
function showPage(id){
  if(id==="settings"&&(isKids()||(S.lockSettings&&S.pin&&Date.now()>unlockedUntil))){
    if(isKids()) return false;
    guard(true,()=>{ showPage("settings"); focus(document.querySelector('.tab[data-page="settings"]')) }); return false }
  const was=document.querySelector(".page.on");
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("on",p.id===id));
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t.dataset.page===id));
  document.body.dataset.page=id;
  if(was&&was.id!==id&&pageHooks[was.id+":leave"]) pageHooks[was.id+":leave"]();
  if(pageHooks[id+":enter"]&&(!was||was.id!==id)) pageHooks[id+":enter"]();
  return true;
}

// ================= remote (D-pad) spatial navigation =================
let focused=null;
const focusHooks=[];
function scopeEl(){
  if(on("dlg")) return $("dbox");
  if(on("player")&&$("plist").classList.contains("on")) return $("plist");
  if(on("search")) return $("search");
  if(on("detail")) return $("detail");
  return null;
}
function fallbackFocus(){ const s=scopeEl(); return s?s.querySelector(".f"):document.querySelector(".tab.on") }
function visibleFocusables(){
  const s=scopeEl();
  const all=s?[...s.querySelectorAll(".f")]:[...document.querySelectorAll(".top .f, .page.on .f")];
  return all.filter(e=>{ const r=e.getBoundingClientRect(); return r.width&&r.height&&e.offsetParent!==null });
}
function focus(el){
  if(!el) return;
  if(focused) focused.classList.remove("focus");
  focused=el; el.classList.add("focus"); el.focus({preventScroll:true});
  keepVisible(el);
  if(el.classList.contains("tab")){ if(el.dataset.page) showPage(el.dataset.page); return }
  focusHooks.forEach(h=>h(el));
}
// Scroll every scrollable parent so the focused item is fully on screen, with breathing room.
// Written by hand because old TV WebViews ignore scrollIntoView options.
function keepVisible(el){
  const pad=Math.round(innerHeight*0.06), padX=Math.round(innerWidth*0.04);
  let p=el.parentElement;
  while(p&&p!==document.body){
    const cs=getComputedStyle(p), oy=/(auto|scroll)/.test(cs.overflowY)&&p.scrollHeight>p.clientHeight+2, ox=/(auto|scroll)/.test(cs.overflowX)&&p.scrollWidth>p.clientWidth+2;
    if(oy||ox){
      const r=el.getBoundingClientRect(), pr=p.getBoundingClientRect();
      if(oy){ if(r.top<pr.top+pad) p.scrollTop-=pr.top+pad-r.top; else if(r.bottom>pr.bottom-pad) p.scrollTop+=r.bottom-(pr.bottom-pad) }
      if(ox){ if(r.left<pr.left+padX) p.scrollLeft-=pr.left+padX-r.left; else if(r.right>pr.right-padX) p.scrollLeft+=r.right-(pr.right-padX) }
    }
    if(cs.position==="fixed") break;
    p=p.parentElement;
  }
}
function move(dir){
  if(!focused||!document.body.contains(focused)||focused.offsetParent===null) return focus(fallbackFocus());
  const a=focused.getBoundingClientRect(), ax=a.left+a.width/2, ay=a.top+a.height/2;
  let best=null,bs=1e9;
  const onTab=focused.classList.contains("tab");
  let pool=visibleFocusables();
  // from a tab: left/right stay on the tab bar, down goes into the open page only
  if(onTab&&(dir==="left"||dir==="right")) pool=pool.filter(e=>!!e.closest(".top"));
  // inside a page: left/right never jump up to the tabs or header buttons
  if(!onTab&&(dir==="left"||dir==="right")){ const pg=focused.closest(".page"); if(pg) pool=pool.filter(e=>pg.contains(e)); else if(focused.closest(".top")) pool=pool.filter(e=>!!e.closest(".top")) }
  if(onTab&&dir==="down"){ const pg=document.querySelector(".page.on"); if(pg){ const inPage=pool.filter(e=>pg.contains(e)); if(inPage.length) pool=inPage } }
  for(const e of pool){
    if(e===focused) continue;
    const b=e.getBoundingClientRect(), dx=b.left+b.width/2-ax, dy=b.top+b.height/2-ay;
    let main,cross;
    if(dir==="left"){if(b.right>a.left+4&&dx>=-2)continue;main=-dx;cross=Math.abs(dy)}
    else if(dir==="right"){if(b.left<a.right-4&&dx<=2)continue;main=dx;cross=Math.abs(dy)}
    else if(dir==="up"){if(b.bottom>a.top+4)continue;main=-dy;cross=Math.abs(dx)}
    else {if(b.top<a.bottom-4)continue;main=dy;cross=Math.abs(dx)}
    if(main<=0) continue;
    const s=main+cross*2.2; if(s<bs){bs=s;best=e}
  }
  // from a tab, down (or up when the tabs sit at the bottom) always enters the open page
  if(onTab&&!best&&(dir==="down"||dir==="up")){ const pg=document.querySelector(".page.on"); if(pg){ const f=[...pg.querySelectorAll(".f")].find(e=>e.offsetParent!==null||getComputedStyle(e).position==="fixed"); if(f) best=f } }
  if(onTab&&dir==="up"&&best&&best.closest(".page")&&document.querySelector(".tabs").getBoundingClientRect().top<innerHeight/2) best=null;
  // never jump to a different tab by moving up out of a page: go to the open one
  // leaving a page upwards always lands on the open tab (not a neighbour tab or a header button)
  if(best&&!onTab&&focused.closest(".page")&&best.closest(".top")&&!(best.classList.contains("tab")&&best.classList.contains("on"))) best=document.querySelector(".tab.on")||best;
  if(best) focus(best);
}
// activation registry: modules register handlers by element test
const activators=[], optionHandlers=[];
function activate(el){
  if(!el) return;
  if(el.dataset.di!==undefined&&el.closest("#dbox")){ const it=$("dbox")._items[+el.dataset.di]; if(!it) return; if(!it.keep) closeDialog(); it.fn(); return }
  if(el.classList.contains("tab")&&el.dataset.act){ runXtab(el.dataset.act); return }
  if(el.classList.contains("tab")){ const p=document.querySelector(".page.on .f"); if(p) focus(p); return }
  if(el.tagName==="INPUT"){ el.focus(); return }
  for(const a of activators) if(a(el)) return;
}
function openOptions(el){ if(!el||el.closest("#dbox")) return; for(const h of optionHandlers) if(h(el)) return }
const hasOptions=el=>el&&!el.closest("#dbox")&&(el.dataset.pkg||el.dataset.chu||el.dataset.group!==undefined||el.dataset.wk||el.dataset.vcat||el.dataset.folder);

// ================= key routing =================
let idleAt=Date.now();
const layers=[]; // {test:()=>bool, key:(e)=>handled}
window.onBack=function(){ idleAt=Date.now(); handleKey({key:"GoBack",preventDefault(){}}) };
function backDefault(){
  if(on("dlg")) return closeDialog();
  if(document.activeElement&&document.activeElement.tagName==="INPUT"){ document.activeElement.blur(); return }
  if(focused&&!focused.classList.contains("tab")) return focus(document.querySelector(".tab.on"));
  focus(document.querySelector('.tab[data-page="home"]'));
}
const isBack=k=>k==="Escape"||k==="GoBack"||k==="BrowserBack";
let holdTimer=null, held=false, downOn=null;
function handleKey(e){
  const k=e.key;
  for(const l of layers) if(l.test()) { if(l.key(e)!==false) return }
  if(on("dlg")&&dlgOnKey&&dlgOnKey(k)){ e.preventDefault(); return }
  const typing=document.activeElement&&document.activeElement.tagName==="INPUT";
  const dirs={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};
  if(dirs[k]){
    if(typing&&(k==="ArrowLeft"||k==="ArrowRight")) return;
    e.preventDefault(); if(typing) document.activeElement.blur(); move(dirs[k]); return;
  }
  if(k==="Enter"||k===" "){
    if(typing){ e.preventDefault(); document.activeElement.blur(); const s=focused&&focused.nextElementSibling; if(s&&s.classList.contains("btn")) activate(s); return }
    e.preventDefault(); if(e.repeat) return;
    held=false; downOn=focused;
    if(hasOptions(focused)) holdTimer=setTimeout(()=>{held=true;openOptions(downOn)},650);
    return;
  }
  if(k==="ContextMenu"||k==="Menu"){e.preventDefault(); openOptions(focused); return}
  if(isBack(k)||(k==="Backspace"&&!typing)){ e.preventDefault&&e.preventDefault(); backDefault(); return }
  for(const h of keyHooks) if(h(e)) return;
}
const keyHooks=[];
document.addEventListener("keydown",e=>{ idleAt=Date.now(); handleKey(e) });
document.addEventListener("keyup",e=>{
  if(e.key!=="Enter"&&e.key!==" ") return;
  const own=layers.find(l=>l.test()&&l.ownsEnter); if(own){ if(own.keyup) own.keyup(e); return }
  if(document.activeElement&&document.activeElement.tagName==="INPUT") return;
  clearTimeout(holdTimer);
  if(!held&&downOn&&downOn===focused) activate(focused);
  held=false; downOn=null;
});
document.addEventListener("click",e=>{ idleAt=Date.now(); const f=e.target.closest(".f"); if(f){focus(f);activate(f)} });
document.addEventListener("contextmenu",e=>{ const f=e.target.closest(".f"); if(f){e.preventDefault();focus(f);openOptions(f)} });
document.addEventListener("mousemove",()=>{idleAt=Date.now()});
window.addEventListener("error",e=>console.log("err",e.message));

// called by Android when OK is held down (works on every WebView, including ones that turn OK into a click)
window.onLongOk=function(){ clearTimeout(holdTimer); held=true; downOn=null; if(on("dlg")) return; if(focused&&hasOptions(focused)) openOptions(focused) };
