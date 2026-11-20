(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };
  var title = $("#sp-title");
  var desc = $("#sp-desc");
  var url = $("#sp-url");
  var site = $("#sp-site");
  var snip = $("[data-snip]");
  var msgs = $("[data-msgs]");
  var device = "desktop";
  var ctx = document.createElement("canvas").getContext("2d");
  var FONT = "Arial, \"Liberation Sans\", Helvetica, sans-serif";

  var SPEC = {
    desktop: { width: 600, title: { size: 20, lines: 1 }, desc: { size: 14, lines: 2 } },
    mobile: { width: 340, title: { size: 18, lines: 2 }, desc: { size: 14, lines: 3 } }
  };

  function measure(text, size) {
    ctx.font = size + "px " + FONT;
    return ctx.measureText(text).width;
  }

  function wrap(text, size, width, maxLines) {
    var words = text.trim().split(/\s+/).filter(Boolean);
    var lines = [];
    var line = "";
    var cut = false;
    for (var i = 0; i < words.length; i++) {
      var next = line ? line + " " + words[i] : words[i];
      if (measure(next, size) <= width || !line) {
        line = next;
      } else {
        lines.push(line);
        line = words[i];
        if (lines.length === maxLines) { cut = true; break; }
      }
    }
    if (!cut && line) lines.push(line);
    if (lines.length > maxLines) { lines = lines.slice(0, maxLines); cut = true; }
    if (cut) {
      var last = lines[lines.length - 1];
      while (last && measure(last + " …", size) > width) {
        last = last.replace(/\s*\S+$/, "");
      }
      lines[lines.length - 1] = (last || "") + " …";
    }
    return { text: lines.join("\n"), cut: cut };
  }

  function breadcrumb(raw) {
    try {
      var u = new URL(raw);
      var parts = u.pathname.split("/").filter(Boolean).map(function (p) {
        try { return decodeURIComponent(p); } catch (e) { return p; }
      });
      return [u.protocol + "//" + u.hostname].concat(parts).join(" › ");
    } catch (e) {
      return raw;
    }
  }

  function add(kind, text) {
    var li = document.createElement("li");
    li.className = kind;
    var t = document.createElement("span");
    t.textContent = text;
    li.appendChild(t);
    msgs.appendChild(li);
  }

  function bar(name, px, limit) {
    var b = document.querySelector('[data-bar="' + name + '"]');
    var p = document.querySelector('[data-px="' + name + '"]');
    b.style.width = Math.min(100, (px / limit) * 100) + "%";
    b.classList.toggle("is-over", px > limit);
    p.textContent = Math.round(px) + " / " + limit + " px";
  }

  function render() {
    var spec = SPEC[device];
    var t = title.value.trim();
    var d = desc.value.trim();
    snip.style.width = spec.width + 34 + "px";
    snip.classList.toggle("is-mobile", device === "mobile");
    fitStage();

    var tw = wrap(t || "Untitled page", spec.title.size, spec.width, spec.title.lines);
    var dw = wrap(d, spec.desc.size, spec.width, spec.desc.lines);
    $("[data-title]").textContent = tw.text;
    $("[data-desc]").textContent = d ? dw.text : "Google will write a snippet from the page text.";
    $("[data-desc]").style.fontStyle = d ? "" : "italic";
    $("[data-name]").textContent = site.value.trim() || "Site name";
    $("[data-url]").textContent = breadcrumb(url.value.trim());
    $("[data-fav]").textContent = (site.value.trim() || "S").charAt(0).toUpperCase();

    var tpx = measure(t, spec.title.size);
    var dpx = measure(d, spec.desc.size);
    var tLimit = spec.width * spec.title.lines;
    var dLimit = spec.width * spec.desc.lines;
    bar("title", tpx, tLimit);
    bar("desc", dpx, dLimit);

    var th = document.querySelector('[data-hint="title"]');
    var dh = document.querySelector('[data-hint="desc"]');
    th.textContent = t.length + " characters";
    dh.textContent = d.length + " characters";
    th.classList.toggle("is-over", tw.cut);
    dh.classList.toggle("is-over", dw.cut);

    msgs.innerHTML = "";
    if (!t) add("warn", "Add a title. Without one, Google builds a title link from headings or other text on the page.");
    else if (tw.cut) add("warn", "The title is likely to be cut off on " + device + ". Keep the main topic in the first part, so the visible part still makes sense.");
    else add("ok", "The title should show in full on " + device + ".");
    if (t && t.length < 25) add("", "This title is short. That is fine if it is clear, but there may be room for a useful detail.");
    if (/(\b\w+\b)(?:.*\b\1\b){2,}/i.test(t)) add("warn", "A word repeats three or more times in the title. Repetition looks like keyword stuffing and makes a rewrite more likely.");
    if (!d) add("", "There is no meta description. Google will write a snippet from the page, which is often fine for long tail searches.");
    else if (dw.cut) add("warn", "The description is likely to be cut off on " + device + ". Put the most useful detail first.");
    else add("ok", "The description should show in full on " + device + ".");
  }

  function fitStage() {
    var stage = snip.parentElement;
    var cs = getComputedStyle(stage);
    var room = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var need = SPEC[device].width + 34;
    snip.style.zoom = room < need ? String(room / need) : "";
  }

  addEventListener("resize", fitStage);
  document.querySelectorAll("[data-device]").forEach(function (b) {
    b.addEventListener("click", function () {
      device = b.getAttribute("data-device");
      document.querySelectorAll("[data-device]").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      render();
    });
  });
  [title, desc, url, site].forEach(function (el) { el.addEventListener("input", render); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  render();
})();
