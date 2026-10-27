"use strict";
Object.assign(DEF,{catalogUrl:"",animFast:false});
// ================= catalog =================
// src: fdroid:<pkg> | github:<owner/repo>[|regex] | play:<pkg> | search:<words> | web:<url> | url:<apk>
const CATALOG=[
 {id:"tvbro",cat:"browser",name:"TV Bro",pkg:"com.phlox.tvwebbrowser",icon:"🌐",color:"#1565c0",src:["github:truefedot/tv-bro|universal|release","play:com.phlox.tvwebbrowser"],star:1,desc:{ar:"متصفح للتلفزيون بمؤشر للريموت ومانع إعلانات مدمج",en:"TV browser with remote cursor and built-in ad blocker"}},
 {id:"adguard",cat:"browser",name:"AdGuard TV",pkg:"com.adguard.android.tv",icon:"🛡️",color:"#2e7d32",src:["web:https://adguard.com/adguard-android-tv/overview.html"],desc:{ar:"مانع إعلانات لكل الجهاز (DNS)",en:"System-wide ad blocking (DNS)"}},
 {id:"vlc",cat:"player",name:"VLC",pkg:"org.videolan.vlc",icon:"🔶",color:"#ef6c00",src:["fdroid:org.videolan.vlc","play:org.videolan.vlc"],star:1,desc:{ar:"بيشغّل أي فيديو وأي ترجمة",en:"Plays any video, any subtitle"}},
 {id:"kodi",cat:"player",name:"Kodi",pkg:"org.xbmc.kodi",icon:"🔷",color:"#0277bd",src:["play:org.xbmc.kodi"],desc:{ar:"مركز ميديا كامل",en:"Full media center"}},
 {id:"mx",cat:"player",name:"MX Player",pkg:"com.mxtech.videoplayer.ad",icon:"▶️",color:"#1e88e5",src:["play:com.mxtech.videoplayer.ad"],desc:{ar:"مشغّل فيديو خفيف",en:"Lightweight video player"}},
 {id:"jellyfin",cat:"player",name:"Jellyfin",pkg:"org.jellyfin.androidtv",icon:"🟣",color:"#6a1b9a",src:["fdroid:org.jellyfin.androidtv"],desc:{ar:"مكتبة أفلامك من الكمبيوتر",en:"Your own media server"}},
 {id:"plex",cat:"player",name:"Plex",pkg:"com.plexapp.android",icon:"🟠",color:"#e65100",src:["play:com.plexapp.android"],desc:{ar:"مكتبة ميديا وقنوات مجانية",en:"Media library and free channels"}},
 {id:"tivimate",cat:"iptv",name:"TiviMate",pkg:"ar.tvplayer.tv",icon:"📺",color:"#283593",src:["play:ar.tvplayer.tv"],star:1,desc:{ar:"أشهر مشغّل IPTV للتلفزيون",en:"Popular IPTV player"}},
 {id:"smarters",cat:"iptv",name:"IPTV Smarters Pro",pkg:"com.nst.iptvsmarterstvbox",icon:"📡",color:"#00695c",src:["play:com.nst.iptvsmarterstvbox"],desc:{ar:"مشغّل IPTV بيدعم Xtream",en:"IPTV player with Xtream"}},
 {id:"ottnav",cat:"iptv",name:"OTT Navigator",pkg:"studio.scillarium.ottnavigator",icon:"🧭",color:"#4527a0",src:["play:studio.scillarium.ottnavigator"],desc:{ar:"مشغّل IPTV بدليل برامج",en:"IPTV player with guide"}},
 {id:"perfect",cat:"iptv",name:"Perfect Player",pkg:"com.niklabs.pp",icon:"🎛️",color:"#37474f",src:["play:com.niklabs.pp"],desc:{ar:"مشغّل IPTV خفيف",en:"Lightweight IPTV player"}},
 {id:"netflix",cat:"stream",name:"Netflix",pkg:"com.netflix.ninja",icon:"🎬",color:"#b71c1c",src:["play:com.netflix.ninja"]},
 {id:"youtube",cat:"stream",name:"YouTube",pkg:"com.google.android.youtube.tv",icon:"▶️",color:"#c62828",src:["play:com.google.android.youtube.tv"]},
 {id:"shahid",cat:"stream",name:"Shahid",pkg:"net.mbc.shahidTV",icon:"🎞️",color:"#00838f",src:["play:net.mbc.shahidTV","search:Shahid"]},
 {id:"watchit",cat:"stream",name:"WATCH IT",pkg:"com.watchit.vod.androidtv",icon:"🎥",color:"#f9a825",src:["search:WATCH IT"]},
 {id:"osn",cat:"stream",name:"OSN+",pkg:"com.osn.go",icon:"🍿",color:"#4a148c",src:["search:OSN+"]},
 {id:"prime",cat:"stream",name:"Prime Video",pkg:"com.amazon.amazonvideo.livingroom",icon:"📦",color:"#0d47a1",src:["play:com.amazon.amazonvideo.livingroom"]},
 {id:"disney",cat:"stream",name:"Disney+",pkg:"com.disney.disneyplus",icon:"✨",color:"#1a237e",src:["play:com.disney.disneyplus"]},
 {id:"anghami",cat:"stream",name:"Anghami",pkg:"com.anghami",icon:"🎵",color:"#6a1b9a",src:["search:Anghami"]},
 {id:"spotify",cat:"stream",name:"Spotify",pkg:"com.spotify.tv.android",icon:"🎧",color:"#1b5e20",src:["play:com.spotify.tv.android"]},
 {id:"tod",cat:"sports",name:"TOD (beIN)",pkg:"",icon:"⚽",color:"#5e35b1",src:["search:TOD beIN"],star:1,desc:{ar:"الطريقة الرسمية لقنوات beIN",en:"Official beIN streaming"}},
 {id:"ssc",cat:"sports",name:"SSC / Shahid Sports",pkg:"",icon:"🏟️",color:"#00897b",src:["search:SSC sports"],desc:{ar:"الدوري السعودي رسمي",en:"Saudi league, official"}},
 {id:"onsport",cat:"sports",name:"Watch It Sports",pkg:"",icon:"🏆",color:"#ef6c00",src:["search:WATCH IT"],desc:{ar:"الدوري المصري رسمي",en:"Egyptian league, official"}},
 {id:"shizuku",cat:"tools",name:"Shizuku",pkg:"moe.shizuku.privileged.api",icon:"🔑",color:"#00796b",src:["github:RikkaApps/Shizuku|release","play:moe.shizuku.privileged.api"],star:1,desc:{ar:"لازم عشان مسح تطبيقات النظام من غير روت",en:"Needed to remove system apps without root"}},
 {id:"downloader",cat:"tools",name:"Downloader",pkg:"com.esaba.downloader",icon:"⬇️",color:"#e65100",src:["play:com.esaba.downloader"],desc:{ar:"تنزيل ملفات بالرابط",en:"Download files by URL"}},
 {id:"sendfiles",cat:"tools",name:"Send Files to TV",pkg:"com.yablio.sendfilestotv",icon:"📲",color:"#1565c0",src:["play:com.yablio.sendfilestotv"],desc:{ar:"نقل ملفات من الموبايل",en:"Send files from your phone"}},
 {id:"xplore",cat:"tools",name:"X-plore",pkg:"com.lonelycatgames.Xplore",icon:"🗂️",color:"#455a64",src:["play:com.lonelycatgames.Xplore"],desc:{ar:"مدير ملفات",en:"File manager"}},
 {id:"analiti",cat:"tools",name:"Analiti Speed Test",pkg:"com.analiti.fastest.android",icon:"📶",color:"#0277bd",src:["play:com.analiti.fastest.android"],desc:{ar:"قياس سرعة النت والواي فاي",en:"Internet & Wi-Fi speed test"}}
];
const STORE_CATS=[["all","⭐","stAll"],["browser","🌐","stBrowser"],["player","🎬","stPlayer"],["iptv","📡","stIptv"],["stream","🍿","stStream"],["sports","⚽","stSports"],["tools","🛠️","stTools"]];
let storeCat="all", customCatalog=[], resolved={};
const allCatalog=()=>CATALOG.concat(customCatalog);
async function loadCustomCatalog(){ if(!S.catalogUrl){customCatalog=[];return} try{ const r=await A.fetchJSON(S.catalogUrl); customCatalog=(Array.isArray(r)?r:r.apps||[]).filter(x=>x&&x.name&&x.src).map((x,i)=>Object.assign({id:"c"+i,cat:x.cat||"tools",icon:x.icon||"📦",color:x.color||"#455a64",custom:1},x,{src:[].concat(x.src)})) }catch(e){ customCatalog=[]; A.toast(L("loadErr")) } }
const pinfo=pkg=>{ if(!pkg) return null; try{ const s=nat("pkgInfo",pkg); return s?JSON.parse(s):null }catch(e){ return null } };
const vcmp=(a,b)=>{ const x=String(a||"").split(/[.\-]/).map(n=>parseInt(n)||0), y=String(b||"").split(/[.\-]/).map(n=>parseInt(n)||0); for(let i=0;i<Math.max(x.length,y.length);i++){ if((x[i]||0)!==(y[i]||0)) return (x[i]||0)-(y[i]||0) } return 0 };
async function resolveSrc(app){
  if(resolved[app.id]) return resolved[app.id];
  for(const s of app.src){
    const [type,...rest]=s.split(":"), val=rest.join(":");
    try{
      if(type==="fdroid"){ const r=await A.fetchJSON(`https://f-droid.org/api/v1/packages/${val}`); const vc=r.suggestedVersionCode, p=(r.packages||[]).find(x=>x.versionCode===vc)||{};
        return resolved[app.id]={type,apk:`https://f-droid.org/repo/${val}_${vc}.apk`,ver:p.versionName||String(vc)} }
      if(type==="github"){ const [repo,...pats]=val.split("|"); const r=await A.fetchJSON(`https://api.github.com/repos/${repo}/releases/latest`);
        const apks=(r.assets||[]).filter(a=>/\.apk$/i.test(a.name)); let pick=apks.find(a=>pats.every(p=>new RegExp(p,"i").test(a.name)))||apks.find(a=>/universal|armeabi-v7a|arm7/i.test(a.name))||apks[0];
        if(pick) return resolved[app.id]={type,apk:pick.browser_download_url,ver:String(r.tag_name||"").replace(/^v/i,"")} }
      if(type==="url") return resolved[app.id]={type,apk:val,ver:""};
      if(type==="play") return resolved[app.id]={type,play:`market://details?id=${val}`};
      if(type==="search") return resolved[app.id]={type,play:`market://search?q=${encodeURIComponent(val)}&c=apps`};
      if(type==="web") return resolved[app.id]={type,web:val};
    }catch(e){}
  }
  return resolved[app.id]={type:"none"};
}
function appStatus(app){ const i=pinfo(app.pkg), r=resolved[app.id];
  if(!i) return {inst:false,label:L("stInstall")};
  if(r&&r.ver&&vcmp(r.ver,i.vn)>0) return {inst:true,upd:true,label:`${L("stUpdate")} ${r.ver}`,vn:i.vn};
  return {inst:true,label:L("stInstalled"),vn:i.vn} }
function storeCard(app){
  const st=appStatus(app), d=app.desc?(app.desc[S.lang]||app.desc.en||""):"";
  return `<div class="scard f" tabindex="0" data-store="${esc(app.id)}"><div class="sico" style="background:${esc(app.color)}">${esc(app.icon)}</div>
    <div class="stx"><b>${esc(app.name)}${app.star?" ⭐":""}</b><small>${esc(d)}</small></div>
    <span class="sbadge${st.upd?" upd":st.inst?" ok":""}">${st.upd?"⬆️ ":st.inst?"✓ ":""}${esc(st.label)}</span></div>`;
}
function renderStore(){
  const tools=[["boost","✨","stBoost"],["clean","🧽","stClean"],["sys","🧹","stSystem"],["ram","⚡","stRam"],["code","🔢","stCode"],["link","🔗","stLink"],["custom","📚","stCustom"]];
  $("storeCats").innerHTML=STORE_CATS.map(([k,i,l])=>`<div class="it f${storeCat===k?" sel":""}" tabindex="0" data-scat="${k}">${i} ${L(l)}</div>`).join("")+
    `<div class="cath">${L("stTools2")}</div>`+tools.map(([k,i,l])=>`<div class="it f${storeCat===k?" sel":""}" tabindex="0" data-scat="${k}">${i} ${L(l)}</div>`).join("");
  const box=$("storeMain");
  if(storeCat==="sys") return renderSysApps();
  if(storeCat==="ram") return renderRam();
  if(storeCat==="clean") return renderClean();
  if(storeCat==="boost") return renderBoost();
  if(storeCat==="code") { const mc=S.myCodes||[];
    box.innerHTML=`<div class="sec"><h3>🔢 ${L("stCode")}</h3><div class="field"><label>${L("stCodeHint")}</label>${inputRow("codeIn","","12345","codeGo",L("stInstall"))}</div><div id="dlState" class="field"></div></div>
    <div class="sec"><h3>⭐ ${L("myCodes")}</h3><div class="field"><label>${L("myCodesHint")}</label><div class="inline"><input class="inp f" id="mcNum" placeholder="${L("codeNum")}" style="width:10vw"><input class="inp f" id="mcUrl" placeholder="https://..." dir="ltr" style="flex:1"><input class="inp f" id="mcName" placeholder="${L("codeName")}" style="width:14vw"><button class="btn pri f" id="mcAdd">${L("save")}</button></div></div>
    ${mc.length?`<div class="list">${mc.map((c,i)=>`<div class="inline" style="margin-bottom:.8vh"><button class="btn f" data-mc="${i}" style="flex:1;text-align:start"><b dir="ltr">${esc(c.n)}</b> · ${esc(c.name||c.url)}</button><button class="btn f" data-mcdel="${i}">🗑</button></div>`).join("")}</div>`:""}</div>`; return }
  if(storeCat==="link") { box.innerHTML=`<div class="sec"><h3>🔗 ${L("stLink")}</h3><div class="field"><label>${L("stLinkHint")}</label>${inputRow("apkUrl","","https://.../app.apk","apkGo",L("stInstall"))}</div><div id="dlState" class="field"></div></div>`; return }
  if(storeCat==="custom"){ box.innerHTML=`<div class="sec"><h3>📚 ${L("stCustom")}</h3><div class="field"><label>${L("stCustomHint")}</label>${inputRow("catUrl",S.catalogUrl,"https://.../catalog.json","catSave")}</div>
    <div class="field"><label>${L("stCustomFmt")}</label><pre class="code" dir="ltr">[{"name":"My App","icon":"📺","cat":"iptv","pkg":"com.example.app",\n  "src":"url:https://example.com/app.apk"}]</pre></div>${customCatalog.length?`<div class="sgrid">${customCatalog.map(storeCard).join("")}</div>`:""}</div>`; return }
  const list=allCatalog().filter(a=>storeCat==="all"?(a.star||a.custom):a.cat===storeCat);
  box.innerHTML=`<div class="sgrid">${list.map(storeCard).join("")}</div>`;
  list.forEach(a=>{ if(!resolved[a.id]&&a.src.some(s=>/^(fdroid|github):/.test(s))&&pinfo(a.pkg)) resolveSrc(a).then(()=>{ const el=box.querySelector(`[data-store="${cssq(a.id)}"]`); if(el&&el.isConnected){ const f=focused===el; el.outerHTML=storeCard(a); if(f) focus(box.querySelector(`[data-store="${cssq(a.id)}"]`)) } }) });
}
async function storeAction(app){
  const st=appStatus(app), items=[];
  banner("⏳",app.name,L("loading"),1500);
  const r=await resolveSrc(app), st2=appStatus(app);
  if(st2.inst) items.push({icon:"▶️",label:L("open"),pri:!st2.upd,fn:()=>launch(app.pkg)});
  if(r.apk&&(!st2.inst||st2.upd)) items.push({icon:"⬇️",label:st2.upd?`${L("stUpdate")} ${r.ver}`:`${L("stInstall")}${r.ver?" "+r.ver:""}`,pri:1,fn:()=>installFrom(app.name,r.apk)});
  if(r.play) items.push({icon:"🛍️",label:L("stPlay"),pri:!st2.inst&&!r.apk,fn:()=>nat("openUri",r.play)});
  if(r.web) items.push({icon:"🌐",label:L("stWeb"),pri:!st2.inst,fn:()=>openWeb(r.web)});
  if(st2.inst) items.push({icon:"🗑",label:L("stRemove"),fn:()=>nat("uninstallApp",app.pkg)},{icon:"ℹ️",label:L("info"),fn:()=>A.appInfo(app.pkg)});
  if(!items.length) items.push({label:L("stNoSrc"),fn:()=>{}});
  items.push({label:L("cancel"),fn:()=>{}});
  dialog(`${app.icon} ${app.name}${st2.vn?" · v"+st2.vn:""}`,items,{sub:app.desc?(app.desc[S.lang]||app.desc.en):""});
}
function installFrom(name,url){ if(!NA){ A.toast(url); return } banner("⬇️",name,L("updDownloading"),3000); nat("installApk",url,"st:"+name) }
window.onApkProgress=(id,p)=>{ if(id==="update") return; const n=id.replace(/^st:/,"");
  if(p===-2) banner("🔐",L("updPerm"),L("updPermSub"),12000); else if(p===-1) banner("⚠️",n,L("loadErr")); else if(p===100) banner("✅",n,L("updReady"));
  else if(p>0&&p%20===0) banner("⬇️",n,p+"%",2000);
  const d=$("dlState"); if(d) d.textContent=p>=0?`${n}: ${p}%`:"" };
function openWeb(url){ const b=pinfo("com.phlox.tvwebbrowser"); if(b) nat("openUri",url); else nat("openUri",url) }
function openBrowser(){ const app=CATALOG.find(a=>a.id==="tvbro"); if(pinfo(app.pkg)) launch(app.pkg); else { showPage("store"); storeCat="browser"; renderStore(); storeAction(app) } }

// ================= system apps (no root) =================
// red = never (breaks the box) · yellow = careful · green = commonly safe to remove on TV boxes
const RED=[/^android$/,/^com\.android\.(systemui|settings|phone|shell|providers\..*|packageinstaller|permissioncontroller|externalstorage|inputdevices|location\.fused|networkstack.*|bluetooth|wifi.*|se|server\.telecom|keychain|certinstaller|documentsui|tv\.settings|webview|media.*|ext\..*|localtransport|sharedstoragebackup|vpndialogs|captiveportallogin|cellbroadcast.*|dynsystem|statementservice|proxyhandler|emergency|mtp)$/,
  /^com\.google\.android\.(webview|gms|gsf|ext\..*|packageinstaller|permissioncontroller|tv\.frameworkpackagestubs|leanback\.ime|inputmethod\..*|tvlauncher|apps\.tv\.launcherx|networkstack.*|modulemetadata|tv\.remote\.service)$/,
  /^com\.mahmoud\.tvlauncher$/,/^moe\.shizuku\.privileged\.api$/,/ime$|keyboard|inputmethod/i,/^com\.(amlogic|droidlogic|mediatek|rockchip|realtek|hisilicon)\./];
const GREEN=[/^com\.google\.android\.(tvrecommendations|feedback|play\.games|music|videos|youtube\.tvmusic|marvin\.talkback|backdrop|tv\.bugreportsender|partnersetup|sss\.authbridge|apps\.tv\.dreamx|tts)$/,
  /^com\.android\.(printspooler|dreams\..*|gallery3d|calendar|email|egg|bips|bookmarkprovider|calllogbackup|wallpaper.*|providers\.calendar|smspush|stk|musicfx|soundrecorder|camera2|deskclock|htmlviewer|traceur|onetimeinitializer)$/,
  /^com\.(netflix\.partner\.activation|amazon\..*\.demo|facebook\..*)$/,/demo|sample|tutorial|bugreport|feedback|ota\.|update\.client/i];
// ads, analytics and telemetry services (matched on whole package-name segments, never on core packages)
const ADS=[/(^|\.)(ads?|adservice|adsdk|advert\w*|analytics|telemetry|tracking|tracker|statistics?|crashreport\w*|logcollect\w*|datacollect\w*|usagestats\w*|marketing|promo\w*|recommend\w*|tvrecommendations)(\.|$)/i,
  /^com\.(xiaomi|mitv|miui)\.\w*(ad|analytics|stat|track)\w*/i,/^com\.(tcl|hisense|skyworth|amlogic\.ota)\.\w*(ad|analytics|report|stat)\w*/i];
const ADS_KEEP=[/^com\.google\.android\.adservices/, /^com\.android\.providers\./];
const isAds=p=>ADS.some(r=>r.test(p))&&!ADS_KEEP.some(r=>r.test(p));
const tier=p=>RED.some(r=>r.test(p))?"red":isAds(p)?"ads":GREEN.some(r=>r.test(p))?"green":"yellow";
let pkgs=[], sysFilter="sys";
const TORDER={ads:0,green:1,yellow:2,red:3};
function loadPkgs(){ try{ pkgs=JSON.parse(nat("listPackages")||"[]") }catch(e){ pkgs=[] } pkgs.sort((a,b)=>TORDER[tier(a.pkg)]-TORDER[tier(b.pkg)]||a.name.localeCompare(b.name)) }
const shz=()=>nat("shizukuState")||"none";
function shizukuCard(){
  const s=shz(), msg={none:L("szNone"),stopped:L("szStopped"),denied:L("szDenied"),ok:L("szOk")}[s];
  const btn=s==="none"?`<button class="btn pri f" id="szInstall">⬇️ ${L("stInstall")} Shizuku</button>`:s==="stopped"?`<button class="btn pri f" id="szOpen">▶️ ${L("szStart")}</button>`:s==="denied"?`<button class="btn pri f" id="szAllow">✅ ${L("szAllowBtn")}</button>`:"";
  return `<div class="szcard ${s}"><b>${s==="ok"?"🔓":"🔒"} Shizuku</b><span>${msg}</span>${btn}${s!=="ok"?`<button class="btn f" id="szHelp">❔ ${L("szHow")}</button>`:""}</div>`;
}
function renderSysApps(){
  if(!pkgs.length) loadPkgs();
  const list=pkgs.filter(p=>sysFilter==="removed"?!p.inst:sysFilter==="ads"?(p.inst&&tier(p.pkg)==="ads"):sysFilter==="sys"?(p.sys&&p.inst):p.inst);
  const adsN=pkgs.filter(p=>p.inst&&tier(p.pkg)==="ads").length;
  const fsel=(k,l)=>`<button class="btn sm f${sysFilter===k?" pri":""}" data-sysf="${k}">${l}</button>`;
  const greens=pkgs.filter(p=>p.sys&&p.inst&&tier(p.pkg)==="green").length;
  $("storeMain").innerHTML=`<div class="sec"><h3>🧹 ${L("stSystem")}</h3>${shizukuCard()}
    <div class="inline" style="margin:1.4vh 0">${fsel("sys",L("sysOnly"))}${fsel("ads","📢 "+L("adsApps")+" ("+adsN+")")}${fsel("all",L("allApps"))}${fsel("removed",L("removedApps"))}
      ${adsN?`<button class="btn pri f" id="adsBulk">📢 ${L("removeAds")} (${adsN})</button>`:""}
      ${greens?`<button class="btn f" id="sysBulk">🧹 ${L("removeSafe")} (${greens})</button>`:""}<button class="btn f" id="sysAdb">💻 ${L("adbCmds")}</button></div>
    <div class="legend">🟠 ${L("tAds")} · 🟢 ${L("tGreen")} · 🟡 ${L("tYellow")} · 🔴 ${L("tRed")}</div>
    <div class="syslist">${list.map(p=>{ const t=tier(p.pkg); return `<div class="sysrow f" tabindex="0" data-sys="${esc(p.pkg)}"><span class="tdot2 ${t}"></span>
      <span class="sn"><b>${esc(p.name)}</b><small dir="ltr">${esc(p.pkg)}</small></span><span class="ss">${!p.inst?"🗑 "+L("sRemoved"):p.on?"":"⏸ "+L("sDisabled")}</span><span class="sz">${(p.size/1048576).toFixed(1)} MB</span></div>` }).join("")||`<div class="empty">${L("noRes")}</div>`}</div></div>`;
}
const SHCMD={remove:p=>`pm uninstall -k --user 0 ${p}`,disable:p=>`pm disable-user --user 0 ${p}`,enable:p=>`pm enable ${p}`,restore:p=>`cmd package install-existing ${p}`,stop:p=>`am force-stop ${p}`};
async function runShell(cmd){ const r=JSON.parse(await natAsync("shell",cmd)); if(r.code!==0&&!/Success/i.test(r.out)) throw new Error(r.out||("exit "+r.code)); return r.out }
async function sysDo(action,p,quiet){
  if(tier(p)==="red"&&(action==="remove"||action==="disable")){ A.toast(L("tRedMsg")); return false }
  if(shz()!=="ok"){ if(!quiet) dialog(L("adbCmds"),[{label:L("info"),fn:()=>A.appInfo(p)},{label:L("done"),pri:1,fn:()=>{}}],{sub:`${L("szNeeded")}\n\nadb shell ${SHCMD[action](p)}`}); return false }
  try{ await runShell(SHCMD[action](p)); if(!quiet) banner("✅",p,L("sDone")); return true }catch(e){ if(!quiet) banner("⚠️",p,e.message); return false }
}
function sysMenu(p){
  const x=pkgs.find(y=>y.pkg===p)||{pkg:p,name:p,inst:true,on:true}, t=tier(p), items=[];
  const after=()=>{ loadPkgs(); renderSysApps(); const el=document.querySelector(`[data-sys="${cssq(p)}"]`); if(el) focus(el) };
  if(!x.inst) items.push({icon:"♻️",label:L("sRestore"),pri:1,fn:()=>sysDo("restore",p).then(after)});
  else {
    if(t!=="red") items.push({icon:"🗑",label:L("sRemove"),pri:t==="green"||t==="ads",fn:()=>{ const go=()=>sysDo("remove",p).then(after);
        t==="yellow"?setTimeout(()=>dialog(`⚠️ ${x.name}`,[{label:L("sRemoveAnyway"),fn:go},{label:L("cancel"),pri:1,fn:()=>{}}],{sub:L("tYellowMsg")}),30):go() }},
      {icon:x.on?"⏸":"▶️",label:x.on?L("sDisable"):L("sEnable"),fn:()=>sysDo(x.on?"disable":"enable",p).then(after)});
    items.push({icon:"⏹",label:L("sStop"),fn:()=>sysDo("stop",p)},{icon:"ℹ️",label:L("info"),fn:()=>A.appInfo(p)});
  }
  items.push({label:L("cancel"),fn:()=>{}});
  dialog(`${t==="red"?"🔴":t==="ads"?"🟠":t==="green"?"🟢":"🟡"} ${x.name}`,items,{sub:p+(t==="red"?"\n"+L("tRedMsg"):"")});
}
async function bulkRemove(kind){
  const g=pkgs.filter(p=>p.inst&&(kind==="ads"?tier(p.pkg)==="ads":p.sys&&tier(p.pkg)==="green"));
  if(!g.length) return;
  dialog(`${kind==="ads"?"📢 "+L("removeAds"):"🧹 "+L("removeSafe")} (${g.length})`,[{label:L("sRemove"),pri:1,fn:async()=>{
      if(shz()!=="ok"){ adbDialog(g); return } let ok=0; for(const p of g){ if(await sysDo("remove",p.pkg,true)) ok++ }
      banner("✅",kind==="ads"?L("removeAds"):L("removeSafe"),`${ok}/${g.length}`); loadPkgs(); renderSysApps() }},
    {label:L("cancel"),fn:()=>{}}],{sub:g.map(p=>p.name).join(" · ").slice(0,500)});
}
async function bulkRemoveSafe(){
  const g=pkgs.filter(p=>p.sys&&p.inst&&tier(p.pkg)==="green");
  dialog(`🧹 ${L("removeSafe")} (${g.length})`,[{label:L("sRemove"),pri:1,fn:async()=>{
      if(shz()!=="ok"){ adbDialog(g); return } let ok=0; for(const p of g){ if(await sysDo("remove",p.pkg,true)) ok++ } banner("✅",L("removeSafe"),`${ok}/${g.length}`); loadPkgs(); renderSysApps() }},
    {label:L("cancel"),fn:()=>{}}],{sub:g.map(p=>p.name).join(" · ").slice(0,400)});
}
function adbDialog(list){
  const g=list||pkgs.filter(p=>p.sys&&p.inst&&tier(p.pkg)==="green"), ip=(remoteInfo().ip||"<TV-IP>");
  const cmds=[`adb connect ${ip}:5555`,...g.map(p=>`adb shell pm uninstall -k --user 0 ${p.pkg}`)].join("\n");
  dialog("💻 "+L("adbCmds"),[{label:L("done"),fn:()=>{}}],{html:`<div class="sub">${L("adbHint")}</div><pre class="code" dir="ltr">${esc(cmds)}</pre><div class="sub">${L("adbRestore")}</div><pre class="code" dir="ltr">adb shell cmd package install-existing &lt;package&gt;</pre><div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`});
}
function szHelp(){ dialog("🔑 Shizuku",[{label:L("done"),fn:()=>{}}],{html:`<div class="steps">${L("szSteps").map((s,i)=>`<div><b>${i+1}</b> ${esc(s)}</div>`).join("")}</div><div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`}) }
window.onShizuku=()=>{ if(storeCat==="sys"&&$("store").classList.contains("on")) renderSysApps() };

// ================= storage cleaner =================
let scan=null, scanSel=new Set(), scanning=false;
const MB=b=>(b/1048576).toFixed(b<10485760?1:0)+" MB", GB=b=>(b/1073741824).toFixed(2)+" GB";
function storageInfo(){ try{ return JSON.parse(nat("storageInfo")||"{}") }catch(e){ return {} } }
function bar(used,total){ const pct=total?Math.round(used/total*100):0; return `<div class="rbar"><i style="width:${pct}%;background:${pct>90?"#e53935":pct>75?"#fb8c00":"#43a047"}"></i></div>` }
const SCAN_GROUPS=[["tmp","🗑️","cTmp",true],["empty","📁","cEmpty",true],["apk","📦","cApk",false],["big","🐘","cBig",false]];
function renderClean(){
  const si=storageInfo(), acc=NA?!!nat("hasStorageAccess"):true;
  let h=`<div class="sec"><h3>🧽 ${L("stClean")}</h3>
    <div class="ram">${L("cInternal")}: <b>${si.total?GB(si.total-si.free):"—"}</b> / ${si.total?GB(si.total):"—"} · ${L("free")} <b>${si.free?GB(si.free):"—"}</b>${bar(si.total-si.free,si.total)}
      ${si.extTotal&&si.extTotal!==si.total?`${L("cShared")}: <b>${GB(si.extTotal-si.extFree)}</b> / ${GB(si.extTotal)}${bar(si.extTotal-si.extFree,si.extTotal)}`:""}</div>
    <div class="inline" style="margin:1.6vh 0">${acc?`<button class="btn pri f" id="cScan">🔍 ${scanning?L("cScanning"):L("cScanBtn")}</button>`:`<button class="btn pri f" id="cAccess">🔓 ${L("cAllow")}</button>`}
      <button class="btn f" id="cCaches">🧹 ${L("cAllCaches")}${shz()==="ok"?"":" (Shizuku)"}</button>
      ${scan&&scanSel.size?`<button class="btn pri f" id="cDelete">🗑 ${L("cDeleteSel")} (${scanSel.size} · ${MB(selBytes())})</button>`:""}</div>`;
  if(scan){
    h+=`<div class="legend">${L("cFound")}: ${scan.files} ${L("cFiles")}</div>`;
    for(const [k,ic,lab] of SCAN_GROUPS){ const rows=scan[k]||[]; if(!rows.length) continue; const tot=rows.reduce((a,r)=>a+r[1],0), all=rows.every(r=>scanSel.has(r[0]));
      h+=`<div class="cgroup"><button class="btn sm f${all?" pri":""}" data-cgrp="${k}">${all?"☑":"☐"} ${ic} ${L(lab)} — ${rows.length} · ${MB(tot)}</button></div><div class="syslist">`+
        rows.slice(0,150).map(r=>`<div class="sysrow f${scanSel.has(r[0])?" csel":""}" tabindex="0" data-cfile="${esc(r[0])}"><span>${scanSel.has(r[0])?"☑":"☐"}</span>
          <span class="sn"><b dir="ltr">${esc(r[0].split("/").pop()||r[0])}</b><small dir="ltr">${esc(r[0].replace(/^\/storage\/emulated\/0\//,""))}</small></span><span class="ss">${r[2]?new Date(r[2]).toLocaleDateString():""}</span><span class="sz">${MB(r[1])}</span></div>`).join("")+`</div>` }
    if(!SCAN_GROUPS.some(g=>(scan[g[0]]||[]).length)) h+=`<div class="empty">✨ ${L("cClean")}</div>`;
  }
  $("storeMain").innerHTML=h+"</div>";
}
function selBytes(){ if(!scan) return 0; let b=0; SCAN_GROUPS.forEach(([k])=>(scan[k]||[]).forEach(r=>{ if(scanSel.has(r[0])) b+=r[1] })); return b }
async function runScan(silent){
  if(!NA){ scan={files:1834,apk:[["/storage/emulated/0/Download/TiviMate-4.7.apk",31457280,Date.now()-8e8],["/storage/emulated/0/Download/vlc-3.5.apk",47185920,Date.now()-2e9]],
      big:[["/storage/emulated/0/Movies/match-final.mkv",2147483648,Date.now()-5e8]],tmp:[["/storage/emulated/0/Android/data/com.netflix.ninja/cache",188743680,Date.now()],["/storage/emulated/0/.thumbnails",12582912,Date.now()]],empty:[["/storage/emulated/0/Download/old",0,Date.now()]]};
    if(!silent) autoSelect(); return scan }
  scanning=true; if(!silent) renderClean();
  try{ scan=JSON.parse(await natAsync("scanStorage")); if(!silent) autoSelect() }catch(e){ A.toast(e.message) }
  scanning=false; if(!silent&&storeCat==="clean") renderClean(); return scan;
}
function autoSelect(){ scanSel=new Set(); SCAN_GROUPS.forEach(([k,,,auto])=>{ if(auto)(scan[k]||[]).forEach(r=>scanSel.add(r[0])) }) }
function deletePaths(paths){ if(!NA){ let b=0; SCAN_GROUPS.forEach(([k])=>(scan&&scan[k]||[]).forEach(r=>{ if(paths.includes(r[0])) b+=r[1] })); return {n:paths.length,bytes:b} } try{ return JSON.parse(nat("deleteFiles",JSON.stringify(paths))||"{}") }catch(e){ return {} } }
async function trimCaches(){ if(shz()!=="ok"){ A.toast(L("szNeeded")); return false } const before=storageInfo().free||0;
  try{ await runShell("pm trim-caches 999G"); const after=storageInfo().free||0; banner("🧹",L("cAllCaches"),"+"+MB(Math.max(0,after-before))); return true }catch(e){ A.toast(e.message); return false } }

// ================= one-tap optimize =================
let boostLog=null;
function renderBoost(){
  $("storeMain").innerHTML=`<div class="sec"><h3>✨ ${L("stBoost")}</h3><div class="field"><label>${L("bDesc")}</label></div>
    <div class="inline"><button class="btn pri f" id="bGo">✨ ${L("bGo")}</button></div>
    ${boostLog?`<div class="steps" style="margin-top:2vh">${boostLog.map(l=>`<div>${l}</div>`).join("")}</div>`:""}</div>`;
}
async function boost(){
  boostLog=[`⏳ ${L("loading")}`]; renderBoost(); const log=[], m0=memText().avail||0, s0=storageInfo().free||0;
  const n=nat("cleanRam")||0; log.push(`✅ ${L("ramClean")}: ${n} ${L("appsS")}`);
  if(shz()==="ok"){ try{ await runShell("pm trim-caches 999G"); log.push(`✅ ${L("cAllCaches")}`) }catch(e){} try{ await runShell("am kill-all"); log.push(`✅ ${L("ramDeep")}`) }catch(e){} }
  else log.push(`➖ ${L("cAllCaches")}: ${L("bNeedShz")}`);
  if(!NA||nat("hasStorageAccess")){ const sc=await runScan(true); if(sc){ const paths=[...(sc.tmp||[]),...(sc.empty||[])].map(r=>r[0]); const r=paths.length?deletePaths(paths):{n:0,bytes:0};
      log.push(`✅ ${L("cTmp")} + ${L("cEmpty")}: ${r.n||0} · ${MB(r.bytes||0)}`);
      if((sc.apk||[]).length) log.push(`💡 ${L("bApkHint")} (${sc.apk.length} · ${MB(sc.apk.reduce((a,x)=>a+x[1],0))})`) } }
  else log.push(`➖ ${L("cTmp")}: ${L("bNeedAccess")}`);
  const adsN=(loadPkgs(),pkgs.filter(p=>p.inst&&tier(p.pkg)==="ads").length); if(adsN) log.push(`💡 ${L("bAdsHint")} (${adsN})`);
  await new Promise(r=>setTimeout(r,700));
  const dm=Math.max(0,(memText().avail||0)-m0), ds=Math.max(0,(storageInfo().free||0)-s0);
  log.push(`🎉 ${L("bResult")}: RAM +${MB(dm)} · ${L("storage")} +${MB(ds)}`);
  boostLog=log; banner("✨",L("stBoost"),`RAM +${MB(dm)} · ${L("storage")} +${MB(ds)}`); if(storeCat==="boost") renderBoost();
}

// ================= RAM & speed =================
function memText(){ try{ return JSON.parse(nat("memInfo")||"{}") }catch(e){ return {} } }
function renderRam(){
  const m=memText(), tot=m.total||0, av=m.avail||0, used=tot?Math.round((tot-av)/tot*100):0, gb=x=>(x/1073741824).toFixed(2)+" GB";
  $("storeMain").innerHTML=`<div class="sec"><h3>⚡ ${L("stRam")}</h3>
    <div class="ram"><div class="rbar"><i style="width:${used}%;background:${used>85?"#e53935":used>70?"#fb8c00":"#43a047"}"></i></div><div>${L("ramUsed")}: <b>${tot?gb(tot-av):"—"}</b> / ${tot?gb(tot):"—"} · ${L("free")}: <b>${tot?gb(av):"—"}</b>${m.low?" · ⚠️ "+L("ramLow"):""}</div></div>
    <div class="inline" style="margin-top:2vh"><button class="btn pri f" id="ramClean">🧹 ${L("ramClean")}</button>${shz()==="ok"?`<button class="btn f" id="ramDeep">💥 ${L("ramDeep")}</button>`:""}<button class="btn f" id="ramLite">${S.lite?"✅":"⬜"} ${L("perfLite")}</button>
      <button class="btn f" id="animFast">${S.animFast?"✅":"⬜"} ${L("animFast")}</button></div>
    <div class="field" style="margin-top:2vh"><label>${L("ramTips")}</label></div>
    <div class="field"><label>🌐 IP: <b dir="ltr">${esc(storageInfo().ip||remoteInfo().ip||"—")}</b></label></div></div>`;
}
activators.push(el=>{
  if(el.dataset.scat){ storeCat=el.dataset.scat; if(storeCat==="sys") loadPkgs(); renderStore(); focus(document.querySelector(`[data-scat="${storeCat}"]`)); return true }
  if(el.dataset.store){ const a=allCatalog().find(x=>x.id===el.dataset.store); if(a) storeAction(a); return true }
  if(el.dataset.sysf){ sysFilter=el.dataset.sysf; renderSysApps(); focus(document.querySelector(`[data-sysf="${sysFilter}"]`)); return true }
  if(el.dataset.sys){ sysMenu(el.dataset.sys); return true }
  if(el.dataset.cfile){ const p=el.dataset.cfile; scanSel.has(p)?scanSel.delete(p):scanSel.add(p); renderClean(); focus(document.querySelector(`[data-cfile="${cssq(p)}"]`)); return true }
  if(el.dataset.cgrp){ const rows=scan[el.dataset.cgrp]||[], all=rows.every(r=>scanSel.has(r[0])); rows.forEach(r=>all?scanSel.delete(r[0]):scanSel.add(r[0])); renderClean(); focus(document.querySelector(`[data-cgrp="${el.dataset.cgrp}"]`)); return true }
  switch(el.id){
    case "codeGo": goCode(($("codeIn").value||"").trim()); return true;
    case "mcAdd": { const n=($("mcNum").value||"").trim(), u=($("mcUrl").value||"").trim(), nm=($("mcName").value||"").trim(); if(!n||!/^https?:\/\//.test(u)){ A.toast(L("codeBad")); return true }
      S.myCodes=(S.myCodes||[]).filter(c=>c.n!==n).concat([{n,url:u,name:nm}]); renderStore(); A.toast(L("saved")); return true }
    case "apkGo": { const u=($("apkUrl").value||"").trim(); if(u) installFrom(u.split("/").pop()||"APK",u); return true }
    case "catSave": S.catalogUrl=($("catUrl").value||"").trim(); loadCustomCatalog().then(renderStore); return true;
    case "szInstall": storeAction(CATALOG.find(a=>a.id==="shizuku")); return true;
    case "szOpen": nat("openShizuku"); return true;
    case "szAllow": nat("shizukuRequest"); return true;
    case "szHelp": szHelp(); return true;
    case "sysBulk": bulkRemove("green"); return true;
    case "adsBulk": bulkRemove("ads"); return true;
    case "sysAdb": adbDialog(); return true;
    case "ramClean": { const b=memText().avail||0, n=nat("cleanRam")||0; setTimeout(()=>{ const a=memText().avail||0; banner("🧹",L("ramClean"),`${n} ${L("appsS")} · +${Math.max(0,(a-b)/1048576).toFixed(0)} MB`); renderRam() },800); return true }
    case "ramDeep": runShell("am kill-all").then(()=>setTimeout(()=>{ banner("💥",L("ramDeep"),"✓"); renderRam() },800)).catch(e=>A.toast(e.message)); return true;
    case "ramLite": S.lite=!S.lite; applyLook(); renderRam(); return true;
    case "animFast": { S.animFast=!S.animFast; const v=S.animFast?"0.5":"1"; if(shz()==="ok") Promise.all(["window_animation_scale","transition_animation_scale","animator_duration_scale"].map(k=>runShell(`settings put global ${k} ${v}`))).then(()=>banner("⚡",L("animFast"),v+"x")).catch(e=>A.toast(e.message)); else A.toast(L("szNeeded")); renderRam(); return true }
    case "browserBtn": openBrowser(); return true;
    case "cScan": runScan(false); return true;
    case "cAccess": nat("askStorageAccess"); setTimeout(()=>{ if(storeCat==="clean") renderClean() },4000); return true;
    case "cCaches": trimCaches().then(()=>{ if(storeCat==="clean") renderClean() }); return true;
    case "cDelete": { const paths=[...scanSel]; dialog(`🗑 ${L("cDeleteSel")} (${paths.length} · ${MB(selBytes())})`,[{label:L("sRemove"),pri:1,fn:()=>{ const r=deletePaths(paths);
        banner("🧽",L("stClean"),`${r.n||0} · ${MB(r.bytes||0)}`); scanSel=new Set(); runScan(false) }},{label:L("cancel"),fn:()=>{}}]); return true }
    case "bGo": boost(); return true;
  }
  return false;
});
optionHandlers.unshift(el=>{ if(el.dataset.sys){ sysMenu(el.dataset.sys); return true } return false });
pageHooks["store:enter"]=()=>{ renderStore(); if(S.catalogUrl&&!customCatalog.length) loadCustomCatalog().then(()=>{ if($("store").classList.contains("on")) renderStore() }) };
// phone: open a web page in the browser
const _remoteCmd2=remoteCmd; remoteCmd=function(m){ if(m.cmd==="open"&&/^https?:\/\//.test(m.url||"")){ nat("openUri",m.url); return {ok:1} } return _remoteCmd2(m) };
const _ACT2=ACTIONS; ACTIONS=()=>_ACT2().concat([["✨",L("stBoost"),()=>{showPage("store");storeCat="boost";renderStore();boost()}],["🧽",L("stClean"),()=>{showPage("store");storeCat="clean";renderStore()}],["🌐",L("browser"),openBrowser],["🛍️",L("store"),()=>{showPage("store");focus(document.querySelector('.tab[data-page="store"]'))}],["🧹",L("stSystem"),()=>{showPage("store");storeCat="sys";loadPkgs();renderStore()}],["⚡",L("stRam"),()=>{showPage("store");storeCat="ram";renderStore()}]]);

// quick settings: one-tap optimize first
const _quick3=quickSettings; quickSettings=function(){ _quick3(); const items=$("dbox")._items; if(!items||isKids()) return;
  items.splice(0,0,{icon:"✨",label:L("stBoost"),fn:()=>{ showPage("store"); storeCat="boost"; renderStore(); boost() }});
  const g=$("dbox").querySelector(".mgrid"); if(!g) return;
  g.innerHTML=items.map((it,i)=>`<button class="btn f${it.pri?" pri":""}" data-di="${i}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) };

// ================= Downloader-style number codes =================
DEF.myCodes=[];
async function goCode(code){
  if(!code){ return } const d=$("dlState");
  const mine=(S.myCodes||[]).find(c=>c.n===code);
  let url=mine?mine.url:(/^https?:\/\//.test(code)?code:(/^[0-9]{3,8}$/.test(code)?"https://aftv.news/"+code:null));
  if(!url){ A.toast(L("codeBad")); return }
  if(d) d.textContent="🔎 "+L("codeLooking");
  if(!NA){ A.toast(url); return }
  try{ const r=JSON.parse(await natAsync("resolveUrl",url));
    if(r.apk){ installFrom((mine&&mine.name)||code,r.url) }
    else { if(d) d.textContent="🌐 "+r.url; nat("openUri",r.url) }
  }catch(e){ if(d) d.textContent=""; A.toast(L("codeNotFound")) }
}
activators.push(el=>{ if(el.dataset&&el.dataset.mc!=null){ const c=S.myCodes[+el.dataset.mc]; if(c) goCode(c.n); return true }
  if(el.dataset&&el.dataset.mcdel!=null){ const a=S.myCodes.slice(); a.splice(+el.dataset.mcdel,1); S.myCodes=a; renderStore(); return true } return false });
