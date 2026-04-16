# Page Prompt: Homepage / Landing Page

---

## Pre-Generation Decisions (answer before generating)

1. **What does this product do?** (one sentence, specific)
2. **Who is the primary user?** (developer, business owner, consumer, enterprise buyer)
3. **What is the primary conversion action?** (signup, demo request, download, purchase)
4. **Blueprint:** Command Center / Spatial Immersive / Editorial Brutalism / Enterprise Neutral / Editorial Warm
5. **Palette family:** monochrome / neutral-warm / neutral-cool / deep-technical / paper-editorial / earth-organic / high-trust
6. **Accent strategy:** single accent / functional only / no accent
7. **Social proof type:** customer count, logo bar, testimonial quotes, case study reference
8. **Does the hero need a product visualization?** (screenshot, diagram, none)
9. **Section sequence** (what sections does this product specifically need?):

---

## Generation Scaffold

```
Generate a complete landing page for [product name].

**Product:** [one-sentence description of what it does]
**Primary user:** [who uses this]
**Primary CTA:** [the one action this page drives toward]

**Design system:**
- Blueprint: [chosen blueprint]
- Palette: [chosen palette family]
- Accent: [color and strategy]

**Required sections (in order):**
1. Navbar — [logo text, 3-4 nav links, primary CTA button]
2. Hero — [centered/left-aligned], headline: "[draft headline]", sub: "[draft sub]"
3. [Section 3 — specific to this product]
4. [Section 4]
5. [Section 5]
6. Final CTA — "[action label]", social proof: "[trust note]"
7. Footer — [minimal/standard/full]

**Content rules:**
- All copy must be specific to this product — no lorem ipsum, no generic "Welcome to our platform"
- Headlines describe outcomes, not features
- Feature descriptions answer "what does the user get" not "what does the feature do"
- Social proof numbers must be realistic (not `10M+` for a product that launched recently)
- No gradient backgrounds, no gradient text, no glow effects

**Code requirements:**
- Complete, runnable TypeScript/React
- All imports present
- All props typed explicitly
- Next.js: use `next/link` for internal links, `next/image` for images
- Responsive: mobile-first, `md:` and `lg:` breakpoints
- No `"use client"` unless there are interactive hooks

**Output the complete page component. Do not truncate.**
```

---

## Quality Criteria

Before delivering, verify:

- [ ] Hero headline communicates core value in one sentence
- [ ] Primary CTA is visually dominant — only one element at this weight per view
- [ ] No gradient backgrounds or gradient text
- [ ] No glow effects
- [ ] Feature descriptions describe outcomes, not feature names
- [ ] All TypeScript types explicit
- [ ] All imports present
- [ ] Responsive behavior at `sm:`, `md:`, `lg:`
- [ ] Page has a single clear conversion goal

---

## Section Sequence Guidance

**SaaS / B2B product:**
Hero → Features (alternating, primary + secondary) → Social proof → Pricing → FAQ → CTA → Footer

**Developer tool:**
Hero (minimal, code-centric) → What it does (concrete examples) → Integration / how it works → Who uses it → CTA → Footer

**Consumer app:**
Hero → Key benefit #1 → Key benefit #2 → Social proof → Download / signup → Footer

**Content / editorial:**
Hero (headline-forward) → Sample content / preview → About / voice → Subscribe → Footer
