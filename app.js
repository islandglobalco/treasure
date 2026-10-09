(function () {
  "use strict";

  var config = { amazonTag: "" };
  var state = { who: "her", tier: 0 };

  // ---------- Amazon links ----------
  // Exact product page when we know the ASIN (same as the Almanac site); otherwise a price-filtered search.
  function amazonUrl(q, p, asin) {
    var tag = config.amazonTag ? "tag=" + encodeURIComponent(config.amazonTag) : "";
    if (asin) return "https://www.amazon.com/dp/" + asin + "/" + (tag ? "?" + tag : "");
    var lo = Math.max(1, Math.round(p * 0.6));
    var hi = Math.round(p * 1.5) + 5;
    return "https://www.amazon.com/s?k=" + encodeURIComponent(q) + "&rh=p_36%3A" + lo * 100 + "-" + hi * 100 + (tag ? "&" + tag : "");
  }
  // One link that drops every item with an ASIN into the shopper's Amazon cart, tagged.
  // (Amazon's Associates add-to-cart form; the shopper confirms on Amazon.)
  function cartUrl(items) {
    var n = 0, parts = [];
    items.forEach(function (it) {
      if (!it.asin) return;
      n++;
      parts.push("ASIN." + n + "=" + encodeURIComponent(it.asin) + "&Quantity." + n + "=1");
    });
    if (!n) return "";
    if (config.amazonTag) parts.push("AssociateTag=" + encodeURIComponent(config.amazonTag));
    return "https://www.amazon.com/gp/aws/cart/add.html?" + parts.join("&");
  }
  function cartButton(items) {
    var url = cartUrl(items);
    if (!url) return "";
    var n = items.filter(function (i) { return i.asin; }).length;
    return '<a class="cart-all" href="' + url + '" target="_blank" rel="sponsored noopener">Add all ' + n + " to Amazon cart</a>";
  }
  function total(items) { return items.reduce(function (s, i) { return s + i.p; }, 0); }
  function money(n) { return "$" + Math.round(n); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- Item icons ----------
  // Each gift is drawn as a gilded icon in the chest. If an item ever carries
  // an `img` (e.g. from Amazon's Product Advertising API), the photo is used instead.
  // Each gift maps to a Midjourney render in img/gifts/<key>.png (transparent PNG).
  // The emoji is the fallback if a render is missing.
  var ICONS = [
    [/sock/i, "🧦", "socks"], [/candle/i, "🕯️", "candle"], [/tea\b/i, "🍵", "tea"], [/sleep mask|eye mask/i, "🌙", "sleepmask"],
    [/sheet mask|face mask|led|skincare|lotion|serum|roller|gua sha/i, "✨", "skincare"], [/bath/i, "🛁", "bath"], [/scrunch|hair/i, "🎀", "bow"],
    [/book light|lamp|light\b/i, "💡", "lamp"], [/journal|notebook|sketchbook|album/i, "📓", "journal"], [/bookmark|cookbook|recipe book|book|e-reader|reader/i, "📖", "book"],
    [/robe|pajama/i, "👘", "robe"], [/diffuser|essential oil|aroma/i, "🌸", "diffuser"], [/pour-over|coffee|espresso|grinder|bean|frother|milk|mug/i, "☕", "coffee"],
    [/herb|plant|planter/i, "🌿", "plant"], [/garden|glove|shear|scissor/i, "🧤", "garden"],
    [/yoga|foam roller/i, "🧘", "yoga"], [/massage/i, "💪", "massage"], [/bitters/i, "🧪", "potion"], [/protein|shaker bottle/i, "💧", "bottle"], [/cocktail|shaker/i, "🍸", "cocktail"],
    [/water bottle|tumbler|bottle/i, "💧", "bottle"], [/band|dumbbell|weight/i, "🏋️", "dumbbell"],
    [/dutch oven|pot\b|griddle|skillet|pan\b/i, "🍳", "pot"], [/olive oil|oil/i, "🫒", "oil"], [/apron|spoon|utensil/i, "🧑‍🍳", "apron"],
    [/earbud|headphone|headset/i, "🎧", "headphones"], [/packing cube|luggage|carry-on|duffel|bag/i, "🧳", "luggage"], [/passport/i, "🛂", "passport"],
    [/jewel|ring|necklace|bracelet/i, "💍", "ring"], [/pillowcase|pillow|blanket/i, "🛏️", "pillow"],
    [/cashmere|scarf|wrap/i, "🧣", "scarf"], [/photo frame|frame/i, "🖼️", "frame"], [/instant camera|camera|film/i, "📸", "camera"],
    [/grill tool|bbq|grill/i, "🍖", "bbq"], [/rub|spice|salt/i, "🧂", "spice"], [/thermometer/i, "🌡️", "thermo"], [/poker|chip/i, "🎰", "chips"],
    [/card game|cards/i, "🃏", "cards"], [/game|controller|gaming/i, "🎮", "gamepad"], [/whiskey|rocks glass|glasses|stone|ice/i, "🥃", "whiskey"], [/decanter|wine/i, "🍷", "wine"],
    [/desk mat|mouse pad|charg|power bank|cable|adapter/i, "🔋", "charger"],
    [/multitool|tool/i, "🔧", "tool"], [/hammock/i, "🏝️", "hammock"], [/headlamp|flashlight/i, "🔦", "flashlight"],
    [/trimmer|razor/i, "🪒", "razor"], [/beard|grooming/i, "🧔", "beard"], [/shaving|soap/i, "🧼", "shaving"],
    [/turntable/i, "💿", "turntable"], [/speaker|noise machine/i, "🔊", "speaker"], [/crate|storage|vinyl|record|clean/i, "📦", "crate"],
    [/knife|butcher|cutting board|board/i, "🔪", "knife"], [/wood chip|smok/i, "🔥", "fire"],
    [/watch/i, "⌚", "watch"], [/wallet/i, "👛", "wallet"], [/key/i, "🔑", "keys"], [/golf/i, "⛳", "golf"], [/binocular/i, "🔭", "binoculars"],
    [/fish/i, "🎣", "fishing"], [/dog|cat|pet/i, "🐾", "pet"], [/paint|watercolor|easel|pencil|art/i, "🎨", "art"], [/guitar/i, "🎸", "guitar"],
    [/baby|swaddle|diaper/i, "🍼", "baby"], [/tracker/i, "📍", "tracker"], [/running|sport|sneaker/i, "👟", "sneaker"], [/gift card/i, "💳", "giftcard"],
    [/smart plug|smart/i, "🔊", "speaker"],
  ];
  var ASSETS = window.TG_ASSETS || {};   // filled by assets.js: which renders exist
  function iconRow(it) {
    for (var i = 0; i < ICONS.length; i++) if (ICONS[i][0].test(it.n)) return ICONS[i];
    return null;
  }
  function iconFor(it) {
    if (it.e) return it.e;
    var r = iconRow(it);
    return r ? r[1] : "🎁";
  }
  function renderFor(it, v) {
    // Amazon's own product image, hotlinked from Amazon's image server.
    if (it.img) return /^https?:/.test(it.img) ? it.img : "https://m.media-amazon.com/images/I/" + it.img + "._SL500_.jpg";
    var r = iconRow(it), key = it.k || (r ? r[2] : "gift");
    var g = ASSETS.gifts || {};
    var n = g[key];
    // No photo for this gift type yet: show a wrapped-gift photo rather than mixing in an emoji.
    if (!n && g.gift) { key = "gift"; n = g.gift; }
    if (!n) return "";
    return "img/gifts/" + key + "-" + ((v || 0) % n) + ".png";
  }
  // Give repeated categories in one basket different variants (Midjourney renders 4 per prompt).
  function variants(items) {
    var seen = {};
    return items.map(function (it) {
      var r = iconRow(it), k = it.k || (r ? r[2] : "gift");
      seen[k] = (seen[k] || 0) + 1;
      return seen[k] - 1;
    });
  }
  function glyph(it, v) {
    var src = renderFor(it, v);
    return src
      ? '<img src="' + esc(src) + '" alt="" loading="lazy" draggable="false" referrerpolicy="no-referrer"' + (it.img ? ' class="amz"' : "") + ">"
      : '<span class="emoji" aria-hidden="true">' + iconFor(it) + "</span>";
  }

  // ---------- The treasure chest ----------
  // Items sit on a heap of coins and gems; the lid stands open and swings
  // further back on hover while the loot rises.
  // Where each gift sits in the trunk: [x %, bottom % of the treasure area, tilt, scale].
  var SPOTS = {
    1: [[50, 6, 0, 1.25]],
    2: [[34, 6, -8, 1.1], [66, 8, 7, 1.12]],
    3: [[25, 6, -12, 1], [50, 18, 0, 1.12], [75, 6, 11, 1]],
    4: [[22, 4, -14, .92], [42, 18, -4, 1.04], [62, 16, 5, 1.02], [80, 4, 13, .92]],
    5: [[16, 1, -16, .88], [33, 8, -7, 1], [51, 13, 1, 1.1], [69, 8, 7, 1], [85, 1, 15, .88]],
  };
  var GLINTS = [[14, 18, 0], [30, 44, 1.1], [56, 58, .4], [72, 36, 1.7], [88, 20, .8], [46, 24, 2.3]];

  function chest(items, opts) {
    var list = items.slice(0, 5);
    var spots = SPOTS[list.length] || SPOTS[5];
    var vs = variants(list);
    var loot = list.map(function (it, i) {
      var s = spots[i] || spots[spots.length - 1];
      return '<span class="loot-item" style="--x:' + s[0] + "%;--y:" + s[1] + "%;--r:" + s[2] + "deg;--k:" + s[3] + ";--d:" + (i * 0.06) + 's">' + glyph(it, vs[i]) + "</span>";
    }).join("");
    var glints = GLINTS.map(function (g) {
      return '<i class="glint" style="--x:' + g[0] + "%;--y:" + g[1] + "%;--t:" + g[2] + 's"></i>';
    }).join("");
    return '<span class="chest' + (opts && opts.big ? " chest-big" : "") + '" aria-hidden="true">' +
      '<img class="c-back" src="img/scene/chest.webp" alt="" draggable="false">' +
      '<span class="chest-glow"></span>' +
      '<span class="hoard"><img class="c-gold" src="img/scene/gold.webp" alt="" draggable="false">' + loot + glints + "</span>" +
      '<img class="c-front" src="img/scene/chest-front.webp" alt="" draggable="false">' +
      '<img class="c-coins" src="img/scene/coins.webp" alt="" draggable="false">' +
      "</span>";
  }

  // ---------- Basket rendering ----------
  function itemRows(items) {
    var vs = variants(items);
    return items.map(function (it, i) {
      return '<li class="item">' +
        '<span class="item-icon">' + glyph(it, vs[i]) + "</span>" +
        '<div class="item-text"><span class="item-name">' + esc(it.n) + "</span>" +
        (it.why ? '<span class="item-why">' + esc(it.why) + "</span>" : "") + "</div>" +
        '<span class="item-price">about ' + money(it.p) + "</span>" +
        '<a class="shop" href="' + amazonUrl(it.q, it.p, it.asin) + '" target="_blank" rel="sponsored noopener">Shop on Amazon</a>' +
        "</li>";
    }).join("");
  }

  function renderGrid() {
    var grid = document.getElementById("grid");
    var list = window.BASKETS.filter(function (b) {
      return b.for === state.who && (!state.tier || b.tier === state.tier);
    });
    grid.innerHTML = list.map(function (b) {
      return '<button class="hold" type="button" data-id="' + b.id + '">' +
        chest(b.items) +
        '<span class="hold-text">' +
          '<span class="hold-price">' + money(total(b.items)) + "</span>" +
          '<span class="hold-name">' + esc(b.name) + "</span>" +
          '<span class="hold-blurb">' + esc(b.blurb) + "</span>" +
          '<span class="hold-count">' + b.items.length + " gifts inside</span>" +
        "</span></button>";
    }).join("");
  }

  function openBasket(b) {
    var d = document.getElementById("basket-dialog");
    document.getElementById("dlg-chest").innerHTML = chest(b.items, { big: true });
    document.getElementById("dlg-title").textContent = b.name;
    document.getElementById("dlg-blurb").textContent = b.blurb;
    document.getElementById("dlg-total").textContent = "About " + money(total(b.items)) + " in all";
    document.getElementById("dlg-items").innerHTML = itemRows(b.items);
    document.getElementById("dlg-cart").innerHTML = cartButton(b.items);
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }

  // ---------- Search: AI first, local curator as fallback ----------
  var HER = /\b(her|she|wife|mom|mother|sister|girlfriend|daughter|grandma|grandmother|aunt|niece|bride|fianc[eé]e|woman|women|girl|lady)\b/i;
  var HIM = /\b(him|he|husband|dad|father|brother|boyfriend|son|grandpa|grandfather|uncle|nephew|groom|fianc[eé]|man|men|guy|boy)\b/i;

  // Offline fallback: match words in the request against the practical items in the 24 baskets.
  var TOPICS = [
    [/groom|beard|shav|nail|hair|tweez|comb|self.?care|beauty/i, /tweezer|clipper|comb|brush|manicure|shaver|oneblade|styler|lip/i],
    [/phone|iphone|tech|gadget|music|commut/i, /iphone|charger|cable|case|airpods|power bank|kindle/i],
    [/cook|kitchen|chef|food|grill|bbq/i, /skillet|knife|board|oxo|thermo|fryer|instant pot/i],
    [/outdoor|camp|hik|fish|hunt|work|trade|handy|tool|edc/i, /swiss|gerber|leatherman|maglite|streamlight|zippo|benchmade|tumbler|darn tough/i],
    [/read|book/i, /kindle|sleep mask|socks/i],
    [/cold|winter|cozy|warm/i, /socks|beanie|underwear/i],
  ];
  function parseBudget(text) {
    var m = text.match(/\$\s?(\d[\d,]*)/) || text.match(/(\d[\d,]{1,4})\s?(dollars|bucks|usd)/i) ||
      text.match(/(?:under|around|about|budget|up to)\s+(\d[\d,]*)/i);
    var n = m ? parseInt(m[1].replace(/,/g, ""), 10) : 100;
    return Math.min(Math.max(n || 100, 15), 2000);
  }

  function localCurate(text) {
    var budget = parseBudget(text);
    var who = HER.test(text) ? "her" : HIM.test(text) ? "him" : null;
    var all = [], seen = {};
    window.BASKETS.forEach(function (b) {
      if (who && b.for !== who) return;
      b.items.forEach(function (i) { if (!seen[i.n]) { seen[i.n] = 1; all.push(i); } });
    });
    var pool = [];
    TOPICS.forEach(function (t) {
      if (t[0].test(text)) all.forEach(function (i) { if (t[1].test(i.n) && pool.indexOf(i) < 0) pool.push(i); });
    });
    function shuffle(a) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)); var t = a[j]; a[j] = a[k]; a[k] = t; } return a; }
    var chosen = [], sum = 0;
    function pack(list) {
      list.forEach(function (i) {
        if (chosen.length < 4 && sum + i.p <= budget * 1.08 && chosen.indexOf(i) < 0) { chosen.push(i); sum += i.p; }
      });
    }
    pack(shuffle(pool.slice()));
    if (chosen.length < 3) pack(shuffle(all.slice()));
    if (!chosen.length) chosen.push(all.slice().sort(function (a, b) { return a.p - b.p; })[0]);
    chosen.sort(function (a, b) { return b.p - a.p; });
    return {
      title: "Picked for " + (who === "her" ? "her" : who === "him" ? "him" : "them"),
      note: "Practical things they'll use, built around about " + money(budget) + ".",
      items: chosen,
    };
  }

  function normalizeAI(data) {
    if (!data || !Array.isArray(data.items) || !data.items.length) return null;
    var items = data.items.slice(0, 6).map(function (i) {
      return { n: String(i.name || ""), q: String(i.search || i.name || ""), p: Number(i.price) || 25, why: i.why ? String(i.why) : "", k: i.photo ? String(i.photo) : "" };
    }).filter(function (i) { return i.n && i.q; });
    if (!items.length) return null;
    return { title: String(data.title || "Your basket"), note: String(data.note || ""), items: items };
  }

  function renderResult(r, query) {
    var box = document.getElementById("result");
    box.innerHTML =
      '<div class="result-body"><div class="result-head"><h2>' + esc(r.title) + "</h2>" +
      '<p class="result-total">About ' + money(total(r.items)) + " in all</p></div>" +
      (r.note ? '<p class="result-note">' + esc(r.note) + "</p>" : "") +
      '<ul class="items">' + itemRows(r.items) + "</ul>" +
      '<div class="result-cart">' + cartButton(r.items) + "</div>" +
      '<p class="result-foot">For: ' + esc(query) + ' <button type="button" class="linkish" id="reroll">Try another mix</button></p>';
    box.hidden = false;
    document.getElementById("reroll").addEventListener("click", function () { runSearch(query); });
  }

  // ---------- Search: the hero chest rattles while we pick, then opens on the gifts ----------
  var busy = false;
  function heroChest(items, closed) {
    var host = document.getElementById("hero-chest");
    host.innerHTML = chest(items, { big: true });
    var c = host.querySelector(".chest");
    if (closed) c.classList.add("closed");
    return c;
  }

  function runSearch(query) {
    if (busy) return;
    busy = true;
    var FX = window.FX;
    var btn = document.getElementById("go");
    var status = document.getElementById("status");
    var finder = document.getElementById("search");
    var smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    btn.disabled = true; btn.textContent = "Opening…"; status.textContent = "Picking gifts for them…";
    var f0 = finder.getBoundingClientRect();
    if (f0.top < 0 || f0.bottom > innerHeight) finder.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });

    var c = document.querySelector("#hero-chest .chest");
    if (!c || !c.classList.contains("closed")) c = heroChest([], true);
    c.classList.add("rattle");

    var minWait = new Promise(function (res) { setTimeout(res, smooth ? 1100 : 0); });
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
    var curate = fetch("/api/curate", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }), signal: ctrl ? ctrl.signal : undefined,
    }).then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) { return normalizeAI(data) || localCurate(query); })
      .catch(function () { return localCurate(query); })
      .then(function (r) { clearTimeout(timer); return r; });

    Promise.all([curate, minWait]).then(function (v) {
      var r = v[0];
      // Load the gifts into a closed chest, then let it open.
      var opened = heroChest(r.items, true);
      void opened.offsetWidth;
      if (FX) FX.sfx.unlock();
      setTimeout(function () {
        opened.classList.remove("closed");
        if (FX) {
          FX.sfx.creak(); FX.sfx.chime();
          var b = opened.getBoundingClientRect();
          FX.burst(b.left + b.width / 2, b.top + b.height * 0.45, 45);
        }
      }, smooth ? 220 : 0);
      status.textContent = "Here's what we packed. Every gift is listed below.";
      renderResult(r, query);
      btn.disabled = false; btn.textContent = "Open the chest"; busy = false;
    });
  }

  // ---------- Wire up ----------
  function init() {
    fetch("/api/config").then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (c) { if (c && c.amazonTag) config.amazonTag = c.amazonTag; })
      .catch(function () {});

    renderGrid();
    heroChest([], true);

    document.getElementById("search").addEventListener("submit", function (e) {
      e.preventDefault();
      var q = document.getElementById("q").value.trim();
      if (!q) {
        document.getElementById("status").textContent = "Tell us who it's for, what they love, and your budget.";
        document.getElementById("q").focus();
        return;
      }
      runSearch(q.slice(0, 300));
    });

    document.querySelectorAll(".example").forEach(function (b) {
      b.addEventListener("click", function () {
        document.getElementById("q").value = b.textContent;
        runSearch(b.textContent);
      });
    });

    document.querySelectorAll("[data-who]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.who = b.getAttribute("data-who");
        document.querySelectorAll("[data-who]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        renderGrid();
      });
    });
    document.querySelectorAll("[data-tier]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.tier = Number(b.getAttribute("data-tier"));
        document.querySelectorAll("[data-tier]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        renderGrid();
      });
    });

    document.getElementById("grid").addEventListener("click", function (e) {
      var t = e.target.closest(".hold");
      if (!t) return;
      var b = window.BASKETS.find(function (x) { return x.id === t.getAttribute("data-id"); });
      if (b) {
        openBasket(b);
        // The dialog sits in the top layer, so the effects canvas moves inside it while it's open.
        document.getElementById("basket-dialog").appendChild(document.getElementById("fx"));
        if (window.FX) {
          window.FX.sfx.chime();
          var c = document.getElementById("dlg-chest").getBoundingClientRect();
          window.FX.burst(c.left + c.width / 2, c.top + c.height * 0.5, 30);
        }
      }
    });

    var grid = document.getElementById("grid");
    grid.addEventListener("pointerover", function (e) {
      var h = e.target.closest(".hold");
      if (h && !h.contains(e.relatedTarget) && window.FX) window.FX.sfx.creak();
    });
    var snd = document.getElementById("sound");
    function paintSound() { var on = window.FX ? window.FX.soundOn : false; snd.setAttribute("aria-pressed", String(on)); snd.textContent = on ? "Sound on" : "Sound off"; }
    paintSound();
    snd.addEventListener("click", function () { if (window.FX) window.FX.setSound(!window.FX.soundOn); paintSound(); });

    var dlg = document.getElementById("basket-dialog");
    dlg.addEventListener("close", function () { document.body.insertBefore(document.getElementById("fx"), document.body.firstChild); });
    document.getElementById("dlg-close").addEventListener("click", function () { dlg.close ? dlg.close() : dlg.removeAttribute("open"); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg && dlg.close) dlg.close(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
