// ---- idle while another app is in front: only alarms (adhan, match alerts, schedules, sleep timer, updates) keep running
window.__bg=false; window.onBg=function(b){ window.__bg=!!b };
(function(){ const si=window.setInterval, keep=/adhan|alarms|goalWatch|matchAlerts|schedOn|autoSleep|isRamadan|autoUpdate|bedLock|ping|tgBackup|frameMin/;
  window.setInterval=function(fn,ms){ if(typeof fn!=="function") return si.apply(window,arguments); const k=keep.test(String(fn));
    return si.call(window,function(){ if(window.__bg&&!k) return; return fn.apply(this,arguments) },ms) } })();
// Runs first. Fills gaps of old Android TV WebViews (Android 7.x ships Chrome ~51–64).
(function(){
  "use strict";
  var w=window, d=document;
  // ---- small built-ins missing before Chrome 54–76 ----
  if(!Object.entries) Object.entries=function(o){ return Object.keys(o).map(function(k){ return [k,o[k]] }) };
  if(!Object.values) Object.values=function(o){ return Object.keys(o).map(function(k){ return o[k] }) };
  if(!Object.fromEntries) Object.fromEntries=function(it){ var o={}; Array.from(it).forEach(function(p){ o[p[0]]=p[1] }); return o };
  if(!String.prototype.padStart) String.prototype.padStart=function(n,s){ var t=String(this); s=s===undefined?" ":String(s); while(t.length<n) t=s+t; return t.slice(t.length-Math.max(n,String(this).length)) };
  if(!String.prototype.padEnd) String.prototype.padEnd=function(n,s){ var t=String(this); s=s===undefined?" ":String(s); while(t.length<n) t+=s; return t.slice(0,Math.max(n,String(this).length)) };
  if(w.Promise&&!Promise.allSettled) Promise.allSettled=function(ps){ return Promise.all(Array.from(ps).map(function(p){ return Promise.resolve(p).then(function(v){ return {status:"fulfilled",value:v} },function(e){ return {status:"rejected",reason:e} }) })) };
  if(w.NodeList&&!NodeList.prototype.forEach) NodeList.prototype.forEach=Array.prototype.forEach;
  if(!Element.prototype.closest) Element.prototype.closest=function(s){ var e=this; while(e&&e.nodeType===1){ if(e.matches(s)) return e; e=e.parentElement } return null };
  if(!Element.prototype.matches) Element.prototype.matches=Element.prototype.webkitMatchesSelector;

  // ---- browser version (used for a hint in Settings) ----
  var m=navigator.userAgent.match(/Chrome\/(\d+)/); w.__chromeVer=m?+m[1]:0;

  // ---- flex `gap` arrived in Chrome 84: fall back to margins (css rules under html.nofg) ----
  try{
    var f=d.createElement("div"); f.style.cssText="display:flex;flex-direction:column;row-gap:1px;position:absolute;visibility:hidden";
    f.appendChild(d.createElement("div")); f.appendChild(d.createElement("div")); d.documentElement.appendChild(f);
    if(f.scrollHeight!==1) d.documentElement.className+=" nofg";
    f.parentNode.removeChild(f);
  }catch(e){}

  try{ if(!(w.CSS&&CSS.supports&&(CSS.supports("backdrop-filter","blur(1px)")||CSS.supports("-webkit-backdrop-filter","blur(1px)")))) d.documentElement.className+=" nobf" }catch(e){ d.documentElement.className+=" nobf" }
  // ---- CSS grid arrived in Chrome 57: fall back to flex-wrap ----
  try{ var gt=d.createElement("div"); gt.style.display="grid"; if(gt.style.display!=="grid") d.documentElement.className+=" nogrid" }catch(e){}
  // ---- `aspect-ratio` arrived in Chrome 88: size cards from their width ----
  var hasAR=w.CSS&&CSS.supports&&CSS.supports("aspect-ratio","1 / 1");
  if(!hasAR){
    d.documentElement.className+=" noar";
    var RATIOS=[[".app.match",16/7],["#apps .app",1/0.9],[".app",16/9.6],[".chgrid .it",16/10],[".pv",16/9],[".poster",2/3],["#dPoster",2/3],[".fgrid",1.6],[".ep img",16/9],[".ep .epn",16/9],[".sico",1]];
    var busy=false;
    var roots=function(){ var r=[], q=d.querySelectorAll(".page.on,#dlg,#frame,#dock,#allAppsW"); for(var i=0;i<q.length;i++) r.push(q[i]); return r };
    var qa=function(sel){ var out=[], rs=roots(); for(var i=0;i<rs.length;i++){ var l=rs[i].querySelectorAll(sel); for(var j=0;j<l.length;j++) out.push(l[j]) } return out };
    var fix=function(){ busy=false;
      for(var i=0;i<RATIOS.length;i++){ var els=qa(RATIOS[i][0]);
        for(var j=0;j<els.length;j++){ var el=els[j]; if(el.__ar) continue; var wd=el.offsetWidth; if(wd&&el.__w!==wd+"/"+RATIOS[i][1]){ el.__w=wd+"/"+RATIOS[i][1]; el.style.height=(wd/RATIOS[i][1])+"px" } } }
      // .app.match must not be overwritten by the generic .app rule
      var ms=qa(".app.match"); for(var k=0;k<ms.length;k++){ ms[k].style.height=(ms[k].offsetWidth/(16/7))+"px" }
      // theme layouts with their own tile shapes (applied last so they win)
      var SPEC=[['#home .row[data-wshape=square] .app',1],['#home .row[data-wshape=circle] .app',1],['#home .row[data-wshape=icon] .app',1],['#home .row[data-wshape=poster] .app',2/3],['body[data-lay=poster][data-page=home] #favRow .app',2/3],['body[data-lay=grid][data-page=home] #favRow .app',16/9.6],['body[data-lay=bar][data-page=home] #favRow .app',16/9.6]];
      for(var q=0;q<SPEC.length;q++){ var se=qa(SPEC[q][0]); for(var z=0;z<se.length;z++){ if(se[z].offsetWidth) se[z].style.height=(se[z].offsetWidth/SPEC[q][1])+"px" } }
      var xb=d.querySelector('body[data-lay=xbox][data-page=home] #favRow .app:first-child'); if(xb) xb.style.height="";
    };
    var later=function(){ if(!busy){ busy=true; setTimeout(fix,30) } };
    w.__fixAspect=later;
    d.addEventListener("DOMContentLoaded",function(){
      // only re-measure when cards are added/removed or the look changes — not on every focus move
      new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++){ var tg=ms[i].target; if(tg&&tg.closest&&tg.closest("#hwBoard,#banners,#ticker,#fwBox,#ramCard,#shelf,.hwb")) continue; var a=ms[i].addedNodes; for(var j=0;j<a.length;j++) if(a[j].nodeType===1&&a[j].tagName!=="IMG"&&a[j].tagName!=="SPAN"&&a[j].tagName!=="B"){ later(); return } } }).observe(d.body,{childList:true,subtree:true});
      new MutationObserver(later).observe(d.body,{attributes:true,attributeFilter:["data-theme","data-size","data-page","data-lay","data-wshape","data-wsize","data-wview"]});
      w.addEventListener("resize",later); later();
    });
  }
})();
