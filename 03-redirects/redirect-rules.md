# Redirect Rules

**What this is:** How redirects are written, generated and verified, so no old URL ever ends at a 404.
**Owner:** Web lead. Marketing approves any page removal or merge that creates a redirect.

## Source of truth

`03-redirects/redirect-map.csv` is the only source. The site's Cloudflare redirect file (`site/public/_redirects`) is generated from it and never hand-edited. Every URL change needs a row (CLAUDE.md rule 4).

## Rules

1. **301** for permanent moves (default). 302 only for temporary moves, with a reason and an end date.
2. **No chains.** Old URL → final URL in one hop. When a target later moves, update every row pointing to it.
3. **No loops**, and never redirect to a URL that 404s or is itself redirected.
4. **Like for like.** Redirect to the closest equivalent page, not the homepage. Truly removed content with no equivalent → the closest parent page, with Marketing approval.
5. **Keep query strings** (UTM parameters from ads and emails must survive).
6. **Host:** `exactbenefits.com` → `https://www.exactbenefits.com` (existing behavior; keep). HTTP → HTTPS always.
7. **Trailing slashes:** live URLs have none. The new site must serve `/page` directly with **no** added slash redirect (decision D-007: Astro `trailingSlash: "never"` + `build.format: "file"`). `/page/` should 301 to `/page`.
8. **Case:** URLs are lowercase. Uppercase variants found in backlinks or Search Console get explicit rows.
9. **Webflow's own 301 list** (Site settings → Publishing) must be copied in before launch (OQ-05). Those stop working when Webflow hosting ends.
10. **Cloudflare limits:** Pages `_redirects` supports up to 2,000 static + 100 dynamic rules. Bulk Redirects is the fallback if we ever exceed that.

## Verification

- **Staging:** a script requests every `old_url` and confirms a single 301 to `new_url`, and that `new_url` returns 200. Results go in the `verified` column (date + initials).
- **Every URL in `url-inventory.csv` marked `keep`** must return 200 at the same path on staging.
- **Launch day:** re-run against production immediately after DNS cutover (see `06-qa-and-launch/launch-day-runbook.md`).
