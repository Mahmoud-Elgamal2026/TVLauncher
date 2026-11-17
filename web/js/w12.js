// ================= Lite: what Mahmoud doesn't use is taken off the screen; Home keeps only what matters =================
// removed: free library, files & recording, store, the old sports page, kids / guest / family profiles, hourly suggestions, theme picker & seasonal looks, extra widgets
const LITE_PAGES=["lib","files","store","sports"];
const LITE_HW=["clock","weather","prayer","mcard","ytnew"];
const LITE_SET=/المكتبة|Library|الملفات والتسجيل|Files & recording|تسجيل|Recording|المتجر|Store|الأطفال|Kids|الضيف|Guest|الملفات الشخصية|Profiles|العيلة|Family|مقترح ليك|Suggest|الثيم|Theme|المواسم|Season/;
document.body.classList.add("lite");
S.seasonal=false; S.guest=false;
// back to the main profile if a kids profile was active
(function(){ try{ const p=profile(); if(p&&p.kids){ const m=(S.profiles||[]).find(x=>!x.kids); if(m){ S.cur=m.id; applyLook() } } }catch(e){} })();
function liteTabs(){ LITE_PAGES.forEach(p=>{ const t=document.querySelector(`.tab[data-page="${p}"]`); if(t){ t.style.setProperty("display","none","important"); t.classList.remove("f") } }) }
liteTabs(); setTimeout(liteTabs,1500);
showPage=(function(prev){ return function(id){ if(LITE_PAGES.indexOf(id)>=0) id="home"; return prev.apply(this,[id].concat([].slice.call(arguments,1))) } })(showPage);
// widgets: only the basic five; the old matches widget becomes the big match card
HW_TYPES.splice(0,HW_TYPES.length,...HW_TYPES.filter(t=>LITE_HW.indexOf(t[0])>=0));
if(!S.liteMig){ S.liteMig=1; const l=hwList(); let n=l.map(w=>w.t==="matches"&&!l.some(x=>x.t==="mcard")?Object.assign({},w,{id:"mcard",t:"mcard",sz:2}):w).filter(w=>LITE_HW.indexOf(w.t)>=0);
  hwSave(n); try{ renderHW() }catch(e){} }
// settings: sections of removed features disappear
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const box=$("setScroll"); if(box) [].slice.call(box.querySelectorAll(".sec")).forEach(s=>{ const h=s.querySelector("h3"); if(h&&LITE_SET.test(h.textContent)||s.id==="skinSec"||s.querySelector("#addProfile")) s.remove() });
  ["sysClnBtn","ramBtn"].forEach(id=>{ const e=$(id); if(e) e.remove() }); // these opened the removed store page
  const c=$("setCats"); if(c&&typeof buildSetCats==="function"){ buildSetCats() } return r } })(renderSettings);
// home: back from an app → redraw once (launch no longer redraws while the app is starting)
const _onBgLite=window.onBg; window.onBg=function(b){ _onBgLite.apply(this,arguments); if(!b&&window.__homeDirty){ window.__homeDirty=false; setTimeout(()=>{ if(!window.__bg) try{ renderHome() }catch(e){} },350) } };

// ---- opening an app closes every other app you opened (they keep their data/settings); on/off in Settings ⚡
Object.assign(DEF,{closeOthers:true});
Object.assign(T.ar,{coLabel:"لما أفتح أي تطبيق، اقفل الباقي لوحده"}); Object.assign(T.en,{coLabel:"When I open an app, close the others"});
const CO_KEEP=/^(moe\.shizuku|com\.android\.(systemui|inputmethod|providers)|com\.google\.android\.(inputmethod|gms)|android$)/;
launch=(function(prev){ return function(pkg){
  // the apps you opened get a real close; every other installed app gets Android's background close too
  const mine=[].concat(typeof openedApps!=="undefined"?openedApps:[],S.recent||[]).filter((p,i,a)=>a.indexOf(p)===i);
  let all=[]; try{ all=visibleApps().map(a=>a.pkg) }catch(e){}
  const bad=p=>!p||p===pkg||p===NA_PKG||CO_KEEP.test(p); const r=prev.apply(this,arguments);
  if(S.closeOthers) setTimeout(()=>{ mine.filter(p=>!bad(p)).forEach(p=>{ try{ closeOne(p) }catch(e){} });
    all.filter(p=>!bad(p)&&mine.indexOf(p)<0).forEach(p=>{ try{ nat("closeApp",p) }catch(e){} }) },1500);
  return r } })(launch);
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const a=document.querySelector('[data-hv="autoCloseApps:on"]'), f=a&&a.closest(".field");
  if(f&&!$("coOn")) f.insertAdjacentHTML("afterend",`<div class="field"><label>${esc(L("coLabel"))}</label><div class="inline"><button class="btn f${S.closeOthers?" pri":""}" id="coOn">${esc(L("on"))}</button><button class="btn f${!S.closeOthers?" pri":""}" id="coOff">${esc(L("off"))}</button></div></div>`); return r } })(renderSettings);
activators.unshift(el=>{ if(el.id!=="coOn"&&el.id!=="coOff") return false; S.closeOthers=el.id==="coOn"; $("coOn").classList.toggle("pri",S.closeOthers); $("coOff").classList.toggle("pri",!S.closeOthers); return true });

// ---- silent installs through Shizuku: launcher updates go in by themselves when the box is idle, and APKs from the phone install with no prompt
Object.assign(DEF,{silentUpd:true});
Object.assign(T.ar,{suTitle:"🤫 التحديث من غير ما تدوس",suOk:"✓ شغال — التحديث بيتثبت لوحده لما البوكس يكون فاضي 10 دقايق",suNeed:"محتاج Shizuku يكون شغال ومسموحله",suBtn:"🔐 اسمح لـ Shizuku",suGet:"⬇️ نزّل Shizuku",
  suInst:"بيتثبت…",suDone:"✓ اتثبت",suFail:"التثبيت الصامت ماظبطش — هيظهرلك طلب التثبيت العادي"});
Object.assign(T.en,{suTitle:"🤫 Updates with no prompt",suOk:"✓ On — updates install by themselves after 10 idle minutes",suNeed:"Needs Shizuku running and allowed",suBtn:"🔐 Allow Shizuku",suGet:"⬇️ Get Shizuku",
  suInst:"Installing…",suDone:"✓ Installed",suFail:"Silent install failed — the normal install prompt will show"});
const canSilent=()=>!!(NA&&NA.silentInstall)&&typeof shz==="function"&&shz()==="ok";
window.silentApk=(name)=>{ if(!canSilent()) return false; banner("📦",name||"APK",L("suInst"),6000); nat("silentInstall","","phone:"+(name||"")); return true };
window.onSilentInstall=(id,res)=>{ const ph=id.indexOf("phone:")===0, nm=ph?id.slice(6):"Elgamal TV";
  if(res==="ok"){ banner("✅",nm,L("suDone"),5000); return }
  banner("⚠️",nm,L("suFail"),6000); if(ph) nat("installLocal"); else if(window._pendingUpdate) nat("installUpdate",window._pendingUpdate.url) };
setInterval(()=>{ /* autoUpdate silent */ const r=window._pendingUpdate; if(!r||!r.url||!S.silentUpd||!canSilent()) return;
  if(store.get("silentTried","")===r.tag||window.__bg||Date.now()-idleAt<10*60000||on("player")) return;
  store.set("silentTried",r.tag); nat("silentInstall",r.url,"update") },5*60000);
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const b=$("checkUpd"), f=b&&b.closest(".field");
  if(f&&!$("suSec")){ const ok=canSilent();
    f.insertAdjacentHTML("afterend",`<div class="field" id="suSec"><label>${esc(L("suTitle"))}</label><div class="inline"><span class="hint">${esc(L(ok?"suOk":"suNeed"))}</span>${ok?"":`<button class="btn f" id="suAllow">${esc(L("suBtn"))}</button><button class="btn f" id="suGet">${esc(L("suGet"))}</button>`}</div></div>`) } return r } })(renderSettings);
activators.unshift(el=>{ if(el.id==="suAllow"){ nat("shizukuRequest"); setTimeout(()=>{ try{ renderSettings() }catch(e){} },4000); return true }
  if(el.id==="suGet"){ A.toast("⬇️ Shizuku"); A.fetchJSON("https://api.github.com/repos/RikkaApps/Shizuku/releases/latest").then(r=>{ const a=(r.assets||[]).find(x=>/\.apk$/i.test(x.name||""));
      if(a) nat("installApk",a.browser_download_url,"shizuku"); else A.toast(L("loadErr")) }).catch(()=>A.toast(L("loadErr"))); return true } return false });
