# Component Patterns — Index

Reference patterns for every major UI component category. Each file documents anatomy, interaction model, state requirements, integration guidance, quality benchmarks, and anti-patterns for a specific component type.

---

## Architecture

Component pattern files are not component libraries. They do not contain every possible variant. They contain:
- The correct mental model for each component type
- The interaction states that must be implemented
- The adaptation rules when working from a reference component (Class A/B/C)
- The specific anti-patterns AI generation produces for this component type
- Quality benchmarks — what a production-grade version looks like

---

## Directory

### Navigation

| File | Component Type | Key Concerns |
|---|---|---|
| `navigation/navbar-patterns.md` | Top navigation bars | Hierarchy, active state, mobile |
| `navigation/sidebar-patterns.md` | Side navigation | Collapsible, nested, active states |
| `navigation/command-palette-patterns.md` | Command/search overlays | Keyboard UX, result hierarchy |

### Heroes

| File | Component Type | Key Concerns |
|---|---|---|
| `heroes/hero-patterns.md` | Hero sections | Hierarchy, CTA placement, no decorative excess |
| `heroes/hero-anti-patterns.md` | What to avoid | The AI default hero failures |

### Content

| File | Component Type | Key Concerns |
|---|---|---|
| `content/card-patterns.md` | Card components | Surface treatment, interaction, density |
| `content/feature-section-patterns.md` | Feature grids/lists | Layout, icon discipline, copywriting |
| `content/bento-grid-patterns.md` | Bento/magazine grids | When to use, span discipline, composition |
| `content/table-patterns.md` | Data tables | Density, sort, selection, pagination |

### Actions

| File | Component Type | Key Concerns |
|---|---|---|
| `actions/button-patterns.md` | Button hierarchy | Variant system, states, destructive |
| `actions/cta-patterns.md` | Call-to-action sections | Conversion hierarchy, restraint |
| `actions/toggle-patterns.md` | Toggles, switches, checkboxes | State communication, accessibility |

### Forms

| File | Component Type | Key Concerns |
|---|---|---|
| `forms/input-patterns.md` | Text inputs, selects, textareas | Label placement, validation states |
| `forms/search-patterns.md` | Search bars and interfaces | The glow/spotlight trap, real search UX |
| `forms/auth-patterns.md` | Login/signup forms | Trust signals, error handling |
| `forms/upload-patterns.md` | File upload components | Drag-drop, preview, error states |

### Feedback

| File | Component Type | Key Concerns |
|---|---|---|
| `feedback/toast-patterns.md` | Toast notifications | Hierarchy, timing, dismissal |
| `feedback/skeleton-patterns.md` | Skeleton loaders | Realistic shapes, timing |
| `feedback/empty-state-patterns.md` | Empty states | Guidance, not decoration |

### Commerce

| File | Component Type | Key Concerns |
|---|---|---|
| `commerce/pricing-patterns.md` | Pricing tables | Hierarchy, recommended tier, toggle |
| `commerce/checkout-patterns.md` | Checkout flows | Trust, form density, progress |

### Data

| File | Component Type | Key Concerns |
|---|---|---|
| `data/dashboard-patterns.md` | Dashboard layouts | Density, hierarchy, navigation |
| `data/metric-patterns.md` | Metric/KPI cards | Number formatting, delta indicators |
| `data/chart-patterns.md` | Charts and graphs | Accessible, no 3D, semantic color |

### Layout

| File | Component Type | Key Concerns |
|---|---|---|
| `layout/page-composition.md` | Page-level composition | Layout archetypes, hierarchy |
| `layout/spacing-systems.md` | Spacing and density | Scale, density levels, consistency |
| `layout/responsive-patterns.md` | Responsive behavior | Breakpoints, mobile-first concerns |

---

## How to Use These Files

1. Identify the component type in the directory above
2. Read the anatomy and interaction model sections
3. Cross-reference with `decisions/component-triage.md` to classify any reference component (A/B/C)
4. Apply the adaptation rules before generating
5. Use the quality benchmarks to verify output

---

## Adding a New Component Pattern

1. Identify the correct subdirectory (or create one if a new category)
2. Copy `_template.md`
3. Fill all required sections — no placeholder content
4. Add entry to this index
5. If the component has known anti-patterns, add entry to relevant `anti-patterns/` file
