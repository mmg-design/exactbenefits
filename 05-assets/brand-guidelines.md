# Brand Guidelines (draft)

**What this is:** Exact Benefits' visual language, extracted from the Webflow build, plus how it maps onto Lumos theme variables. Use this file to style the new site so it matches the current brand without hard-coding values.
**Owner:** Marketing (TBD) approves. Web lead maintains. Source: `00-source/exact-benefits-staging.webflow/css/exact-benefits-staging.webflow.css` and Adobe Fonts kit `ibo2hlj`, extracted 2026-11-07. **Status: draft. Not yet applied to `site/src/styles/base.css`.**

## Typography

| Role | Typeface | Weight | Line height | Letter spacing | Source / license |
|---|---|---|---|---|---|
| Headings (h1–h6) | **IvyPresto Headline** | 400 | 1.0 | −1px (≈ −0.02em) | Adobe Fonts kit `ibo2hlj`. Can't be self-hosted under Adobe Fonts terms (OQ-11) |
| Body | **Lato** (Regular 400, Bold 700) | 400 | 1.5 | 0 | Self-hosted `Lato-Regular.woff2`, `Lato-Bold.woff2` (SIL Open Font License) |

### Type scale (fluid, rem at 320px → 1280px viewport)

| Style | Min | Max | px (min → max) |
|---|---|---|---|
| H1 | 2.5 | 5 | 40 → 80 |
| H2 *(variable)* | 2 | 4 | 32 → 64. Note: Webflow's `h2` element actually uses the H3 size |
| H3 | 1.5 | 3 | 24 → 48 |
| H4 | 1.25 | 2 | 20 → 32 |
| H5 | 1.125 | 1.25 | 18 → 20 |
| H6 | 1 | 1.125 | 16 → 18 |
| Text large | 1.125 | 1.25 | 18 → 20 |
| Text medium | 1 | 1.125 | 16 → 18 |
| Text regular | 1 | 1 | 16 |
| Text small | 0.875 | 0.875 | 14 |
| Text tiny | 0.75 | 0.75 | 12 |

## Color

| Family | Light | Light hover | Light active | **Normal** | Normal hover | Normal active | Dark | Dark hover | Dark active | Darker |
|---|---|---|---|---|---|---|---|---|---|---|
| **Midnight** | `#e7e8e9` | `#dbddde` | `#b5b8ba` | **`#111922`** | `#0f171f` | `#0e141b` | `#0d131a` | `#0a0f14` | `#080b0f` | `#06090c` |
| **Modern Teal** | `#e6f6f6` | `#d9f1f1` | `#b0e3e3` | **`#00a4a4`** | — | `#008383` | `#007b7b` | `#007b7b` | `#004a4a` | `#003939` |
| **Vital Lime** | `#fdfeec` | `#fbfee2` | `#f7fcc3` | **`#e6f53d`** | `#cfdd37` | `#b8c431` | `#adb82e` | `#8a9325` | `#676e1b` | `#515615` |

Neutrals: white `#ffffff`, off-white `#fff6f6`, neutral-lightest `#eeeeee`, text-lighter `#636262`, black `#000000`.
Current defaults: background white, text black, card border Modern Teal.

> ⚠️ Contrast: Vital Lime and Modern Teal **normal** are too light for body text on white. Use them as backgrounds/accents and pair Lime with Midnight text. Verify every combination against WCAG AA (`02-compliance/accessibility-checklist.md`).

## Shape, spacing, layout

- Radius: 0.25rem · 0.5rem · 1rem · round (100vw). Border width 0.0625rem.
- Spacing: fluid scale from 0.125rem to 10rem (Webflow `--_fluid---*`).
- Container: 320px → 1280px fluid range. Global side padding 1 → 1.5rem.
- Webflow breakpoints: 991 / 767 / 479px. Lumos Grid breakpoints: 64 / 48 / 30rem (1024 / 768 / 480px). Close enough to keep Lumos defaults.

## Proposed mapping onto Lumos (`site/src/styles/base.css`), needs Marketing approval

Per CLAUDE.md we **change variable values, never override them**.

| Lumos variable | Proposed value |
|---|---|
| `--light-100` / `--light-200` / `--light-300` | `#ffffff` / `#fff6f6` (off-white) / `#eeeeee` |
| `--dark-700` / `--dark-800` / `--dark-900` | `#0d131a` / `#0a0f14` / `#111922` (Midnight) |
| `--brand-500` | `#e6f53d` (Vital Lime) *or* `#00a4a4` (Modern Teal). **Marketing to choose the primary brand color.** |
| `--brand-text` | `var(--dark-900)` if Lime; `#ffffff` if Teal (check contrast) |
| New swatch family | Add Teal (and Lime) as swatches beside the Lumos ones so both stay available |
| `--primary-family` | Lato (self-hosted through Astro `fonts` config) |
| Heading font | Add a heading family variable for IvyPresto and point `--display/--h1…--h6-font-family` at it |
| `--h1-min/max` … `--h6-min/max` | 40/80, 32/64, 24/48, 20/32, 18/20, 16/18 |
| `--text-large-*`, `--text-main-*`, `--text-small-*` | 18/20, 16/18, 14/14 |
| `--viewport-max` | 1440 (Lumos) vs 1280 (Webflow). Decide; 1280 matches the current site exactly |
| `--radius-small` / `--radius-main` | 0.5rem / 1rem (same as Lumos) |
| Heading letter spacing | `--letter-spacing-tight: -0.02em` |

## Logo and imagery

- Logos, favicon (`images/favicon.png`) and webclip (`images/webclip.png`) are in the export. Copy the master logo files into `05-assets/logos/` and request vector (SVG) originals from Marketing.
- `documents/Hero-benefits.json` is a Lottie animation used in the hero.
- Image naming on import: `page-section-description.webp` (lowercase, hyphens, no spaces).
