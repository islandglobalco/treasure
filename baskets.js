// The 24 premade baskets: 12 for her, 12 for him, three per price tier.
// Practical things people actually use, from brands that hold up. American brands
// (and US-made, where it is) are preferred.
// Each item links to an Amazon search for that exact product, filtered near its price.
// Fields: n = item name, q = Amazon search phrase, p = approximate price in USD, k = photo key.

window.TIERS = [
  { id: 1, label: "Under $50" },
  { id: 2, label: "$50 to $100" },
  { id: 3, label: "$100 to $250" },
  { id: 4, label: "$250 and up" },
];

window.BASKETS = [
  // ---------- FOR HER ----------
  { id: "her-purse", for: "her", tier: 1, name: "Purse Essentials",
    blurb: "Small things she reaches for every day.",
    items: [
      { n: "Tweezerman Slant Tweezer", q: "Tweezerman slant tweezer", p: 20, k: "tweezers" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 14, k: "clippers" },
      { n: "Burt's Bees lip balm, 4 pack", q: "Burt's Bees lip balm 4 pack", p: 10, k: "lipbalm" },
    ] },
  { id: "her-socks", for: "her", tier: 1, name: "Warm Feet",
    blurb: "Socks that last for years, plus a stack for every day.",
    items: [
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough women's hiking micro crew socks", p: 26, k: "socks" },
      { n: "Amazon Essentials crew socks, 6 pack", q: "Amazon Essentials women's cotton crew socks 6 pack", p: 16, k: "socks2" },
    ] },
  { id: "her-phone", for: "her", tier: 1, name: "Phone Basics",
    blurb: "The charger, cable and case everyone is always missing.",
    items: [
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 16, k: "charger" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 12, k: "cable" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 16, k: "phonecase" },
    ] },
  { id: "her-grooming", for: "her", tier: 2, name: "Hair & Nails",
    blurb: "The good versions of the tools she already uses.",
    items: [
      { n: "Tweezerman manicure kit", q: "Tweezerman manicure kit", p: 35, k: "manicure" },
      { n: "Tangle Teezer detangling brush", q: "Tangle Teezer original detangling brush", p: 15, k: "brush" },
      { n: "Tweezerman Slant Tweezer", q: "Tweezerman slant tweezer", p: 20, k: "tweezers" },
      { n: "Kent handmade comb", q: "Kent handmade comb", p: 12, k: "comb" },
    ] },
  { id: "her-carry", for: "her", tier: 2, name: "Everyday Carry",
    blurb: "Keychain tools and a cup that keeps ice all day.",
    items: [
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 25, k: "swissknife" },
      { n: "Gerber Shard keychain tool", q: "Gerber Shard keychain tool", p: 8, k: "keytool" },
      { n: "Stanley Quencher 30 oz tumbler", q: "Stanley Quencher H2.0 30 oz", p: 35, k: "tumbler" },
      { n: "Streamlight Stylus Pro penlight", q: "Streamlight Stylus Pro penlight", p: 25, k: "flashlight" },
    ] },
  { id: "her-basics", for: "her", tier: 2, name: "Drawer Restock",
    blurb: "Fresh underwear and socks, the gift nobody buys themselves.",
    items: [
      { n: "Amazon Essentials underwear, 6 pack", q: "Amazon Essentials women's cotton bikini underwear 6 pack", p: 20, k: "underwear" },
      { n: "Bombas ankle socks, 4 pack", q: "Bombas women's ankle socks 4 pack", p: 50, k: "socks2" },
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough women's hiking micro crew socks", p: 26, k: "socks" },
    ] },
  { id: "her-kitchen", for: "her", tier: 3, name: "Kitchen Workhorses",
    blurb: "Pans and knives that outlive the kitchen they're in.",
    items: [
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet" },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 45, k: "chefknife" },
      { n: "John Boos maple cutting board (made in USA)", q: "John Boos maple cutting board", p: 60, k: "board" },
      { n: "OXO Good Grips kitchen tool set", q: "OXO Good Grips kitchen utensil set", p: 30, k: "utensils" },
    ] },
  { id: "her-audio", for: "her", tier: 3, name: "Phone Upgrade",
    blurb: "Earbuds and a battery that rides along with her iPhone.",
    items: [
      { n: "Apple AirPods 4", q: "Apple AirPods 4", p: 129, k: "earbuds" },
      { n: "Anker MagSafe power bank", q: "Anker MagGo magnetic power bank", p: 50, k: "powerbank" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 16, k: "charger" },
    ] },
  { id: "her-reader", for: "her", tier: 3, name: "Read & Rest",
    blurb: "A reader she'll use nightly and a mask for real sleep.",
    items: [
      { n: "Amazon Kindle Paperwhite", q: "Kindle Paperwhite", p: 160, k: "kindle" },
      { n: "Manta sleep mask", q: "Manta sleep mask", p: 35, k: "sleepmask" },
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough women's hiking micro crew socks", p: 26, k: "socks" },
    ] },
  { id: "her-iphone", for: "her", tier: 4, name: "New iPhone",
    blurb: "The phone, plus everything it doesn't come with.",
    items: [
      { n: "Apple iPhone, unlocked", q: "Apple iPhone unlocked", p: 799, k: "iphone" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 16, k: "phonecase" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 16, k: "charger" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 12, k: "cable" },
    ] },
  { id: "her-hair", for: "her", tier: 4, name: "Salon at Home",
    blurb: "Dry, style and finish with tools that last.",
    items: [
      { n: "Shark FlexStyle air styler", q: "Shark FlexStyle air styling drying system", p: 280, k: "hairdryer" },
      { n: "Tangle Teezer detangling brush", q: "Tangle Teezer original detangling brush", p: 15, k: "brush" },
      { n: "Tweezerman manicure kit", q: "Tweezerman manicure kit", p: 35, k: "manicure" },
    ] },
  { id: "her-cook", for: "her", tier: 4, name: "Kitchen Overhaul",
    blurb: "Appliances that actually get used, not stored.",
    items: [
      { n: "Ninja air fryer", q: "Ninja air fryer", p: 130, k: "airfryer" },
      { n: "Instant Pot Duo 6 qt", q: "Instant Pot Duo 6 quart", p: 90, k: "pressurecooker" },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 45, k: "chefknife" },
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet" },
    ] },

  // ---------- FOR HIM ----------
  { id: "him-pocket", for: "him", tier: 1, name: "Pocket Essentials",
    blurb: "The keychain kit he'll use every single day.",
    items: [
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 25, k: "swissknife" },
      { n: "Gerber Shard keychain tool", q: "Gerber Shard keychain tool", p: 8, k: "keytool" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 14, k: "clippers" },
    ] },
  { id: "him-socks", for: "him", tier: 1, name: "Sock Drawer Reset",
    blurb: "One pair that lasts forever, plus a week's worth.",
    items: [
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough men's hiker micro crew socks", p: 26, k: "socks" },
      { n: "Amazon Essentials crew socks, 6 pack", q: "Amazon Essentials men's cotton crew socks 6 pack", p: 16, k: "socks2" },
    ] },
  { id: "him-phone", for: "him", tier: 1, name: "Phone Basics",
    blurb: "The charger, cable and case he keeps borrowing.",
    items: [
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 16, k: "charger" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 12, k: "cable" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 16, k: "phonecase" },
    ] },
  { id: "him-groom", for: "him", tier: 2, name: "Grooming Kit",
    blurb: "Trim, shave and tidy with tools that do the job.",
    items: [
      { n: "Philips Norelco OneBlade", q: "Philips Norelco OneBlade", p: 40, k: "shaver" },
      { n: "Tweezerman Slant Tweezer", q: "Tweezerman slant tweezer", p: 20, k: "tweezers" },
      { n: "Kent handmade comb", q: "Kent handmade comb men", p: 12, k: "comb" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 14, k: "clippers" },
    ] },
  { id: "him-edc", for: "him", tier: 2, name: "Everyday Carry",
    blurb: "A real multi-tool, a real light and a real lighter.",
    items: [
      { n: "Gerber Suspension NXT multi-tool", q: "Gerber Suspension NXT multi-tool", p: 35, k: "multitool" },
      { n: "Maglite Mini LED flashlight (made in USA)", q: "Maglite Mini LED flashlight", p: 25, k: "flashlight" },
      { n: "Zippo windproof lighter (made in USA)", q: "Zippo classic windproof lighter", p: 20, k: "lighter" },
    ] },
  { id: "him-drawer", for: "him", tier: 2, name: "Drawer Restock",
    blurb: "New underwear and socks. He won't buy them himself.",
    items: [
      { n: "Amazon Essentials boxer briefs, 6 pack", q: "Amazon Essentials men's boxer briefs 6 pack", p: 25, k: "underwear" },
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough men's hiker micro crew socks", p: 26, k: "socks" },
      { n: "Carhartt knit beanie", q: "Carhartt knit cuffed beanie", p: 20, k: "beanie" },
    ] },
  { id: "him-tools", for: "him", tier: 3, name: "Tool Drawer",
    blurb: "The multi-tool tradesmen swear by, and a light to go with it.",
    items: [
      { n: "Leatherman Wave+ (made in USA)", q: "Leatherman Wave Plus multitool", p: 110, k: "multitool" },
      { n: "Streamlight Stylus Pro penlight", q: "Streamlight Stylus Pro penlight", p: 25, k: "flashlight" },
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 25, k: "swissknife" },
    ] },
  { id: "him-kitchen", for: "him", tier: 3, name: "Cast Iron Cook",
    blurb: "Sear, slice and serve with gear made to last.",
    items: [
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet" },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 45, k: "chefknife" },
      { n: "John Boos maple cutting board (made in USA)", q: "John Boos maple cutting board", p: 60, k: "board" },
      { n: "ThermoWorks ThermoPop thermometer", q: "ThermoWorks ThermoPop", p: 35, k: "thermometer" },
    ] },
  { id: "him-audio", for: "him", tier: 3, name: "Phone Upgrade",
    blurb: "Earbuds and backup power for his iPhone.",
    items: [
      { n: "Apple AirPods 4", q: "Apple AirPods 4", p: 129, k: "earbuds" },
      { n: "Anker MagSafe power bank", q: "Anker MagGo magnetic power bank", p: 50, k: "powerbank" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 16, k: "charger" },
    ] },
  { id: "him-iphone", for: "him", tier: 4, name: "New iPhone",
    blurb: "The phone, plus everything it doesn't come with.",
    items: [
      { n: "Apple iPhone, unlocked", q: "Apple iPhone unlocked", p: 799, k: "iphone" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 16, k: "phonecase" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 16, k: "charger" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 12, k: "cable" },
    ] },
  { id: "him-bifl", for: "him", tier: 4, name: "Buy It For Life",
    blurb: "Knives and tools he'll hand down someday.",
    items: [
      { n: "Benchmade Bugout knife (made in USA)", q: "Benchmade Bugout 535", p: 180, k: "pocketknife" },
      { n: "Leatherman Wave+ (made in USA)", q: "Leatherman Wave Plus multitool", p: 110, k: "multitool" },
      { n: "YETI Rambler 20 oz tumbler", q: "YETI Rambler 20 oz tumbler", p: 35, k: "tumbler" },
    ] },
  { id: "him-shave", for: "him", tier: 4, name: "The Best Shave",
    blurb: "A top-tier shaver and the small tools that finish the job.",
    items: [
      { n: "Braun Series 9 electric shaver", q: "Braun Series 9 Pro electric shaver", p: 250, k: "shaver" },
      { n: "Tweezerman Slant Tweezer", q: "Tweezerman slant tweezer", p: 20, k: "tweezers" },
      { n: "Kent handmade comb", q: "Kent handmade comb men", p: 12, k: "comb" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 14, k: "clippers" },
    ] },
];
