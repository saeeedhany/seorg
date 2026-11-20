(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };
  var typeSel = $("#sd-type");
  var box = $("[data-fields]");
  var out = $("#sd-code");
  var msgs = $("[data-msgs]");

  var TYPES = {
    Article: [
      ["headline", "Headline", "text", "How to repot a snake plant", "required"],
      ["image", "Image URL", "url", "https://example.com/images/snake-plant.jpg", "recommended"],
      ["datePublished", "Date published", "date", "2025-03-14", "recommended"],
      ["dateModified", "Date modified", "date", "", ""],
      ["authorName", "Author name", "text", "Layla Hassan", "recommended"],
      ["authorUrl", "Author page URL", "url", "https://example.com/authors/layla-hassan/", ""]
    ],
    Product: [
      ["name", "Product name", "text", "Trail Runner 2 waterproof shoe", "required"],
      ["image", "Image URL", "url", "https://example.com/images/trail-runner-2.jpg", "recommended"],
      ["description", "Description", "textarea", "Lightweight waterproof trail running shoe with a grippy outsole.", ""],
      ["sku", "SKU", "text", "TR2-W-38", ""],
      ["brand", "Brand", "text", "TrailBrand", ""],
      ["price", "Price", "number", "129.00", "offer"],
      ["currency", "Currency code", "text", "USD", "offer"],
      ["availability", "Availability", "select:InStock,OutOfStock,PreOrder,BackOrder,Discontinued", "InStock", "offer"],
      ["ratingValue", "Average rating", "number", "", "rating"],
      ["reviewCount", "Number of reviews", "number", "", "rating"]
    ],
    LocalBusiness: [
      ["name", "Business name", "text", "Leaf & Root Garden Shop", "required"],
      ["image", "Photo URL", "url", "https://example.com/images/shop-front.jpg", "recommended"],
      ["url", "Website", "url", "https://example.com/", "recommended"],
      ["telephone", "Phone", "tel", "+20 3 555 0123", "recommended"],
      ["streetAddress", "Street address", "text", "12 Fouad Street", "required"],
      ["addressLocality", "City", "text", "Alexandria", "required"],
      ["postalCode", "Postal code", "text", "21511", ""],
      ["addressCountry", "Country code", "text", "EG", "required"],
      ["priceRange", "Price range", "text", "$$", ""],
      ["hours", "Opening hours", "text", "Mo-Sa 09:00-21:00", ""]
    ],
    BreadcrumbList: [
      ["trail", "Trail, one level per line as Name | URL", "textarea", "Home | https://example.com/\nIndoor plants | https://example.com/plants/\nHow to repot a snake plant | https://example.com/plants/repot-snake-plant/", "required"]
    ],
    Organization: [
      ["name", "Organization name", "text", "Leaf & Root", "recommended"],
      ["url", "Website", "url", "https://example.com/", "recommended"],
      ["logo", "Logo URL", "url", "https://example.com/logo.png", "recommended"],
      ["sameAs", "Profiles, one URL per line", "textarea", "https://www.instagram.com/leafandroot\nhttps://www.linkedin.com/company/leafandroot", ""],
      ["telephone", "Phone", "tel", "", ""],
      ["email", "Email", "email", "", ""]
    ]
  };

  var values = {};

  function build() {
    var t = typeSel.value;
    box.innerHTML = "";
    TYPES[t].forEach(function (f) {
      var id = "sd-" + f[0];
      var wrap = document.createElement("div");
      wrap.className = "field";
      var label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = f[1];
      if (f[4] === "required") {
        var h = document.createElement("span");
        h.className = "hint";
        h.textContent = "required";
        label.appendChild(h);
      }
      var input;
      if (f[2] === "textarea") {
        input = document.createElement("textarea");
        input.rows = 4;
      } else if (f[2].indexOf("select:") === 0) {
        input = document.createElement("select");
        f[2].slice(7).split(",").forEach(function (o) {
          var opt = document.createElement("option");
          opt.value = o;
          opt.textContent = o.replace(/([a-z])([A-Z])/g, "$1 $2");
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.type = f[2];
        if (f[2] === "number") input.step = "any";
      }
      input.id = id;
      input.value = values[t + f[0]] !== undefined ? values[t + f[0]] : f[3];
      input.addEventListener("input", function () { values[t + f[0]] = input.value; render(); });
      wrap.appendChild(label);
      wrap.appendChild(input);
      box.appendChild(wrap);
    });
    render();
  }

  function v(name) {
    var el = document.getElementById("sd-" + name);
    return el ? el.value.trim() : "";
  }

  function clean(obj) {
    Object.keys(obj).forEach(function (k) {
      var val = obj[k];
      if (val && typeof val === "object" && !Array.isArray(val)) {
        clean(val);
        if (Object.keys(val).filter(function (x) { return x !== "@type"; }).length === 0) delete obj[k];
      } else if (val === "" || val === undefined || (Array.isArray(val) && !val.length)) {
        delete obj[k];
      }
    });
    return obj;
  }

  function add(kind, text) {
    var li = document.createElement("li");
    li.className = kind;
    var s = document.createElement("span");
    s.textContent = text;
    li.appendChild(s);
    msgs.appendChild(li);
  }

  function render() {
    var t = typeSel.value;
    var data = { "@context": "https://schema.org", "@type": t };
    var warn = [];
    var info = [];

    if (t === "Article") {
      data.headline = v("headline");
      data.image = v("image");
      data.datePublished = v("datePublished");
      data.dateModified = v("dateModified");
      data.author = { "@type": "Person", name: v("authorName"), url: v("authorUrl") };
      if (!data.headline) warn.push("Add a headline that matches the title shown on the page.");
      if (!data.image) info.push("Add an image. Google recommends at least one large image for articles.");
      if (!data.datePublished) info.push("Add the publication date.");
      if (!v("authorName")) info.push("Add the author, and link to an author page if you have one.");
    }

    if (t === "Product") {
      data.name = v("name");
      data.image = v("image");
      data.description = v("description");
      data.sku = v("sku");
      data.brand = { "@type": "Brand", name: v("brand") };
      if (v("price")) {
        data.offers = { "@type": "Offer", price: v("price"), priceCurrency: v("currency").toUpperCase(), availability: "https://schema.org/" + v("availability") };
      }
      if (v("ratingValue") && v("reviewCount")) {
        data.aggregateRating = { "@type": "AggregateRating", ratingValue: v("ratingValue"), reviewCount: v("reviewCount") };
      }
      if (!data.name) warn.push("A product needs a name.");
      if (!data.offers && !data.aggregateRating) warn.push("Google needs at least one of: an offer with a price, a review or an aggregate rating.");
      if (data.offers && !/^[A-Z]{3}$/.test(data.offers.priceCurrency)) warn.push("Use a three letter currency code, such as USD, EUR or EGP.");
      if (data.aggregateRating) info.push("Only add a rating if the reviews are shown on this page.");
    }

    if (t === "LocalBusiness") {
      data.name = v("name");
      data.image = v("image");
      data.url = v("url");
      data.telephone = v("telephone");
      data.address = { "@type": "PostalAddress", streetAddress: v("streetAddress"), addressLocality: v("addressLocality"), postalCode: v("postalCode"), addressCountry: v("addressCountry").toUpperCase() };
      data.priceRange = v("priceRange");
      data.openingHours = v("hours");
      if (!data.name) warn.push("A local business needs a name.");
      if (!v("streetAddress") || !v("addressLocality")) warn.push("Add the full street address and city, exactly as on your Business Profile.");
      if (v("addressCountry") && !/^[A-Za-z]{2}$/.test(v("addressCountry"))) warn.push("Use a two letter country code, such as EG, GB or US.");
      info.push("Use the most specific business type you can, such as Bakery or Dentist, in place of LocalBusiness.");
    }

    if (t === "BreadcrumbList") {
      var items = v("trail").split(/\n/).map(function (l) { return l.split("|").map(function (x) { return x.trim(); }); }).filter(function (p) { return p[0]; });
      data.itemListElement = items.map(function (p, i) {
        var o = { "@type": "ListItem", position: i + 1, name: p[0] };
        if (p[1]) o.item = p[1];
        return o;
      });
      items.forEach(function (p, i) { if (!p[1] && i < items.length - 1) warn.push("Level " + (i + 1) + " needs a URL. Only the last level may leave it out."); });
      if (items.length < 2) warn.push("A breadcrumb trail needs at least two levels.");
    }

    if (t === "Organization") {
      data.name = v("name");
      data.url = v("url");
      data.logo = v("logo");
      data.sameAs = v("sameAs").split(/\n/).map(function (x) { return x.trim(); }).filter(Boolean);
      data.telephone = v("telephone");
      data.email = v("email");
      if (!data.logo) info.push("Add a logo URL. Google may use it in results and knowledge panels.");
    }

    clean(data);
    out.textContent = '<script type="application/ld+json">\n' + JSON.stringify(data, null, 2) + "\n</" + "script>";

    msgs.innerHTML = "";
    warn.forEach(function (m) { add("warn", m); });
    info.forEach(function (m) { add("", m); });
    if (!warn.length) add("ok", "Ready to paste into the page. Then test the page in the Rich Results Test.");
  }

  typeSel.addEventListener("change", build);
  build();
})();
