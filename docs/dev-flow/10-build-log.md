# S4 Build Log — 2026-10-18（風格真正換字型與畫法＋travel-style skill）

## 本次需求
上一版切換風格後「本體文字跟繪圖風格好像沒有改變」；把風格做法整理成 skill 並上傳。

## 問題原因
09 只換了色票、外框與裝飾：中文內文三種風格都是 Huninn，插圖是同一套 SVG 換色。

## 網站修改
- **澳洲海報**：中文改 Noto Sans TC（內文 400、標題／按鈕／選單 900）；插圖改「錯位印版」畫法——同一張圖印兩層，下層海軍藍往右下偏移、上層色塊不描邊；插圖底色改暖杏色天空 #F6D2A2（否則和紙色的雲與帆沒有輪廓會消失）。
- **護照蓋章**：中文改 Noto Serif TC（內文 400、標題 700）；插圖改「刻版排線」——四個色改成斜線／橫線／網點／交叉線 pattern（全頁共用一份隱藏 defs），線寬 3 → 2.2，整張圖像護照內頁版畫，彩色只留給章。
- **字型延遲載入**：`<head>` 固定連結只留 Huninn；其他風格的字型由 head 腳本 `loadThemeFonts(theme)` 在選到時才插入（每個中文字型的 CSS 一個字重約 125 KB）。直接開某風格時只下載該風格的字型。
- 版本號 little-explorers-20261018b。

## travel-style skill
位置：`.claude/skills/travel-style/`（打包檔 `docs/skills/travel-style.skill`）。
- `SKILL.md`：一個風格＝中文字型＋插圖畫法＋色票形狀＋動態；共用內容、iPhone 效能、文化與誠實規則、實作與驗證步驟。
- `references/architecture.md`：多風格架構（head 腳本、token、buildArt 畫法配方、切換時重畫清單、章與集章、localStorage）。
- `styles/`：picture-book、aussie-poster、passport（已在本站實作）；crayon、journal、pixel（設計規格，標明尚未實作驗證）；`_template.md` 新增風格用。
- `scripts/check_themes.js`：Playwright 逐一切換風格，iPhone 13＋1280px（減少動態效果），回報 data-theme、theme-color、localStorage、已載入字型、水平溢出、console 錯誤並截圖。

## 驗證（Playwright／Chromium）
- 用 skill 內附腳本跑 book、aussie、passport：三者皆無錯誤、無水平溢出；重新整理保留風格；桌面直接載入時字型分別只有 Huninn／Alfa Slab One＋Noto Sans TC／Courier Prime＋Noto Serif TC。
- 截圖確認海報風插圖的和紙色形狀在天空底上可見、護照風排線與章可讀。
- 未驗證：iPhone 實機 Safari（pattern、textPath、字型切換時的閃爍）。
