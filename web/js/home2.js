// ================= Home 2: pages, hero widget, folders, time-aware order, wall-clock screensaver, layout lock =================
Object.assign(DEF,{homePage:0,smartHome:true,homeLock:false,heroImg:"",heroDay:""});
Object.assign(T.ar,{hpMain:"🏠 الرئيسية",hpApps:"📱 تطبيقاتي",hpMine:"⭐ مكتبتي",hwHero:"الواجهة الكبيرة",smartHome:"الرئيسية بتتغيّر مع الوقت",hoLock:"🔒 تثبيت الشكل",locked:"الشكل مقفول — افتحه من «شكل الرئيسية»",
  hoLockOn:"مقفول",hoLockOff:"مفتوح",mineEmpty:"اضغط OK مطوّل على أي فيلم أو قارئ في المكتبة يظهر هنا",hoSmart:"ترتيب حسب الوقت"});
Object.assign(T.en,{hpMain:"🏠 Home",hpApps:"📱 My apps",hpMine:"⭐ My library",hwHero:"Hero banner",smartHome:"Home changes with the time of day",hoLock:"🔒 Lock layout",locked:"Layout is locked — unlock it in “Home look”",
  hoLockOn:"Locked",hoLockOff:"Unlocked",mineEmpty:"Long-press any film or reciter in the library to pin it here",hoSmart:"Order by time of day"});

// ---- 1) pages inside Home (dots on top; left/right on the dots switches)
(function(){ const sh=$("shelf"); if(!sh) return; const d=document.createElement("div"); d.id="homePager"; d.className="inline hpager"; sh.parentNode.insertBefore(d,sh);
  const g=document.createElement("div"); g.id="homeApps"; g.className="grid hpapps"; $("home").querySelector(".scroll").appendChild(g);
  const m=document.createElement("p"); m.id="homeMineEmpty"; m.className="hint"; $("home").querySelector(".scroll").appendChild(m) })();
const HP=["hpMain","hpApps","hpMine"];
function renderPager(){ const d=$("homePager"); if(!d) return;
  d.innerHTML=HP.map((k,i)=>`<button class="btn sm f${i===(+S.homePage||0)?" on":""}" data-hpage="${i}">${esc(L(k))}</button>`).join("") }
function applyPage(){ const p=+S.homePage||0, sc=$("home").querySelector(".scroll"); document.body.dataset.hpage=p;
  if(p===1){ $("homeApps").innerHTML=visibleApps().slice().sort((a,b)=>appName(a).localeCompare(appName(b))).map(tile).join("") } else $("homeApps").innerHTML="";
  $("homeMineEmpty").textContent=p===2&&!(S.libFav||[]).length?L("mineEmpty"):""; if(sc) sc.scrollTop=0 }
activators.unshift(el=>{ if(el.dataset&&el.dataset.hpage!=null){ S.homePage=+el.dataset.hpage; renderPager(); applyPage(); focus(document.querySelector(`[data-hpage="${S.homePage}"]`)); return true } return false });
// moving left/right across the page buttons switches page right away
focusHooks.push(el=>{ if(el.dataset&&el.dataset.hpage!=null&&+el.dataset.hpage!==(+S.homePage||0)){ S.homePage=+el.dataset.hpage; renderPager(); applyPage(); focus(document.querySelector(`[data-hpage="${S.homePage}"]`)) } });

// ---- 2) hero banner widget: today's photo + big clock + next prayer + weather
HW_TYPES.unshift(["hero","🌄","hwHero"]);
async function heroImage(){ const d=new Date().toDateString(); if(S.heroImg&&S.heroDay===d) return;
  try{ const r=await A.fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"); const i=r.images&&r.images[0]; if(!i) return;
    let u="https://www.bing.com"+i.urlbase+"_1920x1080.jpg"; if(NA&&NA.cacheImage){ try{ u=await natAsync("cacheImage",u,1280)||u }catch(e){} }
    S.heroImg=u; S.heroDay=d; renderHW() }catch(e){} }
const _hwBodyH=hwBody; hwBody=function(w){ if(w.t!=="hero") return _hwBodyH(w);
  const d=new Date(), np=S.prayerOn&&window.nextPrayer&&typeof prayers!=="undefined"&&prayers.length?nextPrayer():null;
  return `<div class="herobox"><div class="hbig">${esc(fmtTime(d))}</div><div class="hsub">${esc(fmtDate(d))}</div>
    <div class="hrow">${np?`<span>🕌 ${esc(L("prayers")[np.i])} ${esc(fmtTime(np.t))}</span>`:""}${typeof weatherNow!=="undefined"&&weatherNow?`<span>${esc(weatherNow.i)} ${esc(weatherNow.t)}°</span>`:""}</div></div>` };
const _hwCardH=hwCard; hwCard=function(w){ let h=_hwCardH(w); if(w.t==="hero"){ if(!S.heroImg) heroImage(); h=h.replace('class="hw f hw-hero','style="background-image:url(\''+esc(S.heroImg||"")+'\')" class="hw f hw-hero') } return h };

// ---- 3) folders show on the simple home too (made from an app's long-press → "add to folder")
document.body.classList.add("showfolders");

// ---- 4) time-aware order (display only; your saved order stays)
const _hwListT=hwList;
function smartOrder(l){ if(!S.smartHome||hwEdit.on) return l; const h=new Date().getHours(), live=typeof matches!=="undefined"&&matches.some(e=>evState(e)==="live");
  const pri=t=>t==="hero"?-10:live&&t==="matches"?-5:(h>=4&&h<11)&&(t==="azkarA"||t==="wird"||t==="weather")?-3:(h>=20||h<2)&&(t==="live"||t==="cont")?-3:(h>=15&&h<19)&&t==="azkarA"?-2:0;
  return l.map((w,i)=>({w,i})).sort((a,b)=>(pri(a.w.t)-pri(b.w.t))||(a.i-b.i)).map(x=>live&&x.w.t==="matches"?Object.assign({},x.w,{sz:3}):x.w) }
const _renderHWT=renderHW; renderHW=function(){ const real=S.hw; const tmp=smartOrder(_hwListT()); const b=$("hwBoard");
  // draw the smart order without saving it
  hwList=()=>tmp; try{ _renderHWT.apply(this,arguments) }finally{ hwList=_hwListT } };

// ---- 5) wall-clock screensaver: the frame shows big clock, prayer, weather and dhikr by default
if(!S.frameLaySeeded){ S.frameLaySeeded=true; S.frameLay=Object.assign({clock:{s:1.8,x:4,y:58},prayer:{s:1.4},weather:{s:1.4},azkar:{on:true,s:1.2}},S.frameLay||{}) }

// ---- 6) lock the layout (needs the PIN to unlock when one is set)
function lockedNow(){ if(!S.homeLock) return false; A.toast("🔒 "+L("locked")); return true }
const _hwMenuL=hwMenu; hwMenu=function(id){ if(lockedNow()) return; _hwMenuL(id) };
const _hwAddL=hwAddMenu; hwAddMenu=function(){ if(lockedNow()) return; _hwAddL() };
const _hwEditL=hwEditStart; hwEditStart=function(){ if(lockedNow()) return; _hwEditL() };
const _hwPresetL=hwPresetMenu; hwPresetMenu=function(){ if(lockedNow()) return; _hwPresetL() };
const _homeLookL=homeLookMenu; homeLookMenu=function(){ _homeLookL();
  const box=$("dbox"), items=box._items, g=box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  items.splice(items.length-1,0,
    {icon:"🕒",label:L("hoSmart")+": "+L(S.smartHome?"hoShow":"hoHide"),keep:1,fn:()=>{ S.smartHome=!S.smartHome; renderHW(); setTimeout(homeLookMenu,30) }},
    {icon:"🔒",label:L("hoLock")+": "+L(S.homeLock?"hoLockOn":"hoLockOff"),keep:1,fn:()=>{ const flip=()=>{ S.homeLock=!S.homeLock; setTimeout(homeLookMenu,30) }; if(S.homeLock&&S.pin) guard(true,flip); else flip() }});
  g.innerHTML=items.map((it,i)=>`<button class="btn f${it.pri?" pri":""}" data-di="${i}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };
// app long-press: moving favorites is blocked while locked
optionHandlers.unshift(el=>{ if(S.homeLock&&el.closest&&el.closest("#favRow")&&el.dataset.pkg){ dialog(appName(byPkg(el.dataset.pkg)||{name:el.dataset.pkg}),[{label:L("open"),pri:1,fn:()=>launch(el.dataset.pkg)},{label:L("cancel"),fn:()=>{}}]); return true } return false });

// first run of this version: put the hero on top
if(!S.heroSeeded){ S.heroSeeded=true; if(!hwList().some(w=>w.t==="hero")) S.hw=[{id:"hero",t:"hero",sz:4,st:"clear"}].concat(hwList().filter(w=>w.t!=="clock")) }
const _renderHomeP=renderHome; renderHome=function(){ _renderHomeP.apply(this,arguments); renderPager(); applyPage() }; window.renderHome=renderHome;
setTimeout(()=>{ renderPager(); applyPage() },0);

// ================= Creator signature =================
const CREATOR={ar:"محمود الجمل",en:"Mahmoud Elgamal",img:"img/creator.jpg"};
(function(){ const b=document.createElement("div"); b.id="creator"; document.body.appendChild(b) })();
function renderCreator(){ const e=$("creator"); if(!e) return; const ar=S.lang==="ar";
  e.innerHTML=`<img src="${CREATOR.img}" onerror="this.remove()" alt=""><span>${ar?"صُنع بواسطة":"Made by"} <b>${esc(ar?CREATOR.ar:CREATOR.en)}</b></span>` }
renderCreator(); const _applyLangC=applyLang; applyLang=function(){ _applyLangC.apply(this,arguments); renderCreator() };
// a short signed splash on start
(function(){ const s=document.createElement("div"); s.id="splashSig"; const ar=S.lang==="ar";
  s.innerHTML=`<img src="${CREATOR.img}" onerror="this.remove()" alt=""><div class="t1">TV Launcher</div><div class="t2">${ar?"من تصميم وتطوير":"Designed & built by"}</div><div class="t3">${esc(ar?CREATOR.ar:CREATOR.en)}</div>`;
  document.body.appendChild(s); setTimeout(()=>s.classList.add("out"),1600); setTimeout(()=>s.remove(),2300) })();

// ================= Easier widget removal + always-closable player =================
// in arrange mode OK opens a clear action sheet for that widget (remove is first)
const _hwEditStartX=hwEditStart; hwEditStart=function(){ _hwEditStartX(); banner("✏️",S.lang==="ar"?"دوس OK على أي ويدجت عشان تشيلها أو تغيّرها":"Press OK on a widget to remove or change it",L("edDone"),600000) };
layers.unshift({test:()=>hwEdit.on&&!hwEdit.grab&&!on("dlg"),ownsEnter:true,key:e=>{
  const k=e.key; if(!(k==="Enter"||e.keyCode===13||e.keyCode===23)) return false; held=true;
  const id=focused&&focused.dataset&&focused.dataset.hw; if(!id) return false;
  const w=hwGet(id), t=HW_TYPES.find(x=>x[0]===(w&&w.t))||["","",""];
  dialog(t[1]+" "+L(t[2]),[
    {icon:"🗑",label:L("hwRemove"),pri:1,fn:()=>{ hwSave(hwList().filter(x=>x.id!==id)); setTimeout(()=>{ const e2=document.querySelector("#hwBoard .hw"); if(e2) focus(e2) },60) }},
    {icon:"✋",label:S.lang==="ar"?"امسكها وحرّكها بالأسهم":"Grab and move with arrows",fn:()=>{ hwEdit.grab=id; renderHW(); banner("✋",L("edHold"),"",600000) }},
    {icon:"➕",label:L("wBigger"),keep:1,fn:()=>hwSet(id,{sz:Math.min(3,(hwGet(id).sz||1)+1)})},
    {icon:"➖",label:L("wSmaller"),keep:1,fn:()=>hwSet(id,{sz:Math.max(1,(hwGet(id).sz||1)-1)})},
    {icon:"🎨",label:L("hwStyle"),keep:1,fn:()=>{ const x=hwGet(id); hwSet(id,{st:HW_STYLES[(HW_STYLES.indexOf(x.st||"glass")+1)%HW_STYLES.length]}) }},
    {label:L("done"),fn:()=>{}}],{grid:3});
  return true }});
// the player: Back, Home or the menu key always close it; a stream that never starts closes itself
document.addEventListener("keydown",e=>{ if(on("player")&&!on("dlg")&&(e.key==="Home"||e.key==="Escape")){ stopPlayer() } },true);
let plWatch=null;
const _playX=play; play=function(c){ _playX.apply(this,arguments); clearTimeout(plWatch);
  plWatch=setTimeout(()=>{ const v=$("video"); if(on("player")&&v&&(v.readyState<2||v.error)){ stopPlayer(); A.toast(S.lang==="ar"?"القناة مش شغالة — اتقفلت":"Stream didn't start — closed") } },25000) };

// ================= "Clear everything": Boost also stops any channel, radio or sound playing in the background =================
const _boostNowX=boostNow; boostNow=async function(){
  try{ if(on("player")) stopPlayer() }catch(e){}
  try{ const v=$("video"); if(v){ v.pause(); v.removeAttribute("src"); v.load() } }catch(e){}
  try{ if(typeof adhanAudio!=="undefined"&&adhanAudio) adhanAudio.pause() }catch(e){}
  try{ nat("stopAudio") }catch(e){}
  try{ if(typeof pvStop==="function") pvStop() }catch(e){}
  return _boostNowX.apply(this,arguments) };
window.boostNow=boostNow;

// ================= Side rail: round buttons for Home (widgets) / Apps / My library =================
(function(){ const p=$("homePager"); if(!p) return; p.id="homePagerOld"; p.style.display="none";
  const r=document.createElement("div"); r.id="homePager"; r.className="hrail"; $("home").appendChild(r) })();
const RAIL_ICON=["🏠","📱","⭐"];
renderPager=function(){ const d=$("homePager"); if(!d) return; const cur=+S.homePage||0;
  d.innerHTML=HP.map((k,i)=>`<button class="rb f${i===cur?" on":""}" data-hpage="${i}"><b>${RAIL_ICON[i]}</b><span>${esc(L(k).replace(/^\S+\s/,""))}</span></button>`).join("") };
// switch only on OK (not while just passing over the buttons)
const _fhIdx=focusHooks.findIndex(f=>String(f).indexOf("hpage")>=0); if(_fhIdx>=0) focusHooks.splice(_fhIdx,1);

// tag the Favorites heading so pages can show/hide it
setTimeout(()=>{ const fr=$("favRow"), h=fr&&fr.previousElementSibling; if(h&&h.tagName==="H2") h.classList.add("favh") },0);

// ================= Fewer, bigger widgets: small info moves to the header and the hero =================
// one-time cleanup: clock / small weather / boost widgets duplicate the header
if(!S.slimSeeded){ S.slimSeeded=true; S.hw=hwList().filter(w=>!(w.t==="clock"||w.t==="boost"||(w.t==="weather"&&(w.sz||1)<2)||w.t==="wird"));
  if(!hwList().some(w=>w.t==="hero")) S.hw=[{id:"hero",t:"hero",sz:4,st:"clear"}].concat(hwList()) }
// next prayer under the header clock
(function(){ const d=$("date"); if(!d) return; const m=document.createElement("div"); m.id="npMini"; d.parentNode.insertBefore(m,d.nextSibling) })();
tickers.push(()=>{ const m=$("npMini"); if(!m) return; const np=S.prayerOn&&window.nextPrayer&&typeof prayers!=="undefined"&&prayers.length?nextPrayer():null;
  const t=np?`🕌 ${L("prayers")[np.i]} ${fmtTime(np.t)} · ${fmtLeft(np.t-Date.now())}`:""; if(m.textContent!==t) m.textContent=t });
// hero: live match line + daily wird ticker
const _hwBodyS2=hwBody; hwBody=function(w){ let h=_hwBodyS2(w); if(w.t!=="hero") return h;
  const live=typeof matches!=="undefined"?matches.find(e=>evState(e)==="live"):null;
  if(live) h=h.replace('<div class="hrow">',`<div class="hlive">⚽ <b>${esc(live.strHomeTeam)} ${esc(String(live.intHomeScore||0))} - ${esc(String(live.intAwayScore||0))} ${esc(live.strAwayTeam)}</b> <span>● ${esc(L("live"))}</span></div><div class="hrow">`);
  const wd=(typeof wird!=="undefined"&&wird)||S.wird; if(!wd&&typeof loadWird==="function") loadWird();
  if(wd) h=h.replace(/<\/div>$/,`<div class="hwird"><span>📖 ${esc(wd.text)} — ${esc(wd.ref)}</span></div></div>`);
  return h };
// the hero needs matches even with no matches widget
setTimeout(()=>{ if(!sportsTried&&S.sportsOn!==false){ sportsTried=true; loadSports() } },8000);

// fixed Boost / clear-all button at the bottom of the side rail, always in view on Home
const _renderPagerB=renderPager; renderPager=function(){ _renderPagerB(); const d=$("homePager"); if(!d||$("railBoost")) return;
  d.insertAdjacentHTML("beforeend",`<button class="rb f boostrb" id="railBoost"><b>🚀</b><span>${esc(S.lang==="ar"?"تسريع وقفل كل حاجة":"Boost & close all")}</span></button>`) };
activators.unshift(el=>{ if(el.id==="railBoost"){ boostNow(); return true } return false });
// phone page can add a YouTube channel
window.ytAddFromPhone=async v=>{ if(!v) return; try{ const r=await ytResolve(v); if(!r) return A.toast(L("ytBad"));
  if(!r.name){ try{ const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+r.id); const m=x.match(/<title>([^<]+)<\/title>/); r.name=m?m[1]:r.id }catch(e){ r.name=r.id } }
  const chs=(S.ytCh||[]).filter(c=>c.id!==r.id); chs.push({id:r.id,name:r.name}); S.ytCh=chs;
  if(!hwList().some(w=>w.t==="yt")) hwSave(hwList().concat([{id:"yt",t:"yt",sz:1,st:"glass"}]));
  ytAt=0; ytLoad(true); banner("▶️",r.name,S.lang==="ar"?"اتضافت لويدجت يوتيوب":"Added to YouTube widget",5000) }catch(e){ A.toast(L("ytBad")) } };
