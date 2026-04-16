# Gradient Policy

**Default rule: avoid gradients.**

This is not a stylistic preference. It is a quality filter. Gradients are the single most common AI-generation crutch — they substitute decoration for hierarchy and create the visual vocabulary of generic AI output.

---

## The Acceptance Test

A gradient is acceptable only when all three conditions are true:

1. **Brand alignment** — It matches the established visual language of the product or brand
2. **Hierarchy improvement** — It improves depth or hierarchy in a way that a neutral surface cannot
3. **Restraint** — It is subtle, controlled, and the page would genuinely be weaker without it

If any condition fails, remove the gradient. Find a different solution.

---

## Forbidden Gradient Patterns

Never use these, regardless of context:

- **Large blurred blob backgrounds** — the signature of AI-generated startup aesthetics
- **Purple-to-pink-to-blue startup gradients** — the most overused combination in AI UI
- **Gradient text as a default heading treatment** — gradient headings require explicit brand justification
- **Gradient borders on every card** — animated or static
- **Multiple competing gradients in one viewport** — if you have more than one gradient visible at once, one of them is wrong
- **Gradients used to make a design feel "premium"** — premium comes from hierarchy and restraint, not gradients
- **Conic gradient gimmicks** — decorative only, never hierarchy-serving
- **Spotlight gradients as a crutch** — a radial glow behind every section heading
- **Animated gradient borders on standard cards and buttons** — these read as demo components, not product UI
- **Glowing search bars, glow cards, or pricing cards** — these are component showcase aesthetics, not product aesthetics
- **Mesh gradients** — nearly impossible to use with restraint; avoid entirely

---

## What to Use Instead

For nearly every context where a gradient is tempting, one of these works better:

| Temptation | Better alternative |
|---|---|
| Gradient background for "atmosphere" | Layered neutrals, subtle surface tones, shadow depth |
| Gradient to separate sections | Section background tones, border rules, density contrast |
| Gradient card border to emphasize | Higher border contrast, slightly elevated surface, tighter padding |
| Gradient text to make a heading feel premium | Type scale, weight, tight tracking, neutral-to-accent color shift |
| Gradient overlay to create depth | Shadow, opacity layering, z-depth with blur |
| Gradient button hover | Scale + shadow shift, border color change, background tone shift |
| Gradient background for "hero atmosphere" | Strong typography, layered surfaces, depth grid, high-contrast anchor |

---

## When Gradients Are Justified (Rare)

These are the situations where a gradient may be the correct choice:

**Dark mode depth illusion** — A very subtle gradient on a near-black surface (e.g., `#0A0A0A` to `#111111` top-to-bottom) can create the impression of physical depth without reading as a "gradient." This is acceptable.

**Brand-explicit color** — If the product brand has an established gradient that is part of its identity (not just trendy), reproducing it in the correct context is correct.

**Data visualization** — Gradients are appropriate in charts, heatmaps, and data visualization where they encode quantitative meaning.

**Photography overlay** — A gradient overlay to improve text legibility over a photographic background is technically sound (though a dark scrim is usually better).

**Subtle button state** — A minimal tonal gradient within a button surface (top slightly lighter than bottom) to create a pressed/physical effect. Must be very subtle.

In all these cases: single gradient, single intent, maximum subtlety.

---

## The Gradient Removal Test

When evaluating whether a gradient should stay or go, ask:

1. If I replace this gradient with a flat neutral surface, does the design fail? If no: remove the gradient.
2. Is this gradient doing design work (depth, separation, hierarchy) or decoration work? If decoration: remove it.
3. Would a senior designer at a product company like Linear, Vercel, or Stripe use this gradient here? If uncertain: remove it.

The default answer to "should I add a gradient" is no. The burden of proof is on the gradient.
