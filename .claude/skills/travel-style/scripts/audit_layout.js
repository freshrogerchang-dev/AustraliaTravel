// 版面稽核：每個風格 × 每個手機寬度 × 每一天，找出手機上最常見的版面毛病
//   multiline-pill      膠囊（圓角 ≥ 高度一半）裡的字換行，會被圓角切到
//   past-viewport       元素超出畫面右側
//   clipped             overflow hidden/clip 把內容切掉
//   text-overflows-box  文字超出自己有框線的容器
//   page-hscroll        整頁可以左右捲動
// 用法：NODE_PATH=$(npm root -g) node audit_layout.js <網址> [寬度,逗號分隔] [風格,逗號分隔]
// 依 travel-style 架構約定：#settings-btn、input[name="theme"]、#tab-N。輸出 TOTAL 0 才算過。
const { chromium, devices } = require('playwright');

(async () => {
  const url = process.argv[2] || 'http://localhost:8765/';
  const widths = (process.argv[3] || '390,375,360,320').split(',').map(Number);
  const themes = (process.argv[4] || 'book').split(',');
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const found = {};

  const scan = () => {
    const out = [];
    const name = el => {
      let s = el.tagName.toLowerCase();
      if (el.id) s += '#' + el.id;
      if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.');
      const p = el.closest('[id]');
      return (p && p !== el ? '#' + p.id + ' ' : '') + s;
    };
    const vw = document.documentElement.clientWidth;
    document.querySelectorAll('body *').forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      // 插圖、章、可橫向捲動的日期列、刻意裁切的裝飾不檢查
      if (el.closest('svg, .illo, .stamp, .hero-stamps, .px-walker, .day-tabs, .mrz, .theme-picker .sw, script')) return;

      const rad = parseFloat(cs.borderTopLeftRadius) || 0;
      const framed = cs.borderTopStyle !== 'none' || (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)');
      if (framed && rad >= r.height / 2 - 1 && el.textContent.trim() && el.children.length < 4) {
        // 只數文字節點的行數（圖示＋文字並排不算兩行）
        const fs = parseFloat(cs.fontSize), tops = [];
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (walk.nextNode()) {
          if (!walk.currentNode.textContent.trim()) continue;
          const rg = document.createRange();
          rg.selectNodeContents(walk.currentNode);
          [...rg.getClientRects()].forEach(x => { if (x.width > 1) tops.push(x.top); });
        }
        tops.sort((a, b) => a - b);
        let lines = tops.length ? 1 : 0;
        for (let i = 1; i < tops.length; i++) if (tops[i] - tops[i - 1] > fs * .8) lines++;
        if (lines > 1) out.push(['multiline-pill', name(el), el.textContent.trim().slice(0, 30)]);
      }
      if (r.right > vw + 1 && !el.closest('.day-tabs-wrap')) out.push(['past-viewport', name(el), Math.round(r.right - vw) + 'px']);
      if ((cs.overflowX === 'hidden' || cs.overflowX === 'clip') && el.scrollWidth > el.clientWidth + 2 &&
          !el.matches('.flight, .mrz span, .hero-art, .day-illo, .progress-bar, .budget-meter, .topbar, body, html'))
        out.push(['clipped', name(el), (el.scrollWidth - el.clientWidth) + 'px']);
      if (cs.borderRightStyle !== 'none' && cs.overflowX === 'visible' && el.scrollWidth > el.clientWidth + 2 && !el.matches('html, body'))
        out.push(['text-overflows-box', name(el), (el.scrollWidth - el.clientWidth) + 'px ' + el.textContent.trim().slice(0, 24)]);
    });
    if (document.documentElement.scrollWidth > vw) out.push(['page-hscroll', 'html', document.documentElement.scrollWidth - vw + 'px']);
    return out;
  };

  for (const w of widths) for (const t of themes) {
    const ctx = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: w, height: 844 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'networkidle' });
    if (await p.$('input[name="theme"]')) {
      await p.click('#settings-btn');
      await p.click(`label:has(input[name="theme"][value="${t}"])`);
      await p.click('#settings-btn');
    }
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const add = (list, where) => list.forEach(([k, sel, info]) => {
      const key = k + ' | ' + sel;
      (found[key] = found[key] || new Set()).add(`${t}@${w} ${where} ${info}`);
    });
    add(await p.evaluate(scan), 'page');
    for (let n = 1; await p.$('#tab-' + n); n++) {
      await p.click('#tab-' + n);
      await p.waitForTimeout(80);
      add(await p.evaluate(scan), 'D' + n);
    }
    await p.click('#settings-btn');
    await p.waitForTimeout(100);
    add(await p.evaluate(scan), 'settings');
    await ctx.close();
  }

  const keys = Object.keys(found).sort();
  keys.forEach(k => { const v = [...found[k]]; console.log(k + '  (' + v.length + ')  e.g. ' + v.slice(0, 3).join(' ; ')); });
  console.log('TOTAL', keys.length);
  await browser.close();
  process.exitCode = keys.length ? 1 : 0;
})();
