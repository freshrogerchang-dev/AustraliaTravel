# S4 Build Log — 2026-10-18（新增蠟筆畫、像素冒險兩種風格）

## 本次需求
依 travel-style skill 的規格，在網站加上「蠟筆兒童畫」與「像素冒險」兩種可切換風格。現在共五種：繪本、澳洲海報、護照蓋章、蠟筆畫、像素冒險。

## 蠟筆畫（crayon）
- 字型：芫荽 Iansui（選到才載入），內文放大到 17px、行高 1.85；首頁大標拆單字四色輪流、單雙字各歪幾度。
- 插圖：兩層——下層色塊往右下偏、不描邊（塗出框）；上層線條用固定種子抖動（依形狀大小調幅度、跳過弧線），線色是帶白點的蠟筆墨 pattern，色塊是帶白色斜紋的 pattern。
- 版面：不規則圓角像手剪、卡片 ±0.5° 交錯傾斜、圖畫紙筆觸底紋、章節標題下蠟筆波浪線、「必去」黃色貼紙、勾選變黃貼紙；換日與勾選用 `slap` 貼紙拍上動畫。

## 像素冒險（pixel）
- 字型：俐方體 11 號 Cubic 11（自帶子集 `fonts/cubic11-subset.woff2`，約 1000 字、45 KB，授權全文 `fonts/Cubic11-LICENSE.txt`）＋ Press Start 2P（英數）。字型取得：session 連不到 GitHub，改用 npm `@fontpkg/cubic-11`（第三方轉包），已用 fonttools 讀 name table 確認名稱、作者與授權。授權不是 OFL：免費可散布與修改，衍生品須同授權。頁尾已加字型來源。
- 插圖：同一組構圖在瀏覽器轉成像素圖——線寬 ×1.5、以 4 倍大畫到 canvas、每 4×4 取中心點縮成 1/3（小圖 1/2）、量化到 6 色固定色盤、轉 PNG 快取。第一版直接縮小會有混色雜點（雲邊冒綠點、太陽冒珊瑚色圈），改成取點後乾淨。
- 首頁：10×14 格的小探險家在歌劇院平台上兩格踏步、來回走（`steps()`）。
- 版面：方角、硬陰影；日期標籤變「LV.n」、看過的關卡亮 ★；章節標題前 ▶；進度條一格一格；勾選跳出「+10 EXP」；換日 `steps(4)` 跳入。
- 每次內容改字，要重跑 Cubic 11 子集（步驟寫在 skill 的 styles/pixel.md）。

## skill 更新
- `styles/crayon.md`、`styles/pixel.md` 改寫成實際驗證過的做法（原本是未驗證規格）；pixel 不再要求逐天手繪像素格子，改為瀏覽器像素化，並更正 Cubic 11 授權說明。
- `references/architecture.md` 畫法配方表、`SKILL.md` 風格表與自帶字型規則同步更新；重新打包 `docs/skills/travel-style.skill`。

## 驗證（Playwright／Chromium）
- skill 內附 `check_themes.js` 跑五種風格：無錯誤、手機與桌面皆無水平捲動、重新整理保留風格；各風格只載入自己的字型。
- 像素與蠟筆各點過 14 天：每天都正確產生（像素：每天 2 張 PNG、無殘留 SVG）。
- 減少動態效果模式 14 天標題全部正確。
- 未驗證：iPhone 實機 Safari（canvas 像素化、`image-rendering: pixelated`、pattern 線色）。
