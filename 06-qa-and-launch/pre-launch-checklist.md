# Pre-Launch Checklist

**What this is:** The gate between staging and production. **Every box must be checked and signed before DNS moves.** If something can't be checked, launch waits.
**Owner:** Project lead runs it. Sign-off: Marketing, Legal/Compliance and IT (names TBD, OQ-02).

## Content & URLs
- [ ] Every `keep` URL in `01-audit/url-inventory.csv` returns **200 at the same path** on staging (scripted check, results saved)
- [ ] Every row in `03-redirects/redirect-map.csv` verified on staging (single-hop 301 → 200)
- [ ] Webflow's own 301 list copied into the redirect map (OQ-05)
- [ ] All CMS items migrated: counts in Sanity match `content-inventory.csv` per collection
- [ ] Titles, meta descriptions and canonicals match the baseline (or approved changes are logged)
- [ ] H1 present on every page; structured data validates (Rich Results Test); `aggregateRating` only if substantiated (OQ-13)
- [ ] XML sitemap generated, contains only indexable URLs; robots.txt correct for production
- [ ] Staging/preview URLs are `noindex` and not in any sitemap
- [ ] No links point to `webflow.io` or `cdn.prod.website-files.com`; all files re-hosted (OQ-21)
- [ ] Custom 404 page works and returns status 404

## Forms
- [ ] All 3 GHL forms render on every page listed in `forms-and-integrations.csv`
- [ ] Test submission of each form reaches GHL with correct source page; redirect to the right thank-you page
- [ ] `lead_submitted` conversion fires **after consent** and is recorded in GA4
- [ ] SMS consent language and link to `/sms-terms-of-service` present wherever GHL collects phone numbers

## Compliance
- [ ] Every script on the site matches a row in `tag-registry.csv` **with an approver** (compare page source vs registry)
- [ ] With **no consent given**: only `necessary` requests in the browser network tab (no GA4, Clarity, Leadfeeder, Apollo)
- [ ] Accept/Reject/Preferences each work; choice persists; withdrawal works; GPC honored
- [ ] Consent component unchanged since compliance approval (git history check)
- [ ] No tags on any page in `phi-boundaries.md`
- [ ] Policy pages live and current: Privacy, SMS Terms, **Cookie Policy** (OQ-08)
- [ ] No secrets, API keys or private endpoints in the public repo (secret scan)

## Accessibility & quality
- [ ] `02-compliance/accessibility-checklist.md` passed for every template
- [ ] All images have alt text and are logged in `asset-inventory.csv`
- [ ] Lighthouse: Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100 on key templates (mobile)
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome
- [ ] `npm run check` and `npm run build` pass with no errors

## Infrastructure
- [ ] Cloudflare production project builds from `main`; root directory `site`; Node 26
- [ ] Environment variables (Sanity project ID, dataset, read token if any) set in Cloudflare, **not** in the repo
- [ ] Custom domain configured; SSL active; apex → www 301 in place
- [ ] DNS TTL lowered to 300s at least 24h before cutover
- [ ] Rollback plan tested: Webflow site still published and DNS records saved
- [ ] SEO baseline fully captured (`01-audit/seo-baseline.md`)

## Sign-off

| Area | Name | Role | Date | Signature/approval link |
|---|---|---|---|---|
| Marketing | TBD | | | |
| Legal/Compliance | TBD | | | |
| IT | TBD | | | |
