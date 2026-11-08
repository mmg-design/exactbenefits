# CLAUDE.md: Exact Benefits Website Migration

Webflow → **Astro (Lumos for Astro) + Sanity**, on **GitHub** and **Cloudflare**. Healthcare-adjacent company: **compliance comes before speed.** Goal: zero-loss migration, with no lost URLs, rankings, content, form data or tracking.

## Before any task

1. Read this file.
2. Read the reference file for the area you're touching:

| Touching… | Read first |
|---|---|
| Any script, pixel, embed, font service, analytics | `02-compliance/tag-registry.csv`, `02-compliance/consent-setup.md` |
| Any page that could hold health data | `02-compliance/phi-boundaries.md` |
| Any URL, slug, page removal/merge | `03-redirects/redirect-map.csv`, `03-redirects/redirect-rules.md`, `01-audit/url-inventory.csv` |
| Forms | `01-audit/forms-and-integrations.csv` |
| Images, files, fonts | `05-assets/asset-inventory.csv`, `05-assets/brand-guidelines.md` |
| Content / Sanity | `01-audit/content-inventory.csv`, `04-content/sanity-schema-plan.md` |
| Policy or legal text | `02-compliance/policy-pages.md` |
| Styling, components, pages | `site/LUMOS.md`, `site/AGENTS.md`, `05-assets/brand-guidelines.md` |
| Unknowns | `07-governance/open-questions.md`; never guess, add a question |

## Compliance rules (non-negotiable)

1. **Scripts.** Never add, change or remove a third-party script (analytics, pixel, chat, embed, font service, CDN library) unless it is first logged in `02-compliance/tag-registry.csv` **with a named approver**. "Approver TBD" means not approved.
2. **Consent.** No script except `necessary` may load before cookie consent. All consent logic lives in **one locked layout component** and is never edited without compliance approval.
3. **PHI.** No tracking pixels, analytics, session recording or marketing tags on any page listed in `02-compliance/phi-boundaries.md`, even with consent.
4. **URLs.** Every URL change requires a row in `03-redirects/redirect-map.csv` before the change is made.
5. **Branches.** All work happens on a branch and goes to the staging preview first. **Never push directly to `main`.** Follow `07-governance/change-workflow.md`.
6. **Logs.** Every approved change gets a line in `07-governance/change-log.md`. Every significant decision gets a line in `07-governance/decisions-log.md`.
7. **Images.** Every image must have alt text (or be explicitly marked decorative) and be logged in `05-assets/asset-inventory.csv`.
8. **Public repo.** This GitHub repo is **public** (decision D-002). Never commit secrets, API tokens, private endpoints, `.env` files, personal data or PHI details. Configuration secrets live in Cloudflare/Sanity environment settings only.
9. **Forms.** Lead forms are Go High Level embeds using only the approved form IDs in `forms-and-integrations.csv`. No pasted embed code from Sanity or content editors.
10. **Policy text** is migrated word for word and changed only with Legal/Compliance approval.
11. **Conflicts.** If a request conflicts with any of these rules, **stop** and say which rule it conflicts with. Don't work around it.

## Lumos build rules

- **Reuse first.** Always reuse an existing Lumos component, or add a variant to it, before creating a new component. **Ask before creating any new component.**
- **No hard-coded values.** Never hard-code hex colors, font sizes or spacing. Reference the theme variables and fluid size variables in `site/src/styles/base.css`. To match a design, change the variable's `-min` and `-max` values; don't override them.
- **Layer order:** `base`, `patterns`, `components`, `utilities`. Component styles go in the `components` layer (inside the component's `<style is:global>` under `@layer components`). Use utility classes only for true one-off adjustments.
- **Minimal custom classes.** If the same custom class would appear in more than one place, it should be a component prop or variant instead.
- **Typed props.** Every component uses TypeScript props with allowed values for each variant (discriminated unions), so invalid combinations fail type-checking.
- **Images in `site/src/assets`**, never `site/public`, so Astro can optimize them. (Exceptions: favicons and files that must keep a fixed public URL, logged in the asset inventory.) Name images `page-section-description.webp`, lowercase, hyphens, no spaces.
- **One layout.** Use `BaseLayout` for every page. Set page title, description, meta image and noindex through layout props. Site-wide info goes in `site/src/consts.ts`.
- **Open components.** Prefer components with slots over closed components, so content can change per page.
- **Small pieces.** Work in small pieces. After each piece, list what changed so a person can review it.
- Follow `site/LUMOS.md` checklists (new style, new component). No `px` in new CSS; use `rem`/`em`/`ch`.

## Project facts

- Live site: https://www.exactbenefits.com (Webflow). Export: `00-source/exact-benefits-staging.webflow/` (local only, not committed).
- Repo: `mmg-design/exactbenefits` (public). Branches: `main` (production), `staging` (preview), work branches.
- Site code: `site/` (Astro 7, Lumos 1.0.2, Node 26 LTS). Run: `cd site && npm run dev` → http://localhost:4321. Check: `npm run check`. Build: `npm run build`.
- Lumos skills in `site/.agents/skills/` (e.g. `lumos-import-webflow` for migrating the export).
- Approvers: **TBD** (open question OQ-02). Until named, nothing can be marked approved.
- PHI: none, per intake 2026-11-07 (verification pending, OQ-03).
- Launch date: **not set.** "Tomorrow" was rejected as infeasible (D-008, OQ-01).
