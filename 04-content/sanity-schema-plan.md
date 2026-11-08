# Sanity Schema Plan

**What this is:** The planned Sanity content model, mapped from the current Webflow pages and CMS collections to Lumos components, so editors can change content without touching code.
**Owner:** Web lead designs the schema. Marketing confirms fields match how they work. Status: **draft**. Blocked on Webflow CMS CSV exports (OQ-04) and the Sanity project owner (OQ-16).

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
| `post` | CMS **Blog** (18 live items) | title, slug, excerpt, publishDate, author (TBD), category ref, mainImage, body, seo | `/blog/{slug}` |
| `blogCategory` | CMS **Blog Categories** | title, slug, description | TBD: no public URL today |
| `educationPiece` | CMS **Education Pieces** | title, slug, summary, media, body, webinar `ghlForm`, seo | TBD from CSV |
| `employer` | CMS **Employers** ("Welcome, …" pages) | employer name, slug, logo, welcome copy, contacts, noindex default **true**? | TBD; possibly private (OQ-07) |
| `partner` | CMS **Partners** | name, logo (+alt), URL, description | TBD |
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

- Exact fields per collection once CSVs arrive (OQ-04).
- Studio location: `/studio` in this repo vs Sanity-hosted (OQ-16).
- Content import: script from CSV → Sanity, with a row-count check against `content-inventory.csv`.
