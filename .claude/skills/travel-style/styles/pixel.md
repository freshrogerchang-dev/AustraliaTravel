# 像素冒險（theme id：`pixel`）

> 已在 AustraliaTravel 網站實作驗證（2026-10-18，Chromium；iPhone 實機未驗證）。

## 一句話
復古像素 RPG：中文像素字、方角粗框、插圖變成真的像素圖、每天是一關（LV）、待辦勾選 +10 EXP、首頁有小探險家走來走去。

## 適合
親子旅行，特別是喜歡遊戲的孩子；主題樂園多的行程。

## 字型
| 用途 | 字型 | 來源 | 備註 |
|---|---|---|---|
| 中文與內文 | 俐方體 11 號 Cubic 11 | 自帶子集 `fonts/cubic11-subset.woff2` | Google Fonts 沒有繁中像素字型 |
| 英數展示（kicker、倒數、班號、LV） | Press Start 2P | `family=Press+Start+2P` | 放在 head 的 FONTS 表 |

**取得與子集化**
- 原始專案：`ACh-K/Cubic-11`（GitHub）。session 連不到 GitHub／jsDelivr 時，npm 套件 `@fontpkg/cubic-11` 內含同一個 TTF（v1.100）；第三方轉包，下載後先用 fonttools 讀 name table 確認名稱、作者、授權再用。
- **授權不是 OFL**：字型內文字為「免費軟體，可無限制使用、複製、散布（含修改與商用），衍生品授權須與本字型相同，不作擔保」，衍生自 M+ BITMAP FONTS。子集也是衍生品：把授權全文放在 `fonts/Cubic11-LICENSE.txt` 並在 README 或頁尾註明來源。
- 子集化（收集網站所有會顯示的字，**包含 style.css 的 `content` 字元**，例如 ▶ ★ 今天）：
  ```bash
  python3 -c "
  t=''.join(open(p).read() for p in ['data.js','index.html','app.js','illustrations.js','style.css'])
  open('chars.txt','w').write(''.join(sorted(set(c for c in t if ord(c)>127)|set(map(chr,range(32,127)))|set('★☆▶'))))"
  python3 -m fontTools.subset Cubic_11_1.100_R.ttf --text-file=chars.txt --flavor=woff2 \
    --output-file=fonts/cubic11-subset.woff2 --layout-features='*'
  ```
  本站約 1000 字 → 45 KB（原始 TTF 2.6 MB）。**內容改了要重跑**，否則新字會掉成後備字型。
- `@font-face { font-family: 'Cubic 11'; src: url('fonts/cubic11-subset.woff2') format('woff2'); font-display: swap; }` 寫在 style.css：只有用到時瀏覽器才下載。
- 首頁大標用 11 的倍數（手機 44px、桌面 55px），內文 16px 可讀但略糊，可以接受。不要加文字陰影（像素筆畫會疊出條紋）。

## 色票與形狀
```css
html[data-theme="pixel"] {
  --paper: #FFF7E8; --bg: #F2E8D5; --ink: #2B2140; --ink-2: #5A4E73;
  --coral: #FF7B6B; --yellow: #FFD15C; --water: #5CC8FF; --green: #6FD08C;
  --coral-t: #FFE2DD; --yellow-t: #FFF2CC; --water-t: #DDF4FF; --green-t: #DFF6E6;
  --line: 3px; --r-xl: 0; --r-lg: 0; --r-md: 0; --r-sm: 0;
  --shadow: 4px 4px 0 var(--ink);
  --font: 'Cubic 11', 'Noto Sans TC', 'PingFang TC', sans-serif;
  --display: 'Press Start 2P', var(--font);
}
```
- 圓角 token 歸零之外，元件裡寫死 `999px` 的膠囊（選單、按鈕、標籤、開關、進度條…）要逐一覆寫成 `border-radius: 0`。
- 選單列底線 4px；`-webkit-font-smoothing: none`。

插圖色票（也是量化用的固定色盤）：`P #FFF7E8, I #2B2140, C #FF7B6B, Y #FFD15C, W #5CC8FF, G #6FD08C, sw 4.6`。

## 插圖畫法：在瀏覽器裡把同一張圖轉成像素圖
不必為每一天手繪像素格子。共用構圖照常產生 SVG，再在瀏覽器縮成低解析度：

1. `build('pixel')` 時把所有 `stroke-width` 乘 1.5（根線寬 4.6），縮小後線才不會斷；夠大的圖（viewBox 寬高都 ≥ 40）加 class `px-src`，並加上 `xmlns`（當圖片載入時需要）。
2. `window.pixelate(root)` 找出 `svg.px-src`：
   - 縮小倍率：寬 ≥ 200 的除以 3（240×160 → 80×53，首頁 360×250 → 120×83），其他除以 2。
   - SVG 轉 `data:image/svg+xml` 載入 → **先畫成目標的 4 倍大，再每 4×4 取正中間一點**（point sampling）。直接縮小會產生混色邊緣，量化時變成綠色、珊瑚色雜點；取點不混色，邊緣就乾淨。
   - 每點換成色盤裡最近的顏色、透明度 < 110 的變透明。**近灰色（RGB 最大最小差 < 48）只能變成墨色或紙色**（亮度 < 150 取墨色）：線與紙的混色若直接找最近色，常被配到綠色，細線會變成綠條。
   - 輸出 PNG data URL，以 SVG 原始碼為鍵快取；用 `<img class="illo px-img">` 換掉原本的 SVG（保留 `aria-label` 當 `alt`）。失敗就移除 `px-src`，留著向量圖。
3. 轉換完成前 `svg.px-src { visibility: hidden; }`，避免先閃一下向量圖。
4. 放大顯示：`.px-img { image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; image-rendering: pixelated; }`（最後一個生效的為準）。
5. app.js 在 `renderHero()` 與 `selectDay()` 結束時呼叫（只在 pixel 風格）。

轉出來的是靜態圖，原本的 `a-*` 動畫不會跟著動；動感交給下面的像素小人。

**像素小人**：10×14 格的小探險家（黃帽、紅衣、藍褲），兩格踏步。用字串格子畫（每列連續同色合併成一個 `<rect>`，`shape-rendering="crispEdges"`），只在 pixel 的 `build` 產生 `ILLOS.sprite`，renderHero 把它放進首頁插圖：

```css
.px-walker { position: absolute; left: 6%; bottom: 32%; width: 40%; animation: walk 16s steps(32) infinite; }  /* 歌劇院平台上 */
.px-face   { display: block; width: 21%; animation: face 16s step-end infinite; }                              /* 回程翻面 */
.px-f2 { opacity: 0; animation: frame .5s step-end infinite; }
.px-f1 { animation: frame .5s step-end infinite reverse; }
@keyframes walk  { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(79%); } }
@keyframes face  { 0% { transform: none; } 50% { transform: scaleX(-1); } }
@keyframes frame { 0% { opacity: 0; } 50% { opacity: 1; } }
```
小人要站的位置跟首頁構圖有關，換首頁插圖時要重新量 `left`／`bottom`／`width`。

## 版面元件
- 日期標籤：隱藏 `D1・三` 與顏色條，`::before { content: "LV." attr(data-day) }`；看過的關卡右上角亮 ★（沿用集章的 `.stamped`）。
- 章節標題前加珊瑚色 `▶`。
- kicker：墨色底、黃字、Press Start 2P。
- 「必去」：黃色方塊＋硬陰影，不旋轉。
- 進度條：一格一格（`repeating-linear-gradient(90deg, var(--green) 0 12px, var(--paper) 12px 15px)`）。
- 勾選待辦：該列 `.just::after { content: "+10 EXP" }` 往上飄並淡出；預設 `opacity: 0`，減少動態效果時不會殘留。

## 動態（全部 `steps()`，一格一格跳）
- 換日：`stage`（從右 32px `steps(4)` 跳進來）；日期標籤的彈跳關掉。
- 小人踏步與來回走。
- 勾選：`+10 EXP` 用 `steps(6)` 上飄淡出。

## 不要做
- 不臨摹任天堂、寶可夢、勇者鬥惡龍等遊戲的角色、介面或音效。
- 不要用 DotGothic16 等日文像素字型（缺很多繁體字）。
- 像素化不要在每次換日都重算：一定要快取。

## 檢查點
- `document.fonts` 有 `Cubic 11` 和 `Press Start 2P`；找有沒有字掉成後備字型（通常是新加的字或 CSS `content` 裡的符號）。
- 14 天逐一點過，每天的 `#day-panel` 只有 `img.px-img`、沒有殘留 `svg.px-src`。
- 插圖邊緣沒有雜色點。
- 首頁小人站在平台上，沒有浮在空中或泡在海裡。
