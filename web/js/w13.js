// ================= Phone extras: typing / voice into ANY app, full backup helpers, box files, Shizuku watch, light mode for weak boxes =================
Object.assign(T.ar,{imeNeed:"عشان تكتب جوه أي تطبيق من الموبايل، Shizuku لازم يكون شغال",imeNeedSub:"شغّله من تطبيق Shizuku أو من الإعدادات ← 🤫 التحديث من غير ما تدوس",
  shzStop:"Shizuku وقف",shzStopSub:"التحديث الصامت والكتابة في التطبيقات مش هيشتغلوا لحد ما تشغّله تاني",shzBack:"Shizuku رجع يشتغل ✓",
  stNeed:"اسمح للانشر يشوف الملفات",stNeedSub:"وافق على الطلب اللي على الشاشة، وبعدين افتح الملفات من الموبايل تاني",
  a11yNeed:"عشان تكتب جوه أي تطبيق من الموبايل: فعّل «Elgamal TV — الكتابة من الموبايل» مرة واحدة",a11ySub:"الإعدادات ← ⌨️ الكتابة في التطبيقات ← فعّل",a11yNoField:"دوس بالريموت على خانة الكتابة الأول، وبعدين اكتب",
  lowLabel:"وضع البوكس الضعيف (أنيميشن وتأثيرات أقل)",lowAuto:"تلقائي",acctHint:"اكتب إيميلك والباسورد بنفسك هنا"});
Object.assign(T.en,{imeNeed:"Typing into any app from the phone needs Shizuku running",imeNeedSub:"Start it in the Shizuku app or Settings → 🤫 Updates with no prompt",
  shzStop:"Shizuku stopped",shzStopSub:"Silent updates and typing into apps won't work until it runs again",shzBack:"Shizuku is running again ✓",
  stNeed:"Allow the launcher to see files",stNeedSub:"Accept the prompt on screen, then open Files on the phone again",
  a11yNeed:"To type into any app from the phone, turn on “Elgamal TV — phone typing” once",a11ySub:"Settings → ⌨️ Typing in apps → turn on",a11yNoField:"Select the text box with the remote first, then type",
  lowLabel:"Weak-box mode (fewer animations & effects)",lowAuto:"Auto",acctHint:"Type your email and password yourself here"});

// ---- (3)(4) text and voice from the phone: inside the launcher as before; inside another app through the hidden phone keyboard
function imeSend(t,submit){ const r=NA&&NA.imeText?nat("imeText",String(t||""),!!submit):"need";
  if(r==="a11y"){ if(!imeSend.warned||Date.now()-imeSend.warned>60000){ imeSend.warned=Date.now(); banner("⌨️",L("a11yNeed"),L("a11ySub"),10000) } return false }
  if(r==="nofield"){ // TizenTube draws its own search box (no real text field): send the words to it as a YouTube search instead
    const tp=(S.maPkgs||{}).TizenTube, front=(S.recent||[])[0];
    if(tp&&front===tp&&submit!==false&&String(t||"").trim()){ if(nat("openUriIn","https://www.youtube.com/results?search_query="+encodeURIComponent(String(t).trim()),tp)) return true }
    banner("⌨️",L("a11yNoField"),"",4000); return false }
  if(r==="need"){ if(!imeSend.warned||Date.now()-imeSend.warned>60000){ imeSend.warned=Date.now(); banner("⌨️",L("imeNeed"),L("imeNeedSub"),8000) } return false } return true }
remoteCmd=(function(prev){ return function(m){ m=m||{};
  if(window.__bg&&(m.cmd==="text"||m.cmd==="voice")){ const ok=imeSend(m.t,m.cmd==="voice"||!!m.submit); return ok?{ok:1,to:"app"}:{error:"ime"} }
  switch(m.cmd){
    case "userApps": { let l=[]; try{ l=JSON.parse(nat("userApps")||"[]") }catch(e){} return {apps:l} }
    case "hasApp": return {has:!!nat("hasPkg",String(m.pkg||""))};
    case "addAccount": nat("addAccount"); banner("👤","Google",L("acctHint"),8000); return {ok:1};
    case "needStorage": if(!nat("hasStorageAccess")){ nat("askStorageAccess"); banner("📁",L("stNeed"),L("stNeedSub"),9000) } return {ok:1};
    case "state": { const s=prev.apply(this,arguments); if(s&&typeof s==="object"){ s.shz=typeof shz==="function"?shz():"none"; s.bg=!!window.__bg } return s }
  }
  return prev.apply(this,arguments) } })(remoteCmd);

// ---- (6) tell me when Shizuku stops (it stops after every restart of the box unless it's started again)
let shzLast=null;
function shzWatch(){ if(typeof shz!=="function"||!S.useShz) return; const s=shz();
  if(shzLast==="ok"&&s!=="ok") banner("⚠️",L("shzStop"),L("shzStopSub"),12000);
  else if(shzLast&&shzLast!=="ok"&&s==="ok") banner("✅",L("shzBack"),"",4000);
  if(s==="ok") store.set("shzEver",1);
  // after a restart: it used to work but isn't running now → say it once, two minutes after start-up
  if(shzLast===null&&s!=="ok"&&store.get("shzEver",0)&&s!=="none") setTimeout(()=>{ if(shz()!=="ok") banner("⚠️",L("shzStop"),L("shzStopSub"),12000) },120000);
  shzLast=s }
setTimeout(shzWatch,20000); setInterval(()=>{ /* shizuku watch */ shzWatch() },60000);
const _onShzW=window.onShizuku; window.onShizuku=function(){ if(_onShzW) try{ _onShzW.apply(this,arguments) }catch(e){} setTimeout(shzWatch,500) };

// ---- (8) weak-box mode: on a 1–1.5 GB box drop blur, shadows and animations (auto by RAM, can be forced on/off)
Object.assign(DEF,{lowRam:"auto"});
function lowRamOn(){ if(S.lowRam==="on") return true; if(S.lowRam==="off") return false;
  try{ const m=JSON.parse(nat("memInfo")||"{}"); return !!m.total&&m.total<1.6e9 }catch(e){ return false } }
function applyLowRam(){ document.body.classList.toggle("lowram",lowRamOn()) }
applyLowRam();
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const a=$("coOn"), f=a&&a.closest(".field");
  if(f&&!$("lrAuto")) f.insertAdjacentHTML("afterend",`<div class="field"><label>${esc(L("lowLabel"))}</label><div class="inline">${[["auto",L("lowAuto")],["on",L("on")],["off",L("off")]].map(([v,t])=>`<button class="btn f${S.lowRam===v?" pri":""}" id="lr${v[0].toUpperCase()+v.slice(1)}" data-lr="${v}">${esc(t)}</button>`).join("")}</div></div>`); return r } })(renderSettings);
activators.unshift(el=>{ const v=el.dataset&&el.dataset.lr; if(!v) return false; S.lowRam=v; applyLowRam();
  document.querySelectorAll("[data-lr]").forEach(b=>b.classList.toggle("pri",b.dataset.lr===v)); return true });
