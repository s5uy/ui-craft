# Palette Family: High Trust

## Character

Conservative, institutional, and deliberately un-exciting. Communicates safety, reliability, and professional responsibility. Used in contexts where the user is placing trust in the product with money, health, legal standing, or compliance. The palette signals: we are serious, we will not surprise you, and your data is safe here. The absence of visual risk-taking IS the design statement.

---

## Foundation Range

### Light variant (primary — most high-trust products are light-mode-first)

| Role | Hex | Notes |
|---|---|---|
| Background | `#F7F8FA` | Slightly cool, near-clinical white |
| Surface | `#FFFFFF` | Cards, panels |
| Surface subtle | `#EFF1F5` | Secondary panels, table rows |
| Panel elevated | `#FFFFFF` | Modals (with shadow) |
| Border | `#DDE1EA` | Clean, precise separation |
| Border subtle | `#E8ECF2` | De-emphasized |
| Border strong | `#C5CDD9` | Active, focus, important |
| Primary text | `#0D1526` | Deep navy-black |
| Secondary text | `#5B6B8A` | Muted blue-gray |
| Muted text | `#8A99B2` | Labels, captions |
| Disabled text | `#C0C8D8` | |

### Dark variant (secondary — offer only if product truly needs dark mode)

| Role | Hex | Notes |
|---|---|---|
| Background | `#0C1628` | Deep navy |
| Surface | `#111E38` | Panel |
| Panel elevated | `#182646` | |
| Border | `rgba(180,200,240,0.10)` | Cool blue-tinted borders |
| Primary text | `#EEF2FA` | Cool off-white |
| Secondary text | `rgba(238,242,250,0.62)` | |
| Muted text | `rgba(238,242,250,0.38)` | |

---

## Variation Axes

**More blue (banking/institutional):** Shift toward a stronger blue undertone. Background `#F5F8FF`, surface `#FFFFFF`, border `#D5DCF0`. Primary text `#0A1540`. Classic banking palette territory.

**More neutral (legal/compliance):** Reduce the blue undertone. Background `#F8F9FA`, border `#DDE0E6`. Warmer primary text `#1A1F2E`. More generic professional, less obviously financial.

**Higher contrast (accessibility-critical):** Background `#FFFFFF` pure, border `#C5CDD9`, text `#0D1526` solid. Use when the product has strict accessibility requirements (healthcare, government).

**Deep navy (premium financial):** Background `#0A1628`, surface `#112040`. Communicates premium wealth management, private banking. Use with gold or warm off-white accents.

---

## Accent Compatibility

High-trust palettes require accents that reinforce trust rather than demanding visual attention.

| Accent | Hex | Notes |
|---|---|---|
| Institutional blue | `#1D4ED8` or `#1E40AF` | The canonical trust color — primary CTA in financial products |
| Teal | `#0F766E` | Healthcare, wellness, insurance — slightly more approachable |
| Navy | `#1E3A5F` | Premium financial, private banking |
| Forest green | `#166534` | Environmental finance, sustainable investment |
| Gold (dark mode only) | `#B8962E` | Premium wealth management, private banking dark mode |

**Avoid:**
- Orange or red as primary accent — associated with urgency/danger in financial contexts
- Purple — reads as trendy, not trustworthy
- Bright or neon colors of any kind
- More than one non-semantic accent color

**Semantic colors are strictly conventional:**
- Success/positive: `#059669` (emerald-600) or `#16A34A`
- Warning: `#D97706` (amber-600)
- Danger/negative: `#DC2626` (red-600)

These must be consistent throughout the entire product. Any deviation undermines the trust signal.

---

## Typography Interaction

High-trust products need typography that projects stability and reliability, not personality.

**Typefaces:**
- Inter, Plus Jakarta Sans, or system-ui — the workmanlike professional defaults
- Avoid: expressive display fonts, anything that draws attention to itself as a typeface
- Exception: premium financial brands may use a high-quality humanist serif for brand headings (Chronicle, Tiempos Headline)

**Scale:** Moderate, never dramatic. Section headings at 18–22px, page headings at 24–28px. No oversized display type in functional UI.

**Weight:** `font-semibold` for headings, `font-normal` for body. No bold-black headlines in product UI.

**Accessibility:** All text must meet WCAG AA contrast ratios. High-trust products frequently face accessibility audits. Never use text opacity below 4.5:1 contrast ratio.

---

## Density Guidance

High-trust products span the full density range:

- **Banking/financial dashboard:** Dense — tables, data, account summaries. Efficient layout.
- **Insurance onboarding:** Forms and structured question flows — moderate density.
- **Healthcare provider portal:** Often very dense — patient records, clinical data.
- **Investment platform:** Moderate density for portfolio views, high density for transaction history.

The palette supports all density levels. The key is that density choices must feel deliberate and functional, never decorative.

---

## Example Instances

### Instance 1: Financial Services Platform (light)
```
background:     #F5F8FF
surface:        #FFFFFF
surface-subtle: #EEF2FA
border:         #D5DCF0
text-primary:   #0A1540
text-secondary: #506080
text-muted:     #8098B8
accent:         #1D4ED8
positive:       #059669
warning:        #D97706
danger:         #DC2626
```

### Instance 2: Healthcare Portal (light, neutral)
```
background:     #F7F8FA
surface:        #FFFFFF
surface-subtle: #EFF1F5
border:         #DDE1EA
text-primary:   #0D1526
text-secondary: #5B6B8A
text-muted:     #8A99B2
accent:         #0F766E
positive:       #16A34A
warning:        #D97706
danger:         #DC2626
```

### Instance 3: Premium Wealth Management (dark)
```
background:     #0A1628
surface:        #111E38
panel:          #182646
border:         rgba(180,200,240,0.10)
text-primary:   #EEF2FA
text-secondary: rgba(238,242,250,0.62)
text-muted:     rgba(238,242,250,0.36)
accent:         #B8962E
positive:       #22C55E
danger:         #EF4444
```

---

## When to Use

- Banking, investment, and financial services
- Insurance products
- Healthcare platforms and patient portals
- Legal tech and compliance tools
- Government services
- Any product where users are trusting it with sensitive personal data, health information, or money

---

## When NOT to Use

- Consumer apps where trust is not the primary concern
- Creative or brand-forward products
- Developer tools where technical authority is the trust signal (use neutral-cool or monochrome instead)
- Products serving audiences who expect and desire visual distinctiveness

---

## Blueprint Affinity

| Blueprint | Compatibility | Notes |
|---|---|---|
| Command Center | Low | Command Center's near-black voids are too dramatic for high-trust contexts |
| Spatial Immersive | Low | Too atmospheric and visual for institutional trust signals |
| Editorial Brutalism | None | Completely incompatible — trust requires convention, brutalism rejects it |
| Enterprise Neutral | High | High-trust is a specialized, more conservative variant of Enterprise Neutral |
| Editorial Warm | Low | Warmth undermines the clinical precision that high-trust contexts require |
