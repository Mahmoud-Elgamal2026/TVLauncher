// ================= ▶️ YouTube tab (your channels, by category) + new matches widget look =================
Object.assign(T.ar,{ytTab:"▶️ يوتيوب",ytLatest:"أحدث الحلقات",ytAll:"الكل",ytNoCat:"بدون تصنيف",ytToday:"النهارده",ytYday:"امبارح",ytWeek:"الأسبوع",ytOpenNew:"افتح الجديد",ytAddCh:"＋ ضيف قناة",
  ytCat:"🏷 التصنيف",ytNewCat:"＋ تصنيف جديد",ytCatName:"اسم التصنيف (مثلاً: سياسي، رعب)",ytRemCh:"🗑 شيل القناة",ytNoVids:"مفيش فيديوهات في الاختيار ده",ytNoCh:"ضيف قنوات يوتيوب بتتابعها",
  ytMarkSeen:"✓ اعتبرهم اتشافوا",agoM:"دقيقة",agoH:"ساعة",agoD:"يوم",mUp:"الماتشات الجاية",mfAll:"الكل",mfToday:"النهارده",mfWeek:"الأسبوع",mfDone:"انتهت",mUpd:"آخر تحديث",mNow:"دلوقتي"});
Object.assign(T.en,{ytTab:"▶️ YouTube",ytLatest:"Latest episodes",ytAll:"All",ytNoCat:"Uncategorised",ytToday:"Today",ytYday:"Yesterday",ytWeek:"This week",ytOpenNew:"Open new",ytAddCh:"＋ Add channel",
  ytCat:"🏷 Category",ytNewCat:"＋ New category",ytCatName:"Category name (e.g. Politics, Horror)",ytRemCh:"🗑 Remove channel",ytNoVids:"No videos for this choice",ytNoCh:"Add YouTube channels you follow",
  ytMarkSeen:"✓ Mark all as seen",agoM:"min",agoH:"h",agoD:"d",mUp:"Upcoming matches",mfAll:"All",mfToday:"Today",mfWeek:"Week",mfDone:"Finished",mUpd:"Updated",mNow:"just now"});

// time-ago in natural Arabic ("51 دقيقة"، "ساعتين"، "4 ساعات"، "امبارح")
function agoAr(ms){ const m=Math.max(1,Math.round(ms/60000)); if(S.lang!=="ar") return m<60?m+" min":m<1440?Math.round(m/60)+" h":Math.round(m/1440)+" d";
  if(m<60) return m===1?"دقيقة":m===2?"دقيقتين":m<=10?m+" دقايق":m+" دقيقة"; const h=Math.round(m/60);
  if(h<24) return h===1?"ساعة":h===2?"ساعتين":h<=10?h+" ساعات":h+" ساعة"; const d=Math.round(h/24); return d===1?"يوم":d===2?"يومين":d<=10?d+" أيام":d+" يوم" }
window.agoAr=agoAr;

// ---------------- ▶️ YouTube tab ----------------
(function(){ const st=document.querySelector('.tab[data-page="settings"]'); if(!st) return;
  const b=document.createElement("button"); b.className="tab f"; b.dataset.page="ytp"; b.setAttribute("data-i18n","ytTab"); b.textContent=L("ytTab"); st.parentNode.insertBefore(b,st);
  const sec=document.createElement("section"); sec.className="page"; sec.id="ytp"; sec.innerHTML=`<div class="scroll"><div class="ytpanel" id="ytpMain"></div></div>`; $("settings").parentNode.insertBefore(sec,$("settings")) })();
Object.assign(DEF,{ytSeen:{}});
let ytpVids=[], ytpAt=0, ytpBusy=false, ytpCat="", ytpTime="all";
async function ytpLoad(force){ const chs=S.ytCh||[]; if(!chs.length){ ytpVids=[]; return }
  if(ytpBusy||(!force&&Date.now()-ytpAt<20*60000&&ytpVids.length)) return; ytpBusy=true; const out=[];
  await Promise.all(chs.map(async c=>{ try{ const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+c.id), doc=new DOMParser().parseFromString(x,"text/xml"), ents=doc.getElementsByTagName("entry");
    for(let i=0;i<Math.min(10,ents.length);i++){ const e=ents[i], g=t=>{ const n=e.getElementsByTagName(t)[0]; return n?n.textContent:"" };
      out.push({v:g("yt:videoId"),title:g("title"),ch:c.name||g("name"),chId:c.id,cat:c.cat||"",at:Date.parse(g("published"))||0}) } }catch(e){} }));
  ytpVids=out.filter(v=>v.v).sort((a,b)=>b.at-a.at); ytpAt=Date.now(); ytpBusy=false }
const ytNew=v=>!(S.ytSeen||{})[v.v]&&Date.now()-v.at<3*86400000;
function ytpTimeOk(v){ const a=new Date(); a.setHours(0,0,0,0); const t=v.at;
  return ytpTime==="all"||(ytpTime==="today"&&t>=a.getTime())||(ytpTime==="yday"&&t>=a.getTime()-86400000&&t<a.getTime())||(ytpTime==="week"&&t>=Date.now()-7*86400000) }
function chip(label,n,attr,on){ return `<button class="ych f${on?" on":""}" ${attr}>${esc(label)}${n!=null?` <i>${n}</i>`:""}</button>` }
async function renderYtp(){ const m=$("ytpMain"); if(!m) return; const chs=S.ytCh||[];
  if(!chs.length){ m.innerHTML=`<div class="ytphead"><span class="ytpico">▶</span><b>${esc(L("ytLatest"))}</b></div><p class="hint">${esc(L("ytNoCh"))}</p><button class="btn f pri" id="ytpAdd">${esc(L("ytAddCh"))}</button>`; return }
  if(!ytpVids.length){ m.innerHTML=`<p class="hint">${esc(L("ytLoading"))}</p>`; await ytpLoad(false) }
  const cats=[...new Set(chs.map(c=>c.cat||""))], byCat=c=>ytpVids.filter(v=>(v.cat||"")===c), inCat=ytpVids.filter(v=>!ytpCat||(v.cat||"")===ytpCat), list=inCat.filter(ytpTimeOk);
  const a0=new Date(); a0.setHours(0,0,0,0); const cnt=f=>inCat.filter(f).length, newN=list.filter(ytNew).length;
  m.innerHTML=`<div class="ytphead"><span class="ytpico">▶</span><b>${esc(L("ytLatest"))}</b><i class="ytpn">${ytpVids.filter(ytNew).length}</i><span class="ytpsp"></span><button class="ych f" id="ytpAdd">${esc(L("ytAddCh"))}</button><button class="ych f" id="ytpRefresh">⟳</button></div>
    <div class="ychips">${chip(L("ytAll"),ytpVids.length,'data-ytc=""',!ytpCat)}${cats.filter(c=>c).map(c=>chip(c,byCat(c).length,`data-ytc="${esc(c)}"`,ytpCat===c)).join("")}${cats.includes("")&&cats.length>1?chip(L("ytNoCat"),byCat("").length,'data-ytc="__none"',ytpCat==="__none"):""}</div>
    <div class="ychips">${chip(L("ytAll"),inCat.length,'data-ytt="all"',ytpTime==="all")}${chip(L("ytToday"),cnt(v=>v.at>=a0.getTime()),'data-ytt="today"',ytpTime==="today")}${chip(L("ytYday"),cnt(v=>v.at>=a0.getTime()-86400000&&v.at<a0.getTime()),'data-ytt="yday"',ytpTime==="yday")}${chip(L("ytWeek"),cnt(v=>v.at>=Date.now()-7*86400000),'data-ytt="week"',ytpTime==="week")}</div>
    <div class="ytplist">${list.length?list.slice(0,40).map(v=>`<div class="ytprow f${ytNew(v)?" new":""}" tabindex="0" data-ytv="${esc(v.v)}" data-ytch="${esc(v.chId)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.v)}/mqdefault.jpg" alt=""><div><b>${esc(v.title)}</b><small>${esc(v.ch)} · ${esc(agoAr(Date.now()-v.at))}</small></div></div>`).join(""):`<p class="hint">${esc(L("ytNoVids"))}</p>`}</div>
    ${newN?`<button class="btn f pri ytpopen" id="ytpOpenNew">${esc(L("ytOpenNew"))} (${newN})</button>`:""}` }
// "uncategorised" chip uses a marker
const _ytpRender=renderYtp; renderYtp=async function(){ const real=ytpCat; if(real==="__none"){ ytpCat=""; const vs=ytpVids; ytpVids=vs.filter(v=>!v.cat); try{ await _ytpRender() }finally{ ytpVids=vs; ytpCat=real } return } return _ytpRender() };
pageHooks["ytp:enter"]=()=>{ renderYtp(); ytpLoad(false).then(renderYtp) };
function ytpFocus(sel){ setTimeout(()=>{ const e=document.querySelector(sel)||document.querySelector("#ytpMain .f"); if(e) focus(e) },30) }
activators.unshift(el=>{ const d=el.dataset||{};
  if(d.ytc!=null){ ytpCat=d.ytc; renderYtp().then(()=>ytpFocus(`[data-ytc="${d.ytc}"]`)); return true }
  if(d.ytt){ ytpTime=d.ytt; renderYtp().then(()=>ytpFocus(`[data-ytt="${d.ytt}"]`)); return true }
  if(d.ytv){ const s=Object.assign({},S.ytSeen||{}); s[d.ytv]=Date.now(); const ks=Object.keys(s); if(ks.length>600) ks.sort((a,b)=>s[a]-s[b]).slice(0,ks.length-500).forEach(k=>delete s[k]); S.ytSeen=s; openYt(d.ytv); return true }
  if(el.id==="ytpOpenNew"){ const v=ytpVids.filter(v=>(!ytpCat||v.cat===ytpCat)&&ytpTimeOk(v)&&ytNew(v)).sort((a,b)=>a.at-b.at)[0]; if(v){ const s=Object.assign({},S.ytSeen||{}); s[v.v]=Date.now(); S.ytSeen=s; openYt(v.v) } return true }
  if(el.id==="ytpAdd"){ ytAddDlg(); setTimeout(()=>{ ytpAt=0; ytpLoad(true).then(renderYtp) },8000); return true }
  if(el.id==="ytpRefresh"){ ytpLoad(true).then(renderYtp); return true }
  return false });
// long-press a video: category for its channel, remove the channel, mark all seen
optionHandlers.unshift(el=>{ const d=el.dataset||{}; if(!d.ytch) return false; const chs=(S.ytCh||[]).slice(), c=chs.find(x=>x.id===d.ytch); if(!c) return true;
  const cats=[...new Set(chs.map(x=>x.cat).filter(Boolean))];
  const setCat=v=>{ c.cat=v; S.ytCh=chs; ytpVids.forEach(x=>{ if(x.chId===c.id) x.cat=v }); renderYtp() };
  dialog("▶️ "+c.name,[{icon:"🏷",label:L("ytCat")+": "+(c.cat||L("ytNoCat")),pri:1,fn:()=>setTimeout(()=>dialog(L("ytCat"),cats.map(k=>({label:k,fn:()=>setCat(k)})).concat([{icon:"＋",label:L("ytNewCat"),fn:()=>setTimeout(()=>prompt2(L("ytCatName"),"",v=>{ if(v) setCat(v.trim()) }),30)},{label:L("ytNoCat"),fn:()=>setCat("")}]),{grid:3}),30)},
    {icon:"✓",label:L("ytMarkSeen"),fn:()=>{ const s=Object.assign({},S.ytSeen||{}); ytpVids.forEach(v=>s[v.v]=Date.now()); S.ytSeen=s; renderYtp() }},
    {icon:"🗑",label:L("ytRemCh"),fn:()=>{ S.ytCh=chs.filter(x=>x.id!==c.id); ytpVids=ytpVids.filter(x=>x.chId!==c.id); renderYtp() }},{label:L("done"),fn:()=>{}}]); return true });

// ---------------- ⚽ matches widget, new look: status chips, competition chips, two-line rows, last update ----------------
let mwAt=Date.now(); const _loadSportsMW=loadSports; loadSports=async function(){ const r=await _loadSportsMW.apply(this,arguments); mwAt=Date.now(); return r };
hwBody=(function(prev){ return function(w){ if(w.t!=="matches"||typeof matches==="undefined") return prev(w);
  const a0=new Date(); a0.setHours(0,0,0,0); const t0=a0.getTime(), t1=t0+86400000, tm=e=>+evTime(e)||0;
  const base=matches.filter(e=>!e._yday&&tm(e)>=t0&&(!w.comp||e._lg===w.comp));
  const today=base.filter(e=>tm(e)<t1), F={all:today,today:today.filter(e=>evState(e)!=="ft"),week:base.filter(e=>evState(e)!=="ft"),done:today.filter(e=>evState(e)==="ft")};
  const mf=w.mf||"today", lgs=[...new Set(F[mf].map(e=>e._lg))], lg=w.mlg&&lgs.includes(w.mlg)?w.mlg:"";
  let list=F[mf].filter(e=>!lg||e._lg===lg); const rk={live:0,ns:1,ft:2}; list.sort((a,b)=>(rk[evState(a)]-rk[evState(b)])||(evState(a)==="ft"?tm(b)-tm(a):tm(a)-tm(b)));
  const max=w.sz>2?7:w.sz>1?5:3, more=list.length-max; list=list.slice(0,max);
  const ch=(k,lab,n)=>`<button class="ych f${mf===k?" on":""}" data-mwf="${k}" data-mww="${esc(w.id)}">${esc(lab)} <i>${n}</i></button>`;
  const lc=(k,lab)=>`<button class="ych sm f${lg===k?" on":""}" data-mwl="${esc(k)}" data-mww="${esc(w.id)}">${esc(lab)}</button>`;
  const row=e=>{ const st=evState(e), fav=teamFav(e), left=tm(e)-Date.now();
    const when=st==="live"?`<span class="mlivet">● <span dir="ltr">${esc(liveMin(e)||L("live"))}</span></span>`:st==="ft"?`${e.intHomeScore||0} - ${e.intAwayScore||0}`:(left>0&&left<12*3600000?(S.lang==="ar"?"بعد ":"in ")+agoAr(left):dayLbl(e)+" "+fmtTime(evTime(e)));
    return `<div class="mwr f${fav?" mfav":""}" tabindex="0" data-mt="${esc(e.idEvent||"")}"><b>${fav?"⭐ ":""}${esc(teamAr(e.strHomeTeam))}${st==="live"?` <em>${e.intHomeScore||0} - ${e.intAwayScore||0}</em> `:" <i>×</i> "}${esc(teamAr(e.strAwayTeam))}</b><small>${esc(compName(e._lg))} · ${when}${tvName(e)?" · 📺 "+esc(tvName(e)):""}</small></div>` };
  return `<div class="mwh"><span class="mwico">⚽</span><b>${esc(w.comp?compName(w.comp):L("mUp"))}</b><span class="ytpsp"></span><button class="hwgear f" tabindex="0" data-hwgear="${esc(w.id)}">⚙️</button></div>
    <div class="ychips">${ch("all",L("mfAll"),F.all.length)}${ch("today",L("mfToday"),F.today.length)}${ch("week",L("mfWeek"),F.week.length)}${ch("done",L("mfDone"),F.done.length)}</div>
    ${!w.comp&&lgs.length>1?`<div class="ychips">${lc("",L("mfAll"))}${lgs.map(k=>lc(k,compName(k))).join("")}</div>`:""}
    <div class="mwl">${list.length?list.map(row).join(""):`<p class="hint">${esc(L("mNone"))}</p>`}${more>0?`<div class="mmore">＋ ${more}</div>`:""}</div>
    <div class="mwf"><span>${esc(L("mUpd"))} ${Date.now()-mwAt<90000?esc(L("mNow")):(S.lang==="ar"?"من ":"")+esc(agoAr(Date.now()-mwAt))}</span><button class="ych f" data-mwr="1">⟳</button></div>` } })(hwBody);
// the new look has its own header: hide the old title and gear line
hwCard=(function(prev){ return function(w){ let h=prev(w); if(w.t==="matches") h=h.replace('class="hw ','class="hw mwnew ').replace('class="hw f ','class="hw f mwnew '); return h } })(hwCard);
activators.unshift(el=>{ const d=el.dataset||{};
  if(d.mwf){ hwSet(d.mww,{mf:d.mwf,mlg:""}); setTimeout(()=>{ const e=document.querySelector(`[data-mwf="${d.mwf}"][data-mww="${d.mww}"]`); if(e) focus(e) },30); return true }
  if(d.mwl!=null&&d.mww){ hwSet(d.mww,{mlg:d.mwl}); setTimeout(()=>{ const e=document.querySelector(`[data-mwl="${d.mwl}"][data-mww="${d.mww}"]`); if(e) focus(e) },30); return true }
  if(d.mwr){ loadSports(); return true }
  return false });
Object.assign(TEAM_AR,{"como":"كومو","lens":"لانس","rc lens":"لانس","real betis":"ريال بيتيس","celta vigo":"سيلتا فيجو","girona":"جيرونا","real sociedad":"ريال سوسيداد","valencia":"فالنسيا","fiorentina":"فيورنتينا","bologna":"بولونيا","torino":"تورينو",
  "brighton & hove albion":"برايتون","west ham united":"وست هام","everton":"إيفرتون","fulham":"فولهام","crystal palace":"كريستال بالاس","brentford":"برينتفورد","nottingham forest":"نوتنجهام فورست","wolverhampton wanderers":"وولفرهامبتون","bournemouth":"بورنموث",
  "eintracht frankfurt":"فرانكفورت","vfl wolfsburg":"فولفسبورج","borussia monchengladbach":"مونشنجلادباخ","sc freiburg":"فرايبورج","nice":"نيس","rennes":"رين","club brugge":"كلوب بروج","celtic":"سيلتك","rangers":"رينجرز","olympiacos":"أولمبياكوس","red bull salzburg":"سالزبورج","dinamo zagreb":"دينامو زغرب",
  "zed fc":"زد","tala'ea el-gaish":"طلائع الجيش","talaea el gaish":"طلائع الجيش","el masry":"المصري","petrojet":"بتروجت","national bank":"البنك الأهلي","ghazl el-mahalla":"غزل المحلة"});
