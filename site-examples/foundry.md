# Foundry — Production Reference Site

**Type:** Developer tools / DevOps SaaS landing page
**Blueprint:** Spatial Immersive × Command Center blend
**Palette family:** Deep technical (near-black, OKLCH mint accent)
**Stack:** React 18, vanilla CSS custom properties, no framework

This is the quality target. Every site produced by this skill should feel as polished, specific, and production-ready as this. When in doubt about what "good" looks like, read this file.

---

## What Makes It Good

### 1. Complete token system, not ad-hoc colors

Every color is a CSS custom property derived from a structured set of tokens. Nothing is hardcoded in component styles.

```css
:root {
  --bg: #0b0e13;           /* deepest background */
  --bg-elev: #11151c;      /* elevated surfaces (cards, panels) */
  --bg-elev-2: #161b24;    /* doubly elevated (charts, nested panels) */
  --surface: #1a2029;      /* interactive surface baseline */

  --line: rgba(255,255,255,0.07);       /* default borders */
  --line-strong: rgba(255,255,255,0.12); /* prominent borders */

  --fg: #e8edf5;            /* primary text */
  --fg-dim: #a4aebd;        /* secondary text */
  --fg-muted: #6b7689;      /* tertiary — labels, captions */
  --fg-faint: #434c5c;      /* subtle — decorative text, disabled */

  --accent: oklch(0.88 0.14 155);        /* mint green */
  --accent-ink: #061208;                 /* text on accent backgrounds */
  --accent-soft: color-mix(in oklab, var(--accent) 18%, transparent); /* soft tint */
}
```

**Why this matters:** Four text tones + three border strengths + three background depths = enough surface layering to create hierarchy without ever touching a gradient for structure.

---

### 2. OKLCH for accent with color-mix() for all derivatives

The accent is defined once in OKLCH (perceptually uniform, consistent lightness). Every derived state uses `color-mix(in oklab, ...)` — no hardcoded tints.

```css
/* Accent tint for soft backgrounds */
--accent-soft: color-mix(in oklab, var(--accent) 18%, transparent);

/* Button border slightly lighter than the accent fill */
border-color: color-mix(in oklab, var(--accent) 80%, white 10%);

/* Featured plan border mixed with base line */
border-color: color-mix(in oklab, var(--accent) 40%, var(--line-strong));

/* Glow shadow uses accent at partial opacity */
box-shadow: 0 6px 24px -10px var(--accent);
```

Multiple accent themes (violet, amber, sky, rose, mint) are achieved by overriding only `--accent` and `--accent-ink` on a data attribute — every derivative updates automatically.

**Replicate this:** Never hardcode tint values. Derive all accent states from the base accent via color-mix. Makes theming trivial and guarantees visual coherence.

---

### 3. Fluid typography with clamp() + negative letter-spacing

```css
h1 { font-size: clamp(44px, 6vw, 84px); letter-spacing: -0.035em; line-height: 0.98; }
h2 { font-size: clamp(32px, 3.6vw, 52px); letter-spacing: -0.03em; line-height: 1.02; }
h3 { font-size: 22px; line-height: 1.2; }
h4 { font-size: 16px; line-height: 1.3; }
```

At large sizes, tight tracking and sub-1 line-height makes headlines feel premium. The display font (Inter Tight) is distinct from the UI font — same family, different variant, creates contrast without introducing a third typeface.

**Three-font system:**
- `--font-display` / `--font-body`: Inter Tight — all UI text
- `--font-mono`: JetBrains Mono — ALL technical labels, eyebrows, table headers, kbd hints, timestamps, prices, code
- `--font-serif`: Instrument Serif italic — ONLY for pull quotes and editorial moments

**Rule:** mono font on everything that is a label, metric, or status indicator. Never use body font for these.

---

### 4. Eyebrow labels as a design system element

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.eyebrow .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px color-mix(in oklab, var(--accent) 60%, transparent);
}
```

Used at the top of every section before the headline. Creates consistent section rhythm. The glowing dot is the only decoration — it acts as an accent color anchor, not a random flourish.

**Always use eyebrow labels before section headings.** They signal section type to the user without consuming visual weight.

---

### 5. Scroll reveal — the right implementation

```css
.reveal { opacity: 0; transform: translateY(12px); transition: opacity .7s ease, transform .7s ease; }
.reveal.in { opacity: 1; transform: none; }
```

Simple class toggle via IntersectionObserver. 12px translate — subtle, not theatrical. 700ms — long enough to feel smooth, short enough not to be slow.

**Never do:** 40px+ translate, scale reveals, long stagger delays (>150ms between items), reveals on elements above the fold.

---

### 6. Navigation with backdrop blur + scroll-triggered border

```css
.nav {
  position: sticky; top: 0; z-index: 40;
  backdrop-filter: saturate(140%) blur(12px);
  background: color-mix(in oklab, var(--bg) 80%, transparent);
  border-bottom: 1px solid transparent;
  transition: border-color .2s;
}
.nav.scrolled { border-bottom-color: var(--line); }
```

The nav border only appears after scrolling. Before scroll, the page and nav bleed together. After scroll, the hairline grounds the nav in space. This is a quality signal — it means the designer thought about the first-paint state.

---

### 7. Atmospheric depth without gradient abuse

Atmosphere is achieved through two radial gradients per section max — large radius, very low opacity, positioned off-screen:

```css
.atmos {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(1200px 600px at 80% -10%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 60%),
    radial-gradient(900px 500px at -10% 20%, rgba(120,140,180,0.07), transparent 60%);
}
```

Key: the gradient extends to `transparent 60%` — most of the page sees no gradient at all. The color influence is in the far corners and edges, not the center where content lives. This creates atmosphere without washing out text contrast.

**Rule:** If you use atmospheric radial gradients, keep opacity under 15% accent, under 8% for secondary haze. Position sources outside the content area.

---

### 8. Grid-line background — when to use it

```css
.gridlines {
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 56px 56px;
}
```

Used selectively — only in the CTA banner, masked with `mask-image: radial-gradient(...)` to fade out. Not used on every section. The selectivity is what makes it effective.

---

### 9. Layered box-shadow system

Every shadow has a large radius with negative spread — this means the light source is diffuse, not hard-edged. Shadows feel physically plausible:

```css
/* Card / terminal */
box-shadow: 0 30px 80px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02);

/* Mega menu */
box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset;

/* Command palette */
box-shadow: 0 30px 100px -20px rgba(0,0,0,0.7);

/* Button primary */
box-shadow: 0 1px 0 color-mix(in oklab, var(--accent) 60%, white 20%) inset, 0 6px 24px -10px var(--accent);
```

Note the secondary `0 0 0 1px rgba(255,255,255,0.02)` shadow — this is a 1px inner glow that creates micro-separation between surface and the layer below it. Not a design effect; a depth signal.

---

### 10. Interactive pattern library

Every interactive component in Foundry is worth studying:

**Command palette** — blur overlay + scale-up entrance, keyboard navigable, grouped results with mono labels, footer with shortcut hints.

**Mega menu** — CSS opacity/transform toggle (no JS height animation), 2-column grid, icon + label + description pattern per item.

**Terminal panel** — tab-switching UI, animated blinking caret, prompt/command/output semantic coloring, accent glow radial gradient in `::before`.

**Feature tabs** — vertical tablist with 2px accent bar as the selected indicator (not background highlight alone), panel transitions between content.

**Comparison slider** — `clip-path: inset(0 0 0 var(--split))` on the "after" layer. The split position is a CSS variable updated on `pointermove`. No JS DOM manipulation needed.

**Drag-and-drop steps** — visual state via CSS classes: `.dragging` (opacity 0.4), `.drag-over` (accent border + tinted background). Simple HTML5 drag API.

**Carousel** — dots navigation with active dot widening to a pill (`width: 18px; border-radius: 3px`). Auto-play with pause on interaction.

**Pricing toggle** — monthly/yearly pill with savings badge using `color-mix()` for accent soft background.

**FAQ accordion** — `max-height` CSS animation on the answer container. `data-open="true"` toggles the `+` icon to a `×` via `rotate(45deg)`. No JS height calculation needed.

**Toast notifications** — enter/exit animations via CSS keyframes, auto-dismiss timer, type variants (success/warning/error) via accent/warn/danger color tokens.

**Hover cards** — CSS-only via `.av:hover .hovercard { opacity: 1 }`, with arrow pointing up to the avatar via `::before` rotated square. Position managed with `transform: translateX(-50%)`.

**Tweaks panel** — live theme switcher updating `data-accent` / `data-radius` / `data-density` on `<body>`. No rebuild needed — all CSS variables cascade immediately.

---

### 11. Status indicators as a system

Used consistently in tables, stats bars, toasts, and the footer:

```css
.status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-family: var(--font-mono); }
.status-pill.ok { color: var(--accent); border-color: color-mix(in oklab, var(--accent) 30%, transparent); }
.status-pill.ok .d { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
```

The dot glow is the only glow effect used in the site — and only for live status indicators, where the glow has semantic meaning (this is active/online). Not used decoratively.

**Rule for glow:** Only on elements that represent active/live state. Nowhere else.

---

### 12. Density and radius as first-class design levers

```css
[data-density="compact"]     { --density: 0.8; }
[data-density="comfortable"] { --density: 1; }
[data-density="spacious"]    { --density: 1.25; }

section { padding: calc(96px * var(--density)) 0; }
```

The `--density` variable multiplies all major spacing values. This means the site can shift between compact, comfortable, and spacious layouts without a single layout change. Design this in from the start — retrofitting it is painful.

---

## What NOT to Copy

These patterns are specific to the Foundry product context and should not be applied universally:

- **Terminal panel in the hero** — works because it is a developer tool. Would be wrong for a consumer product, healthcare app, or editorial site.
- **Drag-and-drop pipeline steps** — specific to the "How it Works" section for a CI/CD product. Do not use drag-and-drop as decoration.
- **Mint green accent** — the right palette for a technical tool. Consumer products may need warmer tones.
- **Five accent color variants** — a themes panel makes sense for a developer tool. Most sites need one accent, decided and committed.

---

## The Replication Checklist

When generating a site that should reach Foundry-level quality, verify:

- [ ] Every color is a token — no hardcoded hex in component styles
- [ ] Text hierarchy has at least four levels (primary / dim / muted / faint)
- [ ] Border system uses opacity-based whites — not solid grays
- [ ] Accent has soft, ink, and mixed derivatives — never hardcoded tints
- [ ] Typography uses clamp() for h1/h2
- [ ] Display headings have negative letter-spacing (-0.02em minimum)
- [ ] Mono font used on ALL labels, metrics, and technical text
- [ ] Eyebrow labels present on each section before the heading
- [ ] Scroll reveal on all below-fold sections
- [ ] Nav has backdrop blur + scroll-triggered border
- [ ] Atmospheric depth is via large-radius, low-opacity radial gradients
- [ ] Box shadows have negative spread for diffuse feel
- [ ] Interactive components have all three states: default, hover, active
- [ ] No glow effects except on live/active status indicators
- [ ] Command palette or equivalent keyboard nav (for developer tools)
- [ ] Every piece of fake data (stats, charts, tables) is plausible and readable

---

## Applicable Contexts

Use Foundry as the primary quality reference for:
- Developer tools, DevOps, infrastructure products
- Technical SaaS landing pages
- Dark-themed application shells
- CLI / API / SDK product pages

For consumer products, editorial sites, or warm-toned brands: the structural and motion principles apply, but palette and typography will differ. The quality bar does not change — only the aesthetics.
