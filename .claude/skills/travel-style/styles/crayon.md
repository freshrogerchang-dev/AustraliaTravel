# 蠟筆兒童畫（theme id：`crayon`）

> 設計規格，尚未在實際網站實作驗證。第一次實作時照「檢查點」逐項看截圖，並把實際調整寫回這份檔案。

## 一句話
像 6 歲孩子用蠟筆畫的旅行圖畫本：歪歪抖抖的粗線、塗出框的顏色、圖畫紙、貼紙。

## 適合
親子旅行，給孩子自己看、自己點的版本。任何目的地。

## 字型
| 用途 | 字型 | Google Fonts 參數 | 字重 |
|---|---|---|---|
| 中文內文／標題 | 芫荽 Iansui（手寫感） | `family=Iansui` | 400 |
| 英數 | 同上（或 `Patrick Hand` 只給英數） | `family=Patrick+Hand` | 400 |

- 字級比其他風格大一號（內文 17px），行高 1.85，方便孩子看。
- 標題可用不同顏色交錯（每個字輪流四色），只用在首頁大標。

## 色票與形狀
```css
html[data-theme="crayon"] {
  --paper: #FFFFFF; --bg: #FFFDF5; --ink: #2B2B2B; --ink-2: #5C5C5C;
  --coral: #FF8A7A; --yellow: #FFD23F; --water: #5EC2F2; --green: #7BD389;
  --coral-t: #FFE6E1; --yellow-t: #FFF5CC; --water-t: #DDF2FC; --green-t: #E3F7E6;
  --line: 3px; --r-xl: 28px 34px 26px 38px / 34px 26px 38px 28px;   /* 不規則圓角 */
  --r-lg: 22px 28px 20px 30px / 28px 20px 30px 22px;
  --r-md: 16px 22px 14px 24px / 22px 14px 24px 16px; --r-sm: 12px 16px 10px 18px / 16px 10px 18px 12px;
  --shadow: 3px 4px 0 var(--ink);
  --font: 'Iansui', 'PingFang TC', system-ui, sans-serif;
}
```
- 不規則圓角讓每張卡片像手剪的。
- 頁面底：圖畫紙紋理用靜態 SVG pattern（稀疏的淺灰短線點），不用 `feTurbulence`。

插圖色票：`P #FFFFFF, I #2B2B2B, C #FF8A7A, Y #FFD23F, W #5EC2F2, G #7BD389, sw 3.5`。

## 插圖畫法：抖動線＋塗出框
1. **抖動**：build 時用固定種子的亂數，把 path 的座標加 ±1.5 偏移（同一天每次重畫都一樣，不會閃）。只處理 M/L/Q/C/H/V 指令的座標，**跳過含 `a`/`A` 弧線指令的 path**（弧線的旗標被抖動會整個壞掉）；圓改用 rx、ry 略不同的 ellipse。
   ```js
   function rng(seed) { return function () { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; }; }
   function wobble(d, r) { return /[aA]/.test(d) ? d : d.replace(/-?\d+(\.\d+)?/g, function (n) { return (parseFloat(n) + (r() - .5) * 3).toFixed(1); }); }
   ```
2. **雙線**：每條外框線畫兩次，第二次再抖一次、`stroke-opacity: .55`，像蠟筆來回描。
3. **塗出框**：色塊的填色層往右下偏 2–3px、不描邊，線稿在上層；顏色故意沒對齊。
4. **蠟筆紋理**：填色用 pattern（底色＋不規則的白色細斜線，`stroke-opacity: .35`），像蠟筆沒塗滿。
5. 線寬 3.5、圓頭；不要細節太多，形狀簡化成小孩會畫的樣子（太陽有臉、房子是三角形加方形）。

## 版面元件
- 卡片：不規則圓角、旋轉 ±0.6°（單雙號交錯），像貼在本子上。
- 「必去」：星星形狀的貼紙（clip-path 星形），旋轉 8°。
- 待辦勾選：勾選後蓋一個笑臉貼紙。
- 日期標籤：圓形貼紙，選中時放大並換成當天顏色。

## 動態
- 換日：`slap`（貼紙拍上去：scale 1.15 → 0.97 → 1，旋轉 -4° → 0）。
- 插圖待機：太陽、雲用 `a-bob` 慢慢晃；整張插圖不要一直晃（小孩看久會暈）。
- 勾選：笑臉貼紙 `slap`。

## 不要做
- 不用 SVG filter 做蠟筆質感（iPhone 會卡）。
- 不要讓抖動影響文字或可點擊區域大小；抖動只在插圖。
- 不臨摹蠟筆小新等卡通角色。

## 檢查點
- 已載入字型包含 `Iansui`。
- 同一天切走再切回，插圖抖動形狀一樣（種子固定）。
- 含弧線的形狀沒有變形。
- 不規則圓角的卡片在窄螢幕沒有切到文字。
