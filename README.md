# UI Craft

**Turn a single prompt into a specialist-quality site — in the design direction you actually want.**

UI Craft is a skill for Claude (and other AI coding assistants) that replaces the default AI-slop visual vocabulary with a principal-designer's judgment. It supports four distinct premium design directions — Linear-quality, Rauno-quality, Arc-quality, or Apple-quality — and routes every prompt through the matching typography system, motion vocabulary, layout grammar, texture treatment, and copy-paste interactive patterns.

> Ask Claude for "a landing page for a CI/CD platform" — get a Linear-quality site. Ask for "a portfolio for a design-engineer" — get a Rauno-quality site. Ask for "a playful productivity app" — get an Arc-quality site. Ask for "a hardware product launch" — get an Apple-quality site. Not hero stubs. Not purple gradient fog. Complete sites, direction-matched.

---

## The Four Directions

| Direction | Anchor | Use for |
|---|---|---|
| **Technical-Minimal (TM)** | Linear / Vercel / Stripe | Developer tools, B2B SaaS, AI infra, dashboards |
| **Design-Engineer (DE)** | Rauno / Emil / shadcn | Portfolios, agencies, craft-led SaaS |
| **Vibrant-Playful (VP)** | Arc / Raycast / Framer | Consumer apps, creator tools, friendly SaaS |
| **Editorial-Luxury (EL)** | Apple / Aesop / Teenage Engineering | Hardware, fashion, editorial, luxury brands |

Each direction has its **own** typography, motion, layout, and texture system. A TM feature section looks nothing like a VP feature section looks nothing like an EL feature section. The skill picks the right direction from your prompt — or asks one question if ambiguous — then generates a coherent site in that vocabulary.

---

## Before / After

**Without UI Craft (any prompt):**
- Purple-blue gradient blob behind the hero headline
- Three-column icon feature grid
- Glowing CTA button
- "Streamline your workflow with our powerful platform"
- "1M+ happy users"
- Random Tailwind `blue-600` as the accent

**With UI Craft:**

*Prompt:* "landing page for a CI/CD platform" → **TM direction locked**
- Token-driven dark surface, OKLCH mint accent, noise overlay, zero gradient fog
- Hero split with animated multi-tab terminal scripting a real deploy
- Feature tablist with rich preview panels — not a 3-col icon grid
- "Ship software like you mean it. Preview every branch, roll back in seconds."
- "99.97% uptime, 38ms cold start, 1,247 teams shipping on Foundry"

*Prompt:* "portfolio for a design-engineer" → **DE direction locked**
- Paper palette, hairline dividers, Inter Display at weight 500
- Hero with letter-stagger reveal + asymmetric mono metadata
- Selected Work as numbered indexed rows — not card grid
- Magnetic buttons on CTAs, cursor spotlight on case-study tiles
- Number-scramble on stats; view-transitions between pages

*Prompt:* "playful collab app for creators" → **VP direction locked**
- Bright off-white bg, bold Mona Sans + Instrument Serif italic accents
- Hero with oversized product visual, "The app *for* everyone" (italic serif one-word)
- Color-blocked feature sections (peach / mint / lavender / butter)
- Chunky `rounded-3xl` pricing with spring-physics hover, confetti CTA

*Prompt:* "launch page for a hardware product" → **EL direction locked**
- Near-white binary palette, one brand accent color
- 20vw fluid hero: "Think different." with word-stagger reveal
- Scroll-linked product pin rotating as you scroll
- Sticky chapter sections for Materials / Process / Specs
- Horizontal scroll gallery, two-up editorial spreads, film grain on imagery

---

## What's in the box

### Core system (the spine)
- **`core/design-directions.md`** — the foundation. Defines all four directions + Direction × Project Type matrix
- **`core/typography-system.md`** — per-direction type scales, faces, weights, tracking. Copy-paste CSS for all four
- **`core/motion-standard.md`** — per-direction motion vocabularies with Framer Motion snippets (letter stagger, magnetic, scroll pin, spring physics)
- **`core/layout-system.md`** — per-direction grids, section rhythm, container widths, alignment rules
- **`core/texture-depth.md`** — per-direction surfaces, shadows, borders, noise, gradient policy, halation
- **`core/quality-bar.md`** — direction-aware validation checklist (universal floor + per-direction floor + ultimate failure modes)
- **`core/token-system.md`** — CSS custom property system with OKLCH accents, density, radius tiers

### 8 full-site recipes
- `recipes/developer-tool-dark.md` — TM default
- `recipes/ai-product-dark.md` — TM default, DE/VP variants
- `recipes/b2b-saas-sober.md` — TM default, DE variant
- `recipes/consumer-product-warm.md` — VP default, EL/DE variants
- `recipes/editorial-brand.md` — DE default, EL variant
- `recipes/dashboard-shell.md` — TM default, DE variant
- `recipes/portfolio-designer.md` — DE default, EL variant
- `recipes/ecommerce-storefront.md` — EL default, VP variant

### 28 copy-paste interactive patterns
- **Universal** — noise overlay, scroll reveal, FAQ accordion, eyebrow
- **TM** — terminal panel, command palette, feature tablist, comparison slider, pricing toggle, logo marquee, counter, tweaks panel
- **DE** — cursor spotlight, magnetic button, number scramble, letter-stagger hero, indexed rows
- **VP** — product-visual hero, gradient card stack, color-block section, chunky pricing, bouncy hover primitives
- **EL** — giant display hero, product pin scroll, sticky section lock, horizontal scroll gallery, two-up editorial

### Also included
- 5 blueprint specs, palette families (`palettes/`)
- Anti-patterns library (`anti-patterns/`)
- Section / component / page / adaptation prompts (`prompts/`)
- shadcn / Tailwind / Next.js integration docs (`integration/`)
- Working examples (`examples/`)
- Foundry production reference (`site-examples/foundry.md`, `site1/`)

---

## Installation

```bash
# Global install
npm install -g @s5uy/ui-craft

# In your project
cd /path/to/your/project
ui-craft init --ai claude      # Claude Code
ui-craft init --ai cursor      # Cursor
ui-craft init --ai windsurf    # Windsurf
ui-craft init --ai all         # All assistants
```

Also supported: Antigravity, GitHub Copilot, Kiro, Codex CLI, Qoder, Roo Code, Gemini CLI, Trae, OpenCode, Continue, CodeBuddy, Droid (Factory), KiloCode, Warp, Augment.

Or one-shot:
```bash
npx @s5uy/ui-craft@latest init --ai claude
```

Restart your assistant after install.

---

## Try it

Once installed, these prompts produce complete, direction-locked sites:

```
Build me a landing page for a CI/CD platform
→ TM (Technical-Minimal), full site
```

```
Generate a marketing site for a serverless database — Linear-quality
→ TM locked, Foundry-style output
```

```
Create a portfolio for a design-engineer, Swiss-grid feel
→ DE (Design-Engineer) locked
```

```
Design a homepage for a friendly productivity app
→ VP (Vibrant-Playful) locked
```

```
Build a launch page for a hardware product — Apple-inspired
→ EL (Editorial-Luxury) locked, 20vw hero + scroll-pin
```

```
Portfolio for me: I'm a design-engineer at a startup
→ DE locked, letter-stagger hero + cursor-spotlight + indexed work rows
```

```
E-commerce storefront for my small-batch olive oil brand
→ EL locked, product-pin-scroll + sticky chapters + two-up spreads
```

If the direction is ambiguous, the skill asks ONE clarifying question — then locks and ships.

Every response follows the `[VISION] · [DESIGN SYSTEM] · [ARCHITECTURE] · [CODE] · [INTERACTION NOTES]` format, ships complete code, and validates against the direction-aware quality bar.

---

## The Specialist Test

Before shipping, every site runs through: *"Would a designer billing $400/hour look at this and say 'a real designer made this'?"*

If the answer is anything less than yes, revise. That's the quality bar. Not "decent." Not "premium-ish." Specialist-caliber.

---

## Repository Structure

```
ui-craft/
├── SKILL.md                         # Entry point — direction routing
├── core/                            # The spine
│   ├── design-directions.md         # THE foundational doc — 4 directions defined
│   ├── typography-system.md         # Per-direction type systems
│   ├── motion-standard.md           # Per-direction motion vocabularies
│   ├── layout-system.md             # Per-direction grid + rhythm
│   ├── texture-depth.md             # Per-direction surfaces + depth
│   ├── quality-bar.md               # Direction-aware validation
│   ├── token-system.md              # CSS custom properties
│   ├── site-generation-protocol.md
│   ├── philosophy.md
│   ├── content-standard.md
│   ├── code-standard.md
│   ├── gradient-policy.md
│   └── color-philosophy.md
├── recipes/                         # 8 full-site recipes
├── components/patterns/             # 28 copy-paste interactive patterns
├── blueprints/                      # Style direction specs (legacy — directions supersede)
├── palettes/                        # Palette families
├── decisions/                       # Judgment frameworks
├── anti-patterns/                   # What AI-slop looks like
├── prompts/                         # Section / component / page scaffolds
├── integration/                     # shadcn / Tailwind / Next.js setup
├── examples/                        # Working example implementations
├── site-examples/                   # Deconstructions of production sites
└── maintenance/                     # Governance
```

---

## Core Principles

1. **Direction first, recipe second, implementation third.** Every site locks a direction before any other decision.
2. **Hierarchy without color.** Typography does 60% of the design work before color is added.
3. **Restraint is part of quality.** The discipline to not-add is as important as the craft to build.
4. **Every color is a token.** No hardcoded hex in component styles.
5. **Copy is design.** Specific copy is non-negotiable across all directions.
6. **Direction-appropriate motion.** TM is restrained. DE is micro-interaction-rich. VP is bouncy. EL is cinematic.
7. **Don't blend directions on first pass.** Pick one, commit, refine.
8. **Anti-AI-slop is non-negotiable.** Output must not be recognizable as AI-generated from visual patterns.

---

## Stack

Default:
- React + Next.js (App Router)
- Tailwind CSS mapped to CSS custom properties
- TypeScript
- shadcn component conventions
- Framer Motion
- Lucide React

Vanilla CSS + React-via-CDN when the brief calls for it.

---

## Contributing

UI Craft grows by adding recipes, patterns, palettes, and anti-patterns. Every directory has a `_template.md` explaining conventions.

**PRs welcome for:**
- New full-site recipes (especially niche product categories, more direction variants)
- New signature patterns (with JSX + CSS + direction metadata + adaptation rules)
- New palette families with real-product examples
- New anti-patterns with specific failure descriptions
- New production reference site deconstructions
- New directions (rare — requires showing a distinct aesthetic not covered by TM/DE/VP/EL)

See `CONTRIBUTING.md` and `maintenance/`.

---

## License

MIT. Build whatever you want with it.

---

## Why this exists

Most AI UI generation produces the same site: centered hero, purple gradient, three icon cards, CTA with a glow. It's one aesthetic, badly done, applied to every product regardless of category.

Real design isn't one aesthetic — it's four (at least). A developer tool should look different from a portfolio should look different from a consumer app should look different from a luxury product launch. UI Craft encodes the judgment to pick the right one *and* the craft system to execute it at specialist-caliber.

If you ship products on the web and you use Claude or any capable coding assistant, install it. The difference is what "a real designer made this" looks like — in any of four directions.
