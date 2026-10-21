# S4 Build Log — 2026-10-21（三段住宿全部改為使用者訂好的飯店）

## 本次需求
雪梨改為曼特拉肯特酒店；黃金海岸改為 Meriton Suites Broadbeach；布里斯本改為 Meriton Suites Herschel Street。

## 查核（第三方訂房與旅遊局頁面，2026-10-21）
| 城市 | 飯店 | 地址 | 交通 |
|---|---|---|---|
| 雪梨 | Mantra on Kent（曼特拉肯特酒店） | 433 Kent Street, Sydney NSW 2000 | Town Hall 站步行約 5 分鐘（來源有寫 100 公尺，不一致） |
| 黃金海岸 | Meriton Suites Broadbeach | 2669 Gold Coast Highway, Broadbeach QLD 4218 | 對面是 The Star 與 Pacific Fair；來源未指名最近 G:link 站 |
| 布里斯本 | Meriton Suites Herschel Street | 43 Herschel Street, Brisbane QLD 4000 | Roma Street 站步行約 4 分鐘（Hotels.com；距離各來源不一致） |
- 廚房、洗衣機與烘衣機依房型，已在住宿卡與清單提醒入住前確認。

## 調整
- `TRIP.hotels` 新增 gc、bne，syd 改為 Mantra on Kent；三張住宿卡都標「已預訂」並附 Google 地圖（以地址搜尋）。雪梨原本的短網址屬於前一間飯店，已換掉。
- 雪梨：Day 2–6 的 27 條 Google 路線自動改由 Mantra on Kent 出發；文字 Sussex Street → Kent Street、步行 4–5 分 → 約 5 分。
- 黃金海岸：Day 6 抵達文字改為 777 公車到 Broadbeach South 下車即在飯店附近。
- 布里斯本（變動最大，從 South Bank 改到河北岸市中心）：火車改到 Roma Street 站；South Bank 與博物館改為走 Kurilpa 橋 15–20 分鐘（估計）或搭火車一站；CityCat 改從 North Quay 碼頭上船（約 10 分鐘，估計）；Queen Street Mall 步行約 10 分鐘；6/29 從 Roma Street 搭 Airtrain（兒童免費方案涵蓋 Roma Street）。
- 清單（三個住宿項目改為已訂與入住前確認事項）、預算三項名稱、票價卡同步。

## 驗證
27 條路線起點為 Mantra on Kent；版面稽核 5 風格 × 4 寬度 TOTAL 0；五風格回歸、14 天標題、預算功能正常；Cubic 11 子集重做。

## 追加（同日）：Day 6–14 路線按鈕
- 使用 `@gc`（Meriton Suites Broadbeach）與 `@bne`（Meriton Suites Herschel Street）新增 39 條 Google 路線，全行程共 66 條：
  - Day 6 OOL 機場 → 飯店（777 公車、叫車）、Kurrawa 海灘；Day 7 Dreamworld 來回；Day 8 Currumbin、Burleigh Heads、回飯店；Day 9 Sea World、Tedder Avenue、回飯店；Day 10 Aquaduck、賞鯨碼頭、HOTA、Kurrawa；Day 11 Movie World 來回；
  - Day 12 黃金海岸飯店 → 布里斯本飯店（火車、接駁）、South Bank、摩天輪；Day 13 North Quay、博物館、Lone Pine、Riverside Green、Mt Coot-tha；Day 14 Queen Street Mall、Roma Street 站、Airtrain 到國際航廈、叫車。
- 樂園日回程、Lone Pine、Mt Coot-tha 等多附一顆「叫車」（driving）按鈕。
- 驗證：66 條逐條檢查起點與終點都有值、沒有未解析的飯店代號、交通方式合法；版面稽核 TOTAL 0；五風格回歸正常。
