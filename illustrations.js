/* 手繪風 SVG 插圖：平塗四色＋墨灰粗線。動態用 a-* class，減少動態效果時會全部停止。
   同一套圖依風格換色：window.buildArt(主題名) 會用對應色票重畫插圖與圖示。 */
(function () {
  var PALETTES = {
    book: { P: '#FFFCF6', I: '#3E3A39', C: '#F2A497', Y: '#F6D27A', W: '#A8D3E6', G: '#B9DAA5' },
    aussie: { P: '#FFF8EC', I: '#1E3557', C: '#EE8B5B', Y: '#F4BE3E', W: '#7EC4CF', G: '#97C08F' },
    passport: { P: '#FBF8EF', I: '#26344D', C: '#DE8579', Y: '#E9C46A', W: '#8DB3D1', G: '#9DBB94' }
  };

  function build(theme) {
    var pal = PALETTES[theme] || PALETTES.book;
    var P = pal.P, I = pal.I, C = pal.C, Y = pal.Y, W = pal.W, G = pal.G;

    function svg(vb, inner, label) {
      var a = label ? ' role="img" aria-label="' + label + '"' : ' aria-hidden="true"';
      return '<svg class="illo" viewBox="' + vb + '" fill="none" stroke="' + I + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" focusable="false"' + a + '>' + inner + '</svg>';
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

    var D = '0 0 240 160';
    var ILLOS = {};

    ILLOS.plane = svg(D,
      cloud(18, 30, 1, 'a-drift') + cloud(160, 104, .8, 'a-drift2') +
      '<g class="a-float">' + plane(false) + '</g>');

    ILLOS.planeHome = svg(D,
      '<path class="a-twinkle" d="M196 26q4 0 4-4 0 4 4 4-4 0-4 4 0-4-4-4Z" fill="' + Y + '" stroke-width="2"/>' +
      '<path class="a-twinkle d2" d="M36 112q3 0 3-3 0 3 3 3-3 0-3 3 0-3-3-3Z" fill="' + Y + '" stroke-width="2"/>' +
      '<path d="M44 30a18 18 0 1 0 22 26 14 14 0 1 1-22-26Z" fill="' + Y + '"/>' +
      cloud(150, 108, .8, 'a-drift2') +
      '<g class="a-float">' + plane(true) + '</g>');

    ILLOS.bridge = svg(D,
      '<path class="a-twinkle" d="M40 26q4 0 4-4 0 4 4 4-4 0-4 4 0-4-4-4Z" fill="' + Y + '" stroke-width="2"/>' +
      '<path class="a-twinkle d2" d="M120 18q3 0 3-3 0 3 3 3-3 0-3 3 0-3-3-3Z" fill="' + Y + '" stroke-width="2"/>' +
      '<path class="a-twinkle d1" d="M196 30q4 0 4-4 0 4 4 4-4 0-4 4 0-4-4-4Z" fill="' + Y + '" stroke-width="2"/>' +
      '<path d="M40 104Q120 20 200 104" stroke-width="4"/>' +
      '<path d="M56 104Q120 40 184 104"/>' +
      '<path d="M72 104V92M88 104V80M104 104V75M120 104V72M136 104V75M152 104V80M168 104V92" stroke-width="2"/>' +
      '<rect x="10" y="104" width="220" height="10" rx="3" fill="' + Y + '"/>' +
      '<rect x="16" y="74" width="24" height="30" rx="3" fill="' + P + '"/><rect x="200" y="74" width="24" height="30" rx="3" fill="' + P + '"/>' +
      '<circle class="a-twinkle" cx="53" cy="88" r="4.5" fill="' + C + '"/><circle class="a-twinkle d1" cx="72" cy="72" r="4.5" fill="' + Y + '"/>' +
      '<circle class="a-twinkle d2" cx="96" cy="62" r="4.5" fill="' + W + '"/><circle class="a-twinkle d3" cx="120" cy="58" r="4.5" fill="' + G + '"/>' +
      '<circle class="a-twinkle" cx="144" cy="62" r="4.5" fill="' + C + '"/><circle class="a-twinkle d1" cx="168" cy="72" r="4.5" fill="' + Y + '"/>' +
      '<circle class="a-twinkle d2" cx="187" cy="88" r="4.5" fill="' + W + '"/>' +
      sea(128, 240, 160) +
      '<path d="M30 146q8-5 16 0M150 142q8-5 16 0" stroke="' + P + '"/>');

    ILLOS.opera = svg(D,
      sun(200, 38, 15) + cloud(14, 20, .75, 'a-drift') +
      '<rect x="30" y="106" width="166" height="14" rx="3" fill="' + C + '"/>' +
      '<path d="M44 106q4-42 40-56-8 28-4 56Z" fill="' + P + '"/><path d="M54 104q4-26 24-42" stroke-width="2"/>' +
      '<path d="M76 106q8-52 52-68-12 36-8 68Z" fill="' + P + '"/><path d="M88 104q6-36 34-56" stroke-width="2"/>' +
      '<path d="M116 106q10-38 44-46-8 26-6 46Z" fill="' + P + '"/><path d="M126 104q6-24 28-38" stroke-width="2"/>' +
      '<path d="M150 106q8-24 30-28-4 16-2 28Z" fill="' + P + '"/>' +
      sea(126, 240, 160) +
      '<g class="a-bob"><path d="M150 134h44l-6 10h-32Z" fill="' + Y + '"/><path d="M172 134v-18l12 14Z" fill="' + P + '" stroke-width="2.5"/></g>' +
      '<path d="M30 148q8-5 16 0" stroke="' + P + '"/>');

    ILLOS.ship = svg(D,
      cloud(16, 18, .7, 'a-drift') + gull(180, 30) + gull(200, 40) +
      '<g class="a-bob">' +
      '<path d="M100 40v72M148 22v90" />' +
      '<path d="M82 44q18 6 36 0v22q-18 6-36 0Z" fill="' + P + '"/><path d="M84 72q16 6 32 0v24q-16 6-32 0Z" fill="' + P + '"/>' +
      '<path d="M128 32q20 6 40 0v26q-20 6-40 0Z" fill="' + P + '"/><path d="M130 64q18 6 36 0v28q-18 6-36 0Z" fill="' + P + '"/>' +
      '<path class="a-flag" d="M148 22 166 16 148 9Z" fill="' + C + '" stroke-width="2.5"/>' +
      '<path d="M48 108h146l-14 26H62Z" fill="' + C + '"/><path d="M194 108l22-12" />' +
      '<circle cx="90" cy="120" r="3.5" fill="' + W + '" stroke-width="2"/><circle cx="110" cy="120" r="3.5" fill="' + W + '" stroke-width="2"/><circle cx="130" cy="120" r="3.5" fill="' + W + '" stroke-width="2"/><circle cx="150" cy="120" r="3.5" fill="' + W + '" stroke-width="2"/>' +
      '</g>' + sea(130, 240, 160) + '<path d="M24 148q8-5 16 0M196 146q8-5 16 0" stroke="' + P + '"/>');

    ILLOS.dino = svg(D,
      sun(206, 32, 12) +
      '<path d="M0 134q120-24 240 0v30H0Z" fill="' + G + '"/>' +
      '<path d="M24 132q-2-22 10-34M24 132q-14-14-12-30M24 132q10-16 24-20" stroke-width="2.5"/>' +
      '<path d="M72 110c-20 0-36-6-52-16 12 20 34 30 58 28Z" fill="' + G + '"/>' +
      '<rect x="86" y="108" width="18" height="28" rx="7" fill="' + G + '"/><rect x="136" y="108" width="18" height="28" rx="7" fill="' + G + '"/>' +
      '<g class="a-nod"><path d="M140 92c10-22 18-38 26-48l18 6c-8 14-16 32-24 54Z" fill="' + G + '"/>' +
      '<ellipse cx="182" cy="42" rx="17" ry="12" fill="' + G + '"/>' +
      '<circle cx="186" cy="38" r="2.6" fill="' + I + '" stroke="none"/><path d="M188 47q4 2 8-1" stroke-width="2"/><circle cx="177" cy="46" r="3" fill="' + C + '" stroke="none"/></g>' +
      '<path d="M66 116c-4-24 18-38 46-38 28 0 48 12 52 30 2 10-4 14-14 14H78c-8 0-12-2-12-6Z" fill="' + G + '"/>' +
      '<circle cx="98" cy="96" r="6" fill="' + C + '" stroke-width="2"/><circle cx="118" cy="88" r="5" fill="' + Y + '" stroke-width="2"/><circle cx="136" cy="100" r="6" fill="' + C + '" stroke-width="2"/>');

    ILLOS.mountain = svg(D,
      sun(212, 26, 11) +
      '<path d="M0 112 40 70l30 22 40-38 40 34 40-28 50 40v68H0Z" fill="' + W + '"/>' +
      '<path d="M6 40 234 72" stroke-width="2"/>' +
      '<g class="a-glide"><path d="M50 46v8" stroke-width="2"/><rect x="38" y="54" width="26" height="20" rx="6" fill="' + C + '"/><rect x="43" y="59" width="7" height="7" rx="2" fill="' + P + '" stroke-width="2"/><rect x="53" y="59" width="7" height="7" rx="2" fill="' + P + '" stroke-width="2"/></g>' +
      '<path d="M0 128q60-24 120-8t120-4v48H0Z" fill="' + G + '"/>' +
      '<path d="M150 126V86q0-14 8-18 8 4 8 18v40Z" fill="' + Y + '"/><path d="M168 126V78q0-16 9-20 9 4 9 20v48Z" fill="' + Y + '"/><path d="M188 126V92q0-12 8-16 8 4 8 16v34Z" fill="' + Y + '"/>' +
      '<path d="M152 96h12M152 110h12M170 90h14M170 104h14M190 100h12M190 114h12" stroke-width="2"/>' +
      '<path d="M44 140V112" stroke-width="4"/><g class="a-sway"><circle cx="44" cy="102" r="16" fill="' + G + '"/></g>');

    ILLOS.ferry = svg(D,
      cloud(20, 18, .8, 'a-drift') + gull(150, 28) +
      '<path d="M150 124q40-20 94-14v30H150Z" fill="' + Y + '"/>' +
      '<path d="M206 112V82" /><path d="M186 86q20-16 40 0Z" fill="' + C + '"/>' +
      sea(124, 240, 160) +
      '<g class="a-bob"><path d="M22 118h134l-10 18H32Z" fill="' + G + '"/>' +
      '<rect x="38" y="96" width="104" height="22" rx="6" fill="' + Y + '"/>' +
      '<rect x="46" y="101" width="11" height="10" rx="2" fill="' + P + '" stroke-width="2"/><rect x="63" y="101" width="11" height="10" rx="2" fill="' + P + '" stroke-width="2"/><rect x="80" y="101" width="11" height="10" rx="2" fill="' + P + '" stroke-width="2"/><rect x="97" y="101" width="11" height="10" rx="2" fill="' + P + '" stroke-width="2"/><rect x="114" y="101" width="11" height="10" rx="2" fill="' + P + '" stroke-width="2"/>' +
      '<rect x="74" y="82" width="34" height="14" rx="5" fill="' + P + '"/><path d="M91 82V70" /><path class="a-flag" d="M91 70l12-4-12-5Z" fill="' + C + '" stroke-width="2"/></g>' +
      '<path d="M14 148q8-5 16 0M168 146q8-5 16 0" stroke="' + P + '"/>');

    ILLOS.park = svg(D,
      cloud(10, 14, .7, 'a-drift') +
      '<path d="M0 134h240v30H0Z" fill="' + G + '"/>' +
      '<path d="M168 72 150 134M168 72l18 62" stroke-width="3.5"/>' +
      wheel(168, 72, 42, [C, Y, W, G]) +
      '<path d="M8 120q22-70 46-30t40-10q14-28 26 40" stroke-width="3.5"/>' +
      '<path d="M28 134v-30M54 134V90M80 134v-26M106 134V86" stroke-width="2"/>' +
      '<g class="a-bob2"><rect x="88" y="74" width="22" height="14" rx="5" fill="' + C + '" transform="rotate(-24 99 81)"/></g>');

    ILLOS.duck = svg(D,
      sun(30, 30, 12) + cloud(150, 16, .7, 'a-drift') +
      '<g class="a-bob"><path d="M36 78q0-14 14-14h112q18 0 22 18l4 34H36Z" fill="' + Y + '"/>' +
      '<rect x="50" y="72" width="20" height="16" rx="3" fill="' + W + '" stroke-width="2.5"/><rect x="78" y="72" width="20" height="16" rx="3" fill="' + W + '" stroke-width="2.5"/><rect x="106" y="72" width="20" height="16" rx="3" fill="' + W + '" stroke-width="2.5"/><rect x="134" y="72" width="20" height="16" rx="3" fill="' + W + '" stroke-width="2.5"/>' +
      '<path d="M38 100h150" stroke="' + C + '" stroke-width="5"/>' +
      '<circle cx="172" cy="52" r="15" fill="' + Y + '"/><path d="M186 50l16 4-16 6Z" fill="' + C + '"/><circle cx="176" cy="48" r="2.6" fill="' + I + '" stroke="none"/>' +
      '<circle cx="72" cy="118" r="12" fill="' + P + '"/><circle cx="160" cy="118" r="12" fill="' + P + '"/></g>' +
      sea(124, 240, 160) +
      '<circle cx="204" cy="122" r="3" fill="' + W + '" stroke-width="2"/><circle cx="214" cy="114" r="2.5" fill="' + W + '" stroke-width="2"/>' +
      '<path d="M20 146q8-5 16 0M120 148q8-5 16 0" stroke="' + P + '"/>');

    ILLOS.digger = svg(D,
      '<circle cx="36" cy="52" r="20" fill="' + G + '"/><path d="M36 72v24" stroke-width="4"/><circle cx="70" cy="38" r="16" fill="' + G + '"/><path d="M70 54v40" stroke-width="4"/>' +
      sun(210, 30, 11) +
      '<path d="M0 134h240v30H0Z" fill="' + G + '"/>' +
      '<path d="M150 134q30-40 66 0Z" fill="' + C + '"/>' +
      '<g class="a-dig"><path d="M116 88l46-34 8 8-46 36Z" fill="' + Y + '"/><path d="M162 56l20 38-8 4-20-36Z" fill="' + Y + '"/>' +
      '<path d="M170 92l22 6q0 16-16 16Z" fill="' + C + '"/><circle cx="164" cy="58" r="4" fill="' + P + '" stroke-width="2"/></g>' +
      '<rect x="50" y="78" width="72" height="38" rx="8" fill="' + Y + '"/><path d="M60 84h28v20H60Z" fill="' + W + '" stroke-width="2.5"/><circle cx="118" cy="90" r="4" fill="' + P + '" stroke-width="2"/>' +
      '<rect x="40" y="114" width="96" height="22" rx="11" fill="' + P + '"/>' +
      '<circle cx="56" cy="125" r="5"/><circle cx="76" cy="125" r="5"/><circle cx="96" cy="125" r="5"/><circle cx="116" cy="125" r="5"/>');

    ILLOS.art = svg(D,
      cloud(12, 14, .7, 'a-drift') +
      '<path d="M0 132h240v30H0Z" fill="' + G + '"/>' +
      '<path d="M80 110 66 136M120 110l14 26M100 110v26" />' +
      '<rect x="56" y="38" width="88" height="70" rx="6" fill="' + P + '"/>' +
      '<circle cx="80" cy="60" r="9" fill="' + Y + '" stroke-width="2.5"/><path d="M64 98q14-24 30-10t44-14v26H64Z" fill="' + G + '" stroke-width="2.5"/><path d="M64 86q16-8 30 0t44-2" stroke-width="2"/>' +
      '<path d="M184 136q-6-40 6-80h8q-10 40-4 80Z" fill="' + Y + '"/>' +
      '<g class="a-sway"><path d="M194 56q-24-10-40 6 18-4 40-2Z" fill="' + G + '"/><path d="M194 56q24-12 40 4-20-2-40 0Z" fill="' + G + '"/><path d="M194 56q-14-22-34-20 18 6 30 22Z" fill="' + G + '"/><path d="M194 56q12-22 34-22-18 8-30 24Z" fill="' + G + '"/></g>' +
      '<path d="M150 120q0-14 18-14t18 12q0 6-6 6-8-2-10 4-4 6-12 4-8-2-8-12Z" fill="' + P + '"/>' +
      '<circle cx="160" cy="116" r="3" fill="' + C + '" stroke-width="1.5"/><circle cx="170" cy="112" r="3" fill="' + Y + '" stroke-width="1.5"/><circle cx="178" cy="117" r="3" fill="' + W + '" stroke-width="1.5"/>');

    ILLOS.brisbane = svg(D,
      cloud(150, 12, .7, 'a-drift') +
      '<rect x="140" y="62" width="22" height="52" rx="3" fill="' + P + '"/><rect x="166" y="46" width="26" height="68" rx="3" fill="' + W + '"/><rect x="196" y="72" width="22" height="42" rx="3" fill="' + P + '"/>' +
      '<path d="M146 72h10M146 84h10M146 96h10M172 58h14M172 72h14M172 86h14M172 100h14M202 82h10M202 96h10" stroke-width="2"/>' +
      '<path d="M0 114h240v12H0Z" fill="' + G + '"/>' +
      '<path d="M66 64 48 114M66 64l18 50" stroke-width="3.5"/>' +
      wheel(66, 64, 40, [Y, C, W, G]) +
      sea(126, 240, 160) +
      '<g class="a-bob"><path d="M120 132h80l-8 12h-64Z" fill="' + P + '"/><rect x="134" y="120" width="52" height="12" rx="5" fill="' + C + '"/></g>' +
      '<path d="M20 148q8-5 16 0" stroke="' + P + '"/>');

    ILLOS.koala = svg(D,
      cloud(14, 16, .7, 'a-drift') +
      '<path d="M0 134h240v30H0Z" fill="' + G + '"/>' +
      '<path d="M150 136V18q0-6 9-6t9 6v118Z" fill="' + Y + '"/><path d="M155 40q4 6 0 12M162 76q-4 6 0 12M156 108q4 6 0 12" stroke-width="2"/>' +
      '<g class="a-sway"><path d="M168 38q22-10 40-4" /><ellipse cx="196" cy="30" rx="10" ry="5" fill="' + G + '" transform="rotate(-20 196 30)"/><ellipse cx="212" cy="40" rx="10" ry="5" fill="' + G + '" transform="rotate(20 212 40)"/><ellipse cx="182" cy="44" rx="9" ry="4.5" fill="' + G + '" transform="rotate(30 182 44)"/></g>' +
      '<g class="a-bob2"><ellipse cx="138" cy="98" rx="24" ry="28" fill="' + W + '"/>' +
      '<circle cx="113" cy="50" r="12" fill="' + W + '"/><circle cx="113" cy="50" r="5.5" fill="' + C + '" stroke-width="2"/>' +
      '<circle cx="155" cy="50" r="12" fill="' + W + '"/><circle cx="155" cy="50" r="5.5" fill="' + C + '" stroke-width="2"/>' +
      '<circle cx="134" cy="64" r="22" fill="' + W + '"/>' +
      '<ellipse cx="134" cy="69" rx="6" ry="8" fill="' + I + '" stroke="none"/><circle cx="125" cy="60" r="2.4" fill="' + I + '" stroke="none"/><circle cx="143" cy="60" r="2.4" fill="' + I + '" stroke="none"/>' +
      '<circle cx="121" cy="71" r="3" fill="' + C + '" stroke="none"/><circle cx="147" cy="71" r="3" fill="' + C + '" stroke="none"/>' +
      '<ellipse cx="158" cy="92" rx="10" ry="7" fill="' + W + '"/><ellipse cx="158" cy="116" rx="10" ry="7" fill="' + W + '"/></g>' +
      '<g class="a-float"><ellipse cx="62" cy="64" rx="16" ry="10" fill="' + G + '"/><circle cx="48" cy="56" r="8" fill="' + W + '"/><path d="M40 56l-7 2 7 3Z" fill="' + C + '" stroke-width="2"/><ellipse cx="54" cy="66" rx="6" ry="5" fill="' + Y + '" stroke-width="2"/><path d="M76 66l14 6-12-2" fill="' + G + '" stroke-width="2"/><circle cx="46" cy="54" r="1.6" fill="' + I + '" stroke="none"/></g>' +
      '<path d="M30 134q-2-14 6-22M30 134q-8-10-6-20M74 134q2-12 10-18" stroke-width="2.5"/>');

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

    ILLOS.hero = svg('0 0 360 250',
      cloud(20, 30, 1, 'a-drift') + cloud(196, 18, .75, 'a-drift2') +
      sun(306, 56, 22) + gull(250, 96) + gull(272, 104) +
      '<g class="a-float"><path d="M118 74 110 60h7l11 14Z" fill="' + C + '" stroke-width="2.5"/><path d="M108 80q0-6 8-6h44q12 0 17 6-5 6-17 6h-44q-8 0-8-6Z" fill="' + P + '" stroke-width="2.5"/><path d="M134 80l-10 15h8l15-15Z" fill="' + W + '" stroke-width="2.5"/></g>' +
      '<path d="M194 176Q265 92 336 176" stroke-width="4"/><path d="M206 176Q265 112 324 176"/>' +
      '<path d="M221 176v-18M236 176v-26M250 176v-30M265 176v-32M280 176v-30M294 176v-26M309 176v-18" stroke-width="2"/>' +
      '<rect x="166" y="172" width="210" height="10" rx="3" fill="' + Y + '"/>' +
      '<rect x="176" y="142" width="18" height="30" rx="3" fill="' + P + '"/><rect x="336" y="142" width="18" height="30" rx="3" fill="' + P + '"/>' +
      '<circle class="a-twinkle" cx="215" cy="155" r="4" fill="' + C + '"/><circle class="a-twinkle d1" cx="237" cy="141" r="4" fill="' + Y + '"/><circle class="a-twinkle d2" cx="258" cy="134" r="4" fill="' + W + '"/><circle class="a-twinkle d3" cx="279" cy="136" r="4" fill="' + G + '"/><circle class="a-twinkle" cx="300" cy="144" r="4" fill="' + C + '"/><circle class="a-twinkle d1" cx="322" cy="161" r="4" fill="' + Y + '"/>' +
      '<rect x="22" y="170" width="154" height="14" rx="3" fill="' + C + '"/>' +
      '<path d="M34 170q4-42 40-54-8 28-4 54Z" fill="' + P + '"/><path d="M44 168q4-26 24-42" stroke-width="2"/>' +
      '<path d="M64 170q8-54 52-70-12 38-8 70Z" fill="' + P + '"/><path d="M76 168q6-38 34-58" stroke-width="2"/>' +
      '<path d="M102 170q10-42 44-50-8 28-6 50Z" fill="' + P + '"/><path d="M112 168q6-26 28-40" stroke-width="2"/>' +
      '<path d="M136 170q8-26 28-30-4 18-2 30Z" fill="' + P + '"/>' +
      sea(188, 360, 250) +
      '<g class="a-bob"><path d="M150 206h112l-8 16H158Z" fill="' + G + '"/><rect x="162" y="188" width="88" height="18" rx="5" fill="' + Y + '"/>' +
      '<rect x="170" y="192" width="9" height="8" rx="2" fill="' + P + '" stroke-width="2"/><rect x="186" y="192" width="9" height="8" rx="2" fill="' + P + '" stroke-width="2"/><rect x="202" y="192" width="9" height="8" rx="2" fill="' + P + '" stroke-width="2"/><rect x="218" y="192" width="9" height="8" rx="2" fill="' + P + '" stroke-width="2"/><rect x="234" y="192" width="9" height="8" rx="2" fill="' + P + '" stroke-width="2"/>' +
      '<rect x="190" y="177" width="30" height="11" rx="4" fill="' + P + '"/></g>' +
      '<path d="M24 230q12-6 24 0M80 220q12-6 24 0M286 228q12-6 24 0M300 210q10-5 20 0" stroke="' + P + '"/>' +
      (theme === 'aussie' ? lifeguard() : ''),
      '雪梨港灣插畫：歌劇院、港灣大橋、渡輪與太陽');

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
      pin: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18s-5.5-5.4-5.5-9.5a5.5 5.5 0 0 1 11 0C15.5 12.6 10 18 10 18Z"/><circle cx="10" cy="8.5" r="2"/></svg>',
      out: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4H5a1.5 1.5 0 0 0-1.5 1.5v9.5A1.5 1.5 0 0 0 5 16.5h9.5A1.5 1.5 0 0 0 16 15v-3"/><path d="M11 3.5h5.5V9M16.5 3.5 9.5 10.5"/></svg>',
      bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18.5V7M3 13.5h18v5M21 13.5v-1A3.5 3.5 0 0 0 17.5 9H11v4.5"/><circle cx="7" cy="10.8" r="2"/></svg>',
      star: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6Z" fill="' + P + '" stroke="' + I + '" stroke-width="1.5" stroke-linejoin="round"/></svg>',
      check: '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3.5 9.5 7.5 13 14.5 5" fill="none" stroke="' + I + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      food: '<svg viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="' + I + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13h18a9 9 0 0 1-18 0Z" fill="' + Y + '"/><path d="M9 9c0-2 2-2 2-4M13 9c0-2 2-2 2-4M17 9c0-2 2-2 2-4"/></svg>',
      road: '<svg viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="' + I + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="13" r="10" fill="' + W + '"/><path d="M13 5v4M13 12v2M13 17v4"/></svg>'
    };

    return { ILLOS: ILLOS, ICONS: ICONS };
  }

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
