// ================= Steadier & measurable: start-up / memory numbers, widget & source guards, safe start, remote shortcuts =================
Object.assign(T.ar,{pfTitle:"📊 أداء البوكس",pfBoot:"اللانشر فتح في",pfSec:"ث",pfRam:"الرام الفاضية",pfDisk:"المساحة الفاضية",pfApps:"تطبيقات شغالة في الخلفية",
  safeOn:"🛟 فتحت في الوضع الآمن",safeSub:"اللانشر قفل كذا مرة ورا بعض، فالويدجت متوقفة المرة دي. هترجع لوحدها المرة الجاية",srcSlow:"مصدر بيانات اتأخر واتساب"});
Object.assign(T.en,{pfTitle:"📊 Box performance",pfBoot:"Launcher opened in",pfSec:"s",pfRam:"Free RAM",pfDisk:"Free storage",pfApps:"Apps running in the background",
  safeOn:"🛟 Started in safe mode",safeSub:"The launcher closed several times in a row, so widgets are paused this time. They come back next start",srcSlow:"A data source was slow and was skipped"});

// ---- (3) real numbers: how long the launcher took to show Home, and memory / storage now
let bootMs=0;
renderHome=(function(prev){ return function(){ const r=prev.apply(this,arguments); if(!bootMs){ bootMs=Math.round(performance.now()); const l=store.get("bootHist",[]); l.unshift(bootMs); store.set("bootHist",l.slice(0,10)) } return r } })(renderHome);
function perfLine(){ let m={}, s={}; try{ m=JSON.parse(nat("memInfo")||"{}") }catch(e){} try{ s=JSON.parse(nat("storageInfo")||"{}") }catch(e){}
  const h=store.get("bootHist",[]), avg=h.length?h.reduce((a,b)=>a+b,0)/h.length:0;
  return [`${L("pfBoot")} ${(bootMs/1000).toFixed(1)} ${L("pfSec")}${h.length>1?` (${S.lang==="ar"?"المتوسط":"avg"} ${(avg/1000).toFixed(1)})`:""}`,
    s.free?`${L("pfDisk")}: ${(s.free/1e9).toFixed(1)} GB`:""].filter(Boolean).join(" · ") }
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const a=$("bkSecT");
  if(a&&!$("pfSec")) a.insertAdjacentHTML("beforebegin",`<div class="field" id="pfSec"><label>${esc(L("pfTitle"))}</label><div class="inline"><span class="hint">${esc(perfLine())}</span></div></div>`); return r } })(renderSettings);

// ---- (4) guards: one broken widget can't break Home, and a slow source can't keep a page waiting forever
hwBody=(function(prev){ return function(w){ try{ return prev.apply(this,arguments) }catch(e){ console.log("widget",w&&w.t,e&&e.message); return `<span class="hwsub dim">—</span>` } } })(hwBody);
A.fetchText=(function(prev){ return function(url){ const p=prev.apply(this,arguments);
  return Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error("timeout")),20000))]) } })(A.fetchText);

// ---- (5) safe start: if the launcher didn't stay up for 30 s three starts in a row, start once without widgets
const bootN=(+store.get("bootN",0))+1; store.set("bootN",bootN);
setTimeout(()=>store.set("bootN",0),30000);
if(bootN>=3){ store.set("bootN",0);
  const _hwSafe=hwList; hwList=function(){ return [] }; setTimeout(()=>{ try{ renderHW() }catch(e){} banner("🛟",L("safeOn"),L("safeSub"),10000) },2000);
  setTimeout(()=>{ hwList=_hwSafe; },10*60000) }

// ---- (6) remote: digits 1–4 = the tabs that exist now; on Home 1, 2, 3… open your favourites — TizenTube and Ostora go first when you have none
TAB_KEYS["1"]="home"; TAB_KEYS["2"]="mt"; TAB_KEYS["3"]="settings"; delete TAB_KEYS["4"]; delete TAB_KEYS["5"];
setTimeout(()=>{ try{ if((S.favs||[]).length) return; const want=[(S.maPkgs||{}).TizenTube].concat(userPkgs().filter(a=>/ostora|الأسطورة|oscar|أوسكار/i.test(a.name+" "+a.pkg)).map(a=>a.pkg)).filter(p=>p&&nat("hasPkg",p));
  if(want.length){ S.favs=want.filter((p,i,a)=>a.indexOf(p)===i); try{ renderHome() }catch(e){} } }catch(e){} },8000);
