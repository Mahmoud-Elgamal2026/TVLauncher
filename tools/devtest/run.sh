#!/bin/bash
# Drives the real launcher on an Android 7.1 emulator: real D-pad key presses, screenshots, JS self-test, logcat.
set -x
OUT=devtest-out; mkdir -p $OUT/shots
PKG=com.mahmoud.tvlauncher
adb wait-for-device
adb shell settings put global window_animation_scale 0; adb shell settings put global transition_animation_scale 0; adb shell settings put global animator_duration_scale 0
adb install -r -g app-debug.apk || adb install -r app-debug.apk
adb shell pm grant $PKG android.permission.READ_EXTERNAL_STORAGE 2>/dev/null; adb shell pm grant $PKG android.permission.WRITE_EXTERNAL_STORAGE 2>/dev/null
adb shell dumpsys package com.google.android.webview | grep -m1 versionName > $OUT/webview.txt; adb shell dumpsys package com.android.webview | grep -m1 versionName >> $OUT/webview.txt
adb logcat -c
adb shell am start -n $PKG/.MainActivity
sleep 25
adb exec-out screencap -p > $OUT/shots/00-first-start.png
shot(){ adb exec-out screencap -p > $OUT/shots/$1.png; }
js(){ adb shell am start -n $PKG/.MainActivity --es js64 "$(printf '%s' "$1" | base64 -w0)" >/dev/null; sleep ${2:-2}; }
chk(){ js "(function(){var r=focused&&focused.getBoundingClientRect();var pg=document.querySelector('.page.on').id;var vis=!!r&&r.top>=0&&r.bottom<=innerHeight+1&&r.left>=-1&&r.right<=innerWidth+1;console.log('TVL|nav-$1|'+((pg==='$2'&&vis)?'PASS':'FAIL')+'|page='+pg+' visible='+vis+' on='+(focused&&(focused.dataset.page||focused.dataset.pkg||focused.id||focused.className)))})()" 1; }
key(){ for k in "$@"; do adb shell input keyevent $k; sleep 0.5; done; }
shot 00-boot
# real remote: walk the tabs, enter pages, move left/right/down
js "closeDialog();S.setupSeen=true;S.lite=true;S.perfChosen=true;S.favs=apps.slice(0,6).map(a=>a.pkg);S.recent=apps.slice(6,10).map(a=>a.pkg);applyLook();renderHome();showPage('home');focus(document.querySelector('.tab[data-page=home]'))" 3
shot 01-home-tab
key DPAD_DOWN; shot 02-home-down
key DPAD_RIGHT DPAD_RIGHT DPAD_LEFT; shot 03-home-right; chk 03 home
key DPAD_DOWN DPAD_DOWN DPAD_DOWN; shot 04-home-down3; chk 04 home
key DPAD_UP DPAD_UP DPAD_UP DPAD_UP DPAD_UP; shot 05-back-to-tabs; chk 05 home
key DPAD_LEFT; shot 06-tab-apps; chk 06 apps
key DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN; shot 07-apps-scroll; chk 07 apps
key DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT; shot 08-apps-right-edge; chk 08 apps
key BACK; sleep 1; shot 09-after-back
# every page
for p in tv vod files store settings; do js "showPage('$p');if('$p'==='settings')renderSettings();focus(document.querySelector('.tab[data-page=$p]'))" 2; key DPAD_DOWN; shot "10-page-$p"; done
js "showPage('settings');renderSettings();focus(document.querySelector('#setScroll .f'))" 2
key DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN DPAD_DOWN; shot 11-settings-scrolled; chk 11 settings
key DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT DPAD_RIGHT; shot 12-settings-right; chk 12 settings
# every theme on home (fast mode, like the box)
for t in $(cat themes.txt); do js "S.theme='$t';applyLook();renderHome();showPage('home');focus(document.querySelector('#favRow .app')||document.querySelector('.tab.on'))" 2; shot "20-theme-$t"; done
js "S.theme='apple';applyLook();renderHome()" 1
# dialogs
js "radioMenu()" 6; shot 30-radio-menu; key BACK
js "wallMenu()" 2; shot 31-wall-menu; key BACK
js "widgetMenu()" 2; shot 32-widgets; key BACK
js "setupWizard()" 2; shot 33-setup; key BACK
js "showPage('store');storeCat='code';renderStore()" 2; shot 34-store-code
# widget editor with the real remote: open, pick Favorites, smaller x2, move, arrows, key 1, OK
js "closeDialog();S.layouts={};S.theme='apple';applyLook();renderHome();showPage('settings');renderSettings();focus(document.getElementById('wEditBtn'))" 2
key DPAD_CENTER; sleep 1; shot 35-w-menu
js "focus([].slice.call(document.getElementById('dbox').querySelectorAll('[data-di]')).filter(function(b){return b.textContent.indexOf(L('w_fav'))>=0})[0])" 1
key DPAD_CENTER; sleep 1; shot 36-w-actions
js "focus([].slice.call(document.getElementById('dbox').querySelectorAll('[data-di]')).filter(function(b){return b.textContent.indexOf(L('wSmaller'))>=0})[0])" 1
key DPAD_CENTER DPAD_CENTER
js "focus([].slice.call(document.getElementById('dbox').querySelectorAll('[data-di]')).filter(function(b){return b.textContent.indexOf(L('wMove'))>=0})[0])" 1
key DPAD_CENTER; sleep 1; key DPAD_UP DPAD_UP DPAD_UP DPAD_LEFT DPAD_LEFT KEYCODE_1; shot 37-w-moving
key DPAD_CENTER; sleep 2; shot 38-w-after-ok
js "var l=lay().fav||{};console.log('TVL|widget-remote|'+((l.x!=null&&l.s&&l.s<1)?'PASS':'FAIL')+'|'+JSON.stringify(lay())+' moving='+!!moving)" 1
key BACK; sleep 1; js "showPage('home');renderHome()" 2; shot 39-w-home
js "var l=lay().fav||{};var r=document.getElementById('favRow').getBoundingClientRect();console.log('TVL|widget-applied|'+((l.x!=null&&document.getElementById('favRow').style.position==='fixed')?'PASS':'FAIL')+'|top='+(r.top|0)+' pos='+document.getElementById('favRow').style.position)" 1
js "S.layouts={};applyWidgets()" 1
# focus frame visible in every theme (real D-pad, fast mode)
for t in $(cat themes.txt); do js "S.lite=true;S.theme='$t';applyLook();renderHome();showPage('home');focus(document.querySelector('.tab[data-page=home]'))" 2; key DPAD_DOWN; shot "25-focus-$t"; done
# free channels pack from the empty IPTV page
js "S.lists=[];S.favCh=[];channels=[];renderGroups();showPage('tv');focus(document.querySelector('[data-freepack=eg]'))" 2; shot 43-iptv-empty
key DPAD_CENTER; sleep 25; shot 44-iptv-free-added
js "console.log('TVL|free-pack|'+(channels.length>0?'PASS':'FAIL')+'|'+channels.length+' channels')" 1
# close a real running app from inside the launcher
APP=$(adb shell pm list packages | grep -m1 -oE "com.android.tv.settings|com.android.settings|com.google.android.youtube.tv" | tr -d '\r')
js "launch('$APP')" 6
adb shell am start -n $PKG/.MainActivity >/dev/null; sleep 3
BEFORE=$(adb shell pidof $APP | tr -d '\r')
js "runningMenu()" 2; shot 45-running-apps
js "closeDialog();closeOne('$APP')" 3
AFTER=$(adb shell pidof $APP | tr -d '\r')
if [ -n "$BEFORE" ] && [ -z "$AFTER" ]; then R=PASS; else R=FAIL; fi
echo "TVL|close-app|$R|$APP pid before=$BEFORE after=$AFTER" >> $OUT/extra.txt
# full self-test (network, IPTV, recording, radio, files ...)
adb push selftest.built.js /sdcard/Download/selftest.js
js "var s=document.createElement('script');s.src='file:///sdcard/Download/selftest.js';s.onerror=function(){console.log('TVL|load-selftest|FAIL|script load error')};document.body.appendChild(s)" 5
for i in $(seq 1 60); do sleep 5; adb logcat -d -s chromium:I | grep -q "TVL|done|" && break; done
shot 40-after-selftest
js "showPage('tv');renderGroups&&renderGroups();focus(document.querySelector('#channels .f')||document.querySelector('#groups .f'))" 3; shot 41-iptv-channels
key DPAD_CENTER; sleep 12; shot 42-iptv-playing; key BACK; sleep 1
adb logcat -d -s chromium:* AndroidRuntime:E ActivityManager:W > $OUT/logcat.txt
grep -o 'TVL|[^"]*' $OUT/logcat.txt | sed 's/", source.*//' > $OUT/results.txt; cat $OUT/extra.txt >> $OUT/results.txt 2>/dev/null
grep -E 'Uncaught|FATAL|TypeError|ReferenceError|SyntaxError' $OUT/logcat.txt > $OUT/errors.txt
cat $OUT/results.txt; echo ERRORS; cat $OUT/errors.txt | head -40
true
