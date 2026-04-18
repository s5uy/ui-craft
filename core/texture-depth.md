# Texture & Depth

Premium sites distinguish themselves from AI slop in a single dimension more than any other: **texture**. Flat, gradient-heavy AI output reads as "generated." Real designer work has noise, hairline borders, photographic surfaces, carefully-crafted shadows, subtle halation. This file codifies how to get texture right per direction — without gradients doing the work.

---

## Universal Rules

### 1. Gradients are not depth
Gradients are color transitions. Depth is created by:
- **Hierarchy of surfaces** (bg-0, bg-1, bg-2)
- **Hairline borders** separating planes
- **Shadows** with negative spread (diffuse lift)
- **Grain/noise overlays** breaking flat areas
- **Photographic textures** on hero visuals
- **Backdrop blur** on floating elements

If your page looks flat, add these — not a gradient.

### 2. One shadow system per page
Define 3-5 shadow levels as tokens. Reuse them. Don't author shadows inline per component.

```css
--shadow-subtle: 0 1px 2px 0 oklch(0 0 0 / 0.04);
--shadow-low:    0 4px 8px -2px oklch(0 0 0 / 0.08);
--shadow-raised: 0 12px 32px -8px oklch(0 0 0 / 0.12);
--shadow-float:  0 24px 64px -16px oklch(0 0 0 / 0.18);
--shadow-dramatic: 0 40px 80px -24px oklch(0 0 0 / 0.24);
```

**Negative spread matters.** `0 24px 64px -16px` creates a lifted, diffuse shadow. `0 24px 64px 0` creates a heavy, amateur shadow. Always use negative spread unless simulating hard paper-edge.

### 3. Noise is (almost always) right
Subtle grain on a near-flat background removes the "CSS flat color" feel. 1-3% opacity, generated via SVG `<feTurbulence>` or a 256x256 PNG tile.

```tsx
function NoiseOverlay({ opacity = 0.015 }) {
  return (
    <svg className="pointer-events-none fixed inset-0 -z-10 w-full h-full" style={{ opacity }}>
      <filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="2" /></filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
```

Use it in TM, DE, and EL. VP uses noise sparingly (color already breaks flatness).

### 4. Borders are structure, not decoration
Every direction uses borders for layout separation — but the *tone* of the border is direction-specific:

| Direction | Border rule |
|---|---|
| TM | Two tones — `border-weak` (hairline separator), `border-strong` (panel edge) |
| DE | Single hairline, `0.5px` at 2x (`oklch(0.92 0 0 / 0.6)` or similar) |
| VP | Rarely visible borders; depth from color + shadow |
| EL | Almost no borders; depth from type scale + whitespace + photography |

---

## TM — Technical-Minimal Texture

### Surface hierarchy
Three surface depths, within 8 lightness points:
```css
--bg-0: oklch(0.14 0 0);  /* app background */
--bg-1: oklch(0.17 0 0);  /* panel */
--bg-2: oklch(0.20 0 0);  /* raised card */
--bg-3: oklch(0.23 0 0);  /* selected/hover state */
```

### Borders
```css
--border-weak:   oklch(0.28 0 0 / 0.6);
--border-strong: oklch(0.32 0 0);
```

### Shadow tokens (dark-mode tuned)
```css
--shadow-panel:  0 16px 40px -16px oklch(0 0 0 / 0.6);
--shadow-raised: 0 24px 48px -20px oklch(0 0 0 / 0.5);
--shadow-glow-accent: 0 0 32px -8px var(--accent-soft);  /* reserved for status-live */
```

### Atmospheric gradient (ALLOWED — the one exception)
A single, positioned, <15% opacity radial gradient behind the hero, off-center, using the accent color. This is TM's "atmosphere."

```tsx
<div className="absolute top-0 right-0 -z-10 pointer-events-none"
     style={{
       width: '700px', height: '700px',
       transform: 'translate(30%, -30%)',
       background: 'radial-gradient(circle, oklch(0.72 0.17 180 / 0.12), transparent 60%)',
       filter: 'blur(80px)'
     }} />
```

### Noise
Always. 1.5-2% opacity. Fixed-position SVG overlay — subtle enough to miss consciously, significant enough to break flat feel.

### Signature TM texture moves
- **Grid background** on hero — dotted or lined grid, very low opacity
  ```css
  background-image:
    linear-gradient(oklch(0.25 0 0 / 0.4) 1px, transparent 1px),
    linear-gradient(90deg, oklch(0.25 0 0 / 0.4) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  ```
- **Halation glow on status-live dot** — 16px `box-shadow` of accent at 40% opacity, nothing else glows
- **Panel borders fade at the edges** via `border-image` or a pseudo-element gradient — gives panels a hand-drawn feel
- **Terminal window has real chrome** — three dots, window title, bottom scroll-bar hint — not decorative but structural

### What fails TM texture
- Hard-edged shadows (`0 8px 16px 0` with no negative spread)
- Gradient text, gradient buttons — explicitly banned
- Flat `#000` backgrounds — too sterile, always `oklch(0.14 0 0)` or similar
- Multi-color ambient glows — TM uses ONE accent color only

---

## DE — Design-Engineer Texture

### Surface hierarchy
Light-mode-first paper system:
```css
/* Paper */
--bg-0: oklch(0.99 0 0);     /* paper white */
--bg-1: oklch(0.97 0 0);     /* slightly recessed */
--bg-2: oklch(0.95 0 0);     /* card on paper */

/* Graphite (dark mode alternate) */
--bg-0-dark: oklch(0.11 0 0);
--bg-1-dark: oklch(0.14 0 0);
--bg-2-dark: oklch(0.17 0 0);
```

### Borders
Hairline, almost imperceptible but present:
```css
--border-hairline-paper:  oklch(0.88 0 0);   /* light mode */
--border-hairline-dark:   oklch(0.22 0 0);   /* dark mode */
```

Apply at `1px` but visually thinner via opacity:
```css
.dividing-line { border-top: 1px solid oklch(0.92 0 0 / 0.8); }
```

### Shadow tokens
DE shadows are near-invisible — elevation comes from borders and type.
```css
--shadow-subtle: 0 1px 1px 0 oklch(0 0 0 / 0.03);
--shadow-low:    0 4px 12px -4px oklch(0 0 0 / 0.06);
--shadow-raised: 0 16px 40px -12px oklch(0 0 0 / 0.08);
```

### Gradients
**Forbidden.** Even atmospheric. DE signals craft by refusing the easy trick.

### Noise
Subtle — 1% opacity. On paper backgrounds, noise adds a printed-page feel.

### Signature DE texture moves
- **Paper-texture bg** — subtle noise + very slight vertical linen pattern
  ```css
  background-image:
    url("data:image/svg+xml,%3Csvg...%3Cfilter id='t'%3E%3CfeTurbulence baseFrequency='0.7' numOctaves='2'/%3E%3C/filter%3E%3Crect filter='url(%23t)' opacity='0.01'/%3E%3C/svg%3E"),
    linear-gradient(180deg, oklch(0.99 0 0), oklch(0.98 0 0));
  ```
- **Cursor spotlight** — a radial light that follows cursor on feature cards. Light-mode: `oklch(0.98 0 0 / 0.6)` halation. Dark-mode: `oklch(0.98 0 0 / 0.04)`.
- **Hairline divider with mono label** — sections divided by a `1px` line with a centered uppercase mono label overlaid, 11px
  ```tsx
  <div className="relative py-16">
    <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--border-hairline)]" />
    <div className="relative max-w-container mx-auto px-10 text-center">
      <span className="bg-[var(--bg-0)] px-4 text-[11px] uppercase tracking-[0.2em] font-mono text-muted">
        — 02 —
      </span>
    </div>
  </div>
  ```
- **Photographic texture on portraits** — designer-engineer portfolios use real photography (studio-neutral backgrounds, B&W or muted color). No stock.

### What fails DE texture
- Chromatic gradients — DE contract violation
- Drop-shadow-heavy cards — breaks the hairline-border principle
- Decorative backgrounds (patterns, mesh) — DE is quiet
- Heavy box-shadow stacks — DE shadows are near-invisible

---

## VP — Vibrant-Playful Texture

### Surface hierarchy
Often light-mode, bright:
```css
--bg-0: oklch(0.99 0.005 85);  /* warm near-white */
--bg-1: oklch(0.97 0.01 85);   /* slight warmth */
--bg-2: oklch(0.95 0.02 85);   /* warmer card */

/* Color-block sections (one per section, not per card) */
--bg-peach:    oklch(0.93 0.06 45);
--bg-mint:     oklch(0.94 0.05 160);
--bg-lavender: oklch(0.93 0.05 290);
--bg-butter:   oklch(0.96 0.08 85);
--bg-sky:      oklch(0.93 0.06 230);
```

### Borders
Rarely visible — depth from color blocks and shadow. When needed, `oklch(0.85 0 0)` or matching tint of section bg.

### Shadow tokens
VP shadows are softer, more diffuse, often warm-tinted:
```css
--shadow-card:    0 16px 48px -16px oklch(0.3 0.05 30 / 0.18);
--shadow-float:   0 32px 80px -24px oklch(0.3 0.05 30 / 0.22);
--shadow-hover:   0 40px 80px -20px oklch(0.3 0.1 30 / 0.28);
```

### Gradients — THE ALLOWED DIRECTION
VP is the only direction where gradients are a primary device. But they must be:
1. **Crafted, not defaulted** — specific two-tone combos (pink→orange, violet→cyan, etc.)
2. **Applied to surfaces**, not text (exception: one hero word)
3. **Part of a palette set** — 3-4 gradient combos used intentionally across the page

Examples:
```css
--gradient-warm:   linear-gradient(135deg, oklch(0.72 0.18 25), oklch(0.78 0.15 45));
--gradient-cool:   linear-gradient(135deg, oklch(0.68 0.17 270), oklch(0.72 0.16 210));
--gradient-sunset: linear-gradient(160deg, oklch(0.74 0.17 355), oklch(0.76 0.16 55));
--gradient-candy:  linear-gradient(120deg, oklch(0.80 0.12 320), oklch(0.82 0.10 180));
```

### Noise
Rarely needed — color and surface variety already break flatness.

### Signature VP texture moves
- **Gradient card stack** — 3-4 feature cards, each with a different gradient surface, rounded-3xl, p-10
- **Soft inner glow on chunky cards** — inset shadow that makes cards feel inflated
  ```css
  box-shadow:
    0 24px 48px -16px oklch(0 0 0 / 0.12),
    inset 0 1px 0 oklch(1 0 0 / 0.3);
  ```
- **Color-blocked sections** — each feature section owns a full-width bg color
- **Chunky rounded corners** — `rounded-3xl` (24px) everywhere; `rounded-[32px]` on hero cards
- **Soft halation on buttons** — primary CTA has a 32px soft glow of its own accent color

### What fails VP texture
- Monochrome everything — VP needs color
- Hard-edged shadows — VP shadows are soft and diffuse
- Sharp corners (`rounded-sm`, `rounded-md`) — VP is chunky
- Default purple-blue SaaS gradient — that's not VP, that's AI slop

---

## EL — Editorial-Luxury Texture

### Surface hierarchy
Often binary — pure or near-pure light + one brand accent:
```css
/* Light (Apple, Aesop, Rhode) */
--bg-0: oklch(0.99 0 0);       /* near-white */
--bg-brand-accent: oklch(0.55 0.15 30);  /* one product color */

/* Dark (Apple product detail, Nothing Tech) */
--bg-0-dark: oklch(0.08 0 0);  /* near-matte-black */
```

### Borders
Almost never. When used, at section edges only, `1px` at very low opacity.

### Shadow tokens
Shadows primarily on product imagery — photographic, not UI-flat.
```css
--shadow-product: 0 40px 120px -40px oklch(0 0 0 / 0.25);  /* simulated studio photography */
--shadow-lift:    0 24px 64px -24px oklch(0 0 0 / 0.12);
```

### Gradients
**Forbidden** except when:
1. The gradient IS the brand (Apple's WWDC iridescent stripe)
2. Product photography naturally contains gradient (anodized metal, reflective glass — not CSS)

### Noise
Subtle — 1% opacity, on paper-type backgrounds only.

### Signature EL texture moves
- **Photography as texture** — EL depth is photographic. Product photos, studio-lit, high-resolution. No illustrations, no 3D renders unless they ARE the product.
- **Full-bleed hero product shot** — image breaks container, extends to viewport edges
- **Vignette on hero imagery** — subtle radial darkening at corners for focus
- **Film grain on imagery** — 5-8% grain on hero photography for filmic quality
- **Soft product shadow** — `0 80px 160px -40px oklch(0 0 0 / 0.4)` on floating product shots, simulating studio lighting
- **Frosted glass panels** — for EL dark-mode overlays (pricing detail, product specs), `backdrop-filter: blur(40px) saturate(180%)`

### What fails EL texture
- Gradient anything (except brand/product) — immediate EL contract violation
- Flat CSS surfaces without photography — EL needs imagery to earn luxury feel
- Heavy drop shadows on UI elements — EL UI is flat; shadows belong on products
- Patterned backgrounds — EL is silent

---

## Grain/Noise Reference — Copy-Paste

One SVG component that works everywhere:

```tsx
// components/noise.tsx
export function Noise({ opacity = 0.015, zIndex = -10 }: { opacity?: number; zIndex?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex, opacity }}
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
```

Drop it in the root layout:
```tsx
<body>
  <Noise opacity={0.015} />
  {children}
</body>
```

Recommended opacities:
- TM: 0.015–0.020
- DE: 0.010–0.015 (paper) / 0.020 (graphite)
- VP: 0 (skip) or 0.008 (barely there)
- EL: 0.010 (paper) / on imagery as film grain at 0.05–0.08

---

## Halation & Glow — The Rule

Glow is powerful but dangerous. Misuse = AI slop. Use it only:

| Direction | Allowed glow |
|---|---|
| TM | Status-live dot only. 16-24px soft halation of accent. |
| DE | Cursor spotlight on feature cards. No element glows on its own. |
| VP | Primary CTA halation. Button hover adds 24-32px soft glow of button color. |
| EL | Product imagery halation (simulated studio lighting). No UI glow. |

Any glow outside these uses = delete.

---

## The Pinch Test

Zoom your finished site to 50% and squint. If you can still see:
- Distinct surface hierarchy (surfaces don't merge into one mass)
- Section rhythm (dense / breathing / dense pattern)
- Hero-as-focal-point (not just big text among big text)

Then texture and depth are working. If it looks like one flat blur, rebuild with the shadow + border + noise system above.
