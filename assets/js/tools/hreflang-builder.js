(function () {
  "use strict";

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var rowsBox = $("[data-rows]");
  var tpl = $("#hl-row");
  var xdef = $("#hl-default");
  var out = $("#hl-code");
  var msgs = $("[data-msgs]");
  var format = "html";
  var langNames = null;
  var regionNames = null;
  try {
    langNames = new Intl.DisplayNames(["en"], { type: "language", fallback: "none" });
    regionNames = new Intl.DisplayNames(["en"], { type: "region", fallback: "none" });
  } catch (e) {}

  var START = [
    ["en", "", "https://example.com/en/pricing/"],
    ["en", "GB", "https://example.com/uk/pricing/"],
    ["ar", "", "https://example.com/ar/pricing/"]
  ];

  function langName(code) {
    if (!/^[a-z]{2,3}$/.test(code)) return null;
    if (!langNames) return code;
    var n = langNames.of(code);
    return n && n.toLowerCase() !== code ? n : null;
  }

  function regionName(code) {
    if (!/^[A-Z]{2}$/.test(code) || code === "UK" || code === "EU" || code === "UN") return null;
    if (!regionNames) return code;
    var n = regionNames.of(code);
    return n && n !== code ? n : null;
  }

  function addRow(vals) {
    var node = tpl.content.firstElementChild.cloneNode(true);
    $("[data-lang]", node).value = vals ? vals[0] : "";
    $("[data-region]", node).value = vals ? vals[1] : "";
    $("[data-url]", node).value = vals ? vals[2] : "";
    node.addEventListener("input", render);
    $("[data-remove]", node).addEventListener("click", function () {
      if (rowsBox.children.length > 1) { node.remove(); render(); }
    });
    rowsBox.appendChild(node);
    return node;
  }

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

  function add(kind, text) {
    var li = document.createElement("li");
    li.className = kind;
    var s = document.createElement("span");
    s.textContent = text;
    li.appendChild(s);
    msgs.appendChild(li);
  }

  function render() {
    var warn = [];
    var info = [];
    var entries = [];
    var seen = {};
    Array.prototype.forEach.call(rowsBox.children, function (row, i) {
      var langEl = $("[data-lang]", row);
      var regEl = $("[data-region]", row);
      var lang = langEl.value.trim().toLowerCase();
      var reg = regEl.value.trim().toUpperCase();
      var url = $("[data-url]", row).value.trim();
      var ln = $("[data-lang-name]", row);
      var rn = $("[data-region-name]", row);
      var lname = lang ? langName(lang) : null;
      var rname = reg ? regionName(reg) : null;
      ln.textContent = lang ? (lname || "Not a valid code") : "";
      ln.className = lang && !lname ? "bad" : "";
      rn.textContent = reg ? (rname || (reg === "UK" ? "Use GB" : "Not a valid code")) : "";
      rn.className = reg && !rname ? "bad" : "";
      if (!lang && !url) return;
      var n = i + 1;
      if (!lname) warn.push("Version " + n + ": the language must be a valid ISO 639-1 code, such as en, ar or de.");
      if (reg && !rname) warn.push(reg === "UK" ? "Version " + n + ": the code for the United Kingdom is GB, not UK." : "Version " + n + ": the country must be a valid ISO 3166-1 alpha-2 code, such as EG, GB or US.");
      if (!/^https?:\/\//i.test(url)) warn.push("Version " + n + ": use a full URL, starting with https://.");
      var code = lang + (reg ? "-" + reg : "");
      if (seen[code]) warn.push("The code " + code + " is used twice. Each language and country pair needs exactly one URL.");
      seen[code] = true;
      entries.push({ code: code, url: url });
    });

    var urls = entries.map(function (e) { return e.url; });
    urls.forEach(function (u, i) { if (u && urls.indexOf(u) !== i) warn.push("The URL " + u + " is listed twice. Each version needs its own URL."); });
    entries.forEach(function (e) {
      if (e.code.indexOf("-") > 0 && !seen[e.code.split("-")[0]]) info.push("You target " + e.code + " but have no version for " + e.code.split("-")[0] + " alone. Consider adding one for speakers of that language in other countries.");
    });

    var x = xdef.value.trim();
    var all = entries.slice();
    if (x) all.push({ code: "x-default", url: x });
    else info.push("Add an x-default page, such as a language selector or your main version, for searchers who match none of these.");

    if (format === "html") {
      out.textContent = all.map(function (e) { return '<link rel="alternate" hreflang="' + esc(e.code) + '" href="' + esc(e.url) + '">'; }).join("\n");
      info.unshift("Put the same set of tags in the head of every version listed, including the page itself.");
    } else {
      var body = entries.map(function (e) {
        return "  <url>\n    <loc>" + esc(e.url) + "</loc>\n" + all.map(function (a) {
          return '    <xhtml:link rel="alternate" hreflang="' + esc(a.code) + '" href="' + esc(a.url) + '"/>';
        }).join("\n") + "\n  </url>";
      }).join("\n");
      out.textContent = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + body + "\n</urlset>";
      info.unshift("Each version gets its own url entry that lists every version, including itself.");
    }

    msgs.innerHTML = "";
    warn.forEach(function (m) { add("warn", m); });
    info.forEach(function (m) { add("", m); });
    if (!warn.length && entries.length > 1) add("ok", "The codes and URLs look valid. Check that every URL returns 200 and is the canonical version.");
    if (entries.length < 2) add("warn", "hreflang only makes sense with at least two versions of the page.");
  }

  START.forEach(addRow);
  $("[data-add]").addEventListener("click", function () { var r = addRow(); $("[data-lang]", r).focus(); render(); });
  xdef.addEventListener("input", render);
  document.querySelectorAll("[data-format]").forEach(function (b) {
    b.addEventListener("click", function () {
      format = b.getAttribute("data-format");
      document.querySelectorAll("[data-format]").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      render();
    });
  });
  render();
})();
