# Page Prompt: Pricing Page

---

## Pre-Generation Decisions

1. **Number of tiers:** 2 / 3 / custom enterprise
2. **Billing toggle:** yes (monthly/annual) / no
3. **Annual discount:** [X%]
4. **Which tier is recommended?** (middle is conventional)
5. **Free tier:** yes/no
6. **Features per tier:** [list features for each, specify what differs]
7. **Trust signals:** no credit card / free trial / cancel anytime / money-back guarantee

---

## Generation Scaffold

```
Generate a complete pricing section for [product name].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]

**Pricing structure:**
- Tiers: [number]
- Annual toggle: [yes/no]
- Annual discount: [X%]
- Recommended tier: [name]

**Tier definitions:**
Tier 1: [name]
- Price: $[X]/mo, $[Y]/mo annual
- Description: [1 sentence]
- Features: [list]
- CTA: "[label]" → [href]

Tier 2: [name] [RECOMMENDED]
- Price: $[X]/mo, $[Y]/mo annual
- Description: [1 sentence]
- Features: [list — include everything from tier 1 plus these]
- CTA: "[label]" → [href]

Tier 3: [name] (if enterprise)
- Price: Custom
- Description: [1 sentence]
- Features: [list]
- CTA: "Contact sales" → /contact

**Trust note:** "[No credit card required. Cancel anytime. 14-day free trial.]"

**Design rules:**
- Recommended tier uses elevation/contrast, not gradient
- Prices in `font-mono text-4xl tabular-nums`
- Annual savings shown clearly when toggle is in annual mode
- Feature list uses `<Check />` icons from lucide-react
- No gradient on any card background

**Output the complete pricing section component with billing toggle.**
```

---

## Quality Criteria

- [ ] Toggle correctly switches prices between monthly and annual
- [ ] Annual savings displayed on toggle or per-tier
- [ ] Recommended tier visually elevated (border, shadow, or background contrast) — no gradient
- [ ] Prices in monospace font with `tabular-nums`
- [ ] Feature lists use semantic checkmark icons (not emoji)
- [ ] Trust note present below cards
- [ ] CTA per tier with appropriate labels
