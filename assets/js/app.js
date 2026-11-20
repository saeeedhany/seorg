(function () {
  "use strict";

  var base = (window.SEO_RG && window.SEO_RG.base) || "";
  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function load(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var themeBtn = $(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      var apply = function () {
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("seo-rg-theme", next); } catch (e) {}
      };
      if (!document.startViewTransition || reduce) { apply(); return; }
      var r = themeBtn.getBoundingClientRect();
      var x = r.left + r.width / 2;
      var y = r.top + r.height / 2;
      var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.classList.add("theme-switching");
      var t = document.startViewTransition(apply);
      t.ready.then(function () {
        root.animate(
          { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
          { duration: 560, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" }
        );
      });
      t.finished.finally(function () { root.classList.remove("theme-switching"); });
    });
  }

  var navBtn = $(".nav-toggle");
  var nav = $("#course-nav");
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (navBtn) navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && nav) {
      var cur = $("[aria-current]", nav) || $("a", nav);
      if (cur) setTimeout(function () { cur.focus({ preventScroll: false }); }, 50);
    }
  }
  if (navBtn) navBtn.addEventListener("click", function () { setNav(!document.body.classList.contains("nav-open")); });
  $$("[data-close-nav]").forEach(function (el) { el.addEventListener("click", function () { setNav(false); }); });

  $$("[data-ol-module]").forEach(function (m) {
    var head = $(".ol-head", m);
    head.addEventListener("click", function () {
      var open = !m.classList.contains("is-open");
      m.classList.toggle("is-open", open);
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  if (nav && matchMedia("(min-width: 960px)").matches) {
    var active = $("[aria-current]", nav);
    if (active) {
      var r = active.getBoundingClientRect();
      if (r.bottom > innerHeight - 60) nav.scrollTop = r.top - nav.getBoundingClientRect().top - 140;
    }
  }

  var PROGRESS = "seo-rg-progress";
  var done = load(PROGRESS, []);
  if (!Array.isArray(done)) done = [];
  function isDone(id) { return done.indexOf(id) !== -1; }

  var allIds = $$(".ol-lessons [data-lesson]").map(function (el) { return el.getAttribute("data-lesson"); });

  function renderProgress() {
    $$("[data-lesson]").forEach(function (el) {
      var id = el.getAttribute("data-lesson");
      if (el.classList.contains("mark-complete")) {
        el.setAttribute("aria-pressed", isDone(id) ? "true" : "false");
        var label = $("[data-label]", el);
        if (label) label.textContent = isDone(id) ? "Lesson complete" : "Mark lesson complete";
      } else {
        el.classList.toggle("is-done", isDone(id));
      }
    });

    var count = allIds.filter(isDone).length;
    var pct = allIds.length ? count / allIds.length : 0;
    var ring = $("[data-progress-ring]");
    if (ring) ring.style.strokeDashoffset = String(100 - pct * 100);
    var title = $("[data-progress-title]");
    var text = $("[data-progress-text]");
    if (title && text) {
      if (count === 0) {
        title.textContent = "Your progress";
      } else if (count === allIds.length) {
        title.textContent = "Course complete";
        text.textContent = "All " + allIds.length + " lessons done";
      } else {
        title.textContent = Math.round(pct * 100) + "% complete";
        text.textContent = count + " of " + allIds.length + " lessons done";
      }
    }

    $$("[data-ol-module]").forEach(function (m) {
      var items = $$("[data-lesson]", m);
      var n = items.filter(function (i) { return isDone(i.getAttribute("data-lesson")); }).length;
      m.classList.toggle("is-done", n === items.length && n > 0);
      var c = $("[data-ol-count]", m);
      if (c) c.textContent = n ? n + "/" + items.length : String(items.length);
    });

    $$("[data-module]").forEach(function (m) {
      var items = $$("[data-lesson]", m);
      var n = items.filter(function (i) { return isDone(i.getAttribute("data-lesson")); }).length;
      m.style.setProperty("--p", items.length ? n / items.length : 0);
      m.classList.toggle("is-done", n === items.length && n > 0);
      var p = $("[data-module-progress]", m);
      if (p) p.textContent = n === items.length ? "Complete" : n ? n + " of " + items.length + " done" : "";
    });

    var cont = $("[data-continue]");
    if (cont && count > 0 && count < allIds.length) {
      var nextId = allIds.filter(function (id) { return !isDone(id); })[0];
      var link = $('.ol-lessons [data-lesson="' + nextId + '"] a');
      if (link) {
        cont.href = link.getAttribute("href");
        $("[data-continue-title]", cont).textContent = link.textContent.trim();
        cont.classList.add("is-visible");
        var primary = $(".hero-actions .btn-primary");
        if (primary) primary.classList.remove("btn-primary");
        cont.classList.add("btn-primary");
      }
    }
  }

  function replay(el, cls) {
    if (!el || reduce) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  $$(".mark-complete").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-lesson");
      var nowDone = !isDone(id);
      if (nowDone) done.push(id);
      else done = done.filter(function (d) { return d !== id; });
      save(PROGRESS, done);
      renderProgress();
      if (nowDone) {
        replay(btn, "burst");
        replay($('.ol-lessons [data-lesson="' + id + '"] .ol-dot'), "pop");
        var next = $(".pager .next");
        if (next) next.classList.add("is-up");
      } else {
        var n2 = $(".pager .next");
        if (n2) n2.classList.remove("is-up");
      }
    });
  });
  renderProgress();

  var prose = $(".prose");
  var tocList = $("[data-toc]");
  if (prose) {
    $$("h2[id], h3[id]", prose).forEach(function (h) {
      var a = document.createElement("a");
      a.className = "heading-anchor";
      a.href = "#" + h.id;
      a.setAttribute("aria-label", "Link to this section");
      a.textContent = "#";
      h.appendChild(a);
    });
  }

  if (prose && tocList) {
    var h2s = $$("h2[id]", prose);
    var marker = $(".toc-marker", tocList);
    if (!h2s.length) tocList.parentElement.style.visibility = "hidden";
    var links = h2s.map(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.firstChild ? h.firstChild.textContent : h.textContent;
      li.appendChild(a);
      tocList.appendChild(li);
      return a;
    });
    var activeIdx = -1;
    function setActive(i) {
      if (i === activeIdx) return;
      activeIdx = i;
      links.forEach(function (l, n) { l.classList.toggle("is-active", n === i); });
      if (marker) {
        if (i < 0) { marker.style.opacity = "0"; return; }
        var l = links[i];
        marker.style.opacity = "1";
        marker.style.height = l.offsetHeight + "px";
        marker.style.transform = "translateY(" + l.offsetTop + "px)";
      }
    }
    var ticking = false;
    function onScroll() {
      ticking = false;
      var y = scrollY + 120;
      var idx = -1;
      for (var i = 0; i < h2s.length; i++) { if (h2s[i].getBoundingClientRect().top + scrollY <= y) idx = i; }
      setActive(idx);
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    addEventListener("resize", function () { activeIdx = -2; onScroll(); });
    onScroll();
  }

  $$("[data-checklist]").forEach(function (list) {
    var id = list.getAttribute("data-checklist");
    var key = "seo-rg-check-" + id;
    var state = load(key, {});
    var boxes = $$("input[type=checkbox]", list);
    var count = $("[data-check-count]", list);
    var bar = $("[data-check-bar]", list);
    var ring = $('[data-jump-ring="' + id + '"]');
    function update() {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (count) count.textContent = n + " of " + boxes.length + " done";
      var p = boxes.length ? n / boxes.length : 0;
      if (bar) bar.style.width = p * 100 + "%";
      if (ring) ring.style.strokeDashoffset = String(100 - p * 100);
    }
    boxes.forEach(function (b) {
      b.checked = !!state[b.value];
      b.addEventListener("change", function () {
        state[b.value] = b.checked;
        save(key, state);
        update();
      });
    });
    var reset = $("[data-check-reset]", list);
    if (reset) reset.addEventListener("click", function () {
      state = {};
      save(key, state);
      boxes.forEach(function (b) { b.checked = false; });
      update();
    });
    update();
  });

  var gFilter = $("[data-glossary-filter]");
  if (gFilter) {
    var terms = $$("[data-term]");
    var groups = $$("[data-letter]");
    var empty = $("[data-glossary-empty]");
    gFilter.addEventListener("input", function () {
      var q = gFilter.value.trim().toLowerCase();
      terms.forEach(function (t) { t.hidden = q && t.textContent.toLowerCase().indexOf(q) === -1; });
      var any = false;
      groups.forEach(function (g) {
        var visible = $$("[data-term]", g).some(function (t) { return !t.hidden; });
        g.hidden = !visible;
        if (visible) any = true;
        var link = $('[data-letter-link="' + g.getAttribute("data-letter") + '"]');
        if (link) link.classList.toggle("is-empty", !visible);
      });
      if (empty) empty.hidden = any;
    });
  }

  var typed = $("[data-type]");
  if (typed) {
    var intro = root.classList.contains("intro");
    try { sessionStorage.setItem("seo-rg-intro", "1"); } catch (e) {}
    if (intro) {
      var full = typed.getAttribute("data-type");
      typed.textContent = "";
      var i = 0;
      setTimeout(function step() {
        i++;
        typed.textContent = full.slice(0, i);
        if (i < full.length) setTimeout(step, 28 + Math.random() * 40);
      }, 180);
    }
  }

  var dialog = $(".search-dialog");
  if (dialog && typeof dialog.showModal === "function") {
    var input = $("input", dialog);
    var results = $(".search-results", dialog);
    var emptyBox = $("[data-search-empty]", dialog);
    var icons = {};
    var tpl = $("#icons");
    if (tpl) $$("[data-icon]", tpl.content).forEach(function (s) { icons[s.getAttribute("data-icon")] = s.innerHTML; });
    var index = null;
    var selected = -1;

    function fetchIndex() {
      if (index) return Promise.resolve(index);
      return fetch(base + "/search.json").then(function (r) { return r.json(); }).then(function (d) { index = d; return d; });
    }

    function norm(s) { return (s || "").toLowerCase(); }

    function render(q) {
      results.innerHTML = "";
      selected = -1;
      q = norm(q).trim();
      emptyBox.hidden = !!q;
      if (!q || !index) return;
      var words = q.split(/\s+/);
      var hits = index.map(function (item) {
        var title = norm(item.title), body = norm(item.text + " " + item.summary);
        var score = 0;
        for (var w = 0; w < words.length; w++) {
          var word = words[w];
          if (title.indexOf(word) === 0) score += 6;
          else if (title.indexOf(word) !== -1) score += 4;
          else if (body.indexOf(word) !== -1) score += 1;
          else return { item: item, score: 0 };
        }
        if (item.kind === "Lesson") score += 1;
        return { item: item, score: score };
      }).filter(function (h) { return h.score > 0; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 12);

      if (!hits.length) {
        var li = document.createElement("li");
        li.className = "search-empty";
        li.textContent = "Nothing matches “" + q + "”. Try a shorter word, or browse the glossary.";
        results.appendChild(li);
        return;
      }
      hits.forEach(function (h, n) {
        var li = document.createElement("li");
        li.style.animationDelay = n * 25 + "ms";
        var a = document.createElement("a");
        a.href = base + h.item.url;
        a.setAttribute("role", "option");
        a.id = "sr-" + n;
        var k = document.createElement("span");
        k.className = "kind";
        k.innerHTML = icons[h.item.kind] || "";
        var body = document.createElement("span");
        var s = document.createElement("strong");
        s.textContent = h.item.title;
        var sp = document.createElement("span");
        sp.className = "s";
        sp.textContent = h.item.kind + ". " + h.item.summary;
        body.appendChild(s);
        body.appendChild(sp);
        a.appendChild(k);
        a.appendChild(body);
        li.appendChild(a);
        results.appendChild(li);
      });
      move(1);
    }

    function move(d) {
      var opts = $$("a", results);
      if (!opts.length) return;
      selected = (selected + d + opts.length) % opts.length;
      opts.forEach(function (o, n) { o.setAttribute("aria-selected", n === selected ? "true" : "false"); });
      input.setAttribute("aria-activedescendant", opts[selected].id);
      opts[selected].scrollIntoView({ block: "nearest" });
    }

    function open() {
      setNav(false);
      if (dialog.open) return;
      dialog.showModal();
      input.value = "";
      results.innerHTML = "";
      emptyBox.hidden = false;
      input.focus();
      fetchIndex().catch(function () {
        results.innerHTML = '<li class="search-empty">Search could not load. Check your connection and try again.</li>';
      });
    }

    $$("[data-open-search]").forEach(function (b) { b.addEventListener("click", open); });
    $("[data-close-search]", dialog).addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    $$(".chips button", dialog).forEach(function (c) {
      c.addEventListener("click", function () {
        input.value = c.textContent;
        fetchIndex().then(function () { render(input.value); });
        input.focus();
      });
    });
    input.addEventListener("input", function () { fetchIndex().then(function () { render(input.value); }); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") {
        var opts = $$("a", results);
        var pick = opts[selected >= 0 ? selected : 0];
        if (pick) { e.preventDefault(); location.href = pick.href; }
      }
    });
    document.addEventListener("keydown", function (e) {
      var t = e.target;
      var typing = t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable;
      if (e.key === "/" && !dialog.open && !typing) { e.preventDefault(); open(); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) setNav(false);
    });
  }
})();
