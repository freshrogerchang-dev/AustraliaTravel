---
name: web-svg-design
description: 網頁 SVG 插圖設計：替網站重畫或新增 SVG 插圖、場景圖、每日插圖、首頁主圖，或加背景配樂。只要使用者說「網頁svg設計」「網頁 SVG 設計」「重畫插圖」「畫一張新的 SVG」「插圖再熱鬧一點」「加配樂」，或要替行程新增一天的插圖，就使用這個 skill。規則整理自《SVG 動畫圖鑑》svg-scene-maker skill（MIT），並改成符合本站五風格與 iPhone 效能限制的版本。
---

# 網頁 SVG 設計（web-svg-design）

這份是本專案的插圖規則。來源是 https://svg-scene-atlas.pages.dev/ 的 svg-scene-maker skill（MIT，Copyright (c) 2026 SVG Scene Atlas），只採用「畫面規則」和「配樂和聲規則」。它原本做的是 1600×600 單一 HTML 互動場景，有日夜循環、天氣、秀和濾鏡，這些**不採用**，因為和本站的 240×160 小卡、五種風格，以及 iPhone 效能規則衝突（2026-11-25 使用者決定）。

動手前一定要先讀：
- `.claude/skills/travel-style/SKILL.md`：iPhone 效能規則、文化與誠實規則、驗證腳本
- `.claude/skills/travel-style/references/architecture.md`：`buildArt(theme)`、色票、五種畫法

## 一、畫面規則（每張插圖都要做到）

1. **地標一眼認得出來**，在地元素要寫實、查證過，不要編造。例如：
   - 雪梨：港灣大橋（拱頂兩面旗、攀橋的人）、歌劇院帆殼、綠船身奶油色船艙的渡輪
   - 台北：101
   - 藍山：三姊妹岩、高空纜車
   - 邦迪：冰山泳池、救生員紅黃旗
   - 黃金海岸：高樓天際線（最高那棟有尖塔）
   - 布里斯本：故事橋懸臂桁架、CityCat 雙體船
2. **季節要合理**：旅程是 6 月，也就是南半球冬天。可以有賞鯨（座頭鯨 6–11 月北遷），**不要**畫藍花楹，也不要畫人在戶外泳池游泳。
3. **天空不留白**：上半部要有雲、海鷗、飛機、氣球、太陽或月亮、星星。
4. **白天也熱鬧**：要有在地人物、動物、交通工具。
   - 動物：無尾熊、袋鼠、彩虹吸蜜鸚鵡、葵花鳳頭鸚鵡、白䴉、鵜鶘、海豚
   - 交通工具：渡輪、CityCat、火車、鴨子水陸車
5. **一家三口每張都出現**：兩個大人加一個戴帽子的六歲小孩，用 `family(x, 腳底y, 縮放)`。
6. **人群要高矮不一、衣服鮮豔**：用 `crowd(x, y, [身高…])`，衣服輪流用 G/C/W/Y。
7. **移動物朝向行進方向**：
   - 飛機、船、車頭朝前。回程飛機整組水平翻轉，動畫 class 要放在翻轉的 `<g>` **裡面**，飄動才會跟著反向。
   - 會左右來回的 `a-drift` 只能給雲用，船和車不要用，否則會倒退走。
8. **由遠到近分層**：天空 → 遠景天際線 → 中景地標 → 水或地面 → 人物動物交通工具 → 前景。
9. **整張同一種畫法**：人物也用同樣的粗線平塗，不要混搭。
10. **畫面裡不放文字**：不放標題或編號（護照章是另外疊上去的，不算）。
11. **全部自己畫**：不臨摹品牌、遊戲或卡通角色。電影世界只畫場記板、膠捲、聚光燈。

## 二、技術規則（本站專屬，跟原 skill 不同）

- **尺寸**：日插圖 `viewBox="0 0 240 160"`，首頁 `0 0 360 250`。一律用 `svg(vb, inner, label)` 包裝。
- **顏色**：只能用 P／I／C／Y／W／G 變數，**不要寫死色碼**，否則護照（pattern）、蠟筆、像素風會壞。唯一例外是 aussie 限定的 `lifeguard()`。
- **不用濾鏡**：不用 feTurbulence、模糊、mix-blend-mode。動畫只用既有的 a-* class，只動 transform 和 opacity。
- **動畫數量**：每張會動的元素控制在 7 個以內。海報和蠟筆會把圖印兩層，動畫數會加倍。
- **半透明光束**：加 `class="glow"` 包起來。海報風的深藍印版會自動隱藏它，不會變成深色塊。
- **左上角留給護照章**：大約佔左上 31% 寬，那裡只放天空。
- **線寬**：小人物、小動物用 `stroke-width` 1.6–2，否則像素風縮小到 1/3 後會糊成一團。
- **共用零件**（都在 `illustrations.js` 的 `build()` 裡）：`person`、`family`、`crowd`、`birds`、`sydFerry`、`sailboat`、`palm`、`gum`（尤加利）、`moon`、`spark`、`lorikeet`、`ibis`、`skyline`、`bridgeArch`、`cloud`、`sun`、`sea`、`plane`、`wheel`、`reel`、`star`。
- **新增一張圖**：
  1. 在 `ILLOS` 加 key。
  2. 在 `data.js` 的 `TRIP_DAYS[n].illo` 指過去。
  3. 重跑 Cubic 11 子集（見 travel-style 的 `styles/pixel.md`）。

## 三、配樂規則（`music.js`）

- 用 Web Audio 即時合成，不用音檔、不連網。設定面板的「背景配樂」開關預設關閉，切到別的分頁會暫停。
- **分軌與音量**：音樂軌主音量 0.64，後面接壓縮器（threshold −16、ratio 3）。
- **和聲規則**（最重要）：
  - 先決定調性與和弦進行。
  - 拍點（每小節第 0/2/4/6 格）上的旋律音一定是當下和弦的組成音。
  - 經過音只放在反拍，而且只有一格。
  - 鐘琴只用整數泛音（1、2、3 倍）。
  - 低音走根音。
  - 檢查沒有小二度、大七度撞在一起。
- 改曲子時，把每小節的「和弦 → 拍點旋律音」列在註解裡逐小節核對（範例見 `music.js` 的 SCORE 註解）。
- 不合成人聲，也不做喇叭、汽笛聲。

## 四、驗證（推之前全部要過）

```bash
python3 -m http.server 8765 &
NODE_PATH=$(npm root -g) node .claude/skills/travel-style/scripts/check_themes.js http://localhost:8765/ book,aussie,passport,crayon,pixel ./shots
NODE_PATH=$(npm root -g) node .claude/skills/travel-style/scripts/audit_layout.js http://localhost:8765/ 390,375,360,320 book,aussie,passport,crayon,pixel
```

- check_themes 要沒有錯誤、`overflowX` 全是 0；audit_layout 要 `TOTAL 0`。
- 14 天 × 5 風格都要截圖逐張看：
  - 像素風的 `#day-panel` 裡要是 `img.px-img`，不能殘留 `svg.px-src`
  - 海報風和紙色的形狀（雲、帆殼）不能消失
  - 護照章要能讀
  - 蠟筆風的線要看得到
- 回報時說清楚 iPhone 實機 Safari 未驗證（腳本只跑 Chromium）。
