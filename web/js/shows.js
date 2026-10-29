// ================= Series tracker widget: latest aired episode (TVMaze), where I stopped, and the app I watch it on =================
Object.assign(DEF,{shows:[]});
Object.assign(T.ar,{hwShows:"مسلسلاتي",shAdd:"＋ تابع مسلسل",shName:"اسم المسلسل (عربي أو إنجليزي)",shApp:"بتتفرج عليه منين؟",shNone:"اضغط OK وضيف مسلسل بتتابعه",
  shLast:"آخر حلقة نزلت",shNext:"الجاية",shMine:"إنت وقفت عند",shEp:"حلقة",shNew:"جديد",shWatched:"✓ اتفرجت على الحلقة دي",shBack:"↩ رجّع حلقة",shOpen:"▶ افتح",shRemove:"🗑 بطّل متابعة",
  shManual:"ملقتش بيانات أونلاين — هتابعه معاك يدوي (إنت تحدد الحلقة)",shUpdated:"اتحدّث"});
Object.assign(T.en,{hwShows:"My shows",shAdd:"＋ Follow a show",shName:"Show name",shApp:"Which app do you watch it on?",shNone:"Press OK and add a show you follow",
  shLast:"Latest aired",shNext:"Next",shMine:"You stopped at",shEp:"ep",shNew:"NEW",shWatched:"✓ Watched this episode",shBack:"↩ One episode back",shOpen:"▶ Open",shRemove:"🗑 Unfollow",
  shManual:"No online data — tracking it manually (you set the episode)",shUpdated:"Updated"});
HW_TYPES.push(["shows","🎬","hwShows"]);
const epTag=e=>e?(e.season>1?`S${e.season}·E${e.number}`:`${L("shEp")} ${e.number}`):"";
async function showFetch(sh){
  try{ const r=await A.fetchJSON("https://api.tvmaze.com/singlesearch/shows?q="+encodeURIComponent(sh.q)+"&embed[]=previousepisode&embed[]=nextepisode");
    const em=r._embedded||{}, pe=em.previousepisode, ne=em.nextepisode;
    Object.assign(sh,{tv:r.id,name:r.name||sh.q,img:(r.image&&r.image.medium)||"",last:pe?{season:pe.season,number:pe.number,date:pe.airdate}:null,next:ne?{season:ne.season,number:ne.number,date:ne.airdate}:null,at:Date.now(),manual:false});
  }catch(e){ sh.manual=true; sh.at=Date.now() }
  return sh }
async function showsRefresh(force){ const l=(S.shows||[]).map(x=>Object.assign({},x)); let ch=false;
  for(const sh of l){ if(force||!sh.at||Date.now()-sh.at>6*3600000){ await showFetch(sh); ch=true } }
  if(ch){ S.shows=l; renderHW() } }
const behind=sh=>sh.last&&sh.mine?(sh.last.season>sh.mine.season||(sh.last.season===sh.mine.season&&sh.last.number>sh.mine.number)):!!sh.last;
const _hwBodySh=hwBody; hwBody=function(w){ if(w.t!=="shows") return _hwBodySh(w);
  const l=(S.shows||[]).slice(0,w.sz>2?4:w.sz>1?3:1); if(!l.length) return `<div class="hwico">🎬</div><div class="hwsub dim">${esc(L("shNone"))}</div>`;
  return `<div class="hwml">${l.map(sh=>`<div class="hwm"><span class="tn" style="text-align:start">${behind(sh)?`<b style="color:#ff5d5d;font-size:1.2vh">${esc(L("shNew"))}</b> `:""}${esc(sh.name||sh.q)}</span><b style="font-size:1.6vh">${sh.last?esc(epTag(sh.last)):sh.mine?esc(L("shEp"))+" "+sh.mine.number:"—"}</b></div>`).join("")}</div>` };
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w||w.t!=="shows") return false; showsMenu(); return true });
function showsMenu(){ const l=S.shows||[];
  dialog("🎬 "+L("hwShows"),l.map((sh,i)=>({icon:behind(sh)?"🔴":"🎬",label:`${sh.name||sh.q} — ${sh.last?L("shLast")+" "+epTag(sh.last):""}${sh.mine?" · "+L("shMine")+" "+epTag(sh.mine):""}`,fn:()=>setTimeout(()=>showMenu(i),30)}))
    .concat([{icon:"＋",label:L("shAdd"),pri:1,fn:()=>setTimeout(showAdd,30)}])) }
function showAdd(){ prompt2(L("shName"),"",async v=>{ if(!v) return; let sh={q:v,mine:null}; sh=await showFetch(sh);
  if(sh.manual) A.toast(L("shManual"));
  dialog(L("shApp"),visibleApps().slice(0,50).map(a=>({label:appName(a),fn:()=>{ sh.app=a.pkg; S.shows=(S.shows||[]).concat([sh]); if(!hwHas("shows")) hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}])); else renderHW() }}))) }) }
function showMenu(i){ const l=(S.shows||[]).map(x=>Object.assign({},x)), sh=l[i]; if(!sh) return;
  const save=()=>{ S.shows=l; renderHW(); setTimeout(()=>showMenu(i),30) };
  const step=d=>{ let m=sh.mine||(sh.last?{season:sh.last.season,number:0}:{season:1,number:0}); m={season:m.season,number:Math.max(0,m.number+d)}; sh.mine=m; save() };
  const app=sh.app&&byPkg(sh.app);
  dialog(`🎬 ${sh.name||sh.q}`,[
    {icon:"▶",label:L("shOpen")+(app?" "+appName(app):""),pri:1,fn:()=>{ if(app) launch(app.pkg) }},
    {icon:"✓",label:L("shWatched")+(sh.mine?` (${L("shEp")} ${sh.mine.number+1})`:""),keep:1,fn:()=>step(1)},
    {icon:"↩",label:L("shBack"),keep:1,fn:()=>step(-1)},
    {icon:"📱",label:L("shApp"),fn:()=>setTimeout(()=>dialog(L("shApp"),visibleApps().slice(0,50).map(a=>({label:appName(a),fn:()=>{ sh.app=a.pkg; S.shows=l }}))),30)},
    {icon:"🗑",label:L("shRemove"),fn:()=>{ l.splice(i,1); S.shows=l; renderHW() }},{label:L("done"),fn:()=>{}}],
    {sub:`${sh.last?L("shLast")+": "+epTag(sh.last)+" ("+sh.last.date+")":L("shManual")}${sh.next?" · "+L("shNext")+": "+epTag(sh.next)+" ("+sh.next.date+")":""}${sh.mine?" · "+L("shMine")+" "+epTag(sh.mine):""}`}) }
setTimeout(()=>showsRefresh(false),12000); setInterval(()=>showsRefresh(false),3600000);

// ---- series that air on YouTube (channel or playlist): real latest episode from the YouTube feed, opens the episode itself
Object.assign(T.ar,{shSrc:"المسلسل ده بيتعرض فين؟",shYt:"▶️ يوتيوب (لينك القناة أو قايمة الحلقات)",shApp2:"📱 تطبيق تاني (الأسطورة، أوسكار…)",shYtLink:"الصق لينك قايمة حلقات المسلسل أو القناة",shOpenEp:"▶ افتح آخر حلقة"});
Object.assign(T.en,{shSrc:"Where does this show air?",shYt:"▶️ YouTube (channel or episode playlist link)",shApp2:"📱 Another app",shYtLink:"Paste the episode playlist or channel link",shOpenEp:"▶ Open latest episode"});
async function ytShowFetch(sh){ try{
    const feed=sh.ytPl?"playlist_id="+sh.ytPl:"channel_id="+sh.ytCh;
    const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?"+feed), doc=new DOMParser().parseFromString(x,"text/xml"), e=doc.getElementsByTagName("entry")[0];
    if(e){ const g=t=>{ const n=e.getElementsByTagName(t)[0]; return n?n.textContent:"" };
      const title=g("title"), num=(title.match(/(?:الحلقة|حلقة|ep(?:isode)?\.?)\s*(\d+)/i)||title.match(/(\d+)\s*$/)||[])[1];
      sh.last={season:1,number:num?+num:0,date:(g("published")||"").slice(0,10),title,v:g("yt:videoId")} }
    sh.at=Date.now(); sh.manual=false }catch(e){ sh.at=Date.now() } return sh }
const _showFetchY=showFetch; showFetch=async function(sh){ if(sh.ytPl||sh.ytCh) return ytShowFetch(sh); return _showFetchY(sh) };
showAdd=function(){ prompt2(L("shName"),"",v=>{ if(!v) return;
  dialog(L("shSrc"),[
    {icon:"▶️",label:L("shYt"),pri:1,fn:()=>setTimeout(()=>prompt2(L("shYtLink"),"",async u=>{ if(!u) return; const sh={q:v,name:v,mine:null};
      const pl=u.match(/[?&]list=([\w-]+)/); if(pl) sh.ytPl=pl[1]; else { try{ const r=await ytResolve(u); if(r) sh.ytCh=r.id }catch(e){} }
      if(!sh.ytPl&&!sh.ytCh) return A.toast(L("ytBad"));
      sh.app=["com.google.android.youtube.tv","com.liskovsoft.smarttubetv","com.google.android.youtube"].find(p=>A.isInstalled(p))||"";
      await ytShowFetch(sh); S.shows=(S.shows||[]).concat([sh]); if(!hwHas("shows")) hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}])); else renderHW() },"https://youtube.com/playlist?list=…"),30)},
    {icon:"📱",label:L("shApp2"),fn:()=>setTimeout(async()=>{ let sh={q:v,mine:null}; sh=await _showFetchY(sh); if(sh.manual) A.toast(L("shManual"));
      dialog(L("shApp"),visibleApps().slice(0,50).map(a=>({label:appName(a),fn:()=>{ sh.app=a.pkg; S.shows=(S.shows||[]).concat([sh]); if(!hwHas("shows")) hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}])); else renderHW() }}))) },30)}]) }) };
// for YouTube shows: "open" plays the latest episode directly
const _showMenuY=showMenu; showMenu=function(i){ _showMenuY(i); const sh=(S.shows||[])[i]; if(!sh||!sh.last||!sh.last.v) return;
  const box=$("dbox"), items=box._items, g=box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  items.unshift({icon:"▶",label:L("shOpenEp")+(sh.last.title?": "+sh.last.title.slice(0,40):""),pri:1,fn:()=>openYt(sh.last.v)});
  g.innerHTML=items.map((it,k)=>`<button class="btn f${it.pri?" pri":""}" data-di="${k}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };

// ================= Follow a show 2.0: pick the right show from a list → pick the app → episodes counted by its air days =================
Object.assign(T.ar,{sh2Find:"بدوّر…",sh2Pick:"اختار المسلسل",sh2Typed:"✍️ استخدم الاسم زي ما كتبته",sh2Days:"بيتعرض إمتى؟",sh2Daily:"كل يوم",sh2Week5:"من السبت للأربع (5 أيام)",sh2Wk5b:"من الأحد للخميس",sh2Weekly:"مرة في الأسبوع",sh2LastEp:"آخر حلقة نزلت رقم كام؟",sh2Ep:"الحلقة",sh2Out:"نزلت",sh2Watch:"▶ افتح المسلسل في",sh2Days2:"🗓 أيام العرض",sh2Fix:"✏️ صحّح رقم آخر حلقة"});
Object.assign(T.en,{sh2Find:"Searching…",sh2Pick:"Pick the show",sh2Typed:"✍️ Use the name as typed",sh2Days:"When does it air?",sh2Daily:"Every day",sh2Week5:"Sat–Wed (5 days)",sh2Wk5b:"Sun–Thu",sh2Weekly:"Once a week",sh2LastEp:"Latest aired episode number?",sh2Ep:"Ep",sh2Out:"out",sh2Watch:"▶ Open the show in",sh2Days2:"🗓 Air days",sh2Fix:"✏️ Fix latest episode number"});
const VIDEO_APPS=/shahid|watchit|youtube|smarttube|netflix|osn|starz|tod|mbc|yango|vlc|kodi|stc|jawwy|anghami|wavo|weyyak|aflam|tv/i;
async function showSearch(q){ const out=[], seen={};
  const add=(name,sub,extra)=>{ const k=name.trim(); if(!k||seen[k]) return; seen[k]=1; out.push(Object.assign({name:k,sub:sub||""},extra||{})) };
  await Promise.all([
    A.fetchJSON("https://ar.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&srsearch="+encodeURIComponent(q+" مسلسل")).then(r=>{
      ((r.query||{}).search||[]).forEach(x=>{ const sn=String(x.snippet||"").replace(/<[^>]+>/g,""); if(/مسلسل/.test(x.title+sn)) add(x.title.replace(/\s*\((مسلسل|مسلسل تلفزيوني)[^)]*\)\s*/,""),(sn.match(/(20\d\d)/)||[])[1]||"") }) }).catch(()=>{}),
    A.fetchJSON("https://api.tvmaze.com/search/shows?q="+encodeURIComponent(q)).then(r=>{
      (r||[]).slice(0,10).forEach(x=>{ const s=x.show||{}; add(s.name,[(s.premiered||"").slice(0,4),s.status==="Running"?"🟢":""].filter(Boolean).join(" "),{tv:s.id,img:(s.image&&s.image.medium)||""}) }) }).catch(()=>{})]);
  // newest first (what's airing now on top)
  out.sort((a,b)=>(parseInt(b.sub)||0)-(parseInt(a.sub)||0));
  return out }
const DAYSETS={daily:[0,1,2,3,4,5,6],sw:[6,0,1,2,3],st:[0,1,2,3,4],weekly:null};
function airedSince(sh){ // episodes aired after the day the user told us the number
  if(!sh.days||!sh.base) return 0; const set=DAYSETS[sh.days]; let n=0; const d0=new Date(sh.base.d); d0.setHours(0,0,0,0);
  const today=new Date(); today.setHours(0,0,0,0);
  for(let t=d0.getTime()+86400000;t<=today.getTime();t+=86400000){ const wd=new Date(t).getDay(); if(set?set.indexOf(wd)>=0:wd===sh.base.wd) n++ } return n }
function schedLast(sh){ const n=sh.base?sh.base.n+airedSince(sh):0; return n?{season:1,number:n,date:new Date().toISOString().slice(0,10)}:null }
const _showFetch2=showFetch; showFetch=async function(sh){ if(sh.days){ sh.last=schedLast(sh); sh.manual=false; sh.at=Date.now(); return sh }
  if(sh.tv){ try{ const r=await A.fetchJSON("https://api.tvmaze.com/shows/"+sh.tv+"?embed[]=previousepisode&embed[]=nextepisode"), em=r._embedded||{}, pe=em.previousepisode, ne=em.nextepisode;
      Object.assign(sh,{img:(r.image&&r.image.medium)||sh.img||"",last:pe?{season:pe.season,number:pe.number,date:pe.airdate}:null,next:ne?{season:ne.season,number:ne.number,date:ne.airdate}:null,at:Date.now(),manual:false}); return sh }catch(e){} }
  return _showFetch2(sh) };
function pickApp(cb){ const l=visibleApps().slice().sort((a,b)=>(VIDEO_APPS.test(b.pkg+appName(b))?1:0)-(VIDEO_APPS.test(a.pkg+appName(a))?1:0));
  dialog(L("shApp"),l.slice(0,40).map(a=>({label:appName(a),fn:()=>cb(a.pkg)})),{grid:3}) }
function pickDays(cb){ dialog(L("sh2Days"),[["daily","sh2Daily"],["sw","sh2Week5"],["st","sh2Wk5b"],["weekly","sh2Weekly"]].map(([k,l])=>({label:L(l),fn:()=>cb(k)}))) }
function saveNewShow(sh){ S.shows=(S.shows||[]).concat([sh]); if(!hwHas("shows")) hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}])); else renderHW(); A.toast("🎬 "+sh.name) }
showAdd=function(){ prompt2(L("shName"),"",async v=>{ if(!v) return; A.toast(L("sh2Find"));
  const res=await showSearch(v);
  const go=pick=>setTimeout(()=>{ const sh={q:pick.name,name:pick.name,tv:pick.tv||null,img:pick.img||"",mine:null};
    pickApp(pkg=>{ sh.app=pkg; setTimeout(async()=>{
      if(sh.tv){ await showFetch(sh); if(sh.last) return saveNewShow(sh) }
      // no online episode data: the user says the latest number once, then it counts itself on the air days
      pickDays(days=>setTimeout(()=>prompt2(L("sh2LastEp"),"",n=>{ const d=new Date(); sh.days=days; sh.base={n:Math.max(0,parseInt(n)||0),d:d.toISOString(),wd:d.getDay()}; sh.tv=null; sh.last=schedLast(sh); sh.mine=sh.last?{season:1,number:sh.last.number}:null; saveNewShow(sh) },"12"),30)) },60) }) },30);
  dialog(L("sh2Pick"),res.slice(0,14).map(x=>({icon:x.img?"📺":"🎬",label:x.name+(x.sub?"  ·  "+x.sub:""),fn:()=>go(x)})).concat([{icon:"✍️",label:L("sh2Typed")+": "+v,fn:()=>go({name:v})}])) }) };
// the show menu: open right on the show inside its app, fix the number, change air days
const _showMenu2=showMenu; showMenu=function(i){ _showMenu2(i); const sh=(S.shows||[])[i]; if(!sh) return; const box=$("dbox"), items=box._items, g=box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  const app=sh.app&&byPkg(sh.app);
  if(app&&!(sh.last&&sh.last.v)){ const k=items.findIndex(it=>it.icon==="▶"); const it={icon:"▶",label:L("sh2Watch")+" "+appName(app),pri:1,fn:()=>{ if(!nat("searchInApp",app.pkg,sh.name||sh.q)) launch(app.pkg) }}; if(k>=0) items[k]=it; else items.unshift(it) }
  if(sh.days){ items.splice(items.length-1,0,
    {icon:"✏️",label:L("sh2Fix"),fn:()=>setTimeout(()=>prompt2(L("sh2LastEp"),String(sh.last?sh.last.number:""),n=>{ const l=(S.shows||[]).map(x=>Object.assign({},x)), d=new Date(); l[i].base={n:Math.max(0,parseInt(n)||0),d:d.toISOString(),wd:d.getDay()}; l[i].last=schedLast(l[i]); S.shows=l; renderHW() }),30)},
    {icon:"🗓",label:L("sh2Days2"),fn:()=>setTimeout(()=>pickDays(k=>{ const l=(S.shows||[]).map(x=>Object.assign({},x)); l[i].days=k; l[i].last=schedLast(l[i]); S.shows=l; renderHW() }),30)}) }
  g.innerHTML=items.map((it,k)=>`<button class="btn f${it.pri?" pri":""}" data-di="${k}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };
// scheduled shows: recount every time Home is drawn (cheap, no network)
const _hwBodySh2=hwBody; hwBody=function(w){ if(w.t==="shows"){ const l=S.shows||[]; let ch=false; l.forEach(sh=>{ if(sh.days){ const n=schedLast(sh); if(JSON.stringify(n&&n.number)!==JSON.stringify(sh.last&&sh.last.number)){ sh.last=n; ch=true } } }); if(ch) S.shows=l } return _hwBodySh2(w) };
