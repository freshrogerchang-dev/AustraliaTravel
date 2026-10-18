// 檢查多風格旅遊網站：每個風格在 iPhone 13 與 1280px 桌面各跑一次。
// 用法：NODE_PATH=$(npm root -g) node check_themes.js <網址> <風格,逗號分隔> <截圖資料夾>
// 依 travel-style 架構約定操作頁面：#settings-btn、input[name="theme"]、#tab-N、#todo-list .todo-item
const { chromium, devices } = require('playwright');
const fs = require('fs');

(async () => {
  const [url = 'http://localhost:8765/', list = 'book', out = './shots'] = process.argv.slice(2);
  const themes = list.split(',');
  fs.mkdirSync(out, { recursive: true });
  const errors = [], report = {};
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

  const probe = page => page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    themeColor: (document.querySelector('meta[name="theme-color"]') || {}).content,
    overflowX: document.documentElement.scrollWidth - innerWidth,
    fonts: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '')))],
    stored: Object.keys(localStorage).filter(k => /theme$/.test(k)).map(k => localStorage.getItem(k))[0] || null
  }));
  const watch = (page, tag) => {
    page.on('pageerror', e => errors.push(`${tag} pageerror: ${e.message}`));
    page.on('console', m => { if (m.type() === 'error') errors.push(`${tag} console: ${m.text()}`); });
  };
  const pickTheme = async (page, t) => {
    await page.click('#settings-btn');
    await page.click(`label:has(input[name="theme"][value="${t}"])`);
    await page.click('#settings-btn');
    await page.evaluate(() => document.fonts.ready);
  };

  // 手機：透過設定面板逐一切換
  const phone = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
  watch(phone, 'iphone');
  await phone.goto(url, { waitUntil: 'networkidle' });
  for (const t of themes) {
    await pickTheme(phone, t);
    await phone.evaluate(() => scrollTo(0, 0)); await phone.waitForTimeout(1500);
    await phone.screenshot({ path: `${out}/${t}-phone-hero.png` });
    if (await phone.$('#tab-2')) {
      await phone.click('#tab-2');
      await phone.$eval('#itinerary', el => el.scrollIntoView()); await phone.waitForTimeout(1400);
      await phone.screenshot({ path: `${out}/${t}-phone-day.png` });
    }
    const item = await phone.$('#todo-list .todo-item');
    if (item) {
      await phone.$eval('#todo-list', el => el.scrollIntoView({ block: 'center' }));
      await item.click(); await phone.waitForTimeout(600);
      await phone.screenshot({ path: `${out}/${t}-phone-todo.png` });
      await item.click();   // 還原
    }
    report[t] = { phone: await probe(phone) };
  }
  await phone.reload({ waitUntil: 'networkidle' });
  report.persistAfterReload = await phone.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    radio: (document.querySelector('input[name="theme"]:checked') || {}).value
  }));

  // 桌面：每個風格重新載入（預先寫好 localStorage 的風格），另開減少動態效果
  for (const t of themes) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const desk = await ctx.newPage();
    watch(desk, `desktop-${t}`);
    await desk.goto(url, { waitUntil: 'networkidle' });
    await pickTheme(desk, t);
    await desk.reload({ waitUntil: 'networkidle' });
    await desk.evaluate(() => document.fonts.ready);
    await desk.screenshot({ path: `${out}/${t}-desktop-hero.png` });
    if (await desk.$('#itinerary')) {
      await desk.$eval('#itinerary', el => el.scrollIntoView()); await desk.waitForTimeout(300);
      await desk.screenshot({ path: `${out}/${t}-desktop-day.png` });
    }
    report[t].desktop = await probe(desk);
    await ctx.close();
  }

  console.log(JSON.stringify({ report, errors }, null, 1));
  await browser.close();
  process.exitCode = errors.length ? 1 : 0;
})();
