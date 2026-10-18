---
name: travel-style
description: 為旅遊行程網站／App 套用或新增「真正不同」的視覺風格（繪本、澳洲復古海報、護照蓋章、蠟筆兒童畫、旅行手帳、像素冒險，或依新目的地自訂），可做成單一風格網站，也可在同一網站放多種風格讓使用者切換。每種風格都規定中文字型、插圖畫法、色票形狀與 iPhone 友善的動態效果。只要使用者提到旅遊／行程／親子旅行網站的風格、主題、改版、換字型、插圖風格、「做成 XX 風」、加一個風格切換、或想依旅遊國家的文化藝術設計頁面，就使用這個 skill，即使沒有說出「skill」或風格名稱。
---

# travel-style：旅遊網站風格庫

這個 skill 讓旅遊行程網站可以換上**真正不同**的風格。它建立在一個教訓上：只換色票和外框，使用者會覺得「文字跟繪圖風格根本沒變」。一個風格至少由四件事組成，缺一就只是換色：

1. **中文內文字型**（不只英數字）
2. **插圖畫法**（描邊、填色、紋理、構圖，而不是同一張圖換顏色）
3. 色票與形狀（線寬、圓角、陰影、背景）
4. 專屬的動態與小互動

## 先判斷是哪一種工作

- **A. 做一個新的旅遊網站**：先讀 `references/architecture.md` 建好骨架，再套一個（或多個）風格。
- **B. 在既有網站新增或改造風格**：先讀網站現有的 `index.html`／`style.css`／`illustrations.js`／`app.js`，確認是否已是多風格架構（`html[data-theme]`＋`window.buildArt(theme)`）。不是的話，先依 `references/architecture.md` 改成那個架構，再加風格。
- **C. 想一個新風格**：複製 `styles/_template.md` 寫成新檔，四件事都要填滿，再實作。

## 風格庫

依使用者要的風格讀對應檔案，只讀需要的那幾份：

| 風格 | 檔案 | 一句話 | 中文字型 |
|---|---|---|---|
| 繪本 | `styles/picture-book.md` | 日系繪本：和紙白、3px 墨灰粗線、平塗四色 | Huninn |
| 澳洲復古海報 | `styles/aussie-poster.md` | 網版印刷海報：色塊不描邊＋錯位印版、救生員紅黃旗 | Noto Sans TC 900 |
| 護照蓋章 | `styles/passport.md` | 護照內頁：明體、刻版排線插圖、每天一枚入境章 | Noto Serif TC |
| 蠟筆兒童畫 | `styles/crayon.md` | 像 6 歲小孩畫的：抖動蠟筆線、塗出框、手剪卡片、貼紙 | 芫荽 Iansui |
| 旅行手帳 | `styles/journal.md` | 鉛筆線稿＋水彩暈染、方格紙、紙膠帶（規格，尚未實作驗證） | 霞鶩文楷 LXGW WenKai TC |
| 像素冒險 | `styles/pixel.md` | 像素 RPG：插圖即時轉像素圖、每天一關、+10 EXP、走路小人 | 俐方體 11 號 Cubic 11（自帶子集） |

使用者說的是某個國家或城市（例如「日本風」「首爾風」）時，不要硬套上表：用 `styles/_template.md` 依當地**非神聖、非原住民族專屬**的視覺文化（交通標誌、海報、郵票、市場招牌、建築、植物）設計新風格，並說明取材來源。

## 共用內容（每個風格都要有）

行程網站的資訊不因風格而少，風格只改「長相」：

- 頂端固定選單；首頁插圖＋標題＋出發倒數
- 航班／交通卡片（班號、起降時間、跨日標記）
- 每日行程：上方日期切換（ARIA tablist，左右鍵、滑動、`#day-N` 深連結），下方時間軸，交通方式彩色標籤，重點標「必去」
- 可打勾待辦清單（localStorage）、住宿資訊
- 預算：每項附預估區間（標來源或「粗估」）＋可編輯的實際金額／幣別／訂位代號、自訂項目、匯率；台幣加總與「已填 vs 預估」差額；匯出／匯入 JSON 與複製文字摘要（localStorage 只在單一裝置）。輸入框字級 16px，iPhone 才不會自動放大
- 設定：風格切換、大字模式、減少動態效果
- 手機優先、繁體中文、靜態網站（可直接放 GitHub Pages），內容集中在 `data.js`

## iPhone 效能規則

這些規則是為了讓動畫在舊 iPhone 也順，並且省電：

- **只動 `transform` 和 `opacity`**。不要動 width／height／top／left／box-shadow／filter。
- 不用 `filter`（含 SVG `feTurbulence`／模糊）、`backdrop-filter`、大面積 `mix-blend-mode`、`background-attachment: fixed`。紋理改用靜態 SVG pattern 或 CSS 漸層。
- 不要旋轉或縮放大於畫面的圖層（例如整個 hero 背景旋轉），iPhone 會配置巨大的貼圖記憶體。
- 同時動的小元素控制在 12–15 個以內；插圖離開畫面就用 IntersectionObserver 加 `.paused` 暫停。
- 尊重「減少動態效果」：`html[data-motion="reduce"]` 和 `prefers-reduced-motion` 下關掉所有動畫，且元素要停在最終狀態（例如章直接蓋好）。
- **字型依風格延遲載入**：每個中文字型的 Google Fonts CSS 一個字重約 125 KB，所以只在選到該風格時才插入 `<link>`，最多兩個字重。預設風格之外的字型不要寫進 `<head>` 的固定連結。
- 每種風格只用**一個**中文字型；英數展示字型可另加一個。
- Google Fonts 沒有的字型（例如中文像素字）要自帶：先確認授權允許再散布、只收網站用到的字做子集（woff2），授權全文放在字型旁邊。

## 文化與誠實

- 不拿原住民族藝術（澳洲原住民點畫、毛利紋樣、台灣原住民圖騰等）、宗教符號、國徽當通用裝飾。改用海灘文化、交通、植物、建築、海報字型等日常視覺。
- 護照風不可做得像真的官方文件：不放國徽、真實護照號碼、官方機關名稱。
- 插圖全部自己用 SVG 畫，不臨摹特定插畫家、遊戲角色或品牌。
- 價格、時刻、開放時間要標查核日期與來源類型；查不到就寫「以官網為準」，不要編。

## 實作步驟

1. 讀選定的風格檔，列出要改的四件事（字型、插圖畫法、色票形狀、動態）。
2. 依 `references/architecture.md`：
   - 在 `style.css` 用 `html[data-theme="名稱"]` 覆寫 token，並寫該風格的元件覆寫；
   - 在 `<head>` 的 FONTS 表加這個風格的字型參數；
   - 在 `illustrations.js` 的 PALETTES 加色票，並在 `build(theme)` 加這個風格的插圖畫法；
   - 在設定面板加一個選項（含小色塊預覽），在 app.js 的 THEMES 加網址列顏色。
3. 驗證（見下一節），看截圖時問自己：**把顏色遮掉，還認得出是不同風格嗎？** 認不出來就是只換了色，回到步驟 1。
4. 更新專案紀錄（如果專案有 `docs/dev-flow/` 就寫新的 build log），commit、push。

## 驗證

用內附腳本一次檢查所有風格（iPhone 13＋1280px 桌面、減少動態效果）：

```bash
python3 -m http.server 8765 &      # 在網站根目錄
NODE_PATH=$(npm root -g) node <skill>/scripts/check_themes.js http://localhost:8765/ book,aussie,passport ./shots
```

腳本依架構約定操作頁面（`#settings-btn`、`input[name="theme"]`、`#tab-N`），輸出每個風格的 `data-theme`、網址列顏色、localStorage、已載入字型、水平溢出、console 錯誤，並存首頁／行程／清單截圖。要逐張看截圖，特別注意：

- 字型是否真的換了（腳本列出的已載入字型要包含該風格的中文字型）
- 插圖和背景同色的形狀有沒有消失（例如不描邊時，和紙色的雲會不見）
- 章、貼紙等疊在插圖上的元素是否仍可讀
- 手機寬度沒有左右捲動

腳本只在 Chromium 跑；回報時要說清楚 iPhone 實機 Safari 未驗證。
