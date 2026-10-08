// GET /api/config — public settings the page needs. Set AMAZON_TAG in your Vercel project.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.status(200).json({ amazonTag: process.env.AMAZON_TAG || "" });
}
