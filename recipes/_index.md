# Full-Site Recipes

Recipes are the **one-prompt blueprints** for complete sites. Each recipe pins down project type, supported directions, section order, signature patterns, and voice cues so the output is specific from first generation.

> If a user asks for "a landing page for X" — this directory is where you start. Lock direction (from `core/design-directions.md`), pick the recipe that matches project type, then run the protocol in `core/site-generation-protocol.md`.

---

## Recipe × Direction Matrix

Pick the recipe whose **project type** matches, then verify your locked direction is in its "Supports" column.

| Recipe | Project type | Default direction | Also supports |
|---|---|---|---|
| [`developer-tool-dark.md`](developer-tool-dark.md) | Developer tool / DevOps / CI | **TM** | DE |
| [`ai-product-dark.md`](ai-product-dark.md) | AI model / agent / LLM tooling | **TM** | DE, VP |
| [`b2b-saas-sober.md`](b2b-saas-sober.md) | B2B SaaS / ops / admin / analytics | **TM** | DE |
| [`consumer-product-warm.md`](consumer-product-warm.md) | Consumer app / productivity / creator | **VP** | EL, DE |
| [`editorial-brand.md`](editorial-brand.md) | Agency / studio / media / publication | **DE** | EL |
| [`dashboard-shell.md`](dashboard-shell.md) | Logged-in app shell | **TM** | DE |
| [`portfolio-designer.md`](portfolio-designer.md) | Designer/engineer personal site | **DE** | EL |
| [`ecommerce-storefront.md`](ecommerce-storefront.md) | E-commerce / storefront | **EL** | VP |

If no recipe matches: pick closest, note adaptation in `[VISION]`, and flag the gap.

---

## How a Recipe is Structured

Every recipe has the same shape:

1. **Project type + supported directions** — the routing metadata
2. **Who it's for / not for** — scopes the recipe
3. **Per-direction adjustments** — what changes if you use DE instead of default TM, etc.
4. **Section order** — numbered list with each section's job and density
5. **Signature interactive patterns** — 2-4 required patterns from `components/patterns/`
6. **Voice cues** — copy examples, forbidden phrases
7. **Minimum data plausibility** — specific names, metrics, logos required
8. **Failure signals** — what a weak version looks like

---

## Rules

- **Lock direction before picking recipe.** See `core/design-directions.md` § How to Lock a Direction.
- **Do not blend directions on first pass.** Pick ONE direction; the whole site is built through its lens.
- **Do not drop signature patterns.** A developer-tool page without a terminal is generic SaaS. A DE portfolio without micro-interactions is TM.
- **Do not weaken the voice.** If the recipe forbids a phrase, do not write it anywhere.
- **Do not skip sections.** If the recipe lists 9 sections, ship 9.
- **Do check the direction section.** Each recipe has per-direction adjustments — read the one that matches your locked direction.
