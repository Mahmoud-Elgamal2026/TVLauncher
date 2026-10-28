// ================= Home widget board 2.0 =================
// Favorites + a board of real widgets the user adds, orders, sizes and styles from the remote.
// Long-press OK on any widget = its menu. Every widget fetches its data only while it is on the board.
Object.assign(DEF,{hw:[{id:"clock",t:"clock",sz:2,st:"glass"},{id:"prayer",t:"prayer",sz:2,st:"glass"},{id:"weather",t:"weather",sz:1,st:"glass"},{id:"boost",t:"boost",sz:1,st:"accent"}],ytCh:[],iconLook:"theme"});
const HWT={ar:{hwTitle:"الويدجت",hwAdd:"إضافة ويدجت",hwEdit:"تعديل الويدجت",hwClock:"الساعة",hwWeather:"الطقس",hwPrayer:"مواعيد الصلاة",hwMatches:"الماتشات",hwBoost:"تسريع الجهاز",
    hwMon:"مراقبة الجهاز",hwYt:"يوتيوب — قنواتي",hwAzkar:"ذكر",hwCal:"التقويم",hwNote:"ملاحظة",
    hwLeft:"حرّك يمين",hwRight:"حرّك شمال",hwSize:"الحجم",hwStyle:"الشكل",hwRemove:"شيل الويدجت",hwSettings:"إعدادات الويدجت",
    szS:"صغير",szM:"وسط",szL:"كبير",stGlass:"زجاجي",stSolid:"مصمت",stAccent:"ملوّن",stClear:"شفاف",stGrad:"متدرج",
    ytAdd:"إضافة قناة يوتيوب",ytAddPh:"لينك القناة أو @الاسم",ytNone:"ضيف قنوات يوتيوب بتتابعها (اضغط مطوّل ← إعدادات الويدجت)",ytBad:"ملقتش القناة",ytRem:"شيل",
    ytLoading:"بيجيب أحدث الفيديوهات…",mNone:"مفيش ماتشات النهارده",mLoad:"بيجيب الماتشات…",pLeft:"باقي",boostOk:"اضغط OK للتسريع",ramUsed:"رامات مستخدمة",
    noteEdit:"اكتب ملاحظتك",noteEmpty:"اضغط مطوّل ← إعدادات لكتابة ملاحظة",icLook:"شكل أيقونات التطبيقات",icTheme:"حسب الثيم",
    sh_wide:"عريض",sh_square:"مربع",sh_circle:"دائري",sh_poster:"بوستر",sh_icon:"أيقونة بس",fxLook:"حركة التحديد",fx_zoom:"تكبير",fx_lift:"رفع ولمعة",fx_ring:"إطار",fx_pop:"نطّة"},
  en:{hwTitle:"Widgets",hwAdd:"Add widget",hwEdit:"Edit widgets",hwClock:"Clock",hwWeather:"Weather",hwPrayer:"Prayer times",hwMatches:"Matches",hwBoost:"Boost",
    hwMon:"Device monitor",hwYt:"YouTube — my channels",hwAzkar:"Dhikr",hwCal:"Calendar",hwNote:"Note",
    hwLeft:"Move left",hwRight:"Move right",hwSize:"Size",hwStyle:"Style",hwRemove:"Remove widget",hwSettings:"Widget settings",
    szS:"Small",szM:"Medium",szL:"Large",stGlass:"Glass",stSolid:"Solid",stAccent:"Color",stClear:"Clear",stGrad:"Gradient",
    ytAdd:"Add YouTube channel",ytAddPh:"Channel link or @handle",ytNone:"Add YouTube channels you follow (long-press → widget settings)",ytBad:"Channel not found",ytRem:"Remove",
    ytLoading:"Fetching latest videos…",mNone:"No matches today",mLoad:"Loading matches…",pLeft:"in",boostOk:"Press OK to boost",ramUsed:"RAM used",
    noteEdit:"Write your note",noteEmpty:"Long-press → settings to write a note",icLook:"App icon look",icTheme:"By theme",
    sh_wide:"Wide",sh_square:"Square",sh_circle:"Round",sh_poster:"Poster",sh_icon:"Icon only",fxLook:"Focus effect",fx_zoom:"Zoom",fx_lift:"Lift & shine",fx_ring:"Ring",fx_pop:"Pop"}};
Object.keys(HWT).forEach(l=>Object.assign(T[l],HWT[l]));
const HW_TYPES=[["clock","🕒","hwClock"],["weather","⛅","hwWeather"],["prayer","🕌","hwPrayer"],["matches","⚽","hwMatches"],["boost","🚀","hwBoost"],["mon","📊","hwMon"],["yt","▶️","hwYt"],["azkar","📿","hwAzkar"],["cal","📅","hwCal"],["note","📝","hwNote"]];
const HW_STYLES=["glass","solid","accent","grad","clear"], HW_STNAME={glass:"stGlass",solid:"stSolid",accent:"stAccent",grad:"stGrad",clear:"stClear"};
const hwList=()=>Array.isArray(S.hw)?S.hw:[];
const hwSave=l=>{ S.hw=l.map(x=>Object.assign({},x)); renderHW() };
const hwGet=id=>hwList().find(w=>w.id===id);
const hwSet=(id,p)=>hwSave(hwList().map(w=>w.id===id?Object.assign({},w,p):w));
const hwHas=t=>hwList().some(w=>w.t===t);

// ---- board markup lives right under Favorites
(function(){ const fr=$("favRow"); if(!fr) return;
  const h=document.createElement("h2"); h.id="hwH"; fr.parentNode.insertBefore(h,fr.nextSibling);
  const b=document.createElement("div"); b.id="hwBoard"; b.className="hwboard"; h.parentNode.insertBefore(b,h.nextSibling);
  const yh=document.createElement("h2"); yh.id="ytH"; b.parentNode.insertBefore(yh,b.nextSibling);
  const yr=document.createElement("div"); yr.id="ytRow"; yr.className="row ytrow"; yh.parentNode.insertBefore(yr,yh.nextSibling);
})();

// ---- each widget's body
const p2=n=>String(n).padStart(2,"0");
function hwBody(w){
  const d=new Date();
  switch(w.t){
    case "clock": return `<div class="hwbig">${esc(fmtTime(d,w.sz>1))}</div><div class="hwsub">${esc(fmtDate(d))}</div>`;
    case "weather": { if(!weatherNow) return `<div class="hwico">⛅</div><div class="hwsub">…</div>`;
      const fc=(typeof forecast!=="undefined"?forecast:[]).slice(1,w.sz>2?5:w.sz>1?4:1);
      return `<div class="hwrow"><span class="hwico">${esc(weatherNow.i)}</span><span class="hwbig">${esc(weatherNow.t)}°</span></div><div class="hwsub">${esc(weatherNow.city||"")}</div>`+
        (w.sz>1&&fc.length?`<div class="hwfc">${fc.map(f=>`<span>${esc(f.d.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"short"}))}<b>${esc(WMO(f.c))}</b>${f.hi}°/${f.lo}°</span>`).join("")}</div>`:""); }
    case "prayer": { if(!S.prayerOn||typeof prayers==="undefined"||!prayers.length) return `<div class="hwico">🕌</div><div class="hwsub">…</div>`;
      const np=window.nextPrayer?nextPrayer():null; const names=L("prayers");
      let h=""; if(np){ const ms=np.t-d, hh=Math.floor(ms/3600000), mm=Math.floor(ms%3600000/60000);
        h=`<div class="hwsub">${esc(names[np.i])} · ${esc(fmtTime(np.t))}</div><div class="hwbig">${hh?hh+":"+p2(mm):mm+(S.lang==="ar"?" د":" min")}</div><div class="hwsub">${esc(L("pLeft"))}</div>` }
      if(w.sz>1) h+=`<div class="hwpt">${prayers.map((t,i)=>i===1?"":`<span class="${np&&np.i===i?"on":""}">${esc(names[i])}<b>${esc(fmtTime(t))}</b></span>`).join("")}</div>`;
      return h; }
    case "matches": { if(!S.sportsOn) S.sportsOn=true; const list=(typeof matches!=="undefined"?matches:[]);
      if(!list.length) return `<div class="hwico">⚽</div><div class="hwsub">${esc(L(sportsTried?"mNone":"mLoad"))}</div>`;
      const live=list.filter(e=>evState(e)==="live"), up=list.filter(e=>evState(e)==="ns"), done=list.filter(e=>evState(e)==="ft");
      const show=live.concat(up,done).slice(0,w.sz>2?5:w.sz>1?3:1);
      return `<div class="hwml">${show.map(e=>{ const st=evState(e);
        return `<div class="hwm"><span class="tn">${esc(e.strHomeTeam)}</span><b class="${st==="live"?"live":""}">${st==="ns"?esc(fmtTime(evTime(e))):(e.intHomeScore||0)+" - "+(e.intAwayScore||0)}</b><span class="tn">${esc(e.strAwayTeam)}</span></div>` }).join("")}</div>`; }
    case "boost": { let m={}; try{ m=JSON.parse(nat("memInfo")||"{}") }catch(e){}
      const pct=m.total?Math.round(100*(1-m.avail/m.total)):0;
      return `<div class="hwico">🚀</div><div class="hwbar"><i style="width:${pct}%"></i></div><div class="hwsub">${esc(L("ramUsed"))} ${pct}%</div>${w.sz>1?`<div class="hwsub dim">${esc(L("boostOk"))}</div>`:""}`; }
    case "mon": { if(typeof monRead==="function") monRead(); return `<div class="hwmon">${typeof monTxt!=="undefined"&&monTxt?monTxt:"…"}</div>`; }
    case "azkar": { const A_=typeof AZKAR_F!=="undefined"?AZKAR_F:["سبحان الله"]; return `<div class="hwzk">${esc(A_[Math.floor(Date.now()/30000)%A_.length])}</div>`; }
    case "cal": { const y=d.getFullYear(), m=d.getMonth(), first=new Date(y,m,1).getDay(), days=new Date(y,m+1,0).getDate();
      if(w.sz<2) return `<div class="hwbig">${d.getDate()}</div><div class="hwsub">${esc(d.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"long",month:"long"}))}</div>`;
      let c=""; for(let i=0;i<first;i++) c+="<i></i>"; for(let i=1;i<=days;i++) c+=`<i class="${i===d.getDate()?"on":""}">${i}</i>`;
      return `<div class="hwsub">${esc(d.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{month:"long",year:"numeric"}))}</div><div class="hwcal">${c}</div>`; }
    case "note": return w.text?`<div class="hwnote">${esc(w.text)}</div>`:`<div class="hwico">📝</div><div class="hwsub dim">${esc(L("noteEmpty"))}</div>`;
    case "yt": return `<div class="hwico">▶️</div><div class="hwsub">${esc(L("hwYt"))}</div><div class="hwsub dim">${(S.ytCh||[]).length?(S.ytCh||[]).map(c=>esc(c.name)).join(" · "):esc(L("ytNone"))}</div>`;
  }
  return "";
}
function hwCard(w){ const t=HW_TYPES.find(x=>x[0]===w.t)||[w.t,"",""];
  return `<div class="hw f hw-${esc(w.t)} sz${w.sz||1} st-${esc(w.st||"glass")}" tabindex="0" data-hw="${esc(w.id)}"><div class="hwt">${esc(t[1])} ${esc(L(t[2]))}</div><div class="hwb">${hwBody(w)}</div></div>` }
const addCard=()=>`<div class="hw f hwadd sz1 st-clear" tabindex="0" id="hwAddBtn"><div class="hwb"><div class="hwico">＋</div><div class="hwsub">${esc(L("hwAdd"))}</div></div></div>`;
function renderHW(){
  const b=$("hwBoard"); if(!b) return; const fk=focused&&focused.dataset&&focused.dataset.hw;
  const h=$("hwH"); if(h) h.textContent=L("hwTitle");
  b.innerHTML=hwList().filter(w=>w.t!=="yt"||w.sz).map(hwCard).join("")+addCard();
  if(fk){ const e=b.querySelector(`[data-hw="${fk}"]`); if(e) focus(e) }
  renderYt(); hwNeed();
}
// light live refresh: only widgets whose content changes, only while home is open
let hwTickN=0;
tickers.push(()=>{ if(!document.querySelector("#home.on")||on("frame")) return; hwTickN++;
  hwList().forEach(w=>{ if(w.t==="yt"||w.t==="note") return; if(w.t==="weather"&&hwTickN%6) return; if(w.t==="matches"&&hwTickN%12) return;
    const e=document.querySelector(`#hwBoard [data-hw="${w.id}"] .hwb`); if(e){ const html=hwBody(w); if(e.innerHTML!==html) e.innerHTML=html } }) });
// data each widget needs, fetched only when that widget is on the board
let sportsTried=false;
function hwNeed(){
  if(hwHas("matches")&&!sportsTried){ sportsTried=true; S.sportsOn=true; loadSports().then(()=>renderHW()) }
  if(hwHas("weather")&&!weatherNow&&typeof weather==="function") setTimeout(weather,500);
  if(hwHas("weather")&&typeof loadForecast==="function"&&typeof forecast!=="undefined"&&!forecast.length) setTimeout(()=>loadForecast().then(()=>renderHW()),1500);
  if(hwHas("prayer")&&!S.prayerOn){ S.prayerOn=true; if(typeof computePrayers==="function") computePrayers() }
  if(hwHas("yt")) ytLoad(false);
}

// ---- YouTube: latest videos of followed channels (public RSS, no account)
let ytVids=[], ytAt=0, ytBusy=false;
async function ytResolve(input){
  input=input.trim(); let m=input.match(/(UC[\w-]{22})/); if(m) return {id:m[1]};
  let url=input; if(/^@/.test(url)) url="https://www.youtube.com/"+url; else if(!/^https?:/.test(url)) url="https://www.youtube.com/@"+url.replace(/\s+/g,"");
  const html=await A.fetchText(url); m=html.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/)||html.match(/channel\/(UC[\w-]{22})/);
  const n=html.match(/<meta property="og:title" content="([^"]+)"/);
  return m?{id:m[1],name:n?n[1]:""}:null;
}
async function ytLoad(force){
  const chs=S.ytCh||[]; if(!chs.length){ ytVids=[]; renderYt(); return }
  if(ytBusy||(!force&&Date.now()-ytAt<30*60000&&ytVids.length)) return; ytBusy=true;
  const out=[];
  await Promise.all(chs.map(async c=>{ try{
    const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+c.id);
    const doc=new DOMParser().parseFromString(x,"text/xml"), ents=doc.getElementsByTagName("entry");
    for(let i=0;i<Math.min(6,ents.length);i++){ const e=ents[i], g=t=>{ const n=e.getElementsByTagName(t)[0]; return n?n.textContent:"" };
      out.push({v:g("yt:videoId"),title:g("title"),ch:c.name||g("name"),at:Date.parse(g("published"))||0}) }
  }catch(e){} }));
  ytVids=out.filter(v=>v.v).sort((a,b)=>b.at-a.at).slice(0,24); ytAt=Date.now(); ytBusy=false; renderYt();
}
const ago=t=>{ const m=Math.max(1,Math.round((Date.now()-t)/60000)); if(m<60) return m+(S.lang==="ar"?" د":"m"); const h=Math.round(m/60); if(h<48) return h+(S.lang==="ar"?" س":"h"); return Math.round(h/24)+(S.lang==="ar"?" يوم":"d") };
function renderYt(){
  const r=$("ytRow"), h=$("ytH"); if(!r) return; const w=hwList().find(x=>x.t==="yt");
  if(!w){ r.style.display="none"; h.style.display="none"; r.innerHTML=""; return }
  r.style.display=""; h.style.display=""; h.textContent="▶️ "+L("hwYt");
  if(!(S.ytCh||[]).length){ r.innerHTML=`<div class="yv f ytempty" tabindex="0" data-hw="${esc(w.id)}"><div class="ytt">${esc(L("ytNone"))}</div></div>`; return }
  if(!ytVids.length){ r.innerHTML=`<div class="yv f ytempty" tabindex="0" data-hw="${esc(w.id)}"><div class="ytt">${esc(L("ytLoading"))}</div></div>`; return }
  r.innerHTML=ytVids.map(v=>`<div class="yv f" tabindex="0" data-yv="${esc(v.v)}" data-hw="${esc(w.id)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.v)}/mqdefault.jpg" alt=""><div class="ytt">${esc(v.title)}</div><div class="ytc">${esc(v.ch)} · ${esc(ago(v.at))}</div></div>`).join("");
}
function openYt(id){ const tv=["com.google.android.youtube.tv","com.google.android.youtube.tvkids","com.liskovsoft.smarttubetv","com.teamsmart.videomanager.tv","com.google.android.youtube"];
  const p=tv.find(x=>A.isInstalled(x)); if(NA&&NA.openUri){ nat("openUri","https://www.youtube.com/watch?v="+id) } else if(p) launch(p) }

// ---- OK / long-press OK
activators.push(el=>{
  if(el.id==="hwAddBtn"){ hwAddMenu(); return true }
  if(el.dataset.yv){ openYt(el.dataset.yv); return true }
  if(el.dataset.hw){ const w=hwGet(el.dataset.hw); if(!w) return true;
    if(w.t==="boost"){ boostNow(); setTimeout(renderHW,2500) }
    else if(w.t==="matches"){ if(!S.simple) { showPage("sports"); focus(document.querySelector('.tab[data-page="sports"]')) } else hwMatchesDialog() }
    else if(w.t==="yt"||w.t==="note") hwSettings(w);
    else hwMenu(w.id);
    return true }
  return false });
optionHandlers.unshift(el=>{ if(el.dataset&&el.dataset.hw){ hwMenu(el.dataset.hw); return true } if(el.id==="hwAddBtn"){ hwAddMenu(); return true } return false });
function hwMatchesDialog(){ const list=(typeof matches!=="undefined"?matches:[]);
  dialog("⚽ "+L("hwMatches"),list.length?list.map(e=>({label:`${e.strHomeTeam} ${evState(e)==="ns"?fmtTime(evTime(e)):(e.intHomeScore||0)+"-"+(e.intAwayScore||0)} ${e.strAwayTeam}`,fn:()=>{}})):[{label:L("mNone"),fn:()=>{}}]) }
function hwAddMenu(){
  dialog("🧩 "+L("hwAdd"),HW_TYPES.map(t=>({icon:t[1],label:L(t[2])+(hwHas(t[0])&&t[0]!=="note"?" ✓":""),fn:()=>{
    if(hwHas(t[0])&&t[0]!=="note") return; const id=t[0]+(t[0]==="note"?Date.now()%100000:"");
    hwSave(hwList().concat([{id,t:t[0],sz:t[0]==="clock"||t[0]==="prayer"||t[0]==="matches"?2:1,st:"glass"}]));
    setTimeout(()=>{ const e=document.querySelector(`#hwBoard [data-hw="${id}"]`)||document.querySelector("#ytRow .f"); if(e) focus(e) },60) }})),{grid:3,sub:L("hwEdit")});
}
function hwMenu(id){
  const w=hwGet(id); if(!w) return; const t=HW_TYPES.find(x=>x[0]===w.t)||[w.t,"",""], l=hwList(), i=l.findIndex(x=>x.id===id);
  const swap=d=>{ const j=i+d; if(j<0||j>=l.length) return; const n=l.slice(); const tmp=n[i]; n[i]=n[j]; n[j]=tmp; hwSave(n); setTimeout(()=>{ const e=document.querySelector(`#hwBoard [data-hw="${id}"]`); if(e) focus(e); hwMenu(id) },40) };
  const rtl=document.documentElement.dir==="rtl";
  const items=[];
  if(w.t!=="yt") items.push({icon:rtl?"➡️":"⬅️",label:L("hwLeft"),keep:1,fn:()=>swap(-1)},{icon:rtl?"⬅️":"➡️",label:L("hwRight"),keep:1,fn:()=>swap(1)},
    {icon:"📏",label:L("hwSize")+": "+L(["szS","szM","szL"][(w.sz||1)-1]),keep:1,fn:()=>{ hwSet(id,{sz:(w.sz||1)%3+1}); setTimeout(()=>hwMenu(id),40) }},
    {icon:"🎨",label:L("hwStyle")+": "+L(HW_STNAME[w.st||"glass"]),keep:1,fn:()=>{ const s=HW_STYLES[(HW_STYLES.indexOf(w.st||"glass")+1)%HW_STYLES.length]; hwSet(id,{st:s}); setTimeout(()=>hwMenu(id),40) }});
  if(w.t==="yt"||w.t==="note"||w.t==="matches") items.push({icon:"⚙️",label:L("hwSettings"),fn:()=>setTimeout(()=>hwSettings(w),30)});
  items.push({icon:"🗑",label:L("hwRemove"),fn:()=>hwSave(hwList().filter(x=>x.id!==id))},{icon:"＋",label:L("hwAdd"),fn:()=>setTimeout(hwAddMenu,30)},{label:L("done"),fn:()=>{}});
  dialog(t[1]+" "+L(t[2]),items,{grid:3});
}
function hwSettings(w){
  if(w.t==="note") return prompt2(L("noteEdit"),w.text||"",v=>hwSet(w.id,{text:v}));
  if(w.t==="matches") return (typeof sportsMenu==="function"?sportsMenu():(showPage("settings"),renderSettings()));
  if(w.t==="yt"){ const chs=S.ytCh||[];
    dialog("▶️ "+L("hwYt"),[{icon:"＋",label:L("ytAdd"),pri:1,fn:()=>setTimeout(ytAddDlg,30)}].concat(chs.map(c=>({icon:"🗑",label:L("ytRem")+": "+c.name,fn:()=>{ S.ytCh=chs.filter(x=>x.id!==c.id); ytAt=0; ytLoad(true); setTimeout(()=>hwSettings(w),30) }}))).concat([{label:L("done"),fn:()=>{}}])) }
}
function ytAddDlg(){ prompt2(L("ytAdd"),"",async v=>{ if(!v) return; try{ const r=await ytResolve(v); if(!r){ A.toast(L("ytBad")); return }
  if(!r.name){ try{ const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+r.id); const m=x.match(/<title>([^<]+)<\/title>/); r.name=m?m[1]:r.id }catch(e){ r.name=r.id } }
  const chs=(S.ytCh||[]).filter(c=>c.id!==r.id); chs.push({id:r.id,name:r.name}); S.ytCh=chs; ytAt=0; await ytLoad(true); A.toast("▶️ "+r.name) }catch(e){ A.toast(L("ytBad")) } },L("ytAddPh")) }
setInterval(()=>{ if(hwHas("yt")&&document.querySelector("#home.on")) ytLoad(false) },10*60000);

// ---- render with the home screen
const _renderHomeHW=renderHome; renderHome=function(){ _renderHomeHW.apply(this,arguments); renderHW() }; window.renderHome=renderHome;

// ================= App icons that really change with the theme (shape + focus effect) =================
const THEME_ICON={apple:["wide","lift"],google:["wide","ring"],shield:["wide","pop"],bravia:["square","ring"],tizen:["square","lift"],smarthub:["circle","pop"],webos:["circle","lift"],webos22:["square","pop"],
  firetv:["wide","ring"],roku:["square","ring"],patchwall:["poster","lift"],xbox:["square","pop"],ps5:["icon","pop"],wmc:["wide","ring"],plex:["poster","lift"],kodi:["icon","ring"],classic:["wide","lift"],
  light:["square","lift"],neon:["circle","pop"],startpage:["icon","lift"],dock:["icon","pop"],amoled:["circle","ring"],ramadan:["circle","lift"],vidaa:["square","pop"]};
DEF.iconShape=""; DEF.iconFx="";
function applyIconLook(){
  const d=THEME_ICON[S.theme]||["wide","zoom"], shape=S.iconShape||d[0], fx=S.iconFx||d[1];
  document.body.dataset.fx=fx;
  const fr=$("favRow"); if(fr){ const st=((typeof lay==="function"&&lay().fav)||{}).st||{}; if(!st.shape) fr.setAttribute("data-wshape",shape==="wide"?"":shape); if(fr.getAttribute("data-wshape")==="") fr.removeAttribute("data-wshape") }
  document.querySelectorAll("#favRow .app").forEach(a=>{ a.__w=null; a.style.height="" }); if(window.__fixAspect) __fixAspect();
}
const _applyLookHW=applyLook; applyLook=function(){ _applyLookHW.apply(this,arguments); applyIconLook() };
const _applyWSHW=typeof applyWStyles==="function"?applyWStyles:null; if(_applyWSHW) applyWStyles=function(){ _applyWSHW.apply(this,arguments); applyIconLook() };
AFTER.iconShape=applyIconLook; AFTER.iconFx=applyIconLook;
const _lifeSetHW=window.lifeSettings; window.lifeSettings=function(){
  return sec("🧩 "+L("icLook"),field(L("icLook"),seg("iconShape",[["",L("icTheme")],["wide",L("sh_wide")],["square",L("sh_square")],["circle",L("sh_circle")],["poster",L("sh_poster")],["icon",L("sh_icon")]]))
    +field(L("fxLook"),seg("iconFx",[["",L("icTheme")],["zoom",L("fx_zoom")],["lift",L("fx_lift")],["ring",L("fx_ring")],["pop",L("fx_pop")]])))+(_lifeSetHW?_lifeSetHW():"") };
setTimeout(()=>{ applyIconLook(); renderHW() },0);

// ================= Easy control: ready-made layouts + a visual edit mode =================
Object.assign(T.ar,{hwPresets:"قوالب جاهزة",hwEditMode:"✏️ ترتيب",pIslam:"🕌 إسلامي",pSport:"⚽ رياضة",pFull:"✨ كامل",pMin:"🪶 بسيط",pFamily:"👨‍👩‍👧 العيلة",
  edHint:"اختار ويدجت ودوس OK عشان تمسكها",edHold:"⬅️➡️ حرّك · ⬆️ كبّر · ⬇️ صغّر · 5 غيّر الشكل · 0 امسح · OK سيب",edDone:"Back للخروج من الترتيب"});
Object.assign(T.en,{hwPresets:"Ready layouts",hwEditMode:"✏️ Arrange",pIslam:"🕌 Islamic",pSport:"⚽ Sports",pFull:"✨ Full",pMin:"🪶 Minimal",pFamily:"👨‍👩‍👧 Family",
  edHint:"Pick a widget and press OK to grab it",edHold:"⬅️➡️ move · ⬆️ bigger · ⬇️ smaller · 5 style · 0 delete · OK drop",edDone:"Back to finish"});
const W_=(t,sz,st)=>({id:t,t,sz,st:st||"glass"});
const HW_PRESETS={
  pIslam:[W_("prayer",3,"grad"),W_("wird",2),W_("clock",1),W_("azkar",2),W_("cal",1)],
  pSport:[W_("matches",3,"accent"),W_("clock",1),W_("weather",2)],
  pFull:[W_("clock",2),W_("prayer",2),W_("weather",1),W_("matches",2),W_("boost",1,"accent"),W_("wird",2),W_("yt",1)],
  pMin:[W_("clock",2),W_("weather",1)],
  pFamily:[W_("clock",2),W_("weather",2),W_("prayer",2),W_("cal",1),W_("note",2)]};
function hwPresetMenu(){ dialog("🎛 "+L("hwPresets"),Object.keys(HW_PRESETS).map(k=>({label:L(k)+" — "+HW_PRESETS[k].map(w=>(HW_TYPES.find(t=>t[0]===w.t)||[0,""])[1]).join(" "),fn:()=>{ hwSave(HW_PRESETS[k]); setTimeout(()=>{ const e=document.querySelector("#hwBoard .hw"); if(e) focus(e) },60) }}))) }
// toolbar next to the board title
function hwToolbar(){ const h=$("hwH"); if(!h) return;
  h.innerHTML=`${esc(L("hwTitle"))} <span class="hwtools"><button class="btn sm f" id="hwEditBtn">${esc(L("hwEditMode"))}</button><button class="btn sm f" id="hwPresetBtn">🎛 ${esc(L("hwPresets"))}</button><button class="btn sm f" id="hwAddBtn2">＋ ${esc(L("hwAdd"))}</button></span>` }
const _renderHWE=renderHW; renderHW=function(){ _renderHWE.apply(this,arguments); hwToolbar(); document.body.classList.toggle("hwedit",hwEdit.on); if(hwEdit.grab){ const e=document.querySelector(`#hwBoard [data-hw="${hwEdit.grab}"]`); if(e){ e.classList.add("grabbed"); focus(e) } } };
const hwEdit={on:false,grab:null};
function hwEditStart(){ hwEdit.on=true; hwEdit.grab=null; renderHW(); const e=document.querySelector("#hwBoard .hw"); if(e) focus(e); banner("✏️",L("edHint"),L("edDone"),600000) }
function hwEditEnd(){ hwEdit.on=false; hwEdit.grab=null; $("banners").innerHTML=""; renderHW(); const b=$("hwEditBtn"); if(b) focus(b) }
activators.unshift(el=>{ if(el.id==="hwEditBtn"){ hwEditStart(); return true } if(el.id==="hwPresetBtn"){ hwPresetMenu(); return true } if(el.id==="hwAddBtn2"){ hwAddMenu(); return true } return false });
layers.unshift({test:()=>hwEdit.on&&!on("dlg"),ownsEnter:true,key:e=>{
  const k=e.key, l=hwList(); if(e.preventDefault) e.preventDefault();
  if(isBack(k)){ if(hwEdit.grab){ hwEdit.grab=null; renderHW(); banner("✏️",L("edHint"),L("edDone"),600000) } else hwEditEnd(); return true }
  const id=focused&&focused.dataset&&focused.dataset.hw;
  if(k==="Enter"||e.keyCode===13||e.keyCode===23){ held=true; if(!id) return true;
    if(hwEdit.grab){ hwEdit.grab=null; banner("✏️",L("edHint"),L("edDone"),600000) } else { hwEdit.grab=id; banner("✋",L("edHold"),"",600000) } renderHW(); return true }
  if(!hwEdit.grab) return false;   // not holding anything: normal navigation
  const i=l.findIndex(w=>w.id===hwEdit.grab), w=l[i]; if(i<0) return true;
  const rtl=document.documentElement.dir==="rtl";
  if(k==="ArrowLeft"||k==="ArrowRight"){ const d=(k==="ArrowRight")!==rtl?1:-1, j=i+d; if(j>=0&&j<l.length){ const n=l.slice(); n[i]=n[j]; n[j]=w; hwSave(n) } }
  else if(k==="ArrowUp") hwSet(w.id,{sz:Math.min(3,(w.sz||1)+1)});
  else if(k==="ArrowDown") hwSet(w.id,{sz:Math.max(1,(w.sz||1)-1)});
  else if(k==="5") hwSet(w.id,{st:HW_STYLES[(HW_STYLES.indexOf(w.st||"glass")+1)%HW_STYLES.length]});
  else if(k==="0"){ hwEdit.grab=null; hwSave(l.filter(x=>x.id!==w.id)) }
  return true }});
