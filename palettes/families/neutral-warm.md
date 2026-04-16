# Palette Family: Neutral Warm

## Character

Warm gray and cream foundations with natural undertones — the visual equivalent of good paper, soft light, and considered spaces. Communicates: approachability, craftsmanship, humanity, and calm authority. Does not signal coldness or corporate efficiency. The warmth is subtle — it is felt rather than seen, distinguishing this family from overtly "colorful" approaches while remaining richer than pure gray.

---

## Foundation Range

### Light variant (primary for this family)

| Role | Hex | Notes |
|---|---|---|
| Background | `#FDFCF9` | Warm white, slight cream cast |
| Surface | `#F7F5F0` | Panels, cards |
| Surface subtle | `#F0EDE6` | Secondary panels |
| Panel elevated | `#FFFFFF` | Modals, popovers |
| Border | `#DDD9CF` | Default separation |
| Border subtle | `#E8E5DD` | De-emphasized |
| Border strong | `#C4BFB2` | Active/focus |
| Primary text | `#1C1917` | stone-900 — warm near-black |
| Secondary text | `#78716C` | stone-500 |
| Muted text | `#A8A29E` | stone-400 |
| Disabled text | `#D6D3D1` | stone-300 |

### Dark variant

| Role | Hex | Notes |
|---|---|---|
| Background | `#18160F` | Very dark warm brown |
| Surface | `#221F16` | Primary panels |
| Panel elevated | `#2C2920` | Elevated surfaces |
| Active surface | `#363020` | Hover/selected |
| Border | `rgba(245,240,220,0.08)` | Warm-tinted separation |
| Border subtle | `rgba(245,240,220,0.05)` | |
| Primary text | `#F5F0E8` | Warm off-white |
| Secondary text | `rgba(245,240,232,0.62)` | |
| Muted text | `rgba(245,240,232,0.38)` | |

---

## Variation Axes

**More cream (paper-like):** Increase the yellow undertone slightly. Background `#FBF8F2`, surface `#F4F1E8`. Feels like quality stationery. Use for editorial and documentation contexts.

**More stone (sophisticated):** Shift toward stone/sand. Background `#F9F7F4`, surface `#F3F0EA`, border `#D9D4CB`. More restrained, less obviously warm. Good for premium consumer products.

**More amber-warm (inviting):** Background `#FDF9F3`, with amber-tinted borders `#DDD0BA`. Warmer and more approachable. Use for food, hospitality, or warm consumer contexts.

**Darker warm (premium):** Background `#F0EDE6` as the page background creates a deeper "warm gray" that reads as intentional and refined rather than default-white.

---

## Accent Compatibility

Warm neutrals pair best with accents that carry warmth or that contrast cleanly without creating visual dissonance.

| Accent | Hex | Notes |
|---|---|---|
| Warm red | `#DC2626` or `#C2410C` | Classic ink-on-paper contrast, editorial authority |
| Amber | `#D97706` | Warm continuity, natural feel, rich but not playful |
| Forest green | `#16A34A` or `#166534` | Natural, grounded, health-adjacent |
| Indigo | `#4338CA` | Clean contrast against warm base, slightly unexpected |
| Terracotta | `#C2643A` | Very warm, craft and artisan feel |
| Navy | `#1E3A5F` | Authoritative, traditional, pairs with warm editorial |

**Avoid:**
- Electric blue or cyan — creates visual temperature conflict with warm base
- Neon or acid colors — clash with the organic quality of this family
- Pure RGB gray accents — defeats the warmth entirely
- Purple — wrong temperature for this family in most contexts

---

## Typography Interaction

Warm neutral palettes benefit from type that feels grounded rather than digital.

**Best typefaces:** Serifs work especially well (they have inherent warmth through their irregular strokes). Humanist sans (Inter, DM Sans, Lato) work well. Avoid overly geometric or cold sans-serifs.

**Text color calibration:** Use stone or warm-gray-tinted text rather than pure neutral gray. `#1C1917` (stone-900) for primary text instead of `#111111` creates a more cohesive warm palette.

**Weight strategy:** Medium weight contrast (not extreme). Heavy headlines work but should have warmth — `font-bold` rather than `font-black`. Very thin weights feel cold against a warm base.

**Line height:** Slightly generous (`leading-6` to `leading-7` for body) supports the unhurried feel of warm palettes.

---

## Density Guidance

Neutral warm palettes perform best at medium to low density.

- **Dense UI:** Works, but tight spacing can make the palette feel muddy — borders need to be clearly visible. Ensure border contrast is sufficient (`#DDD9CF` may need to be darker for very dense layouts).
- **Open editorial layouts:** This is where the family excels. Generous spacing lets the warm tones breathe and creates a sophisticated, considered feel.
- **Mixed density:** Very good — warm neutrals mediate well between dense information clusters and open negative space.

---

## Example Instances

### Instance 1: Editorial Content Platform
```
background:     #FDFCF9
surface:        #F7F5F0
panel:          #EFECE5
border:         #DDD9CF
text-primary:   #1C1917
text-secondary: #78716C
text-muted:     #A8A29E
accent:         #DC2626
```

### Instance 2: Consumer Wellness App
```
background:     #FDF9F3
surface:        #F5F1E8
panel:          #ECE7DB
border:         #D9D0C0
text-primary:   #1C1917
text-secondary: #6B6056
text-muted:     #9E948A
accent:         #16A34A
```

### Instance 3: Premium Agency (dark warm)
```
background:     #18160F
surface:        #221F16
panel:          #2C2920
border:         rgba(245,240,220,0.08)
text-primary:   #F5F0E8
text-secondary: rgba(245,240,232,0.60)
text-muted:     rgba(245,240,232,0.36)
accent:         #D97706
```

---

## When to Use

- Consumer products where approachability and warmth are brand values
- Editorial, content, and reading-first platforms
- Food, beverage, hospitality, lifestyle products
- Health and wellness consumer apps
- Personal portfolios with a human, craft-focused identity
- Any product that needs to feel human and thoughtful rather than corporate and efficient

---

## When NOT to Use

- High-trust financial or legal products — the warmth reads as informal
- Dense technical tools — the subtle warm undertones can feel soft where sharp contrast is needed
- Products that must signal clinical precision or technical authority
- Contexts where the primary user expectation is speed and efficiency

---

## Blueprint Affinity

| Blueprint | Compatibility | Notes |
|---|---|---|
| Command Center | Low | Too warm and organic for the precise, high-contrast technical aesthetic |
| Spatial Immersive | Medium | Warm variant of Spatial Immersive works; default Spatial is cooler |
| Editorial Brutalism | Medium | Warm brutalism is valid for cultural/editorial contexts; not for graphic agency |
| Enterprise Neutral | Low | Neutral cool is more appropriate for enterprise |
| Editorial Warm | High | This is the natural palette family for Editorial Warm — the two are designed together |
