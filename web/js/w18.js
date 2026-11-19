// ================= No Shizuku on this box: typing goes through the Accessibility helper; Shizuku stuff stays quiet unless you turn it on =================
Object.assign(DEF,{useShz:false});
Object.assign(T.ar,{tyTitle:"⌨️ الكتابة في التطبيقات من الموبايل",tyOn:"✓ شغالة — اكتب من الموبايل في أي تطبيق (دوس على خانة الكتابة بالريموت الأول)",tyOff:"مقفولة — فعّلها مرة واحدة وهتفضل شغالة",tyBtn:"⚙️ فعّلها",
  tyHow:"اختار «Elgamal TV — الكتابة من الموبايل» ← تشغيل ← موافق",shzUse:"🧩 Shizuku (للمتقدمين — محتاج كمبيوتر بعد كل ريستارت)"});
Object.assign(T.en,{tyTitle:"⌨️ Typing in apps from the phone",tyOn:"✓ On — type from the phone into any app (select the text box with the remote first)",tyOff:"Off — turn it on once and it stays on",tyBtn:"⚙️ Turn on",
  tyHow:"Pick “Elgamal TV — phone typing” → On → OK",shzUse:"🧩 Shizuku (advanced — needs a computer after every restart)"});
if(typeof shz==="function"&&shz()==="ok") S.useShz=true; // it's running → you use it
const a11yOk=()=>!!nat("a11yOn");
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const su=$("suSec");
  if(su&&!$("tySec")){ const ok=a11yOk();
    su.insertAdjacentHTML("beforebegin",`<div class="field" id="tySec"><label>${esc(L("tyTitle"))}</label><div class="inline"><span class="hint">${esc(L(ok?"tyOn":"tyOff"))}</span>${ok?"":`<button class="btn f pri" id="tyGo">${esc(L("tyBtn"))}</button>`}</div></div>`);
    if(!S.useShz){ su.style.display="none" } } return r } })(renderSettings);
activators.unshift(el=>{ if(el.id!=="tyGo") return false; nat("openA11ySettings"); banner("⌨️",L("tyTitle"),L("tyHow"),12000); return true });
// health check: typing is part of "is the box ready"
health=(function(prev){ return function(){ const l=prev.apply(this,arguments); if(NA&&NA.a11yOn&&!a11yOk()) l.push(["⌨️",L("tyTitle")+" — "+L("tyOff"),()=>nat("openA11ySettings")]); return l } })(health);
