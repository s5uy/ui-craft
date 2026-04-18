# Pattern: Noise Overlay

**Direction:** Universal (primary: TM, DE, EL — sparingly in VP)
**Role:** Subtle grain texture that removes the "flat CSS color" feel. One of the fastest ways to make a page look specialist-made.

---

## Component

```tsx
// components/noise-overlay.tsx
interface NoiseOverlayProps {
  opacity?: number;          // 0-1, default 0.015
  zIndex?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
}

export function NoiseOverlay({
  opacity = 0.015,
  zIndex = -10,
  blendMode,
}: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex, opacity, mixBlendMode: blendMode }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="w-full h-full"
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
}
```

## Usage

Drop it once in the root layout:

```tsx
// app/layout.tsx
import { NoiseOverlay } from "@/components/noise-overlay";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NoiseOverlay opacity={0.015} />
        {children}
      </body>
    </html>
  );
}
```

---

## Direction-specific opacity

| Direction | Opacity | Notes |
|---|---|---|
| TM | 0.015 - 0.020 | On both light and dark — breaks the plastic CSS feel |
| DE | 0.012 (paper) / 0.022 (graphite) | On paper bg, lower; on graphite, higher |
| VP | 0 or 0.008 | Often skipped — color + gradients already break flatness |
| EL light-mode | 0.010 | Subtle paper-like grain |
| EL dark-mode | 0.018 | Cinematic filmic grain |

---

## Alternative: PNG tile approach (lower filter cost)

For older browsers or performance-sensitive pages, use a 256x256 noise PNG tiled:

```tsx
<div
  className="pointer-events-none fixed inset-0"
  style={{
    backgroundImage: "url('/noise-tile.png')",
    backgroundRepeat: "repeat",
    opacity: 0.015,
    zIndex: -10,
  }}
/>
```

Generate a tile with:
```bash
# Using ImageMagick
magick -size 256x256 xc: +noise Random -colorspace Gray -attenuate 0.6 noise-tile.png
```

---

## Scoped noise (on specific elements only)

Sometimes you want noise only on a card or hero:

```tsx
<div className="relative overflow-hidden rounded-2xl bg-[oklch(0.15_0_0)]">
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
    <svg width="100%" height="100%">
      <filter id="scoped-noise">
        <feTurbulence baseFrequency="0.9" numOctaves="2" />
      </filter>
      <rect width="100%" height="100%" filter="url(#scoped-noise)" />
    </svg>
  </div>
  {/* card content */}
</div>
```

---

## Film grain on imagery (EL signature)

For EL product photography, overlay film grain directly on the image:

```tsx
<div className="relative">
  <img src="/hero-product.jpg" className="w-full" />
  <div
    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08]"
    style={{
      backgroundImage: "url('/film-grain.png')",
    }}
  />
</div>
```

Pair `mix-blend-overlay` with 5-8% opacity for a filmic quality.

---

## Accessibility
- `aria-hidden="true"` — never announced
- `pointer-events: none` — never captures clicks
- Does not affect contrast enough to fail WCAG at 0.015 opacity

## When to use
- Universal — on TM, DE, EL sites, apply it once in root layout
- On specific cards for extra texture (DE, EL)
- As film grain on hero imagery (EL)

## When NOT to use
- VP color-block sections — color already breaks flatness
- Very high-opacity (> 0.04) — reads as degraded image, not design
- On the product image itself in e-commerce (you're selling the product, not the grain)
