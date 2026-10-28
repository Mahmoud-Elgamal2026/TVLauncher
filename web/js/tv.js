"use strict";
// ================= channels data =================
let channels=[], groups=[], countries=[], curGroup="__all", hls=null, pvHls=null, playing=null, playList=[], epg={};
const COUNTRIES=[
 ["مصر","Egypt","EG|EGY|EGYPT|MISR","مصر|مصري|المصرية"],["السعودية","Saudi Arabia","SA|KSA|SAUDI","السعودي|السعودية"],
 ["الإمارات","UAE","AE|UAE|EMIRATES|DUBAI|ABU ?DHABI","الإمارات|الامارات|دبي|أبوظبي"],["الكويت","Kuwait","KW|KUWAIT","الكويت"],
 ["قطر","Qatar","QA|QATAR","قطر"],["البحرين","Bahrain","BH|BAHRAIN","البحرين"],["عُمان","Oman","OM|OMAN","عمان|عُمان"],
 ["الأردن","Jordan","JO|JOR|JORDAN","الأردن|الاردن"],["لبنان","Lebanon","LB|LEB|LEBANON","لبنان"],["سوريا","Syria","SY|SYR|SYRIA","سوريا|سورية"],
 ["العراق","Iraq","IQ|IRQ|IRAQ","العراق|عراقية"],["فلسطين","Palestine","PS|PAL|PALESTINE","فلسطين"],["اليمن","Yemen","YE|YEMEN","اليمن"],
 ["السودان","Sudan","SD|SUDAN","السودان"],["ليبيا","Libya","LY|LIBYA","ليبيا"],["تونس","Tunisia","TN|TUNISIA","تونس"],
 ["الجزائر","Algeria","DZ|ALG|ALGERIA","الجزائر"],["المغرب","Morocco","MA|MAR|MOROCCO","المغرب"],
 ["عربية عامة","Pan-Arab","MBC|ROTANA|OSN|BEIN|ART|AL ?JAZEERA|AL ?ARABIYA|SKY ?NEWS ?ARABIA|ARABIC|ARAB","عربي|العربية|الجزيرة|روتانا"]
].map(([ar,en,codes,words])=>({ar,en,re:new RegExp(`(^|[\\s|:\\[\\]()\\-_/.])(${codes})([\\s|:\\[\\]()\\-_/.]|$)`,"i"),re2:new RegExp(words)}));
const cName=c=>S.lang==="ar"?c.ar:c.en;
function detectCountry(c){
  const t=`${c.country} ${c.group} | ${c.name}`;
  for(const k of COUNTRIES) if(k.re.test(t)||k.re2.test(t)) return k.ar;
  return "";
}
const tvgUrls=new Set();
function parseM3U(txt,listName){
  const out=[]; let cur=null;
  const hdr=(txt.slice(0,600).match(/(?:x-tvg-url|url-tvg)="([^"]+)"/)||[])[1]; if(hdr) hdr.split(",").forEach(u=>{ u=u.trim(); if(/^https?:/.test(u)) tvgUrls.add(u) });
  for(let l of txt.split(/\r?\n/)){
    l=l.trim();
    if(l.startsWith("#EXTINF")){
      const attr=k=>{const m=l.match(new RegExp(k+'="([^"]*)"'));return m?m[1]:""};
      let q=false, cut=-1; for(let i=0;i<l.length;i++){ const ch=l[i]; if(ch==='"') q=!q; else if(ch===","&&!q){cut=i;break} }
      cur={name:((cut>=0?l.slice(cut+1):"").trim()||attr("tvg-name")),logo:attr("tvg-logo"),group:attr("group-title")||listName||"—",
        id:attr("tvg-id")||attr("tvg-name"),country:attr("tvg-country"),list:listName};
    }else if(l.startsWith("#EXTGRP:")&&cur){cur.group=l.slice(8).trim()}
    else if(l&&!l.startsWith("#")&&cur){cur.url=l;out.push(cur);cur=null}
  }
  return out;
}
async function loadLists(){
  channels=[]; groups=[]; countries=[]; m3uVod=[]; vodLoaded=false; vodCat=null;
  const lists=S.lists;
  if(!lists.length){renderGroups();renderHome();return}
  $("channels").innerHTML=`<div class="empty">${L("loading")}</div>`;
  const res=await Promise.allSettled(lists.map((l,i)=>l.type==="xtream"?loadXtreamLive(l,i):A.fetchText(l.url).then(t=>parseM3U(t,l.name))));
  const seen=new Set();
  res.forEach((r,i)=>{ if(r.status!=="fulfilled"){ A.toast(L("loadErr")+": "+lists[i].name); return }
    const dead=new Set(S.deadHidden||[]);
    r.value.forEach(c=>{ if(seen.has(c.url)||dead.has(c.url)) return; seen.add(c.url);
      // files (mp4/mkv...) from M3U lists go to the movies library, live streams stay in the receiver
      if(!c.xt&&/\.(mp4|mkv|avi|mov|m4v|webm)(\?|$)/i.test(c.url)) m3uVod.push({kind:"movie",name:c.name,url:c.url,poster:c.logo,cat:c.group||lists[i].name});
      else channels.push(c) }) });
  // 2 GB boxes: keep at most 6000 channels in memory (favorites first) so the launcher stays fast
  const CAP=window.lowRam?6000:30000;
  if(channels.length>CAP){ const fav=new Set(S.favCh||[]); const f=channels.filter(c=>fav.has(c.url)), rest=channels.filter(c=>!fav.has(c.url)); channels=f.concat(rest).slice(0,CAP); A.toast(L("chCapped")+" "+CAP) }
  channels.forEach((c,i)=>{ c.no=i+1; c.cty=detectCountry(c) });
  const g=new Map(), ct=new Map();
  channels.forEach(c=>{ g.set(c.group,(g.get(c.group)||0)+1); if(c.cty) ct.set(c.cty,(ct.get(c.cty)||0)+1) });
  groups=[...g].map(([n,c])=>({n,c}));
  countries=COUNTRIES.filter(k=>ct.has(k.ar)).map(k=>({n:k.ar,label:cName(k),c:ct.get(k.ar)}));
  renderGroups(); renderHome();
  if($("vod").classList.contains("on")) loadVodCats();
  if(S.autoCheck&&channels.length&&Date.now()-S.lastCheck>7*86400000) runCheck(true);
}
function epgUrl(){ if(S.epg) return S.epg; const x=xtLists()[0]; return x?`${xtBase(x)}/xmltv.php?username=${encodeURIComponent(x.user)}&password=${encodeURIComponent(x.pass)}`:"" }
// guide = your own EPG (or Xtream's) + guides announced by the playlists + known guides for the free country packs
const EPG_CAND=cc=>[`https://epgshare01.online/epgshare01/epg_ripper_${cc.toUpperCase()}1.xml.gz`,`https://iptv-epg.org/files/epg-${cc}.xml.gz`,`https://epg.pw/xmltv/epg_${cc.toUpperCase()}.xml`];
// each pack: a list of candidate guides per country; the first one that answers is used (and remembered)
const PACK_EPG={"countries/eg.m3u":[EPG_CAND("eg")],"countries/sa.m3u":[EPG_CAND("sa")],"countries/ae.m3u":[EPG_CAND("ae")],"languages/ara.m3u":[EPG_CAND("eg"),EPG_CAND("sa"),EPG_CAND("ae")]};
const epgKey=s=>String(s||"").toLowerCase().replace(/\(.*?\)|\[.*?\]|\b(hd|fhd|uhd|sd|4k|tv|channel|قناة)\b|\.[a-z]{2}(@.*)?$/g,"").replace(/[^a-z0-9\u0600-\u06ff]/g,"");
let epgNorm={};
DEF.epgOk={};
async function fetchFirst(cands){ const ok=S.epgOk||{}; const order=cands.slice().sort((a,b)=>(ok[b]||0)-(ok[a]||0));
  for(const u of order){ try{ const r=await A.fetchEpg(u); if(r&&Object.keys(r).length){ const o=Object.assign({},S.epgOk||{}); o[u]=Date.now(); S.epgOk=o; return r } }catch(e){} } return null }
async function loadEpg(){
  const jobs=[]; const u=epgUrl(); if(u) jobs.push([u]);
  S.lists.forEach(l=>{ Object.keys(PACK_EPG).forEach(k=>{ if(l.url&&l.url.indexOf(k)>=0) PACK_EPG[k].forEach(c=>jobs.push(c)) }) });
  tvgUrls.forEach(x=>jobs.push([x]));
  const seen={}, list=jobs.filter(j=>{ const k=j.join("|"); if(seen[k]) return false; seen[k]=1; return true }).slice(0,6);
  if(!list.length){ epg={}; epgNorm={}; return }
  const res=await Promise.all(list.map(fetchFirst));
  const merged={}; res.forEach(r=>{ if(r) Object.keys(r).forEach(k=>{ if(!merged[k]) merged[k]=r[k] }) });
  // keep only guides for channels we actually have, and only the next 24 hours (saves a lot of RAM)
  const want={}; channels.forEach(c=>{ if(c.id){ want[c.id]=1; const j=epgKey(c.id); if(j) want["~"+j]=1 } want[c.name]=1; const k=epgKey(c.name); if(k) want["~"+k]=1 });
  const until=Date.now()+86400000, since=Date.now()-3*3600000;
  if(channels.length) Object.keys(merged).forEach(k=>{ if(!want[k]&&!want["~"+epgKey(k)]){ delete merged[k]; return } const a=merged[k]; if(Array.isArray(a)) merged[k]=a.filter(p=>p[1]>since&&p[0]<until) });
  epg=merged; epgNorm={}; Object.keys(merged).forEach(k=>{ const n=epgKey(k); if(n&&!epgNorm[n]) epgNorm[n]=merged[k] });
  if(!Object.keys(merged).length&&u&&NA) A.toast("EPG: "+L("loadErr"));
  renderChannels(); renderHome();
}

setInterval(loadEpg,3*3600000);
function nowNext(c){
  const l=epg[c.id]||epg[c.name]||epgNorm[epgKey(c.id)]||epgNorm[epgKey(c.name)]; if(!l) return [];
  const t=Date.now(); const i=l.findIndex(p=>p[0]<=t&&p[1]>t); return i<0?[]:[l[i],l[i+1]];
}
window.nowNext=nowNext;
const chByUrl=u=>channels.find(c=>c.url===u)||S.favCh.find(c=>c.url===u)||(S.lastCh&&S.lastCh.url===u?S.lastCh:null)||S.watch.find(w=>w.url===u);
window.chByUrl=chByUrl;
const isVod=c=>/\.(mp4|mkv|avi|mov|m4v|webm)(\?|$)/i.test(c.url)||/movie|vod|series|film|أفلام|افلام|فيلم|مسلسل/i.test(c.group||"");
const gkeyOf=c=>["g:"+c.group,c.cty?"c:"+c.cty:null].filter(Boolean);
function chAllowed(c){
  if(isKids()){ const al=(profile().allowedGroups||[]); return gkeyOf(c).some(k=>al.includes(k)) }
  return !S.lockedGroups.includes("g:"+c.group)&&!(c.cty&&S.lockedGroups.includes("c:"+c.cty));
}
window.chAllowed=chAllowed;
const isDead=c=>S.chStatus[c.url]===0;

// ================= receiver lists =================
function renderGroups(){
  if(!channels.length&&!S.favCh.length){$("groups").innerHTML="";$("channels").innerHTML=`<div class="empty">${L("noList")}</div>`;return}
  const kid=isKids(), al=kid?(profile().allowedGroups||[]):null, ok=k=>!kid||al.includes(k);
  const it=(key,label,count,icon)=>`<div class="it f${key===curGroup?" sel":""}" tabindex="0" data-group="${esc(key)}">${S.lockedGroups.includes(key)?"🔒 ":""}${icon?icon+" ":""}${esc(label)}<span class="cnt">${count}</span></div>`;
  let h=it("__all",L("all"),channels.filter(chAllowed).length,"📺")+it("__fav",L("favs"),S.favCh.length,"⭐")+it("__hist",L("lastWatched"),S.chHist.length,"🕘");
  const cs=countries.filter(c=>ok("c:"+c.n)); if(cs.length) h+=`<div class="cath">${L("countries")}</div>`+cs.map(c=>it("c:"+c.n,c.label,c.c,"")).join("");
  const gs=groups.filter(g=>ok("g:"+g.n)); if(gs.length) h+=`<div class="cath">${L("groupsH")}</div>`+gs.map(g=>it("g:"+g.n,g.n,g.c,"")).join("");
  h+=kid?"":`<div class="cath"></div><div class="it f" tabindex="0" id="checkBtn">🩺 ${L("checkCh")}</div>`;
  $("groups").innerHTML=h;
  renderChannels();
}
function currentList(){
  const q=$("chSearch").value.trim().toLowerCase();
  let list;
  if(q) list=channels.filter(c=>c.name.toLowerCase().includes(q)||String(c.no)===q);
  else if(curGroup==="__fav") list=S.favCh.map(f=>channels.find(c=>c.url===f.url)||f);
  else if(curGroup==="__hist") list=S.chHist.map(u=>chByUrl(u)).filter(Boolean);
  else if(curGroup.startsWith("c:")) list=channels.filter(c=>c.cty===curGroup.slice(2));
  else if(curGroup.startsWith("g:")) list=channels.filter(c=>c.group===curGroup.slice(2));
  else list=channels;
  return list.filter(c=>chAllowed(c)&&!(S.hideDead&&isDead(c)));
}
function chRow(c){
  const n=nowNext(c)[0], st=S.chStatus[c.url];
  return `<div class="chrow f${isDead(c)?" dead":""}${playing&&playing.url===c.url?" playing":""}" tabindex="0" data-chu="${esc(c.url)}">
    <span class="no">${c.no||""}</span>
    <span class="lg${c.logo?"":" none"}">${c.logo?`<img loading="lazy" src="${esc(c.logo)}" onerror="this.parentNode.classList.add('none');this.replaceWith('📺')" alt="">`:"📺"}</span>
    <span class="nm2"><b>${S.favCh.some(x=>x.url===c.url)?"⭐ ":""}${esc(c.name)}</b>${n?`<small>${esc(n[2])}</small>`:c.cty?`<small>${esc(c.cty)} · ${esc(c.group)}</small>`:`<small>${esc(c.group||"")}</small>`}</span>
    <span class="st">${c.xt&&c.xt.arch?"📼 ":""}${st===1?"🟢":st===0?"🔴":""}</span></div>`;
}
let chShown=0;
// long lists are added 200 rows at a time as the remote reaches the end
focusHooks.push(el=>{ if(!el.dataset||!el.dataset.chu||!el.closest("#channels")) return; const rows=$("channels").children; if([].indexOf.call(rows,el)<rows.length-8) return;
  if(chShown<playList.length){ const more=playList.slice(chShown,chShown+200); chShown+=more.length; $("channels").insertAdjacentHTML("beforeend",more.map(chRow).join("")) } });
function renderChannels(){
  if(!channels.length&&!S.favCh.length) return;
  const list=currentList(); playList=list;
  chShown=Math.min(list.length,200); $("channels").innerHTML=list.length?list.slice(0,chShown).map(chRow).join(""):`<div class="empty">${L("noRes")}</div>`;
}
function selectGroup(g){
  const locked=S.lockedGroups.includes(g);
  guard(locked,()=>{ curGroup=g; $("chSearch").value=""; renderGroups(); focus(document.querySelector(`#groups [data-group="${cssq(g)}"]`)) });
}
$("chSearch").addEventListener("input",()=>{ clearTimeout(window._sq); window._sq=setTimeout(renderChannels,250) });

// ================= preview panel =================
let pvTimer=null, pvUrl=null;
function showPreview(c){
  $("pvName").textContent=(c.no?c.no+" · ":"")+c.name;
  const [n,x]=nowNext(c);
  $("pvNow").textContent=n?`${L("now")}: ${n[2]}  (${fmtTime(new Date(n[0]),1)} - ${fmtTime(new Date(n[1]),1)})`:(c.cty||c.group||"");
  $("pvNext").textContent=x?`${L("next")}: ${x[2]}  ${fmtTime(new Date(x[0]),1)}`:"";
  $("pvBar").style.width=n?Math.min(100,(Date.now()-n[0])/(n[1]-n[0])*100)+"%":"0"; $("pvBar").parentNode.style.display=n?"":"none";
  $("pvLogo").innerHTML=c.logo?`<img src="${esc(c.logo)}" onerror="this.remove()" alt="">`:"";
  clearTimeout(pvTimer);
  if(S.preview&&!S.lite&&c.url!==pvUrl) pvTimer=setTimeout(()=>pvPlay(c),900);
}
// On weak/old boxes play HLS with Android's hardware player (off the UI thread) and only fall back to hls.js if that fails.
const nativeHls=()=>{ const e=S.engine||"auto"; if(e==="hls") return false; const can=!!document.createElement("video").canPlayType("application/vnd.apple.mpegurl");
  return e==="native"?can:(can&&((window.__chromeVer||99)<75||S.lite)) };
function attach(video,url,old,opts){
  if(old) old.destroy();
  video.onerror=null;
  if(/\.m3u8(\?|$)/i.test(url)&&nativeHls()&&!(opts&&opts.__forceHls)){
    let done=false; const fb=()=>{ if(done) return; done=true; video.onerror=null; clearTimeout(t); if(window.Hls&&Hls.isSupported()&&video.__url===url){ const h=attach(video,url,null,Object.assign({},opts||{},{__forceHls:1})); if(video===$("video")) hls=h; else pvHls=h } };
    const t=setTimeout(()=>{ if(video.readyState<2&&video.__url===url) fb() },9000);
    video.__url=url; video.onerror=fb; video.onplaying=video.onplaying||null; video.src=url; video.play().catch(()=>{}); return null;
  }
  video.__url=url;
  if(/\.m3u8(\?|$)/i.test(url)&&window.Hls&&Hls.isSupported()){
    const o2=Object.assign({maxBufferLength:S.lite?12:20,backBufferLength:S.lite?4:10,maxMaxBufferLength:30,enableWorker:true,startLevel:S.lite?0:-1,capLevelToPlayerSize:true},opts||{}); delete o2.__forceHls; const h=new Hls(o2); h.loadSource(url); h.attachMedia(video);
    h.on(Hls.Events.ERROR,(e,d)=>{ if(!d.fatal) return; if(d.type===Hls.ErrorTypes.NETWORK_ERROR) h.startLoad(); else if(d.type===Hls.ErrorTypes.MEDIA_ERROR) h.recoverMediaError() });
    video.play().catch(()=>{}); return h;
  }
  video.src=url; video.play().catch(()=>{}); return null;
}
function pvPlay(c){ if(!$("tv").classList.contains("on")||on("player")) return; pvUrl=c.url; const v=$("pvVideo"); v.muted=false; v.volume=.6;
  $("pvVideo").parentNode.classList.remove("playing"); v.onplaying=()=>v.parentNode.classList.add("playing"); pvHls=attach(v,c.url,pvHls,{maxBufferLength:8}) }
function pvStop(){ clearTimeout(pvTimer); pvUrl=null; if(pvHls){pvHls.destroy();pvHls=null} const v=$("pvVideo"); v.onplaying=null; v.pause(); v.removeAttribute("src"); v.load(); v.parentNode.classList.remove("playing") }
pageHooks["tv:leave"]=pvStop;
focusHooks.push(el=>{ if(el.dataset.chu&&el.closest("#tv")){ const c=chByUrl(el.dataset.chu); if(c) showPreview(c) } });

// ================= player =================
function playUrl(url){
  const c=chByUrl(url); if(!c) return;
  if(!playList.some(x=>x.url===url)){ const same=channels.filter(x=>x.group===c.group&&chAllowed(x)); playList=same.length?same:[c] }
  const locked=S.lockedGroups.includes("g:"+c.group)||(c.cty&&S.lockedGroups.includes("c:"+c.cty));
  guard(locked,()=>play(c));
}
let saveT=0, nextT=null;
const isLive=c=>!c.kind;
function play(c){
  if(!window.Hls&&/\.m3u8(\?|$)/i.test(c.url||"")&&window.loadHls){ loadHls().then(()=>play(c)); return }
  pvStop(); clearTimeout(nextT);
  playing=c;
  if(isLive(c)){ S.lastCh={name:c.name,url:c.url,logo:c.logo,group:c.group,id:c.id,no:c.no}; S.chHist=[c.url,...S.chHist.filter(u=>u!==c.url)].slice(0,30) }
  statStart(c);
  if(S.ext){A.playExternal(c.url);setTimeout(renderHome,500);return}
  const v=$("video"); $("player").classList.add("on"); $("plist").classList.remove("on"); applyAspect(); v.playbackRate=1; showInfo();
  const liveCfg=isLive(c)?{liveDurationInfinity:true,liveSyncDurationCount:3,liveMaxLatencyDurationCount:100000,maxBufferSize:60e6}:{maxBufferLength:40};
  hls=attach(v,c.url,hls,liveCfg); hls=hls||null;
  let failed=false; const fail=()=>{ if(failed||playing!==c) return; failed=true;
    dialog("⚠️ "+L("playErr"),[{icon:"↗",label:L("external"),pri:1,fn:()=>{ A.playExternal(c.url) }},{icon:"🔄",label:L("retry"),fn:()=>play(c)}]) };
  if(!hls) v.onerror=fail;
  clearTimeout(window.__pwd); window.__pwd=setTimeout(()=>{ if(playing===c&&v.readyState<2&&!v.paused) fail() },15000);
  const w=S.watch.find(x=>x.key==="url:"+c.url);
  v.onloadedmetadata=()=>{ if(w&&w.pos>20&&isFinite(v.duration)&&w.pos<v.duration-30){ v.currentTime=w.pos; banner("⏯️",L("resumed")+" "+fmtDur(w.pos)) } };
  v.ontimeupdate=()=>{
    if(!isFinite(v.duration)||v.duration<120||Date.now()-saveT<10000) return; saveT=Date.now();
    if(v.currentTime/v.duration>.95){ markSeen(c); return }
    if(v.currentTime>30) watchUpsert({key:"url:"+c.url,type:"vod",kind:c.kind||"movie",meta:c.meta,url:c.url,name:c.name,logo:(c.meta&&c.meta.poster)||c.logo,pos:Math.floor(v.currentTime),dur:Math.floor(v.duration)});
  };
  v.onended=()=>{ markSeen(c); if(c.next){ banner("⏭️",L("nextEp"),L("nextEpSub"),8000); nextT=setTimeout(()=>{ if(on("player")&&playing===c) c.next() },8000) } };
  v.onpause=()=>{ if(hls&&isLive(c)){ hls.config.maxBufferLength=hls.config.maxMaxBufferLength=S.lite?90:300; hls.config.maxBufferSize=S.lite?60e6:150e6 } showInfo() };
  v.onplay=()=>showInfo();
  document.querySelectorAll(".chrow.playing").forEach(e=>e.classList.remove("playing"));
}
function markSeen(c){ S.watch=S.watch.filter(x=>x.key!=="url:"+c.url); if(c.kind==="episode"&&!S.seen.includes(c.url)) S.seen=[...S.seen,c.url].slice(-3000) }
let infoT=null;
function showInfo(){
  const c=playing; if(!c) return; const [n,x]=nowNext(c);
  $("pNum").textContent=isLive(c)?(c.no||""):""; $("pName").textContent=c.name; $("pLogo").src=c.logo||""; $("pLogo").style.display=c.logo?"":"none";
  $("pNow").textContent=n?`${L("now")}: ${n[2]}`:""; $("pNext").textContent=x?`${L("next")}: ${x[2]}`:"";
  $("pBar").style.width=n?Math.min(100,(Date.now()-n[0])/(n[1]-n[0])*100)+"%":"0"; $("pBar").parentNode.style.display=n?"":"none";
  const v=$("video");
  if(!isLive(c)&&isFinite(v.duration)&&v.duration>0){ $("pNow").textContent=`${fmtDur(v.currentTime)} / ${fmtDur(v.duration)}`; $("pBar").style.width=(v.currentTime/v.duration*100)+"%"; $("pBar").parentNode.style.display="" }
  const behind=hls&&isLive(c)&&hls.liveSyncPosition?hls.liveSyncPosition-v.currentTime:0;
  $("pState").textContent=v.paused?"⏸ "+L("paused"):behind>15?`⏪ ${L("behindLive")} ${fmtDur(behind)}`:"";
  $("pInfo").style.opacity=1; clearTimeout(infoT); if(!v.paused) infoT=setTimeout(()=>$("pInfo").style.opacity=0,4000);
}
function stopPlayer(){
  clearTimeout(nextT); statStop();
  const v=$("video"); if(v.ontimeupdate){ saveT=0; v.ontimeupdate() }
  v.onpause=v.onplay=v.onended=null;
  if(hls){hls.destroy();hls=null} v.onerror=v.ontimeupdate=v.onloadedmetadata=null; v.pause(); v.removeAttribute("src"); v.load();
  $("player").classList.remove("on"); $("plist").classList.remove("on");
  renderHome(); renderChannels();
  focus((playing&&document.querySelector(`.page.on [data-chu="${cssq(playing.url)}"]`))||fallbackFocus());
}
window.stopPlayer=stopPlayer;
function zap(d){ if(!playList.length||!playing) return; let k=playList.findIndex(x=>x.url===playing.url)+d;
  if(k<0)k=playList.length-1; if(k>=playList.length)k=0; play(playList[k]) }
function openPlist(){
  $("plistTitle").textContent=L("chList");
  $("plistItems").innerHTML=playList.slice(0,1500).map(chRow).join("");
  $("plist").classList.add("on");
  focus($("plistItems").querySelector(`[data-chu="${cssq(playing.url)}"]`)||$("plistItems").querySelector(".f"));
}
// number entry (receiver style)
let numBuf="", numT=null;
function numKey(d,onDone){
  numBuf=(numBuf+d).slice(-4); const ne=$("numEntry"); ne.textContent=numBuf+"_"; ne.classList.add("on");
  clearTimeout(numT); numT=setTimeout(()=>{ const n=+numBuf; numBuf=""; ne.classList.remove("on"); onDone(n) },1400);
}
function gotoNumber(n){ const c=channels.find(x=>x.no===n); if(!c){A.toast(L("noRes"));return} if(!chAllowed(c)) return;
  if(!playList.includes(c)) playList=channels.filter(chAllowed); play(c) }
let pHold=null, pHeld=false;
layers.push({test:()=>on("player")&&!on("dlg"),ownsEnter:true,key(e){
  const k=e.key, pl=$("plist").classList.contains("on"), v=$("video");
  if(isBack(k)||k==="Backspace"){ e.preventDefault&&e.preventDefault(); clearTimeout(nextT); if(pl){ $("plist").classList.remove("on"); focused=null; showInfo() } else stopPlayer(); return true }
  if(/^[0-9]$/.test(k)&&isLive(playing)){ numKey(k,gotoNumber); return true }
  if(pl){
    if(k==="Enter"||k===" "){ e.preventDefault(); if(focused&&focused.dataset.chu){ const c=chByUrl(focused.dataset.chu); $("plist").classList.remove("on"); if(c) play(c) } return true }
    return false;
  }
  if(k==="Enter"||k===" "){ e.preventDefault&&e.preventDefault(); if(e.repeat) return true; pHeld=false; clearTimeout(pHold); pHold=setTimeout(()=>{pHeld=true;playerMenu()},650); return true }
  if(k==="ContextMenu"||k==="Menu"){ playerMenu(); return true }
  if(isLive(playing)){
    if(k==="ArrowUp"||k==="ChannelUp"||k==="PageUp"){e.preventDefault();zap(-1);return true}
    if(k==="ArrowDown"||k==="ChannelDown"||k==="PageDown"){e.preventDefault();zap(1);return true}
  }
  if(k==="ArrowRight"||k==="ArrowLeft"||k==="MediaFastForward"||k==="MediaRewind"){ const fwd=k==="MediaFastForward"||((k==="ArrowRight")===(S.lang!=="ar"));
    if(isFinite(v.duration)||(hls&&isLive(playing))){ const max=isFinite(v.duration)?v.duration:(hls.liveSyncPosition||v.currentTime); v.currentTime=Math.max(0,Math.min(max,v.currentTime+(fwd?30:-15))) } showInfo(); return true }
  if(k==="MediaPlayPause"||k==="MediaPlay"||k==="MediaPause"){ v.paused?v.play():v.pause(); return true }
  showInfo(); return true;
},keyup(e){
  if((e.key!=="Enter"&&e.key!==" ")||$("plist").classList.contains("on")) return;
  clearTimeout(pHold); if(pHeld){ pHeld=false; return }
  const v=$("video"); if(isLive(playing)&&!v.paused) openPlist(); else { v.paused?v.play():v.pause() }
}});
// ---------- player options: audio, subtitles, picture, speed, live pause, catch-up ----------
const ASPECTS=[["contain","aFit"],["cover","aFill"],["fill","aStretch"],["zoom","aZoom"]];
function applyAspect(){ const v=$("video"), a=S.aspect||"contain"; v.style.objectFit=a==="zoom"?"cover":a; v.style.transform=a==="zoom"?"scale(1.18)":"" }
function playerMenu(){
  const v=$("video"), c=playing, items=[];
  items.push({icon:v.paused?"▶️":"⏸",label:v.paused?L("resume"):L("pause"),fn:()=>{ v.paused?v.play():v.pause() }});
  if(hls&&isLive(c)&&hls.liveSyncPosition&&hls.liveSyncPosition-v.currentTime>15) items.push({icon:"🔴",label:L("goLive"),fn:()=>{ v.currentTime=hls.liveSyncPosition; v.play() }});
  const at=hls?hls.audioTracks||[]:[]; if(at.length>1) items.push({icon:"🔊",label:L("audioTrack"),fn:()=>setTimeout(()=>trackMenu("audio"),30)});
  const st=hls?hls.subtitleTracks||[]:[], nt=[...(v.textTracks||[])]; if(st.length||nt.length) items.push({icon:"💬",label:L("subtitles"),fn:()=>setTimeout(()=>trackMenu("sub"),30)});
  items.push({icon:"🖥️",label:L("aspect"),fn:()=>setTimeout(()=>dialog(L("aspect"),ASPECTS.map(([a,k])=>({label:L(k),pri:(S.aspect||"contain")===a,fn:()=>{S.aspect=a;applyAspect()}})),{grid:4}),30)});
  if(!isLive(c)) items.push({icon:"⏩",label:`${L("speed")} ${v.playbackRate}x`,fn:()=>setTimeout(()=>dialog(L("speed"),[.75,1,1.25,1.5,2].map(r=>({label:r+"x",pri:v.playbackRate===r,fn:()=>{v.playbackRate=r}})),{grid:5}),30)});
  if(c.xt&&c.xt.arch) items.push({icon:"📼",label:L("catchup"),fn:()=>setTimeout(()=>catchupMenu(c),30)});
  if(c.next) items.push({icon:"⏭️",label:L("nextEp"),fn:()=>c.next()});
  items.push({icon:"↗",label:L("external"),fn:()=>A.playExternal(c.url)},{icon:"😴",label:L("sleepT"),fn:()=>setTimeout(sleepMenu,30)});
  dialog(c.name,items,{grid:4});
}
function trackMenu(kind){
  const v=$("video");
  if(kind==="audio"){ const t=hls.audioTracks; dialog(L("audioTrack"),t.map((x,i)=>({label:x.name||x.lang||("#"+(i+1)),pri:hls.audioTrack===i,fn:()=>{hls.audioTrack=i}})),{grid:3}); return }
  const ht=hls?hls.subtitleTracks||[]:[];
  if(ht.length){ dialog(L("subtitles"),[{label:L("off"),pri:hls.subtitleTrack<0,fn:()=>{hls.subtitleTrack=-1;hls.subtitleDisplay=false}},
    ...ht.map((x,i)=>({label:x.name||x.lang||("#"+(i+1)),pri:hls.subtitleTrack===i,fn:()=>{hls.subtitleTrack=i;hls.subtitleDisplay=true}}))],{grid:3}); return }
  const nt=[...(v.textTracks||[])];
  dialog(L("subtitles"),[{label:L("off"),fn:()=>nt.forEach(t=>t.mode="disabled")},...nt.map((t,i)=>({label:t.label||t.language||("#"+(i+1)),pri:t.mode==="showing",fn:()=>nt.forEach((x,j)=>x.mode=j===i?"showing":"disabled")}))],{grid:3});
}
function catchupMenu(c){
  const l=epg[c.id]||epg[c.name]||[], now=Date.now(), from=now-Math.max(1,c.xt.days||1)*86400000;
  const past=l.filter(p=>p[1]<now&&p[0]>from).reverse();
  if(!past.length){ A.toast(L("noCatchup")); return }
  dialog(`📼 ${c.name}`,past.slice(0,40).map(p=>({label:`${fmtTime(new Date(p[0]),1)} · ${p[2]}`,fn:()=>play({name:`${c.name} · ${p[2]}`,url:catchupUrl(c,p[0],p[1]),logo:c.logo,group:c.group,kind:"catchup"})})));
}
keyHooks.push(e=>{ if(/^[0-9]$/.test(e.key)&&$("tv").classList.contains("on")&&!on("dlg")&&!(document.activeElement&&document.activeElement.tagName==="INPUT")){
  numKey(e.key,n=>{ const c=channels.find(x=>x.no===n); if(!c) return A.toast(L("noRes"));
    let el=document.querySelector(`#channels [data-chu="${cssq(c.url)}"]`);
    if(!el){ curGroup="__all"; $("chSearch").value=""; renderGroups(); el=document.querySelector(`#channels [data-chu="${cssq(c.url)}"]`) }
    if(el) focus(el) }); return true } return false });

// ================= channel menus & activation =================
function chMenu(url){
  const c=chByUrl(url); if(!c) return; const fav=S.favCh.some(x=>x.url===url), wk="url:"+url, inW=S.watch.some(w=>w.key===wk);
  const items=[{label:L("open"),pri:1,fn:()=>playUrl(url)},
    {label:fav?L("remFavCh"):L("addFavCh"),fn:()=>{ S.favCh=fav?S.favCh.filter(x=>x.url!==url):[...S.favCh,{name:c.name,url:c.url,logo:c.logo,group:c.group,id:c.id,no:c.no}]; renderHome(); renderGroups() }},
    {label:inW?L("remWatch"):L("addWatch"),fn:()=>{ inW?watchRemove(wk):(watchUpsert({key:wk,type:isVod(c)?"vod":"live",url:c.url,name:c.name,logo:c.logo,pos:0,dur:0}),renderHome()) }},
    {label:L("cancel"),fn:()=>{}}];
  if(c.xt&&c.xt.arch) items.splice(1,0,{label:"📼 "+L("catchup"),fn:()=>setTimeout(()=>catchupMenu(c),30)});
  dialog(c.name,items);
}
function groupMenu(g){
  if(g.startsWith("__")||isKids()) return; const lk=S.lockedGroups.includes(g);
  dialog(g.slice(2),[{label:lk?L("unlockGroup"):L("lockGroup"),fn:()=>{ if(!S.pin){A.toast(L("needPin"));return} guard(true,()=>{toggleList("lockedGroups",g);renderGroups()}) }},{label:L("cancel"),fn:()=>{}}]);
}
optionHandlers.push(el=>{ if(el.dataset.chu&&!el.dataset.wk){ chMenu(el.dataset.chu); return true } if(el.dataset.group!==undefined){ groupMenu(el.dataset.group); return true } return false });
activators.push(el=>{
  if(el.dataset.chu){ playUrl(el.dataset.chu); return true }
  if(el.dataset.group!==undefined){ selectGroup(el.dataset.group); return true }
  if(el.id==="checkBtn"){ runCheck(false); return true }
  return false;
});

// ================= stream checker =================
let checking=false;
async function runCheck(silent){
  if(checking) return; const list=(curGroup==="__all"||silent?channels:currentList()).slice(0,4000);
  if(!list.length) return; checking=true;
  if(!silent) banner("🩺",L("checking"),list.length+" ...");
  try{
    const r=await A.checkStreams(list.map(c=>c.url));
    const st=S.chStatus; let ok=0,bad=0; Object.keys(r).forEach(u=>{ st[u]=r[u]?1:0; r[u]?ok++:bad++ });
    S.chStatus=st; S.lastCheck=Date.now();
    banner("✅",L("checkDone"),`🟢 ${ok} ${L("working")} · 🔴 ${bad} ${L("dead")}`,9000);
    renderGroups();
  }catch(e){ if(!silent) A.toast(e.message) }
  checking=false;
}
window.onCheckProgress=(d,n)=>{ const b=document.querySelector("#checkBtn"); if(b) b.textContent=`🩺 ${L("checking")} ${d}/${n}` };
