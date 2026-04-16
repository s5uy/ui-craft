# Generic Layouts

Generic layouts are page structures so common and predictable that they communicate nothing about the product's identity. The user who has seen 100 SaaS landing pages can predict exactly what section comes next. Predictability is not the same as clarity — it is the opposite of distinction.

---

## The AI Default Landing Page Structure

This is the layout AI generates when asked for "a landing page" without specific direction:

```
1. Navbar: Logo left, 3-4 links center, CTA button right
2. Hero: Centered headline, subtext, two buttons, gradient background
3. Logos: "Trusted by" + 6 company logos in a row
4. Features: 3-column grid, each with colored icon, bold title, 2-line description
5. How it works: 3 steps with numbered circles
6. Testimonials: 3 quote cards in a row (or carousel)
7. Pricing: 3 tiers, middle highlighted
8. Final CTA: Dark section, headline + button
9. Footer: 4 columns of links
```

Every element of this structure exists in training data. The AI generates it because it has seen it thousands of times and it has never been told why it's wrong.

The problem is not the individual sections — it's that the selection and sequencing is automatic, not deliberate. For many products, several of these sections are wrong or in the wrong order.

**The fix:** Ask the 9 pre-generation questions from `decisions/design-decision-model.md` before generating a single section. Determine what this specific product needs, not what every SaaS landing page has.

---

## The Generic Admin Dashboard

**Appearance:** Sidebar navigation (left) + top navbar (top) + metric card row + chart area + data table. Blue accent. Gray surface.

**Why it's generic:** This is the Ant Design / Material Dashboard template structure. It is correct for many admin applications — but AI generates it regardless of context, including contexts where it's wrong.

**When it's wrong:**
- A content-heavy product where the primary view is an article editor, not a data table
- A monitoring product where the primary view is a timeline, not metric cards
- A collaborative product where the primary view is a shared canvas, not a table

**The fix:** Before generating a dashboard, establish: what is the primary task the user comes here to do? Design the layout around that task, not around the generic dashboard template.

---

## The 3-Column Feature Grid (Icon Blob Variant)

**Appearance:** Features section with `grid-cols-3` cards. Each card has a colored rounded-square icon (`bg-blue-100 rounded-xl`), bold feature name, and 2-line description.

**Why it's generic:** This is the default feature section in virtually every Tailwind UI kit, TailwindUI, and Flowbite template.

**Problems:**
1. All features equal weight = no feature is primary
2. Colored icon blobs compete with feature content for attention
3. 2-line descriptions are invariably truncated copy that doesn't actually explain the benefit
4. The layout communicates "we have many features" not "here is our key differentiator"

**The fix:** Vary the layout based on the product's actual feature hierarchy. If there is a primary differentiator, give it more space (alternating 2-col with copy and visual). Supporting features can be a text list. Only use a flat icon grid when all features are genuinely equal-weight.

---

## The Symmetric "How It Works" Section

**Appearance:** 3 (or 4) numbered steps in a horizontal row with connecting lines or arrows. Each step: circle with number, step title, 2-sentence description.

**Why it's generic:** "How it works" sections with numbered steps appear on nearly every explainer-style landing page.

**Problems:**
1. It implies a complexity that may not exist — if onboarding is truly simple, the explanation itself shouldn't look complex
2. The visual symmetry (3 identical boxes) communicates equal weight — but step 2 is often the hard part
3. The connecting arrows between boxes are decorative elements with no interaction or meaning

**The fix:** If a process needs explanation, use a visual walkthrough or a stepped form rather than a decorative horizontal list. If the process has variable complexity across steps, let the visual weight reflect that.

---

## The "Trusted By" Logo Bar

**Appearance:** Row of 6–8 company logos, grayscaled to `opacity-50` or similar, with a label "Trusted by teams at:" or "Powered by:"

**Why it's generic:** Logo bars appear on nearly every B2B SaaS landing page. They've become expected, and therefore ignored.

**Problems:**
1. Gray logos are unrecognizable for less-famous brands
2. The framing "Trusted by" is generic to the point of meaninglessness
3. Without context (what the company does, how they use the product), the logos convey nothing

**The fix:** If social proof matters, use specific testimonials from recognizable companies — with a real quote and use case. A logo bar is only valuable when every logo in it is immediately recognizable to the target audience.

---

## The Footer Grid

**Appearance:** Full-width footer with 4–5 columns of links, a brand logo/description on the left, and copyright at the bottom.

**Why it's generic:** This footer structure appears in virtually every UI kit and template.

**When it's wrong:** Minimal products, early-stage products, content-focused products, and single-page tools do not need a 4-column link grid. The footer for a blog is different from the footer for an enterprise SaaS.

**The fix:** Match footer complexity to product complexity. A blog might need only "© 2024 Acme · Privacy · Terms." An enterprise product might need the full 4-column grid. Don't generate the complex version by default.

---

## The Hero with Floating Product Screenshot

**Appearance:** Left-aligned hero copy, right side: product screenshot inside a browser frame, tilted at 10–15 degrees, floating on the gradient background.

**Why it's generic:** This was a peak-SaaS design pattern (~2020–2023) that appeared across hundreds of products.

**Problems:**
1. The tilt is artificial — real products don't display at angles
2. The browser frame is decorative chrome that shows off the container, not the content
3. The floating effect (no ground plane, no natural context) makes it feel like a mockup

**The fix:** Product screenshot flat, in natural context. If showing the product in context (e.g., inside a browser or on a device), show it straight-on and clearly framed. Or: no screenshot — copy-only hero with a strong CTA, and a dedicated product section below.

---

## Detection Checklist

Before accepting any layout, verify it is not the generic version:

- [ ] Is the section sequence derived from the product's actual user journey, or from the AI default template?
- [ ] Does the feature grid have a differentiated primary feature, or is everything equal weight?
- [ ] Does the "How it works" section reflect actual process complexity?
- [ ] Is the product screenshot shown flat and in context, or at an artificial angle?
- [ ] Does the footer complexity match the product's actual navigation needs?
- [ ] Has the layout been deliberately chosen for this product's primary task and audience?
