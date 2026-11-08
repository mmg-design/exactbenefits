# Exact Benefits Website Migration

Migration of **https://www.exactbenefits.com** from Webflow to **Astro** (Lumos for Astro framework) with **Sanity** CMS, **GitHub** version control and **Cloudflare** hosting.

**Goal:** zero-loss migration, with no lost URLs, rankings, content, form data or tracking. **Compliance comes before speed.**
**Project lead:** Andy Milligan (MMG Design). **Approvers:** TBD (see `07-governance/open-questions.md`, OQ-02).
**Rules for anyone (human or AI) working here:** [`CLAUDE.md`](CLAUDE.md).

## Folder map

| Folder / file | What it's for | Owner |
|---|---|---|
| `CLAUDE.md` | Non-negotiable compliance and build rules | Project lead + Compliance |
| `site/` | The Astro + Lumos website code (what gets deployed) | Web lead |
| `00-source/` | Webflow export (local only, **not committed**) | Project lead |
| `01-audit/` | Baseline of the current site: URLs, content, SEO, forms | Marketing + web lead |
| `02-compliance/` | Tag registry, consent, policies, PHI boundaries, accessibility | Legal/Compliance |
| `03-redirects/` | Redirect map (source of truth) and redirect rules | Web lead |
| `04-content/` | Content drafts by type and the Sanity schema plan | Marketing + web lead |
| `05-assets/` | Brand guidelines, asset inventory, source logos/docs/fonts | Marketing |
| `06-qa-and-launch/` | Pre-launch checklist, launch runbook, 30-day monitoring | Project lead |
| `07-governance/` | Change workflow, change log, decisions log, open questions | Project lead |

CSV files start with lines beginning with `#`: a short note, the owner and the column definitions. Skip those lines when importing into a spreadsheet (Google Sheets: delete the rows after import; pandas: `comment="#"`).

## Run the site locally

```bash
cd site
npm install
npm run dev
```

Open http://localhost:4321 (Lumos component examples: http://localhost:4321/example-components).

## How changes ship

Branch → PR into `staging` → preview + approval → PR `staging` → `main` → production. Details: [`07-governance/change-workflow.md`](07-governance/change-workflow.md). Never push directly to `main`.

## Status (2026-11-07)

- ✅ Local environment, Lumos scaffold, GitHub repo (`main`, `staging`)
- ✅ Project structure and reference files; audit pre-filled from the Webflow export and live site
- ⏳ Waiting on: approvers, launch date, Webflow CMS CSV exports, Webflow 301 list, GA4/GSC access, GHL form fields (see open questions)
- ⬜ Not started: brand tokens applied to Lumos, Sanity project, Cloudflare project, consent component, page builds
