# Sanity Schema Plan

**What this is:** The planned Sanity content model, mapped from the current Webflow pages and CMS collections to Lumos components, so editors can change content without touching code.
**Owner:** Web lead designs the schema. Marketing confirms fields match how they work. Status: **draft**. Fields below come from the Webflow CSV exports received 2026-11-07 (Employers still missing, OQ-22). Blocked on the Sanity project owner (OQ-16).

## Principles

- **No PHI in Sanity.** The CMS holds public marketing content only.
- **No scripts in Sanity.** No "custom code" or HTML-embed fields. A GHL form is chosen from a fixed list of approved form IDs, never pasted embed code (protects CLAUDE.md rules 1–3).
- **Alt text is required** on every image field (validation error if empty, unless marked decorative).
- **SEO fields on every routable document** map 1:1 to the Lumos `BaseLayout` props.
- **Slugs are locked once published.** Changing one needs a `redirect-map.csv` row first.
- **Sections map to Lumos components**, so the page builder can't produce off-brand layouts.

## Shared objects

| Object | Fields | Maps to |
|---|---|---|
| `seo` | title, description (≤160), ogImage (+alt), noindex (bool), canonical override (rare) | `BaseLayout` props: title, description, image, noindex |
| `imageWithAlt` | image, alt (required), decorative (bool), caption | Lumos `Img` |
| `cta` | label, link (internal ref or URL), emphasis (primary/secondary) | Lumos `Button` |
| `ghlForm` | form: one of **Personal Consultation** (`HDTct8e534HGTNvIt3Dr`), **Subscribe** (`jk6Hbc5dl6kF3wqmy8pX`), **Webinar Registration** (`xPcdJlSgcf7JcWkIS9Jg`) | Approved GHL embed component (proposed) |
| `portableText` | headings, lists, links, bold/italic, images | Lumos `RichText` |

## Document types

| Type | Replaces (Webflow) | Key fields | URL pattern |
|---|---|---|---|
| `siteSettings` (singleton) | Site settings, nav, footer | site name, default description, default OG image, phone, email, address, nav links, footer links, policy links | — |
| `page` | Static pages: home, ICHRA services, guides, calculator, listing pages, thank-you pages | title, slug, seo, `sections[]` | `/{slug}` |
| `post` | CMS **Blogs**: 19 items (17 published, 1 draft-but-live, 1 draft) | Title → `title` · Slug → `slug` · Main Image → `mainImage` (imageWithAlt; **alt must be written**, not in export) · Date → `publishDate` · Category → `category` (ref) · Short Intro → `excerpt` · Blog Content → `body` (portableText) · Meta Title / Meta Description → `seo.title` / `seo.description` · Issue # → `issueNumber` (optional number, 10 of 19 filled) | `/blog/{slug}` |
| `blogCategory` | CMS **Blog Categories**: 6 items (2 used: "employer medicare guide" ×16, "Medicare" ×3; 4 unused, OQ-25) | Name → `title` · Slug → `slug` | None (no public URL today; filtering only) |
| `educationPiece` | CMS **Educations**: 5 items (1 published, 4 drafts; all 404 live, OQ-24) | Name → `title` · Slug → `slug` · Start/End Date/Time → `startsAt`/`endsAt` · Location → `location` · Description → `body` · Short Description → `excerpt` · Image → `image` · RSVP Link → `rsvpUrl` (all placeholder example.com today) · Speaker → `speaker` · Speaker Headshot 1/2 → `speakerHeadshots[]` · Event Recording Link → `recordingUrl` (YouTube; consent-gated click-to-load) · Event Recording Description → `recordingDescription` · SEO Title / SEO Description → `seo` · webinar `ghlForm` | `/webinars/{slug}` (keep the pattern blog links already use) |
| `employer` | CMS **Employers** ("Welcome, …" pages) | **No CSV received** (OQ-22). Fields TBD | TBD; possibly private (OQ-07) |
| `partner` | CMS **Partners**: 8 carrier logos (7 published, 1 draft) | Name → `name` · Slug → `slug` · Logo → `logo` (imageWithAlt). Carrier trademark permission to confirm (OQ-26) | None (logos only) |

**Webflow system fields** (Collection ID, Locale ID, Item ID, Created/Updated/Published On, Archived, Draft) map to a hidden `legacy` object (`webflowItemId`, `publishedAt`) for traceability. They're never shown on the site. Webflow **Draft** items import as unpublished Sanity drafts.

**Titles:** live blog titles render as `{Meta Title} – Exact Benefits` (en dash), but Lumos `BaseHead` appends ` | {SITE_NAME}`. To keep titles identical, the layout needs a full-title option, or the suffix must change. That's a decision for Marketing (see seo-baseline finding 3).

**Content cleanup during import** (each needs Marketing approval, logged in change-log): 34 links to dead `/webinars/*` pages, 3 links to a redirected post URL (update to the final URL), and 4 malformed links (see `01-audit/seo-baseline.md`). 51 images in blog bodies and CMS fields are hosted on Webflow's CDN and get downloaded into Sanity assets.
| `legalPage` | Privacy Policy, SMS Terms, Cookie Policy | title, slug, lastUpdated, body, approvedBy (Legal) | `/{slug}` or `/legal/{slug}` |

## Page sections (`page.sections[]`), each a Lumos composition

| Section | Lumos components |
|---|---|
| `hero` | Section + ContentWrapper (columns/breakout/card) + Eyebrow + Heading + Paragraph + ButtonWrapper + Img |
| `contentBlock` | Section + ContentWrapper (stack/columns) + RichText |
| `cardGrid` | Section + Grid + Card (default/cover/stacked) |
| `faq` | Section + Accordion + AccordionItem |
| `tabs` | Section + Tabs + TabLink |
| `logoMarquee` | Section + Marquee + Img |
| `formBlock` | Section + ContentWrapper + `ghlForm` |
| `calculator` | Existing savings calculator logic (re-implemented, no third party). Assumption values (e.g. 7,300 savings/employee, 4,200 Medicare cost) become editable fields with a Marketing owner. |

## Open items

- Employers fields once its CSV arrives (OQ-22).
- Studio location: `/studio` in this repo vs Sanity-hosted (OQ-16).
- Content import: script from CSV → Sanity, with a row-count check against `content-inventory.csv`.
