# Blueprint: Editorial Brutalism

## Overview

**Mood:** Confident, raw, graphic, typography-led, deliberately structured

**Best for:**
- Creative agencies and studios
- Fashion and luxury brands with edge
- Cultural institutions, galleries, museums
- Media brands and independent publications
- Disruptive products that want to signal non-conformity
- Portfolios with a strong design point of view

**Not for:**
- Products where trust requires convention (finance, healthcare, enterprise)
- Products serving non-technical, non-design-literate audiences who need gentle onboarding
- Products where the goal is "calm and professional"
- Any context where users need familiar UI conventions to navigate efficiently

---

## Visual Traits

Structure is visible. Grids are used as expressive tools, not hidden scaffolding. Borders divide space. Elements are placed with deliberate asymmetry — not random, but deliberately off the center.

Typography is the primary medium. Headlines are often oversized — spanning the full width, breaking lines for rhythm, using weight contrast aggressively. The type itself creates the layout rather than sitting inside it.

Color is often radical or absent. Either near-monochrome with one aggressive accent, or a deliberate palette choice with cultural specificity (natural black + a single vivid ink, or full raw white + exposed typographic contrast).

Interaction is considered. Hover reveals are graphic — text that appears over an image, a background color that flips the card, a border that animates outward. Not subtle glows.

Space is used with intention — not "generous padding for luxury feel" but tight sections for density, slammed-together elements for graphic effect, then sudden open emptiness for contrast.

---

## Suggested Palette

**Classic monochrome variant:**

**Background:** `#F5F2ED` (off-white, paper-like) or `#0A0A0A` (near-black press)
**Surface:** `#EDEAE4` (light) or `#111111` (dark)
**Border:** `#0A0A0A` (light mode) or `#F5F2ED` (dark mode) — full contrast borders
**Primary text:** `#0A0A0A` or `#F5F2ED`
**Secondary text:** `#3A3A3A` (light) or `#AAAAAA` (dark)
**Accent:** One vivid ink — choose based on brand:
- `#E63329` — press red
- `#0044FF` — electric cobalt
- `#FF6B00` — lithograph orange
- `#1A1AFF` — offset blue

**Palette logic:** Brutalism earns its authority from contrast — not tonal sophistication, but graphic impact. Full-weight borders, full-opacity type, and a single accent that hits hard when it appears. Resist the temptation to soften with grays and mid-tones — that produces "pseudo-brutalism" that lacks conviction.

---

## Typography Direction

Typography IS this blueprint. Everything else is secondary.

**Scale:** Extreme. Hero type at 80–160px. Section labels at 11px. The jump between the two is the design.

**Weight:** Heavy for headlines — `font-black` (900) or `font-extrabold` (800). Not semibold. The visual mass of thick type against white or dark space creates the graphic impact.

**Case:** Uppercase for structural labels and major headlines. Mixed case for running text. Never lowercase as an aesthetic affectation.

**Tracking:** Headlines at -0.03em to -0.05em (very tight). Uppercase labels at 0.1em+ (wide). The contrast between the two is intentional.

**Line breaks:** Treat headlines as designed typographic objects. Where lines break matters. Break for rhythm and emphasis, not just container width.

**Typefaces:**
- Pure brutalism: Gothic, Helvetica Neue, or Neue Haas Unica (no serif, no personality — the content is the personality)
- Editorial brutalism: A strong display serif (Canela, Freight Display, Playfair Display) paired with a stark sans
- Contemporary: GT America Compressed, Aktiv Grotesk Extended for maximum graphic weight

**DO NOT use:** Rounded sans, friendly geometric sans, light weights as a primary type choice, or any typeface that signals "approachable startup."

---

## Spacing Logic

Deliberate contrast between tight and spacious:

- Some sections will be tightly packed, elements nearly touching
- Others will have vast empty space, one element positioned off-center
- Both extremes are intentional and in service of rhythm

**Rules:**
- No generic section padding — decide for each section based on the compositional need
- Grid lines can be visible or just implied by alignment discipline
- Full-bleed sections should actually be full bleed — no max-width container padding on the background

A page in this blueprint should feel like a designed layout, not a stack of padded sections.

---

## Motion Tone

**Graphic and considered.** Motion should feel like it has a point of view, not just polish.

- Hover reveals: `overflow-hidden` with text or image sliding in from a direction (`y: 100% → 0` or `x: -100% → 0`)
- Section reveals: horizontal wipe or clip-path animation rather than fade+translate
- Background inversions: hover flips background-text from white-on-black to black-on-white
- Marquee/ticker elements: continuous horizontal scroll for agency name, services list, or manifesto phrases
- Page transitions: hard cut or fast horizontal slide — not fade (too gentle for this aesthetic)

Spring physics are appropriate for snappy interactive elements. Eases should be aggressive: `[0.76, 0, 0.24, 1]` — fast in, sharp stop.

---

## Surface Treatment

**Light variant:** Off-white paper-like background. Full-weight black borders. No shadows. No gradients. The surface is flat — depth is created by type scale and composition, not material effects.

**Dark variant:** Near-black background. Off-white or paper-colored type. Full-weight borders where used. The night press aesthetic.

**Border usage:** Borders are graphic elements, not separators. A thick 2–3px border bisecting a layout area is a design choice. A thin hairline border as subtle panel separation is wrong for this blueprint.

**No shadows.** Shadows are antithetical to this aesthetic. They suggest softness and material depth that brutalism rejects. Depth is created through scale, contrast, and overlap.

**Color blocks:** Full-opacity background color on sections — not panels with soft borders, but solid color regions. A section that is pure accent-red with white type is a valid design move.

---

## Component Vocabulary

- `<MarqueeHeader />` — horizontally scrolling text belt (agency name, services, manifesto)
- `<HoverRevealMedia />` — image that appears/reveals on hover over a text element
- `<SplitManifesto />` — large-type statement split across two columns in tension
- `<BrutalAccordion />` — accordion with full-weight borders and flip animation
- `<CounterHeadline />` — animated number counter tied to scroll position
- `<GridReveal />` — image grid where items appear with staggered clip-path wipes
- `<InvertCard />` — card that flips background-foreground colors on hover
- `<HorizontalScroll />` — feature reel with horizontal momentum scroll
- `<FullBleedSection />` — section with full viewport-width colored background
- `<TypewriterManifesto />` — single-use typewriter effect for a brand statement

---

## Anti-Patterns for This Blueprint

**Gradients and glow.** Brutalism is flat, graphic, physical. A gradient or glow effect immediately signals the wrong aesthetic vocabulary. Reject both entirely in this blueprint.

**Rounded corners.** `rounded-xl` on every card is the opposite of this aesthetic. Borders are sharp (0px radius) or have very slight rounding (2px maximum).

**Friendly micro-animations.** Bouncy spring animations, floating elements, subtle pulsing — all wrong here. Motion should be graphic and deliberate, not friendly and organic.

**Pseudo-brutalism.** Attempting this blueprint but softening every choice produces a weak imitation. If the type is not actually oversized, if the borders are not actually full-weight, if the accent is not actually bold — it is not brutalism, it is just a darker version of generic design.

**Too many sections.** This blueprint succeeds with fewer, stronger sections. A manifesto section, a work showcase, a services list, a contact prompt — four strong sections executed with conviction are better than eight mediocre ones.

**Decorative type effects.** Gradient text, outlined text-stroke used as decoration, animated type-distortion effects — these are digital gimmicks. This aesthetic's power comes from typography's fundamental qualities (scale, weight, placement), not effects.

---

## Example Products

- **Awwwards-winning agency sites** — strong type, visible grid, radical layout, single accent
- **Are.na** — minimal, structural, information-dense without decoration
- **Refactoring UI** — typographic authority, restrained but confident
