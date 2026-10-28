"use strict";
// ================= apps =================
let apps=[];
const QUICK=[["YouTube","com.google.android.youtube.tv","com.google.android.youtube"],["Netflix","com.netflix.ninja","com.netflix.mediaclient"],
 ["Shahid","net.mbc.shahidTV","net.mbc.shahid"],["Watch It","com.watchit.vod.androidtv","com.watchit.vod"],["VLC","org.videolan.vlc"],
 ["Chrome","com.android.chrome"],["Spotify","com.spotify.tv.android","com.spotify.music"]];
const SWATCH=["","#e50914","#ff6d00","#ffb300","#2e7d32","#00897b","#0288d1","#3949ab","#8e24aa","#d81b60","#5d4037","#455a64","#111111","#f5f5f5"];

function loadApps(){ try{apps=JSON.parse(A.getApps())}catch(e){apps=[]} apps.sort((a,b)=>appName(a).localeCompare(appName(b))); renderHome() }
let lastLoad=0;
window.onAppsChanged=()=>{ if(Date.now()-lastLoad<3000) return; lastLoad=Date.now();
  const f=focused&&focused.dataset.pkg; loadApps(); if(f){const e=document.querySelector(`.page.on [data-pkg="${cssq(f)}"]`); if(e) focus(e)} };
const byPkg=p=>apps.find(a=>a.pkg===p);
const custom=p=>S.custom[p]||{};
const appName=a=>custom(a.pkg).name||a.name;
const isHidden=p=>S.hidden.includes(p), isLocked=p=>S.locked.includes(p);
function allowed(p){ if(!isKids()) return true; const k=Object.assign({},KIDS_DEF,profile()); return k.allowedApps.includes(p) }
function visibleApps(){ return apps.filter(a=>allowed(a.pkg)&&(S.showHidden&&!isKids()||!isHidden(a.pkg))) }

function tile(a){
  const c=custom(a.pkg), badges=(S.favs.includes(a.pkg)?"★":"")+(isLocked(a.pkg)?" 🔒":"");
  const style=c.color?` style="background:${esc(c.color)}"`:"";
  const img=c.img?`<img class="cover" src="${esc(c.img)}" alt="">`:
    (c.color&&!c.img)?`<div class="lbl">${esc(appName(a))}</div>`:
    a.icon?`<img loading="lazy" decoding="async" src="${a.icon}" onload="chkBanner(this)" alt="">`:`<div class="lbl">${esc(appName(a))}</div>`;
  return `<div class="app f${isHidden(a.pkg)?" hidden-app":""}" tabindex="0" data-pkg="${esc(a.pkg)}"${style}>
    ${badges?`<span class="badge">${badges}</span>`:""}${img}<div class="nm">${esc(appName(a))}</div></div>`;
}
window.chkBanner=img=>{ if(img.naturalWidth/img.naturalHeight>1.4) img.classList.add("banner") };
function setRow(id,html){ const r=$(id), h=document.querySelector(`h2[data-row="${id}"]`); r.innerHTML=html; r.style.display=html?"":"none"; if(h) h.style.display=html?"":"none" }

// ================= continue watching =================
function watchTile(w){
  const pct=w.dur?Math.min(100,w.pos/w.dur*100):0;
  if(w.type==="app"){ const a=byPkg(w.pkg); if(!a) return ""; return tile(a).replace('data-pkg=','data-wk="'+esc(w.key)+'" data-pkg=') }
  return `<div class="app ch-tile f" tabindex="0" data-wk="${esc(w.key)}" data-chu="${esc(w.url)}">
    ${w.logo?`<img class="logo" loading="lazy" src="${esc(w.logo)}" onerror="this.remove()" alt="">`:`<div class="lbl">${esc(w.name)}</div>`}
    ${pct?`<div class="prog"><i style="width:${pct}%"></i></div>`:""}<div class="nm">${esc(w.name)}${w.dur?" · "+fmtDur(w.dur-w.pos):""}</div></div>`;
}
const fmtDur=s=>{ s=Math.max(0,Math.round(s)); const h=Math.floor(s/3600), m=Math.floor(s%3600/60); return h?`${h}:${pad(m)}:${pad(s%60)}`:`${m}:${pad(s%60)}` };
function watchUpsert(item){ const w=S.watch.filter(x=>x.key!==item.key); w.unshift(Object.assign({ts:Date.now()},item)); S.watch=w.slice(0,30) }
function watchRemove(key){ S.watch=S.watch.filter(x=>x.key!==key); renderHome() }

// ================= home rows =================
function chTile(c){
  const n=window.nowNext?nowNext(c)[0]:null;
  return `<div class="app ch-tile f" tabindex="0" data-chu="${esc(c.url)}">
    ${c.logo?`<img class="logo" loading="lazy" src="${esc(c.logo)}" onerror="this.remove()" alt="">`:`<div class="lbl">${esc(c.name)}</div>`}
    <div class="nm">${esc(c.name)}${n?" · "+esc(n[2]):""}</div></div>`;
}
function renderHome(){
  setRow("watchRow",S.watch.map(watchTile).join(""));
  let fv=S.favs.map(byPkg).filter(a=>a&&allowed(a.pkg));
  if(isKids()&&!fv.length) fv=visibleApps();
  if(!fv.length&&document.body.dataset.lay==="dock") fv=visibleApps().slice(0,6);
  $("favRow").innerHTML=fv.length?fv.map(tile).join(""):`<div class="empty">${L("noFav")}</div>`;
  if(window.renderMatchRow) renderMatchRow();
  const last=S.lastCh, fc=[...(last?[last]:[]),...S.favCh.filter(c=>!last||c.url!==last.url)].filter(c=>!window.chAllowed||chAllowed(c));
  setRow("favChRow",fc.map(chTile).join(""));
  const q=isKids()?[]:QUICK.map(([n,...pk])=>{const p=pk.find(x=>A.isInstalled(x));return p&&!isHidden(p)?(byPkg(p)||{pkg:p,name:n,icon:""}):null}).filter(Boolean);
  setRow("quickRow",q.map(tile).join(""));
  setRow("recentRow",S.recent.map(byPkg).filter(a=>a&&!isHidden(a.pkg)&&allowed(a.pkg)).map(tile).join(""));
  $("appGrid").innerHTML=visibleApps().slice().sort((a,b)=>appName(a).localeCompare(appName(b))).map(tile).join("");
  if(focused&&!document.body.contains(focused)) focused=null;
}
function launch(pkg){
  if(!allowed(pkg)) return;
  guard(isLocked(pkg),()=>{
    if(!A.launch(pkg)){A.toast(L("notInst"));return}
    S.recent=[pkg,...S.recent.filter(p=>p!==pkg)].slice(0,10);
    setTimeout(renderHome,800);
  });
}
function moveFav(pkg,d){ const l=S.favs, i=l.indexOf(pkg), j=i+d; if(i<0||j<0||j>=l.length) return; [l[i],l[j]]=[l[j],l[i]]; S.favs=l; renderHome();
  focus(document.querySelector(`#favRow [data-pkg="${cssq(pkg)}"]`)) }

// ================= top shelf =================
function shelf(title,sub,img){
  $("shelfTitle").textContent=title; $("shelfSub").textContent=sub||"";
  if(img&&S.wall==="dynamic") $("shelfImg").style.backgroundImage=`url("${img}")`;
}
focusHooks.push(el=>{
  if(!el.closest("#home,#apps")) return;
  if(el.dataset.pkg){ const a=byPkg(el.dataset.pkg); if(a) shelf(appName(a),(S.favs.includes(a.pkg)?"★ "+L("favorites"):"")+(isLocked(a.pkg)?"  🔒":""),custom(a.pkg).img||a.icon) }
  else if(el.dataset.chu){ const w=el.dataset.wk&&S.watch.find(x=>x.key===el.dataset.wk); const c=w||(window.chByUrl&&chByUrl(el.dataset.chu)); if(!c) return;
    const n=window.nowNext?nowNext(c)[0]:null;
    shelf(c.name,w&&w.dur?`${L("continueW")} · ${fmtDur(w.pos)} / ${fmtDur(w.dur)}`:n?`${L("now")}: ${n[2]}`:(S.lastCh&&S.lastCh.url===c.url?L("lastCh"):L("favCh")),c.logo) }
  else if(el.dataset.match&&window.matchShelf) matchShelf(el.dataset.match);
});

// ================= menus =================
function appMenu(pkg,fromFav,watchKey){
  const a=byPkg(pkg)||{name:pkg,pkg}, fav=S.favs.includes(pkg), kid=isKids();
  const items=[{label:L("open"),pri:1,fn:()=>launch(pkg)},{label:fav?L("remFav"):L("addFav"),fn:()=>{toggleList("favs",pkg);renderHome()}}];
  if(fav&&fromFav) items.push({label:L("moveL"),fn:()=>moveFav(pkg,-1)},{label:L("moveR"),fn:()=>moveFav(pkg,1)});
  const wk="app:"+pkg, inW=S.watch.some(w=>w.key===wk);
  items.push({label:inW?L("remWatch"):L("addWatch"),fn:()=>{ inW?watchRemove(wk):(watchUpsert({key:wk,type:"app",pkg,name:a.name}),renderHome()) }});
  if(!kid) items.push({label:L("customize"),fn:()=>guard(!!S.pin,()=>customizeApp(pkg))},
    {label:isHidden(pkg)?L("unhide"):L("hide"),fn:()=>guard(!!S.pin,()=>{toggleList("hidden",pkg);renderHome()})},
    {label:isLocked(pkg)?L("unlock"):L("lock"),fn:()=>{ if(!S.pin){A.toast(L("needPin"));return} guard(true,()=>{toggleList("locked",pkg);renderHome()}) }},
    {label:L("info"),fn:()=>A.appInfo(pkg)});
  items.push({label:L("cancel"),fn:()=>{}});
  dialog(appName(a),items);
}
function setCustom(pkg,patch){ const c=S.custom; c[pkg]=Object.assign({},c[pkg]||{},patch); Object.keys(c[pkg]).forEach(k=>{if(!c[pkg][k])delete c[pkg][k]}); if(!Object.keys(c[pkg]).length) delete c[pkg]; S.custom=c; renderHome() }
function customizeApp(pkg){
  const a=byPkg(pkg)||{name:pkg};
  dialog(L("customize")+" — "+appName(a),[
    {icon:"✏️",label:L("rename"),fn:()=>prompt2(L("newName"),appName(a),v=>setCustom(pkg,{name:v&&v!==a.name?v:""}))},
    {icon:"🎨",label:L("color"),fn:()=>colorPicker(pkg)},
    {icon:"🖼️",label:L("imgDevice"),fn:()=>A.pickImage("app:"+pkg)},
    {icon:"🔗",label:L("imgUrl"),fn:()=>prompt2(L("imgUrl"),(custom(pkg).img||"").startsWith("data:")?"":custom(pkg).img,v=>setCustom(pkg,{img:v}),"https://...")},
    {icon:"↩️",label:L("reset"),fn:()=>{ const c=S.custom; delete c[pkg]; S.custom=c; renderHome() }}
  ],{grid:3});
}
function colorPicker(pkg){
  const items=SWATCH.map(c=>({label:c||"✕",fn:()=>setCustom(pkg,{color:c})}));
  dialog(L("color"),items,{html:`<div class="swatches">${SWATCH.map((c,i)=>`<button class="sw f" data-di="${i}" style="background:${c||"transparent"};${c?"":"border:2px dashed #888"}"></button>`).join("")}</div>`});
}
window.onImagePicked=(purpose,data)=>{
  if(purpose==="wall"){ if(store.set("wallImg",data)){ S.wall="image"; applyLook(); if(window.renderSettings) renderSettings(); A.toast(L("saved")) } }
  else if(purpose.startsWith("app:")) setCustom(purpose.slice(4),{img:data});
};
optionHandlers.push(el=>{
  if(el.dataset.wk&&!el.dataset.pkg){ const k=el.dataset.wk; dialog((S.watch.find(w=>w.key===k)||{}).name||"",[
      {label:L("open"),pri:1,fn:()=>activate(el)},{label:L("remWatch"),fn:()=>watchRemove(k)},{label:L("cancel"),fn:()=>{}}]); return true }
  if(el.dataset.pkg){ appMenu(el.dataset.pkg,!!el.closest("#favRow"),el.dataset.wk); return true }
  return false;
});
activators.push(el=>{ if(el.dataset.pkg){ launch(el.dataset.pkg); return true } return false });

// ================= profiles =================
function switchProfile(id){
  const p=S.profiles.find(x=>x.id===id); if(!p) return;
  const go=()=>{ S.cur=id; applyLook(); applyLang(); loadApps(); if(window.renderGroups) renderGroups(); if(window.renderSettings) renderSettings();
    showPage("home"); shelf(p.emoji+" "+p.name,""); if(window.updateTicker) updateTicker(); if(window.renderMatchRow) renderMatchRow(); focus(document.querySelector('.tab[data-page="home"]')); banner(p.emoji,L("switchedTo")+" "+p.name) };
  // leaving a kids profile needs the PIN
  isKids()&&S.pin?guard(true,go):go();
}
function profileMenu(){
  const ps=S.profiles;
  dialog(L("profiles"),ps.map(p=>({icon:p.emoji,label:p.name+(p.id===S.cur?" ✓":""),pri:p.id===S.cur,fn:()=>{ if(p.id!==S.cur) switchProfile(p.id) }})),{grid:ps.length>3?4:ps.length||1});
}
activators.push(el=>{ if(el.id==="profBtn"){ profileMenu(); return true } return false });
// kids daily screen time
setInterval(()=>{
  if(!isKids()||on("frame")||Date.now()-idleAt>10*60000) return;
  const lim=+(profile().limit||0); if(!lim) return;
  const today=new Date().toDateString(); let u=S.usage; if(!u||u.d!==today) u={d:today,m:0,bonus:0};
  u.m++; S.usage=u;
  if(u.m>=lim+u.bonus) timeUp();
},60000);
function timeUp(){
  if(on("player")&&window.stopPlayer) stopPlayer();
  askPin(L("timeUp"),pin=>{ if(pin!==S.pin){A.toast(L("wrongPin"));return false} const u=S.usage; u.bonus=(u.bonus||0)+30; S.usage=u; closeDialog() },L("timeUpSub"));
  dlgOnClose=()=>{ const u=S.usage; if(u&&u.m>=(+(profile().limit||0))+(u.bonus||0)) setTimeout(timeUp,500) };
}
