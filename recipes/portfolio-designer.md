# Portfolio — Designer / Design-Engineer

**Project type:** Designer / design-engineer / creative-technologist personal site
**Default direction:** DE (Design-Engineer)
**Also supports:** EL (Editorial-Luxury) for more product-photography-led folios

---

## Who it's for

- A designer-engineer showcasing product work (Rauno, Emil, Paco archetype)
- A design lead who wants the site to BE a portfolio, not just display one
- A creative-technologist shipping detailed interactions as resume

## Who it's not for

- Illustrators / 3D artists (use `editorial-brand.md` with EL)
- Full-service agency pitch decks (use `editorial-brand.md` with DE)
- Career-stage "traditional" graphic designers seeking enterprise recruiters (use `b2b-saas-sober.md` adapted — uncommon but valid)

---

## Per-Direction Adjustments

### DE (default)
- **Palette:** paper (`oklch(0.98 0 0)` bg) or graphite (`oklch(0.11 0 0)` bg). Pick one; commit.
- **Type:** Inter Display + JetBrains Mono + GT Sectra (optional serif accent)
- **Motion:** letter-stagger hero, magnetic buttons, cursor spotlight on case-study tiles, number-scramble on stats
- **Layout:** asymmetric grid, numbered index rows, hairline dividers
- **Copy voice:** first-person, dry-wit, engineer-precise ("Design-engineer. I build interfaces and write about them.")

### EL (alternate — for product-photography-heavy folios)
- **Palette:** near-white + monochrome products
- **Type:** SF Pro Display or Neue Haas Grotesk Display, giant
- **Motion:** scroll-linked product pins, sticky case-study chapters
- **Layout:** full-viewport hero, full-bleed case-study images
- **Copy voice:** sparser, editorial, past-tense case studies

---

## Section Order

1. **Hero** — name + one-line identity + CTA to work/contact
   - DE: asymmetric — left name, right current role + location + availability status
   - EL: giant centered "Name." with tiny subtitle
2. **Now / Currently** — what you're working on right now, mono label
3. **Selected Work** — 4-8 case studies, indexed rows or tile grid
   - DE: numbered rows with client / role / year / metric
   - EL: full-bleed image pairs with project name overlaid
4. **Featured Case Study** — one expanded case with hero image, summary, key metrics
5. **Writing / Talks** — blog posts, conference talks, newsletters
6. **Tools Built** — open-source projects, libraries, side-projects (DE signature)
7. **Testimonials** — 2-4 quotes from clients/collaborators (sparse, not carousel)
8. **About / Bio** — long-form text about approach, values, journey
9. **Contact / Footer** — email, social, current location, availability

## Signature Interactive Patterns

**Required for DE:**
- `components/patterns/cursor-spotlight.md` — on every case-study tile
- `components/patterns/magnetic-button.md` — on hero CTA and footer contact
- `components/patterns/letter-stagger-hero.md` — on hero name
- `components/patterns/number-scramble.md` — on any stat ("74M users reached", "12 products shipped")
- `components/patterns/indexed-rows.md` — for Selected Work if using rows layout

**Required for EL:**
- `components/patterns/product-pin-scroll.md` — on featured case study
- `components/patterns/sticky-section-lock.md` — for case-study chapters
- `components/patterns/giant-display-hero.md` — on hero name

**Universal:**
- Smooth view-transitions between pages (Next.js 14+ or Framer layoutId)
- Subtle noise overlay (`components/patterns/noise-overlay.md`)
- Mono footer sitemap

---

## Voice Cues

### DE voice
**Do:**
- "I design interfaces for thought."
- "Design-engineer. Writing about the craft."
- "Recent work: a visualizer for [specific niche tool]."
- "74M users reached through products I shipped."

**Don't:**
- "Passionate designer creating beautiful experiences"
- "Versatile creative with 8+ years of experience"
- "Let's build something amazing together"

### EL voice
**Do:**
- "Portfolio. 2018 — now."
- "Interfaces for thought."
- "Three years at [specific company]. Four products. Twelve rewrites."

**Don't:**
- Corporate bio speak
- Anything that sounds LinkedIn-generated

---

## Minimum Data Plausibility

Required real-or-plausible content:
- Actual case study names (not "Project 1")
- Actual client names (not "Tech Company A")
- Real years (2024 / 2025, not "Recent")
- Real metrics ("14% increase in activation" not "Improved metrics")
- Real tool names ("Figma plugin for variant management" not "Design tool")

If you don't know the user's actual projects, invent three specific plausible ones and clearly label them as placeholder in `[INTEGRATION NOTES]` for replacement.

---

## Failure Signals

A weak portfolio-designer page:
- Generic three-column "Recent Work" card grid with stock images
- "Hi, I'm [Name], a designer" hero pattern (use name-only in DE)
- Centered hero with centered bio with centered CTA
- Works cropped as perfectly-framed website thumbnails (AI stock-photo vibe)
- Testimonials in a slider
- Skills listed as progress bars or icon rows
- "Passionate / creative / innovative" copy
- Gradient backgrounds or purple accents
- Light-mode-only with Apple-emoji decorations
- No micro-interactions (DE requires them — page is flat without)

---

## Section Rhythm

DE rhythm (dense → breathing → dense):
```
[ Asymmetric hero — sparse ]
[ Now — single sentence, sparse ]
[ Selected Work — indexed rows, dense ]
[ Featured Case Study — visual + narrative, medium ]
[ Writing — titled list, medium density ]
[ Tools Built — 3-4 project tiles, medium ]
[ Testimonials — 2-3 blocks, sparse ]
[ About — long prose, dense ]
[ Contact — single block, sparse ]
```

EL rhythm:
```
[ Full-viewport hero ]
[ Now — full-viewport ]
[ Selected Work — one case per viewport, sticky ]
[ Featured Case Study — scroll-pin chapters ]
[ About — editorial spread ]
[ Contact — full-viewport ]
```

---

## Output Checklist (before shipping)

- [ ] Direction locked explicitly in `[VISION]`
- [ ] Hero is asymmetric (DE) or giant-centered (EL) — never center-standard-subhead-CTA
- [ ] Every case study tile has a cursor-spotlight (DE) or sticky pin (EL)
- [ ] Numbers use `font-variant-numeric: tabular-nums`
- [ ] Mono labels on eyebrows, years, metadata
- [ ] Hairline dividers (DE) or no dividers (EL) — never shadow-heavy cards
- [ ] No gradients (DE) or only atmospheric/photographic (EL)
- [ ] Footer is a dense mono sitemap, not a three-column marketing-style footer
- [ ] View-transitions or Framer layoutId for page navigation
- [ ] `prefers-reduced-motion` handled
