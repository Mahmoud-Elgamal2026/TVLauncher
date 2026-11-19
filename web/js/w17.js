// ================= While you watch (Ostora, YouTube…): the launcher empties its heavy parts so the app in front gets the memory =================
let slimT=null;
function slimDown(){ if(!window.__bg) return; try{ const b=$("hwBoard"); if(b) b.innerHTML="";
    document.querySelectorAll("#home img, #apps img").forEach(i=>{ if(i.src&&!i.dataset.slim){ i.dataset.slim=i.getAttribute("src"); i.removeAttribute("src") } });
    document.querySelectorAll("#hwBoard .hw-hero, #shelf").forEach(e=>e.style.backgroundImage="") }catch(e){}
  window.__slim=true; window.__homeDirty=true }
function slimUp(){ if(!window.__slim) return; window.__slim=false;
  document.querySelectorAll("img[data-slim]").forEach(i=>{ i.setAttribute("src",i.dataset.slim); delete i.dataset.slim });
  try{ renderHW() }catch(e){} }
const _onBgSlim=window.onBg; window.onBg=function(b){ clearTimeout(slimT); if(b) slimT=setTimeout(slimDown,5000); else slimUp(); return _onBgSlim&&_onBgSlim.apply(this,arguments) };
