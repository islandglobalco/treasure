// POST /api/curate  { query: "my dad, loves grilling, $150" }
// Asks Claude for a gift basket and returns { title, note, items: [{ name, search, price, why }] }.
// The page falls back to its built-in curator if this fails, so errors here never break the site.

const MODEL = process.env.CLAUDE_MODEL || "claude-haiku-5-5";

const SYSTEM = `You are the gift curator for Treasure.gift, which builds gift baskets from products sold on Amazon.
Given a description of a recipient (who they are, interests, occasion, budget), build ONE cohesive basket of 3 to 5 gifts.
Rules:
- Stay within the stated budget (sum of prices at most 10% over). If no budget is given, assume about $100.
- Pick generic, widely available product types that Amazon sells from many brands. Do not name specific brands or model numbers.
- "search" is a short Amazon search phrase (2 to 6 words) that will find that item.
- "price" is a realistic typical price in whole US dollars.
- "emoji" is one emoji that best depicts the item.
- "why" is one short sentence (under 14 words) on why it suits this person.
- "title" is a warm 2 to 5 word basket name. "note" is one sentence about the basket.
- Never include alcohol, weapons, tobacco, or adult products. If the request is not about choosing a gift, build a general-interest basket.
Respond with JSON only, no prose, in exactly this shape:
{"title":"","note":"","items":[{"name":"","search":"","price":0,"emoji":"","why":""}]}`;

// Very small per-instance rate limit: 8 requests per minute per IP.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: "AI is not configured." });

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return res.status(429).json({ error: "Too many requests. Try again in a minute." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const query = String((body && body.query) || "").trim().slice(0, 300);
  if (!query) return res.status(400).json({ error: "Describe who the gift is for." });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 900,
        system: SYSTEM,
        messages: [{ role: "user", content: query }],
      }),
    });
    if (!r.ok) return res.status(502).json({ error: "The curator is unavailable." });
    const data = await r.json();
    const text = (data.content || []).map((c) => c.text || "").join("");
    const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    const items = (json.items || []).slice(0, 6).map((i) => ({
      name: String(i.name || "").slice(0, 80),
      search: String(i.search || i.name || "").slice(0, 80),
      price: Math.max(1, Math.round(Number(i.price) || 25)),
      why: String(i.why || "").slice(0, 140),
      emoji: String(i.emoji || "").slice(0, 8),
    })).filter((i) => i.name && i.search);
    if (!items.length) return res.status(502).json({ error: "No basket came back." });
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ title: String(json.title || "Your basket").slice(0, 60), note: String(json.note || "").slice(0, 200), items });
  } catch (e) {
    return res.status(502).json({ error: "The curator is unavailable." });
  }
}
