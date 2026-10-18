# S3/S4 Build Log — 2026-10-18（新增 Taronga、Sea World、Movie World，移除 Dig IT）

## 本次需求
使用者附上一個 Gemini 分享連結並要求：加入一些景點、去掉挖土機（Dig IT）、增加 Sea World、雪梨的動物園、黃金海岸的華納兄弟（Movie World）。
- Gemini 分享連結（share.gemini.google／gemini.google.com）在本 session 的網路政策下無法連線，未讀到內容；本次只依文字需求調整。
- 「雪梨的動物園」解讀為 Taronga Zoo（港灣邊、搭渡輪可達）；西雪梨另有 Sydney Zoo（Bungarribee），未採用。

## 行程調整（總天數、住宿晚數、班機不變）
| Day | 日期 | 新內容 | 說明 |
|---|---|---|---|
| 4 | 6/19（六） | **Taronga 動物園**（F2 渡輪＋公車上山）＋ Vivid 閉幕夜選配 | 原恐龍博物館改為雨天備案（與海事博物館擇一） |
| 7 | 6/22（二） | Dreamworld | 不變 |
| 8 | 6/23（三） | Currumbin＋Burleigh Heads | 原 Day 9 提前，樂園日之間放動物日 |
| 9 | 6/24（四） | **Sea World**（Nickelodeon Land、海豚表演） | 新 |
| 10 | 6/25（五） | Aquaduck＋午睡＋HOTA 戶外或海邊（選配） | 原 Day 8 與 Day 11 合併成輕鬆日 |
| 11 | 6/26（六） | **Warner Bros. Movie World**（Kids’ WB 兒童區） | 新；取代 Dig IT／HOTA 日 |
- 大日／輕日交錯：Dreamworld → Currumbin → Sea World → 輕鬆日 → Movie World，避免連續三個樂園。
- Day 5 藍山雨天備案改為「今天去恐龍博物館，藍山改到 Day 4」；Day 6 的自駕理由改寫（不再提 Dig IT 在山上）。

## 查核（2026-10-18，官方網站在本 session 無法直接連線，以搜尋引擎索引的官網頁面＋第三方交叉）
- **Taronga**：冬季 5–8 月 9:30–16:30（官網）；**Sky Safari 纜車 2023/1 起停駛、園方預計 2027 年底重新開放**，故 2027/6 規劃為碼頭搭公車上山到主入口；門票為第三方 2026 整理約大人 A$51–55、4–15 歲 A$31–33（非官網數字，頁面已標示）；官網曾公告暫停線上購票（日期不明），已提醒出發前確認。
- **Sea World**：兒童區為 Nickelodeon Land（海綿寶寶、Dora、汪汪隊）；2026/10 營業時間多為 10:00–17:00、部分平日 10:30–16:00，季節調整；705 公車從衝浪者天堂約 10–15 分鐘（第三方規劃器，班距說法不一）。
- **Movie World**：Kids’ WB 身高規定取自官網（Junior Driving School 90cm 起、90–106 陪同；Road Runner 110cm 起、110–120 陪同；小火車 110 以下陪同）；不自駕為 G:link 到 Helensvale 轉 TX7（第三方估約 1 小時 15 分）。
- 單日票約 A$109–119、多園通票價格未查到可靠 2026 數字，頁面只寫「比較多園通票與單日票，以官網為準」。

## 其他同步
- 新插圖：長頸鹿配港灣（Day 4）、躍出水面的海豚頂球（Day 9）、電影場記板＋膠卷（Day 11）；移除不再使用的恐龍、挖土機、藝術插圖。
- 護照章：Day 4 TARONGA ZOO、Day 8 CURRUMBIN、Day 9 SEA WORLD、Day 10 AQUADUCK、Day 11 MOVIE WORLD。
- 清單：移除 Dig IT 預約與 Tamborine 接駁；新增 Taronga 門票、Sea World＋Movie World 門票／通票、Movie World 交通；Currumbin、Aquaduck 改新日期。
- 票價卡「景點接駁」：新增 Taronga、Sea World、Movie World，移除 Dig IT／Escape Shuttles。
- 像素風：近灰色只量化成墨色或紙色（修正細線變綠）；Cubic 11 子集重做。
- checkedOn 2026-10-18；版本 little-explorers-20261018d。

## 驗證（Playwright／Chromium）
- 14 天標題正確；五種風格無錯誤、手機與桌面無水平捲動；像素與蠟筆 14 天插圖全部正確產生。
- 新插圖在五種風格各截圖確認（雲與長頸鹿頭、星星與膠卷架的重疊已修正）。
- 未驗證：iPhone 實機；2027 年各園區實際票價、時刻與 Sky Safari 是否如期重開。
