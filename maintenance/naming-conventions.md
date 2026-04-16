# Naming Conventions

All naming rules in one place. Follow these consistently to prevent taxonomy drift.

---

## File Names

| Content type | Convention | Example |
|---|---|---|
| Component patterns | `[component-type]-patterns.md` | `navbar-patterns.md`, `card-patterns.md` |
| Anti-pattern files | `[pattern-name].md` | `gradient-abuse.md`, `glow-dependency.md` |
| Blueprint files | `[blueprint-name].md` (kebab) | `command-center.md`, `editorial-warm.md` |
| Palette family files | `[family-name].md` (kebab) | `neutral-cool.md`, `deep-technical.md` |
| Palette accent files | `[accent-type].md` | `single-accent-systems.md` |
| Industry files | `[industry-name].md` | `fintech.md`, `developer-tools.md` |
| Prompt templates | `[target].md` (what it generates) | `homepage.md`, `button-system.md` |
| Index files | `_index.md` | `_index.md` |
| Template files | `_template.md` | `_template.md` |
| Maintenance docs | `[how-to/topic].md` | `how-to-add-component.md` |

## Meta file underscore prefix

Files starting with `_` are meta files (index, template, selection logic). They are not content — they describe or organize content. The underscore prefix sorts them to the top of directory listings.

---

## TypeScript / Code Naming

| Element | Convention | Example |
|---|---|---|
| Component | PascalCase | `NavBar`, `MetricCard` |
| Interface/type | PascalCase, descriptive | `MetricCardProps`, `NavLink` |
| Hook | `use` + PascalCase | `useCommandPalette`, `useToast` |
| Utility function | camelCase | `formatBytes`, `cn` |
| Constants | SCREAMING_SNAKE or camelCase (prefer camelCase for exported) | `defaultDateRange`, `MAX_FILE_SIZE_MB` |
| CSS variable | `--kebab-case` | `--muted-foreground`, `--brand` |
| Route parameter | `[kebab-case]` | `[project-id]`, `[user-id]` |

---

## Blueprint Names (Canonical)

Always use these exact names when referring to blueprints:
- Command Center
- Spatial Immersive
- Editorial Brutalism
- Enterprise Neutral
- Editorial Warm

---

## Palette Family Names (Canonical)

- monochrome-systems
- neutral-warm
- neutral-cool
- deep-technical
- paper-editorial
- earth-organic
- high-trust

---

## Accent Strategy Names (Canonical)

- single-accent
- functional-accents
- dual-accent
- no-accent

---

## Industry Names (Canonical)

- fintech
- healthtech
- developer-tools
- consumer-saas
- enterprise-b2b
- creative-agency
- ecommerce
