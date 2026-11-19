// ================= While you watch (Ostora, YouTube…): the launcher empties its heavy parts so the app in front gets the memory =================
let slimT=null;
function slimDown(){ if(!window.__bg) return; try{ // widgets stay in place (Home comes back instantly); only the pictures are let go
    document.querySelectorAll("#home img, #apps img").forEach(i=>{ if(i.src&&!i.dataset.slim){ i.dataset.slim=i.getAttribute("src"); i.removeAttribute("src") } });
    document.querySelectorAll("#hwBoard .hw-hero, #shelf").forEach(e=>e.style.backgroundImage="") }catch(e){}
  window.__slim=true; window.__homeDirty=true }
function slimUp(){ if(!window.__slim) return; window.__slim=false;
  document.querySelectorAll("img[data-slim]").forEach(i=>{ i.setAttribute("src",i.dataset.slim); delete i.dataset.slim });
  setTimeout(()=>{ try{ renderHW() }catch(e){} },1500) }
const _onBgSlim=window.onBg; window.onBg=function(b){ clearTimeout(slimT); if(b) slimT=setTimeout(slimDown,5000); else slimUp(); return _onBgSlim&&_onBgSlim.apply(this,arguments) };
