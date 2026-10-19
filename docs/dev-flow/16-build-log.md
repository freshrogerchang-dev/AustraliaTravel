# S4 Build Log — 2026-10-19（雪梨已訂飯店地圖＋Day 2–6 Google 路線按鈕）

## 本次需求
使用者傳來雪梨已訂飯店的 Google 地圖短網址（maps.app.goo.gl/7LfUX4V7bFqoLBh67），要求更新前四晚住宿，並在前幾天的接駁加上可點開 Google 路線的按鈕。

## 限制
本 session 的網路政策擋 maps.app.goo.gl（第二次確認），無法解析飯店名稱與位置；沒有猜測飯店。

## 做法
- `TRIP.hotels.syd = { name, query, map }`：map 放使用者的短網址（使用者手機點得開）；name／query 待補。
- 住宿卡：雪梨改為「已預訂的飯店（名稱待補）」＋地圖按鈕；區域文字不再寫「達令港周邊」（實際位置未知）。
- 行程每站可加 `routes: [{ from, to, mode, label }]`，`@syd` 代表飯店。app.js 產生 `https://www.google.com/maps/dir/?api=1&origin=…&destination=…&travelmode=transit|walking|driving` 連結，iPhone 點開會進 Google 地圖 App。
  - 飯店名稱未填：起點省略＝手機目前位置，標籤顯示「目前位置 →」；終點是飯店的路線（回飯店、機場到飯店）先隱藏。
  - 填了 name 之後：所有路線自動改從飯店出發／回到飯店。
- 路線（27 條；先前誤寫 31）：Day 2 機場→飯店（大眾運輸、叫車）、Darling Quarter、達令港；Day 3 環形碼頭、歌劇院、植物園、魯納樂園、回飯店；Day 4 環形碼頭、F2 渡輪、碼頭→主入口公車、回程、雨天備案澳洲博物館；Day 5 中央車站→Katoomba→Scenic World→Echo Point→Leura→回中央車站；Day 6 邦迪、國內線 T2／T3。

## 修正
- 路線按鈕一開始沿用 class `route`，與首頁路線條 `.route`（flex-wrap）衝突，圖示被擠到第一行；改名 `route-btn`。
- 連結按鈕的圖示加 `flex-shrink: 0`，長標籤時不再縮小。

## 驗證
路線連結參數逐條檢查（有／無飯店名稱兩種情況）；版面稽核 5 風格 × 4 寬度 TOTAL 0；五風格回歸、14 天標題、像素與蠟筆插圖全數正常。

## 追加（同日）：飯店名稱補上
- 使用者提供飯店：**Meriton Suites Sussex Street, Sydney**。地址第三方資料寫 232 或 234 Sussex Street 不一致，路線查詢用飯店名稱＋「Sydney NSW 2000」；Town Hall 站步行約 4 分鐘（Hotels.com）；公寓式有廚房，洗衣機與烘衣機依房型（Expedia 三房房型、Trip.com 住客評論）。
- `TRIP.hotels.syd` 填入名稱與查詢字串 → 27 條路線全部改由飯店出發／回到飯店（含原本隱藏的「機場 → 飯店」「回飯店」）。
- 交通文字改寫：Day 2 機場 Airport Link（T8）直達 Town Hall 再走 4–5 分鐘；Day 3／4 到環形碼頭用 Town Hall 站火車或 George Street L2／L3 輕軌；Day 4 雨天備案澳洲博物館走路 15–20 分鐘；Day 5 Town Hall → Central 轉藍山線；Day 6 Town Hall → 國內線站（T2 Jetstar／Virgin、T3 Qantas）。
- 住宿卡、清單、預算、票價卡的雪梨文字同步更新。
