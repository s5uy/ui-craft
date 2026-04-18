# UI Craft

**Turn a single prompt into a Foundry-quality site.** UI Craft is a skill for Claude (and other AI coding assistants) that replaces the default AI-slop visual vocabulary with a principal-designer's judgment, a real token system, and copy-paste interactive patterns.

> Ask Claude for "a landing page for a CI/CD platform" — get a complete site with command palette, animated terminal, comparison slider, live theme switcher, realistic copy, and a full token system. Not a hero stub. Not a purple gradient. A site.

---

## Before / After

**Without UI Craft:**
- Purple-blue gradient blob behind the hero headline
- Three-column icon feature grid
- Glowing CTA button
- `Streamline your workflow with our powerful platform`
- `1M+ happy users`
- Random Tailwind `blue-600` as the accent

**With UI Craft:**
- Token-driven dark surface, OKLCH mint accent, no gradient fog
- Hero split with animated multi-tab terminal scripting a real deploy
- Feature tablist with rich preview panels — not a 3-col icon grid
- `Ship software like you mean it. Preview every branch, roll back in seconds.`
- `99.97% uptime, 38ms cold start, 1,247 teams shipping on Foundry`
- `[data-accent]` theme switcher exposed to users, not hardcoded to one color

---

## What's in the box

- **A full-site generation protocol** — 6-step discipline for going from one prompt to a complete site without skipping quality steps (`core/site-generation-protocol.md`)
- **6 site recipes** — developer tool, AI product, B2B SaaS, consumer, editorial, dashboard — each pins down blueprint, palette, section order, signature patterns, voice cues, and failure signals (`recipes/`)
- **A canonical token system** — 3 palettes with OKLCH accents, density multiplier, radius variants, theme switchers, Tailwind mapping (`core/token-system.md`)
- **A copy-paste interactive pattern library** — terminal panel, command palette, comparison slider, feature tablist, pricing toggle, FAQ accordion, tweaks panel, scroll reveal, eyebrow, marquee, counter, more (`components/patterns/`)
- **5 blueprints** — Command Center, Spatial Immersive, Editorial Brutalism, Enterprise Neutral, Editorial Warm (`blueprints/`)
- **A production reference site** — Foundry, fully documented with a 12-point quality deconstruction (`site-examples/foundry.md`, raw source in `site1/`)
- **Anti-pattern library** — what AI-slop looks like, why it happens, and how to route around it (`anti-patterns/`)
- **Section, component, page, and adaptation prompts** — when you want to target a single piece instead of a full site (`prompts/`)

---

## Installation

```bash
# Global install
npm install -g @s5uy/ui-craft

# In your project
cd /path/to/your/project

# Install for your AI assistant
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

Once installed, these prompts produce complete, production-ready sites:

```
Build me a landing page for a CI/CD platform
```

```
Generate a marketing site for a serverless database. Dark, technical, Linear-quality.
```

```
Create a homepage for an AI eval platform. Include the benchmark table.
```

```
Design a dashboard shell for a logs product. Command Center blueprint.
```

Every response follows the [VISION] · [DESIGN SYSTEM] · [ARCHITECTURE] · [CODE] · [INTERACTION NOTES] format, ships complete code, and passes the Foundry Replication Checklist.

---

## The Foundry Standard

There is exactly one quality target: the Foundry reference site. It lives in [`site1/`](site1/) as raw HTML/JSX/CSS and is deconstructed pattern-by-pattern in [`site-examples/foundry.md`](site-examples/foundry.md).

Every site UI Craft ships should feel like it could sit next to Foundry without apology. The Replication Checklist in that file is what the skill validates against before sending a response.

---

## Repository Structure

```
ui-craft/
├── SKILL.md                  # Entry point — behavioral router
├── core/                     # Philosophy, protocols, token system, quality bar
│   ├── site-generation-protocol.md
│   ├── token-system.md
│   ├── philosophy.md
│   ├── quality-bar.md
│   ├── content-standard.md
│   ├── code-standard.md
│   ├── motion-standard.md
│   ├── gradient-policy.md
│   ├── typography-system.md
│   └── color-philosophy.md
├── recipes/                  # Full-site blueprints (pick one, ship whole site)
│   ├── developer-tool-dark.md
│   ├── ai-product-dark.md
│   ├── b2b-saas-sober.md
│   ├── consumer-product-warm.md
│   ├── editorial-brand.md
│   └── dashboard-shell.md
├── blueprints/               # Style directions (composable by recipes)
├── palettes/                 # Palette families, selection logic, industry guidance
├── components/
│   ├── patterns/             # Signature interactive patterns (terminal, ⌘K, slider, …)
│   └── library/scraped/      # Curated Class A premium component references
├── decisions/                # Design judgment frameworks
├── anti-patterns/            # What AI-slop looks like, why, and how to avoid it
├── prompts/                  # Section / component / page generation scaffolds
├── integration/              # shadcn / Tailwind / Next.js setup guidance
├── examples/                 # Working example implementations
├── site-examples/            # Deconstructions of production reference sites
└── maintenance/              # Governance for extending the skill
```

---

## Core Principles

1. **Hierarchy first.** Users know what this is, why it matters, where to look, what to do next — within three seconds.
2. **Typography carries the design.** Not color. Not effects. Type scale and weight do the heavy lifting.
3. **Gradients are not the default.** A premium design survives with almost none. Every gradient needs a justification.
4. **Restraint is part of quality.** The discipline to not-add sections is as important as the craft to build them.
5. **Every color is a token.** No hardcoded hex in component styles. Every site ships on a CSS custom property system.
6. **Copy is design.** `Ship software like you mean it` is a design decision. `Streamline your workflow` is a failure state.
7. **Anti-AI-slop is non-negotiable.** The output must not be recognizable as AI-generated from its visual patterns.

---

## Stack

Default:
- React + Next.js (App Router)
- Tailwind CSS mapped to CSS custom properties
- TypeScript
- shadcn component conventions
- Framer Motion
- Lucide React

Vanilla CSS + React-via-CDN when the brief calls for it (Foundry itself uses this — fast, zero-build).

---

## Contributing

UI Craft grows by adding recipes, patterns, palettes, and anti-patterns. Every directory has a `_template.md` and a `maintenance/` doc explaining how to extend it cleanly.

**PRs welcome for:**
- New full-site recipes (especially niche product categories)
- New signature patterns (with JSX + CSS + adaptation rules)
- New palette families with real-product examples
- New anti-patterns with specific failure descriptions
- New production reference site deconstructions

See `CONTRIBUTING.md` and `maintenance/` for conventions.

---

## License

MIT. Build whatever you want with it.

---

## Why this exists

Most AI UI generation produces the same site: centered hero, purple gradient, three icon cards, CTA with a glow. The patterns are so consistent they are recognizable at a glance — "oh, that's an AI-generated site."

UI Craft is the encoded judgment of a principal product designer and a senior frontend engineer that rejects those defaults and commits to specific, opinionated, hand-tuned output instead. It is what the difference looks like when the model has a point of view.

If you ship products on the web and you use Claude (or any capable coding assistant), install it and see what your default prompts produce next.
