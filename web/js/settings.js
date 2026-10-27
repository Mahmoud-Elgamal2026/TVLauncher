"use strict";
// ================= settings page (built from data) =================
const seg=(key,opts)=>`<div class="inline">${opts.map(([v,l])=>`<button class="btn f" data-set="${key}:${v}">${esc(l)}</button>`).join("")}</div>`;
const onoff=key=>seg(key,[[1,L("on")],[0,L("off")]]);
const field=(label,inner)=>`<div class="field">${label?`<label>${esc(label)}</label>`:""}${inner}</div>`;
const sec=(title,inner)=>`<div class="sec"><h3>${esc(title)}</h3>${inner}</div>`;
const inputRow=(id,val,ph,btnId,btnLabel)=>`<div class="inline"><input class="inp f grow" id="${id}" value="${esc(val||"")}" placeholder="${esc(ph||"")}"><button class="btn pri f" id="${btnId}">${esc(btnLabel||L("save"))}</button></div>`;

function renderSettings(){
  if(isKids()){ $("setScroll").innerHTML=""; return }
  const keep=focused&&focused.closest("#setScroll")?(focused.id?"#"+focused.id:focused.dataset.set?`[data-set="${focused.dataset.set}"]`:focused.dataset.tog?`[data-tog="${focused.dataset.tog}"]`:null):null;
  const pr=prayers.length?prayers.map((t,i)=>`<span class="btn sm">${L("prayers")[i]} ${fmtTime(t)}</span>`).join(""):"";
  const h=
  sec(L("sLook"),
    field(L("language"),seg("lang",[["ar","العربية"],["en","English"]]))+
    field(L("theme"),themePicker())+
    field(L("size"),seg("size",[["s",L("small")],["m",L("medium")],["l",L("large")]]))+
    field(L("wallpaper"),seg("wall",[["dynamic",L("wDynamic")],["daily",L("wDaily")]]).replace("</div>",`<button class="btn f${S.wall==="image"?" pri":""}" id="wallPick">${L("wPick")}</button></div>`)+
      `<div style="margin-top:1.2vh">${inputRow("wallUrl",S.wallImg&&!S.wallImg.startsWith("data:")?S.wallImg:"",L("wUrl"),"wallUrlSave")}</div>`)+
    field(L("hour"),seg("h24",[[0,"12h"],[1,"24h"]]))+
    field(L("perf"),seg("lite",[[0,L("perfFull")],[1,L("perfLite")]]))+
    field(L("webview"),`<div class="inline"><span class="btn sm">Chrome ${window.__chromeVer||"?"}</span>${(window.__chromeVer||99)<70?`<span class="btn sm">⚠️ ${L("webviewOld")}</span>`:""}</div>`))+
  sec(L("sFrame"),
    field(L("frameAfter"),seg("frameMin",[[0,L("off")],[5,"5 "+L("min")],[10,"10 "+L("min")],[30,"30 "+L("min")]]).replace(/<\/div>$/,`<button class="btn f" id="framePrev">▶ ${L("preview")}</button></div>`))+
    field(L("frameStyle"),seg("frameStyle",[["gallery",L("fsGallery")],["art",L("fsArt")],["clock",L("fsClock")]]))+
    field(L("frameSrc"),seg("frameSrc",[["mine",`${L("srcMine")} (${S.frames.length})`],["online",L("srcOnline")],["grad",L("srcGrad")]]).replace(/<\/div>$/,
      `<button class="btn f" id="addPhotos">➕ ${L("addPhotos")}</button>${S.frames.length?`<button class="btn f" id="clearPhotos">🗑 ${L("remove")} (${S.frames.length})</button>`:""}</div>`))+
    field(L("frameEvery"),seg("frameEvery",[[1,"1 "+L("min")],[5,"5 "+L("min")],[15,"15 "+L("min")],[30,"30 "+L("min")]]))+
    field(L("frameWidgets"),`<div class="inline">${[["clock","wClock"],["weather","wWeather"],["prayer","wPrayer"],["match","wMatch"]].map(([k,l])=>`<button class="btn f${S.fw[k]?" pri":""}" data-tog="fw:${k}">${L(l)}</button>`).join("")}</div>`))+
  sec(L("sWeather"),field(L("city"),inputRow("cityInp",S.city,"Cairo","citySave")))+
  sec(L("sPrayer"),
    field(L("prayerOn"),onoff("prayerOn"))+(pr?field("",`<div class="inline">${pr}</div>`):"")+
    field(L("method"),seg("method",[["egypt",L("mEgypt")],["makkah",L("mMakkah")],["mwl",L("mMWL")],["karachi",L("mKarachi")]]))+
    field(L("asr"),seg("asrHanafi",[[0,L("asrStd")],[1,L("asrHanafi")]]))+
    field(L("adhanOn"),onoff("adhanOn"))+
    field(L("beforeAlert"),seg("adhanBefore",[[0,L("off")],[5,"5 "+L("min")],[10,"10 "+L("min")],[15,"15 "+L("min")]]))+
    field(L("adhanSound"),`<div class="inline"><button class="btn f" id="testAdhan">🔔 ${L("adhanChime")} / ${L("preview")}</button></div><div style="margin-top:1.2vh">${inputRow("adhanUrl",S.adhanUrl,L("adhanUrlPh"),"adhanSave")}</div>`))+
  sec(L("sSports"),
    field(L("sportsOn"),onoff("sportsOn"))+
    field(L("leagues"),`<div class="inline">${LEAGUES.map(([id,ar,en])=>`<button class="btn f${S.leagues.includes(id)?" pri":""}" data-tog="leagues:${id}">${esc(S.lang==="ar"?ar:en)}</button>`).join("")}</div>`)+
    field(L("favTeams"),inputRow("teamsInp",S.favTeams,L("favTeamsPh"),"teamsSave"))+`<div class="field"><label>${esc(L("sportsNote"))}</label></div>`)+
  sec(L("sNotif"),
    field(L("notifSys"),onoff("notifSys").replace(/<\/div>$/,`<button class="btn f" id="grantNotif">${A.notifAccess()?"✅ "+L("granted"):"🔓 "+L("grant")}</button></div>`))+
    field(L("tickerShow"),onoff("tickerOn")))+
  sec(L("sTv"),
    field(L("playlists"),S.lists.map((l,i)=>`<div class="tagrow"><span class="tx">${l.type==="xtream"?"🔑":"📃"} <b>${esc(l.name)}</b> — ${esc(l.type==="xtream"?`${l.server} (${l.user})`:l.url)}</span><button class="btn sm f" data-dellist="${i}">🗑 ${L("remove")}</button></div>`).join("")+
      `<div class="inline" style="margin-top:1vh"><input class="inp f" id="listName" placeholder="${esc(L("listName"))}" style="width:16vw"><input class="inp f grow" id="listUrl" placeholder="${esc(L("listUrl"))}"><button class="btn pri f" id="listAdd">${L("addM3u")}</button></div>`+
      `<div class="inline" style="margin-top:1vh"><input class="inp f grow" id="xtServer" placeholder="${esc(L("xtServer"))}"><input class="inp f" id="xtUser" placeholder="${esc(L("xtUser"))}" style="width:14vw"><input class="inp f" id="xtPass" placeholder="${esc(L("xtPass"))}" style="width:14vw"><button class="btn pri f" id="xtAdd">${L("addXtream")}</button></div>`)+
    field(L("epg"),inputRow("epgInp",S.epg,"http://.../epg.xml.gz","epgSave",L("load")))+
    field(L("playerMode"),seg("ext",[[0,L("builtin")],[1,L("external")]]))+
    field(L("preview2"),onoff("preview"))+
    field(L("checkCh"),seg("hideDead",[[1,L("hideDead")],[0,L("showDead")]]).replace(/<\/div>$/,`<button class="btn f" data-set="autoCheck:${S.autoCheck?0:1}">${S.autoCheck?"✅":"⬜"} ${L("autoCheck")}</button><button class="btn f" id="checkNow">🩺 ${L("checkCh")}</button></div>`)))+
  sec(L("sApps"),field("",`<div class="inline"><button class="btn f" id="hiddenList">${L("hiddenApps")}</button></div>`)+field("",seg("showHidden",[[0,L("hideHidden")],[1,L("showHidden")]])))+
  sec(L("sKeys"),
    (Object.keys(S.keymap).length?Object.entries(S.keymap).map(([c,v])=>`<div class="tagrow"><span class="tx">🎛️ <b>${esc(v.name)}</b> → ${esc(actionLabel(v.a))}</span><button class="btn sm f" data-delkey="${c}">🗑 ${L("remove")}</button></div>`).join(""):`<div class="field"><label>${L("noKeys")}</label></div>`)+
    `<div class="inline" style="margin-top:1vh"><button class="btn pri f" id="addKey">➕ ${L("addKey")}</button></div>`)+
  sec(L("sProfiles"),`<div class="inline">${S.profiles.map(p=>`<button class="btn f${p.id===S.cur?" pri":""}" data-prof="${esc(p.id)}">${esc(p.emoji)} ${esc(p.name)}${p.kids?" 👶":""}</button>`).join("")}<button class="btn f" id="addProfile">➕ ${L("addProfile")}</button></div>`)+
  (window.lifeSettings?lifeSettings():"")+
  (window.phaseFourSettings?phaseFourSettings():"")+
  sec(L("sSecurity"),field(S.pin?"🔒 "+L("pinOn"):"🔓 "+L("pinNone"),`<div class="inline"><button class="btn f" id="pinSet">${L("pinSet")}</button><button class="btn f" id="pinOff">${L("pinOff")}</button></div>`)+field("",seg("lockSettings",[[0,L("lockSetNo")],[1,L("lockSetYes")]])))+
  sec(L("sBackup"),`<div class="inline"><button class="btn f" id="bkExport">${L("bkExport")}</button><button class="btn f" id="bkImport">${L("bkImport")}</button><button class="btn f" id="clearCache">${L("clearCache")}</button><button class="btn f" id="sysSet">${L("system")}</button></div>`);
  $("setScroll").innerHTML=h; markSettings();
  if(keep){ const el=$("setScroll").querySelector(keep); if(el) focus(el) }
}
window.renderSettings=renderSettings;
function markSettings(){
  document.querySelectorAll("#setScroll [data-set]").forEach(b=>{ const [k,v]=b.dataset.set.split(":"); if(k==="autoCheck") return; const cur=S[k];
    b.classList.toggle("pri", typeof cur==="boolean"? cur===(v==="1") : String(cur)===v) });
}
const AFTER={lang:()=>{applyLang();renderHome();renderGroups()},theme:applyLook,size:applyLook,wall:applyLook,lite:applyLook,h24:tick,
  method:()=>{computePrayers();updateTicker()},asrHanafi:()=>{computePrayers();updateTicker()},prayerOn:updateTicker,tickerOn:updateTicker,
  sportsOn:loadSports,showHidden:renderHome,hideDead:renderChannels,preview:pvStop};

activators.push(el=>{
  if(el.dataset.set){ const [k,v]=el.dataset.set.split(":"); const t=typeof DEF[k];
    S[k]=t==="boolean"?v==="1":t==="number"?+v:v; if(AFTER[k]) AFTER[k]();
    renderSettings(); focus(document.querySelector(`#setScroll [data-set^="${k}:"].pri`)||document.querySelector(`#setScroll [data-set="${el.dataset.set}"]`)); return true }
  if(el.dataset.tog){ const [k,v]=el.dataset.tog.split(":");
    if(k==="fw"){ const f=S.fw; f[v]=!f[v]; S.fw=f } else { toggleList(k,v); if(k==="leagues") loadSports() }
    renderSettings(); return true }
  if(el.dataset.dellist!==undefined){ const l=S.lists; l.splice(+el.dataset.dellist,1); S.lists=l; renderSettings(); loadLists(); return true }
  if(el.dataset.delkey!==undefined){ const m=S.keymap; delete m[el.dataset.delkey]; S.keymap=m; syncKeyMap(); renderSettings(); return true }
  if(el.dataset.prof!==undefined){ editProfile(el.dataset.prof); return true }
  const v=id=>($(id)||{}).value?$(id).value.trim():"";
  switch(el.id){
    case "wallPick": A.pickImage("wall"); return true;
    case "wallUrlSave": { const u=v("wallUrl"); if(u){S.wallImg=u;S.wall="image"} else {S.wallImg="";S.wall="dynamic"} applyLook(); renderSettings(); A.toast(L("saved")); return true }
    case "framePrev": startFrame(); return true;
    case "addPhotos": NA?A.pickFrames():window.onFramesAdded(JSON.stringify(["https://picsum.photos/seed/demo1/1920/1080","https://picsum.photos/seed/demo2/1920/1080"])); return true;
    case "clearPhotos": guard(!!S.pin,()=>{ S.frames.forEach(A.deleteFrame); S.frames=[]; if(S.frameSrc==="mine") S.frameSrc="online"; renderSettings() }); return true;
    case "citySave": S.city=v("cityInp")||"Cairo"; S.loc=null; weather(); A.toast(L("saved")); return true;
    case "adhanSave": S.adhanUrl=v("adhanUrl"); A.toast(L("saved")); return true;
    case "testAdhan": playAdhan(); return true;
    case "teamsSave": S.favTeams=v("teamsInp"); A.toast(L("saved")); return true;
    case "grantNotif": A.openNotifAccess(); return true;
    case "listAdd": { const u=v("listUrl"); if(!u) return true; const l=S.lists; l.push({name:v("listName")||("IPTV "+(l.length+1)),url:u}); S.lists=l; renderSettings(); loadLists().then(loadEpg); A.toast(L("saved")); return true }
    case "xtAdd": { const sv=v("xtServer"), u=v("xtUser"), pw=v("xtPass"); if(!sv||!u) return true; const l=S.lists;
      l.push({type:"xtream",name:v("listName")||sv.replace(/^https?:\/\//,"").split(/[:/]/)[0],server:/^https?:/.test(sv)?sv:"http://"+sv,user:u,pass:pw}); S.lists=l;
      renderSettings(); loadLists().then(loadEpg); A.toast(L("saved")); return true }
    case "epgSave": S.epg=v("epgInp"); loadEpg(); A.toast(L("saved")); return true;
    case "checkNow": runCheck(false); return true;
    case "hiddenList": { const h=S.hidden.map(byPkg).filter(Boolean);
      dialog(L("hiddenApps"),h.length?h.map(a=>({label:"👁 "+appName(a),fn:()=>guard(!!S.pin,()=>{toggleList("hidden",a.pkg);renderHome()})})):[{label:L("noHidden"),fn:()=>{}}]); return true }
    case "addKey": learnKey(); return true;
    case "addProfile": guard(!!S.pin,()=>prompt2(L("profName"),"",n=>{ if(!n) return; const ps=S.profiles; const id="p"+Date.now().toString(36); ps.push({id,name:n,emoji:"🙂",kids:false}); S.profiles=ps; renderSettings(); setTimeout(()=>editProfile(id),60) })); return true;
    case "pinSet": S.pin?guard(true,setPin):setPin(); return true;
    case "pinOff": guard(true,()=>{ if(S.profiles.some(p=>p.kids)){ A.toast(L("kids")+" → "+L("pinOn")); return } S.pin=""; S.lockSettings=false; renderSettings(); A.toast(L("saved")) }); return true;
    case "bkExport": exportBackup(); return true;
    case "bkImport": A.importBackup(); return true;
    case "clearCache": doClearCache(); return true;
    case "sysSet": A.openSettings(""); return true;
  }
  return false;
});
pageHooks["settings:enter"]=renderSettings;

// ================= profile editor =================
const EMOJIS=["😎","🙂","👨","👩","👦","👧","👶","👴","👵","🦁","🐱","🚀","⚽","🎮","🌙","⭐"];
function updProfile(id,patch){ const ps=S.profiles; const p=ps.find(x=>x.id===id); Object.assign(p,patch); S.profiles=ps; applyLook(); renderSettings() }
function editProfile(id){
  const p=S.profiles.find(x=>x.id===id); if(!p) return;
  guard(!!S.pin,()=>{
    const items=[
      {icon:"✏️",label:L("rename"),fn:()=>prompt2(L("profName"),p.name,n=>{ if(n) updProfile(id,{name:n}); setTimeout(()=>editProfile(id),60) })},
      {icon:p.emoji,label:L("emoji"),fn:()=>dialog(L("emoji"),EMOJIS.map(e=>({label:e,fn:()=>{updProfile(id,{emoji:e});setTimeout(()=>editProfile(id),60)}})),{grid:4})},
      {icon:p.kids?"👶":"🧑",label:p.kids?L("kids"):L("adult"),fn:()=>{ if(!p.kids&&!S.pin){A.toast(L("needPin"));return} if(id===S.cur&&!p.kids){A.toast(L("cancel"));return}
        updProfile(id,Object.assign({kids:!p.kids},p.kids?{}:KIDS_DEF,p.kids?{}:{allowedApps:p.allowedApps||[],allowedGroups:p.allowedGroups||[]})); setTimeout(()=>editProfile(id),60) }}];
    if(p.kids) items.push(
      {icon:"⏱️",label:`${L("limit")}: ${p.limit?p.limit/60+" "+L("hr"):L("noLimit")}`,fn:()=>dialog(L("limit"),[0,60,120,180,240].map(m=>({label:m?m/60+" "+L("hr"):L("noLimit"),fn:()=>{updProfile(id,{limit:m});setTimeout(()=>editProfile(id),60)}})),{grid:5})},
      {icon:"🌙",label:`${L("bedtime")}: ${p.bedFrom?`${p.bedFrom}:00 → ${p.bedTo||7}:00`:L("off")}`,fn:()=>dialog(L("bedtime"),[[0,0],[20,7],[21,7],[22,7],[23,8]].map(([a,b])=>({label:a?`${a}:00 → ${b}:00`:L("off"),fn:()=>{updProfile(id,{bedFrom:a,bedTo:b});setTimeout(()=>editProfile(id),60)}})),{grid:5})},
      {icon:"📦",label:`${L("allowedApps")} (${(p.allowedApps||[]).length})`,fn:()=>multiSelect(L("allowedApps"),apps.map(a=>({k:a.pkg,l:appName(a)})),id,"allowedApps")},
      {icon:"📺",label:`${L("allowedGroups")} (${(p.allowedGroups||[]).length})`,fn:()=>multiSelect(L("allowedGroups"),[...countries.map(c=>({k:"c:"+c.n,l:"🌍 "+c.label})),...groups.map(g=>({k:"g:"+g.n,l:g.n}))],id,"allowedGroups")});
    if(id!=="main"&&id!==S.cur) items.push({icon:"🗑",label:L("delProfile"),fn:()=>{ S.profiles=S.profiles.filter(x=>x.id!==id); Object.keys(localStorage).filter(k=>k.startsWith("p:"+id+":")).forEach(k=>localStorage.removeItem(k)); renderSettings() }});
    items.push({icon:"✅",label:L("done"),fn:()=>{}});
    dialog(`${p.emoji} ${p.name}`,items,{grid:3});
  });
}
function multiSelect(title,opts,id,field){
  const draw=(focusIdx)=>{
    const p=S.profiles.find(x=>x.id===id), sel=p[field]||[];
    const items=opts.map(o=>({label:(sel.includes(o.k)?"✅ ":"⬜ ")+o.l,keep:true,fn:()=>{ const s=new Set(sel); s.has(o.k)?s.delete(o.k):s.add(o.k); updProfile(id,{[field]:[...s]}); draw(opts.indexOf(o)) }}));
    items.push({label:"✔ "+L("done"),pri:1,fn:()=>setTimeout(()=>editProfile(id),60)});
    dialog(title,items,{grid:3,focusSel:`[data-di="${focusIdx||0}"]`});
  };
  draw(0);
}

// ================= boot =================
function boot(){
  // show the home screen first; network and heavy work follow once it is on screen
  applyLook(); applyLang(); loadApps(); syncKeyMap(); status(); tick();
  focus(document.querySelector(".tab.on")||document.querySelector(".tab"));
  setTimeout(()=>{ weather(); loadLists().then(()=>setTimeout(loadEpg,1500)) },250);
  setTimeout(loadSports,4000);
  if(window.__chromeVer&&window.__chromeVer<55) setTimeout(()=>banner("⚠️",L("webview"),L("webviewOld"),15000),3000);
  setTimeout(()=>{ if(!$("settings").classList.contains("on")) renderSettings() },2500);
}
setInterval(tick,5000); setInterval(status,20000);
