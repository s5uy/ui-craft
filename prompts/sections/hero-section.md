# Section Prompt: Hero Section

---

## Pre-Generation Decisions

1. **Layout variant:** centered / left-aligned (split with product visual) / editorial (headline-dominant)
2. **Headline:** [draft or "generate based on product description below"]
3. **Primary CTA:** [label + href]
4. **Secondary CTA:** [label + href or none]
5. **Social proof:** [user count / logo strip / testimonial quote / none]
6. **Product visual:** [screenshot / diagram / none]
7. **Animation:** none / subtle block fade-in (400ms, no stagger)

---

## Generation Scaffold

```
Generate a hero section for [product name].

**Product:** [one-sentence description]
**User:** [who uses this]

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]

**Layout:** [centered / split / editorial]

**Content:**
- Eyebrow (optional): "[badge text]" (omit if nothing meaningful to say)
- Headline: "[headline — outcome-focused, not feature-focused]"
- Subheadline: "[clarifies who it's for and what they specifically get]"
- Primary CTA: "[label]" → [href]
- Secondary CTA: "[label]" → [href] (or none)
- Social proof: "[e.g., 'Trusted by 2,400+ engineering teams']" (or none)

**Product visual (if split layout):**
- Description: [what the screenshot shows]
- Placeholder: use a `div` with border and aspect-video ratio — real image goes here

**Anti-patterns to avoid:**
- No gradient background (hero section or anywhere)
- No gradient text
- No decorative blobs or ambient glow divs
- No typewriter animation
- No per-word animation stagger
- No floating badge constellation
- Headline must be readable immediately — not dependent on animation completion

**Output the complete hero section component.**
```

---

## Quality Criteria

- [ ] Headline communicates core value in under 10 words
- [ ] Single dominant CTA (one filled, one text link maximum)
- [ ] No gradient background, gradient text, or glow effects
- [ ] Readable without JavaScript
- [ ] Social proof is specific (not "Join thousands of users")
- [ ] If product visual is present: flat, natural perspective (not tilted/floating)
