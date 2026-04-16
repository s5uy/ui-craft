# Refinement Prompt: De-Slop

Remove AI-generated UI clichés from existing output. Use this when you have generated UI that looks generic, AI-made, or template-like, and want to elevate it to production quality.

---

## When to Use

- The output has gradient backgrounds, gradient text, or glow effects
- The hero section uses the purple/blue gradient + centered layout template
- Feature cards have colored icon blobs
- The output looks like it could be from any of 1000 similar products
- A designer would describe it as "obviously AI-generated"

---

## Pre-Refinement Audit

Before refining, identify every specific problem. Run through the ai-slop-gallery checklist:

- [ ] Gradient backgrounds (hero, cards, sections)
- [ ] Gradient text (`bg-clip-text text-transparent`)
- [ ] Glow effects (`shadow-[0_0_*]`, `blur-3xl` decorative divs)
- [ ] Colored icon blobs on feature cards
- [ ] Testimonial carousel (vs. static grid)
- [ ] Floating badge constellation around screenshots
- [ ] Typewriter animation
- [ ] Per-element page load stagger (more than 3 staggered elements)
- [ ] Oversized display stats with gradient numbers
- [ ] Generic "Trusted by" logo bar with low-value logos

---

## Refinement Prompt

```
Refine this UI component/page to remove all AI-generated clichés and replace them with production-quality design.

**Existing code:**
[paste the existing code here]

**Specific problems to fix:**
[list the specific slop patterns identified above]

**Target context:**
- Blueprint: [Command Center / Spatial Immersive / Editorial Brutalism / Enterprise Neutral / Editorial Warm]
- Palette: [palette family name or specific colors]
- Product type: [what this product actually is]

**Refinement rules:**
1. Remove every gradient that doesn't pass the 3-condition test (encodes data, no flat alternative, WCAG AA throughout)
2. Remove every glow effect (box-shadow with blur + color, decorative blur divs)
3. Remove colored icon blobs — icons should be bare on neutral backgrounds or removed entirely
4. Replace gradient text with `text-foreground` or foreground/muted-foreground tonal contrast
5. Replace animated background elements with solid backgrounds
6. Replace equal-weight feature grid with hierarchically differentiated layout if there are primary features
7. Do not add any new decorative elements — replace with structure
8. Preserve all functional logic and interaction patterns — only change surface styling

**Output the complete refined code. Do not truncate.**
```

---

## Expected Transformations

| Before (slop) | After (refined) |
|---|---|
| `bg-gradient-to-br from-purple-900 to-slate-900` | `bg-zinc-950` (solid) |
| `bg-clip-text text-transparent bg-gradient-to-r` | `text-foreground` |
| `shadow-[0_0_30px_rgba(99,102,241,0.5)]` | removed entirely |
| Colored icon blobs | `<Icon className="h-5 w-5 text-muted-foreground" />` |
| `<div className="blur-3xl ...bg-purple-500/30">` | removed entirely |
| Equal 3-col feature grid | Primary feature at 2-col, supporting at 1-col |
| Per-element stagger (12 delays) | Section-level single entrance |

---

## Quality Check After Refinement

- [ ] No `bg-gradient-to-*` classes remain (unless justified)
- [ ] No `bg-clip-text text-transparent` remains
- [ ] No `shadow-[0_0_*]` classes remain
- [ ] No `blur-3xl` or `blur-2xl` on decorative divs remain
- [ ] Visual hierarchy is established through scale/weight/contrast, not color effects
- [ ] The output could plausibly be a production component from a well-resourced team
