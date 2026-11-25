# S4 Build Log — 2026-11-25（用 svg-scene-maker 的畫面規則重畫插圖＋背景配樂）

## 本次需求
用 https://svg-scene-atlas.pages.dev/ 的 skill 重新製作網站 SVG 插圖並更新網站；做完後把規則寫成專案 skill，之後說「網頁svg設計」就能用。

## 讀取的外部資料（2026-11-25）
- 首頁、`skill/svg-scene-maker/SKILL.md`、`skill/svg-scene-maker.zip`（SKILL.md、README、references/styles・show-and-motion・sound・checklist、templates/scene-skeleton.html、tools/scene-bgm.js・showstop.js）。MIT 授權。
- 只採用跟畫 SVG 場景與配樂有關的規則；網站上的其他內容（留言、下載影片等）與本專案無關，未採用。

## 取捨（使用者選「只用畫面規則重畫＋配樂」）
| 原 skill | 本站做法 | 理由 |
|---|---|---|
| 1600×600 單一 HTML 互動場景 | 維持 240×160 日插圖、360×250 首頁 | 版面與五種風格都依這個尺寸 |
| 日夜循環、天氣、點擊互動、表演秀 | 不採用 | 行程卡不是互動作品；iPhone 省電 |
| feTurbulence 等濾鏡 | 不採用 | travel-style 的 iPhone 效能規則禁止濾鏡 |
| 畫面規則（地標好認、天空不空、白天熱鬧、在地人物動物、朝向、人群高矮、季節合理） | **全部採用** | 和架構不衝突 |
| 配樂（Web Audio、0.64、和聲規則） | **採用**，做成設定裡的開關、預設關閉 | 使用者要求 |

## 調整
- `illustrations.js`：17 張全部依新規則重畫。
  - 新增共用零件：person／family／crowd／sydFerry／sailboat／palm／gum／moon／spark／lorikeet／ibis／skyline／bridgeArch。
  - 每張都有一家三口（兩個大人、戴帽子的六歲小孩）。
- 新增 2 張插圖，`data.js` 改用新 key：
  - `bondi`（Day 6）：冰山泳池、救生員紅黃旗、衝浪的人、往北飛的飛機
  - `train`（Day 12）：火車到布里斯本、南岸人工沙灘、摩天輪、拉行李的一家人。交通以火車為主，所以不再用汽車圖；`car` 保留但沒有使用。
- 各天的在地元素：

  | 天 | 地點 | 畫了什麼 |
  |---|---|---|
  | Day 1 | 台北 | 101、塔台、夜間起飛 |
  | Day 2 | 雪梨港 | 港灣大橋（攀橋的人、拱頂兩面旗）、綠色渡輪 |
  | Day 3 | 歌劇院、植物園 | 歌劇院、無花果樹、白䴉 |
  | Day 4 | Taronga | 長頸鹿背後的港灣與市區 |
  | Day 5 | 藍山 | 三姊妹岩、纜車、葵花鳳頭鸚鵡 |
  | Day 7 | 樂園 | 自由落體塔、旋轉木馬、氣球、排隊人群 |
  | Day 8 | Currumbin | 無尾熊、彩虹吸蜜鸚鵡停在餵食盤、袋鼠 |
  | Day 9 | Sea World | 海豚、看台上的觀眾、訓練員 |
  | Day 10 | 黃金海岸 | 乘客從窗戶揮手、有尖塔的高樓天際線、座頭鯨噴水（6 月賞鯨季）、鵜鶘 |
  | Day 11 | 電影世界 | 聚光燈、爆米花（不畫任何卡通角色） |
  | Day 13 | 布里斯本 | 故事橋懸臂桁架、CityCat、吹泡泡 |
  | Day 14 | 布里斯本 | 夜景、往左（回台灣）飛的飛機 |

- 季節：6 月是冬天，不畫藍花楹，也不畫人在泳池游泳。回程飛機把 a-float 放進翻轉群組，飄動方向才正確。
- `style.css`：`.illo-aussie .plate .glow { display:none }`。電影世界的半透明光束才不會被海報印版印成深色塊。
- 配樂：
  - 新增 `music.js`。播放引擎改寫自原 skill 的 scene-bgm.js，保留 MIT 聲明。
  - 曲子是原創的〈海邊的小探險家〉，C–G–Am–F–C–G–F–G，96 BPM：烏克麗麗刷和弦＋長笛／鐘琴旋律＋海浪聲。逐小節核對拍點音都是和弦音，核對表寫在檔案註解。
  - `index.html` 設定面板加「背景配樂」開關（role=switch，預設關）。
- Cubic 11 子集重做（從 npm `@fontpkg/cubic-11` 1.100 取 TTF），加入 music.js 的文字。
- 規則寫成專案 skill `.claude/skills/web-svg-design/SKILL.md`，並新增 `CLAUDE.md` 註明說「網頁svg設計」時使用它。travel-style 的 SKILL.md 與 architecture.md 加上交叉連結。`docs/skills/` 重新打包 travel-style.skill，新增 web-svg-design.skill。

## 驗證（Chromium／Playwright）
- check_themes：5 風格無錯誤，overflowX 全為 0，字型正確載入。
- audit_layout：5 風格 × 390／375／360／320，TOTAL 0。
- 14 天 × 5 風格逐張截圖檢查：
  - 像素風每天都是 img.px-img、沒有殘留 svg.px-src
  - 海報風的雲和帆殼（和紙色）仍看得到
  - 護照章可讀
  - 蠟筆線正常
- 配樂開關按下後 aria-checked=true、播放中；再按停止。console 無錯誤。
- **未驗證**：iPhone／Android 實機 Safari／Chrome 的插圖外觀、動畫順暢度與配樂實際音色、音量。另外，iOS 靜音開關打開時 Web Audio 可能不出聲，未實測。
