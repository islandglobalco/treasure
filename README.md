# Treasure.gift

AI-curated gift baskets built from Amazon affiliate links.

- **Search** – describe the person ("my dad, loves grilling, $150") and Claude builds a 3–5 gift basket within budget. If the AI is unavailable, a built-in keyword curator fills the basket instead, so search never dead-ends.
- **24 ready-made baskets** – 12 for her, 12 for him, three in each price tier (under $50, $50–100, $100–250, $250+). Edit them in `baskets.js`.
- **Links** – every gift opens an Amazon search filtered to its price range, with your Associates tag attached. No hard-coded product IDs to go stale.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The page and its styles |
| `app.js` | Search, basket rendering, link building, offline curator |
| `baskets.js` | The 24 premade baskets |
| `api/curate.js` | Vercel function that asks Claude for a basket |
| `api/config.js` | Serves your Amazon tag to the page |

## Deploy (Vercel + Namecheap)

1. **Vercel** – New Project → import `islandglobalco/treasure`. Framework preset: *Other*. No build command.
2. **Environment variables** (Project → Settings → Environment Variables):
   - `AMAZON_TAG` – your Amazon Associates tracking ID, e.g. `treasuregift-20`
   - `ANTHROPIC_API_KEY` – from console.anthropic.com
   - `CLAUDE_MODEL` – optional, defaults to `claude-haiku-5-5`
3. Redeploy so the variables take effect.
4. **Domain** – Vercel → Settings → Domains → add `treasure.gift` and `www.treasure.gift`.
5. **Namecheap** – Domain List → treasure.gift → Advanced DNS. Remove the parking records, then add:
   - `A` record, host `@`, value `76.76.21.21`
   - `CNAME` record, host `www`, value `cname.vercel-dns.com`

   (If Vercel shows different values on the Domains page, use Vercel's.)

## Amazon Associates notes

- The footer carries the required disclosure. Keep it.
- Amazon reviews new accounts after your first qualifying sales (within 180 days), so the site needs to be live and getting clicks.
- Prices on the site are labeled as estimates on purpose: showing exact Amazon prices requires the Product Advertising API, which unlocks after you have sales.
