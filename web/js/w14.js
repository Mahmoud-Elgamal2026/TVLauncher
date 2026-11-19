// ================= 📲 My apps: the apps Mahmoud always wants on the box install by themselves when missing (after a reset too) =================
// SmartTube and Downloader are built in (official sources); any other app is added once from the phone with its APK link.
Object.assign(T.ar,{maTitle:"📲 تطبيقاتي (بتنزل لوحدها)",maMissing:"تطبيقات ناقصة",maInst:"بينزّل",maDone:"اتسطّب",maFail:"ماعرفش ينزّل",maTap:"وافق على التثبيت على الشاشة",maAll:"⬇️ نزّل الناقص دلوقتي",maNone:"كل تطبيقاتك متسطبة ✓",maWeb:"اللينك ده مش ملف مباشر — فتحته في المتصفح، نزّله من هناك"});
Object.assign(T.en,{maTitle:"📲 My apps (install by themselves)",maMissing:"Missing apps",maInst:"Installing",maDone:"Installed",maFail:"Couldn't install",maTap:"Confirm the install on screen",maAll:"⬇️ Install missing now",maNone:"All your apps are installed ✓",maWeb:"Not a direct APK link — opened it in the browser, download it there"});
const MA_BUILTIN=[{name:"Shizuku",pkg:"moe.shizuku.privileged.api",url:"https://github.com/Mahmoud-Elgamal2026/TVLauncher/raw/main/dist/Shizuku.apk"},{name:"SmartTube",pkg:"com.teamsmart.videomanager.tv",src:"gh:yuliskov/SmartTube"},{name:"Downloader",pkg:"com.esaba.downloader",src:"play"}];
Object.assign(DEF,{myApps:[],maAuto:true});
const maList=()=>{ const mine=(S.myApps||[]).filter(a=>a&&a.url&&!MA_BUILTIN.some(b=>b.pkg&&b.pkg===a.pkg||b.name.toLowerCase()===String(a.name).toLowerCase()||b.url===a.url));
  // order: Shizuku first (it makes the rest silent), then your apps, then GitHub ones, the Play Store one last
  return MA_BUILTIN.slice(0,1).concat(mine,MA_BUILTIN.slice(1)) };
const userPkgs=()=>{ try{ return JSON.parse(nat("userApps")||"[]") }catch(e){ return [] } };
// installed? its package (or the package we learned last time), or an installed app with the same name
const maHas=a=>(a.pkg&&!!nat("hasPkg",a.pkg))||(S.maPkgs&&S.maPkgs[a.name]&&!!nat("hasPkg",S.maPkgs[a.name]))||(()=>{ const n=String(a.name||"").toLowerCase().replace(/\s+/g,"");
    return n.length>2&&n!=="app"&&userPkgs().some(x=>{ const m=String(x.name||"").toLowerCase().replace(/\s+/g,""); return m===n||m.indexOf(n)>=0||n.indexOf(m)>=0&&m.length>3 }) })()||(()=>{ try{ const n=String(a.name).toLowerCase(); return n!=="app"&&visibleApps().some(x=>appName(x).toLowerCase()===n) }catch(e){ return false } })();
const maMissing=()=>maList().filter(a=>!maHas(a));
// a GitHub release → the APK for this box (32-bit ARM boxes need armeabi-v7a)
async function maUrl(a){ if(a.url) return a.url; if(!/^gh:/.test(a.src||"")) return "";
  const r=await A.fetchJSON(`https://api.github.com/repos/${a.src.slice(3)}/releases/latest`), l=(r.assets||[]).filter(x=>/\.apk$/i.test(x.name||""));
  const pick=l.find(x=>/stable/i.test(x.name)&&/armeabi|arm32|universal/i.test(x.name))||l.find(x=>/armeabi|universal/i.test(x.name))||l.find(x=>/stable/i.test(x.name))||l[0];
  return pick?pick.browser_download_url:"" }
let maBusy=false;
async function maInstall(list,manual){ if(maBusy){ if(manual) banner("⏳",L("maTitle"),L("maInst")+"…",4000); return } maBusy=true;
  const silent=typeof canSilent==="function"&&canSilent();
  for(const a of list){
    if(a.src==="play"){ if(manual){ nat("openUri","market://details?id="+a.pkg); banner("▶️",a.name,L("maTap"),8000);
        for(let t=0;t<40&&!nat("hasPkg",a.pkg);t++) await new Promise(r=>setTimeout(r,3000)) } continue } // one Play Store page at a time
    let url=""; try{ url=await maUrl(a) }catch(e){}
    if(!url){ banner("⚠️",a.name,L("maFail"),5000); continue }
    banner("📲",a.name,L("maInst")+"…",5000);
    // download first and look inside: we learn the real package and name, and skip it if it's already installed
    const id="my:"+a.name, pr=await new Promise(res=>{ maProbe[id]=res; nat("probeApk",url,id); setTimeout(()=>res({error:"timeout"}),300000) });
    if(pr.error){ if(manual){ banner("🌐",a.name,L("maWeb"),10000); nat("openUri",url) } continue }
    if(!MA_BUILTIN.includes(a)) S.myApps=(S.myApps||[]).map(x=>x.url===a.url?Object.assign({},x,{pkg:pr.pkg,name:(x.auto||/^app$/i.test(x.name))&&pr.name?pr.name:x.name,auto:false}):x);
    S.maPkgs=Object.assign({},S.maPkgs||{},{[a.name]:pr.pkg});
    if(pr.installed!=null&&pr.installed>=pr.ver){ banner("✅",pr.name||a.name,L("maDone"),3000); continue }
    if(silent){ await new Promise(res=>{ maWait[id]=res; nat("silentInstall","",id); setTimeout(res,180000) }) }
    else if(manual){ nat("installLocal"); banner("📲",pr.name||a.name,L("maTap"),10000);
      for(let t=0;t<50&&!nat("hasPkg",pr.pkg);t++) await new Promise(r=>setTimeout(r,3000)) }
    else continue;
    if(nat("hasPkg",pr.pkg)) banner("✅",pr.name||a.name,L("maDone"),4000)
  }
  maBusy=false; try{ if(document.querySelector("#settings.on")) renderSettings() }catch(e){} }
const maWait={}, maProbe={};
window.onApkProbe=(id,o)=>{ const f=maProbe[id]; delete maProbe[id]; if(f) f(o||{error:"x"}) };
const _onApkPrMa=window.onApkProgress; window.onApkProgress=function(id,p){ if(String(id).indexOf("my:")===0){ if(p>0&&p%20===0) banner("⬇️",id.slice(3),p+"%",2000); else if(p===-1) banner("⚠️",id.slice(3),L("maFail"),5000); return } return _onApkPrMa&&_onApkPrMa.apply(this,arguments) };
const _onSilentMa=window.onSilentInstall; window.onSilentInstall=function(id,res){
  if(String(id).indexOf("my:")!==0) return _onSilentMa&&_onSilentMa.apply(this,arguments);
  banner(res==="ok"?"✅":"⚠️",id.slice(3),L(res==="ok"?"maDone":"maFail"),5000); const f=maWait[id]; delete maWait[id]; if(f) f() };
// by itself: a minute after start-up and every 30 min (silently with Shizuku; without it, one reminder with a button)
function maTick(){ if(!S.maAuto||window.__bg||on("player")) return; const m=maMissing().filter(a=>a.src!=="play"); if(!m.length) return;
  if(typeof canSilent==="function"&&canSilent()) maInstall(m,false);
  else if(store.get("maAsked","")!==m.map(a=>a.name).join(",")){ store.set("maAsked",m.map(a=>a.name).join(","));
    dialog("📲 "+L("maMissing"),[{label:L("maAll"),pri:1,fn:()=>maInstall(maMissing(),true)},{label:L("later"),fn:()=>{}}],{sub:m.map(a=>a.name).join(" · ")}) } }
setTimeout(maTick,60000); setInterval(()=>{ /* my apps */ maTick() },30*60000);
// settings row
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const s=$("suSec");
  if(s&&!$("maSec")){ const miss=maMissing();
    s.insertAdjacentHTML("afterend",`<div class="field" id="maSec"><label>${esc(L("maTitle"))}</label><div class="inline"><span class="hint">${esc(maList().map(a=>(maHas(a)?"✓ ":"⬜ ")+a.name).join(" · "))}</span>${miss.length?`<button class="btn f pri" id="maGo">${esc(L("maAll"))}</button>`:`<span class="hint">${esc(L("maNone"))}</span>`}</div></div>`) } return r } })(renderSettings);
activators.unshift(el=>{ if(el.id!=="maGo") return false; maInstall(maMissing(),true); return true });
// phone: read / change the list (the phone keeps a copy and sends it back after a reset)
remoteCmd=(function(prev){ return function(m){ m=m||{};
  if(m.cmd==="myApps"){ if(Array.isArray(m.list)){ S.myApps=m.list.filter(a=>a&&/^https?:\/\//.test(String(a.url||""))).slice(0,30).map(a=>({name:String(a.name||"App").slice(0,40),url:String(a.url).trim(),pkg:String(a.pkg||"").trim(),auto:!!a.auto}));
      if(m.install) setTimeout(()=>maInstall(maMissing(),true),300) }
    return {list:S.myApps||[],builtin:MA_BUILTIN.map(a=>a.name),missing:maMissing().map(a=>a.name)} }
  return prev.apply(this,arguments) } })(remoteCmd);

// ---- Home: widgets on top, apps under them (first thing under the clock/shelf, above "continue watching" too)
DEF.homeOrder="w";
if(!S.wTopMig){ S.wTopMig=1; S.homeOrder="w" }
applyHomeLook=(function(prev){ return function(){ const r=prev.apply(this,arguments);
  if(S.homeOrder==="w"){ const sc=document.querySelector("#home .scroll"), first=document.querySelector('#home .scroll > h2[data-row="watchRow"]'), wh=$("hwH"), wb=$("hwBoard");
    if(sc&&first&&wh&&wb){ const ex=[$("ytH"),$("ytRow"),$("libFavH"),$("libFavRow")].filter(Boolean); [wh,wb].concat(ex).forEach(e=>sc.insertBefore(e,first)) } } return r } })(applyHomeLook);
try{ applyHomeLook() }catch(e){}
// a fresh box (or one left with only the old empty "hero" card) gets the basic widgets — after the older first-run seeding (3 s) is done
setTimeout(()=>{ try{ const all=hwList(), l=all.filter(w=>LITE_HW.indexOf(w.t)>=0);
  if(!l.filter(w=>w.t!=="hero").length&&!S.wDefMig){ S.wDefMig=1; hwSave(l.filter(w=>w.t==="hero").concat([{id:"weather",t:"weather",sz:2,st:"glass"},{id:"prayer",t:"prayer",sz:2,st:"glass"},{id:"mcard",t:"mcard",sz:2,st:"glass"},{id:"ytnew",t:"ytnew",sz:2,st:"glass"}])) }
  else if(l.length!==all.length) hwSave(l); applyHomeLook() }catch(e){} },4500);

// ---- the big picture card (hero: time + photo) is back on top of Home, and in the widget picker
if(LITE_HW.indexOf("hero")<0) LITE_HW.unshift("hero");
if(!HW_TYPES.some(t=>t[0]==="hero")) HW_TYPES.unshift(["hero","🌄","hwHero"]);
setTimeout(()=>{ try{ if(!S.heroBack){ S.heroBack=1; const l=hwList(); if(!l.some(w=>w.t==="hero")) hwSave([{id:"hero",t:"hero",sz:4,st:"clear"}].concat(l)) } }catch(e){} },5500);
// YouTube (the official TV app) is one of the apps that must always be there
// (the official YouTube TV app says "not compatible" on this box: SmartTube is the YouTube app here)
