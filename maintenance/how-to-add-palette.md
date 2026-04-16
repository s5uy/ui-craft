# How to Add a Palette

Adding a new palette family, industry file, or accent strategy document.

---

## Adding a Palette Family

### Step 1: Determine if it's a new family or a variation

Ask: does this palette have a fundamentally different character from all existing families, or is it a variation within an existing family?

- Same character, different calibration → add as a variation axis in the existing family file
- Different character → new family file

**Existing families:** monochrome-systems, neutral-warm, neutral-cool, deep-technical, paper-editorial, earth-organic, high-trust

### Step 2: Copy `families/_template.md`

```
palettes/families/[new-family-name].md
```

### Step 3: Fill all sections

Required:
- Character description
- Foundation range (light + dark, if applicable)
- Variation axes (at least 3)
- Accent compatibility table
- Typography interaction
- Density guidance
- 3 example instances with specific hex values
- When to use / when not to use
- Blueprint affinity table (all 5 blueprints)

### Step 4: Update indexes

- Add to `palettes/_index.md` families table
- Add to `palettes/_selection-logic.md` product-type mapping if the family fills a new gap

---

## Adding an Industry File

### Step 1: Copy `industry/_template.md`

```
palettes/industry/[industry-name].md
```

Use the canonical industry name format (kebab-case, see `maintenance/naming-conventions.md`).

### Step 2: Fill all sections

Required:
- Industry context (2–3 sentences on stakes, user needs)
- Default AI archetype (what the AI generates by default, why it fails)
- 2–3 recommended palette families with reasoning
- Accent strategy specific to this industry
- Typography integration notes
- 3 anti-patterns specific to this industry

### Step 3: Update indexes

- Add to `palettes/_index.md` industry table

---

## Adding an Accent Strategy File

Only add a new accent strategy file if it covers a genuinely new accent approach not covered by the 4 existing files (single, functional, dual, no-accent). This is rare.

If needed: add to `palettes/accents/` and update `palettes/_index.md`.
