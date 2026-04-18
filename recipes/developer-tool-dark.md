# Recipe: Developer Tool — Dark Technical

**Project type:** Developer tool / DevOps / CI / infra / API / CLI marketing site
**Default direction:** TM (Technical-Minimal)
**Also supports:** DE (for designer-engineer-authored dev tools, e.g., shadcn-flavored or Rauno-adjacent)

**This is the Foundry recipe.** The "single-prompt → Foundry-quality site" path.

### If direction is DE (alternate)
- Switch palette to graphite (`oklch(0.11 0 0)` bg) or paper (`oklch(0.98 0 0)` bg)
- Replace feature tablist with indexed numbered rows (hairline-divided)
- Add letter-stagger hero, magnetic CTA, cursor-spotlight on feature cards
- Drop the mint/cyan accent; DE is often accentless
- Replace centered nav pill with left-aligned wordmark + right-aligned mono nav
- Reduce page to ~70% of TM's section count; DE breathes more

---

## Scope

**Use for:**
- Deploy platforms, CI/CD, build tools
- Observability, logs, metrics, tracing
- Databases, data infrastructure, ETL
- API platforms, SDK homepages, developer APIs
- CLI tools and terminal-first products
- Edge/serverless/runtime products

**Not for:**
- Consumer apps (use `consumer-product-warm.md`)
- B2B finance/HR (use `b2b-saas-sober.md`)
- Marketing/editorial/design studios (use `editorial-brand.md`)
- AI model or agent platforms (use `ai-product-dark.md`)

---

## Design System

- **Blueprint:** Spatial Immersive × Command Center blend
- **Palette:** `core/token-system.md` → Dark Technical
- **Accent default:** mint (`oklch(0.88 0.14 155)`)
  - Accept user requests for violet / sky / amber / rose — wire via `[data-accent=...]`
- **Typography:** Inter Tight (body+display) + JetBrains Mono (labels/metrics) + Instrument Serif italic (one editorial moment only)
- **Density:** comfortable default, expose `[data-density]` switch in a TweaksPanel
- **Radius:** medium default, expose `[data-radius]` switch

---

## Section Order (ship all 10)

| # | Section | Required | Job |
|---|---|---|---|
| 1 | `Nav` | ✅ | Brand + mega menu + command palette trigger + sign-in / primary CTA. Sticky with backdrop blur. Border appears only after scroll. |
| 2 | `Hero` | ✅ | Split layout: left = eyebrow + headline + subhead + primary/secondary CTA + metric row (3 numbers). Right = signature interactive (Terminal). |
| 3 | `LogoMarquee` | ✅ | Horizontal marquee of 12+ customer logos/names. Use plain SVG marks, not raster logos. |
| 4 | `Features` | ✅ | Not a 3-col icon grid. Use a vertical tablist: 4–6 features, each with a rich right-side illustration/preview that swaps on tab click. |
| 5 | `HowItWorks` | ✅ | 3–4 steps with code snippets OR a drag-and-drop pipeline visual. Each step has a mono label, title, body, and a concrete artifact. |
| 6 | `Stats` | ✅ | 3–5 animated counters with labels. Mono font on numbers. Subtle sparklines optional. |
| 7 | `Showcase` | ⭕ | Comparison slider OR product screenshot carousel with dot nav. Drop if the recipe-required interactive is already placed. |
| 8 | `Pricing` | ✅ | 3 tiers. Monthly/Yearly toggle with savings badge. Featured plan has `color-mix(accent, line)` border, not a glow. Each tier lists 5–7 concrete capabilities. |
| 9 | `FAQ` | ✅ | 6 accordion items. Questions must sound like real objections. Answers 1–3 sentences. |
| 10 | `CTABanner` | ✅ | Grid-lines background with radial mask. Single headline, two CTAs, small trust line below. |
| 11 | `Footer` | ✅ | 4 columns (Product / Developers / Company / Legal) + brand block + status pill + copyright. |
| 12 | `TweaksPanel` | ⭕ | Floating bottom-right panel with accent/density/radius switches. Optional but a huge quality signal — ship it. |
| 13 | `CommandPalette` | ✅ | Cmd+K overlay. Grouped results. Mono labels. Keyboard-navigable. Bind to ⌘K globally. |

---

## Signature Interactive Patterns

Every developer-tool site must ship **at least three** of these from `components/patterns/`:

- **Required:** `terminal-panel.md` — animated command scripts in the hero
- **Required:** `command-palette.md` — Cmd+K overlay
- **Required:** `scroll-reveal.md` — every below-fold section
- Highly recommended: `comparison-slider.md` in Showcase
- Highly recommended: `tweaks-panel.md` floating bottom-right
- Highly recommended: `pricing-toggle.md` with savings pill
- Highly recommended: `faq-accordion.md`

Dropping the terminal or command palette strips the recipe's identity. They are the point, not garnishes.

---

## Voice Cues

**Allowed:**
- Specific verbs: ship, deploy, roll back, promote, preview, observe, trace, bisect, pin, index, shard
- Concrete nouns: p95, cold start, canary, edge region, webhook, worker, pipeline, revision, commit, branch
- Real-feeling numbers: `99.97%`, `38ms`, `1,247 teams`, `4 services in 6.3s`
- Quiet authority: "Ship software like you mean it." / "Preview every branch. Roll back in seconds."

**Forbidden phrases (do not write anywhere):**
- "Streamline your workflow"
- "Unlock the power of"
- "Powerful features for modern teams"
- "Built for teams of all sizes"
- "The all-in-one platform"
- "Revolutionize your X"
- "Take X to the next level"

**Hero headline template:** `[Imperative verb] [the job] [qualifier].` Examples:
- "Ship software like you mean it."
- "Roll back before the pager goes off."
- "Every preview. Every branch. Every time."

**Subhead template:** `[Product name] is the [specific category] for [specific audience] who [specific pain].`

---

## Minimum Data Plausibility

Ship the site with these pre-populated:

- **Brand name:** invented but plausible (Foundry, Helios, Stratus, Parallax, Obsidian, Northwind — short, 2-3 syllables, no made-up-word vibes)
- **Customer logos (≥12):** pick from: Nomad Labs, Northwind, Obsidian, Helios, Parallax, Quadrant, Rally, Lumen, Stratus, Umbra, Veridian, Atlas, Vellum, Praxis, Meridian
- **Hero metrics (exactly 3):**
  - Uptime: `99.97%` or `99.99%` over last 90d
  - Latency: `38ms` or `142ms` p50/p95
  - Scale: `1,247 teams` or `4.2M deploys`
- **Terminal scripts (≥3):** one deploy flow, one logs tail, one rollback flow — see `components/patterns/terminal-panel.md` for ready-made scripts
- **Pricing tiers:** Hobby ($0) / Pro ($20/mo per seat) / Enterprise (Contact)
- **FAQ questions:** write from the POV of a skeptical staff engineer evaluating the tool:
  - "How is this different from [obvious competitor]?"
  - "What happens when we hit the edge case of [plausible failure]?"
  - "Can we self-host?" / "Is my data encrypted at rest?" / "What's your SLA?"

---

## Failure Signals

Restart from the protocol if you catch any of these:

- ❌ Hero headline is a value prop paragraph instead of a sentence with a verb
- ❌ Feature section is a 3-col grid of icon + title + paragraph — should be a tablist with a rich preview pane
- ❌ No terminal or command palette anywhere on the page
- ❌ Stats are `100+` or `1M+` or `24/7` — low-effort round numbers
- ❌ Any gradient text, gradient button, or gradient blob behind the headline
- ❌ "Sign up free" instead of "Start free" (or similar weak verb choice)
- ❌ Pricing toggle is monthly-only with no yearly/savings badge
- ❌ FAQ questions sound like the company wrote them to themselves

---

## One-Prompt Invocation Example

When the user says `generate a landing page for a CI/CD platform`, this recipe + the protocol produces:

```
VISION: Spatial Immersive × Command Center for a CI/CD platform called Foundry.
Point of view: "Ship software like you mean it." Preview every branch, roll back in
seconds. Developer-first voice — specific verbs, real numbers. Rejected: generic
3-col feature grid, purple gradient fog, "streamline your workflow" copy.

DESIGN SYSTEM: Dark Technical tokens (bg #0b0e13, 4-tone text, OKLCH mint accent
with violet/amber/sky/rose themes behind [data-accent]). Inter Tight + JetBrains
Mono. Density + radius exposed via TweaksPanel.

ARCHITECTURE: Nav · Hero(split + Terminal) · LogoMarquee · Features(tablist) ·
HowItWorks(pipeline) · Stats · Showcase(comparison slider) · Pricing · FAQ ·
CTABanner · Footer · CommandPalette · TweaksPanel.

CODE: [full implementation, all sections, no truncation]
```
