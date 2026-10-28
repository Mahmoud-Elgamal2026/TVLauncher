// ================= Free libraries: Quran, lectures, classic films, documentaries, audiobooks =================
// Sources are free and legal: mp3quran.net (Quran recitations) and the Internet Archive (public-domain films, lectures, books).
Object.assign(T.ar,{libTab:"📚 المكتبة",libQuran:"القرآن الكريم",libKhutab:"خطب ودروس",libOldAr:"أفلام عربي قديمة",libClassic:"أفلام كلاسيك",libDocs:"وثائقي",libCartoon:"كرتون قديم",libBooks:"كتب مسموعة",
  libSearch:"بحث في المكتبة",libLoading:"بيحمّل…",libEmpty:"مفيش نتايج",libReciter:"اختار القارئ",libSurah:"اختار السورة",libFiles:"اختار الحلقة/الجزء",libAll:"شغّل الكل"});
Object.assign(T.en,{libTab:"📚 Library",libQuran:"Holy Quran",libKhutab:"Sermons & lessons",libOldAr:"Classic Arabic films",libClassic:"Classic films",libDocs:"Documentaries",libCartoon:"Old cartoons",libBooks:"Audiobooks",
  libSearch:"Search the library",libLoading:"Loading…",libEmpty:"No results",libReciter:"Pick a reciter",libSurah:"Pick a surah",libFiles:"Pick a part",libAll:"Play all"});
// [key, icon, archive.org query]
const LIB_CATS=[["quran","📖",null],
  ["khutab","🕌",'subject:("خطب الجمعة" OR "خطبة الجمعة" OR "دروس دينية" OR محاضرات OR "تفسير القرآن" OR "السيرة النبوية") AND mediatype:audio'],
  ["oldar","🎞",'title:(فيلم) AND subject:("ابيض واسود" OR "أبيض وأسود" OR "الزمن الجميل" OR "افلام قديمة" OR "أفلام قديمة" OR "افلام مصرية" OR "سينما مصرية" OR "egyptian cinema" OR "egyptian movie" OR "classic arabic" OR "افلام زمان" OR "فيلم مصري" OR "افلام مصرية قديمة" OR "افلام عربي قديمة" OR "السينما المصرية" OR "افلام عربية قديمة" OR "egyptian films" OR "old egyptian" OR "arabic cinema" OR "abyad wa aswad")) OR (title:(فيلم) AND title:(19*) AND mediatype:movies'],
  ["classic","🎬",'collection:feature_films AND mediatype:movies'],
  ["docs","🌍",'collection:(documentaries OR ephemera) AND mediatype:movies'],
  ["cartoon","🐭",'collection:classic_cartoons AND mediatype:movies'],
  ["books","🎧",'collection:librivoxaudio AND mediatype:audio']];
const LIBN={quran:"libQuran",khutab:"libKhutab",oldar:"libOldAr",classic:"libClassic",docs:"libDocs",cartoon:"libCartoon",books:"libBooks"};
let libCat="quran", libCache={}, libQ="";

(function(){ // tab + page (shown in the simple interface too)
  const st=document.querySelector('.tab[data-page="settings"]'); if(!st) return;
  const b=document.createElement("button"); b.className="tab f"; b.dataset.page="lib"; b.setAttribute("data-i18n","libTab"); b.textContent=L("libTab"); st.parentNode.insertBefore(b,st);
  const sec=document.createElement("section"); sec.className="page"; sec.id="lib";
  sec.innerHTML=`<div class="vodw"><div class="list" id="libCats"></div><div class="scroll" id="libMain"></div></div>`; $("settings").parentNode.insertBefore(sec,$("settings"));
})();
function libCatsHtml(){ return LIB_CATS.filter(c=>c[0]!=="search").map(c=>`<div class="it f${c[0]===libCat?" on":""}" tabindex="0" data-libcat="${c[0]}">${c[1]} ${esc(L(LIBN[c[0]]))}</div>`).join("")+`<div class="it f" tabindex="0" id="libSearchBtn">🔍 ${esc(L("libSearch"))}</div>` }
const libCard=(x)=>`<div class="lbc f" tabindex="0" ${x.attr}><div class="lbi"${x.img?` style="background-image:url('${esc(x.img)}')"`:""}>${x.img?"":`<b>${esc(x.icon||"🎬")}</b>`}</div><div class="lbt">${esc(x.title)}</div>${x.sub?`<div class="lbs">${esc(x.sub)}</div>`:""}</div>`;
function libMsg(t){ $("libMain").innerHTML=`<p class="hint">${esc(t)}</p>` }
async function renderLib(){
  $("libCats").innerHTML=libCatsHtml();
  if(libCat==="quran") return quranReciters();
  const key=libCat+"|"+libQ; let items=libCache[key];
  if(!items){ libMsg(L("libLoading"));
    const cat=LIB_CATS.find(c=>c[0]===libCat), q=libQ?`(${libQ}) AND mediatype:(movies OR audio)`:cat[2];
    try{ const r=await A.fetchJSON("https://archive.org/advancedsearch.php?q="+encodeURIComponent(q)+"&fl[]=identifier&fl[]=title&fl[]=mediatype&fl[]=year&sort[]=downloads+desc&rows=60&output=json");
      items=((r.response||{}).docs||[]).filter(d=>!libBlocked(Array.isArray(d.title)?d.title[0]:d.title||"")).map(d=>({id:d.identifier,title:Array.isArray(d.title)?d.title[0]:d.title||d.identifier,mt:d.mediatype,year:d.year})); libCache[key]=items }catch(e){ items=[] } }
  if(!items.length) return libMsg(L("libEmpty"));
  $("libMain").innerHTML=`<div class="lbgrid">${items.map(i=>libCard({attr:`data-arch="${esc(i.id)}"`,img:"https://archive.org/services/img/"+i.id,title:i.title,sub:i.year?String(i.year):""})).join("")}</div>`;
}
// ---- archive.org item: list its playable files
async function openArch(id){
  dialog("⏳ "+L("libLoading"),[{label:L("cancel"),fn:()=>{}}]);
  let md={}; try{ md=await A.fetchJSON("https://archive.org/metadata/"+encodeURIComponent(id)) }catch(e){}
  const title=(md.metadata&&md.metadata.title)||id;
  const files=(md.files||[]).filter(f=>/\.(mp4|m4v|webm|ogv|mp3|ogg|m4a)$/i.test(f.name)&&!/_sample|thumb/i.test(f.name));
  // prefer one format: mp4 for video, mp3 for audio
  let pick=files.filter(f=>/\.mp4$/i.test(f.name)); if(!pick.length) pick=files.filter(f=>/\.mp3$/i.test(f.name)); if(!pick.length) pick=files;
  pick.sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));
  closeDialog();
  if(!pick.length){ A.toast(L("libEmpty")); return }
  const mk=f=>({name:(pick.length>1?(f.title||f.name.replace(/\.[^.]+$/,""))+" — ":"")+title,url:"https://archive.org/download/"+encodeURIComponent(id)+"/"+f.name.split("/").map(encodeURIComponent).join("/"),logo:"https://archive.org/services/img/"+id,kind:"movie"});
  if(pick.length===1) return libPlay([mk(pick[0])],0);
  const list=pick.map(mk);
  dialog("🎞 "+title,[{icon:"▶️",label:L("libAll"),pri:1,fn:()=>libPlay(list,0)}].concat(list.slice(0,80).map((c,i)=>({label:(pick[i].title||pick[i].name),fn:()=>libPlay(list,i)}))),{sub:L("libFiles")});
}
function libPlay(list,i){ if(typeof playList!=="undefined") playList=list; play(list[i]) }
// ---- Quran (mp3quran.net)
let qReciters=null, qSuwar=null;
async function quranReciters(){
  if(!qReciters){ libMsg(L("libLoading"));
    try{ const lg=S.lang==="ar"?"ar":"eng";
      const [r,s]=await Promise.all([A.fetchJSON("https://mp3quran.net/api/v3/reciters?language="+lg),A.fetchJSON("https://mp3quran.net/api/v3/suwar?language="+lg)]);
      qReciters=(r.reciters||[]).filter(x=>x.moshaf&&x.moshaf.length); qSuwar=s.suwar||[] }catch(e){ qReciters=null; return libMsg(L("loadErr")) } }
  const fav=["ماهر المعيقلي","عبدالباسط عبدالصمد","محمد صديق المنشاوي","مشاري العفاسي","سعد الغامدي","محمود خليل الحصري","ياسر الدوسري","عبدالرحمن السديس"];
  const list=qReciters.slice().sort((a,b)=>{ const fa=fav.findIndex(n=>a.name.indexOf(n)>=0), fb=fav.findIndex(n=>b.name.indexOf(n)>=0); return (fa<0?99:fa)-(fb<0?99:fb) });
  $("libMain").innerHTML=`<h3 class="sph">${esc(L("libReciter"))}</h3><div class="lbgrid small">${list.slice(0,200).map(r=>libCard({attr:`data-reciter="${r.id}"`,icon:"🎙",title:r.name,sub:r.moshaf[0].name})).join("")}</div>`;
}
function quranSurahs(rid){
  const r=(qReciters||[]).find(x=>String(x.id)===String(rid)); if(!r) return; const m=r.moshaf[0];
  const have=String(m.surah_list||"").split(",").map(Number);
  const list=qSuwar.filter(s=>have.indexOf(+s.id)>=0).map(s=>({name:s.name+" — "+r.name,url:m.server+String(s.id).padStart(3,"0")+".mp3",logo:"",kind:"movie"}));
  dialog("📖 "+r.name,[{icon:"▶️",label:L("libAll"),pri:1,fn:()=>libPlay(list,0)}].concat(list.map((c,i)=>({label:(i+1)+". "+c.name.split(" — ")[0],fn:()=>libPlay(list,i)}))),{sub:L("libSurah")});
}
activators.push(el=>{
  if(el.dataset.libcat){ libCat=el.dataset.libcat; libQ=""; renderLib().then(()=>focus(document.querySelector(`[data-libcat="${libCat}"]`))); return true }
  if(el.id==="libSearchBtn"){ prompt2(L("libSearch"),libQ,v=>{ libQ=v; libCat="search"; renderLib() }); return true }
  if(el.dataset.arch){ openArch(el.dataset.arch); return true }
  if(el.dataset.reciter){ quranSurahs(el.dataset.reciter); return true }
  return false });
pageHooks["lib:enter"]=()=>{ if(!$("libMain").innerHTML) renderLib() };
LIB_CATS.push(["search","🔍",""]); LIBN.search="libSearch";

// keep the library family-safe: drop war footage, armed-group releases and propaganda that sometimes shows up in open archives
const LIB_BLOCK=/جيش|إصدار|اصدار|مؤسسة|تحرير|معركة|غزو|مجاهد|جهاد|انغماس|الدولة الإسلامية|الدولة الاسلامية|ولاية|استشهاد|عملية|قصف|سرايا|كتائب|فصائل|كتيبة|طلائع|أحرار|احرار|isis|daesh|jihad|mujahid|militant|\+18|sex|xxx/i;
function libBlocked(t){ return LIB_BLOCK.test(String(t||"")) }
