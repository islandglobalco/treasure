// The 24 premade baskets: 12 for her, 12 for him, three per price tier.
// Practical things people actually use, from brands that hold up. American brands
// (and US-made, where it is) are preferred.
// Each item links to its exact Amazon product page (asin) and shows Amazon's own product image (img id on m.media-amazon.com).
// Fields: n = name, q = Amazon search phrase (fallback), p = typical price in USD, k = photo key (fallback), asin, img, imgs (5 photos).

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
      { n: "Tweezerman Petite Tweeze Set, with travel case", q: "Tweezerman Petite Tweeze Set", p: 25, k: "tweezers", asin: "B000WI1VU8", img: "71K8sR73RbL", imgs: ["71K8sR73RbL", "71VOFJhGbhL", "71WmC8Xjr5L", "61vp5VX7pQL", "71KY2XKrqwL"] },
      { n: "Kent handmade comb", q: "Kent handmade comb", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L", imgs: ["81tJUc1PQ5L", "71F5nPT4R+L", "61WKMXqaqML", "71hXKbYVN3L", "51D2mXBwYrL"] },
      { n: "Burt's Bees lip balm, 4 pack", q: "Burt's Bees lip balm 4 pack", p: 10, k: "lipbalm", asin: "B0054LHI5A", img: "91us9dUgRQL", imgs: ["91us9dUgRQL", "81JHFR5IlkL", "71tOXKcxBNL", "91GZKXMXqoL", "81tI1DjNFUL"] },
    ] },
  { id: "her-socks", for: "her", tier: 1, name: "Warm Feet",
    blurb: "Socks that last for years, plus a stack for every day.",
    items: [
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough women's hiking micro crew socks", p: 26, k: "socks", asin: "B0DN6R4429", img: "81sjOeJToaL", imgs: ["81sjOeJToaL", "81yJQmYPBoL", "71oHknVvOsL", "71XmJKO-GXL", "61qJ1hnqOEL"] },
      { n: "Amazon Essentials crew socks, 6 pack", q: "Amazon Essentials women's cotton crew socks 6 pack", p: 10, k: "socks2", asin: "B07GRGKH71", img: "91YLUTugYOL", imgs: ["91YLUTugYOL", "91EJhSWr+eL", "811nWqj9NmL", "91Dh2EoZ0IL", "91hO2+mSwOL"] },
    ] },
  { id: "her-phone", for: "her", tier: 1, name: "Phone Basics",
    blurb: "The charger, cable and case everyone is always missing.",
    items: [
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL", imgs: ["719R46dVUTL", "71CzJ0WnGBL", "71iP9RKdKgL", "71cQ3RYS6vL", "71KwFQW35KL"] },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL", imgs: ["71fWdhjLjJL", "71U-E0R68ML", "71zRZLhJ0nL", "71WHjpKL76L", "710YVuwPwIL"] },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L", imgs: ["61EWd1CP+2L", "61S5Z5LhPsL", "611rz+0xKhL", "61TczUONvnL", "61nW7KZuHIL"] },
    ] },
  { id: "her-grooming", for: "her", tier: 2, name: "Hair & Nails",
    blurb: "The good versions of the tools she already uses.",
    items: [
      { n: "Tweezerman manicure kit", q: "Tweezerman manicure kit", p: 21, k: "manicure", asin: "B002HK2H1G", img: "71WPh1H6M3L", imgs: ["71WPh1H6M3L", "71N5UBJ0JEL", "71vZYvqPBEL", "610nD5K+0wL", "71zH+1xIa0L"] },
      { n: "Tangle Teezer detangling brush", q: "Tangle Teezer original detangling brush", p: 13, k: "brush", asin: "B00JJ7T2V8", img: "71bdN8BegYL", imgs: ["71bdN8BegYL", "71J+hVXw7bL", "71lOqGLFvWL", "61pPl3JYaWL", "71XyVJxqvWL"] },
      { n: "Tweezerman Petite Tweeze Set, with travel case", q: "Tweezerman Petite Tweeze Set", p: 25, k: "tweezers", asin: "B000WI1VU8", img: "71K8sR73RbL", imgs: ["71K8sR73RbL", "71VOFJhGbhL", "71WmC8Xjr5L", "61vp5VX7pQL", "71KY2XKrqwL"] },
      { n: "Kent handmade comb", q: "Kent handmade comb", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L", imgs: ["81tJUc1PQ5L", "71F5nPT4R+L", "61WKMXqaqML", "71hXKbYVN3L", "51D2mXBwYrL"] },
    ] },
  { id: "her-carry", for: "her", tier: 2, name: "Everyday Carry",
    blurb: "Keychain tools and a cup that keeps ice all day.",
    items: [
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 23, k: "swissknife", asin: "B092DZCM42", img: "51TUuUfhtCL", imgs: ["51TUuUfhtCL", "51U+KvqNnxL", "41YQkwqH5zL", "51gCWzMpnhL", "41xCNqgkiUL"] },
      { n: "Gerber Shard keychain tool", q: "Gerber Shard keychain tool", p: 7, k: "keytool", asin: "B077926SLG", img: "51l3PH9Xq-L", imgs: ["51l3PH9Xq-L", "51SJYUELYsL", "41kj5H0YTTL", "51h3VRDJPjL", "51cZ-a2VGCL"] },
      { n: "Stanley Quencher 30 oz tumbler", q: "Stanley Quencher H2.0 30 oz", p: 33, k: "tumbler", asin: "B0CP9YB3Q4", img: "51-U5dEbEBL", imgs: ["51-U5dEbEBL", "51r8pYqJ5dL", "51WGh+DL8HL", "51TnzJ8MMAL", "51HbKFYOCKL"] },
      { n: "Streamlight Stylus Pro penlight", q: "Streamlight Stylus Pro penlight", p: 22, k: "flashlight", asin: "B0015UC17E", img: "61zNQEH+vhL", imgs: ["61zNQEH+vhL", "61K2mxWPHAL", "515vQvW6BHL", "61YBN7V8HRL", "51VLEz-CPGL"] },
    ] },
  { id: "her-basics", for: "her", tier: 2, name: "Drawer Restock",
    blurb: "Fresh underwear and socks, the gift nobody buys themselves.",
    items: [
      { n: "Amazon Essentials underwear, 6 pack", q: "Amazon Essentials women's cotton bikini underwear 6 pack", p: 12, k: "underwear", asin: "B07HZ9YJQX", img: "71QQMTuA15L", imgs: ["71QQMTuA15L", "71QhOQFx3NL", "71eZGMqPlPL", "71xL9VN0n-L", "71hs6jLpqML"] },
      { n: "Bombas ankle socks, 4 pack", q: "Bombas women's ankle socks 4 pack", p: 40, k: "socks2", asin: "B0CW1N66K7", img: "510LDJLOAOL", imgs: ["510LDJLOAOL", "51O4rYaECiL", "51GY1DlFSoL", "51k6xV0Jq7L", "51YKx-tNJhL"] },
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough women's hiking micro crew socks", p: 26, k: "socks", asin: "B0DN6R4429", img: "81sjOeJToaL", imgs: ["81sjOeJToaL", "81yJQmYPBoL", "71oHknVvOsL", "71XmJKO-GXL", "61qJ1hnqOEL"] },
    ] },
  { id: "her-kitchen", for: "her", tier: 3, name: "Kitchen Workhorses",
    blurb: "Pans and knives that outlive the kitchen they're in.",
    items: [
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet", asin: "B00G2XGC88", img: "71uh7OjLpFL", imgs: ["71uh7OjLpFL", "81azcDh1k9L", "71r3qyB5gGL", "71TpZWddRnL", "81xNpN4bnKL"] },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 53, k: "chefknife", asin: "B008M5U1C2", img: "41Xx3Xy7NhL", imgs: ["41Xx3Xy7NhL", "41SHN4bVczL", "41qT0P7L5GL", "41hLf37mBQL", "41gHrKW5x+L"] },
      { n: "John Boos maple cutting board (made in USA)", q: "John Boos maple cutting board", p: 45, k: "board", asin: "B00063QBL8", img: "71NDmitWBcL", imgs: ["71NDmitWBcL", "71WHhVvYXeL", "71L7uCYfIGL", "71NUj2VV7yL", "71Vx+eZCaHL"] },
      { n: "OXO Good Grips kitchen tool set", q: "OXO Good Grips kitchen utensil set", p: 18, k: "utensils", asin: "B007638GOQ", img: "71zDeP+-0gL", imgs: ["71zDeP+-0gL", "71Q1vvZm7XL", "7180j-T5bQL", "71fLkH5eCUL", "71hCd0LJ5nL"] },
    ] },
  { id: "her-audio", for: "her", tier: 3, name: "Phone Upgrade",
    blurb: "Earbuds and a battery that rides along with her iPhone.",
    items: [
      { n: "Apple AirPods 4", q: "Apple AirPods 4", p: 129, k: "earbuds", asin: "B0DGJ7HYG1", img: "61iBtxCUabL", imgs: ["61iBtxCUabL", "61HU0DXKPNL", "61v0NaZs7bL", "61PaYkM4KAL", "61L5Db-KQIL"] },
      { n: "Anker MagSafe power bank", q: "Anker MagGo magnetic power bank", p: 80, k: "powerbank", asin: "B0D7DKJ75M", img: "618crocn6IL", imgs: ["618crocn6IL", "61sQe2YLcwL", "61kXS91DQNL", "61K4JgLgipL", "61PVGWa9gCL"] },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL", imgs: ["719R46dVUTL", "71CzJ0WnGBL", "71iP9RKdKgL", "71cQ3RYS6vL", "71KwFQW35KL"] },
    ] },
  { id: "her-reader", for: "her", tier: 3, name: "Read & Rest",
    blurb: "A reader she'll use nightly and a mask for real sleep.",
    items: [
      { n: "Amazon Kindle Paperwhite", q: "Kindle Paperwhite", p: 200, k: "kindle", asin: "B0CFPJYX7P", img: "61KMlIaN9pL", imgs: ["61KMlIaN9pL", "61sZw4aKStL", "51XH-dTqvbL", "61PK9VnHHwL", "61H0TJb+8YL"] },
      { n: "Manta sleep mask", q: "Manta sleep mask", p: 39, k: "sleepmask", asin: "B07PRG2CQY", img: "91j-EDBgLGL", imgs: ["91j-EDBgLGL", "91M6JmJ8bYL", "91l5OTvvzxL", "81xF1kLCL5L", "91N5KSRJ-wL"] },
    ] },
  { id: "her-iphone", for: "her", tier: 4, name: "New iPhone",
    blurb: "The phone, plus everything it doesn't come with.",
    items: [
      { n: "Apple iPhone, unlocked (Renewed)", q: "Apple iPhone unlocked", p: 304, k: "iphone", asin: "B0BN72FYFG", img: "61WUSYIQdKL", imgs: ["61WUSYIQdKL", "61q8-N-LSBL", "61JKEwN5KHL", "61JVHW5vFRL", "613VY4kK-dL"] },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L", imgs: ["61EWd1CP+2L", "61S5Z5LhPsL", "611rz+0xKhL", "61TczUONvnL", "61nW7KZuHIL"] },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL", imgs: ["719R46dVUTL", "71CzJ0WnGBL", "71iP9RKdKgL", "71cQ3RYS6vL", "71KwFQW35KL"] },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL", imgs: ["71fWdhjLjJL", "71U-E0R68ML", "71zRZLhJ0nL", "71WHjpKL76L", "710YVuwPwIL"] },
    ] },
  { id: "her-hair", for: "her", tier: 4, name: "Salon at Home",
    blurb: "Dry, style and finish with tools that last.",
    items: [
      { n: "Shark FlexStyle air styler", q: "Shark FlexStyle air styling drying system", p: 199, k: "hairdryer", asin: "B0BBSFTJG5", img: "61SZx-gz+sL", imgs: ["61SZx-gz+sL", "61TYPQw5UOL", "61xJh3V2H-L", "61MZI3VdXpL", "61KvqVX6FIL"] },
      { n: "Tangle Teezer detangling brush", q: "Tangle Teezer original detangling brush", p: 13, k: "brush", asin: "B00JJ7T2V8", img: "71bdN8BegYL", imgs: ["71bdN8BegYL", "71J+hVXw7bL", "71lOqGLFvWL", "61pPl3JYaWL", "71XyVJxqvWL"] },
      { n: "Tweezerman manicure kit", q: "Tweezerman manicure kit", p: 21, k: "manicure", asin: "B002HK2H1G", img: "71WPh1H6M3L", imgs: ["71WPh1H6M3L", "71N5UBJ0JEL", "71vZYvqPBEL", "610nD5K+0wL", "71zH+1xIa0L"] },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L", imgs: ["51XnmJJl-7L", "51z+g85PMWL", "41i3+6m-C1L", "51RJoVdnwPL", "41pnCKlYIRL"] },
      { n: "Kent handmade comb", q: "Kent handmade comb", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L", imgs: ["81tJUc1PQ5L", "71F5nPT4R+L", "61WKMXqaqML", "71hXKbYVN3L", "51D2mXBwYrL"] },
    ] },
  { id: "her-cook", for: "her", tier: 4, name: "Kitchen Overhaul",
    blurb: "Appliances that actually get used, not stored.",
    items: [
      { n: "Ninja air fryer", q: "Ninja air fryer", p: 90, k: "airfryer", asin: "B0CSZ7WBYW", img: "71jfzcXideL", imgs: ["71jfzcXideL", "71Yq3Z2MKJL", "71TrFwmfcfL", "71M8V+xvXqL", "71DLrNO9CQL"] },
      { n: "Instant Pot Duo 6 qt", q: "Instant Pot Duo 6 quart", p: 92, k: "pressurecooker", asin: "B00FLYWNYQ", img: "71MLaYtMFOL", imgs: ["71MLaYtMFOL", "71r8N2HXWAL", "71uLJnJsmAL", "71Xd1B-pBjL", "71qpKvgqfZL"] },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 53, k: "chefknife", asin: "B008M5U1C2", img: "41Xx3Xy7NhL", imgs: ["41Xx3Xy7NhL", "41SHN4bVczL", "41qT0P7L5GL", "41hLf37mBQL", "41gHrKW5x+L"] },
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet", asin: "B00G2XGC88", img: "71uh7OjLpFL", imgs: ["71uh7OjLpFL", "81azcDh1k9L", "71r3qyB5gGL", "71TpZWddRnL", "81xNpN4bnKL"] },
    ] },

  // ---------- FOR HIM ----------
  { id: "him-pocket", for: "him", tier: 1, name: "Pocket Essentials",
    blurb: "The keychain kit he'll use every single day.",
    items: [
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 23, k: "swissknife", asin: "B092DZCM42", img: "51TUuUfhtCL", imgs: ["51TUuUfhtCL", "51U+KvqNnxL", "41YQkwqH5zL", "51gCWzMpnhL", "41xCNqgkiUL"] },
      { n: "Gerber Shard keychain tool", q: "Gerber Shard keychain tool", p: 7, k: "keytool", asin: "B077926SLG", img: "51l3PH9Xq-L", imgs: ["51l3PH9Xq-L", "51SJYUELYsL", "41kj5H0YTTL", "51h3VRDJPjL", "51cZ-a2VGCL"] },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L", imgs: ["51XnmJJl-7L", "51z+g85PMWL", "41i3+6m-C1L", "51RJoVdnwPL", "41pnCKlYIRL"] },
    ] },
  { id: "him-socks", for: "him", tier: 1, name: "Sock Drawer Reset",
    blurb: "One pair that lasts forever, plus a week's worth.",
    items: [
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough men's hiker micro crew socks", p: 26, k: "socks", asin: "B01AITV95C", img: "91d3EtkBo2S", imgs: ["91d3EtkBo2S", "91X5z0SvTCL", "91rVe7DWd7L", "91qhQPiA9nL", "91lh7q0QgwL"] },
      { n: "Amazon Essentials crew socks, 6 pack", q: "Amazon Essentials men's cotton crew socks 6 pack", p: 14, k: "socks2", asin: "B07Q34YLTW", img: "81nDQGaP4EL", imgs: ["81nDQGaP4EL", "81xJnKoEkNL", "71L0Y1V8YnL", "81xv6C2ZSAL", "71WFDAX7tML"] },
    ] },
  { id: "him-phone", for: "him", tier: 1, name: "Phone Basics",
    blurb: "The charger, cable and case he keeps borrowing.",
    items: [
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL", imgs: ["719R46dVUTL", "71CzJ0WnGBL", "71iP9RKdKgL", "71cQ3RYS6vL", "71KwFQW35KL"] },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL", imgs: ["71fWdhjLjJL", "71U-E0R68ML", "71zRZLhJ0nL", "71WHjpKL76L", "710YVuwPwIL"] },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L", imgs: ["61EWd1CP+2L", "61S5Z5LhPsL", "611rz+0xKhL", "61TczUONvnL", "61nW7KZuHIL"] },
    ] },
  { id: "him-groom", for: "him", tier: 2, name: "Grooming Kit",
    blurb: "Trim, shave and tidy with tools that do the job.",
    items: [
      { n: "Philips Norelco OneBlade", q: "Philips Norelco OneBlade", p: 30, k: "shaver", asin: "B0BZQTSBWZ", img: "71GIIOqNSYL", imgs: ["71GIIOqNSYL", "61X7MljK8JL", "71H8CqLiZAL", "71qPpCJWV3L", "71VgKFHF3zL"] },
      { n: "Tweezerman Essential Grooming Kit for Men", q: "Tweezerman Essential Grooming Kit for Men", p: 36, k: "tweezers", asin: "B00I8H6FUG", img: "61QSKRniPNL", imgs: ["61QSKRniPNL", "61ZqV-kqfSL", "51H+nXgN0JL", "61gI0CKHpkL", "61pq1L+4YML"] },
      { n: "Kent handmade comb", q: "Kent handmade comb men", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L", imgs: ["81tJUc1PQ5L", "71F5nPT4R+L", "61WKMXqaqML", "71hXKbYVN3L", "51D2mXBwYrL"] },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L", imgs: ["51XnmJJl-7L", "51z+g85PMWL", "41i3+6m-C1L", "51RJoVdnwPL", "41pnCKlYIRL"] },
    ] },
  { id: "him-edc", for: "him", tier: 2, name: "Everyday Carry",
    blurb: "A real multi-tool, a real light and a real lighter.",
    items: [
      { n: "Gerber Suspension NXT multi-tool", q: "Gerber Suspension NXT multi-tool", p: 35, k: "multitool", asin: "B07DD69QN3", img: "71tYG5COZJL", imgs: ["71tYG5COZJL", "71ZSDA7ZCML", "716t4FZFQAL", "71t2LnhGrlL", "71KpGKJN5lL"] },
      { n: "Maglite Mini LED flashlight (made in USA)", q: "Maglite Mini LED flashlight", p: 19, k: "flashlight", asin: "B005UUSAAM", img: "51m7QYk0CDL", imgs: ["51m7QYk0CDL", "516OuXKrMrL", "51dL6CjXJYL", "51c0+k8agpL", "51EZ8o2a9XL"] },
      { n: "Zippo windproof lighter (made in USA)", q: "Zippo classic windproof lighter", p: 18, k: "lighter", asin: "B001E5FLT0", img: "71CtxoQh03L", imgs: ["71CtxoQh03L", "71YHGZXVBAL", "7168O3QxsKL", "71OdGqfHvJL", "71N+vJvbW5L"] },
    ] },
  { id: "him-drawer", for: "him", tier: 2, name: "Drawer Restock",
    blurb: "New underwear and socks. He won't buy them himself.",
    items: [
      { n: "Amazon Essentials boxer briefs, 6 pack", q: "Amazon Essentials men's boxer briefs 6 pack", p: 16, k: "underwear", asin: "B06XWNNRV3", img: "81KpyxFY6dL", imgs: ["81KpyxFY6dL", "81YPj3dKe-L", "81hZ2AiR8qL", "81KJ+1Fb97L", "81MhYhE+bKL"] },
      { n: "Darn Tough hiking socks (made in Vermont)", q: "Darn Tough men's hiker micro crew socks", p: 26, k: "socks", asin: "B01AITV95C", img: "91d3EtkBo2S", imgs: ["91d3EtkBo2S", "91X5z0SvTCL", "91rVe7DWd7L", "91qhQPiA9nL", "91lh7q0QgwL"] },
      { n: "Carhartt knit beanie", q: "Carhartt knit cuffed beanie", p: 20, k: "beanie", asin: "B002G9UDYG", img: "81W5UTTEaYL", imgs: ["81W5UTTEaYL", "81yL7hUIBfL", "81Z9LZBbfOL", "81TJNjPVwcL", "81qI5FCqDCL"] },
    ] },
  { id: "him-tools", for: "him", tier: 3, name: "Tool Drawer",
    blurb: "The multi-tool tradesmen swear by, and a light to go with it.",
    items: [
      { n: "Leatherman Wave+ (made in USA)", q: "Leatherman Wave Plus multitool", p: 130, k: "multitool", asin: "B079MJ6MLV", img: "61mYFLynAHL", imgs: ["61mYFLynAHL", "61Y1sDz7+jL", "61rYE5A-oGL", "61l6bJcQn5L", "61MJ0jhXE1L"] },
      { n: "Streamlight Stylus Pro penlight", q: "Streamlight Stylus Pro penlight", p: 22, k: "flashlight", asin: "B0015UC17E", img: "61zNQEH+vhL", imgs: ["61zNQEH+vhL", "61K2mxWPHAL", "515vQvW6BHL", "61YBN7V8HRL", "51VLEz-CPGL"] },
      { n: "Victorinox Swiss Army Classic SD", q: "Victorinox Swiss Army Classic SD", p: 23, k: "swissknife", asin: "B092DZCM42", img: "51TUuUfhtCL", imgs: ["51TUuUfhtCL", "51U+KvqNnxL", "41YQkwqH5zL", "51gCWzMpnhL", "41xCNqgkiUL"] },
    ] },
  { id: "him-kitchen", for: "him", tier: 3, name: "Cast Iron Cook",
    blurb: "Sear, slice and serve with gear made to last.",
    items: [
      { n: "Lodge 12-inch cast iron skillet (made in USA)", q: "Lodge 12 inch cast iron skillet", p: 35, k: "skillet", asin: "B00G2XGC88", img: "71uh7OjLpFL", imgs: ["71uh7OjLpFL", "81azcDh1k9L", "71r3qyB5gGL", "71TpZWddRnL", "81xNpN4bnKL"] },
      { n: "Victorinox Fibrox 8-inch chef's knife", q: "Victorinox Fibrox Pro 8 inch chef's knife", p: 53, k: "chefknife", asin: "B008M5U1C2", img: "41Xx3Xy7NhL", imgs: ["41Xx3Xy7NhL", "41SHN4bVczL", "41qT0P7L5GL", "41hLf37mBQL", "41gHrKW5x+L"] },
      { n: "John Boos maple cutting board (made in USA)", q: "John Boos maple cutting board", p: 45, k: "board", asin: "B00063QBL8", img: "71NDmitWBcL", imgs: ["71NDmitWBcL", "71WHhVvYXeL", "71L7uCYfIGL", "71NUj2VV7yL", "71Vx+eZCaHL"] },
      { n: "ThermoWorks ThermoPop thermometer", q: "ThermoWorks ThermoPop", p: 47, k: "thermometer", asin: "B0DC8FD41B", img: "61V0ePL2QbL", imgs: ["61V0ePL2QbL", "61cCHdvXKmL", "61AyJV2T3NL", "61JxOvXK8WL", "61V8LQ2vvpL"] },
    ] },
  { id: "him-audio", for: "him", tier: 3, name: "Phone Upgrade",
    blurb: "Earbuds and backup power for his iPhone.",
    items: [
      { n: "Apple AirPods 4", q: "Apple AirPods 4", p: 129, k: "earbuds", asin: "B0DGJ7HYG1", img: "61iBtxCUabL", imgs: ["61iBtxCUabL", "61HU0DXKPNL", "61v0NaZs7bL", "61PaYkM4KAL", "61L5Db-KQIL"] },
      { n: "Anker MagSafe power bank", q: "Anker MagGo magnetic power bank", p: 80, k: "powerbank", asin: "B0D7DKJ75M", img: "618crocn6IL", imgs: ["618crocn6IL", "61sQe2YLcwL", "61kXS91DQNL", "61K4JgLgipL", "61PVGWa9gCL"] },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL", imgs: ["719R46dVUTL", "71CzJ0WnGBL", "71iP9RKdKgL", "71cQ3RYS6vL", "71KwFQW35KL"] },
    ] },
  { id: "him-iphone", for: "him", tier: 4, name: "New iPhone",
    blurb: "The phone, plus everything it doesn't come with.",
    items: [
      { n: "Apple iPhone, unlocked (Renewed)", q: "Apple iPhone unlocked", p: 304, k: "iphone", asin: "B0BN72FYFG", img: "61WUSYIQdKL", imgs: ["61WUSYIQdKL", "61q8-N-LSBL", "61JKEwN5KHL", "61JVHW5vFRL", "613VY4kK-dL"] },
      { n: "Spigen iPhone case", q: "Spigen iPhone case", p: 15, k: "phonecase", asin: "B0FD28CZDK", img: "61EWd1CP+2L", imgs: ["61EWd1CP+2L", "61S5Z5LhPsL", "611rz+0xKhL", "61TczUONvnL", "61nW7KZuHIL"] },
      { n: "Anker 20W USB-C fast charger", q: "Anker 20W USB-C charger iPhone", p: 17, k: "charger", asin: "B0C8HHV9DK", img: "719R46dVUTL", imgs: ["719R46dVUTL", "71CzJ0WnGBL", "71iP9RKdKgL", "71cQ3RYS6vL", "71KwFQW35KL"] },
      { n: "Anker USB-C cable, 6 ft", q: "Anker USB-C to USB-C cable 6ft", p: 13, k: "cable", asin: "B09LCJPZ1P", img: "71fWdhjLjJL", imgs: ["71fWdhjLjJL", "71U-E0R68ML", "71zRZLhJ0nL", "71WHjpKL76L", "710YVuwPwIL"] },
    ] },
  { id: "him-bifl", for: "him", tier: 4, name: "Buy It For Life",
    blurb: "Knives and tools he'll hand down someday.",
    items: [
      { n: "Benchmade Bugout knife (made in USA)", q: "Benchmade Bugout 535", p: 190, k: "pocketknife", asin: "B0BW9WJTDR", img: "71DZYli05fL", imgs: ["71DZYli05fL", "71gEU5JTHQL", "71d6MSUAKLL", "71D+wVT2NnL", "71CdwRHcXKL"] },
      { n: "Leatherman Wave+ (made in USA)", q: "Leatherman Wave Plus multitool", p: 130, k: "multitool", asin: "B079MJ6MLV", img: "61mYFLynAHL", imgs: ["61mYFLynAHL", "61Y1sDz7+jL", "61rYE5A-oGL", "61l6bJcQn5L", "61MJ0jhXE1L"] },
      { n: "YETI Rambler 20 oz tumbler", q: "YETI Rambler 20 oz tumbler", p: 35, k: "tumbler", asin: "B0GP99ZYSH", img: "51VPOyn0o5L", imgs: ["51VPOyn0o5L", "51b6oD6mILL", "51MNrXXjWxL", "51Fh0VbKtcL", "51xVF9-QKRL"] },
    ] },
  { id: "him-shave", for: "him", tier: 4, name: "The Best Shave",
    blurb: "A top-tier shaver and the small tools that finish the job.",
    items: [
      { n: "Braun Series 9 electric shaver", q: "Braun Series 9 Pro electric shaver", p: 260, k: "shaver", asin: "B09B152YGK", img: "81Ljcn-FwcL", imgs: ["81Ljcn-FwcL", "81ZCQABC9wL", "81XR7g0QUFL", "81JBQP8bKqL", "81g0YblqI9L"] },
      { n: "Tweezerman Essential Grooming Kit for Men", q: "Tweezerman Essential Grooming Kit for Men", p: 36, k: "tweezers", asin: "B00I8H6FUG", img: "61QSKRniPNL", imgs: ["61QSKRniPNL", "61ZqV-kqfSL", "51H+nXgN0JL", "61gI0CKHpkL", "61pq1L+4YML"] },
      { n: "Kent handmade comb", q: "Kent handmade comb men", p: 10, k: "comb", asin: "B002IZSBLU", img: "81tJUc1PQ5L", imgs: ["81tJUc1PQ5L", "71F5nPT4R+L", "61WKMXqaqML", "71hXKbYVN3L", "51D2mXBwYrL"] },
      { n: "Seki Edge nail clipper", q: "Seki Edge nail clipper", p: 18, k: "clippers", asin: "B000F35R00", img: "51XnmJJl-7L", imgs: ["51XnmJJl-7L", "51z+g85PMWL", "41i3+6m-C1L", "51RJoVdnwPL", "41pnCKlYIRL"] },
    ] },
];
