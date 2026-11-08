import type { APIRoute } from "astro";

/* Keeps the /sitemap.xml address the live site and Search Console already use. */
export const GET: APIRoute = ({ site }) => {
  const child = new URL("sitemap-0.xml", site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${child}</loc></sitemap></sitemapindex>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
