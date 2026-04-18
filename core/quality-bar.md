# Quality Bar (Direction-Aware)

Run this checklist before finalizing any UI output. If any answer is "no" or "uncertain," revise before responding.

The checklist has three tiers:
1. **Universal floor** — applies to every direction
2. **Per-direction floor** — specific to TM, DE, VP, EL
3. **Ultimate failure modes** — must never ship

---

## Universal Floor (every direction)

### Identity
- [ ] Does this feel specific to this brand, product, or company — not generic?
- [ ] Could a reader identify the product category without reading the copy?
- [ ] Is the design point of view clear — not just "clean and modern"?
- [ ] Is the direction (TM / DE / VP / EL) explicitly stated in `[VISION]`?

### Hierarchy
- [ ] Can the user identify what this is in <3 seconds?
- [ ] Can the user identify why it matters?
- [ ] Is it clear where to look first?
- [ ] Is it clear what to do next (primary CTA unambiguous)?

### Code
- [ ] Complete — no truncation, no `// rest here` stubs
- [ ] Imports all present
- [ ] TypeScript types correct
- [ ] `"use client"` only where needed
- [ ] Descriptive PascalCase component names
- [ ] Tailwind classes coherent, not hash-ordered

### Tokens
- [ ] Every color is a CSS custom property — no hardcoded hex in component styles
- [ ] Every radius is a token (`--radius-sm`, `--radius-md`, etc.)
- [ ] Every major spacing value references the spacing scale
- [ ] Typography scale uses defined tokens, not arbitrary `text-[22px]`

### Copy
- [ ] Hero copy fails the "500-other-products" test (could this ONLY apply to this product?)
- [ ] No "streamline your workflow" / "supercharge" / "unlock potential" / "revolutionary"
- [ ] Specific numbers, names, places used where relevant
- [ ] Voice consistent across sections

### Motion
- [ ] `prefers-reduced-motion` handled on every animation
- [ ] `once: true` on scroll-triggered reveals (don't re-fire on scroll-up)
- [ ] No perpetual-motion loops except the single allowed one per direction
- [ ] 60fps maintained (transforms and opacity only)

### Accessibility
- [ ] WCAG AA contrast on body text (4.5:1)
- [ ] Focus rings visible and direction-appropriate
- [ ] Keyboard navigation works for interactive elements
- [ ] `aria-label` / `aria-hidden` correct on decorative elements
- [ ] Semantic HTML (real `<nav>`, `<main>`, `<section>`, heading hierarchy)

### Content density
- [ ] Body text constrained to readable line length (45-75ch)
- [ ] Section rhythm alternates dense / breathing
- [ ] Vertical padding varies by content importance (not uniform py-24)

---

## TM Floor (Technical-Minimal)

### Type
- [ ] Mono font on every label, metric, eyebrow, kbd, timestamp
- [ ] Display weight is 500 (medium) — not 700+
- [ ] Tracking is `-0.025em` on display
- [ ] 4-tier tonal hierarchy (primary / secondary / muted / faint)

### Color
- [ ] Background is `oklch(0.14-0.22 0 0)` range — not pure `#000`
- [ ] One chromatic accent only (cyan, green, violet, amber)
- [ ] Accent appears ONLY on: eyebrow dot, CTA, focus ring, status indicator, chart stroke

### Motion
- [ ] One easing curve used throughout (`ease-out-quart` or similar)
- [ ] Translate distances 8-16px on reveals
- [ ] Duration 400-700ms on reveals

### Layout
- [ ] Hero is NOT centered-head-subhead-two-CTAs default pattern
- [ ] Feature section is tablist OR indexed rows — NOT 3-col icon grid
- [ ] Nav has backdrop blur + scroll-triggered border
- [ ] Container max-width ~1240px
- [ ] Section padding asymmetric (e.g., pt-32 pb-24)

### Texture
- [ ] Noise overlay present (0.015 opacity)
- [ ] Shadows use negative spread
- [ ] At least one signature pattern: terminal, command-palette, or feature-tablist

### Forbidden in TM
- Bold weights on display
- Gradient text
- Gradient button fills
- Purple-blue SaaS fog
- 3-column centered icon feature grid
- Rounded-2xl+ on cards (TM radius max ~12px)

---

## DE Floor (Design-Engineer)

### Type
- [ ] Display weight is 500 (medium) — THE DE signature weight
- [ ] At least one moment of serif italic accent (optional but common)
- [ ] Labels are 11px uppercase mono with `0.1em+` tracking
- [ ] Body is 14-15px (slightly smaller than TM)

### Color
- [ ] Monochromatic — either paper (oklch 0.98) or graphite (oklch 0.11)
- [ ] Zero chromatic accents OR one heavily-restrained single-use accent
- [ ] Hairline borders `oklch(0.92 0 0 / 0.6)` or darker equivalent

### Motion
- [ ] Spring physics on tactile interactions (`stiffness: 260, damping: 24`)
- [ ] At least ONE of: letter-stagger hero, magnetic button, cursor spotlight, number scramble, view-transition
- [ ] Micro-interactions on every interactive element (arrow nudge, hover color shift, spring scale)

### Layout
- [ ] Asymmetric or committed-left — never centered-standard
- [ ] Max-width ~1120px (narrower than TM)
- [ ] Indexed numbered rows instead of card grids
- [ ] Hairline dividers between sections (not background-color shifts)

### Texture
- [ ] Hairline borders carry structure, not shadows
- [ ] Noise overlay present (0.012-0.022)
- [ ] Zero gradients (even atmospheric)

### Forbidden in DE
- Chromatic gradients (all kinds)
- Centered hero
- Drop-shadow-heavy cards
- 3-column icon feature grids
- Bold weights on display (700+)
- TM-style accent dot on every eyebrow (DE eyebrows are subtler)

---

## VP Floor (Vibrant-Playful)

### Type
- [ ] Bold weights (700-800) on display
- [ ] At least ONE italic serif accent word on hero (Instrument Serif ideal)
- [ ] Body size 16-18px (friendlier than TM)
- [ ] Display scale aggressive (clamp to 128px on wide viewports)

### Color
- [ ] Multi-color palette (3-4 hues used across sections)
- [ ] Each feature section owns a bg color, OR there's a gradient card stack
- [ ] Soft warm shadows (color-tinted, not pure black)

### Motion
- [ ] Spring physics (`stiffness: 180, damping: 12`) dominant
- [ ] Hover scale 1.04-1.06 (not TM's 1.02)
- [ ] Stagger visible (100-150ms gaps)
- [ ] At most ONE perpetual float loop (hero product visual only)

### Layout
- [ ] Hero has product visual taking ≥50% of viewport height
- [ ] Cards are `rounded-3xl` (24px) or larger
- [ ] Chunky padding (`p-8` to `p-10` on cards)
- [ ] At least 2 color-blocked or gradient sections

### Texture
- [ ] Shadows are soft and diffuse (32-64px blur)
- [ ] Halation on primary CTA
- [ ] Crafted gradients (2-tone, palette-coherent)

### Forbidden in VP
- Default purple-blue SaaS gradient (NOT VP — that's AI slop)
- TM-style restraint (under-dressed)
- Monochromatic (no color)
- Hard-edged shadows
- Tight `rounded-md` / `rounded-lg` corners
- More than 4 unique gradient combos on one page (chaos)

---

## EL Floor (Editorial-Luxury)

### Type
- [ ] Hero is at 20vw fluid (`clamp(4rem, 20vw, 18rem)`) — the EL signature
- [ ] Display weight is 600 (semibold) or 500 (medium) — Apple range
- [ ] Tracking `-0.04em` to `-0.055em` on display
- [ ] Line-height 0.85-0.9 on giant display
- [ ] Body in low-key supporting face, 14-16px, 1.7+ line-height

### Color
- [ ] Near-binary palette (near-white OR near-black + one accent max)
- [ ] Product photography / imagery carries visual weight, not UI chrome
- [ ] Zero CSS gradient decoration (atmospheric or text)

### Motion
- [ ] Slow and cinematic (800-1400ms durations)
- [ ] `ease-out-expo` (`[0.22, 1, 0.36, 1]`) dominant
- [ ] At least ONE of: product-pin-scroll, sticky-section-lock, horizontal-scroll-gallery
- [ ] Zero spring physics (EL is not bouncy)

### Layout
- [ ] Section padding 200-300px vertical
- [ ] Chapter sections used (not feature tiles)
- [ ] Full-bleed imagery present
- [ ] Whitespace dominates — at least 40% of any section is empty

### Texture
- [ ] Product imagery is the depth (not CSS effects)
- [ ] No feature-tile shadows
- [ ] Photographic halation on product shots
- [ ] Film grain on imagery allowed (5-8% opacity, mix-blend-overlay)

### Forbidden in EL
- Feature tile grids (any format)
- `text-6xl` as hero (too small for EL)
- CSS gradients outside of brand-native (no atmospheric, no text gradient)
- Spring physics / bouncy hover
- Fast reveals (sub-600ms)
- Stock photography

---

## Ultimate Failure Modes (never ship)

### "AI startup landing page"
Purple-blue gradient fog in the hero. Glowing card borders. Icon grid in three columns. "Streamline your workflow" copy. CTA with animated gradient border. This is AI-generated UI. Eliminate.

### "Generic hero with decorative fog"
Full-width hero with radial gradient behind headline. Blurred blob in background. Headline centered. Primary + secondary buttons. Nothing specific. Nothing authored.

### "Random modern UI trends glued together"
Glass cards. Animated gradient borders. Spotlight hover. Neon accents. Each looks "premium" in isolation; together they're incoherent. No unifying design logic.

### "Premium in screenshots but weak in structure"
Looks impressive in a small thumbnail. Zoomed in: hierarchy unclear, copy filler, interaction states missing.

### "Motion-heavy but taste-light"
Everything animates. Floating, pulsing, rotating, parallaxing. Visually exhausting. Removing 80% of the animation would improve it.

### "Flashy but implausible"
Dashboards with made-up metrics. Forms that are decorative. Charts that can't be read. UI for screenshots, not for use.

### "A clone of common design inspiration"
Near-copy of a popular component library demo or Dribbble screenshot. No adaptation. No product thinking. Assembled, not designed.

### "Component-showcase aesthetic"
Looks like a 21st.dev showcase — impressive isolated components, not integrated into a coherent product experience. Theatrical spacing. Hyper-styled cards.

### "Wrong direction for the project"
Using EL giant display type on a developer tool. Using TM restraint on a consumer toy app. Using VP gradients on a luxury brand. The direction must match the project — see `core/design-directions.md` § Direction × Project Type Matrix.

### "Mixed directions"
Hero is TM-restrained, feature section is VP-gradient, pricing is EL-giant-type. Blending directions on first pass almost always fails. Pick ONE, commit.

---

## The Final Test

Look at the output and ask honestly: does this look like AI generated it, or does it look like a specialist at a top design studio — billing $400/hour — built it?

If you hesitate, revise. The quality bar is not "decent" or "premium" — it is "a specialist designed this."
