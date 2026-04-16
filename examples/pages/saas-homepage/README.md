# SaaS Homepage — Design Decisions

Blueprint: Spatial Immersive
Palette: neutral-cool
Accent: single (blue-600)
Context: Analytics SaaS — "Meridian Analytics"

---

## What This Demonstrates

A complete SaaS landing page using the Spatial Immersive blueprint: generous whitespace, large typography, restrained accent use, scroll-driven reveals. The product is a data analytics platform. The page earns trust through clarity, not decoration.

---

## Blueprint Application: Spatial Immersive

Spatial Immersive uses space as the design material. The page breathes — sections have 120px+ vertical padding, the hero takes 90vh, and elements appear as you scroll rather than loading all at once.

Key decisions:
- `min-h-[90vh]` hero, not full-screen (leaves space to peek at next section — encourages scroll)
- `py-24 md:py-32` on feature sections — generous but not excessive
- Single sticky nav that becomes opaque on scroll
- No cards in the hero — the product speaks for itself

---

## Typography Decisions

**Headline:** `text-5xl md:text-7xl font-semibold tracking-tight`

Not `font-bold`. Semibold at large sizes avoids the "tech startup aggressive" reading. Tight tracking at large sizes is standard; don't add `tracking-normal` which breaks the display type.

**Subheadline:** `text-xl text-muted-foreground max-w-xl` — never full-width. Long lines at large type size are unreadable.

**Section labels:** `text-xs font-semibold uppercase tracking-widest text-accent` — used sparingly (2 per page maximum). Wider tracking on uppercase small type is a typographic convention, not a default.

---

## Accent Discipline

Blue-600 (`text-blue-600`, `bg-blue-600`) appears in:
1. The primary CTA button
2. The active nav state
3. Inline highlights in prose (used once, for the tagline's key phrase)

It does NOT appear in:
- Section labels (those use `text-muted-foreground` — the accent scarcity rule means we save it for the most critical moments)
- Decorative elements
- More than one place per viewport at any time

---

## Motion Strategy

Hero block: `delay: 0.1` fade-in — barely perceptible, but prevents the "pop" of zero-delay render.

Feature section: scroll-triggered stagger via `whileInView`. Each feature card animates `opacity: 0 → 1, y: 24 → 0` with a stagger of `0.08s`. The stagger is short — it creates sequence without making the user wait.

Stat section: numbers animate up via `useMotionValue` + `useTransform`. This is one of the only cases where animation directly on content is appropriate — the motion is semantic (these numbers are live, growing metrics).

Nothing in the navigation animates. Nav is chrome; chrome is instant.

---

## What Was Deliberately Excluded

- **Hero background gradient** — would immediately classify this as "AI slop landing page"
- **Floating 3D product screenshot** — see `anti-patterns/generic-layouts.md`
- **"Trusted by 10,000+ companies" logo row** — generic filler; replaced with a specific, named testimonial
- **Feature icon grid with purple gradients** — replaced with a two-column prose layout, which reads as more considered
- **Animated particle background** — decorative, no semantic value
- **Scroll-progress bar** — a distraction in a marketing context

---

## Content Quality

All copy is specific to the product context, not placeholder text:
- "Track the metrics that matter" → specific to analytics
- Pricing is real: $0 / $49 / $149 — concrete numbers communicate seriousness
- Testimonial attribution includes name, role, and company (not "— Sarah M., CEO")
- Feature descriptions explain value, not features: "See where users drop off before they leave" not "Funnel visualization"
