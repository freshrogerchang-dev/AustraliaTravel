# 澳洲復古海報（theme id：`aussie`）

## 一句話
20 世紀中期澳洲旅遊海報＋海灘文化：網版印刷的大色塊、套色錯位、放射太陽光、救生員紅黃旗。

## 適合
澳洲（雪梨、黃金海岸、布里斯本、墨爾本）或任何海灘目的地。取材：衝浪救生（Surf Life Saving）紅黃旗、復古旅遊海報、海灘沙色、尤加利與金合歡配色、渡輪。

## 字型
| 用途 | 字型 | Google Fonts 參數 | 字重 |
|---|---|---|---|
| 中文內文／標題 | Noto Sans TC（思源黑體） | `family=Noto+Sans+TC:wght@400;900` | 內文 400、標題與按鈕 900 |
| 英數展示 | Alfa Slab One | `family=Alfa+Slab+One` | 400 |

- 標題 900 是這個風格的關鍵：粗黑體才有海報感。`h1–h5`、按鈕、選單文字、日期標籤用 900。
- 首頁大標加偏移字影 `text-shadow: 3px 3px 0 var(--coral)`（靜態，不耗效能）。
- Alfa Slab One 用在：kicker、倒數數字、班號、DAY 編號、日期標籤數字。

## 色票與形狀
```css
html[data-theme="aussie"] {
  --paper: #FFF8EC; --bg: #FBEFD9; --ink: #1E3557; --ink-2: #4E5F78;
  --coral: #EE8B5B; --yellow: #F4BE3E; --water: #7EC4CF; --green: #97C08F;
  --coral-t: #FCE3D5; --yellow-t: #FCEFC9; --water-t: #DCF0F2; --green-t: #E5F0E1;
  --flag-red: #D7322B; --flag-yellow: #F6C543;
  --r-xl: 16px; --r-lg: 12px; --r-md: 10px; --r-sm: 8px;
  --shadow: 5px 5px 0 var(--ink);
  --font: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif;
  --display: 'Alfa Slab One', var(--font);
  --stripe: repeating-linear-gradient(90deg, var(--flag-red) 0 22px, var(--flag-yellow) 22px 44px);
}
```
小圓角、往右下的斜向硬陰影；按鈕按下時 `translate(4px,4px)`＋陰影縮成 1px。

插圖色票：`P #FFF8EC, I #1E3557, C #EE8B5B, Y #F4BE3E, W #7EC4CF, G #97C08F, sw 3`。

## 插圖畫法：錯位印版
不要只換色。同一張圖印兩層：

```js
var off = (viewBoxWidth / 80).toFixed(2);   // 240 寬 → 3
inner = '<g class="plate" transform="translate(' + off + ' ' + off + ')">' + inner + '</g>' +
        '<g class="print">' + inner + '</g>';
```
```css
.illo-aussie .plate [fill]:not([fill="none"]) { fill: #1E3557; }   /* 下層全部海軍藍 */
.illo-aussie .plate * { stroke: #1E3557; }
.illo-aussie .print [fill]:not([fill="none"]) { stroke: none; }    /* 上層色塊不描邊 */
html[data-theme="aussie"] .hero-art,
html[data-theme="aussie"] .day-illo { background: #F6D2A2; }       /* 天空色 */
```
- 結果：色塊沒有輪廓線，右下露出一條海軍藍「印版」，只有線條元素（橋拱、波浪）保留線並自然出現雙線錯位。
- **一定要換插圖底色**：和紙色的形狀（雲、帆、機身）在和紙底上沒了輪廓會消失；換成暖杏色天空 `#F6D2A2` 後變成奶油色剪影。
- 風格專屬小道具：首頁沙灘插兩支紅上黃下的救生員旗（`a-flag` 飄動）。
- 插圖框：3px 墨框外再一圈 5px 紙色＋3px 墨色（`box-shadow: 0 0 0 5px var(--paper), 0 0 0 8px var(--ink)`），像海報裱框。

## 版面元件
- 選單列底部 6px 紅黃條紋（`background: var(--stripe) bottom / 100% 6px no-repeat, var(--bg)`）。
- kicker：海軍藍底、沙色字、左邊一面小紅黃旗。
- 章節標題下一條 88×8px 紅黃條紋。
- 首頁背景：靜態放射太陽光 `repeating-conic-gradient(from -90deg at 50% 100%, #F9D894 0 7.5deg, #FCE6B5 7.5deg 15deg)`。**不要讓它旋轉**（大圖層旋轉在 iPhone 很耗記憶體）。
- 「必去」：救生員紅底白字小方牌，旋轉 -3°。
- 標籤、按鈕、路線膠囊改 6px 小圓角。

## 動態
- 換日：`poster`（從右滑入＋微旋轉回正）。
- 勾選：勾選框 `wobble`（縮小旋轉後彈回）。
- 插圖待機沿用共用動畫；旗子 `a-flag`。

## 不要做
- 不用澳洲原住民點畫、彩虹蛇等原住民族藝術當裝飾；不用國旗、國徽。
- 袋鼠、無尾熊可以畫，但要自己畫，不臨摹品牌吉祥物。

## 檢查點
- 已載入字型包含 `Noto Sans TC` 與 `Alfa Slab One`。
- 首頁插圖的雲、歌劇院帆在天空色上看得見。
- 紅黃條紋在手機寬度沒有造成水平捲動。
