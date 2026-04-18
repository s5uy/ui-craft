# Recipe: Dashboard Shell

**Project type:** Logged-in app shell / dashboard / admin panel / monitoring
**Default direction:** TM (Technical-Minimal)
**Also supports:** DE (for craft-led product dashboards — Linear, Height-style)

**Note:** Dashboards are the one recipe where VP and EL directions don't apply — data density needs TM/DE restraint. If a user asks for "a playful dashboard," push back: the data is the subject, not the chrome.

### If direction is DE (alternate)
- Paper palette option in addition to graphite (some dashboards live in light mode)
- Hairline dividers between table rows (not shaded zebra)
- Mono-type everywhere, including in-cell values
- Cursor-spotlight on chart cards (subtle)
- Keyboard-first interactions (Cmd+K, J/K nav, ? shortcut menu)

For the **actual product** — not the marketing page. The logged-in app.

---

## Scope

**Use for:**
- Analytics / observability dashboards
- Admin panels and internal tools
- CRM / CMS app shells
- Logged-in SaaS product home screens
- Ops command centers

**Not for:**
- Anything trying to convert a visitor (that's a landing recipe)

---

## Design System

- **Blueprint:** Command Center (primary)
- **Palette:** Dark Technical — but the accent is functional, not decorative. Status colors (green/red/amber) carry semantic meaning.
- **Typography:** Inter for UI text, JetBrains Mono for every metric, timestamp, ID, and table cell that holds a number
- **Density:** compact by default (`[data-density="compact"]`). Expose spacious toggle for accessibility.
- **Motion:** minimal. 100–200ms. State transitions must be near-instant because the user is monitoring live data.
- **Signature patterns:** `data-table.md`, `sparkline-cell.md`, `command-palette.md`, `status-pill.md`, `filter-bar.md`

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ TopBar: brand · workspace switcher · search · Cmd+K · user  │
├──────────┬──────────────────────────────────────────────────┤
│          │ PageHeader: crumbs · title · actions (ghost+pri) │
│ SideNav  ├──────────────────────────────────────────────────┤
│ (icons + │ FilterBar: segmented + dropdowns + date range    │
│  labels, ├──────────────────────────────────────────────────┤
│  240px,  │ Content (grid of metric cards + data table)      │
│  collap- │                                                  │
│  sible)  │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

---

## Required Elements

- **TopBar** — 48–56px tall, workspace dropdown on the left, search in the middle (with Cmd+K), avatar/user on the right
- **SideNav** — 240px expanded, 56px collapsed. Sections separated by uppercase mono labels.
- **PageHeader** — breadcrumbs (mono), page title, right-aligned action buttons (ghost + primary)
- **FilterBar** — segmented control for main filter + 2–3 dropdowns + date range picker. Mono font.
- **MetricCards** — in a 4-col grid. Each: label (uppercase mono, 11px) + value (24–32px) + delta (green/red with arrow) + sparkline. No icons inside.
- **DataTable** — dense rows (36–44px), zebra alternating via `rgba(255,255,255,0.015)`, sticky header, sortable columns, hover row highlight, inline status pills, checkboxes for bulk select
- **EmptyState** — shown when no data: small icon + one sentence + primary action button. Never a cartoon illustration.
- **CommandPalette** — bound to Cmd+K. Grouped: Pages / Actions / Recent. Every menu item in the app should be reachable here.
- **Toast system** — bottom-right. Semantic colors. Auto-dismiss 4s.

---

## Data Plausibility

Every number in the dashboard must look real:

- Metrics: `$2,847,392`, `143ms`, `99.97%`, `4,218 events`, `2.4k users`
- Time ranges: "Last 30 days", "Mar 12 – Apr 12", "Q1 2026"
- Table rows: 10–25 with real-looking names, emails, statuses, timestamps. Mix short + long values to stress-test column widths.
- Charts: upward trend with variation, not perfect curves. Show axis labels. Never a decorative donut.

---

## Failure Signals

- ❌ Large h1 page titles (dashboards use small, quiet titles — the data is the title)
- ❌ Colorful gradient header bars
- ❌ Cards with equal visual weight regardless of importance
- ❌ Charts without axis labels
- ❌ "Welcome back, [Name]!" greetings — this is a tool, not a consumer app
- ❌ Any glow effect other than the single dot on a live-status indicator
- ❌ Stock illustrations anywhere
