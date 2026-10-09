// The 24 premade baskets: 12 for her, 12 for him, three per price tier.
// Practical things people actually use, from brands that hold up. American brands
// (and US-made, where it is) are preferred.
// Each item links to its exact Amazon product page (asin) and shows Amazon's own product image (img id on m.media-amazon.com).
// Fields: n = name, q = Amazon search phrase (fallback), p = typical price in USD, k = photo key (fallback), asin, img.

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
      { n: "Tweezerman Petite Tweeze Set, with travel case", q: "Tweezerman Petite Tweeze Set", p: 25, k: "tweezers", asin: "B000WI1VU8", img: "71K8sR73RbL" },
      { n: "Kent handmade comb", q: "Kent handmade comb", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L" },
      { n: "Burt's Bees lip balm, 4 pack", q: "Burt's Bees lip balm 4 pack", p: 10, k: "lipbalm", asin: "B0054LHI5A", img: "91us9dUgRQL" },
    ] },
  { id: "her-socks", for: "her", tier: 1, name: "Warm Feet",
    blurb: "Socks that last for years, plus a stack for every day.",
    items: [
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough women's hiking micro crew socks", p: 26, k: "socks", asin: "B0DN6R4429", img: "81sjOeJToaL" },
      { n: "Amazon Essentials crew socks, 6 pack", q: "Amazon Essentials women's cotton crew socks 6 pack", p: 10, k: "socks2", asin: "B07GRGKH71", img: "91YLUTugYOL" },
    ] },
  { id: "her-phone", for: "her", tier: 1, name: "Phone Basics",
    blurb: "The charger, cable and case everyone is always missing.",
    items: [
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L" },
    ] },
  { id: "her-grooming", for: "her", tier: 2, name: "Hair & Nails",
    blurb: "The good versions of the tools she already uses.",
    items: [
      { n: "Tweezerman manicure kit", q: "Tweezerman manicure kit", p: 21, k: "manicure", asin: "B002HK2H1G", img: "71WPh1H6M3L" },
      { n: "Tangle Teezer detangling brush", q: "Tangle Teezer original detangling brush", p: 13, k: "brush", asin: "B00JJ7T2V8", img: "71bdN8BegYL" },
      { n: "Tweezerman Petite Tweeze Set, with travel case", q: "Tweezerman Petite Tweeze Set", p: 25, k: "tweezers", asin: "B000WI1VU8", img: "71K8sR73RbL" },
      { n: "Kent handmade comb", q: "Kent handmade comb", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L" },
    ] },
  { id: "her-carry", for: "her", tier: 2, name: "Everyday Carry",
    blurb: "Keychain tools and a cup that keeps ice all day.",
    items: [
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 23, k: "swissknife", asin: "B092DZCM42", img: "51TUuUfhtCL" },
      { n: "Gerber Shard keychain tool", q: "Gerber Shard keychain tool", p: 7, k: "keytool", asin: "B077926SLG", img: "51l3PH9Xq-L" },
      { n: "Stanley Quencher 30 oz tumbler", q: "Stanley Quencher H2.0 30 oz", p: 33, k: "tumbler", asin: "B0CP9YB3Q4", img: "51-U5dEbEBL" },
      { n: "Streamlight Stylus Pro penlight", q: "Streamlight Stylus Pro penlight", p: 22, k: "flashlight", asin: "B0015UC17E", img: "61zNQEH+vhL" },
    ] },
  { id: "her-basics", for: "her", tier: 2, name: "Drawer Restock",
    blurb: "Fresh underwear and socks, the gift nobody buys themselves.",
    items: [
      { n: "Amazon Essentials underwear, 6 pack", q: "Amazon Essentials women's cotton bikini underwear 6 pack", p: 12, k: "underwear", asin: "B07HZ9YJQX", img: "71QQMTuA15L" },
      { n: "Bombas ankle socks, 4 pack", q: "Bombas women's ankle socks 4 pack", p: 40, k: "socks2", asin: "B0CW1N66K7", img: "510LDJLOAOL" },
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough women's hiking micro crew socks", p: 26, k: "socks", asin: "B0DN6R4429", img: "81sjOeJToaL" },
    ] },
  { id: "her-kitchen", for: "her", tier: 3, name: "Kitchen Workhorses",
    blurb: "Pans and knives that outlive the kitchen they're in.",
    items: [
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet", asin: "B00G2XGC88", img: "71uh7OjLpFL" },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 53, k: "chefknife", asin: "B008M5U1C2", img: "41Xx3Xy7NhL" },
      { n: "John Boos maple cutting board (made in USA)", q: "John Boos maple cutting board", p: 45, k: "board", asin: "B00063QBL8", img: "71NDmitWBcL" },
      { n: "OXO Good Grips kitchen tool set", q: "OXO Good Grips kitchen utensil set", p: 18, k: "utensils", asin: "B007638GOQ", img: "71zDeP+-0gL" },
    ] },
  { id: "her-audio", for: "her", tier: 3, name: "Phone Upgrade",
    blurb: "Earbuds and a battery that rides along with her iPhone.",
    items: [
      { n: "Apple AirPods 4", q: "Apple AirPods 4", p: 129, k: "earbuds", asin: "B0DGJ7HYG1", img: "61iBtxCUabL" },
      { n: "Anker MagSafe power bank", q: "Anker MagGo magnetic power bank", p: 80, k: "powerbank", asin: "B0D7DKJ75M", img: "618crocn6IL" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL" },
    ] },
  { id: "her-reader", for: "her", tier: 3, name: "Read & Rest",
    blurb: "A reader she'll use nightly and a mask for real sleep.",
    items: [
      { n: "Amazon Kindle Paperwhite", q: "Kindle Paperwhite", p: 200, k: "kindle", asin: "B0CFPJYX7P", img: "61KMlIaN9pL" },
      { n: "Manta sleep mask", q: "Manta sleep mask", p: 39, k: "sleepmask", asin: "B07PRG2CQY", img: "91j-EDBgLGL" },
    ] },
  { id: "her-iphone", for: "her", tier: 4, name: "New iPhone",
    blurb: "The phone, plus everything it doesn't come with.",
    items: [
      { n: "Apple iPhone, unlocked (Renewed)", q: "Apple iPhone unlocked", p: 304, k: "iphone", asin: "B0BN72FYFG", img: "61WUSYIQdKL" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL" },
    ] },
  { id: "her-hair", for: "her", tier: 4, name: "Salon at Home",
    blurb: "Dry, style and finish with tools that last.",
    items: [
      { n: "Shark FlexStyle air styler", q: "Shark FlexStyle air styling drying system", p: 199, k: "hairdryer", asin: "B0BBSFTJG5", img: "61SZx-gz+sL" },
      { n: "Tangle Teezer detangling brush", q: "Tangle Teezer original detangling brush", p: 13, k: "brush", asin: "B00JJ7T2V8", img: "71bdN8BegYL" },
      { n: "Tweezerman manicure kit", q: "Tweezerman manicure kit", p: 21, k: "manicure", asin: "B002HK2H1G", img: "71WPh1H6M3L" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L" },
      { n: "Kent handmade comb", q: "Kent handmade comb", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L" },
    ] },
  { id: "her-cook", for: "her", tier: 4, name: "Kitchen Overhaul",
    blurb: "Appliances that actually get used, not stored.",
    items: [
      { n: "Ninja air fryer", q: "Ninja air fryer", p: 90, k: "airfryer", asin: "B0CSZ7WBYW", img: "71jfzcXideL" },
      { n: "Instant Pot Duo 6 qt", q: "Instant Pot Duo 6 quart", p: 92, k: "pressurecooker", asin: "B00FLYWNYQ", img: "71MLaYtMFOL" },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 53, k: "chefknife", asin: "B008M5U1C2", img: "41Xx3Xy7NhL" },
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet", asin: "B00G2XGC88", img: "71uh7OjLpFL" },
    ] },

  // ---------- FOR HIM ----------
  { id: "him-pocket", for: "him", tier: 1, name: "Pocket Essentials",
    blurb: "The keychain kit he'll use every single day.",
    items: [
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 23, k: "swissknife", asin: "B092DZCM42", img: "51TUuUfhtCL" },
      { n: "Gerber Shard keychain tool", q: "Gerber Shard keychain tool", p: 7, k: "keytool", asin: "B077926SLG", img: "51l3PH9Xq-L" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L" },
    ] },
  { id: "him-socks", for: "him", tier: 1, name: "Sock Drawer Reset",
    blurb: "One pair that lasts forever, plus a week's worth.",
    items: [
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough men's hiker micro crew socks", p: 26, k: "socks", asin: "B01AITV95C", img: "91d3EtkBo2S" },
      { n: "Amazon Essentials crew socks, 6 pack", q: "Amazon Essentials men's cotton crew socks 6 pack", p: 14, k: "socks2", asin: "B07Q34YLTW", img: "81nDQGaP4EL" },
    ] },
  { id: "him-phone", for: "him", tier: 1, name: "Phone Basics",
    blurb: "The charger, cable and case he keeps borrowing.",
    items: [
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L" },
    ] },
  { id: "him-groom", for: "him", tier: 2, name: "Grooming Kit",
    blurb: "Trim, shave and tidy with tools that do the job.",
    items: [
      { n: "Philips Norelco OneBlade", q: "Philips Norelco OneBlade", p: 30, k: "shaver", asin: "B0BZQTSBWZ", img: "71GIIOqNSYL" },
      { n: "Tweezerman Essential Grooming Kit for Men", q: "Tweezerman Essential Grooming Kit for Men", p: 36, k: "tweezers", asin: "B00I8H6FUG", img: "61QSKRniPNL" },
      { n: "Kent handmade comb", q: "Kent handmade comb men", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L" },
    ] },
  { id: "him-edc", for: "him", tier: 2, name: "Everyday Carry",
    blurb: "A real multi-tool, a real light and a real lighter.",
    items: [
      { n: "Gerber Suspension NXT multi-tool", q: "Gerber Suspension NXT multi-tool", p: 35, k: "multitool", asin: "B07DD69QN3", img: "71tYG5COZJL" },
      { n: "Maglite Mini LED flashlight (made in USA)", q: "Maglite Mini LED flashlight", p: 19, k: "flashlight", asin: "B005UUSAAM", img: "51m7QYk0CDL" },
      { n: "Zippo windproof lighter (made in USA)", q: "Zippo classic windproof lighter", p: 18, k: "lighter", asin: "B001E5FLT0", img: "71CtxoQh03L" },
    ] },
  { id: "him-drawer", for: "him", tier: 2, name: "Drawer Restock",
    blurb: "New underwear and socks. He won't buy them himself.",
    items: [
      { n: "Amazon Essentials boxer briefs, 6 pack", q: "Amazon Essentials men's boxer briefs 6 pack", p: 16, k: "underwear", asin: "B06XWNNRV3", img: "81KpyxFY6dL" },
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough men's hiker micro crew socks", p: 26, k: "socks", asin: "B01AITV95C", img: "91d3EtkBo2S" },
      { n: "Carhartt knit beanie", q: "Carhartt knit cuffed beanie", p: 20, k: "beanie", asin: "B002G9UDYG", img: "81W5UTTEaYL" },
    ] },
  { id: "him-tools", for: "him", tier: 3, name: "Tool Drawer",
    blurb: "The multi-tool tradesmen swear by, and a light to go with it.",
    items: [
      { n: "Leatherman Wave+ (made in USA)", q: "Leatherman Wave Plus multitool", p: 130, k: "multitool", asin: "B079MJ6MLV", img: "61mYFLynAHL" },
      { n: "Streamlight Stylus Pro penlight", q: "Streamlight Stylus Pro penlight", p: 22, k: "flashlight", asin: "B0015UC17E", img: "61zNQEH+vhL" },
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 23, k: "swissknife", asin: "B092DZCM42", img: "51TUuUfhtCL" },
    ] },
  { id: "him-kitchen", for: "him", tier: 3, name: "Cast Iron Cook",
    blurb: "Sear, slice and serve with gear made to last.",
    items: [
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet", asin: "B00G2XGC88", img: "71uh7OjLpFL" },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 53, k: "chefknife", asin: "B008M5U1C2", img: "41Xx3Xy7NhL" },
      { n: "John Boos maple cutting board (made in USA)", q: "John Boos maple cutting board", p: 45, k: "board", asin: "B00063QBL8", img: "71NDmitWBcL" },
      { n: "ThermoWorks ThermoPop thermometer", q: "ThermoWorks ThermoPop", p: 47, k: "thermometer", asin: "B0DC8FD41B", img: "61V0ePL2QbL" },
    ] },
  { id: "him-audio", for: "him", tier: 3, name: "Phone Upgrade",
    blurb: "Earbuds and backup power for his iPhone.",
    items: [
      { n: "Apple AirPods 4", q: "Apple AirPods 4", p: 129, k: "earbuds", asin: "B0DGJ7HYG1", img: "61iBtxCUabL" },
      { n: "Anker MagSafe power bank", q: "Anker MagGo magnetic power bank", p: 80, k: "powerbank", asin: "B0D7DKJ75M", img: "618crocn6IL" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL" },
    ] },
  { id: "him-iphone", for: "him", tier: 4, name: "New iPhone",
    blurb: "The phone, plus everything it doesn't come with.",
    items: [
      { n: "Apple iPhone, unlocked (Renewed)", q: "Apple iPhone unlocked", p: 304, k: "iphone", asin: "B0BN72FYFG", img: "61WUSYIQdKL" },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L" },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL" },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL" },
    ] },
  { id: "him-bifl", for: "him", tier: 4, name: "Buy It For Life",
    blurb: "Knives and tools he'll hand down someday.",
    items: [
      { n: "Benchmade Bugout knife (made in USA)", q: "Benchmade Bugout 535", p: 190, k: "pocketknife", asin: "B0BW9WJTDR", img: "71DZYli05fL" },
      { n: "Leatherman Wave+ (made in USA)", q: "Leatherman Wave Plus multitool", p: 130, k: "multitool", asin: "B079MJ6MLV", img: "61mYFLynAHL" },
      { n: "YETI Rambler 20 oz tumbler", q: "YETI Rambler 20 oz tumbler", p: 35, k: "tumbler", asin: "B0GP99ZYSH", img: "51VPOyn0o5L" },
    ] },
  { id: "him-shave", for: "him", tier: 4, name: "The Best Shave",
    blurb: "A top-tier shaver and the small tools that finish the job.",
    items: [
      { n: "Braun Series 9 electric shaver", q: "Braun Series 9 Pro electric shaver", p: 260, k: "shaver", asin: "B09B152YGK", img: "81Ljcn-FwcL" },
      { n: "Tweezerman Essential Grooming Kit for Men", q: "Tweezerman Essential Grooming Kit for Men", p: 36, k: "tweezers", asin: "B00I8H6FUG", img: "61QSKRniPNL" },
      { n: "Kent handmade comb", q: "Kent handmade comb men", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L" },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L" },
    ] },
];
