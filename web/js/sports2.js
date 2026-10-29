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
async function espnDay(day){ const out=[];
  await Promise.all((S.comps||[]).map(async slug=>{ try{
    const r=await A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/scoreboard?dates=${day}`);
    (r.events||[]).forEach(ev=>{ const c=(ev.competitions||[])[0]||{}, tm=c.competitors||[], h=tm.find(x=>x.homeAway==="home")||tm[0]||{}, a=tm.find(x=>x.homeAway==="away")||tm[1]||{}, st=((c.status||ev.status||{}).type)||{};
      out.push({idEvent:"e"+ev.id,_lg:slug,strTimestamp:ev.date,strHomeTeam:(h.team||{}).displayName||"",strAwayTeam:(a.team||{}).displayName||"",
        strHomeTeamBadge:(h.team||{}).logo||"",strAwayTeamBadge:(a.team||{}).logo||"",intHomeScore:st.state==="pre"?null:h.score,intAwayScore:st.state==="pre"?null:a.score,
        strStatus:st.state==="post"?"FT":st.state==="pre"?"NS":"LIVE "+(st.shortDetail||"")}) }) }catch(e){} }));
  return out.filter(e=>evTime(e)).sort((x,y)=>evTime(x)-evTime(y)) }
// ESPN times are "2026-10-28T19:00Z" — already absolute
loadSports=async function(){
  clearTimeout(sportsT);
  if(!S.sportsOn){ matches=[]; renderMatchRow(); updateTicker(); return }
  let list=[]; try{ list=await espnDay(ymd(new Date())) }catch(e){}
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
