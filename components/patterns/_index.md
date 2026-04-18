# Interactive Patterns — Copy-Paste Library

These are the signature interactive patterns that make a page read as premium rather than generic. Every recipe in `recipes/` pulls from here.

**Rule:** when a recipe lists a signature pattern, do not improvise a lesser version. Copy the pattern. Adapt copy and data only.

**Direction-coupled:** most patterns are paired with a specific design direction. A TM site uses TM patterns. A DE site uses DE patterns. Mixing patterns across directions almost always degrades the result — pick the direction-matched patterns first.

---

## Universal (every direction)

| Pattern | File | When to use |
|---|---|---|
| Noise overlay | [`noise-overlay.md`](noise-overlay.md) | Root layout — universal grain texture |
| Scroll reveal | [`scroll-reveal.md`](scroll-reveal.md) | Every below-the-fold section |
| FAQ accordion | [`faq-accordion.md`](faq-accordion.md) | Every FAQ section |
| Eyebrow label | [`eyebrow.md`](eyebrow.md) | Top of sections (TM especially) |

---

## TM — Technical-Minimal

| Pattern | File | When to use |
|---|---|---|
| Terminal panel | [`terminal-panel.md`](terminal-panel.md) | Hero of a dev tool; product-does-something demos |
| Command palette (⌘K) | [`command-palette.md`](command-palette.md) | Every dev-tool and dashboard |
| Feature tablist | [`feature-tablist.md`](feature-tablist.md) | Replaces 3-col icon grid |
| Comparison slider | [`comparison-slider.md`](comparison-slider.md) | Before/after, migration stories |
| Pricing toggle | [`pricing-toggle.md`](pricing-toggle.md) | Pricing sections |
| Logo marquee | [`logo-marquee.md`](logo-marquee.md) | Social-proof rail |
| Animated counter | [`counter.md`](counter.md) | Metrics section (clean count-up variant) |
| Tweaks panel | [`tweaks-panel.md`](tweaks-panel.md) | Live theme switcher — huge quality signal |

---

## DE — Design-Engineer

| Pattern | File | When to use |
|---|---|---|
| Cursor spotlight | [`cursor-spotlight.md`](cursor-spotlight.md) | On feature cards — DE signature |
| Magnetic button | [`magnetic-button.md`](magnetic-button.md) | Primary CTAs — DE signature |
| Number scramble | [`number-scramble.md`](number-scramble.md) | Metrics — DE signature |
| Letter-stagger hero | [`letter-stagger-hero.md`](letter-stagger-hero.md) | DE hero headline |
| Indexed rows | [`indexed-rows.md`](indexed-rows.md) | Replaces feature grid with Swiss-grid numbered table |

---

## VP — Vibrant-Playful

| Pattern | File | When to use |
|---|---|---|
| Product-visual hero | [`product-visual-hero.md`](product-visual-hero.md) | VP hero with big product visual |
| Gradient card stack | [`gradient-card-stack.md`](gradient-card-stack.md) | VP feature sections — replaces icon grid |
| Color-block section | [`color-block-section.md`](color-block-section.md) | Per-feature color-blocked sections |
| Chunky pricing | [`chunky-pricing.md`](chunky-pricing.md) | Friendly rounded-3xl pricing |
| Bouncy hover primitives | [`bouncy-hover.md`](bouncy-hover.md) | Reusable VP hover components |

---

## EL — Editorial-Luxury

| Pattern | File | When to use |
|---|---|---|
| Giant display hero | [`giant-display-hero.md`](giant-display-hero.md) | EL hero at 20vw fluid display |
| Product pin scroll | [`product-pin-scroll.md`](product-pin-scroll.md) | Scroll-rotating product showcase |
| Sticky section lock | [`sticky-section-lock.md`](sticky-section-lock.md) | Chapter-based scroll storytelling |
| Horizontal scroll gallery | [`horizontal-scroll-gallery.md`](horizontal-scroll-gallery.md) | Editorial gallery / selected work |
| Two-up editorial spread | [`two-up-editorial.md`](two-up-editorial.md) | Replaces feature tiles with full-bleed+text spreads |

---

## Usage Rules

1. **Match direction first.** Use TM patterns on TM sites, DE on DE, VP on VP, EL on EL. Don't cross-mix on the first pass.
2. **Never re-invent.** If a pattern exists, copy it. Inventing a lesser version is what makes AI output feel assembled.
3. **Adapt copy and data, not structure.** Change the terminal scripts, not the terminal component.
4. **Typography tokens.** Every pattern uses the typography system from `core/typography-system.md` — direction-appropriate faces, scales, tracking.
5. **Motion tokens.** Every pattern uses the motion vocabulary from `core/motion-standard.md` — direction-appropriate durations, springs, curves.
6. **Color tokens.** Every pattern uses CSS custom properties, no hardcoded hex.
7. **Reduced-motion guard.** Every motion-heavy pattern honors `prefers-reduced-motion`.
