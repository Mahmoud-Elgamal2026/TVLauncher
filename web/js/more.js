// ================= One search for everything, library favorites, continue/live widgets, seasonal looks, kids library =================
Object.assign(DEF,{libFav:[],hwLive:null,seasonal:true,kidsLibFrom:8,kidsLibTo:20});
Object.assign(T.ar,{sLib:"📚 من المكتبة",sQuran:"📖 قرّاء",sFast:"📡 قنوات أفلام",libFavRow:"⭐ مفضلة المكتبة",favAdded:"اتضافت للمفضلة",favRemoved:"اتشالت من المفضلة",
  hwCont:"كمّل المشاهدة",hwLive:"قناة أفلام دلوقتي",liveNone:"اختار قناة: اضغط مطوّل ← إعدادات",livePick:"اختار قناة الويدجت",contNone:"مفيش حاجة تكمّلها",
  seasonal:"شكل المواسم تلقائي (رمضان والعيد)",eidG:"عيد مبارك 🎉",ramG:"رمضان كريم 🌙",kidsLibOff:"المكتبة مقفولة دلوقتي للأطفال",kidsLibTime:"وقت مكتبة الأطفال"});
Object.assign(T.en,{sLib:"📚 Library",sQuran:"📖 Reciters",sFast:"📡 Movie channels",libFavRow:"⭐ Library favorites",favAdded:"Added to favorites",favRemoved:"Removed from favorites",
  hwCont:"Continue watching",hwLive:"Movie channel now",liveNone:"Pick a channel: long-press → settings",livePick:"Pick the widget channel",contNone:"Nothing to continue",
  seasonal:"Seasonal look (Ramadan & Eid)",eidG:"Eid Mubarak 🎉",ramG:"Ramadan Kareem 🌙",kidsLibOff:"Library is closed for kids right now",kidsLibTime:"Kids library hours"});

// ---- 1) one search: apps/settings as before + library, reciters, movie channels
let gsT=null, gsSeq=0;
const _renderSearchM=renderSearch; renderSearch=function(){
  _renderSearchM.apply(this,arguments);
  const q=$("sInput").value.trim(); clearTimeout(gsT); if(q.length<2) return;
  const seq=++gsSeq; gsT=setTimeout(()=>globalSearch(q,seq),700);
};
async function globalSearch(q,seq){
  const box=$("sResults"), ql=q.toLowerCase(), add=h=>{ if(seq!==gsSeq) return; const e=box.querySelector(".empty"); if(e) e.remove(); box.insertAdjacentHTML("beforeend",h) };
  if(qReciters){ const r=qReciters.filter(x=>x.name.toLowerCase().indexOf(ql)>=0).slice(0,12);
    if(r.length) add(`<h2>${esc(L("sQuran"))}</h2><div class="row">${r.map(x=>libCard({attr:`data-reciter="${x.id}"`,icon:"🎙",title:x.name})).join("")}</div>`) }
  const fc=[]; Object.keys(libCache).filter(k=>k.indexOf("fast|")===0).forEach(k=>libCache[k].forEach((c,i)=>{ if(c.name.toLowerCase().indexOf(ql)>=0) fc.push({c,k,i}) }));
  if(fc.length) add(`<h2>${esc(L("sFast"))}</h2><div class="row">${fc.slice(0,12).map(x=>libCard({attr:`data-gsfast="${esc(x.k)}|${x.i}"`,img:x.c.logo,icon:"📡",title:x.c.name})).join("")}</div>`);
  if(isKids()) return;
  try{ const r=await A.fetchJSON("https://archive.org/advancedsearch.php?q="+encodeURIComponent(`title:(${q}) AND mediatype:(movies OR audio)`)+"&fl[]=identifier&fl[]=title&sort[]=downloads+desc&rows=24&output=json");
    const d=((r.response||{}).docs||[]).filter(x=>!libBlocked(Array.isArray(x.title)?x.title[0]:x.title));
    if(d.length) add(`<h2>${esc(L("sLib"))}</h2><div class="row">${d.map(x=>libCard({attr:`data-arch="${esc(x.identifier)}"`,img:"https://archive.org/services/img/"+x.identifier,title:Array.isArray(x.title)?x.title[0]:x.title})).join("")}</div>`) }catch(e){}
}
activators.unshift(el=>{ if(el.dataset&&el.dataset.gsfast){ const [k,i]=el.dataset.gsfast.split("|"), c=(libCache[k]||[])[+i]; if(c){ closeSearch(); play(c) } return true } return false });

// ---- 2) library favorites: long-press any library card; they show on the home screen
function favKey(el){ const d=el.dataset; return d.arch?"a:"+d.arch:d.reciter?"r:"+d.reciter:d.fastch!=null?"f:"+(((libCache["fast|"+FAST_SRC[fastSrc][1]]||[])[+d.fastch]||{}).url||""):d.gsfast?"f:"+((()=>{ const [k,i]=d.gsfast.split("|"); return ((libCache[k]||[])[+i]||{}).url||"" })()):"" }
optionHandlers.unshift(el=>{
  if(!el.classList||!el.classList.contains("lbc")) return false; const k=favKey(el); if(!k||k==="f:") return false;
  const l=S.libFav||[]; if(l.some(x=>x.k===k)){ S.libFav=l.filter(x=>x.k!==k); A.toast("☆ "+L("favRemoved")) }
  else { const img=(el.querySelector(".lbi")||{}).style; const bg=img&&img.backgroundImage?img.backgroundImage.replace(/^url\(["']?|["']?\)$/g,""):"";
    let extra={}; if(k.indexOf("f:")===0){ const src=el.dataset.gsfast?(()=>{ const [kk,i]=el.dataset.gsfast.split("|"); return (libCache[kk]||[])[+i] })():(libCache["fast|"+FAST_SRC[fastSrc][1]]||[])[+el.dataset.fastch]; if(src) extra={name:src.name,url:src.url,logo:src.logo} }
    S.libFav=[{k,title:(el.querySelector(".lbt")||{}).textContent||"",img:bg,extra}].concat(l).slice(0,40); A.toast("⭐ "+L("favAdded")) }
  renderLibFav(); return true });
(function(){ const b=$("ytRow")||$("hwBoard"); if(!b) return; const h=document.createElement("h2"); h.id="libFavH"; const r=document.createElement("div"); r.id="libFavRow"; r.className="row ytrow";
  b.parentNode.insertBefore(h,b.nextSibling); h.parentNode.insertBefore(r,h.nextSibling) })();
function renderLibFav(){ const r=$("libFavRow"), h=$("libFavH"); if(!r) return; const l=S.libFav||[];
  r.style.display=h.style.display=l.length?"":"none"; h.textContent=L("libFavRow");
  r.innerHTML=l.map(x=>{ const t=x.k.slice(0,1), id=x.k.slice(2);
    const attr=t==="a"?`data-arch="${esc(id)}"`:t==="r"?`data-reciter="${esc(id)}"`:`data-lfav="${esc(x.k)}"`;
    return libCard({attr,img:x.img,icon:t==="r"?"🎙":"📡",title:x.title}) }).join("") }
activators.unshift(el=>{ if(el.dataset&&el.dataset.lfav){ const x=(S.libFav||[]).find(f=>f.k===el.dataset.lfav); if(x&&x.extra&&x.extra.url) play({name:x.extra.name,url:x.extra.url,logo:x.extra.logo}); return true }
  if(el.dataset&&el.dataset.reciter&&!qReciters){ libCat="quran"; quranReciters().then(()=>quranSurahs(el.dataset.reciter)); return true } return false });

// ---- 3) + 4) two more widgets
HW_TYPES.push(["cont","⏯","hwCont"],["live","📡","hwLive"]);
const _hwBodyM=hwBody; hwBody=function(w){
  if(w.t==="cont"){ const l=(S.watch||[]).filter(x=>x.url).slice(0,w.sz>1?3:1); if(!l.length) return `<div class="hwico">⏯</div><div class="hwsub dim">${esc(L("contNone"))}</div>`;
    return `<div class="hwml">${l.map(x=>`<div class="hwm"><span class="tn" style="text-align:start">${esc(x.name)}</span><b>${x.dur?Math.round(100*x.pos/x.dur)+"%":""}</b></div>`).join("")}</div>` }
  if(w.t==="live"){ const c=S.hwLive; if(!c) return `<div class="hwico">📡</div><div class="hwsub dim">${esc(L("liveNone"))}</div>`;
    return `<div class="hwrow">${c.logo?`<img src="${esc(c.logo)}" style="max-height:8vh;max-width:45%;object-fit:contain" alt="">`:`<span class="hwico">📡</span>`}<span class="hwbig" style="font-size:2.6vh">${esc(c.name)}</span></div><div class="hwsub dim">OK ▶</div>` }
  return _hwBodyM(w) };
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w) return false;
  if(w.t==="cont"){ const l=(S.watch||[]).filter(x=>x.url).slice(0,5); if(!l.length) return true;
    if(l.length===1) play({name:l[0].name,url:l[0].url,logo:l[0].logo,kind:l[0].kind||"movie"});
    else dialog("⏯ "+L("hwCont"),l.map(x=>({label:x.name,fn:()=>play({name:x.name,url:x.url,logo:x.logo,kind:x.kind||"movie"})}))); return true }
  if(w.t==="live"){ if(S.hwLive) play(S.hwLive); else livePick(); return true }
  return false });
async function livePick(){ const k="fast|"+FAST_SRC[0][1]; let l=libCache[k];
  if(!l){ try{ l=parseM3U(await A.fetchText("https://raw.githubusercontent.com/BuddyChewChew/app-m3u-generator/main/playlists/"+FAST_SRC[0][1]+".m3u"),FAST_SRC[0][0]).filter(c=>FAST_RX.test((c.group||"")+" "+c.name)).slice(0,400); libCache[k]=l }catch(e){ l=[] } }
  dialog("📡 "+L("livePick"),l.slice(0,120).map(c=>({label:c.name,fn:()=>{ S.hwLive={name:c.name,url:c.url,logo:c.logo}; renderHW() }}))) }
const _hwSettingsM=hwSettings; hwSettings=function(w){ if(w.t==="live") return livePick(); return _hwSettingsM(w) };
const _hwMenuM=hwMenu; hwMenu=function(id){ _hwMenuM(id); const w=hwGet(id); if(!w||w.t!=="live") return;
  const box=$("dbox"), items=box._items, g=box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
  items.splice(items.length-2,0,{icon:"⚙️",label:L("hwSettings"),fn:()=>setTimeout(livePick,30)});
  g.innerHTML=items.map((it,i)=>`<button class="btn f${it.pri?" pri":""}" data-di="${i}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };

// ---- 5) seasonal look: Ramadan lanterns, Eid celebration — automatic, the chosen theme stays
function season(){ if(!S.seasonal) return ""; const h=hijriParts(new Date()); if(!h) return "";
  if(h.month===9) return "ramadan"; if((h.month===10&&h.day<=3)||(h.month===12&&h.day>=10&&h.day<=13)) return "eid"; return "" }
const _applyLookM=applyLook; applyLook=function(){ _applyLookM.apply(this,arguments); const s=season();
  document.body.classList.toggle("season-ramadan",s==="ramadan"); document.body.classList.toggle("season-eid",s==="eid");
  if(s&&(!S.anim||S.anim==="auto"||S.anim==="off")) document.body.dataset.anim=s==="ramadan"?"lanterns":"bokeh" };
setTimeout(()=>{ const s=season(), d=new Date().toDateString(); if(s&&S.seasonDay!==d){ S.seasonDay=d; banner(s==="eid"?"🎉":"🌙",L(s==="eid"?"eidG":"ramG"),"",8000) } applyLook() },5000);

// ---- 6) kids: library shows only cartoons and Quran, and only during allowed hours
const _libCatsM=libCatsHtml; libCatsHtml=function(){ if(!isKids()) return _libCatsM();
  return LIB_CATS.filter(c=>c[0]==="quran"||c[0]==="cartoon").map(c=>`<div class="it f${c[0]===libCat?" on":""}" tabindex="0" data-libcat="${c[0]}">${c[1]} ${esc(L(LIBN[c[0]]))}</div>`).join("") };
const _renderLibM=renderLib; renderLib=async function(){
  if(isKids()){ const hr=new Date().getHours(); if(hr<+S.kidsLibFrom||hr>=+S.kidsLibTo){ $("libCats").innerHTML=""; return libMsg("🔒 "+L("kidsLibOff")+` (${S.kidsLibFrom}:00 – ${S.kidsLibTo}:00)`) }
    if(libCat!=="quran"&&libCat!=="cartoon") libCat="cartoon" }
  return _renderLibM.apply(this,arguments) };

// settings + home hook
const _lifeSetM=window.lifeSettings; window.lifeSettings=function(){
  return sec("🌙 "+L("seasonal"),field("",onoff("seasonal")))
    +sec("🧒 "+L("kidsLibTime"),field("",seg("kidsLibFrom",[[6,"6:00"],[8,"8:00"],[10,"10:00"]])+seg("kidsLibTo",[[18,"18:00"],[20,"20:00"],[22,"22:00"]])))
    +(_lifeSetM?_lifeSetM():"") };
AFTER.seasonal=applyLook;
const _renderHWM=renderHW; renderHW=function(){ _renderHWM.apply(this,arguments); renderLibFav() };
setTimeout(renderLibFav,0);
