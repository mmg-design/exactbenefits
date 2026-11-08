# Launch-Day Runbook

**What this is:** The step-by-step script for launch day, including who does what, in what order, and how to roll back. Run it only after `pre-launch-checklist.md` is fully signed.
**Owner:** Project lead runs it. IT owns DNS. Marketing owns form and content checks. Compliance is on call.

**Launch date:** TBD (OQ-01). **Window:** a weekday morning (not Friday) with all owners available for 4 hours.

## T-24h
- [ ] DNS TTL already at 300s (confirm)
- [ ] Code freeze on `main`; announce the content freeze in Sanity and Webflow
- [ ] Save a copy of current DNS records (screenshot + export) to the IT folder
- [ ] Final crawl of the live Webflow site saved (`01-audit/crawl-pre-launch-YYYY-MM-DD.csv`)
- [ ] Confirm everyone's availability; share this runbook

## Launch (T-0)

| Step | Action | Who | Done |
|---|---|---|---|
| 1 | Merge the approved `staging` → `main` PR; confirm the Cloudflare production build succeeds | Web lead | ☐ |
| 2 | Spot-check the production Cloudflare URL (`*.pages.dev` or Workers URL) before DNS | Web lead | ☐ |
| 3 | Add the custom domain in Cloudflare / update DNS records for `www` and apex | IT | ☐ |
| 4 | Confirm SSL issued and `https://www.exactbenefits.com` serves the new site (check from 2 networks) | IT | ☐ |
| 5 | Run the URL check script: every `keep` URL → 200; every redirect → single 301 → 200 | Web lead | ☐ |
| 6 | Apex `exactbenefits.com` and `http://` → 301 → `https://www.exactbenefits.com` | Web lead | ☐ |
| 7 | Consent check with no consent: no GA4/Clarity/Leadfeeder/Apollo requests | Web lead + Compliance | ☐ |
| 8 | Submit each GHL form once (test data); confirm it lands in GHL and `lead_submitted` reaches GA4 after consent | Marketing | ☐ |
| 9 | Submit the sitemap in Google Search Console; inspect home + 3 key URLs | Marketing | ☐ |
| 10 | Log the launch in `07-governance/change-log.md` | Project lead | ☐ |

## Rollback triggers (any one → roll back)
- More than a handful of `keep` URLs return 404/500 and can't be fixed within 30 minutes
- Forms not reaching GHL
- Any non-necessary tag firing before consent
- Site down or SSL failing for more than 15 minutes

## Rollback
1. IT restores the saved DNS records (Webflow is still published, so it serves immediately at the low TTL).
2. Announce the rollback, log it in the change log with the reason.
3. Fix on a branch → staging → re-run the pre-launch checklist before retrying.

## T+1 to T+3 days
- Daily: Search Console coverage and 404s, GA4 real-time + conversions, Cloudflare analytics 4xx/5xx
- Keep Webflow hosting active for **at least 30 days** (OQ-21) before cancelling
