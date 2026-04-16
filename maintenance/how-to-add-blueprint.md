# How to Add a Blueprint

Blueprints are rare additions. The 5 existing blueprints cover the major aesthetic directions. Add a new blueprint only when you have a product category with a genuinely distinct visual language not served by any existing blueprint or blend.

---

## Decision: New Blueprint vs. Blend

First, try to satisfy the need with an existing blueprint or a documented blend:

- Can the product use Enterprise Neutral with a custom palette? → Not a new blueprint
- Is it Editorial Warm with more structure? → Not a new blueprint
- Does it blend Command Center + Enterprise Neutral? → Documented blend, not new blueprint
- Is it a distinct aesthetic direction — different structure, surface treatment, motion tone, and composition principles — from all 5 existing blueprints? → Potentially new blueprint

If you can't identify how the new aesthetic differs from existing blueprints on at least 3 of the 5 dimensions (structure, surfaces, typography, motion, color), it's not a new blueprint.

---

## Process

### Step 1: Copy `blueprints/_template.md`

```
blueprints/[blueprint-name].md
```

Use kebab-case. The name should be evocative and specific: "command-center", not "dark-dashboard."

### Step 2: Fill all required sections

Every section is required — no placeholders:

- Overview: character, best-for, not-for
- Visual Traits: specific, with concrete values (px, hex, opacity)
- Suggested Palette: compatible families
- Typography Direction: sizes, weights, typeface recommendations
- Spacing Logic: density level with concrete values
- Motion Tone: timing, easing, what moves and what doesn't
- Surface Treatment: how depth is achieved (tonal, border, shadow)
- Component Vocabulary: how standard components look in this blueprint
- Anti-Patterns: what would violate this blueprint's character
- Example Products: 3–5 real products that use this aesthetic

### Step 3: Update indexes

- Add to `blueprints/_index.md` table
- Add to `decisions/blueprint-selection.md` selection logic
- Add to all palette family Blueprint Affinity tables
- Update `palettes/_selection-logic.md` if the new blueprint affects palette selection paths
- Reference in `SKILL.md` blueprint index table

---

## Blueprint Quality Bar

A well-written blueprint must be specific enough that two designers reading it independently would produce similar (though not identical) output. If the blueprint description is too general ("clean, minimal, modern"), it will be ignored. Be specific: "near-black (`#050505`) base, `text-xs` monospace for metadata, 40–48px row height for dense tables."
