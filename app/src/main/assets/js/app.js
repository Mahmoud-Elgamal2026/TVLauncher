/* compat.js */
window.__bg=!1,window.onBg=function(i){window.__bg=!!i},function(){const i=window.setInterval,a=/adhan|alarms|goalWatch|crashBuf|matchAlerts|schedOn|autoSleep|isRamadan|autoUpdate|bedLock|ping|tgBackup|frameMin/;window.setInterval=function(d,s){if(typeof d!="function")return i.apply(window,arguments);const f=a.test(String(d));return i.call(window,function(){if(!(window.__bg&&!f))return d.apply(this,arguments)},s)}}(),function(){"use strict";var i=window,a=document;Object.entries||(Object.entries=function(t){return Object.keys(t).map(function(e){return[e,t[e]]})}),Object.values||(Object.values=function(t){return Object.keys(t).map(function(e){return t[e]})}),Object.fromEntries||(Object.fromEntries=function(t){var e={};return Array.from(t).forEach(function(r){e[r[0]]=r[1]}),e}),String.prototype.padStart||(String.prototype.padStart=function(t,e){var r=String(this);for(e=e===void 0?" ":String(e);r.length<t;)r=e+r;return r.slice(r.length-Math.max(t,String(this).length))}),String.prototype.padEnd||(String.prototype.padEnd=function(t,e){var r=String(this);for(e=e===void 0?" ":String(e);r.length<t;)r+=e;return r.slice(0,Math.max(t,String(this).length))}),i.Promise&&!Promise.allSettled&&(Promise.allSettled=function(t){return Promise.all(Array.from(t).map(function(e){return Promise.resolve(e).then(function(r){return{status:"fulfilled",value:r}},function(r){return{status:"rejected",reason:r}})}))}),i.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),Element.prototype.closest||(Element.prototype.closest=function(t){for(var e=this;e&&e.nodeType===1;){if(e.matches(t))return e;e=e.parentElement}return null}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.webkitMatchesSelector);var d=navigator.userAgent.match(/Chrome\/(\d+)/);i.__chromeVer=d?+d[1]:0;try{var s=a.createElement("div");s.style.cssText="display:flex;flex-direction:column;row-gap:1px;position:absolute;visibility:hidden",s.appendChild(a.createElement("div")),s.appendChild(a.createElement("div")),a.documentElement.appendChild(s),s.scrollHeight!==1&&(a.documentElement.className+=" nofg"),s.parentNode.removeChild(s)}catch(t){}try{i.CSS&&CSS.supports&&(CSS.supports("backdrop-filter","blur(1px)")||CSS.supports("-webkit-backdrop-filter","blur(1px)"))||(a.documentElement.className+=" nobf")}catch(t){a.documentElement.className+=" nobf"}try{var f=a.createElement("div");f.style.display="grid",f.style.display!=="grid"&&(a.documentElement.className+=" nogrid")}catch(t){}var S=i.CSS&&CSS.supports&&CSS.supports("aspect-ratio","1 / 1");if(!S){a.documentElement.className+=" noar";var l=[[".app.match",16/7],["#apps .app",1/.9],[".app",16/9.6],[".chgrid .it",16/10],[".pv",16/9],[".poster",2/3],["#dPoster",2/3],[".fgrid",1.6],[".ep img",16/9],[".ep .epn",16/9],[".sico",1]],g=!1,E=function(){for(var t=[],e=a.querySelectorAll(".page.on,#dlg,#frame,#dock,#allAppsW"),r=0;r<e.length;r++)t.push(e[r]);return t},y=function(t){for(var e=[],r=E(),n=0;n<r.length;n++)for(var o=r[n].querySelectorAll(t),p=0;p<o.length;p++)e.push(o[p]);return e},x=function(){g=!1;for(var t=0;t<l.length;t++)for(var e=y(l[t][0]),r=0;r<e.length;r++){var n=e[r];if(!n.__ar){var o=n.offsetWidth;o&&n.__w!==o+"/"+l[t][1]&&(n.__w=o+"/"+l[t][1],n.style.height=o/l[t][1]+"px")}}for(var p=y(".app.match"),h=0;h<p.length;h++)p[h].style.height=p[h].offsetWidth/(16/7)+"px";for(var w=[["#home .row[data-wshape=square] .app",1],["#home .row[data-wshape=circle] .app",1],["#home .row[data-wshape=icon] .app",1],["#home .row[data-wshape=poster] .app",2/3],["body[data-lay=poster][data-page=home] #favRow .app",2/3],["body[data-lay=grid][data-page=home] #favRow .app",16/9.6],["body[data-lay=bar][data-page=home] #favRow .app",16/9.6]],m=0;m<w.length;m++)for(var v=y(w[m][0]),u=0;u<v.length;u++)v[u].offsetWidth&&(v[u].style.height=v[u].offsetWidth/w[m][1]+"px");var b=a.querySelector("body[data-lay=xbox][data-page=home] #favRow .app:first-child");b&&(b.style.height="")},c=function(){g||(g=!0,setTimeout(x,30))};i.__fixAspect=c,a.addEventListener("DOMContentLoaded",function(){new MutationObserver(function(t){for(var e=0;e<t.length;e++){var r=t[e].target;if(!(r&&r.closest&&r.closest("#hwBoard,#banners,#ticker,#fwBox,#ramCard,#shelf,.hwb"))){for(var n=t[e].addedNodes,o=0;o<n.length;o++)if(n[o].nodeType===1&&n[o].tagName!=="IMG"&&n[o].tagName!=="SPAN"&&n[o].tagName!=="B"){c();return}}}}).observe(a.body,{childList:!0,subtree:!0}),new MutationObserver(c).observe(a.body,{attributes:!0,attributeFilter:["data-theme","data-size","data-page","data-lay","data-wshape","data-wsize","data-wview"]}),i.addEventListener("resize",c),c()})}}();

;
/* lib-qrcode.js */
//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

var qrcode = function() {

  //---------------------------------------------------------------------
  // qrcode
  //---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function(typeNumber, errorCorrectionLevel) {

    var PAD0 = 0xEC;
    var PAD1 = 0x11;

    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];

    var _this = {};

    var makeImpl = function(test, maskPattern) {

      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);

      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);

      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }

      mapData(_dataCache, maskPattern);
    };

    var setupPositionProbePattern = function(row, col) {

      for (var r = -1; r <= 7; r += 1) {

        if (row + r <= -1 || _moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c += 1) {

          if (col + c <= -1 || _moduleCount <= col + c) continue;

          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };

    var getBestMaskPattern = function() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i += 1) {

        makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(_this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    };

    var setupTimingPattern = function() {

      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };

    var setupPositionAdjustPattern = function() {

      var pos = QRUtil.getPatternPosition(_typeNumber);

      for (var i = 0; i < pos.length; i += 1) {

        for (var j = 0; j < pos.length; j += 1) {

          var row = pos[i];
          var col = pos[j];

          if (_modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r += 1) {

            for (var c = -2; c <= 2; c += 1) {

              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };

    var setupTypeNumber = function(test) {

      var bits = QRUtil.getBCHTypeNumber(_typeNumber);

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };

    var setupTypeInfo = function(test, maskPattern) {

      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test);
    };

    var mapData = function(data, maskPattern) {

      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);

      for (var col = _moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col -= 1;

        while (true) {

          for (var c = 0; c < 2; c += 1) {

            if (_modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }

              var mask = maskFunc(row, col - c);

              if (mask) {
                dark = !dark;
              }

              _modules[row][col - c] = dark;
              bitIndex -= 1;

              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };

    var createBytes = function(buffer, rsBlocks) {

      var offset = 0;

      var maxDcCount = 0;
      var maxEcCount = 0;

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r += 1) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }

      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }

      var data = new Array(totalCodeCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }

      return data;
    };

    var createData = function(typeNumber, errorCorrectionLevel, dataList) {

      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

      var buffer = qrBitBuffer();

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }

      // calc num max data.
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }

      // padding
      while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }

      return createBytes(buffer, rsBlocks);
    };

    _this.addData = function(data, mode) {

      mode = mode || 'Byte';

      var newData = null;

      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }

      _dataList.push(newData);
      _dataCache = null;
    };

    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };

    _this.getModuleCount = function() {
      return _moduleCount;
    };

    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();

          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        _typeNumber = typeNumber;
      }

      makeImpl(false, getBestMaskPattern() );
    };

    _this.createTableTag = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var qrHtml = '';

      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';

      for (var r = 0; r < _this.getModuleCount(); r += 1) {

        qrHtml += '<tr>';

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }

        qrHtml += '</tr>';
      }

      qrHtml += '</tbody>';
      qrHtml += '</table>';

      return qrHtml;
    };

    _this.createSvgTag = function(cellSize, margin, alt, title) {

      var opts = {};
      if (typeof arguments[0] == 'object') {
        // Called by options.
        opts = arguments[0];
        // overwrite cellSize and margin.
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      // Compose alt property surrogate
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

      // Compose title property surrogate
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';

      return qrSvg;
    };

    _this.createDataURL = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };

    _this.createImgTag = function(cellSize, margin, alt) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;

      var img = '';
      img += '<img';
      img += '\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\u0020width="';
      img += size;
      img += '"';
      img += '\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';

      return img;
    };

    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };

    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r1, r2, p;

      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };

      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };

      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }

          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }

        ascii += '\n';
      }

      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;

      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }

      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r, p;

      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');

      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          line += p ? white : black;
        }

        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\n';
        }
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
      }
    }

    return _this;
  };

  //---------------------------------------------------------------------
  // qrcode.stringToBytes
  //---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function(unicodeData, numChars) {

    // create conversion map.

    var unicodeMap = function() {

      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };

      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }

      return unicodeMap;
    }();

    var unknownChar = '?'.charCodeAt(0);

    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              // 1byte
              bytes.push(b);
            } else {
              // 2bytes
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = function() {

    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    var _this = {};

    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {

      switch (maskPattern) {

      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 27) {

        // 10 - 26

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 41) {

        // 27 - 40

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }

      } else {
        throw 'type:' + type;
      }
    };

    _this.getLostPoint = function(qrcode) {

      var moduleCount = qrcode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {

          var sameCount = 0;
          var dark = qrcode.isDark(row, col);

          for (var r = -1; r <= 1; r += 1) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c += 1) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = function() {

    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }

    var _this = {};

    _this.glog = function(n) {

      if (n < 1) {
        throw 'glog(' + n + ')';
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {

    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }

    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();

    var _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {

      var num = new Array(_this.getLength() + e.getLength() - 1);

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {

      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  var QRRSBlock = function() {

    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    var _this = {};

    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }

      var length = rsBlock.length / 3;

      var list = [];

      for (var i = 0; i < length; i += 1) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }

      return list;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  var qrBitBuffer = function() {

    var _buffer = [];
    var _length = 0;

    var _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {

      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  var qrNumber = function(data) {

    var _mode = QRMode.MODE_NUMBER;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var data = _data;

      var i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };

    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };

    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  var qrAlphaNum = function(data) {

    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var s = _data;

      var i = 0;

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };

    var getCode = function(c) {

      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  var qr8BitByte = function(data) {

    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  var qrKanji = function(data) {

    var _mode = QRMode.MODE_KANJI;
    var _data = data;

    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      // self test for sjis support.
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\u53cb', 0x9746);

    var _bytes = stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };

    _this.write = function(buffer) {

      var data = _bytes;

      var i = 0;

      while (i + 1 < data.length) {

        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }

        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

        buffer.put(c, 13);

        i += 2;
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };

    return _this;
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  var byteArrayOutputStream = function() {

    var _bytes = [];

    var _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  var base64EncodeOutputStream = function() {

    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';

    var _this = {};

    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };

    var encode = function(n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };

    _this.writeByte = function(n) {

      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };

    _this.flush = function() {

      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64DecodeInputStream
  //---------------------------------------------------------------------

  var base64DecodeInputStream = function(str) {

    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;

    var _this = {};

    _this.read = function() {

      while (_buflen < 8) {

        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }

        var c = _str.charAt(_pos);
        _pos += 1;

        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\s$/) ) {
          // ignore if whitespace.
          continue;
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }

      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };

    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  var gifImage = function(width, height) {

    var _width = width;
    var _height = height;
    var _data = new Array(width * height);

    var _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {

      //---------------------------------
      // GIF Signature

      out.writeString('GIF87a');

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      var offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(';');
    };

    var bitOutputStream = function(out) {

      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;

      var _this = {};

      _this.write = function(data, length) {

        if ( (data >>> length) != 0) {
          throw 'length over';
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    var getLZWRaster = function(lzwMinCodeSize) {

      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      var table = lzwTable();

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );

      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      var dataIndex = 0;

      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {

        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c) ) {

          s = s + c;

        } else {

          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {

            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    var lzwTable = function() {

      var _map = {};
      var _size = 0;

      var _this = {};

      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };

      return _this;
    };

    return _this;
  };

  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }

    var b = byteArrayOutputStream();
    gif.write(b);

    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    return 'data:image/gif;base64,' + base64;
  };

  //---------------------------------------------------------------------
  // returns qrcode function.

  return qrcode;
}();

// multibyte support
!function() {

  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  }
}(function () {
    return qrcode;
}));

;
/* i18n.js */
"use strict";const T={ar:{home:"الرئيسية",apps:"كل التطبيقات",tv:"قنوات IPTV",settings:"الإعدادات",favorites:"المفضلة",favChannels:"قنوات مفضلة",quick:"اختصارات",recent:"آخر استخدام",continueW:"كمّل المشاهدة",matchesToday:"ماتشات النهارده",noFav:"اضغط مطوّلاً على OK فوق أي تطبيق وأضفه للمفضلة",language:"اللغة",theme:"الثيم / الشكل",size:"حجم الكروت",small:"صغير",medium:"متوسط",large:"كبير",wallpaper:"خلفية الرئيسية",wDynamic:"حسب التطبيق",wDaily:"تتغيّر كل يوم",wPick:"صورة من الجهاز",wUrl:"أو رابط صورة من النت",save:"حفظ",load:"تحميل",add:"إضافة",remove:"حذف",playlists:"قوائم القنوات (M3U)",listName:"اسم القائمة",listUrl:"http://.../playlist.m3u",epg:"رابط دليل البرامج EPG (XMLTV) — اختياري",playerMode:"مشغّل القنوات",builtin:"المشغّل الداخلي",external:"مشغّل خارجي (VLC...)",hour:"شكل الساعة",perf:"الأداء",perfFull:"كامل (مؤثرات)",perfLite:"خفيف (للأجهزة الضعيفة)",system:"إعدادات الجهاز",hint:"OK فتح · ضغطة مطوّلة = خيارات · رجوع للخلف",addFav:"إضافة للمفضلة",remFav:"إزالة من المفضلة",info:"معلومات التطبيق",moveL:"تقديم في الترتيب",moveR:"تأخير في الترتيب",hide:"إخفاء التطبيق",unhide:"إظهار التطبيق",lock:"قفل بالرقم السري",unlock:"إلغاء القفل",open:"فتح",cancel:"إلغاء",done:"تم",all:"كل القنوات",favs:"المفضلة",lastWatched:"آخر مشاهدة",countries:"الدول",groupsH:"المجموعات",noList:"ضيف قائمة M3U من الإعدادات",loading:"جاري التحميل...",loadErr:"فشل التحميل",notInst:"التطبيق مش متسطب",saved:"تم الحفظ",playErr:"القناة مش شغالة",search:"🔍 ابحث عن قناة",searchAll:"ابحث في التطبيقات والقنوات والإعدادات...",noRes:"مفيش نتايج",days:["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],months:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],am:"ص",pm:"م",sLook:"الشكل",sFrame:"وضع البرواز (شاشة الحيطة)",frameAfter:"يشتغل بعد",off:"مقفول",preview:"معاينة",frameStyle:"الشكل",fsGallery:"صورة كاملة",fsArt:"برواز على الحيطة",fsClock:"ساعة كبيرة",frameSrc:"الصور",srcMine:"صوري",srcOnline:"لوحات من النت",srcGrad:"ألوان هادية",addPhotos:"إضافة صور من الجهاز",myPhotos:"صوري المحفوظة",noPhotos:"لسه مفيش صور",frameEvery:"تغيير الصورة كل",frameWidgets:"يظهر على البرواز",wClock:"الساعة",wWeather:"الطقس",wPrayer:"الصلاة",wMatch:"الماتشات",sApps:"التطبيقات",hiddenApps:"التطبيقات المخفية",hideHidden:"إخفاء المخفي من القائمة",showHidden:"عرض المخفي باهت",sTv:"القنوات",sWeather:"الموقع (للطقس والصلاة)",city:"المدينة",sSecurity:"القفل والأمان",pinSet:"تعيين / تغيير الرقم السري",pinOff:"إلغاء الرقم السري",lockSetNo:"الإعدادات مفتوحة",lockSetYes:"قفل الإعدادات",pinOn:"الرقم السري مفعّل",pinNone:"مفيش رقم سري",enterPin:"اكتب الرقم السري",newPin:"اكتب رقم سري جديد (4 أرقام)",confirmPin:"اكتبه تاني للتأكيد",wrongPin:"رقم غلط",pinMismatch:"الرقمين مش زي بعض",needPin:"لازم تعيّن رقم سري الأول",sBackup:"نسخ احتياطي وصيانة",bkExport:"حفظ نسخة احتياطية",bkImport:"استرجاع نسخة",clearCache:"مسح كاش اللانشر",bkDone:"تم حفظ النسخة",bkLoaded:"تم الاسترجاع",bkBad:"الملف مش سليم",cacheDone:"تم مسح الكاش",qTitle:"إعدادات سريعة",wifi:"واي فاي",bt:"بلوتوث",sound:"الصوت",display:"الشاشة",storage:"التخزين",appsSet:"التطبيقات",dateSet:"التاريخ والوقت",allSet:"كل الإعدادات",volUp:"علّي الصوت",volDown:"وطّي الصوت",mute:"كتم",noHidden:"مفيش تطبيقات مخفية",favCh:"قناة مفضلة",remFavCh:"إزالة من القنوات المفضلة",addFavCh:"إضافة للقنوات المفضلة",lockGroup:"قفل المجموعة",unlockGroup:"فتح المجموعة",now:"الآن",next:"التالي",free:"متاح",netNone:"مفيش نت",lastCh:"آخر قناة",frameNow:"وضع البرواز",sleepT:"مؤقت النوم",sleepSet:"الشاشة هتقفل بعد",sleepOff:"اتلغى مؤقت النوم",sleepEnd:"خلص مؤقت النوم",min:"د",hr:"س",addWatch:"إضافة لـ «كمّل المشاهدة»",remWatch:"إزالة من «كمّل المشاهدة»",resumed:"كمّلت من",customize:"تخصيص الشكل",rename:"تغيير الاسم",color:"اللون",image:"الصورة",imgDevice:"صورة من الجهاز",imgUrl:"رابط صورة",reset:"رجوع للأصل",newName:"الاسم الجديد",checkCh:"فحص القنوات",checking:"جاري فحص القنوات",checkDone:"خلص الفحص",working:"شغالة",dead:"واقعة",hideDead:"إخفاء القنوات الواقعة",showDead:"إظهارها",autoCheck:"فحص تلقائي أسبوعي",preview2:"معاينة القناة",on:"شغّال",rcvHint:"OK تشغيل · ضغطة مطوّلة = مفضلة · أرقام الريموت للقناة",chList:"قائمة القنوات",sPrayer:"مواقيت الصلاة والأذان",prayerOn:"إظهار مواقيت الصلاة",method:"طريقة الحساب",mEgypt:"الهيئة المصرية",mMakkah:"أم القرى",mMWL:"رابطة العالم الإسلامي",mKarachi:"كراتشي",asr:"العصر",asrStd:"شافعي",asrHanafi:"حنفي",adhanOn:"تنبيه وقت الأذان",adhanSound:"صوت الأذان",adhanChime:"نغمة هادية",adhanUrlPh:"رابط ملف صوت أذان mp3 (اختياري)",beforeAlert:"تنبيه قبلها بـ",prayers:["الفجر","الشروق","الظهر","العصر","المغرب","العشاء"],after:"بعد",adhanNow:"حان الآن موعد أذان",adhanSoon:"باقي على أذان",sSports:"الماتشات",sportsOn:"إظهار الماتشات",leagues:"الدوريات",favTeams:"فرقك المفضلة (للتنبيه)",favTeamsPh:"مثال: الأهلي, الزمالك, Real Madrid",kickSoon:"الماتش هيبدأ بعد",kickNow:"الماتش بدأ",live:"مباشر",ft:"انتهت",sportsNote:"البيانات من TheSportsDB المجاني: لحد 3 ماتشات لكل دوري في اليوم",sNotif:"الإشعارات",notifSys:"إظهار إشعارات التطبيقات",grant:"منح الإذن",granted:"الإذن متاح",notGranted:"الإذن مش متاح",tickerShow:"إظهار الشريط العلوي (صلاة / ماتش)",sKeys:"زراير الريموت",addKey:"تعيين زرار جديد",pressKey:"اضغط الزرار اللي عاوز تعيّنه",keyFor:"الزرار ده يعمل إيه؟",noKeys:"مفيش زراير متعيّنة",aApp:"يفتح تطبيق",aTv:"قنوات IPTV",aLast:"آخر قناة",aSearch:"البحث",aFrame:"وضع البرواز",aSleep:"مؤقت النوم",aQuick:"إعدادات سريعة",aHome:"الرئيسية",aProfile:"تبديل البروفايل",chooseApp:"اختار التطبيق",sProfiles:"البروفايلات (العيلة)",profiles:"البروفايلات",addProfile:"بروفايل جديد",profName:"اسم البروفايل",kids:"بروفايل أطفال",adult:"عادي",limit:"وقت الاستخدام في اليوم",noLimit:"مفتوح",allowedApps:"التطبيقات المسموحة",allowedGroups:"القنوات المسموحة",delProfile:"حذف البروفايل",editProfile:"تعديل",switchedTo:"تم التحويل لـ",timeUp:"خلص وقت الاستخدام النهارده",timeUpSub:"اكتب الرقم السري لزيادة نص ساعة",emoji:"الصورة الرمزية",voiceNA:"البحث الصوتي مش متاح",results:"النتايج",actions:"إجراءات",settingsS:"إعدادات",channelsS:"قنوات",appsS:"تطبيقات",watchS:"كمّل المشاهدة",phoneTitle:"التحكم من الموبايل",phoneStep1:"١. خلي الموبايل على نفس شبكة الواي فاي",phoneStep2:"٢. امسح الكود بالكاميرا، أو افتح:",phoneCode:"كود الربط",phoneNoNet:"البوكس مش متوصل بشبكة محلية",sPhone:"التحكم من الموبايل",showQr:"عرض كود QR",newCode:"كود جديد",sGuard:"تثبيت اللانشر كشاشة رئيسية",guardDesc:"خدمة مساعدة (Accessibility) بترجّعك للانشر لو البوكس فتح الشاشة الأصلية، وبتشغّل زراير الريموت المتعيّنة جوه أي تطبيق، وبتخلّي مؤقت النوم يطفّي الشاشة",guardOn:"الخدمة شغالة",guardEnable:"تفعيل الخدمة",guardHome:"الرجوع للانشر بدل الشاشة الأصلية",sUpdate:"التحديثات",updCurrent:"الإصدار الحالي",updAuto:"تلقائي",updManual:"يدوي",updCheck:"دوّر على تحديث",updNone:"عندك آخر إصدار",updNoRepo:"اكتب اسم المستودع على GitHub الأول",updDownloading:"جاري تحميل التحديث",updAvail:"تحديث جديد",updInstall:"تحميل وتثبيت",later:"بعدين",updHint:"من الإعدادات ← التحديثات",updPerm:"محتاج إذن تثبيت التطبيقات",updPermSub:"فعّل الإذن في الصفحة اللي اتفتحت، وبعدين اضغط تثبيت تاني",updReady:"التحميل خلص — هتفتح شاشة التثبيت",vodTab:"أفلام ومسلسلات",vodEmpty:"ضيف اشتراك Xtream أو قائمة فيها أفلام من الإعدادات",myList:"قائمتي",movies:"أفلام",series:"مسلسلات",movie:"فيلم",more:"المزيد",cast:"الأبطال",seasons:"مواسم",season:"موسم",episode:"حلقة",resumeAt:"كمّل من",fromStart:"من الأول",play:"تشغيل",inMyList:"في قائمتي",nextEp:"الحلقة الجاية",nextEpSub:"هتشتغل بعد 8 ثواني — رجوع للإلغاء",paused:"متوقف مؤقتاً",behindLive:"متأخر عن المباشر",resume:"كمّل",pause:"إيقاف مؤقت",goLive:"رجوع للمباشر",audioTrack:"لغة الصوت",subtitles:"الترجمة",aspect:"مقاس الصورة",aFit:"مناسب",aFill:"ملء الشاشة",aStretch:"مط",aZoom:"تكبير",speed:"السرعة",catchup:"البرامج اللي فاتت",noCatchup:"مفيش برامج متسجلة للقناة دي",listType:"نوع القائمة",xtServer:"السيرفر http://host:port",xtUser:"اسم المستخدم",xtPass:"الباسورد",addXtream:"إضافة Xtream",addM3u:"إضافة M3U",folders:"الفولدرات",folderEmpty:"الفولدر فاضي",newFolder:"فولدر جديد",folderName:"اسم الفولدر",addFolder:"إضافة لفولدر",delFolder:"حذف الفولدر",iftar:"الإفطار",imsak:"الإمساك",iftarNow:"حان موعد الإفطار",ramadanKareem:"رمضان كريم",imsakiya:"إمساكية رمضان",hDay:"اليوم",needCity:"اكتب المدينة في الإعدادات الأول",quranRadio:"إذاعات القرآن",w4k:"خلفيات 4K",stCode:"تسطيب بالكود",setup:"تجهيز الجهاز",sysExpert:"وضع الخبير",sysExpertOn:"أنا فاهم، شغّله",sysExpertWarn:"وضع الخبير بيسمحلك تشيل أي تطبيق نظام، حتى المهمين. اللانشر بيحمي بس الحاجات اللي من غيرها البوكس مش هيقوم (واجهة النظام، متصفح النظام، Shizuku، واللانشر ده). أي تطبيق تشيله تقدر ترجّعه من «اللي اتشالت» — بس لو شلت حاجة البوكس محتاجها ممكن يحصل مشاكل لحد ما ترجّعها.",removeAll:"شيل كل تطبيقات النظام",removeAllWarn:"هيتشال كل تطبيق نظام ما عدا الأساسيين ولانشر احتياطي واحد. ممكن الواي فاي أو البلوتوث أو الكيبورد أو إعدادات الجهاز تقف. كل حاجة تترجّع من «اللي اتشالت». متأكد؟",setupSub:"خطوات مرة واحدة عشان اللانشر يشتغل صح",suHome:"اللانشر هو الشاشة الرئيسية",suHomeBtn:"خليه الرئيسي",suHomeHint:"اختار TV Launcher وبعدين «دايمًا»",suGuard:"خدمة تثبيت الشاشة الرئيسية",suWv:"متصفح النظام",suWvBtn:"حدّثه من المتجر",suBackup:"نسخة احتياطية من إعداداتك",suBackupBtn:"صدّر دلوقتي",suStock:"لانشر الجهاز الأصلي محمي — مش هيتشال من «تطبيقات النظام» عشان ترجعله لو احتجت",suTest:"اختبار شامل",suTestBtn:"ابدأ الاختبار",suTesting:"بختبر...",tNet:"الإنترنت",tLists:"قوايم القنوات",tChan:"تشغيل قناة",tEpg:"دليل البرامج",tRadio:"الإذاعة",tWeather:"الطقس",tMatches:"الماتشات",tWall:"خلفيات 4K",tCodes:"أكواد التسطيب",tUpd:"التحديثات",tSkip:"مش متظبط",ok:"تمام",later:"بعدين",dontShow:"ماتظهرش تاني",stCodeHint:"اكتب الكود (زي أكواد تطبيق Downloader) أو رابط مباشر",myCodes:"أكوادي",myCodesHint:"اعمل كود من عندك لأي رابط APK أو صفحة، وبعدين اكتبه فوق",codeNum:"الرقم",codeName:"الاسم",codeBad:"الكود أو الرابط مش صحيح",codeLooking:"بدوّر على الكود...",codeNotFound:"الكود مش موجود أو النت فاصل",wBing:"صور Bing اليومية",wBingAuto:"صورة Bing جديدة كل يوم",wNature:"طبيعة",wSpace:"فضاء",wCity:"مدن",wMount:"جبال",wSea:"بحر",wCars:"عربيات",wMinimal:"بسيطة",wMosque:"مساجد وعمارة إسلامية",retry:"إعادة المحاولة",stopRadio:"إيقاف الإذاعة",azkar:"الأذكار",forecast:"توقّعات الطقس",today:"النهارده",thisWeek:"الأسبوع ده",stats:"إحصائيات المشاهدة",bedtime:"وقت النوم",bedtimeSub:"اكتب الرقم السري لفتح نص ساعة",sHijri:"التاريخ الهجري ورمضان",hijriShow:"إظهار التاريخ الهجري",hijriAdj:"تعديل اليوم الهجري",ramadanMode:"وضع رمضان",auto:"تلقائي",frameExtra:"إضافات البرواز",store:"المتجر",browser:"المتصفح",stInstall:"تسطيب",stUpdate:"تحديث",stInstalled:"متسطب",stPlay:"صفحته في متجر جوجل",stWeb:"صفحة التحميل الرسمية",stRemove:"إزالة",stNoSrc:"مفيش مصدر متاح",stAll:"المختارة",stBrowser:"متصفحات ومانع إعلانات",stPlayer:"مشغّلات",stIptv:"مشغّلات IPTV",stStream:"أفلام وموسيقى",stSports:"رياضة (رسمي)",stTools:"أدوات",stTools2:"أدوات الجهاز",stSystem:"تطبيقات النظام",stRam:"الرامات والسرعة",stLink:"تسطيب من رابط",stLinkHint:"حط رابط مباشر لملف APK",stCustom:"كتالوج خاص بيك",stCustomHint:"رابط ملف JSON فيه التطبيقات اللي عاوزها تظهر هنا",stCustomFmt:"شكل الملف:",szNone:"Shizuku مش متسطب — محتاجه عشان تشيل تطبيقات النظام من غير روت",szStopped:"Shizuku متسطب بس مش شغال — شغّله مرة من التطبيق",szDenied:"Shizuku شغال — اسمح للانشر يستخدمه",szOk:"جاهز: تقدر تشيل وترجّع تطبيقات النظام",szStart:"افتح Shizuku",szAllowBtn:"اسمح",szHow:"إزاي أشغّله؟",szNeeded:"محتاج Shizuku شغال. أو نفّذ الأمر ده من الكمبيوتر:",szSteps:["سطّب Shizuku من المتجر هنا","على أندرويد 11 أو أحدث: الإعدادات ← تفضيلات الجهاز ← حول ← اضغط على رقم البناء 7 مرات ← خيارات المطوّر ← فعّل تصحيح الأخطاء اللاسلكي","افتح Shizuku واختار «البدء عبر التصحيح اللاسلكي» واتبع خطوة الإقران","على أندرويد 10 أو أقدم: وصّل البوكس بالكمبيوتر وشغّل الأمر اللي ظاهر في Shizuku مرة واحدة","ارجع هنا واضغط «اسمح» — بعد إعادة تشغيل البوكس ممكن تحتاج تشغّل Shizuku تاني"],sysOnly:"تطبيقات النظام",allApps:"كل التطبيقات",removedApps:"اللي اتشالت",removeSafe:"شيل كل الآمن",adbCmds:"أوامر الكمبيوتر (ADB)",adbHint:"فعّل تصحيح الأخطاء في البوكس، وشغّل دول من الكمبيوتر:",adbRestore:"لو حبيت ترجّع أي تطبيق:",tGreen:"آمن تشيله",tYellow:"بحذر — ممكن ميزة تقف",tRed:"ممنوع — الجهاز محتاجه",tRedMsg:"التطبيق ده أساسي للجهاز، ومسحه ممكن يوقّف البوكس أو الكيبورد أو الإعدادات",tYellowMsg:"مش متأكدين إن الجهاز مش محتاجه. لو حصلت مشكلة ترجّعه من «اللي اتشالت».",sRemoved:"متشال",sDisabled:"متعطّل",sDone:"تم",sRestore:"رجّعه",sRemove:"شيله",sRemoveAnyway:"شيله برضه",sDisable:"عطّله",sEnable:"شغّله",sStop:"إيقاف إجباري",ramUsed:"المستخدم",ramLow:"الذاكرة قليلة",ramClean:"تنظيف الرامات",ramDeep:"تنظيف عميق",animFast:"تسريع حركات الشاشة",ramTips:"نصايح: شيل التطبيقات اللي مش بتستخدمها من «تطبيقات النظام»، وشغّل وضع الأداء الخفيف لو البوكس رامه 1 أو 2 جيجا.",webview:"متصفح النظام (WebView)",webviewOld:"قديم — حدّث «Android System WebView» أو Chrome من المتجر عشان سرعة وشكل أحسن",stBoost:"تحسين بضغطة",stClean:"تنظيف التخزين",adsApps:"إعلانات وتتبع",removeAds:"شيل الإعلانات والتتبع",tAds:"إعلانات وتتبع (يتشال)",cInternal:"التخزين الداخلي",cShared:"الملفات",cScanBtn:"افحص التخزين",cScanning:"جاري الفحص...",cAllow:"اسمح بقراية الملفات",cAllCaches:"مسح كاش كل التطبيقات",cDeleteSel:"امسح المختار",cFound:"اتفحص",cFiles:"ملف",cTmp:"ملفات مؤقتة وكاش",cEmpty:"فولدرات فاضية",cApk:"ملفات APK متسطّبة وفاضلة",cBig:"ملفات كبيرة (أكتر من 100 ميجا)",cClean:"الجهاز نضيف!",bDesc:"بيقفل التطبيقات اللي شغالة في الخلفية، ويمسح كاش كل التطبيقات (مع Shizuku)، ويمسح الملفات المؤقتة والفولدرات الفاضية، وبيقولك وفّرت قد إيه. ملفات APK والملفات الكبيرة مش بيمسحها من غير ما تختار.",bGo:"ابدأ التحسين",bNeedShz:"محتاج Shizuku",bNeedAccess:"محتاج إذن قراية الملفات",bApkHint:"فيه ملفات APK قديمة ممكن تمسحها من «تنظيف التخزين»",bAdsHint:"فيه خدمات إعلانات وتتبع ممكن تشيلها من «تطبيقات النظام»",bResult:"اتوفّر"},en:{home:"Home",apps:"All apps",tv:"IPTV",settings:"Settings",favorites:"Favorites",favChannels:"Favorite channels",quick:"Shortcuts",recent:"Recent",continueW:"Continue watching",matchesToday:"Today's matches",noFav:"Long-press OK on any app to add it here",language:"Language",theme:"Theme",size:"Card size",small:"Small",medium:"Medium",large:"Large",wallpaper:"Home wallpaper",wDynamic:"Follow app",wDaily:"Changes daily",wPick:"Image from device",wUrl:"or an image URL",save:"Save",load:"Load",add:"Add",remove:"Remove",playlists:"Channel playlists (M3U)",listName:"List name",listUrl:"http://.../playlist.m3u",epg:"TV guide URL (XMLTV EPG) — optional",playerMode:"Channel player",builtin:"Built-in",external:"External (VLC...)",hour:"Clock format",perf:"Performance",perfFull:"Full (effects)",perfLite:"Lite (low-end boxes)",system:"Device settings",hint:"OK open · Long-press = options · Back",addFav:"Add to favorites",remFav:"Remove from favorites",info:"App info",moveL:"Move earlier",moveR:"Move later",hide:"Hide app",unhide:"Unhide app",lock:"Lock with PIN",unlock:"Remove lock",open:"Open",cancel:"Cancel",done:"Done",all:"All channels",favs:"Favorites",lastWatched:"Last watched",countries:"Countries",groupsH:"Groups",noList:"Add an M3U playlist in Settings",loading:"Loading...",loadErr:"Couldn't load",notInst:"App not installed",saved:"Saved",playErr:"Channel unavailable",search:"🔍 Search channels",searchAll:"Search apps, channels, settings...",noRes:"No results",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],am:"AM",pm:"PM",sLook:"Look",sFrame:"Frame mode (wall display)",frameAfter:"Starts after",off:"Off",preview:"Preview",frameStyle:"Style",fsGallery:"Full photo",fsArt:"Framed art",fsClock:"Big clock",frameSrc:"Pictures",srcMine:"My photos",srcOnline:"Online art",srcGrad:"Calm colors",addPhotos:"Add photos from device",myPhotos:"My saved photos",noPhotos:"No photos yet",frameEvery:"Change picture every",frameWidgets:"Show on frame",wClock:"Clock",wWeather:"Weather",wPrayer:"Prayer",wMatch:"Matches",sApps:"Apps",hiddenApps:"Hidden apps",hideHidden:"Hide them from lists",showHidden:"Show them faded",sTv:"Channels",sWeather:"Location (weather & prayer)",city:"City",sSecurity:"Lock & security",pinSet:"Set / change PIN",pinOff:"Remove PIN",lockSetNo:"Settings unlocked",lockSetYes:"Lock settings",pinOn:"PIN is on",pinNone:"No PIN set",enterPin:"Enter PIN",newPin:"Enter a new 4-digit PIN",confirmPin:"Enter it again",wrongPin:"Wrong PIN",pinMismatch:"PINs don't match",needPin:"Set a PIN first",sBackup:"Backup & maintenance",bkExport:"Save backup",bkImport:"Restore backup",clearCache:"Clear launcher cache",bkDone:"Backup saved",bkLoaded:"Restored",bkBad:"Invalid file",cacheDone:"Cache cleared",qTitle:"Quick settings",wifi:"Wi-Fi",bt:"Bluetooth",sound:"Sound",display:"Display",storage:"Storage",appsSet:"Apps",dateSet:"Date & time",allSet:"All settings",volUp:"Volume up",volDown:"Volume down",mute:"Mute",noHidden:"No hidden apps",favCh:"Favorite channel",remFavCh:"Remove from favorite channels",addFavCh:"Add to favorite channels",lockGroup:"Lock group",unlockGroup:"Unlock group",now:"Now",next:"Next",free:"free",netNone:"Offline",lastCh:"Last channel",frameNow:"Frame mode",sleepT:"Sleep timer",sleepSet:"Screen turns off in",sleepOff:"Sleep timer cancelled",sleepEnd:"Sleep timer finished",min:"m",hr:"h",addWatch:"Add to Continue watching",remWatch:"Remove from Continue watching",resumed:"Resumed at",customize:"Customize look",rename:"Rename",color:"Color",image:"Image",imgDevice:"Image from device",imgUrl:"Image URL",reset:"Reset",newName:"New name",checkCh:"Check channels",checking:"Checking channels",checkDone:"Check finished",working:"working",dead:"down",hideDead:"Hide dead channels",showDead:"Show them",autoCheck:"Weekly auto-check",preview2:"Channel preview",on:"On",rcvHint:"OK play · Long-press = favorite · Number keys jump to channel",chList:"Channel list",sPrayer:"Prayer times & adhan",prayerOn:"Show prayer times",method:"Calculation method",mEgypt:"Egyptian Authority",mMakkah:"Umm al-Qura",mMWL:"Muslim World League",mKarachi:"Karachi",asr:"Asr",asrStd:"Standard",asrHanafi:"Hanafi",adhanOn:"Adhan alert",adhanSound:"Adhan sound",adhanChime:"Soft chime",adhanUrlPh:"Adhan mp3 URL (optional)",beforeAlert:"Remind before",prayers:["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"],after:"in",adhanNow:"It's time for",adhanSoon:"Coming up:",sSports:"Matches",sportsOn:"Show matches",leagues:"Leagues",favTeams:"Your teams (for alerts)",favTeamsPh:"e.g. Al Ahly, Zamalek, Real Madrid",kickSoon:"Kick-off in",kickNow:"Kick-off",live:"LIVE",ft:"FT",sportsNote:"Data from free TheSportsDB: up to 3 matches per league per day",sNotif:"Notifications",notifSys:"Show app notifications",grant:"Grant access",granted:"Access granted",notGranted:"No access",tickerShow:"Show top ticker (prayer / match)",sKeys:"Remote buttons",addKey:"Map a new button",pressKey:"Press the button you want to map",keyFor:"What should this button do?",noKeys:"No mapped buttons",aApp:"Open an app",aTv:"IPTV",aLast:"Last channel",aSearch:"Search",aFrame:"Frame mode",aSleep:"Sleep timer",aQuick:"Quick settings",aHome:"Home",aProfile:"Switch profile",chooseApp:"Choose app",sProfiles:"Profiles (family)",profiles:"Profiles",addProfile:"New profile",profName:"Profile name",kids:"Kids profile",adult:"Regular",limit:"Daily screen time",noLimit:"Unlimited",allowedApps:"Allowed apps",allowedGroups:"Allowed channels",delProfile:"Delete profile",editProfile:"Edit",switchedTo:"Switched to",timeUp:"Screen time is over for today",timeUpSub:"Enter PIN to add 30 minutes",emoji:"Avatar",voiceNA:"Voice search not available",results:"Results",actions:"Actions",settingsS:"Settings",channelsS:"Channels",appsS:"Apps",watchS:"Continue watching",phoneTitle:"Phone control",phoneStep1:"1. Connect your phone to the same Wi-Fi",phoneStep2:"2. Scan the code with the camera, or open:",phoneCode:"Pairing code",phoneNoNet:"The box isn't on a local network",sPhone:"Phone control",showQr:"Show QR code",newCode:"New code",sGuard:"Keep as home screen",guardDesc:"A helper (Accessibility) service that brings you back here if the box opens its stock home screen, runs mapped remote buttons inside any app, and lets the sleep timer turn the screen off",guardOn:"Helper is on",guardEnable:"Turn on helper",guardHome:"Return here instead of the stock home",sUpdate:"Updates",updCurrent:"Current version",updAuto:"Automatic",updManual:"Manual",updCheck:"Check for update",updNone:"You're up to date",updNoRepo:"Enter your GitHub repository first",updDownloading:"Downloading update",updAvail:"New update",updInstall:"Download & install",later:"Later",updHint:"Settings → Updates",updPerm:"Install permission needed",updPermSub:"Allow it on the page that opened, then press install again",updReady:"Downloaded — the installer will open",vodTab:"Movies & Series",vodEmpty:"Add an Xtream account or a playlist with movies in Settings",myList:"My list",movies:"Movies",series:"Series",movie:"Movie",more:"More",cast:"Cast",seasons:"seasons",season:"Season",episode:"Episode",resumeAt:"Resume at",fromStart:"From start",play:"Play",inMyList:"In my list",nextEp:"Next episode",nextEpSub:"Starts in 8 seconds — Back to cancel",paused:"Paused",behindLive:"Behind live",resume:"Resume",pause:"Pause",goLive:"Back to live",audioTrack:"Audio language",subtitles:"Subtitles",aspect:"Picture size",aFit:"Fit",aFill:"Fill",aStretch:"Stretch",aZoom:"Zoom",speed:"Speed",catchup:"Catch-up",noCatchup:"No recorded shows for this channel",listType:"List type",xtServer:"Server http://host:port",xtUser:"Username",xtPass:"Password",addXtream:"Add Xtream",addM3u:"Add M3U",folders:"Folders",folderEmpty:"Folder is empty",newFolder:"New folder",folderName:"Folder name",addFolder:"Add to folder",delFolder:"Delete folder",iftar:"Iftar",imsak:"Imsak",iftarNow:"It's Iftar time",ramadanKareem:"Ramadan Kareem",imsakiya:"Ramadan timetable",hDay:"Day",needCity:"Set your city in Settings first",quranRadio:"Quran radio",w4k:"4K wallpapers",stCode:"Install by code",setup:"Device setup",sysExpert:"Expert mode",sysExpertOn:"I understand, turn it on",sysExpertWarn:"Expert mode lets you remove any system app, even important ones. Only what the box can’t boot without stays protected (system UI, system WebView, Shizuku and this launcher). Anything removed can be restored from “Removed” — but removing something the box needs can cause problems until you restore it.",removeAll:"Remove all system apps",removeAllWarn:"Every system app except the core ones and one backup launcher will be removed. Wi-Fi, Bluetooth, the keyboard or device settings may stop working. Everything can be restored from “Removed”. Sure?",setupSub:"One-time steps so the launcher works right",suHome:"Launcher is the home screen",suHomeBtn:"Make it home",suHomeHint:"Pick TV Launcher, then “Always”",suGuard:"Home-screen guard service",suWv:"System browser",suWvBtn:"Update from store",suBackup:"Backup of your settings",suBackupBtn:"Export now",suStock:"The stock launcher is protected — it can’t be removed in “System apps”, so you can always go back",suTest:"Full self-test",suTestBtn:"Run test",suTesting:"Testing...",tNet:"Internet",tLists:"Channel lists",tChan:"Play a channel",tEpg:"TV guide",tRadio:"Radio",tWeather:"Weather",tMatches:"Matches",tWall:"4K wallpapers",tCodes:"Install codes",tUpd:"Updates",tSkip:"Not set up",ok:"OK",dontShow:"Don’t show again",stCodeHint:"Enter a code (like Downloader app codes) or a direct link",myCodes:"My codes",myCodesHint:"Make your own code for any APK link or page, then type it above",codeNum:"Number",codeName:"Name",codeBad:"Invalid code or link",codeLooking:"Looking up code...",codeNotFound:"Code not found or no internet",wBing:"Bing daily photos",wBingAuto:"New Bing photo every day",wNature:"Nature",wSpace:"Space",wCity:"Cities",wMount:"Mountains",wSea:"Ocean",wCars:"Cars",wMinimal:"Minimal",wMosque:"Mosques & Islamic architecture",retry:"Try again",stopRadio:"Stop radio",azkar:"Azkar",forecast:"Weather forecast",today:"Today",thisWeek:"This week",stats:"Watch statistics",bedtime:"Bedtime",bedtimeSub:"Enter PIN to unlock for 30 minutes",sHijri:"Hijri date & Ramadan",hijriShow:"Show Hijri date",hijriAdj:"Hijri day adjustment",ramadanMode:"Ramadan mode",auto:"Auto",frameExtra:"Frame extras",store:"Store",browser:"Browser",stInstall:"Install",stUpdate:"Update",stInstalled:"Installed",stPlay:"Open in Google Play",stWeb:"Official download page",stRemove:"Uninstall",stNoSrc:"No source available",stAll:"Featured",stBrowser:"Browsers & ad blocking",stPlayer:"Players",stIptv:"IPTV players",stStream:"Movies & music",stSports:"Sports (official)",stTools:"Tools",stTools2:"Device tools",stSystem:"System apps",stRam:"RAM & speed",stLink:"Install from link",stLinkHint:"Paste a direct APK link",stCustom:"Your own catalog",stCustomHint:"Link to a JSON file listing the apps you want here",stCustomFmt:"File format:",szNone:"Shizuku isn't installed — needed to remove system apps without root",szStopped:"Shizuku is installed but not running — start it once from its app",szDenied:"Shizuku is running — allow the launcher to use it",szOk:"Ready: you can remove and restore system apps",szStart:"Open Shizuku",szAllowBtn:"Allow",szHow:"How do I start it?",szNeeded:"Shizuku must be running. Or run this from a computer:",szSteps:["Install Shizuku from this store","Android 11+: Settings → Device Preferences → About → press Build 7 times → Developer options → turn on Wireless debugging","Open Shizuku, choose “Start via Wireless debugging” and follow the pairing step","Android 10 or older: connect the box to a computer and run the command shown in Shizuku once","Come back and press “Allow” — after a reboot you may need to start Shizuku again"],sysOnly:"System apps",allApps:"All apps",removedApps:"Removed",removeSafe:"Remove all safe ones",adbCmds:"Computer commands (ADB)",adbHint:"Turn on debugging on the box and run these from a computer:",adbRestore:"To bring any app back:",tGreen:"Safe to remove",tYellow:"Careful — a feature may stop",tRed:"Never — the box needs it",tRedMsg:"This app is core to the device; removing it can break the box, keyboard or settings",tYellowMsg:"We can't be sure the box doesn't need it. If something breaks, restore it from “Removed”.",sRemoved:"Removed",sDisabled:"Disabled",sDone:"Done",sRestore:"Restore",sRemove:"Remove",sRemoveAnyway:"Remove anyway",sDisable:"Disable",sEnable:"Enable",sStop:"Force stop",ramUsed:"Used",ramLow:"Memory is low",ramClean:"Free up RAM",ramDeep:"Deep clean",animFast:"Faster screen animations",ramTips:"Tips: remove apps you don't use from “System apps”, and turn on Lite performance mode on 1–2 GB boxes.",webview:"System browser (WebView)",webviewOld:"Old — update “Android System WebView” or Chrome for better speed and looks",stBoost:"One-tap optimize",stClean:"Storage cleaner",adsApps:"Ads & tracking",removeAds:"Remove ads & tracking",tAds:"Ads & tracking (removable)",cInternal:"Internal storage",cShared:"Files",cScanBtn:"Scan storage",cScanning:"Scanning...",cAllow:"Allow file access",cAllCaches:"Clear all app caches",cDeleteSel:"Delete selected",cFound:"Scanned",cFiles:"files",cTmp:"Temporary files & caches",cEmpty:"Empty folders",cApk:"Leftover APK installers",cBig:"Large files (over 100 MB)",cClean:"All clean!",bDesc:"Closes background apps, clears every app's cache (with Shizuku), deletes temporary files and empty folders, and tells you how much was freed. APKs and large files are only deleted if you pick them.",bGo:"Start optimizing",bNeedShz:"needs Shizuku",bNeedAccess:"needs file access",bApkHint:"Old APK files can be removed in “Storage cleaner”",bAdsHint:"Ads & tracking services can be removed in “System apps”",bResult:"Freed"}};

;
/* core.js */
"use strict";var p=(t,e,n)=>new Promise((o,s)=>{var r=i=>{try{a(n.next(i))}catch(c){s(c)}},l=i=>{try{a(n.throw(i))}catch(c){s(c)}},a=i=>i.done?o(i.value):Promise.resolve(i.value).then(r,l);a((n=n.apply(t,e)).next())});const cbs={};let cbN=0;window.__cb=(t,e,n)=>{const o=cbs[t];delete cbs[t],o&&o(e,n)};const NA=window.Android,nat=(t,...e)=>{try{return NA&&NA[t]?NA[t](...e):void 0}catch(n){console.log(t,n);return}};function natAsync(t,...e){return new Promise((n,o)=>{const s="c"+ ++cbN;cbs[s]=(r,l)=>r?n(l):o(new Error(l)),NA[t](...e,s)})}const A={getApps:()=>nat("getApps")||"[]",launch:t=>!!nat("launch",t),isInstalled:t=>!!nat("isInstalled",t),playExternal:t=>NA?nat("playExternal",t):window.open(t),openSettings:t=>nat("openSettings",t||""),appInfo:t=>nat("appInfo",t),toast:t=>NA?nat("toast",String(t)):banner("ℹ️",String(t)),status:()=>{try{return JSON.parse(nat("getStatus")||"{}")}catch(t){return{}}},volume:t=>nat("volume",t),clearCache:()=>nat("clearOwnCache")||0,pickImage:t=>nat("pickImage",t),pickFrames:()=>nat("pickFrames"),deleteFrame:t=>nat("deleteFrame",t),voice:()=>NA?nat("voiceSearch"):A.toast(L("voiceNA")),setKeyMap:t=>nat("setKeyMap",t),learnKey:t=>nat("learnKey",!!t),notifAccess:()=>!!nat("notifAccess"),openNotifAccess:()=>nat("openNotifAccess"),exportBackup:t=>NA?nat("exportBackup",t):console.log(t),importBackup:()=>nat("importBackup"),fetchText(t){return NA?natAsync("fetchText",t):fetch(t).then(e=>{if(!e.ok)throw new Error(e.status);return e.text()})},fetchJSON(t){return p(this,null,function*(){return JSON.parse(yield A.fetchText(t))})},fetchEpg(t){return p(this,null,function*(){if(!NA)throw new Error("preview");return JSON.parse(yield natAsync("fetchEpg",t))})},checkStreams(t){return p(this,null,function*(){if(!NA)throw new Error("preview");return JSON.parse(yield natAsync("checkStreams",JSON.stringify(t)))})}};window.A=A;const DEF={design:"",perfChosen:!1,lang:"ar",theme:"apple",size:"m",wall:"dynamic",wallImg:"",h24:!1,lite:!1,showHidden:!1,lists:[],epg:"",ext:!1,preview:!0,hideDead:!1,autoCheck:!0,chStatus:{},lastCheck:0,city:"Cairo",loc:null,pin:"",lockSettings:!1,custom:{},keymap:{},frameMin:10,frameStyle:"gallery",frameSrc:"online",frameEvery:5,frames:[],fw:{clock:!0,weather:!0,prayer:!0,match:!0},prayerOn:!0,method:"egypt",asrHanafi:!1,adhanOn:!0,adhanUrl:"",adhanBefore:10,sportsOn:!0,leagues:["4829","4668","4328","4335","4480"],favTeams:"",notifSys:!0,tickerOn:!0,aspect:"contain",profiles:[{id:"main",name:"أنا",emoji:"😎",kids:!1}],cur:"main"},PDEF={favs:[],hidden:[],locked:[],recent:[],favCh:[],lockedGroups:[],lastCh:null,watch:[],usage:null,chHist:[],myList:[],seen:[],stats:{},folders:[]},KIDS_DEF={allowedApps:[],allowedGroups:[],limit:0},store={get(t,e){try{const n=localStorage.getItem(t);return n==null?e:JSON.parse(n)}catch(n){return e}},set(t,e){try{return localStorage.setItem(t,JSON.stringify(e)),!0}catch(n){return A.toast("Storage full"),!1}}},KEEP=/^(hw|favSize|homeOrder|iconLook|wall.*|theme|design|simple|p:[^:]+:(favs|hidden|folders|favCh|locked))$/;(function(){try{if(typeof NA>"u"||!NA||!NA.getPref)return;JSON.parse(NA.getPref("__keys")||"[]").forEach(e=>{const n=NA.getPref(e);n&&localStorage.getItem(e)!==n&&localStorage.setItem(e,n)})}catch(t){}})();const _storeSet=store.set;store.set=function(t,e){const n=_storeSet.call(store,t,e);if(KEEP.test(t)&&typeof NA<"u"&&NA&&NA.putPref)try{NA.putPref(t,JSON.stringify(e));const o=JSON.parse(NA.getPref("__keys")||"[]");o.indexOf(t)<0&&(o.push(t),NA.putPref("__keys",JSON.stringify(o)))}catch(o){}return n};const pkey=t=>"p:"+store.get("cur",DEF.cur)+":"+t,SC=new Map,S=new Proxy({},{get:(t,e)=>{const n=e in PDEF?pkey(e):e;let o=SC.get(n);if(!o){let s=null;try{s=localStorage.getItem(n)}catch(l){}let r;try{r=s==null?void 0:JSON.parse(s)}catch(l){r=void 0}o={raw:s,v:r},SC.set(n,o)}if(o.raw==null){const s=e in PDEF?PDEF[e]:DEF[e];return clone(s)}return o.v!==null&&typeof o.v=="object"?JSON.parse(o.raw):o.v},set:(t,e,n)=>{const o=e in PDEF?pkey(e):e;return SC.delete(o),store.set(o,n),!0}});try{const t=Storage.prototype,e=t.setItem,n=t.removeItem,o=t.clear;t.setItem=function(s,r){return SC.delete(s),e.call(this,s,r)},t.removeItem=function(s){return SC.delete(s),n.call(this,s)},t.clear=function(){return SC.clear(),o.call(this)}}catch(t){}const _storeSetSC=store.set;store.set=function(t,e){return SC.delete(t),_storeSetSC.call(store,t,e)};function clone(t){return t&&typeof t=="object"?JSON.parse(JSON.stringify(t)):t}(function(){const t=store.get("m3u","");t&&!store.get("lists",null)&&(store.set("lists",[{name:"IPTV",url:t}]),localStorage.removeItem("m3u")),["favs","hidden","locked","recent","favCh","lockedGroups","lastCh"].forEach(e=>{const n=localStorage.getItem(e);n!=null&&localStorage.getItem("p:main:"+e)==null&&(localStorage.setItem("p:main:"+e,n),localStorage.removeItem(e))})})();const profile=()=>S.profiles.find(t=>t.id===S.cur)||S.profiles[0],isKids=()=>!!(profile()&&profile().kids),L=t=>{const e=T[S.lang][t];return e==null?T.en[t]==null?t:T.en[t]:e},$=t=>document.getElementById(t),esc=t=>String(t==null?"":t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),cssq=t=>window.CSS&&CSS.escape?CSS.escape(t):String(t).replace(/["\\]/g,"\\$&"),pad=t=>String(t).padStart(2,"0");function toggleList(t,e){const n=S[t];S[t]=n.includes(e)?n.filter(o=>o!==e):[...n,e]}const on=t=>$(t).classList.contains("on");function fmtTime(t,e){const n=t.getHours(),o=pad(t.getMinutes());return S.h24?pad(n)+":"+o:(n%12||12)+":"+o+(e?"":" "+(n<12?L("am"):L("pm")))}function fmtDate(t){return S.lang==="ar"?`${L("days")[t.getDay()]}، ${t.getDate()} ${L("months")[t.getMonth()]}`:`${L("days")[t.getDay()]}, ${L("months")[t.getMonth()]} ${t.getDate()}`}function fmtLeft(t){const e=Math.max(0,Math.round(t/6e4));return e>=60?`${Math.floor(e/60)}${L("hr")} ${e%60}${L("min")}`:`${e} ${L("min")}`}const tickers=[];function tick(){const t=new Date;$("time").textContent=fmtTime(t),$("date").textContent=fmtDate(t),tickers.forEach(e=>{try{e(t)}catch(n){console.log(n)}})}const DAILY=["linear-gradient(135deg,#0f2027,#2c5364)","linear-gradient(135deg,#3a1c71,#d76d77)","linear-gradient(135deg,#134e5e,#71b280)","linear-gradient(135deg,#232526,#414345)","linear-gradient(135deg,#1e3c72,#2a5298)","linear-gradient(135deg,#42275a,#734b6d)","linear-gradient(135deg,#0b486b,#f56217)"];function applyLook(){const t=document.body;t.dataset.theme=S.theme,t.dataset.size=S.size,t.classList.toggle("lite",!!S.lite);{const o=typeof THEMES<"u"&&THEMES.find(s=>s.id===S.theme);t.classList.toggle("lighttheme",S.theme==="light"||!!(o&&o.light)),t.dataset.lay=S.design||(typeof designOf=="function"?designOf(o):"hero")}t.classList.toggle("kids",isKids());const e=S.wall==="image"&&S.wallImg;t.classList.toggle("wallimg",!!e),$("wall").style.backgroundImage=e?`url("${S.wallImg}")`:"",S.wall==="daily"&&!e?($("shelfBg").style.background=DAILY[new Date().getDay()],$("shelfImg").style.opacity=0):($("shelfBg").style.background="",$("shelfImg").style.opacity="");const n=profile();$("profBtn").textContent=n?n.emoji:"🙂"}function applyLang(){document.documentElement.lang=S.lang,document.documentElement.dir="rtl",document.querySelectorAll("[data-i18n]").forEach(t=>t.textContent=L(t.dataset.i18n)),document.querySelectorAll("[data-i18n-ph]").forEach(t=>t.placeholder=L(t.dataset.i18nPh))}function status(){const t=A.status();$("sNet").textContent=t.net==="eth"?"🔌":t.net==="wifi"?"📶":t.net==="none"?"⚠️ "+L("netNone"):t.net?"🌐":"",$("sDisk").textContent=t.free?"💾 "+(t.free/1073741824).toFixed(1)+" GB "+L("free"):""}function banner(t,e,n,o){const s=document.createElement("div");s.className="bn",s.innerHTML=`<b>${esc(t)}</b><div><div class="bt">${esc(e)}</div>${n?`<div class="bx">${esc(n)}</div>`:""}</div>`;const r=$("banners");for(r.prepend(s);r.children.length>3;)r.lastChild.remove();setTimeout(()=>{s.classList.add("out"),setTimeout(()=>s.remove(),450)},o||6500)}function chime(){try{const t=window.AudioContext||window.webkitAudioContext,e=new t;[[660,0],[880,.35],[990,.7]].forEach(([n,o])=>{const s=e.createOscillator(),r=e.createGain();s.frequency.value=n,s.type="sine",r.gain.setValueAtTime(0,e.currentTime+o),r.gain.linearRampToValueAtTime(.25,e.currentTime+o+.05),r.gain.exponentialRampToValueAtTime(.001,e.currentTime+o+1.2),s.connect(r).connect(e.destination),s.start(e.currentTime+o),s.stop(e.currentTime+o+1.3)}),setTimeout(()=>e.close(),2500)}catch(t){}}let dlgReturn=null,dlgOnKey=null,dlgOnClose=null;function dialog(t,e,n){n=n||{},on("dlg")||(dlgReturn=focused);const o=n.grid?"mgrid"+(n.grid===3?" c3":""):"dlist",s=n.html||`<div class="${o}">`+e.map((r,l)=>`<button class="btn f${r.pri?" pri":""}" data-di="${l}">${r.icon?`<b>${esc(r.icon)}</b>`:""}${esc(r.label)}</button>`).join("")+"</div>";$("dbox").innerHTML=`<h3>${esc(t)}</h3>${n.sub?`<div class="sub">${esc(n.sub)}</div>`:""}${s}`,$("dbox")._items=e||[],dlgOnKey=n.onKey||null,dlgOnClose=n.onClose||null,$("dlg").classList.add("on"),focus($("dbox").querySelector(n.focusSel||".f"))}function closeDialog(){if(!on("dlg"))return;$("dlg").classList.remove("on"),dlgOnKey=null;const t=dlgOnClose;dlgOnClose=null;const e=dlgReturn;dlgReturn=null,focus(e&&document.body.contains(e)&&e.offsetParent!==null?e:fallbackFocus()),t&&t()}function prompt2(t,e,n,o){dialog(t,[{label:L("save"),pri:1,fn:()=>n($("dIn").value.trim())},{label:L("cancel"),fn:()=>{}}],{html:`<input class="inp f" id="dIn" value="${esc(e||"")}" placeholder="${esc(o||"")}"><div class="dlist"><button class="btn pri f" data-di="0">${L("save")}</button><button class="btn f" data-di="1">${L("cancel")}</button></div>`})}let unlockedUntil=0;function guard(t,e){if(!t||!S.pin||Date.now()<unlockedUntil)return e();askPin(L("enterPin"),n=>{if(n===S.pin)unlockedUntil=Date.now()+5*6e4,closeDialog(),e();else return A.toast(L("wrongPin")),!1})}function askPin(t,e,n){let o="";const s=()=>{const a=$("dbox").querySelector(".pinDots");a&&(a.innerHTML=[0,1,2,3].map(i=>`<i class="${i<o.length?"on":""}"></i>`).join(""))},r=a=>{a==="⌫"?o=o.slice(0,-1):o.length<4&&(o+=a),s(),o.length===4&&e(o)===!1&&(o="",setTimeout(s,150))},l=["1","2","3","4","5","6","7","8","9","⌫","0","✕"];dialog(t,l.map(a=>({label:a,fn:()=>a==="✕"?closeDialog():r(a),keep:!0})),{sub:n,html:`<div class="pinDots"></div><div class="keys">${l.map((a,i)=>`<button class="key f" data-di="${i}">${a}</button>`).join("")}</div>`,onKey:a=>/^[0-9]$/.test(a)?(r(a),!0):a==="Backspace"||a==="Delete"?(r("⌫"),!0):!1}),s()}function setPin(){askPin(L("newPin"),t=>{setTimeout(()=>askPin(L("confirmPin"),e=>{if(t!==e){A.toast(L("pinMismatch")),closeDialog();return}S.pin=e,unlockedUntil=Date.now()+5*6e4,closeDialog(),window.renderSettings&&renderSettings(),A.toast(L("saved"))}),50)})}const pageHooks={};function showPage(t){if(t==="settings"&&(isKids()||S.lockSettings&&S.pin&&Date.now()>unlockedUntil))return isKids()||guard(!0,()=>{showPage("settings"),focus(document.querySelector('.tab[data-page="settings"]'))}),!1;const e=document.querySelector(".page.on");return document.querySelectorAll(".page").forEach(n=>n.classList.toggle("on",n.id===t)),document.querySelectorAll(".tab").forEach(n=>n.classList.toggle("on",n.dataset.page===t)),document.body.dataset.page=t,e&&e.id!==t&&pageHooks[e.id+":leave"]&&pageHooks[e.id+":leave"](),pageHooks[t+":enter"]&&(!e||e.id!==t)&&pageHooks[t+":enter"](),!0}let focused=null;const focusHooks=[];function scopeEl(){return on("dlg")?$("dbox"):on("player")&&$("plist").classList.contains("on")?$("plist"):on("search")?$("search"):on("detail")?$("detail"):null}function fallbackFocus(){const t=scopeEl();return t?t.querySelector(".f"):document.querySelector(".tab.on")}function visibleFocusables(){const t=scopeEl();return(t?[...t.querySelectorAll(".f")]:[...document.querySelectorAll(".top .f, .page.on .f")]).filter(n=>{const o=n.getBoundingClientRect();return o.width&&o.height&&n.offsetParent!==null})}function focus(t){if(t){if(focused&&focused.classList.remove("focus"),focused=t,t.classList.add("focus"),t.tagName==="INPUT"?document.activeElement&&document.activeElement!==t&&document.activeElement.blur&&document.activeElement.blur():t.focus({preventScroll:!0}),keepVisible(t),t.classList.contains("tab")){t.dataset.page&&showPage(t.dataset.page);return}clearTimeout(focusHookT),focusHookT=setTimeout(()=>{focused===t&&focusHooks.forEach(e=>{try{e(t)}catch(n){}})},90)}}let focusHookT=0;function keepVisible(t){const e=Math.round(innerHeight*.06),n=Math.round(innerWidth*.04);let o=t.parentElement;for(;o&&o!==document.body;){const s=getComputedStyle(o),r=/(auto|scroll)/.test(s.overflowY)&&o.scrollHeight>o.clientHeight+2,l=/(auto|scroll)/.test(s.overflowX)&&o.scrollWidth>o.clientWidth+2;if(r||l){const a=t.getBoundingClientRect(),i=o.getBoundingClientRect();r&&(a.top<i.top+e?o.scrollTop-=i.top+e-a.top:a.bottom>i.bottom-e&&(o.scrollTop+=a.bottom-(i.bottom-e))),l&&(a.left<i.left+n?o.scrollLeft-=i.left+n-a.left:a.right>i.right-n&&(o.scrollLeft+=a.right-(i.right-n)))}if(s.position==="fixed")break;o=o.parentElement}}function move(t){if(!focused||!document.body.contains(focused)||focused.offsetParent===null)return focus(fallbackFocus());const e=focused.getBoundingClientRect(),n=e.left+e.width/2,o=e.top+e.height/2;let s=null,r=1e9;const l=focused.classList.contains("tab");let a=visibleFocusables();if(l&&(t==="left"||t==="right")&&(a=a.filter(i=>!!i.closest(".top"))),!l&&(t==="left"||t==="right")){const i=focused.closest(".page");i?a=a.filter(c=>i.contains(c)):focused.closest(".top")&&(a=a.filter(c=>!!c.closest(".top")))}if(l&&t==="down"){const i=document.querySelector(".page.on");if(i){const c=a.filter(u=>i.contains(u));c.length&&(a=c)}}for(const i of a){if(i===focused)continue;const c=i.getBoundingClientRect(),u=c.left+c.width/2-n,g=c.top+c.height/2-o;let f,d;const h=Math.max(0,c.left-e.right,e.left-c.right),m=Math.max(0,c.top-e.bottom,e.top-c.bottom);if(t==="left"){if(c.right>e.left+4&&(u>=-2||m>0))continue;f=-u,d=m?Math.abs(g):0}else if(t==="right"){if(c.left<e.right-4&&(u<=2||m>0))continue;f=u,d=m?Math.abs(g):0}else if(t==="up"){if(c.bottom>e.top+4)continue;f=e.top-c.bottom+Math.abs(g)*.1,d=h?Math.abs(u):0}else{if(c.top<e.bottom-4)continue;f=c.top-e.bottom+Math.abs(g)*.1,d=h?Math.abs(u):0}if(f=Math.max(f,1),f<=0)continue;const y=f+d*2.2;y<r&&(r=y,s=i)}if(l&&!s&&(t==="down"||t==="up")){const i=document.querySelector(".page.on");if(i){const c=[...i.querySelectorAll(".f")].find(u=>u.offsetParent!==null||getComputedStyle(u).position==="fixed");c&&(s=c)}}l&&t==="up"&&s&&s.closest(".page")&&document.querySelector(".tabs").getBoundingClientRect().top<innerHeight/2&&(s=null),s&&!l&&focused.closest(".page")&&s.closest(".top")&&!(s.classList.contains("tab")&&s.classList.contains("on"))&&(s=document.querySelector(".tab.on")||s),s&&focus(s)}const activators=[],optionHandlers=[];function activate(t){if(t){if(t.dataset.di!==void 0&&t.closest("#dbox")){const e=$("dbox")._items[+t.dataset.di];if(!e)return;e.keep||closeDialog(),e.fn();return}if(t.classList.contains("tab")&&t.dataset.act){runXtab(t.dataset.act);return}if(t.classList.contains("tab")){const e=document.querySelector(".page.on .f");e&&focus(e);return}if(t.tagName==="INPUT"){t.focus(),setTimeout(()=>{focused===t&&document.activeElement!==t&&t.focus()},30);return}for(const e of activators)if(e(t))return}}function openOptions(t){if(!(!t||t.closest("#dbox"))){for(const e of optionHandlers)if(e(t))return}}const hasOptions=t=>t&&!t.closest("#dbox")&&(t.dataset.pkg||t.dataset.chu||t.dataset.group!==void 0||t.dataset.wk||t.dataset.vcat||t.dataset.folder||t.dataset.hw||t.id==="hwAddBtn"||t.classList.contains("lbc"));let idleAt=Date.now();const layers=[];window.onBack=function(){idleAt=Date.now(),handleKey({key:"GoBack",preventDefault(){}})};function backDefault(){if(on("dlg"))return closeDialog();if(document.activeElement&&document.activeElement.tagName==="INPUT"){document.activeElement.blur();return}if(focused&&!focused.classList.contains("tab"))return focus(document.querySelector(".tab.on"));focus(document.querySelector('.tab[data-page="home"]'))}const isBack=t=>t==="Escape"||t==="GoBack"||t==="BrowserBack";let holdTimer=null,held=!1,downOn=null;function handleKey(t){const e=t.key;for(const s of layers)if(s.test()&&s.key(t)!==!1)return;if(on("dlg")&&dlgOnKey&&dlgOnKey(e)){t.preventDefault();return}const n=document.activeElement&&document.activeElement.tagName==="INPUT",o={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"};if(o[e]){if(n&&(e==="ArrowLeft"||e==="ArrowRight"))return;t.preventDefault(),n&&document.activeElement.blur(),move(o[e]);return}if(e==="Enter"||e===" "){if(n){t.preventDefault(),document.activeElement.blur();const s=focused&&focused.nextElementSibling;s&&s.classList.contains("btn")&&activate(s);return}if(t.preventDefault(),t.repeat)return;held=!1,downOn=focused,hasOptions(focused)&&(holdTimer=setTimeout(()=>{held=!0,openOptions(downOn)},650));return}if(e==="ContextMenu"||e==="Menu"){t.preventDefault(),openOptions(focused);return}if(isBack(e)||e==="Backspace"&&!n){t.preventDefault&&t.preventDefault(),backDefault();return}for(const s of keyHooks)if(s(t))return}const keyHooks=[];document.addEventListener("keydown",t=>{idleAt=Date.now(),handleKey(t)}),document.addEventListener("keyup",t=>{if(t.key!=="Enter"&&t.key!==" ")return;const e=layers.find(n=>n.test()&&n.ownsEnter);if(e){e.keyup&&e.keyup(t);return}document.activeElement&&document.activeElement.tagName==="INPUT"||(clearTimeout(holdTimer),!held&&downOn&&downOn===focused&&activate(focused),held=!1,downOn=null)}),document.addEventListener("click",t=>{idleAt=Date.now();const e=t.target.closest(".f");e&&(focus(e),activate(e))}),document.addEventListener("contextmenu",t=>{const e=t.target.closest(".f");e&&(t.preventDefault(),focus(e),openOptions(e))}),document.addEventListener("mousemove",()=>{idleAt=Date.now()}),window.addEventListener("error",t=>console.log("err",t.message)),window.onLongOk=function(){clearTimeout(holdTimer),held=!0,downOn=null,!on("dlg")&&focused&&hasOptions(focused)&&openOptions(focused)},window.onShortOk=function(){const t=document.activeElement,e=t&&t.tagName==="INPUT"?t:document;e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",bubbles:!0}))},document.addEventListener("focusin",t=>{t.target&&t.target.tagName==="INPUT"&&nat("setTyping",!0)}),document.addEventListener("focusout",t=>{t.target&&t.target.tagName==="INPUT"&&nat("setTyping",!1)}),setInterval(()=>nat("ping"),2e3),nat("ping");

;
/* themes.js */
"use strict";const THEMES=[{id:"apple",g:"Apple TV",n:"tvOS 17 · Dark",builtIn:1,dot:"#ffffff"},{id:"tvos-light",g:"Apple TV",n:"tvOS · Light",light:1,bg:"linear-gradient(135deg,#f4f4f8,#dcdce6)",card:"linear-gradient(160deg,#fff,#e8e8ee)",sel:"#1c1c1e",selText:"#fff",glass:"rgba(0,0,0,.07)",r:"2vh",tabs:"pill",focus:"lift",dot:"#e8e8ee",lay:"hero"},{id:"tvos-2012",g:"Apple TV",n:"Apple TV · 2012",bg:"radial-gradient(ellipse at 50% 0,#4a4a4a,#141414 70%)",card:"linear-gradient(180deg,#6a6a6a,#2c2c2c)",sel:"#fff",selText:"#000",glass:"rgba(255,255,255,.08)",r:".8vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #fff",dot:"#6a6a6a",lay:"hero"},{id:"google",g:"Google / Android TV",n:"Google TV",builtIn:1,dot:"#8ab4f8",lay:"gtv"},{id:"gtv-you",g:"Google / Android TV",n:"Google TV 2024 · Material You",bg:"linear-gradient(135deg,#1d1b22,#141218)",card:"#2b2930",sel:"#d0bcff",selText:"#381e72",glass:"#2b2930",r:"2.6vh",tabs:"underline",focus:"ring",ring:"0 0 0 .45vh #d0bcff",accent:"#d0bcff",dot:"#d0bcff",lay:"gtv"},{id:"atv-oreo",g:"Google / Android TV",n:"Android TV 8–11",bg:"linear-gradient(180deg,#212121,#121212)",card:"#303030",sel:"#fff",selText:"#000",glass:"#2a2a2a",r:".6vh",tabs:"plain",focus:"scale",ring:"0 0 0 .3vh #fff",dot:"#303030",classicAtv:1},{id:"atv-leanback",g:"Google / Android TV",n:"Android TV 5–7 · Leanback",bg:"linear-gradient(135deg,#37474f,#1c262b)",card:"#546e7a",sel:"#26a69a",selText:"#fff",glass:"rgba(255,255,255,.08)",r:".3vh",tabs:"plain",focus:"scale",ring:"0 0 0 .35vh #fff",dot:"#26a69a",classicAtv:1},{id:"atv-2017",g:"Google / Android TV",n:"Android TV · Classic home",bg:"linear-gradient(115deg,#1f2a55 0%,#2c2f63 40%,#4a2d62 70%,#7a2f5a 100%)",card:"#f2f2f2",sel:"#fff",selText:"#202124",glass:"rgba(255,255,255,.1)",r:".4vh",tabs:"plain",focus:"scale",ring:"0 0 0 .3vh #fff",dot:"#e53935",classicAtv:1},{id:"gtv-round",g:"Google / Android TV",n:"Google TV · Round apps",bg:"radial-gradient(ellipse at 70% 0,#2a3140 0,#14161b 60%,#0d0e11 100%)",card:"#262a31",sel:"#e8eaed",selText:"#202124",glass:"rgba(255,255,255,.08)",r:"1.2vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #fff",dot:"#8ab4f8",roundApps:1},{id:"shield",g:"Google / Android TV",n:"NVIDIA Shield",bg:"radial-gradient(circle at 80% 0,#203314,#0a0a0a 60%)",card:"#1f1f1f",sel:"#76b900",selText:"#000",glass:"#1c1c1c",r:".6vh",tabs:"underline",focus:"ring",ring:"0 0 0 .4vh #76b900",accent:"#76b900",dot:"#76b900",lay:"poster"},{id:"bravia",g:"Google / Android TV",n:"Sony Bravia",bg:"linear-gradient(135deg,#1b2129,#0b0e12)",card:"#2a313b",sel:"#e6e6e6",selText:"#111",glass:"rgba(255,255,255,.07)",r:".5vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #e6e6e6",dot:"#2a313b",lay:"poster"},{id:"tizen",g:"Samsung",n:"Tizen · One UI",bg:"linear-gradient(160deg,#0c1f45,#050a18 70%)",card:"rgba(255,255,255,.09)",sel:"#fff",selText:"#0c1f45",glass:"rgba(255,255,255,.1)",r:"1.6vh",tabs:"bottom",focus:"lift",ring:"0 0 0 .35vh #fff",dot:"#1d4ed8",lay:"bar"},{id:"smarthub",g:"Samsung",n:"Smart Hub · 2016",bg:"radial-gradient(ellipse at 50% 100%,#1b2a52,#000 70%)",card:"linear-gradient(180deg,#2f4a85,#16264d)",sel:"#5ab0ff",selText:"#001",glass:"rgba(255,255,255,.08)",r:".4vh",tabs:"bottom",focus:"glow",ring:"0 0 0 .3vh #5ab0ff",accent:"#5ab0ff",dot:"#2f4a85",lay:"bar"},{id:"webos",g:"LG",n:"webOS · Launcher bar",bg:"linear-gradient(135deg,#2b0d3f,#0f1238)",card:"linear-gradient(160deg,#3a1d5c,#1d1440)",sel:"#ff3d8b",selText:"#fff",glass:"rgba(255,255,255,.1)",r:"1vh",tabs:"bottom",focus:"lift",ring:"0 0 0 .4vh #ff3d8b",accent:"#ff3d8b",dot:"#ff3d8b",lay:"bar"},{id:"webos22",g:"LG",n:"webOS 22+",bg:"linear-gradient(180deg,#1c1c1c,#0d0d0d)",card:"#2a2a2a",sel:"#c4024f",selText:"#fff",glass:"#262626",r:"2vh",tabs:"pill",focus:"ring",ring:"0 0 0 .4vh #fff",dot:"#c4024f",lay:"bar"},{id:"firetv",g:"Amazon · Roku · Xiaomi",n:"Fire TV",bg:"linear-gradient(180deg,#13233b,#0a1424)",card:"#1d2f4a",sel:"#ff9900",selText:"#111",glass:"#18273e",r:"1vh",tabs:"underline",focus:"ring",ring:"0 0 0 .4vh #fff",accent:"#ff9900",dot:"#ff9900",lay:"grid"},{id:"roku",g:"Amazon · Roku · Xiaomi",n:"Roku",bg:"linear-gradient(135deg,#3b0d63,#1c0533)",card:"#4a1a75",sel:"#fff",selText:"#4a0d6b",glass:"rgba(255,255,255,.1)",r:"1vh",tabs:"plain",focus:"ring",ring:"0 0 0 .45vh #fff",dot:"#6c2bd9",lay:"grid"},{id:"patchwall",g:"Amazon · Roku · Xiaomi",n:"Xiaomi PatchWall",light:1,bg:"linear-gradient(180deg,#fafafa,#ececf0)",card:"#ffffff",sel:"#ff6900",selText:"#fff",glass:"rgba(0,0,0,.06)",r:"1.4vh",tabs:"underline",focus:"ring",ring:"0 0 0 .4vh #ff6900",accent:"#ff6900",dot:"#ff6900",lay:"poster"},{id:"xbox",g:"Consoles · Media centers",n:"Xbox",bg:"radial-gradient(circle at 75% 15%,#1d5a26,#0b0b0b 60%)",card:"#1f1f1f",sel:"#107c10",selText:"#fff",glass:"#1a1a1a",r:".3vh",tabs:"plain",focus:"ring",ring:"0 0 0 .45vh #fff",dot:"#107c10",lay:"xbox"},{id:"ps5",g:"Consoles · Media centers",n:"PlayStation 5",bg:"radial-gradient(circle at 70% -10%,#1d3f80,#05070f 65%)",card:"rgba(255,255,255,.08)",sel:"#fff",selText:"#000",glass:"rgba(255,255,255,.08)",r:"1.8vh",tabs:"plain",focus:"lift",ring:"0 0 0 .3vh #fff",dot:"#1d3f80",lay:"psrow"},{id:"wmc",g:"Consoles · Media centers",n:"Windows Media Center",bg:"radial-gradient(ellipse at 30% 20%,#2a7fd4,#062a5a 70%)",card:"linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.05))",sel:"#7cd651",selText:"#04210a",glass:"rgba(255,255,255,.1)",r:".6vh",tabs:"plain",focus:"glow",ring:"0 0 0 .3vh #b6ff8f",accent:"#7cd651",dot:"#2a7fd4",lay:"sidelist"},{id:"plex",g:"Consoles · Media centers",n:"Plex",bg:"radial-gradient(ellipse at 75% 0,#3a3325 0,#1f1f1f 55%,#141414 100%)",card:"#2b2b2b",sel:"#e5a00d",selText:"#000",glass:"rgba(255,255,255,.07)",r:".5vh",tabs:"underline",focus:"ring",ring:"0 0 0 .35vh #e5a00d",accent:"#e5a00d",dot:"#e5a00d",lay:"sidelist"},{id:"kodi",g:"Consoles · Media centers",n:"Kodi · Estuary",bg:"linear-gradient(135deg,#132835,#0a141b)",card:"#1b3442",sel:"#12a0c7",selText:"#fff",glass:"#16303d",r:".4vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #12a0c7",accent:"#12a0c7",dot:"#12a0c7",lay:"sidelist"},{id:"classic",g:"Originals",n:"Classic",builtIn:1,dot:"#4f7cff",lay:"grid"},{id:"light",g:"Originals",n:"Light",builtIn:1,light:1,dot:"#eeeeee"},{id:"neon",g:"Originals",n:"Neon",builtIn:1,dot:"#b14bff",lay:"psrow"},{id:"startpage",g:"Originals",n:"Start page · صفحة البداية",bg:"linear-gradient(110deg,#0d3b55 0%,#1d2a33 30%,#24262b 55%,#5a2f1a 85%,#7a3a17 100%)",card:"rgba(255,255,255,.06)",sel:"#e8eaed",selText:"#111",glass:"rgba(255,255,255,.07)",r:"1.6vh",tabs:"underline",focus:"ring",ring:"0 0 0 .3vh rgba(255,255,255,.85)",dot:"#7a3a17",startPage:1},{id:"dock",g:"Originals",n:"Dock · لوحات جانبية",bg:"radial-gradient(ellipse at 60% 30%,#16263f 0,#070b14 70%)",card:"rgba(20,24,36,.72)",sel:"#8b8cff",selText:"#fff",glass:"rgba(12,16,26,.62)",r:"1.6vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #fff",dot:"#8b8cff",dock:1},{id:"amoled",g:"Originals",n:"AMOLED Black",bg:"#000",card:"#0c0c0c",sel:"#fff",selText:"#000",glass:"#111",r:"1.4vh",tabs:"pill",focus:"ring",ring:"0 0 0 .3vh #fff",dot:"#000",lay:"bar"},{id:"ramadan",g:"Originals",n:"رمضاني · Ramadan",bg:"radial-gradient(circle at 80% 10%,#16305c,#070d1e 65%)",card:"linear-gradient(160deg,#1b2b52,#0d1630)",sel:"#d9b25c",selText:"#1a1203",glass:"rgba(217,178,92,.12)",r:"1.6vh",tabs:"pill",focus:"glow",ring:"0 0 0 .3vh #d9b25c",accent:"#d9b25c",dot:"#d9b25c",lay:"poster"},{id:"vidaa",g:"Hisense · Others",n:"Hisense VIDAA",bg:"linear-gradient(120deg,#1a0b3d 0%,#3a136e 45%,#7b1fa2 75%,#b0326e 100%)",card:"#ffffff",sel:"#fff",selText:"#3a136e",glass:"rgba(255,255,255,.1)",r:".5vh",tabs:"plain",focus:"ring",ring:"0 0 0 .35vh #fff",dot:"#7b1fa2",vidaa:1}];function themeCss(e){const a=`body[data-theme="${e.id}"]`;let o=`${a}{--card:${e.card};--sel:${e.sel};--selText:${e.selText};--glass:${e.glass};--r:${e.r};--ring:${e.ring||"0 0 0 0 transparent"}}
${a} #shelfBg{background:${e.bg}}`;return o+=e.light?`
${a}{--text:#111;--mute:#666}
${a} #shelfImg{filter:blur(60px) saturate(1.3) brightness(1.2);opacity:.12}
${a} #shade{background:linear-gradient(180deg,rgba(245,245,248,.3) 0,rgba(245,245,248,.85) 42%,rgba(240,240,244,.98) 66%)}
${a} #shelfTitle{text-shadow:none}body.lite${a} .tabs,body.lite${a} .btn,body.lite${a} .inp,body.lite${a} .it,body.lite${a} .chrow,body.lite${a} .qbtn,body.lite${a} .key{background:rgba(0,0,0,.07)}body.lite${a} .mbox{background:#fff}${a} .mbox{background:rgba(255,255,255,.94)}${a} #search{background:rgba(245,245,248,.95)}${a} .app{box-shadow:0 .4vh 1.4vh rgba(0,0,0,.08)}`:`
${a} #shelfImg{opacity:${e.id==="amoled"?0:.16}}
${a} #shade{background:linear-gradient(180deg,rgba(0,0,0,0) 0,rgba(0,0,0,.18) 45%,rgba(0,0,0,.55) 100%)}`,e.accent&&(o+=`
${a} .ticker span{border:1px solid ${e.accent}55}${a} .prog i,${a} .bar i{background:${e.accent}}`),e.tabs==="underline"&&(o+=`
${a} .tabs{background:transparent;backdrop-filter:none;gap:.5vw}
${a} .tab{color:var(--mute)}${a} .tab.on{background:transparent;color:var(--text);box-shadow:inset 0 -.4vh 0 var(--sel);border-radius:0}
${a} .tab.f.focus{background:var(--sel);color:var(--selText);border-radius:99px;box-shadow:none}`),e.tabs==="plain"&&(o+=`
${a} .tabs{background:transparent;backdrop-filter:none;gap:.4vw}${a} .tab{color:var(--mute)}
${a} .tab.on{background:transparent;color:var(--text);font-weight:700}${a} .tab.f.focus{background:var(--sel);color:var(--selText)}`),e.tabs==="bottom"&&(o+=`
${a} .tabs{position:fixed;bottom:2.2vh;left:50%;transform:translateX(-50%);z-index:20;padding:.8vh;border-radius:2vh;background:rgba(10,12,20,.82);backdrop-filter:blur(24px);box-shadow:0 1.5vh 4vh rgba(0,0,0,.5)}
${a} .tab{padding:1.2vh 2vw}${a} .scroll{padding-bottom:16vh}${a} .hint{display:none}${a} #shelf{height:24vh}`),e.focus==="ring"&&(o+=`
${a} .app.f.focus,${a} .poster.f.focus,${a} .chrow.f.focus,${a} .btn.f.focus,${a} .it.f.focus{transform:scale(1.05);box-shadow:var(--ring),0 1.4vh 3vh rgba(0,0,0,.5)}${a} .app.f.focus::after,${a} .it.f.focus::after{display:none}`),e.focus==="scale"&&(o+=`
${a} .app.f.focus,${a} .poster.f.focus{transform:scale(1.14);box-shadow:0 1.4vh 3vh rgba(0,0,0,.6)}${a} .app.f.focus::after{display:none}${a} .app .nm{opacity:1}`),e.focus==="glow"&&(o+=`
${a} .app.f.focus,${a} .poster.f.focus,${a} .chrow.f.focus,${a} .btn.f.focus,${a} .it.f.focus{transform:scale(1.06);box-shadow:var(--ring),0 0 4vh ${e.accent||e.sel}}`),e.id==="plex"&&(o+=`
${a} .tab.on:not(.focus){color:#e5a00d!important;box-shadow:inset 0 -.4vh 0 #e5a00d!important}
${a} h2{color:#fff;font-weight:700;font-size:2.3vh;letter-spacing:.02em}
${a} .app{border:1px solid rgba(255,255,255,.06)}
${a} .app .nm{color:#bbb}${a} .app.focus .nm{color:#e5a00d}
${a} .btn.pri,${a} .it.sel{background:#e5a00d;color:#000}`),e.vidaa&&(o+=`
${a} #shade{background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(10,4,30,.75) 100%)}
${a} #favRow .app,${a} #recentRow .app{background:#fff;width:calc(var(--tile,16vw) * .78)}
${a} #favRow .app .nm,${a} #recentRow .app .nm{color:#fff}
${a} #shelfTitle{font-weight:800;letter-spacing:.06em;text-transform:uppercase}
${a} .tab.on:not(.focus){color:#fff!important}${a} h2{color:#fff}
${a} .app .lbl{color:#3a136e;text-shadow:none}`),e.vidaa&&(o+=`
${a} .app.match{background:rgba(10,12,24,.55)!important;color:#fff}${a} .app.match *{color:#fff}`),o}function layoutCss(e,a){let o="";return e.lay==="gtv"&&(o+=`
${a}[data-page=home] #shelf{height:44vh}${a}[data-page=home] #shelfTitle{font-size:6.4vh;font-weight:500}
${a}[data-page=home] #home .scroll{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}
${a}[data-page=home] #home h2[data-row=recentRow]{-webkit-order:1;order:1}${a}[data-page=home] #recentRow{-webkit-order:2;order:2}${a}[data-page=home] #home h2[data-i18n=favorites]{-webkit-order:3;order:3}${a}[data-page=home] #favRow{-webkit-order:4;order:4}${a}[data-page=home] #watchRow,${a}[data-page=home] #folderRow,${a}[data-page=home] #matchRow,${a}[data-page=home] #favChRow,${a}[data-page=home] #quickRow,${a}[data-page=home] h2[data-row=watchRow],${a}[data-page=home] h2[data-row=folderRow],${a}[data-page=home] h2[data-row=matchRow],${a}[data-page=home] h2[data-row=favChRow],${a}[data-page=home] h2[data-row=quickRow],${a}[data-page=home] .dockx{-webkit-order:5;order:5}${a}[data-page=home] #home h2[data-row=watchRow],${a}[data-page=home] #watchRow{-webkit-order:6;order:6}${a}[data-page=home] #shelf{-webkit-order:0;order:0}${a}[data-page=home] #home .scroll>.row{margin-bottom:0}${a}[data-page=home] #home .scroll>*{-webkit-flex-shrink:0;flex-shrink:0}
${a}[data-page=home] #home .row .app{width:calc(var(--tile,16vw) * .78)}`),e.lay==="bar"&&(o+=`
${a}[data-page=home] #shelf{height:58vh;padding-bottom:4vh}${a}[data-page=home] #shelfTitle{font-size:8vh}
${a}[data-page=home] #home .scroll>h2,${a}[data-page=home] #allAppsW,${a}[data-page=home] #smartRow,${a}[data-page=home] #watchRow,${a}[data-page=home] #folderRow,${a}[data-page=home] #matchRow,${a}[data-page=home] #favChRow,${a}[data-page=home] #quickRow,${a}[data-page=home] #recentRow{display:none}
${a}[data-page=home] #favRow{position:fixed;left:0;right:0;bottom:12vh;padding:2.4vh 4vw 3vh;background:linear-gradient(0deg,rgba(0,0,0,.75),rgba(0,0,0,0));gap:1.2vw;z-index:5}
${a}[data-page=home] #favRow .app{width:11.5vw;border-radius:1vh}${a}[data-page=home] #favRow .app .nm{opacity:1}`),e.lay==="grid"&&(o+=`
${a}[data-page=home] #shelf{height:4vh}${a}[data-page=home] #shelfTitle,${a}[data-page=home] #shelfSub{display:none}
${a}[data-page=home] #favRow{-webkit-flex-wrap:wrap;flex-wrap:wrap;overflow:visible;gap:2.6vh 1.6vw;padding-bottom:4vh}
${a}[data-page=home] #favRow .app{width:20vw}${a}[data-page=home] #favRow .app .nm{opacity:1;position:static;margin-top:0}
${a}[data-page=home] #favRow .app{-webkit-flex-direction:column;flex-direction:column}`),e.lay==="xbox"&&(o+=`
${a}[data-page=home] #shelf{height:20vh}
${a}[data-page=home] #favRow{-webkit-flex-wrap:wrap;flex-wrap:wrap;overflow:visible;gap:1vw;padding-bottom:3vh;max-height:52vh}
${a}[data-page=home] #favRow .app{width:14vw;border-radius:.4vh}
${a}[data-page=home] #favRow .app:first-child{width:29vw;height:calc(28vw * 9.6 / 16 + 1vw)}
${a}[data-page=home] #favRow .app .nm{position:absolute;top:auto;bottom:.8vh;margin:0;opacity:1;font-size:1.5vh;text-shadow:0 .2vh .6vh #000}`),e.lay==="psrow"&&(o+=`
${a}[data-page=home] #shelf{height:50vh;padding-top:22vh}${a}[data-page=home] #shelfTitle{font-size:6vh}
${a}[data-page=home] #home h2[data-i18n=favorites]{display:none}
${a}[data-page=home] #favRow{position:fixed;top:12vh;inset-inline-start:3vw;inset-inline-end:3vw;padding:1vh 1vw;gap:1vw;z-index:5;overflow:visible}
${a}[data-page=home] #favRow .app{width:8.6vh!important;height:8.6vh!important;aspect-ratio:1/1;border-radius:1.6vh}
${a}[data-page=home] #favRow .app.f.focus{width:15vh!important;height:15vh!important;transform:none}
${a}[data-page=home] #favRow .app img{max-width:62%;max-height:62%}${a}[data-page=home] #favRow .app .nm{opacity:0}${a}[data-page=home] #favRow .app.focus .nm{opacity:1}`),e.lay==="sidelist"&&(o+=`
${a}[data-page=home] #shelf{margin-inline-start:26vw;height:40vh}
${a}[data-page=home] #home h2[data-i18n=favorites]{position:fixed;top:13vh;inset-inline-start:3vw;width:22vw;z-index:5;font-size:2.2vh;color:var(--text)}
${a}[data-page=home] #favRow{position:fixed;top:18vh;inset-inline-start:3vw;width:22vw;bottom:6vh;display:block;overflow:hidden;padding:0;z-index:5}
${a}[data-page=home] #favRow .app{width:100%!important;height:7.4vh!important;aspect-ratio:auto;margin-bottom:.9vh;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:flex-start;justify-content:flex-start;padding:0 1vw}
${a}[data-page=home] #favRow .app img{position:static!important;width:4.6vh!important;height:4.6vh!important;max-width:none;max-height:none;border-radius:1vh;object-fit:contain}
${a}[data-page=home] #favRow .app .nm{position:static;opacity:1!important;margin:0 1vw;font-size:2vh;font-weight:600;text-align:start}
${a}[data-page=home] #favRow .app.f.focus{transform:scale(1.04);background:var(--sel)!important}${a}[data-page=home] #favRow .app.focus .nm{color:var(--selText)!important}
${a}[data-page=home] #home .scroll>h2:not([data-i18n=favorites]),${a}[data-page=home] #home .scroll>.row:not(#favRow){margin-inline-start:26vw}`),e.lay==="poster"&&(o+=`
${a}[data-page=home] #shelf{height:30vh}
${a}[data-page=home] #favRow .app{width:12vw;aspect-ratio:2/3;border-radius:1.2vh}
${a}[data-page=home] #favRow .app img{max-width:64%;max-height:40%}
${a}[data-page=home] #favRow .app .nm{opacity:1;top:auto;bottom:1.2vh;margin:0;position:absolute;font-weight:600}`),e.startPage&&(o+=`
${a} #shelfImg,${a} #shelfTitle,${a} #shelfSub{display:none}
${a} #shade{background:transparent}
${a} #shelf{height:24vh}
${a}[data-page=home] .top .clock{position:fixed;top:9vh;left:0;right:0;text-align:center;pointer-events:none;z-index:4}
${a}[data-page=home] .top .clock #time{font-size:9.5vh;font-weight:200;letter-spacing:-.02em;line-height:1}
${a}[data-page=home] .top .clock #date{font-size:1.8vh;opacity:.55;margin-top:1.2vh}
${a} #home h2{text-align:center;color:#e8eaed;font-weight:600;font-size:1.9vh}
${a} #home .row{-webkit-justify-content:center;justify-content:center;-webkit-flex-wrap:wrap;flex-wrap:wrap;overflow:visible;gap:2.2vh 1.6vw}
${a} #home .row .app{width:8.4vh!important;height:8.4vh!important;aspect-ratio:1/1;border-radius:1.8vh;border:1px solid rgba(255,255,255,.08);margin-bottom:3.4vh}
${a} #home .row .app img{max-width:52%;max-height:52%}
${a} #home .row .app img.banner,${a} #home .row .app img.cover{border-radius:1.8vh}
${a} #home .row .app .nm{opacity:.85!important;font-size:1.55vh;margin-top:.9vh}
${a} #home .row .app .badge{display:none}
${a} #home .row .app.f.focus{transform:scale(1.1);box-shadow:0 0 0 .3vh rgba(255,255,255,.85),0 1vh 2.4vh rgba(0,0,0,.5)}
${a} #favRow .app:nth-child(7n+1),${a} #recentRow .app:nth-child(7n+1),${a} #folderRow .app:nth-child(7n+1){background:#0f3d33;border-color:#2ed3a055}${a} #favRow .app:nth-child(7n+2),${a} #recentRow .app:nth-child(7n+2),${a} #folderRow .app:nth-child(7n+2){background:#16294d;border-color:#5b8cff55}${a} #favRow .app:nth-child(7n+3),${a} #recentRow .app:nth-child(7n+3),${a} #folderRow .app:nth-child(7n+3){background:#2a2154;border-color:#a98bff55}${a} #favRow .app:nth-child(7n+4),${a} #recentRow .app:nth-child(7n+4),${a} #folderRow .app:nth-child(7n+4){background:#3d1a22;border-color:#ff6b8155}${a} #favRow .app:nth-child(7n+5),${a} #recentRow .app:nth-child(7n+5),${a} #folderRow .app:nth-child(7n+5){background:#3d2a14;border-color:#ffa94d55}${a} #favRow .app:nth-child(7n+6),${a} #recentRow .app:nth-child(7n+6),${a} #folderRow .app:nth-child(7n+6){background:#123842;border-color:#3cc8e655}${a} #favRow .app:nth-child(7n+7),${a} #recentRow .app:nth-child(7n+7),${a} #folderRow .app:nth-child(7n+7){background:#3a1838;border-color:#e66bd155}
${a} .tabs{background:transparent}`),e.dock&&(o+=`
${a} #shade{background:linear-gradient(90deg,rgba(0,0,0,.55) 0,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(0,0,0,.55) 100%),linear-gradient(0deg,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 35%)}
${a} #shelfImg{opacity:.35}
${a} .tab{border:1px solid rgba(255,255,255,.22);border-radius:99px;margin:0 .25vw;background:rgba(10,14,24,.45)}
${a} .tab.on:not(.focus){background:#8b8cff!important;color:#fff!important;border-color:transparent}
${a} .tabs{background:transparent}
${a}[data-page=home] #shelf{height:0;padding:0;overflow:hidden}
${a}[data-page=home] #home h2{display:none}
${a}[data-page=home] #allAppsW,${a}[data-page=home] #allAppsH,${a}[data-page=home] #smartRow,${a}[data-page=home] h2[data-row=smartRow],${a}[data-page=home] #watchRow,${a}[data-page=home] #folderRow,${a}[data-page=home] #matchRow,${a}[data-page=home] #favChRow{display:none!important}
${a}[data-page=home] #home h2[data-row=recentRow]{display:block!important;position:fixed;top:30vh;inset-inline-start:1.3vw;width:14vw;z-index:6;color:#fff;font-size:2.1vh;font-weight:700;text-align:center;margin:0;padding:1.6vh 0 .6vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.18);border-bottom:0;border-radius:1.8vh 1.8vh 0 0}
${a}[data-page=home] #recentRow{position:fixed;top:35.6vh;inset-inline-start:1.3vw;width:14vw;max-height:48vh;z-index:6;display:block!important;overflow:hidden;padding:.4vh .8vw 1vh;margin:0;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.18);border-top:0;border-radius:0 0 1.8vh 1.8vh}
${a}[data-page=home] #recentRow .app{width:100%!important;height:7.6vh!important;aspect-ratio:auto;background:transparent;border-bottom:1px solid rgba(255,255,255,.1);border-radius:1vh;display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:flex-start;justify-content:flex-start;padding:0 .6vw}
${a}[data-page=home] #recentRow .app img{position:static!important;width:4.4vh!important;height:4.4vh!important;max-width:none;max-height:none;border-radius:1vh;object-fit:contain;background:#fff;padding:.3vh}
${a}[data-page=home] #recentRow .app .nm{position:static;opacity:1!important;margin:0 .8vw;font-size:1.7vh;font-weight:700;text-align:start}
${a}[data-page=home] #recentRow .app .badge{display:none}
${a}[data-page=home] #recentRow .app.f.focus{transform:none;background:rgba(255,255,255,.14);box-shadow:0 0 0 .25vh #fff}
${a}[data-page=home] #quickRow{position:fixed;top:24vh;max-height:68vh;inset-inline-end:1.3vw;width:6.8vw;z-index:6;display:block!important;overflow:visible;padding:0;margin:0}
${a}[data-page=home] #quickRow .app{width:100%!important;height:11.6vh!important;aspect-ratio:auto;margin-bottom:1.6vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.2);border-radius:1.8vh;-webkit-flex-direction:column;flex-direction:column}
${a}[data-page=home] #quickRow .app img{position:static!important;width:4.6vh!important;height:4.6vh!important;max-width:none;max-height:none;border-radius:1.1vh;object-fit:contain}
${a}[data-page=home] #quickRow .app .lbl{font-size:1.6vh;padding:0 .3vw}${a}[data-page=home] #quickRow .app .lbl~.nm{display:none}${a}[data-page=home] #quickRow .app .nm{position:static;opacity:1!important;font-size:1.45vh;margin-top:.8vh;font-weight:600}
${a}[data-page=home] #favRow{position:fixed;bottom:5vh;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);max-width:58vw;z-index:6;overflow:visible;padding:1vh 1vw 5vh;gap:1.6vw;-webkit-justify-content:center;justify-content:center;margin:0}
${a}[data-page=home] #favRow .app{width:11vh!important;height:11vh!important;aspect-ratio:1/1;border-radius:2vh;background:linear-gradient(160deg,rgba(255,255,255,.28),rgba(255,255,255,.06));border:1px solid rgba(255,255,255,.3);-webkit-box-reflect:below .8vh linear-gradient(transparent 55%,rgba(255,255,255,.22))}
${a}[data-page=home] #favRow .app img{max-width:58%;max-height:58%}
${a}[data-page=home] #favRow .app img.banner{border-radius:2vh;object-fit:cover}
${a}[data-page=home] #favRow .app .nm{opacity:0;font-size:1.6vh;margin-top:1.6vh}${a}[data-page=home] #favRow .app.focus .nm{opacity:1!important}
${a}[data-page=home] #favRow .app .badge{display:none}
${a}[data-page=home] #favRow .app.f.focus{transform:scale(1.14) translateY(-1vh);background:#fff;box-shadow:0 0 0 .35vh #fff,0 1.4vh 3vh rgba(0,0,0,.6)}
${a}[data-page=home] .top .clock{inset-inline-end:auto;inset-inline-start:1.3vw;text-align:center}
${a}[data-page=home] .top .clock #time{font-size:5vh;font-weight:700}
${a}[data-page=home] .ticker{inset-inline-end:auto;inset-inline-start:1.3vw;top:15vh;width:14vw;-webkit-flex-direction:column;flex-direction:column;gap:.6vh;padding:1.6vh 1vw;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.18);border-radius:1.8vh;color:#fff;text-align:center;font-size:1.9vh}
${a}[data-page=home] .ticker span{border:0!important;background:transparent!important}
${a}[data-page=home] .top .left{display:none}
${a} .xtab{display:inline-block}
${a} .tab{font-size:1.5vh;padding:.7vh .7vw;margin:0 .15vw}${a} .tabs{margin-inline-start:11vw;max-width:80vw;flex-wrap:nowrap}
${a}[data-page=home] .dockx{display:block}
${a}[data-page=home] #xAllApps{position:fixed;top:85vh;inset-inline-start:2.6vw;z-index:6;border-radius:99px;padding:.9vh 1.4vw;font-size:1.7vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.25)}
${a}[data-page=home] #xSources{position:fixed;top:30vh;inset-inline-start:16.4vw;z-index:6;display:flex;align-items:center;gap:.8vw;text-align:start;padding:1.4vh 1.2vw;min-width:12vw;border-radius:1.6vh;background:rgba(12,16,26,.62);border:1px solid rgba(255,255,255,.22)}
${a}[data-page=home] #xSources b{display:flex;align-items:center;justify-content:center;width:4.4vh;height:4.4vh;border-radius:1vh;background:#6b6ef0;font-size:2.2vh}
${a}[data-page=home] #xSources span span{display:block;font-weight:700;font-size:1.8vh}${a}[data-page=home] #xSources small{display:block;opacity:.6;font-size:1.3vh}`),e.roundApps&&(o+=`
${a} .tab{border-radius:99px;padding:.8vh 1.4vw}${a} .tab.on:not(.focus){background:rgba(255,255,255,.14)!important;color:#fff}
${a} .tab.f.focus{background:#e8eaed!important;color:#202124!important}
${a} h2{color:#e8eaed;font-weight:500;font-size:2vh}
${a} #favRow,${a} #recentRow{gap:1.6vw}
${a} #favRow .app,${a} #recentRow .app{width:10.5vh!important;height:10.5vh!important;border-radius:50%!important;aspect-ratio:1/1;background:#fff;overflow:hidden}
${a} #favRow .app img,${a} #recentRow .app img{max-width:64%;max-height:64%}
${a} #favRow .app img.banner,${a} #recentRow .app img.banner{border-radius:50%;object-fit:cover}
${a} #favRow .app .nm,${a} #recentRow .app .nm{font-size:1.5vh}
${a} #favRow .app .badge,${a} #recentRow .app .badge{display:none}
${a} #favRow .app.f.focus,${a} #recentRow .app.f.focus{transform:scale(1.12);box-shadow:0 0 0 .35vh #fff,0 1.2vh 2.6vh rgba(0,0,0,.6)}
${a} #shelfTitle{font-weight:500}`),(e.classicAtv||e.lay==="bar")&&(o+=`
${a} .app.match{background:rgba(10,12,24,.55)!important;color:#fff}${a} .app.match *{color:#fff}`),e.classicAtv&&(o+=`
${a} #shelfImg,${a} #shade{display:none}
${a} #shelf{height:3vh;padding:0}${a} #shelfTitle,${a} #shelfSub{display:none}
${a} #home .scroll{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-content:flex-start;align-content:flex-start;padding-top:0}
${a} #home .scroll>#shelf{width:100%}
${a} #home h2{width:9vw;-webkit-flex:none;flex:none;margin:0;padding-top:4.2vh;text-align:center;font-size:1.55vh;font-weight:500;color:rgba(255,255,255,.85)}
${a} #home h2::before{content:"";display:block;width:6.4vh;height:6.4vh;margin:0 auto 1vh;border-radius:50%;background:#e53935 center/55% no-repeat;box-shadow:0 .6vh 1.4vh rgba(0,0,0,.35)}
${a} #home h2[data-i18n=favorites]::before{background-color:#e53935;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=allAppsW]::before{background-color:#26a69a;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=smartRow]::before{background-color:#ab47bc;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2l2.4 6.6L21 9.3l-5 4.6 1.4 6.9L12 17.4 6.6 20.8 8 13.9 3 9.3l6.6-.7z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=watchRow]::before{background-color:#4285f4;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=favChRow]::before{background-color:#e53935;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M21 6h-7.6l3.3-3.3-.7-.7L12 6 8 2l-.7.7L10.6 6H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm0 14H3V8h18z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=matchRow]::before{background-color:#0f9d58;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M12 7l4 3-1.5 4.5h-5L8 10z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=folderRow]::before{background-color:#f4b400;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=quickRow]::before{background-color:#7e57c2;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 2v11h3v9l7-12h-4l4-8z'/%3E%3C/svg%3E")}
${a} #home h2[data-row=recentRow]::before{background-color:#546e7a;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7zm-1 5v5l4 2.5.8-1.3-3.3-2V8z'/%3E%3C/svg%3E")}
${a} #home .row{width:calc(100% - 9vw);-webkit-flex:none;flex:none;padding:3.2vh 1vw 3.4vh;margin-bottom:0}
${a} #home .row .app{width:calc(var(--tile,16vw) * .82);border-radius:.3vh}
${a} #home #favRow .app{background:#f2f2f2}${a} #home #favRow .app .lbl{color:#202124;text-shadow:none}
${a} #home #favRow .app img:not(.banner):not(.cover){max-width:62%;max-height:62%}
${a} #home .app .nm{color:#fff;font-size:1.6vh;opacity:0}${a} #home .app.focus .nm{opacity:1}
${a} #home .app.f.focus{transform:scale(1.18);box-shadow:0 1.6vh 3.2vh rgba(0,0,0,.55)}
${a} .top .tabs{background:rgba(255,255,255,.08)}
${a} .qbtn{background:rgba(255,255,255,.1)}`),o}function physicalCss(e){const a=(o,t)=>{const r=t==="rtl"?"right":"left",i=t==="rtl"?"left":"right";return o.replace(/inset-inline-start/g,r).replace(/inset-inline-end/g,i).replace(/(margin|padding)-inline-start/g,"$1-"+r).replace(/(margin|padding)-inline-end/g,"$1-"+i).replace(/text-align:start/g,"text-align:"+r).replace(/text-align:end/g,"text-align:"+i)};return e.replace(/([^{}]+)\{([^{}]*)\}/g,(o,t,r)=>{if(!/inline-(start|end)|text-align:(start|end)/.test(r))return o;const i=n=>t.split(",").map(d=>`html[dir=${n}] ${d.trim()}`).join(",");return`${t}{${r}}${i("ltr")}{${a(r,"ltr")}}${i("rtl")}{${a(r,"rtl")}}`})}const DESIGNS=[["hero","🍎",{ar:"tvOS · عنوان كبير وصفوف",en:"tvOS · big title & rows"}],["gtv","🔷",{ar:"Google TV · آخر استخدام الأول",en:"Google TV · recent first"}],["round","⚪",{ar:"Google TV · تطبيقات دواير",en:"Google TV · round apps"}],["classic","🔴",{ar:"Android TV · أيقونات جانبية",en:"Android TV · side icons"}],["bar","▬",{ar:"Samsung / LG · شريط تحت",en:"Samsung / LG · bottom bar"}],["grid","▦",{ar:"Fire TV / Roku · شبكة كبيرة",en:"Fire TV / Roku · big grid"}],["xbox","🟩",{ar:"Xbox · بلاطة كبيرة",en:"Xbox · hero tile"}],["psrow","🎮",{ar:"PlayStation · أيقونات فوق",en:"PlayStation · top icons"}],["sidelist","☰",{ar:"Kodi / Plex · قايمة جانبية",en:"Kodi / Plex · side list"}],["poster","🎬",{ar:"بوسترات أفلام",en:"Movie posters"}],["dock","🧩",{ar:"Dock · لوحات جانبية",en:"Dock · side panels"}],["start","🕒",{ar:"Start page · ساعة في النص",en:"Start page · centre clock"}]],designOf=e=>e?e.dock?"dock":e.startPage?"start":e.roundApps?"round":e.classicAtv?"classic":e.lay||"hero":"hero";(function(){const e=DESIGNS.map(o=>{const t=o[0];return layoutCss({lay:t,dock:t==="dock",startPage:t==="start",roundApps:t==="round",classicAtv:t==="classic"},`body[data-lay="${t}"]`)}).join(`
`),a=document.createElement("style");a.id="themeCss",a.textContent=physicalCss(THEMES.filter(o=>!o.builtIn).map(themeCss).join(`
`)+`
`+e),document.head.appendChild(a)})();function designPicker(){const e=document.body.dataset.lay||"hero";return`<div class="dgrid">${DESIGNS.map(a=>`<button class="btn f dcard${e===a[0]?" pri":""}" data-design="${a[0]}"><b>${a[1]}</b><span>${esc(a[2][S.lang]||a[2].en)}</span></button>`).join("")}</div>`}function themePicker(){return[...new Set(THEMES.map(a=>a.g))].map(a=>`<div class="tgroup"><span class="tg">${esc(a==="Originals"?S.lang==="ar"?"تصميمات اللانشر":"Launcher originals":a)}</span><div class="inline">${THEMES.filter(o=>o.g===a).map(o=>`<button class="btn f tbtn${S.theme===o.id?" pri":""}" data-set="theme:${o.id}"><i class="tdot" style="background:${o.dot}"></i>${esc(o.n)}</button>`).join("")}</div></div>`).join("")}activators.push(e=>e.dataset&&e.dataset.design?(S.design=e.dataset.design,applyLook(),renderHome(),window.renderSettings&&renderSettings(),focus(document.querySelector(`[data-design="${e.dataset.design}"]`)),!0):!1);

;
/* home.js */
"use strict";var d=(e,t,n)=>new Promise((i,a)=>{var l=c=>{try{r(n.next(c))}catch(s){a(s)}},o=c=>{try{r(n.throw(c))}catch(s){a(s)}},r=c=>c.done?i(c.value):Promise.resolve(c.value).then(l,o);r((n=n.apply(e,t)).next())});let apps=[];const QUICK=[["YouTube","com.google.android.youtube.tv","com.google.android.youtube"],["Netflix","com.netflix.ninja","com.netflix.mediaclient"],["Shahid","net.mbc.shahidTV","net.mbc.shahid"],["Watch It","com.watchit.vod.androidtv","com.watchit.vod"],["VLC","org.videolan.vlc"],["Chrome","com.android.chrome"],["Spotify","com.spotify.tv.android","com.spotify.music"]],SWATCH=["","#e50914","#ff6d00","#ffb300","#2e7d32","#00897b","#0288d1","#3949ab","#8e24aa","#d81b60","#5d4037","#455a64","#111111","#f5f5f5"];let appsRaw="";function loadApps(e){const t=A.getApps();if(!e&&t===appsRaw&&apps.length)return!1;appsRaw=t;try{apps=JSON.parse(t)}catch(n){apps=[]}apps.sort((n,i)=>appName(n).localeCompare(appName(i))),renderHome()}let lastLoad=0;window.onAppsChanged=e=>{if(!e&&Date.now()-lastLoad<3e3)return;lastLoad=Date.now();const t=focused&&focused.dataset.pkg;if(loadApps()!==!1&&t){const n=document.querySelector(`.page.on [data-pkg="${cssq(t)}"]`);n&&focus(n)}};const byPkg=e=>apps.find(t=>t.pkg===e),custom=e=>S.custom[e]||{},appName=e=>custom(e.pkg).name||e.name,isHidden=e=>S.hidden.includes(e),isLocked=e=>S.locked.includes(e);function allowed(e){return isKids()?Object.assign({},KIDS_DEF,profile()).allowedApps.includes(e):!0}function visibleApps(){return apps.filter(e=>allowed(e.pkg)&&(S.showHidden&&!isKids()||!isHidden(e.pkg)))}function tile(e){const t=custom(e.pkg),n=(S.favs.includes(e.pkg)?"★":"")+(isLocked(e.pkg)?" 🔒":""),i=t.color?` style="background:${esc(t.color)}"`:"",a=t.img?`<img class="cover" src="${esc(t.img)}" alt="">`:t.color&&!t.img?`<div class="lbl">${esc(appName(e))}</div>`:e.icon?`<img loading="lazy" decoding="async" src="${e.icon}" onload="chkBanner(this)" alt="">`:`<div class="lbl">${esc(appName(e))}</div>`;return`<div class="app f${isHidden(e.pkg)?" hidden-app":""}" tabindex="0" data-pkg="${esc(e.pkg)}"${i}>
    ${n?`<span class="badge">${n}</span>`:""}${a}<div class="nm">${esc(appName(e))}</div></div>`}window.chkBanner=e=>{e.naturalWidth/e.naturalHeight>1.4&&e.classList.add("banner")};function setRow(e,t){const n=$(e),i=document.querySelector(`h2[data-row="${e}"]`);n.innerHTML=t,n.style.display=t?"":"none",i&&(i.style.display=t?"":"none")}function watchTile(e){const t=e.dur?Math.min(100,e.pos/e.dur*100):0;if(e.type==="app"){const n=byPkg(e.pkg);return n?tile(n).replace("data-pkg=",'data-wk="'+esc(e.key)+'" data-pkg='):""}return`<div class="app ch-tile f" tabindex="0" data-wk="${esc(e.key)}" data-chu="${esc(e.url)}">
    ${e.logo?`<img class="logo" loading="lazy" src="${esc(e.logo)}" onerror="this.remove()" alt="">`:`<div class="lbl">${esc(e.name)}</div>`}
    ${t?`<div class="prog"><i style="width:${t}%"></i></div>`:""}<div class="nm">${esc(e.name)}${e.dur?" · "+fmtDur(e.dur-e.pos):""}</div></div>`}const fmtDur=e=>{e=Math.max(0,Math.round(e));const t=Math.floor(e/3600),n=Math.floor(e%3600/60);return t?`${t}:${pad(n)}:${pad(e%60)}`:`${n}:${pad(e%60)}`};function watchUpsert(e){const t=S.watch.filter(n=>n.key!==e.key);t.unshift(Object.assign({ts:Date.now()},e)),S.watch=t.slice(0,30)}function watchRemove(e){S.watch=S.watch.filter(t=>t.key!==e),renderHome()}function chTile(e){const t=window.nowNext?nowNext(e)[0]:null;return`<div class="app ch-tile f" tabindex="0" data-chu="${esc(e.url)}">
    ${e.logo?`<img class="logo" loading="lazy" src="${esc(e.logo)}" onerror="this.remove()" alt="">`:`<div class="lbl">${esc(e.name)}</div>`}
    <div class="nm">${esc(e.name)}${t?" · "+esc(t[2]):""}</div></div>`}function renderHome(){setRow("watchRow",S.watch.map(watchTile).join(""));let e=S.favs.map(byPkg).filter(a=>a&&allowed(a.pkg));isKids()&&!e.length&&(e=visibleApps()),!e.length&&document.body.dataset.lay==="dock"&&(e=visibleApps().slice(0,6)),$("favRow").innerHTML=e.length?e.map(tile).join(""):`<div class="empty">${L("noFav")}</div>`,window.renderMatchRow&&renderMatchRow();const t=S.lastCh,n=[...t?[t]:[],...S.favCh.filter(a=>!t||a.url!==t.url)].filter(a=>!window.chAllowed||chAllowed(a));setRow("favChRow",n.map(chTile).join(""));const i=isKids()?[]:QUICK.map(([a,...l])=>{const o=l.find(r=>A.isInstalled(r));return o&&!isHidden(o)?byPkg(o)||{pkg:o,name:a,icon:""}:null}).filter(Boolean);setRow("quickRow",i.map(tile).join("")),setRow("recentRow",S.recent.map(byPkg).filter(a=>a&&!isHidden(a.pkg)&&allowed(a.pkg)).map(tile).join("")),$("appGrid").innerHTML=visibleApps().slice().sort((a,l)=>appName(a).localeCompare(appName(l))).map(tile).join(""),focused&&!document.body.contains(focused)&&(focused=null)}function launch(e){allowed(e)&&guard(isLocked(e),()=>{if(!A.launch(e)){A.toast(L("notInst"));return}S.recent=[e,...S.recent.filter(t=>t!==e)].slice(0,10),setTimeout(renderHome,800)})}function moveFav(e,t){const n=S.favs,i=n.indexOf(e),a=i+t;i<0||a<0||a>=n.length||([n[i],n[a]]=[n[a],n[i]],S.favs=n,renderHome(),focus(document.querySelector(`#favRow [data-pkg="${cssq(e)}"]`)))}function shelf(e,t,n){$("shelfTitle").textContent=e,$("shelfSub").textContent=t||"",n&&S.wall==="dynamic"&&($("shelfImg").style.backgroundImage=`url("${n}")`)}focusHooks.push(e=>{if(e.closest("#home,#apps"))if(e.dataset.pkg){const t=byPkg(e.dataset.pkg);t&&shelf(appName(t),(S.favs.includes(t.pkg)?"★ "+L("favorites"):"")+(isLocked(t.pkg)?"  🔒":""),custom(t.pkg).img||t.icon)}else if(e.dataset.chu){const t=e.dataset.wk&&S.watch.find(a=>a.key===e.dataset.wk),n=t||window.chByUrl&&chByUrl(e.dataset.chu);if(!n)return;const i=window.nowNext?nowNext(n)[0]:null;shelf(n.name,t&&t.dur?`${L("continueW")} · ${fmtDur(t.pos)} / ${fmtDur(t.dur)}`:i?`${L("now")}: ${i[2]}`:S.lastCh&&S.lastCh.url===n.url?L("lastCh"):L("favCh"),n.logo)}else e.dataset.match&&window.matchShelf&&matchShelf(e.dataset.match)});function appMenu(e,t,n){const i=byPkg(e)||{name:e,pkg:e},a=S.favs.includes(e),l=isKids(),o=[{label:L("open"),pri:1,fn:()=>launch(e)},{label:a?L("remFav"):L("addFav"),fn:()=>{toggleList("favs",e),renderHome()}}];a&&t&&o.push({label:L("moveL"),fn:()=>moveFav(e,-1)},{label:L("moveR"),fn:()=>moveFav(e,1)});const r="app:"+e,c=S.watch.some(s=>s.key===r);if(o.push({label:c?L("remWatch"):L("addWatch"),fn:()=>{c?watchRemove(r):(watchUpsert({key:r,type:"app",pkg:e,name:i.name}),renderHome())}}),l||o.push({label:L("customize"),fn:()=>guard(!!S.pin,()=>customizeApp(e))},{label:isHidden(e)?L("unhide"):L("hide"),fn:()=>guard(!!S.pin,()=>{toggleList("hidden",e),renderHome()})},{label:isLocked(e)?L("unlock"):L("lock"),fn:()=>{if(!S.pin){A.toast(L("needPin"));return}guard(!0,()=>{toggleList("locked",e),renderHome()})}},{label:L("info"),fn:()=>A.appInfo(e)}),o.push({label:L("cancel"),fn:()=>{}}),!l){const s=["xxs","xs","s","m","l"],f=s.indexOf(S.favSize||"m");o.splice(1,0,{icon:"➕",label:S.lang==="ar"?"كبّر كل الأيقونات":"Bigger icons",keep:1,fn:()=>{S.favSize=s[Math.min(4,s.indexOf(S.favSize||"m")+1)],window.applyHomeLook&&applyHomeLook()}},{icon:"➖",label:S.lang==="ar"?"صغّر كل الأيقونات":"Smaller icons",keep:1,fn:()=>{S.favSize=s[Math.max(0,s.indexOf(S.favSize||"m")-1)],window.applyHomeLook&&applyHomeLook()}})}!l&&e!=="com.mahmoud.tvlauncher"&&o.splice(1,0,{icon:"🗑",label:S.lang==="ar"?"مسح التطبيق":"Uninstall",fn:()=>uninstallAny(e)}),dialog(appName(i),o)}function setCustom(e,t){const n=S.custom;n[e]=Object.assign({},n[e]||{},t),Object.keys(n[e]).forEach(i=>{n[e][i]||delete n[e][i]}),Object.keys(n[e]).length||delete n[e],S.custom=n,renderHome()}function customizeApp(e){const t=byPkg(e)||{name:e};dialog(L("customize")+" — "+appName(t),[{icon:"✏️",label:L("rename"),fn:()=>prompt2(L("newName"),appName(t),n=>setCustom(e,{name:n&&n!==t.name?n:""}))},{icon:"🎨",label:L("color"),fn:()=>colorPicker(e)},{icon:"🖼️",label:L("imgDevice"),fn:()=>A.pickImage("app:"+e)},{icon:"🔗",label:L("imgUrl"),fn:()=>prompt2(L("imgUrl"),(custom(e).img||"").startsWith("data:")?"":custom(e).img,n=>setCustom(e,{img:n}),"https://...")},{icon:"↩️",label:L("reset"),fn:()=>{const n=S.custom;delete n[e],S.custom=n,renderHome()}}],{grid:3})}function colorPicker(e){const t=SWATCH.map(n=>({label:n||"✕",fn:()=>setCustom(e,{color:n})}));dialog(L("color"),t,{html:`<div class="swatches">${SWATCH.map((n,i)=>`<button class="sw f" data-di="${i}" style="background:${n||"transparent"};${n?"":"border:2px dashed #888"}"></button>`).join("")}</div>`})}window.onImagePicked=(e,t)=>{e==="wall"?store.set("wallImg",t)&&(S.wall="image",applyLook(),window.renderSettings&&renderSettings(),A.toast(L("saved"))):e.startsWith("app:")&&setCustom(e.slice(4),{img:t})},optionHandlers.push(e=>{if(e.dataset.wk&&!e.dataset.pkg){const t=e.dataset.wk;return dialog((S.watch.find(n=>n.key===t)||{}).name||"",[{label:L("open"),pri:1,fn:()=>activate(e)},{label:L("remWatch"),fn:()=>watchRemove(t)},{label:L("cancel"),fn:()=>{}}]),!0}return e.dataset.pkg?(appMenu(e.dataset.pkg,!!e.closest("#favRow"),e.dataset.wk),!0):!1}),activators.push(e=>e.dataset.pkg?(launch(e.dataset.pkg),!0):!1);function switchProfile(e){const t=S.profiles.find(i=>i.id===e);if(!t)return;const n=()=>{S.cur=e,applyLook(),applyLang(),loadApps(!0),window.renderGroups&&renderGroups(),window.renderSettings&&renderSettings(),showPage("home"),shelf(t.emoji+" "+t.name,""),window.updateTicker&&updateTicker(),window.renderMatchRow&&renderMatchRow(),focus(document.querySelector('.tab[data-page="home"]')),banner(t.emoji,L("switchedTo")+" "+t.name)};isKids()&&S.pin?guard(!0,n):n()}function profileMenu(){const e=S.profiles;dialog(L("profiles"),e.map(t=>({icon:t.emoji,label:t.name+(t.id===S.cur?" ✓":""),pri:t.id===S.cur,fn:()=>{t.id!==S.cur&&switchProfile(t.id)}})),{grid:e.length>3?4:e.length||1})}activators.push(e=>e.id==="profBtn"?(profileMenu(),!0):!1),setInterval(()=>{if(!isKids()||on("frame")||Date.now()-idleAt>10*6e4)return;const e=+(profile().limit||0);if(!e)return;const t=new Date().toDateString();let n=S.usage;(!n||n.d!==t)&&(n={d:t,m:0,bonus:0}),n.m++,S.usage=n,n.m>=e+n.bonus&&timeUp()},6e4);function timeUp(){on("player")&&window.stopPlayer&&stopPlayer(),askPin(L("timeUp"),e=>{if(e!==S.pin)return A.toast(L("wrongPin")),!1;const t=S.usage;t.bonus=(t.bonus||0)+30,S.usage=t,closeDialog()},L("timeUpSub")),dlgOnClose=()=>{const e=S.usage;e&&e.m>=+(profile().limit||0)+(e.bonus||0)&&setTimeout(timeUp,500)}}function uninstallAny(e){return d(this,null,function*(){let t=!1;try{const i=JSON.parse(nat("listPackages")||"[]").find(a=>a.pkg===e||a.package===e||a.p===e);t=!!(i&&i.sys)}catch(n){}if(!t){nat("uninstallApp",e),setTimeout(()=>{typeof loadApps=="function"&&loadApps()},8e3);return}if(typeof shz=="function"&&shz()==="ok")try{yield runShell(`pm uninstall -k --user 0 ${e}`),A.toast("🗑 "+(S.lang==="ar"?"اتمسح":"Removed")),S.favs=S.favs.filter(n=>n!==e),typeof loadApps=="function"?loadApps():renderHome()}catch(n){nat("uninstallApp",e)}else nat("uninstallApp",e),A.toast(S.lang==="ar"?"لو ده تطبيق نظام ومارضيش يتمسح، شغّل Shizuku الأول":"System app? Start Shizuku first")})}

;
/* tv.js */
"use strict";var p=(e,t,n)=>new Promise((a,r)=>{var o=c=>{try{i(n.next(c))}catch(l){r(l)}},s=c=>{try{i(n.throw(c))}catch(l){r(l)}},i=c=>c.done?a(c.value):Promise.resolve(c.value).then(o,s);i((n=n.apply(e,t)).next())});let channels=[],groups=[],countries=[],curGroup="__all",hls=null,pvHls=null,playing=null,playList=[],epg={};const COUNTRIES=[["مصر","Egypt","EG|EGY|EGYPT|MISR","مصر|مصري|المصرية"],["السعودية","Saudi Arabia","SA|KSA|SAUDI","السعودي|السعودية"],["الإمارات","UAE","AE|UAE|EMIRATES|DUBAI|ABU ?DHABI","الإمارات|الامارات|دبي|أبوظبي"],["الكويت","Kuwait","KW|KUWAIT","الكويت"],["قطر","Qatar","QA|QATAR","قطر"],["البحرين","Bahrain","BH|BAHRAIN","البحرين"],["عُمان","Oman","OM|OMAN","عمان|عُمان"],["الأردن","Jordan","JO|JOR|JORDAN","الأردن|الاردن"],["لبنان","Lebanon","LB|LEB|LEBANON","لبنان"],["سوريا","Syria","SY|SYR|SYRIA","سوريا|سورية"],["العراق","Iraq","IQ|IRQ|IRAQ","العراق|عراقية"],["فلسطين","Palestine","PS|PAL|PALESTINE","فلسطين"],["اليمن","Yemen","YE|YEMEN","اليمن"],["السودان","Sudan","SD|SUDAN","السودان"],["ليبيا","Libya","LY|LIBYA","ليبيا"],["تونس","Tunisia","TN|TUNISIA","تونس"],["الجزائر","Algeria","DZ|ALG|ALGERIA","الجزائر"],["المغرب","Morocco","MA|MAR|MOROCCO","المغرب"],["عربية عامة","Pan-Arab","MBC|ROTANA|OSN|BEIN|ART|AL ?JAZEERA|AL ?ARABIYA|SKY ?NEWS ?ARABIA|ARABIC|ARAB","عربي|العربية|الجزيرة|روتانا"]].map(([e,t,n,a])=>({ar:e,en:t,re:new RegExp(`(^|[\\s|:\\[\\]()\\-_/.])(${n})([\\s|:\\[\\]()\\-_/.]|$)`,"i"),re2:new RegExp(a)})),cName=e=>S.lang==="ar"?e.ar:e.en;function detectCountry(e){const t=`${e.country} ${e.group} | ${e.name}`;for(const n of COUNTRIES)if(n.re.test(t)||n.re2.test(t))return n.ar;return""}const tvgUrls=new Set;function parseM3U(e,t){const n=[];let a=null;const r=(e.slice(0,600).match(/(?:x-tvg-url|url-tvg)="([^"]+)"/)||[])[1];r&&r.split(",").forEach(o=>{o=o.trim(),/^https?:/.test(o)&&tvgUrls.add(o)});for(let o of e.split(/\r?\n/))if(o=o.trim(),o.startsWith("#EXTINF")){const s=l=>{const u=o.match(new RegExp(l+'="([^"]*)"'));return u?u[1]:""};let i=!1,c=-1;for(let l=0;l<o.length;l++){const u=o[l];if(u==='"')i=!i;else if(u===","&&!i){c=l;break}}a={name:(c>=0?o.slice(c+1):"").trim()||s("tvg-name"),logo:s("tvg-logo"),group:s("group-title")||t||"—",id:s("tvg-id")||s("tvg-name"),country:s("tvg-country"),list:t}}else o.startsWith("#EXTGRP:")&&a?a.group=o.slice(8).trim():o&&!o.startsWith("#")&&a&&(a.url=o,n.push(a),a=null);return n}function loadLists(){return p(this,null,function*(){channels=[],groups=[],countries=[],m3uVod=[],vodLoaded=!1,vodCat=null;const e=S.lists;if(!e.length){renderGroups(),renderHome();return}$("channels").innerHTML=`<div class="empty">${L("loading")}</div>`;const t=yield Promise.allSettled(e.map((s,i)=>s.type==="xtream"?loadXtreamLive(s,i):A.fetchText(s.url).then(c=>parseM3U(c,s.name)))),n=new Set;t.forEach((s,i)=>{if(s.status!=="fulfilled"){A.toast(L("loadErr")+": "+e[i].name);return}const c=new Set(S.deadHidden||[]);s.value.forEach(l=>{n.has(l.url)||c.has(l.url)||(n.add(l.url),!l.xt&&/\.(mp4|mkv|avi|mov|m4v|webm)(\?|$)/i.test(l.url)?m3uVod.push({kind:"movie",name:l.name,url:l.url,poster:l.logo,cat:l.group||e[i].name}):channels.push(l))})});const a=window.lowRam?6e3:3e4;if(channels.length>a){const s=new Set(S.favCh||[]),i=channels.filter(l=>s.has(l.url)),c=channels.filter(l=>!s.has(l.url));channels=i.concat(c).slice(0,a),A.toast(L("chCapped")+" "+a)}channels.forEach((s,i)=>{s.no=i+1,s.cty=detectCountry(s)});const r=new Map,o=new Map;channels.forEach(s=>{r.set(s.group,(r.get(s.group)||0)+1),s.cty&&o.set(s.cty,(o.get(s.cty)||0)+1)}),groups=[...r].map(([s,i])=>({n:s,c:i})),countries=COUNTRIES.filter(s=>o.has(s.ar)).map(s=>({n:s.ar,label:cName(s),c:o.get(s.ar)})),renderGroups(),renderHome(),$("vod").classList.contains("on")&&loadVodCats(),S.autoCheck&&channels.length&&Date.now()-S.lastCheck>7*864e5&&runCheck(!0)})}function epgUrl(){if(S.epg)return S.epg;const e=xtLists()[0];return e?`${xtBase(e)}/xmltv.php?username=${encodeURIComponent(e.user)}&password=${encodeURIComponent(e.pass)}`:""}const EPG_CAND=e=>[`https://epgshare01.online/epgshare01/epg_ripper_${e.toUpperCase()}1.xml.gz`,`https://iptv-epg.org/files/epg-${e}.xml.gz`,`https://epg.pw/xmltv/epg_${e.toUpperCase()}.xml`],PACK_EPG={"countries/eg.m3u":[EPG_CAND("eg")],"countries/sa.m3u":[EPG_CAND("sa")],"countries/ae.m3u":[EPG_CAND("ae")],"languages/ara.m3u":[EPG_CAND("eg"),EPG_CAND("sa"),EPG_CAND("ae")]},epgKey=e=>String(e||"").toLowerCase().replace(/\(.*?\)|\[.*?\]|\b(hd|fhd|uhd|sd|4k|tv|channel|قناة)\b|\.[a-z]{2}(@.*)?$/g,"").replace(/[^a-z0-9\u0600-\u06ff]/g,"");let epgNorm={};DEF.epgOk={};function fetchFirst(e){return p(this,null,function*(){const t=S.epgOk||{},n=e.slice().sort((a,r)=>(t[r]||0)-(t[a]||0));for(const a of n)try{const r=yield A.fetchEpg(a);if(r&&Object.keys(r).length){const o=Object.assign({},S.epgOk||{});return o[a]=Date.now(),S.epgOk=o,r}}catch(r){}return null})}function loadEpg(){return p(this,null,function*(){const e=[],t=epgUrl();t&&e.push([t]),S.lists.forEach(l=>{Object.keys(PACK_EPG).forEach(u=>{l.url&&l.url.indexOf(u)>=0&&PACK_EPG[u].forEach(f=>e.push(f))})}),tvgUrls.forEach(l=>e.push([l]));const n={},a=e.filter(l=>{const u=l.join("|");return n[u]?!1:(n[u]=1,!0)}).slice(0,6);if(!a.length){epg={},epgNorm={};return}const r=yield Promise.all(a.map(fetchFirst)),o={};r.forEach(l=>{l&&Object.keys(l).forEach(u=>{o[u]||(o[u]=l[u])})});const s={};channels.forEach(l=>{if(l.id){s[l.id]=1;const f=epgKey(l.id);f&&(s["~"+f]=1)}s[l.name]=1;const u=epgKey(l.name);u&&(s["~"+u]=1)});const i=Date.now()+864e5,c=Date.now()-3*36e5;channels.length&&Object.keys(o).forEach(l=>{if(!s[l]&&!s["~"+epgKey(l)]){delete o[l];return}const u=o[l];Array.isArray(u)&&(o[l]=u.filter(f=>f[1]>c&&f[0]<i))}),epg=o,epgNorm={},Object.keys(o).forEach(l=>{const u=epgKey(l);u&&!epgNorm[u]&&(epgNorm[u]=o[l])}),!Object.keys(o).length&&t&&NA&&A.toast("EPG: "+L("loadErr")),renderChannels(),renderHome()})}setInterval(loadEpg,3*36e5);function nowNext(e){const t=epg[e.id]||epg[e.name]||epgNorm[epgKey(e.id)]||epgNorm[epgKey(e.name)];if(!t)return[];const n=Date.now(),a=t.findIndex(r=>r[0]<=n&&r[1]>n);return a<0?[]:[t[a],t[a+1]]}window.nowNext=nowNext;const chByUrl=e=>channels.find(t=>t.url===e)||S.favCh.find(t=>t.url===e)||(S.lastCh&&S.lastCh.url===e?S.lastCh:null)||S.watch.find(t=>t.url===e);window.chByUrl=chByUrl;const isVod=e=>/\.(mp4|mkv|avi|mov|m4v|webm)(\?|$)/i.test(e.url)||/movie|vod|series|film|أفلام|افلام|فيلم|مسلسل/i.test(e.group||""),gkeyOf=e=>["g:"+e.group,e.cty?"c:"+e.cty:null].filter(Boolean);function chAllowed(e){if(isKids()){const t=profile().allowedGroups||[];return gkeyOf(e).some(n=>t.includes(n))}return!S.lockedGroups.includes("g:"+e.group)&&!(e.cty&&S.lockedGroups.includes("c:"+e.cty))}window.chAllowed=chAllowed;const isDead=e=>S.chStatus[e.url]===0;function renderGroups(){if(!channels.length&&!S.favCh.length){$("groups").innerHTML="",$("channels").innerHTML=`<div class="empty">${L("noList")}</div>`;return}const e=isKids(),t=e?profile().allowedGroups||[]:null,n=i=>!e||t.includes(i),a=(i,c,l,u)=>`<div class="it f${i===curGroup?" sel":""}" tabindex="0" data-group="${esc(i)}">${S.lockedGroups.includes(i)?"🔒 ":""}${u?u+" ":""}${esc(c)}<span class="cnt">${l}</span></div>`;let r=a("__all",L("all"),channels.filter(chAllowed).length,"📺")+a("__fav",L("favs"),S.favCh.length,"⭐")+a("__hist",L("lastWatched"),S.chHist.length,"🕘");const o=countries.filter(i=>n("c:"+i.n));o.length&&(r+=`<div class="cath">${L("countries")}</div>`+o.map(i=>a("c:"+i.n,i.label,i.c,"")).join(""));const s=groups.filter(i=>n("g:"+i.n));s.length&&(r+=`<div class="cath">${L("groupsH")}</div>`+s.map(i=>a("g:"+i.n,i.n,i.c,"")).join("")),r+=e?"":`<div class="cath"></div><div class="it f" tabindex="0" id="checkBtn">🩺 ${L("checkCh")}</div>`,$("groups").innerHTML=r,renderChannels()}function currentList(){const e=$("chSearch").value.trim().toLowerCase();let t;return e?t=channels.filter(n=>n.name.toLowerCase().includes(e)||String(n.no)===e):curGroup==="__fav"?t=S.favCh.map(n=>channels.find(a=>a.url===n.url)||n):curGroup==="__hist"?t=S.chHist.map(n=>chByUrl(n)).filter(Boolean):curGroup.startsWith("c:")?t=channels.filter(n=>n.cty===curGroup.slice(2)):curGroup.startsWith("g:")?t=channels.filter(n=>n.group===curGroup.slice(2)):t=channels,t.filter(n=>chAllowed(n)&&!(S.hideDead&&isDead(n)))}function chRow(e){const t=nowNext(e)[0],n=S.chStatus[e.url];return`<div class="chrow f${isDead(e)?" dead":""}${playing&&playing.url===e.url?" playing":""}" tabindex="0" data-chu="${esc(e.url)}">
    <span class="no">${e.no||""}</span>
    <span class="lg${e.logo?"":" none"}">${e.logo?`<img loading="lazy" src="${esc(e.logo)}" onerror="this.parentNode.classList.add('none');this.replaceWith('📺')" alt="">`:"📺"}</span>
    <span class="nm2"><b>${S.favCh.some(a=>a.url===e.url)?"⭐ ":""}${esc(e.name)}</b>${t?`<small>${esc(t[2])}</small>`:e.cty?`<small>${esc(e.cty)} · ${esc(e.group)}</small>`:`<small>${esc(e.group||"")}</small>`}</span>
    <span class="st">${e.xt&&e.xt.arch?"📼 ":""}${n===1?"🟢":n===0?"🔴":""}</span></div>`}let chShown=0;focusHooks.push(e=>{if(!e.dataset||!e.dataset.chu||!e.closest("#channels"))return;const t=$("channels").children;if(!([].indexOf.call(t,e)<t.length-8)&&chShown<playList.length){const n=playList.slice(chShown,chShown+200);chShown+=n.length,$("channels").insertAdjacentHTML("beforeend",n.map(chRow).join(""))}});function renderChannels(){if(!channels.length&&!S.favCh.length)return;const e=currentList();playList=e,chShown=Math.min(e.length,200),$("channels").innerHTML=e.length?e.slice(0,chShown).map(chRow).join(""):`<div class="empty">${L("noRes")}</div>`}function selectGroup(e){const t=S.lockedGroups.includes(e);guard(t,()=>{curGroup=e,$("chSearch").value="",renderGroups(),focus(document.querySelector(`#groups [data-group="${cssq(e)}"]`))})}$("chSearch").addEventListener("input",()=>{clearTimeout(window._sq),window._sq=setTimeout(renderChannels,250)});let pvTimer=null,pvUrl=null;function showPreview(e){$("pvName").textContent=(e.no?e.no+" · ":"")+e.name;const[t,n]=nowNext(e);$("pvNow").textContent=t?`${L("now")}: ${t[2]}  (${fmtTime(new Date(t[0]),1)} - ${fmtTime(new Date(t[1]),1)})`:e.cty||e.group||"",$("pvNext").textContent=n?`${L("next")}: ${n[2]}  ${fmtTime(new Date(n[0]),1)}`:"",$("pvBar").style.width=t?Math.min(100,(Date.now()-t[0])/(t[1]-t[0])*100)+"%":"0",$("pvBar").parentNode.style.display=t?"":"none",$("pvLogo").innerHTML=e.logo?`<img src="${esc(e.logo)}" onerror="this.remove()" alt="">`:"",clearTimeout(pvTimer),S.preview&&!S.lite&&e.url!==pvUrl&&(pvTimer=setTimeout(()=>pvPlay(e),900))}const nativeHls=()=>{const e=S.engine||"auto";if(e==="hls")return!1;const t=!!document.createElement("video").canPlayType("application/vnd.apple.mpegurl");return e==="native"?t:t&&((window.__chromeVer||99)<75||S.lite)};function attach(e,t,n,a){if(n&&n.destroy(),e.onerror=null,/\.m3u8(\?|$)/i.test(t)&&nativeHls()&&!(a&&a.__forceHls)){let r=!1;const o=()=>{if(!r&&(r=!0,e.onerror=null,clearTimeout(s),window.Hls&&Hls.isSupported()&&e.__url===t)){const i=attach(e,t,null,Object.assign({},a||{},{__forceHls:1}));e===$("video")?hls=i:pvHls=i}},s=setTimeout(()=>{e.readyState<2&&e.__url===t&&o()},9e3);return e.__url=t,e.onerror=o,e.onplaying=e.onplaying||null,e.src=t,e.play().catch(()=>{}),null}if(e.__url=t,/\.m3u8(\?|$)/i.test(t)&&window.Hls&&Hls.isSupported()){const r=Object.assign({maxBufferLength:S.lite?12:20,backBufferLength:S.lite?4:10,maxMaxBufferLength:30,enableWorker:!0,startLevel:S.lite?0:-1,capLevelToPlayerSize:!0},a||{});delete r.__forceHls;const o=new Hls(r);return o.loadSource(t),o.attachMedia(e),o.on(Hls.Events.ERROR,(s,i)=>{i.fatal&&(i.type===Hls.ErrorTypes.NETWORK_ERROR?o.startLoad():i.type===Hls.ErrorTypes.MEDIA_ERROR&&o.recoverMediaError())}),e.play().catch(()=>{}),o}return e.src=t,e.play().catch(()=>{}),null}function pvPlay(e){if(!$("tv").classList.contains("on")||on("player"))return;pvUrl=e.url;const t=$("pvVideo");t.muted=!1,t.volume=.6,$("pvVideo").parentNode.classList.remove("playing"),t.onplaying=()=>t.parentNode.classList.add("playing"),pvHls=attach(t,e.url,pvHls,{maxBufferLength:8})}function pvStop(){clearTimeout(pvTimer),pvUrl=null,pvHls&&(pvHls.destroy(),pvHls=null);const e=$("pvVideo");e.onplaying=null,e.pause(),e.removeAttribute("src"),e.load(),e.parentNode.classList.remove("playing")}pageHooks["tv:leave"]=pvStop,focusHooks.push(e=>{if(e.dataset.chu&&e.closest("#tv")){const t=chByUrl(e.dataset.chu);t&&showPreview(t)}});function playUrl(e){const t=chByUrl(e);if(!t)return;if(!playList.some(a=>a.url===e)){const a=channels.filter(r=>r.group===t.group&&chAllowed(r));playList=a.length?a:[t]}const n=S.lockedGroups.includes("g:"+t.group)||t.cty&&S.lockedGroups.includes("c:"+t.cty);guard(n,()=>play(t))}let saveT=0,nextT=null;const isLive=e=>!e.kind;function play(e){if(!window.Hls&&/\.m3u8(\?|$)/i.test(e.url||"")&&window.loadHls){loadHls().then(()=>play(e));return}if(pvStop(),clearTimeout(nextT),playing=e,isLive(e)&&(S.lastCh={name:e.name,url:e.url,logo:e.logo,group:e.group,id:e.id,no:e.no},S.chHist=[e.url,...S.chHist.filter(s=>s!==e.url)].slice(0,30)),statStart(e),S.ext){A.playExternal(e.url),setTimeout(renderHome,500);return}const t=$("video");$("player").classList.add("on"),$("plist").classList.remove("on"),applyAspect(),t.playbackRate=1,showInfo();const n=isLive(e)?{liveDurationInfinity:!0,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1e5,maxBufferSize:6e7}:{maxBufferLength:40};hls=attach(t,e.url,hls,n),hls=hls||null;let a=!1;const r=()=>{a||playing!==e||(a=!0,dialog("⚠️ "+L("playErr"),[{icon:"↗",label:L("external"),pri:1,fn:()=>{A.playExternal(e.url)}},{icon:"🔄",label:L("retry"),fn:()=>play(e)}]))};hls||(t.onerror=r),clearTimeout(window.__pwd),window.__pwd=setTimeout(()=>{playing===e&&t.readyState<2&&!t.paused&&r()},15e3);const o=S.watch.find(s=>s.key==="url:"+e.url);t.onloadedmetadata=()=>{o&&o.pos>20&&isFinite(t.duration)&&o.pos<t.duration-30&&(t.currentTime=o.pos,banner("⏯️",L("resumed")+" "+fmtDur(o.pos)))},t.ontimeupdate=()=>{if(!(!isFinite(t.duration)||t.duration<120||Date.now()-saveT<1e4)){if(saveT=Date.now(),t.currentTime/t.duration>.95){markSeen(e);return}t.currentTime>30&&watchUpsert({key:"url:"+e.url,type:"vod",kind:e.kind||"movie",meta:e.meta,url:e.url,name:e.name,logo:e.meta&&e.meta.poster||e.logo,pos:Math.floor(t.currentTime),dur:Math.floor(t.duration)})}},t.onended=()=>{markSeen(e),e.next&&(banner("⏭️",L("nextEp"),L("nextEpSub"),8e3),nextT=setTimeout(()=>{on("player")&&playing===e&&e.next()},8e3))},t.onpause=()=>{hls&&isLive(e)&&(hls.config.maxBufferLength=hls.config.maxMaxBufferLength=S.lite?90:300,hls.config.maxBufferSize=S.lite?6e7:15e7),showInfo()},t.onplay=()=>showInfo(),document.querySelectorAll(".chrow.playing").forEach(s=>s.classList.remove("playing"))}function markSeen(e){S.watch=S.watch.filter(t=>t.key!=="url:"+e.url),e.kind==="episode"&&!S.seen.includes(e.url)&&(S.seen=[...S.seen,e.url].slice(-3e3))}let infoT=null;function showInfo(){const e=playing;if(!e)return;const[t,n]=nowNext(e);$("pNum").textContent=isLive(e)&&e.no||"",$("pName").textContent=e.name,$("pLogo").src=e.logo||"",$("pLogo").style.display=e.logo?"":"none",$("pNow").textContent=t?`${L("now")}: ${t[2]}`:"",$("pNext").textContent=n?`${L("next")}: ${n[2]}`:"",$("pBar").style.width=t?Math.min(100,(Date.now()-t[0])/(t[1]-t[0])*100)+"%":"0",$("pBar").parentNode.style.display=t?"":"none";const a=$("video");!isLive(e)&&isFinite(a.duration)&&a.duration>0&&($("pNow").textContent=`${fmtDur(a.currentTime)} / ${fmtDur(a.duration)}`,$("pBar").style.width=a.currentTime/a.duration*100+"%",$("pBar").parentNode.style.display="");const r=hls&&isLive(e)&&hls.liveSyncPosition?hls.liveSyncPosition-a.currentTime:0;$("pState").textContent=a.paused?"⏸ "+L("paused"):r>15?`⏪ ${L("behindLive")} ${fmtDur(r)}`:"",$("pInfo").style.opacity=1,clearTimeout(infoT),a.paused||(infoT=setTimeout(()=>$("pInfo").style.opacity=0,4e3))}function stopPlayer(){clearTimeout(nextT),statStop();const e=$("video");e.ontimeupdate&&(saveT=0,e.ontimeupdate()),e.onpause=e.onplay=e.onended=null,hls&&(hls.destroy(),hls=null),e.onerror=e.ontimeupdate=e.onloadedmetadata=null,e.pause(),e.removeAttribute("src"),e.load(),$("player").classList.remove("on"),$("plist").classList.remove("on"),renderHome(),renderChannels(),focus(playing&&document.querySelector(`.page.on [data-chu="${cssq(playing.url)}"]`)||fallbackFocus())}window.stopPlayer=stopPlayer;function zap(e){if(!playList.length||!playing)return;let t=playList.findIndex(n=>n.url===playing.url)+e;t<0&&(t=playList.length-1),t>=playList.length&&(t=0),play(playList[t])}function openPlist(){$("plistTitle").textContent=L("chList"),$("plistItems").innerHTML=playList.slice(0,1500).map(chRow).join(""),$("plist").classList.add("on"),focus($("plistItems").querySelector(`[data-chu="${cssq(playing.url)}"]`)||$("plistItems").querySelector(".f"))}let numBuf="",numT=null;function numKey(e,t){numBuf=(numBuf+e).slice(-4);const n=$("numEntry");n.textContent=numBuf+"_",n.classList.add("on"),clearTimeout(numT),numT=setTimeout(()=>{const a=+numBuf;numBuf="",n.classList.remove("on"),t(a)},1400)}function gotoNumber(e){const t=channels.find(n=>n.no===e);if(!t){A.toast(L("noRes"));return}chAllowed(t)&&(playList.includes(t)||(playList=channels.filter(chAllowed)),play(t))}let pHold=null,pHeld=!1;layers.unshift({test:()=>on("player")&&!on("dlg"),ownsEnter:!0,key(e){const t=e.key,n=$("plist").classList.contains("on"),a=$("video");if(isBack(t)||t==="Backspace")return e.preventDefault&&e.preventDefault(),clearTimeout(nextT),n?($("plist").classList.remove("on"),focused=null,showInfo()):stopPlayer(),!0;if(/^[0-9]$/.test(t)&&isLive(playing))return numKey(t,gotoNumber),!0;if(n){if(t==="Enter"||t===" "){if(e.preventDefault(),focused&&focused.dataset.chu){const r=chByUrl(focused.dataset.chu);$("plist").classList.remove("on"),r&&play(r)}return!0}return!1}if(t==="Enter"||t===" ")return e.preventDefault&&e.preventDefault(),e.repeat||(pHeld=!1,clearTimeout(pHold),pHold=setTimeout(()=>{pHeld=!0,playerMenu()},650)),!0;if(t==="ContextMenu"||t==="Menu")return playerMenu(),!0;if(isLive(playing)){if(t==="ArrowUp"||t==="ChannelUp"||t==="PageUp")return e.preventDefault(),zap(-1),!0;if(t==="ArrowDown"||t==="ChannelDown"||t==="PageDown")return e.preventDefault(),zap(1),!0}if(t==="ArrowRight"||t==="ArrowLeft"||t==="MediaFastForward"||t==="MediaRewind"){const r=t==="MediaFastForward"||t==="ArrowRight"==(S.lang!=="ar");if(isFinite(a.duration)||hls&&isLive(playing)){const o=isFinite(a.duration)?a.duration:hls.liveSyncPosition||a.currentTime;a.currentTime=Math.max(0,Math.min(o,a.currentTime+(r?30:-15)))}return showInfo(),!0}return t==="MediaPlayPause"||t==="MediaPlay"||t==="MediaPause"?(a.paused?a.play():a.pause(),!0):(showInfo(),!0)},keyup(e){if(e.key!=="Enter"&&e.key!==" "||$("plist").classList.contains("on"))return;if(clearTimeout(pHold),pHeld){pHeld=!1;return}const t=$("video");isLive(playing)&&!t.paused?openPlist():t.paused?t.play():t.pause()}});const ASPECTS=[["contain","aFit"],["cover","aFill"],["fill","aStretch"],["zoom","aZoom"]];function applyAspect(){const e=$("video"),t=S.aspect||"contain";e.style.objectFit=t==="zoom"?"cover":t,e.style.transform=t==="zoom"?"scale(1.18)":""}function playerMenu(){const e=$("video"),t=playing,n=[];n.push({icon:e.paused?"▶️":"⏸",label:e.paused?L("resume"):L("pause"),fn:()=>{e.paused?e.play():e.pause()}}),hls&&isLive(t)&&hls.liveSyncPosition&&hls.liveSyncPosition-e.currentTime>15&&n.push({icon:"🔴",label:L("goLive"),fn:()=>{e.currentTime=hls.liveSyncPosition,e.play()}}),(hls?hls.audioTracks||[]:[]).length>1&&n.push({icon:"🔊",label:L("audioTrack"),fn:()=>setTimeout(()=>trackMenu("audio"),30)});const r=hls?hls.subtitleTracks||[]:[],o=[...e.textTracks||[]];(r.length||o.length)&&n.push({icon:"💬",label:L("subtitles"),fn:()=>setTimeout(()=>trackMenu("sub"),30)}),n.push({icon:"🖥️",label:L("aspect"),fn:()=>setTimeout(()=>dialog(L("aspect"),ASPECTS.map(([s,i])=>({label:L(i),pri:(S.aspect||"contain")===s,fn:()=>{S.aspect=s,applyAspect()}})),{grid:4}),30)}),isLive(t)||n.push({icon:"⏩",label:`${L("speed")} ${e.playbackRate}x`,fn:()=>setTimeout(()=>dialog(L("speed"),[.75,1,1.25,1.5,2].map(s=>({label:s+"x",pri:e.playbackRate===s,fn:()=>{e.playbackRate=s}})),{grid:5}),30)}),t.xt&&t.xt.arch&&n.push({icon:"📼",label:L("catchup"),fn:()=>setTimeout(()=>catchupMenu(t),30)}),t.next&&n.push({icon:"⏭️",label:L("nextEp"),fn:()=>t.next()}),n.push({icon:"↗",label:L("external"),fn:()=>A.playExternal(t.url)},{icon:"😴",label:L("sleepT"),fn:()=>setTimeout(sleepMenu,30)}),dialog(t.name,n,{grid:4})}function trackMenu(e){const t=$("video");if(e==="audio"){const r=hls.audioTracks;dialog(L("audioTrack"),r.map((o,s)=>({label:o.name||o.lang||"#"+(s+1),pri:hls.audioTrack===s,fn:()=>{hls.audioTrack=s}})),{grid:3});return}const n=hls?hls.subtitleTracks||[]:[];if(n.length){dialog(L("subtitles"),[{label:L("off"),pri:hls.subtitleTrack<0,fn:()=>{hls.subtitleTrack=-1,hls.subtitleDisplay=!1}},...n.map((r,o)=>({label:r.name||r.lang||"#"+(o+1),pri:hls.subtitleTrack===o,fn:()=>{hls.subtitleTrack=o,hls.subtitleDisplay=!0}}))],{grid:3});return}const a=[...t.textTracks||[]];dialog(L("subtitles"),[{label:L("off"),fn:()=>a.forEach(r=>r.mode="disabled")},...a.map((r,o)=>({label:r.label||r.language||"#"+(o+1),pri:r.mode==="showing",fn:()=>a.forEach((s,i)=>s.mode=i===o?"showing":"disabled")}))],{grid:3})}function catchupMenu(e){const t=epg[e.id]||epg[e.name]||[],n=Date.now(),a=n-Math.max(1,e.xt.days||1)*864e5,r=t.filter(o=>o[1]<n&&o[0]>a).reverse();if(!r.length){A.toast(L("noCatchup"));return}dialog(`📼 ${e.name}`,r.slice(0,40).map(o=>({label:`${fmtTime(new Date(o[0]),1)} · ${o[2]}`,fn:()=>play({name:`${e.name} · ${o[2]}`,url:catchupUrl(e,o[0],o[1]),logo:e.logo,group:e.group,kind:"catchup"})})))}keyHooks.push(e=>/^[0-9]$/.test(e.key)&&$("tv").classList.contains("on")&&!on("dlg")&&!(document.activeElement&&document.activeElement.tagName==="INPUT")?(numKey(e.key,t=>{const n=channels.find(r=>r.no===t);if(!n)return A.toast(L("noRes"));let a=document.querySelector(`#channels [data-chu="${cssq(n.url)}"]`);a||(curGroup="__all",$("chSearch").value="",renderGroups(),a=document.querySelector(`#channels [data-chu="${cssq(n.url)}"]`)),a&&focus(a)}),!0):!1);function chMenu(e){const t=chByUrl(e);if(!t)return;const n=S.favCh.some(s=>s.url===e),a="url:"+e,r=S.watch.some(s=>s.key===a),o=[{label:L("open"),pri:1,fn:()=>playUrl(e)},{label:n?L("remFavCh"):L("addFavCh"),fn:()=>{S.favCh=n?S.favCh.filter(s=>s.url!==e):[...S.favCh,{name:t.name,url:t.url,logo:t.logo,group:t.group,id:t.id,no:t.no}],renderHome(),renderGroups()}},{label:r?L("remWatch"):L("addWatch"),fn:()=>{r?watchRemove(a):(watchUpsert({key:a,type:isVod(t)?"vod":"live",url:t.url,name:t.name,logo:t.logo,pos:0,dur:0}),renderHome())}},{label:L("cancel"),fn:()=>{}}];t.xt&&t.xt.arch&&o.splice(1,0,{label:"📼 "+L("catchup"),fn:()=>setTimeout(()=>catchupMenu(t),30)}),dialog(t.name,o)}function groupMenu(e){if(e.startsWith("__")||isKids())return;const t=S.lockedGroups.includes(e);dialog(e.slice(2),[{label:t?L("unlockGroup"):L("lockGroup"),fn:()=>{if(!S.pin){A.toast(L("needPin"));return}guard(!0,()=>{toggleList("lockedGroups",e),renderGroups()})}},{label:L("cancel"),fn:()=>{}}])}optionHandlers.push(e=>e.dataset.chu&&!e.dataset.wk?(chMenu(e.dataset.chu),!0):e.dataset.group!==void 0?(groupMenu(e.dataset.group),!0):!1),activators.push(e=>e.dataset.chu?(playUrl(e.dataset.chu),!0):e.dataset.group!==void 0?(selectGroup(e.dataset.group),!0):e.id==="checkBtn"?(runCheck(!1),!0):!1);let checking=!1;function runCheck(e){return p(this,null,function*(){if(checking)return;const t=(curGroup==="__all"||e?channels:currentList()).slice(0,4e3);if(t.length){checking=!0,e||banner("🩺",L("checking"),t.length+" ...");try{const n=yield A.checkStreams(t.map(s=>s.url)),a=S.chStatus;let r=0,o=0;Object.keys(n).forEach(s=>{a[s]=n[s]?1:0,n[s]?r++:o++}),S.chStatus=a,S.lastCheck=Date.now(),banner("✅",L("checkDone"),`🟢 ${r} ${L("working")} · 🔴 ${o} ${L("dead")}`,9e3),renderGroups()}catch(n){e||A.toast(n.message)}checking=!1}})}window.onCheckProgress=(e,t)=>{const n=document.querySelector("#checkBtn");n&&(n.textContent=`🩺 ${L("checking")} ${e}/${t}`)};

;
/* vod.js */
"use strict";var c=(e,s,t)=>new Promise((n,i)=>{var o=d=>{try{r(t.next(d))}catch(l){i(l)}},a=d=>{try{r(t.throw(d))}catch(l){i(l)}},r=d=>d.done?n(d.value):Promise.resolve(d.value).then(o,a);r((t=t.apply(e,s)).next())});const xtBase=e=>String(e.server||"").trim().replace(/\/+$/,"").replace(/\/player_api\.php.*$/,""),xtApi=(e,s,t)=>`${xtBase(e)}/player_api.php?username=${encodeURIComponent(e.user)}&password=${encodeURIComponent(e.pass)}${s?"&action="+s:""}${t||""}`,xtLists=()=>S.lists.map((e,s)=>Object.assign({li:s},e)).filter(e=>e.type==="xtream");function xtUrl(e,s,t,n){const i=xtBase(e),o=encodeURIComponent(e.user),a=encodeURIComponent(e.pass);return`${i}/${s}/${o}/${a}/${t}.${n||"mp4"}`}function loadXtreamLive(e,s){return c(this,null,function*(){const[t,n]=yield Promise.all([A.fetchJSON(xtApi(e,"get_live_categories")),A.fetchJSON(xtApi(e,"get_live_streams"))]),i={};return(t||[]).forEach(o=>i[o.category_id]=o.category_name),(n||[]).map(o=>({name:o.name,logo:o.stream_icon||"",group:i[o.category_id]||e.name,id:o.epg_channel_id||o.name,country:"",list:e.name,url:xtUrl(e,"live",o.stream_id,"m3u8"),xt:{li:s,sid:o.stream_id,arch:+o.tv_archive||0,days:+o.tv_archive_duration||0}}))})}function catchupUrl(e,s,t){const n=S.lists[e.xt.li];if(!n)return"";const i=new Date(s),o=Math.max(1,Math.round((t-s)/6e4)),a=`${i.getFullYear()}-${pad(i.getMonth()+1)}-${pad(i.getDate())}:${pad(i.getHours())}-${pad(i.getMinutes())}`;return`${xtBase(n)}/timeshift/${encodeURIComponent(n.user)}/${encodeURIComponent(n.pass)}/${o}/${a}/${e.xt.sid}.ts`}let vodCats=[],vodItems=[],vodCat=null,vodShown=0,vodLoaded=!1,m3uVod=[];const VOD_PAGE=90;function loadVodCats(){return c(this,null,function*(){const e=[];for(const t of xtLists())try{const[n,i]=yield Promise.all([A.fetchJSON(xtApi(t,"get_vod_categories")),A.fetchJSON(xtApi(t,"get_series_categories"))]);(n||[]).forEach(o=>e.push({key:`m:${t.li}:${o.category_id}`,label:o.category_name,kind:"movie",li:t.li,cid:o.category_id})),(i||[]).forEach(o=>e.push({key:`s:${t.li}:${o.category_id}`,label:o.category_name,kind:"series",li:t.li,cid:o.category_id}))}catch(n){A.toast(L("loadErr")+": "+t.name)}const s=new Map;m3uVod.forEach(t=>s.set(t.cat,(s.get(t.cat)||0)+1)),[...s].forEach(([t,n])=>e.push({key:"u:"+t,label:t,kind:"movie",count:n})),vodCats=e,vodLoaded=!0,renderVodCats()})}function vodAllowedCat(e){return isKids()?(profile().allowedGroups||[]).includes("v:"+e.key):!S.lockedGroups.includes("v:"+e.key)}function renderVodCats(){const e=$("vodCats");if(!vodCats.length&&!S.watch.some(o=>o.kind)){e.innerHTML="",$("vodGrid").innerHTML=`<div class="empty">${L("vodEmpty")}</div>`;return}const s=(o,a,r)=>`<div class="it f${o===vodCat?" sel":""}" tabindex="0" data-vcat="${esc(o)}">${S.lockedGroups.includes("v:"+o)?"🔒 ":""}${r||""} ${esc(a)}</div>`;let t=s("__cont",L("continueW"),"⏯️")+s("__my",L("myList"),"⭐");const n=vodCats.filter(o=>o.kind==="movie"&&vodAllowedCat(o)),i=vodCats.filter(o=>o.kind==="series"&&vodAllowedCat(o));n.length&&(t+=`<div class="cath">🎬 ${L("movies")}</div>`+n.map(o=>s(o.key,o.label)).join("")),i.length&&(t+=`<div class="cath">📺 ${L("series")}</div>`+i.map(o=>s(o.key,o.label)).join("")),e.innerHTML=t,vodCat||selectVodCat("__cont",!0)}function selectVodCat(e,s){return c(this,null,function*(){vodCat=e,vodShown=0,$("vodGrid").innerHTML=`<div class="empty">${L("loading")}</div>`,document.querySelectorAll("#vodCats .it").forEach(t=>t.classList.toggle("sel",t.dataset.vcat===e));try{if(e==="__cont")vodItems=S.watch.filter(t=>t.kind).map(t=>Object.assign({fromWatch:1},t.meta||{},{name:t.name,poster:t.logo,url:t.url,kind:t.kind==="episode"?"episode":"movie",wkey:t.key}));else if(e==="__my")vodItems=S.myList.slice();else if(e.startsWith("u:"))vodItems=m3uVod.filter(t=>t.cat===e.slice(2));else{const t=vodCats.find(a=>a.key===e),n=S.lists[t.li],i=t.kind==="movie";vodItems=((yield A.fetchJSON(xtApi(n,i?"get_vod_streams":"get_series","&category_id="+encodeURIComponent(t.cid))))||[]).map(a=>i?{kind:"movie",li:t.li,id:a.stream_id,name:a.name,poster:a.stream_icon||"",rating:a.rating||"",ext:a.container_extension||"mp4",year:a.added?new Date(+a.added*1e3).getFullYear():""}:{kind:"series",li:t.li,id:a.series_id,name:a.name,poster:a.cover||"",rating:a.rating||"",year:(a.releaseDate||"").slice(0,4),plot:a.plot||""})}}catch(t){vodItems=[],A.toast(L("loadErr"))}if(vodCat===e&&($("vodGrid").innerHTML="",moreVod(),!s)){const t=$("vodGrid").querySelector(".f");t&&focus(t)}})}function posterHtml(e){const s=e.url&&S.watch.find(n=>n.url===e.url),t=s&&s.dur?Math.min(100,s.pos/s.dur*100):0;return`<div class="poster f" tabindex="0" data-vod="${esc(JSON.stringify({k:e.kind,li:e.li,id:e.id,u:e.url||"",wk:e.wkey||""}))}">
    ${e.poster?`<img loading="lazy" src="${esc(e.poster)}" onerror="this.remove()" alt="">`:""}<div class="pname">${esc(e.name)}</div>
    ${e.rating&&+e.rating?`<span class="prate">★ ${(+e.rating).toFixed(1)}</span>`:""}${t?`<div class="prog"><i style="width:${t}%"></i></div>`:""}</div>`}function moreVod(){const e=$("vodGrid"),s=e.querySelector(".vmore");if(s&&s.remove(),!vodItems.length){e.innerHTML=`<div class="empty">${L("noRes")}</div>`;return}const t=vodItems.slice(vodShown,vodShown+VOD_PAGE);vodShown+=t.length,e.insertAdjacentHTML("beforeend",t.map(posterHtml).join("")+(vodShown<vodItems.length?`<button class="btn f vmore">⬇ ${L("more")} (${vodItems.length-vodShown})</button>`:""))}const vodRef=e=>{try{return JSON.parse(e.dataset.vod)}catch(s){return null}},vodFind=e=>vodItems.find(s=>e.u&&s.url===e.u||s.kind===e.k&&s.li===e.li&&String(s.id)===String(e.id));focusHooks.push(e=>{if(!e.dataset.vod)return;const s=vodFind(vodRef(e));if(!s)return;$("vodHeroTitle").textContent=s.name,$("vodHeroMeta").textContent=[s.year,s.rating&&+s.rating?"★ "+(+s.rating).toFixed(1):"",s.kind==="series"?L("series"):L("movie")].filter(Boolean).join(" · "),$("vodHeroPlot").textContent=s.plot||"",$("vodHero").style.backgroundImage=s.poster?`url("${s.poster}")`:"";const t=$("vodGrid").querySelectorAll(".poster");t.length&&[...t].indexOf(e)>t.length-12&&vodShown<vodItems.length&&moreVod()});let detail=null,detailReturn=null;function openDetail(e){return c(this,null,function*(){if(detailReturn=focused,detail={v:e,info:null,seasons:{},season:null},$("detail").classList.add("on"),$("dTitle").textContent=e.name,$("dMeta").textContent="",$("dPlot").textContent=e.plot||L("loading"),$("dPoster").style.backgroundImage=e.poster?`url("${e.poster}")`:"",$("dBack").style.backgroundImage=e.poster?`url("${e.poster}")`:"",$("dEps").innerHTML="",$("dSeasons").innerHTML="",renderDetailBtns(),focus($("dBtns").querySelector(".f")),e.li==null||e.kind==="episode"&&!e.id){$("dPlot").textContent=e.plot||"";return}try{const t=S.lists[e.li];if(e.kind==="movie"){const n=yield A.fetchJSON(xtApi(t,"get_vod_info","&vod_id="+e.id)),i=n.info||{};detail.info=i,n.movie_data&&n.movie_data.container_extension&&(e.ext=n.movie_data.container_extension),fillDetail(i.plot||i.description,[i.releasedate||i.release_date||e.year,i.genre,i.duration,i.rating?"★ "+i.rating:""],i.backdrop_path&&i.backdrop_path[0]||i.movie_image||i.cover_big,i.cast?L("cast")+": "+i.cast:"")}else{const n=yield A.fetchJSON(xtApi(t,"get_series_info","&series_id="+(e.sid||e.id))),i=n.info||{};detail.info=i,detail.seasons=n.episodes||{};const o=Object.keys(detail.seasons).sort((a,r)=>a-r);detail.season=e.season&&detail.seasons[e.season]?String(e.season):o[0],fillDetail(i.plot,[(i.releaseDate||"").slice(0,4),i.genre,i.rating?"★ "+i.rating:"",o.length+" "+L("seasons")],i.backdrop_path&&i.backdrop_path[0]||i.cover,i.cast?L("cast")+": "+i.cast:""),renderSeasons(),renderDetailBtns()}}catch(t){$("dPlot").textContent=e.plot||""}})}function fillDetail(e,s,t,n){$("dPlot").textContent=(e||"")+(n?`

`+n:""),$("dMeta").textContent=s.filter(Boolean).join(" · "),t&&($("dBack").style.backgroundImage=`url("${t}")`)}function movieUrl(e){return e.url||xtUrl(S.lists[e.li],"movie",e.id,e.ext||"mp4")}function renderDetailBtns(){const e=detail.v,s=S.myList.some(n=>n.kind===e.kind&&String(n.id)===String(e.id)&&n.url===e.url);let t="";if(e.kind==="movie"){const n=movieUrl(e),i=S.watch.find(o=>o.url===n);i&&i.pos>30?t+=`<button class="btn pri f" data-dact="resume">⏯ ${L("resumeAt")} ${fmtDur(i.pos)}</button><button class="btn f" data-dact="play0">▶ ${L("fromStart")}</button>`:t+=`<button class="btn pri f" data-dact="play0">▶ ${L("play")}</button>`}else if(e.kind==="series"){const n=nextUnwatched();n&&(t+=`<button class="btn pri f" data-dact="ep:${esc(n.s)}:${n.i}">▶ ${L("season")} ${esc(n.s)} · ${L("episode")} ${esc(n.e.episode_num)}</button>`)}t+=`<button class="btn f" data-dact="my">${s?"✓ "+L("inMyList"):"＋ "+L("myList")}</button><button class="btn f" data-dact="ext">↗ ${L("external")}</button>`,$("dBtns").innerHTML=t}function renderSeasons(){const e=Object.keys(detail.seasons).sort((n,i)=>n-i);$("dSeasons").innerHTML=e.map(n=>`<button class="btn sm f${n===detail.season?" pri":""}" data-season="${esc(n)}">${L("season")} ${esc(n)}</button>`).join("");const s=detail.seasons[detail.season]||[],t=S.lists[detail.v.li];$("dEps").innerHTML=s.map((n,i)=>{const o=xtUrl(t,"series",n.id,n.container_extension),a=S.watch.find(l=>l.url===o),r=a&&a.dur?a.pos/a.dur*100:(S.seen||[]).includes(o)?100:0,d=n.info||{};return`<div class="ep f" tabindex="0" data-ep="${esc(detail.season)}:${i}">${d.movie_image?`<img loading="lazy" src="${esc(d.movie_image)}" onerror="this.remove()" alt="">`:`<span class="epn">${esc(n.episode_num)}</span>`}
      <div class="ept"><b>${esc(n.episode_num)}. ${esc(n.title||"")}</b><small>${esc(d.duration||"")}${d.plot?" · "+esc(d.plot):""}</small>${r?`<div class="prog"><i style="width:${r}%"></i></div>`:""}</div></div>`}).join("")}function nextUnwatched(){const e=Object.keys(detail.seasons).sort((n,i)=>n-i),s=S.lists[detail.v.li],t=S.seen||[];for(const n of e){const i=detail.seasons[n];for(let o=0;o<i.length;o++){const a=xtUrl(s,"series",i[o].id,i[o].container_extension);if(!t.includes(a))return{s:n,i:o,e:i[o]}}}return e.length?{s:e[0],i:0,e:detail.seasons[e[0]][0]}:null}function playEpisode(e,s){const t=detail.v,n=S.lists[t.li],i=detail.seasons[e]||[],o=i[s];if(!o)return;const a=Object.keys(detail.seasons).sort((l,u)=>l-u);let r=null;if(s+1<i.length)r={s:e,i:s+1};else{const l=a[a.indexOf(e)+1];l&&(r={s:l,i:0})}const d={v:t,seasons:detail.seasons};playVod({kind:"episode",name:`${t.name} · ${L("season")[0]}${e} ${L("episode")[0]}${o.episode_num}`,url:xtUrl(n,"series",o.id,o.container_extension),logo:o.info&&o.info.movie_image||t.poster,meta:{kind:"episode",li:t.li,sid:t.id,season:e,name:t.name,poster:t.poster},next:r?()=>{detail=detail&&detail.v===t?detail:Object.assign({},d,{season:r.s}),playEpisode(r.s,r.i)}:null})}function playVod(e){closeDetail(!0),play({name:e.name,url:e.url,logo:e.logo,group:"",kind:e.kind,meta:e.meta,next:e.next})}function closeDetail(e){if($("detail").classList.remove("on"),!e){const s=detailReturn;focus(s&&document.body.contains(s)?s:fallbackFocus())}}layers.push({test:()=>on("detail")&&!on("dlg")&&!on("player"),key(e){return isBack(e.key)||e.key==="Backspace"?(e.preventDefault&&e.preventDefault(),closeDetail(),!0):!1}}),activators.push(e=>{if(e.dataset.vcat!==void 0)return guard(S.lockedGroups.includes("v:"+e.dataset.vcat),()=>selectVodCat(e.dataset.vcat)),!0;if(e.classList.contains("vmore")){const s=vodShown;moreVod();const t=$("vodGrid").querySelectorAll(".poster")[s];return t&&focus(t),!0}if(e.dataset.vod){const s=vodRef(e),t=vodFind(s);return t?t.fromWatch&&t.kind==="episode"&&t.sid?(openDetail({kind:"series",li:t.li,id:t.sid,name:t.name.split(" · ")[0],poster:t.poster,season:t.season}),!0):(openDetail(t),!0):!0}if(e.dataset.season)return detail.season=e.dataset.season,renderSeasons(),focus($("dSeasons").querySelector(`[data-season="${cssq(e.dataset.season)}"]`)),!0;if(e.dataset.ep){const[s,t]=e.dataset.ep.split(":");return playEpisode(s,+t),!0}if(e.dataset.dact){const s=e.dataset.dact,t=detail.v;if(s==="resume"||s==="play0"){const n=movieUrl(t);s==="play0"&&(S.watch=S.watch.filter(i=>i.url!==n)),playVod({kind:"movie",name:t.name,url:n,logo:t.poster,meta:{kind:"movie",li:t.li,id:t.id,name:t.name,poster:t.poster}})}else if(s.startsWith("ep:")){const[,n,i]=s.split(":");playEpisode(n,+i)}else if(s==="my"){const n=i=>i.kind===t.kind&&String(i.id)===String(t.id)&&i.url===t.url;S.myList=S.myList.some(n)?S.myList.filter(i=>!n(i)):[{kind:t.kind,li:t.li,id:t.id,name:t.name,poster:t.poster,url:t.url,rating:t.rating,year:t.year},...S.myList],renderDetailBtns(),focus($("dBtns").querySelector('[data-dact="my"]'))}else if(s==="ext")if(t.kind==="movie")A.playExternal(movieUrl(t));else{const n=nextUnwatched();n&&A.playExternal(xtUrl(S.lists[t.li],"series",n.e.id,n.e.container_extension))}return!0}return!1}),optionHandlers.push(e=>{if(!e.dataset.vcat||e.dataset.vcat.startsWith("__")||isKids())return!1;const s="v:"+e.dataset.vcat,t=S.lockedGroups.includes(s);return dialog(e.textContent.trim(),[{label:t?L("unlockGroup"):L("lockGroup"),fn:()=>{if(!S.pin){A.toast(L("needPin"));return}guard(!0,()=>{toggleList("lockedGroups",s),renderVodCats()})}},{label:L("cancel"),fn:()=>{}}]),!0}),pageHooks["vod:enter"]=()=>{vodLoaded?(vodCat==="__cont"||vodCat==="__my")&&selectVodCat(vodCat,!0):loadVodCats()};

;
/* extras.js */
"use strict";var p=(e,t,n)=>new Promise((a,s)=>{var o=c=>{try{i(n.next(c))}catch(r){s(r)}},l=c=>{try{i(n.throw(c))}catch(r){s(r)}},i=c=>c.done?a(c.value):Promise.resolve(c.value).then(o,l);i((n=n.apply(e,t)).next())});const WMO=e=>e===0?"☀️":e<=2?"🌤️":e===3?"☁️":e<=48?"🌫️":e<=67?"🌧️":e<=77?"❄️":e<=82?"🌦️":"⛈️";let weatherNow=null;function locate(){return p(this,null,function*(){const e=yield A.fetchJSON("https://geocoding-api.open-meteo.com/v1/search?count=1&name="+encodeURIComponent(S.city));if(!e.results)throw new Error("city");const t=e.results[0];return S.loc={lat:t.latitude,lon:t.longitude,name:t.name,city:S.city},S.loc})}function weather(){return p(this,null,function*(){try{let e=S.loc;(!e||e.city!==S.city)&&(e=yield locate());const t=yield A.fetchJSON(`https://api.open-meteo.com/v1/forecast?latitude=${e.lat}&longitude=${e.lon}&current=temperature_2m,weather_code`);weatherNow={t:Math.round(t.current.temperature_2m),i:WMO(t.current.weather_code),city:e.name},$("wTemp").textContent=weatherNow.t+"°",$("wIcon").textContent=weatherNow.i,$("wCity").textContent=e.name,computePrayers(),updateTicker()}catch(e){}})}setInterval(weather,30*6e4);const METHODS={egypt:{fajr:19.5,isha:17.5},makkah:{fajr:18.5,ishaMin:90},mwl:{fajr:18,isha:17},karachi:{fajr:18,isha:18}},rad=e=>e*Math.PI/180,deg=e=>e*180/Math.PI,dsin=e=>Math.sin(rad(e)),dcos=e=>Math.cos(rad(e)),dtan=e=>Math.tan(rad(e)),darcsin=e=>deg(Math.asin(e)),darccos=e=>deg(Math.acos(Math.max(-1,Math.min(1,e)))),darctan2=(e,t)=>deg(Math.atan2(e,t)),darccot=e=>deg(Math.atan(1/e)),fixA=e=>e-360*Math.floor(e/360),fixH=e=>e-24*Math.floor(e/24);function julian(e,t,n){t<=2&&(e-=1,t+=12);const a=Math.floor(e/100),s=2-a+Math.floor(a/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(t+1))+n+s-1524.5}function prayerTimes(e,t,n,a,s){const o=METHODS[a]||METHODS.egypt,l=julian(e.getFullYear(),e.getMonth()+1,e.getDate())-n/(15*24),i=u=>{const f=l+u-2451545,m=fixA(357.529+.98560028*f),w=fixA(280.459+.98564736*f),g=fixA(w+1.915*dsin(m)+.02*dsin(2*m)),y=23.439-36e-8*f,k=darctan2(dcos(y)*dsin(g),dcos(g))/15;return{decl:darcsin(dsin(y)*dsin(g)),eqt:w/15-fixH(k)}},c=u=>fixH(12-i(u).eqt),r=(u,f,m)=>{const w=i(f).decl,g=c(f),y=darccos((-dsin(u)-dsin(w)*dsin(t))/(dcos(w)*dcos(t)))/15;return g+(m?-y:y)},h=(u,f)=>{const m=i(f).decl;return r(-darccot(u+dtan(Math.abs(t-m))),f)},b=-e.getTimezoneOffset()/60,d=b-n/15,v=r(.833,18/24)+d;return[r(o.fajr,5/24,!0)+d,r(.833,6/24,!0)+d,c(12/24)+d,h(s?2:1,13/24)+d,v,o.ishaMin?v+o.ishaMin/60:r(o.isha,18/24)+d].map(u=>{const f=new Date(e);return f.setHours(0,0,0,0),new Date(f.getTime()+Math.round(u*60)*6e4)})}let prayers=[],prayersTomorrow=[];function computePrayers(){if(!S.loc)return;const e=new Date,t=new Date(e.getTime()+864e5);prayers=prayerTimes(e,S.loc.lat,S.loc.lon,S.method,S.asrHanafi),prayersTomorrow=prayerTimes(t,S.loc.lat,S.loc.lon,S.method,S.asrHanafi)}function nextPrayer(){if(!prayers.length)return null;const e=Date.now();for(let t=0;t<6;t++)if(t!==1&&prayers[t]>e)return{i:t,t:prayers[t]};return prayersTomorrow.length?{i:0,t:prayersTomorrow[0]}:null}const fired={};setInterval(()=>{if(!S.prayerOn||!S.adhanOn)return;prayers.length&&prayers[0].toDateString()!==new Date().toDateString()&&computePrayers();const e=Date.now();prayers.forEach((t,n)=>{if(n===1)return;const a=t.toDateString()+n,s=L("prayers")[n];e>=t&&e<t.getTime()+9e4&&!fired[a]&&(fired[a]=1,banner("🕌",`${L("adhanNow")} ${s}`,fmtTime(t),15e3),playAdhan());const o=+S.adhanBefore*6e4,l=a+"b";o&&e>=t-o&&e<t-o+9e4&&!fired[l]&&(fired[l]=1,banner("🕌",`${L("adhanSoon")} ${s}`,`${L("after")} ${S.adhanBefore} ${L("min")} · ${fmtTime(t)}`,9e3))})},2e4);let adhanAudio=null;function playAdhan(){if(S.adhanUrl)try{adhanAudio&&adhanAudio.pause(),adhanAudio=new Audio(S.adhanUrl),adhanAudio.play().catch(chime);return}catch(e){}chime()}const LEAGUES=[["4829","الدوري المصري","Egyptian Premier League"],["4668","الدوري السعودي","Saudi Pro League"],["4328","الدوري الإنجليزي","Premier League"],["4335","الدوري الإسباني","La Liga"],["4332","الدوري الإيطالي","Serie A"],["4331","الدوري الألماني","Bundesliga"],["4334","الدوري الفرنسي","Ligue 1"],["4480","دوري أبطال أوروبا","Champions League"]],lgName=e=>{const t=LEAGUES.find(n=>n[0]===e);return t?S.lang==="ar"?t[1]:t[2]:""};let matches=[],sportsT=null;const evTime=e=>{const t=e.strTimestamp||(e.dateEvent&&e.strTime?e.dateEvent+"T"+e.strTime:"");return t?new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(t)?t:t+"Z"):null};function evState(e){const t=(e.strStatus||"").toUpperCase(),n=evTime(e),a=e.intHomeScore!=null&&e.intHomeScore!=="";return/FT|FINISHED|AET|PEN/.test(t)?"ft":/NS|NOT STARTED|TBD|POSTPONED|CANC/.test(t)||!a?n&&Date.now()>n&&Date.now()-n<2.2*36e5&&!/POSTPONED|CANC/.test(t)?"live":"ns":n&&Date.now()-n>2.5*36e5?"ft":"live"}function loadSports(){return p(this,null,function*(){if(clearTimeout(sportsT),!S.sportsOn){matches=[],renderMatchRow(),updateTicker();return}const e=new Date,t=`${e.getFullYear()}-${pad(e.getMonth()+1)}-${pad(e.getDate())}`,n=[];for(const a of S.leagues){try{((yield A.fetchJSON(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${t}&l=${a}`)).events||[]).forEach(o=>{o._lg=a,n.push(o)})}catch(s){}yield new Promise(s=>setTimeout(s,2200))}matches=n.filter(a=>evTime(a)).sort((a,s)=>evTime(a)-evTime(s)),renderMatchRow(),updateTicker(),sportsT=setTimeout(loadSports,(matches.some(a=>evState(a)==="live")?3:15)*6e4)})}function matchTile(e){var s,o;const t=evState(e),n=t==="ns"?fmtTime(evTime(e)):`${(s=e.intHomeScore)!=null?s:0} - ${(o=e.intAwayScore)!=null?o:0}`,a=(l,i)=>`<div class="tm">${i?`<img src="${esc(i)}/tiny" onerror="this.src='${esc(i)}';this.onerror=null" alt="">`:"⚽"}<span>${esc(l)}</span></div>`;return`<div class="app match f" tabindex="0" data-match="${esc(e.idEvent)}">
    <div class="lg">${esc(lgName(e._lg))}${t==="live"?` · <span class="live">● ${L("live")}</span>`:t==="ft"?" · "+L("ft"):""}</div>
    <div class="mt">${a(e.strHomeTeam,e.strHomeTeamBadge)}<div class="sc">${n}</div>${a(e.strAwayTeam,e.strAwayTeamBadge)}</div></div>`}function renderMatchRow(){setRow("matchRow",S.sportsOn&&!isKids()?matches.map(matchTile).join(""):"")}window.renderMatchRow=renderMatchRow,window.matchShelf=e=>{var a,s;const t=matches.find(o=>o.idEvent===e);if(!t)return;const n=evState(t);shelf(`${t.strHomeTeam} × ${t.strAwayTeam}`,`${lgName(t._lg)} · ${n==="ns"?fmtTime(evTime(t)):n==="live"?L("live"):L("ft")} ${n!=="ns"?`(${(a=t.intHomeScore)!=null?a:0}-${(s=t.intAwayScore)!=null?s:0})`:""}`,t.strHomeTeamBadge)},activators.push(e=>{if(e.dataset.match){const t=matches.find(n=>n.idEvent===e.dataset.match);return t&&openSearch(t.strHomeTeam.split(" ")[0]),!0}return!1});const teamFav=e=>{const t=S.favTeams.split(/[,،]/).map(a=>a.trim().toLowerCase()).filter(Boolean),n=(e.strHomeTeam+" "+e.strAwayTeam).toLowerCase();return t.some(a=>n.includes(a))};setInterval(()=>{const e=Date.now();matches.forEach(t=>{if(!teamFav(t))return;const n=evTime(t);if(!n)return;const a="m"+t.idEvent;e>=n-15*6e4&&e<n-13*6e4&&!fired[a+"s"]&&(fired[a+"s"]=1,banner("⚽",`${L("kickSoon")} 15 ${L("min")}`,`${t.strHomeTeam} × ${t.strAwayTeam}`,1e4),chime()),e>=n&&e<n+2*6e4&&!fired[a+"k"]&&(fired[a+"k"]=1,banner("⚽",L("kickNow"),`${t.strHomeTeam} × ${t.strAwayTeam}`,1e4))})},3e4);function updateTicker(){var a,s;const e=S.tickerOn&&S.prayerOn,t=e?nextPrayer():null;$("tPrayer").textContent=t?`🕌 ${L("prayers")[t.i]} ${fmtTime(t.t)} · ${L("after")} ${fmtLeft(t.t-Date.now())}`:"";let n=null;S.tickerOn&&S.sportsOn&&!isKids()&&(n=matches.find(o=>evState(o)==="live")||matches.find(o=>evState(o)==="ns")),$("tMatch").textContent=n?evState(n)==="live"?`⚽ ${n.strHomeTeam} ${(a=n.intHomeScore)!=null?a:0}-${(s=n.intAwayScore)!=null?s:0} ${n.strAwayTeam}`:`⚽ ${n.strHomeTeam} × ${n.strAwayTeam} ${fmtTime(evTime(n))}`:"",$("tSleep").textContent=sleepAt?`😴 ${fmtLeft(sleepAt-Date.now())}`:""}tickers.push(updateTicker);let sleepAt=0,sleepT=null,sleepWarn=null;function sleepMenu(){const e=[0,15,30,45,60,90,120];dialog(L("sleepT"),e.map(t=>({label:t?t>=60?`${t/60} ${L("hr")}`:`${t} ${L("min")}`:L("off"),pri:!t&&!sleepAt,fn:()=>setSleep(t)})),{grid:4})}function setSleep(e){if(clearTimeout(sleepT),clearTimeout(sleepWarn),sleepAt=0,!e){banner("😴",L("sleepOff")),updateTicker();return}sleepAt=Date.now()+e*6e4,banner("😴",`${L("sleepSet")} ${e} ${L("min")}`),sleepWarn=setTimeout(()=>banner("😴",`${L("sleepSet")} 1 ${L("min")}`,"",15e3),(e-1)*6e4),sleepT=setTimeout(()=>{sleepAt=0,on("player")&&stopPlayer(),$("blackout").classList.add("on"),updateTicker()},e*6e4),updateTicker()}layers.push({test:()=>on("blackout"),ownsEnter:!0,key(e){return e.preventDefault&&e.preventDefault(),$("blackout").classList.remove("on"),idleAt=Date.now(),!0}});let frameT=null,frameIdx=0,frameFront=!0;function framePics(){const e=S.frameSrc==="mine"&&S.frames.length?"mine":S.frameSrc;if(e==="mine")return S.frames.map(n=>`url("${n}")`);if(e==="grad")return DAILY;const t=new Date().toDateString().replace(/\s/g,"");return Array.from({length:24},(n,a)=>`url("https://picsum.photos/seed/${t}${a}/1920/1080")`)}function frameNext(){const e=framePics();if(!e.length)return;const t=e[frameIdx++%e.length];if(S.frameStyle==="art"){$("frameArtImg").style.background=`${t} center/cover`;const s=["#d9d2c5","#cfd6d3","#e3ddd3","#c9c2b8","#2b2b2e"];$("frameArt").style.setProperty("--matte",s[frameIdx%s.length]);return}const n=$(frameFront?"frameA":"frameB"),a=$(frameFront?"frameB":"frameA");n.style.background=`${t} center/cover`,n.classList.add("show"),a.classList.remove("show"),frameFront=!frameFront}function frameInfo(){var s,o;if(!on("frame"))return;const e=new Date,t=S.fw;$("fTime").textContent=t.clock?fmtTime(e,!0):"",$("fDate").textContent=t.clock?fmtDate(e):"",$("fWeather").textContent=t.weather&&weatherNow?`${weatherNow.i} ${weatherNow.t}° ${weatherNow.city}`:"";const n=t.prayer&&S.prayerOn?nextPrayer():null;$("fPrayer").textContent=n?`🕌 ${L("prayers")[n.i]} ${fmtTime(n.t)}`:"";const a=t.match&&S.sportsOn&&!isKids()?matches.find(l=>evState(l)==="live")||matches.find(l=>evState(l)==="ns"):null;$("fMatch").textContent=a?`⚽ ${a.strHomeTeam} × ${a.strAwayTeam} ${evState(a)==="live"?`${(s=a.intHomeScore)!=null?s:0}-${(o=a.intAwayScore)!=null?o:0}`:fmtTime(evTime(a))}`:""}tickers.push(frameInfo);function startFrame(){if(on("player")||on("frame"))return;on("tv")&&pvStop();const e=$("frame");e.className="on"+(S.frameStyle==="art"?" art":S.frameStyle==="clock"?" clockmode":""),frameIdx=Math.floor(Math.random()*10),frameNext(),frameInfo(),clearInterval(frameT),frameT=setInterval(frameNext,Math.max(1,+S.frameEvery)*6e4)}function stopFrame(){$("frame").className="",clearInterval(frameT),idleAt=Date.now(),unlockedUntil=0}layers.push({test:()=>on("frame"),ownsEnter:!0,key(e){return e.preventDefault&&e.preventDefault(),stopFrame(),!0}}),$("frame").addEventListener("click",stopFrame),setInterval(()=>{S.frameMin>0&&!on("frame")&&!on("player")&&!on("blackout")&&Date.now()-idleAt>S.frameMin*6e4&&startFrame()},15e3),window.onFramesAdded=e=>{try{const t=JSON.parse(e);S.frames=[...S.frames,...t],t.length&&(S.frameSrc="mine",banner("🖼️",L("saved"),t.length+" 📷")),window.renderSettings&&renderSettings()}catch(t){}};function quickSettings(){const e="android.settings.";dialog(L("qTitle"),[{icon:"📋",label:L("runApps"),fn:()=>setTimeout(()=>window.runningMenu&&runningMenu(),30)},{icon:"🖼️",label:L("frameNow"),fn:startFrame},{icon:"😴",label:L("sleepT")+(sleepAt?" · "+fmtLeft(sleepAt-Date.now()):""),fn:sleepMenu},{icon:"👥",label:L("profiles"),fn:profileMenu},{icon:"🔍",label:L("aSearch"),fn:()=>openSearch("")},{icon:"📶",label:L("wifi"),fn:()=>A.openSettings(e+"WIFI_SETTINGS")},{icon:"🎧",label:L("bt"),fn:()=>A.openSettings(e+"BLUETOOTH_SETTINGS")},{icon:"🔊",label:L("sound"),fn:()=>A.openSettings(e+"SOUND_SETTINGS")},{icon:"🖥️",label:L("display"),fn:()=>A.openSettings(e+"DISPLAY_SETTINGS")},{icon:"➕",label:L("volUp"),fn:()=>A.volume("up"),keep:1},{icon:"➖",label:L("volDown"),fn:()=>A.volume("down"),keep:1},{icon:"🔇",label:L("mute"),fn:()=>A.volume("mute"),keep:1},{icon:"💾",label:L("storage"),fn:()=>A.openSettings(e+"INTERNAL_STORAGE_SETTINGS")},{icon:"🕒",label:L("dateSet"),fn:()=>A.openSettings(e+"DATE_SETTINGS")},{icon:"🧹",label:L("clearCache"),fn:doClearCache},{icon:"⚙️",label:L("allSet"),fn:()=>isKids()?null:A.openSettings("")}].filter(t=>!isKids()||["🖼️","😴","👥","🔍","➕","➖","🔇"].includes(t.icon)),{grid:4})}function doClearCache(){const e=A.clearCache();A.toast(L("cacheDone")+(e?` (${(e/1048576).toFixed(1)} MB)`:""))}activators.push(e=>e.id==="qBtn"?(quickSettings(),!0):e.id==="searchBtn"?(openSearch(""),!0):!1);let searchReturn=null;function openSearch(e){on("dlg")&&closeDialog(),searchReturn=focused,$("search").classList.add("on"),$("sInput").value=e||"",renderSearch(),focus(e&&$("sResults").querySelector(".f")||$("sInput"))}function closeSearch(){$("search").classList.remove("on"),focus(searchReturn&&document.body.contains(searchReturn)?searchReturn:fallbackFocus())}function settingsIndex(){return[...document.querySelectorAll("#setScroll .sec")].map((e,t)=>({i:t,label:(e.querySelector("h3")||{}).textContent||"",text:e.textContent}))}let ACTIONS=()=>[["🖼️",L("frameNow"),startFrame],["😴",L("sleepT"),sleepMenu],["⚡",L("qTitle"),quickSettings],["👥",L("profiles"),profileMenu],["🩺",L("checkCh"),()=>runCheck(!1)]];function renderSearch(){const e=$("sInput").value.trim().toLowerCase(),t=$("sResults");if(!e){t.innerHTML=`<h2>${L("actions")}</h2><div class="row">${ACTIONS().map((r,h)=>`<button class="btn f" data-sact="${h}">${r[0]} ${esc(r[1])}</button>`).join("")}</div>`;return}const n=r=>String(r||"").toLowerCase().includes(e),a=visibleApps().filter(r=>n(appName(r))||n(r.pkg)).slice(0,14),s=channels.filter(r=>chAllowed(r)&&(n(r.name)||String(r.no)===e)).slice(0,24),o=S.watch.filter(r=>n(r.name)),l=isKids()?[]:settingsIndex().filter(r=>n(r.text)),i=ACTIONS().map((r,h)=>({a:r,i:h})).filter(r=>n(r.a[1]));let c="";a.length&&(c+=`<h2>${L("appsS")}</h2><div class="row">${a.map(tile).join("")}</div>`),o.length&&(c+=`<h2>${L("watchS")}</h2><div class="row">${o.map(watchTile).join("")}</div>`),s.length&&(c+=`<h2>${L("channelsS")}</h2><div class="grid" style="--cols:3;grid-gap:1vh 1.4vw;gap:1vh 1.4vw;padding-top:1.4vh">${s.map(chRow).join("")}</div>`),(l.length||i.length)&&(c+=`<h2>${L("settingsS")} · ${L("actions")}</h2><div class="row">${i.map(r=>`<button class="btn f" data-sact="${r.i}">${r.a[0]} ${esc(r.a[1])}</button>`).join("")}${l.map(r=>`<button class="btn f" data-gosec="${r.i}">⚙️ ${esc(r.label)}</button>`).join("")}</div>`),t.innerHTML=c||`<div class="empty">${L("noRes")}</div>`}$("sInput").addEventListener("input",()=>{clearTimeout(window._ss),window._ss=setTimeout(renderSearch,200)}),window.onVoice=e=>{on("search")?($("sInput").value=e,renderSearch()):openSearch(e),focus($("sResults").querySelector(".f")||$("sInput"))},layers.push({test:()=>on("search")&&!on("dlg")&&!on("player"),key(e){const t=e.key;return isBack(t)||t==="Backspace"&&document.activeElement!==$("sInput")?(e.preventDefault&&e.preventDefault(),document.activeElement===$("sInput")&&t!=="GoBack"?($("sInput").blur(),!0):(closeSearch(),!0)):t==="Enter"&&document.activeElement===$("sInput")?(e.preventDefault(),$("sInput").blur(),focus($("sResults").querySelector(".f")||$("sInput")),!0):!1}}),activators.push(e=>{if(e.id==="voiceBtn")return A.voice(),!0;if(e.dataset.sact!==void 0){const t=ACTIONS()[+e.dataset.sact];return closeSearch(),t[2](),!0}if(e.dataset.gosec!==void 0){const t=+e.dataset.gosec;if(closeSearch(),showPage("settings")){const n=document.querySelectorAll("#setScroll .sec")[t];n&&focus(n.querySelector(".f"))}return!0}return!1});const _launch=launch;launch=function(e){on("search")&&$("search").classList.remove("on"),_launch(e)};const _playUrl=playUrl;playUrl=function(e){on("search")&&$("search").classList.remove("on"),_playUrl(e)};const ACTION_DEFS=()=>[["tv",L("aTv"),"📺"],["last",L("aLast"),"⏮️"],["search",L("aSearch"),"🔍"],["frame",L("aFrame"),"🖼️"],["sleep",L("aSleep"),"😴"],["quick",L("aQuick"),"⚡"],["home",L("aHome"),"🏠"],["profile",L("aProfile"),"👥"],["app",L("aApp"),"📦"]];function actionLabel(e){if(e.startsWith("app:")){const n=byPkg(e.slice(4));return"📦 "+(n?appName(n):e.slice(4))}const t=ACTION_DEFS().find(n=>n[0]===e);return t?t[2]+" "+t[1]:e}function runAction(e){if(on("frame")&&stopFrame(),on("blackout")&&$("blackout").classList.remove("on"),e==="update")return showPage("settings"),checkUpdates(!0);if(e.startsWith("app:"))return launch(e.slice(4));switch(on("dlg")&&closeDialog(),e){case"tv":on("player")&&stopPlayer(),showPage("tv"),focus(document.querySelector('.tab[data-page="tv"]'));{const t=document.querySelector("#channels .f");t&&focus(t)}break;case"last":S.lastCh&&playUrl(S.lastCh.url);break;case"search":openSearch("");break;case"frame":startFrame();break;case"sleep":sleepMenu();break;case"quick":quickSettings();break;case"home":on("player")&&stopPlayer(),showPage("home"),focus(document.querySelector('.tab[data-page="home"]'));break;case"profile":profileMenu();break}}window.onMappedKey=e=>{idleAt=Date.now(),runAction(e)};function syncKeyMap(){const e={};Object.entries(S.keymap).forEach(([t,n])=>e[t]=n.a),A.setKeyMap(JSON.stringify(e))}function learnKey(){dialog(L("addKey"),[{label:L("cancel"),fn:()=>A.learnKey(!1)}],{sub:L("pressKey"),onClose:()=>A.learnKey(!1)}),A.learnKey(!0),NA||setTimeout(()=>window.onKeyLearned(183,"KEYCODE_PROG_RED"),800)}window.onKeyLearned=(e,t)=>{closeDialog();const n=t.replace("KEYCODE_","").replace(/_/g," "),a=s=>{const o=S.keymap;o[e]={a:s,name:n},S.keymap=o,syncKeyMap(),window.renderSettings&&renderSettings(),A.toast(L("saved"))};dialog(`${L("keyFor")}  [${n}]`,ACTION_DEFS().map(s=>({icon:s[2],label:s[1],fn:()=>{if(s[0]!=="app")return a(s[0]);setTimeout(()=>dialog(L("chooseApp"),visibleApps().map(o=>({label:appName(o),fn:()=>a("app:"+o.pkg)})),{grid:3}),50)}})),{grid:3})},window.onSysNotif=e=>{if(!(!S.notifSys||on("frame")))try{const t=JSON.parse(e);banner("🔔",`${t.app}: ${t.title}`,t.text)}catch(t){}};function exportBackup(){const e={app:"tvlauncher",v:2,data:{}};for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);e.data[n]=localStorage.getItem(n)}A.exportBackup(JSON.stringify(e))}window.onBackupDone=()=>A.toast(L("bkDone")),window.onBackupLoaded=e=>{try{const t=JSON.parse(e);if(t.app!=="tvlauncher")throw 0;t.data?Object.entries(t.data).forEach(([n,a])=>localStorage.setItem(n,a)):Object.entries(t).forEach(([n,a])=>{n!=="app"&&n!=="v"&&localStorage.setItem(n,a)}),A.toast(L("bkLoaded")),boot()}catch(t){A.toast(L("bkBad"))}},$("dlg").addEventListener("click",e=>{e.target.id==="dlg"&&closeDialog()}),Object.assign(T.ar,{sportsTab:"⚽ الماتشات",spY:"امبارح",spT:"النهارده",spTm:"بكره",spNone:"مفيش ماتشات في اليوم ده",spLoad:"بيحمّل الماتشات…",spLive:"مباشر الآن",spFav:"فرقي"}),Object.assign(T.en,{sportsTab:"⚽ Matches",spY:"Yesterday",spT:"Today",spTm:"Tomorrow",spNone:"No matches on this day",spLoad:"Loading matches…",spLive:"Live now",spFav:"My teams"});let spDay=0;const spCache={};function spFetch(e){return p(this,null,function*(){if(e===0)return matches;const t=spCache[e];if(t&&Date.now()-t.at<30*6e4)return t.list;const n=new Date(Date.now()+e*864e5),a=`${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())}`,s=[];yield Promise.all(LEAGUES.map(l=>p(this,null,function*(){try{((yield A.fetchJSON(`https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${a}&l=${l[0]}`)).events||[]).forEach(c=>{c._lg=l[0],s.push(c)})}catch(i){}})));const o=s.filter(l=>evTime(l)).sort((l,i)=>evTime(l)-evTime(i));return spCache[e]={at:Date.now(),list:o},o})}function renderSports(){return p(this,null,function*(){const e=[[-1,"spY"],[0,"spT"],[1,"spTm"]];$("spDays").innerHTML=e.map(i=>`<button class="btn f${i[0]===spDay?" on":""}" data-spday="${i[0]}">${L(i[1])}</button>`).join(""),spDay===0&&!matches.length&&S.sportsOn&&($("spBody").innerHTML=`<p class="hint">${L("spLoad")}</p>`);const t=spDay,n=yield spFetch(t);if(t!==spDay)return;if(!n.length){$("spBody").innerHTML=`<p class="hint">${L(spDay===0&&!matches.length?"spLoad":"spNone")}</p>`;return}const a=(i,c)=>c.length?`<h3 class="sph">${i}</h3><div class="row sprow">${c.map(matchTile).join("")}</div>`:"",s=n.filter(i=>evState(i)==="live"),o=n.filter(i=>teamFav(i)&&evState(i)!=="live");let l=a(`<span class="live">●</span> ${L("spLive")}`,s)+a("⭐ "+L("spFav"),o);LEAGUES.forEach(i=>{l+=a(lgName(i[0]),n.filter(c=>c._lg===i[0]&&evState(c)!=="live"&&!teamFav(c)))}),$("spBody").innerHTML=l,typeof fixRatios=="function"&&fixRatios()})}pageHooks["sports:enter"]=renderSports,activators.push(e=>e.dataset.spday!=null?(spDay=+e.dataset.spday,renderSports().then(()=>focus(document.querySelector(`[data-spday="${spDay}"]`))),!0):!1);const _rmr=renderMatchRow;renderMatchRow=function(){_rmr(),on&&document.querySelector("#sports.on")&&spDay===0&&renderSports()},window.renderMatchRow=renderMatchRow;

;
/* settings.js */
"use strict";const seg=(t,s)=>`<div class="inline">${s.map(([a,e])=>`<button class="btn f" data-set="${t}:${a}">${esc(e)}</button>`).join("")}</div>`,onoff=t=>seg(t,[[1,L("on")],[0,L("off")]]),field=(t,s)=>`<div class="field">${t?`<label>${esc(t)}</label>`:""}${s}</div>`,sec=(t,s)=>`<div class="sec"><h3>${esc(t)}</h3>${s}</div>`,inputRow=(t,s,a,e,i)=>`<div class="inline"><input class="inp f grow" id="${t}" value="${esc(s||"")}" placeholder="${esc(a||"")}"><button class="btn pri f" id="${e}">${esc(i||L("save"))}</button></div>`;function renderSettings(){if(isKids()){$("setScroll").innerHTML="";return}const t=focused&&focused.closest("#setScroll")?focused.id?"#"+focused.id:focused.dataset.set?`[data-set="${focused.dataset.set}"]`:focused.dataset.tog?`[data-tog="${focused.dataset.tog}"]`:null:null,s=prayers.length?prayers.map((e,i)=>`<span class="btn sm">${L("prayers")[i]} ${fmtTime(e)}</span>`).join(""):"",a=sec(L("sLook"),field(L("language"),seg("lang",[["ar","العربية"],["en","English"]]))+field(S.lang==="ar"?"🧩 التصميم (شكل الشاشة)":"🧩 Design (screen layout)",designPicker())+field(S.lang==="ar"?"🎨 الألوان":"🎨 Colours",themePicker())+field(L("size"),seg("size",[["s",L("small")],["m",L("medium")],["l",L("large")]]))+field(L("wallpaper"),seg("wall",[["dynamic",L("wDynamic")],["daily",L("wDaily")]]).replace("</div>",`<button class="btn f${S.wall==="image"?" pri":""}" id="wallPick">${L("wPick")}</button><button class="btn f" id="wall4k">🖼 ${L("w4k")}</button></div>`)+`<div style="margin-top:1.2vh">${inputRow("wallUrl",S.wallImg&&!S.wallImg.startsWith("data:")?S.wallImg:"",L("wUrl"),"wallUrlSave")}</div>`)+field(L("hour"),seg("h24",[[0,"12h"],[1,"24h"]]))+field(L("perf"),seg("lite",[[0,L("perfFull")],[1,L("perfLite")]]))+field(L("setup"),`<div class="inline"><button class="btn pri f" id="setupBtn">🧭 ${L("setup")}</button></div>`)+field(L("webview"),`<div class="inline"><span class="btn sm">Chrome ${window.__chromeVer||"?"}</span>${(window.__chromeVer||99)<70?`<span class="btn sm">⚠️ ${L("webviewOld")}</span>`:""}</div>`))+sec(L("sFrame"),field(L("frameAfter"),seg("frameMin",[[0,L("off")],[5,"5 "+L("min")],[10,"10 "+L("min")],[30,"30 "+L("min")]]).replace(/<\/div>$/,`<button class="btn f" id="framePrev">▶ ${L("preview")}</button></div>`))+field(L("frameStyle"),seg("frameStyle",[["gallery",L("fsGallery")],["art",L("fsArt")],["clock",L("fsClock")]]))+field(L("frameSrc"),seg("frameSrc",[["mine",`${L("srcMine")} (${S.frames.length})`],["online",L("srcOnline")],["grad",L("srcGrad")]]).replace(/<\/div>$/,`<button class="btn f" id="addPhotos">➕ ${L("addPhotos")}</button>${S.frames.length?`<button class="btn f" id="clearPhotos">🗑 ${L("remove")} (${S.frames.length})</button>`:""}</div>`))+field(L("frameEvery"),seg("frameSec",[[15,"15 "+L("sec")],[30,"30 "+L("sec")],[60,"1 "+L("min")],[300,"5 "+L("min")]]))+(S.frameSrc==="online"?field(L("fCat"),seg("frameCat",[["bing","🌍 "+L("fcBing")],["nature","🌳 "+L("wNature")],["space","🌌 "+L("wSpace")],["islamic architecture","🕌 "+L("wMosque")],["city","🏙 "+L("wCity")],["ocean","🌊 "+L("wSea")]])):"")+field(L("frameWidgets"),`<div class="inline"><button class="btn pri f" id="fwEditBtn">🧩 ${L("fwEdit")}</button></div>`))+sec(L("sWeather"),field(L("city"),inputRow("cityInp",S.city,"Cairo","citySave")))+sec(L("sPrayer"),field(L("prayerOn"),onoff("prayerOn"))+(s?field("",`<div class="inline">${s}</div>`):"")+field(L("method"),seg("method",[["egypt",L("mEgypt")],["makkah",L("mMakkah")],["mwl",L("mMWL")],["karachi",L("mKarachi")]]))+field(L("asr"),seg("asrHanafi",[[0,L("asrStd")],[1,L("asrHanafi")]]))+field(L("adhanOn"),onoff("adhanOn"))+field(L("beforeAlert"),seg("adhanBefore",[[0,L("off")],[5,"5 "+L("min")],[10,"10 "+L("min")],[15,"15 "+L("min")]]))+field(L("adhanSound"),`<div class="inline"><button class="btn f" id="testAdhan">🔔 ${L("adhanChime")} / ${L("preview")}</button></div><div style="margin-top:1.2vh">${inputRow("adhanUrl",S.adhanUrl,L("adhanUrlPh"),"adhanSave")}</div>`))+sec(L("sSports"),field(L("sportsOn"),onoff("sportsOn"))+field(L("favTeams"),inputRow("teamsInp",S.favTeams,L("favTeamsPh"),"teamsSave"))+`<div class="field"><label>${esc(L("sportsNote"))}</label></div>`)+sec(L("sNotif"),field(L("notifSys"),onoff("notifSys").replace(/<\/div>$/,`<button class="btn f" id="grantNotif">${A.notifAccess()?"✅ "+L("granted"):"🔓 "+L("grant")}</button></div>`))+field(L("tickerShow"),onoff("tickerOn")))+sec(L("sTv"),field(L("playlists"),S.lists.map((e,i)=>`<div class="tagrow"><span class="tx">${e.type==="xtream"?"🔑":"📃"} <b>${esc(e.name)}</b> — ${esc(e.type==="xtream"?`${e.server} (${e.user})`:e.url)}</span><button class="btn sm f" data-dellist="${i}">🗑 ${L("remove")}</button></div>`).join("")+`<div class="inline" style="margin-top:1vh"><input class="inp f" id="listName" placeholder="${esc(L("listName"))}" style="width:16vw"><input class="inp f grow" id="listUrl" placeholder="${esc(L("listUrl"))}"><button class="btn pri f" id="listAdd">${L("addM3u")}</button></div><div class="inline" style="margin-top:1vh"><input class="inp f grow" id="xtServer" placeholder="${esc(L("xtServer"))}"><input class="inp f" id="xtUser" placeholder="${esc(L("xtUser"))}" style="width:14vw"><input class="inp f" id="xtPass" placeholder="${esc(L("xtPass"))}" style="width:14vw"><button class="btn pri f" id="xtAdd">${L("addXtream")}</button></div>`)+field(L("epg"),inputRow("epgInp",S.epg,"http://.../epg.xml.gz","epgSave",L("load")))+field(L("playerMode"),seg("ext",[[0,L("builtin")],[1,L("external")]]))+field(L("preview2"),onoff("preview"))+field(L("checkCh"),seg("hideDead",[[1,L("hideDead")],[0,L("showDead")]]).replace(/<\/div>$/,`<button class="btn f" data-set="autoCheck:${S.autoCheck?0:1}">${S.autoCheck?"✅":"⬜"} ${L("autoCheck")}</button><button class="btn f" id="checkNow">🩺 ${L("checkCh")}</button></div>`)))+sec(L("sApps"),field("",`<div class="inline"><button class="btn f" id="hiddenList">${L("hiddenApps")}</button></div>`)+field("",seg("showHidden",[[0,L("hideHidden")],[1,L("showHidden")]])))+sec(L("sKeys"),(Object.keys(S.keymap).length?Object.entries(S.keymap).map(([e,i])=>`<div class="tagrow"><span class="tx">🎛️ <b>${esc(i.name)}</b> → ${esc(actionLabel(i.a))}</span><button class="btn sm f" data-delkey="${e}">🗑 ${L("remove")}</button></div>`).join(""):`<div class="field"><label>${L("noKeys")}</label></div>`)+`<div class="inline" style="margin-top:1vh"><button class="btn pri f" id="addKey">➕ ${L("addKey")}</button></div>`)+sec(L("sProfiles"),`<div class="inline">${S.profiles.map(e=>`<button class="btn f${e.id===S.cur?" pri":""}" data-prof="${esc(e.id)}">${esc(e.emoji)} ${esc(e.name)}${e.kids?" 👶":""}</button>`).join("")}<button class="btn f" id="addProfile">➕ ${L("addProfile")}</button></div>`)+(window.lifeSettings?lifeSettings():"")+(window.phaseFourSettings?phaseFourSettings():"")+(window.mediaSettings?mediaSettings():"")+(window.widgetSettings?widgetSettings():"")+sec(L("sSecurity"),field(S.pin?"🔒 "+L("pinOn"):"🔓 "+L("pinNone"),`<div class="inline"><button class="btn f" id="pinSet">${L("pinSet")}</button><button class="btn f" id="pinOff">${L("pinOff")}</button></div>`)+field("",seg("lockSettings",[[0,L("lockSetNo")],[1,L("lockSetYes")]])))+sec(L("sBackup"),`<div class="inline"><button class="btn f" id="bkExport">${L("bkExport")}</button><button class="btn f" id="bkImport">${L("bkImport")}</button><button class="btn f" id="clearCache">${L("clearCache")}</button><button class="btn f" id="sysSet">${L("system")}</button></div>`);if($("setScroll").innerHTML=a,markSettings(),t){const e=$("setScroll").querySelector(t);e&&focus(e)}}window.renderSettings=renderSettings;function markSettings(){document.querySelectorAll("#setScroll [data-set]").forEach(t=>{const[s,a]=t.dataset.set.split(":");if(s==="autoCheck")return;const e=S[s];t.classList.toggle("pri",typeof e=="boolean"?e===(a==="1"):String(e)===a)})}const AFTER={lang:()=>{applyLang(),renderHome(),renderGroups()},theme:applyLook,size:applyLook,wall:applyLook,lite:()=>{S.perfChosen=!0,applyLook()},h24:tick,method:()=>{computePrayers(),updateTicker()},asrHanafi:()=>{computePrayers(),updateTicker()},prayerOn:updateTicker,tickerOn:updateTicker,sportsOn:loadSports,showHidden:renderHome,hideDead:renderChannels,preview:pvStop};activators.push(t=>{if(t.dataset.set){const[a,e]=t.dataset.set.split(":"),i=typeof DEF[a];return S[a]=i==="boolean"?e==="1":i==="number"?+e:e,AFTER[a]&&AFTER[a](),renderSettings(),focus(document.querySelector(`#setScroll [data-set^="${a}:"].pri`)||document.querySelector(`#setScroll [data-set="${t.dataset.set}"]`)),!0}if(t.dataset.tog){const[a,e]=t.dataset.tog.split(":");if(a==="fw"){const i=S.fw;i[e]=!i[e],S.fw=i}else toggleList(a,e),(a==="leagues"||a==="comps")&&loadSports();return renderSettings(),!0}if(t.dataset.dellist!==void 0){const a=S.lists;return a.splice(+t.dataset.dellist,1),S.lists=a,renderSettings(),loadLists(),!0}if(t.dataset.delkey!==void 0){const a=S.keymap;return delete a[t.dataset.delkey],S.keymap=a,syncKeyMap(),renderSettings(),!0}if(t.dataset.prof!==void 0)return editProfile(t.dataset.prof),!0;const s=a=>($(a)||{}).value?$(a).value.trim():"";switch(t.id){case"wallPick":return A.pickImage("wall"),!0;case"wallUrlSave":{const a=s("wallUrl");return a?(S.wallAuto="",setWall(a,!0)):(S.wallImg="",S.wall="dynamic",applyLook(),renderSettings(),A.toast(L("saved"))),!0}case"framePrev":return startFrame(),!0;case"addPhotos":return NA?A.pickFrames():window.onFramesAdded(JSON.stringify(["https://picsum.photos/seed/demo1/1920/1080","https://picsum.photos/seed/demo2/1920/1080"])),!0;case"clearPhotos":return guard(!!S.pin,()=>{S.frames.forEach(A.deleteFrame),S.frames=[],S.frameSrc==="mine"&&(S.frameSrc="online"),renderSettings()}),!0;case"citySave":return S.city=s("cityInp")||"Cairo",S.loc=null,weather(),A.toast(L("saved")),!0;case"adhanSave":return S.adhanUrl=s("adhanUrl"),A.toast(L("saved")),!0;case"testAdhan":return playAdhan(),!0;case"teamsSave":return S.favTeams=s("teamsInp"),A.toast(L("saved")),!0;case"grantNotif":return A.openNotifAccess(),!0;case"listAdd":{const a=s("listUrl");if(!a)return!0;const e=S.lists;return e.push({name:s("listName")||"IPTV "+(e.length+1),url:a}),S.lists=e,renderSettings(),loadLists().then(loadEpg),A.toast(L("saved")),!0}case"xtAdd":{const a=s("xtServer"),e=s("xtUser"),i=s("xtPass");if(!a||!e)return!0;const o=S.lists;return o.push({type:"xtream",name:s("listName")||a.replace(/^https?:\/\//,"").split(/[:/]/)[0],server:/^https?:/.test(a)?a:"http://"+a,user:e,pass:i}),S.lists=o,renderSettings(),loadLists().then(loadEpg),A.toast(L("saved")),!0}case"epgSave":return S.epg=s("epgInp"),loadEpg(),A.toast(L("saved")),!0;case"checkNow":return runCheck(!1),!0;case"hiddenList":{const a=S.hidden.map(byPkg).filter(Boolean);return dialog(L("hiddenApps"),a.length?a.map(e=>({label:"👁 "+appName(e),fn:()=>guard(!!S.pin,()=>{toggleList("hidden",e.pkg),renderHome()})})):[{label:L("noHidden"),fn:()=>{}}]),!0}case"addKey":return learnKey(),!0;case"addProfile":return guard(!!S.pin,()=>prompt2(L("profName"),"",a=>{if(!a)return;const e=S.profiles,i="p"+Date.now().toString(36);e.push({id:i,name:a,emoji:"🙂",kids:!1}),S.profiles=e,renderSettings(),setTimeout(()=>editProfile(i),60)})),!0;case"pinSet":return S.pin?guard(!0,setPin):setPin(),!0;case"pinOff":return guard(!0,()=>{if(S.profiles.some(a=>a.kids)){A.toast(L("kids")+" → "+L("pinOn"));return}S.pin="",S.lockSettings=!1,renderSettings(),A.toast(L("saved"))}),!0;case"bkExport":return exportBackup(),!0;case"bkImport":return A.importBackup(),!0;case"clearCache":return doClearCache(),!0;case"sysSet":return A.openSettings(""),!0}return!1}),pageHooks["settings:enter"]=renderSettings;const EMOJIS=["😎","🙂","👨","👩","👦","👧","👶","👴","👵","🦁","🐱","🚀","⚽","🎮","🌙","⭐"];function updProfile(t,s){const a=S.profiles,e=a.find(i=>i.id===t);Object.assign(e,s),S.profiles=a,applyLook(),renderSettings()}function editProfile(t){const s=S.profiles.find(a=>a.id===t);s&&guard(!!S.pin,()=>{const a=[{icon:"✏️",label:L("rename"),fn:()=>prompt2(L("profName"),s.name,e=>{e&&updProfile(t,{name:e}),setTimeout(()=>editProfile(t),60)})},{icon:s.emoji,label:L("emoji"),fn:()=>dialog(L("emoji"),EMOJIS.map(e=>({label:e,fn:()=>{updProfile(t,{emoji:e}),setTimeout(()=>editProfile(t),60)}})),{grid:4})},{icon:s.kids?"👶":"🧑",label:s.kids?L("kids"):L("adult"),fn:()=>{if(!s.kids&&!S.pin){A.toast(L("needPin"));return}if(t===S.cur&&!s.kids){A.toast(L("cancel"));return}updProfile(t,Object.assign({kids:!s.kids},s.kids?{}:KIDS_DEF,s.kids?{}:{allowedApps:s.allowedApps||[],allowedGroups:s.allowedGroups||[]})),setTimeout(()=>editProfile(t),60)}}];s.kids&&a.push({icon:"⏱️",label:`${L("limit")}: ${s.limit?s.limit%60?s.limit+" "+L("min"):s.limit/60+" "+L("hr"):L("noLimit")}`,fn:()=>dialog(L("limit"),[0,30,60,90,120,180,240].map(e=>({label:e?e/60+" "+L("hr"):L("noLimit"),fn:()=>{updProfile(t,{limit:e}),setTimeout(()=>editProfile(t),60)}})),{grid:5})},{icon:"🌙",label:`${L("bedtime")}: ${s.bedFrom?`${s.bedFrom}:00 → ${s.bedTo||7}:00`:L("off")}`,fn:()=>dialog(L("bedtime"),[[0,0],[20,7],[21,7],[22,7],[23,8]].map(([e,i])=>({label:e?`${e}:00 → ${i}:00`:L("off"),fn:()=>{updProfile(t,{bedFrom:e,bedTo:i}),setTimeout(()=>editProfile(t),60)}})),{grid:5})},{icon:"📦",label:`${L("allowedApps")} (${(s.allowedApps||[]).length})`,fn:()=>multiSelect(L("allowedApps"),apps.map(e=>({k:e.pkg,l:appName(e)})),t,"allowedApps")},{icon:"📺",label:`${L("allowedGroups")} (${(s.allowedGroups||[]).length})`,fn:()=>multiSelect(L("allowedGroups"),[...countries.map(e=>({k:"c:"+e.n,l:"🌍 "+e.label})),...groups.map(e=>({k:"g:"+e.n,l:e.n}))],t,"allowedGroups")}),t!=="main"&&t!==S.cur&&a.push({icon:"🗑",label:L("delProfile"),fn:()=>{S.profiles=S.profiles.filter(e=>e.id!==t),Object.keys(localStorage).filter(e=>e.startsWith("p:"+t+":")).forEach(e=>localStorage.removeItem(e)),renderSettings()}}),a.push({icon:"✅",label:L("done"),fn:()=>{}}),dialog(`${s.emoji} ${s.name}`,a,{grid:3})})}function multiSelect(t,s,a,e){const i=o=>{const c=S.profiles.find(n=>n.id===a),r=c[e]||[],d=s.map(n=>({label:(r.includes(n.k)?"✅ ":"⬜ ")+n.l,keep:!0,fn:()=>{const l=new Set(r);l.has(n.k)?l.delete(n.k):l.add(n.k),updProfile(a,{[e]:[...l]}),i(s.indexOf(n))}}));d.push({label:"✔ "+L("done"),pri:1,fn:()=>setTimeout(()=>editProfile(a),60)}),dialog(t,d,{grid:3,focusSel:`[data-di="${o||0}"]`})};i(0)}let lowRam=!1;function autoPerf(){let t=0;try{t=(JSON.parse(nat("memInfo")||"{}").total||0)/1073741824}catch(s){}lowRam=!!(t&&t<=2.2),window.lowRam=lowRam,lowRam&&!S.lowRamDone&&(S.lowRamDone=!0,S.lite=!0,S.perfChosen=!0,(!S.anim||S.anim==="auto")&&(S.anim="off"),S.liveWall=!1),!S.perfChosen&&(window.__chromeVer&&window.__chromeVer<75||t&&t<=2.2)&&(S.lite=!0)}let hlsLoading=null;function loadHls(){return window.Hls?Promise.resolve():hlsLoading||(hlsLoading=new Promise(t=>{const s=document.createElement("script");s.src="js/lib-hls.min.js",s.onload=s.onerror=()=>t(),document.body.appendChild(s)}),hlsLoading)}window.loadHls=loadHls;function boot(){autoPerf(),S.lite||setTimeout(loadHls,4e3),applyLook(),applyLang(),loadApps(),syncKeyMap(),status(),tick(),focus(document.querySelector(".tab.on")||document.querySelector(".tab")),S.iptvOn?S.lite?(setTimeout(weather,3e3),((S.favCh||[]).length||S.bootPlay)&&setTimeout(()=>{listsLoaded||loadListsOnce()},6e3),setTimeout(loadSports,2e4)):(setTimeout(()=>{weather(),loadLists().then(()=>setTimeout(loadEpg,1500))},250),setTimeout(loadSports,4e3)):(setTimeout(weather,3e3),S.simple||setTimeout(loadSports,S.lite?2e4:4e3)),window.__chromeVer&&window.__chromeVer<55&&setTimeout(()=>banner("⚠️",L("webview"),L("webviewOld"),15e3),3e3),S.lite||setTimeout(()=>{$("settings").classList.contains("on")||renderSettings()},9e3)}setInterval(tick,5e3),setInterval(status,2e4);let listsLoaded=!1,listsP=null;function loadListsOnce(){return listsP||(channels.length?(listsLoaded=!0,listsP=Promise.resolve(),listsP):(listsP=loadLists().then(()=>{listsLoaded=!0,setTimeout(loadEpg,S.lite?4e3:1500)}),listsP))}const _tvEnterL=pageHooks["tv:enter"];pageHooks["tv:enter"]=function(){_tvEnterL&&_tvEnterL(),S.lite&&!listsP&&(loadListsOnce(),loadHls())};const _vodEnterL=pageHooks["vod:enter"];pageHooks["vod:enter"]=function(){_vodEnterL&&_vodEnterL(),S.lite&&!listsP&&loadListsOnce()},DEF.iptvOn=!1,Object.assign(T.ar,{iptvOn:"القنوات (IPTV)",iptvOnSub:"لما تقفلها مفيش أي قنوات بتتحمّل والجهاز بيبقى أخف"}),Object.assign(T.en,{iptvOn:"Channels (IPTV)",iptvOnSub:"When off, no channels are loaded at all and the box stays lighter"});function applyIptv(){if(["tv","vod"].forEach(t=>{const s=document.querySelector(`.tab[data-page="${t}"]`);s&&!S.iptvOn&&(s.style.display="none")}),S.iptvOn){const t=document.querySelector('.tab[data-page="tv"]');t&&(t.style.display=""),listsP||loadListsOnce()}else document.querySelector("#tv.on,#vod.on")&&showPage("home")}AFTER.iptvOn=()=>{applyIptv(),renderHome()};const _updVodL=window.updVodTab;setInterval(()=>{S.iptvOn||applyIptv()},4e3),setTimeout(applyIptv,0),DEF.simple=!0,Object.assign(T.ar,{simple:"واجهة بسيطة",simpleSub:"الرئيسية والتطبيقات والإعدادات بس — أخف وأسرع"}),Object.assign(T.en,{simple:"Simple interface",simpleSub:"Home, Apps and Settings only — lighter and faster"});function applySimple(){["files","store","sports"].forEach(t=>{const s=document.querySelector(`.tab[data-page="${t}"]`);s&&(s.style.display=S.simple?"none":"")}),document.body.classList.toggle("simple",!!S.simple),S.simple&&document.querySelector("#files.on,#store.on,#sports.on")&&showPage("home"),applyIptv()}AFTER.simple=()=>{applySimple(),S.simple||loadSports(),renderHome()},setTimeout(applySimple,0),setInterval(()=>{S.simple&&applySimple()},5e3);

;
/* remote.js */
"use strict";var l=(e,t,r)=>new Promise((n,i)=>{var u=a=>{try{o(r.next(a))}catch(s){i(s)}},d=a=>{try{o(r.throw(a))}catch(s){i(s)}},o=a=>a.done?n(a.value):Promise.resolve(a.value).then(u,d);o((r=r.apply(e,t)).next())});Object.assign(DEF,{repo:"Mahmoud-Elgamal2026/TVLauncher",autoUpdate:!0,guard:!0,remoteOn:!0});const KEYMAP_REMOTE={up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",ok:"Enter",back:"GoBack"};function pressKey(e){if(idleAt=Date.now(),e==="back")return window.onBack();if(e==="home")return runAction("home");if(e==="menu"){focused&&openOptions(focused);return}if(/^[0-9]$/.test(e))return handleKey({key:e,preventDefault(){}});const t=KEYMAP_REMOTE[e];t&&(document.dispatchEvent(new KeyboardEvent("keydown",{key:t,bubbles:!0})),t==="Enter"&&document.dispatchEvent(new KeyboardEvent("keyup",{key:t,bubbles:!0})))}function remoteText(e,t){const r=document.activeElement&&document.activeElement.tagName==="INPUT"?document.activeElement:focused&&focused.tagName==="INPUT"?focused:null;return r?(r.value=e,r.dispatchEvent(new Event("input",{bubbles:!0})),t&&(r.focus(),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0}))),"input"):(openSearch(e),"search")}function remoteState(){return{profile:profile(),profiles:S.profiles.map(e=>({id:e.id,name:e.name,emoji:e.emoji,kids:!!e.kids})),kids:isKids(),lang:S.lang,lists:isKids()?[]:S.lists.map(e=>e.type==="xtream"?Object.assign({},e,{pass:e.pass?"••••":""}):e),epg:isKids()?"":S.epg,city:S.city,favTeams:S.favTeams,adhanUrl:S.adhanUrl,favs:S.favs.map(byPkg).filter(Boolean).map(e=>({pkg:e.pkg,name:appName(e)})),apps:visibleApps().map(e=>({pkg:e.pkg,name:appName(e),fav:S.favs.includes(e.pkg)})),watch:S.watch.map(e=>({key:e.key,name:e.name,type:e.type,url:e.url,pkg:e.pkg,pct:e.dur?Math.round(e.pos/e.dur*100):0})),favCh:S.favCh.filter(chAllowed).map(e=>({url:e.url,name:e.name,no:e.no})),last:S.lastCh?{url:S.lastCh.url,name:S.lastCh.name}:null,playing:on("player")&&playing?{name:playing.name,no:playing.no}:null,page:(document.querySelector(".page.on")||{}).id}}const KID_SAFE=new Set(["state","key","text","launch","play","action","volume","profile","search"]);function remoteCmd(e){if(isKids()&&!KID_SAFE.has(e.cmd)&&e.pin!==S.pin)return{error:"kids"};switch(e.cmd){case"power":return tvOff(),{ok:1};case"state":return remoteState();case"key":return pressKey(String(e.k)),{ok:1};case"text":return{ok:1,to:remoteText(String(e.t||""),!!e.submit)};case"search":return openSearch(String(e.t||"")),{ok:1};case"launch":return on("frame")&&stopFrame(),on("player")&&stopPlayer(),launch(String(e.pkg)),{ok:1};case"play":return on("frame")&&stopFrame(),playUrl(String(e.url)),{ok:1};case"action":return runAction(String(e.a)),{ok:1};case"volume":return A.volume(e.d),{ok:1};case"profile":{const t=S.profiles.find(r=>r.id===e.id);return t?isKids()&&S.pin&&e.pin!==S.pin?{error:"pin"}:(unlockedUntil=Date.now()+6e4,switchProfile(t.id),{ok:1}):{error:"profile"}}case"set":{const t=["epg","city","favTeams","adhanUrl","repo","tgToken","ytChannel","wallBlur","wallShow"];return e.k==="wallBlur"||e.k==="wallShow"?(S[e.k]=+e.v||0,window.applyWallFx&&applyWallFx(),{ok:1}):e.k==="ytChannel"?(window.ytAddFromPhone&&ytAddFromPhone(String(e.v||"").trim()),{ok:1}):e.k==="tgToken"?(S.tgToken=String(e.v||"").trim(),S.tgChat="",typeof tgInit=="function"&&tgInit(),document.querySelector("#settings.on")&&renderSettings(),banner("🤖","Telegram",L("saved"),4e3),{ok:1}):t.includes(e.k)?(S[e.k]=String(e.v||"").trim(),e.k==="epg"&&loadEpg(),e.k==="city"&&(S.loc=null,weather()),renderSettings(),{ok:1}):{error:"key"}}case"lists":{if(!Array.isArray(e.lists))return{error:"lists"};const t=S.lists;return e.lists.forEach(r=>{if(r&&r.type==="xtream"&&r.pass==="••••"){const n=t.find(i=>i.type==="xtream"&&i.server===r.server&&i.user===r.user);n&&(r.pass=n.pass)}}),S.lists=e.lists.filter(r=>r&&(r.url||r.server)).map(r=>r.type==="xtream"?{type:"xtream",name:String(r.name||"Xtream").slice(0,40),server:String(r.server).trim(),user:String(r.user||""),pass:String(r.pass||"")}:{name:String(r.name||"IPTV").slice(0,40),url:String(r.url).trim()}),loadLists().then(loadEpg),renderSettings(),{ok:1}}case"favs":return Array.isArray(e.order)?(S.favs=e.order.filter(t=>typeof t=="string"&&byPkg(t)),renderHome(),{ok:1}):{error:"favs"};case"fav":return toggleList("favs",String(e.pkg)),renderHome(),{ok:1};case"share":{const t=String(e.u||"").trim();if(!t)return{error:"share"};if(on("frame")&&stopFrame(),/youtube\.com\/(@|channel\/|c\/|user\/)/i.test(t)||/^@/.test(t))return window.ytAddFromPhone&&ytAddFromPhone(t),{ok:1,did:"channel"};const r=t.match(/(?:youtu\.be\/|v=|shorts\/|live\/)([\w-]{11})/);return r?(on("player")&&stopPlayer(),window.openYt?openYt(r[1]):nat("openUri",t),{ok:1,did:"video"}):/\.(m3u8|mp4|mkv|mp3|ts)(\?|$)/i.test(t)?(play({name:t.split("/").pop(),url:t,kind:"movie"}),{ok:1,did:"media"}):(nat("openUri",t),{ok:1,did:"link"})}case"photoReset":return e.what==="frames"?window.remoteFramesReset&&remoteFramesReset():window.remoteWallReset&&remoteWallReset(),{ok:1};case"photo":{const t=nat("saveImageB64",String(e.data||""));return t?(e.mode==="frame"?(S.frames=(S.frames||[]).concat([t]).slice(-60),S.frameSrc="mine",banner("🖼",S.lang==="ar"?"صورة جديدة للبرواز":"New frame photo","",3e3)):(S.wallImg=t,S.wall="image",S.anim="off",S.liveWall=!1,applyLook(),banner("🖼",S.lang==="ar"?"خلفية جديدة من الموبايل":"New wallpaper from phone","",3e3)),{ok:1}):{error:"photo"}}case"watchRemove":return watchRemove(String(e.key)),{ok:1}}return{error:"cmd"}}window.onRemote=(e,t)=>{let r;try{r=remoteCmd(JSON.parse(t))}catch(n){r={error:String(n.message||n)}}nat("remoteReply",e,JSON.stringify(r))};function remoteInfo(){try{return JSON.parse(nat("remoteInfo")||"{}")}catch(e){return{}}}function remoteUrl(){const e=remoteInfo();return e.ip?`http://${e.ip}:${e.port}/?k=${e.code}`:""}function qrSvg(e,t){if(!window.qrcode||!e)return"";try{const r=qrcode(0,"M");return r.addData(e),r.make(),r.createSvgTag({cellSize:Math.max(2,Math.floor(t/(r.getModuleCount()+8))),margin:4,scalable:!1})}catch(r){return""}}function phoneDialog(){const e=remoteInfo(),t=remoteUrl(),r=t?`<div style="display:flex;align-items:center;justify-content:center"><div style="background:#fff;padding:1.2vh;border-radius:1.4vh;line-height:0;margin:0 1.2vw">${qrSvg(t,260)||""}</div>
    <div style="font-size:2vh;line-height:1.9;margin:0 1.2vw"><div>${L("phoneStep1")}</div><div>${L("phoneStep2")}</div><div dir="ltr" style="font-weight:700;font-size:2.4vh">${esc(t.replace(/\?k=.*/,""))}</div><div>${L("phoneCode")}: <b style="font-size:3vh;letter-spacing:.2em">${esc(e.code)}</b></div></div></div>`:`<div class="sub">${L("phoneNoNet")}</div>`;dialog("📱 "+L("phoneTitle"),[{label:L("done"),fn:()=>{}}],{html:r+`<div class="dlist" style="margin-top:1vh"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}function checkUpdates(e){return l(this,null,function*(){if(!NA){e&&A.toast(L("updNone"));return}if(!S.repo){e&&A.toast(L("updNoRepo"));return}try{let t=null;if(S.channel!=="beta"&&NA.checkUpdatePath)try{t=JSON.parse(yield natAsync("checkUpdatePath",S.repo,"releases/tags/stable"))}catch(r){t=null}if((!t||!t.latest)&&(t=JSON.parse(yield natAsync("checkUpdate",S.repo))),store.set("lastUpdCheck",Date.now()),t.latest>t.current&&t.url){const r=()=>{banner("⬇️",L("updDownloading"),t.tag),nat("installUpdate",t.url)};e?dialog(`⬆️ ${L("updAvail")} ${t.tag}`,[{label:L("updInstall"),pri:1,fn:r},{label:L("later"),fn:()=>{}}],{sub:(t.notes||"").slice(0,200)}):banner("⬆️",`${L("updAvail")} ${t.tag}`,L("updHint"),12e3),window._pendingUpdate=t}else e&&A.toast(L("updNone")+` (v${t.current})`)}catch(t){e&&A.toast(L("loadErr")+": "+t.message)}})}window.onUpdateProgress=e=>{e===-2?banner("🔐",L("updPerm"),L("updPermSub"),12e3):e===-1?banner("⚠️",L("loadErr")):e===100?banner("✅",L("updReady")):e%25===0&&e>0&&banner("⬇️",L("updDownloading"),e+"%",2500)},setInterval(()=>{S.autoUpdate&&Date.now()-store.get("lastUpdCheck",0)>36e5&&checkUpdates(!1)},5*6e4),setTimeout(()=>{S.autoUpdate&&checkUpdates(!1)},6e4);const _setSleep=setSleep;setSleep=function(e){_setSleep(e),e&&(clearTimeout(sleepT),sleepT=setTimeout(()=>{sleepAt=0,on("player")&&stopPlayer(),nat("sleepNow")||$("blackout").classList.add("on"),updateTicker()},e*6e4))},window.phaseFourSettings=function(){const e=remoteInfo(),t=remoteUrl(),r=!!nat("guardService"),n=nat("versionName")||"preview";return sec(L("sPhone"),field(L("phoneTitle"),seg("remoteOn",[[1,L("on")],[0,L("off")]]).replace(/<\/div>$/,`<button class="btn f" id="showQr">📱 ${L("showQr")}</button><button class="btn f" id="newCode">🔄 ${L("newCode")}</button></div>`))+(t?field("",`<div class="inline"><span class="btn sm" dir="ltr">${esc(t.replace(/\?k=.*/,""))}</span><span class="btn sm">${L("phoneCode")}: <b>${esc(e.code)}</b></span></div>`):""))+sec(L("sGuard"),field(L("guardDesc"),`<div class="inline"><button class="btn f${r?"":" pri"}" id="openGuard">${r?"✅ "+L("guardOn"):"🔓 "+L("guardEnable")}</button></div>`)+field(L("guardHome"),seg("guard",[[1,L("on")],[0,L("off")]])))+sec(L("sUpdate"),field(`${L("updCurrent")}: ${n}`,inputRow("repoInp",S.repo,"username/TVLauncher","repoSave"))+field("",seg("autoUpdate",[[1,L("updAuto")],[0,L("updManual")]]).replace(/<\/div>$/,`<button class="btn pri f" id="checkUpd">🔎 ${L("updCheck")}</button></div>`)))},AFTER.remoteOn=()=>nat("setRemote",!!S.remoteOn),AFTER.guard=()=>nat("setGuard",!!S.guard),activators.push(e=>{switch(e.id){case"showQr":return phoneDialog(),!0;case"newCode":return nat("newRemoteCode"),renderSettings(),A.toast(L("saved")),!0;case"openGuard":return nat("openAccessibility"),!0;case"repoSave":return S.repo=($("repoInp").value||"").trim().replace(/^https?:\/\/github\.com\//,"").replace(/\/$/,""),renderSettings(),checkUpdates(!0),!0;case"checkUpd":return checkUpdates(!0),!0}return!1});const _quick=quickSettings;quickSettings=function(){_quick();const e=$("dbox")._items;if(!e||isKids())return;e.splice(4,0,{icon:"📱",label:L("phoneTitle"),fn:()=>setTimeout(phoneDialog,30)});const t=$("dbox").querySelector(".mgrid");t&&(t.innerHTML=e.map((r,n)=>`<button class="btn f${r.pri?" pri":""}" data-di="${n}">${r.icon?`<b>${esc(r.icon)}</b>`:""}${esc(r.label)}</button>`).join(""),focus(t.querySelector(".f")))},setTimeout(()=>{S.autoUpdate&&Date.now()-store.get("lastUpdCheck",0)>12*36e5&&checkUpdates(!1)},3e4);function tgPhoneDialog(){const e=remoteUrl();if(!e)return phoneDialog();const t=e+"#tg";dialog("🤖 "+(S.lang==="ar"?"توكن تيليجرام من الموبايل":"Telegram token from your phone"),[{label:L("done"),fn:()=>{}}],{html:`<div style="display:flex;align-items:center;justify-content:center"><div style="background:#fff;padding:1.2vh;border-radius:1.4vh;line-height:0;margin:0 1.2vw">${qrSvg(t,300)}</div>
   <div style="font-size:2.1vh;line-height:2;margin:0 1.2vw">${S.lang==="ar"?"١. صوّر الكود بكاميرا الموبايل (الموبايل على نفس الواي فاي)<br>٢. هتفتح خانة التوكن على طول<br>٣. الصق التوكن ودوس 💾 — خلاص":"1. Scan with your phone camera (same Wi-Fi)<br>2. The token box opens<br>3. Paste and tap 💾"}</div></div><div class="dlist" style="margin-top:1vh"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}activators.push(e=>e.id==="tgPhoneBtn"?(tgPhoneDialog(),!0):!1);

;
/* life.js */
"use strict";var l=(t,n,a)=>new Promise((e,s)=>{var i=c=>{try{o(a.next(c))}catch(m){s(m)}},r=c=>{try{o(a.throw(c))}catch(m){s(m)}},o=c=>c.done?e(c.value):Promise.resolve(c.value).then(i,r);o((a=a.apply(t,n)).next())});Object.assign(DEF,{hijri:!0,hijriAdj:0,ramadan:"auto",radio:null});const hijriMemo={};function hijriParts(t){const n=t.toDateString()+"|"+(S.hijriAdj||0)+"|"+S.lang;if(hijriMemo[n]!==void 0)return hijriMemo[n];const a=hijriParts0(t);return hijriMemo[n]=a,a}function hijriParts0(t){t=new Date(t.getTime()+(+S.hijriAdj||0)*864e5);for(const n of["islamic-umalqura","islamic"])try{const a=(S.lang==="ar"?"ar-EG":"en")+"-u-ca-"+n+"-nu-latn",e=new Intl.DateTimeFormat(a,{day:"numeric",month:"long",year:"numeric"}).format(t),s=+new Intl.DateTimeFormat("en-u-ca-"+n+"-nu-latn",{month:"numeric"}).format(t),i=+new Intl.DateTimeFormat("en-u-ca-"+n+"-nu-latn",{day:"numeric"}).format(t);if(s)return{txt:e.replace(/\s?(هـ|AH)$/,"")+(S.lang==="ar"?" هـ":" AH"),month:s,day:i}}catch(a){}return null}tickers.push(t=>{if(!S.hijri)return;const n=hijriParts(t);n&&($("date").textContent=fmtDate(t)+" · "+n.txt)});const isRamadan=()=>S.ramadan==="on"||S.ramadan==="auto"&&(hijriParts(new Date)||{}).month===9;function ramadanTicker(){if(!isRamadan()||!prayers.length)return"";const t=Date.now(),n=e=>new Date(e.getTime()-10*6e4);if(t<prayers[4]&&t>prayers[0])return`🌙 ${L("iftar")} ${fmtTime(prayers[4])} · ${L("after")} ${fmtLeft(prayers[4]-t)}`;const a=t<prayers[0]?prayers[0]:prayersTomorrow[0];return a?`🌙 ${L("imsak")} ${fmtTime(n(a))} · ${L("after")} ${fmtLeft(n(a)-t)}`:""}tickers.push(()=>{const t=S.tickerOn?ramadanTicker():"";t&&($("tPrayer").textContent=t)});const _updTicker=updateTicker;updateTicker=function(){_updTicker();const t=S.tickerOn?ramadanTicker():"";t&&($("tPrayer").textContent=t)},setInterval(()=>{if(!isRamadan()||!prayers.length)return;const t=Date.now(),n=new Date().toDateString(),a=(e,s,i,r,o)=>{t>=e&&t<e+9e4&&!fired[n+s]&&(fired[n+s]=1,banner(i,r,o,15e3),chime())};a(prayers[4].getTime()-15*6e4,"if15","🌙",`${L("iftar")} ${L("after")} 15 ${L("min")}`,fmtTime(prayers[4])),a(prayers[4].getTime(),"if0","🍽️",L("iftarNow"),L("ramadanKareem")),a(prayers[0].getTime()-40*6e4,"suh","🌙",`${L("imsak")} ${L("after")} 30 ${L("min")}`,fmtTime(new Date(prayers[0].getTime()-10*6e4)))},2e4);function imsakiya(){if(!S.loc){A.toast(L("needCity"));return}const t=[],n=new Date;n.setHours(12,0,0,0);for(let e=0;e<30;e++){const s=new Date(n.getTime()+e*864e5),i=hijriParts(s);if(S.ramadan==="auto"&&i&&i.month!==9&&e>0)break;const r=prayerTimes(s,S.loc.lat,S.loc.lon,S.method,S.asrHanafi);t.push(`<tr><td>${i?i.day:""}</td><td>${s.getDate()}/${s.getMonth()+1}</td><td>${fmtTime(new Date(r[0]-6e5),1)}</td><td>${fmtTime(r[0],1)}</td><td>${fmtTime(r[2],1)}</td><td>${fmtTime(r[3],1)}</td><td><b>${fmtTime(r[4],1)}</b></td><td>${fmtTime(r[5],1)}</td></tr>`)}const a=L("prayers");dialog("🌙 "+L("imsakiya"),[{label:L("done"),fn:()=>{}}],{html:`<table class="imsak"><tr><th>${L("hDay")}</th><th>📅</th><th>${L("imsak")}</th><th>${a[0]}</th><th>${a[2]}</th><th>${a[3]}</th><th>${a[4]}</th><th>${a[5]}</th></tr>${t.join("")}</table>
    <div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}let radioAudio=null,radios=[];const RB="https://backup.qurango.net/radio/",RADIO_FB=[["مشاري العفاسي","mishary_alafasi"],["محمود خليل الحصري","mahmoud_khalil_alhussary"],["الحصري مجود","mahmoud_khalil_alhussary_mojawwad"],["عبدالباسط عبدالصمد","abdulbasit_abdulsamad"],["عبدالباسط مجود","abdulbasit_abdulsamad_mojawwad"],["المنشاوي","mohammed_siddiq_alminshawi"],["المنشاوي مجود","mohammed_siddiq_alminshawi_mojawwad"],["محمد الطبلاوي","mohammad_altablaway"],["ماهر المعيقلي","maher"],["عبدالرحمن السديس","abdulrahman_alsudaes"],["سعود الشريم","saud_alshuraim"],["ياسر الدوسري","yasser_aldosari"],["سعد الغامدي","saad_alghamdi"],["أحمد العجمي","ahmad_alajmy"],["أحمد نعينع","ahmad_nauina"],["تلاوات خاشعة","salma"],["تفسير القرآن","tafseer"],["المختصر في التفسير","mukhtasartafsir"],["الرقية الشرعية","roqiah"],["أذكار الصباح","athkar_sabah"],["أذكار المساء","athkar_masa"]].map(t=>({name:t[0],url:RB+t[1]}));function radioMenu(){return l(this,null,function*(){if(!radios.length)try{radios=((yield A.fetchJSON(`https://mp3quran.net/api/v3/radios?language=${S.lang==="ar"?"ar":"eng"}`)).radios||[]).map(s=>({name:s.name,url:s.url}))}catch(e){}const t=[];radioAudio&&t.push({icon:"⏹",label:L("stopRadio"),pri:1,fn:stopRadio});const n={};RADIO_FB.concat(radios).filter(e=>!n[e.url]&&(n[e.url]=1)).slice(0,80).forEach(e=>t.push({icon:"📻",label:e.name,fn:()=>playRadio(e)})),dialog("📻 "+L("quranRadio"),t,{grid:3})})}window.onRadioErr=()=>{const t=S.radio;if(t&&t.url.indexOf("https:")===0&&!t._h){playRadio({name:t.name,url:"http:"+t.url.slice(6),_h:1});return}A.toast(L("playErr")),stopRadio()};function playRadio(t){stopRadio(),S.radio=t,NA&&NA.playAudio?(NA.playAudio(t.url),radioAudio={native:1}):(radioAudio=new Audio(t.url),radioAudio.onerror=onRadioErr,radioAudio.play().catch(()=>{})),banner("📻",L("quranRadio"),t.name),updateTicker()}function stopRadio(){radioAudio&&(radioAudio.native?NA.stopAudio():(radioAudio.pause(),radioAudio.src=""),radioAudio=null),S.radio=null,updateTicker()}tickers.push(()=>{$("tSleep").textContent=[sleepAt?`😴 ${fmtLeft(sleepAt-Date.now())}`:"",radioAudio&&S.radio?`📻 ${S.radio.name}`:""].filter(Boolean).join("  ·  ")});const AZKAR={m:["أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ","اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ","سُبْحَانَ اللَّهِ وَبِحَمْدِهِ — مِائَةَ مَرَّةٍ","بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ","رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا","حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ"],e:["أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ","اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ","أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ","بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ","اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ","حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ"],g:["سُبْحَانَ اللَّهِ","الْحَمْدُ لِلَّهِ","لَا إِلَهَ إِلَّا اللَّهُ","اللَّهُ أَكْبَرُ","لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ","أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ"]};function azkarSet(){if(!prayers.length)return AZKAR.g;const t=Date.now();return t>prayers[0]&&t<prayers[3]?AZKAR.m:t>prayers[3]&&t<prayers[5].getTime()+36e5?AZKAR.e:AZKAR.g}function azkarDialog(){const t=azkarSet();dialog("📿 "+L("azkar"),t.map(n=>({label:n,fn:()=>{},keep:1})).concat([{label:L("done"),pri:1,fn:()=>{}}]))}let azIdx=0;tickers.push(()=>{if(!on("frame")||!S.fw.azkar){$("fAzkar").textContent="";return}const t=azkarSet();Date.now()%6e4<5e3&&azIdx++,$("fAzkar").textContent=t[azIdx%t.length]});let forecast=[];function loadForecast(){return l(this,null,function*(){try{const t=S.loc;if(!t)return;const n=yield A.fetchJSON(`https://api.open-meteo.com/v1/forecast?latitude=${t.lat}&longitude=${t.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`);forecast=(n.daily.time||[]).map((a,e)=>({d:new Date(a+"T12:00:00"),c:n.daily.weather_code[e],hi:Math.round(n.daily.temperature_2m_max[e]),lo:Math.round(n.daily.temperature_2m_min[e])}))}catch(t){}})}setInterval(loadForecast,3*36e5);function forecastDialog(){if(!forecast.length){loadForecast().then(()=>forecast.length&&forecastDialog());return}dialog(`🌤 ${S.loc?S.loc.name:""}`,[{label:L("done"),fn:()=>{}}],{html:`<div class="fc">${forecast.map((t,n)=>`<div class="fcd"><div>${n?L("days")[t.d.getDay()]:L("today")}</div><b>${WMO(t.c)}</b><div><span>${t.hi}°</span> <small>${t.lo}°</small></div></div>`).join("")}</div>
    <div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}tickers.push(()=>{if(!on("frame")||!S.fw.weather||!forecast.length){$("fForecast").textContent="";return}$("fForecast").textContent=forecast.slice(1,4).map(t=>`${L("days")[t.d.getDay()].slice(0,S.lang==="ar"?20:3)} ${WMO(t.c)} ${t.hi}°`).join("   ")});const folderTile=t=>{const n=t.apps.map(byPkg).filter(a=>a&&allowed(a.pkg));return`<div class="app folder f" tabindex="0" data-folder="${esc(t.id)}"><div class="fgrid">${n.slice(0,4).map(a=>a.icon?`<img src="${a.icon}" alt="">`:`<span>${esc(appName(a)[0])}</span>`).join("")}</div>
    <div class="nm">${esc(t.emoji)} ${esc(t.name)} (${n.length})</div></div>`};function renderFolders(){const t=S.folders.filter(n=>n.apps.some(a=>byPkg(a)&&allowed(a))||!isKids());setRow("folderRow",t.map(folderTile).join(""))}const _renderHome=renderHome;renderHome=function(){_renderHome(),renderFolders(),!isKids()&&S.folders.length&&$("appGrid").insertAdjacentHTML("afterbegin",S.folders.map(folderTile).join(""))};function openFolder(t){const n=S.folders.find(e=>e.id===t);if(!n)return;const a=n.apps.map(byPkg).filter(e=>e&&allowed(e.pkg));dialog(`${n.emoji} ${n.name}`,a.length?a.map(e=>({label:appName(e),fn:()=>launch(e.pkg)})):[{label:L("folderEmpty"),fn:()=>{}}],{grid:Math.min(4,Math.max(1,a.length))})}function addToFolder(t){const n=S.folders,a=n.map(e=>({icon:e.emoji,label:e.name+(e.apps.includes(t)?" ✓":""),fn:()=>{const s=S.folders,i=s.find(r=>r.id===e.id);i.apps=i.apps.includes(t)?i.apps.filter(r=>r!==t):[...i.apps,t],S.folders=s,renderHome()}}));a.push({icon:"➕",label:L("newFolder"),fn:()=>setTimeout(()=>prompt2(L("folderName"),"",e=>{e&&(S.folders=[...S.folders,{id:"f"+Date.now().toString(36),name:e,emoji:"📁",apps:[t]}],renderHome())}),30)}),dialog(L("addFolder"),a,{grid:3})}function folderMenu(t){const n=S.folders.find(a=>a.id===t);!n||isKids()||dialog(n.name,[{label:L("open"),pri:1,fn:()=>openFolder(t)},{label:L("rename"),fn:()=>setTimeout(()=>prompt2(L("folderName"),n.name,a=>{if(!a)return;const e=S.folders;e.find(s=>s.id===t).name=a,S.folders=e,renderHome()}),30)},{label:L("emoji"),fn:()=>setTimeout(()=>dialog(L("emoji"),["📁","🎮","🎬","📺","🎵","🧒","🛠️","⚽","📚","⭐","🕌","🛒"].map(a=>({label:a,fn:()=>{const e=S.folders;e.find(s=>s.id===t).emoji=a,S.folders=e,renderHome()}})),{grid:6}),30)},{label:L("delFolder"),fn:()=>{S.folders=S.folders.filter(a=>a.id!==t),renderHome()}},{label:L("cancel"),fn:()=>{}}])}activators.push(t=>t.dataset.folder?(openFolder(t.dataset.folder),!0):!1),optionHandlers.unshift(t=>t.dataset.folder?(folderMenu(t.dataset.folder),!0):!1);const _appMenu=appMenu;appMenu=function(t,n,a){if(_appMenu(t,n,a),isKids())return;const e=$("dbox")._items;e.splice(e.length-1,0,{label:"📁 "+L("addFolder"),fn:()=>setTimeout(()=>addToFolder(t),30)});const s=$("dbox").querySelector(".dlist");s.innerHTML=e.map((i,r)=>`<button class="btn f${i.pri?" pri":""}" data-di="${r}">${esc(i.label)}</button>`).join(""),focus(s.querySelector(".f"))};function inBedtime(t){if(!t||!t.kids||!t.bedFrom)return!1;const n=new Date,a=n.getHours()*60+n.getMinutes(),[e,s]=[t.bedFrom,t.bedTo||7].map(i=>i*60);return e>s?a>=e||a<s:a>=e&&a<s}let bedLockShown=!1;setInterval(()=>{if(!isKids()||!inBedtime(profile())||Date.now()<unlockedUntil){bedLockShown=!1;return}bedLockShown&&on("dlg")||(bedLockShown=!0,on("player")&&stopPlayer(),on("frame")&&stopFrame(),askPin("🌙 "+L("bedtime"),t=>{if(t!==S.pin)return A.toast(L("wrongPin")),!1;unlockedUntil=Date.now()+30*6e4,closeDialog()},L("bedtimeSub")),dlgOnClose=()=>{bedLockShown=!1})},3e4);let statCur=null;const dayKey=t=>(t=t||new Date,`${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`);function statStart(t){statStop(),statCur={t:Date.now(),name:t.name,kind:t.kind?"vod":"live"}}function statStop(){if(!statCur)return;const t=Math.round((Date.now()-statCur.t)/1e3),n=statCur;if(statCur=null,t<20)return;const a=S.stats;a.days=a.days||{},a.items=a.items||{};const e=dayKey();a.days[e]=(a.days[e]||0)+t,a.items[n.name]=(a.items[n.name]||0)+t;const s=Object.keys(a.days).sort();for(;s.length>60;)delete a.days[s.shift()];const i=Object.entries(a.items).sort((r,o)=>o[1]-r[1]);i.length>200&&(a.items=Object.fromEntries(i.slice(0,150))),S.stats=a}const _launch2=launch;launch=function(t){_launch2(t);const n=S.stats;n.apps=n.apps||{},n.apps[t]=(n.apps[t]||0)+1,S.stats=n};function statsFor(t){try{return JSON.parse(localStorage.getItem(`p:${t}:stats`))||{}}catch(n){return{}}}const hm=t=>{const n=Math.round(t/60);return n>=60?`${Math.floor(n/60)}${L("hr")} ${n%60}${L("min")}`:`${n}${L("min")}`};function statsDialog(){if(statCur&&on("player")){const e=Object.assign({},statCur);statStop(),statCur=e,statCur.t=Date.now()}const t=dayKey(),n=[...Array(7)].map((e,s)=>dayKey(new Date(Date.now()-s*864e5))),a=S.profiles.map(e=>{const s=statsFor(e.id),i=s.days||{},r=i[t]||0,o=n.reduce((u,d)=>u+(i[d]||0),0),c=Object.entries(s.items||{}).sort((u,d)=>d[1]-u[1]).slice(0,4).map(([u,d])=>`${esc(u)} <small>${hm(d)}</small>`).join(" · "),m=Object.entries(s.apps||{}).sort((u,d)=>d[1]-u[1]).slice(0,4).map(([u,d])=>{const f=byPkg(u);return f?`${esc(appName(f))} <small>×${d}</small>`:""}).filter(Boolean).join(" · "),p=n.slice().reverse().map(u=>{const d=i[u]||0;return`<i style="height:${Math.max(4,Math.min(100,d/36))}%" title="${u}"></i>`}).join("");return`<div class="stp"><div class="sth"><b>${esc(e.emoji)} ${esc(e.name)}</b><span>${L("today")}: <b>${hm(r)}</b> · ${L("thisWeek")}: <b>${hm(o)}</b></span></div>
      <div class="bars">${p}</div>${c?`<div class="stl">📺 ${c}</div>`:""}${m?`<div class="stl">📦 ${m}</div>`:""}</div>`}).join("");dialog("📊 "+L("stats"),[{label:L("done"),fn:()=>{}}],{html:a+`<div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}const events=[];let evId=0;const _banner=banner;banner=function(t,n,a,e){for(_banner(t,n,a,e),events.push({id:++evId,icon:t,title:n,text:a||"",t:Date.now()});events.length>30;)events.shift()};const _remoteCmd=remoteCmd;remoteCmd=function(t){if(t.cmd==="backup"){if(isKids()&&t.pin!==S.pin)return{error:"kids"};const a={};for(let e=0;e<localStorage.length;e++){const s=localStorage.key(e);a[s]=localStorage.getItem(s)}return{app:"tvlauncher",v:2,data:a}}if(t.cmd==="restore")return isKids()&&t.pin!==S.pin?{error:"kids"}:!t.data||t.data.app!=="tvlauncher"?{error:"file"}:(setTimeout(()=>window.onBackupLoaded(JSON.stringify(t.data)),50),{ok:1});if(t.cmd==="events")return{events:events.filter(a=>a.id>(+t.since||0))};const n=_remoteCmd(t);return t.cmd==="state"&&n&&!n.error&&(n.evId=evId),n};const _quick2=quickSettings;quickSettings=function(){_quick2();const t=$("dbox")._items;if(!t)return;const n=[{icon:"📻",label:L("quranRadio"),fn:()=>setTimeout(radioMenu,30)},{icon:"📿",label:L("azkar"),fn:()=>setTimeout(azkarDialog,30)},{icon:"🌤",label:L("forecast"),fn:()=>setTimeout(forecastDialog,30)}];isRamadan()&&n.unshift({icon:"🌙",label:L("imsakiya"),fn:()=>setTimeout(imsakiya,30)}),isKids()||n.push({icon:"📊",label:L("stats"),fn:()=>setTimeout(statsDialog,30)}),t.splice(2,0,...n);const a=$("dbox").querySelector(".mgrid");a.innerHTML=t.map((e,s)=>`<button class="btn f${e.pri?" pri":""}" data-di="${s}">${e.icon?`<b>${esc(e.icon)}</b>`:""}${esc(e.label)}</button>`).join(""),focus(a.querySelector(".f"))};const _ACTIONS=ACTIONS;ACTIONS=()=>_ACTIONS().concat([["📻",L("quranRadio"),radioMenu],["📿",L("azkar"),azkarDialog],["🌤",L("forecast"),forecastDialog],["🌙",L("imsakiya"),imsakiya],["📊",L("stats"),statsDialog]]),window.lifeSettings=()=>sec(L("sHijri"),field(L("hijriShow"),seg("hijri",[[1,L("on")],[0,L("off")]]).replace(/<\/div>$/,`<span class="btn sm">${esc((hijriParts(new Date)||{}).txt||"")}</span></div>`))+field(L("hijriAdj"),seg("hijriAdj",[[-1,"-1"],[0,"0"],[1,"+1"]]))+field(L("ramadanMode"),seg("ramadan",[["auto",L("auto")],["on",L("on")],["off",L("off")]]).replace(/<\/div>$/,`<button class="btn f" id="imsakBtn">🌙 ${L("imsakiya")}</button></div>`))+field("",`<div class="inline"><button class="btn f" id="radioBtn">📻 ${L("quranRadio")}</button><button class="btn f" id="azkarBtn">📿 ${L("azkar")}</button><button class="btn f" id="fcBtn">🌤 ${L("forecast")}</button><button class="btn f" id="statsBtn">📊 ${L("stats")}</button></div>`))+sec(L("frameExtra"),field("",`<div class="inline"><button class="btn f${S.fw.azkar?" pri":""}" data-tog="fw:azkar">📿 ${L("azkar")}</button></div>`)),AFTER.hijri=tick,AFTER.hijriAdj=tick,AFTER.ramadan=()=>{tick(),updateTicker()},activators.push(t=>{switch(t.id){case"imsakBtn":return imsakiya(),!0;case"radioBtn":return radioMenu(),!0;case"azkarBtn":return azkarDialog(),!0;case"fcBtn":return forecastDialog(),!0;case"statsBtn":return statsDialog(),!0}return!1});const _weather=weather;weather=function(){return l(this,null,function*(){yield _weather(),loadForecast()})},DEF.wallAuto="";let WALL_CATS=()=>[["bing","🌍",L("wBing")],["nature","🌳",L("wNature")],["space","🌌",L("wSpace")],["city","🏙",L("wCity")],["mountains","🏔",L("wMount")],["ocean","🌊",L("wSea")],["cars","🚗",L("wCars")],["minimalism","◻️",L("wMinimal")],["islamic architecture","🕌",L("wMosque")]];function wallMenu(){const t=[{icon:"🔄",label:L("wBingAuto")+(S.wallAuto==="bing"?" ✓":""),pri:S.wallAuto==="bing"?1:0,fn:()=>{S.wallAuto="bing",bingToday(!0)}}].concat(WALL_CATS().map(n=>({icon:n[1],label:n[2],fn:()=>setTimeout(()=>wallBrowse(n[0],n[2],1),30)})));dialog("🖼 "+L("w4k"),t,{grid:3})}function wallList(t,n){return l(this,null,function*(){if(t==="bing"){const e=[];for(const i of[0,7])try{((yield A.fetchJSON(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=${i}&n=8&mkt=en-US`)).images||[]).forEach(o=>e.push({full:"https://www.bing.com"+o.urlbase+"_UHD.jpg",thumb:"https://www.bing.com"+o.urlbase+"_400x240.jpg"}))}catch(r){}const s={};return e.filter(i=>!s[i.full]&&(s[i.full]=1))}return((yield A.fetchJSON(`https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(t)}&categories=100&purity=100&atleast=3840x2160&ratios=16x9&sorting=toplist&page=${n}`)).data||[]).map(e=>({full:e.path,thumb:e.thumbs&&(e.thumbs.small||e.thumbs.original)}))})}function wallBrowse(t,n,a){return l(this,null,function*(){banner("🖼",L("w4k"),"...",2500);let e=[];try{e=yield wallList(t,a)}catch(r){}if(!e.length){A.toast(L("loadErr"));return}const s=e.map(r=>({fn:()=>{S.wallAuto="",setWall(r.full,!0)}})),i=t!=="bing";i&&s.push({fn:()=>setTimeout(()=>wallBrowse(t,n,a+1),30)}),dialog("🖼 "+n+" · 4K",s,{html:`<div class="wgrid">${e.map((r,o)=>`<button class="btn f wthumb" data-di="${o}"><img src="${esc(r.thumb)}" alt=""></button>`).join("")}${i?`<button class="btn f wthumb wmore" data-di="${e.length}">${esc(L("more"))} ›</button>`:""}</div>`})})}function bingToday(t){return l(this,null,function*(){if(S.wallAuto!=="bing")return;const n=new Date().toDateString();if(!(!t&&S.wallDay===n))try{const a=yield A.fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"),e=a.images&&a.images[0];e&&(S.wallDay=n,yield setWall("https://www.bing.com"+e.urlbase+"_1920x1080.jpg",t))}catch(a){t&&A.toast(L("loadErr"))}})}setTimeout(()=>bingToday(!1),4e3),setInterval(()=>bingToday(!1),36e5),activators.push(t=>t.id==="wall4k"?(wallMenu(),!0):!1),DEF.setupSeen=!1,DEF.lastBackup=0;const yes=t=>t?"✅":"⚠️";function setupWizard(){const t=NA&&NA.isDefaultHome?nat("isDefaultHome"):!0,n=NA?!!nat("guardService"):!0,a=window.__chromeVer||0,e=!a||a>=70,s=S.lastBackup>0,i=[[yes(t),L("suHome"),t?"":L("suHomeBtn"),"suHome"],[yes(n),L("suGuard"),n?"":L("guardEnable"),"suGuard"],[yes(e),L("suWv")+(a?" · Chrome "+a:""),e?"":L("suWvBtn"),"suWv"],[yes(!NA||shz()!=="none"),"Shizuku",!NA||shz()!=="none"?"":L("stInstall"),"suShz"],[yes(s),L("suBackup"),L("suBackupBtn"),"suBackup"],["🧪",L("suTest"),L("suTestBtn"),"suTest"]],r=i.map(o=>({fn:()=>setupAct(o[3])})).concat([{fn:()=>{S.setupSeen=!0}}]);dialog("🧭 "+L("setup"),r,{html:`<div class="sub">${esc(L("setupSub"))}</div><div class="dlist">${i.map((o,c)=>`<button class="btn f${o[2]&&o[0]!=="✅"?" pri":""}" data-di="${c}"><b>${o[0]}</b>${esc(o[1])}${o[2]?` — ${esc(o[2])}`:""}</button>`).join("")}<div class="empty">🛡 ${esc(L("suStock"))}</div><button class="btn f" data-di="${i.length}">${esc(L("ok"))}</button></div>`})}function setupAct(t){t==="suHome"?(A.toast(L("suHomeHint")),nat("askHome")):t==="suGuard"?nat("openAccessibility"):t==="suWv"?nat("openUri","market://details?id=com.google.android.webview"):t==="suBackup"?(exportBackup(),S.lastBackup=Date.now()):t==="suShz"?installShizuku():t==="suTest"&&setTimeout(selfTest,30)}function selfTest(){return l(this,null,function*(){const t=[],n=e=>dialog("🧪 "+L("suTest"),[{label:L("ok"),pri:1,fn:()=>{}}],{html:`<div class="dlist">${t.map(s=>`<div class="btn" style="text-align:start"><b>${s[0]}</b>${esc(s[1])}${s[2]?` <span style="opacity:.6">· ${esc(s[2])}</span>`:""}</div>`).join("")}${e?"":`<div class="empty">⏳ ${esc(L("suTesting"))}</div>`}<button class="btn pri f" data-di="0">${esc(L("ok"))}</button></div>`}),a=(e,s)=>l(this,null,function*(){n(!1);let i;try{i=yield Promise.race([s(),new Promise((r,o)=>setTimeout(()=>o(new Error("timeout")),2e4))])}catch(r){i=[!1,String(r.message||r).slice(0,60)]}t.push([i[0]===null?"➖":i[0]?"✅":"❌",e,i[1]||""])});yield a(L("tNet"),()=>l(this,null,function*(){return yield A.fetchText("https://www.google.com/generate_204"),[!0]})),yield a(L("tLists"),()=>l(this,null,function*(){return(S.lists||[]).length?[channels.length>0,channels.length+" "+L("channelsS")]:[null,L("tSkip")]})),yield a(L("tChan"),()=>l(this,null,function*(){const e=channels[0];return e?[!!(yield A.checkStreams([e.url]))[e.url],e.name]:[null,L("tSkip")]})),yield a(L("tEpg"),()=>l(this,null,function*(){return typeof epgUrl!="function"||!epgUrl()?[null,L("tSkip")]:[Object.keys(epg).length>0,Object.keys(epg).length+""]})),yield a(L("tRadio"),()=>l(this,null,function*(){return[!!JSON.parse(yield natAsync("resolveUrl",RADIO_FB[0].url)).url,RADIO_FB[0].name]})),yield a(L("tWeather"),()=>l(this,null,function*(){const e=yield A.fetchJSON("https://api.open-meteo.com/v1/forecast?latitude=30.04&longitude=31.24&current=temperature_2m");return[!!e.current,e.current?e.current.temperature_2m+"°":""]})),yield a(L("tMatches"),()=>l(this,null,function*(){const e=yield A.fetchJSON("https://www.thesportsdb.com/api/v1/json/123/all_leagues.php");return[!!(e&&e.leagues)]})),yield a(L("tWall"),()=>l(this,null,function*(){const e=yield A.fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US");return[!!(e.images&&e.images.length)]})),yield a(L("tCodes"),()=>l(this,null,function*(){return yield natAsync("resolveUrl","https://aftv.news/"),[!0]})),yield a(L("tUpd"),()=>l(this,null,function*(){return S.repo?(yield natAsync("checkUpdate",S.repo),[!0,S.repo]):[null,L("tSkip")]})),n(!0)})}activators.push(t=>t.id==="setupBtn"?(setupWizard(),!0):!1),setTimeout(()=>{!S.setupSeen&&NA&&NA.isDefaultHome&&!nat("isDefaultHome")&&(S.setupSeen=!0,setupWizard())},6e3);function setWall(t,n){return l(this,null,function*(){n&&banner("🖼",L("w4k"),"...",2e3);let a=t;try{NA&&NA.cacheImage&&(a=yield natAsync("cacheImage",t,Math.min(1920,Math.max(1280,Math.round(screen.width*(window.devicePixelRatio||1))))))}catch(e){}S.wallImg=a,S.wall="image",applyLook(),window.renderSettings&&$("settings").classList.contains("on")&&renderSettings(),n&&A.toast(L("saved"))})}window.setWall=setWall,setTimeout(()=>{/^https?:/.test(S.wallImg||"")&&S.wall==="image"&&setWall(S.wallImg,!1)},5e3);

;
/* store.js */
"use strict";var d=(e,t,s)=>new Promise((n,a)=>{var o=l=>{try{r(s.next(l))}catch(i){a(i)}},c=l=>{try{r(s.throw(l))}catch(i){a(i)}},r=l=>l.done?n(l.value):Promise.resolve(l.value).then(o,c);r((s=s.apply(e,t)).next())});Object.assign(DEF,{catalogUrl:"",animFast:!1});const CATALOG=[{id:"tvbro",cat:"browser",name:"TV Bro",pkg:"com.phlox.tvwebbrowser",icon:"🌐",color:"#1565c0",src:["github:truefedot/tv-bro|universal|release","play:com.phlox.tvwebbrowser"],star:1,desc:{ar:"متصفح للتلفزيون بمؤشر للريموت ومانع إعلانات مدمج",en:"TV browser with remote cursor and built-in ad blocker"}},{id:"adguard",cat:"browser",name:"AdGuard TV",pkg:"com.adguard.android.tv",icon:"🛡️",color:"#2e7d32",src:["web:https://adguard.com/adguard-android-tv/overview.html"],desc:{ar:"مانع إعلانات لكل الجهاز (DNS)",en:"System-wide ad blocking (DNS)"}},{id:"vlc",cat:"player",name:"VLC",pkg:"org.videolan.vlc",icon:"🔶",color:"#ef6c00",src:["fdroid:org.videolan.vlc","play:org.videolan.vlc"],star:1,desc:{ar:"بيشغّل أي فيديو وأي ترجمة",en:"Plays any video, any subtitle"}},{id:"kodi",cat:"player",name:"Kodi",pkg:"org.xbmc.kodi",icon:"🔷",color:"#0277bd",src:["play:org.xbmc.kodi"],desc:{ar:"مركز ميديا كامل",en:"Full media center"}},{id:"mx",cat:"player",name:"MX Player",pkg:"com.mxtech.videoplayer.ad",icon:"▶️",color:"#1e88e5",src:["play:com.mxtech.videoplayer.ad"],desc:{ar:"مشغّل فيديو خفيف",en:"Lightweight video player"}},{id:"jellyfin",cat:"player",name:"Jellyfin",pkg:"org.jellyfin.androidtv",icon:"🟣",color:"#6a1b9a",src:["fdroid:org.jellyfin.androidtv"],desc:{ar:"مكتبة أفلامك من الكمبيوتر",en:"Your own media server"}},{id:"plex",cat:"player",name:"Plex",pkg:"com.plexapp.android",icon:"🟠",color:"#e65100",src:["play:com.plexapp.android"],desc:{ar:"مكتبة ميديا وقنوات مجانية",en:"Media library and free channels"}},{id:"tivimate",cat:"iptv",name:"TiviMate",pkg:"ar.tvplayer.tv",icon:"📺",color:"#283593",src:["play:ar.tvplayer.tv"],star:1,desc:{ar:"أشهر مشغّل IPTV للتلفزيون",en:"Popular IPTV player"}},{id:"smarters",cat:"iptv",name:"IPTV Smarters Pro",pkg:"com.nst.iptvsmarterstvbox",icon:"📡",color:"#00695c",src:["play:com.nst.iptvsmarterstvbox"],desc:{ar:"مشغّل IPTV بيدعم Xtream",en:"IPTV player with Xtream"}},{id:"ottnav",cat:"iptv",name:"OTT Navigator",pkg:"studio.scillarium.ottnavigator",icon:"🧭",color:"#4527a0",src:["play:studio.scillarium.ottnavigator"],desc:{ar:"مشغّل IPTV بدليل برامج",en:"IPTV player with guide"}},{id:"perfect",cat:"iptv",name:"Perfect Player",pkg:"com.niklabs.pp",icon:"🎛️",color:"#37474f",src:["play:com.niklabs.pp"],desc:{ar:"مشغّل IPTV خفيف",en:"Lightweight IPTV player"}},{id:"netflix",cat:"stream",name:"Netflix",pkg:"com.netflix.ninja",icon:"🎬",color:"#b71c1c",src:["play:com.netflix.ninja"]},{id:"youtube",cat:"stream",name:"YouTube",pkg:"com.google.android.youtube.tv",icon:"▶️",color:"#c62828",src:["play:com.google.android.youtube.tv"]},{id:"shahid",cat:"stream",name:"Shahid",pkg:"net.mbc.shahidTV",icon:"🎞️",color:"#00838f",src:["play:net.mbc.shahidTV","search:Shahid"]},{id:"watchit",cat:"stream",name:"WATCH IT",pkg:"com.watchit.vod.androidtv",icon:"🎥",color:"#f9a825",src:["search:WATCH IT"]},{id:"osn",cat:"stream",name:"OSN+",pkg:"com.osn.go",icon:"🍿",color:"#4a148c",src:["search:OSN+"]},{id:"prime",cat:"stream",name:"Prime Video",pkg:"com.amazon.amazonvideo.livingroom",icon:"📦",color:"#0d47a1",src:["play:com.amazon.amazonvideo.livingroom"]},{id:"disney",cat:"stream",name:"Disney+",pkg:"com.disney.disneyplus",icon:"✨",color:"#1a237e",src:["play:com.disney.disneyplus"]},{id:"anghami",cat:"stream",name:"Anghami",pkg:"com.anghami",icon:"🎵",color:"#6a1b9a",src:["search:Anghami"]},{id:"spotify",cat:"stream",name:"Spotify",pkg:"com.spotify.tv.android",icon:"🎧",color:"#1b5e20",src:["play:com.spotify.tv.android"]},{id:"tod",cat:"sports",name:"TOD (beIN)",pkg:"",icon:"⚽",color:"#5e35b1",src:["search:TOD beIN"],star:1,desc:{ar:"الطريقة الرسمية لقنوات beIN",en:"Official beIN streaming"}},{id:"ssc",cat:"sports",name:"SSC / Shahid Sports",pkg:"",icon:"🏟️",color:"#00897b",src:["search:SSC sports"],desc:{ar:"الدوري السعودي رسمي",en:"Saudi league, official"}},{id:"onsport",cat:"sports",name:"Watch It Sports",pkg:"",icon:"🏆",color:"#ef6c00",src:["search:WATCH IT"],desc:{ar:"الدوري المصري رسمي",en:"Egyptian league, official"}},{id:"shizuku",cat:"tools",name:"Shizuku",pkg:"moe.shizuku.privileged.api",icon:"🔑",color:"#00796b",src:["github:RikkaApps/Shizuku|release","play:moe.shizuku.privileged.api"],star:1,desc:{ar:"لازم عشان مسح تطبيقات النظام من غير روت",en:"Needed to remove system apps without root"}},{id:"downloader",cat:"tools",name:"Downloader",pkg:"com.esaba.downloader",icon:"⬇️",color:"#e65100",src:["play:com.esaba.downloader"],desc:{ar:"تنزيل ملفات بالرابط",en:"Download files by URL"}},{id:"sendfiles",cat:"tools",name:"Send Files to TV",pkg:"com.yablio.sendfilestotv",icon:"📲",color:"#1565c0",src:["play:com.yablio.sendfilestotv"],desc:{ar:"نقل ملفات من الموبايل",en:"Send files from your phone"}},{id:"xplore",cat:"tools",name:"X-plore",pkg:"com.lonelycatgames.Xplore",icon:"🗂️",color:"#455a64",src:["play:com.lonelycatgames.Xplore"],desc:{ar:"مدير ملفات",en:"File manager"}},{id:"analiti",cat:"tools",name:"Analiti Speed Test",pkg:"com.analiti.fastest.android",icon:"📶",color:"#0277bd",src:["play:com.analiti.fastest.android"],desc:{ar:"قياس سرعة النت والواي فاي",en:"Internet & Wi-Fi speed test"}}],STORE_CATS=[["all","⭐","stAll"],["browser","🌐","stBrowser"],["player","🎬","stPlayer"],["iptv","📡","stIptv"],["stream","🍿","stStream"],["sports","⚽","stSports"],["tools","🛠️","stTools"]];let storeCat="all",customCatalog=[],resolved={};const allCatalog=()=>CATALOG.concat(customCatalog);function loadCustomCatalog(){return d(this,null,function*(){if(!S.catalogUrl){customCatalog=[];return}try{const e=yield A.fetchJSON(S.catalogUrl);customCatalog=(Array.isArray(e)?e:e.apps||[]).filter(t=>t&&t.name&&t.src).map((t,s)=>Object.assign({id:"c"+s,cat:t.cat||"tools",icon:t.icon||"📦",color:t.color||"#455a64",custom:1},t,{src:[].concat(t.src)}))}catch(e){customCatalog=[],A.toast(L("loadErr"))}})}const pinfo=e=>{if(!e)return null;try{const t=nat("pkgInfo",e);return t?JSON.parse(t):null}catch(t){return null}},vcmp=(e,t)=>{const s=String(e||"").split(/[.\-]/).map(a=>parseInt(a)||0),n=String(t||"").split(/[.\-]/).map(a=>parseInt(a)||0);for(let a=0;a<Math.max(s.length,n.length);a++)if((s[a]||0)!==(n[a]||0))return(s[a]||0)-(n[a]||0);return 0};function resolveSrc(e){return d(this,null,function*(){if(resolved[e.id])return resolved[e.id];for(const t of e.src){const[s,...n]=t.split(":"),a=n.join(":");try{if(s==="fdroid"){const o=yield A.fetchJSON(`https://f-droid.org/api/v1/packages/${a}`),c=o.suggestedVersionCode,r=(o.packages||[]).find(l=>l.versionCode===c)||{};return resolved[e.id]={type:s,apk:`https://f-droid.org/repo/${a}_${c}.apk`,ver:r.versionName||String(c)}}if(s==="github"){const[o,...c]=a.split("|"),r=yield A.fetchJSON(`https://api.github.com/repos/${o}/releases/latest`),l=(r.assets||[]).filter(u=>/\.apk$/i.test(u.name));let i=l.find(u=>c.every(m=>new RegExp(m,"i").test(u.name)))||l.find(u=>/universal|armeabi-v7a|arm7/i.test(u.name))||l[0];if(i)return resolved[e.id]={type:s,apk:i.browser_download_url,ver:String(r.tag_name||"").replace(/^v/i,"")}}if(s==="url")return resolved[e.id]={type:s,apk:a,ver:""};if(s==="play")return resolved[e.id]={type:s,play:`market://details?id=${a}`};if(s==="search")return resolved[e.id]={type:s,play:`market://search?q=${encodeURIComponent(a)}&c=apps`};if(s==="web")return resolved[e.id]={type:s,web:a}}catch(o){}}return resolved[e.id]={type:"none"}})}function appStatus(e){const t=pinfo(e.pkg),s=resolved[e.id];return t?s&&s.ver&&vcmp(s.ver,t.vn)>0?{inst:!0,upd:!0,label:`${L("stUpdate")} ${s.ver}`,vn:t.vn}:{inst:!0,label:L("stInstalled"),vn:t.vn}:{inst:!1,label:L("stInstall")}}function storeCard(e){const t=appStatus(e),s=e.desc&&(e.desc[S.lang]||e.desc.en)||"";return`<div class="scard f" tabindex="0" data-store="${esc(e.id)}"><div class="sico" style="background:${esc(e.color)}">${esc(e.icon)}</div>
    <div class="stx"><b>${esc(e.name)}${e.star?" ⭐":""}</b><small>${esc(s)}</small></div>
    <span class="sbadge${t.upd?" upd":t.inst?" ok":""}">${t.upd?"⬆️ ":t.inst?"✓ ":""}${esc(t.label)}</span></div>`}function renderStore(){const e=[["boost","✨","stBoost"],["clean","🧽","stClean"],["sys","🧹","stSystem"],["ram","⚡","stRam"],["code","🔢","stCode"],["link","🔗","stLink"],["custom","📚","stCustom"]];$("storeCats").innerHTML=STORE_CATS.map(([n,a,o])=>`<div class="it f${storeCat===n?" sel":""}" tabindex="0" data-scat="${n}">${a} ${L(o)}</div>`).join("")+`<div class="cath">${L("stTools2")}</div>`+e.map(([n,a,o])=>`<div class="it f${storeCat===n?" sel":""}" tabindex="0" data-scat="${n}">${a} ${L(o)}</div>`).join("");const t=$("storeMain");if(storeCat==="sys")return renderSysApps();if(storeCat==="ram")return renderRam();if(storeCat==="clean")return renderClean();if(storeCat==="boost")return renderBoost();if(storeCat==="code"){const n=S.myCodes||[];t.innerHTML=`<div class="sec"><h3>🔢 ${L("stCode")}</h3><div class="field"><label>${L("stCodeHint")}</label>${inputRow("codeIn","","12345","codeGo",L("stInstall"))}</div><div id="dlState" class="field"></div></div>
    <div class="sec"><h3>⭐ ${L("myCodes")}</h3><div class="field"><label>${L("myCodesHint")}</label><div class="inline"><input class="inp f" id="mcNum" placeholder="${L("codeNum")}" style="width:10vw"><input class="inp f" id="mcUrl" placeholder="https://..." dir="ltr" style="flex:1"><input class="inp f" id="mcName" placeholder="${L("codeName")}" style="width:14vw"><button class="btn pri f" id="mcAdd">${L("save")}</button></div></div>
    ${n.length?`<div class="list">${n.map((a,o)=>`<div class="inline" style="margin-bottom:.8vh"><button class="btn f" data-mc="${o}" style="flex:1;text-align:start"><b dir="ltr">${esc(a.n)}</b> · ${esc(a.name||a.url)}</button><button class="btn f" data-mcdel="${o}">🗑</button></div>`).join("")}</div>`:""}</div>`;return}if(storeCat==="link"){t.innerHTML=`<div class="sec"><h3>🔗 ${L("stLink")}</h3><div class="field"><label>${L("stLinkHint")}</label>${inputRow("apkUrl","","https://.../app.apk","apkGo",L("stInstall"))}</div><div id="dlState" class="field"></div></div>`;return}if(storeCat==="custom"){t.innerHTML=`<div class="sec"><h3>📚 ${L("stCustom")}</h3><div class="field"><label>${L("stCustomHint")}</label>${inputRow("catUrl",S.catalogUrl,"https://.../catalog.json","catSave")}</div>
    <div class="field"><label>${L("stCustomFmt")}</label><pre class="code" dir="ltr">[{"name":"My App","icon":"📺","cat":"iptv","pkg":"com.example.app",
  "src":"url:https://example.com/app.apk"}]</pre></div>${customCatalog.length?`<div class="sgrid">${customCatalog.map(storeCard).join("")}</div>`:""}</div>`;return}const s=allCatalog().filter(n=>storeCat==="all"?n.star||n.custom:n.cat===storeCat);t.innerHTML=`<div class="sgrid">${s.map(storeCard).join("")}</div>`,s.forEach(n=>{!resolved[n.id]&&n.src.some(a=>/^(fdroid|github):/.test(a))&&pinfo(n.pkg)&&resolveSrc(n).then(()=>{const a=t.querySelector(`[data-store="${cssq(n.id)}"]`);if(a&&a.isConnected){const o=focused===a;a.outerHTML=storeCard(n),o&&focus(t.querySelector(`[data-store="${cssq(n.id)}"]`))}})})}function storeAction(e){return d(this,null,function*(){if(e&&e.id==="shizuku"&&!pinfo(e.pkg)&&nat("hasBundled","shizuku.apk")){nat("installBundled","shizuku.apk","st:Shizuku");return}const t=appStatus(e),s=[];banner("⏳",e.name,L("loading"),1500);const n=yield resolveSrc(e),a=appStatus(e);a.inst&&s.push({icon:"▶️",label:L("open"),pri:!a.upd,fn:()=>launch(e.pkg)}),n.apk&&(!a.inst||a.upd)&&s.push({icon:"⬇️",label:a.upd?`${L("stUpdate")} ${n.ver}`:`${L("stInstall")}${n.ver?" "+n.ver:""}`,pri:1,fn:()=>installFrom(e.name,n.apk)}),n.play&&s.push({icon:"🛍️",label:L("stPlay"),pri:!a.inst&&!n.apk,fn:()=>nat("openUri",n.play)}),n.web&&s.push({icon:"🌐",label:L("stWeb"),pri:!a.inst,fn:()=>openWeb(n.web)}),a.inst&&s.push({icon:"🗑",label:L("stRemove"),fn:()=>nat("uninstallApp",e.pkg)},{icon:"ℹ️",label:L("info"),fn:()=>A.appInfo(e.pkg)}),s.length||s.push({label:L("stNoSrc"),fn:()=>{}}),s.push({label:L("cancel"),fn:()=>{}}),dialog(`${e.icon} ${e.name}${a.vn?" · v"+a.vn:""}`,s,{sub:e.desc?e.desc[S.lang]||e.desc.en:""})})}function installFrom(e,t){if(!NA){A.toast(t);return}banner("⬇️",e,L("updDownloading"),3e3),nat("installApk",t,"st:"+e)}window.onApkProgress=(e,t)=>{if(e==="update")return;const s=e.replace(/^st:/,"");t===-2?banner("🔐",L("updPerm"),L("updPermSub"),12e3):t===-1?banner("⚠️",s,L("loadErr")):t===100?banner("✅",s,L("updReady")):t>0&&t%20===0&&banner("⬇️",s,t+"%",2e3);const n=$("dlState");n&&(n.textContent=t>=0?`${s}: ${t}%`:"")};function openWeb(e){const t=pinfo("com.phlox.tvwebbrowser");nat("openUri",e)}function openBrowser(){const e=CATALOG.find(t=>t.id==="tvbro");pinfo(e.pkg)?launch(e.pkg):(showPage("store"),storeCat="browser",renderStore(),storeAction(e))}const RED=[/^android$/,/^com\.android\.(systemui|settings|phone|shell|providers\..*|packageinstaller|permissioncontroller|externalstorage|inputdevices|location\.fused|networkstack.*|bluetooth|wifi.*|se|server\.telecom|keychain|certinstaller|documentsui|tv\.settings|webview|media.*|ext\..*|localtransport|sharedstoragebackup|vpndialogs|captiveportallogin|cellbroadcast.*|dynsystem|statementservice|proxyhandler|emergency|mtp)$/,/^com\.google\.android\.(webview|gms|gsf|ext\..*|packageinstaller|permissioncontroller|tv\.frameworkpackagestubs|leanback\.ime|inputmethod\..*|tvlauncher|apps\.tv\.launcherx|networkstack.*|modulemetadata|tv\.remote\.service)$/,/^com\.mahmoud\.tvlauncher$/,/launcher|homescreen|\.home$|\.tvhome/i,/^moe\.shizuku\.privileged\.api$/,/ime$|keyboard|inputmethod/i,/^com\.(amlogic|droidlogic|mediatek|rockchip|realtek|hisilicon)\./],GREEN=[/^com\.google\.android\.(tvrecommendations|feedback|play\.games|music|videos|youtube\.tvmusic|marvin\.talkback|backdrop|tv\.bugreportsender|partnersetup|sss\.authbridge|apps\.tv\.dreamx|tts)$/,/^com\.android\.(printspooler|dreams\..*|gallery3d|calendar|email|egg|bips|bookmarkprovider|calllogbackup|wallpaper.*|providers\.calendar|smspush|stk|musicfx|soundrecorder|camera2|deskclock|htmlviewer|traceur|onetimeinitializer)$/,/^com\.(netflix\.partner\.activation|amazon\..*\.demo|facebook\..*)$/,/demo|sample|tutorial|bugreport|feedback|ota\.|update\.client/i],ADS=[/(^|\.)(ads?|adservice|adsdk|advert\w*|analytics|telemetry|tracking|tracker|statistics?|crashreport\w*|logcollect\w*|datacollect\w*|usagestats\w*|marketing|promo\w*|recommend\w*|tvrecommendations)(\.|$)/i,/^com\.(xiaomi|mitv|miui)\.\w*(ad|analytics|stat|track)\w*/i,/^com\.(tcl|hisense|skyworth|amlogic\.ota)\.\w*(ad|analytics|report|stat)\w*/i],ADS_KEEP=[/^com\.google\.android\.adservices/,/^com\.android\.providers\./],isAds=e=>ADS.some(t=>t.test(e))&&!ADS_KEEP.some(t=>t.test(e)),CORE=[/^android$/,/^com\.android\.(systemui|shell|providers\.settings|webview)$/,/^com\.google\.android\.webview$/,/^com\.android\.chrome$/,/^com\.mahmoud\.tvlauncher$/,/^moe\.shizuku\.privileged\.api$/];DEF.sysExpert=!1;const isCore=e=>CORE.some(t=>t.test(e)),tier=e=>isCore(e)?"red":S.sysExpert&&RED.some(t=>t.test(e))?"yellow":RED.some(t=>t.test(e))?"red":isAds(e)?"ads":GREEN.some(t=>t.test(e))?"green":"yellow";let pkgs=[],sysFilter="sys";const TORDER={ads:0,green:1,yellow:2,red:3};function loadPkgs(){try{pkgs=JSON.parse(nat("listPackages")||"[]")}catch(e){pkgs=[]}pkgs.sort((e,t)=>TORDER[tier(e.pkg)]-TORDER[tier(t.pkg)]||e.name.localeCompare(t.name))}const shz=()=>nat("shizukuState")||"none";function shizukuCard(){const e=shz(),t={none:L("szNone"),stopped:L("szStopped"),denied:L("szDenied"),ok:L("szOk")}[e],s=e==="none"?`<button class="btn pri f" id="szInstall">⬇️ ${L("stInstall")} Shizuku</button>`:e==="stopped"?`<button class="btn pri f" id="szOpen">▶️ ${L("szStart")}</button>`:e==="denied"?`<button class="btn pri f" id="szAllow">✅ ${L("szAllowBtn")}</button>`:"";return`<div class="szcard ${e}"><b>${e==="ok"?"🔓":"🔒"} Shizuku</b><span>${t}</span>${s}${e!=="ok"?`<button class="btn f" id="szHelp">❔ ${L("szHow")}</button>`:""}</div>`}function renderSysApps(){pkgs.length||loadPkgs();const e=pkgs.filter(a=>sysFilter==="removed"?!a.inst:sysFilter==="ads"?a.inst&&tier(a.pkg)==="ads":sysFilter==="sys"?a.sys&&a.inst:a.inst),t=pkgs.filter(a=>a.inst&&tier(a.pkg)==="ads").length,s=(a,o)=>`<button class="btn sm f${sysFilter===a?" pri":""}" data-sysf="${a}">${o}</button>`,n=pkgs.filter(a=>a.sys&&a.inst&&tier(a.pkg)==="green").length;$("storeMain").innerHTML=`<div class="sec"><h3>🧹 ${L("stSystem")}</h3>${shizukuCard()}
    <div class="inline" style="margin:1.4vh 0">${s("sys",L("sysOnly"))}${s("ads","📢 "+L("adsApps")+" ("+t+")")}${s("all",L("allApps"))}${s("removed",L("removedApps"))}
      ${t?`<button class="btn pri f" id="adsBulk">📢 ${L("removeAds")} (${t})</button>`:""}
      ${n?`<button class="btn f" id="sysBulk">🧹 ${L("removeSafe")} (${n})</button>`:""}<button class="btn f${S.sysExpert?" pri":""}" id="sysExpert">🧨 ${L("sysExpert")}: ${S.sysExpert?L("on"):L("off")}</button>${S.sysExpert?`<button class="btn f" id="sysAll">🧨 ${L("removeAll")}</button>`:""}<button class="btn f" id="sysAdb">💻 ${L("adbCmds")}</button></div>
    <div class="legend">🟠 ${L("tAds")} · 🟢 ${L("tGreen")} · 🟡 ${L("tYellow")} · 🔴 ${L("tRed")}</div>
    <div class="syslist">${e.map(a=>{const o=tier(a.pkg);return`<div class="sysrow f" tabindex="0" data-sys="${esc(a.pkg)}"><span class="tdot2 ${o}"></span>
      <span class="sn"><b>${esc(a.name)}</b><small dir="ltr">${esc(a.pkg)}</small></span><span class="ss">${a.inst?a.on?"":"⏸ "+L("sDisabled"):"🗑 "+L("sRemoved")}</span><span class="sz">${(a.size/1048576).toFixed(1)} MB</span></div>`}).join("")||`<div class="empty">${L("noRes")}</div>`}</div></div>`}const SHCMD={remove:e=>`pm uninstall -k --user 0 ${e}`,disable:e=>`pm disable-user --user 0 ${e}`,enable:e=>`pm enable ${e}`,restore:e=>`cmd package install-existing ${e}`,stop:e=>`am force-stop ${e}`};function runShell(e){return d(this,null,function*(){const t=JSON.parse(yield natAsync("shell",e));if(t.code!==0&&!/Success/i.test(t.out))throw new Error(t.out||"exit "+t.code);return t.out})}function sysDo(e,t,s){return d(this,null,function*(){if(tier(t)==="red"&&(e==="remove"||e==="disable"))return A.toast(L("tRedMsg")),!1;if(shz()!=="ok")return s||dialog(L("adbCmds"),[{label:L("info"),fn:()=>A.appInfo(t)},{label:L("done"),pri:1,fn:()=>{}}],{sub:`${L("szNeeded")}

adb shell ${SHCMD[e](t)}`}),!1;try{return yield runShell(SHCMD[e](t)),s||banner("✅",t,L("sDone")),!0}catch(n){return s||banner("⚠️",t,n.message),!1}})}function sysMenu(e){const t=pkgs.find(o=>o.pkg===e)||{pkg:e,name:e,inst:!0,on:!0},s=tier(e),n=[],a=()=>{loadPkgs(),renderSysApps();const o=document.querySelector(`[data-sys="${cssq(e)}"]`);o&&focus(o)};t.inst?(s!=="red"&&n.push({icon:"🗑",label:L("sRemove"),pri:s==="green"||s==="ads",fn:()=>{const o=()=>sysDo("remove",e).then(a);s==="yellow"?setTimeout(()=>dialog(`⚠️ ${t.name}`,[{label:L("sRemoveAnyway"),fn:o},{label:L("cancel"),pri:1,fn:()=>{}}],{sub:L("tYellowMsg")}),30):o()}},{icon:t.on?"⏸":"▶️",label:t.on?L("sDisable"):L("sEnable"),fn:()=>sysDo(t.on?"disable":"enable",e).then(a)}),n.push({icon:"⏹",label:L("sStop"),fn:()=>sysDo("stop",e)},{icon:"ℹ️",label:L("info"),fn:()=>A.appInfo(e)})):n.push({icon:"♻️",label:L("sRestore"),pri:1,fn:()=>sysDo("restore",e).then(a)}),n.push({label:L("cancel"),fn:()=>{}}),dialog(`${s==="red"?"🔴":s==="ads"?"🟠":s==="green"?"🟢":"🟡"} ${t.name}`,n,{sub:e+(s==="red"?`
`+L("tRedMsg"):"")})}function bulkRemove(e){return d(this,null,function*(){const t=pkgs.filter(s=>s.inst&&(e==="ads"?tier(s.pkg)==="ads":s.sys&&tier(s.pkg)==="green"));t.length&&dialog(`${e==="ads"?"📢 "+L("removeAds"):"🧹 "+L("removeSafe")} (${t.length})`,[{label:L("sRemove"),pri:1,fn:()=>d(this,null,function*(){if(shz()!=="ok"){adbDialog(t);return}let s=0;for(const n of t)(yield sysDo("remove",n.pkg,!0))&&s++;banner("✅",e==="ads"?L("removeAds"):L("removeSafe"),`${s}/${t.length}`),loadPkgs(),renderSysApps()})},{label:L("cancel"),fn:()=>{}}],{sub:t.map(s=>s.name).join(" · ").slice(0,500)})})}function bulkRemoveSafe(){return d(this,null,function*(){const e=pkgs.filter(t=>t.sys&&t.inst&&tier(t.pkg)==="green");dialog(`🧹 ${L("removeSafe")} (${e.length})`,[{label:L("sRemove"),pri:1,fn:()=>d(this,null,function*(){if(shz()!=="ok"){adbDialog(e);return}let t=0;for(const s of e)(yield sysDo("remove",s.pkg,!0))&&t++;banner("✅",L("removeSafe"),`${t}/${e.length}`),loadPkgs(),renderSysApps()})},{label:L("cancel"),fn:()=>{}}],{sub:e.map(t=>t.name).join(" · ").slice(0,400)})})}function adbDialog(e){const t=e||pkgs.filter(a=>a.sys&&a.inst&&tier(a.pkg)==="green"),n=[`adb connect ${remoteInfo().ip||"<TV-IP>"}:5555`,...t.map(a=>`adb shell pm uninstall -k --user 0 ${a.pkg}`)].join(`
`);dialog("💻 "+L("adbCmds"),[{label:L("done"),fn:()=>{}}],{html:`<div class="sub">${L("adbHint")}</div><pre class="code" dir="ltr">${esc(n)}</pre><div class="sub">${L("adbRestore")}</div><pre class="code" dir="ltr">adb shell cmd package install-existing &lt;package&gt;</pre><div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}function szHelp(){dialog("🔑 Shizuku",[{label:L("done"),fn:()=>{}}],{html:`<div class="steps">${L("szSteps").map((e,t)=>`<div><b>${t+1}</b> ${esc(e)}</div>`).join("")}</div><div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}window.onShizuku=()=>{storeCat==="sys"&&$("store").classList.contains("on")&&renderSysApps()};let scan=null,scanSel=new Set,scanning=!1;const MB=e=>(e/1048576).toFixed(e<10485760?1:0)+" MB",GB=e=>(e/1073741824).toFixed(2)+" GB";function storageInfo(){try{return JSON.parse(nat("storageInfo")||"{}")}catch(e){return{}}}function bar(e,t){const s=t?Math.round(e/t*100):0;return`<div class="rbar"><i style="width:${s}%;background:${s>90?"#e53935":s>75?"#fb8c00":"#43a047"}"></i></div>`}const SCAN_GROUPS=[["tmp","🗑️","cTmp",!0],["empty","📁","cEmpty",!0],["apk","📦","cApk",!1],["big","🐘","cBig",!1]];function renderClean(){const e=storageInfo(),t=NA?!!nat("hasStorageAccess"):!0;let s=`<div class="sec"><h3>🧽 ${L("stClean")}</h3>
    <div class="ram">${L("cInternal")}: <b>${e.total?GB(e.total-e.free):"—"}</b> / ${e.total?GB(e.total):"—"} · ${L("free")} <b>${e.free?GB(e.free):"—"}</b>${bar(e.total-e.free,e.total)}
      ${e.extTotal&&e.extTotal!==e.total?`${L("cShared")}: <b>${GB(e.extTotal-e.extFree)}</b> / ${GB(e.extTotal)}${bar(e.extTotal-e.extFree,e.extTotal)}`:""}</div>
    <div class="inline" style="margin:1.6vh 0">${t?`<button class="btn pri f" id="cScan">🔍 ${scanning?L("cScanning"):L("cScanBtn")}</button>`:`<button class="btn pri f" id="cAccess">🔓 ${L("cAllow")}</button>`}
      <button class="btn f" id="cCaches">🧹 ${L("cAllCaches")}${shz()==="ok"?"":" (Shizuku)"}</button>
      ${scan&&scanSel.size?`<button class="btn pri f" id="cDelete">🗑 ${L("cDeleteSel")} (${scanSel.size} · ${MB(selBytes())})</button>`:""}</div>`;if(scan){s+=`<div class="legend">${L("cFound")}: ${scan.files} ${L("cFiles")}</div>`;for(const[n,a,o]of SCAN_GROUPS){const c=scan[n]||[];if(!c.length)continue;const r=c.reduce((i,u)=>i+u[1],0),l=c.every(i=>scanSel.has(i[0]));s+=`<div class="cgroup"><button class="btn sm f${l?" pri":""}" data-cgrp="${n}">${l?"☑":"☐"} ${a} ${L(o)} — ${c.length} · ${MB(r)}</button></div><div class="syslist">`+c.slice(0,150).map(i=>`<div class="sysrow f${scanSel.has(i[0])?" csel":""}" tabindex="0" data-cfile="${esc(i[0])}"><span>${scanSel.has(i[0])?"☑":"☐"}</span>
          <span class="sn"><b dir="ltr">${esc(i[0].split("/").pop()||i[0])}</b><small dir="ltr">${esc(i[0].replace(/^\/storage\/emulated\/0\//,""))}</small></span><span class="ss">${i[2]?new Date(i[2]).toLocaleDateString():""}</span><span class="sz">${MB(i[1])}</span></div>`).join("")+"</div>"}SCAN_GROUPS.some(n=>(scan[n[0]]||[]).length)||(s+=`<div class="empty">✨ ${L("cClean")}</div>`)}$("storeMain").innerHTML=s+"</div>"}function selBytes(){if(!scan)return 0;let e=0;return SCAN_GROUPS.forEach(([t])=>(scan[t]||[]).forEach(s=>{scanSel.has(s[0])&&(e+=s[1])})),e}function runScan(e){return d(this,null,function*(){if(!NA)return scan={files:1834,apk:[["/storage/emulated/0/Download/TiviMate-4.7.apk",31457280,Date.now()-8e8],["/storage/emulated/0/Download/vlc-3.5.apk",47185920,Date.now()-2e9]],big:[["/storage/emulated/0/Movies/match-final.mkv",2147483648,Date.now()-5e8]],tmp:[["/storage/emulated/0/Android/data/com.netflix.ninja/cache",188743680,Date.now()],["/storage/emulated/0/.thumbnails",12582912,Date.now()]],empty:[["/storage/emulated/0/Download/old",0,Date.now()]]},e||autoSelect(),scan;scanning=!0,e||renderClean();try{scan=JSON.parse(yield natAsync("scanStorage")),e||autoSelect()}catch(t){A.toast(t.message)}return scanning=!1,!e&&storeCat==="clean"&&renderClean(),scan})}function autoSelect(){scanSel=new Set,SCAN_GROUPS.forEach(([e,,,t])=>{t&&(scan[e]||[]).forEach(s=>scanSel.add(s[0]))})}function deletePaths(e){if(!NA){let t=0;return SCAN_GROUPS.forEach(([s])=>(scan&&scan[s]||[]).forEach(n=>{e.includes(n[0])&&(t+=n[1])})),{n:e.length,bytes:t}}try{return JSON.parse(nat("deleteFiles",JSON.stringify(e))||"{}")}catch(t){return{}}}function trimCaches(){return d(this,null,function*(){if(shz()!=="ok")return A.toast(L("szNeeded")),!1;const e=storageInfo().free||0;try{yield runShell("pm trim-caches 999G");const t=storageInfo().free||0;return banner("🧹",L("cAllCaches"),"+"+MB(Math.max(0,t-e))),!0}catch(t){return A.toast(t.message),!1}})}let boostLog=null;function renderBoost(){$("storeMain").innerHTML=`<div class="sec"><h3>✨ ${L("stBoost")}</h3><div class="field"><label>${L("bDesc")}</label></div>
    <div class="inline"><button class="btn pri f" id="bGo">✨ ${L("bGo")}</button></div>
    ${boostLog?`<div class="steps" style="margin-top:2vh">${boostLog.map(e=>`<div>${e}</div>`).join("")}</div>`:""}</div>`}function boost(){return d(this,null,function*(){boostLog=[`⏳ ${L("loading")}`],renderBoost();const e=[],t=memText().avail||0,s=storageInfo().free||0,n=nat("cleanRam")||0;if(e.push(`✅ ${L("ramClean")}: ${n} ${L("appsS")}`),shz()==="ok"){try{yield runShell("pm trim-caches 999G"),e.push(`✅ ${L("cAllCaches")}`)}catch(r){}try{yield runShell("am kill-all"),e.push(`✅ ${L("ramDeep")}`)}catch(r){}}else e.push(`➖ ${L("cAllCaches")}: ${L("bNeedShz")}`);if(!NA||nat("hasStorageAccess")){const r=yield runScan(!0);if(r){const l=[...r.tmp||[],...r.empty||[]].map(u=>u[0]),i=l.length?deletePaths(l):{n:0,bytes:0};e.push(`✅ ${L("cTmp")} + ${L("cEmpty")}: ${i.n||0} · ${MB(i.bytes||0)}`),(r.apk||[]).length&&e.push(`💡 ${L("bApkHint")} (${r.apk.length} · ${MB(r.apk.reduce((u,m)=>u+m[1],0))})`)}}else e.push(`➖ ${L("cTmp")}: ${L("bNeedAccess")}`);const a=(loadPkgs(),pkgs.filter(r=>r.inst&&tier(r.pkg)==="ads").length);a&&e.push(`💡 ${L("bAdsHint")} (${a})`),yield new Promise(r=>setTimeout(r,700));const o=Math.max(0,(memText().avail||0)-t),c=Math.max(0,(storageInfo().free||0)-s);e.push(`🎉 ${L("bResult")}: RAM +${MB(o)} · ${L("storage")} +${MB(c)}`),boostLog=e,banner("✨",L("stBoost"),`RAM +${MB(o)} · ${L("storage")} +${MB(c)}`),storeCat==="boost"&&renderBoost()})}function memText(){try{return JSON.parse(nat("memInfo")||"{}")}catch(e){return{}}}function renderRam(){const e=memText(),t=e.total||0,s=e.avail||0,n=t?Math.round((t-s)/t*100):0,a=o=>(o/1073741824).toFixed(2)+" GB";$("storeMain").innerHTML=`<div class="sec"><h3>⚡ ${L("stRam")}</h3>
    <div class="ram"><div class="rbar"><i style="width:${n}%;background:${n>85?"#e53935":n>70?"#fb8c00":"#43a047"}"></i></div><div>${L("ramUsed")}: <b>${t?a(t-s):"—"}</b> / ${t?a(t):"—"} · ${L("free")}: <b>${t?a(s):"—"}</b>${e.low?" · ⚠️ "+L("ramLow"):""}</div></div>
    <div class="inline" style="margin-top:2vh"><button class="btn pri f" id="ramClean">🧹 ${L("ramClean")}</button>${shz()==="ok"?`<button class="btn f" id="ramDeep">💥 ${L("ramDeep")}</button>`:""}<button class="btn f" id="ramLite">${S.lite?"✅":"⬜"} ${L("perfLite")}</button>
      <button class="btn f" id="animFast">${S.animFast?"✅":"⬜"} ${L("animFast")}</button></div>
    <div class="field" style="margin-top:2vh"><label>${L("ramTips")}</label></div>
    <div class="field"><label>🌐 IP: <b dir="ltr">${esc(storageInfo().ip||remoteInfo().ip||"—")}</b></label></div></div>`}activators.push(e=>{if(e.dataset.scat)return storeCat=e.dataset.scat,storeCat==="sys"&&loadPkgs(),renderStore(),focus(document.querySelector(`[data-scat="${storeCat}"]`)),!0;if(e.dataset.store){const t=allCatalog().find(s=>s.id===e.dataset.store);return t&&storeAction(t),!0}if(e.dataset.sysf)return sysFilter=e.dataset.sysf,renderSysApps(),focus(document.querySelector(`[data-sysf="${sysFilter}"]`)),!0;if(e.dataset.sys)return sysMenu(e.dataset.sys),!0;if(e.dataset.cfile){const t=e.dataset.cfile;return scanSel.has(t)?scanSel.delete(t):scanSel.add(t),renderClean(),focus(document.querySelector(`[data-cfile="${cssq(t)}"]`)),!0}if(e.dataset.cgrp){const t=scan[e.dataset.cgrp]||[],s=t.every(n=>scanSel.has(n[0]));return t.forEach(n=>s?scanSel.delete(n[0]):scanSel.add(n[0])),renderClean(),focus(document.querySelector(`[data-cgrp="${e.dataset.cgrp}"]`)),!0}switch(e.id){case"codeGo":return goCode(($("codeIn").value||"").trim()),!0;case"mcAdd":{const t=($("mcNum").value||"").trim(),s=($("mcUrl").value||"").trim(),n=($("mcName").value||"").trim();return!t||!/^https?:\/\//.test(s)?(A.toast(L("codeBad")),!0):(S.myCodes=(S.myCodes||[]).filter(a=>a.n!==t).concat([{n:t,url:s,name:n}]),renderStore(),A.toast(L("saved")),!0)}case"apkGo":{const t=($("apkUrl").value||"").trim();return t&&installFrom(t.split("/").pop()||"APK",t),!0}case"catSave":return S.catalogUrl=($("catUrl").value||"").trim(),loadCustomCatalog().then(renderStore),!0;case"szInstall":return installShizuku(),!0;case"szOpen":return nat("openShizuku"),!0;case"szAllow":return nat("shizukuRequest"),!0;case"szHelp":return szHelp(),!0;case"sysBulk":return bulkRemove("green"),!0;case"adsBulk":return bulkRemove("ads"),!0;case"sysAdb":return adbDialog(),!0;case"ramClean":{const t=memText().avail||0,s=nat("cleanRam")||0;return setTimeout(()=>{const n=memText().avail||0;banner("🧹",L("ramClean"),`${s} ${L("appsS")} · +${Math.max(0,(n-t)/1048576).toFixed(0)} MB`),renderRam()},800),!0}case"ramDeep":return runShell("am kill-all").then(()=>setTimeout(()=>{banner("💥",L("ramDeep"),"✓"),renderRam()},800)).catch(t=>A.toast(t.message)),!0;case"ramLite":return S.lite=!S.lite,applyLook(),renderRam(),!0;case"animFast":{S.animFast=!S.animFast;const t=S.animFast?"0.5":"1";return shz()==="ok"?Promise.all(["window_animation_scale","transition_animation_scale","animator_duration_scale"].map(s=>runShell(`settings put global ${s} ${t}`))).then(()=>banner("⚡",L("animFast"),t+"x")).catch(s=>A.toast(s.message)):A.toast(L("szNeeded")),renderRam(),!0}case"browserBtn":return openBrowser(),!0;case"cScan":return runScan(!1),!0;case"cAccess":return nat("askStorageAccess"),setTimeout(()=>{storeCat==="clean"&&renderClean()},4e3),!0;case"cCaches":return trimCaches().then(()=>{storeCat==="clean"&&renderClean()}),!0;case"cDelete":{const t=[...scanSel];return dialog(`🗑 ${L("cDeleteSel")} (${t.length} · ${MB(selBytes())})`,[{label:L("sRemove"),pri:1,fn:()=>{const s=deletePaths(t);banner("🧽",L("stClean"),`${s.n||0} · ${MB(s.bytes||0)}`),scanSel=new Set,runScan(!1)}},{label:L("cancel"),fn:()=>{}}]),!0}case"bGo":return boost(),!0}return!1}),optionHandlers.unshift(e=>e.dataset.sys?(sysMenu(e.dataset.sys),!0):!1),pageHooks["store:enter"]=()=>{renderStore(),S.catalogUrl&&!customCatalog.length&&loadCustomCatalog().then(()=>{$("store").classList.contains("on")&&renderStore()})};const _remoteCmd2=remoteCmd;remoteCmd=function(e){return e.cmd==="open"&&/^https?:\/\//.test(e.url||"")?(nat("openUri",e.url),{ok:1}):_remoteCmd2(e)};const _ACT2=ACTIONS;ACTIONS=()=>_ACT2().concat([["✨",L("stBoost"),()=>{showPage("store"),storeCat="boost",renderStore(),boost()}],["🧽",L("stClean"),()=>{showPage("store"),storeCat="clean",renderStore()}],["🌐",L("browser"),openBrowser],["🛍️",L("store"),()=>{showPage("store"),focus(document.querySelector('.tab[data-page="store"]'))}],["🧹",L("stSystem"),()=>{showPage("store"),storeCat="sys",loadPkgs(),renderStore()}],["⚡",L("stRam"),()=>{showPage("store"),storeCat="ram",renderStore()}]]);const _quick3=quickSettings;quickSettings=function(){_quick3();const e=$("dbox")._items;if(!e||isKids())return;e.splice(0,0,{icon:"✨",label:L("stBoost"),fn:()=>{showPage("store"),storeCat="boost",renderStore(),boost()}});const t=$("dbox").querySelector(".mgrid");t&&(t.innerHTML=e.map((s,n)=>`<button class="btn f${s.pri?" pri":""}" data-di="${n}">${s.icon?`<b>${esc(s.icon)}</b>`:""}${esc(s.label)}</button>`).join(""),focus(t.querySelector(".f")))},DEF.myCodes=[];function goCode(e){return d(this,null,function*(){if(!e)return;const t=$("dlState"),s=(S.myCodes||[]).find(a=>a.n===e);let n=s?s.url:/^https?:\/\//.test(e)?e:/^[0-9]{3,8}$/.test(e)?"https://aftv.news/"+e:null;if(!n){A.toast(L("codeBad"));return}if(t&&(t.textContent="🔎 "+L("codeLooking")),!NA){A.toast(n);return}try{const a=JSON.parse(yield natAsync("resolveUrl",n));a.apk?installFrom(s&&s.name||e,a.url):(t&&(t.textContent="🌐 "+a.url),nat("openUri",a.url))}catch(a){t&&(t.textContent=""),A.toast(L("codeNotFound"))}})}activators.push(e=>{if(e.dataset&&e.dataset.mc!=null){const t=S.myCodes[+e.dataset.mc];return t&&goCode(t.n),!0}if(e.dataset&&e.dataset.mcdel!=null){const t=S.myCodes.slice();return t.splice(+e.dataset.mcdel,1),S.myCodes=t,renderStore(),!0}return!1}),activators.push(e=>{if(e.id==="sysExpert")return S.sysExpert?(S.sysExpert=!1,loadPkgs(),renderSysApps(),!0):(dialog("🧨 "+L("sysExpert"),[{label:L("sysExpertOn"),fn:()=>{S.sysExpert=!0,loadPkgs(),renderSysApps()}},{label:L("cancel"),pri:1,fn:()=>{}}],{sub:L("sysExpertWarn")}),!0);if(e.id==="sysAll"){const t=pkgs.filter(s=>s.sys&&s.inst&&!isCore(s.pkg)&&s.pkg!==defaultHomeKeep());return dialog(`🧨 ${L("removeAll")} (${t.length})`,[{label:L("sRemoveAnyway"),fn:()=>d(this,null,function*(){let s=0;for(const n of t)banner("🧹",n.name,`${++s}/${t.length}`,1500),yield sysDo("remove",n.pkg,!0);loadPkgs(),renderSysApps(),banner("✅",L("removeAll"),s+"",6e3)})},{label:L("cancel"),pri:1,fn:()=>{}}],{sub:L("removeAllWarn")}),!0}return!1});function defaultHomeKeep(){try{return JSON.parse(nat("homePackages")||"[]")[0]||""}catch(e){return""}}function installShizuku(){nat("hasBundled","shizuku.apk")?(banner("🔑","Shizuku",L("updReady"),3e3),nat("installBundled","shizuku.apk","st:Shizuku")):storeAction(CATALOG.find(e=>e.id==="shizuku"))}window.installShizuku=installShizuku;

;
/* media.js */
var c=(e,n,t)=>new Promise((s,r)=>{var a=l=>{try{i(t.next(l))}catch(d){r(d)}},o=l=>{try{i(t.throw(l))}catch(d){r(d)}},i=l=>l.done?s(l.value):Promise.resolve(l.value).then(a,o);i((t=t.apply(e,n)).next())});Object.assign(DEF,{engine:"auto",bootPlay:!1,shares:[],tgToken:"",tgChat:"",tgCode:""});const MT={ar:{files:"ملفاتي",fInternal:"التخزين الداخلي",fUsb:"فلاشة",fNet:"أجهزة الشبكة",fScan:"دوّر على أجهزة الشبكة",fScanning:"بدوّر على الأجهزة اللي على الراوتر...",fNone:"مفيش أجهزة بتشارك ملفات. على الكمبيوتر: كليك يمين على الفولدر ← Properties ← Sharing ← Share",fAdd:"إضافة كمبيوتر",fHost:"عنوان الجهاز (IP أو الاسم)",fUser:"اسم المستخدم (فاضي = Guest)",fPass:"الباسورد",fRecs:"التسجيلات",fEmpty:"الفولدر فاضي",fDenied:"مش قادر أفتح الفولدر — اسمح بقراية الملفات",fAllow:"اسمح بقراية الملفات",fUp:"رجوع",fExt:"شغّل في مشغّل خارجي (VLC)",fPlay:"تشغيل",fDel:"حذف",fForget:"انسى الجهاز",fLoginErr:"مش قادر أدخل — راجع اسم المستخدم والباسورد",fPick:"افتح",rec:"تسجيل",recNow:"سجّل القناة دي",recFor:"سجّل لمدة",recUntil:"لحد ما أوقفه",recStarted:"بدأ التسجيل",recStop:"وقّف التسجيل",recNext:"سجّل البرنامج الجاي",recProg:"سجّل البرنامج ده",recSched:"اتحدد ميعاد التسجيل",recDir:"مكان حفظ التسجيلات",recActive:"تسجيلات شغالة",recUpcoming:"تسجيلات جاية",min:"دقيقة",sBoot:"تشغيل البوكس",bootPlay:"افتح آخر قناة أول ما البوكس يشتغل",bootResume:"بكمّل آخر قناة",sTg:"التحكم من تيليجرام",tgToken:"توكن البوت",tgHow:`١. افتح تيليجرام وكلّم @BotFather واكتب /newbot
٢. انسخ التوكن اللي هيديهولك وحطه هنا
٣. افتح البوت بتاعك واكتب كود الربط`,tgCode:"كود الربط",tgLinked:"متربط مع",tgUnlink:"فك الربط",tgOff:"البوت مش شغال",tgOn:"البوت شغال"},en:{files:"My files",fInternal:"Internal storage",fUsb:"USB drive",fNet:"Network computers",fScan:"Find network computers",fScanning:"Looking for computers on your router...",fNone:"No computers are sharing files. On the PC: right-click a folder → Properties → Sharing → Share",fAdd:"Add computer",fHost:"Computer address (IP or name)",fUser:"Username (empty = Guest)",fPass:"Password",fRecs:"Recordings",fEmpty:"Folder is empty",fDenied:"Can't open this folder — allow file access",fAllow:"Allow file access",fUp:"Back",fExt:"Play in external player (VLC)",fPlay:"Play",fDel:"Delete",fForget:"Forget computer",fLoginErr:"Can't sign in — check username and password",fPick:"Open",rec:"Record",recNow:"Record this channel",recFor:"Record for",recUntil:"Until I stop it",recStarted:"Recording started",recStop:"Stop recording",recNext:"Record next show",recProg:"Record this show",recSched:"Recording scheduled",recDir:"Save recordings to",recActive:"Recording now",recUpcoming:"Upcoming recordings",min:"min",sBoot:"Start-up",bootPlay:"Open the last channel when the box turns on",bootResume:"Resuming last channel",sTg:"Telegram control",tgToken:"Bot token",tgHow:`1. In Telegram, message @BotFather and send /newbot
2. Paste the token it gives you here
3. Open your bot and send the pairing code`,tgCode:"Pairing code",tgLinked:"Linked with",tgUnlink:"Unlink",tgOff:"Bot is off",tgOn:"Bot is running"}};MT.ar.xPhone="📱 ربط الهاتف",MT.en.xPhone="📱 Phone link",MT.ar.xRadio="📻 الإذاعة",MT.en.xRadio="📻 Radio",MT.ar.xAll="كل التطبيقات ←",MT.en.xAll="All apps →",MT.ar.xSrc="المصادر",MT.en.xSrc="Sources",MT.ar.noSrc="الجهاز ده مفيهوش مداخل HDMI",MT.en.noSrc="This box has no HDMI inputs",Object.keys(MT).forEach(e=>Object.assign(T[e],MT[e]));const VIDEO=/\.(mp4|m4v|mkv|webm|ts|m2ts|avi|mov|wmv|flv|mpg|mpeg|3gp)$/i,AUDIO=/\.(mp3|m4a|aac|flac|wav|ogg|opus)$/i,IMAGE=/\.(jpe?g|png|webp|gif|bmp)$/i,fmtSize=e=>e>1073741824?(e/1073741824).toFixed(1)+" GB":e>1048576?(e/1048576).toFixed(0)+" MB":e>1024?(e/1024).toFixed(0)+" KB":e?e+" B":"";let fSrc=null,fPath="",fItems=[],fNetHosts=[];function fRoots(){const e=[];let n=[];try{n=JSON.parse(nat("storageRoots")||"[]")}catch(s){}n.forEach(s=>e.push({icon:s.label==="usb"?"💾":"📱",name:s.label==="usb"?L("fUsb")+" · "+s.name:L("fInternal"),path:s.path}));let t={};try{t=JSON.parse(nat("recState")||"{}")}catch(s){}return t.dir&&e.push({icon:"⏺",name:L("fRecs"),path:t.dir,rec:1}),S.shares.forEach(s=>e.push({icon:"🖥",name:s.name||s.host,path:"smb://"+s.host+"/",share:s})),e}function renderFiles(){const e=fRoots();$("filesSrc").innerHTML=e.map((n,t)=>`<div class="it f${fSrc===n.path?" sel":""}" tabindex="0" data-froot="${t}">${n.icon} ${esc(n.name)}</div>`).join("")+`<div class="it f" tabindex="0" id="fScan">🔎 ${L("fScan")}</div><div class="it f" tabindex="0" id="fAdd">➕ ${L("fAdd")}</div>`,$("filesSrc")._roots=e,!fSrc&&e[0]&&openDir(e[0].path,e[0].path)}function openDir(e,n){return c(this,null,function*(){fSrc=n||fSrc,fPath=e;const t=$("filesMain");if(t.innerHTML='<div class="empty">⏳</div>',e.startsWith("smb://")){const a=S.shares.find(o=>e.toLowerCase().startsWith(("smb://"+o.host+"/").toLowerCase()));a&&nat("smbLogin",a.host,a.user||"",a.pass||"",a.domain||"")}try{fItems=JSON.parse(yield natAsync("listDir",e))}catch(a){const o=e.startsWith("smb://");t.innerHTML=`<div class="empty">⚠️ ${esc(o?L("fLoginErr"):L("fDenied"))}</div>${o?"":`<button class="btn pri f" id="fAllow">🔓 ${L("fAllow")}</button>`}`;return}fItems.sort((a,o)=>o.dir-a.dir||a.name.localeCompare(o.name));const s=e!==fSrc?`<div class="it f" tabindex="0" id="fUp">⬆️ ${L("fUp")} <span class="fpath" dir="ltr">${esc(e)}</span></div>`:`<div class="fpath" dir="ltr">${esc(e)}</div>`;t.innerHTML=s+(fItems.length?fItems.map((a,o)=>`<div class="it f fitem" tabindex="0" data-fi="${o}"><span>${a.dir?"📁":VIDEO.test(a.name)?"🎬":AUDIO.test(a.name)?"🎵":IMAGE.test(a.name)?"🖼":/\.apk$/i.test(a.name)?"📦":"📄"}</span><span class="fn">${esc(a.name)}</span><span class="fs">${a.dir?"":fmtSize(a.size)}</span></div>`).join(""):`<div class="empty">${L("fEmpty")}</div>`),renderFilesSrcSel();const r=t.querySelector(".fitem")||t.querySelector(".f");r&&focused&&focused.closest&&focused.closest("#filesMain")&&focus(r)})}function renderFilesSrcSel(){document.querySelectorAll("#filesSrc [data-froot]").forEach(e=>{const n=$("filesSrc")._roots[+e.dataset.froot];e.classList.toggle("sel",!!n&&n.path===fSrc)})}function markFiles(){}function parentOf(e){const n=e.startsWith("smb://"),t=e.replace(/\/+$/,""),s=t.lastIndexOf("/"),r=t.slice(0,s+1);return n?r:r.replace(/\/$/,"")||"/"}function fileUrl(e){return nat("mediaUrl",e.path)||"file://"+e.path}function openFile(e){if(e.dir)return openDir(e.path);if(VIDEO.test(e.name)||AUDIO.test(e.name))return play({name:e.name.replace(/\.[^.]+$/,""),url:fileUrl(e),kind:"file",logo:""});if(IMAGE.test(e.name))return showImage(fileUrl(e));if(/\.apk$/i.test(e.name)&&!e.path.startsWith("smb://"))return installFrom(e.name,fileUrl(e));A.playExternal(fileUrl(e))}function showImage(e){dialog("🖼",[{label:L("done"),fn:()=>{}}],{html:`<img src="${esc(e)}" style="max-width:80vw;max-height:72vh;display:block;margin:0 auto 1.4vh;border-radius:1vh" alt=""><div class="dlist"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}function fileMenu(e){const n=[{icon:"▶️",label:e.dir?L("fPick"):L("fPlay"),pri:1,fn:()=>openFile(e)}];e.dir||n.push({icon:"↗",label:L("fExt"),fn:()=>A.playExternal(fileUrl(e))});const t=JSON.parse(nat("recState")||"{}");!e.dir&&t.dir&&e.path.indexOf(t.dir)===0&&n.push({icon:"🗑",label:L("fDel"),fn:()=>{nat("deleteFile",e.path),openDir(fPath)}}),n.push({label:L("cancel"),fn:()=>{}}),dialog(e.name,n,{grid:n.length>3?3:0})}function netScan(){return c(this,null,function*(){dialog("🔎 "+L("fNet"),[{label:L("cancel"),fn:()=>{}}],{sub:L("fScanning")});let e=[];try{e=JSON.parse(yield natAsync("smbScan"))}catch(n){}if(fNetHosts=e,!!on("dlg")){if(!e.length){dialog("🔎 "+L("fNet"),[{icon:"➕",label:L("fAdd"),fn:()=>setTimeout(()=>addShare(""),30)},{label:L("done"),pri:1,fn:()=>{}}],{sub:L("fNone")});return}dialog("🔎 "+L("fNet"),e.map(n=>({icon:"🖥",label:n.name+(n.name!==n.host?" · "+n.host:""),fn:()=>setTimeout(()=>addShare(n.host,n.name),30)})).concat([{label:L("cancel"),fn:()=>{}}]))}})}function addShare(e,n){const t=`<input class="inp f" id="shHost" dir="ltr" placeholder="${esc(L("fHost"))}" value="${esc(e||"")}"><input class="inp f" id="shUser" dir="ltr" placeholder="${esc(L("fUser"))}" style="margin-top:1vh"><input class="inp f" id="shPass" dir="ltr" type="password" placeholder="${esc(L("fPass"))}" style="margin-top:1vh">
    <div class="dlist" style="margin-top:1.4vh"><button class="btn pri f" data-di="0">${L("save")}</button><button class="btn f" data-di="1">${L("cancel")}</button></div>`;dialog("🖥 "+L("fAdd"),[{label:L("save"),fn:()=>{const s=($("shHost").value||"").trim().replace(/^smb:\/\//,"").replace(/\/.*$/,"");if(!s)return;const r={host:s,name:n&&n!==s?n.split(".")[0]:s,user:($("shUser").value||"").trim(),pass:$("shPass").value||""};S.shares=S.shares.filter(a=>a.host!==s).concat([r]),fSrc=null,showPage("files"),renderFiles(),openDir("smb://"+s+"/","smb://"+s+"/")}},{label:L("cancel"),fn:()=>{}}],{html:t})}pageHooks["files:enter"]=()=>{fSrc=null,renderFiles()},activators.push(e=>{if(e.dataset.froot!==void 0){const n=$("filesSrc")._roots[+e.dataset.froot];return n&&openDir(n.path,n.path),!0}if(e.dataset.fi!==void 0){const n=fItems[+e.dataset.fi];return n&&openFile(n),!0}switch(e.id){case"fUp":return openDir(parentOf(fPath)),!0;case"fScan":return netScan(),!0;case"fAdd":return addShare(""),!0;case"fAllow":return nat("askStorageAccess"),setTimeout(()=>openDir(fPath),4e3),!0}return!1}),optionHandlers.push(e=>{if(e.dataset.fi!==void 0){const n=fItems[+e.dataset.fi];return n&&fileMenu(n),!0}if(e.dataset.froot!==void 0){const n=$("filesSrc")._roots[+e.dataset.froot];if(n&&n.share)return dialog(n.name,[{icon:"🗑",label:L("fForget"),fn:()=>{S.shares=S.shares.filter(t=>t.host!==n.share.host),fSrc=null,renderFiles()}},{label:L("cancel"),pri:1,fn:()=>{}}]),!0}return!1});const isRecordable=e=>e&&!e.kind&&/^https?:/.test(e.url||"");function recMenu(e){if(!isRecordable(e))return;const n=[30,60,90,120,180].map(s=>({label:`${s} ${L("min")}`,fn:()=>recStart(e,s)}));n.push({icon:"⏺",label:L("recUntil"),fn:()=>recStart(e,600)});const t=window.nowNext?nowNext(e):[];t[0]&&n.unshift({icon:"📺",label:`${L("recProg")}: ${t[0][2]}`,pri:1,fn:()=>recStart(e,Math.max(5,Math.ceil((t[0][1]-Date.now())/6e4)+2))}),t[1]&&n.splice(1,0,{icon:"⏭",label:`${L("recNext")}: ${t[1][2]} · ${fmtTime(new Date(t[1][0]))}`,fn:()=>{nat("recAt",e.url,e.name+" - "+t[1][2],t[1][0],t[1][1]),banner("⏰",L("recSched"),t[1][2])}}),dialog("⏺ "+L("recNow")+" · "+e.name,n,{grid:3})}function recStart(e,n){nat("recStart",e.url,e.name,n),banner("⏺",L("recStarted"),`${e.name} · ${n>=600?L("recUntil"):n+" "+L("min")}`),setTimeout(updateTicker,1500)}function recActive(){try{return JSON.parse(nat("recState")||"{}").active||[]}catch(e){return[]}}function recStopMenu(){const e=recActive();e.length&&dialog("⏺ "+L("recActive"),e.map(n=>({icon:"⏹",label:`${L("recStop")}: ${n.name} · ${fmtSize(n.bytes)}`,fn:()=>{nat("recStop",n.id),setTimeout(updateTicker,1500)}})).concat([{label:L("cancel"),pri:1,fn:()=>{}}]))}tickers.push(()=>{const e=recActive(),n=$("tSleep");e.length&&n&&n.textContent.indexOf("⏺")<0&&(n.textContent=(n.textContent?n.textContent+"  ·  ":"")+"⏺ "+e.map(t=>t.name).join(", "))}),setInterval(()=>{recActive().length&&updateTicker()},3e4);const _playerMenu=playerMenu;playerMenu=function(){_playerMenu();const e=playing;if(!isRecordable(e))return;const n=$("dbox"),t=n._items,s=n.querySelector(".mgrid,.dlist");s&&(t.push({icon:"⏺",label:L("rec"),fn:()=>setTimeout(()=>recMenu(e),30)}),recActive().length&&t.push({icon:"⏹",label:L("recStop"),fn:()=>setTimeout(recStopMenu,30)}),s.insertAdjacentHTML("beforeend",t.slice(-(recActive().length?2:1)).map((r,a)=>`<button class="btn f" data-di="${t.length-(recActive().length?2:1)+a}"><b>${esc(r.icon)}</b>${esc(r.label)}</button>`).join("")))};const _chMenu=chMenu;chMenu=function(e){_chMenu(e);const n=chByUrl(e);if(!isRecordable(n))return;const t=$("dbox"),s=t._items,r=t.querySelector(".mgrid,.dlist");r&&(s.splice(s.length-1,0,{label:"⏺ "+L("rec"),fn:()=>setTimeout(()=>recMenu(n),30)}),r.innerHTML=s.map((a,o)=>`<button class="btn f${a.pri?" pri":""}" data-di="${o}">${a.icon?`<b>${esc(a.icon)}</b>`:""}${esc(a.label)}</button>`).join(""),focus(r.querySelector(".f")))};function bootResume(){!S.bootPlay||!S.lastCh||!S.lastCh.url||!nat("bootFresh")||setTimeout(()=>{if(on("player"))return;banner("📺",L("bootResume"),S.lastCh.name,4e3);const e=window.chByUrl&&chByUrl(S.lastCh.url);e?playUrl(e.url):play(Object.assign({},S.lastCh))},6e3)}let tgReady=!1;function tgInit(){NA&&(S.tgCode||(S.tgCode=String(1e5+Math.floor(Math.random()*9e5))),nat("tgStart",S.tgToken||""),tgReady=!!S.tgToken)}const TGT={ar:{hi:"أهلاً! البوكس متربط بيك دلوقتي ✅",pair:"اكتب كود الربط اللي ظاهر في الإعدادات ← التحكم من تيليجرام",no:"مش مسموحلك تتحكم في الجهاز ده",ok:"تمام ✅",nf:"ملقتش",playing:"شغال دلوقتي",idle:"مفيش حاجة شغالة",page:"الصفحة",recs:"تسجيلات شغالة",none:"مفيش",help:`خلفية اقفل / خلفية شغل — الخلفية المتحركة
سريع — الوضع السريع
نضف — تنضيف الرامات
ريستارت — إعادة تشغيل الواجهة
الأوامر:
قناة <اسم أو رقم>
الجاية / اللي قبلها
صوت+ / صوت-
افتح <اسم تطبيق>
سجّل <دقايق>
رسالة <نص> (تظهر على الشاشة)
نوم <دقايق>
وقّف · رئيسية · رجوع
أو استخدم الزراير تحت 👇`},en:{hi:"Hi! This box is now linked to you ✅",pair:"Send the pairing code shown in Settings → Telegram control",no:"You're not allowed to control this box",ok:"Done ✅",nf:"Not found",playing:"Now playing",idle:"Nothing playing",page:"Page",recs:"Recording",none:"none",help:`anim off / anim on — moving background
lite — fast mode
clean — free RAM
restart — restart the UI
Commands:
ch <name or number>
next / prev
vol+ / vol-
open <app name>
rec <minutes>
msg <text> (shows on screen)
sleep <minutes>
stop · home · back
or use the buttons below 👇`}},tgt=e=>(TGT[S.lang]||TGT.en)[e],TG_KB=()=>JSON.stringify([[["⬆️","k:up"]],[["⬅️","k:left"],["🆗","k:ok"],["➡️","k:right"]],[["⬇️","k:down"]],[["🔙","k:back"],["🏠","k:home"],["⏹","stop"]],[["🔉","vol-"],["🔊","vol+"],["⏮","prev"],["⏭","next"]],[["📺 "+(S.lang==="ar"?"الحالة":"Status"),"status"],["⏺ 60","rec 60"],["😴 30","sleep 30"]]]);function tgSend(e,n,t){nat("tgSend",e,n,t?TG_KB():"")}window.onTg=(e,n,t)=>{if(t=String(t||"").trim(),!S.tgChat){t.replace(/\D/g,"")===S.tgCode?(S.tgChat=e,tgSend(e,tgt("hi")+`

`+tgt("help"),1),banner("✈️","Telegram",n),$("settings").classList.contains("on")&&renderSettings()):tgSend(e,tgt("pair"));return}if(e!==S.tgChat){tgSend(e,tgt("no"));return}let s;try{s=tgCmd(t)}catch(r){s="⚠️ "+(r.message||r)}s&&tgSend(e,s,/^\/?(start|help|مساعدة)$/i.test(t))};function tgCmd(e){const n=e.match(/^\/?(\S+)\s*(.*)$/)||[],t=(n[1]||"").toLowerCase(),s=(n[2]||"").trim(),r=(...a)=>a.includes(t);if(r("start","help","مساعدة","اوامر","الأوامر"))return tgt("help");if(t.indexOf("k:")===0)return pressKey(t.slice(2)),"";if(r("status","الحالة","حالة")){const a=remoteState(),o=recActive();return`${a.playing?"📺 "+tgt("playing")+": "+a.playing.name:"💤 "+tgt("idle")}
📄 ${tgt("page")}: ${a.page||"-"}
⏺ ${tgt("recs")}: ${o.length?o.map(i=>i.name).join(", "):tgt("none")}`}if(r("ch","قناة","قناه","channel")){if(!s)return tgt("nf");const a=+s,o=isFinite(a)&&a>0?channels.find(i=>+i.no===a)||channels[a-1]:channels.find(i=>i.name.toLowerCase()===s.toLowerCase())||channels.find(i=>i.name.toLowerCase().indexOf(s.toLowerCase())>=0);return o?(on("frame")&&stopFrame(),playUrl(o.url),"📺 "+o.name):tgt("nf")}if(r("next","الجاية","الجايه","+"))return on("player")&&zap(1),tgt("ok");if(r("prev","اللي","السابقة","-"))return on("player")&&zap(-1),tgt("ok");if(r("vol+","صوت+"))return A.volume("up"),A.volume("up"),"🔊";if(r("vol-","صوت-"))return A.volume("down"),A.volume("down"),"🔉";if(r("stop","وقف","وقّف"))return on("player")&&stopPlayer(),tgt("ok");if(r("home","رئيسية","الرئيسية"))return pressKey("home"),tgt("ok");if(r("back","رجوع"))return pressKey("back"),"";if(r("open","افتح")){const a=s.toLowerCase(),o=apps.find(i=>appName(i).toLowerCase()===a)||apps.find(i=>appName(i).toLowerCase().indexOf(a)>=0);return o?(on("player")&&stopPlayer(),launch(o.pkg),"📱 "+appName(o)):tgt("nf")}if(r("apps","التطبيقات"))return visibleApps().map(a=>"• "+appName(a)).join(`
`);if(r("rec","سجل","سجّل")){const a=playing&&isRecordable(playing)?playing:S.lastCh;if(!a)return tgt("nf");const o=Math.min(600,Math.max(1,parseInt(s)||60));return recStart(a,o),`⏺ ${a.name} · ${o} ${L("min")}`}if(r("msg","رسالة","رساله"))return banner("✉️",S.lang==="ar"?"رسالة":"Message",s,15e3),tgt("ok");if(r("sleep","نوم"))return setSleep(Math.max(0,parseInt(s)||0)),tgt("ok");if(r("anim","خلفية","خلفيه","الخلفية")){const a=/off|لا|اقفل|قفل|ايقاف|إيقاف|0/i.test(s);return S.anim=a?"off":"auto",S.liveWall=!1,applyLook(),a?"🛑 الخلفية المتحركة اتقفلت":"✨ الخلفية المتحركة اشتغلت"}return r("lite","سريع","خفيف")?(S.lite=!/off|لا|0/i.test(s),S.perfChosen=!0,applyLook(),S.lite?"⚡ الوضع السريع شغال":"🎨 الوضع السريع مقفول"):r("clean","نضف","نضّف","تنظيف")?(window.autoClean&&autoClean(!0),"🧹 بنضّف"):r("restart","ريستارت","اعادة")?(setTimeout(()=>nat("restartUi"),500),"🔄 بعيد تشغيل الواجهة"):tgt("help")}window.mediaSettings=function(){const e=!!S.tgChat,n=sec("▶️ "+(S.lang==="ar"?"مشغّل القنوات":"Channel player"),field(S.lang==="ar"?"تلقائي = مشغّل الجهاز على البوكسات الضعيفة (أخف ومبيهنجش)":"Auto = the device's hardware player on weak boxes (lighter, no freezes)",seg("engine",[["auto",S.lang==="ar"?"تلقائي":"Auto"],["native",S.lang==="ar"?"مشغّل الجهاز":"Device player"],["hls","hls.js"]])));return S.tgCode||(S.tgCode=String(1e5+Math.floor(Math.random()*9e5))),n+sec(L("sBoot"),field(L("bootPlay"),onoff("bootPlay")))+sec("✈️ "+L("sTg"),field(L("tgToken"),inputRow("tgTokInp",S.tgToken,"123456:ABC-DEF...","tgTokSave"))+field("",`<button class="btn pri f" id="tgPhoneBtn">📱 ${S.lang==="ar"?"الصق التوكن من الموبايل (صوّر الكود)":"Paste the token from your phone (scan)"}</button>`)+field("",`<pre class="code" dir="auto" style="white-space:pre-wrap">${esc(L("tgHow"))}</pre>`)+(S.tgToken?field("",`<div class="inline">${e?`<span class="btn sm">✅ ${L("tgLinked")}</span><button class="btn f" id="tgUnlink">${L("tgUnlink")}</button>`:`<span class="btn sm">${L("tgCode")}: <b style="font-size:2.6vh" dir="ltr">${esc(S.tgCode)}</b></span>`}</div>`):""))+sec("⏺ "+L("rec"),field(L("recDir"),recDirSeg()))};function recDirSeg(){let e={};try{e=JSON.parse(nat("recState")||"{}")}catch(t){}const n=e.dirs||[];return n.length?`<div class="inline">${n.map((t,s)=>`<button class="btn f${e.dir===t.path?" pri":""}" data-recdir="${s}">${esc(t.label==="Internal"?L("fInternal"):t.label==="Movies"?"Movies":L("fUsb")+" "+t.label.replace(/\D/g,""))}</button>`).join("")}</div>`:`<span class="btn sm" dir="ltr">${esc(e.dir||"-")}</span>`}AFTER.bootPlay=()=>nat("setBootPlay",!!S.bootPlay),activators.push(e=>{if(e.dataset.recdir!==void 0){const n=JSON.parse(nat("recState")||"{}"),t=(n.dirs||[])[+e.dataset.recdir];return t&&(nat("recSetDir",t.path),renderSettings()),!0}switch(e.id){case"tgTokSave":return S.tgToken=($("tgTokInp").value||"").trim(),S.tgChat="",tgInit(),renderSettings(),A.toast(L("saved")),!0;case"tgUnlink":return S.tgChat="",S.tgCode="",tgInit(),renderSettings(),!0}return!1}),setTimeout(()=>{nat("setBootPlay",!!S.bootPlay),tgInit(),bootResume()},1500);const SRC_PKGS=["com.droidlogic.tvsource","com.android.tv","com.mediatek.wwtv.tvcenter","com.google.android.tv","com.android.tv.settings"];function runXtab(e){e==="wifi"?A.openSettings("android.settings.WIFI_SETTINGS"):e==="phone"?window.phoneDialog&&phoneDialog():e==="lang"?(S.lang=S.lang==="ar"?"en":"ar",applyLang(),renderHome(),window.renderGroups&&renderGroups()):e==="radio"&&window.radioMenu&&radioMenu()}window.runXtab=runXtab,activators.push(e=>{if(e.id==="xAllApps")return showPage("apps"),focus(document.querySelector("#appGrid .f")||document.querySelector(".tab.on")),!0;if(e.id==="xSources"){const n=SRC_PKGS.find(t=>A.isInstalled(t));return n?launch(n):A.toast(L("noSrc")),!0}return!1});const FREE_PACKS=[["world","🌍",{ar:"قنوات عالمية مختارة (Free-TV)",en:"World picks (Free-TV)"},"https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8"],["eg","🇪🇬",{ar:"مصر",en:"Egypt"},"countries/eg.m3u"],["ara","🕌",{ar:"كل القنوات العربية",en:"All Arabic"},"languages/ara.m3u"],["sa","🇸🇦",{ar:"السعودية",en:"Saudi Arabia"},"countries/sa.m3u"],["ae","🇦🇪",{ar:"الإمارات",en:"UAE"},"countries/ae.m3u"],["news","📰",{ar:"أخبار عالمية",en:"World news"},"categories/news.m3u"],["sports","⚽",{ar:"رياضة",en:"Sports"},"categories/sports.m3u"],["movies","🎬",{ar:"أفلام",en:"Movies"},"categories/movies.m3u"],["series","📺",{ar:"مسلسلات",en:"Series"},"categories/series.m3u"],["docu","🌋",{ar:"وثائقي",en:"Documentary"},"categories/documentary.m3u"],["music","🎵",{ar:"موسيقى",en:"Music"},"categories/music.m3u"],["kids","🧸",{ar:"أطفال",en:"Kids"},"categories/kids.m3u"],["rel","📿",{ar:"قنوات دينية",en:"Religious"},"categories/religious.m3u"],["en","🇬🇧",{ar:"قنوات إنجليزي",en:"English"},"languages/eng.m3u"]],packUrl=e=>/^https?:/.test(e[3])?e[3]:"https://iptv-org.github.io/iptv/"+e[3];MT.ar.freeTitle="مفيش اشتراك IPTV؟ ضيف قنوات مجانية بضغطة",MT.en.freeTitle="No IPTV subscription? Add free channels in one press",MT.ar.listsBtn="القوائم والدول",MT.en.listsBtn="Lists & countries",MT.ar.packOnly="اعرض دي بس",MT.en.packOnly="Show only this",MT.ar.freePacks="قنوات مجانية جاهزة",MT.en.freePacks="Ready-made free channels",MT.ar.freeNote="قنوات مجانية متاحة للعامة من مشروع iptv-org — مش كلها شغالة طول الوقت، واللانشر بيعلّم على الواقفة",MT.en.freeNote="Free public channels from the iptv-org project — not all are always up; the launcher marks dead ones",MT.ar.freeAdded="اتضافت",MT.en.freeAdded="Added",MT.ar.ownList="أو ضيف اشتراكك من الإعدادات",MT.en.ownList="or add your own subscription in Settings",Object.keys(MT).forEach(e=>Object.assign(T[e],MT[e]));function freePackHtml(){return`<div class="freebox"><div class="sec"><h3>📺 ${esc(L("freeTitle"))}</h3><div class="inline">${FREE_PACKS.map(e=>{const n=S.lists.some(t=>t.url===packUrl(e));return`<button class="btn f${n?" pri":""}" data-freepack="${e[0]}">${e[1]} ${esc(e[2][S.lang]||e[2].en)}${n?" ✓":""}</button>`}).join("")}</div><div class="sub" style="margin-top:1.2vh">${esc(L("freeNote"))}</div>
  <div class="inline" style="margin-top:1.2vh"><button class="btn f" id="ownList">⚙️ ${esc(L("ownList"))}</button></div></div></div>`}const _renderGroupsF=renderGroups;renderGroups=function(){_renderGroupsF.apply(this,arguments),!channels.length&&!S.favCh.length&&($("channels").innerHTML=freePackHtml())},activators.push(e=>{if(e.dataset.freepack){const n=FREE_PACKS.find(r=>r[0]===e.dataset.freepack);if(!n)return!0;const t=packUrl(n);if(S.lists.some(r=>r.url===t))return S.lists=S.lists.filter(r=>r.url!==t),banner("📺","−",n[2][S.lang]||n[2].en,2e3),loadLists().then(()=>{renderGroups(),$("settings").classList.contains("on")&&renderSettings()}),!0;const s=S.lists;return s.some(r=>r.url===t)||(s.push({name:n[1]+" "+(n[2][S.lang]||n[2].en),url:t}),S.lists=s),banner("📺",L("freeAdded"),n[2][S.lang]||n[2].en,2500),loadLists().then(()=>{window.loadEpg&&loadEpg(),renderGroups(),window.runCheck&&runCheck(!0)}),!0}return e.id==="ownList"?(showPage("settings"),renderSettings(),!0):!1});function updVodTab(){const e=document.querySelector('.tab[data-page="vod"]');if(!e)return;const n=typeof vodCats<"u"&&vodCats.length||S.watch.some(t=>t.kind)||S.lists.some(t=>t.type==="xtream");e.style.display=n?"":"none",!n&&document.querySelector("#vod.on")&&showPage("home")}setInterval(updVodTab,4e3),setTimeout(updVodTab,1500),MT.ar.runApps="التطبيقات المفتوحة",MT.en.runApps="Open apps",MT.ar.closeApp="اقفل التطبيق",MT.en.closeApp="Close app",MT.ar.closeAll="اقفل الكل",MT.en.closeAll="Close all",MT.ar.closed="اتقفل",MT.en.closed="Closed",MT.ar.noRun="مفيش تطبيقات مفتوحة",MT.en.noRun="No open apps",Object.keys(MT).forEach(e=>Object.assign(T[e],MT[e]));let openedApps=[];const _launchC=launch;launch=function(e){return openedApps=[e].concat(openedApps.filter(n=>n!==e)).slice(0,20),_launchC.apply(this,arguments)};function closeOne(e){return c(this,null,function*(){if(typeof shz=="function"&&shz()==="ok")try{yield runShell("am force-stop "+e)}catch(n){nat("closeApp",e)}else nat("closeApp",e);openedApps=openedApps.filter(n=>n!==e)})}function runningMenu(){const e=openedApps.map(byPkg).filter(Boolean);if(!e.length){A.toast(L("noRun"));return}const n=e.map(t=>({icon:"✖",label:appName(t),keep:1,fn:()=>c(this,null,function*(){yield closeOne(t.pkg),banner("✖",L("closed"),appName(t),1800),setTimeout(()=>{closeDialog(),openedApps.length&&runningMenu()},30)})}));n.push({icon:"🧹",label:L("closeAll")+" ("+e.length+")",pri:1,fn:()=>c(this,null,function*(){const t=e.length;for(const s of e)yield closeOne(s.pkg);window.cleanRam&&nat("cleanRam"),banner("🧹",L("closeAll"),t+" "+L("closed"),2500)})}),dialog("📋 "+L("runApps"),n,{grid:3})}if(window.runningMenu=runningMenu,typeof ACTIONS=="function"){const e=ACTIONS;ACTIONS=()=>[["📋",L("runApps"),runningMenu]].concat(e())}const _appMenuC=appMenu;appMenu=function(e){if(_appMenuC.apply(this,arguments),e===void 0)return;const n=$("dbox"),t=n._items,s=n.querySelector(".mgrid,.dlist");s&&(t.splice(1,0,{label:"✖ "+L("closeApp"),fn:()=>c(this,null,function*(){yield closeOne(e),banner("✖",L("closed"),appName(byPkg(e)||{name:e}),1800)})}),s.innerHTML=t.map((r,a)=>`<button class="btn f${r.pri?" pri":""}" data-di="${a}">${r.icon?`<b>${esc(r.icon)}</b>`:""}${esc(r.label)}</button>`).join(""),focus(s.querySelector(".f")))};const _tgCmdC=tgCmd;tgCmd=function(e){const n=String(e).match(/^\/?(اقفل|close)\s*(.*)$/i);if(!n)return _tgCmdC.apply(this,arguments);const t=n[2].trim().toLowerCase();if(!t||/^(الكل|all)$/.test(t)){const r=openedApps.length;return openedApps.slice().forEach(a=>closeOne(a)),"🧹 "+r}const s=apps.find(r=>appName(r).toLowerCase().indexOf(t)>=0);return s?(closeOne(s.pkg),"✖ "+appName(s)):tgt("nf")};const _mediaSettingsF=window.mediaSettings;window.mediaSettings=function(){return sec("📺 "+L("freePacks"),freePackHtml().replace(/<\/?div class="freebox">/g,"").replace(/<div class="sec"><h3>[^<]*<\/h3>/,"<div>"))+_mediaSettingsF()};function packsMenu(){const e=FREE_PACKS.map(t=>{const s=packUrl(t),r=S.lists.some(o=>o.url===s),a=t[2][S.lang]||t[2].en;return{icon:r?"✅":t[1],label:a,pri:r,fn:()=>{const o=S.lists;S.lists=r?o.filter(i=>i.url!==s):o.concat([{name:t[1]+" "+a,url:s}]),afterPacks(r?"−":"+",a)}}}),n=S.lists.filter(t=>!FREE_PACKS.some(s=>packUrl(s)===t.url));n.length&&n.forEach(t=>e.unshift({icon:"⭐",label:t.name||"IPTV",pri:1,fn:()=>setTimeout(()=>{showPage("settings"),renderSettings()},30)})),e.push({icon:"⚙️",label:L("ownList"),fn:()=>{showPage("settings"),renderSettings()}}),dialog("📦 "+L("listsBtn"),e,{grid:3,sub:L("freeNote")})}function afterPacks(e,n){banner("📺",e+" "+n,"...",2500),curGroup="__all",loadLists().then(()=>{window.loadEpg&&loadEpg(),renderGroups(),window.runCheck&&runCheck(!0)})}const _renderGroupsP=renderGroups;renderGroups=function(){if(_renderGroupsP.apply(this,arguments),isKids())return;const e=$("groups");e&&channels.length&&e.insertAdjacentHTML("afterbegin",`<div class="it f packbtn" tabindex="0" id="packsBtn">📦 ${esc(L("listsBtn"))}</div>`)},activators.push(e=>e.id==="packsBtn"?(packsMenu(),!0):!1),window.packsMenu=packsMenu,DEF.deadHidden=[],MT.ar.rmDead="احذف القنوات الواقفة",MT.en.rmDead="Remove dead channels",MT.ar.rmDeadDone="اتشالت",MT.en.rmDeadDone="Removed",MT.ar.restoreDead="رجّع القنوات اللي اتشالت",MT.en.restoreDead="Bring back removed channels",Object.keys(MT).forEach(e=>Object.assign(T[e],MT[e]));const deadNow=()=>channels.filter(e=>S.chStatus[e.url]===0),_renderGroupsD=renderGroups;renderGroups=function(){if(_renderGroupsD.apply(this,arguments),isKids())return;const e=deadNow().length,n=$("groups"),t=$("checkBtn");!n||!t||(e&&t.insertAdjacentHTML("afterend",`<div class="it f" tabindex="0" id="rmDeadBtn">🧹 ${esc(L("rmDead"))} (${e})</div>`),(S.deadHidden||[]).length&&n.insertAdjacentHTML("beforeend",`<div class="it f" tabindex="0" id="restoreDeadBtn">♻️ ${esc(L("restoreDead"))} (${S.deadHidden.length})</div>`))},activators.push(e=>{if(e.id==="rmDeadBtn"){const n=deadNow().map(t=>t.url);return S.deadHidden=(S.deadHidden||[]).concat(n.filter(t=>(S.deadHidden||[]).indexOf(t)<0)),channels=channels.filter(t=>n.indexOf(t.url)<0),channels.forEach((t,s)=>t.no=s+1),curGroup="__all",renderGroups(),banner("🧹",L("rmDeadDone"),n.length+"",2500),focus(document.querySelector("#groups .f")),!0}if(e.id==="restoreDeadBtn"){const n=S.deadHidden.length;return S.deadHidden=[],S.chStatus={},banner("♻️",L("restoreDead"),n+"",2500),loadLists().then(()=>renderGroups()),!0}return!1});

;
/* widgets.js */
DEF.layouts={};const WT={ar:{wEdit:"ترتيب الرئيسية (ويدجت)",wEditSub:"اختار جزء عشان تحرّكه أو تخفيه أو تكبّره",wMove:"حرّك بالأسهم",wMoveHint:"الأسهم = تحريك · OK = حفظ · رجوع = إلغاء · 1/3 = أصغر/أكبر",wHide:"إخفاء",wShow:"إظهار",wBigger:"تكبير",wSmaller:"تصغير",wUp:"لفوق في الترتيب",wDown:"لتحت في الترتيب",wReset:"رجّعه لمكانه",wResetAll:"رجّع كل حاجة زي الأول",wHidden:"مخفي",wMoved:"متحرّك",w_hero:"العنوان الكبير",w_allapps_w:"كل التطبيقات",w_smart:"مقترح ليك دلوقتي",w_watch:"كمّل المشاهدة",w_fav:"المفضلة",w_folders:"الفولدرات",w_matches:"ماتشات النهارده",w_favch:"القنوات المفضلة",w_quick:"اختصارات",w_recent:"آخر استخدام",w_clock:"الساعة والتاريخ",w_ticker:"الصلاة والماتشات",w_weather:"الطقس",w_sources:"المصادر",w_allapps:"زر كل التطبيقات"},en:{wEdit:"Arrange home (widgets)",wEditSub:"Pick a part to move, hide or resize",wMove:"Move with arrows",wMoveHint:"Arrows = move · OK = save · Back = cancel · 1/3 = smaller/bigger",wHide:"Hide",wShow:"Show",wBigger:"Bigger",wSmaller:"Smaller",wUp:"Earlier in order",wDown:"Later in order",wReset:"Put back",wResetAll:"Reset everything",wHidden:"hidden",wMoved:"moved",w_hero:"Big title",w_allapps_w:"All apps",w_smart:"Suggested for now",w_watch:"Continue watching",w_fav:"Favorites",w_folders:"Folders",w_matches:"Today's matches",w_favch:"Favorite channels",w_quick:"Shortcuts",w_recent:"Recently used",w_clock:"Clock & date",w_ticker:"Prayer & matches bar",w_weather:"Weather",w_sources:"Sources",w_allapps:"All apps button"}};Object.keys(WT).forEach(e=>Object.assign(T[e],WT[e]));const WIDGETS=[["hero","#shelf",null,1],["smart","#smartRow",'h2[data-row="smartRow"]',1],["watch","#watchRow",'h2[data-row="watchRow"]',1],["fav","#favRow",'h2[data-i18n="favorites"]',1],["folders","#folderRow",'h2[data-row="folderRow"]',1],["matches","#matchRow",'h2[data-row="matchRow"]',1],["favch","#favChRow",'h2[data-row="favChRow"]',1],["quick","#quickRow",'h2[data-row="quickRow"]',1],["recent","#recentRow",'h2[data-row="recentRow"]',1],["allapps_w","#allAppsW","#allAppsH",1],["clock",".top .clock",null,0],["ticker","#ticker",null,0],["weather",".top .weather",null,0],["sources","#xSources",null,0],["allapps","#xAllApps",null,0]],wEl=e=>document.querySelector(e[1]),wHead=e=>e[2]&&document.querySelector(e[2]);function lay(){const e=S.layouts||{};return e.__all?e.__all:e[S.theme]||Object.keys(e).map(s=>e[s]).find(s=>s&&Object.keys(s).length)||{}}function saveLay(e){S.layouts={__all:e}}function applyWidgets(){const e=lay(),t=document.querySelector("#home .scroll");if(t&&e.order&&e.order.length){e.order.forEach(o=>{const n=WIDGETS.find(l=>l[0]===o);if(!n||!n[3]||n[0]==="hero")return;const i=wHead(n),r=wEl(n);i&&t.appendChild(i),r&&t.appendChild(r)});const s=document.querySelector("#home .dockx");s&&t.appendChild(s)}WIDGETS.forEach(s=>{const o=wEl(s),n=wHead(s),i=e[s[0]]||{};if(o){if([o,n].forEach(r=>{r&&(r.dataset.wh&&(r.style.removeProperty("display"),delete r.dataset.wh),r.style.position=r.style.left=r.style.top=r.style.right=r.style.zIndex=r.style.transform=r.style.transformOrigin=r.style.width=r.style.margin="")}),i.hide){o.style.setProperty("display","none","important"),o.dataset.wh=1,n&&(n.style.setProperty("display","none","important"),n.dataset.wh=1);return}if(i.x!=null){const r={position:"fixed",left:i.x+"vw",top:i.y+"vh",right:"auto",zIndex:"7",margin:"0"};i.w&&(r.width=i.w+"vw"),Object.assign(o.style,r),n&&Object.assign(n.style,{position:"fixed",left:i.x+"vw",top:Math.max(0,i.y-3.4)+"vh",right:"auto",zIndex:"7",margin:"0",width:i.w?i.w+"vw":""})}i.s&&i.s!==1&&(o.style.transform="scale("+i.s+")",o.style.transformOrigin=document.documentElement.dir==="rtl"?"top right":"top left")}})}const _applyLookW=applyLook;applyLook=function(){_applyLookW.apply(this,arguments),setTimeout(applyWidgets,0)};function focusKey(e){if(!e)return null;const t=e.parentElement&&e.parentElement.id;for(const s of["pkg","chu","wk","folder","froot","fi","scat","page","act"])if(e.dataset&&e.dataset[s]!=null)return{row:t,sel:`[data-${s.replace(/[A-Z]/g,o=>"-"+o.toLowerCase())}="${String(e.dataset[s]).replace(/"/g,'\\"')}"]`};return e.id?{row:t,sel:"#"+e.id}:t?{row:t,idx:[].indexOf.call(e.parentElement.children,e)}:null}const _renderHomeW=renderHome;renderHome=function(){const e=focusKey(focused);if(_renderHomeW.apply(this,arguments),applyWidgets(),e&&(!focused||!document.body.contains(focused))){const t=e.row&&document.getElementById(e.row),s=e.sel?t&&t.querySelector(e.sel)||document.querySelector(e.sel):t&&(t.children[e.idx]||t.lastElementChild);focus(s&&s.offsetParent!==null?s:fallbackFocus())}};function widgetMenu(){const e=lay(),t=WIDGETS.filter(s=>wEl(s)).map(s=>{const o=e[s[0]]||{};return{icon:o.hide?"🙈":o.x!=null?"📍":"▫️",label:L("w_"+s[0])+(o.hide?" · "+L("wHidden"):o.x!=null?" · "+L("wMoved"):""),fn:()=>setTimeout(()=>widgetActions(s),30)}});t.push({icon:"♻️",label:L("wResetAll"),fn:()=>{saveLay({}),applyWidgets(),renderHome()}}),dialog("🧩 "+L("wEdit"),t,{grid:3,sub:L("wEditSub")})}function widgetActions(e){const t=lay(),s=t[e[0]]||{},o=e[0],n=[];s.hide||n.push({icon:"✥",label:L("wMove"),pri:1,fn:()=>setTimeout(()=>startMove(e),30)}),n.push({icon:s.hide?"👁":"🙈",label:s.hide?L("wShow"):L("wHide"),fn:()=>{setW(o,{hide:!s.hide}),setTimeout(widgetMenu,30)}}),s.hide||n.push({icon:"➕",label:L("wBigger"),keep:1,fn:()=>{setW(o,{s:Math.min(1.8,+((lay()[o]||{}).s||1)+.1)})}},{icon:"➖",label:L("wSmaller"),keep:1,fn:()=>{setW(o,{s:Math.max(.5,+((lay()[o]||{}).s||1)-.1)})}}),e[3]&&o!=="hero"&&n.push({icon:"⬆️",label:L("wUp"),keep:1,fn:()=>reorder(o,-1)},{icon:"⬇️",label:L("wDown"),keep:1,fn:()=>reorder(o,1)}),(s.x!=null||s.s||s.hide)&&n.push({icon:"↩️",label:L("wReset"),fn:()=>{const i=Object.assign({},lay());delete i[o],saveLay(i),applyWidgets(),setTimeout(widgetMenu,30)}}),n.push({label:L("done"),fn:()=>setTimeout(widgetMenu,30)}),dialog("🧩 "+L("w_"+o),n,{grid:3})}function setW(e,t){const s=Object.assign({},lay());s[e]=Object.assign({},s[e]||{},t),saveLay(s),applyWidgets()}function reorder(e,t){const s=WIDGETS.filter(l=>l[3]&&l[0]!=="hero").map(l=>l[0]),o=Object.assign({},lay());let n=o.order&&o.order.length?o.order.slice():s;s.forEach(l=>{n.indexOf(l)<0&&n.push(l)});const i=n.indexOf(e),r=i+t;r<0||r>=n.length||(n.splice(i,1),n.splice(r,0,e),o.order=n,saveLay(o),applyWidgets(),banner("🧩",L("w_"+e),r+1+" / "+n.length,1500))}let moving=null;function startMove(e){const t=wEl(e);if(!t)return;showPage("home");const s=t.getBoundingClientRect(),o=innerWidth/100,n=innerHeight/100,i=lay()[e[0]]||{};moving={w:e,x:i.x!=null?i.x:+(s.left/o).toFixed(1),y:i.y!=null?i.y:+(s.top/n).toFixed(1),wd:i.w||+(Math.min(s.width,innerWidth*.92)/o).toFixed(1),s:i.s||1,orig:Object.assign({},i)},t.classList.add("wmoving"),setW(e[0],{x:moving.x,y:moving.y,w:moving.wd}),banner("✥",L("w_"+e[0]),L("wMoveHint"),6e5)}function endMove(e){if(!moving)return;const t=moving.w[0],s=wEl(moving.w);if(s&&s.classList.remove("wmoving"),!e){const o=Object.assign({},lay());Object.keys(moving.orig).length?o[t]=moving.orig:delete o[t],saveLay(o)}moving=null,applyWidgets(),$("banners").innerHTML="",banner("🧩",L("w_"+t),e?L("saved"):L("cancel"),1500),setTimeout(widgetMenu,300)}if(layers.unshift({test:()=>!!moving,key:e=>{const t=e.key,s=e.repeat?2.5:1;if(e.preventDefault&&e.preventDefault(),t==="ArrowLeft")moving.x-=s;else if(t==="ArrowRight")moving.x+=s;else if(t==="ArrowUp")moving.y-=s;else if(t==="ArrowDown")moving.y+=s;else if(t==="1"||t==="-")moving.s=Math.max(.5,+(moving.s-.1).toFixed(2));else if(t==="3"||t==="+")moving.s=Math.min(1.8,+(moving.s+.1).toFixed(2));else return t==="Enter"||t===" "||e.keyCode===13||e.keyCode===23?(held=!0,endMove(!0),!0):(isBack(t)&&endMove(!1),!0);return moving.x=Math.max(-5,Math.min(98,moving.x)),moving.y=Math.max(0,Math.min(96,moving.y)),setW(moving.w[0],{x:+moving.x.toFixed(1),y:+moving.y.toFixed(1),w:moving.wd,s:moving.s}),!0}}),activators.push(e=>e.id==="wEditBtn"?(widgetMenu(),!0):!1),typeof ACTIONS=="function"){const e=ACTIONS;ACTIONS=()=>e().concat([["🧩",L("wEdit"),widgetMenu]])}const _lookSec=window.lifeSettings;window.widgetSettings=()=>sec("🧩 "+L("wEdit"),field(L("wEditSub"),`<div class="inline"><button class="btn pri f" id="wEditBtn">🧩 ${L("wEdit")}</button></div>`)),setTimeout(applyWidgets,800),document.addEventListener("click",e=>{moving&&(e.preventDefault(),e.stopPropagation(),held=!0,endMove(!0))},!0);const WST={ar:{wStyle:"الشكل والعرض",stSize:"الحجم",stShape:"شكل البلاطة",stView:"طريقة العرض",stNames:"الأسماء",stBg:"الخلفية",s_s:"صغير",s_m:"متوسط",s_l:"كبير",s_xl:"كبير جدًا",sh_wide:"عريض",sh_square:"مربع",sh_circle:"دايرة",sh_poster:"بوستر",sh_icon:"أيقونة بس",v_row:"صف بيتحرك",v_grid:"شبكة",v_list:"قايمة",n_on:"دايمًا",n_focus:"وقت التحديد",n_off:"مخفية",b_card:"كارت",b_clear:"شفافة"},en:{wStyle:"Shape & display",stSize:"Size",stShape:"Tile shape",stView:"Display",stNames:"Names",stBg:"Background",s_s:"Small",s_m:"Medium",s_l:"Large",s_xl:"Extra large",sh_wide:"Wide",sh_square:"Square",sh_circle:"Circle",sh_poster:"Poster",sh_icon:"Icon only",v_row:"Scrolling row",v_grid:"Grid",v_list:"List",n_on:"Always",n_focus:"On focus",n_off:"Hidden",b_card:"Card",b_clear:"Clear"}};Object.keys(WST).forEach(e=>Object.assign(T[e],WST[e]));const WSTYLE=[["size","stSize","📏",["","s","m","l","xl"],"s_"],["shape","stShape","🔷",["","wide","square","circle","poster","icon"],"sh_"],["view","stView","🧱",["","row","grid","list"],"v_"],["names","stNames","🔤",["","on","focus","off"],"n_"],["bg","stBg","🎴",["","card","clear"],"b_"]],stLabel=(e,t)=>t?L(e[4]+t):S.lang==="ar"?"حسب التصميم":"Design default";function applyWStyles(){const e=lay();WIDGETS.forEach(t=>{if(!t[3]||t[0]==="hero")return;const s=wEl(t);if(!s)return;const o=(e[t[0]]||{}).st||{};WSTYLE.forEach(n=>{const i="w"+n[0];o[n[0]]?s.setAttribute("data-"+i,o[n[0]]):s.removeAttribute("data-"+i)})}),document.querySelectorAll("#home .row .app").forEach(t=>{t.__w=null,t.style.height=""}),window.__fixAspect&&__fixAspect()}const _applyWidgetsS=applyWidgets;applyWidgets=function(){_applyWidgetsS.apply(this,arguments),applyWStyles()};function styleMenu(e){const t=e[0],s=(lay()[t]||{}).st||{},o=WSTYLE.map(n=>({icon:n[2],label:L(n[1])+": "+stLabel(n,s[n[0]]),keep:1,fn:()=>{const i=(lay()[t]||{}).st||{},r=n[3],l=r[(r.indexOf(i[n[0]]||"")+1)%r.length],a=Object.assign({},i);l?a[n[0]]=l:delete a[n[0]],setW(t,{st:a}),setTimeout(()=>{const d=focused&&focused.dataset.di;styleMenu(e);const c=$("dbox").querySelector('[data-di="'+d+'"]');c&&focus(c)},20)}}));o.push({label:L("done"),fn:()=>setTimeout(()=>widgetActions(e),30)}),dialog("🎨 "+L("w_"+t)+" · "+L("wStyle"),o,{grid:3})}const _widgetActionsS=widgetActions;widgetActions=function(e){if(_widgetActionsS.apply(this,arguments),!e[3]||e[0]==="hero")return;const t=$("dbox"),s=t._items,o=t.querySelector(".mgrid,.dlist");o&&(s.splice(1,0,{icon:"🎨",label:L("wStyle"),fn:()=>setTimeout(()=>styleMenu(e),30)}),o.innerHTML=s.map((n,i)=>`<button class="btn f${n.pri?" pri":""}" data-di="${i}">${n.icon?`<b>${esc(n.icon)}</b>`:""}${esc(n.label)}</button>`).join(""),focus(o.querySelector(".f")))};

;
/* setcats.js */
DEF.setCat=0;const CAT_ICONS=[[/الشكل|Look/,"🎨"],[/برواز|Frame/,"🖼"],[/قنوات|Channels|IPTV/,"📺"],[/طقس|مدينة|Location|Weather/,"🌤"],[/صلاة|Prayer|أذان/,"🕌"],[/هجري|Hijri|رمضان/,"🌙"],[/ماتشات|Matches|Sports/,"⚽"],[/إشعارات|Notif/,"🔔"],[/ريموت|Remote/,"🎛"],[/بروفايل|Profile/,"👥"],[/موبايل|Phone/,"📱"],[/الرئيسية كشاشة|home screen|Keep as home/,"🏠"],[/تحديث|Update/,"⬆️"],[/تشغيل البوكس|Start-up/,"⏻"],[/تيليجرام|Telegram/,"✈️"],[/تسجيل|Record/,"⏺"],[/ترتيب|Arrange|widget/i,"🧩"],[/قفل|أمان|Lock|Secur/,"🔒"],[/احتياطي|Backup/,"💾"],[/تجهيز|Setup/,"🧭"],[/أداء|Perf/,"⚡"],[/لغة|Lang/,"🌐"]],catIcon=t=>{const s=CAT_ICONS.find(e=>e[0].test(t));return s?s[1]:"⚙️"};function buildSetCats(){typeof groupSettings=="function"&&groupSettings();const t=$("setScroll"),s=[].slice.call(t.children).filter(n=>n.classList.contains("sec"));if(!s.length){$("setCats").innerHTML="";return}let e=Math.min(S.setCat||0,s.length-1);if(focused&&t.contains(focused)){const n=s.findIndex(a=>a.contains(focused));n>=0&&(e=n)}$("setCats").innerHTML=s.map((n,a)=>{const o=n.querySelector("h3"),c=o?o.textContent.trim():"#"+(a+1);return`<div class="it f${a===e?" sel":""}" tabindex="0" data-setcat="${a}">${/^[^\wء-ي]/.test(c)?esc(c):catIcon(c)+" "+esc(c)}</div>`}).join(""),showSetCat(e)}function showSetCat(t){[].slice.call($("setScroll").children).filter(e=>e.classList.contains("sec")).forEach((e,n)=>{e.style.display=n===t?"":"none"}),S.setCat=t,$("setScroll").scrollTop=0,document.querySelectorAll("#setCats [data-setcat]").forEach(e=>e.classList.toggle("sel",+e.dataset.setcat===t))}const _renderSettingsC=renderSettings;renderSettings=function(){_renderSettingsC.apply(this,arguments),buildSetCats()},window.renderSettings=renderSettings,focusHooks.push(t=>{t.dataset&&t.dataset.setcat!=null&&+t.dataset.setcat!==S.setCat&&showSetCat(+t.dataset.setcat)}),activators.push(t=>{if(t.dataset&&t.dataset.setcat!=null){showSetCat(+t.dataset.setcat);const s=[].slice.call($("setScroll").querySelectorAll(".f")).find(e=>e.offsetParent!==null);return s&&focus(s),!0}return!1});

;
/* framew.js */
var f=(e,t,a)=>new Promise((n,r)=>{var o=i=>{try{s(a.next(i))}catch(l){r(l)}},c=i=>{try{s(a.throw(i))}catch(l){r(l)}},s=i=>i.done?n(i.value):Promise.resolve(i.value).then(o,c);s((a=a.apply(e,t)).next())});Object.assign(DEF,{frameSec:30,frameCat:"bing",frameLay:{}});const FT={ar:{fwEdit:"ترتيب البرواز (ويدجت)",fwClock:"الساعة والتاريخ",fwWeather:"الطقس",fwPrayer:"الصلاة الجاية",fwMatch:"الماتش",fwMon:"مراقبة الجهاز",fwAzkar:"ذكر",fCat:"صور البرواز",fcBing:"صور Bing الطبيعية",sec:"ث",cpu:"المعالج",ram:"الرامات",net:"النت",disk:"مساحة فاضية"},en:{fwEdit:"Arrange frame (widgets)",fwClock:"Clock & date",fwWeather:"Weather",fwPrayer:"Next prayer",fwMatch:"Match",fwMon:"Device monitor",fwAzkar:"Dhikr",fCat:"Frame photos",fcBing:"Bing nature photos",sec:"s",cpu:"CPU",ram:"RAM",net:"Network",disk:"Free space"}};Object.keys(FT).forEach(e=>Object.assign(T[e],FT[e]));const FWS=[["clock","fwClock",4,66,1],["weather","fwWeather",76,6,1],["prayer","fwPrayer",4,6,1],["match","fwMatch",58,82,1],["mon","fwMon",36,6,0],["azkar","fwAzkar",30,44,0]];(function(){const e=document.createElement("div");e.id="fwBox",e.innerHTML=FWS.map(t=>`<div class="fw" id="fw_${t[0]}"></div>`).join(""),$("frame").appendChild(e)})();function fwCfg(e){const t=FWS.find(n=>n[0]===e),a=(S.frameLay||{})[e]||{};return{x:a.x!=null?a.x:t[2],y:a.y!=null?a.y:t[3],s:a.s||1,on:a.on!=null?a.on:e==="clock"?S.fw.clock:e==="weather"?S.fw.weather:e==="prayer"?S.fw.prayer:e==="match"?S.fw.match:!!t[4]}}function fwSet(e,t){const a=Object.assign({},S.frameLay||{});a[e]=Object.assign({},a[e]||{},t),S.frameLay=a,fwApply()}function fwApply(){const e=document.documentElement.dir==="rtl";FWS.forEach(t=>{const a=$("fw_"+t[0]),n=fwCfg(t[0]);a.style.display=n.on&&a.innerHTML?"":"none",a.style.left=n.x+"vw",a.style.top=n.y+"vh",a.style.transform=n.s!==1?"scale("+n.s+")":"",a.style.transformOrigin=e?"top right":"top left"})}let monPrev=null,monTxt="";function monRead(){let e={};try{e=JSON.parse(nat("monitor")||"{}")}catch(n){}const t=n=>(n/1073741824).toFixed(1),a=[];if(monPrev&&e.t){const n=(e.t-monPrev.t)/1e3;if(e.cpuTot&&monPrev.cpuTot){const r=e.cpuTot-monPrev.cpuTot,o=e.cpuIdle-monPrev.cpuIdle;r>0&&a.push(`🧠 ${L("cpu")} ${Math.round(100*(1-o/r))}%`)}if(n>0){const r=(e.rx-monPrev.rx)/n;a.push(`📶 ${L("net")} ${r>1048576?(r/1048576).toFixed(1)+" MB/s":Math.round(r/1024)+" KB/s"}`)}}e.ramTotal&&a.push(`💾 ${L("ram")} ${Math.round(100*e.ramUsed/e.ramTotal)}% (${t(e.ramUsed)}/${t(e.ramTotal)} GB)`),e.diskFree&&a.push(`🗄 ${L("disk")} ${t(e.diskFree)} GB`),monPrev=e,monTxt=a.join("<br>")}const AZKAR_F=["سبحان الله وبحمده، سبحان الله العظيم","لا إله إلا الله وحده لا شريك له","اللهم صلِّ وسلم على نبينا محمد","أستغفر الله وأتوب إليه","لا حول ولا قوة إلا بالله","الحمد لله رب العالمين"];function fwFill(){if(!on("frame"))return;const e=new Date;$("fw_clock").innerHTML=`<div class="fwt">${esc(fmtTime(e,!0))}</div><div class="fwd">${esc(fmtDate(e))}</div>`,$("fw_weather").innerHTML=weatherNow?`<b>${esc(weatherNow.i)}</b> ${esc(weatherNow.t)}°<div class="fws">${esc(weatherNow.city||"")}</div>`:"";const t=S.prayerOn&&window.nextPrayer?nextPrayer():null;$("fw_prayer").innerHTML=t?`🕌 ${esc(L("prayers")[t.i])}<div class="fwt2">${esc(fmtTime(t.t))}</div>`:"";const a=S.sportsOn&&typeof matches<"u"?matches.find(n=>evState(n)==="live")||matches.find(n=>evState(n)==="ns"):null;$("fw_match").innerHTML=a?`⚽ ${esc(a.strHomeTeam)} × ${esc(a.strAwayTeam)}<div class="fws">${evState(a)==="live"?`${a.intHomeScore||0} - ${a.intAwayScore||0}`:esc(fmtTime(evTime(a)))}</div>`:"",fwCfg("mon").on&&(e.getSeconds()%2||monRead(),$("fw_mon").innerHTML=monTxt),(!(e.getSeconds()%20)||!$("fw_azkar").innerHTML)&&($("fw_azkar").innerHTML=esc(AZKAR_F[Math.floor(e.getTime()/2e4)%AZKAR_F.length])),fwApply()}tickers.push(fwFill);let fPool=[],fPoolAt=0,fBusy=!1;function fBuildPool(){return f(this,null,function*(){try{fPool=(yield wallList(S.frameCat==="bing"?"bing":S.frameCat,1+Math.floor(Math.random()*3))).map(e=>e.full)}catch(e){fPool=[]}fPoolAt=Date.now();for(let e=fPool.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1)),a=fPool[e];fPool[e]=fPool[t],fPool[t]=a}})}function fNext(){return f(this,null,function*(){if(!(fBusy||!on("frame"))){fBusy=!0;try{const e=S.frameSrc==="mine"&&S.frames.length?"mine":S.frameSrc;let t;if(e==="mine")t=`url("${S.frames[frameIdx++%S.frames.length]}")`;else if(e==="grad")t=DAILY[frameIdx++%DAILY.length];else{(!fPool.length||Date.now()-fPoolAt>3*36e5)&&(yield fBuildPool());const a=fPool.length?fPool[frameIdx++%fPool.length]:null;let n=a;if(a&&NA&&NA.cacheImage)try{n=yield natAsync("cacheImage",a,1920)}catch(r){n=null}n?(yield new Promise(r=>{const o=new Image;o.onload=o.onerror=r,o.src=n}),t=`url("${n}")`):t=DAILY[frameIdx++%DAILY.length]}if(S.frameStyle==="art")$("frameArtImg").style.background=`${t} center/cover`;else{const a=$(frameFront?"frameA":"frameB"),n=$(frameFront?"frameB":"frameA");a.style.background=`${t} center/cover`,a.classList.add("show"),n.classList.remove("show"),frameFront=!frameFront}}finally{fBusy=!1}}})}frameNext=fNext;const _startFrameF=startFrame;startFrame=function(){_startFrameF.apply(this,arguments),clearInterval(frameT),frameT=setInterval(fNext,Math.max(10,+S.frameSec||30)*1e3),monPrev=null,monRead(),fwFill()};let fMove=null;function frameWidgetMenu(){const e=FWS.map(t=>({icon:fwCfg(t[0]).on?"👁":"🙈",label:L(t[1]),fn:()=>setTimeout(()=>fwActions(t[0]),30)}));e.push({icon:"♻️",label:L("wResetAll"),fn:()=>{S.frameLay={},fwApply()}}),dialog("🧩 "+L("fwEdit"),e,{grid:3,sub:L("wEditSub")})}function fwActions(e){const t=fwCfg(e),a=[];t.on&&a.push({icon:"✥",label:L("wMove"),pri:1,fn:()=>setTimeout(()=>fwStartMove(e),30)}),a.push({icon:t.on?"🙈":"👁",label:t.on?L("wHide"):L("wShow"),fn:()=>{fwSet(e,{on:!t.on}),setTimeout(frameWidgetMenu,30)}}),t.on&&a.push({icon:"➕",label:L("wBigger"),keep:1,fn:()=>fwSet(e,{s:Math.min(2.5,+(fwCfg(e).s+.15).toFixed(2))})},{icon:"➖",label:L("wSmaller"),keep:1,fn:()=>fwSet(e,{s:Math.max(.5,+(fwCfg(e).s-.15).toFixed(2))})}),a.push({icon:"↩️",label:L("wReset"),fn:()=>{const n=Object.assign({},S.frameLay||{});delete n[e],S.frameLay=n,setTimeout(frameWidgetMenu,30)}},{label:L("done"),fn:()=>setTimeout(frameWidgetMenu,30)}),dialog("🧩 "+L(FWS.find(n=>n[0]===e)[1]),a,{grid:3})}function fwStartMove(e){const t=fwCfg(e);fMove={id:e,x:t.x,y:t.y,s:t.s,orig:Object.assign({},(S.frameLay||{})[e]||{})},startFrame(),$("fw_"+e).classList.add("wmoving"),banner("✥",L(FWS.find(a=>a[0]===e)[1]),L("wMoveHint"),6e5)}function fwEndMove(e){if(!fMove)return;const t=fMove.id;if($("fw_"+t).classList.remove("wmoving"),!e){const a=Object.assign({},S.frameLay||{});Object.keys(fMove.orig).length?a[t]=fMove.orig:delete a[t],S.frameLay=a}fMove=null,$("banners").innerHTML="",stopFrame(),setTimeout(frameWidgetMenu,200)}layers.unshift({test:()=>!!fMove,ownsEnter:!0,key:e=>{const t=e.key,a=e.repeat?2.5:1;if(e.preventDefault&&e.preventDefault(),t==="ArrowLeft")fMove.x-=a;else if(t==="ArrowRight")fMove.x+=a;else if(t==="ArrowUp")fMove.y-=a;else if(t==="ArrowDown")fMove.y+=a;else if(t==="1"||t==="-")fMove.s=Math.max(.5,+(fMove.s-.1).toFixed(2));else if(t==="3"||t==="+")fMove.s=Math.min(2.5,+(fMove.s+.1).toFixed(2));else return t==="Enter"||t===" "||e.keyCode===13||e.keyCode===23?(held=!0,fwEndMove(!0),!0):(isBack(t)&&fwEndMove(!1),!0);return fMove.x=Math.max(0,Math.min(95,fMove.x)),fMove.y=Math.max(0,Math.min(95,fMove.y)),fwSet(fMove.id,{x:+fMove.x.toFixed(1),y:+fMove.y.toFixed(1),s:fMove.s,on:!0}),!0}}),activators.push(e=>e.id==="fwEditBtn"?(frameWidgetMenu(),!0):!1),DEF.frameFree=!1;const _fwApplyP=fwApply;fwApply=function(){_fwApplyP.apply(this,arguments),document.body.classList.toggle("fwpro",!S.frameFree&&!fMove),!S.frameFree&&!fMove&&FWS.forEach(e=>{const t=$("fw_"+e[0]);t.style.left=t.style.top=t.style.transform=""})};const _fwStartMoveP=fwStartMove;fwStartMove=function(e){S.frameFree=!0,_fwStartMoveP(e)};const _frameWidgetMenuP=frameWidgetMenu;frameWidgetMenu=function(){_frameWidgetMenuP();const e=$("dbox"),t=e._items,a=e.querySelector(".mgrid,.dlist");!t||!a||(t.push({icon:"✨",label:(S.lang==="ar"?"ترتيب احترافي تلقائي":"Professional auto layout")+(S.frameFree?"":" ✓"),fn:()=>{S.frameFree=!1,fwApply()}}),a.innerHTML=t.map((n,r)=>`<button class="btn f${n.pri?" pri":""}" data-di="${r}">${n.icon?`<b>${esc(n.icon)}</b>`:""}${esc(n.label)}</button>`).join(""),focus(a.querySelector(".f")))},Object.assign(T.ar,{wIslam:"🕋 صور إسلامية (الكعبة والحرم)"}),Object.assign(T.en,{wIslam:"🕋 Islamic (Kaaba & Haram)"});const _wallListI=wallList;wallList=function(e,t){return f(this,null,function*(){if(e!=="islamic")return _wallListI(e,t);const a=["kaaba","mecca","masjid al haram","medina mosque","mosque"],n=[],r={};return yield Promise.all(a.map(o=>f(this,null,function*(){try{((yield A.fetchJSON(`https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(o)}&categories=100&purity=100&atleast=1920x1080&ratios=16x9&sorting=relevance&page=${t||1}`)).data||[]).forEach(s=>{r[s.path]||(r[s.path]=1,n.push({full:s.path,thumb:s.thumbs&&(s.thumbs.small||s.thumbs.original)}))})}catch(c){}}))),n})},window.wallList=wallList;const _WALL_CATSI=WALL_CATS;WALL_CATS=()=>[["islamic","🕋",L("wIslam")]].concat(_WALL_CATSI());const _renderSettingsI=renderSettings;renderSettings=function(){_renderSettingsI.apply(this,arguments);const e=document.querySelector('#setScroll [data-set^="frameCat:"]');e&&!document.querySelector('#setScroll [data-set="frameCat:islamic"]')&&e.insertAdjacentHTML("beforebegin",`<button class="btn f${S.frameCat==="islamic"?" pri":""}" data-set="frameCat:islamic">${esc(L("wIslam"))}</button>`)},S.islamSeeded||(S.islamSeeded=!0,S.frameCat="islamic",S.frameSrc="online",fPool=[]);

;
/* smart.js */
var d=(e,t,n)=>new Promise((a,o)=>{var s=r=>{try{l(n.next(r))}catch(c){o(c)}},i=r=>{try{l(n.throw(r))}catch(c){o(c)}},l=r=>r.done?a(r.value):Promise.resolve(r.value).then(s,i);l((n=n.apply(e,t)).next())});DEF.habits={};const SM={ar:{smartRow:"✨ مقترح ليك دلوقتي"},en:{smartRow:"✨ Suggested for now"}};Object.keys(SM).forEach(e=>Object.assign(T[e],SM[e]));function habit(e){const t=Object.assign({},S.habits||{}),n=new Date().getHours(),a=(t[e]||new Array(24).fill(0)).slice();a[n]++,t[e]=a;const o=Object.keys(t);o.length>60&&(o.sort((s,i)=>t[s].reduce((l,r)=>l+r,0)-t[i].reduce((l,r)=>l+r,0)),delete t[o[0]]),S.habits=t}const _launchH=launch;launch=function(e){return habit("a:"+e),_launchH.apply(this,arguments)};let lastHab="",lastHabT=0;const _playH=play;play=function(e){return e&&!e.kind&&e.url&&!(lastHab===e.url&&Date.now()-lastHabT<5e3)&&(lastHab=e.url,lastHabT=Date.now(),habit("c:"+e.url)),_playH.apply(this,arguments)};function smartItems(){const e=S.habits||{},t=new Date().getHours(),n=a=>2*a[t]+a[(t+23)%24]+a[(t+1)%24];return Object.keys(e).map(a=>({k:a,s:n(e[a])})).filter(a=>a.s>=2).sort((a,o)=>o.s-a.s).slice(0,8)}function renderSmart(){if(isKids()){setRow("smartRow","");return}const e=smartItems().map(t=>{if(t.k.indexOf("a:")===0){const o=byPkg(t.k.slice(2));return o&&!isHidden(o.pkg)?tile(o):""}const n=t.k.slice(2),a=window.chByUrl&&chByUrl(n)||null;return a?chTile(a):""}).join("");setRow("smartRow",e)}(function(){const e=$("shelf");e&&!$("smartRow")&&e.insertAdjacentHTML("afterend",`<h2 data-row="smartRow">${L("smartRow")}</h2><div class="row" id="smartRow"></div>`)})();const _renderHomeS=renderHome;renderHome=function(){_renderHomeS.apply(this,arguments);try{const e=document.querySelector('h2[data-row="smartRow"]');e&&(e.textContent=L("smartRow")),renderSmart()}catch(e){}},function(){const e=document.createElement("div");e.id="osd",e.innerHTML='<b id="osdI"></b><div><div id="osdT"></div><div class="osdbar"><i id="osdB"></i></div></div>',document.body.appendChild(e)}();let osdT=null;function showOsd(e,t,n){$("osdI").textContent=e,$("osdT").textContent=t,$("osdB").parentNode.style.display=n==null?"none":"",n!=null&&($("osdB").style.width=Math.max(0,Math.min(100,n))+"%"),$("osd").classList.add("on"),clearTimeout(osdT),osdT=setTimeout(()=>$("osd").classList.remove("on"),2200)}window.onVolOsd=(e,t,n)=>showOsd(n||!e?"🔇":e<t/3?"🔈":e<t*2/3?"🔉":"🔊",n?"—":e+" / "+t,n?0:100*e/t);const _zapO=zap;zap=function(e){_zapO.apply(this,arguments),playing&&showOsd("📺",(playing.no?playing.no+"  ·  ":"")+playing.name,null)};const VSM={ar:{vHeard:"سمعتك",sSched:"جدول تشغيل الشاشة",schedOff:"اطفي الشاشة الساعة",schedWake:"شغّلها الساعة",schedAct:"أول ما تشتغل",wNone:"ولا حاجة",wQuran:"إذاعة القرآن",wLastCh:"آخر قناة",goodMorning:"صباح الخير",schedOffNow:"وقت النوم — الشاشة هتطفي",rTitle:"🌙 رمضان كريم",rIftarIn:"الإفطار بعد",rImsakIn:"الإمساك بعد",duaIftar:"ذهب الظمأ وابتلّت العروق وثبت الأجر إن شاء الله",duaSuhoor:"تسحّروا فإن في السحور بركة",suhoorNow:"وقت السحور"},en:{vHeard:"Heard",sSched:"Screen schedule",schedOff:"Turn screen off at",schedWake:"Turn it on at",schedAct:"When it turns on",wNone:"Nothing",wQuran:"Quran radio",wLastCh:"Last channel",goodMorning:"Good morning",schedOffNow:"Bedtime — screen turning off",rTitle:"🌙 Ramadan Kareem",rIftarIn:"Iftar in",rImsakIn:"Imsak in",duaIftar:"Thirst is gone, veins are moistened and the reward is certain, God willing",duaSuhoor:"Eat suhoor, for there is blessing in it",suhoorNow:"Suhoor time"}};Object.keys(VSM).forEach(e=>Object.assign(T[e],VSM[e]));const _onVoiceS=window.onVoice;window.onVoice=e=>{let t=String(e||"").trim().replace(/^(شغل|شغّل|افتحلي|عايز|عاوز|play|open the)\s+/i,"").replace(/^(قناه)\s+/,"قناة ");!/^(قناة|افتح|اقفل|سجل|سجّل|نوم|رسالة|ch|open|close|rec|sleep)\b/i.test(t)&&channels.some(a=>a.name.toLowerCase().indexOf(t.toLowerCase())>=0)&&(t="قناة "+t);let n="";try{n=tgCmd(t)}catch(a){}if(n&&n!==tgt("help")&&n!==tgt("nf")){banner("🎙",L("vHeard"),e+" → "+n.split(`
`)[0],3e3);return}_onVoiceS(e)},Object.assign(DEF,{schedOn:!1,schedOff:"23:30",schedWake:"07:00",schedAct:"quran"});let schedDone="";setInterval(()=>{if(!S.schedOn)return;const e=new Date,t=String(e.getHours()).padStart(2,"0")+":"+String(e.getMinutes()).padStart(2,"0"),n=e.toDateString()+t;t===S.schedOff&&schedDone!==n&&(schedDone=n,banner("😴",L("schedOffNow"),"",4e3),setTimeout(()=>{on("player")&&stopPlayer(),window.stopRadio&&stopRadio(),nat("sleepNow")||$("blackout").classList.add("on")},5e3))},2e4),window.onScheduledWake=()=>{on("blackout")&&$("blackout").classList.remove("on"),idleAt=Date.now(),banner("☀️",L("goodMorning"),"",4e3),S.schedAct==="quran"&&window.playRadio?playRadio(S.radio||RADIO_FB[0]):S.schedAct==="lastch"&&S.lastCh&&play(Object.assign({},S.lastCh))};function schedSync(){nat("scheduleWake",S.schedOn?S.schedWake:"")}const timeOpts=(e,t,n)=>{const a=[];for(let o=e;o<=t;o++)for(let s=0;s<60;s+=n)a.push(String(o%24).padStart(2,"0")+":"+String(s).padStart(2,"0"));return a},_wsS=window.widgetSettings;window.widgetSettings=function(){return sec("⏰ "+L("sSched"),field("",onoff("schedOn"))+(S.schedOn?field(L("schedOff"),`<div class="inline tscroll">${timeOpts(21,26,30).map(e=>`<button class="btn sm f${S.schedOff===e?" pri":""}" data-sched="schedOff:${e}">${e}</button>`).join("")}</div>`)+field(L("schedWake"),`<div class="inline tscroll">${timeOpts(5,10,30).map(e=>`<button class="btn sm f${S.schedWake===e?" pri":""}" data-sched="schedWake:${e}">${e}</button>`).join("")}</div>`)+field(L("schedAct"),seg("schedAct",[["quran","📻 "+L("wQuran")],["lastch","📺 "+L("wLastCh")],["none",L("wNone")]])):""))+(_wsS?_wsS():"")},AFTER.schedOn=()=>schedSync(),activators.push(e=>{if(e.dataset&&e.dataset.sched){const[t,n]=e.dataset.sched.split(/:(.+)/);return S[t]=n,schedSync(),renderSettings(),!0}return!1}),setTimeout(schedSync,3e3),function(){const e=document.createElement("div");e.id="ramCard",$("home").appendChild(e)}(),tickers.push(()=>{const e=$("ramCard");if(!e)return;if(!(typeof isRamadan=="function"&&isRamadan()&&prayers.length&&!isKids())){e.style.display="none";return}const n=Date.now(),a=prayers[0].getTime?prayers[0].getTime():+prayers[0],o=prayers[4].getTime?prayers[4].getTime():+prayers[4];let s,i,l;if(n<a)s=L("rImsakIn"),i=a-10*6e4,l=L("duaSuhoor");else if(n<o)s=L("rIftarIn"),i=o,l=L("duaIftar");else{const h=typeof prayersTomorrow<"u"&&prayersTomorrow.length?prayersTomorrow[0].getTime?prayersTomorrow[0].getTime():+prayersTomorrow[0]:a+864e5;s=L("rImsakIn"),i=h-10*6e4,l=L("duaSuhoor")}const r=Math.max(0,i-n),c=Math.floor(r/36e5),u=Math.floor(r%36e5/6e4),f=Math.floor(r%6e4/1e3);e.innerHTML=`<div class="rt">${esc(L("rTitle"))}</div><div class="rl">${esc(s)}</div><div class="rc">${c}:${String(u).padStart(2,"0")}:${String(f).padStart(2,"0")}</div><div class="rd">${esc(l)}</div>`,e.style.display=""}),DEF.tgBackupAt=0;const BK={ar:{bkTg:"نسخة احتياطية من إعدادات البوكس",bkTgSent:"اتبعتت نسخة احتياطية على تيليجرام",bkTgHow:"علشان ترجّعها: ابعت الملف ده للبوت تاني"},en:{bkTg:"Box settings backup",bkTgSent:"Backup sent to Telegram",bkTgHow:"To restore: send this file back to the bot"}};Object.keys(BK).forEach(e=>Object.assign(T[e],BK[e]));function backupJson(){const e={app:"tvlauncher",v:2,data:{}};for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);e.data[n]=localStorage.getItem(n)}return JSON.stringify(e)}function tgBackup(e){if(!S.tgChat||!S.tgToken)return!1;const t=new Date().toISOString().slice(0,10);return nat("tgSendDoc",S.tgChat,"tvlauncher-backup-"+t+".json",backupJson(),"💾 "+L("bkTg")+" · "+t+`
`+L("bkTgHow")),S.tgBackupAt=Date.now(),e&&banner("💾",L("bkTgSent"),"",2500),!0}setInterval(()=>{S.tgChat&&Date.now()-(S.tgBackupAt||0)>7*864e5&&tgBackup(!1)},36e5),setTimeout(()=>{S.tgChat&&Date.now()-(S.tgBackupAt||0)>7*864e5&&tgBackup(!1)},6e4);const _onTgB=window.onTg;window.onTg=(e,t,n)=>{if(S.tgChat&&e===S.tgChat&&/^__doc:/.test(n)){const a=n.split(":"),o=a[1],s=a.slice(2).join(":");if(!/\.json$/i.test(s)){tgSend(e,"📎 "+s);return}natAsync("tgGetFile",o).then(i=>{window.onBackupLoaded(i),tgSend(e,"✅ "+L("bkLoaded"))}).catch(i=>tgSend(e,"⚠️ "+i.message));return}return _onTgB(e,t,n)};const _tgCmdB=tgCmd;tgCmd=function(e){return/^\/?(نسخة|نسخه|backup)$/i.test(String(e).trim())?tgBackup(!0)?"💾 ✅":tgt("nf"):_tgCmdB.apply(this,arguments)},DEF.anim="auto";const AN={ar:{anim:"خلفية متحركة",anAurora:"شفق",anStars:"نجوم",anWaves:"موج",anBokeh:"فقاعات نور"},en:{anim:"Animated background",anAurora:"Aurora",anStars:"Stars",anWaves:"Waves",anBokeh:"Bokeh"}};Object.keys(AN).forEach(e=>Object.assign(T[e],AN[e]));const _applyLookA=applyLook;applyLook=function(){_applyLookA.apply(this,arguments),document.body.dataset.anim=S.anim||"off"},AFTER.anim=applyLook;const _lifeSetA=window.lifeSettings;window.lifeSettings=function(){return sec("✨ "+L("anim"),field("",seg("anim",[["off",L("off")],["aurora","🌌 "+L("anAurora")],["stars","✨ "+L("anStars")],["waves","🌊 "+L("anWaves")],["bokeh","🫧 "+L("anBokeh")]])))+(_lifeSetA?_lifeSetA():"")},document.body.dataset.anim=S.anim||"off";const BO={ar:{allW:"📱 كل التطبيقات",boost:"تسريع",boosting:"بسرّع الجهاز...",boostDone:"الجهاز اتسرّع",freed:"اتوفّر",closedN:"تطبيق اتقفل"},en:{allW:"📱 All apps",boost:"Boost",boosting:"Boosting...",boostDone:"Box boosted",freed:"Freed",closedN:"apps closed"}};Object.keys(BO).forEach(e=>Object.assign(T[e],BO[e]));function boostTile(){return`<div class="app f boosttile" tabindex="0" id="boostTile"><div class="lbl">🚀</div><div class="nm">${esc(L("boost"))}</div></div>`}function renderAllW(){const e=$("allAppsW"),t=$("allAppsH");if(e){if(t&&(t.textContent=L("allW")),isKids()){e.innerHTML="",e.style.display="none",t&&(t.style.display="none");return}e.innerHTML=boostTile()+visibleApps().slice().sort((n,a)=>appName(n).localeCompare(appName(a))).map(tile).join("")}}const _renderHomeA=renderHome;renderHome=function(){_renderHomeA.apply(this,arguments);try{renderAllW(),window.applyWidgets&&applyWidgets()}catch(e){}};let boosting=!1;function boostNow(){return d(this,null,function*(){if(boosting)return;boosting=!0,banner("🚀",L("boosting"),"",2500);const e=JSON.parse(nat("memInfo")||"{}").avail||0,t=openedApps.slice();for(const s of t)yield closeOne(s);const n=+(nat("cleanRam")||0);try{typeof shz=="function"&&shz()==="ok"&&(yield runShell("pm trim-caches 999G"))}catch(s){}nat("clearOwnCache"),yield new Promise(s=>setTimeout(s,1500));const a=JSON.parse(nat("memInfo")||"{}").avail||0,o=Math.max(0,Math.round((a-e)/1048576));banner("✅",L("boostDone"),`${L("freed")} ${o} MB · ${t.length+n} ${L("closedN")}`,5e3),boosting=!1,renderHome()})}if(window.boostNow=boostNow,activators.push(e=>e.id==="boostBtn"||e.id==="boostTile"?(boostNow(),!0):!1),typeof ACTIONS=="function"){const e=ACTIONS;ACTIONS=()=>[["🚀",L("boost"),boostNow]].concat(e())}const _tgCmdBo=tgCmd;tgCmd=function(e){return/^\/?(سرّع|سرع|تسريع|boost)$/i.test(String(e).trim())?(boostNow(),"🚀"):_tgCmdBo.apply(this,arguments)};const LIVE_OF={apple:"aurora",google:"glow",shield:"glow",bravia:"waves",tizen:"waves",smarthub:"bokeh",webos:"bokeh",webos22:"aurora",firetv:"glow",roku:"bokeh",patchwall:"aurora",xbox:"glow",ps5:"waves",wmc:"waves",plex:"bokeh",kodi:"stars",classic:"aurora",light:"bokeh",neon:"aurora",startpage:"stars",dock:"waves",amoled:"stars",ramadan:"lanterns",vidaa:"aurora"};Object.assign(T.ar,{anAuto:"حسب الثيم (حي)",anGlow:"توهج",anLant:"فوانيس",liveWall:"حركة بطيئة للخلفية",autoClean:"تنضيف تلقائي من اللاج",cleaned:"اتنضف تلقائي"}),Object.assign(T.en,{anAuto:"Per theme (live)",anGlow:"Glow",anLant:"Lanterns",liveWall:"Slow wallpaper motion",autoClean:"Auto-clean lag",cleaned:"Auto-cleaned"}),DEF.liveWall=!1,DEF.autoClean=!0;const CHEAP={stars:1,lanterns:1,off:1},animOf=()=>{const e=S.anim||"auto";if(e!=="auto")return e;const t=LIVE_OF[S.theme]||"aurora";return S.lite&&!CHEAP[t]?"stars":t},_applyLookL=applyLook;applyLook=function(){_applyLookL.apply(this,arguments),document.body.dataset.anim=animOf(),document.body.classList.toggle("livewall",!!S.liveWall)},AFTER.liveWall=applyLook,document.body.dataset.anim=animOf(),document.body.classList.toggle("livewall",!!S.liveWall),window.lifeSettings=function(){return sec("🪶 "+L("simple"),field(L("simpleSub"),onoff("simple")))+sec("📺 "+L("iptvOn"),field(L("iptvOnSub"),onoff("iptvOn")))+sec("✨ "+L("anim"),field("",seg("anim",[["auto","🎨 "+L("anAuto")],["off",L("off")],["aurora","🌌 "+L("anAurora")],["stars","✨ "+L("anStars")],["waves","🌊 "+L("anWaves")],["bokeh","🔆 "+L("anBokeh")],["glow","💡 "+L("anGlow")],["lanterns","🏮 "+L("anLant")]]))+field(L("liveWall"),onoff("liveWall"))+field(L("autoClean"),onoff("autoClean")))+(_lifeSetA?_lifeSetA():"")};let lastClean=0,cleaning=!1;function busyNow(){if(on("player")||on("dlg"))return!0;const e=document.querySelectorAll("video");for(let t=0;t<e.length;t++)if(!e[t].paused)return!0;return!1}function autoClean(e){return d(this,null,function*(){if(!(!S.autoClean||cleaning||!NA)&&!(!e&&busyNow())){cleaning=!0;try{const t=+(nat("selfClean")||0);typeof spCache<"u"&&Object.keys(spCache).forEach(o=>delete spCache[o]),document.querySelectorAll(".page:not(.on) .row img,.page:not(.on) .grid img").forEach(o=>{o.getBoundingClientRect().width===0&&o.src&&o.src.indexOf("http")===0&&(o.dataset.src=o.src)});let n={};try{n=JSON.parse(nat("memInfo")||"{}")}catch(o){}let a=0;(e||n.total&&n.avail/n.total<.15)&&(a=+(nat("cleanRam")||0)),lastClean=Date.now(),(e||a||t>20*1048576)&&banner("🧹",L("cleaned"),t>1048576?Math.round(t/1048576)+" MB":"",2500)}catch(t){}cleaning=!1}})}window.autoClean=autoClean,window.onLowMem=e=>{Date.now()-lastClean>6e4&&autoClean(e>=15)},setInterval(()=>{Date.now()-lastClean>20*6e4&&autoClean(!1)},6e4);let lagLast=Date.now(),lagHits=0;setInterval(()=>{const e=Date.now()-lagLast-1e3;lagLast=Date.now(),e>1500?++lagHits>=2&&Date.now()-lastClean>12e4&&(lagHits=0,autoClean(!1)):lagHits=Math.max(0,lagHits-1)},1e3),Object.assign(T.ar,{chCapped:"الجهاز رامته ٢ جيجا، فاتحمّل أول"}),Object.assign(T.en,{chCapped:"2 GB box: loaded only the first"});

;
/* hw.js */
var h=(e,t,o)=>new Promise((s,n)=>{var a=i=>{try{r(o.next(i))}catch(d){n(d)}},c=i=>{try{r(o.throw(i))}catch(d){n(d)}},r=i=>i.done?s(i.value):Promise.resolve(i.value).then(a,c);r((o=o.apply(e,t)).next())});Object.assign(DEF,{hw:[{id:"clock",t:"clock",sz:2,st:"glass"},{id:"prayer",t:"prayer",sz:2,st:"glass"},{id:"weather",t:"weather",sz:1,st:"glass"},{id:"boost",t:"boost",sz:1,st:"accent"}],ytCh:[],iconLook:"theme"});const HWT={ar:{hwTitle:"الويدجت",hwAdd:"إضافة ويدجت",hwEdit:"تعديل الويدجت",hwClock:"الساعة",hwWeather:"الطقس",hwPrayer:"مواعيد الصلاة",hwMatches:"الماتشات",hwBoost:"تسريع الجهاز",hwMon:"مراقبة الجهاز",hwYt:"يوتيوب — قنواتي",hwAzkar:"ذكر",hwCal:"التقويم",hwNote:"ملاحظة",hwLeft:"حرّك يمين",hwRight:"حرّك شمال",hwSize:"الحجم",hwStyle:"الشكل",hwRemove:"شيل الويدجت",hwSettings:"إعدادات الويدجت",szS:"صغير",szM:"وسط",szL:"كبير",szF:"عرض الشاشة",stGlass:"زجاجي",stSolid:"مصمت",stAccent:"ملوّن",stClear:"شفاف",stGrad:"متدرج",ytAdd:"إضافة قناة يوتيوب",ytAddPh:"لينك القناة أو @الاسم",ytNone:"ضيف قنوات يوتيوب بتتابعها (اضغط مطوّل ← إعدادات الويدجت)",ytBad:"ملقتش القناة",ytRem:"شيل",ytLoading:"بيجيب أحدث الفيديوهات…",mNone:"مفيش ماتشات النهارده",mLoad:"بيجيب الماتشات…",pLeft:"باقي",boostOk:"اضغط OK للتسريع",ramUsed:"رامات مستخدمة",noteEdit:"اكتب ملاحظتك",noteEmpty:"اضغط مطوّل ← إعدادات لكتابة ملاحظة",icLook:"شكل أيقونات التطبيقات",icTheme:"حسب الثيم",sh_wide:"عريض",sh_square:"مربع",sh_circle:"دائري",sh_poster:"بوستر",sh_icon:"أيقونة بس",fxLook:"حركة التحديد",fx_zoom:"تكبير",fx_lift:"رفع ولمعة",fx_ring:"إطار",fx_pop:"نطّة"},en:{hwTitle:"Widgets",hwAdd:"Add widget",hwEdit:"Edit widgets",hwClock:"Clock",hwWeather:"Weather",hwPrayer:"Prayer times",hwMatches:"Matches",hwBoost:"Boost",hwMon:"Device monitor",hwYt:"YouTube — my channels",hwAzkar:"Dhikr",hwCal:"Calendar",hwNote:"Note",hwLeft:"Move left",hwRight:"Move right",hwSize:"Size",hwStyle:"Style",hwRemove:"Remove widget",hwSettings:"Widget settings",szS:"Small",szM:"Medium",szL:"Large",szF:"Full width",stGlass:"Glass",stSolid:"Solid",stAccent:"Color",stClear:"Clear",stGrad:"Gradient",ytAdd:"Add YouTube channel",ytAddPh:"Channel link or @handle",ytNone:"Add YouTube channels you follow (long-press → widget settings)",ytBad:"Channel not found",ytRem:"Remove",ytLoading:"Fetching latest videos…",mNone:"No matches today",mLoad:"Loading matches…",pLeft:"in",boostOk:"Press OK to boost",ramUsed:"RAM used",noteEdit:"Write your note",noteEmpty:"Long-press → settings to write a note",icLook:"App icon look",icTheme:"By theme",sh_wide:"Wide",sh_square:"Square",sh_circle:"Round",sh_poster:"Poster",sh_icon:"Icon only",fxLook:"Focus effect",fx_zoom:"Zoom",fx_lift:"Lift & shine",fx_ring:"Ring",fx_pop:"Pop"}};Object.keys(HWT).forEach(e=>Object.assign(T[e],HWT[e]));const HW_TYPES=[["clock","🕒","hwClock"],["weather","⛅","hwWeather"],["prayer","🕌","hwPrayer"],["matches","⚽","hwMatches"],["boost","🚀","hwBoost"],["mon","📊","hwMon"],["yt","▶️","hwYt"],["azkar","📿","hwAzkar"],["cal","📅","hwCal"],["note","📝","hwNote"]],HW_STYLES=["glass","solid","accent","grad","clear"],HW_STNAME={glass:"stGlass",solid:"stSolid",accent:"stAccent",grad:"stGrad",clear:"stClear"};let hwList=()=>Array.isArray(S.hw)?S.hw:[];const hwSave=e=>{S.hw=e.map(t=>Object.assign({},t));try{nat("putPref","hw",JSON.stringify(S.hw))}catch(t){}renderHW()},hwGet=e=>hwList().find(t=>t.id===e),hwSet=(e,t)=>hwSave(hwList().map(o=>o.id===e?Object.assign({},o,t):o)),hwHas=e=>hwList().some(t=>t.t===e);(function(){const e=$("favRow");if(!e)return;const t=document.createElement("h2");t.id="hwH",e.parentNode.insertBefore(t,e.nextSibling);const o=document.createElement("div");o.id="hwBoard",o.className="hwboard",t.parentNode.insertBefore(o,t.nextSibling);const s=document.createElement("h2");s.id="ytH",o.parentNode.insertBefore(s,o.nextSibling);const n=document.createElement("div");n.id="ytRow",n.className="row ytrow",s.parentNode.insertBefore(n,s.nextSibling)})();const p2=e=>String(e).padStart(2,"0");function hwBody(e){const t=new Date;switch(e.t){case"clock":return`<div class="hwbig">${esc(fmtTime(t,e.sz>1))}</div><div class="hwsub">${esc(fmtDate(t))}</div>`;case"weather":{if(!weatherNow)return'<div class="hwico">⛅</div><div class="hwsub">…</div>';const o=(typeof forecast<"u"?forecast:[]).slice(1,e.sz>2?5:e.sz>1?4:1);return`<div class="hwrow"><span class="hwico">${esc(weatherNow.i)}</span><span class="hwbig">${esc(weatherNow.t)}°</span></div><div class="hwsub">${esc(weatherNow.city||"")}</div>`+(e.sz>1&&o.length?`<div class="hwfc">${o.map(s=>`<span>${esc(s.d.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"short"}))}<b>${esc(WMO(s.c))}</b>${s.hi}°/${s.lo}°</span>`).join("")}</div>`:"")}case"prayer":{if(!S.prayerOn||typeof prayers>"u"||!prayers.length)return'<div class="hwico">🕌</div><div class="hwsub">…</div>';const o=window.nextPrayer?nextPrayer():null,s=L("prayers");let n="";if(o){const a=o.t-t,c=Math.floor(a/36e5),r=Math.floor(a%36e5/6e4);n=`<div class="hwsub">${esc(s[o.i])} · ${esc(fmtTime(o.t))}</div><div class="hwbig">${c?c+":"+p2(r):r+(S.lang==="ar"?" د":" min")}</div><div class="hwsub">${esc(L("pLeft"))}</div>`}return e.sz>1&&(n+=`<div class="hwpt">${prayers.map((a,c)=>c===1?"":`<span class="${o&&o.i===c?"on":""}">${esc(s[c])}<b>${esc(fmtTime(a))}</b></span>`).join("")}</div>`),n}case"matches":{S.sportsOn||(S.sportsOn=!0);const o=typeof matches<"u"?matches:[];if(!o.length)return`<div class="hwico">⚽</div><div class="hwsub">${esc(L(sportsTried?"mNone":"mLoad"))}</div>`;const s=o.filter(i=>evState(i)==="live"),n=o.filter(i=>evState(i)==="ns"),a=o.filter(i=>evState(i)==="ft"),c=i=>+evTime(i)||0;return n.sort((i,d)=>c(i)-c(d)),a.sort((i,d)=>c(d)-c(i)),`<div class="hwml">${s.concat(n,a).slice(0,e.sz>2?6:e.sz>1?4:2).map(i=>{const d=evState(i);return`<div class="hwm"><span class="tn">${esc(i.strHomeTeam)}</span><b class="${d==="live"?"live":""}">${d==="ns"?esc(fmtTime(evTime(i))):(i.intHomeScore||0)+" - "+(i.intAwayScore||0)}</b><span class="tn">${esc(i.strAwayTeam)}</span></div>`}).join("")}</div>`}case"boost":{let o={};try{o=JSON.parse(nat("memInfo")||"{}")}catch(n){}const s=o.total?Math.round(100*(1-o.avail/o.total)):0;return`<div class="hwico">🚀</div><div class="hwbar"><i style="width:${s}%"></i></div><div class="hwsub">${esc(L("ramUsed"))} ${s}%</div>${e.sz>1?`<div class="hwsub dim">${esc(L("boostOk"))}</div>`:""}`}case"mon":return typeof monRead=="function"&&monRead(),`<div class="hwmon">${typeof monTxt<"u"&&monTxt?monTxt:"…"}</div>`;case"azkar":{const o=typeof AZKAR_F<"u"?AZKAR_F:["سبحان الله"];return`<div class="hwzk">${esc(o[Math.floor(Date.now()/3e4)%o.length])}</div>`}case"cal":{const o=t.getFullYear(),s=t.getMonth(),n=new Date(o,s,1).getDay(),a=new Date(o,s+1,0).getDate();if(e.sz<2)return`<div class="hwbig">${t.getDate()}</div><div class="hwsub">${esc(t.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"long",month:"long"}))}</div>`;let c="";for(let r=0;r<n;r++)c+="<i></i>";for(let r=1;r<=a;r++)c+=`<i class="${r===t.getDate()?"on":""}">${r}</i>`;return`<div class="hwsub">${esc(t.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{month:"long",year:"numeric"}))}</div><div class="hwcal">${c}</div>`}case"note":return e.text?`<div class="hwnote">${esc(e.text)}</div>`:`<div class="hwico">📝</div><div class="hwsub dim">${esc(L("noteEmpty"))}</div>`;case"yt":return`<div class="hwico">▶️</div><div class="hwsub">${esc(L("hwYt"))}</div><div class="hwsub dim">${(S.ytCh||[]).length?(S.ytCh||[]).map(o=>esc(o.name)).join(" · "):esc(L("ytNone"))}</div>`}return""}function hwCard(e){const t=HW_TYPES.find(o=>o[0]===e.t)||[e.t,"",""];return`<div class="hw f hw-${esc(e.t)} sz${e.sz||1} st-${esc(e.st||"glass")}" tabindex="0" data-hw="${esc(e.id)}"><div class="hwt">${esc(t[1])} ${esc(L(t[2]))}</div><div class="hwb">${hwBody(e)}</div></div>`}const addCard=()=>"";function renderHW(){const e=$("hwBoard");if(!e)return;const t=focused&&focused.dataset&&focused.dataset.hw,o=$("hwH");if(o&&(o.textContent=L("hwTitle")),e.innerHTML=hwList().filter(s=>s.t!=="yt"||s.sz).map(hwCard).join("")+addCard(),t){const s=e.querySelector(`[data-hw="${t}"]`);s&&focus(s)}renderYt(),hwNeed()}let hwTickN=0;tickers.push(()=>{!document.querySelector("#home.on")||on("frame")||on("dlg")||on("player")||(hwTickN++,!(hwTickN%2)&&hwList().forEach(e=>{if(e.t==="yt"||e.t==="note")return;if(e.t==="hero"){const o=document.querySelector("#hwBoard .hw-hero .hbig");if(o){const s=fmtTime(new Date);o.textContent!==s&&(o.textContent=s)}if(hwTickN%6)return}if(e.t==="weather"&&hwTickN%6||e.t==="matches"&&hwTickN%12)return;const t=document.querySelector(`#hwBoard [data-hw="${e.id}"] .hwb`);if(t){const o=hwBody(e);t.innerHTML!==o&&(t.innerHTML=o)}}))});let sportsTried=!1;const hwTry={};function hwNeed(){hwHas("matches")&&!sportsTried&&(sportsTried=!0,S.sportsOn=!0,loadSports().then(()=>renderHW()));const e=Date.now();hwHas("weather")&&!weatherNow&&typeof weather=="function"&&e-(hwTry.w||0)>6e5&&(hwTry.w=e,setTimeout(weather,500)),hwHas("weather")&&typeof loadForecast=="function"&&typeof forecast<"u"&&!forecast.length&&e-(hwTry.f||0)>6e5&&(hwTry.f=e,setTimeout(()=>loadForecast().then(()=>{forecast.length&&renderHW()},()=>{}),1500)),hwHas("prayer")&&!S.prayerOn&&(S.prayerOn=!0,typeof computePrayers=="function"&&computePrayers()),hwHas("yt")&&ytLoad(!1)}let ytVids=[],ytAt=0,ytBusy=!1;function ytResolve(e){return h(this,null,function*(){e=e.trim();let t=e.match(/(UC[\w-]{22})/);if(t)return{id:t[1]};let o=e;/^@/.test(o)?o="https://www.youtube.com/"+o:/^https?:/.test(o)||(o="https://www.youtube.com/@"+o.replace(/\s+/g,""));const s=yield A.fetchText(o);t=s.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/)||s.match(/channel\/(UC[\w-]{22})/);const n=s.match(/<meta property="og:title" content="([^"]+)"/);return t?{id:t[1],name:n?n[1]:""}:null})}function ytLoad(e){return h(this,null,function*(){const t=S.ytCh||[];if(!t.length){ytVids=[],renderYt();return}if(ytBusy||!e&&Date.now()-ytAt<30*6e4&&ytVids.length)return;ytBusy=!0;const o=[];yield Promise.all(t.map(s=>h(this,null,function*(){try{const n=yield A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+s.id),a=new DOMParser().parseFromString(n,"text/xml"),c=a.getElementsByTagName("entry");for(let r=0;r<Math.min(6,c.length);r++){const i=c[r],d=l=>{const f=i.getElementsByTagName(l)[0];return f?f.textContent:""};o.push({v:d("yt:videoId"),title:d("title"),ch:s.name||d("name"),at:Date.parse(d("published"))||0})}}catch(n){}}))),ytVids=o.filter(s=>s.v).sort((s,n)=>n.at-s.at).slice(0,24),ytAt=Date.now(),ytBusy=!1,renderYt()})}const ago=e=>{const t=Math.max(1,Math.round((Date.now()-e)/6e4));if(t<60)return t+(S.lang==="ar"?" د":"m");const o=Math.round(t/60);return o<48?o+(S.lang==="ar"?" س":"h"):Math.round(o/24)+(S.lang==="ar"?" يوم":"d")};function renderYt(){const e=$("ytRow"),t=$("ytH");if(!e)return;const o=hwList().find(s=>s.t==="yt");if(!o){e.style.display="none",t.style.display="none",e.innerHTML="";return}if(e.style.display="",t.style.display="",t.textContent="▶️ "+L("hwYt"),!(S.ytCh||[]).length){e.innerHTML=`<div class="yv f ytempty" tabindex="0" data-hw="${esc(o.id)}"><div class="ytt">${esc(L("ytNone"))}</div></div>`;return}if(!ytVids.length){e.innerHTML=`<div class="yv f ytempty" tabindex="0" data-hw="${esc(o.id)}"><div class="ytt">${esc(L("ytLoading"))}</div></div>`;return}e.innerHTML=ytVids.map(s=>`<div class="yv f" tabindex="0" data-yv="${esc(s.v)}" data-hw="${esc(o.id)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(s.v)}/mqdefault.jpg" alt=""><div class="ytt">${esc(s.title)}</div><div class="ytc">${esc(s.ch)} · ${esc(ago(s.at))}</div></div>`).join("")}window.openYt=e=>openYt(e);function openYt(e){const o=["com.google.android.youtube.tv","com.google.android.youtube.tvkids","com.liskovsoft.smarttubetv","com.teamsmart.videomanager.tv","com.google.android.youtube"].find(s=>A.isInstalled(s));NA&&NA.openUri?nat("openUri","https://www.youtube.com/watch?v="+e):o&&launch(o)}activators.push(e=>{if(e.id==="hwAddBtn")return hwAddMenu(),!0;if(e.dataset.yv)return openYt(e.dataset.yv),!0;if(e.dataset.hw){const t=hwGet(e.dataset.hw);return t&&(t.t==="boost"?(boostNow(),setTimeout(renderHW,2500)):t.t==="matches"?S.simple?hwMatchesDialog():(showPage("sports"),focus(document.querySelector('.tab[data-page="sports"]'))):t.t==="yt"||t.t==="note"?hwSettings(t):hwMenu(t.id)),!0}return!1}),optionHandlers.unshift(e=>e.dataset&&e.dataset.hw?(hwMenu(e.dataset.hw),!0):e.id==="hwAddBtn"?(hwAddMenu(),!0):!1);function hwMatchesDialog(){const e=typeof matches<"u"?matches:[];dialog("⚽ "+L("hwMatches"),e.length?e.map(t=>({label:`${t.strHomeTeam} ${evState(t)==="ns"?fmtTime(evTime(t)):(t.intHomeScore||0)+"-"+(t.intAwayScore||0)} ${t.strAwayTeam}`,fn:()=>{}})):[{label:L("mNone"),fn:()=>{}}])}function hwAddMenu(){dialog("🧩 "+L("hwAdd"),HW_TYPES.map(e=>({icon:e[1],label:L(e[2])+(hwHas(e[0])&&e[0]!=="note"?" ✓":""),fn:()=>{if(hwHas(e[0])&&e[0]!=="note")return;const t=e[0]+(e[0]==="note"?Date.now()%1e5:""),o={id:t,t:e[0],sz:e[0]==="hero"?4:e[0]==="clock"||e[0]==="prayer"||e[0]==="matches"?2:1,st:e[0]==="hero"?"clear":"glass"};hwSave(e[0]==="hero"?[o].concat(hwList()):hwList().concat([o])),setTimeout(()=>{const s=document.querySelector(`#hwBoard [data-hw="${t}"]`)||document.querySelector("#ytRow .f");s&&focus(s)},60)}})),{grid:3,sub:L("hwEdit")})}function hwMenu(e){const t=hwGet(e);if(!t)return;const o=HW_TYPES.find(i=>i[0]===t.t)||[t.t,"",""],s=hwList(),n=s.findIndex(i=>i.id===e),a=i=>{const d=n+i;if(d<0||d>=s.length)return;const l=s.slice(),f=l[n];l[n]=l[d],l[d]=f,hwSave(l),setTimeout(()=>{const u=document.querySelector(`#hwBoard [data-hw="${e}"]`);u&&focus(u),hwMenu(e)},40)},c=document.documentElement.dir==="rtl",r=[{icon:"🗑",label:L("hwRemove"),pri:1,fn:()=>{hwSave(hwList().filter(i=>i.id!==e)),A.toast("🗑 "+L("hwRemove"))}}];t.t!=="yt"&&r.push({icon:c?"➡️":"⬅️",label:L("hwLeft"),keep:1,fn:()=>a(-1)},{icon:c?"⬅️":"➡️",label:L("hwRight"),keep:1,fn:()=>a(1)},{icon:"📏",label:L("hwSize")+": "+L(["szS","szM","szL","szF"][(t.sz||1)-1]),keep:1,fn:()=>{hwSet(e,{sz:(t.sz||1)%4+1}),setTimeout(()=>hwMenu(e),40)}},{icon:"🎨",label:L("hwStyle")+": "+L(HW_STNAME[t.st||"glass"]),keep:1,fn:()=>{const i=HW_STYLES[(HW_STYLES.indexOf(t.st||"glass")+1)%HW_STYLES.length];hwSet(e,{st:i}),setTimeout(()=>hwMenu(e),40)}}),(t.t==="yt"||t.t==="note"||t.t==="matches")&&r.push({icon:"⚙️",label:L("hwSettings"),fn:()=>setTimeout(()=>hwSettings(t),30)}),r.push({icon:"＋",label:L("hwAdd"),fn:()=>setTimeout(hwAddMenu,30)},{label:L("done"),fn:()=>{}}),dialog(o[1]+" "+L(o[2]),r,{grid:3})}function hwSettings(e){if(e.t==="note")return prompt2(L("noteEdit"),e.text||"",t=>hwSet(e.id,{text:t}));if(e.t==="matches")return typeof sportsMenu=="function"?sportsMenu():(showPage("settings"),renderSettings());if(e.t==="yt"){const t=S.ytCh||[];dialog("▶️ "+L("hwYt"),[{icon:"＋",label:L("ytAdd"),pri:1,fn:()=>setTimeout(ytAddDlg,30)}].concat(t.map(o=>({icon:"🗑",label:L("ytRem")+": "+o.name,fn:()=>{S.ytCh=t.filter(s=>s.id!==o.id),ytAt=0,ytLoad(!0),setTimeout(()=>hwSettings(e),30)}}))).concat([{label:L("done"),fn:()=>{}}]))}}function ytAddDlg(){prompt2(L("ytAdd"),"",e=>h(this,null,function*(){if(e)try{const t=yield ytResolve(e);if(!t){A.toast(L("ytBad"));return}if(!t.name)try{const n=(yield A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+t.id)).match(/<title>([^<]+)<\/title>/);t.name=n?n[1]:t.id}catch(s){t.name=t.id}const o=(S.ytCh||[]).filter(s=>s.id!==t.id);o.push({id:t.id,name:t.name}),S.ytCh=o,ytAt=0,yield ytLoad(!0),A.toast("▶️ "+t.name)}catch(t){A.toast(L("ytBad"))}}),L("ytAddPh"))}setInterval(()=>{hwHas("yt")&&document.querySelector("#home.on")&&ytLoad(!1)},10*6e4);const _renderHomeHW=renderHome;renderHome=function(){_renderHomeHW.apply(this,arguments),renderHW()},window.renderHome=renderHome;const THEME_ICON={apple:["wide","lift"],google:["wide","ring"],shield:["wide","pop"],bravia:["square","ring"],tizen:["square","lift"],smarthub:["circle","pop"],webos:["circle","lift"],webos22:["square","pop"],firetv:["wide","ring"],roku:["square","ring"],patchwall:["poster","lift"],xbox:["square","pop"],ps5:["icon","pop"],wmc:["wide","ring"],plex:["poster","lift"],kodi:["icon","ring"],classic:["wide","lift"],light:["square","lift"],neon:["circle","pop"],startpage:["icon","lift"],dock:["icon","pop"],amoled:["circle","ring"],ramadan:["circle","lift"],vidaa:["square","pop"]};DEF.iconShape="",DEF.iconFx="";function applyIconLook(){const e=THEME_ICON[S.theme]||["wide","zoom"],t=S.iconShape||"wide",o=S.iconFx||e[1];document.body.dataset.fx=o;const s=$("favRow");s&&(((typeof lay=="function"&&lay().fav||{}).st||{}).shape||s.setAttribute("data-wshape",t==="wide"?"":t),s.getAttribute("data-wshape")===""&&s.removeAttribute("data-wshape")),document.querySelectorAll("#favRow .app").forEach(n=>{n.__w=null,n.style.height=""}),window.__fixAspect&&__fixAspect()}const _applyLookHW=applyLook;applyLook=function(){_applyLookHW.apply(this,arguments),applyIconLook()};const _applyWSHW=typeof applyWStyles=="function"?applyWStyles:null;_applyWSHW&&(applyWStyles=function(){_applyWSHW.apply(this,arguments),applyIconLook()}),AFTER.iconShape=applyIconLook,AFTER.iconFx=applyIconLook;const _lifeSetHW=window.lifeSettings;window.lifeSettings=function(){return sec("🧩 "+L("icLook"),field(L("icLook"),seg("iconShape",[["",L("icTheme")],["wide",L("sh_wide")],["square",L("sh_square")],["circle",L("sh_circle")],["poster",L("sh_poster")],["icon",L("sh_icon")]]))+field(L("fxLook"),seg("iconFx",[["",L("icTheme")],["zoom",L("fx_zoom")],["lift",L("fx_lift")],["ring",L("fx_ring")],["pop",L("fx_pop")]])))+(_lifeSetHW?_lifeSetHW():"")},setTimeout(()=>{applyIconLook(),renderHW()},0),Object.assign(T.ar,{hwPresets:"قوالب جاهزة",hwEditMode:"✏️ ترتيب",pIslam:"🕌 إسلامي",pSport:"⚽ رياضة",pFull:"✨ كامل",pMin:"🪶 بسيط",pFamily:"👨‍👩‍👧 العيلة",edHint:"اختار ويدجت ودوس OK عشان تمسكها",edHold:"⬅️➡️ حرّك · ⬆️ كبّر · ⬇️ صغّر · 5 غيّر الشكل · 0 امسح · OK سيب",edDone:"Back للخروج من الترتيب"}),Object.assign(T.en,{hwPresets:"Ready layouts",hwEditMode:"✏️ Arrange",pIslam:"🕌 Islamic",pSport:"⚽ Sports",pFull:"✨ Full",pMin:"🪶 Minimal",pFamily:"👨‍👩‍👧 Family",edHint:"Pick a widget and press OK to grab it",edHold:"⬅️➡️ move · ⬆️ bigger · ⬇️ smaller · 5 style · 0 delete · OK drop",edDone:"Back to finish"});const W_=(e,t,o)=>({id:e,t:e,sz:t,st:o||"glass"}),HW_PRESETS={pIslam:[W_("prayer",3,"grad"),W_("wird",2),W_("clock",1),W_("azkar",2),W_("cal",1)],pSport:[W_("matches",3,"accent"),W_("clock",1),W_("weather",2)],pFull:[W_("clock",2),W_("prayer",2),W_("weather",1),W_("matches",2),W_("boost",1,"accent"),W_("wird",2),W_("yt",1)],pMin:[W_("clock",2),W_("weather",1)],pFamily:[W_("clock",2),W_("weather",2),W_("prayer",2),W_("cal",1),W_("note",2)]};function hwPresetMenu(){dialog("🎛 "+L("hwPresets"),Object.keys(HW_PRESETS).map(e=>({label:L(e)+" — "+HW_PRESETS[e].map(t=>(HW_TYPES.find(o=>o[0]===t.t)||[0,""])[1]).join(" "),fn:()=>{hwSave(HW_PRESETS[e]),setTimeout(()=>{const t=document.querySelector("#hwBoard .hw");t&&focus(t)},60)}})))}function hwToolbar(){const e=$("hwH");e&&(e.innerHTML=`${esc(L("hwTitle"))} <span class="hwtools"><button class="btn sm f" id="hwEditBtn">${esc(L("hwEditMode"))}</button><button class="btn sm f" id="hwPresetBtn">🎛 ${esc(L("hwPresets"))}</button><button class="btn sm f" id="hwAddBtn2">＋ ${esc(L("hwAdd"))}</button></span>`)}const _renderHWE=renderHW;renderHW=function(){if(_renderHWE.apply(this,arguments),hwToolbar(),document.body.classList.toggle("hwedit",hwEdit.on),hwEdit.grab){const e=document.querySelector(`#hwBoard [data-hw="${hwEdit.grab}"]`);e&&(e.classList.add("grabbed"),focus(e))}};const hwEdit={on:!1,grab:null};function hwEditStart(){hwEdit.on=!0,hwEdit.grab=null,renderHW();const e=document.querySelector("#hwBoard .hw");e&&focus(e),banner("✏️",L("edHint"),L("edDone"),6e5)}function hwEditEnd(){hwEdit.on=!1,hwEdit.grab=null,$("banners").innerHTML="",renderHW();const e=$("hwEditBtn");e&&focus(e)}activators.unshift(e=>e.id==="hwEditBtn"?(hwEditStart(),!0):e.id==="hwPresetBtn"?(hwPresetMenu(),!0):e.id==="hwAddBtn2"?(hwAddMenu(),!0):!1),layers.unshift({test:()=>hwEdit.on&&!on("dlg"),ownsEnter:!0,key:e=>{const t=e.key,o=hwList();if(e.preventDefault&&e.preventDefault(),isBack(t))return hwEdit.grab?(hwEdit.grab=null,renderHW(),banner("✏️",L("edHint"),L("edDone"),6e5)):hwEditEnd(),!0;const s=focused&&focused.dataset&&focused.dataset.hw;if(t==="Enter"||e.keyCode===13||e.keyCode===23)return held=!0,s&&(hwEdit.grab?(hwEdit.grab=null,banner("✏️",L("edHint"),L("edDone"),6e5)):(hwEdit.grab=s,banner("✋",L("edHold"),"",6e5)),renderHW()),!0;if(!hwEdit.grab)return!1;const n=o.findIndex(r=>r.id===hwEdit.grab),a=o[n];if(n<0)return!0;const c=document.documentElement.dir==="rtl";if(t==="ArrowLeft"||t==="ArrowRight"){const r=t==="ArrowRight"!==c?1:-1,i=n+r;if(i>=0&&i<o.length){const d=o.slice();d[n]=d[i],d[i]=a,hwSave(d)}}else t==="ArrowUp"?hwSet(a.id,{sz:Math.min(4,(a.sz||1)+1)}):t==="ArrowDown"?hwSet(a.id,{sz:Math.max(1,(a.sz||1)-1)}):t==="5"?hwSet(a.id,{st:HW_STYLES[(HW_STYLES.indexOf(a.st||"glass")+1)%HW_STYLES.length]}):t==="0"&&(hwEdit.grab=null,hwSave(o.filter(r=>r.id!==a.id)));return!0}}),Object.assign(DEF,{homeOrder:"fav",favSize:"s"}),Object.assign(T.ar,{homeLook:"🏠 شكل الرئيسية",hoOrder:"الترتيب",hoFavTop:"المفضلة فوق",hoWTop:"الويدجت فوق",szXXS:"أصغر حاجة",hoSize:"حجم أيقونات المفضلة",szXS:"صغير جداً",hoBar:"شريط الصلاة والماتش فوق",hoShow:"إظهار",hoHide:"إخفاء"}),Object.assign(T.en,{homeLook:"🏠 Home look",hoOrder:"Order",hoFavTop:"Favorites first",hoWTop:"Widgets first",szXXS:"Tiny",hoSize:"Favorite icon size",szXS:"Extra small",hoBar:"Prayer/match bar on top",hoShow:"Show",hoHide:"Hide"});function applyHomeLook(){document.body.dataset.favsz!==(S.favSize||"s")&&(document.body.dataset.favsz=S.favSize||"s",document.querySelectorAll("#favRow .app,#homeApps .app").forEach(a=>{a.__w=null,a.style.height=""}),window.__fixAspect&&__fixAspect());const e=$("favRow"),t=e&&e.previousElementSibling,o=$("hwH"),s=$("hwBoard");if(!e||!o||!s)return;const n=[$("ytH"),$("ytRow"),$("libFavH"),$("libFavRow")].filter(Boolean);if(S.homeOrder==="w")t.parentNode.insertBefore(o,t),t.parentNode.insertBefore(s,t),n.forEach(a=>t.parentNode.insertBefore(a,t));else{let a=e;[o,s].concat(n).forEach(c=>{a.parentNode.insertBefore(c,a.nextSibling),a=c})}}function homeLookMenu(){const e=(o,s)=>{S[o]=s[(s.indexOf(S[o])+1)%s.length],o==="tickerOn"&&updateTicker(),applyHomeLook(),renderHome(),setTimeout(()=>{homeLookMenu();const n=$("dbox").querySelector('[data-di="'+t[o]+'"]');n&&focus(n)},30)},t={homeOrder:0,favSize:1,tickerOn:2};dialog(L("homeLook"),[{icon:"↕️",label:L("hoOrder")+": "+L(S.homeOrder==="w"?"hoWTop":"hoFavTop"),keep:1,fn:()=>e("homeOrder",["fav","w"])},{icon:"📏",label:L("hoSize")+": "+L({xxs:"szXXS",xs:"szXS",s:"szS",m:"szM",l:"szL"}[S.favSize||"s"]),keep:1,fn:()=>e("favSize",["xxs","xs","s","m","l"])},{icon:"📰",label:L("hoBar")+": "+L(S.tickerOn?"hoShow":"hoHide"),keep:1,fn:()=>e("tickerOn",[!0,!1])},{label:L("done"),fn:()=>{}}],{grid:3})}activators.unshift(e=>e.id==="homeLookBtn"?(homeLookMenu(),!0):!1);const _hwToolbarH=hwToolbar;hwToolbar=function(){_hwToolbarH();const e=document.querySelector("#hwH .hwtools");e&&!$("homeLookBtn")&&e.insertAdjacentHTML("afterbegin",`<button class="btn sm f" id="homeLookBtn">${esc(L("homeLook"))}</button>`)};const _renderHWH=renderHW;renderHW=function(){_renderHWH.apply(this,arguments),applyHomeLook()},S.homeLookSeeded||(S.homeLookSeeded=!0,S.simple&&(S.tickerOn=!1)),window.applyHomeLook=applyHomeLook;

;
/* lib.js */
var c=(t,i,e)=>new Promise((s,a)=>{var l=o=>{try{r(e.next(o))}catch(d){a(d)}},n=o=>{try{r(e.throw(o))}catch(d){a(d)}},r=o=>o.done?s(o.value):Promise.resolve(o.value).then(l,n);r((e=e.apply(t,i)).next())});Object.assign(T.ar,{libTab:"📚 المكتبة",libQuran:"القرآن الكريم",libKhutab:"خطب ودروس",libOldAr:"أفلام عربي قديمة",libClassic:"أفلام كلاسيك",libDocs:"وثائقي",libCartoon:"كرتون قديم",libBooks:"كتب مسموعة",libPlays:"مسرحيات",libFast:"قنوات أفلام 24 ساعة",libArabic:"أفلام عربي",libHorror:"رعب",libRomance:"رومانسي",libAction:"أكشن",libComedy:"كوميدي",libForeign:"أفلام أجنبي",libSearch:"بحث في المكتبة",libLoading:"بيحمّل…",libEmpty:"مفيش نتايج",libReciter:"اختار القارئ",libSurah:"اختار السورة",libFiles:"اختار الحلقة/الجزء",libAll:"شغّل الكل"}),Object.assign(T.en,{libTab:"📚 Library",libQuran:"Holy Quran",libKhutab:"Sermons & lessons",libOldAr:"Classic Arabic films",libClassic:"Classic films",libDocs:"Documentaries",libCartoon:"Old cartoons",libBooks:"Audiobooks",libPlays:"Plays",libFast:"24/7 movie channels",libArabic:"Arabic films",libHorror:"Horror",libRomance:"Romance",libAction:"Action",libComedy:"Comedy",libForeign:"Foreign films",libSearch:"Search the library",libLoading:"Loading…",libEmpty:"No results",libReciter:"Pick a reciter",libSurah:"Pick a surah",libFiles:"Pick a part",libAll:"Play all"});const LIB_CATS=[["quran","📖",null],["khutab","🕌",'subject:("خطب الجمعة" OR "خطبة الجمعة" OR "دروس دينية" OR محاضرات OR "تفسير القرآن" OR "السيرة النبوية") AND mediatype:audio'],["oldar","🎞",'mediatype:movies AND title:(فيلم) AND (subject:("ابيض واسود" OR "أبيض وأسود" OR "الزمن الجميل" OR "افلام قديمة" OR "أفلام قديمة" OR "افلام مصرية" OR "سينما مصرية" OR "egyptian cinema" OR "egyptian movie" OR "classic arabic" OR "افلام زمان" OR "فيلم مصري" OR "افلام مصرية قديمة" OR "افلام عربي قديمة" OR "السينما المصرية" OR "افلام عربية قديمة" OR "egyptian films" OR "arabic cinema") OR title:(19*))'],["plays","🎭","mediatype:movies AND title:(مسرحية OR مسرحيه) AND NOT title:(تريلر OR اعلان OR مقطع OR مشهد)"],["arabic","🇪🇬","mediatype:movies AND title:(فيلم OR افلام) AND NOT title:(تريلر OR اعلان OR مقطع)"],["horror","👻","mediatype:movies AND (subject:(horror OR رعب) OR title:(رعب)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],["romance","💕","mediatype:movies AND (subject:(romance OR رومانسي OR رومانسية) OR title:(رومانسي)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],["action","💥","mediatype:movies AND (subject:(action OR اكشن OR أكشن OR western) OR title:(اكشن)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],["comedy","😂","mediatype:movies AND (subject:(comedy OR كوميدي OR كوميديا) OR title:(كوميدي)) AND (collection:feature_films OR collection:moviesandfilms OR title:(فيلم))"],["foreign","🌐","mediatype:movies AND collection:(feature_films OR moviesandfilms OR film_noir OR scifi_horror)"],["fast","📡",null],["classic","🎬","collection:feature_films AND mediatype:movies"],["docs","🌍","collection:(documentaries OR ephemera) AND mediatype:movies"],["cartoon","🐭","collection:classic_cartoons AND mediatype:movies"],["books","🎧","collection:librivoxaudio AND mediatype:audio"]],LIBN={fast:"libFast",arabic:"libArabic",horror:"libHorror",romance:"libRomance",action:"libAction",comedy:"libComedy",foreign:"libForeign",plays:"libPlays",quran:"libQuran",khutab:"libKhutab",oldar:"libOldAr",classic:"libClassic",docs:"libDocs",cartoon:"libCartoon",books:"libBooks"};let libCat="quran",libCache={},libQ="";(function(){const t=document.querySelector('.tab[data-page="settings"]');if(!t)return;const i=document.createElement("button");i.className="tab f",i.dataset.page="lib",i.setAttribute("data-i18n","libTab"),i.textContent=L("libTab"),t.parentNode.insertBefore(i,t);const e=document.createElement("section");e.className="page",e.id="lib",e.innerHTML='<div class="vodw"><div class="list" id="libCats"></div><div class="scroll" id="libMain"></div></div>',$("settings").parentNode.insertBefore(e,$("settings"))})();function libCatsHtml(){return LIB_CATS.filter(t=>t[0]!=="search").map(t=>`<div class="it f${t[0]===libCat?" on":""}" tabindex="0" data-libcat="${t[0]}">${t[1]} ${esc(L(LIBN[t[0]]))}</div>`).join("")+`<div class="it f" tabindex="0" id="libSearchBtn">🔍 ${esc(L("libSearch"))}</div>`}const libCard=t=>`<div class="lbc f" tabindex="0" ${t.attr}><div class="lbi"${t.img?` style="background-image:url('${esc(t.img)}')"`:""}>${t.img?"":`<b>${esc(t.icon||"🎬")}</b>`}</div><div class="lbt">${esc(t.title)}</div>${t.sub?`<div class="lbs">${esc(t.sub)}</div>`:""}</div>`;function libMsg(t){$("libMain").innerHTML=`<p class="hint">${esc(t)}</p>`}function renderLib(){return c(this,null,function*(){if($("libCats").innerHTML=libCatsHtml(),libCat==="quran")return quranReciters();const t=libCat+"|"+libQ;let i=libCache[t];if(!i){libMsg(L("libLoading"));const e=LIB_CATS.find(a=>a[0]===libCat),s=libQ?`(${libQ}) AND mediatype:(movies OR audio)`:e[2];try{i=(((yield A.fetchJSON("https://archive.org/advancedsearch.php?q="+encodeURIComponent(s)+"&fl[]=identifier&fl[]=title&fl[]=mediatype&fl[]=year&sort[]=downloads+desc&rows=200&output=json")).response||{}).docs||[]).filter(l=>!libBlocked(Array.isArray(l.title)?l.title[0]:l.title||"")).map(l=>({id:l.identifier,title:Array.isArray(l.title)?l.title[0]:l.title||l.identifier,mt:l.mediatype,year:l.year})),i=libClean(i),libCache[t]=i}catch(a){return libMsg("⚠️ "+(S.lang==="ar"?"مش قادر يوصل للمكتبة دلوقتي — جرّب تاني بعد شوية":"Can't reach the library right now — try again shortly"))}}if(!i.length)return libMsg(L("libEmpty"));$("libMain").innerHTML=`<div class="lbgrid">${i.map(e=>libCard({attr:`data-arch="${esc(e.id)}"`,img:"https://archive.org/services/img/"+e.id,title:e.title,sub:e.year?String(e.year):""})).join("")}</div>`})}function openArch(t){return c(this,null,function*(){dialog("⏳ "+L("libLoading"),[{label:L("cancel"),fn:()=>{}}]);let i={};try{i=yield A.fetchJSON("https://archive.org/metadata/"+encodeURIComponent(t))}catch(r){}const e=i.metadata&&i.metadata.title||t,s=(i.files||[]).filter(r=>/\.(mp4|m4v|webm|ogv|mp3|ogg|m4a)$/i.test(r.name)&&!/_sample|thumb/i.test(r.name));let a=s.filter(r=>/\.mp4$/i.test(r.name));if(a.length||(a=s.filter(r=>/\.mp3$/i.test(r.name))),a.length||(a=s),a.sort((r,o)=>r.name.localeCompare(o.name,void 0,{numeric:!0})),closeDialog(),!a.length){A.toast(L("libEmpty"));return}const l=r=>({name:(a.length>1?(r.title||r.name.replace(/\.[^.]+$/,""))+" — ":"")+e,url:"https://archive.org/download/"+encodeURIComponent(t)+"/"+r.name.split("/").map(encodeURIComponent).join("/"),logo:"https://archive.org/services/img/"+t,kind:"movie"});if(a.length===1)return libPlay([l(a[0])],0);const n=a.map(l);dialog("🎞 "+e,[{icon:"▶️",label:L("libAll"),pri:1,fn:()=>libPlay(n,0)}].concat(n.slice(0,80).map((r,o)=>({label:a[o].title||a[o].name,fn:()=>libPlay(n,o)}))),{sub:L("libFiles")})})}function libPlay(t,i){typeof playList<"u"&&(playList=t),play(t[i])}let qReciters=null,qSuwar=null;function quranReciters(){return c(this,null,function*(){if(!qReciters){libMsg(L("libLoading"));try{const e=S.lang==="ar"?"ar":"eng",[s,a]=yield Promise.all([A.fetchJSON("https://mp3quran.net/api/v3/reciters?language="+e),A.fetchJSON("https://mp3quran.net/api/v3/suwar?language="+e)]);qReciters=(s.reciters||[]).filter(l=>l.moshaf&&l.moshaf.length),qSuwar=a.suwar||[]}catch(e){return qReciters=null,libMsg(L("loadErr"))}}const t=["ماهر المعيقلي","عبدالباسط عبدالصمد","محمد صديق المنشاوي","مشاري العفاسي","سعد الغامدي","محمود خليل الحصري","ياسر الدوسري","عبدالرحمن السديس"],i=qReciters.slice().sort((e,s)=>{const a=t.findIndex(n=>e.name.indexOf(n)>=0),l=t.findIndex(n=>s.name.indexOf(n)>=0);return(a<0?99:a)-(l<0?99:l)});$("libMain").innerHTML=`<h3 class="sph">${esc(L("libReciter"))}</h3><div class="lbgrid small">${i.slice(0,200).map(e=>libCard({attr:`data-reciter="${e.id}"`,icon:"🎙",title:e.name,sub:e.moshaf[0].name})).join("")}</div>`})}function quranSurahs(t){const i=(qReciters||[]).find(l=>String(l.id)===String(t));if(!i)return;const e=i.moshaf[0],s=String(e.surah_list||"").split(",").map(Number),a=qSuwar.filter(l=>s.indexOf(+l.id)>=0).map(l=>({name:l.name+" — "+i.name,url:e.server+String(l.id).padStart(3,"0")+".mp3",logo:"",kind:"movie"}));dialog("📖 "+i.name,[{icon:"▶️",label:L("libAll"),pri:1,fn:()=>libPlay(a,0)}].concat(a.map((l,n)=>({label:n+1+". "+l.name.split(" — ")[0],fn:()=>libPlay(a,n)}))),{sub:L("libSurah")})}activators.push(t=>t.dataset.libcat?(libCat=t.dataset.libcat,libQ="",renderLib().then(()=>focus(document.querySelector(`[data-libcat="${libCat}"]`))),!0):t.id==="libSearchBtn"?(prompt2(L("libSearch"),libQ,i=>{libQ=i,libCat="search",renderLib()}),!0):t.dataset.arch?(openArch(t.dataset.arch),!0):t.dataset.reciter?(quranSurahs(t.dataset.reciter),!0):!1),pageHooks["lib:enter"]=()=>{$("libMain").innerHTML||renderLib()},LIB_CATS.push(["search","🔍",""]),LIBN.search="libSearch";const LIB_BLOCK=/صهيون|اسرائيل|إسرائيل|يهود|جيش|إصدار|اصدار|مؤسسة|تحرير|معركة|غزو|مجاهد|جهاد|انغماس|الدولة الإسلامية|الدولة الاسلامية|ولاية|استشهاد|عملية|قصف|سرايا|كتائب|فصائل|كتيبة|طلائع|أحرار|احرار|isis|daesh|jihad|mujahid|militant|\+18|sex|xxx/i;function libBlocked(t){return LIB_BLOCK.test(String(t||""))}const PLAY_STARS=["سمير غانم","عادل إمام","إسماعيل ياسين","فؤاد المهندس","محمد صبحي","ريا وسكينة","شادية","سعيد صالح","يونس شلبي","محمد نجم","نجيب الريحاني"],_renderLibP=renderLib;renderLib=function(){return c(this,arguments,function*(){if(libCat!=="plays")return _renderLibP.apply(this,arguments);$("libCats").innerHTML=libCatsHtml();const t="plays|"+libQ;let i=libCache[t];if(!i){libMsg(L("libLoading"));const s=LIB_CATS.find(a=>a[0]==="plays")[2]+(libQ?` AND (title:("${libQ}") OR subject:("${libQ}") OR description:("${libQ}"))`:"");try{const a=yield A.fetchJSON("https://archive.org/advancedsearch.php?q="+encodeURIComponent(s)+"&fl[]=identifier&fl[]=title&fl[]=year&sort[]=downloads+desc&rows=150&output=json"),l={};i=((a.response||{}).docs||[]).map(n=>({id:n.identifier,title:Array.isArray(n.title)?n.title[0]:n.title||n.identifier,year:n.year})).filter(n=>!libBlocked(n.title)),i=libClean(i),libCache[t]=i}catch(a){return libMsg("⚠️ "+(S.lang==="ar"?"مش قادر يوصل للمكتبة دلوقتي — جرّب تاني بعد شوية":"Can't reach the library right now"))}}const e=`<div class="inline lbchips"><button class="btn f${libQ?"":" on"}" data-playstar="">${S.lang==="ar"?"الكل":"All"}</button>${PLAY_STARS.map(s=>`<button class="btn f${libQ===s?" on":""}" data-playstar="${esc(s)}">${esc(s)}</button>`).join("")}</div>`;$("libMain").innerHTML=e+(i.length?`<div class="lbgrid">${i.map(s=>libCard({attr:`data-arch="${esc(s.id)}"`,img:"https://archive.org/services/img/"+s.id,title:s.title,sub:s.year?String(s.year):""})).join("")}</div>`:`<p class="hint">${esc(L("libEmpty"))}</p>`)})},activators.unshift(t=>t.dataset&&t.dataset.playstar!=null?(libQ=t.dataset.playstar,libCat="plays",renderLib().then(()=>focus(document.querySelector(`[data-playstar="${libQ}"]`))),!0):!1);const FREE_APPS=[["Tubi","com.tubitv","🎬"],["Pluto TV","tv.pluto.android","📺"],["شاهد Shahid","net.mbc.shahidTV","🇸🇦"],["Watch It","com.watchit.tv","🇪🇬"],["YouTube","com.google.android.youtube.tv","▶️"],["Plex","com.plexapp.android","🍿"]],_renderLibF=renderLib;renderLib=function(){return c(this,arguments,function*(){yield _renderLibF.apply(this,arguments)})},activators.unshift(t=>{if(t.dataset&&t.dataset.freeapp){const i=t.dataset.freeapp;return A.isInstalled(i)?launch(i):nat("openUri","market://details?id="+i),!0}return!1});const FAST_SRC=[["Pluto TV","plutotv_all"],["Plex","plex_all"],["Samsung TV Plus","samsungtvplus_all"],["Roku","roku_all"],["Tubi","tubi_all"]],FAST_RX=/movie|film|cinema|action|horror|thriller|comed|drama|romance|western|sci-?fi|classic|crime|family|kids|anim|cartoon|arab|عرب|أفلام|افلام/i;let fastSrc=0;const _renderLibFa=renderLib;renderLib=function(){return c(this,arguments,function*(){if(libCat!=="fast")return _renderLibFa.apply(this,arguments);$("libCats").innerHTML=libCatsHtml();const t=FAST_SRC[fastSrc],i="fast|"+t[1];let e=libCache[i];const s=`<div class="inline lbchips">${FAST_SRC.map((a,l)=>`<button class="btn f${l===fastSrc?" on":""}" data-fastsrc="${l}">${esc(a[0])}</button>`).join("")}</div>`;if(!e){$("libMain").innerHTML=s+`<p class="hint">${esc(L("libLoading"))}</p>`;try{const a=yield A.fetchText("https://raw.githubusercontent.com/BuddyChewChew/app-m3u-generator/main/playlists/"+t[1]+".m3u");e=parseM3U(a,t[0]).filter(l=>FAST_RX.test((l.group||"")+" "+l.name)&&!libBlocked(l.name)).slice(0,400),libCache[i]=e}catch(a){e=[]}}$("libMain").innerHTML=s+(e.length?`<div class="lbgrid small">${e.map((a,l)=>libCard({attr:`data-fastch="${l}"`,img:a.logo||"",icon:"📡",title:a.name,sub:a.group||""})).join("")}</div>`:`<p class="hint">${esc(L("libEmpty"))}</p>`)})},activators.unshift(t=>{if(!t.dataset)return!1;if(t.dataset.fastsrc!=null)return fastSrc=+t.dataset.fastsrc,libCat="fast",renderLib().then(()=>focus(document.querySelector(`[data-fastsrc="${fastSrc}"]`))),!0;if(t.dataset.fastch!=null){const i=libCache["fast|"+FAST_SRC[fastSrc][1]]||[],e=i[+t.dataset.fastch];return e&&(typeof playList<"u"&&(playList=i),play(e)),!0}return!1});function libClean(t){const i={};return t.filter(e=>/[\u0600-\u06ff]/.test(e.title)&&!libBlocked(e.title)).filter(e=>{const s=e.title.replace(/[^\u0600-\u06ff]/g,"").replace(/^(فيلم|مسرحية|مسرحيه|مشاهدة|تحميل)/,"").slice(0,18);return!s||i[s]?!1:(i[s]=1,!0)})}(function(){const t={quran:1,radio:1,khutab:1,oldar:1,plays:1,search:1};setTimeout(()=>{for(let i=LIB_CATS.length-1;i>=0;i--)t[LIB_CATS[i][0]]||LIB_CATS.splice(i,1);t[libCat]||(libCat="quran")},0)})();

;
/* sugg.js */
var o=(t,a,e)=>new Promise((i,s)=>{var u=n=>{try{r(e.next(n))}catch(d){s(d)}},c=n=>{try{r(e.throw(n))}catch(d){s(d)}},r=n=>n.done?i(n.value):Promise.resolve(n.value).then(u,c);r((e=e.apply(t,a)).next())});Object.assign(DEF,{qLast:"",autoSleepMin:60,adhanOn:!0}),Object.assign(T.ar,{libCont:"⏯ كمّل من حيث وقفت",qLastR:"⭐ آخر قارئ سمعته",hwWird:"ورد اليوم",autoSleep:"قفل تلقائي لو مفيش استخدام",min_:"دقيقة",asOff:"إيقاف",usbBk:"نسخة احتياطية على الفلاشة",usbSave:"احفظ على الفلاشة",usbLoad:"رجّع من الفلاشة",usbNone:"مفيش فلاشة متوصلة",usbSaved:"اتحفظت على الفلاشة",usbLoaded:"اترجعت الإعدادات",usbNoFile:"مفيش نسخة على الفلاشة",sleepIdle:"البوكس هيقفل بعد دقيقة لعدم الاستخدام — دوس أي زرار للإلغاء",adhanVid:"الأذان — الفيديو اتوقف مؤقتاً"}),Object.assign(T.en,{libCont:"⏯ Continue where you stopped",qLastR:"⭐ Last reciter",hwWird:"Daily wird",autoSleep:"Auto sleep when idle",min_:"min",asOff:"Off",usbBk:"Backup to USB stick",usbSave:"Save to USB",usbLoad:"Restore from USB",usbNone:"No USB stick connected",usbSaved:"Saved to USB",usbLoaded:"Settings restored",usbNoFile:"No backup on the USB stick",sleepIdle:"Box sleeps in 1 minute (idle) — press any key to cancel",adhanVid:"Adhan — video paused"});const _renderLibS=renderLib;renderLib=function(){return o(this,arguments,function*(){yield _renderLibS.apply(this,arguments);const t=(S.watch||[]).filter(e=>e.url&&/archive\.org|mp3quran\.net/.test(e.url)).slice(0,12);if(!t.length)return;const a=`<h3 class="sph">${esc(L("libCont"))}</h3><div class="lbgrid">${t.map(e=>libCard({attr:`data-libres="${esc(e.key)}"`,img:e.logo||"",icon:"⏯",title:e.name,sub:e.dur?fmtDur(e.pos)+" / "+fmtDur(e.dur):""})).join("")}</div>`;$("libMain").insertAdjacentHTML("afterbegin",a)})},activators.unshift(t=>{if(t.dataset&&t.dataset.libres){const a=S.watch.find(e=>e.key===t.dataset.libres);return a&&play({name:a.name,url:a.url,logo:a.logo,kind:a.kind||"movie"}),!0}return t.dataset&&t.dataset.reciter&&(S.qLast=t.dataset.reciter),!1});const _quranRecS=quranReciters;quranReciters=function(){return o(this,arguments,function*(){yield _quranRecS.apply(this,arguments);const t=(qReciters||[]).find(a=>String(a.id)===String(S.qLast));t&&$("libMain").insertAdjacentHTML("afterbegin",`<h3 class="sph">${esc(L("qLastR"))}</h3><div class="lbgrid small">${libCard({attr:`data-reciter="${t.id}"`,icon:"⭐",title:t.name,sub:t.moshaf[0].name})}</div>`)})};const ADHAN_DEF="https://www.islamcan.com/audio/adhan/azan2.mp3";playAdhan=function(){const t=on("player")?document.querySelector("#player video,video"):null,a=t&&!t.paused;a&&(t.pause(),banner("🕌",L("adhanVid"),"",8e3));try{adhanAudio&&adhanAudio.pause(),adhanAudio=new Audio(S.adhanUrl||ADHAN_DEF);const e=()=>{a&&t&&t.play().catch(()=>{})};adhanAudio.onended=e,adhanAudio.onerror=()=>{chime(),setTimeout(e,3e3)},adhanAudio.play().catch(()=>{chime(),setTimeout(e,3e3)})}catch(e){chime()}},window.playAdhan=playAdhan,HW_TYPES.push(["wird","📖","hwWird"]);const HADITH=["«إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى»","«الكلمة الطيبة صدقة»","«خيركم من تعلّم القرآن وعلّمه»","«تبسمك في وجه أخيك صدقة»","«من كان يؤمن بالله واليوم الآخر فليقل خيرًا أو ليصمت»","«أحب الأعمال إلى الله أدومها وإن قلّ»","«لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه»"];let wird=null;function loadWird(){return o(this,null,function*(){const t=Math.floor(Date.now()/864e5);if(S.wird&&S.wird.day===t){wird=S.wird;return}try{const a=t*7919%6236+1,e=yield A.fetchJSON("https://api.alquran.cloud/v1/ayah/"+a+"/ar");wird={day:t,text:e.data.text,ref:"سورة "+e.data.surah.name.replace(/^سُورَةُ\s*/,"")+" · "+e.data.numberInSurah}}catch(a){wird={day:t,text:HADITH[t%HADITH.length],ref:"حديث شريف"}}S.wird=wird,renderHW()})}const _hwBodyS=hwBody;hwBody=function(t){return t.t!=="wird"?_hwBodyS(t):(wird||(!S.wird||S.wird.day!==Math.floor(Date.now()/864e5)?loadWird():wird=S.wird),wird?`<div class="hwzk">${esc(wird.text)}</div><div class="hwsub dim">${esc(wird.ref)}</div>`:'<div class="hwico">📖</div>')};let idleWarned=!1;setInterval(()=>{const t=+S.autoSleepMin||0;if(!t||$("blackout").classList.contains("on")){idleWarned=!1;return}const a=(Date.now()-idleAt)/6e4,e=on("player")?Math.max(t,180):t;a>=e-1&&!idleWarned&&(idleWarned=!0,banner("😴",L("sleepIdle"),"",55e3)),a>=e&&(idleWarned=!1,on("player")&&stopPlayer(),$("blackout").classList.add("on"),typeof updateTicker=="function"&&updateTicker()),a<e-1&&(idleWarned=!1)},3e4);function usbRoot(){try{return JSON.parse(nat("storageRoots")||"[]").find(t=>t.label==="usb")}catch(t){return null}}function usbSave(){const t=usbRoot();if(!t)return A.toast(L("usbNone"));const a={app:"tvlauncher",v:2,data:{}};for(let i=0;i<localStorage.length;i++){const s=localStorage.key(i);a.data[s]=localStorage.getItem(s)}const e=nat("writeText",t.path+"/tvlauncher-backup.json",JSON.stringify(a));A.toast(e?L("usbSaved")+" ✅":"Error")}function usbLoad(){const t=usbRoot();if(!t)return A.toast(L("usbNone"));const a=nat("readText",t.path+"/tvlauncher-backup.json");if(!a)return A.toast(L("usbNoFile"));window.onBackupLoaded&&(onBackupLoaded(a),A.toast(L("usbLoaded")))}activators.push(t=>t.id==="usbSaveBtn"?(usbSave(),!0):t.id==="usbLoadBtn"?(usbLoad(),!0):!1);const _lifeSetSg=window.lifeSettings;window.lifeSettings=function(){return sec("😴 "+L("autoSleep"),field("",seg("autoSleepMin",[[0,L("asOff")],[30,"30 "+L("min_")],[60,"60 "+L("min_")],[120,"120 "+L("min_")]])))+sec("💾 "+L("usbBk"),field("",`<div class="inline"><button class="btn f" id="usbSaveBtn">${esc(L("usbSave"))}</button><button class="btn f" id="usbLoadBtn">${esc(L("usbLoad"))}</button></div>`))+(_lifeSetSg?_lifeSetSg():"")};

;
/* more.js */
var d=(e,t,i)=>new Promise((a,o)=>{var l=n=>{try{r(i.next(n))}catch(c){o(c)}},s=n=>{try{r(i.throw(n))}catch(c){o(c)}},r=n=>n.done?a(n.value):Promise.resolve(n.value).then(l,s);r((i=i.apply(e,t)).next())});Object.assign(DEF,{libFav:[],hwLive:null,seasonal:!0,kidsLibFrom:8,kidsLibTo:20}),Object.assign(T.ar,{sLib:"📚 من المكتبة",sQuran:"📖 قرّاء",sFast:"📡 قنوات أفلام",libFavRow:"⭐ مفضلة المكتبة",favAdded:"اتضافت للمفضلة",favRemoved:"اتشالت من المفضلة",hwCont:"كمّل المشاهدة",hwLive:"قناة أفلام دلوقتي",liveNone:"اختار قناة: اضغط مطوّل ← إعدادات",livePick:"اختار قناة الويدجت",contNone:"مفيش حاجة تكمّلها",seasonal:"شكل المواسم تلقائي (رمضان والعيد)",eidG:"عيد مبارك 🎉",ramG:"رمضان كريم 🌙",kidsLibOff:"المكتبة مقفولة دلوقتي للأطفال",kidsLibTime:"وقت مكتبة الأطفال"}),Object.assign(T.en,{sLib:"📚 Library",sQuran:"📖 Reciters",sFast:"📡 Movie channels",libFavRow:"⭐ Library favorites",favAdded:"Added to favorites",favRemoved:"Removed from favorites",hwCont:"Continue watching",hwLive:"Movie channel now",liveNone:"Pick a channel: long-press → settings",livePick:"Pick the widget channel",contNone:"Nothing to continue",seasonal:"Seasonal look (Ramadan & Eid)",eidG:"Eid Mubarak 🎉",ramG:"Ramadan Kareem 🌙",kidsLibOff:"Library is closed for kids right now",kidsLibTime:"Kids library hours"});let gsT=null,gsSeq=0;const _renderSearchM=renderSearch;renderSearch=function(){_renderSearchM.apply(this,arguments);const e=$("sInput").value.trim();if(clearTimeout(gsT),e.length<2)return;const t=++gsSeq;gsT=setTimeout(()=>globalSearch(e,t),700)};function globalSearch(e,t){return d(this,null,function*(){const i=$("sResults"),a=e.toLowerCase(),o=s=>{if(t!==gsSeq)return;const r=i.querySelector(".empty");r&&r.remove(),i.insertAdjacentHTML("beforeend",s)};if(qReciters){const s=qReciters.filter(r=>r.name.toLowerCase().indexOf(a)>=0).slice(0,12);s.length&&o(`<h2>${esc(L("sQuran"))}</h2><div class="row">${s.map(r=>libCard({attr:`data-reciter="${r.id}"`,icon:"🎙",title:r.name})).join("")}</div>`)}const l=[];if(Object.keys(libCache).filter(s=>s.indexOf("fast|")===0).forEach(s=>libCache[s].forEach((r,n)=>{r.name.toLowerCase().indexOf(a)>=0&&l.push({c:r,k:s,i:n})})),l.length&&o(`<h2>${esc(L("sFast"))}</h2><div class="row">${l.slice(0,12).map(s=>libCard({attr:`data-gsfast="${esc(s.k)}|${s.i}"`,img:s.c.logo,icon:"📡",title:s.c.name})).join("")}</div>`),!isKids())try{const r=(((yield A.fetchJSON("https://archive.org/advancedsearch.php?q="+encodeURIComponent(`title:(${e}) AND mediatype:(movies OR audio)`)+"&fl[]=identifier&fl[]=title&sort[]=downloads+desc&rows=24&output=json")).response||{}).docs||[]).filter(n=>{const c=Array.isArray(n.title)?n.title[0]:n.title||"";return/[\u0600-\u06ff]/.test(c)&&!libBlocked(c)});r.length&&o(`<h2>${esc(L("sLib"))}</h2><div class="row">${r.map(n=>libCard({attr:`data-arch="${esc(n.identifier)}"`,img:"https://archive.org/services/img/"+n.identifier,title:Array.isArray(n.title)?n.title[0]:n.title})).join("")}</div>`)}catch(s){}})}activators.unshift(e=>{if(e.dataset&&e.dataset.gsfast){const[t,i]=e.dataset.gsfast.split("|"),a=(libCache[t]||[])[+i];return a&&(closeSearch(),play(a)),!0}return!1});function favKey(e){const t=e.dataset;return t.arch?"a:"+t.arch:t.reciter?"r:"+t.reciter:t.fastch!=null?"f:"+(((libCache["fast|"+FAST_SRC[fastSrc][1]]||[])[+t.fastch]||{}).url||""):t.gsfast?"f:"+(()=>{const[i,a]=t.gsfast.split("|");return((libCache[i]||[])[+a]||{}).url||""})():""}optionHandlers.unshift(e=>{if(!e.classList||!e.classList.contains("lbc"))return!1;const t=favKey(e);if(!t||t==="f:")return!1;const i=S.libFav||[];if(i.some(a=>a.k===t))S.libFav=i.filter(a=>a.k!==t),A.toast("☆ "+L("favRemoved"));else{const a=(e.querySelector(".lbi")||{}).style,o=a&&a.backgroundImage?a.backgroundImage.replace(/^url\(["']?|["']?\)$/g,""):"";let l={};if(t.indexOf("f:")===0){const s=e.dataset.gsfast?(()=>{const[r,n]=e.dataset.gsfast.split("|");return(libCache[r]||[])[+n]})():(libCache["fast|"+FAST_SRC[fastSrc][1]]||[])[+e.dataset.fastch];s&&(l={name:s.name,url:s.url,logo:s.logo})}S.libFav=[{k:t,title:(e.querySelector(".lbt")||{}).textContent||"",img:o,extra:l}].concat(i).slice(0,40),A.toast("⭐ "+L("favAdded"))}return renderLibFav(),!0}),function(){const e=$("ytRow")||$("hwBoard");if(!e)return;const t=document.createElement("h2");t.id="libFavH";const i=document.createElement("div");i.id="libFavRow",i.className="row ytrow",e.parentNode.insertBefore(t,e.nextSibling),t.parentNode.insertBefore(i,t.nextSibling)}();function renderLibFav(){const e=$("libFavRow"),t=$("libFavH");if(!e)return;const i=S.libFav||[];e.style.display=t.style.display=i.length?"":"none",t.textContent=L("libFavRow"),e.innerHTML=i.map(a=>{const o=a.k.slice(0,1),l=a.k.slice(2),s=o==="a"?`data-arch="${esc(l)}"`:o==="r"?`data-reciter="${esc(l)}"`:`data-lfav="${esc(a.k)}"`;return libCard({attr:s,img:a.img,icon:o==="r"?"🎙":"📡",title:a.title})}).join("")}activators.unshift(e=>{if(e.dataset&&e.dataset.lfav){const t=(S.libFav||[]).find(i=>i.k===e.dataset.lfav);return t&&t.extra&&t.extra.url&&play({name:t.extra.name,url:t.extra.url,logo:t.extra.logo}),!0}return e.dataset&&e.dataset.reciter&&!qReciters?(libCat="quran",quranReciters().then(()=>quranSurahs(e.dataset.reciter)),!0):!1}),HW_TYPES.push(["cont","⏯","hwCont"],["live","📡","hwLive"]);const _hwBodyM=hwBody;hwBody=function(e){if(e.t==="cont"){const t=(S.watch||[]).filter(i=>i.url).slice(0,e.sz>1?3:1);return t.length?`<div class="hwml">${t.map(i=>`<div class="hwm"><span class="tn" style="text-align:start">${esc(i.name)}</span><b>${i.dur?Math.round(100*i.pos/i.dur)+"%":""}</b></div>`).join("")}</div>`:`<div class="hwico">⏯</div><div class="hwsub dim">${esc(L("contNone"))}</div>`}if(e.t==="live"){const t=S.hwLive;return t?`<div class="hwrow">${t.logo?`<img src="${esc(t.logo)}" style="max-height:8vh;max-width:45%;object-fit:contain" alt="">`:'<span class="hwico">📡</span>'}<span class="hwbig" style="font-size:2.6vh">${esc(t.name)}</span></div><div class="hwsub dim">OK ▶</div>`:`<div class="hwico">📡</div><div class="hwsub dim">${esc(L("liveNone"))}</div>`}return _hwBodyM(e)},activators.unshift(e=>{if(!e.dataset||!e.dataset.hw)return!1;const t=hwGet(e.dataset.hw);if(!t)return!1;if(t.t==="cont"){const i=(S.watch||[]).filter(a=>a.url).slice(0,5);return i.length&&(i.length===1?play({name:i[0].name,url:i[0].url,logo:i[0].logo,kind:i[0].kind||"movie"}):dialog("⏯ "+L("hwCont"),i.map(a=>({label:a.name,fn:()=>play({name:a.name,url:a.url,logo:a.logo,kind:a.kind||"movie"})})))),!0}return t.t==="live"?(S.hwLive?play(S.hwLive):livePick(),!0):!1});function livePick(){return d(this,null,function*(){const e="fast|"+FAST_SRC[0][1];let t=libCache[e];if(!t)try{t=parseM3U(yield A.fetchText("https://raw.githubusercontent.com/BuddyChewChew/app-m3u-generator/main/playlists/"+FAST_SRC[0][1]+".m3u"),FAST_SRC[0][0]).filter(i=>FAST_RX.test((i.group||"")+" "+i.name)).slice(0,400),libCache[e]=t}catch(i){t=[]}dialog("📡 "+L("livePick"),t.slice(0,120).map(i=>({label:i.name,fn:()=>{S.hwLive={name:i.name,url:i.url,logo:i.logo},renderHW()}})))})}const _hwSettingsM=hwSettings;hwSettings=function(e){return e.t==="live"?livePick():_hwSettingsM(e)};const _hwMenuM=hwMenu;hwMenu=function(e){_hwMenuM(e);const t=hwGet(e);if(!t||t.t!=="live")return;const i=$("dbox"),a=i._items,o=i.querySelector(".mgrid,.dlist");!a||!o||(a.splice(a.length-2,0,{icon:"⚙️",label:L("hwSettings"),fn:()=>setTimeout(livePick,30)}),o.innerHTML=a.map((l,s)=>`<button class="btn f${l.pri?" pri":""}" data-di="${s}">${l.icon?`<b>${esc(l.icon)}</b>`:""}${esc(l.label)}</button>`).join(""),focus(o.querySelector(".f")))};function season(){if(!S.seasonal)return"";const e=hijriParts(new Date);return e?e.month===9?"ramadan":e.month===10&&e.day<=3||e.month===12&&e.day>=10&&e.day<=13?"eid":"":""}const _applyLookM=applyLook;applyLook=function(){_applyLookM.apply(this,arguments);const e=season();document.body.classList.toggle("season-ramadan",e==="ramadan"),document.body.classList.toggle("season-eid",e==="eid"),e&&(!S.anim||S.anim==="auto"||S.anim==="off")&&(document.body.dataset.anim=e==="ramadan"?"lanterns":"bokeh")},setTimeout(()=>{const e=season(),t=new Date().toDateString();e&&S.seasonDay!==t&&(S.seasonDay=t,banner(e==="eid"?"🎉":"🌙",L(e==="eid"?"eidG":"ramG"),"",8e3)),applyLook()},5e3);const _libCatsM=libCatsHtml;libCatsHtml=function(){return isKids()?LIB_CATS.filter(e=>e[0]==="quran"||e[0]==="radio").map(e=>`<div class="it f${e[0]===libCat?" on":""}" tabindex="0" data-libcat="${e[0]}">${e[1]} ${esc(L(LIBN[e[0]]))}</div>`).join(""):_libCatsM()};const _renderLibM=renderLib;renderLib=function(){return d(this,arguments,function*(){if(isKids()){const e=new Date().getHours();if(e<+S.kidsLibFrom||e>=+S.kidsLibTo)return $("libCats").innerHTML="",libMsg("🔒 "+L("kidsLibOff")+` (${S.kidsLibFrom}:00 – ${S.kidsLibTo}:00)`);libCat!=="quran"&&libCat!=="radio"&&(libCat="quran")}return _renderLibM.apply(this,arguments)})};const _lifeSetM=window.lifeSettings;window.lifeSettings=function(){return sec("🌙 "+L("seasonal"),field("",onoff("seasonal")))+sec("🧒 "+L("kidsLibTime"),field("",seg("kidsLibFrom",[[6,"6:00"],[8,"8:00"],[10,"10:00"]])+seg("kidsLibTo",[[18,"18:00"],[20,"20:00"],[22,"22:00"]])))+(_lifeSetM?_lifeSetM():"")},AFTER.seasonal=applyLook;const _renderHWM=renderHW;renderHW=function(){_renderHWM.apply(this,arguments),renderLibFav()},setTimeout(renderLibFav,0);

;
/* more2.js */
var c=(a,e,t)=>new Promise((i,s)=>{var o=n=>{try{r(t.next(n))}catch(l){s(l)}},d=n=>{try{r(t.throw(n))}catch(l){s(l)}},r=n=>n.done?i(n.value):Promise.resolve(n.value).then(o,d);r((t=t.apply(a,e)).next())});Object.assign(T.ar,{libRadio:"إذاعات القرآن مباشر",libKidsAr:"كرتون عربي",hwEvents:"المناسبات الجاية",hwAzkarA:"أذكار الصباح والمساء",azM:"أذكار الصباح",azE:"أذكار المساء",evRamadan:"رمضان",evEidF:"عيد الفطر",evArafa:"يوم عرفة",evEidA:"عيد الأضحى",evHijri:"رأس السنة الهجرية",evMawlid:"المولد النبوي",evAshura:"عاشوراء",evDays:"يوم",evToday:"النهارده"}),Object.assign(T.en,{libRadio:"Live Quran radio",libKidsAr:"Arabic cartoons",hwEvents:"Upcoming occasions",hwAzkarA:"Morning & evening azkar",azM:"Morning azkar",azE:"Evening azkar",evRamadan:"Ramadan",evEidF:"Eid al-Fitr",evArafa:"Arafah day",evEidA:"Eid al-Adha",evHijri:"Islamic new year",evMawlid:"Mawlid",evAshura:"Ashura",evDays:"days",evToday:"Today"}),LIB_CATS.splice(1,0,["radio","📻",null],["kidsar","🧸",'mediatype:movies AND (title:(كرتون OR سبيستون OR "افلام كرتون" OR "مدبلج") OR subject:(كرتون OR سبيستون OR "spacetoon")) AND NOT title:(تريلر OR اعلان)']),LIBN.radio="libRadio",LIBN.kidsar="libKidsAr";let qRadios=null;const _renderLibR=renderLib;renderLib=function(){return c(this,arguments,function*(){if(libCat!=="radio")return _renderLibR.apply(this,arguments);if($("libCats").innerHTML=libCatsHtml(),!qRadios){libMsg(L("libLoading"));try{qRadios=(yield A.fetchJSON("https://mp3quran.net/api/v3/radios?language="+(S.lang==="ar"?"ar":"eng"))).radios||[]}catch(a){return qRadios=null,libMsg(L("loadErr"))}}$("libMain").innerHTML=`<div class="lbgrid small">${qRadios.map((a,e)=>libCard({attr:`data-qradio="${e}"`,icon:"📻",title:a.name})).join("")}</div>`})},activators.unshift(a=>{if(a.dataset&&a.dataset.qradio!=null){const e=(qRadios||[])[+a.dataset.qradio];return e&&play({name:"📻 "+e.name,url:e.url,logo:""}),!0}return!1});const _libCatsK=libCatsHtml;libCatsHtml=function(){const a=_libCatsK();return isKids(),a};const EVENTS=[[9,1,"evRamadan"],[10,1,"evEidF"],[12,9,"evArafa"],[12,10,"evEidA"],[1,1,"evHijri"],[1,10,"evAshura"],[3,12,"evMawlid"]];let hijFmt=null;function hijMD(a){try{hijFmt||(hijFmt=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn",{month:"numeric",day:"numeric"}));const e=hijFmt.format(new Date(a.getTime()+(+S.hijriAdj||0)*864e5)).match(/(\d+)\D+(\d+)/);return e?{month:+e[1],day:+e[2]}:null}catch(e){return null}}function nextEvents(a){const e=new Date().toDateString();if(S.evC&&S.evC.d===e)return S.evC.l;const t=[],i={};for(let s=0;s<400&&t.length<a;s++){const o=new Date(Date.now()+s*864e5),d=hijMD(o);if(!d)break;const r=EVENTS.find(n=>n[0]===d.month&&n[1]===d.day);r&&!i[r[2]]&&(i[r[2]]=1,t.push({k:r[2],d:s}))}return S.evC={d:e,l:t},t}let evCache=null,evDay=-1;HW_TYPES.push(["events","🌙","hwEvents"],["azkarA","🌅","hwAzkarA"]);const _hwBodyE=hwBody;hwBody=function(a){if(a.t==="events"){const e=Math.floor(Date.now()/864e5);evDay!==e&&(evCache=nextEvents(4),evDay=e);const t=(evCache||[]).slice(0,a.sz>2?4:a.sz>1?3:1);return t.length?`<div class="hwml">${t.map(i=>`<div class="hwm"><span class="tn" style="text-align:start">${esc(L(i.k))}</span><b>${i.d?i.d+" "+esc(L("evDays")):esc(L("evToday"))}</b></div>`).join("")}</div>`:'<div class="hwico">🌙</div>'}if(a.t==="azkarA"){const e=new Date().getHours(),t=e<15;return`<div class="hwico">${t?"🌅":"🌇"}</div><div class="hwsub">${esc(L(t?"azM":"azE"))}</div><div class="hwsub dim">OK ▶</div>`}return _hwBodyE(a)},activators.unshift(a=>{if(!a.dataset||!a.dataset.hw)return!1;const e=hwGet(a.dataset.hw);if(!e||e.t!=="azkarA")return!1;const t=new Date().getHours()<15;return c(this,null,function*(){try{const s=(((yield A.fetchJSON("https://archive.org/advancedsearch.php?q="+encodeURIComponent(`title:("${t?"أذكار الصباح":"أذكار المساء"}") AND mediatype:audio`)+"&fl[]=identifier&sort[]=downloads+desc&rows=1&output=json")).response||{}).docs||[])[0];s?openArch(s.identifier):A.toast(L("libEmpty"))}catch(i){A.toast(L("loadErr"))}}),!0}),typeof HW_PRESETS<"u"&&(HW_PRESETS.pIslam=HW_PRESETS.pIslam.concat([{id:"events",t:"events",sz:2,st:"glass"},{id:"azkarA",t:"azkarA",sz:1,st:"accent"}])),setTimeout(()=>{if(S.hwSeeded||(S.hwSeeded=!0,hwList().length||hwSave([{id:"clock",t:"clock",sz:2,st:"glass"},{id:"prayer",t:"prayer",sz:2,st:"glass"},{id:"weather",t:"weather",sz:1,st:"glass"},{id:"wird",t:"wird",sz:2,st:"glass"},{id:"boost",t:"boost",sz:1,st:"accent"}])),!S.favSeeded&&typeof visibleApps=="function"){const a=visibleApps();a.length&&(S.favSeeded=!0,(S.favs||[]).length||(S.favs=a.filter(e=>e.pkg!=="com.mahmoud.tvlauncher").slice(0,6).map(e=>e.pkg),renderHome()))}},3e3);

;
/* home2.js */
var s=(e,t,n)=>new Promise((o,a)=>{var i=r=>{try{c(n.next(r))}catch(d){a(d)}},m=r=>{try{c(n.throw(r))}catch(d){a(d)}},c=r=>r.done?o(r.value):Promise.resolve(r.value).then(i,m);c((n=n.apply(e,t)).next())});Object.assign(DEF,{homePage:0,smartHome:!0,homeLock:!1,heroImg:"",heroDay:""}),Object.assign(T.ar,{hpMain:"🏠 الرئيسية",hpApps:"📱 تطبيقاتي",hpMine:"⭐ مكتبتي",hwHero:"الواجهة الكبيرة",smartHome:"الرئيسية بتتغيّر مع الوقت",hoLock:"🔒 تثبيت الشكل",locked:"الشكل مقفول — افتحه من «شكل الرئيسية»",hoLockOn:"مقفول",hoLockOff:"مفتوح",mineEmpty:"اضغط OK مطوّل على أي فيلم أو قارئ في المكتبة يظهر هنا",hoSmart:"ترتيب حسب الوقت"}),Object.assign(T.en,{hpMain:"🏠 Home",hpApps:"📱 My apps",hpMine:"⭐ My library",hwHero:"Hero banner",smartHome:"Home changes with the time of day",hoLock:"🔒 Lock layout",locked:"Layout is locked — unlock it in “Home look”",hoLockOn:"Locked",hoLockOff:"Unlocked",mineEmpty:"Long-press any film or reciter in the library to pin it here",hoSmart:"Order by time of day"}),function(){const e=$("shelf");if(!e)return;const t=document.createElement("div");t.id="homePager",t.className="inline hpager",e.parentNode.insertBefore(t,e);const n=document.createElement("div");n.id="homeApps",n.className="grid hpapps",$("home").querySelector(".scroll").appendChild(n);const o=document.createElement("p");o.id="homeMineEmpty",o.className="hint",$("home").querySelector(".scroll").appendChild(o)}();const HP=["hpMain","hpApps","hpMine"];function renderPager(){const e=$("homePager");e&&(e.innerHTML=HP.map((t,n)=>`<button class="btn sm f${n===(+S.homePage||0)?" on":""}" data-hpage="${n}">${esc(L(t))}</button>`).join(""))}let lastHPage=-1;function applyPage(){const e=+S.homePage||0,t=$("home").querySelector(".scroll"),n=e!==lastHPage;lastHPage=e,document.body.dataset.hpage!==String(e)&&(document.body.dataset.hpage=e),e===1?$("homeApps").innerHTML=visibleApps().sort((o,a)=>appName(o).localeCompare(appName(a))).map(tile).join(""):$("homeApps").innerHTML="",$("homeMineEmpty").textContent=e===2&&!(S.libFav||[]).length?L("mineEmpty"):"",t&&n&&t.scrollTop&&(t.scrollTop=0)}activators.unshift(e=>e.dataset&&e.dataset.hpage!=null?(S.homePage=+e.dataset.hpage,renderPager(),applyPage(),focus(document.querySelector(`[data-hpage="${S.homePage}"]`)),!0):!1),focusHooks.push(e=>{e.dataset&&e.dataset.hpage!=null&&+e.dataset.hpage!=(+S.homePage||0)&&(S.homePage=+e.dataset.hpage,renderPager(),applyPage(),focus(document.querySelector(`[data-hpage="${S.homePage}"]`)))}),HW_TYPES.unshift(["hero","🌄","hwHero"]);function heroImage(){return s(this,null,function*(){const e=new Date().toDateString();if(!(S.heroImg&&S.heroDay===e))try{const t=yield A.fetchJSON("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"),n=t.images&&t.images[0];if(!n)return;let o="https://www.bing.com"+n.urlbase+"_1920x1080.jpg";if(NA&&NA.cacheImage)try{o=(yield natAsync("cacheImage",o,1280))||o}catch(a){}S.heroImg=o,S.heroDay=e,renderHW()}catch(t){}})}const _hwBodyH=hwBody;hwBody=function(e){if(e.t!=="hero")return _hwBodyH(e);const t=new Date,n=S.prayerOn&&window.nextPrayer&&typeof prayers<"u"&&prayers.length?nextPrayer():null;return`<div class="herobox"><div class="hbig">${esc(fmtTime(t))}</div><div class="hsub">${esc(fmtDate(t))}</div>
    <div class="hrow">${n?`<span>🕌 ${esc(L("prayers")[n.i])} ${esc(fmtTime(n.t))}</span>`:""}${typeof weatherNow<"u"&&weatherNow?`<span>${esc(weatherNow.i)} ${esc(weatherNow.t)}°</span>`:""}</div></div>`};const _hwCardH=hwCard;hwCard=function(e){let t=_hwCardH(e);return e.t==="hero"&&(S.heroImg||heroImage(),t=t.replace('class="hw f hw-hero',`style="background-image:url('`+esc(S.heroImg||"")+`')" class="hw f hw-hero`)),t},document.body.classList.add("showfolders"),S.frameLaySeeded||(S.frameLaySeeded=!0,S.frameLay=Object.assign({clock:{s:1.8,x:4,y:58},prayer:{s:1.4},weather:{s:1.4},azkar:{on:!0,s:1.2}},S.frameLay||{}));function lockedNow(){return S.homeLock?(A.toast("🔒 "+L("locked")),!0):!1}const _hwMenuL=hwMenu;hwMenu=function(e){lockedNow()||_hwMenuL(e)};const _hwAddL=hwAddMenu;hwAddMenu=function(){lockedNow()||_hwAddL()};const _hwEditL=hwEditStart;hwEditStart=function(){lockedNow()||_hwEditL()};const _hwPresetL=hwPresetMenu;hwPresetMenu=function(){lockedNow()||_hwPresetL()};const _homeLookL=homeLookMenu;homeLookMenu=function(){_homeLookL();const e=$("dbox"),t=e._items,n=e.querySelector(".mgrid,.dlist");!t||!n||(t.splice(t.length-1,0,{icon:"🔒",label:L("hoLock")+": "+L(S.homeLock?"hoLockOn":"hoLockOff"),keep:1,fn:()=>{const o=()=>{S.homeLock=!S.homeLock,setTimeout(homeLookMenu,30)};S.homeLock&&S.pin?guard(!0,o):o()}}),n.innerHTML=t.map((o,a)=>`<button class="btn f${o.pri?" pri":""}" data-di="${a}">${o.icon?`<b>${esc(o.icon)}</b>`:""}${esc(o.label)}</button>`).join(""),focus(n.querySelector(".f")))},optionHandlers.unshift(e=>S.homeLock&&e.closest&&e.closest("#favRow")&&e.dataset.pkg?(dialog(appName(byPkg(e.dataset.pkg)||{name:e.dataset.pkg}),[{label:L("open"),pri:1,fn:()=>launch(e.dataset.pkg)},{label:L("cancel"),fn:()=>{}}]),!0):!1),S.heroSeeded||(S.heroSeeded=!0,hwList().some(e=>e.t==="hero")||(S.hw=[{id:"hero",t:"hero",sz:4,st:"clear"}].concat(hwList().filter(e=>e.t!=="clock"))));const _renderHomeP=renderHome;renderHome=function(){_renderHomeP.apply(this,arguments),renderPager(),applyPage()},window.renderHome=renderHome,setTimeout(()=>{renderPager(),applyPage()},0);const CREATOR={ar:"محمود الجمل",en:"Mahmoud Elgamal",img:"img/creator.jpg"};(function(){const e=document.createElement("div");e.id="creator",document.body.appendChild(e)})();function renderCreator(){const e=$("creator");if(!e)return;const t=S.lang==="ar";e.innerHTML=`<img src="${CREATOR.img}" onerror="this.remove()" alt=""><span>${t?"صُنع بواسطة":"Made by"} <b>${esc(t?CREATOR.ar:CREATOR.en)}</b></span>`}renderCreator();const _applyLangC=applyLang;applyLang=function(){_applyLangC.apply(this,arguments),renderCreator()};const _hwEditStartX=hwEditStart;hwEditStart=function(){_hwEditStartX(),banner("✏️",S.lang==="ar"?"دوس OK على أي ويدجت عشان تشيلها أو تغيّرها":"Press OK on a widget to remove or change it",L("edDone"),6e5)},layers.unshift({test:()=>hwEdit.on&&!hwEdit.grab&&!on("dlg"),ownsEnter:!0,key:e=>{if(!(e.key==="Enter"||e.keyCode===13||e.keyCode===23))return!1;held=!0;const n=focused&&focused.dataset&&focused.dataset.hw;if(!n)return!1;const o=hwGet(n),a=HW_TYPES.find(i=>i[0]===(o&&o.t))||["","",""];return dialog(a[1]+" "+L(a[2]),[{icon:"🗑",label:L("hwRemove"),pri:1,fn:()=>{hwSave(hwList().filter(i=>i.id!==n)),setTimeout(()=>{const i=document.querySelector("#hwBoard .hw");i&&focus(i)},60)}},{icon:"✋",label:S.lang==="ar"?"امسكها وحرّكها بالأسهم":"Grab and move with arrows",fn:()=>{hwEdit.grab=n,renderHW(),banner("✋",L("edHold"),"",6e5)}},{icon:"➕",label:L("wBigger"),keep:1,fn:()=>hwSet(n,{sz:Math.min(4,(hwGet(n).sz||1)+1)})},{icon:"➖",label:L("wSmaller"),keep:1,fn:()=>hwSet(n,{sz:Math.max(1,(hwGet(n).sz||1)-1)})},{icon:"🎨",label:L("hwStyle"),keep:1,fn:()=>{const i=hwGet(n);hwSet(n,{st:HW_STYLES[(HW_STYLES.indexOf(i.st||"glass")+1)%HW_STYLES.length]})}},{label:L("done"),fn:()=>{}}],{grid:3}),!0}}),document.addEventListener("keydown",e=>{on("player")&&!on("dlg")&&(e.key==="Home"||e.key==="Escape")&&stopPlayer()},!0);let plWatch=null;const _playX=play;play=function(e){_playX.apply(this,arguments),clearTimeout(plWatch),plWatch=setTimeout(()=>{const t=$("video");on("player")&&t&&(t.readyState<2||t.error)&&(stopPlayer(),A.toast(S.lang==="ar"?"القناة مش شغالة — اتقفلت":"Stream didn't start — closed"))},25e3)};const _boostNowX=boostNow;boostNow=function(){return s(this,arguments,function*(){try{on("player")&&stopPlayer()}catch(e){}try{const e=$("video");e&&(e.pause(),e.removeAttribute("src"),e.load())}catch(e){}try{typeof adhanAudio<"u"&&adhanAudio&&adhanAudio.pause()}catch(e){}try{nat("stopAudio")}catch(e){}try{typeof pvStop=="function"&&pvStop()}catch(e){}return _boostNowX.apply(this,arguments)})},window.boostNow=boostNow,function(){const e=$("homePager");if(!e)return;e.id="homePagerOld",e.style.display="none";const t=document.createElement("div");t.id="homePager",t.className="hrail",$("home").appendChild(t)}();const RAIL_ICON=["🏠","📱","⭐"];renderPager=function(){const e=$("homePager");if(!e)return;const t=+S.homePage||0;e.innerHTML=HP.map((n,o)=>`<button class="rb f${o===t?" on":""}" data-hpage="${o}"><b>${RAIL_ICON[o]}</b><span>${esc(L(n).replace(/^\S+\s/,""))}</span></button>`).join("")};const _fhIdx=focusHooks.findIndex(e=>String(e).indexOf("hpage")>=0);_fhIdx>=0&&focusHooks.splice(_fhIdx,1),setTimeout(()=>{const e=$("favRow"),t=e&&e.previousElementSibling;t&&t.tagName==="H2"&&t.classList.add("favh")},0),S.slimSeeded||(S.slimSeeded=!0,S.hw=hwList().filter(e=>!(e.t==="clock"||e.t==="boost"||e.t==="weather"&&(e.sz||1)<2||e.t==="wird")),hwList().some(e=>e.t==="hero")||(S.hw=[{id:"hero",t:"hero",sz:4,st:"clear"}].concat(hwList()))),function(){const e=$("date");if(!e)return;const t=document.createElement("div");t.id="npMini",e.parentNode.insertBefore(t,e.nextSibling)}(),tickers.push(()=>{const e=$("npMini");if(!e)return;const t=S.prayerOn&&window.nextPrayer&&typeof prayers<"u"&&prayers.length?nextPrayer():null,n=t?`🕌 ${L("prayers")[t.i]} ${fmtTime(t.t)} · ${fmtLeft(t.t-Date.now())}`:"";e.textContent!==n&&(e.textContent=n)});const _hwBodyS2=hwBody;hwBody=function(e){let t=_hwBodyS2(e);if(e.t!=="hero")return t;const n=typeof matches<"u"?matches.find(a=>evState(a)==="live"):null;n&&(t=t.replace('<div class="hrow">',`<div class="hlive">⚽ <b>${esc(n.strHomeTeam)} ${esc(String(n.intHomeScore||0))} - ${esc(String(n.intAwayScore||0))} ${esc(n.strAwayTeam)}</b> <span>● ${esc(L("live"))}</span></div><div class="hrow">`));const o=typeof wird<"u"&&wird||S.wird;return!o&&typeof loadWird=="function"&&loadWird(),o&&(t=t.replace(/<\/div>$/,`<div class="hwird"><span>📖 ${esc(o.text)} — ${esc(o.ref)}</span></div></div>`)),t},setTimeout(()=>{!sportsTried&&S.sportsOn!==!1&&(sportsTried=!0,loadSports())},8e3);const _renderPagerB=renderPager;renderPager=function(){_renderPagerB();const e=$("homePager");!e||$("railBoost")||e.insertAdjacentHTML("beforeend",`<button class="rb f boostrb" id="railBoost"><b>🚀</b><span>${esc(S.lang==="ar"?"تسريع وقفل كل حاجة":"Boost & close all")}</span></button><button class="rb f addwrb" id="hwAddBtn2"><b>＋</b><span>${esc(L("hwAdd"))}</span></button>`)},activators.unshift(e=>e.id==="railBoost"?(boostNow(),!0):!1),window.ytAddFromPhone=e=>s(this,null,function*(){if(e)try{const t=yield ytResolve(e);if(!t)return A.toast(L("ytBad"));if(!t.name)try{const a=(yield A.fetchText("https://www.youtube.com/feeds/videos.xml?channel_id="+t.id)).match(/<title>([^<]+)<\/title>/);t.name=a?a[1]:t.id}catch(o){t.name=t.id}const n=(S.ytCh||[]).filter(o=>o.id!==t.id);n.push({id:t.id,name:t.name}),S.ytCh=n,hwList().some(o=>o.t==="yt")||hwSave(hwList().concat([{id:"yt",t:"yt",sz:1,st:"glass"}])),ytAt=0,ytLoad(!0),banner("▶️",t.name,S.lang==="ar"?"اتضافت لويدجت يوتيوب":"Added to YouTube widget",5e3)}catch(t){A.toast(L("ytBad"))}});const _renderPagerV=renderPager;renderPager=function(){_renderPagerV();const e=$("homePager");if(!e||$("railMic"))return;const t=$("railBoost"),n=`<button class="rb f" id="railMic"><b>🎤</b><span>${esc(S.lang==="ar"?"بحث بالصوت":"Voice search")}</span></button>`;t?t.insertAdjacentHTML("beforebegin",n):e.insertAdjacentHTML("beforeend",n)},activators.unshift(e=>e.id==="railMic"?(typeof A.voice=="function"?A.voice():openSearch(""),!0):!1),S.onePageSeeded||(S.onePageSeeded=!0,S.homeOrder="w",S.homePage=0),setTimeout(()=>{const e=$("ticker"),t=$("tabs");e&&t&&e.parentNode!==t&&(t.appendChild(e),e.classList.add("intabs"))},0);const _renderPagerO=renderPager;renderPager=function(){_renderPagerO();const e=$("homePager"),t=$("railMic");e&&t&&e.lastElementChild!==t&&e.appendChild(t)};const _hwSettingsY=hwSettings;hwSettings=function(e){if(e.t!=="yt")return _hwSettingsY(e);const t=S.ytCh||[];dialog("▶️ "+L("hwYt"),[{icon:"＋",label:L("ytAdd"),pri:1,fn:()=>setTimeout(ytAddDlg,30)}].concat(t.map(n=>({icon:"✖",label:L("ytRem")+": "+n.name,fn:()=>{S.ytCh=t.filter(o=>o.id!==n.id),ytAt=0,ytLoad(!0),setTimeout(()=>hwSettings(e),30)}}))).concat([{icon:"🗑",label:S.lang==="ar"?"شيل ويدجت يوتيوب كلها":"Remove the YouTube widget",fn:()=>{hwSave(hwList().filter(o=>o.t!=="yt"));const n=document.querySelector("#hwBoard .hw");n&&focus(n)}},{label:L("done"),fn:()=>{}}]))},Object.assign(T.ar,{cinema:"وضع السينما",cinemaOn:"🎬 وضع السينما شغال",cinemaOff:"خرجت من وضع السينما"}),Object.assign(T.en,{cinema:"Cinema mode",cinemaOn:"🎬 Cinema mode on",cinemaOff:"Cinema mode off"});function applyCinema(){document.body.classList.toggle("cinema",!!S.cinema),S.cinema?document.body.dataset.anim="off":applyLook()}function toggleCinema(){S.cinema=!S.cinema,applyCinema(),banner("🎬",L(S.cinema?"cinemaOn":"cinemaOff"),"",2500),renderPager()}setTimeout(applyCinema,0);const _renderPagerC=renderPager;renderPager=function(){_renderPagerC();const e=$("homePager");if(!e)return;let t=$("railCinema");if(!t){const n=$("railBoost"),o=`<button class="rb f" id="railCinema"><b>🎬</b><span>${esc(L("cinema"))}</span></button>`;n?n.insertAdjacentHTML("beforebegin",o):e.insertAdjacentHTML("beforeend",o),t=$("railCinema")}t.classList.toggle("on",!!S.cinema)},activators.unshift(e=>e.id==="railCinema"?(toggleCinema(),!0):!1),Object.assign(DEF,{matchAlerts:{},matchApp:""}),Object.assign(T.ar,{mRemind:"🔔 فكّرني قبلها بربع ساعة",mReminded:"هفكّرك قبل الماتش",mPickApp:"هتتفرج منين؟",mSoon:"الماتش بعد ربع ساعة",mOpen:"افتح",mLater:"بعدين"}),Object.assign(T.en,{mRemind:"🔔 Remind me 15 min before",mReminded:"I'll remind you before kick-off",mPickApp:"Which app do you watch on?",mSoon:"Match in 15 minutes",mOpen:"Open",mLater:"Later"}),hwMatchesDialog=function(){const e=(typeof matches<"u"?matches:[]).filter(t=>evState(t)!=="ft");if(!e.length)return dialog("⚽ "+L("hwMatches"),[{label:L("mNone"),fn:()=>{}}]);dialog("⚽ "+L("hwMatches"),e.map(t=>({icon:(S.matchAlerts||{})[t.idEvent]?"🔔":"⚽",label:`${t.strHomeTeam} × ${t.strAwayTeam} · ${evState(t)==="live"?L("live"):fmtTime(evTime(t))}`,fn:()=>setTimeout(()=>matchRemind(t),30)})))};function matchRemind(e){const t=()=>{const n=Object.assign({},S.matchAlerts||{});n[e.idEvent]={t:+evTime(e),n:`${e.strHomeTeam} × ${e.strAwayTeam}`},S.matchAlerts=n,banner("🔔",L("mReminded"),n[e.idEvent].n,4e3)};if(S.matchApp)return t();dialog(L("mPickApp"),visibleApps().slice(0,40).map(n=>({label:appName(n),fn:()=>{S.matchApp=n.pkg,t()}})))}setInterval(()=>{const e=Object.assign({},S.matchAlerts||{}),t=Date.now();let n=!1;Object.keys(e).forEach(o=>{const a=e[o];if(t>a.t+3*36e5){delete e[o],n=!0;return}!a.fired&&t>=a.t-15*6e4&&(a.fired=1,n=!0,chime(),on("player")||on("dlg")?banner("⚽",L("mSoon"),a.n,2e4):dialog("⚽ "+L("mSoon"),[{label:L("mOpen")+(S.matchApp&&byPkg(S.matchApp)?" "+appName(byPkg(S.matchApp)):""),pri:1,fn:()=>{S.matchApp&&launch(S.matchApp)}},{label:L("mLater"),fn:()=>{}}],{sub:a.n}))}),n&&(S.matchAlerts=e)},3e4),S.iconSizeSeeded||(S.iconSizeSeeded=!0,(!S.favSize||S.favSize==="s"||S.favSize==="m")&&(S.favSize="s"));const _applyPageZ=applyPage;applyPage=function(){if(_applyPageZ.apply(this,arguments),+S.homePage==1){const e=$("homeApps");e&&!$("zoomBar")&&e.insertAdjacentHTML("beforebegin",`<div class="inline" id="zoomBar" style="padding:0 1vw 1vh"><button class="btn f" id="zoomOut">➖ ${S.lang==="ar"?"صغّر الأيقونات":"Smaller"}</button><button class="btn f" id="zoomIn">➕ ${S.lang==="ar"?"كبّر":"Bigger"}</button></div>`)}else{const e=$("zoomBar");e&&e.remove()}},activators.unshift(e=>{const t=["xxs","xs","s","m","l"],n=t.indexOf(S.favSize||"s");return e.id==="zoomIn"?(S.favSize=t[Math.min(4,n+1)],applyHomeLook(),!0):e.id==="zoomOut"?(S.favSize=t[Math.max(0,n-1)],applyHomeLook(),!0):!1}),renderCreator=function(){const e=$("creator");e&&(e.innerHTML=`<img src="${CREATOR.img}" onerror="this.remove()" alt=""><div class="cr"><small>DESIGNED BY</small><b>Mahmoud Elgamal</b></div>`)},renderCreator(),S.iconSize2||(S.iconSize2=!0,S.favSize="m",setTimeout(()=>{typeof applyHomeLook=="function"&&applyHomeLook()},0)),document.body.classList.add("clean");const _applyLookCl=applyLook;applyLook=function(){_applyLookCl.apply(this,arguments),document.body.classList.add("clean"),document.body.dataset.lay="none"},setTimeout(()=>{document.body.dataset.lay="none"},0);

;
/* sports2.js */
var f=(e,a,t)=>new Promise((s,i)=>{var p=o=>{try{r(t.next(o))}catch(n){i(n)}},c=o=>{try{r(t.throw(o))}catch(n){i(n)}},r=o=>o.done?s(o.value):Promise.resolve(o.value).then(p,c);r((t=t.apply(e,a)).next())});const COMPS=[["egy.1","الدوري المصري","Egyptian Premier League","l"],["ksa.1","الدوري السعودي","Saudi Pro League","l"],["eng.1","الدوري الإنجليزي","Premier League","l"],["esp.1","الدوري الإسباني","La Liga","l"],["ita.1","الدوري الإيطالي","Serie A","l"],["ger.1","الدوري الألماني","Bundesliga","l"],["fra.1","الدوري الفرنسي","Ligue 1","l"],["tur.1","الدوري التركي","Turkish Süper Lig","l"],["por.1","الدوري البرتغالي","Primeira Liga","l"],["ned.1","الدوري الهولندي","Eredivisie","l"],["uae.1","الدوري الإماراتي","UAE Pro League","l"],["qat.1","الدوري القطري","Qatar Stars League","l"],["mar.1","الدوري المغربي","Botola Pro","l"],["usa.1","الدوري الأمريكي","MLS","l"],["eng.2","التشامبيونشيب","Championship","l"],["eng.fa","كأس إنجلترا","FA Cup","l"],["esp.copa_del_rey","كأس ملك إسبانيا","Copa del Rey","l"],["uefa.champions","دوري أبطال أوروبا","Champions League","c"],["uefa.europa","الدوري الأوروبي","Europa League","c"],["uefa.europa.conf","دوري المؤتمر","Conference League","c"],["caf.champions","دوري أبطال أفريقيا","CAF Champions League","c"],["caf.confed","الكونفدرالية الأفريقية","CAF Confederation Cup","c"],["afc.champions","دوري أبطال آسيا","AFC Champions League","c"],["conmebol.libertadores","كوبا ليبرتادوريس","Copa Libertadores","c"],["fifa.cwc","كأس العالم للأندية","Club World Cup","c"],["fifa.world","كأس العالم","World Cup","n"],["fifa.worldq.caf","تصفيات كأس العالم - أفريقيا","WC Qualifiers - Africa","n"],["fifa.worldq.afc","تصفيات كأس العالم - آسيا","WC Qualifiers - Asia","n"],["fifa.worldq.uefa","تصفيات كأس العالم - أوروبا","WC Qualifiers - Europe","n"],["caf.nations","كأس الأمم الأفريقية","Africa Cup of Nations","n"],["caf.nations_qual","تصفيات أمم أفريقيا","AFCON Qualifiers","n"],["afc.asian.cup","كأس آسيا","Asian Cup","n"],["uefa.euro","كأس أمم أوروبا","EURO","n"],["uefa.nations","دوري الأمم الأوروبية","Nations League","n"],["fifa.friendly","مباريات ودية دولية","International friendlies","n"],["fifa.arab","كأس العرب","Arab Cup","n"]];Object.assign(DEF,{comps:["egy.1","ksa.1","eng.1","esp.1","tur.1","uefa.champions","caf.champions","afc.champions","fifa.worldq.caf","caf.nations","fifa.friendly","fifa.world","fifa.arab"]}),Object.assign(T.ar,{cgL:"🏟 الدوريات",cgC:"🏆 بطولات قارية",cgN:"🌍 المنتخبات",compsHint:"اختار اللي تتابعه — المختار لونه مختلف"}),Object.assign(T.en,{cgL:"🏟 Leagues",cgC:"🏆 Continental cups",cgN:"🌍 National teams",compsHint:"Pick what you follow — selected ones are highlighted"}),COMPS.forEach(e=>{LEAGUES.find(a=>a[0]===e[0])||LEAGUES.push([e[0],e[1],e[2]])});const ymd=e=>`${e.getFullYear()}${pad(e.getMonth()+1)}${pad(e.getDate())}`;function espnDay(e){return f(this,null,function*(){const a=[];return yield Promise.all((S.comps||[]).map(t=>f(this,null,function*(){try{((yield A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${t}/scoreboard?dates=${e}`)).events||[]).forEach(i=>{const p=(i.competitions||[])[0]||{},c=p.competitors||[],r=c.find(l=>l.homeAway==="home")||c[0]||{},o=c.find(l=>l.homeAway==="away")||c[1]||{},n=(p.status||i.status||{}).type||{};a.push({idEvent:"e"+i.id,_lg:t,strTimestamp:i.date,strHomeTeam:(r.team||{}).displayName||"",strAwayTeam:(o.team||{}).displayName||"",strHomeTeamBadge:(r.team||{}).logo||"",strAwayTeamBadge:(o.team||{}).logo||"",intHomeScore:n.state==="pre"?null:r.score,intAwayScore:n.state==="pre"?null:o.score,strStatus:n.state==="post"?"FT":n.state==="pre"?"NS":"LIVE "+(n.shortDetail||"")})})}catch(s){}}))),a.filter(t=>evTime(t)).sort((t,s)=>evTime(t)-evTime(s))})}loadSports=function(){return f(this,null,function*(){if(clearTimeout(sportsT),!S.sportsOn){matches=[],renderMatchRow(),updateTicker();return}let e=[];try{e=yield espnDay(ymd(new Date))}catch(a){}matches=e,renderMatchRow(),updateTicker(),typeof renderHW=="function"&&renderHW(),sportsT=setTimeout(loadSports,(matches.some(a=>evState(a)==="live")?2:15)*6e4)})},typeof spFetch=="function"&&(spFetch=function(e){return f(this,null,function*(){if(e===0)return matches;const a=spCache[e];if(a&&Date.now()-a.at<30*6e4)return a.list;const t=yield espnDay(ymd(new Date(Date.now()+e*864e5)));return spCache[e]={at:Date.now(),list:t},t})});const _evStateE=evState;evState=function(e){const a=e.strStatus||"";return/^LIVE/.test(a)?"live":a==="FT"?"ft":a==="NS"?"ns":_evStateE(e)};const _lifeSetSp=window.lifeSettings;window.lifeSettings=function(){const e=(a,t)=>field(L(t),`<div class="inline">${COMPS.filter(s=>s[3]===a).map(s=>`<button class="btn f${(S.comps||[]).includes(s[0])?" pri":""}" data-tog="comps:${s[0]}">${esc(S.lang==="ar"?s[1]:s[2])}</button>`).join("")}</div>`);return sec("⚽ "+L("sSports"),field(L("compsHint"),"")+e("l","cgL")+e("c","cgC")+e("n","cgN"))+(_lifeSetSp?_lifeSetSp():"")};const _settingsToggle=AFTER.comps;AFTER.comps=()=>{loadSports()},S.favTeamsSeeded||(S.favTeamsSeeded=!0,String(S.favTeams||"").trim()||(S.favTeams="Al Ahly, Egypt, Trabzonspor, الأهلي, مصر"));let sportsAt=Date.now();const _loadSportsT=loadSports;loadSports=function(){return f(this,arguments,function*(){return sportsAt=Date.now(),_loadSportsT.apply(this,arguments)})},pageHooks["home:enter"]=function(e){return function(){e&&e(),S.sportsOn&&Date.now()-sportsAt>6e5&&loadSports()}}(pageHooks["home:enter"]);

;
/* share.js */
var c=(e,n,t)=>new Promise((a,l)=>{var o=s=>{try{i(t.next(s))}catch(r){l(r)}},d=s=>{try{i(t.throw(s))}catch(r){l(r)}},i=s=>s.done?a(s.value):Promise.resolve(s.value).then(o,d);i((t=t.apply(e,n)).next())});Object.assign(T.ar,{wlTitle:"أهلاً بيك 👋",wlLang:"اختار اللغة",wlCity:"مدينتك (للصلاة والطقس)",wlFav:"اختار التطبيقات اللي بتستخدمها (تظهر في الرئيسية)",wlDone:"خلصت ✓",wlSkip:"بعدين",advShow:"⚙️ إظهار الإعدادات المتقدمة (IPTV، تيليجرام، EPG…)",advHide:"⚙️ إخفاء الإعدادات المتقدمة",report:"📮 ابعت مشكلة أو اقتراح",reportSub:"صوّر الكود بالموبايل — هيفتح صفحة فيها بيانات جهازك جاهزة، اكتب المشكلة وابعت"}),Object.assign(T.en,{wlTitle:"Welcome 👋",wlLang:"Choose your language",wlCity:"Your city (prayer times & weather)",wlFav:"Pick the apps you use (they show on Home)",wlDone:"Done ✓",wlSkip:"Later",advShow:"⚙️ Show advanced settings (IPTV, Telegram, EPG…)",advHide:"⚙️ Hide advanced settings",report:"📮 Report a problem or idea",reportSub:"Scan with your phone — a page opens with your device details filled in; describe the problem and send"});function welcome(){dialog(L("wlTitle")+" · "+L("wlLang"),[{label:"العربية",pri:S.lang==="ar",fn:()=>{S.lang="ar",applyLang(),setTimeout(wlCity,60)}},{label:"English",pri:S.lang!=="ar",fn:()=>{S.lang="en",applyLang(),setTimeout(wlCity,60)}},{label:L("wlSkip"),fn:()=>{S.welcomed=!0}}],{grid:3})}function wlCity(){prompt2(L("wlCity"),S.city||"",e=>{if(e){S.city=e,S.loc=null;try{weather()}catch(n){}}setTimeout(wlFav,60)},"Cairo")}function wlFav(){const e=new Set(S.favs||[]),n=visibleApps().filter(a=>a.pkg!=="com.mahmoud.tvlauncher").slice(0,60),t=()=>dialog(L("wlFav"),n.map(a=>({icon:e.has(a.pkg)?"⭐":"▫️",label:appName(a),keep:1,fn:()=>{e.has(a.pkg)?e.delete(a.pkg):e.add(a.pkg);const l=focused&&focused.dataset.di;t();const o=$("dbox").querySelector('[data-di="'+l+'"]');o&&focus(o)}})).concat([{label:L("wlDone"),pri:1,fn:()=>{S.favs=[...e],S.welcomed=!0,S.favSeeded=!0,renderHome(),window.wlTeam&&setTimeout(wlTeam,60)}}]),{grid:3});t()}setTimeout(()=>{if(!S.welcomed){if((S.favs||[]).length&&S.setupSeen){S.welcomed=!0;return}closeDialog(),welcome()}},3500),DEF.advanced=!1;const ADV_RX=/IPTV|تيليجرام|Telegram|^القنوات$|^Channels$|قنوات مجانية|Free channels|مشغّل القنوات|Channel player|تسجيل|Recording|زراير الريموت|Remote buttons|تشغيل البوكس|Start-up|جدول تشغيل|Screen schedule/i,_renderSettingsA=renderSettings;renderSettings=function(){_renderSettingsA.apply(this,arguments);const e=$("setScroll");e&&(e.querySelectorAll(".sec").forEach(n=>{const t=n.querySelector("h3");t&&ADV_RX.test(t.textContent)&&(n.classList.add("advsec"),S.advanced||n.remove())}),$("advBtn")||e.insertAdjacentHTML("beforeend",`<div class="sec"><h3>⚙️ ${esc(S.lang==="ar"?"متقدم ومشكلة":"Advanced & report")}</h3><div class="inline"><button class="btn f${S.advanced?" pri":""}" id="advBtn">${esc(L(S.advanced?"advHide":"advShow"))}</button><button class="btn pri f" id="reportBtn">${esc(L("report"))}</button></div></div>`),document.body.classList.add("showadv"),typeof buildSetCats=="function"&&buildSetCats())},pageHooks["settings:enter"]=renderSettings;const errLog=[];window.addEventListener("error",e=>{errLog.push((e.message||"")+" @"+String(e.filename||"").split("/").pop()+":"+e.lineno),errLog.length>8&&errLog.shift()});function reportDialog(){let e={};try{e=JSON.parse(nat("memInfo")||"{}")}catch(o){}const n=nat("versionName")||"?",t=navigator.userAgent.replace(/\s+/g," ").slice(0,160),a=`**Version:** ${n}
**WebView:** ${t}
**RAM:** ${e.total?Math.round(e.total/1048576)+" MB":"?"}
**Theme/Design:** ${S.theme}/${S.design||"-"}
**Recent errors:**
${errLog.join(`
`)||"none"}

**What happened?**
`,l="https://github.com/Mahmoud-Elgamal2026/TVLauncher/issues/new?title="+encodeURIComponent("["+n+"] ")+"&body="+encodeURIComponent(a);dialog(L("report"),[{label:L("done"),fn:()=>{}}],{html:`<div style="display:flex;align-items:center;justify-content:center;gap:2vw"><div style="background:#fff;padding:1.2vh;border-radius:1.4vh;line-height:0">${qrSvg(l,320)}</div><div style="font-size:2vh;line-height:1.8;max-width:30vw">${esc(L("reportSub"))}</div></div><div class="dlist" style="margin-top:1vh"><button class="btn pri f" data-di="0">${L("done")}</button></div>`})}activators.unshift(e=>{if(e.id==="advBtn"){S.advanced=!S.advanced,renderSettings();const n=[].slice.call($("setScroll").children).filter(t=>t.classList.contains("sec"));return typeof showSetCat=="function"&&showSetCat(n.length-1),focus($("advBtn")),!0}return e.id==="reportBtn"?(reportDialog(),!0):!1}),DEF.channel="stable",Object.assign(T.ar,{chan:"قناة التحديث",chStable:"مستقرة (للناس)",chBeta:"تجريبية (كل نسخة جديدة)"}),Object.assign(T.en,{chan:"Update channel",chStable:"Stable (everyone)",chBeta:"Beta (every new build)"});const _lifeSetCh=window.lifeSettings;window.lifeSettings=function(){return(_lifeSetCh?_lifeSetCh():"")+sec("🧪 "+L("chan"),field("",seg("channel",[["stable",L("chStable")],["beta",L("chBeta")]])))},Object.assign(DEF,{usage2:{},favAuto:!1}),Object.assign(T.ar,{usTitle:"📊 استخدامي (آخر ٧ أيام)",usNone:"لسه مفيش بيانات — افتح تطبيقاتك وارجع بعد شوية",favAuto:"رتّب المفضلة حسب الأكتر استخدام",hr:" س",mn:" د"}),Object.assign(T.en,{usTitle:"📊 My usage (last 7 days)",usNone:"No data yet — use your apps and come back later",favAuto:"Sort favorites by most used",hr:"h",mn:"m"});let usOpen=null;const _launchU=launch;launch=function(e){return usOpen={pkg:e,t:Date.now()},_launchU.apply(this,arguments)};function usClose(){if(!usOpen)return;const e=Math.min(360,(Date.now()-usOpen.t)/6e4),n=usOpen.pkg;if(usOpen=null,e<.3)return;const t=Math.floor(Date.now()/864e5),a=Object.assign({},S.usage2||{}),l=a[n]||{};l[t]=(l[t]||0)+e,Object.keys(l).forEach(o=>{+o<t-6&&delete l[o]}),a[n]=l,S.usage2=a,S.favAuto&&favSort()}document.addEventListener("visibilitychange",()=>{document.hidden||usClose()}),window.addEventListener("focus",usClose);function usTotals(){const e=S.usage2||{},n=Math.floor(Date.now()/864e5);return Object.keys(e).map(t=>({p:t,m:Object.keys(e[t]).filter(a=>+a>=n-6).reduce((a,l)=>a+e[t][l],0)})).filter(t=>t.m>=1).sort((t,a)=>a.m-t.m)}function favSort(){const e=usTotals(),n={};e.forEach((t,a)=>n[t.p]=a),S.favs=(S.favs||[]).slice().sort((t,a)=>(n[t]!=null?n[t]:999)-(n[a]!=null?n[a]:999)),renderHome()}function usageDialog(){const e=usTotals().slice(0,15),n=t=>t>=60?Math.floor(t/60)+L("hr")+" "+Math.round(t%60)+L("mn"):Math.round(t)+L("mn");dialog(L("usTitle"),(e.length?e.map(t=>{const a=byPkg(t.p);return{label:`${a?appName(a):t.p} — ${n(t.m)}`,fn:()=>{a&&launch(a.pkg)}}}):[{label:L("usNone"),fn:()=>{}}]).concat([{icon:S.favAuto?"✅":"⬜",label:L("favAuto"),fn:()=>{S.favAuto=!S.favAuto,S.favAuto&&favSort()}}]))}const _homeLookU=homeLookMenu;homeLookMenu=function(){_homeLookU();const e=$("dbox"),n=e._items,t=e.querySelector(".mgrid,.dlist");!n||!t||(n.splice(n.length-1,0,{icon:"📊",label:L("usTitle"),fn:()=>setTimeout(usageDialog,30)}),t.innerHTML=n.map((a,l)=>`<button class="btn f${a.pri?" pri":""}" data-di="${l}">${a.icon?`<b>${esc(a.icon)}</b>`:""}${esc(a.label)}</button>`).join(""),focus(t.querySelector(".f")))},S.advSeeded||(S.advSeeded=!0,(S.tgToken||(S.lists||[]).length||S.schedOn||S.bootPlay)&&(S.advanced=!0)),Object.assign(T.ar,{wallRemove:"🗑 شيل الخلفية (ارجع للأصلية)",framesRemove:"🗑 امسح صور البرواز اللي بعتها",wallRemoved:"رجعت الخلفية الأصلية",framesRemoved:"اتمسحت صور البرواز"}),Object.assign(T.en,{wallRemove:"🗑 Remove wallpaper (back to default)",framesRemove:"🗑 Delete the frame photos you sent",wallRemoved:"Default wallpaper restored",framesRemoved:"Frame photos deleted"});function wallReset(){const e=S.wallImg;if(S.wall="dynamic",S.wallImg="",S.wallAuto="",applyLook(),e&&/^file:/.test(e))try{nat("deleteFrame",e)}catch(n){}banner("🖼",L("wallRemoved"),"",3e3)}function framesReset(){(S.frames||[]).forEach(e=>{try{nat("deleteFrame",e)}catch(n){}}),S.frames=[],S.frameSrc==="mine"&&(S.frameSrc="online"),banner("🖼",L("framesRemoved"),"",3e3)}const _wallMenuR=wallMenu;wallMenu=function(){_wallMenuR();const e=$("dbox"),n=e._items,t=e.querySelector(".mgrid,.dlist");!n||!t||(n.unshift({icon:"🗑",label:L("wallRemove"),fn:wallReset},{icon:"🗑",label:L("framesRemove"),fn:framesReset}),t.innerHTML=n.map((a,l)=>`<button class="btn f${a.pri?" pri":""}" data-di="${l}">${a.icon?`<b>${esc(a.icon)}</b>`:""}${esc(a.label)}</button>`).join(""),focus(t.querySelector(".f")))},window.remoteWallReset=wallReset,window.remoteFramesReset=framesReset;const _renderSettingsW=renderSettings;renderSettings=function(){_renderSettingsW.apply(this,arguments);const e=$("wallPick");e&&!$("wallX")&&e.insertAdjacentHTML("afterend",`<button class="btn f" id="wallX">${esc(L("wallRemove"))}</button>`),[].forEach.call(document.querySelectorAll("#setScroll .sec h3"),n=>{/خلفية متحركة|Animated background/.test(n.textContent)&&!$("wallX2")&&n.parentNode.insertAdjacentHTML("beforeend",`<div class="inline" style="margin-top:1vh"><button class="btn f" id="wallX2">${esc(L("wallRemove"))}</button><button class="btn f" id="framesX">${esc(L("framesRemove"))}</button></div>`)})},activators.unshift(e=>e.id==="wallX"||e.id==="wallX2"?(wallReset(),S.anim="off",applyLook(),renderSettings(),!0):e.id==="framesX"?(framesReset(),!0):!1),Object.assign(DEF,{wallBlur:0,wallShow:100}),Object.assign(T.ar,{wBlur:"ضبابية الخلفية",wShow:"ظهور الخلفية",wbOff:"من غير",wbLow:"خفيفة",wbMid:"وسط",wbHigh:"قوية"}),Object.assign(T.en,{wBlur:"Wallpaper blur",wShow:"Wallpaper visibility",wbOff:"None",wbLow:"Light",wbMid:"Medium",wbHigh:"Strong"});function applyWallFx(){const e=$("wall");if(!e)return;const n=+S.wallBlur||0,t=Math.max(10,Math.min(100,+S.wallShow||100));e.style.filter=n?`blur(${n}px)`:"",e.style.transform=n?"scale(1.06)":"",document.body.style.setProperty("--wallShow",t/100),e.style.opacity=document.body.classList.contains("wallimg")?t/100:""}const _applyLookWF=applyLook;applyLook=function(){_applyLookWF.apply(this,arguments),applyWallFx()},AFTER.wallBlur=applyWallFx,AFTER.wallShow=applyWallFx,setTimeout(applyWallFx,0);const _renderSettingsWF=renderSettings;renderSettings=function(){_renderSettingsWF.apply(this,arguments);const e=$("wallX");!e||$("wfBox")||(e.parentNode.insertAdjacentHTML("afterend",`<div id="wfBox">${field(L("wBlur"),seg("wallBlur",[[0,L("wbOff")],[4,L("wbLow")],[10,L("wbMid")],[20,L("wbHigh")]]))}${field(L("wShow"),seg("wallShow",[[25,"25%"],[50,"50%"],[75,"75%"],[100,"100%"]]))}</div>`),document.querySelectorAll("#wfBox [data-set]").forEach(n=>{const[t,a]=n.dataset.set.split(":");n.classList.toggle("pri",String(S[t])===a)}))},window.applyWallFx=applyWallFx;const _setWallA=window.setWall;_setWallA&&(window.setWall=setWall=function(){return c(this,arguments,function*(){return S.anim="off",S.liveWall=!1,_setWallA.apply(this,arguments)})});const _onSetAnim=AFTER.anim;AFTER.anim=function(){S.anim&&S.anim!=="off"&&S.wall==="image"&&(S.wall="dynamic",S.wallImg=""),_onSetAnim&&_onSetAnim(),applyLook()};

;
/* shows.js */
var h=(e,s,t)=>new Promise((a,n)=>{var i=c=>{try{l(t.next(c))}catch(r){n(r)}},o=c=>{try{l(t.throw(c))}catch(r){n(r)}},l=c=>c.done?a(c.value):Promise.resolve(c.value).then(i,o);l((t=t.apply(e,s)).next())});Object.assign(DEF,{shows:[]}),Object.assign(T.ar,{hwShows:"مسلسلاتي",shAdd:"＋ تابع مسلسل",shName:"اسم المسلسل (عربي أو إنجليزي)",shApp:"بتتفرج عليه منين؟",shNone:"اضغط OK وضيف مسلسل بتتابعه",shLast:"آخر حلقة نزلت",shNext:"الجاية",shMine:"إنت وقفت عند",shEp:"حلقة",shNew:"جديد",shWatched:"✓ اتفرجت على الحلقة دي",shBack:"↩ رجّع حلقة",shOpen:"▶ افتح",shRemove:"🗑 بطّل متابعة",shManual:"ملقتش بيانات أونلاين — هتابعه معاك يدوي (إنت تحدد الحلقة)",shUpdated:"اتحدّث"}),Object.assign(T.en,{hwShows:"My shows",shAdd:"＋ Follow a show",shName:"Show name",shApp:"Which app do you watch it on?",shNone:"Press OK and add a show you follow",shLast:"Latest aired",shNext:"Next",shMine:"You stopped at",shEp:"ep",shNew:"NEW",shWatched:"✓ Watched this episode",shBack:"↩ One episode back",shOpen:"▶ Open",shRemove:"🗑 Unfollow",shManual:"No online data — tracking it manually (you set the episode)",shUpdated:"Updated"}),HW_TYPES.push(["shows","🎬","hwShows"]);const epTag=e=>e?e.season>1?`S${e.season}·E${e.number}`:`${L("shEp")} ${e.number}`:"";function showFetch(e){return h(this,null,function*(){try{const s=yield A.fetchJSON("https://api.tvmaze.com/singlesearch/shows?q="+encodeURIComponent(e.q)+"&embed[]=previousepisode&embed[]=nextepisode"),t=s._embedded||{},a=t.previousepisode,n=t.nextepisode;Object.assign(e,{tv:s.id,name:s.name||e.q,img:s.image&&s.image.medium||"",last:a?{season:a.season,number:a.number,date:a.airdate}:null,next:n?{season:n.season,number:n.number,date:n.airdate}:null,at:Date.now(),manual:!1})}catch(s){e.manual=!0,e.at=Date.now()}return e})}function showsRefresh(e){return h(this,null,function*(){const s=(S.shows||[]).map(a=>Object.assign({},a));let t=!1;for(const a of s)(e||!a.at||Date.now()-a.at>6*36e5)&&(yield showFetch(a),t=!0);t&&(S.shows=s,renderHW())})}const behind=e=>e.last&&e.mine?e.last.season>e.mine.season||e.last.season===e.mine.season&&e.last.number>e.mine.number:!!e.last,_hwBodySh=hwBody;hwBody=function(e){if(e.t!=="shows")return _hwBodySh(e);const s=(S.shows||[]).slice(0,e.sz>2?4:e.sz>1?3:1);return s.length?`<div class="hwml">${s.map(t=>`<div class="hwm"><span class="tn" style="text-align:start">${behind(t)?`<b style="color:#ff5d5d;font-size:1.2vh">${esc(L("shNew"))}</b> `:""}${esc(t.name||t.q)}</span><b style="font-size:1.6vh">${t.last?esc(epTag(t.last)):t.mine?esc(L("shEp"))+" "+t.mine.number:"—"}</b></div>`).join("")}</div>`:`<div class="hwico">🎬</div><div class="hwsub dim">${esc(L("shNone"))}</div>`},activators.unshift(e=>{if(!e.dataset||!e.dataset.hw)return!1;const s=hwGet(e.dataset.hw);return!s||s.t!=="shows"?!1:(showsMenu(),!0)});function showsMenu(){const e=S.shows||[];dialog("🎬 "+L("hwShows"),e.map((s,t)=>({icon:behind(s)?"🔴":"🎬",label:`${s.name||s.q} — ${s.last?L("shLast")+" "+epTag(s.last):""}${s.mine?" · "+L("shMine")+" "+epTag(s.mine):""}`,fn:()=>setTimeout(()=>showMenu(t),30)})).concat([{icon:"＋",label:L("shAdd"),pri:1,fn:()=>setTimeout(showAdd,30)}]))}function showAdd(){prompt2(L("shName"),"",e=>h(this,null,function*(){if(!e)return;let s={q:e,mine:null};s=yield showFetch(s),s.manual&&A.toast(L("shManual")),dialog(L("shApp"),visibleApps().slice(0,50).map(t=>({label:appName(t),fn:()=>{s.app=t.pkg,S.shows=(S.shows||[]).concat([s]),hwHas("shows")?renderHW():hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}]))}})))}))}function showMenu(e){const s=(S.shows||[]).map(o=>Object.assign({},o)),t=s[e];if(!t)return;const a=()=>{S.shows=s,renderHW(),setTimeout(()=>showMenu(e),30)},n=o=>{let l=t.mine||(t.last?{season:t.last.season,number:0}:{season:1,number:0});l={season:l.season,number:Math.max(0,l.number+o)},t.mine=l,a()},i=t.app&&byPkg(t.app);dialog(`🎬 ${t.name||t.q}`,[{icon:"▶",label:L("shOpen")+(i?" "+appName(i):""),pri:1,fn:()=>{i&&launch(i.pkg)}},{icon:"✓",label:L("shWatched")+(t.mine?` (${L("shEp")} ${t.mine.number+1})`:""),keep:1,fn:()=>n(1)},{icon:"↩",label:L("shBack"),keep:1,fn:()=>n(-1)},{icon:"📱",label:L("shApp"),fn:()=>setTimeout(()=>dialog(L("shApp"),visibleApps().slice(0,50).map(o=>({label:appName(o),fn:()=>{t.app=o.pkg,S.shows=s}}))),30)},{icon:"🗑",label:L("shRemove"),fn:()=>{s.splice(e,1),S.shows=s,renderHW()}},{label:L("done"),fn:()=>{}}],{sub:`${t.last?L("shLast")+": "+epTag(t.last)+" ("+t.last.date+")":L("shManual")}${t.next?" · "+L("shNext")+": "+epTag(t.next)+" ("+t.next.date+")":""}${t.mine?" · "+L("shMine")+" "+epTag(t.mine):""}`})}setTimeout(()=>showsRefresh(!1),12e3),setInterval(()=>showsRefresh(!1),36e5),Object.assign(T.ar,{shSrc:"المسلسل ده بيتعرض فين؟",shYt:"▶️ يوتيوب (لينك القناة أو قايمة الحلقات)",shApp2:"📱 تطبيق تاني (الأسطورة، أوسكار…)",shYtLink:"الصق لينك قايمة حلقات المسلسل أو القناة",shOpenEp:"▶ افتح آخر حلقة"}),Object.assign(T.en,{shSrc:"Where does this show air?",shYt:"▶️ YouTube (channel or episode playlist link)",shApp2:"📱 Another app",shYtLink:"Paste the episode playlist or channel link",shOpenEp:"▶ Open latest episode"});function ytShowFetch(e){return h(this,null,function*(){try{const s=e.ytPl?"playlist_id="+e.ytPl:"channel_id="+e.ytCh,t=yield A.fetchText("https://www.youtube.com/feeds/videos.xml?"+s),a=new DOMParser().parseFromString(t,"text/xml"),n=a.getElementsByTagName("entry")[0];if(n){const i=c=>{const r=n.getElementsByTagName(c)[0];return r?r.textContent:""},o=i("title"),l=(o.match(/(?:الحلقة|حلقة|ep(?:isode)?\.?)\s*(\d+)/i)||o.match(/(\d+)\s*$/)||[])[1];e.last={season:1,number:l?+l:0,date:(i("published")||"").slice(0,10),title:o,v:i("yt:videoId")}}e.at=Date.now(),e.manual=!1}catch(s){e.at=Date.now()}return e})}const _showFetchY=showFetch;showFetch=function(e){return h(this,null,function*(){return e.ytPl||e.ytCh?ytShowFetch(e):_showFetchY(e)})},showAdd=function(){prompt2(L("shName"),"",e=>{e&&dialog(L("shSrc"),[{icon:"▶️",label:L("shYt"),pri:1,fn:()=>setTimeout(()=>prompt2(L("shYtLink"),"",s=>h(this,null,function*(){if(!s)return;const t={q:e,name:e,mine:null},a=s.match(/[?&]list=([\w-]+)/);if(a)t.ytPl=a[1];else try{const n=yield ytResolve(s);n&&(t.ytCh=n.id)}catch(n){}if(!t.ytPl&&!t.ytCh)return A.toast(L("ytBad"));t.app=["com.google.android.youtube.tv","com.liskovsoft.smarttubetv","com.google.android.youtube"].find(n=>A.isInstalled(n))||"",yield ytShowFetch(t),S.shows=(S.shows||[]).concat([t]),hwHas("shows")?renderHW():hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}]))}),"https://youtube.com/playlist?list=…"),30)},{icon:"📱",label:L("shApp2"),fn:()=>setTimeout(()=>h(this,null,function*(){let s={q:e,mine:null};s=yield _showFetchY(s),s.manual&&A.toast(L("shManual")),dialog(L("shApp"),visibleApps().slice(0,50).map(t=>({label:appName(t),fn:()=>{s.app=t.pkg,S.shows=(S.shows||[]).concat([s]),hwHas("shows")?renderHW():hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}]))}})))}),30)}])})};const _showMenuY=showMenu;showMenu=function(e){_showMenuY(e);const s=(S.shows||[])[e];if(!s||!s.last||!s.last.v)return;const t=$("dbox"),a=t._items,n=t.querySelector(".mgrid,.dlist");!a||!n||(a.unshift({icon:"▶",label:L("shOpenEp")+(s.last.title?": "+s.last.title.slice(0,40):""),pri:1,fn:()=>openYt(s.last.v)}),n.innerHTML=a.map((i,o)=>`<button class="btn f${i.pri?" pri":""}" data-di="${o}">${i.icon?`<b>${esc(i.icon)}</b>`:""}${esc(i.label)}</button>`).join(""),focus(n.querySelector(".f")))},Object.assign(T.ar,{sh2Find:"بدوّر…",sh2Pick:"اختار المسلسل",sh2Typed:"✍️ استخدم الاسم زي ما كتبته",sh2Days:"بيتعرض إمتى؟",sh2Daily:"كل يوم",sh2Week5:"من السبت للأربع (5 أيام)",sh2Wk5b:"من الأحد للخميس",sh2Weekly:"مرة في الأسبوع",sh2LastEp:"آخر حلقة نزلت رقم كام؟",sh2Ep:"الحلقة",sh2Out:"نزلت",sh2Watch:"▶ افتح المسلسل في",sh2Days2:"🗓 أيام العرض",sh2Fix:"✏️ صحّح رقم آخر حلقة"}),Object.assign(T.en,{sh2Find:"Searching…",sh2Pick:"Pick the show",sh2Typed:"✍️ Use the name as typed",sh2Days:"When does it air?",sh2Daily:"Every day",sh2Week5:"Sat–Wed (5 days)",sh2Wk5b:"Sun–Thu",sh2Weekly:"Once a week",sh2LastEp:"Latest aired episode number?",sh2Ep:"Ep",sh2Out:"out",sh2Watch:"▶ Open the show in",sh2Days2:"🗓 Air days",sh2Fix:"✏️ Fix latest episode number"});const VIDEO_APPS=/shahid|watchit|youtube|smarttube|netflix|osn|starz|tod|mbc|yango|vlc|kodi|stc|jawwy|anghami|wavo|weyyak|aflam|tv/i;function showSearch(e){return h(this,null,function*(){const s=[],t={},a=(n,i,o)=>{const l=n.trim();!l||t[l]||(t[l]=1,s.push(Object.assign({name:l,sub:i||""},o||{})))};return yield Promise.all([A.fetchJSON("https://ar.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&srsearch="+encodeURIComponent(e+" مسلسل")).then(n=>{((n.query||{}).search||[]).forEach(i=>{const o=String(i.snippet||"").replace(/<[^>]+>/g,"");/مسلسل/.test(i.title+o)&&a(i.title.replace(/\s*\((مسلسل|مسلسل تلفزيوني)[^)]*\)\s*/,""),(o.match(/(20\d\d)/)||[])[1]||"")})}).catch(()=>{}),A.fetchJSON("https://api.tvmaze.com/search/shows?q="+encodeURIComponent(e)).then(n=>{(n||[]).slice(0,10).forEach(i=>{const o=i.show||{};a(o.name,[(o.premiered||"").slice(0,4),o.status==="Running"?"🟢":""].filter(Boolean).join(" "),{tv:o.id,img:o.image&&o.image.medium||""})})}).catch(()=>{})]),s.sort((n,i)=>(parseInt(i.sub)||0)-(parseInt(n.sub)||0)),s})}const DAYSETS={daily:[0,1,2,3,4,5,6],sw:[6,0,1,2,3],st:[0,1,2,3,4],weekly:null};function airedSince(e){if(!e.days||!e.base)return 0;const s=DAYSETS[e.days];let t=0;const a=new Date(e.base.d);a.setHours(0,0,0,0);const n=new Date;n.setHours(0,0,0,0);for(let i=a.getTime()+864e5;i<=n.getTime();i+=864e5){const o=new Date(i).getDay();(s?s.indexOf(o)>=0:o===e.base.wd)&&t++}return t}function schedLast(e){const s=e.base?e.base.n+airedSince(e):0;return s?{season:1,number:s,date:new Date().toISOString().slice(0,10)}:null}const _showFetch2=showFetch;showFetch=function(e){return h(this,null,function*(){if(e.days)return e.last=schedLast(e),e.manual=!1,e.at=Date.now(),e;if(e.tv)try{const s=yield A.fetchJSON("https://api.tvmaze.com/shows/"+e.tv+"?embed[]=previousepisode&embed[]=nextepisode"),t=s._embedded||{},a=t.previousepisode,n=t.nextepisode;return Object.assign(e,{img:s.image&&s.image.medium||e.img||"",last:a?{season:a.season,number:a.number,date:a.airdate}:null,next:n?{season:n.season,number:n.number,date:n.airdate}:null,at:Date.now(),manual:!1}),e}catch(s){}return _showFetch2(e)})};function pickApp(e){const s=visibleApps().slice().sort((t,a)=>(VIDEO_APPS.test(a.pkg+appName(a))?1:0)-(VIDEO_APPS.test(t.pkg+appName(t))?1:0));dialog(L("shApp"),s.slice(0,40).map(t=>({label:appName(t),fn:()=>e(t.pkg)})),{grid:3})}function pickDays(e){dialog(L("sh2Days"),[["daily","sh2Daily"],["sw","sh2Week5"],["st","sh2Wk5b"],["weekly","sh2Weekly"]].map(([s,t])=>({label:L(t),fn:()=>e(s)})))}function saveNewShow(e){S.shows=(S.shows||[]).concat([e]),hwHas("shows")?renderHW():hwSave(hwList().concat([{id:"shows",t:"shows",sz:2,st:"glass"}])),A.toast("🎬 "+e.name)}showAdd=function(){prompt2(L("shName"),"",e=>h(this,null,function*(){if(!e)return;A.toast(L("sh2Find"));const s=yield showSearch(e),t=a=>setTimeout(()=>{const n={q:a.name,name:a.name,tv:a.tv||null,img:a.img||"",mine:null};pickApp(i=>{n.app=i,setTimeout(()=>h(this,null,function*(){if(n.tv&&(yield showFetch(n),n.last))return saveNewShow(n);pickDays(o=>setTimeout(()=>prompt2(L("sh2LastEp"),"",l=>{const c=new Date;n.days=o,n.base={n:Math.max(0,parseInt(l)||0),d:c.toISOString(),wd:c.getDay()},n.tv=null,n.last=schedLast(n),n.mine=n.last?{season:1,number:n.last.number}:null,saveNewShow(n)},"12"),30))}),60)})},30);dialog(L("sh2Pick"),s.slice(0,14).map(a=>({icon:a.img?"📺":"🎬",label:a.name+(a.sub?"  ·  "+a.sub:""),fn:()=>t(a)})).concat([{icon:"✍️",label:L("sh2Typed")+": "+e,fn:()=>t({name:e})}]))}))};const _showMenu2=showMenu;showMenu=function(e){_showMenu2(e);const s=(S.shows||[])[e];if(!s)return;const t=$("dbox"),a=t._items,n=t.querySelector(".mgrid,.dlist");if(!a||!n)return;const i=s.app&&byPkg(s.app);if(i&&!(s.last&&s.last.v)){const o=a.findIndex(c=>c.icon==="▶"),l={icon:"▶",label:L("sh2Watch")+" "+appName(i),pri:1,fn:()=>{nat("searchInApp",i.pkg,s.name||s.q)||launch(i.pkg)}};o>=0?a[o]=l:a.unshift(l)}s.days&&a.splice(a.length-1,0,{icon:"✏️",label:L("sh2Fix"),fn:()=>setTimeout(()=>prompt2(L("sh2LastEp"),String(s.last?s.last.number:""),o=>{const l=(S.shows||[]).map(r=>Object.assign({},r)),c=new Date;l[e].base={n:Math.max(0,parseInt(o)||0),d:c.toISOString(),wd:c.getDay()},l[e].last=schedLast(l[e]),S.shows=l,renderHW()}),30)},{icon:"🗓",label:L("sh2Days2"),fn:()=>setTimeout(()=>pickDays(o=>{const l=(S.shows||[]).map(c=>Object.assign({},c));l[e].days=o,l[e].last=schedLast(l[e]),S.shows=l,renderHW()}),30)}),n.innerHTML=a.map((o,l)=>`<button class="btn f${o.pri?" pri":""}" data-di="${l}">${o.icon?`<b>${esc(o.icon)}</b>`:""}${esc(o.label)}</button>`).join(""),focus(n.querySelector(".f"))};const _hwBodySh2=hwBody;hwBody=function(e){if(e.t==="shows"){const s=S.shows||[];let t=!1;s.forEach(a=>{if(a.days){const n=schedLast(a);JSON.stringify(n&&n.number)!==JSON.stringify(a.last&&a.last.number)&&(a.last=n,t=!0)}}),t&&(S.shows=s)}return _hwBodySh2(e)};

;
/* daily.js */
Object.assign(T.ar,{gmTitle:"صباح الخير ☀️",gmEve:"مساء الخير 🌙",gmMatches:"ماتشات النهارده",gmNew:"حلقات جديدة",gmNone:"مفيش جديد",gmPrayer:"الصلاة الجاية",shSave:"تحفظ اللينك ده في مسلسل؟",shLink:"▶ افتح آخر لينك اتبعت",shSaved:"اتحفظ في",guest:"وضع الضيوف",guestOn:"👥 وضع الضيوف شغال — الحاجات الشخصية مستخبية",guestOff:"رجعت للوضع العادي"}),Object.assign(T.en,{gmTitle:"Good morning ☀️",gmEve:"Good evening 🌙",gmMatches:"Today's matches",gmNew:"New episodes",gmNone:"Nothing new",gmPrayer:"Next prayer",shSave:"Save this link to a show?",shLink:"▶ Open the last link sent",shSaved:"Saved to",guest:"Guest mode",guestOn:"👥 Guest mode on — personal items hidden",guestOff:"Back to normal"});function greet(){const e=new Date,t=e.toDateString();if(S.greetDay===t||e.getHours()<5||on("dlg")||on("player")||S.guest)return;S.greetDay=t;const s=[];typeof weatherNow<"u"&&weatherNow&&s.push(`${weatherNow.i} ${weatherNow.t}° ${weatherNow.city||""}`);const n=S.prayerOn&&window.nextPrayer&&typeof prayers<"u"&&prayers.length?nextPrayer():null;n&&s.push(`🕌 ${L("gmPrayer")}: ${L("prayers")[n.i]} ${fmtTime(n.t)}`);const i=(typeof matches<"u"?matches:[]).filter(r=>evState(r)!=="ft");i.length&&s.push(`⚽ ${L("gmMatches")}: `+i.slice(0,3).map(r=>`${r.strHomeTeam}×${r.strAwayTeam} ${fmtTime(evTime(r))}`).join(" · "));const o=(S.shows||[]).filter(r=>typeof behind=="function"&&behind(r));s.push(`🎬 ${L("gmNew")}: `+(o.length?o.map(r=>r.name||r.q).join("، "):L("gmNone"))),dialog(e.getHours()<15?L("gmTitle"):L("gmEve"),[{label:"👍",pri:1,fn:()=>{}}],{sub:s.join(`
`)});const a=$("dbox");setTimeout(()=>{on("dlg")&&$("dbox")===a&&a.textContent.indexOf(L(e.getHours()<15?"gmTitle":"gmEve"))>=0&&closeDialog()},7e3)}document.addEventListener("keydown",()=>{document.querySelector("#home.on")&&setTimeout(greet,300)},!0),setTimeout(greet,15e3);const _remoteCmdD=remoteCmd;remoteCmd=function(e){const t=_remoteCmdD.apply(this,arguments);if(e&&e.cmd==="share"&&(S.shows||[]).length){const s=String(e.u||"");setTimeout(()=>{on("player")||dialog("🎬 "+L("shSave"),(S.shows||[]).map((n,i)=>({label:n.name||n.q,fn:()=>{const o=(S.shows||[]).map(a=>Object.assign({},a));o[i].link=s,S.shows=o,banner("🎬",L("shSaved")+" "+(n.name||n.q),"",3e3)}})).concat([{label:L("cancel"),fn:()=>{}}]))},1500)}return e&&e.cmd==="voice"?(window.onVoice&&onVoice(String(e.t||"")),{ok:1}):e&&e.cmd==="guest"?(setGuest(!S.guest),{ok:1,guest:!!S.guest}):t};const _showMenuL=showMenu;showMenu=function(e){_showMenuL(e);const t=(S.shows||[])[e];if(!t||!t.link)return;const s=$("dbox"),n=s._items,i=s.querySelector(".mgrid,.dlist");!n||!i||(n.unshift({icon:"🔗",label:L("shLink"),pri:1,fn:()=>{const o=t.link.match(/(?:youtu\.be\/|v=|shorts\/|live\/)([\w-]{11})/);o&&window.openYt?openYt(o[1]):nat("openUri",t.link)}}),i.innerHTML=n.map((o,a)=>`<button class="btn f${o.pri?" pri":""}" data-di="${a}">${o.icon?`<b>${esc(o.icon)}</b>`:""}${esc(o.label)}</button>`).join(""),focus(i.querySelector(".f")))};const VOICE_MAP=[[/^(علي|علّي|ارفع|زود)\s*الصوت/,"vol+"],[/^(وطي|وطّي|قلل|نزل)\s*الصوت/,"vol-"],[/^(الرئيسية|روح الرئيسية|home)$/i,"home"],[/^(رجوع|ارجع|back)$/i,"back"]],_onVoiceD=window.onVoice;window.onVoice=e=>{const t=String(e||"").trim();for(const[s,n]of VOICE_MAP)if(s.test(t)){try{tgCmd(n)}catch(i){}banner("🎙",t,"✓",2500);return}if(/(سرّع|سرع|تسريع|نضف|نضّف)/.test(t)){boostNow();return}if(/(اقفل الصوت|كتم|mute)/i.test(t)){try{A.volume("mute")}catch(s){}banner("🔇",t,"",2e3);return}if(/^(شغل|شغّل|افتح)?\s*(القرآن|القران|إذاعة القرآن|اذاعة القران)/.test(t)){showPage("lib"),libCat="radio",renderLib();return}if(/(وضع الضيوف|guest)/i.test(t)){setGuest(!S.guest);return}if(/(وضع السينما|سينما|cinema)/i.test(t)){toggleCinema();return}return _onVoiceD(e)};function setGuest(e){const t=()=>{S.guest=e,document.body.classList.toggle("guest",!!e),banner("👥",L(e?"guestOn":"guestOff"),"",3e3),renderHome(),typeof renderPager=="function"&&renderPager()};!e&&S.pin?guard(!0,t):t()}document.body.classList.toggle("guest",!!S.guest);const _renderPagerG=renderPager;renderPager=function(){_renderPagerG();const e=$("homePager");if(!e)return;let t=$("railGuest");if(!t){const s=$("railBoost"),n=`<button class="rb f" id="railGuest"><b>👥</b><span>${esc(L("guest"))}</span></button>`;s?s.insertAdjacentHTML("beforebegin",n):e.insertAdjacentHTML("beforeend",n),t=$("railGuest")}t.classList.toggle("on",!!S.guest)},activators.unshift(e=>e.id==="railGuest"?(setGuest(!S.guest),!0):!1);try{const e=nat("getPref","hw");if(e){const t=JSON.parse(e);Array.isArray(t)&&t.length&&JSON.stringify(t)!==JSON.stringify(S.hw)&&(S.hw=t)}}catch(e){}

;
/* speed.js */
Object.assign(DEF,{fastMode:!0,autoCloseApps:!0,fastSnap:null}),Object.assign(T.ar,{fmTitle:"⚡ وضع اللانشر",fmFast:"⚡ لانشر سريع",fmNormal:"🎨 اللانشر المعتاد",fmSub:"السريع بيقفل كل حاجة بتتقّل الجهاز. المعتاد بيرجّع اختياراتك زي ما كانت.",fmHeavy:"الحاجات اللي بتتقّل (اقفل اللي مش محتاجه)",fmAuto:"اقفل أي تطبيق أول ما أرجع للرئيسية (الإعدادات والداتا بتاعته بتفضل)",hvAnim:"خلفية متحركة",hvLive:"خلفية لايف",hvPrev:"معاينة القنوات وانت بتتنقل",hvCheck:"فحص القنوات التلقائي",hvTicker:"شريط الأخبار والماتشات تحت",hvLite:"الضباب والظلال"}),Object.assign(T.en,{fmTitle:"⚡ Launcher mode",fmFast:"⚡ Fast launcher",fmNormal:"🎨 Usual launcher",fmSub:"Fast turns off everything heavy. Usual brings your choices back.",fmHeavy:"Heavy features (turn off what you don't need)",fmAuto:"Close any app when I return Home (its settings and data stay)",hvAnim:"Animated background",hvLive:"Live wallpaper",hvPrev:"Channel preview while browsing",hvCheck:"Auto channel check",hvTicker:"Bottom ticker",hvLite:"Blur & shadows"});const HEAVY=[["anim","hvAnim","off"],["liveWall","hvLive",!1],["preview","hvPrev",!1],["autoCheck","hvCheck",!1],["lite","hvLite",!0]];function setFast(e){if(e){const t={};HEAVY.forEach(([n,,s])=>{t[n]=S[n],S[n]=s}),(!S.fastMode||!S.fastSnap)&&(S.fastSnap=t)}else{const t=S.fastSnap||{};HEAVY.forEach(([n])=>{n in t&&(S[n]=t[n])}),S.fastSnap=null}S.fastMode=!!e,S.perfChosen=!0;try{applyLook(),typeof updateTicker=="function"&&updateTicker(),typeof pvStop=="function"&&e&&pvStop()}catch(t){}}S.tickFix||(S.tickFix=!0,S.tickerOn=!0,S.prayerOn=!0,S.sportsOn=!0),S.fastSeeded||(S.fastSeeded=!0,S.fastMode&&setFast(!0));function fastSection(){const e=(n,s)=>`<button class="btn f${s?" pri":""}" data-fm="${n}">${esc(L(n==="1"?"fmFast":"fmNormal"))}</button>`,t=HEAVY.map(([n,s,a])=>{const i=String(S[n])===String(a);return`<div class="field"><label>${esc(L(s))}</label><div class="inline"><button class="btn f${i?"":" pri"}" data-hv="${n}:on">${esc(L("on"))}</button><button class="btn f${i?" pri":""}" data-hv="${n}:off">${esc(L("off"))} ⛔</button></div></div>`}).join("");return`<div class="sec" id="fastSec"><h3>${esc(L("fmTitle"))}</h3><div class="field"><label>${esc(L("fmSub"))}</label><div class="inline">${e("1",S.fastMode)}${e("0",!S.fastMode)}</div></div>
    <div class="field"><label>${esc(L("fmAuto"))}</label><div class="inline"><button class="btn f${S.autoCloseApps?" pri":""}" data-hv="autoCloseApps:on">${esc(L("on"))}</button><button class="btn f${S.autoCloseApps?"":" pri"}" data-hv="autoCloseApps:off">${esc(L("off"))}</button></div></div>
    <h3 style="margin-top:2vh">${esc(L("fmHeavy"))}</h3>${t}</div>`}activators.unshift(e=>{const t=e.dataset||{};if(t.fm!=null){setFast(t.fm==="1"),renderSettings();const n=document.querySelector(`[data-fm="${t.fm}"]`);return n&&focus(n),!0}if(t.hv){const[n,s]=t.hv.split(":");if(n==="autoCloseApps")S.autoCloseApps=s==="on";else{const i=HEAVY.find(r=>r[0]===n);s==="off"?S[n]=i[2]:S[n]=n==="anim"?"auto":n!=="lite",S.perfChosen=!0;try{applyLook(),typeof updateTicker=="function"&&updateTicker()}catch(r){}}renderSettings();const a=document.querySelector(`[data-hv="${t.hv}"]`);return a&&focus(a),!0}return!1});const _onBgF=window.onBg;window.onBg=function(e){if(_onBgF(e),!e&&S.autoCloseApps&&typeof openedApps<"u"&&openedApps.length){const t=openedApps.slice();setTimeout(()=>{window.__bg||t.forEach(n=>{try{closeOne(n)}catch(s){}})},1500)}};const SET_GROUPS=[["⚡ السرعة","⚡ Speed",["وضع اللانشر","واجهة بسيطة","خلفية متحركة","Launcher mode","Simple","Animated"]],["🎨 الشكل والرئيسية","🎨 Look & Home",["الشكل","شكل أيقونات","ترتيب الرئيسية","المواسم","Look","icon","Arrange","season"]],["🕌 الصلاة والتاريخ","🕌 Prayer & date",["الموقع","مواقيت الصلاة","الهجري","Location","Prayer","Hijri"]],["⚽ الماتشات","⚽ Matches",["الماتشات","Matches"]],["🖼 البرواز والسكون","🖼 Frame & sleep",["البرواز","قفل تلقائي","Frame","auto"]],["👨‍👩‍👧 العيلة والأمان","👨‍👩‍👧 Family & security",["البروفايلات","الأطفال","القفل والأمان","Profiles","Kids","Lock"]],["📱 التطبيقات والموبايل","📱 Apps & phone",["التطبيقات","الإشعارات","الموبايل","تثبيت اللانشر","Apps","Notif","phone","default"]],["🔄 التحديثات والنسخ","🔄 Updates & backup",["التحديث","نسخة","نسخ احتياطي","Update","Backup","USB"]],["📺 القنوات وحاجات تانية","📺 Channels & more",[]]];function groupSettings(){const e=$("setScroll");if(!e||isKids()||e.querySelector(".sgrp"))return;$("fastSec")||e.insertAdjacentHTML("afterbegin",fastSection());const t=[].slice.call(e.children).filter(a=>a.classList.contains("sec"));if(!t.length)return;const n=S.lang==="ar",s=SET_GROUPS.map(a=>{const i=document.createElement("div");return i.className="sec sgrp",i.innerHTML=`<h3>${esc(n?a[0]:a[1])}</h3>`,i});t.forEach(a=>{const i=a.querySelector("h3"),r=i?i.textContent.trim():"";let c=SET_GROUPS.findIndex(o=>o[2].some(d=>r.toLowerCase().indexOf(d.toLowerCase())>=0));if(c<0&&(c=SET_GROUPS.length-1),i){const o=document.createElement("h4");o.className="ssub",o.textContent=r,i.parentNode.replaceChild(o,i)}for(;a.firstChild;)s[c].appendChild(a.firstChild);a.parentNode.removeChild(a)}),s.forEach(a=>{a.children.length>1&&e.appendChild(a)})}Object.assign(T.ar,{nowNext:"الجاي",nowLeft:"باقي",nowNoM:"مفيش ماتشات النهارده"}),Object.assign(T.en,{nowNext:"Next",nowLeft:"in",nowNoM:"No matches today"});function heroMatch(){if(typeof matches>"u"||!matches.length)return null;const e=s=>teamFav(s)?0:1,t=matches.filter(s=>evState(s)==="live").sort((s,a)=>e(s)-e(a));if(t.length)return{e:t[0],live:!0};const n=matches.filter(s=>evState(s)==="ns").sort((s,a)=>e(s)-e(a)||evTime(s)-evTime(a));return n.length?{e:n[0],live:!1}:null}if(hwBody=function(e){return function(t){if(t.t!=="hero")return e(t);const n=new Date,s=S.prayerOn&&window.nextPrayer&&typeof prayers<"u"&&prayers.length?nextPrayer():null,a=heroMatch(),i=typeof weatherNow<"u"&&weatherNow,r=(o,d,l,f,u)=>`<div class="nowc ${o}"><div class="nowi">${d}</div><div><div class="nowt">${l}</div><div class="nowm">${f}</div>${u?`<div class="nows">${u}</div>`:""}</div></div>`;let c="";if(a){const o=a.e;c+=a.live?r("live","⚽",`● ${esc(L("live"))}`,`${esc(o.strHomeTeam)} <b>${esc(String(o.intHomeScore||0))} - ${esc(String(o.intAwayScore||0))}</b> ${esc(o.strAwayTeam)}`,""):r("","⚽",esc(L("nowNext")),`${esc(o.strHomeTeam)} × ${esc(o.strAwayTeam)}`,esc(fmtTime(new Date(evTime(o))))+" · "+esc(L("nowLeft"))+" "+esc(fmtLeft(evTime(o)-Date.now())))}return s&&(c+=r("","🕌",esc(L("prayers")[s.i]),esc(fmtTime(s.t)),esc(L("nowLeft"))+" "+esc(fmtLeft(s.t-Date.now())))),i&&(c+=r("","",esc(i.city||S.city||""),`${esc(i.i)} ${esc(i.t)}°`,"")),`<div class="herobox nowbox"><div class="nowclk"><div class="hbig">${esc(fmtTime(n))}</div><div class="hsub">${esc(fmtDate(n))}</div></div><div class="nowcards">${c}</div></div>`}}(hwBody),!S.finalHome1){S.finalHome1=!0;const e=hwList().filter(t=>t.t!=="prayer"&&t.t!=="mon");e.length!==hwList().length&&setTimeout(()=>hwSave(e),0)}Object.assign(T.ar,{lastApp:"آخر تطبيق",numHint:"أرقام الريموت بتفتح المفضلة بالترتيب (1 = الأولى)",nightSleep:"😴 الشاشة هتنام (مفيش استخدام بالليل)",nightClean:"🧹 تنضيف الليل"}),Object.assign(T.en,{lastApp:"Last app",numHint:"Remote digits open favorites in order",nightSleep:"😴 Sleeping (no use at night)",nightClean:"🧹 Night clean"});const _renderPagerL=renderPager;renderPager=function(){_renderPagerL();const e=$("homePager");!e||$("railLast")||e.insertAdjacentHTML("beforeend",`<button class="rb f" id="railLast"><b>↩</b><span>${esc(L("lastApp"))}</span></button>`)};const lastPkg=()=>typeof openedApps<"u"&&openedApps[0]||S.lastPkg||"",_launchL=launch;launch=function(e){return e&&(S.lastPkg=e),_launchL.apply(this,arguments)},activators.unshift(e=>{if(e.id==="railLast"){const t=lastPkg();return t?launch(t):A.toast("—"),!0}return!1}),keyHooks.unshift(e=>{const t=e.key;if(!/^[1-9]$/.test(t)||!document.querySelector("#home.on")||on("dlg")||on("player")||document.activeElement&&document.activeElement.tagName==="INPUT")return!1;const n=(S.favs||[])[+t-1];return n&&byPkg(n)?(launch(n),!0):!1}),setInterval(()=>{if(typeof matches>"u"||!matches.length)return;const e=Object.assign({},S.matchAlerts||{});let t=!1;if(matches.forEach(n=>{if(evState(n)!=="ns"||!teamFav(n)||e[n.idEvent])return;const s=evTime(n);!s||s-Date.now()>24*36e5||(e[n.idEvent]={t:+s,n:`${n.strHomeTeam} × ${n.strAwayTeam} · ${fmtTime(new Date(s))}`},t=!0)}),!S.matchApp){const n=apps.find(s=>/yacine|koora|yalla|ssc|beinsports/i.test(s.pkg+s.name));n&&(S.matchApp=n.pkg)}t&&(S.matchAlerts=e)},6e4);let nightDone="";setInterval(()=>{const e=new Date().getHours(),t=new Date().toDateString();if(!window.__bg&&e>=1&&e<6&&!on("player")&&Date.now()-idleAt>20*6e4&&!$("blackout").classList.contains("on")&&(banner("😴",L("nightSleep"),"",3e3),setTimeout(()=>{nat("sleepNow")||$("blackout").classList.add("on")},3e3)),e===4&&nightDone!==t&&Date.now()-idleAt>30*6e4&&!on("player")){nightDone=t;try{autoClean(!0)}catch(n){}}},6e4);const _onBgL=window.onBg;window.onBg=function(e){if(_onBgL(e),e)return;const t=lastPkg();t&&setTimeout(()=>{if(window.__bg||!document.querySelector("#home.on")||on("dlg"))return;const n=document.querySelector(`#home [data-pkg="${cssq(t)}"]`);n&&focus(n)},350)};const _applyLookLx=applyLook;applyLook=function(){_applyLookLx.apply(this,arguments)},setTimeout(()=>applyLook(),0),S.finalHome2||setTimeout(()=>{S.finalHome2=!0;const e=hwList().filter(t=>t.t!=="prayer"&&t.t!=="mon");e.length!==hwList().length&&hwSave(e)},5e3),Object.assign(DEF,{skin:"lux"});const SKINS=[["lux","⭐","ثيمي","My theme","linear-gradient(135deg,#2a4a8c,#070f2a)","#e9c46a"],["atv","🍎","أبل TV","Apple TV","linear-gradient(135deg,#3a3a3c,#0b0b0c)","#ffffff"],["gtv","🔵","جوجل TV","Google TV","linear-gradient(135deg,#2d2e31,#1f1f1f)","#8ab4f8"],["fire","🔥","فاير TV","Fire TV","linear-gradient(135deg,#232f3e,#0f1111)","#ff9900"],["netflix","🎬","نتفليكس","Netflix","linear-gradient(135deg,#221f1f,#000)","#e50914"]];["neon","light","islam","cinema"].indexOf(S.skin)>=0&&(S.skin=S.skin==="cinema"?"netflix":"lux");function applySkin(){document.body.dataset.skin=S.skin||"lux",document.body.classList.toggle("luxbg",(S.skin||"lux")==="lux"&&!S.wallImg)}applyLook=function(e){return function(){e.apply(this,arguments),applySkin()}}(applyLook),setTimeout(applySkin,0);function skinPicker(){const e=S.lang==="ar";return`<div class="sec" id="skinSec"><h3>🎨 ${e?"الثيم":"Theme"}</h3><div class="skgrid">${SKINS.map(t=>`<button class="skin f${(S.skin||"lux")===t[0]?" pri":""}" data-skin="${t[0]}"><i style="background:${t[4]}"><em style="background:${t[5]}"></em></i><span>${t[1]} ${esc(e?t[2]:t[3])}</span></button>`).join("")}</div></div>`}activators.unshift(e=>{if(e.dataset&&e.dataset.skin){S.skin=e.dataset.skin,S.theme="apple",S.wall="dynamic",S.wallImg="",applyLook(),renderSettings();const t=document.querySelector(`[data-skin="${S.skin}"]`);return t&&focus(t),!0}return!1});const DROP=/^(🧩 التصميم|🎨 الألوان|حجم الكروت|شكل الساعة|الأداء|تجهيز الجهاز|متصفح النظام|شكل أيقونات التطبيقات|حركة التحديد|اختار جزء|🧩 Design|🎨 Colors|Card size|Clock style|Performance|App icon look|Focus effect|Pick a part)/;groupSettings=function(e){return function(){const t=$("setScroll");if(t&&!t.querySelector(".sgrp")&&!isKids()){[].slice.call(t.querySelectorAll(".field")).forEach(s=>{const a=s.querySelector("label");a&&DROP.test(a.textContent.trim())&&s.parentNode.removeChild(s)}),[].slice.call(t.querySelectorAll(".sec")).forEach(s=>{const a=s.querySelector("h3");a&&/مواسم|Seasonal|ترتيب الرئيسية|Arrange home|شكل أيقونات|App icon look/.test(a.textContent)&&s.parentNode.removeChild(s)});const n=[].slice.call(t.querySelectorAll(".sec")).find(s=>{const a=s.querySelector("h3");return a&&/^(الشكل|Look)$/.test(a.textContent.trim())});n&&n.insertAdjacentHTML("beforebegin",skinPicker())}return e()}}(groupSettings),SET_GROUPS[1][2].push("الثيم","Theme");const _applySkinT=applySkin;applySkin=function(){const e=document.body.dataset.skin;_applySkinT(),e&&e!==document.body.dataset.skin&&typeof renderHome=="function"&&renderHome()},hwBody=function(e){return function(t){if(t.t!=="hero")return e(t);let n=e(t);const s=L("prayers"),a=window.nextPrayer&&typeof prayers<"u"&&prayers.length?nextPrayer():null,i=typeof prayers<"u"&&prayers.length?`<div class="npr">${prayers.map((l,f)=>f===1?"":`<div class="${a&&a.i===f?"on":""}"><span>${esc(s[f])}</span><b>${esc(fmtTime(l).replace(/\s*[صمAPap][Mm]?$/,""))}</b>${a&&a.i===f?`<small>${esc(fmtLeft(a.t-Date.now()))}</small>`:""}</div>`).join("")}</div>`:"",r=typeof weatherNow<"u"&&weatherNow,c=typeof forecast<"u"&&forecast||[],o=r?`<div class="nwx"><div class="now"><b>${esc(r.i)} ${esc(r.t)}°</b><span>${esc(r.city||"")}</span></div>${c.slice(1,4).map(l=>`<div class="day"><span>${esc(l.d.toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"short"}))}</span><b>${esc(WMO(l.c))}</b><span>${l.hi}°/${l.lo}°</span></div>`).join("")}</div>`:"",d=(n.match(/<div class="nowc[^"]*"><div class="nowi">⚽[\s\S]*?<\/div><\/div><\/div>/)||[""])[0];return`<div class="herobox nowbox">${i}${o}<div class="nowcards">${d}</div></div>`}}(hwBody);

;
/* w2.js */
var m=(s,t,a)=>new Promise((e,n)=>{var r=c=>{try{o(a.next(c))}catch(l){n(l)}},i=c=>{try{o(a.throw(c))}catch(l){n(l)}},o=c=>c.done?e(c.value):Promise.resolve(c.value).then(r,i);o((a=a.apply(s,t)).next())});Object.assign(T.ar,{w_wk:"ماتشات فرقك الأسبوع ده",w_fx:"الدولار والدهب",w_tas:"عدّاد تسبيح",w_ch:"قنواتي المفضلة",w_alarm:"منبّه / تذكير",w_ims:"إمساكية رمضان",w_radio:"راديو",w_news:"آخر الأخبار",w_new:"جديد المنصات النهارده",w_speed:"سرعة النت",w_album:"ألبوم صوري",w_kids:"وقت الأطفال",w_occ:"مناسبات العيلة",w_table:"جدول الدوري",w_air:"جودة الهوا والبحر",w_load:"بيحمّل…",w_none:"مفيش حاجة دلوقتي",w_ok:"OK",w_reset:"صفّر",w_testNow:"اضغط OK عشان تقيس",w_testing:"بيقيس…",w_addAlarm:"＋ تذكير جديد",w_after:"بعد كام دقيقة؟",w_what:"تفكير بإيه؟",w_addOcc:"＋ مناسبة جديدة",w_occName:"اسم المناسبة (مثلاً: عيد ميلاد أحمد)",w_occDate:"التاريخ (يوم/شهر) مثلاً 15/3",w_days:"يوم",w_today:"النهارده 🎉",w_noFavCh:"ضيف قنوات للمفضلة من صفحة القنوات",w_noPics:"ابعت صور من الموبايل (تاب صور وروابط → للبرواز)",w_left:"باقي",w_min:"دقيقة",w_noLimit:"مفيش حد للأطفال",w_imsak:"الإمساك",w_iftar:"الإفطار",w_toRam:"على رمضان",w_waves:"الموج",w_aqi:"الهوا",w_good:"كويس",w_mid:"متوسط",w_bad:"وحش",w_gold21:"دهب عيار 21",w_league:"اختار الدوري",w_remove:"🗑 امسح"}),Object.assign(T.en,{w_wk:"Your teams this week",w_fx:"Dollar & gold",w_tas:"Tasbih counter",w_ch:"My channels",w_alarm:"Reminder",w_ims:"Ramadan times",w_radio:"Radio",w_news:"Latest news",w_new:"New on streaming today",w_speed:"Internet speed",w_album:"My photos",w_kids:"Kids time",w_occ:"Family dates",w_table:"League table",w_air:"Air & sea",w_load:"Loading…",w_none:"Nothing right now",w_ok:"OK",w_reset:"Reset",w_testNow:"Press OK to test",w_testing:"Testing…",w_addAlarm:"＋ New reminder",w_after:"In how many minutes?",w_what:"Remind me about?",w_addOcc:"＋ New date",w_occName:"Name (e.g. Ahmed's birthday)",w_occDate:"Date (day/month) e.g. 15/3",w_days:"days",w_today:"Today 🎉",w_noFavCh:"Add favorite channels from the TV page",w_noPics:"Send photos from your phone (Photos tab → frame)",w_left:"left",w_min:"min",w_noLimit:"No kids limit",w_imsak:"Imsak",w_iftar:"Iftar",w_toRam:"to Ramadan",w_waves:"Waves",w_aqi:"Air",w_good:"Good",w_mid:"Fair",w_bad:"Poor",w_gold21:"Gold 21K",w_league:"Pick league",w_remove:"🗑 Remove"}),Object.assign(DEF,{tasbih:0,alarms:[],occasions:[],tableLg:"egy.1"}),HW_TYPES.push(["wk","📅","w_wk"],["fx","💱","w_fx"],["tas","📿","w_tas"],["ch","📺","w_ch"],["alarm","⏰","w_alarm"],["ims","🌙","w_ims"],["radio","🎵","w_radio"],["news","📰","w_news"],["new","🎬","w_new"],["speed","📶","w_speed"],["album","🖼","w_album"],["kids","🧒","w_kids"],["occ","🎂","w_occ"],["table","🏆","w_table"],["air","🌡","w_air"]);const W2={};function w2get(s,t,a){const e=W2[s]||(W2[s]={});return!e.busy&&!window.__bg&&(!e.at||Date.now()-e.at>t)&&(e.busy=!0,Promise.resolve().then(a).then(n=>{e.d=n,e.at=Date.now()},()=>{e.at=Date.now()-t+6e5}).then(()=>{e.busy=!1,renderHW()})),e.d}const rows=(s,t)=>`<div class="hwml">${s.slice(0,t).join("")}</div>`,row=(s,t,a)=>`<div class="hwm"><span class="tn" style="text-align:start">${s}</span>${t!=null?`<b>${t}</b>`:""}${a!=null?`<span class="tn">${a}</span>`:""}</div>`,msg=s=>`<div class="hwsub dim">${esc(s)}</div>`,nOf=s=>s.sz>2?6:s.sz>1?4:2,w2ymd=s=>s.getFullYear()+String(s.getMonth()+1).padStart(2,"0")+String(s.getDate()).padStart(2,"0"),_hwBodyW2=hwBody;hwBody=function(s){try{switch(s.t){case"wk":{const t=w2get("wk",216e5,()=>m(this,null,function*(){const a=new Date,e=new Date(Date.now()+7*864e5),n=[],r=(S.comps&&S.comps.length?S.comps:["egy.1","caf.champions","fifa.worldq.caf","fifa.friendly"]).slice(0,8);for(const o of r)try{((yield A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${o}/scoreboard?dates=${w2ymd(a)}-${w2ymd(e)}`)).events||[]).forEach(l=>{const d=((l.competitions||[])[0]||{}).competitors||[],h=d.find(w=>w.homeAway==="home")||d[0]||{},u=d.find(w=>w.homeAway==="away")||d[1]||{},f={strHomeTeam:(h.team||{}).displayName||"",strAwayTeam:(u.team||{}).displayName||"",t:new Date(l.date).getTime()};teamFav(f)&&f.t>Date.now()-108e5&&n.push(f)})}catch(c){}const i={};return n.filter(o=>{const c=o.strHomeTeam+o.strAwayTeam+o.t;return i[c]?!1:i[c]=1}).sort((o,c)=>o.t-c.t)}));return t?t.length?rows(t.map(a=>`<div class="w2wk"><span>${esc(a.strHomeTeam)} × ${esc(a.strAwayTeam)}</span><small>${esc(new Date(a.t).toLocaleDateString(S.lang==="ar"?"ar-EG":"en-GB",{weekday:"long"})+" · "+fmtTime(new Date(a.t)))}</small></div>`),nOf(s)):msg(L("w_none")):msg(L("w_load"))}case"fx":{const t=w2get("fx",36e5,()=>m(this,null,function*(){const e=yield A.fetchJSON("https://open.er-api.com/v6/latest/USD"),n=e.rates||{};let r=null;try{const i=yield A.fetchJSON("https://api.gold-api.com/price/XAU");i&&i.price&&(r=i.price/31.1035*.875*n.EGP)}catch(i){}return{usd:n.EGP,eur:n.EGP/n.EUR,sar:n.EGP/n.SAR,g:r}}));if(!t)return msg(L("w_load"));const a=e=>e?e.toFixed(2):"—";return rows([row("🇺🇸 USD",a(t.usd)),row("🇸🇦 SAR",a(t.sar)),row("🇪🇺 EUR",a(t.eur)),row("🪙 "+esc(L("w_gold21")),t.g?Math.round(t.g)+" ج":"—")],s.sz>1?4:2)}case"tas":return`<div class="hwbig">${+S.tasbih||0}</div><div class="hwsub">${["سبحان الله","الحمد لله","الله أكبر"][Math.floor((+S.tasbih||0)/33)%3]}</div><div class="hwsub dim">OK +1</div>`;case"ch":{const t=(S.favCh||[]).slice(0,nOf(s)+2);return t.length?`<div class="w2ch">${t.map((a,e)=>`<span>${a.logo?`<img src="${esc(a.logo)}" alt="">`:"📺"}<i>${esc(a.name||"")}</i></span>`).join("")}</div>`:msg(L("w_noFavCh"))}case"alarm":{const t=(S.alarms||[]).filter(a=>a.t>Date.now()).sort((a,e)=>a.t-e.t);return t.length?rows(t.map(a=>row("⏰ "+esc(a.n),esc(fmtTime(new Date(a.t))),esc(L("w_left"))+" "+esc(fmtLeft(a.t-Date.now())))),nOf(s)):`<div class="hwico">⏰</div>${msg(L("w_addAlarm"))}`}case"ims":{if(typeof isRamadan=="function"&&isRamadan()&&typeof prayers<"u"&&prayers.length){const e=new Date(prayers[0].getTime()-6e5);return rows([row("🌙 "+esc(L("w_imsak")),esc(fmtTime(e))),row("🍽️ "+esc(L("w_iftar")),esc(fmtTime(prayers[4])),esc(L("w_left"))+" "+esc(fmtLeft(prayers[4]-Date.now())))],2)}const a=typeof nextEvents=="function"?nextEvents(4).find(e=>e.k==="evRamadan"):null;return`<div class="hwico">🌙</div><div class="hwbig">${a?a.d:"—"}</div><div class="hwsub">${esc(L("w_days"))} ${esc(L("w_toRam"))}</div>`}case"radio":{const t=w2get("radio",864e5,()=>m(this,null,function*(){return((yield A.fetchJSON("https://de1.api.radio-browser.info/json/stations/bycountrycodeexact/EG?order=votes&reverse=true&limit=12&hidebroken=true"))||[]).map(e=>({name:e.name.trim(),url:e.url_resolved||e.url,logo:e.favicon||""}))}));return t?rows(t.map(a=>row("🎵 "+esc(a.name))),nOf(s)):msg(L("w_load"))}case"news":{const t=w2get("news",18e5,()=>m(this,null,function*(){const a=yield A.fetchText("https://news.google.com/rss?hl=ar&gl=EG&ceid=EG:ar"),e=new DOMParser().parseFromString(a,"text/xml");return[].slice.call(e.getElementsByTagName("item"),0,10).map(n=>((n.getElementsByTagName("title")[0]||{}).textContent||"").replace(/\s+-\s+[^-]+$/,""))}));return t?rows(t.map(a=>row("• "+esc(a))),s.sz>2?5:s.sz>1?3:2):msg(L("w_load"))}case"new":{const t=w2get("new",216e5,()=>m(this,null,function*(){const a=yield A.fetchJSON("https://api.tvmaze.com/schedule/web?date="+new Date().toISOString().slice(0,10)),e={};return(a||[]).map(n=>(n._embedded||{}).show||{}).filter(n=>n.name&&!e[n.name]&&(e[n.name]=1)&&(n.rating&&n.rating.average||0)>=6.5).slice(0,8).map(n=>({n:n.name,net:(n.webChannel||n.network||{}).name||""}))}));return t?t.length?rows(t.map(a=>row("🎬 "+esc(a.n),null,esc(a.net))),nOf(s)):msg(L("w_none")):msg(L("w_load"))}case"speed":{const t=W2.speedRes;return`<div class="hwico">📶</div>${t?`<div class="hwbig">${t.busy?"…":t.mbps.toFixed(1)}</div><div class="hwsub">${t.busy?esc(L("w_testing")):"Mbps · "+esc(fmtTime(new Date(t.at)))}</div>`:msg(L("w_testNow"))}`}case"album":{const t=(S.frames||[]).filter(e=>/^(file|content|https?):/.test(e));if(!t.length)return msg(L("w_noPics"));const a=t[Math.floor(Date.now()/15e3)%t.length];return`<div class="w2pic" style="background-image:url('${esc(a)}')"></div>`}case"kids":{const t=S.profiles.find(r=>r.kids),a=t&&+(t.limit||0);if(!a)return msg(L("w_noLimit"));const e=S.usage&&S.usage.d===new Date().toDateString()?S.usage:{m:0,bonus:0},n=Math.max(0,a+(e.bonus||0)-(e.m||0));return`<div class="hwico">${esc(t.emoji||"🧒")}</div><div class="hwbig">${n}</div><div class="hwsub">${esc(L("w_min"))} ${esc(L("w_left"))}</div>`}case"occ":{const t=new Date;t.setHours(0,0,0,0);const a=(S.occasions||[]).map(e=>{let n=new Date(t.getFullYear(),e.m-1,e.d);return n<t&&(n=new Date(t.getFullYear()+1,e.m-1,e.d)),{n:e.n,days:Math.round((n-t)/864e5)}}).sort((e,n)=>e.days-n.days);return a.length?rows(a.map(e=>row("🎂 "+esc(e.n),e.days?e.days+" "+esc(L("w_days")):esc(L("w_today")))),nOf(s)):`<div class="hwico">🎂</div>${msg(L("w_addOcc"))}`}case"table":{const t=S.tableLg||"egy.1",a=w2get("table:"+t,6*36e5,()=>m(this,null,function*(){return(((((yield A.fetchJSON(`https://site.api.espn.com/apis/v2/sports/soccer/${t}/standings`)).children||[])[0]||{}).standings||{}).entries||[]).map(l=>{const d=h=>((l.stats||[]).find(u=>u.name===h)||{}).value;return{n:(l.team||{}).displayName||"",r:d("rank"),p:d("points"),g:d("gamesPlayed")}}).sort((l,d)=>l.r-d.r)}));if(!a)return msg(L("w_load"));if(!a.length)return msg(L("w_none"));const e=s.sz>2?8:s.sz>1?5:3,n=o=>teamFav({strHomeTeam:o.n,strAwayTeam:""});let r=a.slice(0,e);const i=a.find(n);return i&&r.indexOf(i)<0&&(r=r.slice(0,e-1).concat([i])),rows(r.map(o=>row(`${o.r}. ${n(o)?"<b>":""}${esc(o.n)}${n(o)?"</b>":""}`,o.p,o.g!=null?o.g+(S.lang==="ar"?" ماتش":" GP"):null)),e)}case"air":{const t=S.loc;if(!t)return msg(L("w_load"));const a=w2get("air",3*36e5,()=>m(this,null,function*(){const r=yield A.fetchJSON(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${t.lat}&longitude=${t.lon}&current=us_aqi`);let i=null;try{const o=yield A.fetchJSON("https://marine-api.open-meteo.com/v1/marine?latitude=31.25&longitude=29.95&current=wave_height");i=o.current&&o.current.wave_height}catch(o){}return{aqi:r.current&&r.current.us_aqi,wv:i}}));if(!a)return msg(L("w_load"));const e=a.aqi,n=e==null?"—":e<=50?L("w_good"):e<=100?L("w_mid"):L("w_bad");return rows([row("🌫 "+esc(L("w_aqi")),e==null?"—":e,esc(n)),row("🌊 "+esc(L("w_waves"))+" (إسكندرية)",a.wv!=null?a.wv+" م":"—")],2)}}}catch(t){return msg(L("w_none"))}return _hwBodyW2(s)},activators.unshift(s=>{if(!s.dataset||!s.dataset.hw)return!1;const t=hwGet(s.dataset.hw);if(!t)return!1;switch(t.t){case"tas":return S.tasbih=(+S.tasbih||0)+1,renderHW(),!0;case"speed":{if(W2.speedRes&&W2.speedRes.busy)return!0;W2.speedRes={busy:!0},renderHW();const a=Date.now();return A.fetchText("https://speed.cloudflare.com/__down?bytes="+5e6+"&r="+a).then(n=>{const r=(Date.now()-a)/1e3;W2.speedRes={mbps:n.length*8/1e6/r,at:Date.now()}},()=>{W2.speedRes=null,A.toast(L("loadErr"))}).then(renderHW),!0}case"ch":{const a=S.favCh||[];return a.length?(dialog("📺 "+L("w_ch"),a.slice(0,40).map(e=>({label:e.name||e.url,fn:()=>play(e)}))),!0):(showPage("tv"),!0)}case"radio":{const a=(W2.radio||{}).d||[];return a.length&&dialog("🎵 "+L("w_radio"),a.map(e=>({label:e.name,fn:()=>play({name:"🎵 "+e.name,url:e.url,logo:e.logo})}))),!0}case"news":{const a=(W2.news||{}).d||[];return a.length&&dialog("📰 "+L("w_news"),a.map(e=>({label:e,fn:()=>{}}))),!0}case"alarm":{const a=(S.alarms||[]).filter(e=>e.t>Date.now());return dialog("⏰ "+L("w_alarm"),[{icon:"＋",label:L("w_addAlarm"),pri:1,fn:()=>setTimeout(()=>prompt2(L("w_what"),"",e=>{e&&setTimeout(()=>prompt2(L("w_after"),"30",n=>{const r=parseInt(n)||0;r&&(S.alarms=(S.alarms||[]).filter(i=>i.t>Date.now()).concat([{n:e,t:Date.now()+r*6e4}]),renderHW())}),30)}),30)}].concat(a.map((e,n)=>({icon:"🗑",label:`${e.n} · ${fmtTime(new Date(e.t))}`,fn:()=>{S.alarms=a.filter((r,i)=>i!==n),renderHW()}})))),!0}case"occ":{const a=S.occasions||[];return dialog("🎂 "+L("w_occ"),[{icon:"＋",label:L("w_addOcc"),pri:1,fn:()=>setTimeout(()=>prompt2(L("w_occName"),"",e=>{e&&setTimeout(()=>prompt2(L("w_occDate"),"",n=>{const r=String(n||"").split(/[\/\-. ]/).map(i=>parseInt(i));if(!(r[0]>=1&&r[0]<=31&&r[1]>=1&&r[1]<=12))return A.toast("✗");S.occasions=a.concat([{n:e,d:r[0],m:r[1]}]),renderHW()}),30)}),30)}].concat(a.map((e,n)=>({icon:"🗑",label:`${e.n} · ${e.d}/${e.m}`,fn:()=>{S.occasions=a.filter((r,i)=>i!==n),renderHW()}})))),!0}case"table":{const a=[["egy.1","🇪🇬 الدوري المصري"],["ksa.1","🇸🇦 الدوري السعودي"],["eng.1","🏴 الإنجليزي"],["esp.1","🇪🇸 الإسباني"],["ita.1","🇮🇹 الإيطالي"],["ger.1","🇩🇪 الألماني"],["fra.1","🇫🇷 الفرنسي"],["tur.1","🇹🇷 التركي"]];return dialog("🏆 "+L("w_league"),a.map(([e,n])=>({label:n,pri:S.tableLg===e,fn:()=>{S.tableLg=e,renderHW()}}))),!0}}return!1}),setInterval(()=>{const s=S.alarms||[];if(!s.length)return;const t=Date.now(),a=s.filter(e=>e.t<=t&&e.t>t-12e4);a.length&&(a.forEach(e=>{banner("⏰",e.n,fmtTime(new Date(e.t)),3e4),typeof chime=="function"&&chime()}),S.alarms=s.filter(e=>e.t>t))},3e4);const _hwMenuW2=hwMenu;hwMenu=function(s){_hwMenuW2(s);const t=hwGet(s);if(!t||t.t!=="tas")return;const a=$("dbox"),e=a&&a._items,n=a&&a.querySelector(".mgrid,.dlist");!e||!n||(e.unshift({icon:"↺",label:L("w_reset"),fn:()=>{S.tasbih=0,renderHW()}}),n.innerHTML=e.map((r,i)=>`<button class="btn f${r.pri?" pri":""}" data-di="${i}">${r.icon?`<b>${esc(r.icon)}</b>`:""}${esc(r.label)}</button>`).join(""),focus(n.querySelector(".f")))};function tvOff(){return m(this,null,function*(){try{on("player")&&stopPlayer(),window.stopRadio&&stopRadio()}catch(s){}if(banner("📴",S.lang==="ar"?"التليفزيون هيقفل…":"Turning off…","",2e3),yield new Promise(s=>setTimeout(s,1500)),typeof shz=="function"&&shz()==="ok")try{return yield runShell("input keyevent 223"),"ok"}catch(s){}return nat("sleepNow")?"ok":($("blackout").classList.add("on"),"black")})}window.tvOff=tvOff;const _tgCmdOff=tgCmd;tgCmd=function(s){return/^\/?(off|اقفل التليفزيون|اقفل التلفزيون|اقفل الشاشة|قفل التليفزيون)$/i.test(String(s).trim())?(tvOff(),"📴 ✅"):_tgCmdOff.apply(this,arguments)};const goalWatch={};setInterval(()=>{if(typeof matches>"u"||!S.matchMode)return;matches.filter(t=>teamFav(t)&&(evState(t)==="live"||evState(t)==="ns"&&Math.abs(evTime(t)-Date.now())<10*6e4)).forEach(t=>m(this,null,function*(){if(t._lg)try{const a=yield A.fetchJSON(`https://site.api.espn.com/apis/site/v2/sports/soccer/${t._lg}/scoreboard`),e=(a.events||[]).find(w=>"e"+w.id===t.idEvent);if(!e)return;const n=(e.competitions||[])[0]||{},r=n.competitors||[],i=r.find(w=>w.homeAway==="home")||r[0]||{},o=r.find(w=>w.homeAway==="away")||r[1]||{},c=(n.status||e.status||{}).type||{},l=+i.score||0,d=+o.score||0,h=l+"-"+d,u=goalWatch[t.idEvent];t.intHomeScore=l,t.intAwayScore=d,t.strStatus=c.state==="post"?"FT":c.state==="pre"?"NS":"LIVE "+(c.shortDetail||"");const f=`${t.strHomeTeam} ${l} - ${d} ${t.strAwayTeam}`;if(u==null&&c.state==="in"&&!goalWatch["k"+t.idEvent]&&(goalWatch["k"+t.idEvent]=1,notifyMatch("⚽ "+(S.lang==="ar"?"الماتش بدأ":"Kick-off"),f)),u!=null&&u!==h){const w=l>+u.split("-")[0]?t.strHomeTeam:t.strAwayTeam;notifyMatch("⚽ "+(S.lang==="ar"?"جوووون! ":"GOAL! ")+w,f)}c.state==="post"&&!goalWatch["f"+t.idEvent]&&(goalWatch["f"+t.idEvent]=1,notifyMatch("🏁 "+(S.lang==="ar"?"الماتش خلص":"Full time"),f)),goalWatch[t.idEvent]=h,window.__bg||renderHW()}catch(a){}}))},6e4);function notifyMatch(s,t){window.__bg?(nat("toast",s+`
`+t),setTimeout(()=>nat("toast",s+`
`+t),3500)):(banner("⚽",s,t,12e3),typeof chime=="function"&&chime())}Object.assign(DEF,{matchMode:!0}),Object.assign(DEF,{schMorningRadio:!1,schNightDim:!0}),Object.assign(T.ar,{schTitle:"⏰ جدول تلقائي",schMorning:"🌅 الصبح: شغّل إذاعة القرآن أول مرة تفتح الرئيسية (من 6 لـ 10)",schNight:"🌙 بالليل الشاشة أهدى (من 11 بالليل لـ 6 الصبح)",schMatch:"⚽ وضع الماتش: تنبيه بكل جون لفرقك حتى وانت جوه تطبيق تاني"}),Object.assign(T.en,{schTitle:"⏰ Auto schedule",schMorning:"🌅 Morning: play Quran radio the first time Home opens (6–10)",schNight:"🌙 Night: dimmer screen (11 PM – 6 AM)",schMatch:"⚽ Match mode: a pop-up on every goal for your teams, even inside another app"});let morningDone="";function schedTick(){const s=new Date().getHours(),t=new Date().toDateString();document.body.classList.toggle("nightdim",!!S.schNightDim&&(s>=23||s<6)),S.schMorningRadio&&s>=6&&s<10&&morningDone!==t&&!window.__bg&&!on("player")&&document.querySelector("#home.on")&&(morningDone=t,A.fetchJSON("https://mp3quran.net/api/v3/radios?language=ar").then(a=>{const e=(a.radios||[]).find(n=>/الكريم|القرآن الكريم/.test(n.name))||(a.radios||[])[0];e&&play({name:"📻 "+e.name,url:e.url,logo:""})},()=>{}))}setInterval(schedTick,6e4),setTimeout(schedTick,4e3);const _onBgSch=window.onBg;window.onBg=function(s){_onBgSch(s),s||setTimeout(schedTick,500)};const onoff2=s=>`<div class="inline"><button class="btn f${S[s]?" pri":""}" data-sch="${s}:1">${esc(L("on"))}</button><button class="btn f${S[s]?"":" pri"}" data-sch="${s}:0">${esc(L("off"))}</button></div>`;groupSettings=function(s){return function(){const t=$("setScroll");return t&&!t.querySelector(".sgrp")&&!isKids()&&!$("schSec")&&t.insertAdjacentHTML("beforeend",`<div class="sec" id="schSec"><h3>${esc(L("schTitle"))}</h3><div class="field"><label>${esc(L("schMatch"))}</label>${onoff2("matchMode")}</div><div class="field"><label>${esc(L("schMorning"))}</label>${onoff2("schMorningRadio")}</div><div class="field"><label>${esc(L("schNight"))}</label>${onoff2("schNightDim")}</div></div>`),s()}}(groupSettings),SET_GROUPS[4][2].push("جدول تلقائي","Auto schedule"),activators.unshift(s=>{if(!s.dataset||!s.dataset.sch)return!1;const[t,a]=s.dataset.sch.split(":");S[t]=a==="1",schedTick(),renderSettings();const e=document.querySelector(`[data-sch="${t}:${a}"]`);return e&&focus(e),!0});

;
/* w3.js */
Object.assign(T.ar,{stTitle:"📊 إحصائياتي",stToday:"النهارده",stWeek:"آخر 7 أيام",stTop:"أكتر التطبيقات",stNone:"لسه مفيش بيانات",rpTitle:"🧹 تقرير الجهاز",rpRam:"الرامات",rpDisk:"المساحة الفاضية",rpTip:"اقتراح",rpTipTxt:"امسح كاش التطبيقات الكبيرة أو شيل اللي مش بتستخدمه",vNotFound:"ملقتش"}),Object.assign(T.en,{stTitle:"📊 My stats",stToday:"Today",stWeek:"Last 7 days",stTop:"Top apps",stNone:"No data yet",rpTitle:"🧹 Device report",rpRam:"RAM",rpDisk:"Free space",rpTip:"Tip",rpTipTxt:"Clear the cache of big apps or remove ones you don't use",vNotFound:"Not found"});let appOpen=null;const _launchSt=launch;launch=function(t){return appOpen={p:t,t:Date.now()},_launchSt.apply(this,arguments)};const _onBgSt=window.onBg;window.onBg=function(t){if(_onBgSt(t),t||!appOpen)return;const s=Math.round((Date.now()-appOpen.t)/1e3),n=appOpen.p;if(appOpen=null,s<20||s>8*3600)return;const e=S.stats;e.appTime=e.appTime||{};const i=dayKey();e.appTime[i]=e.appTime[i]||{},e.appTime[i][n]=(e.appTime[i][n]||0)+s;const r=Object.keys(e.appTime).sort();for(;r.length>14;)delete e.appTime[r.shift()];S.stats=e};function statsText(){const t=S.stats,s=t.appTime||{},n=s[dayKey()]||{},e={};for(let a=0;a<7;a++){const p=s[dayKey(new Date(Date.now()-a*864e5))]||{};Object.keys(p).forEach(c=>e[c]=(e[c]||0)+p[c])}const i=a=>Object.keys(a).reduce((p,c)=>p+a[c],0)+0,r=a=>{const p=byPkg(a);return p?appName(p):a},o=Object.keys(e).sort((a,p)=>e[p]-e[a]).slice(0,6);return o.length?[`${L("stToday")}: ${hm(i(n)+((t.days||{})[dayKey()]||0))}`,`${L("stWeek")}: ${hm(i(e))}`,"— "+L("stTop")+" —"].concat(o.map(a=>`${r(a)} · ${hm(e[a])}`)):[L("stNone")]}function showStats(){dialog(L("stTitle"),statsText().map(t=>({label:t,fn:()=>{}})))}window.showStats=showStats;function reportText(){let t={},s={};try{t=JSON.parse(nat("memInfo")||"{}")}catch(o){}try{s=A.status()||{}}catch(o){}const n=o=>(o/1073741824).toFixed(1)+" GB",e=[L("rpTitle")];t.total&&e.push(`${L("rpRam")}: ${n(t.total-t.avail)} / ${n(t.total)} (${Math.round((1-t.avail/t.total)*100)}%)`),s.diskFree!=null?e.push(`${L("rpDisk")}: ${n(s.diskFree)}`):s.disk&&e.push(`${L("rpDisk")}: ${s.disk}`);const i=S.stats.apps||{},r=Object.keys(i).sort((o,a)=>i[a]-i[o]).slice(0,5).map(o=>{const a=byPkg(o);return(a?appName(a):o)+" ×"+i[o]});return r.length&&e.push("— "+L("stTop")+" —",...r),e.push(`💡 ${L("rpTip")}: ${L("rpTipTxt")}`),e}function showReport(){dialog(L("rpTitle"),reportText().slice(1).map(t=>({label:t,fn:()=>{}})))}window.showReport=showReport,setInterval(()=>{if(!(!S.tgChat||Date.now()-(S.reportAt||0)<7*864e5)){S.reportAt=Date.now();try{tgSend(S.tgChat,reportText().join(`
`)+`

`+statsText().join(`
`))}catch(t){}}},36e5),groupSettings=function(t){return function(){const s=$("setScroll");return s&&!s.querySelector(".sgrp")&&!isKids()&&!$("statSec")&&s.insertAdjacentHTML("afterbegin",`<div class="sec" id="statSec"><h3>⚡ ${S.lang==="ar"?"تقارير":"Reports"}</h3><div class="inline"><button class="btn f" id="stBtn">${esc(L("stTitle"))}</button><button class="btn f" id="rpBtn">${esc(L("rpTitle"))}</button></div></div>`),t()}}(groupSettings),SET_GROUPS[0][2].push("تقارير","Reports"),activators.unshift(t=>t.id==="stBtn"?(showStats(),!0):t.id==="rpBtn"?(showReport(),!0):!1);const _skinAct=t=>t.dataset&&t.dataset.skin;activators.unshift(t=>(_skinAct(t)&&setTimeout(()=>{const s=S.profiles.map(n=>n.id===S.cur?Object.assign({},n,{skin:S.skin}):n);S.profiles=s},0),!1));let lastProf=S.cur;setInterval(()=>{if(S.cur!==lastProf){lastProf=S.cur;const t=profile();t&&t.skin&&t.skin!==S.skin&&(S.skin=t.skin,applyLook())}},2e3);const APP_AR={يوتيوب:"youtube","يوتيوب تيوب":"tizentube",تايزن:"tizen",شاهد:"shahid",نتفليكس:"netflix",ياسين:"yacine",اوسكار:"oscar",أوسكار:"oscar",الاسطوره:"الأسطورة",الاسطورة:"الأسطورة","جوجل بلاي":"play",بلاي:"play",المتجر:"play",الاعدادات:"settings",الإعدادات:"settings",كودي:"kodi","في ال سي":"vlc","واتش ات":"watchit",سبوتيفاي:"spotify",كروم:"chrome",داونلودر:"downloader",اكشن:"اكشن"};function findApp(t){t=APP_AR[t.trim()]||t,t=t.toLowerCase().replace(/\s+/g,"");const s=visibleApps();return s.find(n=>appName(n).toLowerCase().replace(/\s+/g,"")===t)||s.find(n=>appName(n).toLowerCase().replace(/\s+/g,"").indexOf(t)>=0)||s.find(n=>n.pkg.toLowerCase().indexOf(t)>=0)}const AR_NUM={ربع:15,نص:30,نصف:30,ساعه:60,ساعة:60,ساعتين:120,دقيقه:1,دقيقة:1},_onVoiceW3=window.onVoice;window.onVoice=t=>{const s=String(t||"").trim();let n;if(/^(اقفل|قفل)\s*(التليفزيون|التلفزيون|الشاشة|الشاشه)$/.test(s)){tvOff();return}if(n=s.match(/^(اقفل|نام|قفل)\s*(بعد)\s*(.+)$/)){const e=n[3];let i=parseInt(e)||0;if(!i){for(const r in AR_NUM)if(e.indexOf(r)>=0){i=AR_NUM[r];break}}if(/ساع/.test(e)&&parseInt(e)&&(i=parseInt(e)*60),i){setSleep(i),banner("😴",s,"✓",3e3);return}}if(/ماتش|مباراة|ماتش الاهلي|ماتش الأهلي/.test(s)&&/(شغل|شغّل|افتح)/.test(s)&&S.matchApp&&byPkg(S.matchApp)){launch(S.matchApp);return}if(n=s.match(/^(افتح|شغل|شغّل)\s+(.+)$/)){const e=findApp(n[2]);if(e){banner("🎙",s,appName(e),2500),launch(e.pkg);return}if(typeof channels<"u"){const i=n[2].replace(/^قناة\s*/,"").toLowerCase(),r=channels.find(o=>String(o.name).toLowerCase().indexOf(i)>=0);if(r){play(r);return}}}if(/احصائيات|إحصائيات/.test(s)){showStats();return}if(/تقرير/.test(s)){showReport();return}return _onVoiceW3(t)};

;
/* w4.js */
const APP_NAME="Elgamal TV";Object.assign(T.ar,{wnTitle:"✨ الجديد في "+APP_NAME,wlTeam:"بتشجع مين؟ (تنبيهات الماتشات)",wlTheme:"اختار الشكل",wlPhone:"اربط موبايلك كريموت؟",wlPhoneYes:"📱 اربط دلوقتي",wlNo:"بعدين",crashT:"⚠️ "+APP_NAME+": حصل خطأ"}),Object.assign(T.en,{wnTitle:"✨ What's new in "+APP_NAME,wlTeam:"Which team do you support? (match alerts)",wlTheme:"Pick a look",wlPhone:"Use your phone as a remote?",wlPhoneYes:"📱 Pair now",wlNo:"Later",crashT:"⚠️ "+APP_NAME+": an error happened"}),document.title=APP_NAME;const CHANGES=[{v:187,ar:["الكارت الكبير: الصلوات الخمسة والطقس بالأيام الجاية والماتش","15 ويدجت جديدة من زرار ＋","أوامر صوتية: «افتح يوتيوب»، «اقفل بعد ساعة»","تقفل التليفزيون من الموبايل أو تيليجرام","تنبيه بكل جون لفرقك حتى وانت جوه تطبيق"],en:["Big card: five prayers, weather forecast and the match","15 new widgets from the ＋ button","Voice: “open YouTube”, “sleep in an hour”","Turn the TV off from your phone or Telegram","A pop-up on every goal for your teams"]}];function whatsNew(e){const n=+(nat("versionCode")||0);if(!n)return;const t=+S.seenVer||0;if(S.seenVer=n,!e&&(!t||t>=n))return;const a=CHANGES.filter(o=>e||o.v>t).slice(0,2).reduce((o,r)=>o.concat(S.lang==="ar"?r.ar:r.en),[]).slice(0,6);a.length&&dialog(L("wnTitle"),[{label:"👍",pri:1,fn:()=>{}}],{sub:a.map(o=>"• "+o).join(`
`)})}window.whatsNew=whatsNew,setTimeout(()=>{S.welcomed&&!on("dlg")?whatsNew(!1):S.seenVer=+(nat("versionCode")||0)},6e3);let crashBuf=[],crashAt=0;window.addEventListener("error",e=>{crashBuf.push((e.message||"")+" @"+String(e.filename||"").split("/").pop()+":"+e.lineno),crashBuf.length>10&&crashBuf.shift()}),window.addEventListener("unhandledrejection",e=>{const n=e.reason;crashBuf.push("promise: "+String(n&&n.message||n).slice(0,160)),crashBuf.length>10&&crashBuf.shift()}),setInterval(()=>{if(!crashBuf.length||!S.tgChat||Date.now()-crashAt<6e5)return;crashAt=Date.now();const e=nat("versionName")||"?",n=[...new Set(crashBuf)];crashBuf=[];try{tgSend(S.tgChat,`${L("crashT")} (v${e})
`+n.join(`
`))}catch(t){}},6e4),window.wlTeam=function(){const e=[["Al Ahly, الأهلي","🔴 الأهلي"],["Zamalek, الزمالك","⚪ الزمالك"],["Pyramids, بيراميدز","🔵 بيراميدز"],["Al Masry, المصري","🟢 المصري"],["","— ولا حاجة"]];dialog(L("wlTeam"),e.map(([n,t])=>({label:t,fn:()=>{S.favTeams=[n,"Egypt, مصر"].filter(Boolean).join(", "),setTimeout(wlTheme,60)}})),{grid:3})};function wlTheme(){if(typeof SKINS>"u")return wlPhone();dialog(L("wlTheme"),SKINS.map(e=>({icon:e[1],label:S.lang==="ar"?e[2]:e[3],fn:()=>{S.skin=e[0],applyLook(),setTimeout(wlPhone,60)}})),{grid:3})}function wlPhone(){dialog(L("wlPhone"),[{label:L("wlPhoneYes"),pri:1,fn:()=>setTimeout(()=>{try{phoneDialog()}catch(e){}},60)},{label:L("wlNo"),fn:()=>{}}],{grid:2})}
