// ================= Elgamal TV: what's new, crash reports, rest of the first-run setup =================
const APP_NAME="Elgamal TV";
Object.assign(T.ar,{wnTitle:"✨ الجديد في "+APP_NAME,wlTeam:"بتشجع مين؟ (تنبيهات الماتشات)",wlTheme:"اختار الشكل",wlPhone:"اربط موبايلك كريموت؟",wlPhoneYes:"📱 اربط دلوقتي",wlNo:"بعدين",
  crashT:"⚠️ "+APP_NAME+": حصل خطأ"});
Object.assign(T.en,{wnTitle:"✨ What's new in "+APP_NAME,wlTeam:"Which team do you support? (match alerts)",wlTheme:"Pick a look",wlPhone:"Use your phone as a remote?",wlPhoneYes:"📱 Pair now",wlNo:"Later",
  crashT:"⚠️ "+APP_NAME+": an error happened"});
document.title=APP_NAME;

// ---- 1) what's new: shown once after each update (newest notes on top)
const CHANGES=[
  {v:187,ar:["الكارت الكبير: الصلوات الخمسة والطقس بالأيام الجاية والماتش","15 ويدجت جديدة من زرار ＋","أوامر صوتية: «افتح يوتيوب»، «اقفل بعد ساعة»","تقفل التليفزيون من الموبايل أو تيليجرام","تنبيه بكل جون لفرقك حتى وانت جوه تطبيق"],
   en:["Big card: five prayers, weather forecast and the match","15 new widgets from the ＋ button","Voice: “open YouTube”, “sleep in an hour”","Turn the TV off from your phone or Telegram","A pop-up on every goal for your teams"]}];
function whatsNew(force){ const v=+(nat("versionCode")||0); if(!v) return; const seen=+S.seenVer||0; S.seenVer=v;
  if(!force&&(!seen||seen>=v)) return; // fresh installs skip it (they get the setup instead)
  const notes=CHANGES.filter(c=>force||c.v>seen).slice(0,2).reduce((a,c)=>a.concat(S.lang==="ar"?c.ar:c.en),[]).slice(0,6); if(!notes.length) return;
  dialog(L("wnTitle"),[{label:"👍",pri:1,fn:()=>{}}],{sub:notes.map(n=>"• "+n).join("\n")}) }
window.whatsNew=whatsNew;
setTimeout(()=>{ if(S.welcomed&&!on("dlg")) whatsNew(false); else S.seenVer=+(nat("versionCode")||0) },6000);

// ---- 2) crash reports: errors go to your Telegram (batched, at most one message every 10 minutes)
let crashBuf=[], crashAt=0;
window.addEventListener("error",e=>{ crashBuf.push((e.message||"")+" @"+String(e.filename||"").split("/").pop()+":"+e.lineno); if(crashBuf.length>10) crashBuf.shift() });
window.addEventListener("unhandledrejection",e=>{ const r=e.reason; crashBuf.push("promise: "+String(r&&r.message||r).slice(0,160)); if(crashBuf.length>10) crashBuf.shift() });
setInterval(()=>{ /* tgBackup crash */ if(!crashBuf.length||!S.tgChat||Date.now()-crashAt<600000) return; crashAt=Date.now();
  const ver=nat("versionName")||"?", uniq=[...new Set(crashBuf)]; crashBuf=[];
  try{ tgSend(S.tgChat,`${L("crashT")} (v${ver})\n`+uniq.join("\n")) }catch(_){} },60000);

// ---- 3) first-run setup continues: team → look → phone
window.wlTeam=function(){ const T0=[["Al Ahly, الأهلي","🔴 الأهلي"],["Zamalek, الزمالك","⚪ الزمالك"],["Pyramids, بيراميدز","🔵 بيراميدز"],["Al Masry, المصري","🟢 المصري"],["","— ولا حاجة"]];
  dialog(L("wlTeam"),T0.map(([k,n])=>({label:n,fn:()=>{ S.favTeams=[k,"Egypt, مصر"].filter(Boolean).join(", "); setTimeout(wlTheme,60) }})),{grid:3}) };
function wlTheme(){ if(typeof SKINS==="undefined") return wlPhone();
  dialog(L("wlTheme"),SKINS.map(k=>({icon:k[1],label:S.lang==="ar"?k[2]:k[3],fn:()=>{ S.skin=k[0]; applyLook(); setTimeout(wlPhone,60) }})),{grid:3}) }
function wlPhone(){ dialog(L("wlPhone"),[{label:L("wlPhoneYes"),pri:1,fn:()=>setTimeout(()=>{ try{ phoneDialog() }catch(e){} },60)},{label:L("wlNo"),fn:()=>{}}],{grid:2}) }

// ================= Matches widget per competition: each matches widget can show one tournament only =================
Object.assign(T.ar,{mcComp:"البطولة",mcAll:"كل البطولات اللي بتابعها",mcAddOther:"＋ ويدجت ماتشات لبطولة تانية",mcPick:"اختار البطولة"});
Object.assign(T.en,{mcComp:"Competition",mcAll:"All competitions I follow",mcAddOther:"＋ Matches widget for another competition",mcPick:"Pick a competition"});
const compName=sl=>{ const c=(typeof COMPS!=="undefined"?COMPS:[]).find(x=>x[0]===sl); return c?(S.lang==="ar"?c[1]:c[2]):sl };
function followComp(sl){ const c=S.comps||[]; if(sl&&c.indexOf(sl)<0){ S.comps=c.concat([sl]); try{ loadSports() }catch(e){} } }
hwBody=(function(prev){ return function(w){ if(w.t!=="matches"||!w.comp||typeof matches==="undefined") return prev(w);
  const all=matches; try{ matches=all.filter(e=>e._lg===w.comp); return prev(w) }finally{ matches=all } } })(hwBody);
hwCard=(function(prev){ return function(w){ let h=prev(w); if(w.t==="matches"&&w.comp) h=h.replace(/(<div class="hwt">)([^<]*)(<\/div>)/,(m,a,b,c)=>a+"⚽ "+esc(compName(w.comp))+c); return h } })(hwCard);
function pickComp(cb,withAll){ const l=(withAll?[{label:"🌍 "+L("mcAll"),fn:()=>cb("")}]:[]).concat(COMPS.map(c=>({label:(S.lang==="ar"?c[1]:c[2]),fn:()=>cb(c[0])})));
  dialog("🏆 "+L("mcPick"),l,{grid:3}) }
hwMenu=(function(prev){ return function(id){ prev(id); const w=hwGet(id); if(!w||w.t!=="matches") return; const box=$("dbox"), items=box&&box._items, g=box&&box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  items.splice(0,0,{icon:"🏆",label:L("mcComp")+": "+(w.comp?compName(w.comp):L("mcAll")),pri:1,fn:()=>setTimeout(()=>pickComp(sl=>{ followComp(sl); hwSet(id,{comp:sl}) },true),30)},
    {icon:"＋",label:L("mcAddOther"),fn:()=>setTimeout(()=>pickComp(sl=>{ if(!sl) return; followComp(sl); const nid="m_"+sl.replace(/\W/g,"_"); if(hwGet(nid)) return; hwSave(hwList().concat([{id:nid,t:"matches",sz:2,st:"glass",comp:sl}])) },false),30)});
  g.innerHTML=items.map((it,k)=>`<button class="btn f${it.pri?" pri":""}" data-di="${k}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) } })(hwMenu);

// ================= Matches widget layout: competition name, its matches under it, and the day (yesterday / today / tomorrow) =================
Object.assign(T.ar,{dYday:"امبارح",dToday:"النهارده",dTmrw:"بكره"});Object.assign(T.en,{dYday:"Yesterday",dToday:"Today",dTmrw:"Tomorrow"});
function dayLbl(e){ const t=evTime(e); if(!t) return ""; const a=new Date(); a.setHours(0,0,0,0); const d=Math.floor((t-a)/86400000); return L(d<0?"dYday":d>0?"dTmrw":"dToday") }
hwBody=(function(prev){ return function(w){ if(w.t!=="matches") return prev(w); const a0=new Date(); a0.setHours(0,0,0,0); const list=(typeof matches!=="undefined"?matches:[]).filter(e=>(!w.comp||e._lg===w.comp)&&!e._yday&&(+evTime(e)||0)>=a0.getTime());
  if(!list.length) return `<div class="hwico">⚽</div><div class="hwsub">${esc(L(typeof sportsTried!=="undefined"&&sportsTried?"mNone":"mLoad"))}</div>`;
  const rank={live:0,ns:1,ft:2}, tm=e=>+evTime(e)||0;
  const sorted=list.slice().sort((a,b)=>(rank[evState(a)]-rank[evState(b)])||(evState(a)==="ft"?tm(b)-tm(a):tm(a)-tm(b)));
  const max=w.sz>2?7:w.sz>1?5:3, order=(S.comps||[]), groups={}, keys=[]; let n=0;
  sorted.forEach(e=>{ if(n>=max) return; const k=e._lg||"?"; if(!groups[k]){ groups[k]=[]; keys.push(k) } groups[k].push(e); n++ });
  keys.sort((a,b)=>{ const fa=Math.min(...groups[a].map(e=>rank[evState(e)])), fb=Math.min(...groups[b].map(e=>rank[evState(e)])); return fa-fb||order.indexOf(a)-order.indexOf(b) });
  const more=sorted.length-n;
  return `<div class="mcl">${keys.map(k=>`<div class="mch">${w.comp?"":`<div class="mct${groups[k].length===1?" one":""}">${esc(compName(k))}</div>`}${groups[k].map(e=>{ const st=evState(e);
    return `<div class="mcr"><span class="mtn">${esc(e.strHomeTeam)} <i>×</i> ${esc(e.strAwayTeam)}</span><b class="${st==="live"?"live":""}">${st==="ns"?esc(fmtTime(evTime(e))):(e.intHomeScore||0)+" - "+(e.intAwayScore||0)}</b><small>${st==="live"?"● "+esc(L("live")):esc(dayLbl(e))}</small></div>` }).join("")}</div>`).join("")}${more>0?`<div class="mmore">＋ ${more} ${S.lang==="ar"?"ماتشات تانية":"more"}</div>`:""}</div>` } })(hwBody);

// ================= Matches widget extras: badges, channel, your teams, OK opens the match app, countdown, live minute, league position =================
Object.assign(T.ar,{mIn:"بعد",mPickApp:"بتتفرج على الماتشات منين؟"});Object.assign(T.en,{mIn:"in",mPickApp:"Which app do you watch matches on?"});
const rankCache={};
function teamRank(lg,name){ const c=COMPS.find(x=>x[0]===lg); if(!c||c[3]!=="l"||!/\.\d$/.test(lg)) return "";
  const k="rank:"+lg; const d=w2get(k,6*3600000,async()=>{ const r=await A.fetchJSON(`https://site.api.espn.com/apis/v2/sports/soccer/${lg}/standings`);
    const m={}; ((((r.children||[])[0]||{}).standings||{}).entries||[]).forEach(e=>{ const rk=((e.stats||[]).find(s=>s.name==="rank")||{}).value; const t=e.team||{}; [t.displayName,t.shortDisplayName,t.name].filter(Boolean).forEach(n=>m[n.toLowerCase()]=rk) }); return m });
  const v=d&&d[String(name).toLowerCase()]; return v?` <em class="mrk">${v}</em>`:"" }
function liveMin(e){ const m=String(e.strStatus||"").replace(/^LIVE\s*/,""); const n=m.match(/\d+\+?\d*'?/); return /HT|half/i.test(m)?"HT":n?n[0].replace(/'?$/,"'"):"" }
hwBody=(function(prev){ return function(w){ let h=prev(w); if(w.t!=="matches"||h.indexOf('class="mcr"')<0) return h;
  // rebuild rows with the extras (same order and grouping as the base layout)
  const a0=new Date(); a0.setHours(0,0,0,0); const list=matches.filter(e=>(!w.comp||e._lg===w.comp)&&!e._yday&&(+evTime(e)||0)>=a0.getTime());
  const byKey={}; list.forEach(e=>byKey[e.strHomeTeam+"|"+e.strAwayTeam]=e);
  return h.replace(/<div class="mcr"><span class="mtn">([\s\S]*?) <i>×<\/i> ([\s\S]*?)<\/span><b class="([^"]*)">([\s\S]*?)<\/b><small>([\s\S]*?)<\/small><\/div>/g,(all,hn,an,cls,mid,day)=>{
    const e=list.find(x=>esc(x.strHomeTeam)===hn&&esc(x.strAwayTeam)===an); if(!e) return all; const st=evState(e), fav=teamFav(e);
    const logo=u=>u?`<img class="mlg" src="${esc(u)}" loading="lazy" alt="">`:"";
    const t=+evTime(e)||0, left=t-Date.now();
    const mins=Math.round(left/60000);
    const badge=st==="live"?`● <span dir="ltr">${esc(liveMin(e)||L("live"))}</span>`:(st==="ns"&&left>0&&mins<60)?`${esc(L("mIn"))} ${mins} ${S.lang==="ar"?"د":"min"}`:day;
    const rk=n=>w.sz>2?teamRank(e._lg,n):"", nm=n=>esc(teamAr(n));
    return `<div class="mcr f${fav?" mfav":""}" tabindex="0" data-mt="${esc(e.idEvent||(e.strHomeTeam+"|"+e.strAwayTeam))}"><span class="mtn">${fav?"⭐ ":""}${logo(e.strHomeTeamBadge)}${nm(e.strHomeTeam)}${rk(e.strHomeTeam)} <i>×</i> ${logo(e.strAwayTeamBadge)}${nm(e.strAwayTeam)}${rk(e.strAwayTeam)}${e._tv?`<span class="mtv">📺 ${esc(e._tv)}</span>`:""}</span><b class="${cls}">${mid}</b><small class="${st==="live"?"mlive":""}">${badge}</small></div>` }) } })(hwBody);
// OK on the matches widget opens your match app (asked once)
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w||w.t!=="matches") return false;
  const go=()=>{ if(S.matchApp&&byPkg(S.matchApp)) launch(S.matchApp) };
  if(S.matchApp&&byPkg(S.matchApp)){ go(); return true }
  const l=visibleApps().slice().sort((a,b)=>(/yacine|koora|yalla|ssc|bein|shahid|live|tv/i.test(b.pkg+appName(b))?1:0)-(/yacine|koora|yalla|ssc|bein|shahid|live|tv/i.test(a.pkg+appName(a))?1:0));
  dialog("⚽ "+L("mPickApp"),l.slice(0,30).map(a=>({label:appName(a),fn:()=>{ S.matchApp=a.pkg; go() }})),{grid:3}); return true });

// ---- team names in Arabic (the sources send English)
const TEAM_AR={"al ahly":"الأهلي","zamalek":"الزمالك","pyramids":"بيراميدز","al masry":"المصري","ismaily":"الإسماعيلي","smouha":"سموحة","future":"فيوتشر","modern sport":"مودرن سبورت","modern future":"مودرن سبورت",
 "el gouna":"الجونة","ceramica cleopatra":"سيراميكا كليوباترا","enppi":"إنبي","petrojet":"بتروجت","national bank of egypt":"البنك الأهلي","al ittihad alexandria":"الاتحاد السكندري","al ittihad":"الاتحاد","ittihad alexandria":"الاتحاد السكندري",
 "ghazl el mahalla":"غزل المحلة","el gaish":"طلائع الجيش","tala'ea el gaish":"طلائع الجيش","zed":"زد","pharco":"فاركو","haras el hodoud":"حرس الحدود","el mokawloon":"المقاولون العرب","arab contractors":"المقاولون العرب","wadi degla":"وادي دجلة",
 "petrol asyut":"بترول أسيوط","el qanah":"القناة","abu qir fertilizers":"أبوقير للأسمدة","kahrabaa ismailia":"كهرباء الإسماعيلية","sharkia":"الشرقية","el sharkia":"الشرقية",
 "al hilal":"الهلال","al nassr":"النصر","al ittihad jeddah":"الاتحاد","al ahli":"الأهلي السعودي","al ahli saudi":"الأهلي السعودي","al shabab":"الشباب","al qadsiah":"القادسية","al taawoun":"التعاون","al fateh":"الفتح","al ettifaq":"الاتفاق","al khaleej":"الخليج","al riyadh":"الرياض","al hazem":"الحزم","al kholood":"الخلود","neom":"نيوم","al diriyah":"الدرعية",
 "shabab al ahli":"شباب الأهلي","al ain":"العين","al wahda":"الوحدة","al jazira":"الجزيرة","sharjah":"الشارقة","al sadd":"السد","al duhail":"الدحيل","al gharafa":"الغرافة","al rayyan":"الريان","al shamal":"الشمال","esteghlal":"الاستقلال","persepolis":"برسبوليس",
 "wydad":"الوداد","raja casablanca":"الرجاء","esperance":"الترجي","esperance de tunis":"الترجي","mamelodi sundowns":"صن داونز",
 "real madrid":"ريال مدريد","barcelona":"برشلونة","atletico madrid":"أتلتيكو مدريد","villarreal":"فياريال","sevilla":"إشبيلية","real betis":"ريال بيتيس","athletic club":"أتلتيك بلباو",
 "manchester city":"مانشستر سيتي","manchester united":"مانشستر يونايتد","liverpool":"ليفربول","arsenal":"آرسنال","chelsea":"تشيلسي","tottenham hotspur":"توتنهام","aston villa":"أستون فيلا","newcastle united":"نيوكاسل",
 "bayern munich":"بايرن ميونخ","borussia dortmund":"دورتموند","bayer leverkusen":"ليفركوزن","rb leipzig":"لايبزيج","vfb stuttgart":"شتوتجارت","stuttgart":"شتوتجارت",
 "paris saint-germain":"باريس سان جيرمان","psg":"باريس سان جيرمان","marseille":"مارسيليا","monaco":"موناكو","lille":"ليل","lyon":"ليون",
 "inter milan":"إنتر ميلان","internazionale":"إنتر ميلان","ac milan":"ميلان","juventus":"يوفنتوس","napoli":"نابولي","as roma":"روما","roma":"روما","lazio":"لاتسيو","atalanta":"أتالانتا",
 "galatasaray":"جالاتا سراي","fenerbahce":"فنربخشة","besiktas":"بشكتاش","trabzonspor":"طرابزون سبور","benfica":"بنفيكا","porto":"بورتو","sporting cp":"سبورتينج","ajax":"أياكس","psv eindhoven":"آيندهوفن","feyenoord":"فيينورد","shakhtar donetsk":"شاختار دونيتسك","bodo/glimt":"بودو جليمت","slovan bratislava":"سلوفان براتيسلافا",
 "egypt":"مصر","saudi arabia":"السعودية","morocco":"المغرب","algeria":"الجزائر","tunisia":"تونس","qatar":"قطر","jordan":"الأردن","iraq":"العراق","uae":"الإمارات","united arab emirates":"الإمارات"};
function teamAr(n){ if(S.lang!=="ar") return n; const k=String(n||"").toLowerCase().replace(/\s+fc$|^fc\s+/,"").trim(); return TEAM_AR[k]||n }
window.teamAr=teamAr;

// OK on a single match opens your match app (picked once)
function openMatchApp(){ if(S.matchApp&&byPkg(S.matchApp)){ launch(S.matchApp); return }
  const l=visibleApps().slice().sort((a,b)=>(/yacine|koora|yalla|ssc|bein|shahid|live|tv/i.test(b.pkg+appName(b))?1:0)-(/yacine|koora|yalla|ssc|bein|shahid|live|tv/i.test(a.pkg+appName(a))?1:0));
  dialog("⚽ "+L("mPickApp"),l.slice(0,30).map(a=>({label:appName(a),fn:()=>{ S.matchApp=a.pkg; launch(a.pkg) }})),{grid:3}) }
activators.unshift(el=>{ if(el.dataset&&el.dataset.mt!=null){ openMatchApp(); return true } return false });
// long-press a match: change the app used for matches
optionHandlers.unshift(el=>{ if(el.dataset&&el.dataset.mt!=null){ S.matchApp=""; openMatchApp(); return true } return false });
