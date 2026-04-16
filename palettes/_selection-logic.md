# Palette Selection Logic

Use this decision framework to choose a palette direction before generating any UI. Do not pick a palette because it looks good in isolation — pick it because it is correct for the product.

---

## Step 1: Identify Product Type

| Product type | Start with this family |
|---|---|
| Developer tool, CLI product, API-first | `monochrome-systems` or `deep-technical` |
| Infrastructure, monitoring, DevOps | `deep-technical` |
| Financial terminal, trading, analytics | `deep-technical` or `high-trust` |
| B2B SaaS, admin panel, internal tools | `neutral-cool` |
| Consumer SaaS, productivity app | `neutral-cool` or `neutral-warm` |
| Startup marketing / SaaS homepage | `neutral-cool` (dark) or `monochrome-systems` |
| Content platform, blog, documentation | `paper-editorial` or `neutral-warm` |
| Health, wellness, fitness | `earth-organic` or `neutral-warm` |
| Finance, banking, insurance | `high-trust` |
| Healthcare, medical | `high-trust` or `neutral-cool` |
| Creative agency, studio, portfolio | `monochrome-systems` or `earth-organic` |
| Fashion, luxury, cultural institution | `monochrome-systems` (high contrast) |
| Ecommerce, DTC brand | Depends on brand character — see industry file |
| Food, beverage, hospitality | `earth-organic` or `neutral-warm` |
| Legal, compliance, government | `high-trust` |

This gives you a starting family. Proceed to Steps 2 and 3 to refine.

---

## Step 2: Apply Trust and Formality Filter

Trust requirements shift the palette within a family:

| Trust level | Effect on palette |
|---|---|
| **Low** (entertainment, exploration, creative) | Can go expressive — full range of the family, bolder accent |
| **Medium** (productivity, communication) | Stay within the family, moderate accent |
| **High** (finance, legal, health data) | Conservative end of the family, muted accent, lean toward `high-trust` |
| **Very high** (banking, medical, government) | `high-trust` only, semantic-only accent, no decorative color |

---

## Step 3: Apply Emotional Register Filter

Emotional register determines warmth/coolness and surface treatment within the family:

| Target feeling | Palette adjustment |
|---|---|
| **Calm, steady** | Mid-range neutrals, low contrast accent, generous surface separation |
| **Technical, precise** | Cool or near-black, monospaced accent hints, maximum tonal contrast |
| **Warm, approachable** | Warm gray or paper base, softer accent, cream-adjacent tones |
| **Authoritative** | Deep surfaces or heavy neutrals, conservative accent, minimal color |
| **Energetic, dynamic** | Lighter base with higher accent saturation, tighter spacing |
| **Premium, expensive** | Near-neutral accent (off-white, warm silver), restrained, sparse color |

---

## Step 4: Choose Accent Strategy

After choosing the palette family, choose the accent strategy. These are independent decisions.

| Situation | Accent strategy |
|---|---|
| Single primary action matters most | `single-accent-systems` — one color, strict discipline |
| Data-dense interface where color must mean something | `functional-accents` — semantic only |
| Product with primary + secondary action hierarchy | `dual-accent-systems` — only if genuinely needed |
| Monochrome brand where color weakens the identity | `when-to-reject-color` — consider no decorative accent |

**Default:** When unsure, use `single-accent-systems`. This is correct for the majority of products.

---

## Step 5: Apply Industry Calibration

After selecting family and accent strategy, check the relevant industry file for domain-specific adjustments:

- Fintech → `industry/fintech.md`
- Healthcare → `industry/healthtech.md`
- Developer tools → `industry/developer-tools.md`
- Consumer SaaS → `industry/consumer-saas.md`
- Enterprise B2B → `industry/enterprise-b2b.md`
- Creative agency → `industry/creative-agency.md`
- Ecommerce → `industry/ecommerce.md`

Industry files override or refine the general family guidance where domain conventions exist.

---

## Common Selection Paths

These are the most frequently correct combinations:

**SaaS marketing homepage (B2C):**
`neutral-cool` (dark variant) + `single-accent-systems` + one brand-specific accent

**B2B SaaS product UI:**
`neutral-cool` (light variant) + `single-accent-systems` + restrained blue accent

**Developer tool / CLI product:**
`monochrome-systems` + `functional-accents` (or single muted accent)

**Data dashboard / monitoring:**
`deep-technical` + `functional-accents`

**Documentation / blog:**
`paper-editorial` + `single-accent-systems` (link color only)

**Creative agency:**
`monochrome-systems` (high contrast) + `single-accent-systems` (one bold ink color)

**Health / wellness consumer:**
`earth-organic` + `single-accent-systems` (muted natural accent)

**Finance / compliance:**
`high-trust` + `functional-accents`

---

## What to Avoid in Selection

**Do not select based on trend.** Dark + neon green is trendy. Dark + amber is trendy. These are correct for specific products; they are not defaults.

**Do not select based on what looks impressive.** Deep-technical palettes look dramatic. They are not appropriate for a consumer app, a documentation site, or a B2B admin panel.

**Do not force warmth where the product requires formality.** Earth tones on a compliance product undermine trust. The palette must match what users expect to feel.

**Do not import a palette from a reference component without recalibrating it.** A glowing neon-green accent from a monitoring dashboard demo is not appropriate as-is for a consumer SaaS product. Always recalibrate to the product's context.
