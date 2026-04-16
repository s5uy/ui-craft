# Page Prompt: Dashboard

---

## Pre-Generation Decisions

1. **What decisions does this dashboard support?** (what questions does the user need answered)
2. **What are the 3–4 primary metrics?** (name, unit, delta direction)
3. **What is the primary visualization?** (chart type, what it shows)
4. **Density level:** compact (developer/data) / standard / generous
5. **Blueprint:** typically Enterprise Neutral or Command Center for dashboards
6. **Navigation layout:** sidebar / top navbar / both
7. **Time range control:** none / dropdown / segmented control
8. **What secondary widgets are needed?** (activity feed, recent list, top-N breakdown)

---

## Generation Scaffold

```
Generate a complete dashboard page for [product name].

**Dashboard purpose:** [what decisions this dashboard supports — be specific]

**Design system:**
- Blueprint: [Enterprise Neutral / Command Center]
- Palette: [neutral-cool / deep-technical]
- Density: [compact / standard]

**Primary metrics (4 cards in a row):**
1. [Label]: [example value], [delta direction and %], [positive direction: up/down]
2. [Label]: [example value], [delta]
3. [Label]: [example value], [delta]
4. [Label]: [example value], [delta]

**Primary visualization:**
- Chart type: [line / bar]
- What it shows: [e.g., "revenue over time, last 30 days"]
- Y-axis unit: [e.g., "$", "users", "ms"]

**Secondary widgets (2-col grid below the chart):**
- Widget 1: [name and type — e.g., "Recent transactions: list of 5 most recent"]
- Widget 2: [name and type — e.g., "Top channels: horizontal bar breakdown"]

**Layout:**
- Sidebar: [yes/no, width]
- Top navbar: [yes/no]
- Date range control: [none / dropdown / segmented buttons]

**Data requirements:**
- All metric values must be realistic for [product type]
- Chart data must be realistic trend data (not flat, not perfectly linear)
- Use `font-mono tabular-nums` on all numeric values
- Use `isPositiveGood: false` for metrics where down is good (error rate, churn, cost)

**Code requirements:**
- Full page component with layout, all widgets
- TypeScript interfaces for all data shapes
- Loading skeletons for all data-dependent widgets
- `"use client"` on the page if using state (date range selector)

**Output the complete dashboard page. Do not truncate.**
```

---

## Quality Criteria

- [ ] Metric cards show delta with directional signal (both color AND arrow/symbol)
- [ ] All numeric values use `font-mono tabular-nums`
- [ ] Numbers use `toLocaleString()` for thousands separators
- [ ] Chart has labeled axes with units
- [ ] Time range is visible and labeled
- [ ] Loading state present for data-dependent widgets
- [ ] `isPositiveGood: false` on metrics where lower is better
- [ ] Density matches blueprint (compact for Command Center, standard for Enterprise Neutral)
