# Consent Setup

**What this is:** How cookie consent works on the current site, the gaps found, and the rules the new consent component must follow.
**Owner:** Legal/Compliance (TBD, OQ-02) approves. Web lead builds. The consent component is **locked**: no edits without compliance approval (CLAUDE.md rule 2).

## Current site (Webflow), scanned 2026-11-07

- **Banner and tool:** Reform Digital **CookieFlow 2.3.1**, loaded from jsDelivr. It has a GDPR-style preferences panel (categories: marketing, analytics, personalization) and a US "Do Not Sell" opt-out zone.
- **Consent records:** stored by CookieFlow in a Supabase project (`jznbqqguiqjruyjehbml`). That makes Supabase a data processor, and it isn't documented anywhere else.
- **Gated correctly** (blocked until consent via `type="disabled" rd-cookieflow="…"`):
  - Microsoft Clarity: analytics
  - Leadfeeder: analytics
  - Apollo.io: marketing
- **NOT gated (loads before consent):**
  - **Google Analytics 4 `G-9F1FS7LQG6`.** Added through Webflow's built-in GA setting, so it sits outside CookieFlow and fires on every page immediately. ⚠️ Gap.
  - Adobe Fonts (Typekit kit `ibo2hlj`) and the Go High Level form script. These may qualify as necessary; compliance to confirm (OQ-10).
  - **YouTube video** (Webflow video embed via Embedly), bound to the Education "Event Recording Link" field on `/webinars` and the Education template. It sets YouTube cookies. ⚠️ Gap. New site: click-to-load placeholder using `youtube-nocookie.com`, loaded only after marketing consent or an explicit click.
- **Broken link:** the banner links to `/legal/cookie-policy`, which returns 404. ⚠️ Gap (OQ-08).

## New site status (2026-11-08)

Termageddon / Usercentrics is installed in `site/src/components/compliance/ConsentManager.astro` on every page (D-042, D-048). Tested: the banner shows on a first visit; a saved choice suppresses it on return; the privacy button reopens it. Not yet tested: Global Privacy Control, consent-record export. Open items: OQ-08, OQ-36, OQ-37. Trackers (D-050) are in the same component as inert `type="text/plain"` tags that Usercentrics runs after consent. Clarity, Leadfeeder and Apollo.io stay off until they are added to the Termageddon service list (OQ-41).

## Rules for the new site

1. **One locked component.** All consent logic lives in a single component rendered once by `BaseLayout.astro`. Proposed path: `site/src/components/compliance/ConsentManager.astro`. *Creating it is a new component, which needs approval.* No page, component or Sanity field may add a script that bypasses it.
2. **Default deny.** Before a choice is made, only `necessary` items load. Everything else is held back by the component and injected only after consent for its category.
3. **Categories:** `necessary`, `analytics`, `marketing`, `personalization`. Each tool's category comes from `tag-registry.csv` and nowhere else.
4. **Google Consent Mode v2.** Defaults set to `denied` (ad_storage, analytics_storage, ad_user_data, ad_personalization) before any Google tag. GA4 loads only after analytics consent.
5. **US privacy:** a persistent "Your Privacy Choices / Do Not Sell or Share" link in the footer. Honor the **Global Privacy Control (GPC)** browser signal as an opt-out.
6. **Easy to change your mind.** A link in the footer reopens preferences. Withdrawing consent stops the tools on the next page load.
7. **Proof of consent.** Store choice, categories, timestamp, policy version and banner version. Storage location TBD (OQ-09). It must be logged in the tag registry if it's a third party.
8. **No tracking on PHI pages** listed in `phi-boundaries.md`, even with consent.
9. **Accessible:** keyboard operable, focus moves into the banner, labelled controls, meets WCAG 2.2 AA contrast. Accept and Reject are equally prominent.
10. **Cookie policy** at `/legal/cookie-policy` lists every tool from the tag registry.

## Build options (decision pending, OQ-09)

| Option | Pros | Cons |
|---|---|---|
| In-house locked Astro component | No extra vendor, full control, fast | We own legal-text accuracy and record storage |
| Commercial CMP (Cookiebot, CookieYes, Osano, OneTrust…) | Auto-scans cookies, hosted consent records, geo rules | Adds a third party (must be in tag registry), cost, extra script weight |
