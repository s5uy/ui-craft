# Developer Tool Dashboard — Design Decisions

Blueprint: Command Center
Palette: deep-technical
Accent: functional (green = healthy, amber = warning, red = error — no decorative accent)
Context: CI/CD monitoring dashboard — "Relay" (deploy pipeline tool)

---

## What This Demonstrates

A high-density operations dashboard for a developer tool. The Command Center blueprint is applied in full: near-black base, high-contrast data surfaces, monospace type for values, and function-first layout. Every pixel justifies its existence. Nothing is decorative.

---

## Blueprint Application: Command Center

Command Center treats the UI as an instrument panel. The user's mental model is "I am operating a system, not browsing a product."

Key decisions:
- Background: `bg-[#0a0a0b]` — not a Tailwind zinc or slate; a deliberate near-black that reads as controlled, not themed
- Sidebar: persistent, fixed-width (240px), not collapsible on desktop — this is a working tool, not a marketing page
- Data surfaces: `bg-[#111113]` cards with `border-white/8` — subtle separation, high contrast with the base
- No rounded cards (uses `rounded-sm`) — sharp corners read as precision and control
- Typography: JetBrains Mono for all values, Inter for labels

---

## Palette Application: Deep-Technical

Deep-technical systems use darkness as the primary design material. Backgrounds get darker as nesting deepens (page → sidebar → card → code block). The accent system is entirely functional: green means running/healthy, amber means pending/warning, red means failed.

This palette never uses blue as a primary accent in dashboards — blue reads as "link" or "info" in dense UI, which competes with its functional meaning. Instead:
- `#22c55e` (green-500) — healthy, success, running
- `#f59e0b` (amber-400) — pending, deploying, warning
- `#ef4444` (red-500) — failed, error, critical

There is no decorative accent color. Monochrome with functional-only color is the correct system here.

---

## Typography Decisions

**Metric values:** `font-mono text-xl tabular-nums` — monospace prevents layout shift as values update, tabular-nums aligns decimal points

**Status labels:** `text-[10px] uppercase tracking-widest font-medium` — small caps status pill reads as a system label, not copy

**Section headers:** `text-xs uppercase tracking-wider text-white/40` — very subdued, data is the hero, not the section titles

**Body/description:** `text-sm text-white/60` — high information density requires visual hierarchy through opacity, not size variance

---

## Layout Decisions

Three-column structure:
1. Sidebar (240px fixed) — navigation + environment switcher
2. Main content (flex-1) — pipeline runs table + build timeline
3. Detail panel (320px) — selected run detail, appears on row click

This is a real dashboard pattern: the detail panel does not navigate to a new page — it expands in-place. The table retains context while the user inspects.

Header: 48px height (compact) — not 64px. Developer tools should maximize vertical data space.

---

## Data Density Choices

The pipeline table shows 12 rows without pagination visible — this is intentional. Developer tools users scroll; they do not paginate. Infinite scroll is appropriate here.

Status column is leftmost after the pipeline name — the user's first question is always "did it pass." Duration, branch, and commit follow.

The build timeline (right panel) uses a vertical step list, not a Gantt chart. Gantt charts require complex interactivity to be useful; step lists communicate sequence and duration with zero cognitive overhead.

---

## What Was Deliberately Excluded

- **Dark mode toggle** — this tool is dark mode. There is no light mode. Giving users a toggle implies the light version is equally designed; it isn't.
- **Onboarding tooltip overlays** — tooltips on first render are a product decision, not a UI decision. The layout should be self-explanatory.
- **Animated sidebar icons** — sidebar icons do not animate. Chrome is instant.
- **Background grid or dot pattern** — common in dark dashboards, universally pointless
- **Gradient top bar** — seen in 90% of AI-generated dashboards; excluded by default
- **Loading skeletons that look like shimmer ads** — replaced with minimal opacity pulse that looks like a system state, not a loading advertisement

---

## Content Realism

All pipeline names, branch names, commit hashes, and durations are plausible for a real deploy tool:
- Pipeline names follow a `service-name/action` pattern
- Branch names are realistic Git conventions (`main`, `feat/...`, `fix/...`)
- Commit hashes are 7 characters (Git short SHA format)
- Durations are realistic for CI steps (not round numbers)
- Timestamps use relative format for recent items, absolute for older ones
