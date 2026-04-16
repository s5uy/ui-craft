# Blueprint: Spatial Immersive

## Overview

**Mood:** Cinematic, elegant, atmospheric, fluid

**Best for:**
- SaaS product homepages
- Premium product marketing pages
- Startup launches with visual ambition
- High-end consumer tech landing pages
- Portfolio and studio sites with a product orientation
- AI product launches where the product itself is visual

**Not for:**
- Dense data interfaces where every pixel must be productive
- Products where trust requires conservatism (finance, healthcare, compliance)
- Editorial or reading-first content
- Admin or settings-heavy interfaces

---

## Visual Traits

The defining quality is **depth**. The interface feels like it has physical layers — surfaces floating above other surfaces, elements receding into space, a sense that the UI exists in three dimensions even though it is flat.

This depth is achieved through:
- Slightly different background tones for different layers (not gradient — tonal separation)
- Transparency and blur used carefully (frosted surfaces, not washed-out glass)
- Scale variation (some elements close and large, others far and small)
- Shadow that creates genuine elevation (directional, precise, not muddy)
- Typography that varies dramatically in scale to create foreground/background

The hero section is the most important surface. It should feel cinematic — like an establishing shot that communicates the product's entire character in one view. Not a heading + subheading + two buttons. A composition.

---

## Suggested Palette

**Dark variant (default):**

**Background:** `#09090B` (zinc-950 — slightly warm near-black)
**Surface:** `#111113`
**Panel:** `#18181B` (zinc-900)
**Panel elevated:** `#27272A` (zinc-800)
**Border:** `rgba(255, 255, 255, 0.07)`
**Border subtle:** `rgba(255, 255, 255, 0.04)`
**Primary text:** `#FAFAFA`
**Secondary text:** `rgba(250, 250, 250, 0.65)`
**Muted text:** `rgba(250, 250, 250, 0.40)`
**Accent:** `#E4E4E7` (zinc-200) — restrained, nearly neutral accent
**Accent active:** choose based on brand — one color, used sparingly

**Light variant:**

**Background:** `#FAFAFA`
**Surface:** `#F4F4F5` (zinc-100)
**Panel:** `#FFFFFF`
**Border:** `rgba(0, 0, 0, 0.07)`
**Primary text:** `#09090B`
**Secondary text:** `rgba(9, 9, 11, 0.6)`
**Muted text:** `rgba(9, 9, 11, 0.38)`

**Palette logic:** Zinc-based neutrals have a faint warmth that prevents the "cold gray" feeling of pure RGB grayscale. At dark values, zinc-950/900/800 creates a sophisticated layering system with just enough tonal difference to suggest depth. The accent is intentionally near-neutral — the product screenshot or feature image provides the color moment, not the interface chrome.

---

## Typography Direction

Typography carries the hero. In this blueprint, the hero headline is often the most designed element on the page.

**Hero headlines:** Very large (56–96px), light or regular weight on dark background, tight tracking (-0.03em to -0.05em). The size is the design. Let it breathe — do not crowd it with too much supporting content.

**Subheadlines:** Significantly smaller (18–22px), lower opacity (65%), regular weight. The contrast with the hero type creates hierarchy through scale alone.

**Section headings:** 28–40px, semibold. Not as dramatic as hero but clearly a step above body.

**Body/supporting copy:** 15–17px, 65% opacity on dark backgrounds. Constrained to readable line length (55–65ch).

**Label/metadata type:** 11–13px, uppercase, wide tracking (0.08em+), 45% opacity. Used for category labels, dates, counts.

**Typeface strategy:** Neutral geometric sans (Inter, DM Sans, Geist) for most content. Occasional use of a display serif for hero moments if the brand has warmth or authority. Never two expressive typefaces.

---

## Spacing Logic

Generous. This blueprint breathes.

- Hero section: 120–160px vertical padding
- Between major sections: 80–120px
- Within sections, between heading and content: 32–48px
- Card/panel internal padding: 24–32px

The generosity of spacing creates the sense of a premium, unhurried product. Tight spacing in this blueprint reads as unfinished, not efficient.

Where sections are full-bleed (edge-to-edge), content should still be contained within a max-width (1200–1400px) centered container.

Asymmetry within sections is encouraged — a 60/40 split for text and visual, a large product screenshot offset to one side with text anchored left.

---

## Motion Tone

**Cinematic and fluid.** Motion should feel like it belongs in a product video, not a startup template.

- Scroll reveals: `duration-700` to `duration-900` with custom ease `[0.16, 1, 0.3, 1]` (fast start, long tail deceleration)
- Hero entrance: staggered children, each with `duration-600`, stagger `0.15s`
- Feature section reveals: items slide in from 40px below, `duration-600`
- Image/screenshot entrance: slight scale (0.97 → 1.0) + fade, `duration-800`
- Hover on interactive cards: `y: -4`, `duration-300` — floats upward slightly
- CTA hover: magnetic behavior (optional but appropriate for this blueprint)

Spring physics are appropriate for interactive drag/magnetic elements. Not for scroll reveals.

Do not use constant floating animations on background elements. The atmosphere should feel stable, not restless.

---

## Surface Treatment

Depth is the primary surface tool. Create it through:

**Tonal layering:**
```
#09090B  ← page background
#111113  ← primary surface (hero content area)
#18181B  ← component panels, cards
#27272A  ← elevated panels, active states
```

**Transparency for glass panels:** When using frosted glass surfaces, the blur must be meaningful (`backdrop-blur-xl` minimum), the overlay very subtle (white at 4–6% opacity), and the use sparing. One glass panel on a page is interesting. Four competing glass panels is generic glassmorphism.

**Shadows:** Directional and precise. `0 4px 24px rgba(0,0,0,0.4)` for floating panels. `0 1px 3px rgba(0,0,0,0.2)` for cards. Never colored glow shadows — `box-shadow: 0 0 40px rgba(0, 200, 100, 0.3)` is exactly the gimmick this blueprint does not need.

**Subtle texture:** Very low opacity noise or grain on the hero background (`0.03–0.04` opacity) adds surface quality without being visible as a deliberate effect. Optional, but effective.

**Border behavior:** `rgba(255,255,255,0.07)` for default panels. `rgba(255,255,255,0.12)` on hover. Never animated gradient borders.

---

## Component Vocabulary

- `<HeroScene />` — full-viewport hero with layered depth, large headline, and floating product preview
- `<FloatingShowcase />` — product screenshot or demo that appears to float above the background
- `<ParallaxFeatureScene />` — feature section with text and image in parallax relationship on scroll
- `<MagneticButton />` — CTA button with magnetic cursor attraction behavior
- `<DepthGrid />` — background grid with perspective or z-depth illusion
- `<FeatureReel />` — horizontally scrollable or auto-advancing feature highlight
- `<GlassPanel />` — frosted glass card surface (used sparingly)
- `<RevealSection />` — section that enters with cinematic scroll-triggered animation
- `<MetricRail />` — horizontal strip of key metrics/social proof numbers
- `<ProductPreview />` — accurately rendered product UI screenshot or mockup

---

## Anti-Patterns for This Blueprint

**Gradient fog in the hero.** A large radial gradient blob behind the headline is the most overused pattern in AI-generated SaaS homepages. Do not use it. The hero atmosphere should come from surface layering, scale, and typography — not a purple mist.

**Glowing cards.** Feature cards with animated glow borders are demo components, not product UI. A well-composed card with strong content hierarchy does not need a glow to feel premium.

**Floating animated orbs or blobs.** `animate-float` on a blurred color shape in the background is pure AI-slop. Remove it entirely.

**Too many glass panels competing.** Glassmorphism works when used once, purposefully. Three competing frosted panels in the same viewport cancel each other out and look dated.

**Generic three-column icon feature grid.** The feature section should have a point of view — not three cards with an icon, a heading, and a short paragraph all at the same weight.

**Bright neon accent with no brand logic.** An acid green or electric blue accent on a neutral dark surface can be powerful. But it must be chosen deliberately, not because "it looks modern."

---

## Example Products

- **Vercel** — dark surface, restrained palette, product-first hero with real UI preview
- **Resend** — simple but spatial, strong type, neutral-first, product screenshot anchored
- **Clerk** — premium SaaS homepage, clean dark, deliberate color usage
