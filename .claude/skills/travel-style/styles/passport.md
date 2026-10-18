# 護照蓋章（theme id：`passport`）

## 一句話
護照內頁：米色防偽波紋底、明體字、刻版排線插圖、每天一枚入境章，孩子可以「集章」。

## 適合
任何多城市行程，特別是親子（集章遊戲）和想留紀念的大人。不限國家。

## 字型
| 用途 | 字型 | Google Fonts 參數 | 字重 |
|---|---|---|---|
| 中文內文／標題 | Noto Serif TC（思源宋體） | `family=Noto+Serif+TC:wght@400;700` | 內文 400、標題 700 |
| 英數（章、班號、機讀碼） | Courier Prime | `family=Courier+Prime:wght@400;700` | 章用 700 |

首頁大標 `letter-spacing: .1em`，像證件上的字。

## 色票與形狀
```css
html[data-theme="passport"] {
  --paper: #FFFDF7; --bg: #F3F0E4; --ink: #26344D; --ink-2: #5A6478;
  --coral: #EBA79C; --yellow: #EDCF85; --water: #A9C6DD; --green: #B3CDA9;
  --coral-t: #F8E4DF; --yellow-t: #FAF0D5; --water-t: #E4EEF6; --green-t: #E9F1E5;
  --stamp-red: #C0453A; --stamp-blue: #2F5D8A; --stamp-green: #3B7A55; --stamp-ochre: #A0650F;
  --line: 2px; --r-xl: 18px; --r-lg: 14px; --r-md: 12px; --r-sm: 8px;
  --shadow: 0 3px 0 rgba(38, 52, 77, .16);
  --font: 'Noto Serif TC', 'Songti TC', 'PMingLiU', serif;
  --mono: 'Courier Prime', ui-monospace, Menlo, monospace;
}
/* 每日顏色 → 章的墨色 */
html[data-theme="passport"] [data-color="coral"]  { --stamp: var(--stamp-red); }
html[data-theme="passport"] [data-color="yellow"] { --stamp: var(--stamp-ochre); }  /* 黃色太淺，章用赭色 */
html[data-theme="passport"] [data-color="water"]  { --stamp: var(--stamp-blue); }
html[data-theme="passport"] [data-color="green"]  { --stamp: var(--stamp-green); }
```
頁面底：靜態 SVG 波紋（120×36 tile、兩條正弦線、`#E4DFCB` 1.2px），用 `background-image`，不要 `fixed`。

插圖色票：`P #FBF8EF, I #26344D, C url(#pp-c), Y url(#pp-y), W url(#pp-w), G url(#pp-g), sw 2.2`。

## 插圖畫法：刻版排線
四個顏色全部換成排線 pattern，整張圖變成單色版畫，彩色只留給章：

| 色 | pattern | 樣子 |
|---|---|---|
| C 珊瑚 | `pp-c` 4×4、旋轉 45°、淡粉底＋直線 | 斜線 |
| W 水 | `pp-w` 6×3.5、淡藍底＋橫線 | 水面刻線 |
| Y 黃 | `pp-y` 4×4、淡黃底＋0.8 圓點 | 網點 |
| G 綠 | `pp-g` 5×5、旋轉 45°、淡綠底＋十字 | 交叉線 |

```html
<svg id="art-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <pattern id="pp-c" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
    <rect width="4" height="4" fill="#F6E2DC"/><path d="M0 0V4" stroke="#26344D" stroke-opacity=".7" stroke-width="1"/>
  </pattern> ...
</defs></svg>
```
全頁只放一份（第一次 build passport 時插入 body）。不可用 `display:none` 藏，Safari 會不畫 pattern。線寬從 3 改 2.2。

插圖框：外層 2px 虛線＋7px 內距，裡面插圖再一圈 2px 實線，像郵票。

## 章
`makeStamp({ top, mid, day, bottom, shape })`，單色 `currentColor`，顏色由 `--stamp` 決定：
- 圓章：外圈 r55（3.5px）、內圈 r41（1.3px），上弧城市名、下弧標語（`<textPath>`），中間日期 `17 JUN 2027`＋`DAY 02`。
- 方章：雙框，三列（城市／日期／DAY·標語）。
- 字太長時用 `min(上限, 可用寬 / (字數×0.6))` 算字級。
- 外框填紙色 72% 透明，蓋在插圖上仍可讀。
- 每天一枚，資料放 `TRIP.stamps[]`（英文大寫城市＋標語，圓方交替）；印在當日插圖左上角，旋轉 -12°。
- 首頁插圖蓋兩枚（抵達第一城、最後一城）。

## 版面元件
- kicker：3px 雙線框、Courier 大寫、章的紅／藍／綠／赭色，旋轉 -2°。
- 日期標籤：虛線框、單雙號交錯 ±1.5° 傾斜；看過的那天（集章）變實線＋章色；選中的那天填淡色、旋轉 -3°。
- 「護照集章 n／14」虛線膠囊，放在日期列上方。
- 首頁底部兩行機讀碼（MRZ）樣式裝飾字，`aria-hidden`，`white-space: nowrap; overflow: hidden`。
- 待辦勾選框：虛線圓；勾選後變紅色實線圓、旋轉 -10°。
- 「必去」：紅色框線、透明底，旋轉 -6°。

## 動態
- 換日：面板 `page`（像翻頁：`perspective(1400px) rotateY(-14deg)` → 0）；當日章 `thunk` 延遲 0.3s 蓋下（scale 1.9→0.92→1，旋轉收到 -12°）。
- 首頁兩枚章依序蓋下（0.35s、0.8s）。
- 勾選：只對剛勾的那格（`.just`）播 `thunk`。
- 減少動態效果：章直接顯示在最終角度。

## 不要做
- 不放國徽、政府機關名稱、真實護照號碼或可被誤認為真證件的版面。
- 章不要用 `mix-blend-mode: multiply` 做印泥效果（大面積混色耗效能），用透明度即可。

## 檢查點
- 已載入字型包含 `Noto Serif TC`、`Courier Prime`。
- 圓章 textPath 文字沒有撞到外圈；長城市名（如 SURFERS PARADISE）沒有超出。
- 日期標籤上的集章標記沒有蓋住星期字。
- iPhone Safari 實機的 textPath 排版需另外確認。
