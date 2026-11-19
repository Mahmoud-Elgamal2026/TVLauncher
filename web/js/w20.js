// ================= Big widget: your teams' next match with a countdown, a daily picture behind it; Menu = quick menu on Home; phone quick buttons; weekly clean-up =================
Object.assign(T.ar,{cbIn:"بعد",cbH:"س",cbM:"د",cbLiveNow:"شغال دلوقتي — OK تفتح الأسطورة",qmTitle:"⚡ قايمة سريعة",qmOstora:"📺 الأسطورة",qmYt:"▶️ TizenTube",qmMt:"⚽ الماتشات",qmPerf:"📊 أداء البوكس",cleanDone:"🧽 اتعمل تنضيف أسبوعي للبوكس",qmWidget:"⚙️ خيارات الويدجت (الحجم، الشكل…)"});
Object.assign(T.en,{cbIn:"in",cbH:"h",cbM:"m",cbLiveNow:"Live now — OK opens Ostora",qmTitle:"⚡ Quick menu",qmOstora:"📺 Ostora",qmYt:"▶️ TizenTube",qmMt:"⚽ Matches",qmPerf:"📊 Box health",cleanDone:"🧽 Weekly clean-up done",qmWidget:"⚙️ Widget options (size, look…)"});
const ostoraPkg=()=>{ const k=Object.keys(S.maPkgs||{}).find(n=>/ostora|أسطور|اسطور/i.test(n)); if(k&&nat("hasPkg",S.maPkgs[k])) return S.maPkgs[k];
  const a=userPkgs().find(x=>/ostora|أسطور|اسطور/i.test(x.name+" "+x.pkg)); return a?a.pkg:"" };
const tizenPkg=()=>{ const p=(S.maPkgs||{}).TizenTube; if(p&&nat("hasPkg",p)) return p; const a=userPkgs().find(x=>/tizentube|cobalt/i.test(x.name+" "+x.pkg)); return a?a.pkg:"" };
const openOstora=()=>{ const p=ostoraPkg(); if(p) launch(p); else A.toast("📺 Ostora?") };
const openTizen=()=>{ const p=tizenPkg(); if(p) launch(p); else showPage("ytp") };

// ---- (1) match part: your teams first (all matches if you have none), with "in 2 h 15 m"
function cbMatch(){ let l=[]; try{ l=mcList() }catch(e){} const mine=l.filter(e=>teamFav(e)); const e=(mine.length?mine:l)[0];
  if(!e) return `<span class="hwsub dim">${esc(L("mcNone"))}</span>`;
  const st=evState(e), t=+evTime(e)||0, left=t-Date.now();
  const when=st==="live"?`<b class="live">● ${esc(L("cbLiveNow"))}</b>`:st==="ns"&&left>0?`${esc(L("cbIn"))} ${Math.floor(left/3600000)} ${esc(L("cbH"))} ${Math.floor(left%3600000/60000)} ${esc(L("cbM"))}`:"";
  return `<div class="cbm"><div class="cbmt">${mLogo(e.strHomeTeamBadge)}<span>${esc(teamAr(e.strHomeTeam))}</span></div><div class="cbmm">${mtMid(e)}</div><div class="cbmt">${mLogo(e.strAwayTeamBadge)}<span>${esc(teamAr(e.strAwayTeam))}</span></div></div><div class="hwsub">${when}</div>` }
cbPart=(function(prev){ return function(p){ return p==="mcard"?cbMatch():prev.apply(this,arguments) } })(cbPart);
// OK on the big widget while one of your teams is playing → straight into Ostora
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w||w.t!=="combo") return false;
  let live=false; try{ live=mcList().some(e=>evState(e)==="live"&&teamFav(e)) }catch(e){} if(!live) return false; openOstora(); return true });

// ---- (2) a daily picture behind the big widget (the same free daily photo the old big card used); none in weak-box mode
hwCard=(function(prev){ return function(w){ let h=prev.apply(this,arguments); if(w.t!=="combo") return h;
  if(!S.heroImg) try{ heroImage() }catch(e){}
  if(S.heroImg&&!document.body.classList.contains("lowram")) h=h.replace('class="hw f hw-combo',`style="background-image:linear-gradient(rgba(8,12,24,.55),rgba(8,12,24,.75)),url('${esc(S.heroImg)}');background-size:cover;background-position:center" class="hw f hw-combo`);
  return h } })(hwCard);

// ---- (3) Menu on Home (not on an app): quick menu
openOptions=(function(prev){ return function(el){ if(document.querySelector("#home.on")&&!(el&&el.dataset&&el.dataset.pkg)&&!on("dlg")){
    dialog(L("qmTitle"),[{label:L("qmOstora"),pri:1,fn:openOstora},{label:L("qmYt"),fn:openTizen},{label:L("qmMt"),fn:()=>{ mtCat="d0"; showPage("mt") }},
      {label:L("qmPerf"),fn:()=>{ showPage("settings"); setTimeout(()=>{ const e=$("pfSec"); if(e) e.scrollIntoView() },300) }}]
      .concat(el&&el.dataset&&el.dataset.hw?[{label:L("qmWidget"),fn:()=>setTimeout(()=>prev.call(this,el),60)}]:[]).concat([{label:L("cancel"),fn:()=>{}}]),{grid:2}); return }
  return prev.apply(this,arguments) } })(openOptions);

// ---- (4) phone quick buttons
remoteCmd=(function(prev){ return function(m){ if(m&&m.cmd==="quick"){ if(m.which==="ostora") openOstora(); else if(m.which==="yt") openTizen(); return {ok:1} } return prev.apply(this,arguments) } })(remoteCmd);

// ---- (5) weekly clean-up at night when nobody is using the box (cache, old pictures, saved source data)
setInterval(()=>{ /* weekly clean */ const h=new Date().getHours(); if(h<2||h>5||window.__bg&&on("player")||Date.now()-idleAt<45*60000) return;
  if(Date.now()-(+store.get("cleanAt",0))<7*86400000) return; store.set("cleanAt",Date.now());
  try{ nat("selfClean") }catch(e){}
  try{ Object.keys(localStorage).filter(k=>/^fc:/.test(k)).forEach(k=>localStorage.removeItem(k)); localStorage.removeItem("fc:idx") }catch(e){}
  store.set("cleanMsg",1) },10*60000);
setTimeout(()=>{ if(store.get("cleanMsg",0)){ store.set("cleanMsg",0); banner("🧽",L("cleanDone"),"",4000) } },20000);
