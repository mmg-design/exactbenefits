# Policy Pages

**What this is:** Every legal and policy page the site needs: whether it exists, who owns its text, and when it was last reviewed. Policy text is migrated **word for word** and changed only with Legal/Compliance approval.
**Owner:** Legal/Compliance (TBD, OQ-02).

| Page | Current URL | Status today | New site | Text owner | Last legal review |
|---|---|---|---|---|---|
| Privacy Policy | `/privacy-policy` | Live (200) | Migrate verbatim, same URL | Legal | TBD |
| SMS Terms of Service | `/sms-terms-of-service` | Live (200) | Migrate verbatim, same URL. GHL forms likely collect SMS opt-in, so this must stay linked next to those forms. | Legal | TBD |
| Cookie Policy | `/legal/cookie-policy` | Drafted 2026-11-08 from `tag-registry.csv` and observed site behavior. **Legal review required before launch** (OQ-08) | Published at this URL on the new site | Legal | Not yet reviewed |
| Terms of Use | none | Doesn't exist | Decide if required (OQ-20) | Legal | — |
| Accessibility Statement | none | Doesn't exist | Recommended (WCAG 2.2 AA target, contact for accessibility issues) | Legal + Marketing | — |
| "Your Privacy Choices" / Do Not Sell or Share | Banner zone only | Partial (CookieFlow US zone) | Footer link opens consent preferences (see `consent-setup.md`) | Legal | — |
| Medicare marketing disclaimer (TPMO) | none | Not present | Compliance to decide if required (OQ-12) | Legal | — |

## Company details (from current structured data, confirm before reuse)

- Legal/brand name: "Exact Benefits Powered by Exact Medicare" (also "Exact Benefits Group" in some titles). **Confirm the official name.**
- Address: 550 Polaris Pkwy #510, Westerville, OH 43082
- Phone: +1-888-893-9553 · Email: info@exactbenefits.com

## Rules

- Policy pages are always indexable and linked from the footer on every page.
- Each policy page shows a "Last updated" date that matches this file.
- Any change to policy text needs a `change-log.md` line naming the Legal approver.
