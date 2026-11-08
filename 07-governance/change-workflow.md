# Change Workflow

**What this is:** How every change moves from idea to production. No shortcuts, including for "tiny" text fixes.
**Owner:** Project lead. Approvers by area: Marketing (content/SEO), Legal/Compliance (scripts, consent, policies, forms), IT (DNS, hosting, access). Names TBD (OQ-02).

## Branches

| Branch | Purpose | Who merges into it |
|---|---|---|
| `main` | Production. Cloudflare production deploys from here. **Never push directly.** | PR from `staging` only, after approval |
| `staging` | Staging preview. Everything is reviewed here first. | PR from a work branch |
| `feature/…`, `content/…`, `fix/…`, `setup/…` | One branch per small piece of work | Author |

Branch names: lowercase and hyphens, describing the work, e.g. `content/blog-cobra-vs-medicare`, `fix/footer-phone-link`.

## Steps

1. **Check the rules first.** Read `CLAUDE.md` and the reference file for the area (tag registry, redirect map, PHI boundaries, asset inventory).
2. **Log first when required.**
   - New, changed or removed script → row in `02-compliance/tag-registry.csv` **with approver** before any code.
   - URL change → row in `03-redirects/redirect-map.csv`.
   - New image → row in `05-assets/asset-inventory.csv` with alt text.
3. **Branch** from `staging`. Make the change in small pieces.
4. **Open a PR into `staging`.** The description lists what changed, which reference files were updated, and how to check it.
5. **Preview.** Cloudflare builds a preview URL for the PR. The reviewer checks it on desktop and mobile.
6. **Approve.** The right approver for the area approves the PR (compliance approval is mandatory for anything in rule 1–3 of CLAUDE.md).
7. **Merge to `staging`**, then re-check the staging preview.
8. **Release.** Open a PR `staging` → `main`. Approver signs off. Merge deploys production.
9. **Log.** Add a line to `change-log.md` (and `decisions-log.md` if a decision was made) in the same PR.

## Emergency fixes

The same flow applies, with a faster review. A hotfix branch goes into `staging`, is checked, then into `main`. Record it in the change log with the reason.
