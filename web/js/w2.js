// ================= 15 extra widgets — each one loads its data only while it is on the board, cached, and refreshes rarely =================
Object.assign(T.ar,{w_wk:"ماتشات فرقك الأسبوع ده",w_fx:"الدولار والدهب",w_tas:"عدّاد تسبيح",w_ch:"قنواتي المفضلة",w_alarm:"منبّه / تذكير",w_ims:"إمساكية رمضان",
  w_radio:"راديو",w_news:"آخر الأخبار",w_new:"جديد المنصات النهارده",w_speed:"سرعة النت",w_album:"ألبوم صوري",w_kids:"وقت الأطفال",w_occ:"مناسبات العيلة",
  w_table:"جدول الدوري",w_air:"جودة الهوا والبحر",w_load:"بيحمّل…",w_none:"مفيش حاجة دلوقتي",w_ok:"OK",w_reset:"صفّر",w_testNow:"اضغط OK عشان تقيس",
  w_testing:"بيقيس…",w_addAlarm:"＋ تذكير جديد",w_after:"بعد كام دقيقة؟",w_what:"تفكير بإيه؟",w_addOcc:"＋ مناسبة جديدة",w_occName:"اسم المناسبة (مثلاً: عيد ميلاد أحمد)",
  w_occDate:"التاريخ (يوم/شهر) مثلاً 15/3",w_days:"يوم",w_today:"النهارده 🎉",w_noFavCh:"ضيف قنوات للمفضلة من صفحة القنوات",w_noPics:"ابعت صور من الموبايل (تاب صور وروابط → للبرواز)",
  w_left:"باقي",w_min:"دقيقة",w_noLimit:"مفيش حد للأطفال",w_imsak:"الإمساك",w_iftar:"الإفطار",w_toRam:"على رمضان",w_waves:"الموج",w_aqi:"الهوا",w_good:"كويس",w_mid:"متوسط",w_bad:"وحش",
  w_gold21:"دهب عيار 21",w_league:"اختار الدوري",w_remove:"🗑 امسح"});
Object.assign(T.en,{w_wk:"Your teams this week",w_fx:"Dollar & gold",w_tas:"Tasbih counter",w_ch:"My channels",w_alarm:"Reminder",w_ims:"Ramadan times",
  w_radio:"Radio",w_news:"Latest news",w_new:"New on streaming today",w_speed:"Internet speed",w_album:"My photos",w_kids:"Kids time",w_occ:"Family dates",
  w_table:"League table",w_air:"Air & sea",w_load:"Loading…",w_none:"Nothing right now",w_ok:"OK",w_reset:"Reset",w_testNow:"Press OK to test",
  w_testing:"Testing…",w_addAlarm:"＋ New reminder",w_after:"In how many minutes?",w_what:"Remind me about?",w_addOcc:"＋ New date",w_occName:"Name (e.g. Ahmed's birthday)",
  w_occDate:"Date (day/month) e.g. 15/3",w_days:"days",w_today:"Today 🎉",w_noFavCh:"Add favorite channels from the TV page",w_noPics:"Send photos from your phone (Photos tab → frame)",
  w_left:"left",w_min:"min",w_noLimit:"No kids limit",w_imsak:"Imsak",w_iftar:"Iftar",w_toRam:"to Ramadan",w_waves:"Waves",w_aqi:"Air",w_good:"Good",w_mid:"Fair",w_bad:"Poor",
  w_gold21:"Gold 21K",w_league:"Pick league",w_remove:"🗑 Remove"});
Object.assign(DEF,{tasbih:0,alarms:[],occasions:[],tableLg:"egy.1"});
HW_TYPES.push(["wk","📅","w_wk"],["fx","💱","w_fx"],["tas","📿","w_tas"],["ch","📺","w_ch"],["alarm","⏰","w_alarm"],["ims","🌙","w_ims"],["radio","🎵","w_radio"],
  ["news","📰","w_news"],["new","🎬","w_new"],["speed","📶","w_speed"],["album","🖼","w_album"],["kids","🧒","w_kids"],["occ","🎂","w_occ"],["table","🏆","w_table"],["air","🌡","w_air"]);

// ---- tiny cache: one fetch per widget per TTL, never while hidden, never two at once
const W2={};
function w2get(key,ttl,loader){ const c=W2[key]||(W2[key]={});
  if(!c.busy&&!window.__bg&&(!c.at||Date.now()-c.at>ttl)){ c.busy=true; Promise.resolve().then(loader).then(d=>{ c.d=d; c.at=Date.now() },()=>{ c.at=Date.now()-ttl+600000 }).then(()=>{ c.busy=false; renderHW() }) }
  return c.d }
const rows=(l,n)=>`<div class="hwml">${l.slice(0,n).join("")}</div>`;
const row=(a,b,c)=>`<div class="hwm"><span class="tn" style="text-align:start">${a}</span>${b!=null?`<b>${b}</b>`:""}${c!=null?`<span class="tn">${c}</span>`:""}</div>`;
const msg=t=>`<div class="hwsub dim">${esc(t)}</div>`;
const nOf=w=>w.sz>2?6:w.sz>1?4:2;
const w2ymd=d=>d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");

const _hwBodyW2=hwBody; hwBody=function(w){ try{ switch(w.t){
  case "wk": { const d=w2get("wk",6*3600000,async()=>{ const a=new Date(), b=new Date(Date.now()+7*86400000), out=[];
      const slugs=(S.comps&&S.comps.length?S.comps:["egy.1","caf.champions","fifa.worldq.caf","fifa.friendly"]).slice(0,8);
      for(const sl of slugs){ try{ const r=await A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${sl}/scoreboard?dates=${w2ymd(a)}-${w2ymd(b)}`);
        (r.events||[]).forEach(ev=>{ const c=((ev.competitions||[])[0]||{}).competitors||[], h=c.find(x=>x.homeAway==="home")||c[0]||{}, aw=c.find(x=>x.homeAway==="away")||c[1]||{};
          const e={strHomeTeam:(h.team||{}).displayName||"",strAwayTeam:(aw.team||{}).displayName||"",t:new Date(ev.date).getTime()}; if(teamFav(e)&&e.t>Date.now()-3*3600000) out.push(e) }) }catch(e){} }
      const seen={}; return out.filter(e=>{ const k=e.strHomeTeam+e.strAwayTeam+e.t; return seen[k]?false:(seen[k]=1) }).sort((x,y)=>x.t-y.t) });
    if(!d) return msg(L("w_load")); if(!d.length) return msg(L("w_none"));
    return rows(d.map(e=>`<div class="w2wk"><span>${esc(e.strHomeTeam)} × ${esc(e.strAwayTeam)}</span><small>${esc(new Date(e.t).toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"long"})+" · "+fmtTime(new Date(e.t)))}</small></div>`),nOf(w)) }
  case "fx": { const d=w2get("fx",3600000,async()=>{ const r=await A.fetchJSON("https://open.er-api.com/v6/latest/USD"), e=r.rates||{}; let g=null;
      try{ const x=await A.fetchJSON("https://api.gold-api.com/price/XAU"); if(x&&x.price) g=x.price/31.1035*0.875*e.EGP }catch(_){}
      return {usd:e.EGP,eur:e.EGP/e.EUR,sar:e.EGP/e.SAR,g} });
    if(!d) return msg(L("w_load")); const f=v=>v?v.toFixed(2):"—";
    return rows([row("🇺🇸 USD",f(d.usd)),row("🇸🇦 SAR",f(d.sar)),row("🇪🇺 EUR",f(d.eur)),row("🪙 "+esc(L("w_gold21")),d.g?Math.round(d.g)+" ج":"—")],w.sz>1?4:2) }
  case "tas": return `<div class="hwbig">${+S.tasbih||0}</div><div class="hwsub">${["سبحان الله","الحمد لله","الله أكبر"][Math.floor((+S.tasbih||0)/33)%3]}</div><div class="hwsub dim">OK +1</div>`;
  case "ch": { const l=(S.favCh||[]).slice(0,nOf(w)+2); if(!l.length) return msg(L("w_noFavCh"));
    return `<div class="w2ch">${l.map((c,i)=>`<span>${c.logo?`<img src="${esc(c.logo)}" alt="">`:"📺"}<i>${esc(c.name||"")}</i></span>`).join("")}</div>` }
  case "alarm": { const l=(S.alarms||[]).filter(a=>a.t>Date.now()).sort((a,b)=>a.t-b.t); if(!l.length) return `<div class="hwico">⏰</div>${msg(L("w_addAlarm"))}`;
    return rows(l.map(a=>row("⏰ "+esc(a.n),esc(fmtTime(new Date(a.t))),esc(L("w_left"))+" "+esc(fmtLeft(a.t-Date.now())))),nOf(w)) }
  case "ims": { const ram=typeof isRamadan==="function"&&isRamadan(); if(ram&&typeof prayers!=="undefined"&&prayers.length){ const im=new Date(prayers[0].getTime()-10*60000);
      return rows([row("🌙 "+esc(L("w_imsak")),esc(fmtTime(im))),row("🍽️ "+esc(L("w_iftar")),esc(fmtTime(prayers[4])),esc(L("w_left"))+" "+esc(fmtLeft(prayers[4]-Date.now())))],2) }
    const ev=typeof nextEvents==="function"?nextEvents(4).find(e=>e.k==="evRamadan"):null; return `<div class="hwico">🌙</div><div class="hwbig">${ev?ev.d:"—"}</div><div class="hwsub">${esc(L("w_days"))} ${esc(L("w_toRam"))}</div>` }
  case "radio": { const d=w2get("radio",24*3600000,async()=>{ const r=await A.fetchJSON("https://de1.api.radio-browser.info/json/stations/bycountrycodeexact/EG?order=votes&reverse=true&limit=12&hidebroken=true"); return (r||[]).map(s=>({name:s.name.trim(),url:s.url_resolved||s.url,logo:s.favicon||""})) });
    if(!d) return msg(L("w_load")); return rows(d.map(s=>row("🎵 "+esc(s.name))),nOf(w)) }
  case "news": { const d=w2get("news",30*60000,async()=>{ const x=await A.fetchText("https://news.google.com/rss?hl=ar&gl=EG&ceid=EG:ar"), doc=new DOMParser().parseFromString(x,"text/xml");
      return [].slice.call(doc.getElementsByTagName("item"),0,10).map(it=>{ const t=(it.getElementsByTagName("title")[0]||{}).textContent||""; return t.replace(/\s+-\s+[^-]+$/,"") }) });
    if(!d) return msg(L("w_load")); return rows(d.map(t=>row("• "+esc(t))),w.sz>2?5:w.sz>1?3:2) }
  case "new": { const d=w2get("new",6*3600000,async()=>{ const r=await A.fetchJSON("https://api.tvmaze.com/schedule/web?date="+new Date().toISOString().slice(0,10)), seen={};
      return (r||[]).map(e=>((e._embedded||{}).show||{})).filter(s=>s.name&&!seen[s.name]&&(seen[s.name]=1)&&(s.rating&&s.rating.average||0)>=6.5).slice(0,8).map(s=>({n:s.name,net:((s.webChannel||s.network)||{}).name||""})) });
    if(!d) return msg(L("w_load")); if(!d.length) return msg(L("w_none")); return rows(d.map(s=>row("🎬 "+esc(s.n),null,esc(s.net))),nOf(w)) }
  case "speed": { const s=W2.speedRes; return `<div class="hwico">📶</div>${s?`<div class="hwbig">${s.busy?"…":s.mbps.toFixed(1)}</div><div class="hwsub">${s.busy?esc(L("w_testing")):"Mbps · "+esc(fmtTime(new Date(s.at)))}</div>`:msg(L("w_testNow"))}` }
  case "album": { const l=(S.frames||[]).filter(u=>/^(file|content|https?):/.test(u)); if(!l.length) return msg(L("w_noPics"));
    const u=l[Math.floor(Date.now()/15000)%l.length]; return `<div class="w2pic" style="background-image:url('${esc(u)}')"></div>` }
  case "kids": { const k=S.profiles.find(p=>p.kids); const lim=k&&+(k.limit||0); if(!lim) return msg(L("w_noLimit"));
    const u=S.usage&&S.usage.d===new Date().toDateString()?S.usage:{m:0,bonus:0}; const left=Math.max(0,lim+(u.bonus||0)-(u.m||0));
    return `<div class="hwico">${esc(k.emoji||"🧒")}</div><div class="hwbig">${left}</div><div class="hwsub">${esc(L("w_min"))} ${esc(L("w_left"))}</div>` }
  case "occ": { const now=new Date(); now.setHours(0,0,0,0); const l=(S.occasions||[]).map(o=>{ let d=new Date(now.getFullYear(),o.m-1,o.d); if(d<now) d=new Date(now.getFullYear()+1,o.m-1,o.d); return {n:o.n,days:Math.round((d-now)/86400000)} }).sort((a,b)=>a.days-b.days);
    if(!l.length) return `<div class="hwico">🎂</div>${msg(L("w_addOcc"))}`; return rows(l.map(o=>row("🎂 "+esc(o.n),o.days?o.days+" "+esc(L("w_days")):esc(L("w_today")))),nOf(w)) }
  case "table": { const lg=S.tableLg||"egy.1"; const d=w2get("table:"+lg,6*3600000,async()=>{ const r=await A.fetchJSON(`https://site.api.espn.com/apis/v2/sports/soccer/${lg}/standings`);
      const ent=(((r.children||[])[0]||{}).standings||{}).entries||[]; return ent.map(e=>{ const st=k=>((e.stats||[]).find(s=>s.name===k)||{}).value; return {n:(e.team||{}).displayName||"",r:st("rank"),p:st("points"),g:st("gamesPlayed")} }).sort((a,b)=>a.r-b.r) });
    if(!d) return msg(L("w_load")); if(!d.length) return msg(L("w_none")); const n=w.sz>2?8:w.sz>1?5:3, fav=e=>teamFav({strHomeTeam:e.n,strAwayTeam:""});
    let l=d.slice(0,n); const f=d.find(fav); if(f&&l.indexOf(f)<0) l=l.slice(0,n-1).concat([f]);
    return rows(l.map(e=>row(`${e.r}. ${fav(e)?"<b>":""}${esc(e.n)}${fav(e)?"</b>":""}`,e.p,e.g!=null?e.g+(S.lang==="ar"?" ماتش":" GP"):null)),n) }
  case "air": { const loc=S.loc; if(!loc) return msg(L("w_load")); const d=w2get("air",3*3600000,async()=>{ const a=await A.fetchJSON(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${loc.lat}&longitude=${loc.lon}&current=us_aqi`);
      let wv=null; try{ const m=await A.fetchJSON("https://marine-api.open-meteo.com/v1/marine?latitude=31.25&longitude=29.95&current=wave_height"); wv=m.current&&m.current.wave_height }catch(_){}
      return {aqi:a.current&&a.current.us_aqi,wv} });
    if(!d) return msg(L("w_load")); const q=d.aqi, lab=q==null?"—":q<=50?L("w_good"):q<=100?L("w_mid"):L("w_bad");
    return rows([row("🌫 "+esc(L("w_aqi")),q==null?"—":q,esc(lab)),row("🌊 "+esc(L("w_waves"))+" (إسكندرية)",d.wv!=null?d.wv+" م":"—")],2) }
  } }catch(e){ return msg(L("w_none")) } return _hwBodyW2(w) };

// ---- OK on a widget
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w) return false;
  switch(w.t){
    case "tas": S.tasbih=(+S.tasbih||0)+1; renderHW(); return true;
    case "speed": { if(W2.speedRes&&W2.speedRes.busy) return true; W2.speedRes={busy:true}; renderHW(); const t0=Date.now(), N=5000000;
      A.fetchText("https://speed.cloudflare.com/__down?bytes="+N+"&r="+t0).then(x=>{ const s=(Date.now()-t0)/1000; W2.speedRes={mbps:(x.length*8/1e6)/s,at:Date.now()} },()=>{ W2.speedRes=null; A.toast(L("loadErr")) }).then(renderHW); return true }
    case "ch": { const l=S.favCh||[]; if(!l.length){ showPage("tv"); return true } dialog("📺 "+L("w_ch"),l.slice(0,40).map(c=>({label:c.name||c.url,fn:()=>play(c)}))); return true }
    case "radio": { const d=(W2.radio||{}).d||[]; if(!d.length) return true; dialog("🎵 "+L("w_radio"),d.map(s=>({label:s.name,fn:()=>play({name:"🎵 "+s.name,url:s.url,logo:s.logo})}))); return true }
    case "news": { const d=(W2.news||{}).d||[]; if(!d.length) return true; dialog("📰 "+L("w_news"),d.map(t=>({label:t,fn:()=>{}}))); return true }
    case "alarm": { const l=(S.alarms||[]).filter(a=>a.t>Date.now());
      dialog("⏰ "+L("w_alarm"),[{icon:"＋",label:L("w_addAlarm"),pri:1,fn:()=>setTimeout(()=>prompt2(L("w_what"),"",n=>{ if(!n) return; setTimeout(()=>prompt2(L("w_after"),"30",m=>{ const mm=parseInt(m)||0; if(!mm) return; S.alarms=(S.alarms||[]).filter(a=>a.t>Date.now()).concat([{n,t:Date.now()+mm*60000}]); renderHW() }),30) }),30)}]
        .concat(l.map((a,i)=>({icon:"🗑",label:`${a.n} · ${fmtTime(new Date(a.t))}`,fn:()=>{ S.alarms=l.filter((_,k)=>k!==i); renderHW() }})))); return true }
    case "occ": { const l=S.occasions||[];
      dialog("🎂 "+L("w_occ"),[{icon:"＋",label:L("w_addOcc"),pri:1,fn:()=>setTimeout(()=>prompt2(L("w_occName"),"",n=>{ if(!n) return; setTimeout(()=>prompt2(L("w_occDate"),"",v=>{ const p=String(v||"").split(/[\/\-. ]/).map(x=>parseInt(x)); if(!(p[0]>=1&&p[0]<=31&&p[1]>=1&&p[1]<=12)) return A.toast("✗"); S.occasions=l.concat([{n,d:p[0],m:p[1]}]); renderHW() }),30) }),30)}]
        .concat(l.map((o,i)=>({icon:"🗑",label:`${o.n} · ${o.d}/${o.m}`,fn:()=>{ S.occasions=l.filter((_,k)=>k!==i); renderHW() }})))); return true }
    case "table": { const lg=[["egy.1","🇪🇬 الدوري المصري"],["ksa.1","🇸🇦 الدوري السعودي"],["eng.1","🏴 الإنجليزي"],["esp.1","🇪🇸 الإسباني"],["ita.1","🇮🇹 الإيطالي"],["ger.1","🇩🇪 الألماني"],["fra.1","🇫🇷 الفرنسي"],["tur.1","🇹🇷 التركي"]];
      dialog("🏆 "+L("w_league"),lg.map(([k,n])=>({label:n,pri:S.tableLg===k,fn:()=>{ S.tableLg=k; renderHW() }}))); return true }
  } return false });
// tasbih: long-press menu gets a reset; reminders fire as a banner (checked once a minute, also while another app is open: "alarm")
setInterval(()=>{ /* alarms */ const l=S.alarms||[]; if(!l.length) return; const now=Date.now(), due=l.filter(a=>a.t<=now&&a.t>now-120000);
  if(due.length){ due.forEach(a=>{ banner("⏰",a.n,fmtTime(new Date(a.t)),30000); if(typeof chime==="function") chime() }); S.alarms=l.filter(a=>a.t>now) } },30000);
const _hwMenuW2=hwMenu; hwMenu=function(id){ _hwMenuW2(id); const w=hwGet(id); if(!w||w.t!=="tas") return; const box=$("dbox"), items=box&&box._items, g=box&&box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  items.unshift({icon:"↺",label:L("w_reset"),fn:()=>{ S.tasbih=0; renderHW() }}); g.innerHTML=items.map((it,k)=>`<button class="btn f${it.pri?" pri":""}" data-di="${k}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };

// ================= Turn the TV off from the phone (home Wi-Fi) or from anywhere (Telegram: "اقفل التليفزيون" / "/off") =================
async function tvOff(){ try{ if(on("player")) stopPlayer(); if(window.stopRadio) stopRadio() }catch(e){}
  banner("📴",S.lang==="ar"?"التليفزيون هيقفل…":"Turning off…","",2000);
  await new Promise(r=>setTimeout(r,1500));
  // real standby (TV follows over HDMI-CEC) when Shizuku is running; otherwise the screen goes black
  if(typeof shz==="function"&&shz()==="ok"){ try{ await runShell("input keyevent 223"); return "ok" }catch(e){} }
  if(nat("sleepNow")) return "ok";
  $("blackout").classList.add("on"); return "black" }
window.tvOff=tvOff;
const _tgCmdOff=tgCmd; tgCmd=function(t){ if(/^\/?(off|اقفل التليفزيون|اقفل التلفزيون|اقفل الشاشة|قفل التليفزيون)$/i.test(String(t).trim())){ tvOff(); return "📴 ✅" } return _tgCmdOff.apply(this,arguments) };

// ================= ⚽ Match mode: your team's live match — score on Home, a pop-up on every goal even inside another app =================
const goalWatch={};
setInterval(()=>{ /* goalWatch */ if(typeof matches==="undefined"||!S.matchMode) return;
  const live=matches.filter(e=>teamFav(e)&&(evState(e)==="live"||(evState(e)==="ns"&&Math.abs(evTime(e)-Date.now())<10*60000)));
  live.forEach(async e=>{ if(!e._lg) return; try{
    const r=await A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${e._lg}/scoreboard`), ev=(r.events||[]).find(x=>"e"+x.id===e.idEvent); if(!ev) return;
    const c=(ev.competitions||[])[0]||{}, tm=c.competitors||[], h=tm.find(x=>x.homeAway==="home")||tm[0]||{}, a=tm.find(x=>x.homeAway==="away")||tm[1]||{}, st=((c.status||ev.status||{}).type)||{};
    const hs=+h.score||0, as=+a.score||0, key=hs+"-"+as, prev=goalWatch[e.idEvent];
    e.intHomeScore=hs; e.intAwayScore=as; e.strStatus=st.state==="post"?"FT":st.state==="pre"?"NS":"LIVE "+(st.shortDetail||"");
    const line=`${e.strHomeTeam} ${hs} - ${as} ${e.strAwayTeam}`;
    if(prev==null&&st.state==="in"&&!goalWatch["k"+e.idEvent]){ goalWatch["k"+e.idEvent]=1; notifyMatch("⚽ "+(S.lang==="ar"?"الماتش بدأ":"Kick-off"),line) }
    if(prev!=null&&prev!==key){ const who=hs>+prev.split("-")[0]?e.strHomeTeam:e.strAwayTeam; notifyMatch("⚽ "+(S.lang==="ar"?"جوووون! ":"GOAL! ")+who,line) }
    if(st.state==="post"&&!goalWatch["f"+e.idEvent]){ goalWatch["f"+e.idEvent]=1; notifyMatch("🏁 "+(S.lang==="ar"?"الماتش خلص":"Full time"),line) }
    goalWatch[e.idEvent]=key; if(!window.__bg) renderHW() }catch(_){} }) },60000);
function notifyMatch(title,line){ if(window.__bg){ nat("toast",title+"\n"+line); setTimeout(()=>nat("toast",title+"\n"+line),3500) } else { banner("⚽",title,line,12000); if(typeof chime==="function") chime() } }
Object.assign(DEF,{matchMode:true});

// ================= ⏰ Automatic day schedule =================
Object.assign(DEF,{schMorningRadio:false,schNightDim:true});
Object.assign(T.ar,{schTitle:"⏰ جدول تلقائي",schMorning:"🌅 الصبح: شغّل إذاعة القرآن أول مرة تفتح الرئيسية (من 6 لـ 10)",schNight:"🌙 بالليل الشاشة أهدى (من 11 بالليل لـ 6 الصبح)",schMatch:"⚽ وضع الماتش: تنبيه بكل جون لفرقك حتى وانت جوه تطبيق تاني"});
Object.assign(T.en,{schTitle:"⏰ Auto schedule",schMorning:"🌅 Morning: play Quran radio the first time Home opens (6–10)",schNight:"🌙 Night: dimmer screen (11 PM – 6 AM)",schMatch:"⚽ Match mode: a pop-up on every goal for your teams, even inside another app"});
let morningDone="";
function schedTick(){ const h=new Date().getHours(), day=new Date().toDateString();
  document.body.classList.toggle("nightdim",!!S.schNightDim&&(h>=23||h<6));
  if(S.schMorningRadio&&h>=6&&h<10&&morningDone!==day&&!window.__bg&&!on("player")&&document.querySelector("#home.on")){ morningDone=day;
    A.fetchJSON("https://mp3quran.net/api/v3/radios?language=ar").then(r=>{ const x=(r.radios||[]).find(s=>/الكريم|القرآن الكريم/.test(s.name))||(r.radios||[])[0]; if(x) play({name:"📻 "+x.name,url:x.url,logo:""}) },()=>{}) } }
setInterval(schedTick,60000); setTimeout(schedTick,4000);
const _onBgSch=window.onBg; window.onBg=function(b){ _onBgSch(b); if(!b) setTimeout(schedTick,500) };
// settings: the 3 switches live in the "Frame & sleep" group
const onoff2=(k)=>`<div class="inline"><button class="btn f${S[k]?" pri":""}" data-sch="${k}:1">${esc(L("on"))}</button><button class="btn f${!S[k]?" pri":""}" data-sch="${k}:0">${esc(L("off"))}</button></div>`;
groupSettings=(function(prev){ return function(){ const box=$("setScroll"); if(box&&!box.querySelector(".sgrp")&&!isKids()&&!$("schSec"))
    box.insertAdjacentHTML("beforeend",`<div class="sec" id="schSec"><h3>${esc(L("schTitle"))}</h3><div class="field"><label>${esc(L("schMatch"))}</label>${onoff2("matchMode")}</div><div class="field"><label>${esc(L("schMorning"))}</label>${onoff2("schMorningRadio")}</div><div class="field"><label>${esc(L("schNight"))}</label>${onoff2("schNightDim")}</div></div>`);
  return prev() } })(groupSettings);
SET_GROUPS[4][2].push("جدول تلقائي","Auto schedule");
activators.unshift(el=>{ if(!el.dataset||!el.dataset.sch) return false; const [k,v]=el.dataset.sch.split(":"); S[k]=v==="1"; schedTick(); renderSettings(); const e=document.querySelector(`[data-sch="${k}:${v}"]`); if(e) focus(e); return true });
