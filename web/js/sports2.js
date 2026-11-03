// ================= Matches from every league, continental cup and national team (ESPN public scoreboard) =================
// [slug, Arabic, English, group]
const COMPS=[
 ["egy.1","الدوري المصري","Egyptian Premier League","l"],["ksa.1","الدوري السعودي","Saudi Pro League","l"],["eng.1","الدوري الإنجليزي","Premier League","l"],["esp.1","الدوري الإسباني","La Liga","l"],
 ["ita.1","الدوري الإيطالي","Serie A","l"],["ger.1","الدوري الألماني","Bundesliga","l"],["fra.1","الدوري الفرنسي","Ligue 1","l"],["tur.1","الدوري التركي","Turkish Süper Lig","l"],
 ["por.1","الدوري البرتغالي","Primeira Liga","l"],["ned.1","الدوري الهولندي","Eredivisie","l"],["uae.1","الدوري الإماراتي","UAE Pro League","l"],["qat.1","الدوري القطري","Qatar Stars League","l"],
 ["mar.1","الدوري المغربي","Botola Pro","l"],["usa.1","الدوري الأمريكي","MLS","l"],["eng.2","التشامبيونشيب","Championship","l"],["eng.fa","كأس إنجلترا","FA Cup","l"],["esp.copa_del_rey","كأس ملك إسبانيا","Copa del Rey","l"],
 ["uefa.champions","دوري أبطال أوروبا","Champions League","c"],["uefa.europa","الدوري الأوروبي","Europa League","c"],["uefa.europa.conf","دوري المؤتمر","Conference League","c"],
 ["caf.champions","دوري أبطال أفريقيا","CAF Champions League","c"],["caf.confed","الكونفدرالية الأفريقية","CAF Confederation Cup","c"],["afc.champions","دوري أبطال آسيا","AFC Champions League","c"],
 ["conmebol.libertadores","كوبا ليبرتادوريس","Copa Libertadores","c"],["fifa.cwc","كأس العالم للأندية","Club World Cup","c"],
 ["fifa.world","كأس العالم","World Cup","n"],["fifa.worldq.caf","تصفيات كأس العالم - أفريقيا","WC Qualifiers - Africa","n"],["fifa.worldq.afc","تصفيات كأس العالم - آسيا","WC Qualifiers - Asia","n"],
 ["fifa.worldq.uefa","تصفيات كأس العالم - أوروبا","WC Qualifiers - Europe","n"],["caf.nations","كأس الأمم الأفريقية","Africa Cup of Nations","n"],["caf.nations_qual","تصفيات أمم أفريقيا","AFCON Qualifiers","n"],
 ["afc.asian.cup","كأس آسيا","Asian Cup","n"],["uefa.euro","كأس أمم أوروبا","EURO","n"],["uefa.nations","دوري الأمم الأوروبية","Nations League","n"],["fifa.friendly","مباريات ودية دولية","International friendlies","n"],
 ["fifa.arab","كأس العرب","Arab Cup","n"]];
Object.assign(DEF,{comps:["egy.1","ksa.1","eng.1","esp.1","tur.1","uefa.champions","caf.champions","afc.champions","fifa.worldq.caf","caf.nations","fifa.friendly","fifa.world","fifa.arab"]});
Object.assign(T.ar,{cgL:"🏟 الدوريات",cgC:"🏆 بطولات قارية",cgN:"🌍 المنتخبات",compsHint:"اختار اللي تتابعه — المختار لونه مختلف"});
Object.assign(T.en,{cgL:"🏟 Leagues",cgC:"🏆 Continental cups",cgN:"🌍 National teams",compsHint:"Pick what you follow — selected ones are highlighted"});
COMPS.forEach(c=>{ if(!LEAGUES.find(l=>l[0]===c[0])) LEAGUES.push([c[0],c[1],c[2]]) });
const ymd=d=>`${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
let ydCache=null;
// TheSportsDB league names for each competition (used only when ESPN has nothing for it that day)
const TSDB_RX={"egy.1":/egypt/i,"ksa.1":/saudi/i,"eng.1":/english premier|^premier league$/i,"esp.1":/la ?liga/i,"ita.1":/serie a\b/i,"ger.1":/bundesliga/i,"fra.1":/ligue 1/i,
  "tur.1":/turk|s[uü]per lig/i,"por.1":/portug|primeira/i,"ned.1":/eredivisie/i,"uae.1":/uae|emirat|arabian gulf/i,"qat.1":/qatar/i,"mar.1":/morocc|botola/i,"usa.1":/major league soccer|\bmls\b/i,
  "eng.2":/championship/i,"eng.fa":/fa cup/i,"esp.copa_del_rey":/copa del rey/i,"uefa.champions":/uefa champions/i,"uefa.europa":/europa league/i,"uefa.europa.conf":/conference league/i,
  "caf.champions":/caf champions|african champions/i,"caf.confed":/confederation cup/i,"afc.champions":/afc champions|asian champions/i,"conmebol.libertadores":/libertadores/i,"fifa.cwc":/club world cup/i,
  "fifa.world":/^fifa world cup$|^world cup$/i,"fifa.worldq.caf":/world cup.*qualif.*(africa|caf)|(africa|caf).*world cup.*qualif/i,"fifa.worldq.afc":/world cup.*qualif.*(asia|afc)|(asia|afc).*world cup.*qualif/i,"fifa.worldq.uefa":/world cup.*qualif.*(europe|uefa)|(europe|uefa).*world cup.*qualif/i,
  "caf.nations":/africa(n)? cup of nations|afcon/i,"caf.nations_qual":/africa(n)? cup of nations.*qualif|afcon.*qualif/i,"afc.asian.cup":/asian cup/i,"uefa.euro":/european championship|uefa euro(\s|$|\d)/i,
  "uefa.nations":/nations league/i,"fifa.friendly":/friendl/i,"fifa.arab":/arab cup/i};
const TSDB_NOT={"eng.2":/europ|women|scottish/i,"ger.1":/2\.|2 bundesliga|women|frauen/i,"eng.1":/women/i,"uefa.europa":/conference/i,"caf.nations":/qualif/i,"fifa.world":/qualif|club|women/i,"esp.1":/women|f\b/i};
const TSDB_ID={"egy.1":4829,"ksa.1":4668,"eng.1":4328,"esp.1":4335,"uefa.champions":4480};
const tsdbCache={};
async function tsdbDay(d,missing){ const c=tsdbCache[d]; if(c&&Date.now()-c.at<20*60000&&missing.every(m=>c.asked[m])) return c.l;
  const reqs=["https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d="+d+"&s=Soccer"].concat(missing.filter(m=>TSDB_ID[m]).map(m=>"https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d="+d+"&l="+TSDB_ID[m]));
  const all=[], ids={}; for(const u of reqs){ try{ const r=await A.fetchJSON(u); (r.events||[]).forEach(e=>{ if(!ids[e.idEvent]){ ids[e.idEvent]=1; all.push(e) } }) }catch(e){} }
  const asked={}; missing.forEach(m=>asked[m]=1); tsdbCache[d]={at:Date.now(),l:all,asked}; return all }
async function espnDay(day){ const out=[];
  await Promise.all((S.comps||[]).map(async slug=>{ try{
    const r=await A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/scoreboard?dates=${day}`);
    (r.events||[]).forEach(ev=>{ const c=(ev.competitions||[])[0]||{}, tm=c.competitors||[], h=tm.find(x=>x.homeAway==="home")||tm[0]||{}, a=tm.find(x=>x.homeAway==="away")||tm[1]||{}, st=((c.status||ev.status||{}).type)||{};
      out.push({idEvent:"e"+ev.id,_lg:slug,strTimestamp:ev.date,strHomeTeam:(h.team||{}).displayName||"",strAwayTeam:(a.team||{}).displayName||"",
        strHomeTeamBadge:(h.team||{}).logo||"",strAwayTeamBadge:(a.team||{}).logo||"",intHomeScore:st.state==="pre"?null:h.score,intAwayScore:st.state==="pre"?null:a.score,
        strStatus:st.state==="post"?"FT":st.state==="pre"?"NS":"LIVE "+(st.shortDetail||"")}) }) }catch(e){} }));
  // second source: any followed competition ESPN returned nothing for gets TheSportsDB's list for that day (matched by league name)
  const missing=(S.comps||[]).filter(sl=>TSDB_RX[sl]&&!out.some(e=>e._lg===sl));
  if(missing.length){ try{ const d=`${day.slice(0,4)}-${day.slice(4,6)}-${day.slice(6,8)}`, evs=await tsdbDay(d,missing), seen={};
    out.forEach(e=>seen[(e.strHomeTeam+e.strAwayTeam).toLowerCase()]=1);
    evs.forEach(ev=>{ const sl=missing.find(m=>TSDB_RX[m].test(ev.strLeague||"")&&!(TSDB_NOT[m]&&TSDB_NOT[m].test(ev.strLeague||""))); if(!sl) return;
      const k=(String(ev.strHomeTeam)+ev.strAwayTeam).toLowerCase(); if(seen[k]) return; seen[k]=1;
      const st=String(ev.strStatus||""), fin=/finish|^FT|AET|PEN|AP/i.test(st), pre=!st||/^NS$|Not Started|TBD|Postp/i.test(st);
      const ts=ev.strTimestamp?(/Z|[+-]\d\d:?\d\d$/.test(ev.strTimestamp)?ev.strTimestamp:ev.strTimestamp+"Z"):(ev.dateEvent+"T"+(ev.strTime||"00:00:00")+"Z");
      out.push({idEvent:"t"+ev.idEvent,_lg:sl,_src:"tsdb",strTimestamp:ts,strHomeTeam:ev.strHomeTeam||"",strAwayTeam:ev.strAwayTeam||"",strHomeTeamBadge:ev.strHomeTeamBadge||"",strAwayTeamBadge:ev.strAwayTeamBadge||"",
        intHomeScore:pre?null:ev.intHomeScore,intAwayScore:pre?null:ev.intAwayScore,strStatus:fin?"FT":pre?"NS":"LIVE "+st}) }) }catch(e){} }
  return out.filter(e=>evTime(e)).sort((x,y)=>evTime(x)-evTime(y)) }
// ESPN times are "2026-10-28T19:00Z" — already absolute
loadSports=async function(){
  clearTimeout(sportsT);
  if(!S.sportsOn){ matches=[]; renderMatchRow(); updateTicker(); return }
  let list=[]; try{ list=await espnDay(ymd(new Date())) }catch(e){}
  // yesterday's results stay visible (finished games, cached 3 h) so a late or missed match still shows
  try{ const yk=ymd(new Date(Date.now()-86400000)); if(!ydCache||ydCache.k!==yk||Date.now()-ydCache.at>3*3600000) ydCache={k:yk,at:Date.now(),l:(await espnDay(yk)).filter(e=>evState(e)==="ft").map(e=>Object.assign(e,{_yday:true}))};
    const seen={}; list.forEach(e=>seen[e.strHomeTeam+e.strAwayTeam]=1); list=list.concat(ydCache.l.filter(e=>!seen[e.strHomeTeam+e.strAwayTeam])) }catch(e){}
  matches=list; renderMatchRow(); updateTicker(); if(typeof renderHW==="function") renderHW();
  sportsT=setTimeout(loadSports,(matches.some(e=>evState(e)==="live")?2:15)*60000);
};
// the Matches tab (yesterday / tomorrow) uses the same source
if(typeof spFetch==="function") spFetch=async function(off){ if(off===0) return matches; const c=spCache[off]; if(c&&Date.now()-c.at<30*60000) return c.list;
  const list=await espnDay(ymd(new Date(Date.now()+off*86400000))); spCache[off]={at:Date.now(),list}; return list };
// live state from ESPN status
const _evStateE=evState; evState=function(e){ const s=e.strStatus||""; if(/^LIVE/.test(s)) return "live"; if(s==="FT") return "ft"; if(s==="NS") return "ns"; return _evStateE(e) };
// grouped, clear picker in settings
const _lifeSetSp=window.lifeSettings; window.lifeSettings=function(){
  const grp=(g,t)=>field(L(t),`<div class="inline">${COMPS.filter(c=>c[3]===g).map(c=>`<button class="btn f${(S.comps||[]).includes(c[0])?" pri":""}" data-tog="comps:${c[0]}">${esc(S.lang==="ar"?c[1]:c[2])}</button>`).join("")}</div>`);
  return sec("⚽ "+L("sSports"),field(L("compsHint"),"")+grp("l","cgL")+grp("c","cgC")+grp("n","cgN"))+(_lifeSetSp?_lifeSetSp():"") };
const _settingsToggle=AFTER.comps; AFTER.comps=()=>{ loadSports() };

if(!S.favTeamsSeeded){ S.favTeamsSeeded=true; if(!String(S.favTeams||"").trim()) S.favTeams="Al Ahly, Egypt, Trabzonspor, الأهلي, مصر" }
// refresh when Home is opened and the list is older than 10 minutes
let sportsAt=Date.now(); const _loadSportsT=loadSports; loadSports=async function(){ sportsAt=Date.now(); return _loadSportsT.apply(this,arguments) };
pageHooks["home:enter"]=(function(prev){ return function(){ if(prev) prev(); if(S.sportsOn&&Date.now()-sportsAt>600000) loadSports() } })(pageHooks["home:enter"]);
