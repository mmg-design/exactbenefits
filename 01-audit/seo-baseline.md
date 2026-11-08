# SEO Baseline

**What this is:** A snapshot of how the current site performs in search *before* migration, so we can prove nothing was lost afterwards. Capture everything here **before launch**. It can't be recreated later.
**Owner:** Marketing (TBD) with web lead. Captured 2026-11-07 from the live site and Webflow export. Items marked TBD need GA4 / Search Console access (OQ-06).

## Site facts

| Item | Value |
|---|---|
| Canonical host | `https://www.exactbenefits.com` (apex `exactbenefits.com` → 301 → www) |
| URL style | No trailing slash, lowercase, hyphenated (e.g. `/blog/cobra-vs-medicare`) |
| Sitemap | `https://www.exactbenefits.com/sitemap.xml` with **37 URLs** (19 pages + 18 blog posts) |
| robots.txt | Only a `Sitemap:` line; nothing blocked |
| Canonicals | All 37 sitemap URLs return **200** with a self-referencing canonical |
| Analytics | GA4 `G-9F1FS7LQG6`; conversion event `lead_submitted` fires on `/global-thank-you-page` |
| Structured data | Organization JSON-LD on several pages; Service on `/` and `/ichra-strategy`; WebPage + `aggregateRating` (4.9 / 5,026) on `/medicare-pricing-calculator` (substantiation needed, OQ-13) |
| Full URL list | `01-audit/url-inventory.csv` |

## Findings to carry into the build

1. **Thank-you pages are indexable and in the sitemap** (`/thank-you-consultation`, `/thank-you-webinar`, `/global-thank-you-page`). Decision needed (OQ-14).
2. **Missing H1** on `/webinars` and `/medicare-pricing-calculator`. Add one on the new site; the URL and title stay the same.
3. **Title separators are inconsistent.** Blog posts use `– Exact Benefits`; pages use `| Exact Benefits` or `| Exact Benefits Group`. Lumos `BaseHead` appends `| SITE_NAME` automatically. Marketing should decide whether to keep the existing titles exactly (safest for rankings) or standardize.
4. **OG images are hosted on Webflow's CDN** (`cdn.prod.website-files.com`). Those links break when Webflow is cancelled, so every OG image must move into the new site (OQ-21).
5. **CMS collections outside the sitemap** (Education Pieces, Employers, Partners, Blog Categories) have no public URLs in the sitemap. Confirm whether any of their items are indexed (Search Console → Pages).
6. **The `/legal/cookie-policy` link returns 404** (linked from the cookie banner on every page).

## To capture before launch (TBD)

- [ ] **Search Console, last 16 months:** export Performance (queries + pages), Pages indexing report, Links (top linked pages + linking sites).
- [ ] **GA4, last 12 months:** sessions and `lead_submitted` by landing page. Fill `monthly_traffic` / `conversions` in `url-inventory.csv`.
- [ ] **Rankings** for top 20–30 target keywords (current position + URL).
- [ ] **Backlinks:** top referring domains and the URLs they point to. Every one must resolve after launch.
- [ ] **Core Web Vitals** (field data, CrUX / PageSpeed Insights) for `/`, one service page, one guide, one blog post.
- [ ] **Full crawl** of the live site (Screaming Frog or similar) saved to `01-audit/` as `crawl-pre-launch-YYYY-MM-DD.csv`. This catches URLs the sitemap misses.
- [ ] Screenshot or save HTML of key pages for content comparison after launch.

## Post-launch comparison targets

Indexed pages ≥ baseline · no rise in 404s · organic clicks within normal weekly variance · top-20 keyword positions stable · `lead_submitted` conversions stable. Tracked in `06-qa-and-launch/30-day-monitoring.md`.
