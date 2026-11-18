// ================= 📲 My apps: the apps Mahmoud always wants on the box install by themselves when missing (after a reset too) =================
// SmartTube and Downloader are built in (official sources); any other app is added once from the phone with its APK link.
Object.assign(T.ar,{maTitle:"📲 تطبيقاتي (بتنزل لوحدها)",maMissing:"تطبيقات ناقصة",maInst:"بينزّل",maDone:"اتسطّب",maFail:"ماعرفش ينزّل",maTap:"وافق على التثبيت على الشاشة",maAll:"⬇️ نزّل الناقص دلوقتي",maNone:"كل تطبيقاتك متسطبة ✓"});
Object.assign(T.en,{maTitle:"📲 My apps (install by themselves)",maMissing:"Missing apps",maInst:"Installing",maDone:"Installed",maFail:"Couldn't install",maTap:"Confirm the install on screen",maAll:"⬇️ Install missing now",maNone:"All your apps are installed ✓"});
const MA_BUILTIN=[{name:"SmartTube",pkg:"com.teamsmart.videomanager.tv",src:"gh:yuliskov/SmartTube"},{name:"Downloader",pkg:"com.esaba.downloader",src:"play"}];
Object.assign(DEF,{myApps:[],maAuto:true});
const maList=()=>MA_BUILTIN.concat((S.myApps||[]).filter(a=>a&&a.url&&!MA_BUILTIN.some(b=>b.pkg&&b.pkg===a.pkg)));
const maHas=a=>a.pkg?!!nat("hasPkg",a.pkg):(()=>{ try{ return visibleApps().some(x=>appName(x).toLowerCase()===String(a.name).toLowerCase()) }catch(e){ return false } })();
const maMissing=()=>maList().filter(a=>!maHas(a));
// a GitHub release → the APK for this box (32-bit ARM boxes need armeabi-v7a)
async function maUrl(a){ if(a.url) return a.url; if(!/^gh:/.test(a.src||"")) return "";
  const r=await A.fetchJSON(`https://api.github.com/repos/${a.src.slice(3)}/releases/latest`), l=(r.assets||[]).filter(x=>/\.apk$/i.test(x.name||""));
  const pick=l.find(x=>/stable/i.test(x.name)&&/armeabi|arm32|universal/i.test(x.name))||l.find(x=>/armeabi|universal/i.test(x.name))||l.find(x=>/stable/i.test(x.name))||l[0];
  return pick?pick.browser_download_url:"" }
let maBusy=false;
async function maInstall(list,manual){ if(maBusy) return; maBusy=true;
  const silent=typeof canSilent==="function"&&canSilent();
  for(const a of list){
    if(a.src==="play"){ if(manual) nat("openUri","market://details?id="+a.pkg); continue }
    let url=""; try{ url=await maUrl(a) }catch(e){}
    if(!url){ banner("⚠️",a.name,L("maFail"),5000); continue }
    banner("📲",a.name,L("maInst")+"…",5000);
    if(silent){ await new Promise(res=>{ maWait["my:"+a.name]=res; nat("silentInstall",url,"my:"+a.name); setTimeout(res,180000) }) }
    else if(manual){ nat("installApk",url,"my:"+a.name); banner("📲",a.name,L("maTap"),8000); await new Promise(r=>setTimeout(r,45000)) }
  }
  maBusy=false; try{ if(document.querySelector("#settings.on")) renderSettings() }catch(e){} }
const maWait={};
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
  if(m.cmd==="myApps"){ if(Array.isArray(m.list)){ S.myApps=m.list.filter(a=>a&&/^https?:\/\//.test(String(a.url||""))).slice(0,30).map(a=>({name:String(a.name||"App").slice(0,40),url:String(a.url).trim(),pkg:String(a.pkg||"").trim()}));
      if(m.install) setTimeout(()=>maInstall(maMissing(),true),300) }
    return {list:S.myApps||[],builtin:MA_BUILTIN.map(a=>a.name),missing:maMissing().map(a=>a.name)} }
  return prev.apply(this,arguments) } })(remoteCmd);
