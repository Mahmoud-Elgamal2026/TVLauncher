// ================= Fast launcher mode + auto-close apps on return =================
Object.assign(DEF,{fastMode:true,autoCloseApps:true,fastSnap:null});
Object.assign(T.ar,{fmTitle:"⚡ وضع اللانشر",fmFast:"⚡ لانشر سريع",fmNormal:"🎨 اللانشر المعتاد",fmSub:"السريع بيقفل كل حاجة بتتقّل الجهاز. المعتاد بيرجّع اختياراتك زي ما كانت.",
  fmHeavy:"الحاجات اللي بتتقّل (اقفل اللي مش محتاجه)",fmAuto:"اقفل أي تطبيق أول ما أرجع للرئيسية (الإعدادات والداتا بتاعته بتفضل)",
  hvAnim:"خلفية متحركة",hvLive:"خلفية لايف",hvPrev:"معاينة القنوات وانت بتتنقل",hvCheck:"فحص القنوات التلقائي",hvTicker:"شريط الأخبار والماتشات تحت",hvLite:"الوضع الخفيف (من غير ضباب وظلال)"});
Object.assign(T.en,{fmTitle:"⚡ Launcher mode",fmFast:"⚡ Fast launcher",fmNormal:"🎨 Usual launcher",fmSub:"Fast turns off everything heavy. Usual brings your choices back.",
  fmHeavy:"Heavy features (turn off what you don't need)",fmAuto:"Close any app when I return Home (its settings and data stay)",
  hvAnim:"Animated background",hvLive:"Live wallpaper",hvPrev:"Channel preview while browsing",hvCheck:"Auto channel check",hvTicker:"Bottom ticker",hvLite:"Lite look (no blur/shadows)"});
const HEAVY=[["anim","hvAnim","off"],["liveWall","hvLive",false],["preview","hvPrev",false],["autoCheck","hvCheck",false],["lite","hvLite",true]];
function setFast(on){
  if(on){ const snap={}; HEAVY.forEach(([k,,v])=>{ snap[k]=S[k]; S[k]=v }); if(!S.fastMode||!S.fastSnap) S.fastSnap=snap }
  else { const sn=S.fastSnap||{}; HEAVY.forEach(([k])=>{ if(k in sn) S[k]=sn[k] }); S.fastSnap=null }
  S.fastMode=!!on; S.perfChosen=true; try{ applyLook(); if(typeof updateTicker==="function") updateTicker(); if(typeof pvStop==="function"&&on) pvStop() }catch(e){}
}
// matches & prayer are never touched by any mode
if(!S.tickFix){ S.tickFix=true; S.tickerOn=true; S.prayerOn=true; S.sportsOn=true }
// first run: start in fast mode (the box has 2 GB)
if(!S.fastSeeded){ S.fastSeeded=true; if(S.fastMode) setFast(true) }
function fastSection(){
  const b=(k,on)=>`<button class="btn f${on?" pri":""}" data-fm="${k}">${esc(L(k==="1"?"fmFast":"fmNormal"))}</button>`;
  const rows=HEAVY.map(([k,lab,v])=>{ const isOff=String(S[k])===String(v);
    return `<div class="field"><label>${esc(L(lab))}</label><div class="inline"><button class="btn f${!isOff?" pri":""}" data-hv="${k}:on">${esc(L("on"))}</button><button class="btn f${isOff?" pri":""}" data-hv="${k}:off">${esc(L("off"))} ⛔</button></div></div>` }).join("");
  return `<div class="sec" id="fastSec"><h3>${esc(L("fmTitle"))}</h3><div class="field"><label>${esc(L("fmSub"))}</label><div class="inline">${b("1",S.fastMode)}${b("0",!S.fastMode)}</div></div>
    <div class="field"><label>${esc(L("fmAuto"))}</label><div class="inline"><button class="btn f${S.autoCloseApps?" pri":""}" data-hv="autoCloseApps:on">${esc(L("on"))}</button><button class="btn f${!S.autoCloseApps?" pri":""}" data-hv="autoCloseApps:off">${esc(L("off"))}</button></div></div>
    <h3 style="margin-top:2vh">${esc(L("fmHeavy"))}</h3>${rows}</div>`;
}
const _renderSetF=renderSettings; renderSettings=function(){ _renderSetF.apply(this,arguments); const s=$("setScroll"); if(s&&!isKids()) s.insertAdjacentHTML("afterbegin",fastSection()) };
window.renderSettings=renderSettings;
activators.unshift(el=>{ const d=el.dataset||{};
  if(d.fm!=null){ setFast(d.fm==="1"); renderSettings(); const e=document.querySelector(`[data-fm="${d.fm}"]`); if(e) focus(e); return true }
  if(d.hv){ const [k,st]=d.hv.split(":"); if(k==="autoCloseApps") S.autoCloseApps=st==="on";
    else { const h=HEAVY.find(x=>x[0]===k); if(st==="off") S[k]=h[2]; else S[k]=k==="anim"?"auto":k==="lite"?false:true; S.perfChosen=true; try{ applyLook(); if(typeof updateTicker==="function") updateTicker() }catch(e){} }
    renderSettings(); const e=document.querySelector(`[data-hv="${d.hv}"]`); if(e) focus(e); return true }
  return false });
// back on Home: the apps you used are closed so they hold no RAM (their data/settings are untouched)
const _onBgF=window.onBg; window.onBg=function(b){ _onBgF(b);
  if(!b&&S.autoCloseApps&&typeof openedApps!=="undefined"&&openedApps.length){ const l=openedApps.slice(); setTimeout(()=>{ if(window.__bg) return; l.forEach(p=>{ try{ closeOne(p) }catch(e){} }) },1500) } };
