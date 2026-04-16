# Quality Bar

Run this checklist before finalizing any UI output. If any answer is "no" or "uncertain," revise before responding.

---

## Pre-Output Checklist

**Identity check**
- [ ] Does this feel specific to this brand, product, or company — not generic?
- [ ] Could a developer or designer look at this and identify the product category without reading the copy?
- [ ] Is the design point of view clear — not just "clean and modern"?

**Hierarchy check**
- [ ] Can the user immediately identify what this is?
- [ ] Can the user immediately identify why it matters?
- [ ] Is it clear where to look first?
- [ ] Is it clear what to do next?

**Anti-slop check**
- [ ] Does this avoid the generic hero + feature grid + testimonials + pricing stack?
- [ ] Does this avoid centered icon cards repeated in three columns?
- [ ] Does this avoid default Tailwind blue as the primary accent?
- [ ] Does this avoid purple-blue gradient startup aesthetics?
- [ ] Does this avoid decorative blobs, mesh gradients, and spotlight clichés?

**Gradient check**
- [ ] Are gradients absent, or if present, is each justified by all three acceptance criteria?
- [ ] Is there any gradient present only to "look premium" — if so, remove it?

**Motion check**
- [ ] Do main sections have scroll-triggered reveals?
- [ ] Do repeated elements stagger?
- [ ] Do interactive elements have tactile hover states?
- [ ] Is there any animation that exists only for visual effect — if so, remove it?

**Typography check**
- [ ] Is there meaningful scale contrast between hierarchy levels?
- [ ] Is body text constrained to a readable line length?
- [ ] Are all-caps labels using appropriate letter spacing?
- [ ] Is there tonal hierarchy (primary / secondary / muted) through text color?

**Code check**
- [ ] Is the code complete — no truncation, no `// rest here` stubs?
- [ ] Are all imports included?
- [ ] Are TypeScript types correct?
- [ ] Is `"use client"` only added where actually required?
- [ ] Are component names descriptive and PascalCase?
- [ ] Are Tailwind classes organized coherently?

**Craft check**
- [ ] Would this feel credible next to Vercel, Linear, or Stripe's design system?
- [ ] Does it feel handcrafted rather than assembled from blocks?
- [ ] Did you preserve the good part of any referenced component without inheriting its generic styling?

---

## Ultimate Failure Modes

These outputs must never ship. If the result resembles any of these, restart.

### "AI startup landing page"
Purple-blue gradient fog in the hero. Glowing card borders. Icon grid in three columns. "Streamline your workflow" copy. CTA button with animated gradient border. This is the signature of AI-generated UI and must be eliminated.

### "Generic hero with decorative gradient fog"
A full-width hero with a large radial gradient behind the headline and a blurred blob in the background. The headline is centered. There is a primary and secondary button. Nothing about this is specific.

### "Random modern UI trends glued together"
Glass cards. Animated gradient borders. Spotlight hover effects. Neon accents. All in the same page. Each looks "premium" in isolation and cheap together. No unifying design logic.

### "Premium in screenshots but weak in structure"
The UI looks impressive in a small thumbnail — glowing effects, dramatic colors. Zoomed in or used as a real product, the hierarchy is unclear, the copy is filler, and the interaction states are missing.

### "Motion-heavy but taste-light"
Every element animates. Floating, pulsing, rotating, parallaxing. The page is visually exhausting. Nothing is still. Removing 80% of the animation would make it better.

### "Flashy but implausible"
Dashboards with made-up metrics. Forms that are clearly decorative. Charts that cannot be read. UI that exists to look impressive in a screenshot but fails the test of being used.

### "A clone of common design inspiration with no judgment"
The design is identifiable as a near-copy of a popular component library demo or a Dribbble screenshot. There is no adaptation, no product thinking, no specific decisions. It is assembled, not designed.

### "A component-showcase aesthetic mistaken for product UI"
The UI looks like a 21st.dev or shadcn showcase — impressive components, styled for demo context, but not integrated into a coherent product experience. The cards are hyper-styled. The spacing is theatrical. It does not feel like a real product.

---

## The Final Test

Look at the output and ask honestly: does this look like AI generated it, or does it look like a senior designer-engineer at a product company built it?

If you hesitate: revise.
