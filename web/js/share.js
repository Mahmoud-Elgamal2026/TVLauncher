// ================= Ready to share: welcome on first run, simple settings for everyone, problem report =================
Object.assign(T.ar,{wlTitle:"أهلاً بيك 👋",wlLang:"اختار اللغة",wlCity:"مدينتك (للصلاة والطقس)",wlFav:"اختار التطبيقات اللي بتستخدمها (تظهر في الرئيسية)",wlDone:"خلصت ✓",wlSkip:"بعدين",
  advShow:"⚙️ إظهار الإعدادات المتقدمة (IPTV، تيليجرام، EPG…)",advHide:"⚙️ إخفاء الإعدادات المتقدمة",report:"📮 ابعت مشكلة أو اقتراح",reportSub:"صوّر الكود بالموبايل — هيفتح صفحة فيها بيانات جهازك جاهزة، اكتب المشكلة وابعت"});
Object.assign(T.en,{wlTitle:"Welcome 👋",wlLang:"Choose your language",wlCity:"Your city (prayer times & weather)",wlFav:"Pick the apps you use (they show on Home)",wlDone:"Done ✓",wlSkip:"Later",
  advShow:"⚙️ Show advanced settings (IPTV, Telegram, EPG…)",advHide:"⚙️ Hide advanced settings",report:"📮 Report a problem or idea",reportSub:"Scan with your phone — a page opens with your device details filled in; describe the problem and send"});

// ---- 1) welcome: language → city → favorite apps (once, on a fresh install)
function welcome(){
  dialog(L("wlTitle")+" · "+L("wlLang"),[
    {label:"العربية",pri:S.lang==="ar",fn:()=>{ S.lang="ar"; applyLang(); setTimeout(wlCity,60) }},
    {label:"English",pri:S.lang!=="ar",fn:()=>{ S.lang="en"; applyLang(); setTimeout(wlCity,60) }},
    {label:L("wlSkip"),fn:()=>{ S.welcomed=true }}],{grid:3});
}
function wlCity(){ prompt2(L("wlCity"),S.city||"",v=>{ if(v){ S.city=v; S.loc=null; try{ weather() }catch(e){} } setTimeout(wlFav,60) },"Cairo") }
function wlFav(){
  const pick=new Set(S.favs||[]), list=visibleApps().filter(a=>a.pkg!=="com.mahmoud.tvlauncher").slice(0,60);
  const draw=()=>dialog(L("wlFav"),list.map(a=>({icon:pick.has(a.pkg)?"⭐":"▫️",label:appName(a),keep:1,fn:()=>{ pick.has(a.pkg)?pick.delete(a.pkg):pick.add(a.pkg); const f=focused&&focused.dataset.di; draw(); const b=$("dbox").querySelector('[data-di="'+f+'"]'); if(b) focus(b) }}))
    .concat([{label:L("wlDone"),pri:1,fn:()=>{ S.favs=[...pick]; S.welcomed=true; S.favSeeded=true; renderHome(); if(window.wlTeam) setTimeout(wlTeam,60) }}]),{grid:3});
  draw();
}
setTimeout(()=>{ if(!S.welcomed){ if((S.favs||[]).length&&S.setupSeen){ S.welcomed=true; return } closeDialog(); welcome() } },3500);

// ---- 2) settings: advanced sections (IPTV, Telegram, EPG, lists, recording…) hidden unless asked for
DEF.advanced=false;
const ADV_RX=/IPTV|تيليجرام|Telegram|^القنوات$|^Channels$|قنوات مجانية|Free channels|مشغّل القنوات|Channel player|تسجيل|Recording|زراير الريموت|Remote buttons|تشغيل البوكس|Start-up|جدول تشغيل|Screen schedule/i;
const _renderSettingsA=renderSettings; renderSettings=function(){ _renderSettingsA.apply(this,arguments);
  const box=$("setScroll"); if(!box) return;
  // advanced sections: taken out of the list unless "show advanced" is on, then the side list is rebuilt
  box.querySelectorAll(".sec").forEach(sc=>{ const h=sc.querySelector("h3"); if(h&&ADV_RX.test(h.textContent)){ sc.classList.add("advsec"); if(!S.advanced) sc.remove() } });
  if(!$("advBtn")) box.insertAdjacentHTML("beforeend",`<div class="sec"><h3>⚙️ ${esc(S.lang==="ar"?"متقدم ومشكلة":"Advanced & report")}</h3><div class="inline"><button class="btn f${S.advanced?" pri":""}" id="advBtn">${esc(L(S.advanced?"advHide":"advShow"))}</button><button class="btn pri f" id="reportBtn">${esc(L("report"))}</button></div></div>`);
  document.body.classList.add("showadv");
  if(typeof buildSetCats==="function") buildSetCats();
};
pageHooks["settings:enter"]=renderSettings;

// ---- 3) problem report: QR → prefilled GitHub issue (device, version, recent errors)
const errLog=[]; window.addEventListener("error",e=>{ errLog.push((e.message||"")+" @"+String(e.filename||"").split("/").pop()+":"+e.lineno); if(errLog.length>8) errLog.shift() });
function reportDialog(){
  let dev={}; try{ dev=JSON.parse(nat("memInfo")||"{}") }catch(e){}
  const ver=nat("versionName")||"?", ua=navigator.userAgent.replace(/\s+/g," ").slice(0,160);
  const body=`**Version:** ${ver}\n**WebView:** ${ua}\n**RAM:** ${dev.total?Math.round(dev.total/1048576)+" MB":"?"}\n**Theme/Design:** ${S.theme}/${S.design||"-"}\n**Recent errors:**\n${errLog.join("\n")||"none"}\n\n**What happened?**\n`;
  const url="https://github.com/Mahmoud-Elgamal2026/TVLauncher/issues/new?title="+encodeURIComponent("["+ver+"] ")+"&body="+encodeURIComponent(body);
  dialog(L("report"),[{label:L("done"),fn:()=>{}}],{html:`<div style="display:flex;align-items:center;justify-content:center;gap:2vw"><div style="background:#fff;padding:1.2vh;border-radius:1.4vh;line-height:0">${qrSvg(url,320)}</div><div style="font-size:2vh;line-height:1.8;max-width:30vw">${esc(L("reportSub"))}</div></div><div class="dlist" style="margin-top:1vh"><button class="btn pri f" data-di="0">${L("done")}</button></div>`});
}
activators.unshift(el=>{ if(el.id==="advBtn"){ S.advanced=!S.advanced; renderSettings(); const secs=[].slice.call($("setScroll").children).filter(e=>e.classList.contains("sec")); if(typeof showSetCat==="function") showSetCat(secs.length-1); focus($("advBtn")); return true } if(el.id==="reportBtn"){ reportDialog(); return true } return false });

// ================= Update channel (stable for everyone, beta for the developer's box) =================
DEF.channel="stable";
Object.assign(T.ar,{chan:"قناة التحديث",chStable:"مستقرة (للناس)",chBeta:"تجريبية (كل نسخة جديدة)"});
Object.assign(T.en,{chan:"Update channel",chStable:"Stable (everyone)",chBeta:"Beta (every new build)"});
const _lifeSetCh=window.lifeSettings; window.lifeSettings=function(){ return (_lifeSetCh?_lifeSetCh():"")+sec("🧪 "+L("chan"),field("",seg("channel",[["stable",L("chStable")],["beta",L("chBeta")]]))) };

// ================= Usage stats: time spent in each app; most-used favorites first (optional) =================
Object.assign(DEF,{usage2:{},favAuto:false});
Object.assign(T.ar,{usTitle:"📊 استخدامي (آخر ٧ أيام)",usNone:"لسه مفيش بيانات — افتح تطبيقاتك وارجع بعد شوية",favAuto:"رتّب المفضلة حسب الأكتر استخدام",hr:" س",mn:" د"});
Object.assign(T.en,{usTitle:"📊 My usage (last 7 days)",usNone:"No data yet — use your apps and come back later",favAuto:"Sort favorites by most used",hr:"h",mn:"m"});
let usOpen=null;
const _launchU=launch; launch=function(pkg){ usOpen={pkg,t:Date.now()}; return _launchU.apply(this,arguments) };
function usClose(){ if(!usOpen) return; const m=Math.min(360,(Date.now()-usOpen.t)/60000); const pkg=usOpen.pkg; usOpen=null; if(m<0.3) return;
  const day=Math.floor(Date.now()/86400000), u=Object.assign({},S.usage2||{}); const r=u[pkg]||{}; r[day]=(r[day]||0)+m;
  Object.keys(r).forEach(d=>{ if(+d<day-6) delete r[d] }); u[pkg]=r; S.usage2=u; if(S.favAuto) favSort() }
document.addEventListener("visibilitychange",()=>{ if(!document.hidden) usClose() });
window.addEventListener("focus",usClose);
function usTotals(){ const u=S.usage2||{}, day=Math.floor(Date.now()/86400000); return Object.keys(u).map(p=>({p,m:Object.keys(u[p]).filter(d=>+d>=day-6).reduce((a,d)=>a+u[p][d],0)})).filter(x=>x.m>=1).sort((a,b)=>b.m-a.m) }
function favSort(){ const t=usTotals(), rank={}; t.forEach((x,i)=>rank[x.p]=i); S.favs=(S.favs||[]).slice().sort((a,b)=>(rank[a]!=null?rank[a]:999)-(rank[b]!=null?rank[b]:999)); renderHome() }
function usageDialog(){ const t=usTotals().slice(0,15), fm=m=>m>=60?Math.floor(m/60)+L("hr")+" "+Math.round(m%60)+L("mn"):Math.round(m)+L("mn");
  dialog(L("usTitle"),(t.length?t.map(x=>{ const a=byPkg(x.p); return {label:`${a?appName(a):x.p} — ${fm(x.m)}`,fn:()=>{ if(a) launch(a.pkg) }} }):[{label:L("usNone"),fn:()=>{}}])
    .concat([{icon:S.favAuto?"✅":"⬜",label:L("favAuto"),fn:()=>{ S.favAuto=!S.favAuto; if(S.favAuto) favSort() }}])) }
const _homeLookU=homeLookMenu; homeLookMenu=function(){ _homeLookU();
  const box=$("dbox"), items=box._items, g=box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  items.splice(items.length-1,0,{icon:"📊",label:L("usTitle"),fn:()=>setTimeout(usageDialog,30)});
  g.innerHTML=items.map((it,i)=>`<button class="btn f${it.pri?" pri":""}" data-di="${i}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };
// people who already use advanced features keep seeing them
if(!S.advSeeded){ S.advSeeded=true; if(S.tgToken||(S.lists||[]).length||S.schedOn||S.bootPlay) S.advanced=true }

// ================= Remove a wallpaper / frame photos sent from the phone =================
Object.assign(T.ar,{wallRemove:"🗑 شيل الخلفية (ارجع للأصلية)",framesRemove:"🗑 امسح صور البرواز اللي بعتها",wallRemoved:"رجعت الخلفية الأصلية",framesRemoved:"اتمسحت صور البرواز"});
Object.assign(T.en,{wallRemove:"🗑 Remove wallpaper (back to default)",framesRemove:"🗑 Delete the frame photos you sent",wallRemoved:"Default wallpaper restored",framesRemoved:"Frame photos deleted"});
function wallReset(){ const u=S.wallImg; S.wall="dynamic"; S.wallImg=""; S.wallAuto=""; applyLook(); if(u&&/^file:/.test(u)) try{ nat("deleteFrame",u) }catch(e){} banner("🖼",L("wallRemoved"),"",3000) }
function framesReset(){ (S.frames||[]).forEach(u=>{ try{ nat("deleteFrame",u) }catch(e){} }); S.frames=[]; if(S.frameSrc==="mine") S.frameSrc="online"; banner("🖼",L("framesRemoved"),"",3000) }
const _wallMenuR=wallMenu; wallMenu=function(){ _wallMenuR();
  const box=$("dbox"), items=box._items, g=box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  items.unshift({icon:"🗑",label:L("wallRemove"),fn:wallReset},{icon:"🗑",label:L("framesRemove"),fn:framesReset});
  g.innerHTML=items.map((it,i)=>`<button class="btn f${it.pri?" pri":""}" data-di="${i}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };
// the phone can do it too
window.remoteWallReset=wallReset; window.remoteFramesReset=framesReset;

// a clear "remove picture" button right next to "pick a picture" in Settings → Look, and in the animated-background section
const _renderSettingsW=renderSettings; renderSettings=function(){ _renderSettingsW.apply(this,arguments);
  const pick=$("wallPick"); if(pick&&!$("wallX")) pick.insertAdjacentHTML("afterend",`<button class="btn f" id="wallX">${esc(L("wallRemove"))}</button>`);
  [].forEach.call(document.querySelectorAll("#setScroll .sec h3"),h=>{ if(/خلفية متحركة|Animated background/.test(h.textContent)&&!$("wallX2")) h.parentNode.insertAdjacentHTML("beforeend",`<div class="inline" style="margin-top:1vh"><button class="btn f" id="wallX2">${esc(L("wallRemove"))}</button><button class="btn f" id="framesX">${esc(L("framesRemove"))}</button></div>`) }) };
activators.unshift(el=>{ if(el.id==="wallX"||el.id==="wallX2"){ wallReset(); S.anim="off"; applyLook(); renderSettings(); return true } if(el.id==="framesX"){ framesReset(); return true } return false });

// ================= Wallpaper blur + visibility (how strongly the picture shows) =================
Object.assign(DEF,{wallBlur:0,wallShow:100});
Object.assign(T.ar,{wBlur:"ضبابية الخلفية",wShow:"ظهور الخلفية",wbOff:"من غير",wbLow:"خفيفة",wbMid:"وسط",wbHigh:"قوية"});
Object.assign(T.en,{wBlur:"Wallpaper blur",wShow:"Wallpaper visibility",wbOff:"None",wbLow:"Light",wbMid:"Medium",wbHigh:"Strong"});
function applyWallFx(){ const w=$("wall"); if(!w) return; const b=+S.wallBlur||0, o=Math.max(10,Math.min(100,+S.wallShow||100));
  w.style.filter=b?`blur(${b}px)`:""; w.style.transform=b?"scale(1.06)":""; // a little zoom hides blurred edges
  document.body.style.setProperty("--wallShow",o/100); w.style.opacity=document.body.classList.contains("wallimg")?o/100:"" }
const _applyLookWF=applyLook; applyLook=function(){ _applyLookWF.apply(this,arguments); applyWallFx() };
AFTER.wallBlur=applyWallFx; AFTER.wallShow=applyWallFx; setTimeout(applyWallFx,0);
const _renderSettingsWF=renderSettings; renderSettings=function(){ _renderSettingsWF.apply(this,arguments);
  const x=$("wallX"); if(!x||$("wfBox")) return;
  x.parentNode.insertAdjacentHTML("afterend",`<div id="wfBox">${field(L("wBlur"),seg("wallBlur",[[0,L("wbOff")],[4,L("wbLow")],[10,L("wbMid")],[20,L("wbHigh")]]))}${field(L("wShow"),seg("wallShow",[[25,"25%"],[50,"50%"],[75,"75%"],[100,"100%"]]))}</div>`);
  // mark the current choices
  document.querySelectorAll("#wfBox [data-set]").forEach(b=>{ const [k,v]=b.dataset.set.split(":"); b.classList.toggle("pri",String(S[k])===v) }) };
window.applyWallFx=applyWallFx;

// a picture wallpaper turns the animated background off (and choosing an animation removes the picture)
const _setWallA=window.setWall; if(_setWallA){ window.setWall=setWall=async function(){ S.anim="off"; S.liveWall=false; return _setWallA.apply(this,arguments) } }
const _onSetAnim=AFTER.anim; AFTER.anim=function(){ if(S.anim&&S.anim!=="off"&&S.wall==="image"){ S.wall="dynamic"; S.wallImg="" } if(_onSetAnim) _onSetAnim(); applyLook() };
