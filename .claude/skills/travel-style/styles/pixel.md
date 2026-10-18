# 像素冒險（theme id：`pixel`）

> 設計規格，尚未在實際網站實作驗證。第一次實作時照「檢查點」逐項看截圖，並把實際調整寫回這份檔案。

## 一句話
復古像素 RPG：每天是一關、待辦是任務、集章變成拿星星，孩子會覺得在玩遊戲。

## 適合
親子旅行，特別是喜歡遊戲的孩子；也適合主題樂園多的行程。

## 字型
| 用途 | 字型 | 來源 | 備註 |
|---|---|---|---|
| 中文 | 俐方體 11 號 Cubic 11 | GitHub `ACh-K/Cubic-11`（SIL OFL 1.1，自行放進專案） | Google Fonts 沒有繁中像素字型 |
| 英數 | Press Start 2P | `family=Press+Start+2P` | 只給英數、數字 |

- Cubic 11 完整字型檔很大：用 fonttools 依網站實際用到的字做子集，再轉 woff2：
  ```bash
  pip install fonttools brotli
  # 把 data.js、index.html 的文字收集成 chars.txt 後
  pyftsubset Cubic_11.ttf --text-file=chars.txt --flavor=woff2 --output-file=cubic11-subset.woff2
  ```
  內容改了要重跑子集，否則新字會變成系統字。用 `@font-face` 自行宣告，`font-display: swap`。
- 引入前先確認授權仍為 OFL，並在頁尾註明字型來源。
- 像素字型要用整數倍字級（11px 的倍數：22px、33px），否則會糊。內文 22px 在手機太大時，內文改回 Noto Sans TC、只有標題和 UI 用 Cubic 11。
- 不要用 DotGothic16 等日文像素字型：缺很多繁體字。

## 色票與形狀
```css
html[data-theme="pixel"] {
  --paper: #FFF7E8; --bg: #F2E8D5; --ink: #2B2140; --ink-2: #5A4E73;
  --coral: #FF7B6B; --yellow: #FFD15C; --water: #5CC8FF; --green: #6FD08C;
  --coral-t: #FFE2DD; --yellow-t: #FFF2CC; --water-t: #DDF4FF; --green-t: #DFF6E6;
  --line: 4px; --r-xl: 0; --r-lg: 0; --r-md: 0; --r-sm: 0;
  --shadow: 4px 4px 0 var(--ink);
  --font: 'Cubic 11', 'Noto Sans TC', 'PingFang TC', sans-serif;
  --display: 'Press Start 2P', var(--font);
}
```
- 方角；卡片的「像素圓角」用 `clip-path: polygon()` 切掉四角各 4px 的階梯。
- 進度條改成血量條（一格一格的方塊）。

插圖色票：最多 12 色，固定調色盤；`shape-rendering="crispEdges"`，容器 `image-rendering: pixelated`。

## 插圖畫法：格子字串
用字串陣列畫，每個字元一格，`.` 是透明：
```js
var KOALA = [                 // 無尾熊頭（示意，實際約 48×32 格）
  '.aa......aa.',
  'abba....abba',
  'abbaaaaaabba',
  '.aaaaaaaaaa.',
  '.aacaaaacaa.',
  '.aaaaddaaaa.',
  '..aaaddaaa..',
  '...aaaaaa...'
];
var COLORS = { a: '#9AA5B1', b: '#F4C2C2', c: '#2B2140', d: '#2B2140' };
function pixels(rows, colors, size) {
  var out = '';
  rows.forEach(function (row, y) {
    for (var x = 0; x < row.length;) {          // 同一列連續同色合併成一個 rect，減少元素數
      var ch = row[x], w = 1;
      while (row[x + w] === ch) w++;
      if (colors[ch]) out += '<rect x="' + x * size + '" y="' + y * size + '" width="' + w * size + '" height="' + size + '" fill="' + colors[ch] + '"/>';
      x += w;
    }
  });
  return out;
}
```
- 每天的插圖：48×32 格左右，題材同繪本（地標、交通工具、動物）但簡化成像素。
- 不描邊（`stroke="none"`），輪廓用深色格子畫出來。

## 版面元件
- 日期標籤：「LV.1–LV.14」關卡按鈕；看過的關卡亮星星。
- 待辦清單：「任務」，勾選後顯示「+10 EXP」浮字。
- 「必去」：寶箱圖示＋「BOSS」或「★」。
- 航班卡：像遊戲裡的「傳送門」對話框（黑框白底、像素邊）。

## 動態
- 用 `steps()` 的動畫：角色兩格踏步（`steps(2)`）、星星閃爍（`steps(2)` 的 opacity）。
- 換日：`stage-in`（從右 `steps(4)` 跳進來）。
- 勾選：`+10 EXP` 往上飄並淡出（translateY＋opacity）。

## 不要做
- 不臨摹任天堂、寶可夢、勇者鬥惡龍等遊戲的角色、介面或音效。
- 字級不要用非整數倍，像素字會糊掉。

## 檢查點
- 自訂字型確實載入（`document.fonts` 有 `Cubic 11`），且子集包含所有用到的字（找有沒有字掉成系統字）。
- 插圖沒有半像素模糊（容器寬度要是格數的整數倍，或接受縮放後用 `pixelated`）。
- 減少動態效果時 `steps()` 動畫也要停。
