# 30-Day Monitoring

**What this is:** What we check after launch, how often, and what counts as a problem, so any loss of traffic, rankings, leads or compliance is caught within days, not months.
**Owner:** Marketing (TBD) for SEO and leads; web lead for errors and redirects; Compliance for tags and consent.

Baseline values come from `01-audit/seo-baseline.md`.

## Daily, days 1–7

| Check | Where | Alert if |
|---|---|---|
| 404s and 5xx | Cloudflare analytics, Search Console → Pages | Any old URL 404s → add a redirect-map row the same day |
| Form leads | GHL + GA4 `lead_submitted` | Leads below the normal daily range for 2 days |
| Indexing | Search Console → Pages | "Not found (404)" or "Redirect error" rising |
| Tags vs registry | Browser check, no consent and with consent | Any unregistered script, or anything non-necessary before consent |
| Uptime | Cloudflare / uptime monitor | Any downtime |

## Weekly, weeks 1–4

| Check | Alert if |
|---|---|
| Organic clicks and impressions vs same weeks before launch | Drop > 20% week over week not explained by seasonality |
| Top 20 keyword positions | Any drops > 5 positions and doesn't recover within a week |
| Top 20 landing pages (traffic) | Any page loses > 30% of its traffic |
| Backlinked URLs resolve | Any return 404 |
| Core Web Vitals (PageSpeed / CrUX) | Any metric moves to "needs improvement" |
| Conversion rate by landing page | Down > 20% vs baseline |

## Log

| Date | Check | Result | Action taken | By |
|---|---|---|---|---|
| | | | | |

## Day 30 sign-off
- [ ] Traffic, rankings and leads within normal range of baseline
- [ ] Zero unresolved 404s from old URLs
- [ ] Tag/consent audit clean
- [ ] Decision to cancel Webflow hosting (after confirming every Webflow-hosted file has been re-hosted), recorded in `decisions-log.md`
