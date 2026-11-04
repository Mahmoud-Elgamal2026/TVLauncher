// ================= YouTube round 3: add a channel by its name (search), pick its category, "New" chip, home-widget toggle, videos open in the YouTube app =================
Object.assign(T.ar,{ytFindQ:"اكتب اسم القناة",ytFinding:"⏳ بدوّر على",ytFindNone:"ملقتش قنوات بالاسم ده",ytFindRes:"اختار القناة",ytPickCat:"القناة دي تبع إيه؟",ytNews:"🆕 الجديد",
  ytNoNew:"مفيش فيديوهات جديدة دلوقتي",ytOnHome:"🏠 على الرئيسية ✓",ytToHome:"🏠 حطها على الرئيسية",ytHomeAdded:"ويدجت أحدث الحلقات اتحطت على الرئيسية",ytHomeRemoved:"ويدجت أحدث الحلقات اتشالت من الرئيسية",
  ytNoApp:"مفيش تطبيق يوتيوب على البوكس — نزّل SmartTube أو YouTube",ytRemoveW:"شيل الويدجت من الرئيسية"});
Object.assign(T.en,{ytFindQ:"Type the channel name",ytFinding:"⏳ Searching",ytFindNone:"No channels found",ytFindRes:"Pick the channel",ytPickCat:"What kind of channel is it?",ytNews:"🆕 New",
  ytNoNew:"No new videos right now",ytOnHome:"🏠 On Home ✓",ytToHome:"🏠 Put on Home",ytHomeAdded:"Latest episodes widget added to Home",ytHomeRemoved:"Latest episodes widget removed from Home",
  ytNoApp:"No YouTube app on the box — install SmartTube or YouTube",ytRemoveW:"Remove widget from Home"});

// ---- search YouTube channels by name (the results page lists channels with their real names)
async function ytSearchCh(q){ const x=await A.fetchText("https://www.youtube.com/results?search_query="+encodeURIComponent(q)+"&sp=EgIQAg%253D%253D&hl=ar");
  const out=[], seen={}, un=s=>{ try{ return JSON.parse('"'+s+'"') }catch(e){ return s } };
  let i=x.indexOf('"channelRenderer":{');
  while(i>=0&&out.length<12){ const blk=x.slice(i,i+4000), id=(blk.match(/"channelId":"(UC[\w-]{22})"/)||[])[1];
    const name=(blk.match(/"title":\{"simpleText":"((?:[^"\\]|\\.)*)"/)||[])[1], th=(blk.match(/"thumbnails":\[\{"url":"([^"]+)"/)||[])[1];
    const subs=(blk.match(/"(?:videoCountText|subscriberCountText)":\{(?:"accessibility":\{[^}]*\}\},)?"simpleText":"((?:[^"\\]|\\.)*)"/)||[])[1];
    if(id&&name&&!seen[id]){ seen[id]=1; out.push({id,name:un(name),subs:subs?un(subs):"",th:th?(th.indexOf("//")===0?"https:"+th:th):""}) }
    i=x.indexOf('"channelRenderer":{',i+20) }
  return out }
const YT_CATS_AR=["رياضة","رعب","سياسة","أخبار","ديني","طبخ","أطفال","وثائقي","تقنية","ترفيه","تعليم","أفلام ومسلسلات"];
function ytPickCat(cb){ const ex=[...new Set((S.ytCh||[]).map(c=>c.cat).filter(Boolean))], all=ex.concat(YT_CATS_AR.filter(c=>ex.indexOf(c)<0));
  setTimeout(()=>dialog(L("ytPickCat"),all.map(c=>({label:c,fn:()=>cb(c)})).concat([{icon:"＋",label:L("ytNewCat"),fn:()=>setTimeout(()=>prompt2(L("ytCatName"),"",v=>cb((v||"").trim())),30)},{label:L("ytNoCat"),fn:()=>cb("")}]),{grid:4}),40) }
async function ytAddCh(r,cat){ const chs=(S.ytCh||[]).filter(c=>c.id!==r.id); chs.push({id:r.id,name:r.name||r.id,cat:cat||""}); S.ytCh=chs;
  if(!hwList().some(w=>w.t==="ytnew"||w.t==="yt")) hwSave(hwList().concat([{id:"ytnew",t:"ytnew",sz:2,st:"glass"}]));
  banner("▶️",r.name,"✓ "+(S.lang==="ar"?"اتضافت":"added")+(cat?" · "+cat:""),5000); ytpAt=0; ytpAll=[]; await ytpLoad(true);
  try{ renderHW(); if(document.querySelector("#ytp.on")) renderYtp() }catch(e){} }
async function ytFindDlg(q){ q=String(q||"").trim(); if(!q) return; A.toast(L("ytFinding")+" «"+q+"»");
  // a link, an @handle or a channel id still works directly
  if(/^https?:|^@|UC[\w-]{22}/.test(q)){ try{ const r=await ytResolve(q); if(r){ if(!r.name){ try{ const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+r.id); const m=x.match(/<title>([^<]+)<\/title>/); r.name=m?m[1]:r.id }catch(e){} } return ytPickCat(c=>ytAddCh(r,c)) } }catch(e){} q=q.replace(/^@/,"").replace(/^https?:\/\/\S+\/@?/,"") }
  let l=[]; try{ l=await ytSearchCh(q) }catch(e){}
  if(!l.length) return A.toast(L("ytFindNone")+": "+q);
  dialog(L("ytFindRes")+" — «"+q+"»",l.map(r=>({icon:(S.ytCh||[]).some(c=>c.id===r.id)?"✓":"▶️",label:r.name+(r.subs?" · "+r.subs:""),fn:()=>ytPickCat(c=>ytAddCh(r,c))})),{grid:2}) }
window.ytFindDlg=ytFindDlg;
// every "add channel" button now asks for the name
ytAddDlg=function(){ prompt2(L("ytFindQ"),"",v=>{ if(v) setTimeout(()=>ytFindDlg(v),40) },L("ytFindQ")) };
activators.unshift(el=>{ if(el.id==="ytpAdd"){ ytAddDlg(); return true } return false });
// from the phone: a link, a shared channel, or just a name
window.ytAddFromPhone=v=>{ if(on("frame")) stopFrame(); showPage("ytp"); ytFindDlg(v) };
// suggested channels: when the @handle can't be found, search by the channel's name instead
ytAddHandle=(function(prev){ return async function(h,name,cat){ try{ const r=await ytResolve(h); if(r){ r.name=r.name||name; return ytAddCh(r,cat) } }catch(e){}
  let l=[]; try{ l=await ytSearchCh(name) }catch(e){} if(l[0]) return ytAddCh(l[0],cat); A.toast(L("ytAddFail")+": "+name) } })(ytAddHandle);

// ---- open videos in the YouTube app installed on the box (a plain link did nothing on some boxes)
const YT_APPS=["com.liskovsoft.smarttubetv","com.liskovsoft.smarttubetv.beta","com.teamsmart.videomanager.tv","com.google.android.youtube.tv","com.google.android.youtube.googletv","com.google.android.youtube"];
openYt=function(id){ const u="https://www.youtube.com/watch?v="+id, p=YT_APPS.find(x=>{ try{ return A.isInstalled(x) }catch(e){ return false } });
  if(NA&&NA.openUriIn){ if(p&&nat("openUriIn",u,p)) return; if(nat("openUriIn","vnd.youtube:"+id,p||"")) return; if(nat("openUriIn",u,"")) return; return A.toast(L("ytNoApp")) }
  if(NA&&NA.openUri){ nat("openUri",u); return } if(p) launch(p); else window.open(u,"_blank") };
window.openYt=openYt;

// ---- "🆕 New" chip: every unwatched video of the last 3 days from all your channels
renderYtp=(function(prev){ return async function(){
  // keep each video's category in step with its channel (changing a category used to be undone on the next refresh)
  const cm={}; (S.ytCh||[]).forEach(c=>cm[c.id]=c.cat||""); ytpAll.forEach(v=>{ if(cm[v.chId]!=null) v.cat=cm[v.chId] });
  const isNew=ytpCat==="__new", full=ytpAll, nw=full.filter(ytNew); let r;
  if(isNew&&nw.length){ ytpAll=nw; ytpCat=""; try{ r=await prev.apply(this,arguments) }finally{ if(ytpAll===nw) ytpAll=full; ytpCat="__new" } }
  else if(isNew){ ytpCat=""; try{ r=await prev.apply(this,arguments) }finally{ ytpCat="__new" } }
  else r=await prev.apply(this,arguments);
  const m=$("ytpMain"); if(!m) return r; const ch=m.querySelector(".ychips");
  if(ch&&!ch.querySelector('[data-ytc="__new"]')){ if(isNew) ch.querySelectorAll(".on").forEach(e=>e.classList.remove("on"));
    ch.insertAdjacentHTML("afterbegin",`<button class="ych f${isNew?" on":""}" data-ytc="__new">${esc(L("ytNews"))} <i>${full.filter(ytNew).length}</i></button>`) }
  if(isNew&&!nw.length){ const lst=m.querySelector(".ytplist"); if(lst) lst.innerHTML=`<p class="hint">${esc(L("ytNoNew"))}</p>` }
  // put / remove the home widget from here
  const head=m.querySelector(".ytphead"); if(head&&!$("ytpHome")){ const onH=hwList().some(w=>w.t==="ytnew"); head.insertAdjacentHTML("beforeend",`<button class="ych f${onH?" on":""}" id="ytpHome">${esc(L(onH?"ytOnHome":"ytToHome"))}</button>`) }
  return r } })(renderYtp);
activators.unshift(el=>{ if(el.id!=="ytpHome") return false; const onH=hwList().some(w=>w.t==="ytnew");
  if(onH){ hwSave(hwList().filter(w=>w.t!=="ytnew")); A.toast(L("ytHomeRemoved")) } else { hwSave(hwList().concat([{id:"ytnew",t:"ytnew",sz:2,st:"glass"}])); A.toast(L("ytHomeAdded")) }
  renderYtp().then(()=>ytpFocus("#ytpHome")); return true });
// the widget's ⚙️ menu gets a plain "remove" too
activators.unshift(el=>{ if(!el.dataset||!el.dataset.ytgear) return false; const id=el.dataset.ytgear; setTimeout(()=>{ const box=$("dbox"), items=box&&box._items, g=box&&box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
    items.push({icon:"🗑",label:L("ytRemoveW"),fn:()=>{ hwSave(hwList().filter(w=>w.id!==id)); A.toast(L("ytHomeRemoved")); setTimeout(()=>{ try{ renderHW(); const f=document.querySelector("#home .f"); if(f) focus(f) }catch(e){} },50) }});
    g.innerHTML=items.map((it,k)=>`<button class="btn f${it.pri?" pri":""}" data-di="${k}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) },0); return false });

// ---- the add-channel box suggests channels: popular ones before typing, live YouTube matches while you type (also when typing from the phone)
Object.assign(T.ar,{ytSugHint:"✨ مقترحات — أو اكتب الاسم وهتظهر القنوات وإنت بتكتب",ytSugGo:"🔍 دوّر"}); Object.assign(T.en,{ytSugHint:"✨ Suggestions — or type a name to see matching channels",ytSugGo:"🔍 Search"});
ytAddDlg=function(){ const pop=[]; YT_SUGG.forEach(([k,l])=>l.forEach(([n,h])=>{ if(!(S.ytCh||[]).some(c=>c.handle===h)) pop.push({n,h}) })); let seq=0, t=0;
  const go={icon:"",label:L("ytSugGo"),pri:1,fn:()=>{ const v=$("dIn").value.trim(); if(v) setTimeout(()=>ytFindDlg(v),40) }};
  const draw=(hint,items)=>{ const box=$("dbox"), s=$("ytSug"); if(!box||!s) return; box._items=[go].concat(items);
    s.innerHTML=`<div class="ytsugh">${esc(hint)}</div><div class="mgrid c3">${items.map((it,i)=>`<button class="btn f" data-di="${i+1}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join("")}</div>` };
  const popular=()=>draw(L("ytSugHint"),pop.slice(0,12).map(p=>({icon:"✨",label:p.n,fn:()=>ytPickCat(c=>ytAddHandle(p.h,p.n,c))})));
  dialog(L("ytFindQ"),[go],{html:`<input class="inp f" id="dIn" placeholder="${esc(L("ytFindQ"))}"><div class="dlist"><button class="btn pri f" data-di="0">${esc(L("ytSugGo"))}</button></div><div id="ytSug"></div>`});
  popular();
  $("dIn").addEventListener("input",()=>{ clearTimeout(t); const q=$("dIn").value.trim(); if(q.length<2) return popular();
    t=setTimeout(async()=>{ const my=++seq; draw("⏳ "+q,[]); let l=[]; try{ l=await ytSearchCh(q) }catch(e){} if(my!==seq||!$("ytSug")) return;
      if(!l.length) return draw(L("ytFindNone")+": "+q,[]);
      draw("▶️ "+q,l.map(r=>({icon:(S.ytCh||[]).some(c=>c.id===r.id)?"✓":"▶️",label:r.name+(r.subs?" · "+r.subs:""),fn:()=>ytPickCat(c=>ytAddCh(r,c))}))) },600) }) };
