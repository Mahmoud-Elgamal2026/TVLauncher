// Runs inside the launcher on the test emulator. Every result is one console line: "TVL|<name>|<PASS/FAIL/SKIP>|<detail>"
(async function(){
  const log=(n,ok,d)=>console.log("TVL|"+n+"|"+(ok===null?"SKIP":ok?"PASS":"FAIL")+"|"+String(d==null?"":d).replace(/\n/g," ").slice(0,300));
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const t=async(n,fn,ms)=>{ try{ const r=await Promise.race([fn(),wait(ms||25000).then(()=>{throw new Error("timeout")})]); log(n,r[0],r[1]) }catch(e){ log(n,false,e&&e.message||e) } };
  window.onerror=(m,src,l)=>{ log("js-error",false,m+" @"+(src||"").split("/").pop()+":"+l) };
  log("webview",true,navigator.userAgent.match(/Chrome\/[\d.]+/)+" · grid="+!document.documentElement.classList.contains("nogrid")+" · ar="+!document.documentElement.classList.contains("noar")+" · lite="+!!S.lite);
  await t("apps-loaded",async()=>[apps.length>0,apps.length+" apps"]);
  await t("bridge-methods",async()=>{ const need=["fetchText","fetchEpg","checkStreams","resolveUrl","installApk","installBundled","hasBundled","listDir","storageRoots","mediaUrl","smbScan","recStart","recState","tgStart","bootFresh","isDefaultHome","homePackages","playAudio","stopAudio","memInfo","listPackages","shizukuState"];
    const miss=need.filter(m=>typeof NA[m]!=="function"); return [!miss.length,miss.length?"missing: "+miss.join(","):need.length+" ok"] });
  // ---- every page renders without errors and focus can enter it
  for(const p of ["home","apps","tv","vod","files","store","settings"]){
    await t("page-"+p,async()=>{ showPage(p); if(p==="settings") renderSettings(); await wait(600); const f=document.querySelector(".page.on .f"); return [!!f||p==="vod",(document.querySelectorAll(".page.on .f").length)+" focusable"] });
  }
  for(const c of ["all","browser","player","iptv","stream","sports","tools","boost","clean","sys","ram","code","link","custom"]){
    await t("store-"+c,async()=>{ showPage("store"); storeCat=c; renderStore(); await wait(300); return [$("storeMain").innerHTML.length>50,$("storeMain").innerText.slice(0,60)] });
  }
  // ---- internet & data sources
  await t("net-internet",async()=>{ await A.fetchText("https://www.google.com/generate_204"); return [true,"ok"] });
  await t("net-weather",async()=>{ const w=await A.fetchJSON("https://api.open-meteo.com/v1/forecast?latitude=30.04&longitude=31.24&current=temperature_2m"); return [!!w.current,w.current&&w.current.temperature_2m+"°"] });
  await t("net-geocode",async()=>{ const g=await A.fetchJSON("https://geocoding-api.open-meteo.com/v1/search?count=1&name=Cairo"); return [!!(g.results&&g.results[0]),g.results&&g.results[0].name] });
  await t("net-matches",async()=>{ const r=await A.fetchJSON("https://www.thesportsdb.com/api/v1/json/123/all_leagues.php"); return [!!(r.leagues&&r.leagues.length),(r.leagues||[]).length+" leagues"] });
  await t("net-bing-wallpaper",async()=>{ const r=await A.fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"); return [!!(r.images&&r.images[0]),r.images&&r.images[0].urlbase] });
  await t("net-wallhaven",async()=>{ const l=await wallList("nature",1); return [l.length>0,l.length+" images"] });
  await t("net-radio-list",async()=>{ const r=await A.fetchJSON("https://mp3quran.net/api/v3/radios?language=ar"); return [!!(r.radios&&r.radios.length),(r.radios||[]).length+" radios"] });
  await t("net-radio-stream",async()=>{ const r=JSON.parse(await natAsync("resolveUrl",RADIO_FB[0].url)); return [!!r.url,r.url+" "+r.type] });
  await t("net-install-code",async()=>{ const r=JSON.parse(await natAsync("resolveUrl","https://aftv.news/")); return [!!r.url,r.url] });
  await t("net-github-api",async()=>{ const r=await A.fetchJSON("https://api.github.com/repos/RikkaApps/Shizuku/releases/latest"); return [!!r.tag_name,"public repo release "+r.tag_name] });
  // ---- prayer times (city → coordinates → times)
  await t("prayer",async()=>{ S.city="Cairo"; S.loc=null; if(window.weather) await weather(); await wait(3000); if(window.computePrayers) computePrayers(); updateTicker(); return [!!$("tPrayer").textContent.trim(),$("tPrayer").textContent] });
  // ---- IPTV: real public playlist → channels → check → play
  await t("iptv-load",async()=>{ S.lists=[{name:"Test",url:"https://iptv-org.github.io/iptv/countries/eg.m3u"}]; await loadLists(); return [channels.length>0,channels.length+" channels, "+groups.length+" groups"] },60000);
  await t("iptv-check",async()=>{ const sub=channels.slice(0,15).map(c=>c.url); const r=await A.checkStreams(sub); const ok=Object.keys(r).filter(k=>r[k]).length; return [Object.keys(r).length===sub.length,ok+"/"+sub.length+" working"] },90000);
  await t("iptv-play",async()=>{ const live=channels.filter(c=>/\.m3u8/.test(c.url)); let ok=false,name=""; for(const c of live.slice(0,6)){ play(c); name=c.name; for(let i=0;i<12&&!ok;i++){ await wait(1000); ok=$("video").readyState>=2&&!$("video").paused } if(ok) break } const st=$("video").readyState; return [ok,name+" readyState="+st] },90000);
  await t("player-menu",async()=>{ playerMenu(); await wait(300); const n=$("dbox")._items.length; closeDialog(); return [n>3,n+" items (record="+$("dbox").innerHTML.indexOf("⏺")+")"] });
  await t("iptv-stop",async()=>{ stopPlayer(); await wait(300); return [!$("player").classList.contains("on"),"stopped"] });
  // ---- recording a public HLS stream for ~25s
  await t("record",async()=>{ nat("recStart","https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8","SelfTest",1); await wait(25000); const st=JSON.parse(nat("recState")); const a=st.active[0]; if(a) nat("recStop",a.id); return [!!(a&&a.bytes>100000),a?(a.bytes+" bytes → "+a.file):"no active job "+JSON.stringify(st).slice(0,150)] },60000);
  // ---- files
  await t("files-roots",async()=>{ const r=JSON.parse(nat("storageRoots")); return [r.length>0,r.map(x=>x.path).join(" ")] });
  await t("files-list",async()=>{ nat("askStorageAccess"); await wait(1500); try{ const l=JSON.parse(await natAsync("listDir","/sdcard")); return [true,l.length+" entries"] }catch(e){ return [null,"no storage permission on emulator: "+e.message] } });
  await t("files-media-url",async()=>{ const u=nat("mediaUrl","/sdcard/x.mp4"); return [/^http:\/\/127\.0\.0\.1:8766\/f\?p=/.test(u),u] });
  // ---- radio playback (native player)
  await t("radio-play",async()=>{ playRadio(RADIO_FB[0]); await wait(6000); const on=!!radioAudio; stopRadio(); return [on,"started+stopped"] });
  // ---- bundled Shizuku, home, packages
  await t("shizuku-bundled",async()=>[!!nat("hasBundled","shizuku.apk"),"assets/shizuku.apk"]);
  await t("system-packages",async()=>{ const l=JSON.parse(nat("listPackages")||"[]"); return [l.length>10,l.length+" packages"] });
  await t("home-packages",async()=>[true,nat("homePackages")]);
  // ---- widgets: move favorites and put back
  await t("widgets",async()=>{ showPage("home"); setW("fav",{x:10,y:40}); await wait(200); const r=$("favRow").getBoundingClientRect(); const ok=Math.abs(r.top-innerHeight*.4)<8; const n=Object.assign({},lay()); delete n.fav; saveLay(n); applyWidgets(); return [ok,"top="+(r.top|0)] });
  // ---- setup wizard & telegram parsing
  await t("setup-wizard",async()=>{ setupWizard(); await wait(300); const n=$("dbox").querySelectorAll(".btn").length; closeDialog(); return [n>=5,n+" rows"] });
  await t("telegram-cmds",async()=>{ S.tgCode="111222"; S.tgChat=""; const out=[]; const o=window.tgSend; window.tgSend=(c,tx)=>out.push(tx); onTg("1","T","111222"); onTg("1","T","الحالة"); onTg("2","X","الحالة"); window.tgSend=o; S.tgChat=""; return [out.length===3&&/✅/.test(out[0]),out.map(x=>x.slice(0,20)).join(" / ")] });
  await t("lang-en",async()=>{ S.lang="en"; applyLang(); renderHome(); await wait(300); const ok=document.documentElement.dir==="ltr"; S.lang="ar"; applyLang(); renderHome(); return [ok,"switched and back"] });
  log("done",true,"");
})();
