# Design Directions

The single largest source of generic AI output is treating "good design" as one aesthetic. It is not. A developer tool, a meditation app, a magazine, and an agency portfolio all need premium taste — but that taste looks completely different in each.

This file codifies **four design directions**. Every full-site generation must lock one direction before any other decision (recipe, palette, typography, motion). The direction sets the rules; everything downstream follows.

---

## The Four Directions

| ID | Direction | Shorthand | Anchor references |
|---|---|---|---|
| `TM` | **Technical-Minimal** | Linear / Vercel / Stripe | Linear.app, Vercel.com, Stripe.com, Resend.com, Planetscale, Foundry (`site1/`) |
| `DE` | **Design-Engineer** | Rauno / Emil / Paco | rauno.me, emilkowal.ski, paco.me, shadcn.com, ui.dev, vercel/geist |
| `VP` | **Vibrant-Playful** | Arc / Raycast / Framer | arc.net, raycast.com, framer.com, linear (old), clerk.com, campsite.co |
| `EL` | **Editorial-Luxury** | Apple / luxury editorial | apple.com, teenage.engineering, analogue.co, rhode.com, aesop.com, nothing.tech |

Every project in this skill routes through one of these four. If a direction doesn't seem to fit, the prompt is still a direction question — not a "new direction" question.

---

## How to Lock a Direction

### Step 1 — Infer from prompt keywords

| Signal in the user's brief | Default direction |
|---|---|
| "developer tool", "DevOps", "API", "infra", "database", "CLI", "enterprise SaaS", "analytics", "admin" | **TM** |
| "portfolio", "design engineer", "I'm building my personal site", "case study", references to Rauno/Emil/Paco, "I want micro-interactions", "Swiss" | **DE** |
| "fun", "friendly", "consumer", "playful", "kids", "creators", "community", "collab tool", "productivity app" (consumer-framed) | **VP** |
| "luxury", "editorial", "brand", "agency", "fashion", "hospitality", "hardware product", "I want it to feel expensive", references to Apple/Aesop/Teenage Engineering | **EL** |

### Step 2 — If genuinely ambiguous, ask one question

If the prompt is stripped ("build me a landing page for my product") and you cannot infer a direction, ask **one** question with options — using the AskUserQuestion tool if available, otherwise inline:

> Which of these four feels closest to the aesthetic you want?
> 1. **Technical-Minimal** — Linear / Vercel / Stripe. Dense text, mono accents, near-black surfaces, OKLCH accents, tokenized everything.
> 2. **Design-Engineer** — Rauno / Emil / shadcn. Swiss typography, detailed micro-interactions, grid discipline, restraint as craft.
> 3. **Vibrant-Playful** — Arc / Raycast / Framer. Confident color, spring physics, friendly geometry, big product visuals.
> 4. **Editorial-Luxury** — Apple / Aesop. Gigantic type, extreme whitespace, product photography, slow cinematic motion.

Never ask more than one question. Never ask if the direction is obviously inferable.

### Step 3 — Lock and announce

Once locked, state the direction in the `[VISION]` block of the response and follow it strictly for the rest of generation. Do not blend directions on the first pass.

---

## TM — Technical-Minimal

### What it is
The house style of modern developer and B2B infrastructure marketing. Near-black surfaces, OKLCH accents that sit in the 60–70 lightness range, mono-font labels on every eyebrow/kbd/metric, fluid type, tokenized colors, dense paragraphs next to animated terminals. Restraint as the entire brand.

### DNA
- **Surfaces:** `bg-0` (deepest), `bg-1` (panel), `bg-2` (raised) — all within ~8 lightness points of each other. Never pure black, never pure white. OKLCH or HSL, not hex-first.
- **Borders:** two strengths — `border-weak` (barely visible separator) and `border-strong` (panel edge). Never drop-shadow-heavy.
- **Type:** geometric sans body (Inter, Geist Sans), mono accents (JetBrains Mono, Geist Mono) on labels, kbd, code, timestamps, numbers. Mono does 40% of the brand heavy lifting.
- **Accents:** one chromatic accent, usually cyan / green / violet at OKLCH `0.68 0.18 [hue]`. Accent appears as: eyebrow dot, primary CTA, focus ring, chart stroke, status indicator. Never as decoration.
- **Depth:** box-shadow with *negative* spread (`0 8px 32px -12px`) for panel lift. No hard-edged shadows. No glow except on `status-live` dots.
- **Gradients:** radial atmospheric only, < 15% accent opacity, off-center. Zero gradient text, zero gradient button fills.

### Feel
Quiet, confident, documentation-adjacent. Reads like it was made by the engineers who will use it. A page you can stare at for a long time without getting tired.

### Typography feel
Tight tracking on display (`-0.025em`), medium/semibold on hero (not bold — restraint), monospace mixed into headlines as a design device. Body 15-16px, line-height 1.6. Uppercase mono labels at 11-12px with `0.08em` tracking.

### Motion feel
12–16px translate, 500–700ms duration, `cubic-bezier(0.25, 0.1, 0.25, 1)` ease. One-shot IntersectionObserver reveals. Stagger at 60–80ms. No spring physics on anything that isn't a drag handle.

### Layout feel
Max-width 1200-1280px. 8-column grid for marketing, 12 for dashboards. Section padding 120-160px vertical on desktop. Copy width ~65ch. Eyebrow + heading + body pattern on every section. Dense section / light section rhythm.

### Color feel
Near-black `oklch(0.14 0 0)` → `oklch(0.22 0 0)` surfaces. One accent, usually `oklch(0.72 0.17 180)` (cyan) or `oklch(0.68 0.18 145)` (green). Text `oklch(0.98 0 0)` → `oklch(0.55 0 0)` descending.

### What makes TM fail
- Using pure `#000` and `#fff` — too sterile, reads as wireframe.
- Adding a gradient "for depth" — breaks the whole restraint premise.
- Three-column icon grid — the clichéd fallback. Replace with feature-tablist.
- Bold everything — the brand is restraint, not volume.
- Rounded-2xl on everything — TM cards are 8-12px radius max.

### Signature patterns (required on most TM sites)
- Animated multi-tab terminal (`components/patterns/terminal-panel.md`)
- Command palette with Cmd+K (`components/patterns/command-palette.md`)
- Feature tablist replacing icon grid (`components/patterns/feature-tablist.md`)
- Eyebrow with glowing accent dot on every section
- Nav with backdrop blur + scroll-triggered border
- Logo marquee for customer rail

---

## DE — Design-Engineer

### What it is
The aesthetic of design-engineers who ship their own portfolios: Rauno Freiberg, Emil Kowalski, Paco Coursey, shadcn, Vercel's Geist team. Swiss-inspired typography, obsessive detail on every micro-interaction, grid discipline, no wasted pixel. The design itself demonstrates the designer's craft — it is the portfolio.

### DNA
- **Surfaces:** often extreme. Either near-white paper (`oklch(0.98 0 0)`) with hairline borders or deep near-black with razor-thin neutral accents. Rarely colorful; color is earned, not decorative.
- **Borders:** hairline (0.5px at 1x, 1px at 2x), `oklch(0.92 0 0 / 0.6)` on light / `oklch(0.25 0 0 / 0.8)` on dark. Borders do structure; color rarely does.
- **Type:** Inter Display / Söhne / Geist Sans for display. Editorial serif (GT Sectra, Tiempos) for occasional accent. Mono (JetBrains, Geist Mono) on labels. The pairing is the brand.
- **Accents:** often NO chromatic accent. If present, one neutral (e.g., `oklch(0.65 0.12 45)` amber) used sparingly on a single hover state or link underline.
- **Depth:** elevation from borders and type weight, not shadows. Occasional `backdrop-blur` for overlays. Shadows are soft and chromatic-neutral when used.
- **Gradients:** forbidden. Full stop. Even atmospheric gradients read as compromise in DE. Use type and whitespace instead.

### Feel
Inhabitable, calm, clever in detail. You notice the craft on the second visit: the magnetic hover, the 2px arrow nudge, the cursor spotlight on the feature grid, the number that scrambles then settles into place. The design IS the product.

### Typography feel
Swiss-grid rigor. Display at 48-96px, tracking `-0.02em`, font-weight 500 (not 700 — medium-weight is the signature). Body 14-15px with careful line-height (1.5-1.55). Mono labels 11px uppercase with `0.1em` tracking. Occasional serif ampersand or number.

### Motion feel
This is where DE earns its name. Motion is the brand:
- **Magnetic hover** — buttons follow cursor within 4-8px
- **Cursor spotlight** — radial gradient follows cursor on feature cards
- **Number scramble** — metrics scramble from random to target on viewport enter
- **Letter-by-letter text reveal** — hero headline staggers at letter level, 20-30ms per letter
- **Page transitions** — view-transitions API or Framer Motion layout animation
- **Command-exec button feedback** — button shows live "running" → "done" state when clicked
All motion uses physics-based springs, not bezier. `spring, stiffness: 260, damping: 24` is the DE default.

### Layout feel
12-column grid, asymmetric arrangements common. Generous left-gutter, content left-aligned (rarely centered). Max-width often narrower than TM — 1024-1120px. Section padding 140-200px. Occasional full-bleed images that break the grid.

### Color feel
Two palettes dominate:
- **Paper:** `oklch(0.98 0 0)` bg, `oklch(0.12 0 0)` text, `oklch(0.92 0 0)` borders, zero accent or one amber/red accent.
- **Graphite:** `oklch(0.11 0 0)` bg, `oklch(0.96 0 0)` text, `oklch(0.25 0 0)` borders, zero accent.

### What makes DE fail
- Using chromatic gradients — immediately breaks the DE contract
- Centered-hero marketing layout — DE is asymmetric and left-aligned
- Three-column icon feature grid — DE shows features through demos, not icon tiles
- Bold weights on display — DE is medium (500), occasionally light (300)
- Using the same motion vocabulary as TM — DE motion is more physical, more specific, more earned

### Signature patterns (required on most DE sites)
- Cursor spotlight on feature cards (`components/patterns/cursor-spotlight.md`)
- Magnetic button (`components/patterns/magnetic-button.md`)
- Number scramble on metrics (`components/patterns/number-scramble.md`)
- Letter-stagger hero (`components/patterns/letter-stagger-hero.md`)
- View-transition page transitions
- Hairline-bordered section dividers with mono label

---

## VP — Vibrant-Playful

### What it is
Confident-but-friendly product marketing. Arc Browser, Raycast, Framer, Campsite, Clerk, Cal.com, Linear's early years. Color is embraced — not neon gradient-fog, but bold flat hues and carefully-crafted two-tone gradients. Rounded geometry, spring physics, product visuals that dominate the hero. Fun without being childish.

### DNA
- **Surfaces:** light-mode-first more often than dark. Off-white backgrounds (`oklch(0.99 0.005 85)`), bright color cards, vibrant hero product shots. Dark VP exists (Raycast) but bright VP is the default.
- **Borders:** subtle, often only on inputs. Depth comes from color blocks and shadow, not borders.
- **Type:** rounded geometric sans (Inter, Söhne Rounded, Mona Sans, Satoshi), sometimes with a playful display face (Instrument Serif, Playfair Display for headers). Bold weights on display (700-800). Friendly, not serious.
- **Accents:** multi-color palette — often 3-4 complementary hues used across different sections (orange hero, green feature, violet testimonial). Each section can own its own color.
- **Depth:** soft shadows (`0 24px 48px -16px rgba(black, 0.12)`), rounded corners `rounded-2xl`/`rounded-3xl`, layered cards with parallax on scroll.
- **Gradients:** ALLOWED — but crafted, not default. Two-tone gradients on select cards (pink → orange, violet → cyan) applied as surface color, not fog. Gradient text allowed sparingly on a single hero word.

### Feel
Delightful, confident, inviting. The product is selling itself visually — the color and shape are part of the pitch. You feel optimistic scrolling it.

### Typography feel
Display at 56-120px, bold (700-800), often with one word in italic serif or in gradient. Body 16-18px (friendlier = larger), line-height 1.55-1.65. Label type is often small caps or standard sentence case — less mono-obsession than TM/DE.

### Motion feel
Spring physics are the signature. `spring, stiffness: 180, damping: 12` — bouncy but controlled. Staggered reveals with 100-150ms gaps. Hover scales up to 1.04-1.06 (vs TM's 1.02). Rotating, morphing, parallax product shots. Confetti on primary CTAs is on-brand (used sparingly).

### Layout feel
Often single-column with generous section padding (160-220px). Cards are chunky (p-8, p-10). Hero art often dominates — 50-60% of viewport height is the product visual. Max-width 1200-1400px. Color-blocked sections.

### Color feel
Examples:
- **Arc:** off-white bg, warm orange/red/yellow accents per feature
- **Raycast:** dark bg, rainbow of flat hues on icon tiles
- **Framer:** near-black with multi-color gradient cards in a grid
- **Clerk:** white bg, violet + coral + green feature tiles

### What makes VP fail
- Using TM-restraint rules and adding one gradient — reads as TM-with-a-mistake
- Default purple-blue SaaS gradient — not VP, that's AI-slop
- All-dark + neon — that's gaming/crypto, not VP
- No product visual in hero — VP lives on product imagery
- Using serious copy — VP needs wit, specific voice, a little humor

### Signature patterns (required on most VP sites)
- Gradient card stack with 3-4 color variations (`components/patterns/gradient-card-stack.md`)
- Bouncy hover states (`whileHover={{ scale: 1.04 }}` with spring)
- Section color backgrounds (each section owns a color)
- Chunky rounded cards (`rounded-3xl`, `p-10`)
- Animated product shot in hero (Lottie, video, or sequence)
- Confetti/burst on primary CTA

---

## EL — Editorial-Luxury

### What it is
Apple.com, Aesop, Teenage Engineering, Analogue, Rhode, Nothing Tech. Gigantic typography (sometimes 20vw display), extreme whitespace, hero product photography that IS the brand, slow and cinematic scroll-linked motion, near-silent interfaces. The product is the hero; the UI disappears around it.

### DNA
- **Surfaces:** often pure or near-pure white (`oklch(0.99 0 0)`) OR pure matte black (`oklch(0.08 0 0)`). No midtones. The drama is the binary.
- **Borders:** rarely visible. Depth is from image scale, type scale, and whitespace.
- **Type:** display face dominates — SF Pro Display, Neue Haas Grotesk Display, GT America, Söhne Breit. Ultra-large, tight tracking (`-0.03em` to `-0.05em`). Body type is understated (14-16px).
- **Accents:** almost always monochromatic — the brand color is the product. If a color accent appears, it's a single product color used once (Aesop's terracotta, Nothing's red, Rhode's glazed pink).
- **Depth:** photographic. Product photography IS the depth. UI chrome is flat.
- **Gradients:** forbidden except when they are the brand itself (Apple's iridescent color stripes for WWDC are brand, not decoration).

### Feel
Silent, confident, rare. The page treats the user like an adult. You feel small next to the type and large next to the product. Scrolling feels slow, deliberate, unhurried.

### Typography feel
Display at 96-300px (`clamp(4rem, 20vw, 18rem)`). Tracking `-0.04em`. Sometimes a single word at 20vw with the rest of the sentence at 24px — extreme scale contrast. Body is restrained, often 14-15px with wide line-height (1.7-1.8). Serif display common (NYT-style headlines for editorial brands).

### Motion feel
Slow and cinematic. Scroll-linked motion is the signature — sticky sections that lock on scroll, product pins that scrub through rotation, image scale-up on viewport entry (1.1x → 1.0x over 1200ms). Durations 800-1400ms. Ease is `cubic-bezier(0.22, 1, 0.36, 1)` (dramatic ease-out). No bounciness.

### Layout feel
Full-bleed often. Margins are the design. Section padding 200-300px. Centered or dramatically-asymmetric. Max-width sometimes absent entirely — type goes edge-to-edge. Sticky sections create "chapters."

### Color feel
Examples:
- **Apple:** near-white or near-black, product as the color, occasional WWDC rainbow for campaigns
- **Aesop:** paper-cream bg, black type, terracotta brand color once per viewport
- **Teenage Engineering:** stark white, product photography of orange/yellow devices
- **Rhode:** glazed-peach backgrounds, product as the art

### What makes EL fail
- Using TM-sized type (text-6xl hero) — EL hero is text-9xl / 20vw
- Using feature cards at all — EL doesn't do feature grids; it does chapters
- Stock photography — EL requires actual product visuals or the design collapses
- Fast motion — EL duration floor is 600ms
- Multi-column density — EL breathes, one-thing-at-a-time

### Signature patterns (required on most EL sites)
- Giant display type with fluid scaling (`clamp(4rem, 20vw, 18rem)`)
- Scroll-linked product pin (`components/patterns/product-pin-scroll.md`)
- Sticky section lock (`components/patterns/sticky-section-lock.md`)
- Image scale-up on viewport entry
- Full-bleed hero with product-as-hero
- Slow horizontal scroll carousel for gallery

---

## Direction × Project Type Matrix

Which direction fits which project type? Use this table to pick a default when the user has specified the project type but not the direction.

| Project Type | Best fit | Also works | Avoid |
|---|---|---|---|
| Developer tool marketing | **TM** | DE | VP, EL |
| AI product marketing | **TM** | DE, VP | EL |
| B2B SaaS marketing | **TM** | DE | EL |
| Consumer app marketing | **VP** | EL, DE | TM |
| Agency / studio site | **DE** | EL | TM (too corporate) |
| Designer portfolio | **DE** | EL | VP |
| Editorial / media / magazine | **EL** | DE | VP |
| E-commerce — tech products | **EL** | VP | TM |
| E-commerce — fashion/beauty | **EL** | VP | TM, DE |
| E-commerce — consumer goods | **VP** | EL | TM |
| Hardware product site | **EL** | DE | TM |
| Dashboard / logged-in app | **TM** | DE | VP, EL |
| Documentation site | **TM** | DE | VP, EL |
| Launch / teaser page | **EL** | DE, VP | TM |

---

## Cross-Direction Rules

These apply to ALL directions. No direction exempts these.

1. **Token system required** — every color is a CSS custom property. No hardcoded hex in component styles.
2. **Content quality required** — copy must be specific enough that it couldn't apply to 500 other products. Direction changes the tone; specificity is non-negotiable.
3. **Code completeness required** — no `// rest here` stubs, no truncation, correct TypeScript.
4. **Accessibility required** — contrast ratios, focus rings, keyboard nav, semantic HTML.
5. **Anti-AI-slop required** — no purple-blue gradient fog hero (violates TM, DE, and EL; even VP doesn't do it), no three-column icon feature grids (banned in all four — replace per direction).

---

## When a User Asks for Something Between Directions

Sometimes a user wants "like Linear but warmer" or "like Apple but more playful." Handle by:

1. Pick the dominant direction (Linear → TM, Apple → EL)
2. Apply one targeted swap from the secondary direction:
   - "Warmer TM" → swap the neutral to warm-neutral palette from `palettes/families/`
   - "More playful EL" → allow one VP-style gradient card in features
3. Do not blend more than one axis. If a user asks for something blending three directions, the user is asking for incoherence — push back and make them pick.

---

## Do Not Blend Without Reason

On the first pass, pick ONE direction and execute it cleanly. Blending is the source of most design failure. A site that is 80% TM with 20% VP gradients reads as "TM with a mistake," not as "nuanced." Clean direction first, swaps second.
