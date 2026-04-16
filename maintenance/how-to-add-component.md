# How to Add a Component Pattern

Step-by-step guide for adding a new component pattern file.

---

## Step 1: Verify it's needed

Before adding, grep the existing component files to confirm the component type doesn't already exist:
```
Grep for the component name across components/**/*.md
```

If it exists: add to the existing file as a new variant or section.
If it doesn't exist: proceed to step 2.

## Step 2: Identify the correct subdirectory

| Component type | Directory |
|---|---|
| Navigation (navbar, sidebar, breadcrumbs, tabs) | `components/navigation/` |
| Hero/above-fold sections | `components/heroes/` |
| Content display (cards, feature sections, tables, grids) | `components/content/` |
| User actions (buttons, CTAs, toggles) | `components/actions/` |
| Forms and input collection | `components/forms/` |
| Feedback and status (toasts, skeletons, empty states, alerts) | `components/feedback/` |
| Commerce (pricing, checkout, cart) | `components/commerce/` |
| Data visualization (dashboards, metrics, charts) | `components/data/` |
| Page layout and composition | `components/layout/` |

If none fit: create a new subdirectory with a clear categorical name. Add it to `_index.md`.

## Step 3: Copy `_template.md`

Copy `components/_template.md` to the correct subdirectory:
```
[component-type]-patterns.md
```

## Step 4: Fill all required sections

Required sections (no placeholders allowed):
- Mental model
- Anatomy table
- Interaction states table
- At least one complete working code example
- Integration notes (shadcn, TypeScript interface)
- Quality benchmarks (specific and verifiable)
- Anti-patterns (name the AI failure modes specific to this component)
- Blueprint-specific notes (all 5 blueprints)

## Step 5: Update `_index.md`

Add the new file to the correct table in `components/_index.md`.

## Step 6: Check quality bar

Before committing, verify:
- [ ] All code examples are complete — no `// ...` truncation
- [ ] TypeScript interface is explicit (no `any`)
- [ ] Anti-patterns are specific to this component type
- [ ] Blueprint notes cover all 5 blueprints
- [ ] Quality benchmarks are verifiable, not vague ("has accessible focus rings" not "looks good")
