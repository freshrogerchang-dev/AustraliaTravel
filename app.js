(function () {
  'use strict';

  var DAYS = window.TRIP_DAYS, TRIP = window.TRIP, ILLOS = window.ILLOS, ICONS = window.ICONS;
  var root = document.documentElement;
  var $ = function (s) { return document.querySelector(s); };

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function reduced() { return root.getAttribute('data-motion') === 'reduce'; }

  /* ---------- themes ---------- */
  var THEMES = { book: '#FFFCF6', aussie: '#FBEFD9', passport: '#F3F0E4', crayon: '#FFFDF5', pixel: '#F2E8D5' };
  function pixelate() { if (theme() === 'pixel' && window.pixelate) window.pixelate(document); }
  var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  function theme() { return THEMES[root.getAttribute('data-theme')] ? root.getAttribute('data-theme') : 'book'; }
  function setThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEMES[theme()]);
  }
  function stampFor(n) {
    var s = TRIP.stamps[n - 1], md = DAYS[n - 1].md.split('/');
    return window.makeStamp({
      top: s.top, bottom: s.bottom, shape: s.shape, day: 'DAY ' + pad(n),
      mid: pad(Number(md[1])) + ' ' + MONTHS[Number(md[0]) - 1] + ' ' + TRIP.startDate.slice(0, 4)
    });
  }
  function ext(u, label, cls) {
    var isMap = /google\.com\/maps/.test(u);
    var text = isMap ? label.replace('開啟 Google Maps', '地圖') : label;
    return '<a class="link-btn' + (isMap ? ' map' : '') + (cls ? ' ' + cls : '') + '" href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' +
      (isMap ? ICONS.pin : ICONS.out) + '<span>' + esc(text) + '</span></a>';
  }

  /* ---------- transport tags ---------- */
  var MODES = {
    walk: '步行', ferry: '渡輪', rail: '火車／輕軌', bus: '巴士／接駁', car: '自駕', ride: '叫車', flight: '飛機', cable: '纜車'
  };
  function tag(m, t) {
    return '<li class="tag t-' + m + '">' + (ICONS[m] || '') + '<span>' + esc(t || MODES[m]) + '</span></li>';
  }
  var MODE_WORDS = [
    ['car', /自駕|租車|還車/], ['rail', /火車|輕軌|G:link|Airtrain|Airport Link|藍山線/],
    ['bus', /巴士|公車|接駁車|旅行團|一日團|Con-X-ion|Shuttles|TX2/], ['ferry', /渡輪/],
    ['ride', /Uber|DiDi|叫車|計程車|包車|接送/], ['walk', /步行/]
  ];
  function modesIn(text) {
    var out = [];
    MODE_WORDS.forEach(function (p) { if (p[1].test(text)) out.push(p[0]); });
    return out;
  }

  /* ---------- hero ---------- */
  function renderHero() {
    $('#hero-art').innerHTML = ILLOS.hero +
      '<div class="hero-stamps" aria-hidden="true"><span class="hs hs1" data-color="coral">' + stampFor(2) + '</span>' +
      '<span class="hs hs2" data-color="water">' + stampFor(12) + '</span></div>' +
      (ILLOS.sprite ? '<span class="px-walker" aria-hidden="true"><span class="px-face">' + ILLOS.sprite + '</span></span>' : '');
    pixelate();
    $('#route').innerHTML = TRIP.route.map(function (r) {
      return '<li data-color="' + r.color + '"><span class="route-stop" style="background:var(--c)">' + esc(r.code) + ' ' + esc(r.name) + '<small>' + esc(r.note) + '</small></span></li>';
    }).join('');
  }

  var tripStart = new Date(TRIP.departure).getTime();
  var tripEnd = new Date(TRIP.tripEnd).getTime();
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function tickCountdown() {
    var el = $('#countdown'), now = Date.now();
    if (now < tripStart) {
      var s = Math.floor((tripStart - now) / 1000);
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      if (!el.firstChild || !el.querySelector('.countdown-boxes')) {
        el.innerHTML = '<p class="countdown-label">距離 CI51 起飛還有</p><div class="countdown-boxes">' +
          '<div class="cd-box"><b data-k="d"></b><span>天</span></div><div class="cd-box"><b data-k="h"></b><span>時</span></div>' +
          '<div class="cd-box"><b data-k="m"></b><span>分</span></div><div class="cd-box"><b data-k="s"></b><span>秒</span></div></div>';
      }
      el.querySelector('[data-k="d"]').textContent = d;
      el.querySelector('[data-k="h"]').textContent = pad(h);
      el.querySelector('[data-k="m"]').textContent = pad(m);
      el.querySelector('[data-k="s"]').textContent = pad(sec);
      el.setAttribute('aria-label', '距離出發還有 ' + d + ' 天 ' + h + ' 小時 ' + m + ' 分');
    } else if (now < tripEnd) {
      var n = currentTripDay() || 14;
      el.innerHTML = '<div class="countdown-live">旅程進行中！今天是 <strong>Day ' + n + '</strong>，祝玩得開心。</div>';
    } else {
      el.innerHTML = '<div class="countdown-live">旅程結束，歡迎回家！</div>';
    }
  }
  function currentTripDay() {
    var start = new Date(TRIP.startDate + 'T00:00:00');
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var n = Math.round((today - start) / 86400000) + 1;
    return n >= 1 && n <= DAYS.length ? n : 0;
  }

  /* ---------- flights ---------- */
  function renderFlights() {
    $('#flight-list').innerHTML = TRIP.flights.map(function (f) {
      var opts = f.options ? '<div class="fl-options">' + f.options.map(function (o) {
        return '<a class="fl-option" href="' + esc(o.u) + '" target="_blank" rel="noopener noreferrer"><b>' + esc(o.name) + '</b><span>' + esc(o.note) + '</span></a>';
      }).join('') + '</div>' : '';
      return '<article class="flight" data-color="' + f.color + '">' +
        '<div class="flight-top"><h3 class="flight-kind">' + esc(f.kind) + '・' + esc(f.airline) + '</h3><span class="flight-code">' + esc(f.code) + '</span></div>' +
        '<div class="flight-body"><p class="flight-date">' + esc(f.date) + '</p>' +
        '<div class="flight-route">' +
        '<div class="fl-end"><span class="fl-code">' + esc(f.from.code) + '</span><span class="fl-city">' + esc(f.from.city) + '</span><span class="fl-time">' + esc(f.from.time) + '</span></div>' +
        '<div class="fl-mid">' + ILLOS.planeSmall + '<span>' + esc(f.dur) + '</span></div>' +
        '<div class="fl-end"><span class="fl-code">' + esc(f.to.code) + '</span><span class="fl-city">' + esc(f.to.city) + '</span><span class="fl-time">' + esc(f.to.time) + (f.to.plus ? '<sup>' + esc(f.to.plus) + '</sup>' : '') + '</span></div>' +
        '</div>' + opts + '</div>' +
        '<div class="fl-tear"></div>' +
        '<div class="fl-foot"><ul>' + f.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
        '<div class="fl-links">' + (f.links || []).map(function (l) { return ext(l.u, l.l); }).join('') + '</div></div>' +
        '</article>';
    }).join('');
  }

  function renderTransit() {
    $('#transit-list').innerHTML = TRIP.transit.map(function (t) {
      return '<article class="transit" data-color="' + t.color + '"><div class="stay-top"><h3>' + esc(t.title) + '</h3><span class="nights">' + esc(t.sub) + '</span></div>' +
        '<div class="stay-body"><dl class="fares">' + t.rows.map(function (r) {
          return '<div class="fare"><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
        }).join('') + '</dl>' +
        '<ul class="fare-tips">' + t.tips.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="links">' + t.links.map(function (l) { return ext(l.u, l.l); }).join('') + '</div></div></article>';
    }).join('');
  }

  /* ---------- itinerary ---------- */
  var current = 1;

  function renderLegend() {
    var order = ['walk', 'ferry', 'rail', 'bus', 'car', 'ride', 'flight', 'cable'];
    $('#legend').innerHTML = order.map(function (m) { return tag(m); }).join('') +
      '<li class="must">' + ICONS.star + '必去</li>';
  }

  function renderTabs() {
    var today = currentTripDay();
    $('#day-tabs').innerHTML = DAYS.map(function (d) {
      return '<button class="tab' + (d.n === today ? ' is-today' : '') + '" type="button" role="tab" id="tab-' + d.n + '" data-day="' + d.n + '" data-color="' + d.color + '" aria-selected="false" aria-controls="day-panel" tabindex="-1" aria-label="Day ' + d.n + '，' + d.md + '（' + d.wd + '），' + esc(d.area) + '">' +
        '<span class="t-day">D' + d.n + '・' + d.wd + '</span><span class="t-md">' + d.md + '</span><span class="t-dot"></span></button>';
    }).join('');
  }

  function moveHTML(text) {
    var parts = text.split(/(?=[①②③④⑤])/);
    if (parts.length < 2) return '<p class="move-text">' + esc(text) + '</p>';
    var intro = parts.shift();
    return (intro.trim() ? '<p class="move-intro">' + esc(intro.trim()) + '</p>' : '') +
      '<ol class="move-options">' + parts.map(function (p) {
        var ms = modesIn(p);
        return '<li>' + (ms.length ? '<ul class="tags">' + ms.map(function (m) { return tag(m); }).join('') + '</ul>' : '') + esc(p.trim()) + '</li>';
      }).join('') + '</ol>';
  }

  function dayHTML(d) {
    var prev = DAYS[d.n - 2], next = DAYS[d.n];
    var stops = d.stops.map(function (s) {
      return '<li class="stop' + (s.must ? ' is-must' : '') + '"><span class="node" aria-hidden="true"></span>' +
        '<p class="stop-time">' + esc(s.time) + '</p>' +
        '<div class="stop-card"><div class="stop-top"><h5>' + esc(s.title) + '</h5>' + (s.must ? '<span class="must">' + ICONS.star + '必去</span>' : '') + '</div>' +
        (s.tags.length ? '<ul class="tags" aria-label="交通方式">' + s.tags.map(function (t) { return tag(t.m, t.t); }).join('') + '</ul>' : '') +
        '<p>' + esc(s.desc) + '</p>' +
        (s.links.length ? '<div class="links">' + s.links.map(function (l) { return ext(l.u, l.l); }).join('') + '</div>' : '') +
        '</div></li>';
    }).join('');

    var meals = d.meals.map(function (m) {
      return '<div class="meal"><span class="meal-tag">' + esc(m.tag) + '</span><h5>' + esc(m.name) + '</h5><p>' + esc(m.desc) + '</p>' +
        (m.links.length ? '<div class="links">' + m.links.map(function (l) { return ext(l.u, l.l); }).join('') + '</div>' : '') + '</div>';
    }).join('');

    var overnight = d.overnight ? '<details class="card overnight"><summary>想慢一點？藍山兩天一夜替代版</summary>' +
      d.overnight.paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '<div class="links">' + d.overnight.links.map(function (l) { return ext(l.u, l.l); }).join('') + '</div></details>' : '';

    var reads = d.reads.length ? '<details class="card"><summary>延伸閱讀（2025–2026）</summary>' +
      '<p class="read-note">日期為來源頁面顯示日期，遊記、短評與官方攻略分開標示；多數為英文。</p>' +
      d.reads.map(function (r) {
        return '<div class="read"><p class="read-meta"><time>' + esc(r.date) + '</time><span>' + esc(r.type) + '</span></p>' +
          '<h5>' + esc(r.title) + '</h5><p>' + esc(r.note) + '</p><div class="links">' + ext(r.url, '閱讀來源') + '</div></div>';
      }).join('') + '</details>' : '';

    var official = d.official.length ? '<details class="card"><summary>官方資訊與預約</summary><div class="official-links">' +
      d.official.map(function (l) { return ext(l.u, l.l); }).join('') + '</div></details>' : '';

    return '<article class="day" data-color="' + d.color + '" aria-labelledby="day-title">' +
      '<header class="day-hero"><div class="day-illo">' + (ILLOS[d.illo] || '') + '<span class="day-stamp" aria-hidden="true">' + stampFor(d.n) + '</span></div><div>' +
      '<p class="day-kicker"><span class="day-no">DAY ' + pad(d.n) + '</span><span>' + d.md + '（' + d.wd + '）</span><span class="area-chip">' + esc(d.place) + '</span></p>' +
      '<h3 class="day-title" id="day-title">' + esc(d.title) + '</h3>' +
      '<p class="day-pace">' + esc(d.pace) + '</p>' +
      '<p class="day-lead">' + esc(d.lead) + '</p>' +
      '<span class="stay-chip">' + ICONS.bed + '今晚：' + esc(d.stay) + '</span>' +
      '</div></header>' +
      '<div class="mission">' + ILLOS.mission + '<div><span class="mission-label">六歲小任務</span><p>' + esc(d.mission) + '</p></div></div>' +
      '<h4 class="block-title">今天的路線</h4><ol class="timeline">' + stops + '</ol>' +
      '<section class="card meals"><h4>' + ICONS.food + '今天吃什麼</h4><p class="read-note">早餐以飯店或附近簡餐為主，以下依體力與營業時間擇一。</p>' + meals + '</section>' +
      '<section class="card move"><h4>' + ICONS.road + '交通怎麼走</h4>' + moveHTML(d.move) +
      '<div class="planb"><span class="planb-label">累了或下雨</span><p>' + esc(d.planb) + '</p></div></section>' +
      overnight + reads + official +
      '<nav class="day-nav" aria-label="切換前後一天">' +
      (prev ? '<button class="btn" type="button" data-go="' + prev.n + '">← D' + prev.n + ' ' + prev.md + '</button>' : '') +
      (next ? '<button class="btn btn-primary" type="button" data-go="' + next.n + '">D' + next.n + ' ' + next.md + ' →</button>' : '') +
      '</nav></article>';
  }

  function selectDay(n, opts) {
    opts = opts || {};
    n = Math.max(1, Math.min(DAYS.length, n));
    current = n;
    var panel = $('#day-panel');
    panel.innerHTML = dayHTML(DAYS[n - 1]);
    panel.setAttribute('aria-labelledby', 'tab-' + n);

    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
      var on = Number(t.getAttribute('data-day')) === n;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      t.classList.remove('bounce');
      if (on && opts.animate) { void t.offsetWidth; t.classList.add('bounce'); }
      if (on) {
        var bar = $('#day-tabs');
        var left = t.offsetLeft - (bar.clientWidth - t.offsetWidth) / 2;
        bar.scrollTo({ left: left, behavior: reduced() ? 'auto' : 'smooth' });
        if (opts.focusTab) t.focus({ preventScroll: true });
      }
    });

    if (opts.animate) {
      panel.classList.remove('pop'); void panel.offsetWidth; panel.classList.add('pop');
    }
    if (opts.scroll) {
      var covered = $('.topbar').offsetHeight + $('#itinerary .day-tabs-wrap').offsetHeight;
      var top = panel.getBoundingClientRect().top;
      if (top < covered || top > window.innerHeight * .7) {
        window.scrollTo({ top: window.scrollY + top - covered - 4, behavior: reduced() ? 'auto' : 'smooth' });
      }
    }
    pixelate();
    if (opts.hash !== false) history.replaceState(null, '', '#day-' + n);
    store.set('aus-day', String(n));
    collectStamp(n);
  }

  /* 護照集章：打開過的那一天就蓋一枚章，記在這台裝置 */
  var STAMP_KEY = 'aus-stamps';
  function loadStamps() {
    try { var a = JSON.parse(store.get(STAMP_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  function collectStamp(n) {
    var got = loadStamps();
    if (got.indexOf(n) < 0) { got.push(n); store.set(STAMP_KEY, JSON.stringify(got)); }
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
      t.classList.toggle('stamped', got.indexOf(Number(t.getAttribute('data-day'))) >= 0);
    });
    $('#stamp-count').textContent = '護照集章 ' + got.length + '／' + DAYS.length + (got.length === DAYS.length ? '，全部集滿了！' : '，點開每一天就蓋一枚章');
  }

  function bindItinerary() {
    $('#day-tabs').addEventListener('click', function (e) {
      var t = e.target.closest('.tab');
      if (t) selectDay(Number(t.getAttribute('data-day')), { animate: true, scroll: true });
    });
    $('#day-tabs').addEventListener('keydown', function (e) {
      var map = { ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 };
      if (!(e.key in map)) return;
      e.preventDefault();
      var n = e.key === 'Home' ? 1 : e.key === 'End' ? DAYS.length : current + map[e.key];
      if (n >= 1 && n <= DAYS.length) selectDay(n, { animate: true, focusTab: true, scroll: true });
    });
    $('#day-panel').addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b) selectDay(Number(b.getAttribute('data-go')), { animate: true, scroll: true });
    });

    var sx = 0, sy = 0, tracking = false;
    var panel = $('#day-panel');
    panel.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1 || e.target.closest('a,button,summary')) { tracking = false; return; }
      tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    panel.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 70 && Math.abs(dy) < 45) {
        var n = current + (dx < 0 ? 1 : -1);
        if (n >= 1 && n <= DAYS.length) selectDay(n, { animate: true, scroll: true });
      }
    }, { passive: true });

    window.addEventListener('hashchange', function () {
      var m = location.hash.match(/^#day-(\d+)$/);
      if (m) {
        selectDay(Number(m[1]), { animate: true, hash: false });
        $('#itinerary').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
      }
    });
  }

  function initialDay() {
    var m = location.hash.match(/^#day-(\d+)$/);
    if (m) return { n: Number(m[1]), jump: true };
    var today = currentTripDay();
    if (today) return { n: today };
    var saved = Number(store.get('aus-day'));
    return { n: saved >= 1 && saved <= DAYS.length ? saved : 1 };
  }

  /* ---------- todo ---------- */
  var TODO_KEY = 'aus-todo-v1';
  function loadTodo() { try { return JSON.parse(store.get(TODO_KEY) || '{}'); } catch (e) { return {}; } }
  function renderTodos() {
    var done = loadTodo();
    $('#todo-list').innerHTML = TRIP.todos.map(function (g, gi) {
      return '<section class="todo-group" data-color="' + ['coral', 'water', 'yellow', 'green', 'coral'][gi % 5] + '"><h3>' + esc(g.group) + '<small>' + esc(g.when) + '</small></h3>' +
        g.items.map(function (it) {
          var id = 'todo-' + it.id;
          return '<label class="todo-item" for="' + id + '"><input type="checkbox" id="' + id + '" data-id="' + esc(it.id) + '"' + (done[it.id] ? ' checked' : '') + '>' +
            '<span class="box">' + ICONS.check + '</span><span class="todo-text"><span class="todo-t">' + esc(it.t) + '</span>' +
            (it.note ? '<span class="todo-note">' + esc(it.note) + '</span>' : '') +
            (it.u ? '<a class="todo-link" href="' + esc(it.u) + '" target="_blank" rel="noopener noreferrer">' + esc(it.l || '連結') + ' ↗</a>' : '') +
            '</span></label>';
        }).join('') + '</section>';
    }).join('');
    updateProgress();
  }
  function updateProgress() {
    var boxes = document.querySelectorAll('#todo-list input[type="checkbox"]');
    var n = 0;
    Array.prototype.forEach.call(boxes, function (b) { if (b.checked) n++; });
    $('#progress-text').textContent = '已完成 ' + n + '／' + boxes.length + (n === boxes.length && n ? '，準備好出發了！' : '');
    $('#progress-fill').style.width = (boxes.length ? Math.round(n / boxes.length * 100) : 0) + '%';
  }
  function bindTodos() {
    $('#todo-list').addEventListener('change', function (e) {
      var b = e.target;
      if (!b.matches('input[type="checkbox"]')) return;
      var done = loadTodo();
      if (b.checked) done[b.getAttribute('data-id')] = 1; else delete done[b.getAttribute('data-id')];
      var item = b.closest('.todo-item');
      item.classList.remove('just');
      if (b.checked) { void item.offsetWidth; item.classList.add('just'); }
      store.set(TODO_KEY, JSON.stringify(done));
      updateProgress();
    });
    $('#todo-reset').addEventListener('click', function () {
      if (!window.confirm('確定要清除所有勾選嗎？')) return;
      store.set(TODO_KEY, '{}');
      renderTodos();
    });
  }
  function renderNotes() {
    $('#notes').innerHTML = TRIP.notes.map(function (n) {
      return '<details class="card note"><summary>' + esc(n.title) + '</summary><p>' + esc(n.text) + '</p>' +
        '<div class="official-links">' + n.links.map(function (l) { return ext(l.u, l.l); }).join('') + '</div></details>';
    }).join('');
  }

  /* ---------- stays ---------- */
  function renderStays() {
    $('#stay-list').innerHTML = TRIP.stays.map(function (s) {
      return '<article class="stay" data-color="' + s.color + '"><div class="stay-top"><h3>' + esc(s.city) + '</h3><span class="nights">' + s.nights + ' 晚</span></div>' +
        '<div class="stay-body"><p class="stay-dates">' + esc(s.dates) + '</p><p class="stay-area">' + esc(s.area) + '</p>' +
        '<span class="stay-status">' + esc(s.status) + '</span>' +
        s.options.map(function (o) {
          return '<div class="stay-option"><h4>' + esc(o.name) + '</h4><p>' + esc(o.type) + '</p><div class="links">' + ext(o.map, '地圖') + (o.site ? ext(o.site, '官網') : '') + '</div></div>';
        }).join('') +
        (s.note ? '<p class="stay-note">' + esc(s.note) + '</p>' : '') + '</div></article>';
    }).join('');
  }

  function renderFooter() {
    $('#footer').innerHTML = TRIP.footer.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '<p>版本 ' + esc(TRIP.version) + '</p>';
  }

  /* ---------- nav, settings ---------- */
  function bindNav() {
    var links = document.querySelectorAll('.nav-list .nav-link');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Array.prototype.forEach.call(links, function (a) {
            a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false');
          });
        });
      }, { rootMargin: '-35% 0px -60% 0px' });
      ['home', 'flights', 'itinerary', 'todo', 'stays'].forEach(function (id) { io.observe(document.getElementById(id)); });
    }

    var btn = $('#settings-btn'), panel = $('#settings-panel');
    function close() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = panel.hidden;
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { close(); btn.focus(); } });

    var picks = document.querySelectorAll('input[name="theme"]');
    Array.prototype.forEach.call(picks, function (r) {
      r.checked = r.value === theme();
      r.addEventListener('change', function () { if (r.checked) switchTheme(r.value); });
    });

    var big = $('#big-toggle'), motion = $('#motion-toggle');
    function sync() {
      big.setAttribute('aria-checked', root.classList.contains('big') ? 'true' : 'false');
      motion.setAttribute('aria-checked', reduced() ? 'true' : 'false');
    }
    big.addEventListener('click', function () {
      var on = !root.classList.contains('big');
      root.classList.toggle('big', on);
      store.set('aus-big', on ? '1' : '0');
      sync();
    });
    motion.addEventListener('click', function () {
      var r = !reduced();
      root.setAttribute('data-motion', r ? 'reduce' : 'full');
      store.set('aus-motion', r ? 'reduce' : 'full');
      sync();
    });
    if (window.matchMedia) {
      var mq = matchMedia('(prefers-reduced-motion: reduce)');
      var onChange = function () {
        if (!store.get('aus-motion')) { root.setAttribute('data-motion', mq.matches ? 'reduce' : 'full'); sync(); }
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    }
    sync();
  }

  function switchTheme(t) {
    root.setAttribute('data-theme', THEMES[t] ? t : 'book');
    store.set('aus-theme', theme());
    if (window.loadThemeFonts) window.loadThemeFonts(theme());
    setThemeColor();
    var art = window.buildArt(theme());
    ILLOS = art.ILLOS; ICONS = art.ICONS;
    renderHero();
    renderFlights();
    renderLegend();
    selectDay(current, { animate: true, hash: false });
    renderTodos();
  }

  /* 插圖離開畫面就暫停動畫，手機比較省電 */
  function bindPause() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('paused', !en.isIntersecting); });
    });
    io.observe($('#hero-art'));
    io.observe($('#day-panel'));
  }

  // 首頁大標拆成單字，蠟筆風會輪流上色；讀屏仍讀整句
  function splitTitle() {
    var h = $('#hero-title');
    h.setAttribute('aria-label', h.textContent);
    h.innerHTML = h.innerHTML.split(/(<br>)/).map(function (part) {
      return part === '<br>' ? part : part.replace(/./g, function (c) { return '<span class="ch" aria-hidden="true">' + c + '</span>'; });
    }).join('');
  }

  /* ---------- boot ---------- */
  setThemeColor();
  splitTitle();
  renderHero();
  tickCountdown();
  setInterval(tickCountdown, 1000);
  renderFlights();
  renderTransit();
  renderLegend();
  renderTabs();
  bindItinerary();
  var start = initialDay();
  selectDay(start.n, { hash: !!start.jump });
  if (start.jump) document.getElementById('itinerary').scrollIntoView();
  if (currentTripDay()) $('#hero-day-link').textContent = '看今天的行程';
  renderTodos();
  bindTodos();
  renderNotes();
  renderStays();
  renderFooter();
  bindNav();
  bindPause();
})();
