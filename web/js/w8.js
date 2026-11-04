// ================= YouTube tab, round 2: recently opened, suggested channels, home widget, search, hide Shorts, per-channel alerts =================
Object.assign(T.ar,{ytRecent:"🕘 اتفتح مؤخراً",ytSugg:"✨ قنوات مقترحة",ytSearch:"🔍 دوّر",ytSearchQ:"دوّر في عناوين فيديوهات قنواتك",ytShorts:"الشورتس",ytShortsHide:"🚫 من غير شورتس",ytShortsShow:"🎞 مع الشورتس",
  ytBell:"🔔 نبّهني بفيديوهات القناة دي",ytBellOff:"🔕 بطّل التنبيه",ytBellNew:"فيديو جديد من",ytAdded:"اتضافت",ytAddFail:"ملقتش القناة دي",w_ytnew:"أحدث الحلقات",ytNothingNew:"مفيش جديد",
  ysNews:"📰 أخبار",ysSport:"⚽ رياضة",ysFood:"🍳 طبخ",ysKids:"🧸 أطفال",ysDocs:"🎥 وثائقي",ysTech:"💻 تقنية",ysRel:"🕌 ديني"});
Object.assign(T.en,{ytRecent:"🕘 Recently opened",ytSugg:"✨ Suggested channels",ytSearch:"🔍 Search",ytSearchQ:"Search the titles of your channels' videos",ytShorts:"Shorts",ytShortsHide:"🚫 No Shorts",ytShortsShow:"🎞 With Shorts",
  ytBell:"🔔 Alert me on this channel's videos",ytBellOff:"🔕 Stop alerts",ytBellNew:"New video from",ytAdded:"added",ytAddFail:"Channel not found",w_ytnew:"Latest episodes",ytNothingNew:"Nothing new",
  ysNews:"📰 News",ysSport:"⚽ Sports",ysFood:"🍳 Cooking",ysKids:"🧸 Kids",ysDocs:"🎥 Documentary",ysTech:"💻 Tech",ysRel:"🕌 Religion"});
Object.assign(DEF,{ytNoShorts:true});
let ytpQ="";

// (5) the feed marks Shorts with a /shorts/ link: keep that and hide them unless asked
ytpLoad=(function(){ return async function(force){ const chs=S.ytCh||[]; if(!chs.length){ ytpVids=[]; return }
  if(ytpBusy||(!force&&Date.now()-ytpAt<20*60000&&ytpVids.length)) return; ytpBusy=true; const out=[];
  await Promise.all(chs.map(async c=>{ try{ const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+c.id), doc=new DOMParser().parseFromString(x,"text/xml"), ents=doc.getElementsByTagName("entry");
    for(let i=0;i<Math.min(12,ents.length);i++){ const e=ents[i], g=t=>{ const n=e.getElementsByTagName(t)[0]; return n?n.textContent:"" }, ln=e.getElementsByTagName("link")[0], href=ln?ln.getAttribute("href")||"":"";
      out.push({v:g("yt:videoId"),title:g("title"),ch:c.name||g("name"),chId:c.id,cat:c.cat||"",at:Date.parse(g("published"))||0,short:/\/shorts\//.test(href)}) } }catch(e){} }));
  ytpAll=out.filter(v=>v.v).sort((a,b)=>b.at-a.at); ytpVids=ytVisible(); ytpAt=Date.now(); ytpBusy=false } })();
// (4) search + (5) shorts filter + (1) recently opened: applied on top of the tab view
let ytpAll=[];
const ytVisible=()=>ytpAll.filter(v=>(!S.ytNoShorts||!v.short)&&(!ytpQ||String(v.title).toLowerCase().indexOf(ytpQ.toLowerCase())>=0));
renderYtp=(function(prev){ return async function(){ if(!ytpAll.length&&(S.ytCh||[]).length){ const m=$("ytpMain"); if(m) m.innerHTML=`<p class="hint">${esc(L("ytLoading"))}</p>`; await ytpLoad(false) } ytpVids=ytVisible(); const all=ytpAll;
  await prev.apply(this,arguments);
  const m=$("ytpMain"); if(!m||!(S.ytCh||[]).length) return;
  const head=m.querySelector(".ytphead"); if(head&&!$("ytpSearch")) head.insertAdjacentHTML("beforeend",`<button class="ych f${ytpQ?" on":""}" id="ytpSearch">${esc(ytpQ?"🔍 "+ytpQ+" ✕":L("ytSearch"))}</button><button class="ych f${S.ytNoShorts?" on":""}" id="ytpShorts">${esc(L(S.ytNoShorts?"ytShortsHide":"ytShortsShow"))}</button><button class="ych f" id="ytpSugg">${esc(L("ytSugg"))}</button>`);
  // recently opened (last 6 you opened, still in the feeds)
  const seen=S.ytSeen||{}, rec=all.filter(v=>seen[v.v]).sort((a,b)=>seen[b.v]-seen[a.v]).slice(0,6);
  if(rec.length&&!ytpQ){ const lst=m.querySelector(".ytplist"); if(lst) lst.insertAdjacentHTML("beforebegin",`<div class="ytrec"><div class="ytrect">${esc(L("ytRecent"))}</div><div class="ytrecrow">${rec.map(v=>`<div class="ytrc f" tabindex="0" data-ytv="${esc(v.v)}" data-ytch="${esc(v.chId)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.v)}/mqdefault.jpg" alt=""><span>${esc(v.title)}</span></div>`).join("")}</div></div>`) }
} })(renderYtp);
// (2) suggested channels by category (looked up by handle; anything that can't be found is skipped)
const YT_SUGG=[["ysNews",[["الجزيرة","@aljazeera"],["العربية","@AlArabiya"],["سكاي نيوز عربية","@skynewsarabia"],["بي بي سي عربي","@BBCNewsArabic"]]],
  ["ysSport",[["beIN SPORTS","@beINSPORTS"],["الأهلي","@AlAhlyTV"],["الدوري المصري","@EgyptianLeague"]]],
  ["ysFood",[["فتافيت","@Fatafeat"],["الشيف حسن","@ChefHassan"]]],["ysKids",[["سبيستون","@SpacetoonArabic"],["كراميش","@karameesh"]]],
  ["ysDocs",[["الجزيرة الوثائقية","@aljazeeradocumentary"],["ناشيونال جيوغرافيك أبوظبي","@NatGeoAbuDhabi"]]],["ysTech",[["الزيرو","@ElzeroWebSchool"],["تك بالعربي","@TechArabi"]]],
  ["ysRel",[["القرآن الكريم","@QuranTV"]]]];
function ytSuggDlg(){ dialog(L("ytSugg"),YT_SUGG.map(([k,list])=>({label:L(k),fn:()=>setTimeout(()=>dialog(L(k),list.map(([n,h])=>({icon:(S.ytCh||[]).some(c=>c.handle===h)?"✓":"＋",label:n,fn:()=>ytAddHandle(h,n,L(k).replace(/^\S+\s/,""))})),{grid:3}),30)})),{grid:3}) }
async function ytAddHandle(h,name,cat){ A.toast("⏳ "+name); try{ const r=await ytResolve(h); if(!r) return A.toast(L("ytAddFail")+": "+name);
  const chs=(S.ytCh||[]).filter(c=>c.id!==r.id); chs.push({id:r.id,name:r.name||name,cat,handle:h}); S.ytCh=chs; A.toast("✓ "+name+" "+L("ytAdded")); ytpAt=0; await ytpLoad(true); renderYtp() }catch(e){ A.toast(L("ytAddFail")+": "+name) } }
activators.unshift(el=>{
  if(el.id==="ytpSearch"){ if(ytpQ){ ytpQ=""; renderYtp().then(()=>ytpFocus("#ytpSearch")); return true } prompt2(L("ytSearchQ"),"",v=>{ ytpQ=(v||"").trim(); renderYtp().then(()=>ytpFocus("#ytpSearch")) }); return true }
  if(el.id==="ytpShorts"){ S.ytNoShorts=!S.ytNoShorts; renderYtp().then(()=>ytpFocus("#ytpShorts")); return true }
  if(el.id==="ytpSugg"){ ytSuggDlg(); return true }
  return false });
// (6) per-channel alerts: in the long-press menu; checked every 30 minutes (also while another app is open)
optionHandlers.unshift(el=>{ const d=el.dataset||{}; if(!d.ytch) return false; setTimeout(()=>{ const box=$("dbox"), items=box&&box._items, g=box&&box.querySelector(".mgrid,.dlist"); if(!items||!g) return;
    const chs=(S.ytCh||[]).slice(), c=chs.find(x=>x.id===d.ytch); if(!c) return;
    const hwEl=el.closest&&el.closest("[data-hw]"); if(hwEl) items.splice(items.length-1,0,{icon:"⚙️",label:L("hwSettings"),fn:()=>setTimeout(()=>hwMenu(hwEl.dataset.hw),30)});
    items.splice(1,0,{icon:c.bell?"🔕":"🔔",label:L(c.bell?"ytBellOff":"ytBell"),fn:()=>{ c.bell=!c.bell; S.ytCh=chs; A.toast(c.bell?"🔔 "+c.name:"🔕 "+c.name) }});
    g.innerHTML=items.map((it,k)=>`<button class="btn f${it.pri?" pri":""}" data-di="${k}">${it.icon?`<b>${esc(it.icon)}</b>`:""}${esc(it.label)}</button>`).join(""); focus(g.querySelector(".f")) },0); return false });
setInterval(async()=>{ /* ytBell */ const chs=(S.ytCh||[]).filter(c=>c.bell); if(!chs.length) return; const last=Object.assign({},S.ytBellLast||{}); let ch=false;
  for(const c of chs){ try{ const x=await A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+c.id), m=x.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/), t=(x.match(/<entry>[\s\S]*?<title>([^<]*)<\/title>/)||[])[1]||"";
    if(!m) continue; if(last[c.id]&&last[c.id]!==m[1]){ const msg=`▶️ ${L("ytBellNew")} ${c.name}`; if(window.__bg) nat("toast",msg+"\n"+t); else banner("▶️",msg,t,15000) } if(last[c.id]!==m[1]){ last[c.id]=m[1]; ch=true } }catch(e){} }
  if(ch) S.ytBellLast=last },30*60000);
// (3) home widget: latest 3 new videos from your channels
HW_TYPES.push(["ytnew","▶️","w_ytnew"]);
hwBody=(function(prev){ return function(w){ if(w.t!=="ytnew") return prev(w);
  if(!(S.ytCh||[]).length) return `<div class="hwico">▶️</div><div class="hwsub dim">${esc(L("ytNoCh"))}</div>`;
  if(!ytpVids.length){ if(!ytpAt||Date.now()-ytpAt>5*60000){ ytpAt=Date.now(); ytpLoad(true).then(()=>renderHW()); return `<div class="hwsub dim">${esc(L("ytLoading"))}</div>` } return `<div class="hwsub dim">${esc(L("ytNothingNew"))}</div>` }
  const n=w.sz>2?5:w.sz>1?3:2, l=ytVisible().filter(ytNew).slice(0,n), list=l.length?l:ytVisible().slice(0,n);
  return `<div class="ytw">${!l.length?`<div class="hwsub dim">${esc(L("ytNothingNew"))}</div>`:""}${list.map(v=>`<div class="ytprow f${ytNew(v)?" new":""}" tabindex="0" data-ytv="${esc(v.v)}" data-ytch="${esc(v.chId)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.v)}/mqdefault.jpg" alt=""><div><b>${esc(v.title)}</b><small>${esc(v.ch)} · ${esc(agoAr(Date.now()-v.at))}</small></div></div>`).join("")}</div>` } })(hwBody);
// the widget frame lets the remote land on each video
hwCard=(function(prev){ return function(w){ let h=prev(w); if(w.t==="ytnew"&&h.indexOf('class="ytprow f')>=0) h=h.replace(/^<div class="hw f /,'<div class="hw '); return h } })(hwCard);
setInterval(()=>{ if(hwHas("ytnew")&&document.querySelector("#home.on")) ytpLoad(false).then(()=>renderHW()) },20*60000);
