# 多風格旅遊網站架構

完整的實作範例是 GitHub repo `freshrogerchang-dev/AustraliaTravel`（繪本／澳洲海報／護照蓋章三種風格）。手邊有那個 repo 時，直接讀它的檔案比讀這份更準。

## 目錄
1. 檔案分工
2. 風格怎麼套上去（head 腳本）
3. CSS token 與風格覆寫
4. 插圖：同一組構圖、不同畫法
5. 切換風格時要重畫什麼
6. 共用小元件：章、集章、暫停動畫
7. localStorage 鍵

## 1. 檔案分工

```
index.html        殼：選單、設定面板、各區塊容器、head 內聯腳本
style.css         token、元件、各風格覆寫、動畫、減少動態效果
data.js           window.TRIP_DAYS（每日行程）＋ window.TRIP（航班、住宿、清單、票價、章…）
illustrations.js  window.buildArt(theme) → { ILLOS, ICONS }；window.makeStamp(o)
app.js            渲染、日期切換、清單、設定、風格切換
manifest.json + icon-*.png   加入主畫面
```

不用框架、不用建置。內容只改 `data.js`。

## 2. 風格怎麼套上去

`<head>` 裡、樣式表之後放內聯腳本，在第一次繪製前就決定風格，避免先閃一下預設風格：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Huninn&display=swap">  <!-- 只放預設風格的字型 -->
<link rel="stylesheet" href="style.css">
<script>
(function(){
  var d = document.documentElement, t = null;
  try { t = localStorage.getItem('xx-theme'); } catch (e) {}
  t = /^(book|aussie|passport)$/.test(t) ? t : 'book';
  d.setAttribute('data-theme', t);
  var FONTS = {                       // 每個風格的 Google Fonts 參數，選到才載入
    aussie: 'family=Alfa+Slab+One&family=Noto+Sans+TC:wght@400;900',
    passport: 'family=Courier+Prime:wght@400;700&family=Noto+Serif+TC:wght@400;700'
  };
  window.loadThemeFonts = function (theme) {
    if (!FONTS[theme] || document.getElementById('font-' + theme)) return;
    var l = document.createElement('link');
    l.id = 'font-' + theme; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?' + FONTS[theme] + '&display=swap';
    document.head.appendChild(l);
  };
  window.loadThemeFonts(t);
  // 同一段也處理 data-motion（減少動態效果）與 html.big（大字）
})();
</script>
```

設定面板的風格選項用原生 radio（鍵盤操作免費得到），每個選項附三色小色塊預覽：

```html
<p class="settings-title" id="theme-label">網站風格</p>
<div class="theme-picker" role="radiogroup" aria-labelledby="theme-label">
  <label class="theme-opt"><input type="radio" name="theme" value="book"><span class="sw sw-book" aria-hidden="true"><i></i><i></i><i></i></span><span>繪本</span></label>
  ...
</div>
```

## 3. CSS token 與風格覆寫

所有元件只用 token，風格只覆寫 token ＋少量元件規則：

```css
:root {
  --paper; --bg; --ink; --ink-2;                 /* 卡片底、頁面底、主線色、次要文字 */
  --coral; --yellow; --water; --green;           /* 四個角色色（名稱沿用，值依風格變） */
  --coral-t; --yellow-t; --water-t; --green-t;   /* 對應淡色 */
  --line; --r-xl; --r-lg; --r-md; --r-sm; --shadow;
  --font;      /* 中文內文字型：每個風格都要換！ */
  --display;   /* 英數展示字型 */
  --mono;
}
[data-color="coral"] { --c: var(--coral); --ct: var(--coral-t); }   /* 每日顏色 */

html[data-theme="aussie"] {
  --font: 'Noto Sans TC', 'PingFang TC', system-ui, sans-serif;
  --paper: #FFF8EC; --bg: #FBEFD9; --ink: #1E3557; ...
}
html[data-theme="aussie"] :is(h1, h2, h3, h4, h5) { font-weight: 900; }
```

注意：
- `body { font-synthesis: none; }`，所以要粗體就得真的載入那個字重。
- 頁面底用 `--bg`、卡片用 `--paper`；選單列與黏住的日期列背景要跟著 `--bg`。
- 硬陰影（`--shadow`）在 hover／active 的變化也要依風格覆寫。
- 動畫 keyframes 放共用區；風格可以只換 `animation-name`（例如 `.pop` 換成 `poster` 或 `page`）。

## 4. 插圖：同一組構圖、不同畫法

`illustrations.js` 匯出 `window.buildArt(theme)`，回傳該風格畫好的 `{ ILLOS, ICONS }`。構圖（座標、形狀）共用，**畫法**由風格決定：

```js
var PALETTES = {
  book:     { P: '#FFFCF6', I: '#3E3A39', C: '#F2A497', Y: '#F6D27A', W: '#A8D3E6', G: '#B9DAA5', sw: 3 },
  aussie:   { P: '#FFF8EC', I: '#1E3557', C: '#EE8B5B', Y: '#F4BE3E', W: '#7EC4CF', G: '#97C08F', sw: 3 },
  passport: { P: '#FBF8EF', I: '#26344D', C: 'url(#pp-c)', Y: 'url(#pp-y)', W: 'url(#pp-w)', G: 'url(#pp-g)', sw: 2.2 }
};
function build(theme) {
  var pal = PALETTES[theme] || PALETTES.book;
  function svg(vb, inner, label) {
    if (theme === 'aussie') inner = printPlate(vb, inner);   // 畫法在這裡分岔
    return '<svg class="illo illo-' + theme + '" viewBox="' + vb + '" fill="none" stroke="' + pal.I +
      '" stroke-width="' + pal.sw + '" ...>' + inner + '</svg>';
  }
  // ILLOS.bridge = svg(..., '<path ... fill="' + Y + '"/>') ...
  // 風格專屬的小道具也在這裡加（例如海報風在首頁沙灘插兩支救生員旗）
}
```

色票變數：P 紙／I 墨線／C 珊瑚／Y 黃／W 水／G 綠。顏色值可以是 `url(#pattern)`，SVG 的 fill 與 stroke 都吃。

### 已驗證的畫法配方

| 畫法 | 做法 | 用在 |
|---|---|---|
| 粗線平塗 | 填色＋`stroke=I`、3px、圓頭 | 繪本 |
| 錯位印版 | `inner` 印兩次：下層 `<g class="plate" transform="translate(寬/80 寬/80)">`，CSS 把所有填色與線改成墨色；上層 `<g class="print">` 有填色的形狀 `stroke:none`。插圖底色要換成和紙色以外的天空色，否則和紙色的雲、帆會消失 | 澳洲海報 |
| 刻版排線 | 四個色改成 `url(#pp-c/w/y/g)`：斜線、橫線、網點、交叉線（淡底色＋墨線 70% 透明）；全頁共用一份隱藏 `<svg id="art-defs"><defs><pattern…>`（`width=0 height=0 position:absolute`，不可 `display:none`，否則 Safari 不畫）；線寬改 2.2 | 護照 |
| 抖動手繪線 | build 時把 path 座標加固定種子的小抖動（±1.5），同一條線畫兩次（第二次偏移 0.8、透明 .6）；填色用不規則斜線 pattern，故意偏出輪廓 2–3px | 蠟筆 |
| 線稿＋水彩 | 線：單一石墨色 1.4px；色塊：同形狀放大 4%、偏移 3px、`fill-opacity=.55`，放在線稿下方 | 手帳 |
| 像素 | 用字串格子畫（每列合併連續同色為一個 rect），`shape-rendering="crispEdges"`，CSS `image-rendering: pixelated` | 像素 |

CSS 端配合錯位印版的寫法：

```css
.illo-aussie .plate [fill]:not([fill="none"]) { fill: #1E3557; }
.illo-aussie .plate * { stroke: #1E3557; }
.illo-aussie .print [fill]:not([fill="none"]) { stroke: none; }
html[data-theme="aussie"] .hero-art, html[data-theme="aussie"] .day-illo { background: #F6D2A2; }
```

動態用共用 class（`a-bob`、`a-float`、`a-drift`、`a-spin`、`a-twinkle d1–d3`、`a-sway`、`a-flag`…），搭配 `transform-box: fill-box`。印兩次的畫法會讓動畫元素加倍，仍要守住同時動的數量。

## 5. 切換風格時要重畫什麼

```js
function switchTheme(t) {
  root.setAttribute('data-theme', t);
  store.set('xx-theme', t);
  window.loadThemeFonts(t);
  setThemeColor();                       // <meta name="theme-color">，每個風格一個值
  var art = window.buildArt(t); ILLOS = art.ILLOS; ICONS = art.ICONS;
  renderHero(); renderFlights(); renderLegend();          // 有插圖或彩色圖示的區塊
  selectDay(current, { animate: true, hash: false });     // 當日行程（順便播換日動畫）
  renderTodos();                                           // 勾勾圖示
}
```

只用 CSS 上色（`stroke: var(--ink)`）的連結圖示不必重畫。

## 6. 共用小元件

- **章** `window.makeStamp({ top, mid, day, bottom, shape: 'circle'|'rect' })`：單色 `currentColor`，圓章文字用 `<textPath>` 沿圓排；外框填紙色 72% 透明，蓋在插圖上仍可讀。每日章的內容放 `TRIP.stamps[]`。
- **集章**：`selectDay` 時把天數記進 localStorage，日期標籤加 `.stamped`，顯示「n／14」。
- **剛勾選的動畫**：change 事件時對該列加 `.just`（先移除、reflow、再加），只讓剛勾的那一格播動畫，不會在載入時全部一起播。
- **離開畫面暫停**：IntersectionObserver 觀察 `#hero-art`、`#day-panel`，不在畫面就加 `.paused`；`.paused .illo * { animation-play-state: paused !important; }`。

## 7. localStorage 鍵（前綴依專案）

`-theme` 風格、`-motion` 動態、`-big` 大字、`-todo-v1` 清單、`-day` 最後看的日期、`-stamps` 集章。每次讀寫都包 try/catch（無痕模式可能丟例外）。
