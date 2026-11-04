// ================= Lighter & steadier: quiet mode, last-known data when a source is down, settings search, late-loaded QR library =================
Object.assign(T.ar,{srcDown:"⚠️ المصدر مش متاح دلوقتي ومفيش بيانات محفوظة — جرّب كمان شوية",srcStale:"⚠️ المصدر مش متاح دلوقتي — دي آخر بيانات اتحفظت من",
  setFind:"🔍 دوّر في الإعدادات",setFindQ:"اكتب اللي بتدوّر عليه (مثلاً: صلاة، خلفية، تحديث)",setFindNone:"ملقتش حاجة بالاسم ده",setFindRes:"🔍 نتايج:"});
Object.assign(T.en,{srcDown:"⚠️ Source unavailable right now and nothing saved — try again later",srcStale:"⚠️ Source unavailable right now — showing data saved",
  setFind:"🔍 Search settings",setFindQ:"What are you looking for? (e.g. prayer, wallpaper, update)",setFindNone:"Nothing found",setFindRes:"🔍 Results:"});

// ---- (2) the QR library is only needed for pairing screens: read it after start-up instead of at boot
function loadQr(){ if(window.qrcode||loadQr.p) return; loadQr.p=1; const s=document.createElement("script"); s.src="js/lib-qrcode.js"; document.head.appendChild(s) }
setTimeout(loadQr,3000);
qrSvg=(function(prev){ return function(){ if(!window.qrcode) loadQr(); return prev.apply(this,arguments) } })(qrSvg);

// ---- (3) quiet mode: 20 min with no remote, nothing playing, no screensaver and no live match →
//      the small background refreshers pause (alerts, alarms, prayer, updates keep running). First key press wakes everything.
window.__quiet=false;
setInterval(()=>{ /* ping quiet */ let live=false; try{ live=typeof matches!=="undefined"&&matches.some(e=>evState(e)==="live") }catch(e){}
  const q=!window.__bg&&Date.now()-idleAt>20*60000&&!on("frame")&&!on("player")&&!live;
  if(q!==window.__quiet){ window.__quiet=q; if(!q&&document.querySelector("#home.on")&&typeof renderHW==="function") try{ renderHW() }catch(e){} } },60000);
document.addEventListener("keydown",()=>{ if(window.__quiet){ window.__quiet=false; setTimeout(()=>{ if(document.querySelector("#home.on")&&typeof renderHW==="function") try{ renderHW() }catch(e){} },300) } },true);

// ---- (4) remember the last good answer from the sports / series / YouTube sources; when one is down, show that with a clear note
const FC_RX=/espn\.com|thesportsdb|tvmaze|itunes\.apple|youtube\.com\/feeds/, FC_MAX=1200000, srcHealth={};
const fcHost=u=>(String(u).match(/^https?:\/\/([^\/]+)/)||[])[1]||"";
let fcIdx={}; try{ fcIdx=JSON.parse(localStorage.getItem("fc:idx")||"{}")||{} }catch(e){}
function fcPut(u,t){ try{ fcIdx[u]={at:Date.now(),n:t.length}; let tot=0; const ks=Object.keys(fcIdx).sort((a,b)=>fcIdx[b].at-fcIdx[a].at);
    ks.forEach(k=>{ tot+=fcIdx[k].n; if(tot>FC_MAX&&k!==u){ delete fcIdx[k]; try{ localStorage.removeItem("fc:"+k) }catch(e){} } });
    localStorage.setItem("fc:"+u,t); localStorage.setItem("fc:idx",JSON.stringify(fcIdx)) }catch(e){ delete fcIdx[u] } }
function fcGet(u){ try{ const t=localStorage.getItem("fc:"+u); return t&&fcIdx[u]?{t,at:fcIdx[u].at}:null }catch(e){ return null } }
A.fetchText=(function(prev){ return async function(url){ const u=String(url); if(!FC_RX.test(u)) return prev.apply(this,arguments);
  const st=srcHealth[fcHost(u)]=srcHealth[fcHost(u)]||{}; let t, err;
  try{ t=await prev.apply(this,arguments) }catch(e){ err=e }
  if(t){ st.ok=Date.now(); st.stale=0; if(t.length<250000) fcPut(u,t); return t }
  st.fail=Date.now(); const c=fcGet(u); if(c){ st.stale=c.at; return c.t } st.stale=0; if(err) throw err; return t } })(A.fetchText);
function srcNote(rx){ for(const h of Object.keys(srcHealth)){ const s=srcHealth[h]; if(rx.test(h)&&s.fail&&(!s.ok||s.fail-s.ok>120000))
    return `<div class="srcdown">${esc(s.stale?L("srcStale")+" "+agoAr(Date.now()-s.stale):L("srcDown"))}</div>` } return "" }
const withNote=(prev,id,rx)=>async function(){ const r=await prev.apply(this,arguments); const m=$(id), n=srcNote(rx); if(m&&n&&!m.querySelector(".srcdown")) m.insertAdjacentHTML("afterbegin",n); return r };
renderMt=withNote(renderMt,"mtMain",/espn/); renderNw=withNote(renderNw,"nwMain",/tvmaze|itunes/); renderYtp=withNote(renderYtp,"ytpMain",/youtube/);

// ---- (5) search inside Settings: first item on the side list
let setQ="";
const setNorm=s=>String(s||"").toLowerCase().replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/[ً-ْ]/g,"");
buildSetCats=(function(prev){ return function(){ prev.apply(this,arguments); const c=$("setCats"); if(!c||!c.children.length) return;
  c.insertAdjacentHTML("afterbegin",`<div class="it f setfind${setQ?" sel":""}" tabindex="0" id="setFind">${esc(setQ?L("setFindRes")+" "+setQ+" ✕":L("setFind"))}</div>`); if(setQ) setFindShow() } })(buildSetCats);
function setFindShow(){ const box=$("setScroll"), q=setNorm(setQ), secs=[].slice.call(box.children).filter(e=>e.classList.contains("sec")); let first=null;
  box.querySelectorAll(".srhit").forEach(e=>e.classList.remove("srhit"));
  secs.forEach(s=>{ const h=s.querySelector("h3"), hm=h&&setNorm(h.textContent).indexOf(q)>=0; let any=hm;
    s.querySelectorAll(".f,label,.row,p").forEach(e=>{ if(!hm&&setNorm(e.textContent).indexOf(q)>=0){ any=true; const f=e.classList.contains("f")?e:e.querySelector(".f")||e; f.classList.add("srhit"); if(!first&&f.classList.contains("f")) first=f } });
    s.style.display=any?"":"none"; if(any&&!first) first=s.querySelector(".f") });
  document.querySelectorAll("#setCats [data-setcat]").forEach(e=>e.classList.remove("sel")); box.scrollTop=0; return first }
activators.unshift(el=>{ if(el.id!=="setFind") return false;
  if(setQ){ setQ=""; buildSetCats(); focus($("setFind")); return true }
  prompt2(L("setFindQ"),"",v=>{ setQ=(v||"").trim(); if(!setQ) return; buildSetCats(); setTimeout(()=>{ const f=setFindShow(); if(f) focus(f); else { A.toast(L("setFindNone")); setQ=""; buildSetCats(); focus($("setFind")) } },40) }); return true });
// moving to a normal category leaves search mode
focusHooks.unshift(el=>{ if(setQ&&el.dataset&&el.dataset.setcat!=null){ setQ=""; const f=$("setFind"); if(f){ f.textContent=L("setFind"); f.classList.remove("sel") } $("setScroll").querySelectorAll(".srhit").forEach(e=>e.classList.remove("srhit")) } });
// a second caller while the YouTube feeds are loading waits for the same load (instead of drawing an empty list)
ytpLoad=(function(prev){ let p=null; return function(force){ if(p) return p; p=Promise.resolve(prev.apply(this,arguments)).then(r=>{ p=null; return r },e=>{ p=null; throw e }); return p } })(ytpLoad);
