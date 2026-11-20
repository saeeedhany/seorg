(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };
  var txt = $("#rt-txt");
  var urlIn = $("#rt-url");
  var ua = $("#rt-ua");
  var custom = $("#rt-custom");
  var customWrap = $("[data-custom]");
  var verdict = $("[data-verdict]");
  var linesOut = $("[data-lines]");
  var msgs = $("[data-msgs]");

  function parse(text) {
    var groups = [];
    var sitemaps = [];
    var problems = [];
    var cur = null;
    var lastUA = false;
    text.split(/\r\n|\r|\n/).forEach(function (raw, i) {
      var line = raw.replace(/#.*$/, "").trim();
      if (!line) return;
      var m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
      if (!m) { problems.push("Line " + (i + 1) + " is not a valid directive and is ignored."); return; }
      var key = m[1].toLowerCase();
      var val = m[2].trim();
      if (key === "user-agent") {
        if (!cur || !lastUA) { cur = { agents: [], rules: [] }; groups.push(cur); }
        cur.agents.push({ name: val.toLowerCase(), line: i + 1 });
        lastUA = true;
      } else if (key === "allow" || key === "disallow") {
        lastUA = false;
        if (!cur) { problems.push("Line " + (i + 1) + " has a rule before any User-agent line, so no crawler follows it."); return; }
        if (val === "") return;
        cur.rules.push({ type: key, path: val, line: i + 1 });
      } else if (key === "sitemap") {
        sitemaps.push(val);
      } else {
        lastUA = false;
        if (key === "crawl-delay") problems.push("Line " + (i + 1) + ": Google ignores crawl-delay.");
        else if (key === "noindex") problems.push("Line " + (i + 1) + ": Google does not support noindex in robots.txt. Use a robots meta tag or X-Robots-Tag header.");
        else problems.push("Line " + (i + 1) + ": \"" + m[1] + "\" is not a directive Google uses.");
      }
    });
    return { groups: groups, sitemaps: sitemaps, problems: problems };
  }

  function toRegex(path) {
    var anchored = path.endsWith("$");
    var body = anchored ? path.slice(0, -1) : path;
    var re = body.split("*").map(function (p) { return p.replace(/[.+?^${}()|[\]\\]/g, "\\$&"); }).join(".*");
    return new RegExp("^" + re + (anchored ? "$" : ""));
  }

  function target(raw) {
    raw = raw.trim();
    if (!raw) return "/";
    try {
      var u = new URL(raw);
      return (u.pathname || "/") + u.search;
    } catch (e) {
      return raw.charAt(0) === "/" ? raw : "/" + raw;
    }
  }

  function agentToken() {
    if (ua.value === "custom") return (custom.value.trim() || "examplebot").toLowerCase();
    return ua.value;
  }

  function pickGroups(groups, token) {
    var best = -1;
    var chosen = [];
    var chosenName = null;
    groups.forEach(function (g) {
      g.agents.forEach(function (a) {
        var score = -1;
        if (a.name === "*") score = 0;
        else if (token === a.name || token.indexOf(a.name) === 0) score = a.name.length;
        if (score > best) { best = score; chosenName = a.name; }
      });
    });
    if (best < 0) return { name: null, groups: [] };
    groups.forEach(function (g) {
      if (g.agents.some(function (a) { return a.name === chosenName; })) chosen.push(g);
    });
    return { name: chosenName, groups: chosen };
  }

  function add(kind, text) {
    var li = document.createElement("li");
    li.className = kind;
    var t = document.createElement("span");
    t.textContent = text;
    li.appendChild(t);
    msgs.appendChild(li);
  }

  function render() {
    customWrap.hidden = ua.value !== "custom";
    var parsed = parse(txt.value);
    var path = target(urlIn.value);
    var token = agentToken();
    var pick = pickGroups(parsed.groups, token);
    var hit = null;

    if (path === "/robots.txt") {
      hit = { type: "allow", path: "/robots.txt", line: 0, special: true };
    } else {
      pick.groups.forEach(function (g) {
        g.rules.forEach(function (r) {
          if (!toRegex(r.path).test(path)) return;
          if (!hit || r.path.length > hit.path.length || (r.path.length === hit.path.length && r.type === "allow" && hit.type === "disallow")) hit = r;
        });
      });
    }

    var allowed = !hit || hit.type === "allow";
    verdict.className = "verdict " + (allowed ? "allowed" : "blocked");
    verdict.innerHTML = "";
    var dot = document.createElement("span");
    dot.className = "dot";
    var body = document.createElement("span");
    body.textContent = allowed ? "Allowed to crawl" : "Blocked from crawling";
    var small = document.createElement("small");
    if (hit && hit.special) small.textContent = "robots.txt itself is always allowed.";
    else if (hit) small.textContent = "Decided by line " + hit.line + ": " + (hit.type === "allow" ? "Allow" : "Disallow") + ": " + hit.path;
    else if (!pick.name) small.textContent = "No group applies to " + token + ", so everything is allowed.";
    else small.textContent = "No rule in the matching group matches " + path + ".";
    body.appendChild(small);
    verdict.appendChild(dot);
    verdict.appendChild(body);

    var groupLines = {};
    pick.groups.forEach(function (g) { g.agents.forEach(function (a) { if (a.name === pick.name) groupLines[a.line] = true; }); });
    linesOut.innerHTML = "";
    txt.value.split(/\r\n|\r|\n/).forEach(function (raw, i) {
      var li = document.createElement("li");
      var n = document.createElement("span");
      n.textContent = i + 1;
      var c = document.createElement("span");
      c.textContent = raw || " ";
      li.appendChild(n);
      li.appendChild(c);
      if (groupLines[i + 1]) li.classList.add("is-group");
      if (hit && hit.line === i + 1) { li.classList.add("is-hit"); if (!allowed) li.classList.add("is-block"); }
      linesOut.appendChild(li);
    });

    msgs.innerHTML = "";
    add("", "Tested path: " + path + ". Crawler token: " + token + (pick.name ? ". Group used: User-agent: " + pick.name : ". No matching group") + ".");
    if (!allowed) add("warn", "Blocking crawling does not remove a URL from results. If other pages link to it, Google can still index the URL without its content. Use noindex to keep it out of results.");
    parsed.problems.forEach(function (p) { add("warn", p); });
    if (!parsed.sitemaps.length) add("", "No Sitemap line found. Adding one helps crawlers find your sitemap.");
  }

  [txt, urlIn, ua, custom].forEach(function (el) { el.addEventListener("input", render); });
  ua.addEventListener("change", render);
  render();
})();
