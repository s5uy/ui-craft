# Color Philosophy

Use color with intent. The less color you use, the more each instance of it means.

---

## The Core Principle

Color is not a decoration tool. It is a communication tool.

Every color decision should answer: what is this color communicating? Is it:
- establishing the product's identity?
- signaling interactivity?
- encoding status (success, warning, error)?
- creating depth through tonal variation?

If the answer is "it looks nice," remove the color decision and replace it with something intentional.

---

## The Neutral-First Approach

Start from neutral. Build outward only as far as necessary.

A strong interface can often be built from:
- one background tone
- two or three surface tones
- one text hierarchy (four weight/opacity levels)
- one accent color used sparingly
- semantic state colors (green, amber, red) only where needed

This is usually sufficient. It is often better than adding more.

The neutral base does the structural work. The accent color does the signaling work. Typography does the hierarchy work. None of these jobs belongs to decorative color.

---

## Accent Color Rules

**Use one accent color.** In most interfaces, one accent is not only sufficient but stronger than two or three.

**Apply the accent sparingly.** The accent should appear on:
- primary CTAs
- active navigation state
- interactive elements that need emphasis
- key data points in visualizations
- the product's most important action

**Do not apply the accent to:**
- section headings (unless specifically branded)
- background panels or surfaces
- hover states on every element
- borders as a default treatment
- decorative dividers or separators

**The accent earns its power from scarcity.** If it appears everywhere, it no longer signals anything.

---

## Semantic Color

Semantic colors (success, warning, error, info) serve a specific communication function. They are not accent colors.

- Use green for success states, positive metrics, completed actions
- Use amber/orange for warnings, degraded states, in-progress
- Use red for errors, destructive actions, negative metrics
- Use blue for informational, selected states (only in neutral-base palettes)

Do not use semantic colors for decoration. Do not use "success green" as a brand accent in a non-finance/health context. Do not use red for emphasis that is not error-related.

---

## What Color Cannot Fix

Color is often reached for to solve problems that it cannot actually solve:

- **Hierarchy** — if the hierarchy is unclear, adding an accent color to the heading does not fix it. Weight, size, and spacing fix hierarchy.
- **Premium feel** — color does not create premium. Restraint, surface quality, and typography create premium.
- **Engagement** — brighter colors do not create engagement. Meaningful content and clear CTAs do.
- **Depth** — gradient fog does not create depth. Layered surfaces, shadows, and tonal variation do.

When color is used to compensate for a design problem, it typically makes the problem less visible while making it harder to fix.

---

## Color and Typography Interdependence

The success of a palette depends heavily on typography choices.

- A neutral-warm palette with strong type contrast reads as editorial and sophisticated
- The same palette with weak type hierarchy reads as bland and unfinished
- A monochrome palette only works if the typography is doing significant hierarchy work
- A high-contrast dark palette needs careful type sizing — dense monospace + bright text can become fatiguing

When choosing a palette, simultaneously consider: does the type system support this palette's constraints?

---

## When Less Color Is the Right Answer

Some products are better served by near-zero decorative color:

- Developer tools — monochrome with syntax highlight as the only color
- Legal/compliance products — color signals risk, so restrict it to semantic only
- Dense data interfaces — color reserved for data encoding, not decoration
- High-trust financial products — color restricted to positive/negative states

In these contexts, restraint is not a limitation — it is the design. The absence of decorative color signals seriousness and professionalism.

---

## What to Reject

- Rainbow palettes — too many competing signals
- Loud purple-blue startup palettes — overused, reads as AI-generated
- Saturated color on every interactive element — creates visual noise
- Color systems where every component has its own accent — no coherence
- "Gradient as color strategy" — gradients are not a palette
- Bright color to compensate for weak hierarchy — fix the hierarchy
- Vivid glow colors from component demos imported into product UI without recalibration
