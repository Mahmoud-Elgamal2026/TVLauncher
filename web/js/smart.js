// ================= Smart suggestions (habits by hour) + on-screen volume/channel bar =================
DEF.habits={};
const SM={ar:{smartRow:"✨ مقترح ليك دلوقتي"},en:{smartRow:"✨ Suggested for now"}}; Object.keys(SM).forEach(l=>Object.assign(T[l],SM[l]));
function habit(key){ const h=Object.assign({},S.habits||{}), hr=new Date().getHours(); const a=(h[key]||new Array(24).fill(0)).slice(); a[hr]++; h[key]=a;
  // keep the 60 most used entries
  const ks=Object.keys(h); if(ks.length>60){ ks.sort((x,y)=>h[x].reduce((s,v)=>s+v,0)-h[y].reduce((s,v)=>s+v,0)); delete h[ks[0]] }
  S.habits=h }
const _launchH=launch; launch=function(pkg){ habit("a:"+pkg); return _launchH.apply(this,arguments) };
let lastHab="",lastHabT=0;
const _playH=play; play=function(c){ if(c&&!c.kind&&c.url&&!(lastHab===c.url&&Date.now()-lastHabT<5000)){ lastHab=c.url; lastHabT=Date.now(); habit("c:"+c.url) } return _playH.apply(this,arguments) };
function smartItems(){
  const h=S.habits||{}, hr=new Date().getHours(), sc=a=>2*a[hr]+a[(hr+23)%24]+a[(hr+1)%24];
  return Object.keys(h).map(k=>({k,s:sc(h[k])})).filter(x=>x.s>=2).sort((a,b)=>b.s-a.s).slice(0,8);
}
function renderSmart(){
  if(isKids()){ setRow("smartRow",""); return }
  const html=smartItems().map(x=>{ if(x.k.indexOf("a:")===0){ const a=byPkg(x.k.slice(2)); return a&&!isHidden(a.pkg)?tile(a):"" }
    const u=x.k.slice(2), c=(window.chByUrl&&chByUrl(u))||null; return c?chTile(c):"" }).join("");
  setRow("smartRow",html);
}
(function(){ const sh=$("shelf"); if(sh&&!$("smartRow")) sh.insertAdjacentHTML("afterend",`<h2 data-row="smartRow">${L("smartRow")}</h2><div class="row" id="smartRow"></div>`) })();
const _renderHomeS=renderHome; renderHome=function(){ _renderHomeS.apply(this,arguments); try{ const h=document.querySelector('h2[data-row="smartRow"]'); if(h) h.textContent=L("smartRow"); renderSmart() }catch(e){} };
// ---- OSD
(function(){ const d=document.createElement("div"); d.id="osd"; d.innerHTML='<b id="osdI"></b><div><div id="osdT"></div><div class="osdbar"><i id="osdB"></i></div></div>'; document.body.appendChild(d) })();
let osdT=null;
function showOsd(icon,text,pct){ $("osdI").textContent=icon; $("osdT").textContent=text; $("osdB").parentNode.style.display=pct==null?"none":""; if(pct!=null) $("osdB").style.width=Math.max(0,Math.min(100,pct))+"%";
  $("osd").classList.add("on"); clearTimeout(osdT); osdT=setTimeout(()=>$("osd").classList.remove("on"),2200) }
window.onVolOsd=(v,max,mute)=>showOsd(mute||!v?"🔇":v<max/3?"🔈":v<max*2/3?"🔉":"🔊",mute?"—":v+" / "+max,mute?0:100*v/max);
const _zapO=zap; zap=function(d){ _zapO.apply(this,arguments); if(playing) showOsd("📺",(playing.no?playing.no+"  ·  ":"")+playing.name,null) };

// ================= Voice commands: "قناة الجزيرة" / "افتح يوتيوب" / "اقفل الكل" / "سجّل" ... else search =================
const VSM={ar:{vHeard:"سمعتك",sSched:"جدول تشغيل الشاشة",schedOff:"اطفي الشاشة الساعة",schedWake:"شغّلها الساعة",schedAct:"أول ما تشتغل",wNone:"ولا حاجة",wQuran:"إذاعة القرآن",wLastCh:"آخر قناة",goodMorning:"صباح الخير",schedOffNow:"وقت النوم — الشاشة هتطفي",
    rTitle:"🌙 رمضان كريم",rIftarIn:"الإفطار بعد",rImsakIn:"الإمساك بعد",duaIftar:"ذهب الظمأ وابتلّت العروق وثبت الأجر إن شاء الله",duaSuhoor:"تسحّروا فإن في السحور بركة",suhoorNow:"وقت السحور"},
  en:{vHeard:"Heard",sSched:"Screen schedule",schedOff:"Turn screen off at",schedWake:"Turn it on at",schedAct:"When it turns on",wNone:"Nothing",wQuran:"Quran radio",wLastCh:"Last channel",goodMorning:"Good morning",schedOffNow:"Bedtime — screen turning off",
    rTitle:"🌙 Ramadan Kareem",rIftarIn:"Iftar in",rImsakIn:"Imsak in",duaIftar:"Thirst is gone, veins are moistened and the reward is certain, God willing",duaSuhoor:"Eat suhoor, for there is blessing in it",suhoorNow:"Suhoor time"}};
Object.keys(VSM).forEach(l=>Object.assign(T[l],VSM[l]));
const _onVoiceS=window.onVoice;
window.onVoice=t=>{ let txt=String(t||"").trim().replace(/^(شغل|شغّل|افتحلي|عايز|عاوز|play|open the)\s+/i,"").replace(/^(قناه)\s+/,"قناة ");
  if(!/^(قناة|افتح|اقفل|سجل|سجّل|نوم|رسالة|ch|open|close|rec|sleep)\b/i.test(txt) && channels.some(c=>c.name.toLowerCase().indexOf(txt.toLowerCase())>=0)) txt="قناة "+txt;
  let r=""; try{ r=tgCmd(txt) }catch(e){}
  if(r&&r!==tgt("help")&&r!==tgt("nf")){ banner("🎙",L("vHeard"),t+" → "+r.split("\n")[0],3000); return }
  _onVoiceS(t) };

// ================= Screen schedule: off at night, on in the morning (Quran radio / last channel) =================
Object.assign(DEF,{schedOn:false,schedOff:"23:30",schedWake:"07:00",schedAct:"quran"});
let schedDone="";
setInterval(()=>{ if(!S.schedOn) return; const d=new Date(), hm=String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"), key=d.toDateString()+hm;
  if(hm===S.schedOff&&schedDone!==key){ schedDone=key; banner("😴",L("schedOffNow"),"",4000); setTimeout(()=>{ if(on("player")) stopPlayer(); if(window.stopRadio) stopRadio(); if(!nat("sleepNow")) $("blackout").classList.add("on") },5000) } },20000);
window.onScheduledWake=()=>{ if(on("blackout")) $("blackout").classList.remove("on"); idleAt=Date.now(); banner("☀️",L("goodMorning"),"",4000);
  if(S.schedAct==="quran"&&window.playRadio) playRadio(S.radio||RADIO_FB[0]); else if(S.schedAct==="lastch"&&S.lastCh) play(Object.assign({},S.lastCh)) };
function schedSync(){ nat("scheduleWake",S.schedOn?S.schedWake:"") }
const timeOpts=(a,b,step)=>{ const o=[]; for(let h=a;h<=b;h++) for(let m=0;m<60;m+=step) o.push(String(h%24).padStart(2,"0")+":"+String(m).padStart(2,"0")); return o };
const _wsS=window.widgetSettings; window.widgetSettings=function(){
  return sec("⏰ "+L("sSched"),field("",onoff("schedOn"))+(S.schedOn?
    field(L("schedOff"),`<div class="inline tscroll">${timeOpts(21,26,30).map(t=>`<button class="btn sm f${S.schedOff===t?" pri":""}" data-sched="schedOff:${t}">${t}</button>`).join("")}</div>`)+
    field(L("schedWake"),`<div class="inline tscroll">${timeOpts(5,10,30).map(t=>`<button class="btn sm f${S.schedWake===t?" pri":""}" data-sched="schedWake:${t}">${t}</button>`).join("")}</div>`)+
    field(L("schedAct"),seg("schedAct",[["quran","📻 "+L("wQuran")],["lastch","📺 "+L("wLastCh")],["none",L("wNone")]])):""))+(_wsS?_wsS():"") };
AFTER.schedOn=()=>schedSync();
activators.push(el=>{ if(el.dataset&&el.dataset.sched){ const [k,v]=el.dataset.sched.split(/:(.+)/); S[k]=v; schedSync(); renderSettings(); return true } return false });
setTimeout(schedSync,3000);

// ================= Ramadan: big iftar/imsak countdown on home + duas =================
(function(){ const d=document.createElement("div"); d.id="ramCard"; $("home").appendChild(d) })();
tickers.push(()=>{
  const card=$("ramCard"); if(!card) return;
  const show=typeof isRamadan==="function"&&isRamadan()&&prayers.length&&!isKids();
  if(!show){ card.style.display="none"; return }
  const now=Date.now(), f=prayers[0].getTime?prayers[0].getTime():+prayers[0], m=prayers[4].getTime?prayers[4].getTime():+prayers[4];
  let label,target,dua;
  if(now<f){ label=L("rImsakIn"); target=f-10*60000; dua=L("duaSuhoor") } else if(now<m){ label=L("rIftarIn"); target=m; dua=L("duaIftar") } else { card.style.display="none"; return }
  const left=Math.max(0,target-now), h=Math.floor(left/3600000), mi=Math.floor(left%3600000/60000), se=Math.floor(left%60000/1000);
  card.innerHTML=`<div class="rt">${esc(L("rTitle"))}</div><div class="rl">${esc(label)}</div><div class="rc">${h}:${String(mi).padStart(2,"0")}:${String(se).padStart(2,"0")}</div><div class="rd">${esc(dua)}</div>`;
  card.style.display="";
});

// ================= Weekly settings backup to Telegram (restore: send the file back to the bot) =================
DEF.tgBackupAt=0;
const BK={ar:{bkTg:"نسخة احتياطية من إعدادات البوكس",bkTgSent:"اتبعتت نسخة احتياطية على تيليجرام",bkTgHow:"علشان ترجّعها: ابعت الملف ده للبوت تاني"},en:{bkTg:"Box settings backup",bkTgSent:"Backup sent to Telegram",bkTgHow:"To restore: send this file back to the bot"}};
Object.keys(BK).forEach(l=>Object.assign(T[l],BK[l]));
function backupJson(){ const o={app:"tvlauncher",v:2,data:{}}; for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); o.data[k]=localStorage.getItem(k) } return JSON.stringify(o) }
function tgBackup(manual){ if(!S.tgChat||!S.tgToken) return false; const d=new Date().toISOString().slice(0,10);
  nat("tgSendDoc",S.tgChat,"tvlauncher-backup-"+d+".json",backupJson(),"💾 "+L("bkTg")+" · "+d+"\n"+L("bkTgHow")); S.tgBackupAt=Date.now(); if(manual) banner("💾",L("bkTgSent"),"",2500); return true }
setInterval(()=>{ if(S.tgChat&&Date.now()-(S.tgBackupAt||0)>7*86400000) tgBackup(false) },3600000);
setTimeout(()=>{ if(S.tgChat&&Date.now()-(S.tgBackupAt||0)>7*86400000) tgBackup(false) },60000);
const _onTgB=window.onTg; window.onTg=(chat,from,text)=>{
  if(S.tgChat&&chat===S.tgChat&&/^__doc:/.test(text)){ const parts=text.split(":"), fid=parts[1], fname=parts.slice(2).join(":");
    if(!/\.json$/i.test(fname)){ tgSend(chat,"📎 "+fname); return }
    natAsync("tgGetFile",fid).then(txt=>{ window.onBackupLoaded(txt); tgSend(chat,"✅ "+L("bkLoaded")) }).catch(e=>tgSend(chat,"⚠️ "+e.message)); return }
  return _onTgB(chat,from,text) };
const _tgCmdB=tgCmd; tgCmd=function(t){ if(/^\/?(نسخة|نسخه|backup)$/i.test(String(t).trim())) return tgBackup(true)?"💾 ✅":tgt("nf"); return _tgCmdB.apply(this,arguments) };

// ================= Animated backgrounds (transform/opacity only, light on weak boxes) =================
DEF.anim="off";
const AN={ar:{anim:"خلفية متحركة",anAurora:"شفق",anStars:"نجوم",anWaves:"موج",anBokeh:"فقاعات نور"},en:{anim:"Animated background",anAurora:"Aurora",anStars:"Stars",anWaves:"Waves",anBokeh:"Bokeh"}};
Object.keys(AN).forEach(l=>Object.assign(T[l],AN[l]));
const _applyLookA=applyLook; applyLook=function(){ _applyLookA.apply(this,arguments); document.body.dataset.anim=S.anim||"off" };
AFTER.anim=applyLook;
const _lifeSetA=window.lifeSettings; window.lifeSettings=function(){ return sec("✨ "+L("anim"),field("",seg("anim",[["off",L("off")],["aurora","🌌 "+L("anAurora")],["stars","✨ "+L("anStars")],["waves","🌊 "+L("anWaves")],["bokeh","🫧 "+L("anBokeh")]])))+(_lifeSetA?_lifeSetA():"") };
document.body.dataset.anim=S.anim||"off";

// ================= Home "All apps" widget + one-press Boost =================
const BO={ar:{allW:"📱 كل التطبيقات",boost:"تسريع",boosting:"بسرّع الجهاز...",boostDone:"الجهاز اتسرّع",freed:"اتوفّر",closedN:"تطبيق اتقفل"},en:{allW:"📱 All apps",boost:"Boost",boosting:"Boosting...",boostDone:"Box boosted",freed:"Freed",closedN:"apps closed"}};
Object.keys(BO).forEach(l=>Object.assign(T[l],BO[l]));
function boostTile(){ return `<div class="app f boosttile" tabindex="0" id="boostTile"><div class="lbl">🚀</div><div class="nm">${esc(L("boost"))}</div></div>` }
function renderAllW(){ const box=$("allAppsW"), h=$("allAppsH"); if(!box) return; if(h) h.textContent=L("allW");
  if(isKids()){ box.innerHTML=""; box.style.display="none"; if(h) h.style.display="none"; return }
  box.innerHTML=boostTile()+visibleApps().slice().sort((a,b)=>appName(a).localeCompare(appName(b))).map(tile).join("") }
const _renderHomeA=renderHome; renderHome=function(){ _renderHomeA.apply(this,arguments); try{ renderAllW(); if(window.applyWidgets) applyWidgets() }catch(e){} };
let boosting=false;
async function boostNow(){
  if(boosting) return; boosting=true; banner("🚀",L("boosting"),"",2500);
  const before=JSON.parse(nat("memInfo")||"{}").avail||0;
  const opened=openedApps.slice(); for(const p of opened) await closeOne(p);
  const killed=+(nat("cleanRam")||0);
  try{ if(typeof shz==="function"&&shz()==="ok") await runShell("pm trim-caches 999G") }catch(e){}
  nat("clearOwnCache");
  await new Promise(r=>setTimeout(r,1500));
  const after=JSON.parse(nat("memInfo")||"{}").avail||0, mb=Math.max(0,Math.round((after-before)/1048576));
  banner("✅",L("boostDone"),`${L("freed")} ${mb} MB · ${opened.length+killed} ${L("closedN")}`,5000);
  boosting=false; renderHome();
}
window.boostNow=boostNow;
activators.push(el=>{ if(el.id==="boostBtn"||el.id==="boostTile"){ boostNow(); return true } return false });
if(typeof ACTIONS==="function"){ const _AB=ACTIONS; ACTIONS=()=>[["🚀",L("boost"),boostNow]].concat(_AB()) }
const _tgCmdBo=tgCmd; tgCmd=function(t){ if(/^\/?(سرّع|سرع|تسريع|boost)$/i.test(String(t).trim())){ boostNow(); return "🚀" } return _tgCmdBo.apply(this,arguments) };
