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

// ---- 📊 performance widget on Home: free RAM, free storage, how fast the launcher opened
Object.assign(T.ar,{w_perf:"أداء البوكس",pfRamS:"رام فاضية",pfDiskS:"مساحة فاضية",pfBootS:"فتح في"}); Object.assign(T.en,{w_perf:"Box performance",pfRamS:"Free RAM",pfDiskS:"Free storage",pfBootS:"Opened in"});
if(LITE_HW.indexOf("perf")<0) LITE_HW.push("perf"); if(!HW_TYPES.some(t=>t[0]==="perf")) HW_TYPES.push(["perf","📊","w_perf"]);
hwBody=(function(prev){ return function(w){ if(w.t!=="perf") return prev.apply(this,arguments);
  let m={}, s={}; try{ m=JSON.parse(nat("memInfo")||"{}") }catch(e){} try{ s=JSON.parse(nat("storageInfo")||"{}") }catch(e){}
  const pct=m.total?Math.round(m.avail*100/m.total):0, col=pct<15?"#ff6b6b":pct<30?"#ffc048":"#5ad17a";
  const row=(k,v,c)=>`<div style="display:flex;justify-content:space-between;gap:10px;margin:3px 0"><span class="hwsub">${esc(k)}</span><b style="color:${c||"inherit"}">${esc(v)}</b></div>`;
  return row(L("pfDiskS"),s.free?(s.free/1e9).toFixed(1)+" GB":"—",s.free&&s.free<500e6?"#ff6b6b":"")+row(L("pfBootS"),bootMs?(bootMs/1000).toFixed(1)+" "+L("pfSec"):"—") } })(hwBody);
setInterval(()=>{ /* perf widget */ if(window.__bg||!document.querySelector("#home.on")||!hwHas("perf")) return;
  document.querySelectorAll(".hw-perf").forEach(c=>{ const w=hwGet(c.dataset.hw), b=c.querySelector(".hwb"); if(w&&b) b.innerHTML=hwBody(w) }) },30000);
setTimeout(()=>{ try{ if(!S.perfW){ S.perfW=1; const l=hwList(); if(!l.some(w=>w.t==="perf")) hwSave(l.concat([{id:"perf",t:"perf",sz:2,st:"glass"}])) } }catch(e){} },6000);
