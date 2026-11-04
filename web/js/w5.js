// ================= Two tabs: ⚽ Matches (every match by day, standings) and 🆕 New (Arabic & foreign series, new movies) =================
Object.assign(T.ar,{mtTab:"⚽ الماتشات",nwTab:"🆕 الجديد",mtYday:"امبارح",mtToday:"النهارده",mtTmrw:"بكره",mtAfter:"بعد بكره",mtMine:"⭐ فرقي الأسبوع ده",mtTable:"🏆 الترتيب",
  mtNone:"مفيش ماتشات في اليوم ده",mtLoading:"بيجيب…",mtPickLg:"اختار الدوري",nwAr:"📺 مسلسلات عربي",nwEn:"🎞 مسلسلات أجنبي",nwMov:"🎬 أفلام جديدة",nwLoading:"بيجيب الجديد…",
  nwNone:"ملقتش حاجة دلوقتي",nwFind:"🔎 دوّر عليه في",nwFollow:"🎬 تابعه في «مسلسلاتي»",nwEp:"حلقة",nwSeason:"موسم",nwDetails:"التفاصيل",nwRating:"التقييم"});
Object.assign(T.en,{mtTab:"⚽ Matches",nwTab:"🆕 New",mtYday:"Yesterday",mtToday:"Today",mtTmrw:"Tomorrow",mtAfter:"In 2 days",mtMine:"⭐ My teams this week",mtTable:"🏆 Standings",
  mtNone:"No matches that day",mtLoading:"Loading…",mtPickLg:"Pick a league",nwAr:"📺 Arabic series",nwEn:"🎞 Foreign series",nwMov:"🎬 New movies",nwLoading:"Loading what's new…",
  nwNone:"Nothing found right now",nwFind:"🔎 Look for it in",nwFollow:"🎬 Follow in “My shows”",nwEp:"Ep",nwSeason:"Season",nwDetails:"Details",nwRating:"Rating"});

// ---- the two tabs and their pages (same layout as the Library: list on the side, content on the other)
(function(){ const st=document.querySelector('.tab[data-page="settings"]'); if(!st) return;
  [["mt","mtTab"],["nw","nwTab"]].forEach(([id,lab])=>{ const b=document.createElement("button"); b.className="tab f"; b.dataset.page=id; b.setAttribute("data-i18n",lab); b.textContent=L(lab); st.parentNode.insertBefore(b,st);
    const sec=document.createElement("section"); sec.className="page"; sec.id=id; sec.innerHTML=`<div class="vodw"><div class="list" id="${id}Cats"></div><div class="scroll" id="${id}Main"></div></div>`; $("settings").parentNode.insertBefore(sec,$("settings")) }) })();

// ================= ⚽ Matches tab =================
let mtCat="d0", mtLg="";
let mtCats=()=>[["d-1","mtYday"],["d0","mtToday"],["d1","mtTmrw"],["d2","mtAfter"],["mine","mtMine"],["table","mtTable"]];
function mtCatsHtml(){ return mtCats().map(([k,l])=>`<div class="it f${k===mtCat?" on sel":""}" tabindex="0" data-mtcat="${k}">${esc(L(l))}</div>`).join("") }
function mtMsg(t){ $("mtMain").innerHTML=`<p class="hint">${esc(t)}</p>` }
function mtRow(e){ const st=evState(e), fav=teamFav(e), logo=u=>u?`<img class="mlg" src="${esc(u)}" loading="lazy" alt="">`:"";
  const mid=st==="ns"?esc(fmtTime(evTime(e))):(e.intHomeScore||0)+" - "+(e.intAwayScore||0);
  const badge=st==="live"?`● <span dir="ltr">${esc(liveMin(e)||L("live"))}</span>`:st==="ft"?(S.lang==="ar"?"انتهت":"FT"):"";
  return `<div class="mcr mtr f${fav?" mfav":""}" tabindex="0" data-mt="${esc(e.idEvent||"")}"><span class="mtn">${fav?"⭐ ":""}${logo(e.strHomeTeamBadge)}${esc(teamAr(e.strHomeTeam))} <i>×</i> ${logo(e.strAwayTeamBadge)}${esc(teamAr(e.strAwayTeam))}${tvName(e)?`<span class="mtv">📺 ${esc(tvName(e))}</span>`:""}</span><b class="${st==="live"?"live":""}">${mid}</b><small class="${st==="live"?"mlive":""}">${badge}</small></div>` }
function mtGroups(list){ const order=S.comps||[], g={}, keys=[]; list.forEach(e=>{ const k=e._lg||"?"; if(!g[k]){ g[k]=[]; keys.push(k) } g[k].push(e) });
  keys.sort((a,b)=>{ const fa=g[a].some(teamFav)?0:1, fb=g[b].some(teamFav)?0:1; return fa-fb||order.indexOf(a)-order.indexOf(b) });
  return `<div class="mtpage">${keys.map(k=>`<div class="mtg"><div class="mct">${esc(compName(k))}</div>${g[k].sort((x,y)=>(+evTime(x)||0)-(+evTime(y)||0)).map(mtRow).join("")}</div>`).join("")}</div>` }
async function mtDay(off){ const a=new Date(); a.setHours(0,0,0,0); const from=a.getTime()+off*86400000, to=from+86400000;
  let list=off===0&&typeof matches!=="undefined"?matches:await spFetch(off); return (list||[]).filter(e=>{ const t=+evTime(e)||0; return t>=from&&t<to }) }
async function renderMt(){ $("mtCats").innerHTML=mtCatsHtml(); const key=mtCat;
  if(key.charAt(0)==="d"){ mtMsg(L("mtLoading")); const l=await mtDay(+key.slice(1)); if(mtCat!==key) return; if(!l.length) return mtMsg(L("mtNone")); $("mtMain").innerHTML=mtGroups(l); return }
  if(key==="mine"){ mtMsg(L("mtLoading")); const all=[]; for(let i=0;i<7;i++){ try{ all.push(...(await mtDay(i)).filter(teamFav)) }catch(e){} } if(mtCat!==key) return;
    if(!all.length) return mtMsg(L("mtNone")); $("mtMain").innerHTML=`<div class="mtpage">${all.map(e=>`<div class="mtday">${esc(new Date(evTime(e)).toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"long",day:"numeric",month:"long"}))} · ${esc(compName(e._lg))}</div>${mtRow(e)}`).join("")}</div>`; return }
  if(key==="table"){ const lgs=COMPS.filter(c=>c[3]==="l"&&/\.\d$/.test(c[0])); if(!mtLg) mtLg=(S.comps||[]).find(s=>lgs.some(c=>c[0]===s))||"egy.1";
    const head=`<div class="inline mtlg">${lgs.filter(c=>(S.comps||[]).includes(c[0])||c[0]===mtLg).map(c=>`<button class="btn sm f${c[0]===mtLg?" pri":""}" data-mtlg="${c[0]}">${esc(S.lang==="ar"?c[1]:c[2])}</button>`).join("")}</div>`;
    $("mtMain").innerHTML=head+`<p class="hint">${esc(L("mtLoading"))}</p>`;
    try{ const r=await A.fetchJSON(`https://site.api.espn.com/apis/v2/sports/soccer/${mtLg}/standings`); if(mtCat!=="table") return;
      const ent=((((r.children||[])[0]||{}).standings||{}).entries||[]).map(e=>{ const v=k=>((e.stats||[]).find(s=>s.name===k)||{}).value; return {n:(e.team||{}).displayName||"",logo:((e.team||{}).logos||[{}])[0].href||"",r:v("rank"),p:v("points"),g:v("gamesPlayed"),w:v("wins"),d:v("ties"),l:v("losses"),gd:v("pointDifferential")} }).sort((a,b)=>a.r-b.r);
      const ar=S.lang==="ar";
      $("mtMain").innerHTML=head+(ent.length?`<table class="mttab"><tr><th>#</th><th>${ar?"الفريق":"Team"}</th><th>${ar?"لعب":"P"}</th><th>${ar?"ف":"W"}</th><th>${ar?"ت":"D"}</th><th>${ar?"خ":"L"}</th><th>${ar?"فارق":"GD"}</th><th>${ar?"نقاط":"Pts"}</th></tr>${ent.map(e=>{ const f=teamFav({strHomeTeam:e.n,strAwayTeam:""});
        return `<tr class="f${f?" mfav":""}" tabindex="0"><td>${e.r}</td><td class="tn">${e.logo?`<img class="mlg" src="${esc(e.logo)}" loading="lazy" alt="">`:""}${esc(teamAr(e.n))}</td><td>${e.g??""}</td><td>${e.w??""}</td><td>${e.d??""}</td><td>${e.l??""}</td><td dir="ltr">${e.gd>0?"+":""}${e.gd??""}</td><td><b>${e.p??""}</b></td></tr>` }).join("")}</table>`:`<p class="hint">${esc(L("mtNone"))}</p>`) }catch(e){ $("mtMain").innerHTML=head+`<p class="hint">${esc(L("loadErr"))}</p>` } }
}
pageHooks["mt:enter"]=()=>renderMt();
focusHooks.push(el=>{ if(el.dataset&&el.dataset.mtcat&&el.dataset.mtcat!==mtCat){ mtCat=el.dataset.mtcat; renderMt() } });
activators.unshift(el=>{ const d=el.dataset||{};
  if(d.mtcat){ mtCat=d.mtcat; renderMt().then(()=>{ const f=document.querySelector("#mtMain .f"); if(f) focus(f) }); return true }
  if(d.mtlg){ mtLg=d.mtlg; renderMt().then(()=>{ const f=document.querySelector(`#mtMain [data-mtlg="${mtLg}"]`); if(f) focus(f) }); return true }
  return false });

// ================= 🆕 New tab: Arabic series, foreign series, new movies (info only — OK shows details and lets you look for it in your apps) =================
let nwCat="ar"; const nwCache={}; let nwItems=[];
const NW_CATS=[["ar","nwAr"],["en","nwEn"],["mov","nwMov"]];
function nwCatsHtml(){ return NW_CATS.map(([k,l])=>`<div class="it f${k===nwCat?" on sel":""}" tabindex="0" data-nwcat="${k}">${esc(L(l))}</div>`).join("") }
const iso=d=>d.toISOString().slice(0,10);
async function tvmazeDays(urlFor,days){ const out=[], seen={}; for(let i=0;i<days;i++){ const d=iso(new Date(Date.now()+(i-1)*86400000)); try{ const r=await A.fetchJSON(urlFor(d));
  (r||[]).forEach(ep=>{ const sh=ep.show||(ep._embedded||{}).show; if(!sh||seen[sh.id]) return; seen[sh.id]=1; out.push({ep,sh}) }) }catch(e){} } return out }
const ARAB_CC=/^(EG|SA|AE|KW|QA|LB|SY|JO|MA|DZ|TN|IQ|BH|OM)$/;
async function nwLoad(cat){ if(nwCache[cat]&&Date.now()-nwCache[cat].at<3*3600000) return nwCache[cat].l; let l=[];
  if(cat==="ar"){
    const web=await tvmazeDays(d=>"https://api.tvmaze.com/schedule/web?date="+d,3);
    const tv=[]; for(const cc of ["EG","SA","AE"]) tv.push(...await tvmazeDays(d=>`https://api.tvmaze.com/schedule?country=${cc}&date=${d}`,2));
    const isAr=sh=>sh.language==="Arabic"||ARAB_CC.test(((sh.network||sh.webChannel||{}).country||{}).code||"")||/shahid|watch ?it|osn|yango|mbc|tod|weyyak/i.test((sh.webChannel||sh.network||{}).name||"");
    const seen={}; l=web.concat(tv).filter(x=>isAr(x.sh)&&!seen[x.sh.id]&&(seen[x.sh.id]=1)).map(nwFromShow);
    // plus this year's Arabic series from Wikipedia (names only)
    try{ const y=new Date().getFullYear(); const r=await A.fetchJSON("https://ar.wikipedia.org/w/api.php?action=query&list=search&srlimit=30&format=json&srsearch="+encodeURIComponent(`مسلسل ${y} رمضان OR عرض`)+"&srsort=create_timestamp_desc");
      ((r.query||{}).search||[]).forEach(x=>{ const t=x.title.replace(/\s*\((مسلسل|مسلسل تلفزيوني)[^)]*\)\s*/,""); if(/مسلسل/.test(x.title+x.snippet)&&!l.some(i=>i.title===t)) l.push({title:t,sub:String(x.snippet||"").replace(/<[^>]+>/g,"").slice(0,90),img:"",kind:"show",src:"wiki"}) }) }catch(e){}
  } else if(cat==="en"){
    const web=await tvmazeDays(d=>"https://api.tvmaze.com/schedule/web?date="+d,3), us=await tvmazeDays(d=>"https://api.tvmaze.com/schedule?country=US&date="+d,2);
    const seen={}; l=web.concat(us).filter(x=>x.sh.language==="English"&&(x.sh.rating&&x.sh.rating.average||0)>=6.8&&!seen[x.sh.id]&&(seen[x.sh.id]=1))
      .sort((a,b)=>((b.sh.rating||{}).average||0)-((a.sh.rating||{}).average||0)).slice(0,40).map(nwFromShow);
  } else {
    for(const cc of ["eg","us"]){ try{ const r=await A.fetchJSON(`https://itunes.apple.com/${cc}/rss/topmovies/limit=40/json`);
      (((r.feed||{}).entry)||[]).forEach(e=>{ const t=((e["im:name"]||{}).label)||""; if(!t||l.some(i=>i.title===t)) return; const im=(e["im:image"]||[]).slice(-1)[0];
        l.push({title:t,sub:[((e["im:releaseDate"]||{}).attributes||{}).label,((e.category||{}).attributes||{}).label].filter(Boolean).join(" · "),img:im?String(im.label).replace(/\d+x\d+bb/,"300x450bb"):"",kind:"movie",summary:((e.summary||{}).label)||""}) }) }catch(e){} }
  }
  nwCache[cat]={at:Date.now(),l}; return l }
function nwFromShow({ep,sh}){ const net=(sh.webChannel||sh.network||{}).name||"";
  return {title:sh.name,sub:[net,ep.season&&ep.number?`${L("nwSeason")} ${ep.season} · ${L("nwEp")} ${ep.number}`:"",ep.airdate||""].filter(Boolean).join(" · "),img:(sh.image&&(sh.image.medium||sh.image.original))||"",kind:"show",tv:sh.id,
    summary:String(sh.summary||"").replace(/<[^>]+>/g,""),rating:(sh.rating||{}).average||null} }
function nwMsg(t){ $("nwMain").innerHTML=`<p class="hint">${esc(t)}</p>` }
async function renderNw(){ $("nwCats").innerHTML=nwCatsHtml(); const key=nwCat; nwMsg(L("nwLoading")); const l=await nwLoad(key); if(nwCat!==key) return; nwItems=l;
  if(!l.length) return nwMsg(L("nwNone"));
  $("nwMain").innerHTML=`<div class="lbgrid nwgrid">${l.map((x,i)=>libCard({attr:`data-nw="${i}"`,icon:x.kind==="movie"?"🎬":"📺",title:x.title,sub:x.sub,img:x.img})).join("")}</div>` }
pageHooks["nw:enter"]=()=>{ if(!$("nwMain").innerHTML) renderNw() };
focusHooks.push(el=>{ if(el.dataset&&el.dataset.nwcat&&el.dataset.nwcat!==nwCat){ nwCat=el.dataset.nwcat; renderNw() } });
activators.unshift(el=>{ const d=el.dataset||{};
  if(d.nwcat){ nwCat=d.nwcat; renderNw().then(()=>{ const f=document.querySelector("#nwMain .f"); if(f) focus(f) }); return true }
  if(d.nw!=null){ const x=nwItems[+d.nw]; if(!x) return true; const vids=visibleApps().filter(a=>VIDEO_APPS.test(a.pkg+appName(a))).slice(0,8);
    const items=vids.map(a=>({icon:"🔎",label:L("nwFind")+" "+appName(a),fn:()=>{ if(!nat("searchInApp",a.pkg,x.title)) launch(a.pkg) }}));
    if(x.kind==="show") items.unshift({icon:"🎬",label:L("nwFollow"),pri:1,fn:()=>{ S.shows=(S.shows||[]).concat([{q:x.title,name:x.title,tv:x.tv||null,img:x.img||"",mine:null}]); if(!hwHas("shows")) hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}])); A.toast("🎬 "+x.title) }});
    items.push({label:L("done"),fn:()=>{}});
    dialog((x.kind==="movie"?"🎬 ":"📺 ")+x.title,items,{sub:[x.sub,x.rating?`⭐ ${L("nwRating")}: ${x.rating}`:"",(x.summary||"").slice(0,260)].filter(Boolean).join("\n")}); return true }
  return false });
