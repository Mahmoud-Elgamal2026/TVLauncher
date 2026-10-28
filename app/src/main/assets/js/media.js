var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
Object.assign(DEF, { bootPlay: false, shares: [], tgToken: "", tgChat: "", tgCode: "" });
const MT = {
  ar: {
    files: "ملفاتي",
    fInternal: "التخزين الداخلي",
    fUsb: "فلاشة",
    fNet: "أجهزة الشبكة",
    fScan: "دوّر على أجهزة الشبكة",
    fScanning: "بدوّر على الأجهزة اللي على الراوتر...",
    fNone: "مفيش أجهزة بتشارك ملفات. على الكمبيوتر: كليك يمين على الفولدر ← Properties ← Sharing ← Share",
    fAdd: "إضافة كمبيوتر",
    fHost: "عنوان الجهاز (IP أو الاسم)",
    fUser: "اسم المستخدم (فاضي = Guest)",
    fPass: "الباسورد",
    fRecs: "التسجيلات",
    fEmpty: "الفولدر فاضي",
    fDenied: "مش قادر أفتح الفولدر — اسمح بقراية الملفات",
    fAllow: "اسمح بقراية الملفات",
    fUp: "رجوع",
    fExt: "شغّل في مشغّل خارجي (VLC)",
    fPlay: "تشغيل",
    fDel: "حذف",
    fForget: "انسى الجهاز",
    fLoginErr: "مش قادر أدخل — راجع اسم المستخدم والباسورد",
    fPick: "افتح",
    rec: "تسجيل",
    recNow: "سجّل القناة دي",
    recFor: "سجّل لمدة",
    recUntil: "لحد ما أوقفه",
    recStarted: "بدأ التسجيل",
    recStop: "وقّف التسجيل",
    recNext: "سجّل البرنامج الجاي",
    recProg: "سجّل البرنامج ده",
    recSched: "اتحدد ميعاد التسجيل",
    recDir: "مكان حفظ التسجيلات",
    recActive: "تسجيلات شغالة",
    recUpcoming: "تسجيلات جاية",
    min: "دقيقة",
    sBoot: "تشغيل البوكس",
    bootPlay: "افتح آخر قناة أول ما البوكس يشتغل",
    bootResume: "بكمّل آخر قناة",
    sTg: "التحكم من تيليجرام",
    tgToken: "توكن البوت",
    tgHow: "١. افتح تيليجرام وكلّم @BotFather واكتب /newbot\n٢. انسخ التوكن اللي هيديهولك وحطه هنا\n٣. افتح البوت بتاعك واكتب كود الربط",
    tgCode: "كود الربط",
    tgLinked: "متربط مع",
    tgUnlink: "فك الربط",
    tgOff: "البوت مش شغال",
    tgOn: "البوت شغال"
  },
  en: {
    files: "My files",
    fInternal: "Internal storage",
    fUsb: "USB drive",
    fNet: "Network computers",
    fScan: "Find network computers",
    fScanning: "Looking for computers on your router...",
    fNone: "No computers are sharing files. On the PC: right-click a folder → Properties → Sharing → Share",
    fAdd: "Add computer",
    fHost: "Computer address (IP or name)",
    fUser: "Username (empty = Guest)",
    fPass: "Password",
    fRecs: "Recordings",
    fEmpty: "Folder is empty",
    fDenied: "Can't open this folder — allow file access",
    fAllow: "Allow file access",
    fUp: "Back",
    fExt: "Play in external player (VLC)",
    fPlay: "Play",
    fDel: "Delete",
    fForget: "Forget computer",
    fLoginErr: "Can't sign in — check username and password",
    fPick: "Open",
    rec: "Record",
    recNow: "Record this channel",
    recFor: "Record for",
    recUntil: "Until I stop it",
    recStarted: "Recording started",
    recStop: "Stop recording",
    recNext: "Record next show",
    recProg: "Record this show",
    recSched: "Recording scheduled",
    recDir: "Save recordings to",
    recActive: "Recording now",
    recUpcoming: "Upcoming recordings",
    min: "min",
    sBoot: "Start-up",
    bootPlay: "Open the last channel when the box turns on",
    bootResume: "Resuming last channel",
    sTg: "Telegram control",
    tgToken: "Bot token",
    tgHow: "1. In Telegram, message @BotFather and send /newbot\n2. Paste the token it gives you here\n3. Open your bot and send the pairing code",
    tgCode: "Pairing code",
    tgLinked: "Linked with",
    tgUnlink: "Unlink",
    tgOff: "Bot is off",
    tgOn: "Bot is running"
  }
};
MT.ar.xPhone = "📱 ربط الهاتف";
MT.en.xPhone = "📱 Phone link";
MT.ar.xRadio = "📻 الإذاعة";
MT.en.xRadio = "📻 Radio";
MT.ar.xAll = "كل التطبيقات ←";
MT.en.xAll = "All apps →";
MT.ar.xSrc = "المصادر";
MT.en.xSrc = "Sources";
MT.ar.noSrc = "الجهاز ده مفيهوش مداخل HDMI";
MT.en.noSrc = "This box has no HDMI inputs";
Object.keys(MT).forEach((l) => Object.assign(T[l], MT[l]));
const VIDEO = /\.(mp4|m4v|mkv|webm|ts|m2ts|avi|mov|wmv|flv|mpg|mpeg|3gp)$/i, AUDIO = /\.(mp3|m4a|aac|flac|wav|ogg|opus)$/i, IMAGE = /\.(jpe?g|png|webp|gif|bmp)$/i;
const fmtSize = (b) => b > 1073741824 ? (b / 1073741824).toFixed(1) + " GB" : b > 1048576 ? (b / 1048576).toFixed(0) + " MB" : b > 1024 ? (b / 1024).toFixed(0) + " KB" : b ? b + " B" : "";
let fSrc = null, fPath = "", fItems = [], fNetHosts = [];
function fRoots() {
  const out = [];
  let roots = [];
  try {
    roots = JSON.parse(nat("storageRoots") || "[]");
  } catch (e) {
  }
  roots.forEach((r) => out.push({ icon: r.label === "usb" ? "💾" : "📱", name: r.label === "usb" ? L("fUsb") + " · " + r.name : L("fInternal"), path: r.path }));
  let rs = {};
  try {
    rs = JSON.parse(nat("recState") || "{}");
  } catch (e) {
  }
  if (rs.dir) out.push({ icon: "⏺", name: L("fRecs"), path: rs.dir, rec: 1 });
  S.shares.forEach((s) => out.push({ icon: "🖥", name: s.name || s.host, path: "smb://" + s.host + "/", share: s }));
  return out;
}
function renderFiles() {
  const roots = fRoots();
  $("filesSrc").innerHTML = roots.map((r, i) => `<div class="it f${fSrc === r.path ? " sel" : ""}" tabindex="0" data-froot="${i}">${r.icon} ${esc(r.name)}</div>`).join("") + `<div class="it f" tabindex="0" id="fScan">🔎 ${L("fScan")}</div><div class="it f" tabindex="0" id="fAdd">➕ ${L("fAdd")}</div>`;
  $("filesSrc")._roots = roots;
  if (!fSrc && roots[0]) openDir(roots[0].path, roots[0].path);
}
function openDir(path, root) {
  return __async(this, null, function* () {
    fSrc = root || fSrc;
    fPath = path;
    const box = $("filesMain");
    box.innerHTML = `<div class="empty">⏳</div>`;
    if (path.startsWith("smb://")) {
      const s = S.shares.find((x) => path.toLowerCase().startsWith(("smb://" + x.host + "/").toLowerCase()));
      if (s) nat("smbLogin", s.host, s.user || "", s.pass || "", s.domain || "");
    }
    try {
      fItems = JSON.parse(yield natAsync("listDir", path));
    } catch (e) {
      const smb = path.startsWith("smb://");
      box.innerHTML = `<div class="empty">⚠️ ${esc(smb ? L("fLoginErr") : L("fDenied"))}</div>${smb ? "" : `<button class="btn pri f" id="fAllow">🔓 ${L("fAllow")}</button>`}`;
      markFiles();
      return;
    }
    fItems.sort((a, b) => b.dir - a.dir || a.name.localeCompare(b.name));
    const up = path !== fSrc ? `<div class="it f" tabindex="0" id="fUp">⬆️ ${L("fUp")} <span class="fpath" dir="ltr">${esc(path)}</span></div>` : `<div class="fpath" dir="ltr">${esc(path)}</div>`;
    box.innerHTML = up + (fItems.length ? fItems.map((f, i) => `<div class="it f fitem" tabindex="0" data-fi="${i}"><span>${f.dir ? "📁" : VIDEO.test(f.name) ? "🎬" : AUDIO.test(f.name) ? "🎵" : IMAGE.test(f.name) ? "🖼" : /\.apk$/i.test(f.name) ? "📦" : "📄"}</span><span class="fn">${esc(f.name)}</span><span class="fs">${f.dir ? "" : fmtSize(f.size)}</span></div>`).join("") : `<div class="empty">${L("fEmpty")}</div>`);
    renderFilesSrcSel();
    markFiles();
    const first = box.querySelector(".fitem") || box.querySelector(".f");
    if (first && focused && focused.closest && focused.closest("#filesMain")) focus(first);
  });
}
function renderFilesSrcSel() {
  document.querySelectorAll("#filesSrc [data-froot]").forEach((e) => {
    const r = $("filesSrc")._roots[+e.dataset.froot];
    e.classList.toggle("sel", !!r && r.path === fSrc);
  });
}
function markFiles() {
}
function parentOf(p) {
  const smb = p.startsWith("smb://");
  const t = p.replace(/\/+$/, "");
  const i = t.lastIndexOf("/");
  const par = t.slice(0, i + 1);
  return smb ? par : par.replace(/\/$/, "") || "/";
}
function fileUrl(f) {
  return nat("mediaUrl", f.path) || "file://" + f.path;
}
function openFile(f) {
  if (f.dir) return openDir(f.path);
  if (VIDEO.test(f.name) || AUDIO.test(f.name)) return play({ name: f.name.replace(/\.[^.]+$/, ""), url: fileUrl(f), kind: "file", logo: "" });
  if (IMAGE.test(f.name)) return showImage(fileUrl(f));
  if (/\.apk$/i.test(f.name)) {
    if (!f.path.startsWith("smb://")) return installFrom(f.name, fileUrl(f));
  }
  A.playExternal(fileUrl(f));
}
function showImage(u) {
  dialog("🖼", [{ label: L("done"), fn: () => {
  } }], { html: `<img src="${esc(u)}" style="max-width:80vw;max-height:72vh;display:block;margin:0 auto 1.4vh;border-radius:1vh" alt=""><div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>` });
}
function fileMenu(f) {
  const items = [{ icon: "▶️", label: f.dir ? L("fPick") : L("fPlay"), pri: 1, fn: () => openFile(f) }];
  if (!f.dir) items.push({ icon: "↗", label: L("fExt"), fn: () => A.playExternal(fileUrl(f)) });
  const rs = JSON.parse(nat("recState") || "{}");
  if (!f.dir && rs.dir && f.path.indexOf(rs.dir) === 0) items.push({ icon: "🗑", label: L("fDel"), fn: () => {
    nat("deleteFile", f.path);
    openDir(fPath);
  } });
  items.push({ label: L("cancel"), fn: () => {
  } });
  dialog(f.name, items, { grid: items.length > 3 ? 3 : 0 });
}
function netScan() {
  return __async(this, null, function* () {
    dialog("🔎 " + L("fNet"), [{ label: L("cancel"), fn: () => {
    } }], { sub: L("fScanning") });
    let hosts = [];
    try {
      hosts = JSON.parse(yield natAsync("smbScan"));
    } catch (e) {
    }
    fNetHosts = hosts;
    if (!on("dlg")) return;
    if (!hosts.length) {
      dialog("🔎 " + L("fNet"), [{ icon: "➕", label: L("fAdd"), fn: () => setTimeout(() => addShare(""), 30) }, { label: L("done"), pri: 1, fn: () => {
      } }], { sub: L("fNone") });
      return;
    }
    dialog("🔎 " + L("fNet"), hosts.map((h) => ({ icon: "🖥", label: h.name + (h.name !== h.host ? " · " + h.host : ""), fn: () => setTimeout(() => addShare(h.host, h.name), 30) })).concat([{ label: L("cancel"), fn: () => {
    } }]));
  });
}
function addShare(host, name) {
  const html = `<input class="inp f" id="shHost" dir="ltr" placeholder="${esc(L("fHost"))}" value="${esc(host || "")}"><input class="inp f" id="shUser" dir="ltr" placeholder="${esc(L("fUser"))}" style="margin-top:1vh"><input class="inp f" id="shPass" dir="ltr" type="password" placeholder="${esc(L("fPass"))}" style="margin-top:1vh">
    <div class="dlist" style="margin-top:1.4vh"><button class="btn pri f" data-di="0">${L("save")}</button><button class="btn f" data-di="1">${L("cancel")}</button></div>`;
  dialog("🖥 " + L("fAdd"), [{ label: L("save"), fn: () => {
    const h = ($("shHost").value || "").trim().replace(/^smb:\/\//, "").replace(/\/.*$/, "");
    if (!h) return;
    const s = { host: h, name: name && name !== h ? name.split(".")[0] : h, user: ($("shUser").value || "").trim(), pass: $("shPass").value || "" };
    S.shares = S.shares.filter((x) => x.host !== h).concat([s]);
    fSrc = null;
    showPage("files");
    renderFiles();
    openDir("smb://" + h + "/", "smb://" + h + "/");
  } }, { label: L("cancel"), fn: () => {
  } }], { html });
}
pageHooks["files:enter"] = () => {
  fSrc = null;
  renderFiles();
};
activators.push((el) => {
  if (el.dataset.froot !== void 0) {
    const r = $("filesSrc")._roots[+el.dataset.froot];
    if (r) openDir(r.path, r.path);
    return true;
  }
  if (el.dataset.fi !== void 0) {
    const f = fItems[+el.dataset.fi];
    if (f) openFile(f);
    return true;
  }
  switch (el.id) {
    case "fUp":
      openDir(parentOf(fPath));
      return true;
    case "fScan":
      netScan();
      return true;
    case "fAdd":
      addShare("");
      return true;
    case "fAllow":
      nat("askStorageAccess");
      setTimeout(() => openDir(fPath), 4e3);
      return true;
  }
  return false;
});
optionHandlers.push((el) => {
  if (el.dataset.fi !== void 0) {
    const f = fItems[+el.dataset.fi];
    if (f) fileMenu(f);
    return true;
  }
  if (el.dataset.froot !== void 0) {
    const r = $("filesSrc")._roots[+el.dataset.froot];
    if (r && r.share) {
      dialog(r.name, [{ icon: "🗑", label: L("fForget"), fn: () => {
        S.shares = S.shares.filter((x) => x.host !== r.share.host);
        fSrc = null;
        renderFiles();
      } }, { label: L("cancel"), pri: 1, fn: () => {
      } }]);
      return true;
    }
  }
  return false;
});
const isRecordable = (c) => c && !c.kind && /^https?:/.test(c.url || "");
function recMenu(c) {
  if (!isRecordable(c)) return;
  const items = [30, 60, 90, 120, 180].map((m) => ({ label: `${m} ${L("min")}`, fn: () => recStart(c, m) }));
  items.push({ icon: "⏺", label: L("recUntil"), fn: () => recStart(c, 600) });
  const nn = window.nowNext ? nowNext(c) : [];
  if (nn[0]) items.unshift({ icon: "📺", label: `${L("recProg")}: ${nn[0][2]}`, pri: 1, fn: () => recStart(c, Math.max(5, Math.ceil((nn[0][1] - Date.now()) / 6e4) + 2)) });
  if (nn[1]) items.splice(1, 0, { icon: "⏭", label: `${L("recNext")}: ${nn[1][2]} · ${fmtTime(new Date(nn[1][0]))}`, fn: () => {
    nat("recAt", c.url, c.name + " - " + nn[1][2], nn[1][0], nn[1][1]);
    banner("⏰", L("recSched"), nn[1][2]);
  } });
  dialog("⏺ " + L("recNow") + " · " + c.name, items, { grid: 3 });
}
function recStart(c, m) {
  nat("recStart", c.url, c.name, m);
  banner("⏺", L("recStarted"), `${c.name} · ${m >= 600 ? L("recUntil") : m + " " + L("min")}`);
  setTimeout(updateTicker, 1500);
}
function recActive() {
  try {
    return JSON.parse(nat("recState") || "{}").active || [];
  } catch (e) {
    return [];
  }
}
function recStopMenu() {
  const a = recActive();
  if (!a.length) return;
  dialog("⏺ " + L("recActive"), a.map((r) => ({ icon: "⏹", label: `${L("recStop")}: ${r.name} · ${fmtSize(r.bytes)}`, fn: () => {
    nat("recStop", r.id);
    setTimeout(updateTicker, 1500);
  } })).concat([{ label: L("cancel"), pri: 1, fn: () => {
  } }]));
}
tickers.push(() => {
  const a = recActive();
  const el = $("tSleep");
  if (a.length && el && el.textContent.indexOf("⏺") < 0) el.textContent = (el.textContent ? el.textContent + "  ·  " : "") + "⏺ " + a.map((r) => r.name).join(", ");
});
setInterval(() => {
  if (recActive().length) updateTicker();
}, 3e4);
const _playerMenu = playerMenu;
playerMenu = function() {
  _playerMenu();
  const c = playing;
  if (!isRecordable(c)) return;
  const box = $("dbox"), items = box._items;
  const g = box.querySelector(".mgrid,.dlist");
  if (!g) return;
  items.push({ icon: "⏺", label: L("rec"), fn: () => setTimeout(() => recMenu(c), 30) });
  if (recActive().length) items.push({ icon: "⏹", label: L("recStop"), fn: () => setTimeout(recStopMenu, 30) });
  g.insertAdjacentHTML("beforeend", items.slice(-(recActive().length ? 2 : 1)).map((it, k) => `<button class="btn f" data-di="${items.length - (recActive().length ? 2 : 1) + k}"><b>${esc(it.icon)}</b>${esc(it.label)}</button>`).join(""));
};
const _chMenu = chMenu;
chMenu = function(url) {
  _chMenu(url);
  const c = chByUrl(url);
  if (!isRecordable(c)) return;
  const box = $("dbox"), items = box._items, g = box.querySelector(".mgrid,.dlist");
  if (!g) return;
  items.splice(items.length - 1, 0, { label: "⏺ " + L("rec"), fn: () => setTimeout(() => recMenu(c), 30) });
  g.innerHTML = items.map((it, i) => `<button class="btn f${it.pri ? " pri" : ""}" data-di="${i}">${it.icon ? `<b>${esc(it.icon)}</b>` : ""}${esc(it.label)}</button>`).join("");
  focus(g.querySelector(".f"));
};
function bootResume() {
  if (!S.bootPlay || !S.lastCh || !S.lastCh.url || !nat("bootFresh")) return;
  setTimeout(() => {
    if (on("player")) return;
    banner("📺", L("bootResume"), S.lastCh.name, 4e3);
    const c = window.chByUrl && chByUrl(S.lastCh.url);
    c ? playUrl(c.url) : play(Object.assign({}, S.lastCh));
  }, 6e3);
}
let tgReady = false;
function tgInit() {
  if (!NA) return;
  if (!S.tgCode) S.tgCode = String(1e5 + Math.floor(Math.random() * 9e5));
  nat("tgStart", S.tgToken || "");
  tgReady = !!S.tgToken;
}
const TGT = {
  ar: { hi: "أهلاً! البوكس متربط بيك دلوقتي ✅", pair: "اكتب كود الربط اللي ظاهر في الإعدادات ← التحكم من تيليجرام", no: "مش مسموحلك تتحكم في الجهاز ده", ok: "تمام ✅", nf: "ملقتش", playing: "شغال دلوقتي", idle: "مفيش حاجة شغالة", page: "الصفحة", recs: "تسجيلات شغالة", none: "مفيش", help: "الأوامر:\nقناة <اسم أو رقم>\nالجاية / اللي قبلها\nصوت+ / صوت-\nافتح <اسم تطبيق>\nسجّل <دقايق>\nرسالة <نص> (تظهر على الشاشة)\nنوم <دقايق>\nوقّف · رئيسية · رجوع\nأو استخدم الزراير تحت 👇" },
  en: { hi: "Hi! This box is now linked to you ✅", pair: "Send the pairing code shown in Settings → Telegram control", no: "You're not allowed to control this box", ok: "Done ✅", nf: "Not found", playing: "Now playing", idle: "Nothing playing", page: "Page", recs: "Recording", none: "none", help: "Commands:\nch <name or number>\nnext / prev\nvol+ / vol-\nopen <app name>\nrec <minutes>\nmsg <text> (shows on screen)\nsleep <minutes>\nstop · home · back\nor use the buttons below 👇" }
};
const tgt = (k) => (TGT[S.lang] || TGT.en)[k];
const TG_KB = () => JSON.stringify([
  [["⬆️", "k:up"]],
  [["⬅️", "k:left"], ["🆗", "k:ok"], ["➡️", "k:right"]],
  [["⬇️", "k:down"]],
  [["🔙", "k:back"], ["🏠", "k:home"], ["⏹", "stop"]],
  [["🔉", "vol-"], ["🔊", "vol+"], ["⏮", "prev"], ["⏭", "next"]],
  [["📺 " + (S.lang === "ar" ? "الحالة" : "Status"), "status"], ["⏺ 60", "rec 60"], ["😴 30", "sleep 30"]]
]);
function tgSend(chat, text, kb) {
  nat("tgSend", chat, text, kb ? TG_KB() : "");
}
window.onTg = (chat, from, text) => {
  text = String(text || "").trim();
  if (!S.tgChat) {
    if (text.replace(/\D/g, "") === S.tgCode) {
      S.tgChat = chat;
      tgSend(chat, tgt("hi") + "\n\n" + tgt("help"), 1);
      banner("✈️", "Telegram", from);
      if ($("settings").classList.contains("on")) renderSettings();
    } else tgSend(chat, tgt("pair"));
    return;
  }
  if (chat !== S.tgChat) {
    tgSend(chat, tgt("no"));
    return;
  }
  let reply;
  try {
    reply = tgCmd(text);
  } catch (e) {
    reply = "⚠️ " + (e.message || e);
  }
  if (reply) tgSend(chat, reply, /^\/?(start|help|مساعدة)$/i.test(text));
};
function tgCmd(t) {
  const m = t.match(/^\/?(\S+)\s*(.*)$/) || [], cmd = (m[1] || "").toLowerCase(), arg = (m[2] || "").trim();
  const is = (...k) => k.includes(cmd);
  if (is("start", "help", "مساعدة", "اوامر", "الأوامر")) return tgt("help");
  if (cmd.indexOf("k:") === 0) {
    pressKey(cmd.slice(2));
    return "";
  }
  if (is("status", "الحالة", "حالة")) {
    const st = remoteState(), a = recActive();
    return `${st.playing ? "📺 " + tgt("playing") + ": " + st.playing.name : "💤 " + tgt("idle")}
📄 ${tgt("page")}: ${st.page || "-"}
⏺ ${tgt("recs")}: ${a.length ? a.map((r) => r.name).join(", ") : tgt("none")}`;
  }
  if (is("ch", "قناة", "قناه", "channel")) {
    if (!arg) return tgt("nf");
    const n = +arg, c = isFinite(n) && n > 0 ? channels.find((x) => +x.no === n) || channels[n - 1] : channels.find((x) => x.name.toLowerCase() === arg.toLowerCase()) || channels.find((x) => x.name.toLowerCase().indexOf(arg.toLowerCase()) >= 0);
    if (!c) return tgt("nf");
    if (on("frame")) stopFrame();
    playUrl(c.url);
    return "📺 " + c.name;
  }
  if (is("next", "الجاية", "الجايه", "+")) {
    if (on("player")) zap(1);
    return tgt("ok");
  }
  if (is("prev", "اللي", "السابقة", "-")) {
    if (on("player")) zap(-1);
    return tgt("ok");
  }
  if (is("vol+", "صوت+")) {
    A.volume("up");
    A.volume("up");
    return "🔊";
  }
  if (is("vol-", "صوت-")) {
    A.volume("down");
    A.volume("down");
    return "🔉";
  }
  if (is("stop", "وقف", "وقّف")) {
    if (on("player")) stopPlayer();
    return tgt("ok");
  }
  if (is("home", "رئيسية", "الرئيسية")) {
    pressKey("home");
    return tgt("ok");
  }
  if (is("back", "رجوع")) {
    pressKey("back");
    return "";
  }
  if (is("open", "افتح")) {
    const q = arg.toLowerCase();
    const a = apps.find((x) => appName(x).toLowerCase() === q) || apps.find((x) => appName(x).toLowerCase().indexOf(q) >= 0);
    if (!a) return tgt("nf");
    if (on("player")) stopPlayer();
    launch(a.pkg);
    return "📱 " + appName(a);
  }
  if (is("apps", "التطبيقات")) return visibleApps().map((a) => "• " + appName(a)).join("\n");
  if (is("rec", "سجل", "سجّل")) {
    const c = playing && isRecordable(playing) ? playing : S.lastCh;
    if (!c) return tgt("nf");
    const mins = Math.min(600, Math.max(1, parseInt(arg) || 60));
    recStart(c, mins);
    return `⏺ ${c.name} · ${mins} ${L("min")}`;
  }
  if (is("msg", "رسالة", "رساله")) {
    banner("✉️", S.lang === "ar" ? "رسالة" : "Message", arg, 15e3);
    return tgt("ok");
  }
  if (is("sleep", "نوم")) {
    setSleep(Math.max(0, parseInt(arg) || 0));
    return tgt("ok");
  }
  return tgt("help");
}
window.mediaSettings = function() {
  const linked = !!S.tgChat;
  if (!S.tgCode) S.tgCode = String(1e5 + Math.floor(Math.random() * 9e5));
  return sec(L("sBoot"), field(L("bootPlay"), onoff("bootPlay"))) + sec(
    "✈️ " + L("sTg"),
    field(L("tgToken"), inputRow("tgTokInp", S.tgToken, "123456:ABC-DEF...", "tgTokSave")) + field("", `<pre class="code" dir="auto" style="white-space:pre-wrap">${esc(L("tgHow"))}</pre>`) + (S.tgToken ? field("", `<div class="inline">${linked ? `<span class="btn sm">✅ ${L("tgLinked")}</span><button class="btn f" id="tgUnlink">${L("tgUnlink")}</button>` : `<span class="btn sm">${L("tgCode")}: <b style="font-size:2.6vh" dir="ltr">${esc(S.tgCode)}</b></span>`}</div>`) : "")
  ) + sec("⏺ " + L("rec"), field(L("recDir"), recDirSeg()));
};
function recDirSeg() {
  let st = {};
  try {
    st = JSON.parse(nat("recState") || "{}");
  } catch (e) {
  }
  const ds = st.dirs || [];
  if (!ds.length) return `<span class="btn sm" dir="ltr">${esc(st.dir || "-")}</span>`;
  return `<div class="inline">${ds.map((d, i) => `<button class="btn f${st.dir === d.path ? " pri" : ""}" data-recdir="${i}">${esc(d.label === "Internal" ? L("fInternal") : d.label === "Movies" ? "Movies" : L("fUsb") + " " + d.label.replace(/\D/g, ""))}</button>`).join("")}</div>`;
}
AFTER.bootPlay = () => nat("setBootPlay", !!S.bootPlay);
activators.push((el) => {
  if (el.dataset.recdir !== void 0) {
    const st = JSON.parse(nat("recState") || "{}"), d = (st.dirs || [])[+el.dataset.recdir];
    if (d) {
      nat("recSetDir", d.path);
      renderSettings();
    }
    return true;
  }
  switch (el.id) {
    case "tgTokSave":
      S.tgToken = ($("tgTokInp").value || "").trim();
      S.tgChat = "";
      tgInit();
      renderSettings();
      A.toast(L("saved"));
      return true;
    case "tgUnlink":
      S.tgChat = "";
      S.tgCode = "";
      tgInit();
      renderSettings();
      return true;
  }
  return false;
});
setTimeout(() => {
  nat("setBootPlay", !!S.bootPlay);
  tgInit();
  bootResume();
}, 1500);
const SRC_PKGS = ["com.droidlogic.tvsource", "com.android.tv", "com.mediatek.wwtv.tvcenter", "com.google.android.tv", "com.android.tv.settings"];
function runXtab(a) {
  if (a === "wifi") A.openSettings("android.settings.WIFI_SETTINGS");
  else if (a === "phone") {
    if (window.phoneDialog) phoneDialog();
  } else if (a === "lang") {
    S.lang = S.lang === "ar" ? "en" : "ar";
    applyLang();
    renderHome();
    if (window.renderGroups) renderGroups();
  } else if (a === "radio") {
    if (window.radioMenu) radioMenu();
  }
}
window.runXtab = runXtab;
activators.push((el) => {
  if (el.id === "xAllApps") {
    showPage("apps");
    focus(document.querySelector("#appGrid .f") || document.querySelector(".tab.on"));
    return true;
  }
  if (el.id === "xSources") {
    const p = SRC_PKGS.find((x) => A.isInstalled(x));
    if (p) launch(p);
    else A.toast(L("noSrc"));
    return true;
  }
  return false;
});
const FREE_PACKS = [
  ["world", "🌍", { ar: "قنوات عالمية مختارة (Free-TV)", en: "World picks (Free-TV)" }, "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8"],
  ["eg", "🇪🇬", { ar: "مصر", en: "Egypt" }, "countries/eg.m3u"],
  ["ara", "🕌", { ar: "كل القنوات العربية", en: "All Arabic" }, "languages/ara.m3u"],
  ["sa", "🇸🇦", { ar: "السعودية", en: "Saudi Arabia" }, "countries/sa.m3u"],
  ["ae", "🇦🇪", { ar: "الإمارات", en: "UAE" }, "countries/ae.m3u"],
  ["news", "📰", { ar: "أخبار عالمية", en: "World news" }, "categories/news.m3u"],
  ["sports", "⚽", { ar: "رياضة", en: "Sports" }, "categories/sports.m3u"],
  ["movies", "🎬", { ar: "أفلام", en: "Movies" }, "categories/movies.m3u"],
  ["series", "📺", { ar: "مسلسلات", en: "Series" }, "categories/series.m3u"],
  ["docu", "🌋", { ar: "وثائقي", en: "Documentary" }, "categories/documentary.m3u"],
  ["music", "🎵", { ar: "موسيقى", en: "Music" }, "categories/music.m3u"],
  ["kids", "🧸", { ar: "أطفال", en: "Kids" }, "categories/kids.m3u"],
  ["rel", "📿", { ar: "قنوات دينية", en: "Religious" }, "categories/religious.m3u"],
  ["en", "🇬🇧", { ar: "قنوات إنجليزي", en: "English" }, "languages/eng.m3u"]
];
const packUrl = (p) => /^https?:/.test(p[3]) ? p[3] : "https://iptv-org.github.io/iptv/" + p[3];
MT.ar.freeTitle = "مفيش اشتراك IPTV؟ ضيف قنوات مجانية بضغطة";
MT.en.freeTitle = "No IPTV subscription? Add free channels in one press";
MT.ar.listsBtn = "القوائم والدول";
MT.en.listsBtn = "Lists & countries";
MT.ar.packOnly = "اعرض دي بس";
MT.en.packOnly = "Show only this";
MT.ar.freePacks = "قنوات مجانية جاهزة";
MT.en.freePacks = "Ready-made free channels";
MT.ar.freeNote = "قنوات مجانية متاحة للعامة من مشروع iptv-org — مش كلها شغالة طول الوقت، واللانشر بيعلّم على الواقفة";
MT.en.freeNote = "Free public channels from the iptv-org project — not all are always up; the launcher marks dead ones";
MT.ar.freeAdded = "اتضافت";
MT.en.freeAdded = "Added";
MT.ar.ownList = "أو ضيف اشتراكك من الإعدادات";
MT.en.ownList = "or add your own subscription in Settings";
Object.keys(MT).forEach((l) => Object.assign(T[l], MT[l]));
function freePackHtml() {
  return `<div class="freebox"><div class="sec"><h3>📺 ${esc(L("freeTitle"))}</h3><div class="inline">${FREE_PACKS.map((p) => {
    const on2 = S.lists.some((l) => l.url === packUrl(p));
    return `<button class="btn f${on2 ? " pri" : ""}" data-freepack="${p[0]}">${p[1]} ${esc(p[2][S.lang] || p[2].en)}${on2 ? " ✓" : ""}</button>`;
  }).join("")}</div><div class="sub" style="margin-top:1.2vh">${esc(L("freeNote"))}</div>
  <div class="inline" style="margin-top:1.2vh"><button class="btn f" id="ownList">⚙️ ${esc(L("ownList"))}</button></div></div></div>`;
}
const _renderGroupsF = renderGroups;
renderGroups = function() {
  _renderGroupsF.apply(this, arguments);
  if (!channels.length && !S.favCh.length) {
    $("channels").innerHTML = freePackHtml();
  }
};
activators.push((el) => {
  if (el.dataset.freepack) {
    const p = FREE_PACKS.find((x) => x[0] === el.dataset.freepack);
    if (!p) return true;
    const url = packUrl(p);
    if (S.lists.some((x) => x.url === url)) {
      S.lists = S.lists.filter((x) => x.url !== url);
      banner("📺", "−", p[2][S.lang] || p[2].en, 2e3);
      loadLists().then(() => {
        renderGroups();
        if ($("settings").classList.contains("on")) renderSettings();
      });
      return true;
    }
    const l = S.lists;
    if (!l.some((x) => x.url === url)) {
      l.push({ name: p[1] + " " + (p[2][S.lang] || p[2].en), url });
      S.lists = l;
    }
    banner("📺", L("freeAdded"), p[2][S.lang] || p[2].en, 2500);
    loadLists().then(() => {
      if (window.loadEpg) loadEpg();
      renderGroups();
      if (window.runCheck) runCheck(true);
    });
    return true;
  }
  if (el.id === "ownList") {
    showPage("settings");
    renderSettings();
    return true;
  }
  return false;
});
function updVodTab() {
  const t = document.querySelector('.tab[data-page="vod"]');
  if (!t) return;
  const has = typeof vodCats !== "undefined" && vodCats.length || S.watch.some((w) => w.kind) || S.lists.some((l) => l.type === "xtream");
  t.style.display = has ? "" : "none";
  if (!has && document.querySelector("#vod.on")) showPage("home");
}
setInterval(updVodTab, 4e3);
setTimeout(updVodTab, 1500);
MT.ar.runApps = "التطبيقات المفتوحة";
MT.en.runApps = "Open apps";
MT.ar.closeApp = "اقفل التطبيق";
MT.en.closeApp = "Close app";
MT.ar.closeAll = "اقفل الكل";
MT.en.closeAll = "Close all";
MT.ar.closed = "اتقفل";
MT.en.closed = "Closed";
MT.ar.noRun = "مفيش تطبيقات مفتوحة";
MT.en.noRun = "No open apps";
Object.keys(MT).forEach((l) => Object.assign(T[l], MT[l]));
let openedApps = [];
const _launchC = launch;
launch = function(pkg) {
  openedApps = [pkg].concat(openedApps.filter((p) => p !== pkg)).slice(0, 20);
  return _launchC.apply(this, arguments);
};
function closeOne(pkg) {
  return __async(this, null, function* () {
    if (typeof shz === "function" && shz() === "ok") {
      try {
        yield runShell("am force-stop " + pkg);
      } catch (e) {
        nat("closeApp", pkg);
      }
    } else nat("closeApp", pkg);
    openedApps = openedApps.filter((p) => p !== pkg);
  });
}
function runningMenu() {
  const list = openedApps.map(byPkg).filter(Boolean);
  if (!list.length) {
    A.toast(L("noRun"));
    return;
  }
  const items = list.map((a) => ({ icon: "✖", label: appName(a), keep: 1, fn: () => __async(this, null, function* () {
    yield closeOne(a.pkg);
    banner("✖", L("closed"), appName(a), 1800);
    setTimeout(() => {
      closeDialog();
      if (openedApps.length) runningMenu();
    }, 30);
  }) }));
  items.push({ icon: "🧹", label: L("closeAll") + " (" + list.length + ")", pri: 1, fn: () => __async(this, null, function* () {
    const n = list.length;
    for (const a of list) yield closeOne(a.pkg);
    if (window.cleanRam) nat("cleanRam");
    banner("🧹", L("closeAll"), n + " " + L("closed"), 2500);
  }) });
  dialog("📋 " + L("runApps"), items, { grid: 3 });
}
window.runningMenu = runningMenu;
if (typeof ACTIONS === "function") {
  const _AR = ACTIONS;
  ACTIONS = () => [["📋", L("runApps"), runningMenu]].concat(_AR());
}
const _appMenuC = appMenu;
appMenu = function(pkg) {
  _appMenuC.apply(this, arguments);
  if (pkg === void 0) return;
  const box = $("dbox"), items = box._items, g = box.querySelector(".mgrid,.dlist");
  if (!g) return;
  items.splice(1, 0, { label: "✖ " + L("closeApp"), fn: () => __async(this, null, function* () {
    yield closeOne(pkg);
    banner("✖", L("closed"), appName(byPkg(pkg) || { name: pkg }), 1800);
  }) });
  g.innerHTML = items.map((it, i) => `<button class="btn f${it.pri ? " pri" : ""}" data-di="${i}">${it.icon ? `<b>${esc(it.icon)}</b>` : ""}${esc(it.label)}</button>`).join("");
  focus(g.querySelector(".f"));
};
const _tgCmdC = tgCmd;
tgCmd = function(t) {
  const m = String(t).match(/^\/?(اقفل|close)\s*(.*)$/i);
  if (!m) return _tgCmdC.apply(this, arguments);
  const q = m[2].trim().toLowerCase();
  if (!q || /^(الكل|all)$/.test(q)) {
    const n = openedApps.length;
    openedApps.slice().forEach((p) => closeOne(p));
    return "🧹 " + n;
  }
  const a = apps.find((x) => appName(x).toLowerCase().indexOf(q) >= 0);
  if (!a) return tgt("nf");
  closeOne(a.pkg);
  return "✖ " + appName(a);
};
const _mediaSettingsF = window.mediaSettings;
window.mediaSettings = function() {
  return sec("📺 " + L("freePacks"), freePackHtml().replace(/<\/?div class="freebox">/g, "").replace(/<div class="sec"><h3>[^<]*<\/h3>/, "<div>")) + _mediaSettingsF();
};
function packsMenu() {
  const items = FREE_PACKS.map((p) => {
    const url = packUrl(p), on2 = S.lists.some((l) => l.url === url), nm = p[2][S.lang] || p[2].en;
    return { icon: on2 ? "✅" : p[1], label: nm, pri: on2, fn: () => {
      const l = S.lists;
      S.lists = on2 ? l.filter((x) => x.url !== url) : l.concat([{ name: p[1] + " " + nm, url }]);
      afterPacks(on2 ? "−" : "+", nm);
    } };
  });
  const own = S.lists.filter((l) => !FREE_PACKS.some((p) => packUrl(p) === l.url));
  if (own.length) own.forEach((l) => items.unshift({ icon: "⭐", label: l.name || "IPTV", pri: 1, fn: () => setTimeout(() => {
    showPage("settings");
    renderSettings();
  }, 30) }));
  items.push({ icon: "⚙️", label: L("ownList"), fn: () => {
    showPage("settings");
    renderSettings();
  } });
  dialog("📦 " + L("listsBtn"), items, { grid: 3, sub: L("freeNote") });
}
function afterPacks(sign, nm) {
  banner("📺", sign + " " + nm, "...", 2500);
  curGroup = "__all";
  loadLists().then(() => {
    if (window.loadEpg) loadEpg();
    renderGroups();
    if (window.runCheck) runCheck(true);
  });
}
const _renderGroupsP = renderGroups;
renderGroups = function() {
  _renderGroupsP.apply(this, arguments);
  if (isKids()) return;
  const g = $("groups");
  if (g && channels.length) g.insertAdjacentHTML("afterbegin", `<div class="it f packbtn" tabindex="0" id="packsBtn">📦 ${esc(L("listsBtn"))}</div>`);
};
activators.push((el) => {
  if (el.id === "packsBtn") {
    packsMenu();
    return true;
  }
  return false;
});
window.packsMenu = packsMenu;
DEF.deadHidden = [];
MT.ar.rmDead = "احذف القنوات الواقفة";
MT.en.rmDead = "Remove dead channels";
MT.ar.rmDeadDone = "اتشالت";
MT.en.rmDeadDone = "Removed";
MT.ar.restoreDead = "رجّع القنوات اللي اتشالت";
MT.en.restoreDead = "Bring back removed channels";
Object.keys(MT).forEach((l) => Object.assign(T[l], MT[l]));
const deadNow = () => channels.filter((c) => S.chStatus[c.url] === 0);
const _renderGroupsD = renderGroups;
renderGroups = function() {
  _renderGroupsD.apply(this, arguments);
  if (isKids()) return;
  const d = deadNow().length, g = $("groups"), cb = $("checkBtn");
  if (!g || !cb) return;
  if (d) cb.insertAdjacentHTML("afterend", `<div class="it f" tabindex="0" id="rmDeadBtn">🧹 ${esc(L("rmDead"))} (${d})</div>`);
  if ((S.deadHidden || []).length) g.insertAdjacentHTML("beforeend", `<div class="it f" tabindex="0" id="restoreDeadBtn">♻️ ${esc(L("restoreDead"))} (${S.deadHidden.length})</div>`);
};
activators.push((el) => {
  if (el.id === "rmDeadBtn") {
    const d = deadNow().map((c) => c.url);
    S.deadHidden = (S.deadHidden || []).concat(d.filter((u) => (S.deadHidden || []).indexOf(u) < 0));
    channels = channels.filter((c) => d.indexOf(c.url) < 0);
    channels.forEach((c, i) => c.no = i + 1);
    curGroup = "__all";
    renderGroups();
    banner("🧹", L("rmDeadDone"), d.length + "", 2500);
    focus(document.querySelector("#groups .f"));
    return true;
  }
  if (el.id === "restoreDeadBtn") {
    const n = S.deadHidden.length;
    S.deadHidden = [];
    S.chStatus = {};
    banner("♻️", L("restoreDead"), n + "", 2500);
    loadLists().then(() => renderGroups());
    return true;
  }
  return false;
});
