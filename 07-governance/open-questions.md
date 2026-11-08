# Open Questions

**What this is:** Every unknown that blocks or shapes the migration. Nothing here gets guessed. When a question is answered, record the answer, move it to **Resolved**, and add a line to `decisions-log.md` if it changes the plan.
**Owner:** Project lead (Andy Milligan, MMG Design) keeps it current. Each question has its own owner.

Status values: `OPEN` · `WAITING` (asked, awaiting reply) · `RESOLVED`

## Open

| ID | Question | Why it matters | Owner | Status | Raised |
|---|---|---|---|---|---|
| OQ-01 | **Launch date.** Intake says *tomorrow (2026-11-08)*. Nothing is built yet: no pages, Sanity, Cloudflare project, redirects or consent component. What is the real date, and is there a hard deadline driving "tomorrow" (e.g. Webflow renewal)? | A zero-loss, compliance-first migration can't launch tomorrow. See `decisions-log.md` D-008. | Andy Milligan + Marketing | OPEN | 2026-11-07 |
| OQ-02 | **Approvers.** Names and roles for Marketing, Legal/Compliance and IT. | CLAUDE.md requires a named approver for every script, consent change and launch. Until these are named, nothing can be approved. | Andy Milligan | OPEN | 2026-11-07 |
| OQ-03 | **Go High Level forms.** Field list and embed code for each of the 3 GHL forms (Personal Consultation, Subscribe, Webinar Registration). Do any fields ask for date of birth, Medicare number, health conditions, current plan or medications? | Confirms the "no PHI" answer. If any health field exists, the page goes into `phi-boundaries.md` and loses all tracking. | Marketing (GHL admin) | OPEN | 2026-11-07 |
| OQ-04 | **Webflow CMS exports.** Export each collection as CSV from Webflow (Blog, Blog Categories, Education Pieces, Employers, Partners). Intake says 5–6 collections; the export shows 5 template pages. Is there a 6th? | CMS item content is **not** in the site export zip. We can't migrate posts or list their URLs without it. | Andy Milligan | OPEN | 2026-11-07 |
| OQ-05 | **Webflow 301 redirects.** Copy the list from Webflow → Site settings → Publishing → 301 redirects. | Those redirects stop working when Webflow hosting ends. Each one goes into `redirect-map.csv`. | Andy Milligan | OPEN | 2026-11-07 |
| OQ-06 | **GA4 + Google Search Console access** (read access for the web lead). | Needed to fill monthly traffic, conversions, top queries and top landing pages in the SEO baseline. | Marketing | OPEN | 2026-11-07 |
| OQ-07 | **Employers collection.** `detail_employers` shows "Welcome, …". Are these private per-employer landing pages? Are any password-protected (the export includes Webflow's `/401` password page)? | Private pages need noindex, no tracking review, and possibly access control, which Cloudflare handles differently from Webflow. | Marketing | OPEN | 2026-11-07 |
| OQ-08 | **Cookie policy page.** The cookie banner links to `/legal/cookie-policy`, which returns **404** today. Who writes it? | A consent banner that links to a missing policy is a compliance gap now and must be fixed before launch. | Legal/Compliance | OPEN | 2026-11-07 |
| OQ-09 | **Consent tool.** Build the locked consent component in-house, or use a commercial CMP (e.g. Cookiebot, CookieYes, Osano, OneTrust)? Where are consent records stored? (Today: Reform Digital CookieFlow → Supabase.) | Determines the build for the locked layout component and the record-keeping proof. | Legal/Compliance + IT | OPEN | 2026-11-07 |
| OQ-10 | **Consent categories to confirm:** Leadfeeder (filed under analytics today, but it identifies companies, which is closer to marketing); GHL embed (proposed necessary); Adobe Fonts (proposed necessary). | Decides what may load before consent. | Legal/Compliance | OPEN | 2026-11-07 |
| OQ-11 | **Heading font license.** IvyPresto Headline comes from Adobe Fonts (kit `ibo2hlj`), which can't be self-hosted. Keep Adobe Fonts as a third party, or buy a self-hosting web license? | Affects the tag registry and whether a third party loads before consent. | Marketing + Compliance | OPEN | 2026-11-07 |
| OQ-12 | **Medicare marketing rules.** Does Exact Benefits / Exact Medicare market Medicare Advantage or Part D plans on this site? If so, does the CMS third-party marketing (TPMO) disclaimer apply? No such disclaimer exists on the current site. | Regulatory requirement for some Medicare marketing. Needs a compliance determination, not a guess. | Legal/Compliance | OPEN | 2026-11-07 |
| OQ-13 | **Review schema.** `/medicare-pricing-calculator` declares `aggregateRating` 4.9 from 5,026 reviews in structured data. What's the source, and can it be substantiated? | Unsubstantiated ratings are an FTC and Google policy risk. Do not migrate it until confirmed. | Marketing + Compliance | OPEN | 2026-11-07 |
| OQ-14 | **Thank-you pages** (`/thank-you-consultation`, `/thank-you-webinar`, `/global-thank-you-page`) are in the sitemap and indexable. Should they be noindex on the new site? | Indexed thank-you pages can inflate conversions and attract junk traffic. URLs stay the same either way. | Marketing | OPEN | 2026-11-07 |
| OQ-15 | **Hosting and DNS.** Who controls DNS for exactbenefits.com, and which Cloudflare account do we use? Cloudflare now recommends Workers (static assets) over Pages for new projects. Confirm Pages, or approve Workers. | Needed to create the staging preview and plan the DNS cutover. | IT | OPEN | 2026-11-07 |
| OQ-16 | **Sanity.** Who owns the Sanity organization/project, which plan, who edits content, and where Studio is hosted (in this repo as `/studio`, or hosted by Sanity)? | Needed before building schemas. | IT + Marketing | OPEN | 2026-11-07 |
| OQ-17 | **Third-party tool list.** Please send your own list so it can be checked against the scan in `tag-registry.csv`. Is anything enabled inside Webflow settings (e.g. Webflow Analyze/Optimize, Google Site Verification, other integrations)? | Some tools are injected by Webflow settings and don't show in code. | Marketing | OPEN | 2026-11-07 |
| OQ-18 | **Public repository.** The GitHub repo `mmg-design/exactbenefits` is public by decision (D-002). Legal/Compliance should acknowledge it. | A healthcare-adjacent company's compliance notes, vendor list and audit files are publicly readable. | Legal/Compliance | OPEN | 2026-11-07 |
| OQ-19 | **Export freshness.** The export is named "exact-benefits-staging". Does it match current production content? | The audit was pre-filled from the export plus the live site. Differences must be known. | Andy Milligan | OPEN | 2026-11-07 |
| OQ-20 | **Terms of use.** No terms-of-use page exists (only Privacy Policy and SMS Terms). Is one required? | Policy page completeness (`policy-pages.md`). | Legal/Compliance | OPEN | 2026-11-07 |
| OQ-21 | **Webflow-hosted files.** OG images and any linked PDFs are served from `cdn.prod.website-files.com`. When is Webflow hosting cancelled? Plan at least a 30-day overlap. | Files on Webflow's CDN disappear when the site is cancelled. Every one must be downloaded and re-hosted first. | Andy Milligan | OPEN | 2026-11-07 |

## Resolved

| ID | Question | Answer | Answered by | Date |
|---|---|---|---|---|
| R-01 | Current site URL and platform | https://www.exactbenefits.com on **Webflow**. Export placed in project (now `00-source/exact-benefits-staging.webflow`). | Andy Milligan | 2026-11-07 |
| R-02 | Page count and content types | 20–30 pages and 5–6 CMS collections (scan: 27 export pages; 37 URLs in live sitemap; 5 CMS templates). | Andy Milligan | 2026-11-07 |
| R-03 | Forms and destinations | All lead forms are **Go High Level** embeds; destination stays GHL. Field lists still open (OQ-03). | Andy Milligan | 2026-11-07 |
| R-04 | PHI | **No.** The project does not touch PHI (to be verified against GHL field lists, OQ-03). | Andy Milligan | 2026-11-07 |
| R-05 | Third-party tools | Scanned from export. See `02-compliance/tag-registry.csv`. Reconciling with owner list (OQ-17). | Scan | 2026-11-07 |
