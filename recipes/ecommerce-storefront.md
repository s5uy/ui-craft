# E-commerce — Storefront

**Project type:** E-commerce storefront / product site
**Default direction:** EL (Editorial-Luxury)
**Also supports:** VP (Vibrant-Playful) for friendlier consumer goods

---

## Who it's for

- Hardware product launches (Teenage Engineering, Analogue, Nothing)
- Fashion / beauty / skincare brands (Aesop, Rhode, Glossier)
- Consumer goods w/ design-led positioning (Hem, Ooni, Yeti)
- Food & beverage w/ premium positioning (Graza, Fly by Jing)

## Who it's not for

- Commodity e-commerce (Amazon-style listings)
- Complex multi-SKU apparel catalogs (use a custom architecture — this recipe is single-product or small-catalog focused)
- B2B procurement (use `b2b-saas-sober.md`)

---

## Per-Direction Adjustments

### EL (default — the luxury storefront)
- **Palette:** near-white + one brand accent color (terracotta, glazed-peach, matte-black, etc.)
- **Type:** SF Pro Display / Neue Haas Grotesk Display / editorial serif, giant fluid display
- **Motion:** scroll-linked product pins, sticky chapters, image scale-up, slow cinematic reveals
- **Layout:** full-bleed hero, two-up editorial spreads, generous vertical padding (200-300px)
- **Depth:** photographic — studio product photography does 70% of the work

### VP (alternate — friendlier, color-forward)
- **Palette:** bright off-white + multi-color gradient cards + color-blocked sections
- **Type:** Mona Sans / Satoshi bold + Instrument Serif italic accents
- **Motion:** spring-physics hover, bouncy add-to-cart, confetti on purchase
- **Layout:** color-blocked feature sections, chunky product cards
- **Depth:** soft warm shadows, rounded-3xl corners, halation on buttons

---

## Section Order

### EL version
1. **Navigation** — minimal, logo-center or logo-left, cart + search + menu icons right
2. **Hero** — full-viewport product photography, giant product name overlay (20vw)
3. **Product story** — one-sentence product positioning, editorial mono chapter label
4. **Feature chapters** (sticky scroll) — 3-5 chapters, each one product attribute (material, mechanism, usage, care)
5. **Technical specs** — mono-type tabular spec sheet, NOT a feature icon grid
6. **Gallery** — horizontal scroll of 4-6 lifestyle / detail / studio shots
7. **Reviews / press quotes** — sparse, editorial (2-4 pull quotes from legit press or real customers)
8. **Purchase block** — giant product name + price + variants + add-to-cart
9. **FAQ** — accordion, 5-8 questions max
10. **Footer** — sparse, brand-consistent, legal + newsletter + socials

### VP version
1. **Navigation** — friendly, accent-color logo, primary CTA in nav
2. **Hero** — product visual + playful bold copy + accent italic serif word
3. **Color-blocked feature sections** — 3-4, each owns a color (peach/mint/butter/sky)
4. **Gradient card gallery** — 4-6 product variants / angles as gradient-bg cards
5. **Reviews** — chunky rounded-3xl testimonial cards, customer photos
6. **Recommended pairings** — other products, as colorful product cards
7. **Purchase block** — chunky rounded-3xl, big price, bouncy CTA
8. **FAQ** — friendlier copy, accordion
9. **Footer** — warmer, with newsletter signup block

---

## Signature Interactive Patterns

**Required for EL:**
- `components/patterns/product-pin-scroll.md` — hero product rotates/scales on scroll
- `components/patterns/sticky-section-lock.md` — for feature chapters
- `components/patterns/horizontal-scroll-gallery.md` — for gallery
- `components/patterns/giant-display-hero.md` — product name at 20vw
- `components/patterns/two-up-editorial.md` — for detail spreads

**Required for VP:**
- `components/patterns/gradient-card-stack.md` — product variants
- `components/patterns/color-block-section.md` — each feature section
- `components/patterns/chunky-pricing.md` — purchase block
- `components/patterns/bouncy-hover.md` — on product cards, add-to-cart
- `components/patterns/product-visual-hero.md` — oversized product hero

**Required for both:**
- Cart drawer (slide-in from right, not modal center)
- Variant picker (swatches, not dropdowns)
- Photo gallery with thumbnail rail
- Add-to-cart animation (flying product to cart icon, or subtle pulse)

---

## Voice Cues

### EL voice
**Do:**
- "Aluminum. Glass. Silicon." (three-beat materials)
- "Made in Stockholm. Assembled in Berlin."
- "A quieter computer."
- Single-word feature titles: "Silence." / "Speed." / "Longevity."

**Don't:**
- "Revolutionary new product!"
- "The best [category] ever made"
- "Don't miss out — limited time offer" (EL doesn't scarcity-pressure)
- Emoji in copy

### VP voice
**Do:**
- "Meet your new favorite [category]."
- "Small-batch. Big flavor."
- "Made for [specific persona]."
- Warm, specific, slightly funny

**Don't:**
- Cold corporate product speak
- Buzzword-heavy copy

---

## Minimum Data Plausibility

Required:
- Real product name (not "Product")
- Real price in correct currency with correct format ("$249" / "£199" / "¥28,000")
- Real material/ingredient lists if relevant
- Real dimensions / specs
- Real made-in attribution
- Real shipping / returns summary

If the user doesn't specify, invent plausible specifics and flag for replacement.

---

## Failure Signals

Weak e-commerce output:
- Three-column product card grid on hero ("Our Products")
- Generic "Shop Now" CTA — replace with product-specific language
- Bright-blue Add to Cart button — use brand accent, not default
- Stock lifestyle photography feel — EL needs real product or high-craft placeholder
- Modal cart (should be slide-in drawer)
- Review star ratings (5 stars row) — EL uses pull quotes, VP uses photo+quote, neither uses star-row
- Category menus — this recipe is single-product / small-catalog focused
- Countdown timers, scarcity pressure banners — off-brand for both EL and VP
- "Related products" grid with 8 items — show 2-4, curated

---

## Section Rhythm

EL rhythm:
```
[ Nav — sparse ]
[ Full-viewport hero ]
[ Positioning statement — sparse, one sentence ]
[ Feature chapter 01 — sticky locked ]
[ Feature chapter 02 — sticky locked ]
[ Feature chapter 03 — sticky locked ]
[ Spec sheet — dense tabular ]
[ Gallery — horizontal scroll ]
[ Press quotes — sparse ]
[ Purchase — full-viewport commit ]
[ FAQ — medium density ]
[ Footer — sparse ]
```

VP rhythm:
```
[ Nav — friendly ]
[ Product visual hero ]
[ Color-block 01 — peach ]
[ Color-block 02 — mint ]
[ Color-block 03 — butter ]
[ Gradient card gallery ]
[ Reviews — chunky ]
[ Recommended — product cards ]
[ Purchase — chunky ]
[ FAQ ]
[ Warm footer with signup ]
```

---

## Output Checklist

- [ ] Direction locked in `[VISION]`
- [ ] Product photography / imagery treatment specified (studio-lit? lifestyle? both?)
- [ ] Hero is full-viewport product visual, not centered text block
- [ ] Cart is slide-in drawer, not centered modal
- [ ] Variant picker uses real swatches or thumbnails
- [ ] Price formatting correct per region
- [ ] Add-to-cart has an interaction (flyout, pulse, or cart-badge bump)
- [ ] FAQ is accordion, not expanded list
- [ ] Footer includes legal, shipping, returns, contact
- [ ] Noise overlay + subtle texture
- [ ] `prefers-reduced-motion` handled
- [ ] Accessibility: variant picker is keyboard-navigable, cart drawer traps focus
