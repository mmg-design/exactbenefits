# Accessibility Checklist

**What this is:** The accessibility standard every page must meet before it ships: **WCAG 2.2 Level AA**. Run it per page template on staging and record the results.
**Owner:** Web lead runs the checks. Marketing owns alt text and content clarity. Compliance signs off before launch.

## Baseline from current site (export scan 2026-11-07)

- 181 images in use: **2 have no alt text anywhere** (see `05-assets/asset-inventory.csv`); several more have empty alt on some pages and need a decorative-or-not decision.
- Missing `<h1>` on: `/webinars`, `/medicare-pricing-calculator`, blog category template, partners template.
- The style guide's h2 is visually styled at the h3 size (Webflow quirk). Heading levels must follow structure, not looks.

## Per-template checks

### Structure
- [ ] Exactly one `<h1>`; headings in order (no skipped levels)
- [ ] Landmarks: one `<main>`, `<nav>` with label, `<footer>`. Lumos `BaseLayout` provides these.
- [ ] Skip link works (Lumos `SkipLink`)
- [ ] `lang="en"` on `<html>`
- [ ] Page `<title>` is unique and descriptive

### Images & media
- [ ] Every meaningful image has accurate alt text; decorative images use empty alt
- [ ] No text baked into images (or text repeated in alt/HTML)
- [ ] Video has captions; no autoplay with sound; pause control for motion over 5 seconds (Marquee, Slider)

### Color & text
- [ ] Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI components) in **every** theme. Check Vital Lime `#e6f53d` and Modern Teal `#00a4a4` carefully.
- [ ] Text resizes to 200% without loss; reflows at 320px width
- [ ] No information conveyed by color alone

### Keyboard & focus
- [ ] Every interactive element reachable and operable by keyboard
- [ ] Visible focus indicator (Lumos `:focus-visible` tokens)
- [ ] Modals and consent banner trap focus while open and return focus on close
- [ ] Target size ≥ 24×24 CSS px (WCAG 2.2)

### Forms (incl. GHL iframes)
- [ ] Every field has a visible label; required fields marked in text, not only color
- [ ] Errors are announced and described in text
- [ ] GHL iframes have a descriptive `title` attribute
- [ ] Autocomplete attributes on name, email, phone (Lumos `Input` presets)

### Motion
- [ ] Respects `prefers-reduced-motion` (Lumos base handles CSS; check any JS animations)

## Tools

axe DevTools or Lighthouse accessibility audit, keyboard-only walkthrough, VoiceOver (macOS) spot check, contrast checker.

## Results log

| Template / URL | Date | Tester | Pass/Fail | Issues |
|---|---|---|---|---|
| | | | | |
