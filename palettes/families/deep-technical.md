# Palette Family: Deep Technical

## Character

Near-black surfaces with maximum contrast and strict semantic color usage. Designed for interfaces where data is the product — monitoring dashboards, trading terminals, analytics platforms, infrastructure panels. Communicates: precision, control, and high-stakes seriousness. The near-void background makes every piece of information stand out with maximum signal clarity.

---

## Foundation Range

### Dark (only variant — this family has no meaningful light mode)

| Role | Hex | Notes |
|---|---|---|
| Background | `#050505` | Near-void |
| Surface | `#0F0F0F` | Primary panel |
| Panel elevated | `#161616` | Nested panels |
| Active surface | `#1F1F1F` | Selected/hover states |
| Input surface | `#121212` | Form inputs, editable cells |
| Border | `rgba(255,255,255,0.06)` | Default — barely visible |
| Border subtle | `rgba(255,255,255,0.04)` | De-emphasized |
| Border strong | `rgba(255,255,255,0.12)` | Active, focus, or important separation |
| Primary text | `#F5F5F5` | Near-white |
| Secondary text | `rgba(245,245,245,0.58)` | Supporting labels |
| Muted text | `rgba(245,245,245,0.34)` | Metadata, timestamps |
| Disabled text | `rgba(245,245,245,0.20)` | |
| Code / mono text | `#E4E4E7` | Slightly dimmer for code readability |

### Semantic colors (strictly functional — not decorative)

| State | Hex | Usage |
|---|---|---|
| Positive / live | `#00FF66` | Active status, positive delta, success |
| Danger / critical | `#FF3347` | Error, critical alert, negative delta |
| Warning / degraded | `#F59E0B` | Warning, degraded state |
| Neutral active | `#E5E5E5` | Selected state when color would be misleading |
| Info | `#38BDF8` | Informational, selected in non-status contexts |

---

## Variation Axes

**Softer (less void-like):** Background `#0A0A0A`, surface `#141414`, panel `#1C1C1C`. Slightly more approachable while retaining the technical character. Use when the audience is technical but the product also has a consumer-facing component.

**Cooler (blue-tinted technical):** Background `#08090E`, surface `#0D0F18`, panel `#141828`. Border `rgba(100,120,200,0.08)`. Shifts toward a "hacker/terminal" aesthetic. Use for developer tools or security products.

**Higher contrast:** Reduce surface steps — jump from `#050505` directly to `#1A1A1A`. Increase border strength to `rgba(255,255,255,0.10)` default. Use for dense, multi-panel monitoring UIs where every panel must be immediately distinguishable.

---

## Accent Compatibility

In deep-technical systems, accent colors are semantic signals, not decorative choices. Select based on what the product monitors or measures.

| Accent | Hex | Best for |
|---|---|---|
| Signal green | `#00FF66` | Status/uptime monitoring, positive metrics, network health |
| Electric blue | `#38BDF8` or `#2563EB` | Development tools, selection states, neutral technical |
| Amber | `#F59E0B` | Financial data tools (standard market color), warning systems |
| Red-orange | `#FF3347` | Alert systems, negative metrics |
| Cyan | `#22D3EE` | Infrastructure, networking, blue-team security |
| Lime | `#84CC16` | Performance metrics, health scores |

**Critical rule:** In this family, use only one non-semantic accent. The semantic triad (green/red/amber) exists for status. One additional non-semantic accent (blue, cyan) for interactive elements and selection. That is the maximum. More colors degrade the signal clarity that defines this aesthetic.

---

## Typography Interaction

Dense technical UIs require typography optimized for scanning at high speed, not reading.

**Monospaced is essential:** All numeric data, IDs, status codes, timestamps, and values should use a monospaced typeface (JetBrains Mono, Fira Code, or `font-mono`). This creates immediate visual separation between labels and values.

**Type for labels:** Small, uppercase, `tracking-wider`, secondary text color. 10–12px. These should recede — the data is the primary content.

**Type for values:** Monospaced, primary text color, slightly larger than labels (14–16px). Tabular figures (`font-variant-numeric: tabular-nums`) for numbers that change — prevents layout shift.

**Scale:** Tight. Nothing above 24px in normal dashboard UI. Large callout metrics (single prominent number) can go to 32–48px. No display-scale type.

**Color in type:** Use semantic green/red for numeric deltas only. Never color a label for decorative purposes.

---

## Density Guidance

Deep technical is designed for maximum density. Tight spacing is a feature.

- Panel internal padding: `p-3` to `p-4` (12–16px)
- Table row height: 36–42px
- Between metric clusters: `gap-2` (8px)
- Section spacing: `p-4` to `p-6` max (16–24px)
- Sidebar: 240–260px wide, icon-collapsible to 56px

Full-bleed layout with minimal page-level padding. The content should occupy the maximum available space.

**Never** use generous spacing in this blueprint to "make it feel premium." Generous spacing is wrong here — it wastes the screen real estate that the user is paying for with data.

---

## Example Instances

### Instance 1: Infrastructure Monitoring
```
background:     #050505
surface:        #0F0F0F
panel:          #161616
active:         #1F1F1F
border:         rgba(255,255,255,0.06)
text-primary:   #F5F5F5
text-secondary: rgba(245,245,245,0.58)
text-muted:     rgba(245,245,245,0.34)
positive:       #00FF66
danger:         #FF3347
warning:        #F59E0B
accent:         #38BDF8
```

### Instance 2: Financial Terminal
```
background:     #040404
surface:        #0C0C0C
panel:          #141414
border:         rgba(255,255,255,0.05)
text-primary:   #EFEFEF
text-secondary: rgba(239,239,239,0.55)
text-muted:     rgba(239,239,239,0.30)
positive:       #22C55E
danger:         #EF4444
warning:        #EAB308
accent:         #F59E0B
```

### Instance 3: Security / Blue Team
```
background:     #08090E
surface:        #0D0F18
panel:          #141828
border:         rgba(100,140,220,0.08)
text-primary:   #E8ECFF
text-secondary: rgba(232,236,255,0.56)
text-muted:     rgba(232,236,255,0.32)
positive:       #22D3EE
danger:         #FF3347
warning:        #F59E0B
accent:         #818CF8
```

---

## When to Use

- Real-time monitoring and observability platforms
- Trading, financial data terminals
- Infrastructure and DevOps dashboards
- Security operations centers
- System administration panels
- Any product where the primary user activity is watching live data and responding to it

---

## When NOT to Use

- Any light-mode-primary interface
- Consumer-facing products where the near-black feels intimidating
- Products needing warmth or approachability
- Marketing pages (the void-like quality works for screenshots in marketing, not for the marketing page itself)
- Documentation or reading-first content

---

## Blueprint Affinity

| Blueprint | Compatibility | Notes |
|---|---|---|
| Command Center | High | This is the canonical palette for Command Center — they were designed together |
| Spatial Immersive | Low | Too dense and technical for the cinematic spatial aesthetic |
| Editorial Brutalism | Low | Wrong register — Brutalism needs graphic quality, not technical precision |
| Enterprise Neutral | Low | Enterprise Neutral defaults to light mode; deep technical is dark-only |
| Editorial Warm | None | Incompatible |
