// ================= Voice commands, app time stats, weekly device report, theme per family member =================
Object.assign(T.ar,{stTitle:"📊 إحصائياتي",stToday:"النهارده",stWeek:"آخر 7 أيام",stTop:"أكتر التطبيقات",stNone:"لسه مفيش بيانات",rpTitle:"🧹 تقرير الجهاز",
  rpRam:"الرامات",rpDisk:"المساحة الفاضية",rpTip:"اقتراح",rpTipTxt:"امسح كاش التطبيقات الكبيرة أو شيل اللي مش بتستخدمه",vNotFound:"ملقتش"});
Object.assign(T.en,{stTitle:"📊 My stats",stToday:"Today",stWeek:"Last 7 days",stTop:"Top apps",stNone:"No data yet",rpTitle:"🧹 Device report",
  rpRam:"RAM",rpDisk:"Free space",rpTip:"Tip",rpTipTxt:"Clear the cache of big apps or remove ones you don't use",vNotFound:"Not found"});

// ---- time spent in each app (counted from opening it until you're back on Home)
let appOpen=null;
const _launchSt=launch; launch=function(p){ appOpen={p,t:Date.now()}; return _launchSt.apply(this,arguments) };
const _onBgSt=window.onBg; window.onBg=function(b){ _onBgSt(b); if(b||!appOpen) return; const s=Math.round((Date.now()-appOpen.t)/1000), p=appOpen.p; appOpen=null; if(s<20||s>8*3600) return;
  const st=S.stats; st.appTime=st.appTime||{}; const k=dayKey(); st.appTime[k]=st.appTime[k]||{}; st.appTime[k][p]=(st.appTime[k][p]||0)+s;
  const ks=Object.keys(st.appTime).sort(); while(ks.length>14) delete st.appTime[ks.shift()]; S.stats=st };
function statsText(){ const st=S.stats, at=st.appTime||{}, today=at[dayKey()]||{}, week={};
  for(let i=0;i<7;i++){ const d=at[dayKey(new Date(Date.now()-i*86400000))]||{}; Object.keys(d).forEach(p=>week[p]=(week[p]||0)+d[p]) }
  const sum=o=>Object.keys(o).reduce((a,k)=>a+o[k],0)+0, nm=p=>{ const a=byPkg(p); return a?appName(a):p };
  const top=Object.keys(week).sort((a,b)=>week[b]-week[a]).slice(0,6);
  if(!top.length) return [L("stNone")];
  return [`${L("stToday")}: ${hm(sum(today)+((st.days||{})[dayKey()]||0))}`,`${L("stWeek")}: ${hm(sum(week))}`,"— "+L("stTop")+" —"].concat(top.map(p=>`${nm(p)} · ${hm(week[p])}`)) }
function showStats(){ dialog(L("stTitle"),statsText().map(t=>({label:t,fn:()=>{}}))) }
window.showStats=showStats;

// ---- device report (on demand, and every week to Telegram if the bot is linked)
function reportText(){ let mi={}, st={}; try{ mi=JSON.parse(nat("memInfo")||"{}") }catch(e){} try{ st=A.status()||{} }catch(e){}
  const gb=b=>(b/1073741824).toFixed(1)+" GB", l=[L("rpTitle")];
  if(mi.total) l.push(`${L("rpRam")}: ${gb(mi.total-mi.avail)} / ${gb(mi.total)} (${Math.round((1-mi.avail/mi.total)*100)}%)`);
  if(st.diskFree!=null) l.push(`${L("rpDisk")}: ${gb(st.diskFree)}`); else if(st.disk) l.push(`${L("rpDisk")}: ${st.disk}`);
  const w=S.stats.apps||{}, top=Object.keys(w).sort((a,b)=>w[b]-w[a]).slice(0,5).map(p=>{ const a=byPkg(p); return (a?appName(a):p)+" ×"+w[p] });
  if(top.length) l.push("— "+L("stTop")+" —",...top);
  l.push(`💡 ${L("rpTip")}: ${L("rpTipTxt")}`); return l }
function showReport(){ dialog(L("rpTitle"),reportText().slice(1).map(t=>({label:t,fn:()=>{}}))) }
window.showReport=showReport;
setInterval(()=>{ /* tgBackup weekly report */ if(!S.tgChat||Date.now()-(S.reportAt||0)<7*86400000) return; S.reportAt=Date.now();
  try{ tgSend(S.tgChat,reportText().join("\n")+"\n\n"+statsText().join("\n")) }catch(e){} },3600000);

// ---- side rail: stats + report live in the speed settings group
groupSettings=(function(prev){ return function(){ const box=$("setScroll"); if(box&&!box.querySelector(".sgrp")&&!isKids()&&!$("statSec"))
    box.insertAdjacentHTML("afterbegin",`<div class="sec" id="statSec"><h3>⚡ ${S.lang==="ar"?"تقارير":"Reports"}</h3><div class="inline"><button class="btn f" id="stBtn">${esc(L("stTitle"))}</button><button class="btn f" id="rpBtn">${esc(L("rpTitle"))}</button></div></div>`);
  return prev() } })(groupSettings);
SET_GROUPS[0][2].push("تقارير","Reports");
activators.unshift(el=>{ if(el.id==="stBtn"){ showStats(); return true } if(el.id==="rpBtn"){ showReport(); return true } return false });

// ---- each family member keeps their own theme
const _skinAct=el=>el.dataset&&el.dataset.skin;
activators.unshift(el=>{ if(_skinAct(el)){ setTimeout(()=>{ const ps=S.profiles.map(p=>p.id===S.cur?Object.assign({},p,{skin:S.skin}):p); S.profiles=ps },0) } return false });
let lastProf=S.cur; setInterval(()=>{ if(S.cur!==lastProf){ lastProf=S.cur; const p=profile(); if(p&&p.skin&&p.skin!==S.skin){ S.skin=p.skin; applyLook() } } },2000);

// ---- more spoken commands
const APP_AR={"يوتيوب":"youtube","يوتيوب تيوب":"tizentube","تايزن":"tizen","شاهد":"shahid","نتفليكس":"netflix","ياسين":"yacine","اوسكار":"oscar","أوسكار":"oscar","الاسطوره":"الأسطورة","الاسطورة":"الأسطورة","جوجل بلاي":"play","بلاي":"play","المتجر":"play","الاعدادات":"settings","الإعدادات":"settings","كودي":"kodi","في ال سي":"vlc","واتش ات":"watchit","سبوتيفاي":"spotify","كروم":"chrome","داونلودر":"downloader","اكشن":"اكشن"};
function findApp(q){ q=APP_AR[q.trim()]||q; q=q.toLowerCase().replace(/\s+/g,""); const all=visibleApps(); return all.find(a=>appName(a).toLowerCase().replace(/\s+/g,"")===q)||all.find(a=>appName(a).toLowerCase().replace(/\s+/g,"").indexOf(q)>=0)||all.find(a=>a.pkg.toLowerCase().indexOf(q)>=0) }
const AR_NUM={"ربع":15,"نص":30,"نصف":30,"ساعه":60,"ساعة":60,"ساعتين":120,"دقيقه":1,"دقيقة":1};
const _onVoiceW3=window.onVoice; window.onVoice=t=>{ const s=String(t||"").trim(); let m;
  if(/^(اقفل|قفل)\s*(التليفزيون|التلفزيون|الشاشة|الشاشه)$/.test(s)){ tvOff(); return }
  if((m=s.match(/^(اقفل|نام|قفل)\s*(بعد)\s*(.+)$/))){ const x=m[3]; let mins=parseInt(x)||0; if(!mins){ for(const k in AR_NUM) if(x.indexOf(k)>=0){ mins=AR_NUM[k]; break } }
    if(/ساع/.test(x)&&parseInt(x)) mins=parseInt(x)*60; if(mins){ setSleep(mins); banner("😴",s,"✓",3000); return } }
  if(/ماتش|مباراة|ماتش الاهلي|ماتش الأهلي/.test(s)&&/(شغل|شغّل|افتح)/.test(s)){ if(S.matchApp&&byPkg(S.matchApp)){ launch(S.matchApp); return } }
  if((m=s.match(/^(افتح|شغل|شغّل)\s+(.+)$/))){ const a=findApp(m[2]); if(a){ banner("🎙",s,appName(a),2500); launch(a.pkg); return }
    if(typeof channels!=="undefined"){ const q=m[2].replace(/^قناة\s*/,"").toLowerCase(); const c=channels.find(c=>String(c.name).toLowerCase().indexOf(q)>=0); if(c){ play(c); return } } }
  if(/احصائيات|إحصائيات/.test(s)){ showStats(); return } if(/تقرير/.test(s)){ showReport(); return }
  return _onVoiceW3(t) };
