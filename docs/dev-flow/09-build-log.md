# S4 Build Log — 2026-10-18（可切換風格：繪本／澳洲海報／護照蓋章）

## 本次需求
把「澳洲風格」與「護照蓋章」兩種風格放到網站上，可以自己切換。動態效果不能拖慢 iPhone。

## 切換方式
- 右上選單「設定」改名「風格」（調色盤圖示），面板最上方三選一：繪本（預設）／澳洲海報／護照蓋章；大字與減少動態效果維持原位。
- 選擇記在 localStorage `aus-theme`；`<head>` 內聯腳本在第一次繪製前套上 `html[data-theme]`，重新整理不會先閃一下預設風格。
- 切換時：CSS 變數換色票；插圖與圖示用同一套 SVG 依主題色票重畫（`window.buildArt(theme)`），重繪首頁插圖、航班、交通標籤、當日行程、清單；網址列顏色（`theme-color`）同步更新。

## 澳洲海報風（aussie）
- 復古旅遊海報：沙色底 #FBEFD9、海軍藍線 #1E3557、日落橘、金合歡黃、海水藍、尤加利綠；小圓角＋斜向硬陰影。
- 海灘救生員紅黃旗元素：頂端選單底部條紋、章節標題下的條紋、首頁插圖沙灘上兩支會飄的旗子、「必去」改紅色貼紙。
- 首頁背景放射狀太陽光（靜態 conic-gradient，不旋轉）；英文與數字用 Alfa Slab One（中文仍是 Huninn）。
- 換日動畫：海報滑入（transform／opacity）。
- 刻意不使用原住民點畫或其他原住民族圖騰當裝飾，只用海灘文化、原生植物配色、復古海報字型。

## 護照蓋章風（passport）
- 護照內頁：米色底＋淡淡防偽波紋（靜態 SVG 背景）、海軍墨細線、小圓角；英文與數字用 Courier Prime。
- 每天一枚入境章（`TRIP.stamps`，Day 1–14 依序，圓章／方章交替），印在當日插圖左上角；換日時「咚」一聲蓋下去（scale＋rotate）。
- 首頁插圖印著 SYDNEY／BRISBANE 兩枚章，下方加一段護照機讀碼（MRZ）樣式的裝飾文字（aria-hidden）。
- 護照集章：點開過的那天會蓋章，日期標籤從虛線變實線並顯示「護照集章 n／14」；記在 localStorage `aus-stamps`。
- 清單打勾變成蓋章（圓框＋紅色勾），只有剛勾的那一格播放蓋章動畫。

## iPhone 效能
- 所有新動畫只動 transform／opacity；沒有 filter、backdrop-filter、mix-blend-mode，也沒有大面積旋轉圖層。
- 新增：插圖離開畫面時用 IntersectionObserver 暫停動畫（首頁插圖與當日行程）。
- 減少動態效果開啟時，所有新動畫一併停止，章直接顯示在最終位置。
- 新字型只在該風格實際用到時才下載（瀏覽器依 @font-face 延遲載入），繪本風仍只下載 Huninn。

## 驗證（Playwright／Chromium，iPhone 13＋1280px）
- 三種風格逐一切換：data-theme、theme-color、localStorage 正確；重新整理後保持所選風格與選項勾選狀態。
- 三種風格、手機與桌面皆無水平捲動、無 console 錯誤；字型載入：繪本只有 Huninn、澳洲加 Alfa Slab One、護照加 Courier Prime。
- 減少動態效果模式下 14 天標題全部正確、無錯誤。
- 未驗證：iPhone 實機 Safari 的動畫流暢度與 textPath 圓章文字排版（Chromium 正常）。
