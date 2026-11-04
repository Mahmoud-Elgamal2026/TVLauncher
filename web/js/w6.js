// ================= Matches & New tabs, round 2: big matches, match details, top scorers, live now · today, coming soon, alerts, trending · quick tab keys =================
Object.assign(T.ar,{mtBig:"🔥 الماتشات الكبيرة",mtLive:"🔴 المباشر دلوقتي",mtScorers:"👟 الهدافين",mtNoLive:"مفيش ماتشات شغالة دلوقتي",mtDet:"تفاصيل الماتش",mtGoals:"الأجوان",mtCards:"الكروت",
  mtLineup:"التشكيل",mtNoDet:"لسه مفيش تفاصيل للماتش ده",mtOpenApp:"▶ افتح تطبيق الماتشات",mtNoScorers:"الهدافين مش متاحين للدوري ده",nwToday:"🆕 نزل النهارده",nwSoon:"📅 قريباً",
  nwTrend:"🔥 الأكتر رواجاً",nwBell:"🔔 نبّهني بالحلقات الجديدة",nwBellOn:"🔔 هيوصلك تنبيه أول ما حلقة تنزل",nwNewEp:"حلقة جديدة نزلت"});
Object.assign(T.en,{mtBig:"🔥 Big matches",mtLive:"🔴 Live now",mtScorers:"👟 Top scorers",mtNoLive:"No live matches right now",mtDet:"Match details",mtGoals:"Goals",mtCards:"Cards",
  mtLineup:"Line-ups",mtNoDet:"No details for this match yet",mtOpenApp:"▶ Open the match app",mtNoScorers:"Top scorers aren't available for this league",nwToday:"🆕 Out today",nwSoon:"📅 Coming soon",
  nwTrend:"🔥 Trending",nwBell:"🔔 Alert me on new episodes",nwBellOn:"🔔 You'll get an alert when a new episode is out",nwNewEp:"New episode out"});

// ---------------- ⚽ Matches tab ----------------
// (1) big matches on top of every day: your teams, derbies, big clubs, finals of the big cups
const BIG_TEAMS=/^(al ahly|zamalek|pyramids|al hilal|al nassr|al ittihad|real madrid|barcelona|atletico madrid|manchester city|manchester united|liverpool|arsenal|chelsea|bayern munich|paris saint-germain|inter milan|internazionale|ac milan|juventus|galatasaray|fenerbahce|egypt|saudi arabia|morocco|argentina|brazil|france|spain|england|germany|portugal)$/i;
const BIG_COMPS={"uefa.champions":1,"fifa.world":1,"caf.nations":1,"fifa.cwc":1,"uefa.euro":1};
const isBig=e=>teamFav(e)||BIG_COMPS[e._lg]||(BIG_TEAMS.test(String(e.strHomeTeam).trim())&&BIG_TEAMS.test(String(e.strAwayTeam).trim()));
mtCats=()=>[["live","mtLive"],["d-1","mtYday"],["d0","mtToday"],["d1","mtTmrw"],["d2","mtAfter"],["mine","mtMine"],["table","mtTable"],["scorers","mtScorers"]];
mtGroups=(function(prev){ return function(list){ const big=list.filter(isBig).slice(0,6), h=prev(list); if(!big.length||big.length===list.length) return h;
  return h.replace('<div class="mtpage">',`<div class="mtpage"><div class="mtg mtbig"><div class="mct">${esc(L("mtBig"))}</div>${big.sort((x,y)=>(+evTime(x)||0)-(+evTime(y)||0)).map(mtRow).join("")}</div>`) } })(mtGroups);
// (4) live now + (3) top scorers
renderMt=(function(prev){ return async function(){ const key=mtCat;
  if(key==="live"){ $("mtCats").innerHTML=mtCatsHtml(); const l=(await mtDay(0)).filter(e=>evState(e)==="live"); if(mtCat!==key) return; if(!l.length) return mtMsg(L("mtNoLive")); $("mtMain").innerHTML=mtGroups(l); return }
  if(key==="scorers"){ $("mtCats").innerHTML=mtCatsHtml(); const lgs=COMPS.filter(c=>c[3]==="l"&&/\.\d$/.test(c[0])); if(!mtLg) mtLg=(S.comps||[]).find(s=>lgs.some(c=>c[0]===s))||"egy.1";
    const head=`<div class="inline mtlg">${lgs.filter(c=>(S.comps||[]).includes(c[0])||c[0]===mtLg).map(c=>`<button class="btn sm f${c[0]===mtLg?" pri":""}" data-mtlg="${c[0]}">${esc(S.lang==="ar"?c[1]:c[2])}</button>`).join("")}</div>`;
    $("mtMain").innerHTML=head+`<p class="hint">${esc(L("mtLoading"))}</p>`;
    try{ const r=await A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${mtLg}/statistics`); if(mtCat!==key) return;
      const cats=(r.stats||[]).concat(...((r.children||[]).map(c=>c.stats||[]))), g=cats.find(c=>/goal/i.test(c.name||c.displayName||""))||cats[0];
      const ld=((g&&g.leaders)||[]).slice(0,15);
      $("mtMain").innerHTML=head+(ld.length?`<table class="mttab"><tr><th>#</th><th>${S.lang==="ar"?"اللاعب":"Player"}</th><th>${S.lang==="ar"?"الفريق":"Team"}</th><th>${S.lang==="ar"?"أجوان":"Goals"}</th></tr>${ld.map((x,i)=>{ const a=x.athlete||{}, tm=(a.team||x.team||{}).displayName||"";
        return `<tr class="f${teamFav({strHomeTeam:tm,strAwayTeam:""})?" mfav":""}" tabindex="0"><td>${i+1}</td><td class="tn">${esc(a.displayName||a.shortName||"")}</td><td class="tn">${esc(teamAr(tm))}</td><td><b>${esc(String(x.displayValue||x.value||"").replace(/^.*?(\d+)\D*$/,"$1"))}</b></td></tr>` }).join("")}</table>`:`<p class="hint">${esc(L("mtNoScorers"))}</p>`) }catch(e){ $("mtMain").innerHTML=head+`<p class="hint">${esc(L("mtNoScorers"))}</p>` }
    return }
  return prev.apply(this,arguments) } })(renderMt);
// (2) match details: goals, cards, line-ups (ESPN matches), with a button to open the match app
async function matchDetails(e){
  const lines=[], ar=S.lang==="ar", st=evState(e), head=`${teamAr(e.strHomeTeam)} ${st==="ns"?"×":(e.intHomeScore||0)+" - "+(e.intAwayScore||0)} ${teamAr(e.strAwayTeam)}`;
  lines.push(`${compName(e._lg)} · ${new Date(evTime(e)).toLocaleDateString(ar?"ar-EG":"en-GB",{weekday:"long",day:"numeric",month:"long"})} · ${fmtTime(evTime(e))}`);
  if(tvName(e)) lines.push("📺 "+tvName(e));
  const id=String(e.idEvent||""); if(/^e\d+/.test(id)&&e._lg){ try{
    const r=await A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${e._lg}/summary?event=${id.slice(1)}`);
    const ke=(r.keyEvents||[]).filter(k=>/goal|card|penalty/i.test(((k.type||{}).text)||""));
    const goals=ke.filter(k=>/goal|penalty/i.test(k.type.text)&&!/miss/i.test(k.type.text)), cards=ke.filter(k=>/red/i.test(k.type.text));
    const who=k=>(((k.participants||[])[0]||{}).athlete||{}).displayName||((k.text||"").split(/[.(]/)[0]), tm=k=>teamAr(((k.team||{}).displayName)||"");
    if(goals.length) lines.push("⚽ "+L("mtGoals")+": "+goals.map(k=>`${who(k)} ${(k.clock||{}).displayValue||""} (${tm(k)})`).join(" · "));
    if(cards.length) lines.push("🟥 "+L("mtCards")+": "+cards.map(k=>`${who(k)} ${(k.clock||{}).displayValue||""} (${tm(k)})`).join(" · "));
    const ro=(r.rosters||[]).map(x=>({t:teamAr(((x.team||{}).displayName)||""),p:(x.roster||[]).filter(p=>p.starter).map(p=>(p.athlete||{}).shortName||(p.athlete||{}).displayName).filter(Boolean)})).filter(x=>x.p.length);
    if(ro.length) lines.push("👥 "+L("mtLineup")+":",...ro.map(x=>`${x.t}: ${x.p.join("، ")}`));
  }catch(_){} }
  if(lines.length<=2&&!lines.some(l=>/⚽|🟥|👥/.test(l))) lines.push(L("mtNoDet"));
  dialog("⚽ "+head,[{label:L("mtOpenApp"),pri:1,fn:()=>openMatchApp()},{label:L("done"),fn:()=>{}}],{sub:lines.join("\n")}) }
activators.unshift(el=>{ if(!el.classList||!el.classList.contains("mtr")||el.dataset.mt==null) return false; const id=el.dataset.mt;
  const all=(typeof matches!=="undefined"?matches:[]).concat(...Object.keys(spCache).map(k=>(spCache[k]||{}).list||[])); const e=all.find(x=>String(x.idEvent)===id);
  if(e) matchDetails(e); else openMatchApp(); return true });

// ---------------- 🆕 New tab ----------------
NW_CATS.splice(0,0,["today","nwToday"]); NW_CATS.push(["soon","nwSoon"],["trend","nwTrend"]);
nwLoad=(function(prev){ return async function(cat){ if(cat!=="today"&&cat!=="soon"&&cat!=="trend") return prev(cat);
  if(nwCache[cat]&&Date.now()-nwCache[cat].at<3*3600000) return nwCache[cat].l; let l=[];
  if(cat==="today"){ const d=iso(new Date()); const seen={}, add=(ep,sh)=>{ if(!sh||seen[sh.id]||ep.airdate!==d) return; seen[sh.id]=1; l.push(nwFromShow({ep,sh})) };
    for(const u of ["https://api.tvmaze.com/schedule/web?date="+d,"https://api.tvmaze.com/schedule?country=EG&date="+d,"https://api.tvmaze.com/schedule?country=SA&date="+d,"https://api.tvmaze.com/schedule?country=US&date="+d]){
      try{ (await A.fetchJSON(u)||[]).forEach(ep=>add(ep,ep.show||(ep._embedded||{}).show)) }catch(e){} }
    l.sort((a,b)=>(/عربي|Arabic/.test(b.lang)?1:0)-(/Arabic/.test(a.lang)?1:0)||(b.rating||0)-(a.rating||0)); l=l.slice(0,50) }
  else if(cat==="soon"){ const seen={}; for(let i=1;i<=10;i++){ const d=iso(new Date(Date.now()+i*86400000));
      for(const u of ["https://api.tvmaze.com/schedule/web?date="+d,"https://api.tvmaze.com/schedule?country=US&date="+d,"https://api.tvmaze.com/schedule?country=EG&date="+d]){
        try{ (await A.fetchJSON(u)||[]).forEach(ep=>{ const sh=ep.show||(ep._embedded||{}).show; if(!sh||seen[sh.id]||ep.number!==1) return; seen[sh.id]=1; const x=nwFromShow({ep,sh}); x.sub=(S.lang==="ar"?"يبدأ ":"Starts ")+ep.airdate+" · "+x.sub; l.push(x) }) }catch(e){} } } }
  else { for(const [cc,kind,feed] of [["eg","show","toptvseasons"],["eg","movie","topmovies"]]){ try{ const r=await A.fetchJSON(`https://itunes.apple.com/${cc}/rss/${feed}/limit=25/json`);
      (((r.feed||{}).entry)||[]).forEach(e=>{ const t=((e["im:name"]||{}).label)||""; if(!t||l.some(i=>i.title===t)) return; const im=(e["im:image"]||[]).slice(-1)[0];
        l.push({title:t,sub:[kind==="movie"?"🎬":"📺",((e.category||{}).attributes||{}).label].filter(Boolean).join(" "),img:im?String(im.label).replace(/\d+x\d+bb/,"300x450bb"):"",kind,summary:((e.summary||{}).label)||""}) }) }catch(e){} } }
  nwCache[cat]={at:Date.now(),l}; return l } })(nwLoad);
const _nwFromShow=nwFromShow; nwFromShow=function(o){ const x=_nwFromShow(o); x.lang=(o.sh||{}).language||""; return x };
// (7) 🔔 alerts on new episodes for a show picked in the New tab
activators.unshift(el=>{ const d=el.dataset||{}; if(d.nw==null) return false; const x=nwItems[+d.nw]; if(!x||x.kind!=="show") return false;
  setTimeout(()=>{ const box=$("dbox"), items=box&&box._items, g=box&&box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
    items.splice(1,0,{icon:"🔔",label:L("nwBell"),fn:()=>{ const l=(S.shows||[]).slice(); let sh=l.find(s=>(s.tv&&s.tv===x.tv)||s.name===x.title); if(!sh){ sh={q:x.title,name:x.title,tv:x.tv||null,img:x.img||"",mine:null}; l.push(sh) } sh.bell=true; S.shows=l; A.toast(L("nwBellOn")) }});
    g.innerHTML=items.map((it,k)=>`<button class="btn f${it.pri?" pri":""}" data-di="${k}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) },0);
  return false });
setInterval(()=>{ /* tgBackup bell */ const l=(S.shows||[]); let ch=false; l.forEach(sh=>{ if(!sh.bell||!sh.last) return; const k=sh.last.season+"x"+sh.last.number;
    if(sh.belled!==k){ if(sh.belled){ banner("🔔",`${L("nwNewEp")}: ${sh.name||sh.q}`,`${L("nwSeason")} ${sh.last.season} · ${L("nwEp")} ${sh.last.number}`,15000); if(window.__bg) nat("toast",`🔔 ${L("nwNewEp")}: ${sh.name||sh.q}`) } sh.belled=k; ch=true } });
  if(ch) S.shows=l },10*60000);

// ---------------- (9) Back from the Matches / New pages goes straight Home · (10) number keys switch tabs (except on Home, where they open favorites) ----------------
backDefault=(function(prev){ return function(){ const pg=document.querySelector(".page.on"); if(!on("dlg")&&pg&&/^(mt|nw)$/.test(pg.id)&&!(document.activeElement&&document.activeElement.tagName==="INPUT")){ showPage("home"); const t=document.querySelector('.tab[data-page="home"]'); if(t) focus(t); return } return prev.apply(this,arguments) } })(backDefault);
const TAB_KEYS={"1":"home","2":"lib","3":"mt","4":"nw","5":"settings"};
keyHooks.push(e=>{ const p=TAB_KEYS[e.key]; if(!p||document.querySelector("#home.on")||on("dlg")||on("player")||(document.activeElement&&document.activeElement.tagName==="INPUT")) return false;
  if(!document.querySelector(`.tab[data-page="${p}"]`)) return false; showPage(p); const t=document.querySelector(`.tab[data-page="${p}"]`); if(t) focus(t); return true });
