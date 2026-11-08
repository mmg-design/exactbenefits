# Decisions Log

**What this is:** One line for every significant decision: what was decided, why, and who decided. It's the record that answers "why is it like this?" six months from now. Decisions are never edited after the fact. If one changes, add a new entry that supersedes it.
**Owner:** Project lead (Andy Milligan, MMG Design). Compliance-related decisions also need the Legal/Compliance approver (TBD, see OQ-02).

Status values: `DECIDED` · `PROPOSED` (needs sign-off) · `SUPERSEDED by D-xxx`

| ID | Date | Decision | Reason | Decided by | Status |
|---|---|---|---|---|---|
| D-001 | 2026-11-07 | Git repo root is `migration-project/`. The Astro site lives in `site/`. Cloudflare build root directory = `site`. | Keeps compliance and audit files version-controlled next to the code, so every change has an audit trail. | Project lead | DECIDED |
| D-002 | 2026-11-07 | GitHub repo `mmg-design/exactbenefits` stays **public**. A private repo was recommended. | Owner's choice. Mitigation: CLAUDE.md forbids committing secrets, keys, private endpoints or PHI details. Compliance to acknowledge (OQ-18). | Andy Milligan | DECIDED |
| D-003 | 2026-11-07 | Node.js **26.13.0 LTS** (Homebrew) is the project runtime. | Current LTS line; Lumos needs ≥ 22.23.4. | Project lead | DECIDED |
| D-004 | 2026-11-07 | Lumos for Astro **v1.0.2** (commit `5e81e86`), scaffolded with `create-lumos` 0.3.9, is the component and style foundation. | Brief requirement. Version recorded so future Lumos upgrades can merge cleanly. | Project lead | DECIDED |
| D-005 | 2026-11-07 | The Webflow export lives in `00-source/` and is **not committed** to Git. | It's 72 MB of binaries in a public repo. Images get committed individually once renamed and imported into `site/src/assets`. | Project lead | DECIDED |
| D-006 | 2026-11-07 | Lead forms **stay on Go High Level**, re-embedded with the same form IDs. No change of destination. | Owner confirmed GHL handles all forms. No change means no new data processor. | Andy Milligan | DECIDED |
| D-007 | 2026-11-07 | **Preserve every live URL exactly** (same paths, no trailing slash, `www` host). Plan: Astro `trailingSlash: "never"` + `build.format: "file"` so Cloudflare serves `/page` without adding a slash redirect. | Zero-loss goal. Webflow URLs have no trailing slash; Cloudflare adds one to folder-style pages unless the build outputs files. | Project lead | PROPOSED (Marketing sign-off) |
| D-008 | 2026-11-07 | **Do not launch on 2026-11-08.** Webflow stays live until the pre-launch checklist passes and approvers sign off. | Nothing is built yet. Launching tomorrow would mean lost URLs, an unreviewed consent setup and no QA, which breaks the zero-loss and compliance-first requirements. | Project lead (recommendation) | PROPOSED (owner to confirm new date, OQ-01) |
| D-009 | 2026-11-07 | No GA4 (or any non-necessary tag) loads before consent on the new site. GA4 currently loads pre-consent through Webflow's built-in integration; that behavior will **not** be carried over. | CLAUDE.md consent rule; current setup is a compliance gap. | Project lead | PROPOSED (Compliance sign-off) |
