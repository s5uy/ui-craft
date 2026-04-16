# Page Prompt: [Page Name]

---

## Pre-Generation Decisions (answer before generating)

1. **What does this product do?** (one sentence, specific)
2. **Who is the primary user?** (developer, business owner, consumer, enterprise buyer)
3. **Primary goal of this page:** (conversion, information, task completion, onboarding)
4. **Blueprint:** Command Center / Spatial Immersive / Editorial Brutalism / Enterprise Neutral / Editorial Warm
5. **Palette family:** monochrome / neutral-warm / neutral-cool / deep-technical / paper-editorial / earth-organic / high-trust
6. **Accent strategy:** single accent / functional only / no accent
7. **Required sections:** (list the sections this specific page needs — do not default to generic)
8. **Interactive regions:** (which sections need state, hooks, or client-side behavior?)

---

## Generation Scaffold

```
Generate a complete [page name] for [product name].

**Product:** [one-sentence description]
**Primary user:** [who uses this]
**Page goal:** [the one thing this page accomplishes]

**Design system:**
- Blueprint: [chosen blueprint]
- Palette: [chosen palette family]
- Accent: [color and strategy]

**Required sections (in order):**
1. [Section 1 — specific to this page and product]
2. [Section 2]
3. [Section 3]
[...]

**Content rules:**
- All copy specific to this product — no lorem ipsum
- Labels, headings, and descriptions reflect real product language
- No gradient backgrounds, no gradient text, no glow effects
- Data, numbers, and examples must be plausible for this product context

**Code requirements:**
- Complete, runnable TypeScript/React
- All imports present
- All props typed explicitly
- Next.js: `next/link` for navigation, `next/image` for images
- Responsive: mobile-first, `md:` and `lg:` breakpoints
- `"use client"` only where hooks or browser APIs are required

**Output the complete page component. Do not truncate.**
```

---

## Quality Criteria

Before delivering, verify:

- [ ] Page has a single clear goal — every section serves it
- [ ] No gradient backgrounds or gradient text
- [ ] No glow or box-shadow decorations
- [ ] Copy is product-specific, not placeholder
- [ ] All TypeScript types explicit
- [ ] All imports present
- [ ] Responsive behavior at `sm:`, `md:`, `lg:`
- [ ] Interactive state (hover, focus, active, disabled) on every interactive element

---

## Anti-Patterns to Avoid

- Generic section order copied from every SaaS page ("Features, Pricing, FAQ, CTA")
- Hero copy that could describe any product ("The platform for modern teams")
- Decorative icon grids with gradient icon containers
- Sections that exist because they "usually go here", not because this product needs them
