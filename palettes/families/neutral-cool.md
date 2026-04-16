# Palette Family: Neutral Cool

## Character

Cool gray foundations with a faint blue or blue-gray undertone. The workhouse palette family — professional, legible, scalable, and appropriate across the widest range of product contexts. Communicates efficiency, reliability, and modernity without being cold or clinical. The blue undertone reads as digital-native without being a tech-startup cliché.

---

## Foundation Range

### Light variant (primary for this family)

| Role | Hex | Notes |
|---|---|---|
| Background | `#F8FAFC` | slate-50 — very slightly blue-tinted white |
| Surface | `#FFFFFF` | Cards, panels |
| Surface subtle | `#F1F5F9` | slate-100 — secondary panels |
| Panel elevated | `#FFFFFF` | Modals (with shadow) |
| Border | `#E2E8F0` | slate-200 |
| Border subtle | `#F1F5F9` | slate-100 |
| Border strong | `#CBD5E1` | slate-300 — active/focus |
| Primary text | `#0F172A` | slate-900 |
| Secondary text | `#64748B` | slate-500 |
| Muted text | `#94A3B8` | slate-400 |
| Disabled text | `#CBD5E1` | slate-300 |

### Dark variant

| Role | Hex | Notes |
|---|---|---|
| Background | `#0B1120` | Very dark blue-gray |
| Surface | `#111827` | gray-900 |
| Panel elevated | `#1E293B` | slate-800 |
| Active surface | `#334155` | slate-700 |
| Border | `rgba(148,163,184,0.12)` | slate-400 tinted |
| Border subtle | `rgba(148,163,184,0.07)` | |
| Border strong | `rgba(148,163,184,0.22)` | |
| Primary text | `#F8FAFC` | slate-50 |
| Secondary text | `rgba(248,250,252,0.62)` | |
| Muted text | `rgba(248,250,252,0.38)` | |

**Alternative dark (zinc-based — slightly warmer):**

| Role | Hex |
|---|---|
| Background | `#09090B` |
| Surface | `#18181B` |
| Panel elevated | `#27272A` |
| Border | `rgba(255,255,255,0.08)` |
| Primary text | `#FAFAFA` |

---

## Variation Axes

**More slate (stronger blue undertone):** Use Tailwind's slate scale directly. Background `#F8FAFC`, surface `#F1F5F9`. More obviously "digital" and technical-feeling.

**More zinc (near-neutral):** Use Tailwind's zinc scale. Background `#FAFAFA`, surface `#F4F4F5`. Almost no undertone — approaches monochrome. More versatile, slightly less personality.

**More gray (pure neutral):** Background `#F9FAFB` (gray-50). The reference Tailwind gray — clean, safe, and predictable. Correct for contexts where even a faint blue undertone is too much.

**Higher contrast (accessibility focus):** Increase border to `#CBD5E1`, text to `#0F172A` solid, panel backgrounds clearly differentiated. Use when the product has high accessibility requirements.

---

## Accent Compatibility

Cool neutrals pair cleanly with a wide range of accents. Blue accents create cohesion (same temperature family). Other colors provide differentiation.

| Accent | Hex | Notes |
|---|---|---|
| Blue | `#2563EB` (blue-600) | Cohesive, safe, professional — the most common choice |
| Slate blue | `#4F46E5` (indigo-600) | Slightly more distinctive than pure blue |
| Teal | `#0891B2` (cyan-600) | Fresh, less common, good for SaaS differentiation |
| Violet | `#7C3AED` (violet-600) | Creative, distinctive, some startup connotation |
| Emerald | `#059669` | Clean contrast, fresh, non-standard |
| Amber | `#D97706` | Warm contrast against cool base — distinctive combination |

**Avoid:**
- Warm earthy accents (terracotta, sand) — temperature conflict with the cool base
- Multiple blue-family accents simultaneously
- Neon or ultra-saturated accents — too much contrast against the refined neutral

---

## Typography Interaction

Neutral cool palettes work with almost all typefaces. They are the least constraining family for typeface selection.

**Best approach:** Inter, Geist, or DM Sans for UI. The clean geometry of these typefaces aligns with the cool-digital character. For marketing contexts, consider mixing a display typeface for hero sections.

**Weight:** Standard weight contrast (400/600/700) works well. No special adjustments needed for this family.

**Text color:** Use the full tonal range — `#0F172A` (slate-900) for primary through `#94A3B8` (slate-400) for muted. The cool undertone in the text colors creates cohesion with the panel backgrounds.

**Code and monospace:** Especially clean in neutral-cool systems. The blue undertone in the neutrals pairs well with standard syntax highlighting colors.

---

## Density Guidance

Neutral cool palettes are the best family for high-density layouts. The clean separation between surface tones and the sharp legibility of cool text against cool backgrounds supports dense information architecture.

- **Dense UI (admin, tables, dashboards):** Excellent. Borders are clearly visible, surface layers are distinct, text remains legible.
- **Open marketing layouts:** Good, but needs design intentionality to avoid feeling cold or corporate in consumer contexts.
- **Forms and settings:** The native palette for structured form layouts.

---

## Example Instances

### Instance 1: B2B SaaS Admin (light)
```
background:     #F8FAFC
surface:        #FFFFFF
panel-subtle:   #F1F5F9
border:         #E2E8F0
text-primary:   #0F172A
text-secondary: #64748B
text-muted:     #94A3B8
accent:         #2563EB
```

### Instance 2: SaaS Marketing (dark)
```
background:     #09090B
surface:        #18181B
panel:          #27272A
border:         rgba(255,255,255,0.08)
text-primary:   #FAFAFA
text-secondary: rgba(250,250,250,0.62)
text-muted:     rgba(250,250,250,0.38)
accent:         #3B82F6
```

### Instance 3: Developer Tool (dark slate)
```
background:     #0B1120
surface:        #111827
panel:          #1E293B
border:         rgba(148,163,184,0.14)
text-primary:   #F8FAFC
text-secondary: rgba(248,250,252,0.60)
text-muted:     rgba(248,250,252,0.36)
accent:         #38BDF8
```

---

## When to Use

- B2B SaaS products — the default correct choice for most enterprise product UI
- Admin panels and management interfaces
- Developer tools where the audience is technical but the product is polished
- SaaS homepages with dark variant
- Any product that needs to project reliability, professionalism, and modernity
- When no specific emotional register is required and a neutral-competent foundation is needed

---

## When NOT to Use

- Products needing warmth, approachability, or organic character
- Cultural, creative, or artisan brands where the cool digital feel undermines the identity
- Products in warm-dominant industries (food, hospitality, wellness) at the light end
- When the audience will perceive cool gray as cold, clinical, or impersonal

---

## Blueprint Affinity

| Blueprint | Compatibility | Notes |
|---|---|---|
| Command Center | Medium | Deep-technical is more appropriate for Command Center; neutral-cool dark can work |
| Spatial Immersive | High | The zinc-based dark variant is the canonical Spatial Immersive palette |
| Editorial Brutalism | Medium | Cool monochrome is valid for brutalism but lacks the graphic punch |
| Enterprise Neutral | High | This is the natural palette family for Enterprise Neutral |
| Editorial Warm | Low | Temperature conflict — use neutral-warm instead |
