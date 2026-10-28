// ================= Settings as categories: one list on the side, one section at a time =================
DEF.setCat=0;
const CAT_ICONS=[[/الشكل|Look/,"🎨"],[/برواز|Frame/,"🖼"],[/قنوات|Channels|IPTV/,"📺"],[/طقس|مدينة|Location|Weather/,"🌤"],[/صلاة|Prayer|أذان/,"🕌"],[/هجري|Hijri|رمضان/,"🌙"],
  [/ماتشات|Matches|Sports/,"⚽"],[/إشعارات|Notif/,"🔔"],[/ريموت|Remote/,"🎛"],[/بروفايل|Profile/,"👥"],[/موبايل|Phone/,"📱"],[/الرئيسية كشاشة|home screen|Keep as home/,"🏠"],
  [/تحديث|Update/,"⬆️"],[/تشغيل البوكس|Start-up/,"⏻"],[/تيليجرام|Telegram/,"✈️"],[/تسجيل|Record/,"⏺"],[/ترتيب|Arrange|widget/i,"🧩"],[/قفل|أمان|Lock|Secur/,"🔒"],
  [/احتياطي|Backup/,"💾"],[/تجهيز|Setup/,"🧭"],[/أداء|Perf/,"⚡"],[/لغة|Lang/,"🌐"]];
const catIcon=t=>{ const m=CAT_ICONS.find(c=>c[0].test(t)); return m?m[1]:"⚙️" };
function buildSetCats(){
  const box=$("setScroll"), secs=[].slice.call(box.children).filter(e=>e.classList.contains("sec"));
  if(!secs.length){ $("setCats").innerHTML=""; return }
  // keep the section that holds the focused control (after a setting re-renders the page)
  let cur=Math.min(S.setCat||0,secs.length-1);
  if(focused&&box.contains(focused)){ const i=secs.findIndex(s=>s.contains(focused)); if(i>=0) cur=i }
  $("setCats").innerHTML=secs.map((s,i)=>{ const h=s.querySelector("h3"), t=h?h.textContent.trim():"#"+(i+1); return `<div class="it f${i===cur?" sel":""}" tabindex="0" data-setcat="${i}">${catIcon(t)} ${esc(t.replace(/^[^\wء-ي]+/,""))}</div>` }).join("");
  showSetCat(cur);
}
function showSetCat(i){
  const secs=[].slice.call($("setScroll").children).filter(e=>e.classList.contains("sec"));
  secs.forEach((s,k)=>{ s.style.display=k===i?"":"none" }); S.setCat=i; $("setScroll").scrollTop=0;
  document.querySelectorAll("#setCats [data-setcat]").forEach(e=>e.classList.toggle("sel",+e.dataset.setcat===i));
}
const _renderSettingsC=renderSettings; renderSettings=function(){ _renderSettingsC.apply(this,arguments); buildSetCats() }; window.renderSettings=renderSettings;
focusHooks.push(el=>{ if(el.dataset&&el.dataset.setcat!=null&&+el.dataset.setcat!==S.setCat) showSetCat(+el.dataset.setcat) });
activators.push(el=>{ if(el.dataset&&el.dataset.setcat!=null){ showSetCat(+el.dataset.setcat); const f=[].slice.call($("setScroll").querySelectorAll(".f")).find(x=>x.offsetParent!==null); if(f) focus(f); return true } return false });
