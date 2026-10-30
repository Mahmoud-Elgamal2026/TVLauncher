// ================= Elgamal TV: what's new, crash reports, rest of the first-run setup =================
const APP_NAME="Elgamal TV";
Object.assign(T.ar,{wnTitle:"✨ الجديد في "+APP_NAME,wlTeam:"بتشجع مين؟ (تنبيهات الماتشات)",wlTheme:"اختار الشكل",wlPhone:"اربط موبايلك كريموت؟",wlPhoneYes:"📱 اربط دلوقتي",wlNo:"بعدين",
  crashT:"⚠️ "+APP_NAME+": حصل خطأ"});
Object.assign(T.en,{wnTitle:"✨ What's new in "+APP_NAME,wlTeam:"Which team do you support? (match alerts)",wlTheme:"Pick a look",wlPhone:"Use your phone as a remote?",wlPhoneYes:"📱 Pair now",wlNo:"Later",
  crashT:"⚠️ "+APP_NAME+": an error happened"});
document.title=APP_NAME;

// ---- 1) what's new: shown once after each update (newest notes on top)
const CHANGES=[
  {v:187,ar:["الكارت الكبير: الصلوات الخمسة والطقس بالأيام الجاية والماتش","15 ويدجت جديدة من زرار ＋","أوامر صوتية: «افتح يوتيوب»، «اقفل بعد ساعة»","تقفل التليفزيون من الموبايل أو تيليجرام","تنبيه بكل جون لفرقك حتى وانت جوه تطبيق"],
   en:["Big card: five prayers, weather forecast and the match","15 new widgets from the ＋ button","Voice: “open YouTube”, “sleep in an hour”","Turn the TV off from your phone or Telegram","A pop-up on every goal for your teams"]}];
function whatsNew(force){ const v=+(nat("versionCode")||0); if(!v) return; const seen=+S.seenVer||0; S.seenVer=v;
  if(!force&&(!seen||seen>=v)) return; // fresh installs skip it (they get the setup instead)
  const notes=CHANGES.filter(c=>force||c.v>seen).slice(0,2).reduce((a,c)=>a.concat(S.lang==="ar"?c.ar:c.en),[]).slice(0,6); if(!notes.length) return;
  dialog(L("wnTitle"),[{label:"👍",pri:1,fn:()=>{}}],{sub:notes.map(n=>"• "+n).join("\n")}) }
window.whatsNew=whatsNew;
setTimeout(()=>{ if(S.welcomed&&!on("dlg")) whatsNew(false); else S.seenVer=+(nat("versionCode")||0) },6000);

// ---- 2) crash reports: errors go to your Telegram (batched, at most one message every 10 minutes)
let crashBuf=[], crashAt=0;
window.addEventListener("error",e=>{ crashBuf.push((e.message||"")+" @"+String(e.filename||"").split("/").pop()+":"+e.lineno); if(crashBuf.length>10) crashBuf.shift() });
window.addEventListener("unhandledrejection",e=>{ const r=e.reason; crashBuf.push("promise: "+String(r&&r.message||r).slice(0,160)); if(crashBuf.length>10) crashBuf.shift() });
setInterval(()=>{ /* tgBackup crash */ if(!crashBuf.length||!S.tgChat||Date.now()-crashAt<600000) return; crashAt=Date.now();
  const ver=nat("versionName")||"?", uniq=[...new Set(crashBuf)]; crashBuf=[];
  try{ tgSend(S.tgChat,`${L("crashT")} (v${ver})\n`+uniq.join("\n")) }catch(_){} },60000);

// ---- 3) first-run setup continues: team → look → phone
window.wlTeam=function(){ const T0=[["Al Ahly, الأهلي","🔴 الأهلي"],["Zamalek, الزمالك","⚪ الزمالك"],["Pyramids, بيراميدز","🔵 بيراميدز"],["Al Masry, المصري","🟢 المصري"],["","— ولا حاجة"]];
  dialog(L("wlTeam"),T0.map(([k,n])=>({label:n,fn:()=>{ S.favTeams=[k,"Egypt, مصر"].filter(Boolean).join(", "); setTimeout(wlTheme,60) }})),{grid:3}) };
function wlTheme(){ if(typeof SKINS==="undefined") return wlPhone();
  dialog(L("wlTheme"),SKINS.map(k=>({icon:k[1],label:S.lang==="ar"?k[2]:k[3],fn:()=>{ S.skin=k[0]; applyLook(); setTimeout(wlPhone,60) }})),{grid:3}) }
function wlPhone(){ dialog(L("wlPhone"),[{label:L("wlPhoneYes"),pri:1,fn:()=>setTimeout(()=>{ try{ phoneDialog() }catch(e){} },60)},{label:L("wlNo"),fn:()=>{}}],{grid:2}) }
