/* 行程資料：修改這個檔案即可更新網站內容。 */
window.TRIP_DAYS = [
 {
  "n": 1,
  "md": "6/16",
  "wd": "三",
  "area": "台北",
  "place": "移動日",
  "pace": "移動・保留體力",
  "color": "water",
  "illo": "plane",
  "title": "台北出發，今晚睡飛機",
  "lead": "今天只處理出發。把孩子會用到的物品放隨身包，第一天不要塞景點。",
  "stay": "機上",
  "mission": "今天只要吃飽、休息、順利移動，就是完成任務。",
  "stops": [
   {
    "time": "出門前",
    "title": "桃園機場",
    "desc": "搭乘華航 CI51，表定 23:30 從桃園機場第二航廈起飛；依航班通知確認報到時間，預留交通、托運與安檢緩衝，實際起飛時刻以訂票結果為準。",
    "tags": [
     {
      "m": "rail",
      "t": "機場捷運"
     },
     {
      "m": "ride",
      "t": "叫車／開車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Taiwan%20Taoyuan%20International%20Airport%20Terminal%202",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "通關後",
    "title": "登機前放電",
    "desc": "先上廁所、補水，再到登機門附近活動；登機前換好舒適衣物。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Taiwan%20Taoyuan%20International%20Airport",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "機上",
    "title": "吃飯後進入睡眠模式",
    "desc": "機上餐依航空公司供應，兒童餐需事先向華航確認。小毯、耳機、換洗衣與常用用品放座位下方。",
    "tags": [
     {
      "m": "flight",
      "t": "CI51"
     }
    ],
    "must": false,
    "links": []
   }
  ],
  "meals": [
   {
    "tag": "晚餐",
    "name": "桃園機場出境餐飲",
    "desc": "先吃一份孩子熟悉的飯或麵，機上餐當補充；店家依實際航廈選擇。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Taoyuan%20International%20Airport%20Terminal%202%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "去程為華航 CI51（TPE → SYD），表定 23:30 起飛、隔日（6/17）約 10:45 抵達雪梨，飛行時間約 9 小時 15 分；起降時間取自第三方航班追蹤網站，非官方訂位確認，實際以訂票結果為準。",
  "planb": "若班機時間調整，Day 2 抵達日只保留入住與休息。",
  "reads": [
   {
    "date": "2025-01-14",
    "type": "家庭遊記・英文",
    "title": "Mix & Match Mama｜一家人的雪梨與邦迪旅行",
    "note": "可看家庭在雪梨、港灣與邦迪的旅行照片；旅遊季節不同，六月以短散步與保暖為主。",
    "url": "https://mixandmatchmama.com/2025/01/australia-part-1-arrival-sydney-bondi/"
   }
  ],
  "official": [
   {
    "u": "https://www.china-airlines.com/tw/zh",
    "l": "華航班機與訂位"
   }
  ]
 },
 {
  "n": 2,
  "md": "6/17",
  "wd": "四",
  "area": "雪梨",
  "place": "雪梨",
  "pace": "輕鬆・步行為主",
  "color": "coral",
  "illo": "bridge",
  "title": "抵達雪梨，達令港慢慢醒來",
  "lead": "下飛機這天的任務是吃飽、補眠、走一小段。晚上若還有精神，再看第一晚 Vivid。",
  "stay": "雪梨・第 1 晚",
  "mission": "在遊樂場選一件最想玩的遊具，再找一處可以休息的草地。",
  "stops": [
   {
    "time": "抵達後",
    "title": "雪梨機場 → 飯店寄放行李",
    "desc": "通關後前往達令港周邊住宿。若房間還沒好，先寄行李；需要一到就睡，可事先詢問提早入住。",
    "tags": [
     {
      "m": "rail",
      "t": "Airport Link"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Sydney%20Airport%20International%20Terminal",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "Sydney Airport International Terminal T1",
      "to": "@syd",
      "mode": "transit",
      "label": "機場 → 飯店"
     },
     {
      "from": "Sydney Airport International Terminal T1",
      "to": "@syd",
      "mode": "driving",
      "label": "機場 → 飯店（叫車）"
     }
    ]
   },
   {
    "time": "午後",
    "title": "Darling Quarter 遊樂場",
    "desc": "安排 45–60 分鐘玩遊具，再回飯店午睡；不要同時塞水族館。若遇雨，直接把下午留給休息。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Darling%20Quarter%20Playground%20Sydney",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Darling Quarter Playground, Sydney",
      "mode": "transit",
      "label": "飯店 → Darling Quarter 遊樂場"
     }
    ]
   },
   {
    "time": "17:00",
    "title": "提早吃晚餐",
    "desc": "就在住宿或遊樂場附近吃，減少賞燈前移動。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Darling%20Quarter%20Sydney%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "18:00 起",
    "title": "Vivid 第 1 晚：達令港短線",
    "desc": "暫抓 45–60 分鐘，只選 2027 官方地圖上的一小區。抵達日累了就取消；不預先保證某場投影或雷射秀。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Darling%20Harbour%20Sydney",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Darling Harbour, Sydney",
      "mode": "transit",
      "label": "飯店 → 達令港"
     }
    ]
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Darling Quarter 餐飲區",
    "desc": "選飯、麵或三明治，先解決孩子的胃；以現場有座位、候餐短的店為優先。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Darling%20Quarter%20Sydney%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "Darling Quarter 餐飲區",
    "desc": "抵達日不跨區找餐廳；先吃孩子熟悉的飯麵。Harbourside 商場不列入購物或用餐安排。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Darling%20Quarter%20Sydney%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "機場到飯店接駁選擇：① Airport Link 火車到 Town Hall／Central 再轉步行或輕軌，含推車與行李較費力；② Uber／DiDi／13cabs 叫車，約 25–35 分鐘視路況，車資抓 A$35–55；③ 事先預約的飯店或包車接送，行李多、小孩累時最省力。雪梨市區不建議自駕：停車昂貴、Vivid 期間道路常封閉，租車留到 Day 5 藍山或 Day 6 以後的黃金海岸再評估。Vivid 期間晚間以步行與大眾運輸為主。Harbourside 重建尚未能確認 2027/6 全面開放，活動集中在 Darling Quarter／Tumbalong Park，依當日施工告示走。",
  "planb": "取消夜間活動，飯店午睡＋附近外帶晚餐。下午若下雨又還有精神，達令港的 SEA LIFE 雪梨水族館是室內備案（門票另查，看 30–60 分鐘就好）。",
  "reads": [
   {
    "date": "2026-07-23",
    "type": "官方攻略・非遊記",
    "title": "Darling Harbour｜親子活動指南",
    "note": "參考遊樂場與戶外活動位置，不把尚在重建的 Harbourside 當成可逛商場；動線另看工程公告。",
    "url": "https://www.darlingharbour.com/editorials/the-best-activities-with-kids-in-darling-harbour"
   },
   {
    "date": "2025-01-14",
    "type": "家庭遊記・英文",
    "title": "Mix & Match Mama｜一家人的雪梨與邦迪旅行",
    "note": "可看家庭在雪梨、港灣與邦迪的旅行照片；旅遊季節不同，六月以短散步與保暖為主。",
    "url": "https://mixandmatchmama.com/2025/01/australia-part-1-arrival-sydney-bondi/"
   }
  ],
  "official": [
   {
    "u": "https://www.vividsydney.com/info/contact-us/frequently-asked-questions",
    "l": "Vivid 官方日期與交通"
   }
  ]
 },
 {
  "n": 3,
  "md": "6/18",
  "wd": "五",
  "area": "雪梨",
  "place": "雪梨",
  "pace": "中等・可縮短步行",
  "color": "coral",
  "illo": "opera",
  "title": "歌劇院、植物園，傍晚看港灣亮起",
  "lead": "沿著港灣走，不追求走完全部植物園。午餐坐下來慢慢吃，下午留一段回飯店的空白。",
  "stay": "雪梨・第 2 晚",
  "mission": "找出歌劇院像帆船的地方，拍一張自己當小小建築師的照片。",
  "stops": [
   {
    "time": "09:30",
    "title": "環形碼頭 → 歌劇院外觀",
    "desc": "先拍外觀與港灣景色，約 60–90 分鐘。若要內部導覽，事先查語言、時長與兒童規定，當天不再加其他導覽。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Sydney%20Opera%20House",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Circular Quay, Sydney",
      "mode": "transit",
      "label": "飯店 → 環形碼頭"
     },
     {
      "from": "Circular Quay, Sydney",
      "to": "Sydney Opera House",
      "mode": "walking",
      "label": "環形碼頭 → 歌劇院"
     }
    ]
   },
   {
    "time": "11:00",
    "title": "皇家植物園短段散步",
    "desc": "從靠歌劇院的入口進去，找草地休息；Mrs Macquarie’s Chair 為體力足夠才延伸的選項，不必走到底。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Royal%20Botanic%20Garden%20Sydney",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "Sydney Opera House",
      "to": "Royal Botanic Garden Sydney",
      "mode": "walking",
      "label": "歌劇院 → 皇家植物園"
     }
    ]
   },
   {
    "time": "14:00・二選一",
    "title": "回飯店午休，或改去雪梨魯納樂園",
    "desc": "體力有限就直接午休 1.5–2 小時；孩子還有精力的話，也可以把這段空白換成 Luna Park Sydney——對岸 Milsons Point，搭渡輪或火車約 15–20 分鐘。六歲的身高多落在 106–132cm 的綠區，可自己玩旋轉木馬、Cloud Nine 等遊具，摩天輪、碰碰車仍需成人陪同；兩者擇一，不要跟午休疊加，出發前帶保暖外套，身高分區請現場或官網再確認。",
    "tags": [
     {
      "m": "ferry",
      "t": "渡輪"
     },
     {
      "m": "rail",
      "t": "火車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Luna%20Park%20Sydney",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "Royal Botanic Garden Sydney",
      "to": "@syd",
      "mode": "transit",
      "label": "植物園 → 飯店"
     },
     {
      "from": "Circular Quay Wharf, Sydney",
      "to": "Luna Park Sydney",
      "mode": "transit",
      "label": "環形碼頭 → 魯納樂園"
     }
    ]
   },
   {
    "time": "18:00 起",
    "title": "Vivid 第 2 晚：港灣周邊",
    "desc": "依官方 2027 路線選一區。今晚是週五，抓短線、避開散場時段；植物園不預設一定有燈光展區。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Circular%20Quay%20Sydney",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Circular Quay, Sydney",
      "mode": "transit",
      "label": "飯店 → 環形碼頭"
     },
     {
      "from": "Circular Quay, Sydney",
      "to": "@syd",
      "mode": "transit",
      "label": "環形碼頭 → 飯店"
     }
    ]
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Pancakes on the Rocks・The Rocks",
    "desc": "和港灣散步放同一天較順；鬆餅可共享，另選鹹食，菜單與過敏原先確認。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Pancakes%20On%20The%20Rocks%20The%20Rocks%20Sydney",
      "l": "開啟 Google Maps"
     },
     {
      "u": "https://pancakesontherocks.au/menu/",
      "l": "菜單／店家資訊"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "環形碼頭周邊餐廳",
    "desc": "約 17:00 吃晚餐；遇客滿直接改外帶，不為一間名店消耗賞燈前的體力。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Circular%20Quay%20Sydney%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "環形碼頭、歌劇院與植物園以步行串連。Google Maps 顯示的距離未含推車、拍照與休息時間。",
  "planb": "下雨時只看歌劇院外觀，植物園改飯店休息；已訂的導覽按取消規則處理。",
  "reads": [
   {
    "date": "2025-01-14",
    "type": "家庭遊記・英文",
    "title": "Mix & Match Mama｜一家人的雪梨與邦迪旅行",
    "note": "可看家庭在雪梨、港灣與邦迪的旅行照片；旅遊季節不同，六月以短散步與保暖為主。",
    "url": "https://mixandmatchmama.com/2025/01/australia-part-1-arrival-sydney-bondi/"
   }
  ],
  "official": [
   {
    "u": "https://www.sydneyoperahouse.com/",
    "l": "歌劇院導覽與活動"
   },
   {
    "u": "https://www.lunaparksydney.com/rides-games/family-rides",
    "l": "Luna Park 身高分區與開放時間"
   },
   {
    "u": "https://www.vividsydney.com/info/contact-us/frequently-asked-questions",
    "l": "Vivid 官方公告"
   }
  ]
 },
 {
  "n": 4,
  "md": "6/19",
  "wd": "六",
  "area": "雪梨",
  "place": "雪梨・Taronga 動物園",
  "pace": "動物日・搭渡輪去",
  "color": "coral",
  "illo": "giraffe",
  "title": "搭渡輪去 Taronga 動物園，長頸鹿配港灣",
  "lead": "從環形碼頭坐渡輪約 12 分鐘就到，長頸鹿背後就是港灣大橋和歌劇院。上午看動物，中午在園內吃，下午回飯店休息；晚上 Vivid 閉幕夜看體力決定。原本的恐龍博物館改成雨天備案。",
  "stay": "雪梨・第 3 晚",
  "mission": "找到長頸鹿，比比看牠的脖子有幾個你高；再找一種只有澳洲才有的動物。",
  "stops": [
   {
    "time": "09:00",
    "title": "環形碼頭搭 F2 渡輪",
    "desc": "F2 渡輪約 12 分鐘到 Taronga Zoo 碼頭，用兒童 Opal 卡與大人的感應信用卡付款；週六適用較低的 Opal 每日上限。也有「渡輪＋門票」套票（Sydney Tourism 2026/8 列大人 A$67 起、兒童 A$38 起），買前和分開買比價。",
    "tags": [
     {
      "m": "ferry",
      "t": "F2 渡輪"
     },
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Circular%20Quay%20Wharf%20Sydney",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Circular Quay Wharf, Sydney",
      "mode": "transit",
      "label": "飯店 → 環形碼頭"
     },
     {
      "from": "Circular Quay Wharf, Sydney",
      "to": "Taronga Zoo Wharf, Mosman",
      "mode": "transit",
      "label": "環形碼頭 → Taronga 碼頭（F2 渡輪）"
     }
    ]
   },
   {
    "time": "09:30 開園",
    "title": "從碼頭上到主入口",
    "desc": "Sky Safari 纜車 2023 年 1 月起停駛，園方預計 2027 年底才重新開放，所以 6 月很可能還不能搭。下船後搭公車上山到主入口（另外付費、用 Opal），再一路往下逛回碼頭，比從下方入口整天爬坡省力；公車路線與班次用 Transport for NSW 規劃器查。",
    "tags": [
     {
      "m": "bus",
      "t": "公車上山"
     },
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Taronga%20Zoo%20Sydney%20main%20entrance",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "Taronga Zoo Wharf, Mosman",
      "to": "Taronga Zoo Sydney",
      "mode": "transit",
      "label": "Taronga 碼頭 → 動物園主入口（公車）"
     }
    ]
   },
   {
    "time": "上午",
    "title": "長頸鹿、無尾熊與澳洲動物",
    "desc": "冬季（5–8 月）開放 9:30–16:30。門票依 2026 第三方整理約大人 A$51–55、4–15 歲 A$31–33、3 歲以下免費，線上通常比現場便宜；官網曾公告暫停線上購票，出發前確認購票方式與價格。先看長頸鹿（背景就是港灣），再到澳洲動物區找無尾熊和袋鼠；鳥類或海豹表演依當日時刻表挑一場。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Taronga%20Zoo%20Sydney",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "中午",
    "title": "園區內午餐",
    "desc": "在園內吃完，往碼頭方向邊走邊逛；孩子累了就直接搭渡輪回環形碼頭。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": []
   },
   {
    "time": "14:00",
    "title": "回飯店午休",
    "desc": "渡輪回環形碼頭，再叫車或搭輕軌回達令港，午休 1.5–2 小時；今天上午走了不少坡。",
    "tags": [
     {
      "m": "ferry",
      "t": "渡輪"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [],
    "routes": [
     {
      "from": "Taronga Zoo Wharf, Mosman",
      "to": "Circular Quay Wharf, Sydney",
      "mode": "transit",
      "label": "Taronga 碼頭 → 環形碼頭"
     },
     {
      "from": "Circular Quay, Sydney",
      "to": "@syd",
      "mode": "transit",
      "label": "環形碼頭 → 飯店"
     },
     {
      "from": "@syd",
      "to": "Australian Museum, Sydney",
      "mode": "transit",
      "label": "雨天備案：飯店 → 澳洲博物館"
     }
    ]
   },
   {
    "time": "18:00 起・選配",
    "title": "Vivid 最後一晚",
    "desc": "6/19 週六閉幕夜，依 2027 官方地圖選靠近住宿的一小區。道路管制或人潮多時就提早回飯店，不走施工圍籬旁的捷徑。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Darling%20Harbour%20Sydney",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Taronga 園區餐飲",
    "desc": "園內有多處餐點與咖啡，營業以當天為準；可以自備水與小點心。",
    "links": []
   },
   {
    "tag": "晚餐",
    "name": "環形碼頭或達令港餐廳",
    "desc": "看完 Vivid 就近吃，避開散場人潮。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Circular%20Quay%20restaurants%20Sydney",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "接駁選擇：① F2 渡輪（環形碼頭 ↔ Taronga Zoo 碼頭，約 12 分鐘，Opal／感應信用卡）＋公車上山到主入口，最推薦；② 渡輪＋門票套票，是否含上山交通依套票說明；③ 叫車直接到主入口，約 20–30 分鐘。雪梨市區仍不建議自駕，園區停車也要收費。",
  "planb": "下雨就把主線換成 Australian Museum 恐龍常設展（William Street，室內，依目前官網常設展免費），動物園改到晴天；想看真的船艦，達令港的海事博物館也可以當雨天備案。博物館與動物園擇一，不要同一天排兩個。",
  "reads": [
   {
    "date": "2026-08",
    "type": "旅遊指南・非實訪遊記",
    "title": "Sydney Tourism｜Taronga 動物園完整指南",
    "note": "整理門票、開放時間與渡輪套票，最後查核 2026/8/16；價格可能與官網不同。",
    "url": "https://www.sydneytourism.org/taronga-zoo-sydney-complete-guide/"
   },
   {
    "date": "2026-06",
    "type": "旅客短評・非完整遊記",
    "title": "Tripadvisor｜Australian Museum 近期旅客短評",
    "note": "本次找到 2026 年 6 月旅客對恐龍展的短評；頁面會混有其他年份，請看留言日期。常設展與適齡資訊以館方為準。",
    "url": "https://www.tripadvisor.com.au/Attraction_Review-g255060-d256713-Reviews-Australian_Museum-Sydney_New_South_Wales.html"
   }
  ],
  "official": [
   {
    "u": "https://www.taronga.org.au/sydney-zoo/plan",
    "l": "Taronga 參觀資訊與門票"
   },
   {
    "u": "https://www.taronga.org.au/about/building-a-zoo-for-the-future/sky-safari/upgrade",
    "l": "Sky Safari 纜車停駛與重建"
   },
   {
    "u": "https://transportnsw.info/trip",
    "l": "Transport for NSW 路線規劃"
   },
   {
    "u": "https://australian.museum/visit/",
    "l": "Australian Museum 參觀資訊"
   },
   {
    "u": "https://www.sea.museum/en/visit",
    "l": "海事博物館：船艦開放與施工公告"
   }
  ]
 },
 {
  "n": 5,
  "md": "6/20",
  "wd": "日",
  "area": "藍山",
  "place": "藍山・雪梨往返",
  "pace": "長途移動・保暖",
  "color": "green",
  "illo": "mountain",
  "title": "藍山一日遊，纜車與三姊妹岩",
  "lead": "今天是早出門的一天。主線只排 Scenic World 與三姊妹岩，不再把野生動物園硬塞進回程。",
  "stay": "雪梨・第 4 晚",
  "mission": "從纜車上找三種不同的綠色，回來畫出三姊妹岩。",
  "stops": [
   {
    "time": "07:30–08:00",
    "title": "雪梨出發",
    "desc": "參加有接送的一日團，或預約包車。這是建議出發區間，集合時間依供應商通知；山區天候與路況可能延長車程。",
    "tags": [
     {
      "m": "bus",
      "t": "一日團"
     },
     {
      "m": "car",
      "t": "自駕"
     },
     {
      "m": "rail",
      "t": "藍山線火車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Katoomba%20NSW",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Central Station, Sydney",
      "mode": "transit",
      "label": "飯店 → 中央車站"
     },
     {
      "from": "Central Station, Sydney",
      "to": "Katoomba Station, NSW",
      "mode": "transit",
      "label": "中央車站 → Katoomba 站（藍山線火車）"
     }
    ]
   },
   {
    "time": "上午",
    "title": "Scenic World",
    "desc": "安排約 2–3 小時，搭景觀纜車、天空纜車或景觀鐵路，依當日開放及孩子意願選擇；步道只走短段。",
    "tags": [
     {
      "m": "cable",
      "t": "纜車"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Scenic%20World%20Katoomba",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "Katoomba Station, NSW",
      "to": "Scenic World, Katoomba",
      "mode": "transit",
      "label": "Katoomba 站 → Scenic World（686 公車）"
     }
    ]
   },
   {
    "time": "午後",
    "title": "Echo Point 三姊妹岩",
    "desc": "停留約 30–45 分鐘看景、拍照；遇濃霧不等待放晴，改到 Leura 休息。",
    "tags": [
     {
      "m": "bus",
      "t": "686 公車"
     },
     {
      "m": "car",
      "t": "自駕"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Echo%20Point%20Lookout%20Katoomba",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "Scenic World, Katoomba",
      "to": "Echo Point Lookout, Katoomba",
      "mode": "transit",
      "label": "Scenic World → Echo Point"
     }
    ]
   },
   {
    "time": "下午",
    "title": "Leura 小鎮 → 回雪梨",
    "desc": "咖啡、熱飲與短逛後回市區。Leura Mall 主街有老糖果店與玩具店，讓孩子挑一樣小東西；回程不排額外門票景點，晚餐後早睡。",
    "tags": [
     {
      "m": "bus",
      "t": "一日團"
     },
     {
      "m": "car",
      "t": "自駕"
     },
     {
      "m": "rail",
      "t": "火車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Leura%20Mall%20NSW",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "Echo Point Lookout, Katoomba",
      "to": "Leura Mall, Leura NSW",
      "mode": "transit",
      "label": "Echo Point → Leura 主街"
     },
     {
      "from": "Leura Station, NSW",
      "to": "Central Station, Sydney",
      "mode": "transit",
      "label": "Leura 站 → 中央車站"
     },
     {
      "from": "Central Station, Sydney",
      "to": "@syd",
      "mode": "transit",
      "label": "中央車站 → 飯店"
     }
    ]
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Scenic World 園區餐飲",
    "desc": "優點是少一次移動，先在園區吃熱食；若團費含餐，直接依團體安排。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Scenic%20World%20Restaurant%20Katoomba",
      "l": "開啟 Google Maps"
     },
     {
      "u": "https://www.scenicworld.com.au/food",
      "l": "菜單／店家資訊"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "雪梨住宿附近",
    "desc": "回程可能塞車，選可外帶的簡單晚餐，不訂需要準點抵達的餐廳。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Darling%20Harbour%20Sydney%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "三種接駁選擇：① 一日遊旅行團，含門票與接送最省心，選團時確認是否包含門票、接送地點與兒童座椅安排；② 自駕租車，走 M4／Great Western Highway 約 1.5–2 小時，Scenic World 與 Echo Point 都有停車場，行程最彈性，但要先備妥國際駕照、澳規兒童安全座椅，並記得靠左行駛（見文首「考慮自駕」說明）；③ 雪梨市郊火車藍山線到 Katoomba 約 2 小時（今天週日，Opal 週末每日上限大人 A$9.65、兒童 A$4.80），再轉當地巴士 686 到 Scenic World，最省錢但單程較久，六歲長程坐車要留意。不把每個停留點的車程當成固定值。",
  "planb": "若山區天候差，今天改去 Australian Museum 恐龍常設展（室內），藍山改到 Day 4、動物園看哪天放晴再排；出發前看旅行團取消規則。想在藍山過夜的話，國內線要改訂 6/21 下午，隔天從 Leura 開車約 2 小時直接去機場。",
  "reads": [
   {
    "date": "2025-08-19",
    "type": "親子實訪・英文",
    "title": "Mamamia｜帶五歲與三歲孩子玩藍山",
    "note": "作者記錄帶幼兒到藍山的家庭旅行，可參考 Scenic World 與放慢步調的安排；活動與優惠須重查。",
    "url": "https://www.mamamia.com.au/blue-mountains-family-trip/"
   }
  ],
  "official": [
   {
    "u": "https://www.scenicworld.com.au/tickets",
    "l": "Scenic World 門票"
   },
   {
    "u": "https://www.scenicworld.com.au/food",
    "l": "園區餐飲"
   }
  ]
 },
 {
  "n": 6,
  "md": "6/21",
  "wd": "一",
  "area": "雪梨→黃金海岸",
  "place": "雪梨 → 黃金海岸",
  "pace": "移動・不排長步道",
  "color": "water",
  "illo": "plane",
  "title": "邦迪短停留，再飛黃金海岸",
  "lead": "班機優先，海灘是選配。先確認國內線時間，才決定早上能不能去邦迪。",
  "stay": "黃金海岸・第 1 晚",
  "mission": "今天只要吃飽、休息、順利移動，就是完成任務。",
  "stops": [
   {
    "time": "早餐後・選配",
    "title": "Bondi Beach 短散步",
    "desc": "僅在班機較晚、行李已安排妥當時前往，停留 45–60 分鐘。不要排 Bondi–Coogee 長步道；時間緊直接略過。",
    "tags": [
     {
      "m": "bus",
      "t": "公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Bondi%20Beach%20Sydney",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Bondi Beach, Sydney",
      "mode": "transit",
      "label": "飯店 → 邦迪海灘"
     }
    ]
   },
   {
    "time": "依航班倒推",
    "title": "飯店取行李 → 雪梨機場",
    "desc": "先確認國內線航廈、托運與報到截止時間，再倒推離開飯店時間，另加交通緩衝。",
    "tags": [
     {
      "m": "rail",
      "t": "Airport Link"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Sydney%20Airport%20Domestic%20Terminal",
      "l": "開啟 Google Maps"
     }
    ],
    "routes": [
     {
      "from": "@syd",
      "to": "Sydney Airport Domestic Terminal 2",
      "mode": "transit",
      "label": "飯店 → 國內線 T2（Jetstar／Virgin）"
     },
     {
      "from": "@syd",
      "to": "Sydney Airport Domestic Terminal 3",
      "mode": "transit",
      "label": "飯店 → 國內線 T3（Qantas）"
     }
    ]
   },
   {
    "time": "下午・暫定",
    "title": "SYD → OOL 國內線",
    "desc": "日期訂為 6/21，三家都有直飛、飛行時間約 1 小時 20–30 分：Virgin Australia班次最多；Jetstar票價通常最便宜，但托運行李另計費；Qantas班次較少、價位較高但含較多托運額度。比價時一起看托運、手提行李與選位，時間尚未確認。",
    "tags": [
     {
      "m": "flight",
      "t": "國內線"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Gold%20Coast%20Airport",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "抵達後",
    "title": "入住 → Broadbeach 海邊短散步",
    "desc": "從 OOL 機場搭 777 公車直達 Broadbeach South 站（約每 15 分一班，50 分錢），再走路或搭一站 G:link 到住宿；行李多或孩子睡著就叫車。先入住再吃飯，精神好才去 Kurrawa 海灘走 20–30 分鐘；今晚不安排門票景點。",
    "tags": [
     {
      "m": "bus",
      "t": "777 公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Broadbeach%20South%20light%20rail%20station",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "雪梨機場國內線餐飲",
    "desc": "移動日以航廈餐飲或簡單外帶為主，先吃完再登機。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Sydney%20Airport%20Domestic%20Terminal%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "Hurricane’s Grill・Surfers Paradise",
    "desc": "想吃排餐可選，先查菜單與訂位；若班機晚抵達，改住宿附近外帶。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Hurricanes%20Grill%20Surfers%20Paradise%20QLD",
      "l": "開啟 Google Maps"
     },
     {
      "u": "https://www.hurricanesgrill.com.au/",
      "l": "菜單／店家資訊"
     }
    ]
   }
  ],
  "move": "Gold Coast Airport（OOL）抵達後前往 Broadbeach 住宿：① 777 公車（機場 → Broadbeach South 站，限停靠快線，約每 15 分一班、50 分錢，第三方估約 30–40 分鐘），最省；② Con-X-ion 共乘接駁，第三方資料單程每人約 A$15–22，門對門少搬行李；③ 計程車／Uber，計程車第三方估約 A$75–90。若決定自駕，機場航廈有租車櫃檯，6/27 在布里斯本還車（比較見「交通與票價」的大眾運輸 vs 自駕）。不要誤訂到回程機場 BNE。",
  "planb": "直接刪掉邦迪，早餐後慢慢退房去機場；抵達晚就取消沙灘散步。",
  "reads": [
   {
    "date": "2025-01-14",
    "type": "家庭遊記・英文",
    "title": "Mix & Match Mama｜一家人的雪梨與邦迪旅行",
    "note": "可看家庭在雪梨、港灣與邦迪的旅行照片；旅遊季節不同，六月以短散步與保暖為主。",
    "url": "https://mixandmatchmama.com/2025/01/australia-part-1-arrival-sydney-bondi/"
   }
  ],
  "official": [
   {
    "u": "https://www.sydneyairport.com.au/",
    "l": "雪梨機場"
   },
   {
    "u": "https://www.goldcoastairport.com.au/",
    "l": "黃金海岸機場"
   },
   {
    "u": "https://www.jetstar.com/au/en/home",
    "l": "Jetstar 訂票"
   },
   {
    "u": "https://www.virginaustralia.com/au/en/",
    "l": "Virgin Australia 訂票"
   },
   {
    "u": "https://www.qantas.com/au/en.html",
    "l": "Qantas 訂票"
   },
   {
    "u": "https://www.goldcoastairport.com.au/transport/transport-overview/transport-options",
    "l": "OOL 機場租車與接駁"
   }
  ]
 },
 {
  "n": 7,
  "md": "6/22",
  "wd": "二",
  "area": "黃金海岸",
  "place": "黃金海岸",
  "pace": "樂園日・多休息",
  "color": "yellow",
  "illo": "park",
  "title": "夢幻世界，讓孩子挑三個最想玩的",
  "lead": "保留一整天給 Dreamworld，但不追求玩遍。優先兒童區，午餐後安排坐下休息。",
  "stay": "黃金海岸・第 2 晚",
  "mission": "自己挑三個最想玩的設施，學著看身高標示與排隊規則。",
  "stops": [
   {
    "time": "開園前",
    "title": "前往 Dreamworld",
    "desc": "依 2027 當日開園時間倒推出門。入園前先量孩子身高，下載或查看最新園區圖。",
    "tags": [
     {
      "m": "bus",
      "t": "TX2 樂園巴士"
     },
     {
      "m": "rail",
      "t": "G:link＋火車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Dreamworld%20Coomera%20QLD",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "上午",
    "title": "Kenny & Belinda’s Dreamland",
    "desc": "挑 2–3 個適合身高與接受度的設施，六歲也要依各項身高與陪同規定判斷。先玩孩子最想玩的，再決定是否排隊第二輪。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Kenny%20and%20Belindas%20Dreamland%20Dreamworld",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "午餐後",
    "title": "休息，再選 Rivertown 親子設施",
    "desc": "先坐下休息，再選一區設施。依身高、陪同規則與孩子接受度安排，六歲不是所有設施都能搭。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Dreamworld%20Coomera%20QLD",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "15:30 起",
    "title": "有餘力再玩，累了提早離園",
    "desc": "不為了待到閉園硬撐。晚餐回飯店附近吃，今晚不加夜市或觀景台。",
    "tags": [
     {
      "m": "bus",
      "t": "TX2 樂園巴士"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": []
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Jane’s Rivertown Restaurant",
    "desc": "園內吃午餐可少走回頭路，實際餐點、座位與營業時間依現場為準。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Janes%20Rivertown%20Restaurant%20Dreamworld",
      "l": "開啟 Google Maps"
     },
     {
      "u": "https://www.dreamworld.com.au/blog/the-best-family-3-day-gold-coast-itinerary/",
      "l": "菜單／店家資訊"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "飯店附近簡單用餐",
    "desc": "飯、麵或外帶披薩都可，原則是吃完就能回房間。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Surfers%20Paradise%20QLD%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "園區在北邊的 Coomera，從 Broadbeach 出發：① Broadbeach South 站搭 TX2 主題樂園路線公車到 Dreamworld（第三方資料，出發前用 TransLink 規劃器確認仍營運），50 分錢；② G:link 到 Helensvale 轉火車到 Coomera 站再轉公車，約 1 小時 20 分；③ 回程孩子累了叫車，約 30–35 分鐘（車資粗估 A$50–70）。自駕的話約 30 分鐘，停車費第三方 2026 資料說免費、以官網為準。",
  "planb": "遇設施停駛、排隊太久或孩子害怕，改看官方當日家庭節目、休息或提早離園；不要改成另一整套動物園行程。",
  "reads": [
   {
    "date": "2026-03-19",
    "type": "親子實訪・英文",
    "title": "Mamamia｜Dreamworld 家庭實訪",
    "note": "參考一家人實際玩樂園的體驗；先選適合孩子的設施，保留休息，不照成人刺激程度排滿。",
    "url": "https://www.mamamia.com.au/dreamworld-gold-coast-review/"
   }
  ],
  "official": [
   {
    "u": "https://www.dreamworld.com.au/",
    "l": "設施與身高限制"
   }
  ]
 },
 {
  "n": 8,
  "md": "6/23",
  "wd": "三",
  "area": "黃金海岸",
  "place": "黃金海岸・Currumbin",
  "pace": "動物日・步行中等",
  "color": "yellow",
  "illo": "koala",
  "title": "抱抱無尾熊，餵彩虹吸蜜鸚鵡",
  "lead": "黃金海岸的動物日：無尾熊、袋鼠和彩虹吸蜜鸚鵡都在同一個保護區。上午看動物，下午順路到 Burleigh Heads 海邊放空；昨天樂園走很多，今天步調放慢。",
  "stay": "黃金海岸・第 3 晚",
  "mission": "數一數今天看到幾種澳洲動物，選一隻當這趟旅行的吉祥物。",
  "stops": [
   {
    "time": "09:00 開園",
    "title": "前往 Currumbin Wildlife Sanctuary",
    "desc": "開放 9:00–16:00（15:30 最後入園）。官網門票大人 A$70、3–17 歲 A$50（2026 查核，線上購票可能有優惠）。從 Broadbeach 搭 TransLink 700 路公車往南，約 25–35 分鐘、每段 50 分錢，班次用 TransLink 規劃器查；自駕約 20–25 分鐘。",
    "tags": [
     {
      "m": "bus",
      "t": "700 路公車"
     },
     {
      "m": "car",
      "t": "自駕"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Currumbin%20Wildlife%20Sanctuary",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "上午",
    "title": "彩虹吸蜜鸚鵡、袋鼠與無尾熊",
    "desc": "園區每天有鸚鵡餵食與動物講解，時刻依當日園區表；和無尾熊合照是加購項目，看現場價格與排隊再決定。袋鼠區依園方規則近距離觀察。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Currumbin%20Wildlife%20Sanctuary",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "中午",
    "title": "園區內吃午餐",
    "desc": "在園內吃完再走，少一次移動；餐點與營業以當日為準。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": []
   },
   {
    "time": "14:00・選配",
    "title": "Burleigh Heads 海灘與公園",
    "desc": "回程順路停 Burleigh Heads，玩沙、在草地休息約 1 小時；六月水冷，以玩沙為主，累了就直接回飯店。",
    "tags": [
     {
      "m": "bus",
      "t": "700 路公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Burleigh%20Heads%20Beach%20QLD",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Currumbin 園區餐飲",
    "desc": "園內用餐最省事，營業與菜單以當日為準。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Currumbin%20Wildlife%20Sanctuary",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "Burleigh Heads 或住宿附近",
    "desc": "玩完海灘就近吃；Burleigh 一帶餐廳多，傍晚人多可先訂位。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Burleigh%20Heads%20QLD%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "接駁選擇：① TransLink 700 路公車沿黃金海岸公路往南，從 Broadbeach 約 25–35 分鐘，每段 50 分錢、可用感應信用卡；回程順路在 Burleigh Heads 下車；② 叫車，不想等車時最省力；③ 自駕約 20–25 分鐘，園區有停車場。",
  "planb": "下大雨就縮短園區時間、取消海灘，回飯店休息；後面接著 Sea World、輕鬆日和 Movie World，不建議把 Currumbin 往後挪。",
  "reads": [],
  "official": [
   {
    "u": "https://currumbinsanctuary.com.au/visit/",
    "l": "Currumbin 開放時間與票價"
   },
   {
    "u": "https://jp.translink.com.au/plan-your-journey",
    "l": "TransLink 路線規劃"
   }
  ]
 },
 {
  "n": 9,
  "md": "6/24",
  "wd": "四",
  "area": "黃金海岸",
  "place": "黃金海岸・Main Beach",
  "pace": "樂園日・海洋動物＋兒童區",
  "color": "yellow",
  "illo": "dolphin",
  "title": "海洋世界：看海豚表演，逛尼克兒童樂園",
  "lead": "Sea World 在 Main Beach 半島上，除了海洋動物展示和表演，還有給小小孩的 Nickelodeon Land。和 Dreamworld 一樣不追求玩遍：先排兒童區，再挑一兩場表演。",
  "stay": "黃金海岸・第 4 晚",
  "mission": "看完海豚表演，說說牠們怎麼跟訓練師溝通；再找一隻你從來沒見過的海洋動物。",
  "stops": [
   {
    "time": "開園前",
    "title": "前往 Sea World",
    "desc": "開園時間依季節調整（2026/10 查到多為 10:00–17:00，部分平日 10:30–16:00），出發前看官網 Operating Hours。從 Broadbeach 搭 G:link 往北到衝浪者天堂一帶，轉 TransLink 705 公車約 10–15 分鐘（都是 50 分錢）；或直接叫車約 15–20 分鐘。",
    "tags": [
     {
      "m": "rail",
      "t": "G:link"
     },
     {
      "m": "bus",
      "t": "705 公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Sea%20World%20Gold%20Coast",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "上午",
    "title": "Nickelodeon Land 兒童區",
    "desc": "有海綿寶寶、Dora、汪汪隊等角色的兒童遊具、表演與見面會。每項設施有各自的身高與陪同規定，入園前量好孩子身高再看園區圖；Leviathan、Storm Coaster 等大型設施是給大孩子和大人的。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Nickelodeon%20Land%20Sea%20World%20Gold%20Coast",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "中午前後",
    "title": "海豚與海洋動物表演",
    "desc": "依當天「Shows & Presentations」時刻表挑一場，提早 15–20 分鐘入座；坐前排可能被潑濕，冬天帶件外套。其他時間逛海洋動物展示區，展示項目以當日園區圖為準。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": []
   },
   {
    "time": "15:00 起",
    "title": "累了就提早離園",
    "desc": "不為了待到閉園硬撐；回程前可以在 Main Beach 的 Tedder Avenue 吃早一點的晚餐。",
    "tags": [
     {
      "m": "bus",
      "t": "705 公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": []
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Sea World 園區餐飲",
    "desc": "園內有多處餐點，營業以當天為準；午餐避開表演剛散場的時段。",
    "links": []
   },
   {
    "tag": "晚餐",
    "name": "Tedder Avenue 餐廳街・Main Beach",
    "desc": "離園區近，挑一家坐下慢慢吃，吃完再叫車或搭車回 Broadbeach。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Tedder%20Avenue%20Main%20Beach%20QLD",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "接駁選擇：① G:link 從 Broadbeach 往北到衝浪者天堂一帶，轉 705 公車到 Sea World，車資都是 50 分錢，可用感應信用卡（班距第三方資料 10–20 分鐘不等，以 TransLink 規劃器為準）；② 叫車約 15–20 分鐘，回程孩子累了最省力；③ 自駕約 15 分鐘，停車費以官網為準。",
  "planb": "下雨時以室內展示和有屋頂的表演場為主，戶外設施可能停駛；雨太大就縮短行程。Sea World 和 Movie World 都是 Village Roadshow 的樂園，買多日通票的話可以依天氣調換這兩天。",
  "reads": [
   {
    "date": "2026-09",
    "type": "比價文・非實訪遊記",
    "title": "Endless Travel Plans｜黃金海岸主題樂園花費比較",
    "note": "比較單日票、多園通票與交通的總花費；票價常變動，以官網當日價格為準。",
    "url": "https://www.endlesstravelplans.com/destinations/comparisons/gold-coast-theme-parks-cost"
   }
  ],
  "official": [
   {
    "u": "https://seaworld.com.au/park-info/operating-hours",
    "l": "Sea World 開放時間"
   },
   {
    "u": "https://seaworld.com.au/attractions/nickelodeon-land",
    "l": "Nickelodeon Land 設施"
   },
   {
    "u": "https://seaworld.com.au/park-info/shows-and-presentations-schedule",
    "l": "表演時刻表"
   },
   {
    "u": "https://themeparks.com.au/park-info",
    "l": "Village Roadshow 樂園資訊與多園通票"
   },
   {
    "u": "https://jp.translink.com.au/plan-your-journey",
    "l": "TransLink 路線規劃"
   }
  ]
 },
 {
  "n": 10,
  "md": "6/25",
  "wd": "五",
  "area": "黃金海岸",
  "place": "黃金海岸・衝浪者天堂",
  "pace": "輕鬆・短體驗＋留白",
  "color": "yellow",
  "illo": "duck",
  "title": "鴨子車開進河裡，下午公園留白",
  "lead": "兩個樂園日中間放一天輕鬆的：上午坐約一小時的 Aquaduck 水陸兩用車，下午睡午覺，有精神再去 HOTA 戶外公園或海邊。",
  "stay": "黃金海岸・第 5 晚",
  "mission": "觀察鴨子車入水時發生什麼事；下午挑一個最喜歡的顏色，回飯店畫下今天的鴨子車。",
  "stops": [
   {
    "time": "預約場次前",
    "title": "Aquaduck 集合報到",
    "desc": "依票券通知前往集合點，提前到場；Google Maps 搜尋結果需核對業者名稱與票券地址。",
    "tags": [
     {
      "m": "rail",
      "t": "G:link"
     },
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Aquaduck%20Gold%20Coast%20Cavill%20Avenue%20Surfers%20Paradise",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "約 1 小時",
    "title": "Aquaduck 城市導覽＋河道巡遊",
    "desc": "先在道路行駛，再進水道巡遊，體驗車子變船。官方有兒童掌舵機會，但依船長安排，不保證每個場次或孩子都可參加。",
    "tags": [
     {
      "m": "ferry",
      "t": "水陸鴨子車"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Aquaduck%20Gold%20Coast",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "上午・二選一",
    "title": "冬季賞鯨船（取代 Aquaduck）",
    "desc": "6 月正是座頭鯨北上的季節：Sea World Cruises 公布 2026 季從 5/30 開始，從 Main Beach 出港。2025 季價格大人 A$89、3–13 歲 A$79（2026–27 價格以官網為準）。風浪大會暈船，前一晚看天氣與退改規則；和 Aquaduck 擇一，不要同一天兩個都排。",
    "tags": [
     {
      "m": "ferry",
      "t": "賞鯨船"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Sea%20World%20Cruises%20Main%20Beach",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "中午",
    "title": "Cavill Avenue 附近午餐",
    "desc": "用餐後回飯店午睡。座位由業者分配，不預設能指定位置。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Cavill%20Avenue%20Surfers%20Paradise%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "15:30・選配",
    "title": "HOTA 戶外公園或海邊",
    "desc": "HOTA（Home of the Arts）有戶外草地、步道和遊戲空間，室內展覽是否適合六歲另查官網；或改去 Broadbeach 的 Kurrawa 海灘與公園玩沙 30–45 分鐘。兩者擇一，六月傍晚風大帶外套。",
    "tags": [
     {
      "m": "ride",
      "t": "叫車"
     },
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=HOTA%20Home%20of%20the%20Arts%20Gold%20Coast",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "晚上",
    "title": "準備明天的樂園包",
    "desc": "明天 Movie World 一整天：外套、水壺、點心，記下孩子身高（看設施限制用）。",
    "tags": [],
    "must": false,
    "links": []
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Cavill Avenue 餐飲區",
    "desc": "挑孩子接受的飯麵或簡餐，結束體驗後不再跨區找名店。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Cavill%20Avenue%20Surfers%20Paradise%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "tag": "點心・選配",
    "name": "HOTA Cafe",
    "desc": "下午去 HOTA 的話在這裡吃點心、休息。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=HOTA%20Cafe%20Surfers%20Paradise%20QLD",
      "l": "開啟 Google Maps"
     },
     {
      "u": "https://www.hota.com.au/dining/cafe",
      "l": "菜單／店家資訊"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "Hurricane’s Grill・Surfers Paradise",
    "desc": "今天時間較鬆，適合安排有座位的晚餐；若 Day 6 已吃過，就改附近其他餐廳。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Hurricanes%20Grill%20Surfers%20Paradise%20QLD",
      "l": "開啟 Google Maps"
     },
     {
      "u": "https://www.hurricanesgrill.com.au/",
      "l": "菜單／店家資訊"
     }
    ]
   }
  ],
  "move": "從 Broadbeach 搭 G:link 往北約 10 分鐘到 Cavill Avenue 站，再走到 Aquaduck 集合點；官方目前表示推車無法帶上車，可依業者寄放規則處理。賞鯨船從 Main Beach 出港：G:link＋705 公車或叫車。HOTA 在 Bundall，從 Broadbeach 叫車約 10 分鐘，公車班次用 TransLink 規劃器查。",
  "planb": "若 Aquaduck 因天候取消，先依票券處理改期或退款；雨天下午查 HOTA 當日室內展覽是否適合六歲，看不懂或沒興趣就回飯店休息。",
  "reads": [
   {
    "date": "2025-08-19",
    "type": "學校活動紀錄・非獨立遊記",
    "title": "BROWNS｜Aquaduck 校外活動紀錄",
    "note": "可看學生活動照片與水陸體驗；參與者年齡不同於六歲親子旅行，只參考體驗形式。",
    "url": "https://blog.browns.edu.au/junior-program/gc-psp-w5-aquaduck/"
   },
   {
    "date": "2026-10-09～11",
    "type": "旅客短評・業者彙整",
    "title": "Aquaduck｜業者官網展示的 Google 旅客短評",
    "note": "本次頁面可見 2026 年 10 月短評，提到水上行程與掌舵體驗；此為業者網站選載，並非獨立媒體評測。",
    "url": "https://www.aquaduck.com.au/gold-coast/"
   },
   {
    "date": "2026-06-18",
    "type": "官方旅遊攻略・非遊記",
    "title": "Experience Gold Coast｜冬季親子活動",
    "note": "提供冬季親子活動方向，包含 HOTA；文章中的 2026 限期活動不能當成 2027/6 行程，出發前再看節目表。",
    "url": "https://experiencegoldcoast.com/blog/family-friendly-activities-for-the-winter-school-holidays"
   }
  ],
  "official": [
   {
    "u": "https://www.aquaduck.com.au/gold-coast/",
    "l": "Aquaduck 官方行程與乘車資訊"
   },
   {
    "u": "https://www.hota.com.au/",
    "l": "HOTA 與展覽資訊"
   },
   {
    "u": "https://www.hota.com.au/dining/cafe",
    "l": "HOTA Cafe"
   },
   {
    "u": "https://seaworldcruises.com.au/",
    "l": "Sea World Cruises 賞鯨季與票價"
   }
  ]
 },
 {
  "n": 11,
  "md": "6/26",
  "wd": "六",
  "area": "黃金海岸",
  "place": "黃金海岸・Oxenford",
  "pace": "樂園日・Kids’ WB 兒童區",
  "color": "yellow",
  "illo": "clapper",
  "title": "華納兄弟電影世界：卡通明星的一天",
  "lead": "Movie World 是電影主題樂園，大型雲霄飛車多半給大人，六歲的主場是 Kids’ WB 兒童區。今天是週六人比較多，開園就先去兒童區，下午再看表演。",
  "stay": "黃金海岸・第 6 晚",
  "mission": "在兒童區自己「考」一張駕照：開完小車後，說說看你遵守了哪些交通規則。",
  "stops": [
   {
    "time": "開園前",
    "title": "前往 Movie World",
    "desc": "園區在北邊的 Oxenford。從 Broadbeach 搭 G:link 到 Helensvale 站（約 45 分鐘）轉 TX7 公車，合計約 1 小時 10–20 分（第三方規劃器估計，班次以 TransLink 為準），都是 50 分錢；回程孩子累了叫車約 35 分鐘（車資粗估 A$50–70）。開園時間依季節調整，出發前看官網。",
    "tags": [
     {
      "m": "rail",
      "t": "G:link"
     },
     {
      "m": "bus",
      "t": "TX7 公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Warner%20Bros.%20Movie%20World%20Gold%20Coast",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "上午",
    "title": "Kids’ WB 兒童區",
    "desc": "先量孩子身高。官網目前的規定：Junior Driving School 小車 90 公分以上，90–106 公分要大人陪；Road Runner Rollercoaster 110 公分以上，110–120 公分要大人陪；Looney Tunes 旋轉木馬和 Yosemite Sam 小火車可由照顧者陪坐，110 公分以下要大人陪。依孩子實際身高與膽量決定。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Kids%20WB%20Fun%20Zone%20Movie%20World",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "午餐後",
    "title": "休息，再挑一場表演",
    "desc": "找有座位的地方休息，再依當日時刻表挑一場表演或角色見面——例如 2025/12 起取代舊飛車秀的 Spy Chase Stunt Show；遊行時間各來源不一致，以當日園區時刻表為準。不為了大型雲霄飛車排長隊。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": []
   },
   {
    "time": "15:30 起",
    "title": "累了提早離園",
    "desc": "回程大眾運輸約 1 小時多、叫車約 35 分鐘。晚上整理行李，明天退房移動到布里斯本。",
    "tags": [
     {
      "m": "bus",
      "t": "TX7 公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": []
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "Movie World 園區餐飲",
    "desc": "園內有多處餐點，週六用餐時段排隊較長，可以 11:30 前先吃。",
    "links": []
   },
   {
    "tag": "晚餐",
    "name": "住宿附近簡單吃",
    "desc": "早點回飯店整理行李，明天要退房移動。",
    "links": []
   }
  ],
  "move": "接駁選擇：① G:link 從 Broadbeach 到 Helensvale 站轉 TX7 公車，每段 50 分錢，約 1 小時 10–20 分；② 去程搭大眾運輸、回程叫車（約 35 分鐘、粗估 A$50–70），孩子累了最實際；③ 自駕沿 M1 往北約 35 分鐘，停車費以官網為準。",
  "planb": "下雨時戶外雲霄飛車和水區可能停開，以室內表演和有屋頂的兒童設施為主；買多日通票的話可以和 Sea World 那天調換。",
  "reads": [],
  "official": [
   {
    "u": "https://movieworld.com.au/attractions/kids-wb-fun-zone",
    "l": "Kids’ WB 兒童區"
   },
   {
    "u": "https://movieworld.com.au/attractions/junior-driving-school",
    "l": "Junior Driving School 身高規定"
   },
   {
    "u": "https://movieworld.com.au/park-info",
    "l": "Movie World 園區資訊與開放時間"
   },
   {
    "u": "https://themeparks.com.au/park-info",
    "l": "Village Roadshow 樂園資訊與多園通票"
   },
   {
    "u": "https://jp.translink.com.au/plan-your-journey",
    "l": "TransLink 路線規劃"
   }
  ]
 },
 {
  "n": 12,
  "md": "6/27",
  "wd": "日",
  "area": "布里斯本",
  "place": "黃金海岸 → 布里斯本",
  "pace": "移動＋短散步",
  "color": "green",
  "illo": "car",
  "title": "移動到布里斯本，南岸公園輕旅行",
  "lead": "先把行李放好，才去公園。布里斯本住兩晚，選 South Bank 或市區，吃飯散步都方便。",
  "stay": "布里斯本・第 1 晚",
  "mission": "沿河岸找一座橋，看看船怎麼從橋下通過。",
  "stops": [
   {
    "time": "09:00",
    "title": "早餐、退房、清點行李",
    "desc": "先把交通確認好再退房；回程是 6/29 華航 CI54 從 BNE 出發，不要誤去 OOL。",
    "tags": [],
    "must": false,
    "links": []
   },
   {
    "time": "上午至中午",
    "title": "黃金海岸 → 布里斯本飯店",
    "desc": "行李多就預約 Con-X-ion 門對門接駁；行李不多可以搭 G:link 到 Helensvale 站，轉火車直達 South Brisbane 站（車資都是 50 分錢，合計約 1 小時 45 分，含轉乘時間是估計）。抵達先寄放行李或入住，不把車程寫成保證值。",
    "tags": [
     {
      "m": "bus",
      "t": "Con-X-ion"
     },
     {
      "m": "rail",
      "t": "G:link＋火車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Brisbane%20City%20QLD",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "14:00・選配",
    "title": "South Bank Parklands 散步",
    "desc": "入住後河岸散步、Riverside Green 遊樂場與 Streets Beach 看景，約 1–2 小時；六月不必下水，玩沙就好。想從高處看城市，可搭 South Bank 北端約 60 公尺高的 Wheel of Brisbane 摩天輪（2026/7 仍營運，票價與時間以官網為準）。SparkLab 留到明天。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=South%20Bank%20Parklands%20Brisbane",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "傍晚",
    "title": "提早吃晚餐、早點休息",
    "desc": "明天整天在布里斯本，不用趕。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": []
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "South Bank 餐飲區",
    "desc": "抵達晚就先在飯店附近吃，不為特定餐廳繞路。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=South%20Bank%20Brisbane%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "住宿附近輕鬆吃",
    "desc": "移動日不跑遠，飯店周邊找孩子熟悉的飯麵。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=South%20Bank%20Brisbane%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "move": "今天是陸路移動，接駁選擇：① Con-X-ion 門對門接駁巴士，行李多、帶孩子最省力，依區域計價、線上預約；② G:link 到 Helensvale 站轉昆士蘭鐵路 Gold Coast 線，直達 South Brisbane 站，車資 50 分錢，是最省錢的方式，但要自己搬行李上下車；③ 叫車或私人接送，約 1 小時。若當初選自駕，今天開到布里斯本把車還在市區營業點。布里斯本兩晚都以步行、CityCat 與公車為主。",
  "planb": "遇塞車或疲累，南岸公園與市區餐廳全部取消，直接到飯店休息。",
  "reads": [
   {
    "date": "2025-06-07",
    "type": "旅人實訪・英文",
    "title": "Daniel Bowen｜Exploring Brissie 實訪",
    "note": "記錄南岸與文化區散步，可參考河岸街景與行走感受；不是專門的六歲兒童攻略，當天仍以短線為主。",
    "url": "https://danielbowen.com/2025/06/07/exploring-brissie/"
   }
  ],
  "official": [
   {
    "u": "https://www.bne.com.au/",
    "l": "布里斯本機場"
   },
   {
    "u": "https://translink.com.au/",
    "l": "昆士蘭大眾運輸規劃"
   },
   {
    "u": "https://www.con-x-ion.com/",
    "l": "Con-X-ion 機場接駁訂位"
   },
   {
    "u": "https://airtrain.com.au/",
    "l": "Airtrain 時刻與票價"
   }
  ]
 },
 {
  "n": 13,
  "md": "6/28",
  "wd": "一",
  "area": "布里斯本",
  "place": "布里斯本・South Bank",
  "pace": "輕鬆・坐船＋室內",
  "color": "green",
  "illo": "brisbane",
  "title": "搭 CityCat 遊河，再到 SparkLab 玩科學",
  "lead": "今天整天不用搬行李。坐渡輪看城市和橋，再把下午交給互動科學館；累了就在南岸草地休息。",
  "stay": "布里斯本・第 2 晚",
  "mission": "從船上數一數經過幾座橋，再到科學館找出一個會發光的展品。",
  "stops": [
   {
    "time": "09:30",
    "title": "CityCat 渡輪遊河",
    "desc": "從 South Bank 碼頭上船，沿河看城市與橋，每段 50 分錢，可直接用 Visa／Mastercard 感應上下船。挑一個碼頭下船再搭回來，往返約 1 小時。另有免費的 CityHopper 渡輪（約每 30 分鐘一班，第三方資料，以 TransLink 為準），想省錢可以改搭。",
    "tags": [
     {
      "m": "ferry",
      "t": "CityCat"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=South%20Bank%20ferry%20terminal%20Brisbane",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "11:00",
    "title": "Queensland Museum ＆ SparkLab 科學中心",
    "desc": "博物館免費入場；SparkLab（原 Sciencentre）有互動科學展品，適齡約 6–12 歲，是否另收費與開放時間以官網為準。先玩 SparkLab 再逛展館。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": true,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Queensland%20Museum%20South%20Brisbane",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "選配・取代 SparkLab",
    "title": "Lone Pine 無尾熊保護區",
    "desc": "想再看一次無尾熊、餵袋鼠可以來這裡。官網票價大人 A$63、3–13 歲 A$45，家庭票（2 大＋最多 3 小）A$193。注意：Lone Pine 2024 年 7 月起已不開放抱無尾熊，改成近距離觀察；要抱著拍照請在 Day 8 的 Currumbin 預約。從市區搭公車或叫車約 30–40 分鐘（已還車），路線用 TransLink 規劃器查；和 SparkLab 擇一。",
    "tags": [
     {
      "m": "bus",
      "t": "公車"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Lone%20Pine%20Koala%20Sanctuary%20Brisbane",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "午餐後",
    "title": "Riverside Green 遊樂場與 Streets Beach",
    "desc": "遊樂場放電、看人造沙灘，約 1 小時，之後回飯店午休。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Riverside%20Green%20South%20Bank%20Brisbane",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "16:30・選配",
    "title": "Mt Coot-tha 觀景台看夕陽",
    "desc": "6 月日落約 17:00，從觀景台看整個布里斯本。已經還車，叫車約 20 分鐘；山上風大很冷，帶外套。累了就跳過，明天是回程日。",
    "tags": [
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Mt%20Coot-tha%20Summit%20Lookout",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "傍晚",
    "title": "整理行李、確認明天機場交通",
    "desc": "把明天退房的行李整理好，確認 CI54 報到時間與 Airtrain／接送。",
    "tags": [],
    "must": false,
    "links": []
   }
  ],
  "meals": [
   {
    "tag": "午餐",
    "name": "South Bank 文化區",
    "desc": "博物館周邊就近吃，不為名店繞路。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=South%20Bank%20Brisbane%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "tag": "晚餐",
    "name": "Siam South Bank",
    "desc": "泰式料理選項，可詢問不辣的麵飯與兒童餐；先查營業、預約及過敏原。若住機場周邊，直接就近用餐。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Siam%20South%20Bank%20Brisbane",
      "l": "開啟 Google Maps"
     },
     {
      "u": "https://www.siamsouthbank.com.au/family-restaurant-southbank",
      "l": "菜單／店家資訊"
     }
    ]
   }
  ],
  "move": "今天以步行與渡輪為主：CityCat 與公車都是每段 50 分錢，可直接感應信用卡；South Bank 文化區、博物館與遊樂場彼此走路可到，不需開車。",
  "planb": "下雨就跳過 CityCat，整天待在博物館與 SparkLab；天氣好可以多搭一段船。",
  "reads": [
   {
    "date": "2025-06-07",
    "type": "旅人實訪・英文",
    "title": "Daniel Bowen｜Exploring Brissie 實訪",
    "note": "記錄南岸與文化區散步，可參考河岸街景與行走感受；不是專門的六歲兒童攻略，當天仍以短線為主。",
    "url": "https://danielbowen.com/2025/06/07/exploring-brissie/"
   }
  ],
  "official": [
   {
    "u": "https://www.brisbane.qld.gov.au/transport-and-parking/public-transport/citycats-and-ferries",
    "l": "CityCat 渡輪資訊"
   },
   {
    "u": "https://www.museum.qld.gov.au/",
    "l": "Queensland Museum 官網"
   },
   {
    "u": "https://jp.translink.com.au/plan-your-journey",
    "l": "TransLink 路線規劃"
   },
   {
    "u": "https://lonepinekoalasanctuary.com/tickets/",
    "l": "Lone Pine 門票"
   }
  ]
 },
 {
  "n": 14,
  "md": "6/29",
  "wd": "二",
  "area": "布里斯本→台北",
  "place": "布里斯本 → 台北",
  "pace": "純移動日",
  "color": "water",
  "illo": "planeHome",
  "title": "布里斯本搭華航，回台北",
  "lead": "今天不排市區景點。CI54 是晚間起飛的班機，白天還有緩衝時間，優先把機場交通、托運與登機處理好，輕鬆結束旅程。",
  "stay": "機上（CI54 表定 6/30 清晨抵台，已跨日）",
  "mission": "今天只要吃飽、休息、順利移動，就是完成任務。",
  "stops": [
   {
    "time": "中午前",
    "title": "Queen Street Mall 最後採買",
    "desc": "退房後行李寄放飯店，到皇后街購物中心買零食、伴手禮。想辦退稅（TRS）：同一家店含稅滿 A$300、出境前 60 天內購買，商品要隨身帶到機場給海關看；先在 TRS App 填資料，出境後到 TRS 櫃台辦理，規定以澳洲邊境署官網為準。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Queen%20Street%20Mall%20Brisbane",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "白天彈性・傍晚出發",
    "title": "退房 → BNE 國際航廈",
    "desc": "CI54 表定 22:50 起飛，白天還能在 South Bank 散步或回昨天沒逛完的地方，傍晚再以航空公司建議報到時間倒推退房，額外留緩衝。從 South Brisbane 站搭 Airtrain 直達國際航廈：大人約 A$23.30（2026/4 起，不適用 50 分錢），14 歲以下由大人陪同免費（大人與孩子的票要一起買，go card 不適用），以 Airtrain 官網為準；也可以叫車。記得是 International Terminal。",
    "tags": [
     {
      "m": "rail",
      "t": "Airtrain"
     },
     {
      "m": "ride",
      "t": "叫車"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Brisbane%20Airport%20International%20Terminal",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "報到後",
    "title": "吃飯、補水、上廁所",
    "desc": "先完成安檢與必要程序，再找餐飲；飲水與食物攜帶依機場及入境規定。",
    "tags": [
     {
      "m": "walk",
      "t": "步行"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Brisbane%20Airport%20International%20Terminal%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "time": "22:50 表定起飛",
    "title": "華航 CI54：BNE → TPE",
    "desc": "表定 22:50 從布里斯本起飛，隔日（6/30）約 05:40 抵達桃園，飛行時間約 8 小時 50 分，已跨日抵台；接機與回程交通請抓 6/30 清晨，記得調整請假與接機日期。起降時間取自第三方航班追蹤網站，非官方訂位確認，實際以訂票結果為準。",
    "tags": [
     {
      "m": "flight",
      "t": "CI54"
     }
    ],
    "must": false,
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Taiwan%20Taoyuan%20International%20Airport",
      "l": "開啟 Google Maps"
     }
    ]
   }
  ],
  "meals": [
   {
    "tag": "早餐／午餐",
    "name": "飯店早餐或 BNE 國際航廈餐飲",
    "desc": "依起飛時間擇一，不在趕報到時另外繞去市區餐廳。",
    "links": [
     {
      "u": "https://www.google.com/maps/search/?api=1&query=Brisbane%20Airport%20International%20Terminal%20restaurants",
      "l": "開啟 Google Maps"
     }
    ]
   },
   {
    "tag": "機上餐",
    "name": "華航供餐",
    "desc": "若需要兒童餐，提早在訂位中確認；入境前再次檢查隨身食品。",
    "links": []
   }
  ],
  "move": "回程為華航 CI54，BNE → TPE，表定 22:50 起飛、6/30 約 05:40 抵達桃園；已跨日，不把規劃時間當成確認機票，實際以訂票結果為準。",
  "planb": "班機時間變動時，以華航通知重新安排退房、接送與接機。",
  "reads": [
   {
    "date": "2025-06-07",
    "type": "旅人實訪・英文",
    "title": "Daniel Bowen｜Exploring Brissie 實訪",
    "note": "記錄南岸與文化區散步，可參考河岸街景與行走感受；不是專門的六歲兒童攻略，當天仍以短線為主。",
    "url": "https://danielbowen.com/2025/06/07/exploring-brissie/"
   }
  ],
  "official": [
   {
    "u": "https://www.china-airlines.com/tw/zh",
    "l": "華航班機與訂位"
   },
   {
    "u": "https://www.bne.com.au/",
    "l": "BNE 機場資訊"
   },
   {
    "u": "https://www.abf.gov.au/entering-and-leaving-australia/tourist-refund-scheme",
    "l": "TRS 旅客退稅規定"
   },
   {
    "u": "https://www.airtrain.com.au/offers-and-discounts/kids-travel-free/",
    "l": "Airtrain 兒童免費方案"
   }
  ]
 }
];

/* 航班、住宿、待辦清單與出發前須知 */
window.TRIP = {
  departure: '2027-06-16T23:30:00+08:00',
  tripEnd: '2027-06-30T05:40:00+08:00',
  startDate: '2027-06-16',
  checkedOn: '2026-10-19',
  version: 'little-explorers-20261019b',

  // 護照蓋章風格：每天一枚入境章（依序對應 Day 1–14）
  stamps: [
    { top: 'TAIPEI', bottom: 'DEPARTURE', shape: 'rect' },
    { top: 'SYDNEY', bottom: 'ARRIVAL', shape: 'circle' },
    { top: 'SYDNEY', bottom: 'HARBOUR', shape: 'rect' },
    { top: 'SYDNEY', bottom: 'TARONGA ZOO', shape: 'circle' },
    { top: 'BLUE MOUNTAINS', bottom: 'KATOOMBA', shape: 'rect' },
    { top: 'GOLD COAST', bottom: 'ARRIVAL', shape: 'circle' },
    { top: 'GOLD COAST', bottom: 'DREAMWORLD', shape: 'rect' },
    { top: 'CURRUMBIN', bottom: 'KOALA', shape: 'circle' },
    { top: 'GOLD COAST', bottom: 'SEA WORLD', shape: 'rect' },
    { top: 'SURFERS PARADISE', bottom: 'AQUADUCK', shape: 'circle' },
    { top: 'GOLD COAST', bottom: 'MOVIE WORLD', shape: 'rect' },
    { top: 'BRISBANE', bottom: 'ARRIVAL', shape: 'circle' },
    { top: 'BRISBANE', bottom: 'CITYCAT', shape: 'rect' },
    { top: 'BRISBANE', bottom: 'DEPARTURE', shape: 'circle' }
  ],

  route: [
    { code: 'TPE', name: '台北', note: '6/16 出發', color: 'water' },
    { code: 'SYD', name: '雪梨', note: '4 晚', color: 'coral' },
    { code: 'OOL', name: '黃金海岸', note: '6 晚', color: 'yellow' },
    { code: 'BNE', name: '布里斯本', note: '2 晚', color: 'green' },
    { code: 'TPE', name: '回家', note: '6/30 清晨', color: 'water' }
  ],

  flights: [
    {
      kind: '去程', color: 'water', code: 'CI51', airline: '中華航空', date: '2027/6/16（三）',
      from: { code: 'TPE', city: '桃園 T2', time: '23:30' },
      to: { code: 'SYD', city: '雪梨 T1', time: '10:45', plus: '+1' },
      dur: '約 9 小時 15 分',
      notes: ['6/17（四）上午抵達，機上過夜', '部分來源列 23:50 起飛，營運星期各站說法不一', '兒童餐請在訂位時一併申請'],
      links: [{ u: 'https://www.china-airlines.com/tw/zh', l: '華航訂位與班表' }]
    },
    {
      kind: '國內線', color: 'yellow', code: 'SYD→OOL', airline: '三家擇一', date: '2027/6/21（一）',
      from: { code: 'SYD', city: '雪梨國內線', time: '待訂' },
      to: { code: 'OOL', city: '黃金海岸', time: '待訂' },
      dur: '約 1 小時 20–30 分',
      options: [
        { name: 'Virgin Australia', note: '班次最多', u: 'https://www.virginaustralia.com/au/en/' },
        { name: 'Jetstar', note: '通常最便宜，托運另計', u: 'https://www.jetstar.com/au/en/home' },
        { name: 'Qantas', note: '班次較少，托運額度較多', u: 'https://www.qantas.com/au/en.html' }
      ],
      notes: ['比價時一起看托運、手提行李與選位', '抵達 OOL 搭 777 公車直達 Broadbeach South 站（50 分錢）；要自駕才在航廈取車'],
      links: [{ u: 'https://www.goldcoastairport.com.au/transport/transport-overview/transport-options', l: 'OOL 機場交通與租車' }]
    },
    {
      kind: '回程', color: 'coral', code: 'CI54', airline: '中華航空', date: '2027/6/29（二）',
      from: { code: 'BNE', city: '布里斯本', time: '22:50' },
      to: { code: 'TPE', city: '桃園 T2', time: '05:40', plus: '+1' },
      dur: '約 8 小時 50 分',
      notes: ['已跨日：6/30（三）清晨抵台，接機與請假抓這天', '租車已在 6/27 到布里斯本時歸還，當天用 Airtrain 或叫車到國際航廈'],
      links: [{ u: 'https://www.china-airlines.com/tw/zh', l: '華航訂位與班表' }, { u: 'https://www.bne.com.au/', l: '布里斯本機場' }]
    }
  ],

  // 已訂好的飯店：補上 name（或更精確的 query，例如地址）後，所有「Google 路線」都會從飯店出發
  hotels: {
    syd: { name: '', query: '', map: 'https://maps.app.goo.gl/7LfUX4V7bFqoLBh67' }
  },

  stays: [
    {
      city: '雪梨', color: 'coral', nights: 4, dates: '6/17（四）入住 → 6/21（一）退房',
      area: '你們訂好的飯店（位置見下方地圖）',
      status: '已預訂',
      hotel: 'syd',
      options: [
        { name: '已預訂的飯店（名稱待補）', type: '點「地圖」開啟你分享的 Google 地圖位置', map: 'https://maps.app.goo.gl/7LfUX4V7bFqoLBh67' }
      ],
      note: '行程裡的「Google 路線」按鈕：飯店名稱補上前會從手機目前位置出發，補上後改從飯店出發。Day 5 藍山一日遊當天來回，不用換飯店。'
    },
    {
      city: '黃金海岸', color: 'yellow', nights: 6, dates: '6/21（一）入住 → 6/27（日）退房',
      area: '建議 Broadbeach：G:link 站走路 5–10 分鐘內，6 晚不換飯店',
      status: '尚未預訂',
      options: [
        { name: 'Peppers Broadbeach', type: '公寓式（有廚房、洗衣），訂前確認到 G:link 站的步行距離', map: 'https://www.google.com/maps/search/?api=1&query=Peppers%20Broadbeach' },
        { name: 'Mantra Broadbeach on the Park', type: '公寓式，靠近 Kurrawa 公園與海灘', map: 'https://www.google.com/maps/search/?api=1&query=Mantra%20Broadbeach%20on%20the%20Park' },
        { name: 'Sofitel Gold Coast Broadbeach', type: '飯店（沒有廚房），在 Oasis 商場旁、近 Broadbeach North 站', map: 'https://www.google.com/maps/search/?api=1&query=Sofitel%20Gold%20Coast%20Broadbeach' }
      ],
      note: '為什麼選 Broadbeach：OOL 機場的 777 公車直達 Broadbeach South 站；去 Dreamworld 的 TX2 樂園巴士、去 Currumbin 的 700 公車都從這一帶出發；比衝浪者天堂安靜，有 Pacific Fair 商場可補給。Sea World 與 Aquaduck 搭 G:link 往北約 10 分鐘再轉乘。備選：衝浪者天堂 Cavill Avenue 站附近（去 Sea World、Aquaduck 較近，晚上較吵）。公寓式有洗衣機，6 晚只帶一半衣服。'
    },
    {
      city: '布里斯本', color: 'green', nights: 2, dates: '6/27（日）入住 → 6/29（二）退房',
      area: '建議 South Brisbane 站／Cultural Centre 一帶：走路到博物館、South Bank 與 CityCat',
      status: '尚未預訂',
      options: [
        { name: 'Rydges South Bank', type: '飯店，近 South Brisbane 站與會展中心', map: 'https://www.google.com/maps/search/?api=1&query=Rydges%20South%20Bank%20Brisbane' },
        { name: 'Emporium Hotel South Bank', type: '飯店，Grey Street，走路到 South Bank 公園', map: 'https://www.google.com/maps/search/?api=1&query=Emporium%20Hotel%20South%20Bank' }
      ],
      note: '從黃金海岸搭火車可以直達 South Brisbane 站；6/29 也從這站搭 Airtrain 直達國際航廈，14 歲以下由大人陪同免費（Airtrain 兒童免費方案）。CI54 晚上 22:50 才起飛，6/29 白天還能在南岸散步。'
    }
  ],

  todos: [
    {
      group: '證件與保險', when: '現在～出發前 2 個月', items: [
        { id: 'eta', t: '三人都申請澳洲 ETA（Subclass 601）', note: '用官方 Australian ETA App 線上申請', u: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601', l: '官方說明' },
        { id: 'passport', t: '確認三本護照效期', note: '效期要涵蓋整趟旅程，航空公司常建議剩 6 個月以上' },
        { id: 'idp', t: '申請國際駕照（若要自駕）', note: '台灣駕照是中文，需國際駕照或 NAATI 翻譯本' },
        { id: 'insurance', t: '投保旅遊平安險／不便險', note: '確認涵蓋租車、戶外活動與醫療' }
      ]
    },
    {
      group: '機票與交通', when: '開賣後盡早', items: [
        { id: 'ci', t: '訂華航 CI51／CI54', note: '核對 2027/6 實際班表，一併申請兒童餐與選位' },
        { id: 'domestic', t: '訂 6/21 雪梨 → 黃金海岸國內線', note: 'Jetstar／Virgin／Qantas 比價，記得含托運' },
        { id: 'car', t: '決定黃金海岸交通：大眾運輸（建議）或自駕', note: '比較見「交通與票價」；自駕才需要訂車、兒童座椅與國際駕照' },
        { id: 'bluemtn', t: '藍山（6/20 週日）：選一日團、自駕或火車' },
        { id: 'moviewld', t: '查好 Dreamworld（6/22）與 Movie World（6/26）的公車', note: 'TX2 是否仍從 Broadbeach South 開；TX7 從 Helensvale 開；回程可叫車' }
      ]
    },
    {
      group: '門票預約', when: '出發前 1–2 個月', items: [
        { id: 'taronga', t: '購買 Taronga 動物園門票（6/19）', note: '線上通常較便宜；官網曾暫停線上購票，出發前確認。Sky Safari 纜車停駛中', u: 'https://www.taronga.org.au/sydney-zoo/plan', l: '官網' },
        { id: 'vrparks', t: '購買 Sea World（6/24）與 Movie World（6/26）門票', note: '兩天都在 5 天內，比較多園通票和兩張單日票；2027 價格以官網為準', u: 'https://themeparks.com.au/park-info', l: '官網' },
        { id: 'aquaduck', t: '預約 Aquaduck 鴨子車場次（6/25）', u: 'https://www.aquaduck.com.au/gold-coast/', l: '官網' },
        { id: 'dreamworld', t: '購買 Dreamworld 門票', note: '入園前量好孩子身高', u: 'https://www.dreamworld.com.au/', l: '官網' },
        { id: 'koalaphoto', t: '預約 Currumbin Koala Photo（選配）', note: '想抱無尾熊拍照只能排這裡；能不能抱由飼育員當天判斷', u: 'https://currumbinsanctuary.com.au/', l: '官網' },
        { id: 'currumbin', t: '購買 Currumbin 門票（6/23）', note: '官網大人 A$70、3–17 歲 A$50，線上購票可能有優惠', u: 'https://currumbinsanctuary.com.au/visit/', l: '官網' },
        { id: 'scenic', t: '購買 Scenic World 門票', u: 'https://www.scenicworld.com.au/tickets', l: '官網' },
        { id: 'vivid', t: '查 Vivid Sydney 2027 節目與路線', note: '2027 場期 5/28–6/19，行程排在 6/17–6/19', u: 'https://www.vividsydney.com/info/contact-us/frequently-asked-questions', l: '官網' }
      ]
    },
    {
      group: '住宿', when: '機票確定後', items: [
        { id: 'stay-syd', t: '雪梨 4 晚（6/17–6/21）已訂：補上飯店名稱', note: '傳給 Claude，交通會依飯店位置重算' },
        { id: 'stay-gc', t: '訂黃金海岸 6 晚（6/21–6/27）', note: 'Broadbeach，G:link 站走路 5–10 分鐘內，有廚房洗衣機' },
        { id: 'stay-bne', t: '訂布里斯本 2 晚（6/27–6/29）', note: 'South Brisbane 站附近，火車與 Airtrain 都直達' }
      ]
    },
    {
      group: '出發前一週', when: '6/9 前後', items: [
        { id: 'museum', t: '再查海事博物館當週可登船艦', u: 'https://www.sea.museum/en/visit', l: '館方公告' },
        { id: 'harbour', t: '看達令港施工與改道公告', u: 'https://www.darlingharbour.com/notices', l: '公告' },
        { id: 'card', t: '準備感應式信用卡＋孩子的兒童 Opal 卡', note: '大人直接感應信用卡；6 歲在雪梨要用兒童 Opal 卡（機場站或便利商店買）；昆士蘭每段 50 分錢可直接感應' },
        { id: 'plug', t: '準備 Type I 插頭轉接頭' },
        { id: 'coat', t: '帶保暖外套與防風衣', note: '雪梨 6 月約 9–17°C，藍山更冷' },
        { id: 'kidbag', t: '整理孩子的隨身包', note: '換洗衣物、零食、耳機、小毯子；樂園日多帶一件外套' },
        { id: 'offline', t: '下載 Google Maps 離線地圖' }
      ]
    }
  ],

  notes: [
    {
      title: 'Harbourside 不安排逛街',
      text: '開發商目前預計整體工程於 2027 年底完成，部分區域分階段開放；不假設 2027/6 商場已全面營業。達令港改以 Darling Quarter 與 Tumbalong Park 為主。',
      links: [
        { u: 'https://harboursidecommunity.mirvac.com/faq?sc_site=darling-harbour-community', l: '開發商時程' },
        { u: 'https://www.darlingharbour.com/notices', l: '改道與工程公告' }
      ]
    },
    {
      title: '海事博物館登船，要再看開放表',
      text: '官網目前列有 2026 年 10–11 月展區與船艦工程；不等於 2027/6 關閉，也不保證屆時每艘船都開。現在海事博物館和恐龍博物館都是 Day 4（Taronga 動物園）的雨天備案，擇一。',
      links: [{ u: 'https://www.sea.museum/en/visit', l: '館方開放與維修公告' }]
    },
    {
      title: '日期先保留，班次與節目等實際確認',
      text: '沿用 2027/6/16–6/29。國際線班號已定，國內線、住宿與活動都還沒訂；Vivid 只排 6/17–6/19，展區以 2027 節目表為準。各樂園表演、Aquaduck 場次與 HOTA 展覽也不保證和現在相同。',
      links: [{ u: 'https://www.vividsydney.com/info/contact-us/frequently-asked-questions', l: 'Vivid 官方日期' }]
    },
    {
      title: '想抱無尾熊，只排在 Currumbin',
      text: '新南威爾斯州（雪梨、藍山）不能抱無尾熊。昆士蘭的 Currumbin 目前仍有 Koala Photo（約 A$49–69，可不可以抱由當天飼育員判斷，事先線上預約）；布里斯本的 Lone Pine 2024 年 7 月起已停止抱無尾熊，改成近距離觀察。',
      links: [{ u: 'https://currumbinsanctuary.com.au/', l: 'Currumbin 互動體驗' }, { u: 'https://lonepinekoalasanctuary.com/tickets/', l: 'Lone Pine 票價與體驗' }]
    },
    {
      title: '六月是冬天，洋蔥式穿法',
      text: '雪梨早晚約 8–10°C，藍山再冷 5–7°C、起風體感更低，要帶防風外套、毛帽和發熱衣；黃金海岸和布里斯本白天較暖（約 20°C 上下），一件可以穿脫的外套最方便。樂園和賞鯨船上風大，多帶一件給孩子。',
      links: [{ u: 'https://www.bom.gov.au/', l: '澳洲氣象局' }]
    },
    {
      title: '考慮自駕，先看這段',
      text: '台灣駕照是中文，需國際駕照（IDP）或 NAATI 認證翻譯本；昆士蘭通常容許持有效外國駕照駕駛約 3 個月，各州規定不同。澳洲靠左行駛，與台灣相反。7 歲以下必須使用澳規（AS）兒童安全座椅，租車也適用；4 歲以下不得坐前座。只建議藍山（Day 5）與黃金海岸（Day 6–12）考慮自駕，雪梨市區停車貴、Vivid 期間常封路。',
      links: [
        { u: 'https://www.qld.gov.au/transport/safety/rules/children', l: 'QLD 兒童安全座椅規定' },
        { u: 'https://www.service.nsw.gov.au/transaction/apply-for-an-international-driving-permit-idp', l: '國際駕照資訊' }
      ]
    }
  ],

  transit: [
    {
      title: '雪梨 Opal', sub: '火車・輕軌・公車・渡輪', color: 'coral',
      rows: [
        ['大人怎麼付', '感應信用卡／手機，或大人 Opal 卡'],
        ['6 歲怎麼付', '兒童 Opal 卡（4–15 歲）；感應信用卡只會扣大人票'],
        ['大人每日上限', '週一–四 A$19.30・週五–日 A$9.65'],
        ['兒童每日上限', '週一–四 A$9.65・週五–日 A$4.80'],
        ['每週上限', '大人 A$50・兒童 A$25'],
        ['機場站附加費', '大人約 A$18.61・兒童約 A$16.64，另計、不算進上限'],
        ['藍山火車', 'Central → Katoomba 約 2 小時，大人單程約 A$7–11']
      ],
      tips: ['4 歲以下免費。兒童 Opal 卡可在機場站、7-Eleven 或便利商店買。', '6/18–6/20 是週五到週日，剛好適用週末半價上限；藍山日（6/20）是週日。', '三人帶行李往返機場，叫車常和「火車＋機場站附加費」差不多，可以比較。'],
      links: [
        { u: 'https://transportnsw.info/trip', l: 'NSW 路線規劃（含票價）' },
        { u: 'https://transportnsw.info/tickets-fares/fares/best-ways-for-visitors-to-pay', l: '旅客付款方式' },
        { u: 'https://transportnsw.info/travel-info/using-public-transport/getting-to-airport', l: '機場交通與附加費' }
      ]
    },
    {
      title: '昆士蘭 TransLink', sub: '黃金海岸・布里斯本', color: 'yellow',
      rows: [
        ['票價', '每段 50 分錢定額，不分距離'],
        ['適用', '公車、火車、G:link 輕軌、CityCat 渡輪；Airtrain 除外'],
        ['怎麼付', 'Visa／Mastercard 感應卡或手機，上下車都要感應；也可用 go card'],
        ['兒童', '兒童 go card 與兒童票規則以官網為準']
      ],
      tips: ['每人用一張卡，下車用同一張感應，避免被多扣。', '黃金海岸常用：G:link 輕軌（Broadbeach–衝浪者天堂–Helensvale）、700 路公車（往 Burleigh、Currumbin）。', '2026 年已立法把 50 分錢票價永久化。'],
      links: [
        { u: 'https://translink.com.au/tickets-and-fares/fares-and-zones/south-east-queensland', l: 'TransLink 票價' },
        { u: 'https://jp.translink.com.au/plan-your-journey', l: 'TransLink 路線規劃' },
        { u: 'https://www.brisbane.qld.gov.au/transport-and-parking/public-transport/citycats-and-ferries', l: 'CityCat 渡輪' }
      ]
    },
    {
      title: '機場與城際', sub: 'Airtrain・接駁巴士・接送', color: 'water',
      rows: [
        ['OOL → Broadbeach', '777 公車直達 Broadbeach South 站，約每 15 分一班，50 分錢'],
        ['黃金海岸 → 布里斯本', 'G:link 到 Helensvale 轉火車直達 South Brisbane 站，50 分錢'],
        ['Airtrain 去 BNE', 'South Brisbane 等市區站大人約 A$23.30（2026/4 起），14 歲以下陪同免費'],
        ['Con-X-ion', '門對門接駁巴士，依區域計價，線上預約'],
        ['私人接送', '黃金海岸 → 布里斯本機場，轎車約 A$190 起（業者報價）'],
        ['雪梨機場叫車', '到達令港約 25–35 分鐘，約 A$35–55']
      ],
      tips: ['Airtrain 不適用 50 分錢票價。', '三人帶行李時，接駁或叫車常比火車省力；預算優先再選火車。'],
      links: [
        { u: 'https://www.airtrain.com.au/catch-airtrain-to/gold-coast-surfers-paradise/', l: 'Airtrain 黃金海岸' },
        { u: 'https://www.con-x-ion.com/', l: 'Con-X-ion 訂位' },
        { u: 'https://www.goldcoastairport.com.au/transport/transport-overview/transport-options', l: 'OOL 機場交通' }
      ]
    },
    {
      title: '景點接駁', sub: '不自駕時怎麼去', color: 'green',
      rows: [
        ['Taronga 動物園', '環形碼頭搭 F2 渡輪約 12 分鐘，碼頭再搭公車上山，用 Opal'],
        ['藍山 Scenic World', 'Katoomba 站轉 686 公車，用 Opal 付款'],
        ['Dreamworld', 'Broadbeach South 搭 TX2 樂園巴士（第三方資料，出發前確認），或 G:link＋火車＋公車'],
        ['Currumbin', '700 路公車從 Broadbeach 約 25–35 分鐘，50 分錢'],
        ['Sea World', 'G:link 到衝浪者天堂一帶轉 705 公車，或叫車約 15–20 分鐘'],
        ['Movie World', 'G:link 到 Helensvale 站轉 TX7 公車，約 1 小時 10–20 分，50 分錢'],
        ['布里斯本南岸', 'CityCat 渡輪＋步行，50 分錢']
      ],
      tips: ['班次都用上面的官方路線規劃器查當天時刻。', '自駕的法規與注意事項見清單區「考慮自駕，先看這段」。'],
      links: [
        { u: 'https://www.taronga.org.au/sydney-zoo/plan', l: 'Taronga 交通與門票' },
        { u: 'https://themeparks.com.au/park-info', l: 'Sea World／Movie World 園區資訊' },
        { u: 'https://currumbinsanctuary.com.au/visit/', l: 'Currumbin 交通與票價' }
      ]
    },
    {
      title: '黃金海岸：大眾運輸 vs 自駕', sub: '6/21 機場 → 6/27 到布里斯本', color: 'coral',
      rows: [
        ['大眾運輸', '約 A$150–300：50 分錢車資約 A$30–45，加 3–4 趟叫車（機場、晚歸）'],
        ['大眾運輸＋樂園日叫車', '約 A$350–500：Dreamworld、Movie World 回程都叫車，每趟約 A$50–70（粗估）'],
        ['自駕', '約 A$700–1,250：租車 6 天 A$360–600、兒童座椅 A$80–150、油錢 A$60–90、飯店停車 A$90–180、降低自負額 A$120–210（選購）'],
        ['差多少', '自駕比純大眾運輸多約 A$450–950，約 NT$10,000–21,000（匯率 22）'],
        ['時間差', 'Dreamworld、Movie World 單程大眾運輸約 1 小時 10–20 分，開車約 30–35 分；Currumbin、Sea World 差不多'],
        ['建議', '住 Broadbeach、以大眾運輸為主；兩個北邊樂園日看孩子體力，回程叫車'],
      ],
      tips: [
        '自駕還要國際駕照、靠左行駛、自己裝兒童座椅，6/27 在布里斯本還車；布里斯本兩天用不到車。',
        '租車價格是第三方平均（約 A$90／天）或粗估；樂園停車費第三方 2026 資料說免費，以官網為準。',
        '叫車車資是依距離的粗估，實際看 Uber／DiDi 當下報價。'
      ],
      links: [
        { u: 'https://jp.translink.com.au/plan-your-journey', l: 'TransLink 路線規劃' },
        { u: 'https://www.goldcoastairport.com.au/getting-here/transport', l: 'OOL 機場交通（777）' },
        { u: 'https://www.airtrain.com.au/offers-and-discounts/kids-travel-free/', l: 'Airtrain 兒童免費' }
      ]
    }
  ],

  // 預算：預估為 2026/10 查核的公開資料或粗估（標「粗估」），實際金額在網頁上填，存在這台裝置
  budget: {
    rate: 22,
    rateNote: '2026/10 初約 1 澳幣 ≈ 22.1–22.3 台幣；可以改成實際刷卡匯率。',
    groups: [
      {
        group: '機票', items: [
          { id: 'b-ci', name: '華航 CI51／CI54 國際線（2 大 1 小）', cur: 'TWD', low: 90000, high: 135000, note: '粗估：經濟艙來回每人約 3–4.5 萬，兒童票依華航規定（常見為成人約 75%）；2027/6 票價尚未開賣。' },
          { id: 'b-dom', name: '國內線 SYD → OOL（3 人含托運）', cur: 'AUD', low: 300, high: 600, note: '粗估：Jetstar 最便宜但托運另計；Virgin／Qantas 多半含托運。' }
        ]
      },
      {
        group: '住宿 12 晚', items: [
          { id: 'b-syd', name: '雪梨 4 晚（已預訂）', cur: 'AUD', low: 1200, high: 1800, note: '已訂好，把實際金額與飯店名稱填在下面；預估是訂房前查的 Vivid 期間行情。' },
          { id: 'b-gc', name: '黃金海岸 6 晚（Broadbeach 公寓）', cur: 'AUD', low: 1100, high: 1900, note: '6 月是淡季，第三方資料平均每晚約 A$130–230；兩房公寓較貴。' },
          { id: 'b-bne', name: '布里斯本 2 晚（South Brisbane 站附近）', cur: 'AUD', low: 450, high: 700, note: '粗估，依訂房網站即時價格。' }
        ]
      },
      {
        group: '交通', items: [
          { id: 'b-gcride', name: '黃金海岸叫車與接駁（機場、樂園日回程、移動到布里斯本）', cur: 'AUD', low: 150, high: 450, note: '大眾運輸方案：樂園日回程叫車每趟約 A$50–70（粗估）。若改自駕約 A$700–1,250，請改用「其他支出」記。' },
          { id: 'b-opal', name: '雪梨 Opal（含機場站附加費、渡輪、藍山火車）', cur: 'AUD', low: 150, high: 250, note: '大人每日上限平日 A$19.30、週末 A$9.65；機場站附加費大人約 A$18.61、兒童約 A$16.64。' },
          { id: 'b-qld', name: '昆士蘭公車、輕軌、火車與 Airtrain', cur: 'AUD', low: 60, high: 120, note: '每段 50 分錢；去 BNE 的 Airtrain 大人約 A$23.30、14 歲以下陪同免費。' }
        ]
      },
      {
        group: '門票與體驗', items: [
          { id: 'b-taronga', name: 'Taronga 動物園', cur: 'AUD', low: 133, high: 143, note: '第三方 2026：大人約 A$51–55、4–15 歲約 A$31–33。' },
          { id: 'b-bluemtn', name: '藍山：Scenic World 或一日團', cur: 'AUD', low: 150, high: 500, note: '粗估：自行前往只買 Scenic World；跟團含接送較貴。' },
          { id: 'b-dream', name: 'Dreamworld', cur: 'AUD', low: 300, high: 450, note: '第三方 2026 約每人 A$119–149，常有線上優惠。' },
          { id: 'b-vr', name: 'Sea World＋Movie World', cur: 'AUD', low: 500, high: 720, note: '單日票約每人 A$109–119；多園通票 2027 價格未知，買前比較。' },
          { id: 'b-curr', name: 'Currumbin（含 Koala Photo 選配）', cur: 'AUD', low: 190, high: 260, note: '官網大人 A$70、3–17 歲 A$50；Koala Photo 約 A$49–69。' },
          { id: 'b-aqua', name: 'Aquaduck 或賞鯨船（二選一）', cur: 'AUD', low: 100, high: 260, note: '粗估：Aquaduck 依官網；賞鯨 2025 季大人 A$89、3–13 歲 A$79。' },
          { id: 'b-bneact', name: '布里斯本：SparkLab 或 Lone Pine（選配）', cur: 'AUD', low: 0, high: 193, note: 'Lone Pine 家庭票 A$193；SparkLab 收費以官網為準。' }
        ]
      },
      {
        group: '餐飲', items: [
          { id: 'b-food', name: '餐費 13 天（三人）', cur: 'AUD', low: 1800, high: 2800, note: '粗估每天 A$140–215：早餐簡單、一餐簡餐一餐餐廳；有廚房可以省。' }
        ]
      },
      {
        group: '其他', items: [
          { id: 'b-eta', name: '澳洲 ETA（3 人）', cur: 'AUD', low: 60, high: 60, note: '官方 Australian ETA App，每人 A$20 服務費。' },
          { id: 'b-ins', name: '旅平險＋不便險', cur: 'TWD', low: 3000, high: 6000, note: '粗估，依保額與保險公司。' },
          { id: 'b-net', name: '網路（eSIM 或漫遊）', cur: 'TWD', low: 600, high: 1500, note: '粗估。' },
          { id: 'b-idp', name: '國際駕照（自駕才需要）', cur: 'TWD', low: 0, high: 250, note: '大眾運輸方案不需要；要自駕再到監理站辦。' },
          { id: 'b-shop', name: '伴手禮與零用', cur: 'AUD', low: 300, high: 800, note: '粗估。' }
        ]
      }
    ]
  },

  footer: [
    '資料查核日 2026/10/17。航班時刻取自第三方航班追蹤網站交叉比對，非官方訂位確認；所有行程都還沒有預訂。',
    '延伸閱讀只收來源日期為 2025／2026 的內容，日期是來源頁面顯示的發布日期，不等於作者實際出遊日；遊記、短評與官方攻略分開標示。',
    '大眾運輸票價取自 Transport for NSW、TransLink、Airtrain 與業者官網及 2026 年旅遊指南交叉比對，票價每年調整。營業時間、票價、交通、身高限制與餐廳菜單，請於出發前依官方最新資訊確認。',
    '字型：粉圓 Huninn、思源黑體、思源宋體、芫荽、Alfa Slab One、Courier Prime、Press Start 2P 來自 Google Fonts；像素風中文字型為俐方體 11 號 Cubic 11（ACh-K，免費字型，本站只收錄用到的字，授權全文見 fonts/Cubic11-LICENSE.txt）。'
  ]
};
