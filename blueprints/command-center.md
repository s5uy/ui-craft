# Blueprint: Command Center

## Overview

**Mood:** Dense, technical, controlled, high-stakes

**Best for:**
- Dashboards and analytics products
- Infrastructure monitoring and observability
- Trading tools and financial terminals
- Bot management and automation panels
- Operations and incident response interfaces
- System administration and DevOps tools
- CI/CD and deployment pipelines

**Not for:**
- Consumer-facing marketing pages
- Content platforms or editorial sites
- Products that need to feel approachable or warm
- Onboarding flows for non-technical users

---

## Visual Traits

Near-black background creates the sense of a professional instrument rather than a marketing surface. Every pixel carries information or creates separation — there is no decorative space.

Panel surfaces are distinct from the background through minimal tonal shift (not gradient, not heavy border). The layering feels physical: background → panel → raised panel → active surface.

Typography is function-first. Monospaced fonts for numeric data and status codes. Condensed or tabular variants where density matters. Labels are small and uppercase with wide tracking; values are prominent and often monospaced.

Color is strictly semantic. Green means live/success/positive. Red means error/danger/critical. Amber means degraded/warning. No decorative color exists — if something is colored, it is communicating status.

Borders are ultra-low opacity (4–8% white). They suggest separation without dominating. The interface feels like a precision instrument, not a wireframe.

Whitespace is minimal but intentional. Sections are separated by tonal shift or border rather than large gaps. Density is a feature, not a failure.

---

## Suggested Palette

**Background:** `#050505`
**Surface / panel:** `#0F0F0F`
**Panel elevated:** `#161616`
**Border:** `rgba(255, 255, 255, 0.06)`
**Border subtle:** `rgba(255, 255, 255, 0.04)`
**Primary text:** `#F5F5F5`
**Secondary text:** `rgba(255, 255, 255, 0.6)`
**Muted text:** `rgba(255, 255, 255, 0.35)`
**Accent positive:** `#00FF66` — live status, success, positive delta
**Accent danger:** `#FF3347` — error, critical, negative delta
**Accent warning:** `#F59E0B` — degraded, warning
**Accent neutral-active:** `#E5E5E5` — selected state, active element

**Palette logic:** Near-black with RGB-separated semantic accents creates the visual language of professional monitoring software. The green-red-amber triad is familiar from status indicators and financial terminals. It signals that this is a tool where colors mean things, not just decoration.

Resist the temptation to make the green "neon" or the red "vivid." Keep them clean and precise. `#00FF66` is the right green — not `#00FF00` (too raw), not `#10B981` (too Tailwind, too soft for this context).

---

## Typography Direction

**Primary (UI labels, nav, metadata):** Inter, DM Sans, or system-ui at 11–13px. All-caps with `tracking-wider` for labels. Numeric data should use tabular figures (`font-variant-numeric: tabular-nums`).

**Metrics and values:** Monospaced accent (JetBrains Mono, Fira Code, or similar) for numbers, status strings, IDs, and code-adjacent content. This creates a clear visual separation between labels and values.

**Headings:** When section headings exist, they should be small and restrained (14–16px, medium weight) — not large and dominant. In dense UIs, the data IS the heading.

**Scale strategy:** Tight. 11px labels → 13px body → 16px section headings → occasionally 20–24px for key metric callouts. No large display type. Nothing over 32px in standard dashboard UI.

**Letter spacing:** Uppercase labels at `tracking-widest` (0.1em+). Values and data at default or slightly tight (-0.01em). Monospaced content at default.

---

## Spacing Logic

Dense but breathable at the component level. Sections are tightly packed. But within each panel, components have sufficient internal padding to be scannable (not cramped).

- Section padding: `p-4` to `p-6` (16–24px)
- Between metric panels: `gap-2` to `gap-3` (8–12px)
- Internal card padding: `p-3` to `p-4` (12–16px)
- Data row height: 36–44px (readable but tight)

Full-bleed layout with a narrow sidebar (240–280px) and a maximized content area. Every pixel of screen space is productive.

---

## Motion Tone

**Snappy and minimal.** The audience is monitoring live systems — animation must never delay perception of status changes.

- State transitions: `duration-150` with linear or ease-out easing
- Status color transitions: instantaneous (no fade on alert state changes — the change should be immediate)
- Panel reveals on page load: fast stagger, `duration-200` max per item
- Data updates: avoid animation on live-updating values — let the number change immediately
- Hover states: `duration-100` — nearly instant

Do not use Framer Motion's spring physics here. Everything should feel precise and instrumental.

---

## Surface Treatment

Depth through tonal layering, not shadows or gradients:

```
#050505  ← background (void)
#0F0F0F  ← primary panel surface
#161616  ← elevated panel (nested panels, modals, dropdowns)
#1C1C1C  ← active/selected state surface
```

Borders at `rgba(255,255,255,0.06)` between surfaces. Occasionally `rgba(255,255,255,0.10)` for the outermost container borders.

`box-shadow` is used sparingly: `0 0 0 1px rgba(255,255,255,0.06)` as an alternative to border for panel separation. Not for glow — for definition.

Subtle inner highlight on panel top edge: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.04)`. Creates slight physicality without a gradient.

---

## Component Vocabulary

- `<LiveTickerBelt />` — scrolling horizontal strip of live metric values
- `<SignalStatus />` — compact status indicator with semantic color dot + label
- `<MetricCluster />` — tight group of labeled numeric values (p50/p95/p99, etc.)
- `<ExecutionCard />` — action/event card with status, timestamp, ID, and expandable detail
- `<ExpandableSideRail />` — collapsible sidebar with icon-only collapsed state
- `<DataTable />` — dense sortable table with zebra rows and inline status chips
- `<SparklineCell />` — small inline sparkline within a table cell or metric cluster
- `<AlertBanner />` — persistent high-priority status bar at top of layout
- `<CommandBar />` — keyboard-accessible command input (Cmd+K pattern)
- `<LiveDot />` — pulsing status indicator (single subtle pulse animation, not constant)

---

## Anti-Patterns for This Blueprint

**Gradient header bars.** The section header should be a surface with a bottom border, not a gradient band. Gradients on headers in dark technical UI look like a bad electron app from 2018.

**Decorative charts.** Every chart must be readable and functional. A donut chart used for decoration (not data), a smooth gradient area chart on a dashboard with no axis labels, a bar chart without values — all failures.

**Cards with equal size and equal visual weight.** In a real dashboard, different panels have different importance. Key metrics get more visual weight. Secondary metrics are smaller. Everything-the-same-size is an information design failure.

**Large section headings.** "Overview" in 28px bold above a metrics section is wrong. In dense technical UI, section headings should be small, quiet, and secondary to the data.

**Glowing status indicators.** A pulsing green circle with a blur-based glow halo for "online" status is a component-demo aesthetic. The real thing is a clean 8px colored dot.

**Drop shadows everywhere.** In near-black UI, shadows are invisible. Use tonal borders and surface layers instead.

---

## Example Products

- **Linear** — issue tracking with dense lists, keyboard-first navigation, dark + near-black surfaces
- **Datadog** — monitoring dashboard, metric-dense layout, semantic status colors
- **Vercel deployment dashboard** — build list, status indicators, log output, technical density
