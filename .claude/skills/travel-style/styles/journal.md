# 旅行手帳（theme id：`journal`）

> 設計規格，尚未在實際網站實作驗證。第一次實作時照「檢查點」逐項看截圖，並把實際調整寫回這份檔案。

## 一句話
大人的旅行手帳：方格紙、鉛筆線稿加水彩暈染、紙膠帶、拍立得相框、手寫楷書。

## 適合
想留紀念、出發前後想印出來的旅行；城市散步、咖啡、美術館多的行程特別合適。

## 字型
| 用途 | 字型 | Google Fonts 參數 | 字重 |
|---|---|---|---|
| 中文內文／標題 | 霞鶩文楷 LXGW WenKai TC | `family=LXGW+WenKai+TC:wght@400;700` | 內文 400、標題 700 |
| 英數 | 同上（或 `Caveat` 只給手寫英文註記） | `family=Caveat:wght@500` | |

- 行高 1.9，段落之間多留白，像手帳一格一格寫。
- 時間、價格這類數字用 `font-variant-numeric: tabular-nums`。

## 色票與形狀
```css
html[data-theme="journal"] {
  --paper: #FFFEFA; --bg: #F7F4EC; --ink: #4A4744; --ink-2: #7A7570;
  --coral: #E9A8A0; --yellow: #EED9A0; --water: #A9CBDD; --green: #B8CFAE;
  --coral-t: #F8E7E4; --yellow-t: #FBF3DE; --water-t: #E8F1F6; --green-t: #EDF3EA;
  --line: 1.5px; --r-xl: 6px; --r-lg: 6px; --r-md: 4px; --r-sm: 4px;
  --shadow: 0 1px 2px rgba(74, 71, 68, .12);
  --font: 'LXGW WenKai TC', 'Kaiti TC', 'DFKai-SB', serif;
}
html[data-theme="journal"] body {
  background-color: var(--bg);
  background-image: linear-gradient(#E6E1D4 1px, transparent 1px), linear-gradient(90deg, #E6E1D4 1px, transparent 1px);
  background-size: 22px 22px;   /* 方格紙，靜態 */
}
```
插圖色票：`P #FFFEFA, I #4A4744, C #E9A8A0, Y #EED9A0, W #A9CBDD, G #B8CFAE, sw 1.4`。

## 插圖畫法：鉛筆線稿＋水彩暈染
1. 線：單一石墨色 `#4A4744`、1.4px、不封閉也沒關係（線頭留一點空隙，`stroke-dasharray` 在少數線上製造斷筆）。
2. 色：每個有填色的形狀拆成兩層——下層「水彩」：同形狀、`transform="translate(3 2) scale(1.04)"`（以形狀中心）、`fill-opacity: .55`、不描邊；上層「線稿」：`fill="none"` 只留線。顏色和線故意對不齊。
3. 暈染邊：水彩層再疊一個同色、更大 6%、`fill-opacity: .2` 的形狀，模擬水彩外暈（不用 blur filter）。
4. 插圖框：拍立得——白框、底部加寬放手寫日期（例：「6/17 雪梨港」），旋轉 -1.5°。

## 版面元件
- 卡片頂端貼紙膠帶：`::before` 80×22px、半透明條紋（`repeating-linear-gradient` 45°）、旋轉 ±4°，顏色輪流四色。
- 章節標題下用手繪波浪底線（小 SVG 背景）。
- 「必去」：紅筆圈起來（橢圓 SVG 框線疊在標題上）。
- 待辦勾選框：手寫方框，勾選後是一筆劃勾。
- 日期標籤：像手帳的日期索引貼，側邊突出。

## 動態
- 換日：`drop`（從上方 12px 落下＋旋轉 1° 回正，像把一頁放上桌）。
- 插圖：極少動畫，只讓雲或船慢慢漂；這個風格靠靜態美感。
- 勾選：勾勾 scale 0.6→1＋opacity 淡入，像一筆寫上去。不要用 `stroke-dashoffset` 畫線動畫（那不是 transform／opacity，會重繪）。

## 不要做
- 不放真實照片（版權）；拍立得框裡放自己畫的插圖。
- 不要用 blur 濾鏡做水彩。
- 方格線顏色要很淡，不能影響內文可讀性。

## 檢查點
- 已載入字型包含 `LXGW WenKai TC`。
- 水彩層和線稿對不齊的程度剛好（像畫的，不像跑版）。
- 方格紙背景在大字模式下仍不干擾閱讀。
- 列印（`@media print`）時方格與膠帶可以保留，但要確認不浪費墨。
