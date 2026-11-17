// ================= Lite: what Mahmoud doesn't use is taken off the screen; Home keeps only what matters =================
// removed: free library, files & recording, store, the old sports page, kids / guest / family profiles, hourly suggestions, theme picker & seasonal looks, extra widgets
const LITE_PAGES=["lib","files","store","sports"];
const LITE_HW=["clock","weather","prayer","mcard","ytnew"];
const LITE_SET=/المكتبة|Library|الملفات والتسجيل|Files & recording|تسجيل|Recording|المتجر|Store|الأطفال|Kids|الضيف|Guest|الملفات الشخصية|Profiles|العيلة|Family|مقترح ليك|Suggest|الثيم|Theme|المواسم|Season/;
document.body.classList.add("lite");
S.seasonal=false; S.guest=false;
// back to the main profile if a kids profile was active
(function(){ try{ const p=profile(); if(p&&p.kids){ const m=(S.profiles||[]).find(x=>!x.kids); if(m){ S.cur=m.id; applyLook() } } }catch(e){} })();
function liteTabs(){ LITE_PAGES.forEach(p=>{ const t=document.querySelector(`.tab[data-page="${p}"]`); if(t){ t.style.setProperty("display","none","important"); t.classList.remove("f") } }) }
liteTabs(); setTimeout(liteTabs,1500);
showPage=(function(prev){ return function(id){ if(LITE_PAGES.indexOf(id)>=0) id="home"; return prev.apply(this,[id].concat([].slice.call(arguments,1))) } })(showPage);
// widgets: only the basic five; the old matches widget becomes the big match card
HW_TYPES.splice(0,HW_TYPES.length,...HW_TYPES.filter(t=>LITE_HW.indexOf(t[0])>=0));
if(!S.liteMig){ S.liteMig=1; const l=hwList(); let n=l.map(w=>w.t==="matches"&&!l.some(x=>x.t==="mcard")?Object.assign({},w,{id:"mcard",t:"mcard",sz:2}):w).filter(w=>LITE_HW.indexOf(w.t)>=0);
  hwSave(n); try{ renderHW() }catch(e){} }
// settings: sections of removed features disappear
renderSettings=(function(prev){ return function(){ const r=prev.apply(this,arguments); const box=$("setScroll"); if(box) [].slice.call(box.querySelectorAll(".sec")).forEach(s=>{ const h=s.querySelector("h3"); if(h&&LITE_SET.test(h.textContent)||s.id==="skinSec"||s.querySelector("#addProfile")) s.remove() });
  ["sysClnBtn","ramBtn"].forEach(id=>{ const e=$(id); if(e) e.remove() }); // these opened the removed store page
  const c=$("setCats"); if(c&&typeof buildSetCats==="function"){ buildSetCats() } return r } })(renderSettings);
// home: back from an app → redraw once (launch no longer redraws while the app is starting)
const _onBgLite=window.onBg; window.onBg=function(b){ _onBgLite.apply(this,arguments); if(!b&&window.__homeDirty){ window.__homeDirty=false; setTimeout(()=>{ if(!window.__bg) try{ renderHome() }catch(e){} },350) } };
