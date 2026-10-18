# 蠟筆兒童畫（theme id：`crayon`）

> 已在 AustraliaTravel 網站實作驗證（2026-10-18，Chromium；iPhone 實機未驗證）。

## 一句話
像 6 歲孩子用蠟筆畫的旅行圖畫本：歪歪抖抖的蠟筆線、塗出框的顏色、圖畫紙、手剪卡片、貼紙。

## 適合
親子旅行，給孩子自己看、自己點的版本。任何目的地。

## 字型
| 用途 | 字型 | Google Fonts 參數 | 字重 |
|---|---|---|---|
| 中文與英數 | 芫荽 Iansui（手寫感） | `family=Iansui` | 只有 400 |

- 內文放大一號：`body { font-size: 1.0625rem; line-height: 1.85; }`，方便孩子看。
- 首頁大標拆成單字（`<span class="ch" aria-hidden="true">`，h1 加 `aria-label` 讓讀屏讀整句），四色輪流、單雙字各歪 ±3–4°。文字色用比插圖更深的蠟筆色才讀得清楚：`#E4572E #2E86C1 #3FA34D #E67E22`。

## 色票與形狀
```css
html[data-theme="crayon"] {
  --paper: #FFFFFF; --bg: #FFFDF5; --ink: #2B2B2B; --ink-2: #5C5C5C;
  --coral: #FF8A7A; --yellow: #FFD23F; --water: #5EC2F2; --green: #7BD389;
  --coral-t: #FFE6E1; --yellow-t: #FFF5CC; --water-t: #DDF2FC; --green-t: #E3F7E6;
  --line: 3px;
  --r-xl: 28px 34px 26px 38px / 34px 26px 38px 28px;   /* 不規則圓角，像手剪 */
  --r-lg: 22px 28px 20px 30px / 28px 20px 30px 22px;
  --r-md: 16px 22px 14px 24px / 22px 14px 24px 16px;
  --r-sm: 12px 16px 10px 18px / 16px 10px 18px 12px;
  --shadow: 3px 4px 0 var(--ink);
  --font: 'Iansui', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif;
}
```
- 頁面底：圖畫紙上稀疏的淺色短筆觸（90×90 靜態 SVG data URI）。
- 卡片（行程卡、清單組、航班、住宿、票價）旋轉 ∓0.5°，單雙交錯，像貼在本子上。

插圖色票：`P #FFFFFF, I #2B2B2B, C url(#cr-c), Y url(#cr-y), W url(#cr-w), G url(#cr-g), sw 3.5, st url(#cr-ink)`（`st` 是根 `<svg>` 的線色，與實心墨色 I 分開）。

## 插圖畫法：抖動蠟筆線＋塗出框
同一張圖印兩層：

```js
var r = rng(hash(vb + inner)), o = (viewBoxWidth / 100).toFixed(2);       // 240 寬 → 偏移 2.4
var lines = inner.replace(/ d="([^"]*)"/g, (m, d) => ' d="' + wobble(d, r) + '"');
inner = '<g class="cr-fill" transform="translate(' + o + ' ' + o * .8 + ')">' + inner + '</g>' +
        '<g class="cr-line">' + lines + '</g>';
```
```css
.illo-crayon .cr-fill * { stroke: none; }                                             /* 下層只有顏色，往右下偏 */
.illo-crayon .cr-line [fill]:not([fill="none"]):not([fill="#2B2B2B"]) { fill: none; } /* 上層只有線；墨色小點（眼睛、輪胎）保留 */
```
- **抖動**：固定種子亂數（`rng(hash(...))`），同一張圖每次重畫都一樣、不會閃。含 `a`/`A` 弧線指令的 path 不抖（旗標會壞）。抖動幅度依形狀大小：`amp = clamp(除了起點以外最大數值 / 30, 0.3, 1.4)`，小星星只抖 0.3，海面、橋拱抖 1.4。
- **蠟筆質感（不用 filter）**：
  - 線：`stroke="url(#cr-ink)"`，5×5 pattern，墨色底＋三個白色半透明小點，像蠟筆在紙紋上跳過。
  - 色塊：10×10 pattern 旋轉 -25°，底色＋三條白色 38% 透明的短橫紋。
  - 全頁一份隱藏 defs `#art-defs-cr`（`width=0 height=0 position:absolute`）。
- 線寬 3.5。插圖底色白色。
- 動畫元素會因兩層而加倍（首頁約 20 個），都是小元素的 transform／opacity。

## 版面元件
- kicker：不規則圓角、旋轉 -2°。
- 章節標題下一條珊瑚色蠟筆波浪線（120×12 SVG）。
- 日期標籤：不規則圓角；選中時旋轉 -3°、放大 1.06。
- 「必去」：黃色貼紙，外圈白邊＋墨線（`box-shadow: 0 0 0 3px #fff, 0 0 0 5px var(--ink)`），旋轉 8°。
- 待辦勾選框：圓形；勾選後變黃色貼紙、歪 -8°。

## 動態
- 換日：`.pop` 換成 `slap`（貼紙拍上去：scale 1.15 → 0.97 → 1、旋轉 -4° → 0）。
- 勾選：只對剛勾的那格（`.just`）播 `slap`。
- 插圖待機沿用共用動畫。

## 不要做
- 不用 SVG filter（feTurbulence 等）做蠟筆質感，iPhone 會卡。
- 抖動只用在插圖，不要套在文字或可點擊元素上。
- 不臨摹蠟筆小新等卡通角色。

## 檢查點
- 已載入字型包含 `Iansui`。
- 同一天切走再切回，插圖抖動形狀一樣。
- 小圖形（星星、窗戶）沒有被抖到變形。
- 旋轉的卡片在窄螢幕沒有造成水平捲動。
