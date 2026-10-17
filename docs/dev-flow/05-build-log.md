# S4/S2 Build Log — 2026-10-17

## 本次需求
使用者（延續先前以 GPT 更新過的版本）要求：加入去程 CI51、回程 CI54 班號；再查適合六歲小朋友的景點；手機呈現並支援加入主畫面（桌面捷徑）；頁面視覺再精進。

## 去程／回程班號
- Day 1、Day 14 與頂部 trip-ticket 加入 CI51（TPE→SYD）、CI54（BNE→TPE），並附 `.flight-code` 樣式標籤。
- 時刻來源：多個第三方航班追蹤網站（PlaneMapper、Airportia、Airpaz、FlightStats 等）交叉比對，取多數一致的數字：
  - CI51 表定 23:30 從桃園機場 T2 起飛，隔日約 10:45 抵達雪梨機場 T1，飛行時間約 9 小時 15 分。部分來源列 23:50，營運星期各站說法不一。
  - CI54 表定 22:50 從布里斯本機場起飛，隔日約 05:40 抵達桃園機場 T2，飛行時間約 8 小時 50 分。
- 重要修正：依 CI54 實際班表反推，布里斯本 22:50 起飛、飛行約 8 小時 50 分，抵台時間落在隔日（6/30）清晨，而非原頁面假設的「當日抵台」。已同步修改 Day 14 標題列、今晚住宿欄與交通段落，提醒接機與回程交通需抓 6/30。
- 所有班號相關文字均加註「起降時間取自第三方航班追蹤網站，非官方訂位確認，實際以訂票結果為準」，維持頁面既有的誠實標示慣例。

## 六歲小朋友新增景點（非取代既有固定行程）
- **Day 3（歌劇院、植物園）**：原「14:00 回飯店午休」改為「午休或改去 Luna Park Sydney」二選一選配。查核：六歲身高多落在 106–132cm 綠區，可自行搭乘旋轉木馬／Cloud Nine 等設施，摩天輪、碰碰車仍需成人陪同（來源：Luna Park Sydney 官方 Family Rides 頁）。地理上緊鄰環形碼頭對岸 Milsons Point，渡輪／火車約 15–20 分鐘，不額外增加城市跨區。
- **Day 13（布里斯本南岸）**：原「14:00 選配 South Bank Parklands」擴充為也可改逛 Queensland Museum（SparkLab 科學中心）。查核：免費入場，40+ 件互動展品，多數資料建議適齡約 6–12 歲（來源不一，已標示為概估），正好是南岸同一園區內的室內雨天備案。
- 兩處均附 Google Maps 連結與官方資訊連結，比照既有卡片格式；未變動固定出現的 14 天骨架與既有決策（恐龍常設展、海事博物館、Aquaduck、Dig IT、Currumbin 僅替代）。
- 查核但未採用的其他六歲選項（提供使用者參考，未寫入頁面）：WILD LIFE／SEA LIFE Sydney（與既有決策「減少重複動物園」衝突，故不加入）、GOMA 兒童藝廊（與 Day 12 HOTA 同性質，恐疊加過量藝文行程）、Sydney Tramway Museum（開放時間為特定週末，與既有日期不一定對得上，風險較高，故未排入）。

## 手機與加入主畫面（Add to Home Screen）
- 新增 `manifest.json`（name／short_name／start_url／display:standalone／theme_color／background_color／icons）。
- 新增原創插畫延伸的簡化圖示：`icon-192.png`、`icon-512.png`、`icon-512-maskable.png`（已留安全邊界供系統裁切）、`apple-touch-icon.png`、`favicon-32.png`，以 ImageMagick 繪製向量圖形後輸出，非外部素材。
- `<head>` 加入 `rel="manifest"`、`apple-touch-icon`、`favicon`、`apple-mobile-web-app-capable`、`apple-mobile-web-app-status-bar-style`、`apple-mobile-web-app-title`。
- 未加入 service worker：純資訊型靜態頁不需要離線快取，加入主畫面（iOS 加入主畫面選單／Android「安裝應用程式」）本身不強制要求 service worker，避免日後更新內容被舊快取卡住的風險。
- 既有響應式 CSS（viewport、斷點、大字切換）未變動，僅在既有基礎上新增上述 PWA 相關檔案；手機實機尚未驗證加入主畫面後的外觀與啟動行為。

## 視覺精進
- 加入 Google Fonts「Space Mono」（經 Google Fonts 官方 CDN 載入），套用在日期、班號、標籤類的既有英數字元素（day-kicker、date-banner、ticket-label、stamp、section-kicker、meal-tag、time、year-pill 等），讓日期／代碼類資訊更清楚區分於中文內文字體，中文字仍維持原本 system-ui／PingFang TC 字體，不影響可讀性與載入效能。
- 新增 `.flight-code` 樣式（膠囊底色＋等寬字），讓 CI51／CI54 在內文中一眼可辨識。
- 標題加入 `text-wrap:balance`，避免長標題在窄螢幕斷行不平均。
- 未更動既有版型骨架、配色變數與卡片結構，降低破壞既有驗證結果的風險。

## 本次未完成／待辦
- 班號對應之確切 2027/6 班表、停飛調整與兒童餐需求仍須在可訂票後向華航確認。
- 加入主畫面後的實際啟動畫面、圖示顯示效果，待 iPhone／Android 實機驗證。
- Luna Park、Queensland Museum 的最新開放時間與門票規則，出發前需再查一次。

## 版本
Pages 內容版本：little-explorers-20261017。
