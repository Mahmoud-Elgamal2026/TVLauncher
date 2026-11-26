// ================= Box health: backup summary, start-up check, "allow installs" button, RAM cleaner, storage warning, "continue", bedtime =================
Object.assign(T.ar,{bkTitle:"🛟 النسخة الاحتياطية على الموبايل",bkNever:"لسه ماتعملتش — افتح تطبيق الموبايل ودوس «احفظ دلوقتي»",bkAt:"آخر نسخة",bkApps:"تطبيق",bkOld:"النسخة الاحتياطية قديمة",bkOldSub:"افتح تطبيق الموبايل عشان تتحفظ نسخة جديدة",
  hcTitle:"🩺 فحص البوكس",hcNet:"مفيش نت",hcShz:"Shizuku مش شغال (التثبيت والكتابة من الموبايل محتاجينه)",hcUnk:"تثبيت التطبيقات من برا المتجر مقفول",hcDisk:"المساحة قربت تخلص",hcOk:"كله تمام ✓",hcFix:"صلّح",
  unkBtn:"🔓 اسمح بتثبيت التطبيقات",unkOn:"✓ التثبيت مسموح",ramTitle:"🧹 تنظيف الرامات لوحده",ramDone:"اتقفلت تطبيقات في الخلفية عشان البوكس يخف",
  diskLow:"المساحة قربت تخلص",diskLowSub:"فاضل {f} بس — امسح تطبيقات أو ملفات مش محتاجها، الذاكرة المليانة بتعلّق البوكس",
  contLbl:"كمّل",bedTitle:"🌙 ميعاد النوم",bedOff:"مقفول",bedIdle:"ولو مالمستش الريموت ساعة",bedNow:"🌙 وقت النوم — البوكس هيقفل التطبيقات ويطفي الشاشة بعد دقيقة",bedCancel:"لسه صاحي"});
Object.assign(T.en,{bkTitle:"🛟 Backup on the phone",bkNever:"Not made yet — open the phone app and press “Save now”",bkAt:"Last backup",bkApps:"apps",bkOld:"Backup is old",bkOldSub:"Open the phone app to save a new one",
  hcTitle:"🩺 Box check",hcNet:"No internet",hcShz:"Shizuku isn't running (installs and phone typing need it)",hcUnk:"Installing apps from outside the store is off",hcDisk:"Storage almost full",hcOk:"All good ✓",hcFix:"Fix",
  unkBtn:"🔓 Allow app installs",unkOn:"✓ Installs allowed",ramTitle:"🧹 Free memory by itself",ramDone:"Closed background apps to keep the box light",
  diskLow:"Storage almost full",diskLowSub:"Only {f} left — remove apps or files you don't need; a full box freezes",
  contLbl:"Continue",bedTitle:"🌙 Bedtime",bedOff:"Off",bedIdle:"Or after an hour without the remote",bedNow:"🌙 Bedtime — apps close and the screen goes dark in a minute",bedCancel:"Still awake"});
Object.assign(DEF,{ramAuto:true,bedTime:"",bedIdle:false});
const gb=n=>n>1e9?(n/1e9).toFixed(1)+" GB":Math.round(n/1e6)+" MB";
const storeInfo=()=>{ try{ return JSON.parse(nat("storageInfo")||"{}") }catch(e){ return {} } };
const unkOk=()=>!NA||!NA.unknownSources||!!nat("unknownSources");

// ---- (1) when the phone saved the last backup (the phone tells the box after each save)
function bkLine(){ const at=+store.get("bkAt",0), n=+store.get("bkN",0); return at?`${L("bkAt")}: ${agoAr(Date.now()-at)} · ${n} ${L("bkApps")}`:L("bkNever") }
setTimeout(()=>{ const at=+store.get("bkAt",0); if(at&&Date.now()-at>7*86400000&&store.get("bkWarn","")!==new Date().toDateString()){ store.set("bkWarn",new Date().toDateString()); banner("🛟",L("bkOld"),L("bkOldSub"),9000) } },90000);

// ---- (2) start-up check: what's missing, with the fix one press away
function health(){ const l=[]; if(navigator.onLine===false) l.push(["🌐",L("hcNet"),()=>nat("openSettings","android.settings.WIFI_SETTINGS")]);
  if(!unkOk()) l.push(["🔓",L("hcUnk"),()=>nat("openInstallSettings")]);
  if(S.useShz&&typeof shz==="function"&&shz()!=="ok") l.push(["⚙️",L("hcShz"),()=>{ showPage("settings"); setTimeout(()=>{ const e=$("suSec"); if(e){ e.scrollIntoView(); const b=e.querySelector(".f"); if(b) focus(b) } },300) }]);
  const s=storeInfo(); if(s.free&&s.free<500e6) l.push(["💾",L("hcDisk")+" · "+gb(s.free),()=>nat("openSettings","android.settings.INTERNAL_STORAGE_SETTINGS")]);
  return l }
function healthCheck(show){ const l=health(); if(!l.length){ if(show) A.toast(L("hcOk")); return }
  dialog(L("hcTitle"),l.map(x=>({label:x[0]+" "+x[1],fn:x[2]})).concat([{label:L("later"),fn:()=>{}}]),{}) }
setTimeout(()=>{ if(!window.__bg) healthCheck(false) },45000);
const _onBgH=window.onBg; window.onBg=function(b){ _onBgH&&_onBgH.apply(this,arguments); if(!b&&window.__updatedJust){ window.__updatedJust=false; setTimeout(()=>healthCheck(false),3000) } };

// ---- (4) RAM cleaner: when free memory drops under 15 %, close what's sitting in the background
setInterval(()=>{ /* ram auto */ if(!S.ramAuto||on("player")) return; let m={}; try{ m=JSON.parse(nat("memInfo")||"{}") }catch(e){}
  if(!m.total||m.avail/m.total>0.15) return; const keep=window.__bg?(S.recent||[])[0]:null; let n=0;
  try{ visibleApps().map(a=>a.pkg).filter(p=>p!==keep&&p!==NA_PKG&&!CO_KEEP.test(p)).forEach(p=>{ nat("closeApp",p); n++ }) }catch(e){}
  if(n&&!window.__bg&&Date.now()-(+store.get("ramMsg",0))>3600000){ store.set("ramMsg",Date.now()); banner("🧹",L("ramTitle"),L("ramDone"),4000) } },120000);

// ---- (5) storage warning, once a day, under 500 MB free
setInterval(()=>{ /* disk warn */ const s=storeInfo(); if(!s.free||s.free>=500e6) return; const d=new Date().toDateString(); if(store.get("diskWarn","")===d) return;
  store.set("diskWarn",d); banner("💾",L("diskLow"),L("diskLowSub").replace("{f}",gb(s.free)),10000) },30*60000);
setTimeout(()=>{ const s=storeInfo(); if(s.free&&s.free<300e6) banner("💾",L("diskLow"),L("diskLowSub").replace("{f}",gb(s.free)),10000) },60000);

// ---- (6) "Continue" on Home: the last app in one press
function contHtml(){ const p=(S.recent||[]).find(x=>x&&x!==NA_PKG); if(!p) return ""; let a=null; try{ a=visibleApps().find(x=>x.pkg===p) }catch(e){} if(!a) return "";
  return `<div class="contbar"><button class="btn f pri" id="contGo" data-pkg="${esc(p)}">▶ ${esc(L("contLbl"))}: ${esc(appName(a))}</button></div>` }
// ("Continue" bar removed: the user found it annoying; favourites 1/2 do the same)

// ---- (7) bedtime: at the time you pick (or after an hour without the remote at night) → close apps, stop video, dark screen
let bedT=null;
function bedGo(){ const id=setTimeout(()=>{ try{ if(on("player")) stopPlayer() }catch(e){} try{ visibleApps().map(a=>a.pkg).filter(p=>p!==NA_PKG&&!CO_KEEP.test(p)).forEach(p=>nat("closeApp",p)) }catch(e){}
    $("blackout").classList.add("on") },60000);
  dialog(L("bedNow"),[{label:L("bedCancel"),pri:1,fn:()=>clearTimeout(id)}],{}) }
setInterval(()=>{ /* bedtime */ const n=new Date(), hm=("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2), d=n.toDateString();
  if(S.bedTime&&hm===S.bedTime&&store.get("bedDone","")!==d){ store.set("bedDone",d); bedGo() }
  const night=n.getHours()>=23||n.getHours()<6;
  if(S.bedIdle&&night&&Date.now()-idleAt>60*60000&&!$("blackout").classList.contains("on")&&store.get("bedIdleDone","")!==d+n.getHours()){ store.set("bedIdleDone",d+n.getHours()); bedGo() } },30000);

// ---- settings rows: backup line + "allow installs" next to the silent-update row; RAM cleaner + bedtime next to weak-box mode
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments);
  const su=$("suSec"); if(su&&!$("bkSecT")){ const ok=unkOk();
    su.insertAdjacentHTML("beforebegin",`<div class="field" id="bkSecT"><label>${esc(L("bkTitle"))}</label><div class="inline"><span class="hint">${esc(bkLine())}</span></div></div>
      <div class="field"><label>${esc(L("hcTitle"))}</label><div class="inline"><button class="btn f" id="hcGo">${esc(L("hcTitle"))}</button>${ok?`<span class="hint">${esc(L("unkOn"))}</span>`:`<button class="btn f pri" id="unkGo">${esc(L("unkBtn"))}</button>`}</div></div>`) }
  const lr=document.querySelector("[data-lr]"), f=lr&&lr.closest(".field");
  if(f&&!$("ramOn")){ const bt=["","22:00","23:00","00:00","01:00"];
    f.insertAdjacentHTML("afterend",`<div class="field"><label>${esc(L("ramTitle"))}</label><div class="inline"><button class="btn f${S.ramAuto?" pri":""}" id="ramOn">${esc(L("on"))}</button><button class="btn f${!S.ramAuto?" pri":""}" id="ramOff">${esc(L("off"))}</button></div></div>
      <div class="field"><label>${esc(L("bedTitle"))}</label><div class="inline">${bt.map(t=>`<button class="btn f${S.bedTime===t?" pri":""}" data-bed="${t}">${esc(t||L("bedOff"))}</button>`).join("")}<button class="btn f${S.bedIdle?" pri":""}" id="bedIdleB">${esc(L("bedIdle"))}</button></div></div>`) }
  return r } })(renderSettings);
activators.unshift(el=>{ const d=el.dataset||{};
  if(el.id==="unkGo"){ nat("openInstallSettings"); return true }
  if(el.id==="hcGo"){ healthCheck(true); return true }
  if(el.id==="ramOn"||el.id==="ramOff"){ S.ramAuto=el.id==="ramOn"; $("ramOn").classList.toggle("pri",S.ramAuto); $("ramOff").classList.toggle("pri",!S.ramAuto); return true }
  if(d.bed!=null){ S.bedTime=d.bed; document.querySelectorAll("[data-bed]").forEach(b=>b.classList.toggle("pri",b.dataset.bed===S.bedTime)); return true }
  if(el.id==="bedIdleB"){ S.bedIdle=!S.bedIdle; el.classList.toggle("pri",S.bedIdle); return true }
  return false });
// phone → box: "I just saved a backup with n apps"
remoteCmd=(function(prev){ return function(m){ if(m&&m.cmd==="bkDone"){ store.set("bkAt",Date.now()); store.set("bkN",+m.n||0); return {ok:1} } return prev.apply(this,arguments) } })(remoteCmd);
