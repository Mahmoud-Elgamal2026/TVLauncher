// ================= One big widget (half the screen) that holds everything: time, weather, prayer, match, YouTube, box health — pick the parts =================
Object.assign(T.ar,{w_combo:"الويدجت الكبيرة",cbParts:"🧩 اختار اللي يظهر في الويدجت الكبيرة",cbPick:"دوس على أي جزء عشان تظهره أو تخفيه",cbOpenMt:"⚽ افتح الماتشات",cbOpenYt:"▶️ افتح يوتيوب",
  cbP_time:"🕒 الساعة والتاريخ",cbP_weather:"⛅ الطقس",cbP_prayer:"🕌 الصلاة",cbP_mcard:"⚽ الماتش",cbP_ytnew:"▶️ يوتيوب الجديد",cbP_perf:"📊 أداء البوكس"});
Object.assign(T.en,{w_combo:"Big widget",cbParts:"🧩 Choose what the big widget shows",cbPick:"Press a part to show or hide it",cbOpenMt:"⚽ Open matches",cbOpenYt:"▶️ Open YouTube",
  cbP_time:"🕒 Time & date",cbP_weather:"⛅ Weather",cbP_prayer:"🕌 Prayer",cbP_mcard:"⚽ Match",cbP_ytnew:"▶️ New on YouTube",cbP_perf:"📊 Box health"});
const CB_ALL=["time","weather","prayer","mcard","perf"];
Object.assign(DEF,{comboParts:["time","weather","prayer","mcard","perf"]});
if(LITE_HW.indexOf("combo")<0) LITE_HW.unshift("combo"); if(!HW_TYPES.some(t=>t[0]==="combo")) HW_TYPES.unshift(["combo","🧩","w_combo"]);
function cbTime(){ const d=new Date(); let hj=""; try{ hj=typeof hijriStr==="function"?hijriStr(d):"" }catch(e){}
  return `<div class="cbclock">${esc(fmtTime(d))}</div><div class="hwsub">${esc(d.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"long",day:"numeric",month:"long"}))}${hj?" · "+esc(hj):""}</div>` }
function cbPart(p){ if(p==="time") return cbTime(); try{ return hwBody({id:"cb_"+p,t:p,sz:2,st:"clear"}) }catch(e){ return "—" } }
hwBody=(function(prev){ return function(w){ if(w.t!=="combo") return prev.apply(this,arguments);
  const parts=(S.comboParts||CB_ALL).filter(p=>CB_ALL.indexOf(p)>=0);
  return `<div class="cbgrid">${parts.map(p=>`<div class="cbcell cb-${p}"><div class="cbh">${esc(L("cbP_"+p))}</div><div class="cbb">${cbPart(p)}</div></div>`).join("")}</div>` } })(hwBody);
// refresh the parts (clock every 30 s; the rest follow their own data)
setInterval(()=>{ /* combo widget */ if(window.__bg||!document.querySelector("#home.on")) return; document.querySelectorAll(".hw-combo").forEach(c=>{ const b=c.querySelector(".hwb"), w=hwGet(c.dataset.hw); if(b&&w) b.innerHTML=hwBody(w) }) },30000);
// OK on it: open matches / YouTube, or choose the parts
activators.unshift(el=>{ if(!el.dataset||!el.dataset.hw) return false; const w=hwGet(el.dataset.hw); if(!w||w.t!=="combo") return false;
  dialog("🧩 "+L("w_combo"),[{label:L("cbOpenMt"),pri:1,fn:()=>{ mtCat="d0"; showPage("mt") }},{label:L("cbOpenYt"),fn:()=>showPage("ytp")},{label:L("cbParts"),fn:cbChoose},{label:L("cancel"),fn:()=>{}}],{}); return true });
function cbChoose(){ const cur=S.comboParts||CB_ALL;
  dialog(L("cbParts"),CB_ALL.map(p=>({label:(cur.indexOf(p)>=0?"✓ ":"⬜ ")+L("cbP_"+p),fn:()=>{ const l=(S.comboParts||CB_ALL).slice(), i=l.indexOf(p); if(i>=0) l.splice(i,1); else l.push(p);
    S.comboParts=CB_ALL.filter(x=>l.indexOf(x)>=0); try{ renderHW() }catch(e){} setTimeout(cbChoose,60) }})).concat([{label:"✓",pri:1,fn:()=>{}}]),{sub:L("cbPick"),grid:2}) }
// once: Home becomes this one big widget instead of many small ones
setTimeout(()=>{ try{ if(!S.comboMig){ S.comboMig=1; hwSave([{id:"combo",t:"combo",sz:4,st:"glass"}]) } }catch(e){} },6500);

// "New on YouTube" is gone for good: not in the big widget, not in the widget picker, removed from Home
(function(){ const i=LITE_HW.indexOf("ytnew"); if(i>=0) LITE_HW.splice(i,1); const j=HW_TYPES.findIndex(t=>t[0]==="ytnew"); if(j>=0) HW_TYPES.splice(j,1);
  if(S.comboParts&&S.comboParts.indexOf("ytnew")>=0) S.comboParts=S.comboParts.filter(p=>p!=="ytnew");
  setTimeout(()=>{ try{ const l=hwList(); if(l.some(w=>w.t==="ytnew")) hwSave(l.filter(w=>w.t!=="ytnew")) }catch(e){} },7000) })();
