/* 旅行插圖：同一組構圖，依風格換「畫法」而不只是換色。動態用 a-* class，減少動態效果時會全部停止。
   window.buildArt(主題名) 會用該風格的色票與畫法重畫插圖與圖示：
   - book     繪本：平塗四色＋墨灰 3px 粗線
   - aussie   海報：色塊不描邊，後面多一層錯位的海軍藍印版（網版印刷套色錯位感）
   - passport 護照：單色細線，色塊改成刻版排線（斜線、橫線、網點、交叉線），像護照內頁版畫
   - crayon   蠟筆：線條加固定種子的抖動、蠟筆質感墨線，顏色往右下塗出框
   - pixel    像素：同一張圖在瀏覽器裡縮成低解析度、量化成固定色盤，再放大成像素圖（window.pixelate） */
(function () {
  var PALETTES = {
    book: { P: '#FFFCF6', I: '#3E3A39', C: '#F2A497', Y: '#F6D27A', W: '#A8D3E6', G: '#B9DAA5', sw: 3 },
    aussie: { P: '#FFF8EC', I: '#1E3557', C: '#EE8B5B', Y: '#F4BE3E', W: '#7EC4CF', G: '#97C08F', sw: 3 },
    passport: { P: '#FBF8EF', I: '#26344D', C: 'url(#pp-c)', Y: 'url(#pp-y)', W: 'url(#pp-w)', G: 'url(#pp-g)', sw: 2.2 },
    crayon: { P: '#FFFFFF', I: '#2B2B2B', C: 'url(#cr-c)', Y: 'url(#cr-y)', W: 'url(#cr-w)', G: 'url(#cr-g)', sw: 3.5, st: 'url(#cr-ink)' },
    pixel: { P: '#FFF7E8', I: '#2B2140', C: '#FF7B6B', Y: '#FFD15C', W: '#5CC8FF', G: '#6FD08C', sw: 4.6 }
  };

  function addDefs(id, inner) {
    if (document.getElementById(id)) return;
    var box = document.createElement('div');
    box.innerHTML = '<svg id="' + id + '" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' + inner + '</defs></svg>';
    document.body.appendChild(box.firstChild);
  }

  // 蠟筆風：墨線帶白色小斑點（蠟筆在紙上沒塗滿），色塊帶白色斜紋
  function ensureCrayon() {
    function wax(id, color) {
      return '<pattern id="' + id + '" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-25)">' +
        '<rect width="10" height="10" fill="' + color + '"/><path d="M0 2.5H10M0 6.8H7M3 9.3H10" stroke="#FFFFFF" stroke-opacity=".38" stroke-width="1.1"/></pattern>';
    }
    addDefs('art-defs-cr',
      '<pattern id="cr-ink" patternUnits="userSpaceOnUse" width="5" height="5"><rect width="5" height="5" fill="#2B2B2B"/>' +
      '<circle cx="1" cy="1.2" r=".45" fill="#FFFFFF" fill-opacity=".5"/><circle cx="3.6" cy="2.8" r=".35" fill="#FFFFFF" fill-opacity=".45"/><circle cx="2.2" cy="4.3" r=".3" fill="#FFFFFF" fill-opacity=".4"/></pattern>' +
      wax('cr-c', '#FF8A7A') + wax('cr-y', '#FFD23F') + wax('cr-w', '#5EC2F2') + wax('cr-g', '#7BD389'));
  }

  // 固定種子的亂數：同一張圖每次重畫抖動都一樣，不會閃
  function rng(seed) { seed = seed % 2147483647 || 1; return function () { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; }; }
  function hash(str) { var h = 7; for (var i = 0; i < str.length; i += 7) h = (h * 31 + str.charCodeAt(i)) % 2147483647; return h; }
  function wobble(d, r) {
    if (/[aA]/.test(d)) return d;                 // 弧線的旗標不能抖
    var nums = (d.match(/-?(\d+\.?\d*|\.\d+)/g) || []).slice(2).map(function (n) { return Math.abs(parseFloat(n)); });
    var amp = Math.max(.3, Math.min(1.4, Math.max.apply(null, nums.concat(0)) / 30));   // 小圖形抖小一點
    return d.replace(/-?(\d+\.?\d*|\.\d+)/g, function (n) { return (parseFloat(n) + (r() - .5) * 2 * amp).toFixed(1); });
  }

  // 護照風的排線圖樣：全頁共用一份，任何 SVG 都能用 url(#pp-*) 引用
  function ensureEngraving() {
    if (document.getElementById('art-defs')) return;
    var ink = 'stroke="#26344D" stroke-opacity=".7"';
    var box = document.createElement('div');
    box.innerHTML = '<svg id="art-defs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
      '<pattern id="pp-c" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)"><rect width="4" height="4" fill="#F6E2DC"/><path d="M0 0V4" ' + ink + ' stroke-width="1"/></pattern>' +
      '<pattern id="pp-w" patternUnits="userSpaceOnUse" width="6" height="3.5"><rect width="6" height="3.5" fill="#E2ECF4"/><path d="M0 1.75H6" ' + ink + ' stroke-width=".9"/></pattern>' +
      '<pattern id="pp-y" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="#F6ECCF"/><circle cx="2" cy="2" r=".8" fill="#26344D" fill-opacity=".6"/></pattern>' +
      '<pattern id="pp-g" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)"><rect width="5" height="5" fill="#E4EDDF"/><path d="M0 0V5M0 0H5" ' + ink + ' stroke-width=".8"/></pattern>' +
      '</defs></svg>';
    document.body.appendChild(box.firstChild);
  }

  function build(theme) {
    var pal = PALETTES[theme] || PALETTES.book;
    var P = pal.P, I = pal.I, C = pal.C, Y = pal.Y, W = pal.W, G = pal.G;
    if (theme === 'passport') ensureEngraving();
    if (theme === 'crayon') ensureCrayon();

    function svg(vb, inner, label) {
      var a = label ? ' role="img" aria-label="' + label + '"' : ' aria-hidden="true"';
      if (theme === 'aussie') {
        // 錯位印版：同一張圖先印一層海軍藍、往右下偏一點，上層色塊不描邊
        var off = (Number(vb.split(' ')[2]) / 80).toFixed(2);
        inner = '<g class="plate" transform="translate(' + off + ' ' + off + ')">' + inner + '</g><g class="print">' + inner + '</g>';
      }
      var cls = 'illo illo-' + (PALETTES[theme] ? theme : 'book'), size = vb.split(' ').map(Number);
      if (theme === 'crayon') {
        // 下層：色塊往右下偏、不描邊（塗出框）；上層：抖動過的蠟筆線
        var r = rng(hash(vb + inner)), o = (size[2] / 100).toFixed(2);
        var lines = inner.replace(/ d="([^"]*)"/g, function (m, d) { return ' d="' + wobble(d, r) + '"'; });
        inner = '<g class="cr-fill" transform="translate(' + o + ' ' + (o * .8).toFixed(2) + ')">' + inner + '</g><g class="cr-line">' + lines + '</g>';
      }
      if (theme === 'pixel') {
        // 線加粗 1.5 倍，縮小後才不會斷；夠大的圖交給 window.pixelate 轉成像素圖
        inner = inner.replace(/stroke-width="([\d.]+)"/g, function (m, v) { return 'stroke-width="' + (v * 1.5).toFixed(2) + '"'; });
        if (size[2] >= 40 && size[3] >= 40) cls += ' px-src';
      }
      return '<svg xmlns="http://www.w3.org/2000/svg" class="' + cls + '" viewBox="' + vb + '" fill="none" stroke="' + (pal.st || I) + '" stroke-width="' + pal.sw + '" stroke-linecap="round" stroke-linejoin="round" focusable="false"' + a + '>' + inner + '</svg>';
    }
    function sea(y, w, h, fill) {
      var d = 'M-4 ' + y + ' L0 ' + y;
      for (var x = 0; x < w; x += 20) d += ' q10 -6 20 0';
      return '<path d="' + d + ' L' + (w + 4) + ' ' + y + ' V' + (h + 4) + ' H-4 Z" fill="' + (fill || W) + '"/>';
    }
    function cloud(x, y, s, cls) {
      return '<g class="' + cls + '"><path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0 22c0-9 7-15 16-14 3-8 12-12 20-8 6-6 18-4 21 5 9 0 14 6 13 13 0 3-2 5-5 5H5c-3 0-5-1-5-1Z" fill="' + P + '" stroke-width="' + (3 / s) + '"/></g>';
    }
    function sun(cx, cy, r) {
      var rays = '';
      for (var i = 0; i < 8; i++) {
        var a = i * Math.PI / 4, r1 = r + 6, r2 = r + 12;
        rays += '<path d="M' + (cx + r1 * Math.cos(a)).toFixed(1) + ' ' + (cy + r1 * Math.sin(a)).toFixed(1) + ' L' + (cx + r2 * Math.cos(a)).toFixed(1) + ' ' + (cy + r2 * Math.sin(a)).toFixed(1) + '"/>';
      }
      return '<g class="a-spin">' + rays + '</g><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + Y + '"/>';
    }
    function gull(x, y) {
      return '<path d="M' + x + ' ' + y + ' q5 -6 10 0 q5 -6 10 0" stroke-width="2.5"/>';
    }
    function plane(flip) {
      var g = '<path d="M70 70 52 40h14l28 30Z" fill="' + C + '"/>' +
        '<path d="M50 84q0-14 16-14h104q26 0 38 12-12 14-38 14H66q-16 0-16-12Z" fill="' + P + '"/>' +
        '<path d="M66 90h112" stroke="' + C + '" stroke-width="5"/>' +
        '<path d="M188 75q11 1 16 7h-18Z" fill="' + W + '" stroke-width="2.5"/>' +
        '<circle cx="128" cy="80" r="4" fill="' + W + '" stroke-width="2.5"/><circle cx="144" cy="80" r="4" fill="' + W + '" stroke-width="2.5"/><circle cx="160" cy="80" r="4" fill="' + W + '" stroke-width="2.5"/>' +
        '<path d="M112 84 88 122h18l38-38Z" fill="' + W + '"/>';
      return flip ? '<g transform="translate(240 0) scale(-1 1)">' + g + '</g>' : g;
    }
    function wheel(cx, cy, r, fills) {
      var s = '';
      for (var i = 0; i < 8; i++) {
        var a = i * Math.PI / 4, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        s += '<path d="M' + cx + ' ' + cy + ' L' + x.toFixed(1) + ' ' + y.toFixed(1) + '" stroke-width="2"/>';
      }
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>';
      for (var j = 0; j < 8; j++) {
        var b = j * Math.PI / 4 + Math.PI / 8, x2 = cx + r * Math.cos(b), y2 = cy + r * Math.sin(b);
        s += '<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="6" fill="' + fills[j % fills.length] + '" stroke-width="2.5"/>';
      }
      return '<g class="a-spin-slow">' + s + '</g><circle cx="' + cx + '" cy="' + cy + '" r="6" fill="' + Y + '"/>';
    }

    // 澳洲海報風限定：沙灘上的紅黃救生員旗（海灘安全區的標誌）
    function lifeguard() {
      function flag(x, y) {
        return '<path d="M' + x + ' ' + (y + 44) + 'V' + y + '"/>' +
          '<g class="a-flag"><path d="M' + x + ' ' + y + 'h22v8H' + x + 'Z" fill="#D7322B" stroke="none"/>' +
          '<path d="M' + x + ' ' + (y + 8) + 'h22v8H' + x + 'Z" fill="#F6C543" stroke="none"/>' +
          '<rect x="' + x + '" y="' + y + '" width="22" height="16" rx="1.5" stroke-width="2.5"/></g>';
      }
      return '<path d="M-4 254V234q44-16 98-4 22 6 32 24Z" fill="#F6DFA9"/>' + flag(26, 194) + flag(66, 198);
    }

    /* ===== 場景小零件（svg-scene-maker 的畫面規則：天空不留白、白天也熱鬧、在地人物動物交通工具） ===== */
    function n1(v) { return +v.toFixed(1); }
    // 人：腳底在 (x, y)，h 是身高；身高不同、衣服用四個角色色輪替
    function person(x, y, h, shirt, o) {
      o = o || {};
      var hr = h * .17, hy = y - h + hr, bt = hy + hr + .6, bb = y - h * .34, bw = h * .2, s = '';
      s += '<path d="M' + n1(x - bw * .4) + ' ' + n1(bb) + 'V' + y + 'M' + n1(x + bw * .4) + ' ' + n1(bb) + 'V' + y + '" stroke-width="2"/>';
      if (o.arm) s += '<path d="M' + n1(x + bw * .8) + ' ' + n1(bt + 2) + 'l' + n1(h * .16) + ' -' + n1(h * .2) + '" stroke-width="2"/>';
      s += '<rect x="' + n1(x - bw) + '" y="' + n1(bt) + '" width="' + n1(bw * 2) + '" height="' + n1(bb - bt + 1) + '" rx="' + n1(bw * .7) + '" fill="' + shirt + '" stroke-width="2"/>';
      s += '<circle cx="' + x + '" cy="' + n1(hy) + '" r="' + n1(hr) + '" fill="' + P + '" stroke-width="2"/>';
      if (o.cap) s += '<path d="M' + n1(x - hr) + ' ' + n1(hy - hr * .2) + 'q' + n1(hr) + ' -' + n1(hr * 1.5) + ' ' + n1(hr * 2) + ' 0h' + n1(hr * .7) + '" fill="' + o.cap + '" stroke-width="1.8"/>';
      return s;
    }
    // 我們一家三口（兩個大人＋六歲小孩），每張圖都會出現
    function family(x, y, k) {
      k = k || 1;
      return person(x, y, 30 * k, C) + person(x + 11 * k, y, 18 * k, Y, { cap: G, arm: true }) + person(x + 22 * k, y, 27 * k, W);
    }
    function crowd(x, y, list) {
      var s = '';
      list.forEach(function (h, i) { s += person(x + i * 9, y, h, [G, C, W, Y][i % 4]); });
      return s;
    }
    function birds(x, y) { return gull(x, y) + gull(x + 18, y + 8); }
    // 雪梨渡輪：綠色船身、奶油色船艙、黃色煙囪（船頭朝右）
    function sydFerry(x, y) {
      return '<g transform="translate(' + x + ' ' + y + ')"><path d="M0 0h64l-6 10H6Z" fill="' + G + '"/>' +
        '<rect x="8" y="-12" width="46" height="12" rx="3" fill="' + P + '"/>' +
        '<path d="M14 -6h6M24 -6h6M34 -6h6M44 -6h6" stroke-width="2"/>' +
        '<rect x="22" y="-21" width="20" height="9" rx="3" fill="' + P + '" stroke-width="2.5"/><rect x="29" y="-28" width="6" height="7" fill="' + Y + '" stroke-width="2"/></g>';
    }
    function sailboat(x, y) {
      return '<g transform="translate(' + x + ' ' + y + ')"><path d="M0 0h26l-4 6H4Z" fill="' + C + '" stroke-width="2.5"/><path d="M13 0V-22L24 -2Z" fill="' + P + '" stroke-width="2.5"/></g>';
    }
    function palm(x, y, h) {
      return '<path d="M' + x + ' ' + y + 'q-3 -' + n1(h * .5) + ' 2 -' + h + '" stroke-width="3"/>' +
        '<g class="a-sway"><path d="M' + (x + 2) + ' ' + (y - h) + 'q-12 -6 -20 4 10 -2 20 -4Zq12 -8 20 2 -10 -2 -20 -2Zq-4 -12 -16 -12 10 4 16 12Zq6 -12 16 -10 -10 2 -16 10Z" fill="' + G + '" stroke-width="2"/></g>';
    }
    // 尤加利樹：灰白樹幹＋一團團葉子
    function gum(x, y, h) {
      return '<path d="M' + x + ' ' + y + 'V' + (y - h * .55) + 'M' + x + ' ' + n1(y - h * .45) + 'l-8 -10M' + x + ' ' + n1(y - h * .5) + 'l8 -12" stroke-width="3"/>' +
        '<path d="M' + (x - 16) + ' ' + n1(y - h * .62) + 'q0-' + n1(h * .4) + ' 16-' + n1(h * .4) + 'q16 0 16 ' + n1(h * .4) + 'q-16 8 -32 0Z" fill="' + G + '" stroke-width="2.5"/>';
    }
    function moon(cx, cy, r) {
      return '<path d="M' + cx + ' ' + (cy - r) + 'a' + r + ' ' + r + ' 0 1 0 ' + n1(r * 1.2) + ' ' + n1(r * 1.45) + 'a' + n1(r * .8) + ' ' + n1(r * .8) + ' 0 1 1 -' + n1(r * 1.2) + ' -' + n1(r * 1.45) + 'Z" fill="' + Y + '"/>';
    }
    function spark(x, y, s, cls) {
      return '<path class="a-twinkle' + (cls ? ' ' + cls : '') + '" d="M' + x + ' ' + (y + s) + 'q' + s + ' 0 ' + s + ' -' + s + ' 0 ' + s + ' ' + s + ' ' + s + ' -' + s + ' 0 -' + s + ' ' + s + ' 0 -' + s + ' -' + s + ' -' + s + 'Z" fill="' + Y + '" stroke-width="2"/>';
    }
    function lorikeet(x, y, cls) {
      return '<g class="' + cls + '"><ellipse cx="' + x + '" cy="' + y + '" rx="9" ry="5.5" fill="' + G + '" stroke-width="2"/>' +
        '<circle cx="' + (x - 8) + '" cy="' + (y - 3) + '" r="4.5" fill="' + W + '" stroke-width="2"/><path d="M' + (x - 12) + ' ' + (y - 3) + 'l-4 2 4 1Z" fill="' + C + '" stroke-width="1.6"/>' +
        '<path d="M' + (x - 5) + ' ' + (y + 1) + 'q3 4 7 1" fill="' + C + '" stroke-width="1.6"/><path d="M' + (x + 8) + ' ' + y + 'l9 3-9 1" fill="' + G + '" stroke-width="1.8"/></g>';
    }
    // 澳洲白䴉：白身、黑頭頸、彎長嘴（雪梨公園常見）
    function ibis(x, y) {
      return '<path d="M' + (x - 2) + ' ' + y + 'v-6M' + (x + 3) + ' ' + y + 'v-6" stroke-width="1.8"/>' +
        '<ellipse cx="' + x + '" cy="' + (y - 9) + '" rx="8" ry="5" fill="' + P + '" stroke-width="2"/>' +
        '<g class="a-nod"><path d="M' + (x - 6) + ' ' + (y - 11) + 'q-3 -8 -7 -8q-3 0 -4 4q-2 6 -6 8" stroke-width="2.4"/></g>';
    }
    function skyline(x, y, list, lit) {
      var s = '', cx = x;
      list.forEach(function (b, i) {
        s += '<rect x="' + cx + '" y="' + (y - b[1]) + '" width="' + b[0] + '" height="' + b[1] + '" rx="2" fill="' + (i % 2 ? P : W) + '" stroke-width="2.2"/>';
        if (lit) s += '<path d="M' + (cx + 3) + ' ' + (y - b[1] + 6) + 'h' + (b[0] - 6) + 'M' + (cx + 3) + ' ' + (y - b[1] + 13) + 'h' + (b[0] - 6) + '" stroke="' + Y + '" stroke-width="2"/>';
        cx += b[0] + 2;
      });
      return s;
    }
    function bridgeArch(x0, x1, deck, top) {
      var m = (x0 + x1) / 2, s = '<path d="M' + x0 + ' ' + deck + 'Q' + m + ' ' + top + ' ' + x1 + ' ' + deck + '" stroke-width="3.5"/>' +
        '<path d="M' + (x0 + 12) + ' ' + deck + 'Q' + m + ' ' + (top + 18) + ' ' + (x1 - 12) + ' ' + deck + '" stroke-width="2"/>';
      for (var i = 1; i < 8; i++) {
        var px = x0 + (x1 - x0) * i / 8, t = i / 8, py = (1 - t) * (1 - t) * deck + 2 * t * (1 - t) * top + t * t * deck;
        s += '<path d="M' + n1(px) + ' ' + deck + 'V' + n1(py + 4) + '" stroke-width="1.6"/>';
      }
      return s;
    }

    var D = '0 0 240 160';
    var ILLOS = {};

    // Day 1：台北深夜起飛——月亮、星星、台北 101、航廈與塔台
    ILLOS.plane = svg(D,
      moon(206, 24, 13) + spark(160, 18, 4) + spark(120, 34, 3, 'd2') + spark(226, 62, 3, 'd1') +
      cloud(150, 52, .6, 'a-drift') +
      '<path d="M-4 132H244V164H-4Z" fill="' + G + '"/><path d="M-4 140H244" stroke-width="2"/><path d="M10 148h16M44 148h16M78 148h16M112 148h16" stroke="' + P + '" stroke-width="3"/>' +
      '<rect x="12" y="110" width="66" height="22" rx="4" fill="' + P + '"/><path d="M20 120h50" stroke="' + Y + '" stroke-width="4"/>' +
      '<path d="M90 132V96" stroke-width="3"/><rect x="83" y="84" width="14" height="12" rx="3" fill="' + W + '" stroke-width="2.5"/><circle class="a-twinkle d3" cx="90" cy="79" r="3" fill="' + C + '" stroke-width="2"/>' +
      '<rect x="176" y="116" width="30" height="16" rx="2" fill="' + P + '" stroke-width="2.5"/>' +
      '<path d="M184 116l-2-10h22l-2 10ZM184 106l-2-10h22l-2 10ZM184 96l-2-10h22l-2 10ZM184 86l-2-10h22l-2 10ZM184 76l-2-10h22l-2 10Z" fill="' + W + '" stroke-width="2.2"/>' +
      '<path d="M186 66h14l-2-8h-10ZM193 58V42" stroke-width="2.2"/><path d="M186 112h14M186 92h14M186 72h14" stroke="' + Y + '" stroke-width="2"/>' +
      '<g class="a-float"><g transform="translate(14 -14) scale(.66) rotate(-10 120 80)">' + plane(false) + '</g></g>');

    // Day 14：布里斯本夜班機回家——城市燈火、月亮、往左（回台灣）飛的飛機
    ILLOS.planeHome = svg(D,
      moon(32, 26, 12) + spark(196, 20, 4) + spark(110, 14, 3, 'd2') + spark(150, 46, 3, 'd1') +
      cloud(170, 64, .6, 'a-drift2') +
      '<path d="M-4 136H244V164H-4Z" fill="' + W + '"/>' +
      skyline(118, 136, [[16, 34], [20, 56], [14, 40], [22, 70], [16, 46], [18, 30]], true) +
      '<path d="M8 136q20-14 40 0" stroke-width="3"/><path d="M14 136v-8M28 136v-12M42 136v-8" stroke-width="1.6"/>' +
      '<path d="M18 150q8-5 16 0M150 152q8-5 16 0" stroke="' + Y + '"/>' +
      '<g transform="translate(240 0) scale(-1 1)"><g class="a-float"><g transform="translate(14 -16) scale(.66) rotate(-10 120 80)">' + plane(false) + '</g></g></g>');

    // Day 2：抵達雪梨——港灣大橋（橋頂兩面旗、攀橋的人）、綠色渡輪、帆船、岸邊的一家人
    ILLOS.bridge = svg(D,
      sun(206, 30, 12) + cloud(70, 14, .7, 'a-drift') + birds(130, 30) +
      skyline(4, 100, [[14, 30], [18, 46], [12, 26], [16, 38]]) +
      '<rect x="24" y="74" width="18" height="30" rx="2" fill="' + P + '"/><rect x="198" y="74" width="18" height="30" rx="2" fill="' + P + '"/>' +
      bridgeArch(42, 198, 98, 16) +
      '<rect x="10" y="96" width="224" height="8" rx="3" fill="' + Y + '"/>' +
      '<circle cx="100" cy="58" r="2.2" fill="' + C + '" stroke-width="1.4"/><circle cx="107" cy="55.5" r="2.2" fill="' + W + '" stroke-width="1.4"/><circle cx="137" cy="56" r="2.2" fill="' + G + '" stroke-width="1.4"/>' +
      '<path d="M114 56V45M126 56V45" stroke-width="1.8"/><path class="a-flag" d="M114 45h8v5h-8Z" fill="' + C + '" stroke-width="1.6"/><path class="a-flag" d="M126 45h8v5h-8Z" fill="' + W + '" stroke-width="1.6"/>' +
      sea(112, 240, 160) +
      '<g class="a-bob">' + sydFerry(132, 126) + '</g>' +
      '<g class="a-bob2">' + sailboat(70, 124) + '</g>' +
      '<path d="M-4 146q40-6 92 2V164H-4Z" fill="' + Y + '"/>' + family(16, 152, .85) +
      '<path d="M206 140q8-5 16 0" stroke="' + P + '"/>');

    // Day 3：歌劇院與植物園——白色帆殼、遠方的港灣大橋、無花果樹下的白䴉
    ILLOS.opera = svg(D,
      sun(214, 34, 12) + cloud(90, 14, .7, 'a-drift') + birds(150, 24) +
      '<path d="M168 104Q204 66 240 104" stroke-width="2.5"/><rect x="164" y="102" width="80" height="5" rx="2" fill="' + Y + '" stroke-width="2"/>' +
      '<rect x="64" y="100" width="108" height="12" rx="3" fill="' + C + '"/>' +
      '<path d="M72 100q4-34 30-46-6 24-4 46Z" fill="' + P + '"/><path d="M80 98q3-22 18-36" stroke-width="1.8"/>' +
      '<path d="M94 100q8-46 44-60-10 32-6 60Z" fill="' + P + '"/><path d="M104 98q6-32 28-50" stroke-width="1.8"/>' +
      '<path d="M128 100q8-30 30-36-6 20-4 36Z" fill="' + P + '"/><path d="M136 98q4-20 18-30" stroke-width="1.8"/>' +
      '<path d="M152 100q5-16 16-18-3 10-2 18Z" fill="' + P + '"/>' +
      sea(112, 240, 160) +
      '<g class="a-bob">' + sydFerry(158, 132) + '</g>' +
      '<path d="M-4 104q30-6 62 4v56H-4Z" fill="' + G + '"/>' +
      '<path d="M24 120V84M24 96l-10-8M24 92l10-10" stroke-width="4"/>' +
      '<path d="M2 82q0-26 22-26 24 0 24 26-24 10-46 0Z" fill="' + G + '"/>' +
      family(6, 150, .8) + ibis(50, 132) +
      '<path d="M90 146q8-5 16 0" stroke="' + P + '"/>');

    // Day 4：搭渡輪去 Taronga——長頸鹿背後就是港灣、歌劇院和市區
    ILLOS.giraffe = svg(D,
      cloud(150, 12, .6, 'a-drift') + sun(214, 28, 10) + birds(36, 22) +
      sea(100, 240, 160) +
      skyline(150, 98, [[10, 22], [12, 34], [9, 18], [12, 28]]) +
      '<path d="M196 100Q216 82 236 100" stroke-width="2.4"/><rect x="194" y="98" width="46" height="4" rx="2" fill="' + Y + '" stroke-width="2"/>' +
      '<path d="M120 100q4-18 18-24-4 12-2 24Z" fill="' + P + '" stroke-width="2.2"/><path d="M134 100q4-12 14-16-3 8-2 16Z" fill="' + P + '" stroke-width="2.2"/>' +
      '<g class="a-bob">' + sydFerry(164, 112).replace('translate(164 112)', 'translate(164 112) scale(.7)') + '</g>' +
      '<path d="M-4 164V124q50-18 118-8t130 4V164Z" fill="' + G + '"/>' +
      '<path d="M50 118v30M60 120v28M84 120v28M94 118v30" stroke-width="4"/>' +
      '<path d="M40 112q0-16 22-18h30q14 2 14 16t-14 14H54q-14 0-14-12Z" fill="' + Y + '"/><path d="M40 108q-8 4-8 16" stroke-width="2.5"/>' +
      '<circle cx="58" cy="106" r="4" fill="' + C + '" stroke="none"/><circle cx="74" cy="113" r="4.5" fill="' + C + '" stroke="none"/><circle cx="88" cy="104" r="3.5" fill="' + C + '" stroke="none"/>' +
      '<g class="a-nod"><path d="M88 102L102 40h12L106 106Z" fill="' + Y + '"/>' +
      '<circle cx="103" cy="66" r="3" fill="' + C + '" stroke="none"/><circle cx="103" cy="86" r="3" fill="' + C + '" stroke="none"/><circle cx="108" cy="52" r="2.6" fill="' + C + '" stroke="none"/>' +
      '<path d="M100 40q0-12 14-12 14 0 22 8 4 6-2 10l-20 2q-14 0-14-8Z" fill="' + Y + '"/>' +
      '<path d="M106 30l-2-10M114 28l1-10" stroke-width="2.5"/><circle cx="104" cy="19" r="2.6" fill="' + C + '" stroke-width="2"/><circle cx="115" cy="17" r="2.6" fill="' + C + '" stroke-width="2"/>' +
      '<path d="M102 34l-10-4 8 8" fill="' + Y + '" stroke-width="2"/><circle cx="119" cy="34" r="2" fill="' + I + '" stroke="none"/><path d="M128 42q3 1 5-1" stroke-width="2"/></g>' +
      '<path d="M140 156V132M140 136H236M140 146H236M172 156V132M204 156V132M236 156V132" stroke-width="2"/>' +
      family(170, 132, .7));

    // Day 5：藍山——三姊妹岩、藍色霧氣的山谷、高空纜車、葵花鳳頭鸚鵡、觀景台上的一家人
    ILLOS.mountain = svg(D,
      sun(212, 24, 10) + cloud(96, 10, .6, 'a-drift') +
      '<path d="M-4 84 30 64l26 12 34-22 34 20 36-16 40 18 44-12v100H-4Z" fill="' + W + '"/>' +
      '<path d="M6 36 234 62" stroke-width="2"/>' +
      '<g class="a-glide"><path d="M52 41v7" stroke-width="2"/><rect x="40" y="48" width="24" height="16" rx="5" fill="' + C + '"/><rect x="45" y="52" width="6" height="6" rx="2" fill="' + P + '" stroke-width="1.8"/><rect x="54" y="52" width="6" height="6" rx="2" fill="' + P + '" stroke-width="1.8"/></g>' +
      '<path d="M-4 112q60-14 120-4t128-6v62H-4Z" fill="' + G + '"/>' +
      '<path d="M146 112V80q0-14 8-18 8 4 8 18v32Z" fill="' + Y + '"/><path d="M164 112V70q0-16 9-20 9 4 9 20v42Z" fill="' + Y + '"/><path d="M184 112V84q0-12 8-16 8 4 8 16v28Z" fill="' + Y + '"/>' +
      '<path d="M148 90h12M148 102h12M166 82h14M166 96h14M186 92h12M186 104h12" stroke-width="2"/>' +
      '<path d="M202 112q8-10 22-8 10 2 20 8v52h-42Z" fill="' + Y + '"/>' +
      gum(116, 128, 40) + gum(96, 136, 30) +
      '<path d="M-4 140h96v24H-4Z" fill="' + P + '"/><path d="M-4 128h96M10 128v12M40 128v12M70 128v12" stroke-width="2"/>' +
      family(12, 140, .78) +
      '<path d="M206 136q14-8 34-6" stroke-width="3"/>' +
      '<g class="a-nod"><ellipse cx="222" cy="126" rx="9" ry="6" fill="' + P + '" stroke-width="2"/><circle cx="214" cy="120" r="4.5" fill="' + P + '" stroke-width="2"/><path d="M212 116q-2-6 2-9 1 4 4 6" fill="' + Y + '" stroke-width="1.6"/><path d="M210 121l-3 2 3 1" stroke-width="1.6"/></g>');

    // Day 6：邦迪——冰山泳池、救生員紅黃旗、衝浪的人，再搭飛機往北
    ILLOS.bondi = svg(D,
      sun(30, 26, 10) + cloud(92, 14, .6, 'a-drift') +
      '<g class="a-float"><g transform="translate(116 -26) scale(.42) rotate(-8 120 80)">' + plane(false) + '</g></g>' +
      sea(92, 240, 160) +
      '<path d="M-4 86q24-4 40 6l10 16H-4Z" fill="' + C + '"/><rect x="4" y="98" width="36" height="9" rx="2" fill="' + W + '" stroke-width="2.2"/><path d="M13 98v9M22 98v9M31 98v9" stroke="' + P + '" stroke-width="1.6"/>' +
      '<path class="a-twinkle" d="M42 92q4-8 8 0" stroke="' + P + '" stroke-width="2.4"/>' +
      '<path d="M100 104q14-10 28 0" stroke="' + P + '" stroke-width="2.4"/>' +
      '<g class="a-bob"><path d="M96 110q16-4 34 0-16 4-34 0Z" fill="' + Y + '" stroke-width="2"/>' + person(112, 108, 18, I) + '</g>' +
      '<path d="M-4 130q120-26 248-8V164H-4Z" fill="' + Y + '"/>' +
      '<path d="M180 128V106" stroke-width="2"/><rect x="170" y="96" width="22" height="12" rx="3" fill="' + P + '" stroke-width="2.4"/><path d="M175 102h12" stroke="' + W + '" stroke-width="3"/>' +
      '<path d="M200 132V112M224 130V110" stroke-width="2"/>' +
      '<g class="a-flag"><path d="M200 112h12v4h-12Z" fill="' + C + '" stroke="none"/><path d="M200 116h12v4h-12Z" fill="' + Y + '" stroke="none"/><rect x="200" y="112" width="12" height="8" stroke-width="1.8"/></g>' +
      '<g class="a-flag"><path d="M224 110h12v4h-12Z" fill="' + C + '" stroke="none"/><path d="M224 114h12v4h-12Z" fill="' + Y + '" stroke="none"/><rect x="224" y="110" width="12" height="8" stroke-width="1.8"/></g>' +
      family(40, 150, .8) + person(120, 146, 26, G) + person(150, 144, 22, C));

    // Day 7：樂園日——雲霄飛車、自由落體塔、旋轉木馬、氣球、排隊的人（高矮不一、衣服鮮豔）
    ILLOS.park = svg(D,
      cloud(16, 14, .6, 'a-drift') +
      '<g class="a-float"><path d="M196 36v20M210 30v24M224 38v18" stroke-width="1.4"/><ellipse cx="196" cy="28" rx="6" ry="8" fill="' + C + '" stroke-width="2"/><ellipse cx="210" cy="22" rx="6" ry="8" fill="' + W + '" stroke-width="2"/><ellipse cx="224" cy="30" rx="6" ry="8" fill="' + Y + '" stroke-width="2"/></g>' +
      '<path d="M-4 132h248v32H-4Z" fill="' + G + '"/>' +
      '<rect x="150" y="20" width="12" height="112" rx="3" fill="' + P + '"/><path d="M150 40h12M150 60h12M150 80h12M150 100h12" stroke="' + C + '" stroke-width="3"/><path d="M146 20h20" stroke-width="3"/>' +
      '<g class="a-bob2"><rect x="142" y="44" width="28" height="10" rx="3" fill="' + Y + '"/></g>' +
      '<path d="M8 128q20-80 44-40t34-20q14-24 26 60" stroke-width="3.5"/><path d="M28 130v-38M52 130V90M78 130v-30M100 130V96" stroke-width="2"/>' +
      '<g class="a-bob"><rect x="62" y="64" width="22" height="12" rx="5" fill="' + C + '" transform="rotate(-30 73 70)"/><circle cx="68" cy="63" r="3" fill="' + P + '" stroke-width="1.6"/><circle cx="76" cy="58" r="3" fill="' + P + '" stroke-width="1.6"/></g>' +
      '<path d="M186 104l20-16 20 16Z" fill="' + C + '"/><path d="M196 104l10-16 10 16" fill="' + P + '" stroke-width="2"/><rect x="186" y="104" width="40" height="28" fill="' + P + '"/><path d="M196 104v28M216 104v28" stroke-width="2"/><path class="a-flag" d="M206 88V78l8 3-8 3" fill="' + Y + '" stroke-width="2"/>' +
      crowd(108, 152, [26, 18, 30, 22, 28]) + family(178, 154, .8) +
      '<path d="M190 128v-24" stroke-width="1.2"/>');

    // Day 8：Currumbin——尤加利樹上的無尾熊、彩虹吸蜜鸚鵡停在小孩的盤子上、袋鼠
    ILLOS.koala = svg(D,
      cloud(60, 10, .6, 'a-drift') +
      lorikeet(30, 28, 'a-float') + lorikeet(84, 42, 'a-bob') +
      '<path d="M-4 128h248v36H-4Z" fill="' + G + '"/>' +
      '<path d="M150 130V18q0-6 9-6t9 6v112Z" fill="' + P + '"/><path d="M155 40q4 6 0 12M162 76q-4 6 0 12M156 106q4 6 0 12" stroke-width="2"/>' +
      '<g class="a-sway"><path d="M168 38q22-10 40-4" /><ellipse cx="196" cy="30" rx="10" ry="5" fill="' + G + '" transform="rotate(-20 196 30)"/><ellipse cx="212" cy="40" rx="10" ry="5" fill="' + G + '" transform="rotate(20 212 40)"/><ellipse cx="182" cy="44" rx="9" ry="4.5" fill="' + G + '" transform="rotate(30 182 44)"/></g>' +
      '<g class="a-bob2"><ellipse cx="138" cy="92" rx="22" ry="26" fill="' + W + '"/>' +
      '<circle cx="115" cy="48" r="11" fill="' + W + '"/><circle cx="115" cy="48" r="5" fill="' + C + '" stroke-width="2"/>' +
      '<circle cx="153" cy="48" r="11" fill="' + W + '"/><circle cx="153" cy="48" r="5" fill="' + C + '" stroke-width="2"/>' +
      '<circle cx="134" cy="62" r="20" fill="' + W + '"/>' +
      '<ellipse cx="134" cy="67" rx="5.5" ry="7.5" fill="' + I + '" stroke="none"/><circle cx="126" cy="58" r="2.3" fill="' + I + '" stroke="none"/><circle cx="142" cy="58" r="2.3" fill="' + I + '" stroke="none"/>' +
      '<ellipse cx="157" cy="86" rx="9" ry="6" fill="' + W + '"/><ellipse cx="157" cy="108" rx="9" ry="6" fill="' + W + '"/></g>' +
      // 袋鼠（往右跳，身體朝右）
      '<g class="a-bob"><path d="M198 122q-12 2-24 8" stroke-width="3.4"/><path d="M200 120q6 8 18 8" stroke-width="3.4"/>' +
      '<ellipse cx="204" cy="110" rx="9" ry="14" fill="' + C + '" transform="rotate(24 204 110)"/><path d="M210 104l7 5" stroke-width="2"/>' +
      '<path d="M208 98l-2-10 4 3 2-4 2 9" fill="' + C + '" stroke-width="2"/><ellipse cx="214" cy="96" rx="7" ry="4.6" fill="' + C + '" stroke-width="2.2"/><circle cx="215" cy="95" r="1.3" fill="' + I + '" stroke="none"/></g>' +
      person(52, 150, 30, C) + person(80, 150, 27, W) +
      person(66, 150, 18, Y, { cap: G, arm: true }) +
      '<ellipse cx="78" cy="128" rx="7" ry="2.4" fill="' + P + '" stroke-width="2"/>' + lorikeet(84, 120, 'a-nod') +
      '<path d="M20 128q-2-12 6-18M24 128q-6-8-4-16" stroke-width="2.2"/>');

    // Day 9：海洋世界——海豚躍出水面、看台上的觀眾、訓練員與海灘球
    ILLOS.dolphin = svg(D,
      sun(214, 26, 10) + cloud(90, 10, .6, 'a-drift') + birds(150, 26) +
      '<path d="M-4 64H96V164H-4Z" fill="' + P + '"/>' +
      '<path d="M-4 84H96M-4 106H96M-4 128H96" stroke-width="2"/>' +
      crowd(4, 84, [16, 13, 17, 12, 15, 14, 16, 12, 15, 13]) +
      crowd(8, 106, [14, 17, 12, 16, 13, 15, 17, 14, 12, 16]) +
      crowd(2, 128, [17, 12, 15, 16, 13, 17, 14, 12, 16, 15]) +
      family(20, 152, .62) +
      '<path d="M96 108H244V164H96Z" fill="' + W + '"/><path d="M96 108H244" stroke-width="3"/>' +
      '<path d="M110 126q8-5 16 0M200 140q10-5 20 0M150 150q8-5 16 0" stroke="' + P + '"/>' +
      '<rect x="206" y="92" width="30" height="16" rx="2" fill="' + Y + '"/>' + person(222, 92, 22, C, { arm: true }) +
      '<g class="a-float"><path d="M118 112l-14 2 6-8-3-10 11 8Z" fill="' + W + '"/>' +
      '<path d="M144 60q2-12 12-15-1 8 2 13Z" fill="' + W + '"/>' +
      '<path d="M112 112Q124 70 168 64Q190 62 198 70L210 68L206 76Q192 78 176 81Q140 88 124 114Z" fill="' + W + '"/>' +
      '<path d="M130 104q16-18 42-21" stroke="' + P + '" stroke-width="3"/>' +
      '<circle cx="190" cy="70" r="2" fill="' + I + '" stroke="none"/></g>' +
      '<g class="a-bob"><circle cx="174" cy="40" r="9" fill="' + C + '"/><path d="M165 40h18M174 31q-5 9 0 18M174 31q5 9 0 18" stroke-width="2"/></g>' +
      '<circle class="a-twinkle" cx="112" cy="102" r="3" fill="' + W + '" stroke-width="2"/><circle class="a-twinkle d2" cx="104" cy="94" r="2.4" fill="' + W + '" stroke-width="2"/>');

    // Day 10：鴨子水陸車——乘客從窗戶揮手、黃金海岸高樓（最高那棟有尖塔）、遠方噴水的座頭鯨、鵜鶘
    ILLOS.duck = svg(D,
      sun(28, 26, 10) + cloud(70, 10, .6, 'a-drift') +
      skyline(118, 82, [[12, 30], [14, 46], [12, 36], [16, 62], [12, 40], [14, 52], [12, 28]]) +
      '<path d="M174 20v-14" stroke-width="2.2"/>' +
      sea(82, 240, 160) +
      '<path d="M20 90q6-6 12 0" stroke-width="2.5"/><path class="a-twinkle" d="M26 84v-8M26 78l-4-4M26 78l4-4" stroke="' + W + '" stroke-width="2.2"/>' +
      '<g class="a-bob"><path d="M34 90q0-12 12-12h106q16 0 20 16l4 30H34Z" fill="' + Y + '"/>' +
      '<rect x="46" y="84" width="18" height="14" rx="3" fill="' + W + '" stroke-width="2.4"/><rect x="72" y="84" width="18" height="14" rx="3" fill="' + W + '" stroke-width="2.4"/><rect x="98" y="84" width="18" height="14" rx="3" fill="' + W + '" stroke-width="2.4"/><rect x="124" y="84" width="18" height="14" rx="3" fill="' + W + '" stroke-width="2.4"/>' +
      '<circle cx="55" cy="94" r="4" fill="' + P + '" stroke-width="1.8"/><circle cx="81" cy="95" r="3" fill="' + P + '" stroke-width="1.8"/><circle cx="107" cy="94" r="4" fill="' + P + '" stroke-width="1.8"/><circle cx="133" cy="94" r="4" fill="' + P + '" stroke-width="1.8"/>' +
      '<path d="M84 92l4-6" stroke-width="1.8"/>' +
      '<path d="M36 108h138" stroke="' + C + '" stroke-width="5"/>' +
      '<circle cx="160" cy="64" r="14" fill="' + Y + '"/><path d="M173 62l15 4-15 6Z" fill="' + C + '"/><circle cx="164" cy="60" r="2.4" fill="' + I + '" stroke="none"/>' +
      '<circle cx="64" cy="124" r="11" fill="' + P + '"/><circle cx="148" cy="124" r="11" fill="' + P + '"/></g>' +
      sea(126, 240, 160) +
      '<path d="M210 160V118" stroke-width="4"/>' +
      '<g class="a-nod"><ellipse cx="212" cy="110" rx="11" ry="7" fill="' + P + '" stroke-width="2.2"/><path d="M204 106q-2-10 6-12" stroke-width="2.2"/><path d="M210 94l-16 4 4 4 12-4" fill="' + Y + '" stroke-width="1.8"/></g>' +
      '<path d="M20 148q8-5 16 0M120 150q8-5 16 0" stroke="' + P + '"/>');

    // Day 11：電影世界——場記板、膠捲、聚光燈、爆米花與看熱鬧的人
    function reel(cx, cy, r) {
      var holes = '';
      for (var i = 0; i < 5; i++) {
        var a = i * Math.PI * 2 / 5 - Math.PI / 2;
        holes += '<circle cx="' + (cx + r * .56 * Math.cos(a)).toFixed(1) + '" cy="' + (cy + r * .56 * Math.sin(a)).toFixed(1) + '" r="' + (r * .2).toFixed(1) + '" fill="' + P + '" stroke-width="2.2"/>';
      }
      return '<g class="a-spin-slow"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + W + '"/>' + holes + '</g><circle cx="' + cx + '" cy="' + cy + '" r="5" fill="' + Y + '" stroke-width="2.2"/>';
    }
    function star(x, y, s, cls) {
      return '<g class="' + cls + '"><path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M20 4l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3L20 27.6l-9.3 4.9 1.8-10.3L5 14.9l10.4-1.5Z" fill="' + Y + '" stroke-width="' + (2.5 / s) + '"/></g>';
    }
    ILLOS.clapper = svg(D,
      '<g class="glow"><path d="M6 132 40 14h22L30 132Z" fill="' + Y + '" fill-opacity=".45" stroke="none"/><path d="M226 132 196 14h-22l26 118Z" fill="' + Y + '" fill-opacity=".45" stroke="none"/></g>' +
      star(84, 8, .5, 'a-twinkle') + star(140, 4, .45, 'a-twinkle d2') + star(212, 40, .4, 'a-twinkle d1') +
      '<path d="M-4 132h248v32H-4Z" fill="' + C + '"/><path d="M60 146h20M180 144h18" stroke="' + P + '" stroke-width="2.5"/>' +
      '<path d="M186 108l-14 24M186 108l14 24" stroke-width="3"/>' + reel(186, 78, 30) +
      '<rect x="34" y="74" width="104" height="58" rx="6" fill="' + P + '"/>' +
      '<rect x="34" y="74" width="104" height="13" fill="' + Y + '"/><path d="M48 74l-8 13h10l8-13ZM72 74l-8 13h10l8-13ZM96 74l-8 13h10l8-13ZM120 74l-8 13h10l8-13Z" fill="' + I + '" stroke="none"/><rect x="34" y="74" width="104" height="13" />' +
      '<path d="M46 100h80M46 112h52M46 123h64" stroke-width="2"/>' +
      '<g class="a-nod"><g transform="rotate(-14 34 72)"><rect x="34" y="58" width="104" height="13" fill="' + Y + '"/><path d="M48 58l-8 13h10l8-13ZM72 58l-8 13h10l8-13ZM96 58l-8 13h10l8-13ZM120 58l-8 13h10l8-13Z" fill="' + I + '" stroke="none"/><rect x="34" y="58" width="104" height="13"/></g></g>' +
      '<circle cx="36" cy="72" r="3.5" fill="' + I + '" stroke="none"/>' +
      family(104, 156, .72) + person(14, 156, 24, G) + person(220, 156, 26, W) +
      '<path d="M144 140l3 14h12l3-14Z" fill="' + P + '" stroke-width="2"/><path d="M148 140v14M154 140v14" stroke="' + C + '" stroke-width="2"/><path d="M144 140q3-6 6-2 3-5 6 0 3-4 6 2" fill="' + Y + '" stroke-width="1.8"/>');

    // Day 12：搭火車到布里斯本——南岸的人工沙灘、棕櫚樹、拉著行李的一家人
    ILLOS.train = svg(D,
      sun(212, 24, 10) + cloud(30, 12, .6, 'a-drift') + birds(120, 22) +
      skyline(108, 84, [[12, 28], [16, 44], [12, 34], [18, 56], [12, 30]]) +
      '<g class="a-spin-slow"><circle cx="208" cy="58" r="24"/><path d="M184 58h48M208 34v48M191 41l34 34M225 41l-34 34" stroke-width="1.6"/></g><path d="M208 58l-12 26M208 58l12 26" stroke-width="2.6"/><circle cx="208" cy="58" r="4" fill="' + Y + '" stroke-width="2"/>' +
      '<path d="M-4 84h248v10H-4Z" fill="' + P + '" stroke-width="2.2"/><path d="M10 94v10M60 94v10M110 94v10M160 94v10M210 94v10" stroke-width="2.4"/>' +
      '<path d="M8 84V64q0-8 8-8h112q14 0 22 14l6 14Z" fill="' + P + '"/>' +
      '<path d="M8 76h146" stroke="' + Y + '" stroke-width="4"/>' +
      '<rect x="18" y="62" width="14" height="9" rx="2" fill="' + W + '" stroke-width="2"/><rect x="38" y="62" width="14" height="9" rx="2" fill="' + W + '" stroke-width="2"/><rect x="58" y="62" width="14" height="9" rx="2" fill="' + W + '" stroke-width="2"/><rect x="78" y="62" width="14" height="9" rx="2" fill="' + W + '" stroke-width="2"/><rect x="98" y="62" width="14" height="9" rx="2" fill="' + W + '" stroke-width="2"/>' +
      '<path d="M128 62h10q6 0 10 8h-20Z" fill="' + W + '" stroke-width="2"/><rect x="116" y="62" width="8" height="16" rx="1.5" fill="' + C + '" stroke-width="2"/>' +
      '<path d="M-4 106h248v58H-4Z" fill="' + G + '"/>' +
      '<path d="M100 124q50-10 112 0 10 6 0 12-56 10-112 0-10-6 0-12Z" fill="' + W + '"/><path d="M104 140q54 8 106-2" stroke="' + Y + '" stroke-width="5"/>' +
      '<path d="M140 128q6-4 12 0M180 130q6-4 12 0" stroke="' + P + '"/>' +
      palm(86, 140, 34) + palm(226, 126, 28) +
      family(16, 152, .82) +
      '<rect x="44" y="138" width="10" height="13" rx="2" fill="' + C + '" stroke-width="2"/><path d="M49 138v-6" stroke-width="1.8"/>');

    // Day 13：CityCat 遊河——故事橋（懸臂桁架）、市區高樓、河岸上吹泡泡的科學小孩
    ILLOS.brisbane = svg(D,
      cloud(80, 10, .6, 'a-drift') + sun(24, 24, 9) + birds(170, 18) +
      skyline(150, 90, [[14, 40], [18, 62], [14, 46], [20, 70], [14, 36]]) +
      '<path d="M-4 90h160" stroke-width="2"/>' +
      '<path d="M20 90V40M120 90V40" stroke-width="3.5"/>' +
      '<path d="M20 40 70 74 120 40M20 40Q8 60-4 72M120 40q12 20 36 32M20 74h100" stroke-width="2.6"/>' +
      '<path d="M30 74l10-18M50 74l-10-22M50 74l10-6M90 74l-10-6M90 74l10-22M110 74l-10-18" stroke-width="1.6"/>' +
      '<rect x="-4" y="74" width="160" height="6" rx="2" fill="' + Y + '"/>' +
      '<path class="a-flag" d="M120 40V28h10l-3 3 3 3h-10" fill="' + C + '" stroke-width="1.8"/>' +
      sea(96, 240, 160) +
      '<g class="a-bob"><path d="M64 122h80l-6 8H70Z" fill="' + W + '"/><path d="M72 130v6M136 130v6" stroke-width="3"/><path d="M66 136h76" stroke-width="2.4"/>' +
      '<path d="M76 122v-12q0-6 6-6h44q8 0 12 8l4 10Z" fill="' + P + '"/><path d="M84 112h8M98 112h8M112 112h8M126 112h6" stroke="' + W + '" stroke-width="4"/>' +
      '<path d="M76 118h64" stroke="' + C + '" stroke-width="2.6"/></g>' +
      '<path d="M148 132q12 2 30 0M40 130q10 2 20 0" stroke="' + P + '"/>' +
      '<path d="M156 164q20-22 88-24v24Z" fill="' + G + '"/>' +
      person(186, 152, 30, C) + person(222, 152, 27, W) + person(202, 150, 18, Y, { cap: G, arm: true }) +
      '<circle cx="213" cy="129" r="3" stroke-width="1.6"/>' +
      '<circle class="a-twinkle" cx="198" cy="114" r="5" fill="' + W + '" fill-opacity=".5" stroke-width="1.8"/><circle class="a-twinkle d2" cx="214" cy="106" r="4" fill="' + W + '" fill-opacity=".5" stroke-width="1.8"/><circle class="a-twinkle d1" cx="186" cy="104" r="3" fill="' + W + '" fill-opacity=".5" stroke-width="1.8"/>');

    ILLOS.car = svg(D,
      cloud(12, 16, .7, 'a-drift') + sun(208, 30, 11) +
      '<rect x="160" y="70" width="18" height="44" rx="3" fill="' + W + '"/><rect x="182" y="56" width="22" height="58" rx="3" fill="' + P + '"/><rect x="208" y="78" width="18" height="36" rx="3" fill="' + W + '"/>' +
      '<path d="M24 114q-4-34 6-58h7q-8 26-5 58Z" fill="' + Y + '"/>' +
      '<g class="a-sway"><path d="M33 56q-20-6-30 6 14-2 30-3Z" fill="' + G + '"/><path d="M33 56q20-8 32 4-16-2-32-1Z" fill="' + G + '"/><path d="M33 56q-8-16-24-16 14 6 22 18Z" fill="' + G + '"/></g>' +
      '<path d="M0 114h240v46H0Z" fill="' + P + '"/><path d="M0 114h240M0 156h240" />' +
      '<path d="M10 136h20M50 136h20M90 136h20M130 136h20M170 136h20M210 136h20" stroke-width="3"/>' +
      '<g class="a-bob"><ellipse cx="116" cy="74" rx="44" ry="6" fill="' + Y + '"/>' +
      '<path d="M60 124v-20q0-8 8-10l20-5q8-14 22-14h28q14 0 22 14l12 4q8 2 8 11v20Z" fill="' + C + '"/>' +
      '<path d="M96 88q5-10 14-10h12v12Z" fill="' + W + '" stroke-width="2.5"/><path d="M128 78h10q9 0 14 12h-24Z" fill="' + W + '" stroke-width="2.5"/>' +
      '<circle cx="84" cy="124" r="12" fill="' + I + '"/><circle cx="84" cy="124" r="4.5" fill="' + P + '" stroke="none"/>' +
      '<circle cx="152" cy="124" r="12" fill="' + I + '"/><circle cx="152" cy="124" r="4.5" fill="' + P + '" stroke="none"/></g>');

    // 首頁：雪梨港全景——市區天際線、港灣大橋、歌劇院、綠色渡輪、帆船、起飛的飛機、岸邊的一家人
    ILLOS.hero = svg('0 0 360 250',
      cloud(14, 26, .9, 'a-drift') + cloud(196, 14, .7, 'a-drift2') +
      sun(316, 50, 20) + birds(250, 92) +
      '<g class="a-float"><path d="M118 74 110 60h7l11 14Z" fill="' + C + '" stroke-width="2.5"/><path d="M108 80q0-6 8-6h44q12 0 17 6-5 6-17 6h-44q-8 0-8-6Z" fill="' + P + '" stroke-width="2.5"/><path d="M134 80l-10 15h8l15-15Z" fill="' + W + '" stroke-width="2.5"/></g>' +
      skyline(168, 172, [[14, 46], [18, 70], [12, 52], [16, 84], [12, 40]]) +
      '<rect x="176" y="142" width="18" height="30" rx="3" fill="' + P + '"/><rect x="336" y="142" width="18" height="30" rx="3" fill="' + P + '"/>' +
      bridgeArch(194, 336, 172, 96) +
      '<path d="M258 133V122M272 133V122" stroke-width="1.8"/><path class="a-flag" d="M258 122h9v5h-9Z" fill="' + C + '" stroke-width="1.6"/><path class="a-flag" d="M272 122h9v5h-9Z" fill="' + W + '" stroke-width="1.6"/>' +
      '<rect x="166" y="170" width="210" height="10" rx="3" fill="' + Y + '"/>' +
      '<rect x="22" y="170" width="154" height="14" rx="3" fill="' + C + '"/>' +
      '<path d="M34 170q4-42 40-54-8 28-4 54Z" fill="' + P + '"/><path d="M44 168q4-26 24-42" stroke-width="2"/>' +
      '<path d="M64 170q8-54 52-70-12 38-8 70Z" fill="' + P + '"/><path d="M76 168q6-38 34-58" stroke-width="2"/>' +
      '<path d="M102 170q10-42 44-50-8 28-6 50Z" fill="' + P + '"/><path d="M112 168q6-26 28-40" stroke-width="2"/>' +
      '<path d="M136 170q8-26 28-30-4 18-2 30Z" fill="' + P + '"/>' +
      sea(188, 360, 250) +
      '<g class="a-bob">' + sydFerry(196, 214).replace('translate(196 214)', 'translate(196 214) scale(1.2)') + '</g>' +
      '<g class="a-bob2">' + sailboat(300, 206) + '</g>' +
      '<path d="M-4 226q60-10 140 4V254H-4Z" fill="' + Y + '"/>' + family(30, 234) + person(100, 236, 28, G) +
      '<path d="M150 236q12-6 24 0M290 232q12-6 24 0" stroke="' + P + '"/>' +
      (theme === 'aussie' ? lifeguard() : ''),
      '雪梨港灣插畫：歌劇院、港灣大橋、渡輪與岸邊的一家人');
    ILLOS.mission = svg('0 0 40 40',
      '<path d="M20 4l4.6 9.4 10.4 1.5-7.5 7.3 1.8 10.3L20 27.6l-9.3 4.9 1.8-10.3L5 14.9l10.4-1.5Z" fill="' + Y + '" stroke-width="2.5"/>');

    ILLOS.planeSmall = svg('0 0 58 28',
      '<path d="M2 14h16M40 14h16" stroke-width="2" stroke-dasharray="2 4"/>' +
      '<path d="M20 15 24 14l3-5h2l-1.5 5 4 1v1.2l-4-.4.8 3h-1.6l-2.3-3.2-4.4.4Z" fill="' + P + '" stroke-width="1.8"/>');

    var ICONS = {
      walk: '<svg viewBox="0 0 20 20" aria-hidden="true"><ellipse cx="7" cy="6.5" rx="2.6" ry="3.5"/><ellipse cx="13" cy="12.5" rx="2.6" ry="3.5"/></svg>',
      ferry: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 12h14l-2 4H5Z"/><path d="M6 12V8.5h8V12M9.5 8.5V5.5h2"/></svg>',
      rail: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5" y="3" width="10" height="11" rx="3"/><path d="M5 9h10M7.5 17l1.2-3M12.5 17l-1.2-3"/></svg>',
      bus: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="3" width="12" height="12" rx="2.5"/><path d="M4 9.5h12M6.5 17.5v-2.5M13.5 17.5v-2.5"/></svg>',
      car: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 13.5V11l2-4h10l2 4v2.5Z"/><circle cx="6.5" cy="14" r="1.7"/><circle cx="13.5" cy="14" r="1.7"/></svg>',
      ride: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 14V11.5l2-4h10l2 4V14Z"/><path d="M8.5 7.5V5.5h3v2"/><circle cx="6.5" cy="14.5" r="1.7"/><circle cx="13.5" cy="14.5" r="1.7"/></svg>',
      flight: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 11.5 7.5 10.5l3.5-6h1.8L11 10.5l5.5 1v1.5l-5.5-.5 1 4h-1.8l-3-4-5.2.5Z"/></svg>',
      cable: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 4l16 3"/><path d="M10 5.5v2.5"/><rect x="6" y="8" width="8" height="8" rx="2"/></svg>',
      route: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="5" cy="15.5" r="2"/><circle cx="15" cy="4.5" r="2"/><path d="M7 15.5h5.5a2.75 2.75 0 0 0 0-5.5h-5a2.75 2.75 0 0 1 0-5.5H13"/></svg>',
      pin: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18s-5.5-5.4-5.5-9.5a5.5 5.5 0 0 1 11 0C15.5 12.6 10 18 10 18Z"/><circle cx="10" cy="8.5" r="2"/></svg>',
      out: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4H5a1.5 1.5 0 0 0-1.5 1.5v9.5A1.5 1.5 0 0 0 5 16.5h9.5A1.5 1.5 0 0 0 16 15v-3"/><path d="M11 3.5h5.5V9M16.5 3.5 9.5 10.5"/></svg>',
      bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18.5V7M3 13.5h18v5M21 13.5v-1A3.5 3.5 0 0 0 17.5 9H11v4.5"/><circle cx="7" cy="10.8" r="2"/></svg>',
      star: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6Z" fill="' + P + '" stroke="' + I + '" stroke-width="1.5" stroke-linejoin="round"/></svg>',
      check: '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3.5 9.5 7.5 13 14.5 5" fill="none" stroke="' + I + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      food: '<svg viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="' + I + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13h18a9 9 0 0 1-18 0Z" fill="' + Y + '"/><path d="M9 9c0-2 2-2 2-4M13 9c0-2 2-2 2-4M17 9c0-2 2-2 2-4"/></svg>',
      road: '<svg viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="' + I + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="13" r="10" fill="' + W + '"/><path d="M13 5v4M13 12v2M13 17v4"/></svg>'
    };

    if (theme === 'pixel') ILLOS.sprite = sprite();
    return { ILLOS: ILLOS, ICONS: ICONS };
  }

  /* 像素風：小探險家走路的兩格動畫（每個字元一格，. 是透明） */
  function grid(rows, colors) {
    var out = '';
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length;) {
        var ch = row[x], w = 1;
        while (row[x + w] === ch) w++;           // 同列連續同色合併成一個 rect
        if (colors[ch]) out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="1" fill="' + colors[ch] + '"/>';
        x += w;
      }
    });
    return out;
  }
  function sprite() {
    var col = { h: '#FFD15C', k: '#2B2140', s: '#F7C9A0', c: '#FF7B6B', w: '#5CC8FF', b: '#8A5A3C' };
    var top = ['...kkkk...', '..khhhhk..', '.khhhhhhk.', 'kkkkkkkkkk', '..ksssk...', '..kskssk..', '..ksssk...', '.kccccck..', 'kscccccsk.', '.kccccck..', '.kwwwwwk..'];
    var a = top.concat(['.kwk.kwk..', '.ksk..ksk.', 'kbbk..kbbk']);
    var b = top.concat(['..kwkwk...', '..kskskk..', '..kbbbbk..']);
    return '<svg class="px-sprite" viewBox="0 0 10 14" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' +
      '<g class="px-f1">' + grid(a, col) + '</g><g class="px-f2">' + grid(b, col) + '</g></svg>';
  }

  /* 像素化：SVG → 低解析度 canvas → 量化成固定色盤 → PNG，結果依原始 SVG 快取 */
  var pxCache = {};
  function quantize(px, colors) {
    for (var i = 0; i < px.length; i += 4) {
      if (px[i + 3] < 110) { px[i + 3] = 0; continue; }
      var hi = Math.max(px[i], px[i + 1], px[i + 2]), lo = Math.min(px[i], px[i + 1], px[i + 2]);
      if (hi - lo < 48) {                        // 灰色（線與底的混色）只能變成墨色或紙色，不會變成綠點
        var c0 = colors[(px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11) < 150 ? 1 : 0];
        px[i] = c0[0]; px[i + 1] = c0[1]; px[i + 2] = c0[2]; px[i + 3] = 255; continue;
      }
      var best = 0, bd = 1e9;
      for (var j = 0; j < colors.length; j++) {
        var c = colors[j], d = (px[i] - c[0]) * (px[i] - c[0]) + (px[i + 1] - c[1]) * (px[i + 1] - c[1]) + (px[i + 2] - c[2]) * (px[i + 2] - c[2]);
        if (d < bd) { bd = d; best = j; }
      }
      px[i] = colors[best][0]; px[i + 1] = colors[best][1]; px[i + 2] = colors[best][2]; px[i + 3] = 255;
    }
  }
  function rgb(hex) { return [1, 3, 5].map(function (k) { return parseInt(hex.slice(k, k + 2), 16); }); }
  function pixelate(root) {
    var pal = PALETTES.pixel, colors = [pal.P, pal.I, pal.C, pal.Y, pal.W, pal.G].map(rgb);
    Array.prototype.forEach.call((root || document).querySelectorAll('svg.px-src'), function (el) {
      var src = el.outerHTML, vb = el.getAttribute('viewBox').split(' ').map(Number);
      var div = vb[2] >= 200 ? 3 : 2, w = Math.round(vb[2] / div), h = Math.round(vb[3] / div);
      var label = el.getAttribute('aria-label');
      function place(url) {
        if (!el.parentNode) return;
        var img = document.createElement('img');
        img.className = 'illo px-img'; img.width = w; img.height = h; img.src = url; img.alt = label || '';
        if (!label) img.setAttribute('aria-hidden', 'true');
        el.parentNode.replaceChild(img, el);
      }
      if (pxCache[src]) { place(pxCache[src]); return; }
      var im = new Image();
      im.onload = function () {
        try {
          // 先畫成 4 倍大，再每 4×4 取中心一點（不混色），邊緣才不會冒出雜色
          var k = 4, big = document.createElement('canvas'); big.width = w * k; big.height = h * k;
          big.getContext('2d').drawImage(im, 0, 0, w * k, h * k);
          var src4 = big.getContext('2d').getImageData(0, 0, w * k, h * k).data;
          var cv = document.createElement('canvas'); cv.width = w; cv.height = h;
          var cx = cv.getContext('2d'), data = cx.createImageData(w, h);
          for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
            var si = ((y * k + k / 2) * w * k + x * k + k / 2) * 4, di = (y * w + x) * 4;
            data.data[di] = src4[si]; data.data[di + 1] = src4[si + 1]; data.data[di + 2] = src4[si + 2]; data.data[di + 3] = src4[si + 3];
          }
          quantize(data.data, colors);
          cx.putImageData(data, 0, 0);
          pxCache[src] = cv.toDataURL('image/png');
          place(pxCache[src]);
        } catch (e) { el.classList.remove('px-src'); }   // 失敗就留著向量圖
      };
      im.onerror = function () { el.classList.remove('px-src'); };
      im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src);
    });
  }
  window.pixelate = pixelate;

  /* 護照章：currentColor 單色，顏色由外層 CSS 的 color 決定。o = { top, mid, day, bottom, shape } */
  var stampSeq = 0;
  function fit(text, max, room) { return Math.min(max, room / (String(text).length * 0.6)).toFixed(1); }
  function txt(x, y, s, size, extra) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" text-anchor="middle" fill="currentColor" stroke="none"' + (extra || '') + '>' + s + '</text>';
  }
  function makeStamp(o) {
    var g;
    if (o.shape === 'rect') {
      g = '<rect x="5" y="24" width="110" height="72" rx="9" stroke-width="3.5"/><rect x="11" y="30" width="98" height="60" rx="5" stroke-width="1.3"/>' +
        '<path d="M17 54h86M17 75h86" stroke-width="1.3"/>' +
        txt(60, 47, o.top, fit(o.top, 13, 90)) + txt(60, 69, o.mid, 11) + txt(60, 87, o.day + ' · ' + o.bottom, fit(o.day + ' · ' + o.bottom, 9.5, 88));
    } else {
      var id = 'stp' + (++stampSeq);
      g = '<circle cx="60" cy="60" r="55" stroke-width="3.5"/><circle cx="60" cy="60" r="41" stroke-width="1.3"/>' +
        '<path id="' + id + 't" d="M14.5 60a45.5 45.5 0 0 1 91 0" stroke="none"/><path id="' + id + 'b" d="M8.5 60a51.5 51.5 0 0 0 103 0" stroke="none"/>' +
        '<text font-size="' + fit(o.top, 11.5, 120) + '" fill="currentColor" stroke="none" letter-spacing="1"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">' + o.top + '</textPath></text>' +
        '<text font-size="' + fit(o.bottom, 9.5, 110) + '" fill="currentColor" stroke="none" letter-spacing="1"><textPath href="#' + id + 'b" startOffset="50%" text-anchor="middle">' + o.bottom + '</textPath></text>' +
        '<path d="M26 64h68" stroke-width="1.3"/>' + txt(60, 57, o.mid, 10) + txt(60, 82, o.day, 15);
    }
    return '<svg class="stamp" viewBox="0 0 120 120" fill="none" stroke="currentColor" focusable="false" aria-hidden="true">' + g + '</svg>';
  }
  window.makeStamp = makeStamp;

  window.buildArt = build;
  var art = build(document.documentElement.getAttribute('data-theme'));
  window.ILLOS = art.ILLOS;
  window.ICONS = art.ICONS;
})();
