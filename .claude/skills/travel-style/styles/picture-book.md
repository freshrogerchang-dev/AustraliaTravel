# 繪本（theme id：`book`，預設）

## 一句話
日系手繪繪本：和紙白底、墨灰粗線、大圓角、平塗四色，可愛簡約。

## 適合
親子旅行的預設風格；任何目的地都適用，插圖題材換成當地地標、交通工具、風景即可。只用淺色底。

## 字型
| 用途 | 字型 | Google Fonts 參數 | 字重 |
|---|---|---|---|
| 中文內文／標題 | Huninn（粉圓） | `family=Huninn` | 只有 400 |
| 英數 | 同上 | | |

Huninn 只有一個字重：`font-synthesis: none`，不要寫 `font-weight: 700`（會被瀏覽器假粗體或沒效果）。強調用底色（`strong` 加淡黃底）而不是粗體。

## 色票與形狀
```css
:root {
  --paper: #FFFCF6; --bg: #FFFCF6; --ink: #3E3A39; --ink-2: #6B6461;
  --coral: #F2A497; --yellow: #F6D27A; --water: #A8D3E6; --green: #B9DAA5;
  --coral-t: #FCE9E4; --yellow-t: #FDF4DA; --water-t: #E7F3F9; --green-t: #EDF5E7;
  --line: 3px; --r-xl: 32px; --r-lg: 26px; --r-md: 20px; --r-sm: 14px;
  --shadow: 0 4px 0 var(--ink);
  --font: 'Huninn', 'PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', system-ui, sans-serif;
}
```
平塗、不用漸層。卡片 3px 墨灰框＋大圓角，重要卡片加正下方硬陰影。

插圖色票：`P #FFFCF6, I #3E3A39, C #F2A497, Y #F6D27A, W #A8D3E6, G #B9DAA5, sw 3`。

## 插圖畫法
- 全部 3px 墨灰線、圓頭圓角（`stroke-linecap/linejoin: round`），內部細節線 2–2.5px。
- 四色平塗，和紙白當亮面；海用波浪邊（`q10 -6 20 0` 重複）。
- 題材：地標（歌劇院、港灣大橋）、交通工具（飛機、渡輪、纜車）、動物、天氣元素（雲、太陽、星星）。每一天一張 240×160 的插圖，首頁一張 360×250。
- 範例：
```svg
<path d="M40 104Q120 20 200 104" stroke-width="4"/>
<rect x="10" y="104" width="220" height="10" rx="3" fill="#F6D27A"/>
<circle class="a-twinkle d1" cx="72" cy="72" r="4.5" fill="#F6D27A"/>
```

## 版面元件
- 選單目前位置：黃底＋墨框膠囊。
- 章節小標（kicker）：膠囊形、四色之一。
- 日期標籤：圓角方塊，選中時填當天顏色、上浮 2px＋硬陰影。
- 「必去」：珊瑚色膠囊貼紙，旋轉 3°。
- 航班卡：登機證造型，中間虛線撕口加左右半圓缺口。

## 動態
- 插圖：雲飄（drift）、船浮（bob）、飛機漂（float）、太陽慢轉（只轉光芒）、燈閃（twinkle）、旗子飄（flag）。
- 換日：面板 `pop`（上彈＋微縮放），日期標籤 `chip` 彈跳。
- 勾選：勾勾 scale 彈入。

## 不要做
- 深色底、漸層、陰影模糊。
- 臨摹特定繪本作家或卡通角色。

## 檢查點
- Huninn 有載入（`document.fonts.check('16px Huninn')`）。
- 每天插圖題材與當天內容相符。
