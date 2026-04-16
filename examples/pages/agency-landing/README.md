# Agency Landing Page — Design Decisions

Blueprint: Editorial Brutalism
Palette: monochrome (pure grayscale, no color accent)
Accent: none — typographic contrast is the entire design system
Context: Creative agency — "Fieldwork" (brand and product design studio)

---

## What This Demonstrates

A landing page where typography does every job that color would do elsewhere. Editorial Brutalism in its purest form: black on white, oversized headline type, deliberate misalignment used as a compositional tool, and zero decorative elements. The work speaks; the wrapper is invisible.

---

## Blueprint Application: Editorial Brutalism

Editorial Brutalism breaks the "everything centered, everything consistent" rule intentionally. The page reads as designed by a person, not assembled by a system.

Key decisions:
- Headline type: `text-[clamp(56px,10vw,128px)]` — viewport-scaled, not responsive breakpoint steps
- Asymmetric grid: the about section uses a `2:1` left-heavy split, not `1:1`. The imbalance reads as intentional voice.
- Ruled lines: horizontal `<hr>` elements are used as section dividers instead of whitespace alone — a magazine convention that reads as confidence
- Nav: left-aligned wordmark, right-aligned links, no visual chrome. No background, no border.
- No CTA button in the hero — the studio's work is the CTA. The contact link appears exactly once, at the bottom.

---

## Typography Decisions

**Hero headline:** `text-[clamp(56px,10vw,128px)] font-black leading-none tracking-tighter`

Font-black (900) at display size is a statement. Leading-none prevents the oversized type from creating excessive vertical space. Tracking-tighter is essential — display type looks amateur without it.

**Agency descriptor:** `text-sm font-medium uppercase tracking-[0.2em] text-black/50`

Wide tracking on small uppercase creates contrast against the headline without competing with it. This is the "eyebrow" and it can only appear once in the page.

**Section heads:** `text-2xl font-semibold` — restrained compared to the hero, but still authoritative. Do not use font-light for section heads in Editorial Brutalism; it contradicts the aesthetic.

**Body:** `text-base leading-relaxed text-black/70` — opacity reduction on body text creates depth on a flat monochrome surface.

**Case study titles:** `text-sm font-medium` — the work does the visual work. Titles are navigation, not headlines.

---

## Grid Decisions

The work grid uses a `grid-cols-12` layout with intentional asymmetry:
- Project 1: spans cols 1-8 (large)
- Project 2: spans cols 9-12 (small)
- Project 3: spans cols 1-5 (medium-left)
- Project 4: spans cols 6-12 (medium-right, wider)

This is not arbitrary — the large/small contrast creates visual rhythm that a uniform grid cannot. The images are all black-and-white to enforce the monochrome system.

---

## Motion Decisions

Editorial Brutalism uses motion sparingly and bluntly. No spring physics. No easing curves that feel "premium."

- Nav links: `opacity: 0.5 → 1` on hover, instant (0ms transition)
- Work images: `grayscale(100%) → grayscale(0%) scale(1) → scale(1.02)` on hover — the reveal of color is the interaction
- Hero text: appears on load, no animation — the page should read as immediate and confident

The hover color reveal on work images is the one moment where the monochrome system is intentionally broken. It communicates: "the work has color; we chose to show you structure first."

---

## What Was Deliberately Excluded

- **Hero gradient or abstract background** — pure white is the correct backdrop for typographic systems
- **"We are a creative agency" copy** — eliminated; the page's visual voice makes that claim without stating it
- **Social proof section (client logos)** — logo rows are filler. Named case studies are more credible.
- **Animated counters or statistics** — numbers feel marketing-facing; this audience (client prospects) responds to work, not metrics
- **Team photos in a grid** — team sections are a distraction on a portfolio-first landing page; moved to an "About" link
- **Dark section alternation** — alternating dark/light sections is a SaaS pattern that reads as AI-generated in an agency context

---

## Content Quality

Agency copy rejects superlatives. Specific language builds more credibility:
- "Brand and product design" not "world-class digital experiences"
- Case study names are company names and project types, not taglines
- The single testimonial quote is a professional sentence, not a marketing blurb
- Contact CTA is "Start a project" not "Let's make magic happen"
