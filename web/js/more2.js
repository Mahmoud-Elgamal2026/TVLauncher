// ================= Quran radio, Arabic cartoons, Islamic events countdown, morning/evening azkar =================
Object.assign(T.ar,{libRadio:"إذاعات القرآن مباشر",libKidsAr:"كرتون عربي",hwEvents:"المناسبات الجاية",hwAzkarA:"أذكار الصباح والمساء",azM:"أذكار الصباح",azE:"أذكار المساء",
  evRamadan:"رمضان",evEidF:"عيد الفطر",evArafa:"يوم عرفة",evEidA:"عيد الأضحى",evHijri:"رأس السنة الهجرية",evMawlid:"المولد النبوي",evAshura:"عاشوراء",days:"يوم",today:"النهارده"});
Object.assign(T.en,{libRadio:"Live Quran radio",libKidsAr:"Arabic cartoons",hwEvents:"Upcoming occasions",hwAzkarA:"Morning & evening azkar",azM:"Morning azkar",azE:"Evening azkar",
  evRamadan:"Ramadan",evEidF:"Eid al-Fitr",evArafa:"Arafah day",evEidA:"Eid al-Adha",evHijri:"Islamic new year",evMawlid:"Mawlid",evAshura:"Ashura",days:"days",today:"Today"});

// ---- 1) live Quran radio stations (mp3quran.net)
LIB_CATS.splice(1,0,["radio","📻",null],["kidsar","🧸",'mediatype:movies AND (title:(كرتون OR سبيستون OR "افلام كرتون" OR "مدبلج") OR subject:(كرتون OR سبيستون OR "spacetoon")) AND NOT title:(تريلر OR اعلان)']);
LIBN.radio="libRadio"; LIBN.kidsar="libKidsAr";
let qRadios=null;
const _renderLibR=renderLib; renderLib=async function(){
  if(libCat!=="radio") return _renderLibR.apply(this,arguments);
  $("libCats").innerHTML=libCatsHtml();
  if(!qRadios){ libMsg(L("libLoading")); try{ const r=await A.fetchJSON("https://mp3quran.net/api/v3/radios?language="+(S.lang==="ar"?"ar":"eng")); qRadios=r.radios||[] }catch(e){ qRadios=null; return libMsg(L("loadErr")) } }
  $("libMain").innerHTML=`<div class="lbgrid small">${qRadios.map((x,i)=>libCard({attr:`data-qradio="${i}"`,icon:"📻",title:x.name})).join("")}</div>`;
};
activators.unshift(el=>{ if(el.dataset&&el.dataset.qradio!=null){ const x=(qRadios||[])[+el.dataset.qradio]; if(x) play({name:"📻 "+x.name,url:x.url,logo:""}); return true } return false });
// kids see the Arabic cartoons too
const _libCatsK=libCatsHtml; libCatsHtml=function(){ const h=_libCatsK(); if(!isKids()) return h;
  return h+`<div class="it f${libCat==="kidsar"?" on":""}" tabindex="0" data-libcat="kidsar">🧸 ${esc(L("libKidsAr"))}</div>` };

// ---- 2) widget: countdown to the next Islamic occasions
const EVENTS=[[9,1,"evRamadan"],[10,1,"evEidF"],[12,9,"evArafa"],[12,10,"evEidA"],[1,1,"evHijri"],[1,10,"evAshura"],[3,12,"evMawlid"]];
let hijFmt=null;
function hijMD(dt){ try{ if(!hijFmt) hijFmt=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn",{month:"numeric",day:"numeric"});
  const p=hijFmt.format(new Date(dt.getTime()+(+S.hijriAdj||0)*86400000)).match(/(\d+)\D+(\d+)/); return p?{month:+p[1],day:+p[2]}:null }catch(e){ return null } }
function nextEvents(n){ const today=new Date().toDateString(); if(S.evC&&S.evC.d===today) return S.evC.l; const out=[], seen={};
  for(let d=0;d<400&&out.length<n;d++){ const dt=new Date(Date.now()+d*86400000), h=hijMD(dt); if(!h) break;
    const e=EVENTS.find(x=>x[0]===h.month&&x[1]===h.day); if(e&&!seen[e[2]]){ seen[e[2]]=1; out.push({k:e[2],d}) } }
  S.evC={d:today,l:out}; return out }
let evCache=null, evDay=-1;
HW_TYPES.push(["events","🌙","hwEvents"],["azkarA","🌅","hwAzkarA"]);
const _hwBodyE=hwBody; hwBody=function(w){
  if(w.t==="events"){ const today=Math.floor(Date.now()/86400000); if(evDay!==today){ evCache=nextEvents(4); evDay=today }
    const l=(evCache||[]).slice(0,w.sz>2?4:w.sz>1?3:1); if(!l.length) return `<div class="hwico">🌙</div>`;
    return `<div class="hwml">${l.map(e=>`<div class="hwm"><span class="tn" style="text-align:start">${esc(L(e.k))}</span><b>${e.d?e.d+" "+esc(L("days")):esc(L("today"))}</b></div>`).join("")}</div>` }
  if(w.t==="azkarA"){ const h=new Date().getHours(), m=h<15; return `<div class="hwico">${m?"🌅":"🌇"}</div><div class="hwsub">${esc(L(m?"azM":"azE"))}</div><div class="hwsub dim">OK ▶</div>` }
  return _hwBodyE(w) };
// ---- 3) widget: play morning/evening azkar (audio from the open archive)
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w||w.t!=="azkarA") return false;
  const m=new Date().getHours()<15; (async()=>{ try{
    const r=await A.fetchJSON("https://archive.org/advancedsearch.php?q="+encodeURIComponent(`title:("${m?"أذكار الصباح":"أذكار المساء"}") AND mediatype:audio`)+"&fl[]=identifier&sort[]=downloads+desc&rows=1&output=json");
    const d=((r.response||{}).docs||[])[0]; if(d) openArch(d.identifier); else A.toast(L("libEmpty")) }catch(e){ A.toast(L("loadErr")) } })(); return true });
// add the new widgets to the Islamic layout
if(typeof HW_PRESETS!=="undefined") HW_PRESETS.pIslam=HW_PRESETS.pIslam.concat([{id:"events",t:"events",sz:2,st:"glass"},{id:"azkarA",t:"azkarA",sz:1,st:"accent"}]);
