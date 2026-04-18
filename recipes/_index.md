# Full-Site Recipes

Recipes are the **one-prompt blueprints** for complete sites. Each recipe pins down the blueprint, palette, section order, interactive patterns, and voice direction so the site generates with specificity instead of defaults.

> If a user asks for "a landing page for X" — this directory is where you start. Pick the recipe that matches, read it, then run the protocol in `core/site-generation-protocol.md`.

---

## Picker

| Recipe | Use when the product is... | Reference look |
|---|---|---|
| [`developer-tool-dark.md`](developer-tool-dark.md) | a developer tool, DevOps, CI/CD, infra, CLI, SDK, API, database | Foundry, Vercel, Linear, Resend |
| [`ai-product-dark.md`](ai-product-dark.md) | an AI model, agent platform, inference API, LLM tooling | Anthropic, OpenAI platform, LangSmith |
| [`b2b-saas-sober.md`](b2b-saas-sober.md) | B2B ops software, analytics, admin, HR/finance SaaS | Ramp, Mercury, Attio |
| [`consumer-product-warm.md`](consumer-product-warm.md) | a consumer app, productivity, lifestyle, fitness | Arc, Craft, Readwise |
| [`editorial-brand.md`](editorial-brand.md) | an agency, studio, design shop, media publication | Pentagram, Cosmos, 2advanced-era revivals |
| [`dashboard-shell.md`](dashboard-shell.md) | the actual app shell — not a marketing page | Linear, Datadog, Vercel dashboard |

If no recipe matches: pick the closest and note the adaptation in the [VISION] block of your output. Do not invent a new recipe in-flight — if a pattern is missing often, add it here first.

---

## How a Recipe is Structured

Every recipe is the same shape. Read it top-to-bottom before generating.

1. **Who it's for / not for** — scopes the recipe
2. **Blueprint + palette** — exact blueprint from `blueprints/` and palette from `core/token-system.md`
3. **Section order** — numbered list of sections with their job
4. **Signature interactive patterns** — 1–3 from `components/patterns/` that define the site
5. **Voice cues** — concrete copy examples and forbidden phrases
6. **Minimum data plausibility** — specific names, metrics, logos the recipe needs
7. **Failure signals** — what a weak version of this recipe looks like

---

## Rules when using a recipe

- **Do not blend recipes on the first pass.** Pick one. The whole site is built through its lens.
- **Do not substitute the blueprint mid-generation.** If the recipe says Spatial Immersive × Command Center, both apply throughout.
- **Do not drop the signature patterns.** A developer-tool page without a terminal or command palette is a generic SaaS page. The pattern is the point.
- **Do not weaken the voice.** If the recipe forbids "Streamline your workflow," do not write it anywhere — not in hero, not in features, not in footer.
- **Do not skip sections.** If the recipe lists 9 sections, ship 9. Cutting is a refinement pass, not a first-generation move.
