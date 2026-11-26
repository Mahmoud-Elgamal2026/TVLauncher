"use strict";
// ================= Elgamal TV — new interface (one clean file) =================
// Only what is used every day: Home (big widget, favourites, all apps), Matches, YouTube, Settings,
// my apps that install by themselves, updates, and the phone remote. Same saved settings as the old interface.

// ---------- native bridge ----------
const NA=window.Android, cbs={}; let cbN=0;
window.__cb=(id,ok,data)=>{ const f=cbs[id]; delete cbs[id]; if(f) f(ok,data) };
const nat=(fn,...a)=>{ try{ return NA&&NA[fn]?NA[fn](...a):undefined }catch(e){ return undefined } };
const natAsync=(fn,...a)=>new Promise((res,rej)=>{ if(!NA||!NA[fn]) return rej(new Error("na")); const id="c"+(++cbN); cbs[id]=(ok,d)=>ok?res(d):rej(new Error(d)); NA[fn](...a,id) });
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error("timeout")),ms))]);
const fetchText=u=>withTimeout(NA?natAsync("fetchText",u):fetch(u).then(r=>{ if(!r.ok) throw new Error(r.status); return r.text() }),20000);
const fetchJSON=async u=>JSON.parse(await fetchText(u));
const NA_PKG="com.mahmoud.tvlauncher";

// ---------- storage (same keys as the old interface, so nothing is lost when switching) ----------
const store={ get(k,d){ try{ const v=localStorage.getItem(k); return v==null?d:JSON.parse(v) }catch(e){ return d } },
  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)) }catch(e){}
    if(/^p:[^:]+:(favs|hidden)$/.test(k)&&NA&&NA.putPref) try{ NA.putPref(k,JSON.stringify(v)); const ks=JSON.parse(NA.getPref("__keys")||"[]"); if(ks.indexOf(k)<0){ ks.push(k); NA.putPref("__keys",JSON.stringify(ks)) } }catch(e){} } };
(function(){ try{ if(!NA||!NA.getPref) return; JSON.parse(NA.getPref("__keys")||"[]").forEach(k=>{ const v=NA.getPref(k); if(v&&localStorage.getItem(k)!==v) localStorage.setItem(k,v) }) }catch(e){} })();
const DEF={lang:"ar",city:"Cairo",loc:null,h24:false,method:"egypt",asrHanafi:false,favTeams:"",comps:["egy.1","ksa.1","eng.1","esp.1","ita.1","uefa.champions"],
  closeOthers:true,ramAuto:true,bedTime:"",bedIdle:false,wallPic:true,comboParts:["time","weather","prayer","mcard","perf"],myApps:[],maPkgs:{},maAuto:true,
  repo:"Mahmoud-Elgamal2026/TVLauncher",channel:"stable",autoUpdate:true,ytCh:[],heroImg:"",heroDay:"",showHidden:false};
const PROF=["favs","hidden","recent"];
const pk=k=>PROF.indexOf(k)>=0?"p:"+store.get("cur","main")+":"+k:k;
const S=new Proxy({},{ get:(_,k)=>{ const v=store.get(pk(k),undefined); return v===undefined?(PROF.indexOf(k)>=0?[]:JSON.parse(JSON.stringify(DEF[k]===undefined?null:DEF[k]))):v },
  set:(_,k,v)=>{ store.set(pk(k),v); return true } });

// ---------- words ----------
const T={ar:{home:"الرئيسية",mt:"الماتشات",yt:"يوتيوب",set:"الإعدادات",favs:"المفضلة",apps:"كل التطبيقات",noFav:"دوس OK مطوّل على أي تطبيق وضيفه للمفضلة",
  am:"ص",pm:"م",days:["الأحد","الاتنين","التلات","الأربع","الخميس","الجمعة","السبت"],months:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
  prayers:["الفجر","الشروق","الظهر","العصر","المغرب","العشا"],pTime:"الساعة والتاريخ",pWeather:"الطقس",pPrayer:"الصلاة الجاية",pMatch:"الماتش",pPerf:"أداء البوكس",
  ramFree:"رام فاضية",diskFree:"مساحة فاضية",opened:"فتح في",sec:"ث",inT:"بعد",hr:"س",mn:"د",live:"شغال دلوقتي",ft:"انتهت",noMatch:"مفيش ماتشات",
  today:"النهارده",tomorrow:"بكره",yesterday:"امبارح",teams:"👥 الفرق",teamsHint:"اختار الدوري، ودوس على فرقك عشان تبقى ⭐",loading:"بيحمّل…",loadErr:"مقدرتش أجيب البيانات",
  addFav:"⭐ ضيف للمفضلة",remFav:"شيل من المفضلة",moveL:"➡️ حرّك",moveR:"⬅️ حرّك",hide:"🙈 خبّي",unhide:"👁 اظهر",info:"ℹ️ معلومات التطبيق",uninst:"🗑 امسح التطبيق",cancel:"إلغاء",ok:"تمام",
  ytNone:"مفيش قنوات — ضيف قنواتك من تطبيق الموبايل (يوتيوب ← استيراد)",
  on:"شغال",off:"مقفول",auto:"تلقائي",sLang:"🌐 اللغة",sCity:"📍 مدينتك (للطقس والصلاة)",sClose:"⚡ لما أفتح تطبيق، اقفل الباقي",sPic:"🖼 صورة ورا الويدجت الكبيرة",
  sParts:"🧩 اللي يظهر في الويدجت الكبيرة",sType:"⌨️ الكتابة في التطبيقات من الموبايل",tyOn:"✓ شغالة",tyOff:"مقفولة",tyGo:"فعّلها",
  sMy:"📲 تطبيقاتي (بتنزل لوحدها)",myGo:"⬇️ نزّل الناقص",myAll:"✓ كلها متسطبة",sUnk:"🔓 تثبيت التطبيقات من برا المتجر",unkGo:"اسمح",
  sUpd:"⬆️ التحديث",updChk:"🔎 دوّر على تحديث",updNone:"إنت على آخر نسخة",updAvail:"فيه تحديث جديد",updInst:"ثبّت",later:"بعدين",updDl:"بينزّل التحديث…",updReady:"وافق على التثبيت",
  sPhone:"📱 الموبايل",phoneCode:"الكود",sBed:"🌙 ميعاد النوم",bedIdle:"أو بعد ساعة من غير ريموت بالليل",sBk:"🛟 النسخة الاحتياطية (على الموبايل)",bkNever:"لسه ماتعملتش — افتح تطبيق الموبايل",
  sPerf:"📊 أداء البوكس",sHidden:"🙈 التطبيقات المخفية",showHid:"اظهرها في كل التطبيقات",sOld:"↩️ الواجهة القديمة",oldGo:"ارجع للقديمة",sRam:"🧹 تنضيف الرام لوحده",
  cityQ:"اكتب اسم مدينتك بالإنجليزي (مثلاً Cairo)",save:"حفظ",
  maInst:"بينزّل",maDone:"اتسطّب",maFail:"ماعرفش ينزّل",maTap:"وافق على التثبيت على الشاشة",maWeb:"اللينك مش ملف مباشر — فتحته في المتصفح",maMissing:"تطبيقات ناقصة",
  a11yNeed:"عشان تكتب جوه التطبيقات من الموبايل، فعّل الكتابة من الإعدادات",noField:"دوس بالريموت على خانة الكتابة الأول",
  bedNow:"🌙 وقت النوم — التطبيقات هتتقفل والشاشة هتطفي بعد دقيقة",awake:"لسه صاحي",diskLow:"المساحة قربت تخلص",ramDone:"اتقفلت تطبيقات في الخلفية عشان البوكس يخف",
  qm:"⚡ قايمة سريعة",qOstora:"📺 الأسطورة",qYt:"▶️ TizenTube",qMt:"⚽ الماتشات",cleaned:"🧽 اتعمل تنضيف أسبوعي",prayNow:"حان الآن موعد",wallNew:"خلفية جديدة من الموبايل",openOscar:"📺 افتح أوسكار",sHij:"📅 التاريخ الهجري",hidden:"مخفي",notInst:"التطبيق مش متسطّب"},
 en:{home:"Home",mt:"Matches",yt:"YouTube",set:"Settings",favs:"Favourites",apps:"All apps",noFav:"Hold OK on any app to add it to favourites",
  am:"AM",pm:"PM",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],
  prayers:["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"],pTime:"Time & date",pWeather:"Weather",pPrayer:"Next prayer",pMatch:"Match",pPerf:"Box health",
  ramFree:"Free RAM",diskFree:"Free storage",opened:"Opened in",sec:"s",inT:"in",hr:"h",mn:"m",live:"Live now",ft:"FT",noMatch:"No matches",
  today:"Today",tomorrow:"Tomorrow",yesterday:"Yesterday",teams:"👥 Teams",teamsHint:"Pick a league, then press your teams to star them",loading:"Loading…",loadErr:"Couldn't load",
  addFav:"⭐ Add to favourites",remFav:"Remove from favourites",moveL:"➡️ Move",moveR:"⬅️ Move",hide:"🙈 Hide",unhide:"👁 Show",info:"ℹ️ App info",uninst:"🗑 Uninstall",cancel:"Cancel",ok:"OK",
  ytNone:"No channels — add yours from the phone app (YouTube → import)",
  on:"On",off:"Off",auto:"Auto",sLang:"🌐 Language",sCity:"📍 Your city (weather & prayer)",sClose:"⚡ When I open an app, close the others",sPic:"🖼 Picture behind the big widget",
  sParts:"🧩 What the big widget shows",sType:"⌨️ Typing in apps from the phone",tyOn:"✓ On",tyOff:"Off",tyGo:"Turn on",
  sMy:"📲 My apps (install by themselves)",myGo:"⬇️ Install missing",myAll:"✓ All installed",sUnk:"🔓 Installing apps from outside the store",unkGo:"Allow",
  sUpd:"⬆️ Updates",updChk:"🔎 Check for update",updNone:"You're on the latest version",updAvail:"Update available",updInst:"Install",later:"Later",updDl:"Downloading update…",updReady:"Confirm the install",
  sPhone:"📱 Phone",phoneCode:"Code",sBed:"🌙 Bedtime",bedIdle:"Or after an hour without the remote at night",sBk:"🛟 Backup (on the phone)",bkNever:"Not made yet — open the phone app",
  sPerf:"📊 Box health",sHidden:"🙈 Hidden apps",showHid:"Show them in all apps",sOld:"↩️ Old interface",oldGo:"Go back to the old one",sRam:"🧹 Free memory by itself",
  cityQ:"Type your city in English (e.g. Cairo)",save:"Save",
  maInst:"Installing",maDone:"Installed",maFail:"Couldn't install",maTap:"Confirm the install on screen",maWeb:"Not a direct link — opened it in the browser",maMissing:"Missing apps",
  a11yNeed:"To type into apps from the phone, turn typing on in Settings",noField:"Select the text box with the remote first",
  bedNow:"🌙 Bedtime — apps close and the screen goes dark in a minute",awake:"Still awake",diskLow:"Storage almost full",ramDone:"Closed background apps to keep the box light",
  qm:"⚡ Quick menu",qOstora:"📺 Ostora",qYt:"▶️ TizenTube",qMt:"⚽ Matches",cleaned:"🧽 Weekly clean-up done",prayNow:"It's time for",wallNew:"New wallpaper from the phone",openOscar:"📺 Open Oscar TV",sHij:"📅 Hijri date",hidden:"hidden",notInst:"App not installed"}};
const L=k=>{ const t=T[S.lang]||T.ar; return t[k]!=null?t[k]:(T.en[k]!=null?T.en[k]:k) };
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad=n=>(n<10?"0":"")+n;
const fmtTime=(d,noSfx)=>{ const h=d.getHours(), m=pad(d.getMinutes()); return S.h24?pad(h)+":"+m:(h%12||12)+":"+m+(noSfx?"":" "+(h<12?L("am"):L("pm"))) };
const fmtDate=d=>S.lang==="ar"?`${L("days")[d.getDay()]}، ${d.getDate()} ${L("months")[d.getMonth()]}`:`${L("days")[d.getDay()]}, ${L("months")[d.getMonth()]} ${d.getDate()}`;
// Hijri date: the browser's calendar when it has one; old TV browsers (Chrome 55) often don't → arithmetic (tabular) calendar
const HM_AR=["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
  HM_EN=["Muharram","Safar","Rabi I","Rabi II","Jumada I","Jumada II","Rajab","Sha'ban","Ramadan","Shawwal","Dhu al-Qadah","Dhu al-Hijjah"];
function hijriCalc(d){ const jd=Math.floor(julian(d.getFullYear(),d.getMonth()+1,d.getDate())+0.5), l0=jd-1948440+10632, n=Math.floor((l0-1)/10631), l1=l0-10631*n+354,
    j=Math.floor((10985-l1)/5316)*Math.floor(50*l1/17719)+Math.floor(l1/5670)*Math.floor(43*l1/15238), l2=l1-Math.floor((30-j)/15)*Math.floor(17719*j/50)-Math.floor(j/16)*Math.floor(15238*j/43)+29,
    m=Math.floor(24*l2/709), day=l2-Math.floor(709*m/24), y=30*n+j-30; return {y,m,day} }
function hijri(d){ d=new Date(d.getTime()+(+store.get("hijriAdj",0)||0)*86400000); try{ const t=new Intl.DateTimeFormat((S.lang==="ar"?"ar-EG":"en")+"-u-ca-islamic-umalqura-nu-latn",{day:"numeric",month:"long",year:"numeric"}).format(d);
    if(t&&!/20\d\d|19\d\d/.test(t)) return t.replace(/\s?(هـ|AH)$/,"")+(S.lang==="ar"?" هـ":" AH") }catch(e){}
  const h=hijriCalc(d); return `${h.day} ${(S.lang==="ar"?HM_AR:HM_EN)[h.m-1]} ${h.y}${S.lang==="ar"?" هـ":" AH"}` }
const hijriMemo={}; const hijriDay=d=>{ const k=d.toDateString()+S.lang; return hijriMemo[k]||(hijriMemo[k]=hijri(d)) };
let idleAt=Date.now(); const bootT0=Date.now();
document.documentElement.lang=S.lang; document.documentElement.dir=S.lang==="ar"?"rtl":"ltr";

// ---------- toasts (also sent to the phone as alerts) ----------
const events=[]; let evId=0;
function banner(icon,title,text,ms){ const t=$("toasts"); if(!t) return; const e=document.createElement("div"); e.className="toast";
  e.innerHTML=`<b>${esc(icon)}</b><div><div>${esc(title)}</div>${text?`<small>${esc(text)}</small>`:""}</div>`; t.appendChild(e);
  setTimeout(()=>{ e.classList.add("out"); setTimeout(()=>e.remove(),400) },ms||4000); while(t.children.length>3) t.firstChild.remove();
  events.push({id:++evId,icon,title,text:text||"",t:Date.now()}); while(events.length>30) events.shift() }
const toast=m=>banner("ℹ️",String(m),"",2500);

// ---------- apps ----------
let appsCache=null;
function allApps(){ if(appsCache) return appsCache; let l=[]; try{ l=JSON.parse(nat("getApps")||"[]") }catch(e){} if(!NA) l=DEMO_APPS;
  appsCache=l.filter(a=>a.pkg!==NA_PKG).sort((a,b)=>String(a.name).localeCompare(String(b.name),"ar")); return appsCache }
const DEMO_APPS=[{pkg:"tizen",name:"TizenTube"},{pkg:"ostora",name:"Ostora TV"},{pkg:"a.chrome",name:"Browser"},{pkg:"a.set",name:"Settings"},{pkg:"a.files",name:"Files"},{pkg:"a.play",name:"Play Store"}];
const byPkg=p=>allApps().find(a=>a.pkg===p);
const userPkgs=()=>{ try{ return JSON.parse(nat("userApps")||"[]") }catch(e){ return [] } };
const hasPkg=p=>!!p&&(NA?!!nat("hasPkg",p):!!byPkg(p));
window.onAppsChanged=()=>{ appsCache=null; if(curPage==="home") renderHome() };
const KEEP_RX=/^(moe\.shizuku|com\.android\.(systemui|inputmethod|providers)|com\.google\.android\.(inputmethod|gms)|android$)/;
function launch(pkg){ if(!pkg) return; if(NA&&!nat("launch",pkg)){ toast(L("notInst")); return }
  S.recent=[pkg].concat(S.recent.filter(p=>p!==pkg)).slice(0,10); homeDirty=true;
  if(S.closeOthers) setTimeout(()=>{ const favs=S.favs; allApps().map(a=>a.pkg).filter(p=>p!==pkg&&favs.indexOf(p)<0&&!KEEP_RX.test(p)).forEach(p=>nat("closeApp",p)) },2500) }
const ostoraPkg=()=>{ const m=S.maPkgs, k=Object.keys(m).find(n=>/ostora|أسطور|اسطور/i.test(n)); if(k&&hasPkg(m[k])) return m[k];
  const a=allApps().find(x=>/ostora|أسطور|اسطور/i.test(x.name+" "+x.pkg)); return a?a.pkg:"" };
const tizenPkg=()=>{ const p=S.maPkgs.TizenTube; if(p&&hasPkg(p)) return p; const a=allApps().find(x=>/tizentube|cobalt/i.test(x.name+" "+x.pkg)); return a?a.pkg:"" };
function openVideo(id){ const tp=tizenPkg(), u="https://www.youtube.com/watch?v="+id; if(tp){ if(!nat("openUriIn",u,tp)) launch(tp) } else nat("openUri",u) }

// ---------- focus & remote navigation ----------
let focused=null, curPage="home", homeDirty=false;
const visible=el=>{ if(!el||!el.offsetParent&&el.tagName!=="BODY") return false; const r=el.getBoundingClientRect(); return r.width>0&&r.height>0 };
function focusables(){ const box=$("dlg").classList.contains("on")?$("dbox"):document; return [].slice.call(box.querySelectorAll(".f")).filter(e=>visible(e)&&(box!==document||!e.closest("#dlg"))&&(e.closest(".page")?e.closest(".page").classList.contains("on"):true)) }
function focus(el){ if(!el) return; if(focused) focused.classList.remove("focus"); focused=el; el.classList.add("focus");
  if(el.tagName==="INPUT") el.focus(); else if(document.activeElement&&document.activeElement.blur) document.activeElement.blur();
  const sc=el.closest(".scroll,#dbox"); if(sc){ const r=el.getBoundingClientRect(), s=sc.getBoundingClientRect(), padY=innerHeight*0.08;
    if(r.top<s.top+padY) sc.scrollTop-=(s.top+padY-r.top); else if(r.bottom>s.bottom-padY) sc.scrollTop+=(r.bottom-(s.bottom-padY)) }
  const row=el.closest(".row"); if(row){ const r=el.getBoundingClientRect(), s=row.getBoundingClientRect(); if(r.left<s.left) row.scrollLeft-=(s.left-r.left+20); else if(r.right>s.right) row.scrollLeft+=(r.right-s.right+20) }
  if(el.dataset.tab&&curPage!==el.dataset.tab) showPage(el.dataset.tab,true) }
function move(dir){ const all=focusables(); if(!all.length) return; if(!focused||all.indexOf(focused)<0) return focus(all[0]);
  const a=focused.getBoundingClientRect(), ax=a.left+a.width/2, ay=a.top+a.height/2; let best=null, bd=1e9;
  all.forEach(e=>{ if(e===focused) return; const b=e.getBoundingClientRect(), bx=b.left+b.width/2, by=b.top+b.height/2, dx=bx-ax, dy=by-ay;
    const ok=dir==="l"?dx<-2&&b.right<=a.left+a.width*0.6:dir==="r"?dx>2&&b.left>=a.right-a.width*0.6:dir==="u"?dy<-2&&b.bottom<=a.top+a.height*0.6:dy>2&&b.top>=a.bottom-a.height*0.6;
    if(!ok) return; const main=dir==="l"||dir==="r"?Math.abs(dx):Math.abs(dy), side=dir==="l"||dir==="r"?Math.abs(dy):Math.abs(dx); const d=main+side*2.5; if(d<bd){ bd=d; best=e } });
  if(best) return focus(best);
  if(dir==="u"&&!$("dlg").classList.contains("on")){ const t=document.querySelector("#tabs .tab.on")||document.querySelector("#tabs .f"); if(t&&t!==focused) focus(t) } }
const actions=[]; const onAct=f=>actions.unshift(f);
function activate(el){ if(!el) return; idleAt=Date.now(); for(const f of actions){ try{ if(f(el)) return }catch(e){ console.log(e) } } }
const longActs=[]; function longPress(el){ for(const f of longActs){ try{ if(f(el)) return }catch(e){} } }
function back(){ if($("dlg").classList.contains("on")){ closeDialog(); return } if($("blackout").classList.contains("on")){ $("blackout").classList.remove("on"); return }
  if(curPage!=="home"){ showPage("home"); focus(document.querySelector('#tabs [data-tab="home"]')) } else focus(focusables()[0]) }
document.addEventListener("keydown",e=>{ idleAt=Date.now(); if($("blackout").classList.contains("on")){ $("blackout").classList.remove("on"); e.preventDefault(); return }
  const k=e.key, inInput=document.activeElement&&document.activeElement.tagName==="INPUT";
  if(k==="ArrowLeft"&&!inInput){ e.preventDefault(); move("l") } else if(k==="ArrowRight"&&!inInput){ e.preventDefault(); move("r") }
  else if(k==="ArrowUp"){ e.preventDefault(); move("u") } else if(k==="ArrowDown"){ e.preventDefault(); move("d") }
  else if(k==="Enter"&&!NA){ e.preventDefault(); activate(focused) } // on the box OK comes through onShortOk / onLongOk
  else if(k==="Escape"||k==="GoBack"||k==="BrowserBack"){ e.preventDefault(); back() }
  else if(k==="ContextMenu"||k==="Menu"){ e.preventDefault(); longPress(focused) }
  else if(/^[1-9]$/.test(k)&&!inInput&&!$("dlg").classList.contains("on")){ const p=S.favs[+k-1]; if(curPage==="home"&&p) launch(p); else showPage(["home","mt","set"][+k-1]||curPage) } });
window.onShortOk=()=>{ idleAt=Date.now(); if($("blackout").classList.contains("on")){ $("blackout").classList.remove("on"); return } const a=document.activeElement; if(a&&a.tagName==="INPUT"&&focused===a){ dlgSubmit(); return } activate(focused) };
window.onLongOk=()=>{ idleAt=Date.now(); longPress(focused) };
window.onBack=()=>{ idleAt=Date.now(); back() };
document.addEventListener("click",e=>{ const f=e.target.closest(".f"); if(f){ focus(f); activate(f) } });

// ---------- dialogs ----------
let dlgItems=[], dlgInput=null;
function dialog(title,items,opt){ opt=opt||{}; dlgItems=items; dlgInput=opt.input||null;
  $("dbox").innerHTML=`<h3>${esc(title)}</h3>${opt.sub?`<p class="sub">${esc(opt.sub)}</p>`:""}${opt.html||""}${dlgInput?`<input class="f" id="dIn" value="${esc(dlgInput.value||"")}" placeholder="${esc(dlgInput.ph||"")}">`:""}
    <div class="dlist${opt.grid?" g2":""}">${items.map((it,i)=>`<button class="btn f${it.pri?" pri":""}" data-di="${i}">${esc(it.label)}</button>`).join("")}</div>`;
  $("dlg").classList.add("on"); focus($("dbox").querySelector(dlgInput?"#dIn":".pri")||$("dbox").querySelector(".f")) }
function closeDialog(){ $("dlg").classList.remove("on"); dlgItems=[]; dlgInput=null; const p=$(curPage); focus(lastFocus[curPage]&&visible(lastFocus[curPage])?lastFocus[curPage]:(p.querySelector(".f")||document.querySelector("#tabs .f"))) }
function dlgSubmit(){ const b=$("dbox").querySelector(".pri"); if(b) activate(b) }
onAct(el=>{ if(el.dataset.di==null) return false; const it=dlgItems[+el.dataset.di], v=$("dIn")?$("dIn").value:""; closeDialog(); if(it&&it.fn) setTimeout(()=>it.fn(v),30); return true });
onAct(el=>{ if(el.id!=="dIn") return false; el.focus(); return true });
const lastFocus={};

// ---------- pages ----------
const TABS=[["home","🏠"],["mt","⚽"],["set","⚙️"]]; // YouTube tab removed (TizenTube is the YouTube app)
function renderTabs(){ $("tabs").innerHTML=TABS.map(([id,ic])=>`<button class="tab f${id===curPage?" on":""}" data-tab="${id}">${ic} ${esc(L(id))}</button>`).join("") }
function showPage(id,fromTab){ if(!$(id)) id="home"; if(focused&&focused.closest(".page")) lastFocus[curPage]=focused; curPage=id;
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("on",p.id===id)); document.querySelectorAll("#tabs .tab").forEach(t=>t.classList.toggle("on",t.dataset.tab===id));
  ({home:renderHome,mt:renderMt,yt:renderYt,set:renderSet}[id]||(()=>{}))();
  if(!fromTab){ const f=$(id).querySelector(".f"); if(f) focus(f) } }
onAct(el=>{ if(!el.dataset.tab) return false; showPage(el.dataset.tab); return true });

// ---------- header ----------
function tick(){ const d=new Date(); $("hTime").textContent=fmtTime(d); $("hDate").textContent=fmtDate(d)+" · "+hijriDay(d);
  const ct=document.querySelector("#combo .cbclock"); if(ct) ct.textContent=fmtTime(d,true) }

// ---------- weather & prayer ----------
const WMO=c=>c===0?"☀️":c<=2?"🌤️":c===3?"☁️":c<=48?"🌫️":c<=67?"🌧️":c<=77?"❄️":c<=82?"🌦️":"⛈️";
let wx=null, prayers=[], prayersT=[];
async function weather(){ try{ let loc=S.loc; if(!loc||loc.city!==S.city){ const g=await fetchJSON("https://geocoding-api.open-meteo.com/v1/search?count=1&name="+encodeURIComponent(S.city)); const p=g.results&&g.results[0]; if(!p) return; loc={lat:p.latitude,lon:p.longitude,name:p.name,city:S.city}; S.loc=loc }
    const w=await fetchJSON(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`);
    wx={t:Math.round(w.current.temperature_2m),i:WMO(w.current.weather_code),hi:w.daily?Math.round(w.daily.temperature_2m_max[0]):null,lo:w.daily?Math.round(w.daily.temperature_2m_min[0]):null,city:loc.name};
    store.set("wxLast",wx); $("hWeather").textContent=wx.i+" "+wx.t+"°"; computePrayers(); refreshCombo() }catch(e){} }
const rad=d=>d*Math.PI/180, deg=r=>r*180/Math.PI, dsin=d=>Math.sin(rad(d)), dcos=d=>Math.cos(rad(d)), dtan=d=>Math.tan(rad(d));
const darcsin=x=>deg(Math.asin(x)), darccos=x=>deg(Math.acos(Math.max(-1,Math.min(1,x)))), darctan2=(y,x)=>deg(Math.atan2(y,x)), darccot=x=>deg(Math.atan(1/x));
const fixA=a=>a-360*Math.floor(a/360), fixH=a=>a-24*Math.floor(a/24);
const METHODS={egypt:{fajr:19.5,isha:17.5},makkah:{fajr:18.5,ishaMin:90},mwl:{fajr:18,isha:17},karachi:{fajr:18,isha:18}};
function julian(y,m,d){ if(m<=2){ y-=1; m+=12 } const a=Math.floor(y/100), b=2-a+Math.floor(a/4); return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+b-1524.5 }
function prayerTimes(date,lat,lng,method,hanafi){ const M=METHODS[method]||METHODS.egypt, jd=julian(date.getFullYear(),date.getMonth()+1,date.getDate())-lng/(15*24);
  const sun=t=>{ const D=jd+t-2451545, g=fixA(357.529+.98560028*D), q=fixA(280.459+.98564736*D), Lm=fixA(q+1.915*dsin(g)+.02*dsin(2*g)), e=23.439-.00000036*D; const RA=darctan2(dcos(e)*dsin(Lm),dcos(Lm))/15; return {decl:darcsin(dsin(e)*dsin(Lm)),eqt:q/15-fixH(RA)} };
  const mid=t=>fixH(12-sun(t).eqt), angleT=(ang,t,ccw)=>{ const d=sun(t).decl, n=mid(t), x=darccos((-dsin(ang)-dsin(d)*dsin(lat))/(dcos(d)*dcos(lat)))/15; return n+(ccw?-x:x) };
  const asrT=(f,t)=>{ const d=sun(t).decl; return angleT(-darccot(f+dtan(Math.abs(lat-d))),t) }, tz=-date.getTimezoneOffset()/60, adj=tz-lng/15, sunset=angleT(.833,18/24)+adj;
  const h=[angleT(M.fajr,5/24,true)+adj,angleT(.833,6/24,true)+adj,mid(12/24)+adj,asrT(hanafi?2:1,13/24)+adj,sunset,M.ishaMin?sunset+M.ishaMin/60:angleT(M.isha,18/24)+adj];
  return h.map(x=>{ const d=new Date(date); d.setHours(0,0,0,0); return new Date(d.getTime()+Math.round(x*60)*60000) }) }
function computePrayers(){ const l=S.loc; if(!l) return; const d=new Date(); prayers=prayerTimes(d,l.lat,l.lon,S.method,S.asrHanafi); prayersT=prayerTimes(new Date(d.getTime()+86400000),l.lat,l.lon,S.method,S.asrHanafi) }
function nextPrayer(){ if(!prayers.length) return null; const now=Date.now(); for(let i=0;i<6;i++){ if(i!==1&&prayers[i]>now) return {i,t:prayers[i]} } return prayersT.length?{i:0,t:prayersT[0]}:null }
const prayFired={};
setInterval(()=>{ if(!prayers.length) return; if(prayers[0].toDateString()!==new Date().toDateString()) computePrayers(); const now=Date.now();
  prayers.forEach((t,i)=>{ if(i===1) return; const k=t.toDateString()+i; if(now>=t&&now<t.getTime()+90000&&!prayFired[k]){ prayFired[k]=1; banner("🕌",L("prayNow")+" "+L("prayers")[i],fmtTime(t),15000) } }) },20000);

// ---------- matches (ESPN public scoreboard) ----------
const oscarPkg=()=>{ const m=S.maPkgs, k=Object.keys(m).find(n=>/oscar|أوسكار|اوسكار/i.test(n)); if(k&&hasPkg(m[k])) return m[k];
  const a=allApps().find(x=>/oscar|أوسكار|اوسكار/i.test(x.name+" "+x.pkg)); return a?a.pkg:"" };
const compName=s=>{ const c=COMPS.find(x=>x[0]===s); return c?(S.lang==="ar"?c[1]:c[2]):s };
const teamAr=n=>{ if(S.lang!=="ar") return n; const k=String(n||"").toLowerCase().replace(/\s+fc$|^fc\s+/,"").trim(); return TEAM_AR[k]||n };
const favTeams=()=>String(S.favTeams||"").split(/[,،]/).map(x=>x.trim().toLowerCase()).filter(Boolean);
const isFav=n=>{ const s=(n+" "+teamAr(n)).toLowerCase(); return favTeams().some(x=>s.indexOf(x)>=0) };
const mFav=m=>isFav(m.home)||isFav(m.away);
const dayKey=off=>{ const d=new Date(Date.now()+off*86400000); return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate()) };
const mtCache={};
async function loadDay(off){ const day=dayKey(off), out=[];
  await Promise.all(S.comps.map(async lg=>{ const k=lg+day, c=mtCache[k]; if(c&&Date.now()-c.at<(off===0?90000:30*60000)){ out.push(...c.l); return }
    try{ const r=await fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg}/scoreboard?dates=${day}`);
      const l=(r.events||[]).map(e=>{ const c0=(e.competitions||[])[0]||{}, cs=c0.competitors||[], h=cs.find(x=>x.homeAway==="home")||cs[0]||{}, a=cs.find(x=>x.homeAway==="away")||cs[1]||{}, st=(e.status||{}).type||{};
        return {id:e.id,lg,t:new Date(e.date).getTime(),home:(h.team||{}).displayName||"",away:(a.team||{}).displayName||"",hl:(h.team||{}).logo||"",al:(a.team||{}).logo||"",hs:h.score,as:a.score,
          st:st.state==="in"?"live":st.state==="post"?"ft":"ns",clock:(e.status||{}).displayClock||"",tv:((c0.broadcasts||[])[0]||{names:[]}).names.join(" · ")} });
      mtCache[k]={at:Date.now(),l}; out.push(...l) }catch(e){ if(c) out.push(...c.l) } }));
  return out.sort((a,b)=>(a.st==="live"?0:1)-(b.st==="live"?0:1)||(mFav(b)?1:0)-(mFav(a)?1:0)||a.t-b.t) }
let todayMatches=[];
async function refreshToday(){ try{ todayMatches=await loadDay(0); store.set("mtLast",{d:dayKey(0),l:todayMatches}); refreshCombo() }catch(e){} }
const logo=u=>u?`<img src="${esc(u)}" alt="">`:`<i class="nologo">⚽</i>`;
function mMid(m){ return m.st==="ns"?`<b>${esc(fmtTime(new Date(m.t),true))}</b><small>${esc(m.tv)}</small>`:`<b class="${m.st==="live"?"live":""}" dir="ltr">${esc(m.hs)} - ${esc(m.as)}</b><small class="${m.st==="live"?"live":""}">${m.st==="live"?"● "+esc(m.clock||L("live")):esc(L("ft"))}</small>` }
function mCard(m){ return `<div class="mcard f${mFav(m)?" fav":""}" data-m="${esc(m.id)}"><div class="mhead"><span>${mFav(m)?"⭐ ":""}${esc(compName(m.lg))}</span></div><div class="mbody"><div class="mteam">${logo(m.hl)}<span>${esc(teamAr(m.home))}</span></div><div class="mmid">${mMid(m)}</div><div class="mteam">${logo(m.al)}<span>${esc(teamAr(m.away))}</span></div></div></div>` }
let mtDay=0, mtTeamsLg="";
async function renderMt(){ const days=[[-1,L("yesterday")],[0,L("today")],[1,L("tomorrow")]];
  $("mtDays").innerHTML=days.map(([o,t])=>`<button class="chip f${mtDay===o&&!mtTeamsLg?" on":""}" data-day="${o}">${esc(t)}</button>`).join("")+`<button class="chip f${mtTeamsLg?" on":""}" data-teams="1">${esc(L("teams"))}</button>`;
  if(mtTeamsLg) return renderTeams();
  $("mtList").innerHTML=`<p class="hint">${esc(L("loading"))}</p>`; const d=mtDay, l=await loadDay(d); if(curPage!=="mt"||d!==mtDay||mtTeamsLg) return;
  const keep=focused&&focused.dataset.m; $("mtList").innerHTML=l.length?`<div class="mgrid">${l.map(mCard).join("")}</div>`:`<p class="hint">${esc(L("noMatch"))}</p>`;
  if(keep){ const f=$("mtList").querySelector(`[data-m="${keep}"]`); if(f) focus(f) } }
const teamsCache={};
async function renderTeams(){ const lgs=COMPS.filter(c=>c[3]==="l"&&/\.\d$/.test(c[0])); if(!mtTeamsLg||mtTeamsLg==="1") mtTeamsLg=S.comps.find(s=>lgs.some(c=>c[0]===s))||"egy.1";
  const head=`<p class="hint">${esc(L("teamsHint"))}</p><div class="chips">${lgs.map(c=>`<button class="chip f${c[0]===mtTeamsLg?" on":""}" data-tl="${c[0]}">${esc(S.lang==="ar"?c[1]:c[2])}</button>`).join("")}</div>`;
  $("mtList").innerHTML=head+`<p class="hint">${esc(L("loading"))}</p>`; const k=mtTeamsLg; let t=teamsCache[k];
  if(!t){ try{ const r=await fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${k}/teams`); t=((((r.sports||[])[0]||{}).leagues||[])[0]||{}).teams||[];
    t=t.map(x=>x.team||x).map(x=>({n:x.displayName||x.name||"",logo:((x.logos||[])[0]||{}).href||""})).filter(x=>x.n); teamsCache[k]=t }catch(e){ t=[] } }
  if(curPage!=="mt"||mtTeamsLg!==k) return; t=t.slice().sort((a,b)=>(isFav(b.n)?1:0)-(isFav(a.n)?1:0)||String(teamAr(a.n)).localeCompare(String(teamAr(b.n)),"ar"));
  $("mtList").innerHTML=head+(t.length?`<div class="tgrid">${t.map(x=>`<div class="tcard f${isFav(x.n)?" on":""}" data-team="${esc(x.n)}">${logo(x.logo)}<span>${esc(teamAr(x.n))}</span>${isFav(x.n)?"<b>⭐</b>":""}</div>`).join("")}</div>`:`<p class="hint">${esc(L("loadErr"))}</p>`) }
function toggleTeam(n){ const ar=teamAr(n), l=String(S.favTeams||"").split(/[,،]/).map(x=>x.trim()).filter(Boolean);
  if(isFav(n)){ const ks=[n.toLowerCase(),String(ar).toLowerCase()]; S.favTeams=l.filter(x=>ks.every(y=>y.indexOf(x.toLowerCase())<0)).join(", ") } else S.favTeams=l.concat([n]).concat(ar!==n?[ar]:[]).join(", ") }
onAct(el=>{ const d=el.dataset;
  if(d.day!=null){ mtDay=+d.day; mtTeamsLg=""; renderMt(); return true }
  if(d.teams){ mtTeamsLg="1"; renderMt().then(()=>{}); return true }
  if(d.tl){ mtTeamsLg=d.tl; renderTeams().then(()=>{ const f=$("mtList").querySelector(`[data-tl="${d.tl}"]`); if(f) focus(f) }); return true }
  if(d.team){ toggleTeam(d.team); const on=isFav(d.team); el.classList.toggle("on",on); const b=el.querySelector("b"); if(on&&!b) el.insertAdjacentHTML("beforeend","<b>⭐</b>"); if(!on&&b) b.remove(); return true }
  if(d.m){ const p=ostoraPkg(); if(p) launch(p); return true }
  return false });
// 10 minutes before one of your teams plays: a reminder, OK opens Oscar TV
const mAlerted=store.get("mAlerted",{});
setInterval(()=>{ const now=Date.now(); todayMatches.filter(m=>m.st==="ns"&&mFav(m)&&m.t-now>0&&m.t-now<=10*60000&&!mAlerted[m.id]).slice(0,1).forEach(m=>{
  mAlerted[m.id]=now; store.set("mAlerted",mAlerted);
  dialog(`⚽ ${teamAr(m.home)} × ${teamAr(m.away)}`,[{label:L("openOscar"),pri:1,fn:()=>{ const p=oscarPkg(); if(p) launch(p); else toast(L("notInst")) }},{label:L("later"),fn:()=>{}}],{sub:`${compName(m.lg)} · ${fmtTime(new Date(m.t))} · ${L("inT")} ${Math.ceil((m.t-now)/60000)} ${L("mn")}`}) }) },30000);
setInterval(()=>{ if(window.__bg) return; const live=todayMatches.some(m=>m.st==="live"); if(curPage==="mt"&&mtDay===0&&!mtTeamsLg&&!$("dlg").classList.contains("on")) renderMt(); else if(live||Date.now()%(10*60000)<60000) refreshToday() },60000);

// ---------- YouTube (your channels' latest videos, open in TizenTube) ----------
let ytVids=[], ytAt=0;
async function loadYt(){ const ch=S.ytCh||[]; if(!ch.length) return []; if(Date.now()-ytAt<10*60000&&ytVids.length) return ytVids; const out=[];
  await Promise.all(ch.slice(0,40).map(async c=>{ try{ const x=await fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+c.id); const es=x.split("<entry>").slice(1,4);
    es.forEach(e=>{ const id=(e.match(/<yt:videoId>([^<]+)/)||[])[1], ti=(e.match(/<title>([^<]+)/)||[])[1], pu=(e.match(/<published>([^<]+)/)||[])[1]; if(id) out.push({id,title:ti||"",ch:c.name,t:Date.parse(pu)||0}) }) }catch(e){} }));
  ytVids=out.sort((a,b)=>b.t-a.t).slice(0,60); ytAt=Date.now(); return ytVids }
const unesc=s=>String(s).replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
async function renderYt(){ if(!(S.ytCh||[]).length){ $("ytList").innerHTML=`<p class="hint">${esc(L("ytNone"))}</p>`; return } $("ytList").innerHTML=`<p class="hint">${esc(L("loading"))}</p>`;
  const l=await loadYt(); if(curPage!=="yt") return;
  $("ytList").innerHTML=l.map(v=>`<div class="vid f" data-v="${esc(v.id)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.id)}/mqdefault.jpg" alt=""><b>${esc(unesc(v.title))}</b><small>${esc(v.ch)}</small></div>`).join("") }
onAct(el=>{ if(!el.dataset.v) return false; openVideo(el.dataset.v); return true });

// ---------- Home ----------
const PARTS=[["time","pTime"],["weather","pWeather"],["prayer","pPrayer"],["mcard","pMatch"],["perf","pPerf"]];
function partHtml(p){ const d=new Date();
  if(p==="time") return `<div class="cbclock">${esc(fmtTime(d,true))}</div><small>${esc(fmtDate(d))}</small><small>${esc(hijriDay(d))}</small>`;
  if(p==="weather") return wx?`<div class="big">${wx.i} ${wx.t}°</div><small>${esc(wx.city)}${wx.hi!=null?` · ${wx.hi}° / ${wx.lo}°`:""}</small>`:`<div class="big">⛅</div><small>…</small>`;
  if(p==="prayer"){ const n=nextPrayer(); if(!n) return `<div class="big">🕌</div><small>…</small>`; const left=n.t-Date.now();
    return `<div class="big">${esc(L("prayers")[n.i])}</div><small>${esc(fmtTime(n.t))} · ${esc(L("inT"))} ${Math.floor(left/3600000)} ${esc(L("hr"))} ${Math.floor(left%3600000/60000)} ${esc(L("mn"))}</small>` }
  if(p==="mcard"){ const now=Date.now(), l=todayMatches.filter(m=>m.st==="live"||m.st==="ns"&&m.t>now-3*3600000||m.st==="ft"&&now-m.t<3*3600000), mine=l.filter(mFav), m=(mine.length?mine:l)[0];
    if(!m) return `<small class="dim">${esc(L("noMatch"))}</small>`; const left=m.t-now;
    return `<div class="cbm"><div class="mteam">${logo(m.hl)}<span>${esc(teamAr(m.home))}</span></div><div class="mmid">${mMid(m)}</div><div class="mteam">${logo(m.al)}<span>${esc(teamAr(m.away))}</span></div></div><small>${m.st==="live"?`<b class="live">● ${esc(L("live"))}</b>`:m.st==="ns"&&left>0?`${esc(L("inT"))} ${Math.floor(left/3600000)} ${esc(L("hr"))} ${Math.floor(left%3600000/60000)} ${esc(L("mn"))}`:""}</small>` }
  if(p==="perf"){ let m={}, s={}; try{ m=JSON.parse(nat("memInfo")||"{}") }catch(e){} try{ s=JSON.parse(nat("storageInfo")||"{}") }catch(e){} const pct=m.total?Math.round(m.avail*100/m.total):0;
    const row=(k,v,c)=>`<div class="kv"><span>${esc(k)}</span><b${c?` style="color:${c}"`:""}>${esc(v)}</b></div>`;
    return row(L("diskFree"),s.free?(s.free/1e9).toFixed(1)+" GB":"—",s.free&&s.free<5e8?"#ff6b6b":"")+row(L("opened"),bootMs?(bootMs/1000).toFixed(1)+" "+L("sec"):"—") }
  return "" }
function comboHtml(){ const parts=PARTS.filter(p=>S.comboParts.indexOf(p[0])>=0);
  return `<div class="combo f" id="comboCard"${S.heroImg&&S.wallPic?` style="background-image:linear-gradient(rgba(8,12,24,.5),rgba(8,12,24,.78)),url('${esc(S.heroImg)}')"`:""}><div class="cbgrid">${parts.map(([p,k])=>`<div class="cbcell cb-${p}"><div class="cbh">${esc(L(k))}</div><div class="cbb">${partHtml(p)}</div></div>`).join("")}</div></div>` }
function refreshCombo(){ if(curPage!=="home"||window.__bg) return; const c=$("comboCard"); if(!c){ $("combo").innerHTML=comboHtml(); return }
  const fc=focused===c; const t=document.createElement("div"); t.innerHTML=comboHtml(); const n=t.firstChild; c.parentNode.replaceChild(n,c); if(fc) focus(n) }
const tile=(a,i)=>`<div class="app f" data-pkg="${esc(a.pkg)}">${a.icon?`<img src="${esc(a.icon)}" alt="" onerror="this.outerHTML='<i class=noicon>📦</i>'">`:`<i class="noicon">📦</i>`}<span>${i!=null&&i<9?`<em>${i+1}</em>`:""}${esc(a.name)}</span></div>`;
function renderHome(){ const keep=focused&&focused.dataset&&focused.dataset.pkg, inHome=focused&&focused.closest("#home"), kf=focused&&focused.id==="comboCard";
  $("combo").innerHTML=comboHtml(); const hid=S.hidden, favs=S.favs.map(byPkg).filter(Boolean);
  $("favH").textContent="⭐ "+L("favs"); $("favs").innerHTML=favs.length?favs.map(tile).join(""):`<p class="hint">${esc(L("noFav"))}</p>`;
  $("appsH").textContent=L("apps"); $("apps").innerHTML=allApps().filter(a=>S.showHidden||hid.indexOf(a.pkg)<0).map(a=>tile(a)).join("");
  homeDirty=false; if(inHome){ const f=kf?$("comboCard"):keep&&document.querySelector(`#home [data-pkg="${keep}"]`); if(f) focus(f) } }
onAct(el=>{ if(!el.dataset.pkg) return false; launch(el.dataset.pkg); return true });
onAct(el=>{ if(el.id!=="comboCard") return false; const live=todayMatches.some(m=>m.st==="live"&&mFav(m)); if(live){ const p=ostoraPkg(); if(p){ launch(p); return true } } showPage("mt"); return true });
function appMenu(pkg){ const a=byPkg(pkg); if(!a) return; const favs=S.favs, fi=favs.indexOf(pkg), hid=S.hidden.indexOf(pkg)>=0, items=[];
  items.push(fi<0?{label:L("addFav"),pri:1,fn:()=>{ S.favs=favs.concat([pkg]); renderHome() }}:{label:L("remFav"),fn:()=>{ S.favs=favs.filter(p=>p!==pkg); renderHome() }});
  if(fi>0) items.push({label:L("moveL"),fn:()=>{ const l=S.favs; [l[fi-1],l[fi]]=[l[fi],l[fi-1]]; S.favs=l; renderHome(); focus(document.querySelector(`#favs [data-pkg="${pkg}"]`)) }});
  if(fi>=0&&fi<favs.length-1) items.push({label:L("moveR"),fn:()=>{ const l=S.favs; [l[fi+1],l[fi]]=[l[fi],l[fi+1]]; S.favs=l; renderHome(); focus(document.querySelector(`#favs [data-pkg="${pkg}"]`)) }});
  items.push({label:hid?L("unhide"):L("hide"),fn:()=>{ S.hidden=hid?S.hidden.filter(p=>p!==pkg):S.hidden.concat([pkg]); renderHome() }});
  items.push({label:L("info"),fn:()=>nat("appInfo",pkg)},{label:L("uninst"),fn:()=>nat("uninstallApp",pkg)},{label:L("cancel"),fn:()=>{}});
  dialog(a.name,items,{grid:2}) }
longActs.push(el=>{ if(!el||!el.dataset.pkg) return false; appMenu(el.dataset.pkg); return true });
longActs.push(()=>{ if(curPage!=="home") return false; dialog(L("qm"),[{label:L("qOstora"),pri:1,fn:()=>{ const p=ostoraPkg(); if(p) launch(p); else toast(L("notInst")) }},{label:L("qYt"),fn:()=>{ const p=tizenPkg(); if(p) launch(p); else toast(L("notInst")) }},{label:L("qMt"),fn:()=>showPage("mt")},{label:L("sParts"),fn:partsMenu},{label:L("cancel"),fn:()=>{}}],{grid:2}); return true });
function partsMenu(){ const cur=S.comboParts; dialog(L("sParts"),PARTS.map(([p,k])=>({label:(cur.indexOf(p)>=0?"✓ ":"⬜ ")+L(k),fn:()=>{ const l=S.comboParts, i=l.indexOf(p); if(i>=0) l.splice(i,1); else l.push(p); S.comboParts=PARTS.map(x=>x[0]).filter(x=>l.indexOf(x)>=0); refreshCombo(); setTimeout(partsMenu,40) }})).concat([{label:L("ok"),pri:1,fn:()=>{}}]),{grid:2}) }
async function dailyPic(){ const d=new Date().toDateString(); if(S.heroImg&&S.heroDay===d) return;
  try{ const r=await fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"), i=r.images&&r.images[0]; if(!i) return; let u="https://www.bing.com"+i.urlbase+"_1366x768.jpg";
    if(NA&&NA.cacheImage) try{ u=await natAsync("cacheImage",u,1280)||u }catch(e){} S.heroImg=u; S.heroDay=d; refreshCombo() }catch(e){} }
setInterval(()=>{ if(!window.__bg&&curPage==="home") refreshCombo() },30000);

// ---------- while another app is in front: let go of pictures so the app gets the memory ----------
let slimT=null;
window.onBg=b=>{ window.__bg=!!b; clearTimeout(slimT);
  if(b) slimT=setTimeout(()=>{ document.querySelectorAll("img").forEach(i=>{ if(i.getAttribute("src")){ i.dataset.s=i.getAttribute("src"); i.removeAttribute("src") } }); const c=$("comboCard"); if(c) c.style.backgroundImage="" },5000);
  else { document.querySelectorAll("img[data-s]").forEach(i=>{ i.setAttribute("src",i.dataset.s); delete i.dataset.s }); if(homeDirty&&curPage==="home") setTimeout(renderHome,300); else refreshCombo() } };

// ---------- my apps: always installed (after a reset too) ----------
const MA_BUILTIN=[{name:"TizenTube",src:"gh:reisxd/TizenTubeCobalt"},{name:"Downloader",pkg:"com.esaba.downloader",src:"play"}];
const maList=()=>(S.myApps||[]).filter(a=>a&&a.url&&!MA_BUILTIN.some(b=>b.name.toLowerCase()===String(a.name).toLowerCase())).concat(MA_BUILTIN);
const maHas=a=>(a.pkg&&hasPkg(a.pkg))||(S.maPkgs[a.name]&&hasPkg(S.maPkgs[a.name]))||(()=>{ const n=String(a.name||"").toLowerCase().replace(/\s+/g,""); return n.length>2&&n!=="app"&&userPkgs().some(x=>{ const m=String(x.name||"").toLowerCase().replace(/\s+/g,""); return m===n||m.indexOf(n)>=0||n.indexOf(m)>=0&&m.length>3 }) })();
const maMissing=()=>maList().filter(a=>!maHas(a));
async function maUrl(a){ if(a.url) return a.url; if(!/^gh:/.test(a.src||"")) return ""; const r=await fetchJSON(`https://api.github.com/repos/${a.src.slice(3)}/releases/latest`), l=(r.assets||[]).filter(x=>/\.apk$/i.test(x.name||""));
  const p=l.find(x=>/armeabi|arm32|universal/i.test(x.name))||l.find(x=>/(^|[-_])arm\.apk$/i.test(x.name))||l[0]; return p?p.browser_download_url:"" }
let maBusy=false; const maProbeW={};
window.onApkProbe=(id,o)=>{ const f=maProbeW[id]; delete maProbeW[id]; if(f) f(o||{error:"x"}) };
window.onApkProgress=(id,p)=>{ const n=String(id).replace(/^(my|st):/,""); if(id==="update"){ if(p===100) banner("✅",L("updReady"),"",6000); else if(p===-1) banner("⚠️",L("loadErr")); return }
  if(p>0&&p%25===0) banner("⬇️",n,p+"%",2000); else if(p===-1) banner("⚠️",n,L("maFail"),5000) };
window.onUpdateProgress=p=>{ if(p===-1) banner("⚠️",L("loadErr")) };
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function maInstall(list){ if(maBusy){ banner("⏳",L("sMy"),L("maInst")+"…"); return } maBusy=true;
  for(const a of list){ if(a.src==="play"){ nat("openUri","market://details?id="+a.pkg); banner("▶️",a.name,L("maTap"),8000); for(let t=0;t<40&&!hasPkg(a.pkg);t++) await sleep(3000); continue }
    let url=""; try{ url=await maUrl(a) }catch(e){} if(!url){ banner("⚠️",a.name,L("maFail")); continue } banner("📲",a.name,L("maInst")+"…",5000);
    const id="my:"+a.name, pr=await new Promise(res=>{ maProbeW[id]=res; if(!nat("probeApk",url,id)&&!NA) res({error:"preview"}); setTimeout(()=>res({error:"timeout"}),300000) });
    if(pr.error){ banner("🌐",a.name,L("maWeb"),10000); nat("openUri",url); continue }
    const m=S.maPkgs; m[a.name]=pr.pkg; S.maPkgs=m; if(a.url) S.myApps=(S.myApps||[]).map(x=>x.url===a.url?Object.assign({},x,{pkg:pr.pkg,name:(x.auto||/^app$/i.test(x.name))&&pr.name?pr.name:x.name,auto:false}):x);
    if(pr.installed!=null&&pr.installed>=pr.ver){ banner("✅",pr.name||a.name,L("maDone"),3000); continue }
    nat("installLocal"); banner("📲",pr.name||a.name,L("maTap"),10000); for(let t=0;t<50&&!hasPkg(pr.pkg);t++) await sleep(3000);
    if(hasPkg(pr.pkg)) banner("✅",pr.name||a.name,L("maDone"),4000) }
  maBusy=false; appsCache=null; if(curPage==="set") renderSet() }
setTimeout(()=>{ const m=maMissing().filter(a=>a.src!=="play"); if(!S.maAuto||!m.length||!NA) return; const k=m.map(a=>a.name).join(","); if(store.get("maAsked","")===k) return; store.set("maAsked",k);
  dialog("📲 "+L("maMissing"),[{label:L("myGo"),pri:1,fn:()=>maInstall(maMissing())},{label:L("later"),fn:()=>{}}],{sub:m.map(a=>a.name).join(" · ")}) },60000);

// ---------- updates (the stable release on GitHub) ----------
let pendingUpd=null;
async function checkUpd(manual){ if(!NA){ if(manual) toast(L("updNone")); return } try{ let r=null;
    try{ r=JSON.parse(await natAsync("checkUpdatePath",S.repo,"releases/tags/stable")) }catch(e){ r=JSON.parse(await natAsync("checkUpdate",S.repo)) }
    store.set("lastUpdCheck",Date.now());
    if(r.latest>r.current&&r.url){ pendingUpd=r; const go=()=>{ banner("⬇️",L("updDl"),r.tag); nat("installUpdate",r.url) };
      if(manual) dialog("⬆️ "+L("updAvail")+" "+r.tag,[{label:L("updInst"),pri:1,fn:go},{label:L("later"),fn:()=>{}}],{});
      else if(store.get("updShown","")!==r.tag){ store.set("updShown",r.tag); banner("⬆️",L("updAvail")+" "+r.tag,L("sUpd")+" ← "+L("updChk"),8000) } }
    else if(manual) toast(L("updNone")+" (v"+r.current+")") }catch(e){ if(manual) toast(L("loadErr")) } }
setTimeout(()=>{ if(S.autoUpdate) checkUpd(false) },60000);
setInterval(()=>{ if(S.autoUpdate&&Date.now()-store.get("lastUpdCheck",0)>3600000) checkUpd(false) },5*60000);

// ---------- box care: RAM, storage, bedtime, weekly clean ----------
setInterval(()=>{ if(!S.ramAuto) return; let m={}; try{ m=JSON.parse(nat("memInfo")||"{}") }catch(e){} if(!m.total||m.avail/m.total>0.15) return;
  const front=window.__bg?S.recent[0]:null, favs=S.favs; let n=0; allApps().map(a=>a.pkg).filter(p=>p!==front&&favs.indexOf(p)<0&&!KEEP_RX.test(p)).forEach(p=>{ nat("closeApp",p); n++ });
  if(n&&!window.__bg&&Date.now()-store.get("ramMsg",0)>3600000){ store.set("ramMsg",Date.now()); banner("🧹",L("sRam"),L("ramDone"),4000) } },120000);
setInterval(()=>{ let s={}; try{ s=JSON.parse(nat("storageInfo")||"{}") }catch(e){} if(!s.free||s.free>=5e8) return; const d=new Date().toDateString(); if(store.get("diskWarn","")===d) return; store.set("diskWarn",d);
  banner("💾",L("diskLow"),(s.free/1e6|0)+" MB",10000) },30*60000);
function bedGo(){ const id=setTimeout(()=>{ allApps().map(a=>a.pkg).filter(p=>!KEEP_RX.test(p)).forEach(p=>nat("closeApp",p)); if(!nat("sleepNow")) $("blackout").classList.add("on") },60000);
  dialog(L("bedNow"),[{label:L("awake"),pri:1,fn:()=>clearTimeout(id)}],{}) }
setInterval(()=>{ const n=new Date(), hm=pad(n.getHours())+":"+pad(n.getMinutes()), d=n.toDateString();
  if(S.bedTime&&hm===S.bedTime&&store.get("bedDone","")!==d){ store.set("bedDone",d); bedGo() }
  if(S.bedIdle&&(n.getHours()>=23||n.getHours()<6)&&Date.now()-idleAt>3600000&&store.get("bedIdleDone","")!==d+n.getHours()){ store.set("bedIdleDone",d+n.getHours()); bedGo() }
  if(n.getHours()>=2&&n.getHours()<=5&&Date.now()-idleAt>45*60000&&Date.now()-store.get("cleanAt",0)>7*86400000){ store.set("cleanAt",Date.now()); nat("selfClean"); store.set("cleanMsg",1) } },30000);

// ---------- Settings ----------
const row=(label,inner,id)=>`<div class="srow"${id?` id="${id}"`:""}><label>${esc(label)}</label><div class="sv">${inner}</div></div>`;
const btn=(t,attrs,pri)=>`<button class="btn f${pri?" pri":""}" ${attrs}>${esc(t)}</button>`;
const onOff=(k)=>btn(L("on"),`data-set="${k}" data-v="1"`,!!S[k])+btn(L("off"),`data-set="${k}" data-v="0"`,!S[k]);
function remoteInfo(){ try{ return JSON.parse(nat("remoteInfo")||"{}") }catch(e){ return {} } }
function renderSet(){ const ty=!!nat("a11yOn"), unk=NA&&NA.unknownSources?!!nat("unknownSources"):true, miss=maMissing(), r=remoteInfo(), ver=nat("versionName")||"preview";
  const bkAt=+store.get("bkAt",0), hid=S.hidden.map(byPkg).filter(Boolean);
  $("setList").innerHTML=[
    row(L("sLang"),btn("العربية",`data-lang="ar"`,S.lang==="ar")+btn("English",`data-lang="en"`,S.lang==="en")),
    row(L("sCity"),btn(S.city||"—",`data-act="city"`)),
    row(L("sHij")+": "+hijriDay(new Date()),[-1,0,1].map(n=>btn((n>0?"+":"")+n,`data-hadj="${n}"`,(+store.get("hijriAdj",0)||0)===n)).join("")),
    row(L("sClose"),onOff("closeOthers")),
    row(L("sRam"),onOff("ramAuto")),
    row(L("sPic"),onOff("wallPic")),
    row(L("sParts"),btn(PARTS.filter(p=>S.comboParts.indexOf(p[0])>=0).map(p=>L(p[1])).join(" · ")||"—",`data-act="parts"`)),
    row(L("sType"),`<span class="hint">${esc(ty?L("tyOn"):L("tyOff"))}</span>`+(ty?"":btn(L("tyGo"),`data-act="a11y"`,true))),
    row(L("sMy"),`<span class="hint">${esc(maList().map(a=>(maHas(a)?"✓ ":"⬜ ")+a.name).join(" · "))}</span>`+(miss.length?btn(L("myGo"),`data-act="myapps"`,true):"")),
    unk?"":row(L("sUnk"),btn(L("unkGo"),`data-act="unk"`,true)),
    row(L("sUpd"),`<span class="hint">v${esc(ver)}</span>`+btn(L("updChk"),`data-act="upd"`,!!pendingUpd)),
    row(L("sPhone"),`<span class="hint" dir="ltr">${r.ip?esc(r.ip+":"+r.port):"—"}</span><span class="hint">${esc(L("phoneCode"))}: <b>${esc(r.code||"—")}</b></span>`),
    row(L("sBed"),["","22:00","23:00","00:00","01:00"].map(t=>btn(t||L("off"),`data-bed="${t}"`,S.bedTime===t)).join("")+btn(L("bedIdle"),`data-act="bedidle"`,S.bedIdle)),
    row(L("sBk"),`<span class="hint">${esc(bkAt?new Date(bkAt).toLocaleString(S.lang==="ar"?"ar-EG":"en-GB")+" · "+store.get("bkN",0)+" app":L("bkNever"))}</span>`),
    row(L("sPerf"),`<span class="hint">${partHtml("perf").replace(/<[^>]+>/g," ").replace(/\s+/g," ")}</span>`),
    hid.length?row(L("sHidden"),`<span class="hint">${esc(hid.map(a=>a.name).join(" · "))}</span>`+btn(L("showHid"),`data-set="showHidden" data-v="${S.showHidden?0:1}"`,S.showHidden)):"",
    row(L("sOld"),btn(L("oldGo"),`data-act="old"`))].join("") }
onAct(el=>{ const d=el.dataset;
  if(d.set){ S[d.set]=d.v==="1"; renderSet(); const f=$("setList").querySelector(`[data-set="${d.set}"][data-v="${d.v}"]`)||$("setList").querySelector(`[data-set="${d.set}"]`); if(f) focus(f); return true }
  if(d.hadj!=null){ store.set("hijriAdj",+d.hadj); for(const k in hijriMemo) delete hijriMemo[k]; tick(); renderSet(); focus($("setList").querySelector(`[data-hadj="${d.hadj}"]`)); return true }
  if(d.lang){ S.lang=d.lang; location.reload(); return true }
  if(d.bed!=null){ S.bedTime=d.bed; renderSet(); focus($("setList").querySelector(`[data-bed="${d.bed}"]`)); return true }
  const a=d.act; if(!a) return false;
  if(a==="city") dialog(L("sCity"),[{label:L("save"),pri:1,fn:v=>{ v=String(v||"").trim(); if(!v) return; S.city=v; S.loc=null; weather(); renderSet() }},{label:L("cancel"),fn:()=>{}}],{sub:L("cityQ"),input:{value:S.city}});
  else if(a==="parts") partsMenu();
  else if(a==="a11y") nat("openA11ySettings");
  else if(a==="myapps") maInstall(maMissing());
  else if(a==="unk") nat("openInstallSettings");
  else if(a==="upd"){ if(pendingUpd){ banner("⬇️",L("updDl"),pendingUpd.tag); nat("installUpdate",pendingUpd.url) } else checkUpd(true) }
  else if(a==="bedidle"){ S.bedIdle=!S.bedIdle; renderSet(); focus($("setList").querySelector('[data-act="bedidle"]')) }
  else if(a==="old"){ if(!nat("setUi",1)) location.href="index.html" }
  return true });

// ---------- phone remote ----------
function remoteText(t,submit){ if(window.__bg){ const r=NA&&NA.imeText?nat("imeText",t,!!submit):"a11y";
    if(r==="a11y"){ banner("⌨️",L("a11yNeed"),"",8000); return "need" }
    if(r==="nofield"){ const tp=tizenPkg(); if(tp&&S.recent[0]===tp&&submit&&t.trim()){ nat("openUriIn","https://www.youtube.com/results?search_query="+encodeURIComponent(t.trim()),tp); return "app" } banner("⌨️",L("noField"),"",4000); return "nofield" }
    return "app" }
  const i=$("dIn"); if(i&&$("dlg").classList.contains("on")){ i.value=t; if(submit) dlgSubmit(); return "dialog" } return "none" }
function voice(t){ t=String(t||"").trim(); if(!t) return; if(window.__bg) return remoteText(t,true);
  const q=t.toLowerCase(), a=allApps().find(x=>String(x.name).toLowerCase()===q)||allApps().find(x=>String(x.name).toLowerCase().indexOf(q)>=0); if(a){ launch(a.pkg); return }
  const tp=tizenPkg(); if(tp){ if(!nat("openUriIn","https://www.youtube.com/results?search_query="+encodeURIComponent(t),tp)) launch(tp) } }
window.onVoice=voice;
const KEYS={up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight"};
function pressKey(k){ idleAt=Date.now(); if(k==="ok"||k==="enter") return window.onShortOk(); if(k==="back") return back(); if(k==="home"){ showPage("home"); return } if(k==="menu") return longPress(focused);
  const key=KEYS[k]||(/^[0-9]$/.test(k)?k:null); if(key) document.dispatchEvent(new KeyboardEvent("keydown",{key,bubbles:true})) }
function remoteState(){ const apps=allApps();
  return {lang:S.lang,city:S.city,favTeams:S.favTeams,profile:{id:"main",name:"أنا",emoji:"😎"},profiles:[{id:"main",name:"أنا",emoji:"😎",kids:false}],kids:false,lists:[],epg:"",
    favs:S.favs.map(byPkg).filter(Boolean).map(a=>({pkg:a.pkg,name:a.name})),apps:apps.map(a=>({pkg:a.pkg,name:a.name,fav:S.favs.indexOf(a.pkg)>=0})),watch:[],favCh:[],last:null,playing:null,
    page:curPage,evId,shz:"none",bg:!!window.__bg,ui:2} }
function remoteCmd(m){ m=m||{}; switch(m.cmd){
  case "state": return remoteState();
  case "events": return {events:events.filter(e=>e.id>(+m.since||0))};
  case "key": pressKey(String(m.k)); return {ok:1};
  case "text": return {ok:1,to:remoteText(String(m.t||""),!!m.submit)};
  case "voice": voice(m.t); return {ok:1};
  case "search": voice(m.t); return {ok:1};
  case "launch": launch(String(m.pkg)); return {ok:1};
  case "quick": { const p=m.which==="ostora"?ostoraPkg():tizenPkg(); if(p) launch(p); return {ok:p?1:0} }
  case "volume": nat("volume",m.d); return {ok:1};
  case "power": if(!nat("sleepNow")) $("blackout").classList.add("on"); return {ok:1};
  case "fav": { const p=String(m.pkg), l=S.favs; S.favs=l.indexOf(p)>=0?l.filter(x=>x!==p):l.concat([p]); renderHome(); return {ok:1} }
  case "favs": if(Array.isArray(m.order)){ S.favs=m.order.filter(p=>typeof p==="string"&&byPkg(p)); renderHome() } return {ok:1};
  case "set": if(m.k==="city"){ S.city=String(m.v||"").trim(); S.loc=null; weather() } else if(m.k==="favTeams") S.favTeams=String(m.v||""); return {ok:1};
  case "apkReady": { const ok=nat("installLocal"); banner("📦",String(m.name||"APK"),L("maTap"),8000); return {ok:ok?1:0} }
  case "uninstall": { const p=String(m.pkg||""); if(p&&p!==NA_PKG) nat("uninstallApp",p); return {ok:1} }
  case "share": { const u=String(m.u||"").trim(), v=u.match(/(?:youtu\.be\/|v=|shorts\/|live\/)([\w-]{11})/); if(v){ openVideo(v[1]); return {ok:1,did:"video"} } if(/^https?:/i.test(u)){ nat("openUri",u); return {ok:1,did:"link"} } return {ok:0} }
  case "ytImport": { const l=Array.isArray(m.list)?m.list:[], ch=(S.ytCh||[]).slice(); let n=0; l.slice(0,300).forEach(c=>{ const id=String(c&&c.id||""); if(/^UC[\w-]{22}$/.test(id)&&!ch.some(x=>x.id===id)){ ch.push({id,name:String(c.name||id).slice(0,80)}); n++ } }); S.ytCh=ch; ytAt=0; return {ok:1,added:n} }
  case "backup": { const data={}; for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(!/^fc:/.test(k)) data[k]=localStorage.getItem(k) } return {app:"tvlauncher",v:2,data} }
  case "restore": { if(!m.data||m.data.app!=="tvlauncher"||!m.data.data) return {error:"file"}; setTimeout(()=>{ Object.keys(m.data.data).forEach(k=>{ try{ localStorage.setItem(k,m.data.data[k]) }catch(e){} }); location.reload() },60); return {ok:1} }
  case "bkDone": store.set("bkAt",Date.now()); store.set("bkN",+m.n||0); return {ok:1};
  case "userApps": return {apps:userPkgs()};
  case "hasApp": return {has:hasPkg(String(m.pkg||""))};
  case "addAccount": nat("addAccount"); return {ok:1};
  case "needStorage": if(!nat("hasStorageAccess")) nat("askStorageAccess"); return {ok:1};
  case "myApps": if(Array.isArray(m.list)){ S.myApps=m.list.filter(a=>a&&/^https?:\/\//.test(String(a.url||""))).slice(0,30).map(a=>({name:String(a.name||"App").slice(0,40),url:String(a.url).trim(),pkg:String(a.pkg||"").trim(),auto:!!a.auto})); if(m.install) setTimeout(()=>maInstall(maMissing()),300) }
    return {list:S.myApps||[],builtin:MA_BUILTIN.map(a=>a.name),missing:maMissing().map(a=>a.name)};
  case "action": if(m.a==="home") showPage("home"); return {ok:1};
  case "checkUpd": checkUpd(true); return {ok:1};
  case "photo": { const u=nat("saveImageB64",String(m.data||"")); if(!u) return {error:"photo"}; S.wallImg=u; applyWall(); banner("🖼",L("wallNew"),"",3000); return {ok:1} }
  case "photoReset": S.wallImg=""; applyWall(); return {ok:1};
  case "lists": case "watchRemove": case "profile": case "play": return {ok:0,ui:2};
 } return {error:"cmd"} }
window.onRemote=(id,json)=>{ let res; try{ res=remoteCmd(JSON.parse(json)) }catch(e){ res={error:String(e&&e.message||e)} } nat("remoteReply",id,JSON.stringify(res)) };
window.onLowMem=()=>{ document.querySelectorAll("#ytList img").forEach(i=>i.removeAttribute("src")) };

// ---------- wallpaper sent from the phone (the whole screen's background) ----------
function applyWall(){ const b=$("bg"), u=S.wallImg; b.style.backgroundImage=u?`linear-gradient(rgba(6,9,18,.55),rgba(6,9,18,.8)),url('${String(u).replace(/'/g,"%27")}')`:""; b.classList.toggle("img",!!u) }

// ---------- start ----------
let bootMs=0;
applyWall(); renderTabs(); tick(); setInterval(tick,15000); showPage("home"); bootMs=Math.round(performance.now());
{ const h=store.get("bootHist",[]); h.unshift(bootMs); store.set("bootHist",h.slice(0,10)) }
focus($("comboCard")||document.querySelector("#tabs .f"));
setTimeout(weather,800); setTimeout(refreshToday,1500); setTimeout(dailyPic,4000);
setInterval(weather,30*60000);
setTimeout(()=>{ if(store.get("cleanMsg",0)){ store.set("cleanMsg",0); banner("🧽",L("cleaned"),"",4000) } },20000);
