# Categorization Rules

Decision tree for "where does this new content belong?"

---

## Is it a behavioral rule (applies to all output)?

→ `core/` directory

Examples: gradient policy, motion standard, typography rules, quality bar

**Test:** Would removing this file change the fundamental behavior of the skill? Yes → core.

---

## Is it a pre-generation decision framework?

→ `decisions/` directory

Examples: blueprint selection, component triage, restraint checklist

**Test:** Does it help determine what to do before generating? Yes → decisions.

---

## Is it a complete aesthetic direction system?

→ `blueprints/` directory

**Test:** Does it define a complete set of visual traits (surfaces, typography, motion, composition) for a specific product aesthetic? Yes → blueprints.

---

## Is it a color/palette decision framework?

- Palette family (character + foundation range + variations) → `palettes/families/`
- Accent strategy (how to handle accent color discipline) → `palettes/accents/`
- Industry-specific palette guidance → `palettes/industry/`
- Palette selection logic → `palettes/_selection-logic.md`

---

## Is it a component-level pattern?

→ `components/[category]/`

**Category selection:**
- Navigation elements → `navigation/`
- Hero/above-fold → `heroes/`
- Content display (cards, tables, feature sections, grids) → `content/`
- User actions (buttons, CTAs, toggles) → `actions/`
- Forms and input collection → `forms/`
- Feedback/status (toast, skeleton, empty state, alert) → `feedback/`
- Commerce (pricing, checkout) → `commerce/`
- Data visualization (dashboard, metrics, charts) → `data/`
- Layout/composition → `layout/`

---

## Is it a documented failure mode?

→ `anti-patterns/`

**Test:** Does it describe something that AI generation commonly produces that should be rejected? Yes → anti-patterns.

---

## Is it a reusable generation scaffold?

→ `prompts/[type]/`

- Full page → `pages/`
- Section → `sections/`
- Individual component → `components/`
- Refinement/transformation → `refinement/`
- Adaptation workflow → `adaptation/`

---

## Is it a working implementation?

→ `examples/`

- Complete page → `examples/pages/`
- Self-contained component → `examples/components/`

---

## Is it setup or integration guidance?

→ `integration/`

---

## Is it a governance or maintenance document?

→ `maintenance/`

---

## If uncertain

Ask: who reads this and when?

- A reader determining HOW to generate → decisions/ or prompts/
- A reader determining WHAT aesthetic direction → blueprints/ or palettes/
- A reader determining what PATTERN to use for a component → components/
- A reader setting up a project → integration/
- A reader maintaining this repo → maintenance/
