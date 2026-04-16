# Palette System Index

The palette system is adaptive, not prescriptive. It teaches selection logic rather than providing a menu of presets.

---

## System Architecture

| Directory / File | Purpose |
|---|---|
| `_selection-logic.md` | Decision framework for choosing palette direction |
| `families/` | Palette family definitions — foundations, variation axes, usage guidance |
| `accents/` | Accent color strategy — single, dual, functional, and restraint |
| `industry/` | Domain-specific palette calibration |

---

## Palette Families

| Family | Character | Blueprint affinity |
|---|---|---|
| `monochrome-systems` | Pure grayscale + one restrained accent | Command Center, Enterprise Neutral |
| `neutral-warm` | Warm gray foundations, paper undertones | Editorial Warm, Spatial Immersive (warm variant) |
| `neutral-cool` | Cool gray foundations, blue-gray undertones | Enterprise Neutral, Spatial Immersive (cool variant) |
| `deep-technical` | Near-black surfaces, high contrast data focus | Command Center |
| `paper-editorial` | Off-white reading surfaces, ink-like text | Editorial Warm, Editorial Brutalism (light) |
| `earth-organic` | Stone, olive, terracotta, muted naturals | Consumer health/wellness, creative, food |
| `high-trust` | Conservative blues, muted teal, institutional grays | Finance, healthcare, government, compliance |

---

## Accent Strategy

| File | Focus |
|---|---|
| `single-accent-systems` | One accent, maximum discipline — the most common and strongest approach |
| `functional-accents` | Semantic-only color — no decorative accent at all |
| `dual-accent-systems` | When two accents are justified and how to manage them |
| `when-to-reject-color` | When less color produces a stronger result |

---

## Quick Selection

**If unsure where to start:** Begin with the palette family that matches the product's emotional register, then apply the single-accent strategy. This produces correct results 80% of the time.

**For speed:** Use `_selection-logic.md` — it maps product attributes directly to palette recommendations.

---

## Adding Palette Content

- New palette family: copy `families/_template.md`, add entry to this index
- New industry guidance: copy `industry/_template.md`, add entry to this index
- New accent strategy: discuss whether it genuinely differs from existing strategies before adding
