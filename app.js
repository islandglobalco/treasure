(function () {
  "use strict";

  var config = { amazonTag: "" };
  var state = { who: "her", tier: 0 };

  // ---------- Amazon links ----------
  function amazonUrl(q, p) {
    var lo = Math.max(1, Math.round(p * 0.6));
    var hi = Math.round(p * 1.5) + 5;
    var url = "https://www.amazon.com/s?k=" + encodeURIComponent(q) +
      "&rh=p_36%3A" + lo * 100 + "-" + hi * 100;
    if (config.amazonTag) url += "&tag=" + encodeURIComponent(config.amazonTag);
    return url;
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
    if (it.img) return it.img;
    var r = iconRow(it), key = r ? r[2] : "gift";
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
      var r = iconRow(it), k = r ? r[2] : "gift";
      seen[k] = (seen[k] || 0) + 1;
      return seen[k] - 1;
    });
  }
  function glyph(it, v) {
    var src = renderFor(it, v);
    return src
      ? '<img src="' + esc(src) + '" alt="" loading="lazy" draggable="false">'
      : '<span class="emoji" aria-hidden="true">' + iconFor(it) + "</span>";
  }

  // ---------- The treasure chest ----------
  // Items sit on a heap of coins and gems; the lid stands open and swings
  // further back on hover while the loot rises.
  var SPOTS = {
    1: [[50, 34, 0, 1.25]],
    2: [[34, 30, -10, 1.1], [66, 34, 9, 1.15]],
    3: [[24, 26, -12, 1], [50, 40, 0, 1.2], [76, 26, 11, 1]],
    4: [[20, 22, -14, .95], [41, 40, -4, 1.12], [62, 38, 6, 1.08], [82, 22, 13, .95]],
    5: [[16, 20, -16, .9], [34, 36, -6, 1.05], [52, 46, 2, 1.15], [70, 34, 8, 1.02], [86, 18, 15, .88]],
  };
  var GLINTS = [[12, 58, 0], [31, 78, 1.1], [57, 88, .4], [74, 70, 1.7], [90, 52, .8], [46, 62, 2.3]];

  function chest(items, opts) {
    var list = items.slice(0, 5);
    var spots = SPOTS[list.length] || SPOTS[5];
    var vs = variants(list);
    var loot = list.map(function (it, i) {
      var s = spots[i];
      return '<span class="loot-item" style="--x:' + s[0] + "%;--y:" + s[1] + "%;--r:" + s[2] + "deg;--k:" + s[3] + ";--d:" + (i * 0.06) + 's">' + glyph(it, vs[i]) + "</span>";
    }).join("");
    var glints = GLINTS.map(function (g) {
      return '<i class="glint" style="--x:' + g[0] + "%;--y:" + g[1] + "%;--t:" + g[2] + 's"></i>';
    }).join("");
    return '<span class="chest' + (opts && opts.big ? " chest-big" : "") + '" aria-hidden="true">' +
      '<span class="chest-glow"></span>' +
      '<span class="lid"><span class="lid-out"></span><span class="lid-in"></span></span>' +
      '<span class="hoard"><span class="coins"></span>' +
        '<i class="gem gem-ruby"></i><i class="gem gem-emerald"></i><i class="gem gem-sapphire"></i><i class="gem gem-diamond"></i>' +
        loot + glints + "</span>" +
      '<span class="box"><span class="lock"></span></span>' +
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
        '<a class="shop" href="' + amazonUrl(it.q, it.p) + '" target="_blank" rel="sponsored noopener">Shop on Amazon</a>' +
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
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }

  // ---------- Search: AI first, local curator as fallback ----------
  var HER = /\b(her|she|wife|mom|mother|sister|girlfriend|daughter|grandma|grandmother|aunt|niece|bride|fianc[eé]e|woman|women|girl|lady)\b/i;
  var HIM = /\b(him|he|husband|dad|father|brother|boyfriend|son|grandpa|grandfather|uncle|nephew|groom|fianc[eé]|man|men|guy|boy)\b/i;

  var POOLS = {
    coffee: { k: /coffee|espresso|latte|caffeine/i, items: [
      ["Manual burr grinder", "manual burr coffee grinder", 25], ["Pour-over coffee set", "pour over coffee maker set", 35],
      ["Specialty coffee sampler", "specialty coffee sampler gift", 20], ["Milk frother", "handheld milk frother", 15],
      ["Espresso machine", "espresso machine with milk frother", 180]] },
    grill: { k: /grill|bbq|barbecue|smok|meat|steak/i, items: [
      ["Grill tool set", "bbq grill tool set", 25], ["Smart meat thermometer", "wireless smart meat thermometer", 100],
      ["BBQ rub sampler", "bbq rub gift set", 15], ["Cast iron griddle", "cast iron griddle", 60], ["Grilling cookbook", "grilling cookbook", 22]] },
    cooking: { k: /cook|chef|bak|kitchen|food|foodie/i, items: [
      ["Enameled Dutch oven", "enameled cast iron dutch oven", 90], ["Chef knife", "chef knife", 60],
      ["Olive oil gift set", "olive oil gift set", 30], ["Linen apron", "linen apron", 25], ["Spice gift set", "spice gift set", 30]] },
    fitness: { k: /\brun|gym|fitness|\bfit\b|workout|yoga|lift|marathon|pilates|cycling|bike/i, items: [
      ["Massage gun", "percussion massage gun", 90], ["Foam roller", "foam roller", 30], ["Insulated water bottle", "insulated water bottle", 30],
      ["Wireless sport earbuds", "wireless sport earbuds", 60], ["Yoga mat", "premium yoga mat", 60], ["Running belt", "running belt phone", 18]] },
    outdoors: { k: /camp|hik|outdoor|fish|hunt|kayak|nature|backpack/i, items: [
      ["Multitool", "multitool pliers", 40], ["Rechargeable headlamp", "rechargeable headlamp", 20], ["Camping hammock", "camping hammock", 25],
      ["Insulated tumbler", "insulated tumbler", 25], ["Fishing tackle box kit", "fishing tackle box kit", 35], ["Trail binoculars", "compact binoculars", 50]] },
    golf: { k: /golf/i, items: [
      ["Golf balls dozen", "premium golf balls dozen", 45], ["Golf rangefinder", "golf rangefinder", 150],
      ["Golf towel and brush set", "golf towel brush set", 20], ["Putting mat", "indoor putting green mat", 40]] },
    tech: { k: /\btech|gadget|computer|phone|nerd|engineer|developer|coder/i, items: [
      ["Wireless charging stand", "3 in 1 wireless charging stand", 40], ["Noise-cancelling headphones", "noise cancelling headphones", 150],
      ["Smart speaker", "smart speaker", 50], ["Item tracker", "bluetooth item tracker", 30], ["Portable power bank", "portable power bank", 35]] },
    gaming: { k: /gam(e|er|ing)|video game|console|xbox|playstation|nintendo|switch/i, items: [
      ["Gaming headset", "wireless gaming headset", 80], ["Controller charging dock", "controller charging station", 25],
      ["LED light strip", "rgb led light strip", 20], ["Gaming mouse pad XL", "extended gaming mouse pad", 18], ["Gaming gift card", "video game gift card", 50]] },
    music: { k: /music|vinyl|record|guitar|piano|concert|band|sing/i, items: [
      ["Bluetooth speaker", "portable bluetooth speaker", 60], ["Turntable", "belt drive turntable", 150],
      ["Guitar accessory kit", "guitar accessories kit", 25], ["Vinyl storage crate", "vinyl record storage crate", 40]] },
    books: { k: /\bread|book|novel|librar|writ/i, items: [
      ["E-reader", "e reader", 140], ["Book light", "rechargeable book light", 15], ["Reading journal", "reading journal book log", 14],
      ["Bookends", "decorative bookends", 25], ["Leather journal", "leather journal", 25]] },
    travel: { k: /travel|trip|flight|vacation|wander|airport/i, items: [
      ["Packing cubes", "packing cubes set", 30], ["Travel pillow", "memory foam travel pillow", 30],
      ["Leather passport holder", "leather passport holder", 25], ["Carry-on luggage", "carry on luggage hardside", 150], ["Universal travel adapter", "universal travel adapter", 25]] },
    garden: { k: /garden|plant|flower|succulent|green thumb/i, items: [
      ["Herb garden kit", "indoor herb garden kit", 25], ["Ceramic planters", "ceramic planter set", 25],
      ["Gardening tool set", "gardening tool set", 30], ["Smart indoor garden", "smart indoor garden", 120]] },
    beauty: { k: /beauty|skincare|makeup|spa|pamper|self.?care|relax/i, items: [
      ["Skincare gift set", "skincare gift set", 45], ["Silk pillowcase", "mulberry silk pillowcase", 40],
      ["Bath bomb set", "bath bomb gift set", 15], ["Plush robe", "plush robe", 45], ["Aromatherapy diffuser", "aromatherapy diffuser", 25]] },
    drinks: { k: /wine|whisk|bourbon|cocktail|beer|\bbar\b|scotch|tequila/i, items: [
      ["Whiskey glasses set", "whiskey glasses set", 30], ["Cocktail shaker kit", "cocktail shaker bartender kit", 40],
      ["Wine aerator", "wine aerator", 20], ["Whiskey stones", "whiskey stones", 18], ["Electric wine opener", "electric wine opener", 30]] },
    pets: { k: /\b(dogs?|cats?|pets?|puppy|kitten)\b/i, items: [
      ["Pet portrait custom", "custom pet portrait", 35], ["Calming pet bed", "calming pet bed", 40],
      ["Interactive pet toy", "interactive pet toy", 20], ["Pet camera", "pet camera treat dispenser", 60]] },
    home: { k: /\bhome\b|house|cozy|new place|housewarming|apartment/i, items: [
      ["Weighted blanket", "weighted blanket", 60], ["Scented candle", "luxury scented candle", 35],
      ["Throw blanket", "chunky knit throw blanket", 45], ["Smart plug set", "smart plug", 25]] },
    art: { k: /\b(art|artist|paint\w*|draw\w*|sketch\w*|craft\w*|creative)\b/i, items: [
      ["Watercolor set", "professional watercolor paint set", 35], ["Sketchbook", "hardcover sketchbook", 18],
      ["Drawing pencil set", "drawing pencil set", 20], ["Tabletop easel", "tabletop easel", 30]] },
    baby: { k: /baby|newborn|new parent|new mom|new dad|pregnan|expecting/i, items: [
      ["Baby memory book", "baby memory book", 30], ["Swaddle blankets", "muslin swaddle blankets", 30],
      ["White noise machine", "white noise machine", 30], ["Diaper bag backpack", "diaper bag backpack", 45]] },
  };

  function parseBudget(text) {
    var m = text.match(/\$\s?(\d[\d,]*)/) || text.match(/(\d[\d,]{1,4})\s?(dollars|bucks|usd)/i) ||
      text.match(/(?:under|around|about|budget|up to)\s+(\d[\d,]*)/i);
    var n = m ? parseInt(m[1].replace(/,/g, ""), 10) : 100;
    return Math.min(Math.max(n || 100, 15), 2000);
  }

  function localCurate(text) {
    var budget = parseBudget(text);
    var who = HER.test(text) ? "her" : HIM.test(text) ? "him" : null;
    var pool = [], themes = [];
    Object.keys(POOLS).forEach(function (key) {
      if (POOLS[key].k.test(text)) {
        themes.push(key);
        POOLS[key].items.forEach(function (i) { pool.push({ n: i[0], q: i[1], p: i[2] }); });
      }
    });
    if (!pool.length) {
      window.BASKETS.forEach(function (b) {
        if (!who || b.for === who) b.items.forEach(function (i) { pool.push(i); });
      });
    }
    // Pad thin themed pools with the recipient's ready-made basket items.
    var extra = [];
    window.BASKETS.forEach(function (b) {
      if (!who || b.for === who) b.items.forEach(function (i) { extra.push(i); });
    });
    function pack(list, chosen, sum) {
      list.forEach(function (i) {
        if (chosen.length < 5 && sum.v + i.p <= budget * 1.08 &&
            !chosen.some(function (c) { return c.n === i.n; })) {
          chosen.push(i); sum.v += i.p;
        }
      });
    }
    function shuffle(a) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(Math.random() * (j + 1)); var t = a[j]; a[j] = a[k]; a[k] = t; } return a; }
    // Keep any single gift under ~60% of the budget so the basket has several pieces.
    var cap = function (i) { return i.p <= Math.max(budget * 0.6, 20); };
    var chosen = [], sum = { v: 0 };
    pack(shuffle(pool.filter(cap)), chosen, sum);
    if (chosen.length < 3) pack(shuffle(extra.filter(cap)), chosen, sum);
    if (!chosen.length) {
      var cheapest = pool.concat(extra).sort(function (a, b) { return a.p - b.p; })[0];
      if (cheapest) chosen.push(cheapest);
    }
    chosen.sort(function (a, b) { return b.p - a.p; });
    return {
      title: themes.length ? "A " + themes.slice(0, 2).join(" and ") + " basket" : "A basket picked for " + (who || "them"),
      note: "Built around a budget of about " + money(budget) + ".",
      items: chosen,
    };
  }

  function normalizeAI(data) {
    if (!data || !Array.isArray(data.items) || !data.items.length) return null;
    var items = data.items.slice(0, 6).map(function (i) {
      return { n: String(i.name || ""), q: String(i.search || i.name || ""), p: Number(i.price) || 25, why: i.why ? String(i.why) : "", e: i.emoji ? String(i.emoji).slice(0, 8) : "" };
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
