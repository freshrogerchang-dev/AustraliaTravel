/* 背景配樂：Web Audio 即時合成，原創曲，不用任何音檔、不連網。
   預設關閉；只有使用者在「設定」按下「背景配樂」開關才會發聲（瀏覽器也規定要先有點擊）。
   切到別的分頁或鎖螢幕時自動暫停。

   播放引擎改寫自《SVG 動畫圖鑑》svg-scene-maker skill 的 tools/scene-bgm.js：
   Copyright (c) 2026 SVG Scene Atlas — MIT License
   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
   documentation files (the "Software"), to deal in the Software without restriction, including without limitation
   the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
   permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright
   notice and this permission notice shall be included in all copies or substantial portions of the Software.
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

   和聲規則（照 skill 的 sound.md）：旋律在拍點上的音都是當下和弦的組成音；經過音只在反拍、只有一格；
   鐘琴只用整數泛音；低音走和弦根音；音樂軌主音量 0.64。 */
(function () {
  'use strict';
  var AC = window.AudioContext || window.webkitAudioContext;
  var btn = document.getElementById('music-toggle');
  if (!AC) { if (btn) btn.closest('.setting-row').hidden = true; return; }

  function hz(n) {
    var m = /^([A-G])([#b]?)(\d)$/.exec(n);
    var st = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
    return 440 * Math.pow(2, (st + (+m[3] + 1) * 12 - 69) / 12);
  }
  function seq(list) {
    var map = {}, s = 0;
    list.forEach(function (x) { if (x[0] !== '-') map[s] = x; s += x[1]; });
    return map;
  }

  var ctx = null, out = null, timer = null, playing = false, nextT = 0, step = 0, noiseBuf = null;

  function env(t, a, d, v) {
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    g.connect(out); return g;
  }
  function osc(type, f, t, dur, dest) {
    var o = ctx.createOscillator(); o.type = type; o.frequency.value = f;
    o.connect(dest); o.start(t); o.stop(t + dur + 0.05); return o;
  }
  function noise() {
    if (!noiseBuf) {
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      var x = noiseBuf.getChannelData(0); for (var i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1;
    }
    var s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true; return s;
  }
  var I = {
    // 烏克麗麗般的撥弦：三角波＋快速收的低通
    uke: function (f, t, d, v) {
      var lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
      lp.frequency.setValueAtTime(2400, t); lp.frequency.exponentialRampToValueAtTime(500, t + d);
      lp.connect(env(t, 0.004, d, v));
      osc('triangle', f, t, d, lp); osc('sawtooth', f, t, d * 0.4, env(t, 0.004, d * 0.3, v * 0.12));
    },
    // 鐘琴：只用整數泛音 1、2、3
    bell: function (f, t, d, v) {
      [1, 2, 3].forEach(function (k, i) { osc('sine', f * k, t, d / (i + 1), env(t, 0.003, d / (i + 1), v / (i + 1.6))); });
    },
    // 長笛：正弦波、慢起音、輕微抖音
    flute: function (f, t, d, v) {
      var g = ctx.createGain(); g.connect(out);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.1);
      g.gain.setValueAtTime(v, t + Math.max(0.11, d - 0.15)); g.gain.linearRampToValueAtTime(0.0001, t + d + 0.1);
      var o = osc('sine', f, t, d + 0.12, g);
      var lfo = ctx.createOscillator(), lg = ctx.createGain();
      lfo.frequency.value = 5; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * 0.006, t + 0.35);
      lfo.connect(lg); lg.connect(o.frequency); lfo.start(t); lfo.stop(t + d + 0.2);
    },
    // 低音：根音
    bass: function (f, t, d, v) { osc('sine', f, t, d, env(t, 0.01, d, v)); },
    // 海浪：濾過的白噪音慢慢起落
    wave: function (t, d, v) {
      var n = noise(), lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 480;
      var g = ctx.createGain(); g.connect(out);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + d * 0.45); g.gain.linearRampToValueAtTime(0.0001, t + d);
      n.connect(lp); lp.connect(g); n.start(t); n.stop(t + d + 0.1);
    }
  };

  /* 曲譜：〈海邊的小探險家〉原創，C 大調 4/4，每小節 8 格（八分音符），96 BPM
     和弦進行：C – G – Am – F – C – G – F – G（8 小節循環）
     逐小節核對（拍點 0/2/4/6 上的旋律音 → 和弦音）：
       1 C : G4 C5 E5 (E5)   ✓ 經過音 D5 在第 7 格（反拍、1 格）
       2 G : B4 D5 G5 D5     ✓
       3 Am: C5 E5 A5 (A5)   ✓ 經過音 G5 在第 7 格
       4 F : A5 F5 C5 (C5)   ✓
       5 C : E5 G5 E5 C5     ✓
       6 G : D5 B4 G4 (G4)   ✓ 經過音 A4 在第 7 格
       7 F : A4 C5 F5 C5     ✓
       8 G : B4 D5 G4 (G4)   ✓ 回到第 1 小節的 C */
  var CH = { C: ['C3', 'C4', 'E4', 'G4'], G: ['G2', 'G3', 'B3', 'D4'], Am: ['A2', 'A3', 'C4', 'E4'], F: ['F2', 'F3', 'A3', 'C4'] };
  var BARS = ['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'G'];
  var MEL = seq([
    ['G4', 2], ['C5', 2], ['E5', 3], ['D5', 1],
    ['B4', 2], ['D5', 2], ['G5', 2], ['D5', 2],
    ['C5', 2], ['E5', 2], ['A5', 3], ['G5', 1],
    ['A5', 2], ['F5', 2], ['C5', 4],
    ['E5', 2], ['G5', 2], ['E5', 2], ['C5', 2],
    ['D5', 2], ['B4', 2], ['G4', 3], ['A4', 1],
    ['A4', 2], ['C5', 2], ['F5', 2], ['C5', 2],
    ['B4', 2], ['D5', 2], ['G4', 4]
  ]);
  var BPM = 96, SPB = 2, STEPS = 64, VOL = 0.5;
  // 烏克麗麗的刷法：每拍撥和弦音，反拍輕撥
  var STRUM = [1, 0, 2, 3, 1, 0, 2, 3];
  function play(s, t, dt) {
    var bar = Math.floor(s / 8), i = s % 8, ch = CH[BARS[bar]];
    if (i === 0) I.bass(hz(ch[0]), t, dt * 7, 0.09);
    if (i === 4) I.bass(hz(ch[0]), t, dt * 3, 0.06);
    var k = STRUM[i]; if (k) I.uke(hz(ch[k]), t, dt * 2.5, i % 2 ? 0.025 : 0.04);
    var m = MEL[s];
    if (m) {
      // 前 4 小節用長笛，後 4 小節換鐘琴，比較不會聽膩
      if (bar < 4) I.flute(hz(m[0]), t, m[1] * dt * 0.95, 0.05); else I.bell(hz(m[0]), t, m[1] * dt * 1.4, 0.05);
    }
    if (s % 32 === 0) I.wave(t, dt * 14, 0.035);
  }

  function schedule() {
    var dt = 60 / BPM / SPB;
    while (nextT < ctx.currentTime + 0.35) {
      try { play(step, nextT, dt); } catch (e) {}
      nextT += dt; step = (step + 1) % STEPS;
    }
  }
  function level(v, sec) {
    var t = ctx.currentTime; out.gain.cancelScheduledValues(t);
    out.gain.setValueAtTime(Math.max(0.0001, out.gain.value), t); out.gain.linearRampToValueAtTime(Math.max(0.0001, v), t + sec);
  }
  function sync() { if (btn) btn.setAttribute('aria-checked', playing ? 'true' : 'false'); }
  function start() {
    if (!ctx) {
      ctx = new AC(); out = ctx.createGain(); out.gain.value = 0.0001;
      var comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.01; comp.release.value = 0.25;
      var master = ctx.createGain(); master.gain.value = 0.64;   // 音樂軌主音量 0.64
      out.connect(comp); comp.connect(master); master.connect(ctx.destination);
    }
    if (ctx.state !== 'running') ctx.resume();
    if (playing) return;
    playing = true; step = 0; nextT = ctx.currentTime + 0.1;
    level(VOL, 1.2); schedule(); timer = setInterval(schedule, 90); sync();
  }
  function stop() {
    if (!playing) return;
    playing = false; clearInterval(timer); level(0.0001, 0.6); sync();
  }
  document.addEventListener('visibilitychange', function () {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else if (playing) ctx.resume();
  });
  if (btn) btn.addEventListener('click', function () { playing ? stop() : start(); });
  sync();
  window.tripMusic = { start: start, stop: stop, get playing() { return playing; } };
})();
