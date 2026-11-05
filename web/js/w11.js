// ================= Matches, new look: match cards (competition + day pill, logos, time in the middle), a "Teams" picker, and a big rotating match card on Home =================
Object.assign(T.ar,{mtTeams:"👥 الفرق",mtTeamsHint:"اختار الدوري، وبعدين دوس على فرقك عشان تبقى ⭐ (بتظهر الأول وبيجيلك تنبيه بأهدافها)",mtTeamAdd:"⭐ اتضاف لفرقك",mtTeamRem:"اتشال من فرقك",
  dToday:"اليوم",dTmrw:"بكره",dYday:"امبارح",w_mcard:"كارت الماتشات",mcNone:"مفيش ماتشات النهارده"});
Object.assign(T.en,{mtTeams:"👥 Teams",mtTeamsHint:"Pick a league, then press your teams to star them (shown first, with goal alerts)",mtTeamAdd:"⭐ Added to your teams",mtTeamRem:"Removed from your teams",
  dToday:"Today",dTmrw:"Tomorrow",dYday:"Yesterday",w_mcard:"Match card",mcNone:"No matches today"});

const dayPill=t=>{ const a=new Date(); a.setHours(0,0,0,0); const d=Math.floor((+t-a.getTime())/86400000);
  return d===0?L("dToday"):d===1?L("dTmrw"):d===-1?L("dYday"):new Date(+t).toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"long"}) };
const mLogo=u=>u?`<img src="${esc(u)}" loading="lazy" alt="">`:`<i class="mnol">⚽</i>`;
function mtMid(e){ const st=evState(e);
  return st==="ns"?`<b>${esc(fmtTime(evTime(e),true))}</b><small>${esc(tvName(e)||"")}</small>`
    :`<b class="${st==="live"?"live":""}" dir="ltr">${(e.intHomeScore||0)} - ${(e.intAwayScore||0)}</b><small class="${st==="live"?"mlive":""}">${st==="live"?"● "+esc(liveMin(e)||L("live")):S.lang==="ar"?"انتهت":"FT"}</small>` }
// the match card used everywhere in the Matches tab
mtRow=function(e){ const fav=teamFav(e);
  return `<div class="mtc f${fav?" mfav":""}" tabindex="0" data-mt="${esc(e.idEvent||"")}"><div class="mtch"><span>${fav?"⭐ ":""}${esc(compName(e._lg||""))}</span><i>${esc(dayPill(evTime(e)))}</i></div>
    <div class="mtcb"><div class="mtct">${mLogo(e.strHomeTeamBadge)}<span>${esc(teamAr(e.strHomeTeam))}</span></div><div class="mtcm">${mtMid(e)}</div><div class="mtct">${mLogo(e.strAwayTeamBadge)}<span>${esc(teamAr(e.strAwayTeam))}</span></div></div></div>` };

// ---- 👥 Teams: pick favourite teams league by league (logos from ESPN)
mtCats=(function(prev){ return ()=>{ const l=prev().slice(), i=l.findIndex(x=>x[0]==="table"); l.splice(i<0?l.length:i,0,["teams","mtTeams"]); return l } })(mtCats);
let mtTl="", mtTeamsCache={};
const favList=()=>String(S.favTeams||"").split(/[,،]/).map(x=>x.trim()).filter(Boolean);
const isFavTeam=n=>{ const s=(n+" "+teamAr(n)).toLowerCase(); return favList().some(x=>s.indexOf(x.toLowerCase())>=0) };
function toggleFavTeam(n){ const ar=teamAr(n); if(isFavTeam(n)){ const k=[n.toLowerCase(),String(ar).toLowerCase()]; S.favTeams=favList().filter(x=>k.every(y=>y.indexOf(x.toLowerCase())<0)).join(", "); A.toast(L("mtTeamRem")+": "+ar) }
  else { S.favTeams=favList().concat([n]).concat(ar&&ar!==n?[ar]:[]).join(", "); A.toast(L("mtTeamAdd")+": "+ar) } }
renderMt=(function(prev){ return async function(){ if(mtCat!=="teams") return prev.apply(this,arguments);
  $("mtCats").innerHTML=mtCatsHtml(); const lgs=COMPS.filter(c=>c[3]==="l"&&/\.\d$/.test(c[0]));
  if(!mtTl) mtTl=(S.comps||[]).find(s=>lgs.some(c=>c[0]===s))||"egy.1";
  const head=`<p class="hint">${esc(L("mtTeamsHint"))}</p><div class="inline mtlg">${lgs.map(c=>`<button class="btn sm f${c[0]===mtTl?" pri":""}" data-mttl="${c[0]}">${esc(S.lang==="ar"?c[1]:c[2])}</button>`).join("")}</div>`;
  $("mtMain").innerHTML=head+`<p class="hint">${esc(L("mtLoading"))}</p>`; const key=mtTl;
  let teams=mtTeamsCache[key]; if(!teams){ try{ const r=await A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${key}/teams`);
      teams=((((r.sports||[])[0]||{}).leagues||[])[0]||{}).teams||[]; teams=teams.map(t=>t.team||t).map(t=>({n:t.displayName||t.name||"",logo:((t.logos||[])[0]||{}).href||""})).filter(t=>t.n); mtTeamsCache[key]=teams }catch(e){ teams=[] } }
  if(mtCat!=="teams"||mtTl!==key) return;
  teams=teams.slice().sort((a,b)=>(isFavTeam(b.n)?1:0)-(isFavTeam(a.n)?1:0)||String(teamAr(a.n)).localeCompare(String(teamAr(b.n)),"ar"));
  $("mtMain").innerHTML=head+(teams.length?`<div class="mteams">${teams.map(t=>`<div class="mteam f${isFavTeam(t.n)?" on":""}" tabindex="0" data-mtteam="${esc(t.n)}">${mLogo(t.logo)}<span>${esc(teamAr(t.n))}</span>${isFavTeam(t.n)?"<b>⭐</b>":""}</div>`).join("")}</div>`:`<p class="hint">${esc(L("mtNone"))}</p>`) } })(renderMt);
activators.unshift(el=>{ const d=el.dataset||{};
  if(d.mttl){ mtTl=d.mttl; renderMt().then(()=>{ const f=document.querySelector(`#mtMain [data-mttl="${mtTl}"]`); if(f) focus(f) }); return true }
  if(d.mtteam){ const n=d.mtteam; toggleFavTeam(n); const on=isFavTeam(n); el.classList.toggle("on",on); const b=el.querySelector("b"); if(on&&!b) el.insertAdjacentHTML("beforeend","<b>⭐</b>"); if(!on&&b) b.remove(); return true }
  return false });

// ---- big rotating match card on Home (live first, then your teams, then by time)
HW_TYPES.push(["mcard","⚽","w_mcard"]);
let mcIdx=0;
function mcList(){ const now=Date.now(); let l=(typeof matches!=="undefined"?matches:[])||[];
  l=l.filter(e=>{ const s=evState(e), t=+evTime(e)||0; return s==="live"||(s==="ns"&&t>now-3*3600000&&t<now+36*3600000)||(s==="ft"&&now-t<3*3600000) });
  const rk=e=>evState(e)==="live"?0:teamFav(e)?1:2; return l.sort((a,b)=>rk(a)-rk(b)||(+evTime(a)||0)-(+evTime(b)||0)) }
hwBody=(function(prev){ return function(w){ if(w.t!=="mcard") return prev(w); const l=mcList();
  if(!l.length) return `<div class="mcbig"><div class="mcc"><span class="hwsub dim">${esc(L("mcNone"))}</span></div></div>`;
  const e=l[mcIdx%l.length];
  return `<div class="mcbig"><div class="mcqL">${teamFav(e)?"⭐ ":""}${esc(compName(e._lg||""))}</div><div class="mcc"><div class="mcq">${mLogo(e.strHomeTeamBadge)}<span>${esc(teamAr(e.strHomeTeam))}</span></div>
    <div class="mcm">${mtMid(e).replace("<small>",`<small>${esc(dayPill(evTime(e)))} `)}</div><div class="mcq">${mLogo(e.strAwayTeamBadge)}<span>${esc(teamAr(e.strAwayTeam))}</span></div></div>${l.length>1?`<div class="mcdots">${l.slice(0,8).map((x,i)=>`<i class="${i===mcIdx%l.length?"on":""}"></i>`).join("")}</div>`:""}</div>` } })(hwBody);
setInterval(()=>{ if(!document.querySelector("#home.on")||!hwHas("mcard")) return; const n=mcList().length; if(n<2) return; mcIdx=(mcIdx+1)%n;
  document.querySelectorAll('.hw-mcard').forEach(card=>{ const w=hwGet(card.dataset.hw), b=card.querySelector(".hwb"); if(w&&b) b.innerHTML=hwBody(w) }) },8000);
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w||w.t!=="mcard") return false; mtCat="d0"; showPage("mt"); return true });
