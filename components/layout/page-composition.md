# Page Composition

---

## Mental Model

Page composition is the spatial architecture of a screen. Before any component is designed, the page must answer: what is the primary hierarchy of this view? Where does the user's eye start, where does it go next, and what action do they take? The layout is a hierarchy tool — it communicates what matters most through position, scale, and spatial weight.

Most AI-generated pages fail not at the component level but at the composition level: everything is the same size, the same weight, in the same position. No information hierarchy, no spatial rhythm.

---

## Core Layout Archetypes

### Archetype 1: Single-column content

**When to use:** Editorial content, documentation, blog posts, long-form reading. Any context where focused, linear reading is the primary activity.

```tsx
export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {children}
    </div>
  )
}
```

**Rules:**
- `max-w-2xl` (672px) or `max-w-prose` (65ch) — never full-width for reading content
- Generous `py-16` to `py-24` vertical padding
- No sidebar, no chrome competing with content

### Archetype 2: Two-column app layout

**When to use:** Applications with persistent navigation. The canonical layout for SaaS products, admin tools, and dashboards.

```tsx
export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-border md:flex md:flex-col">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Optional inner navbar */}
        <header className="flex h-12 shrink-0 items-center border-b border-border px-6">
          <PageHeader />
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

**Rules:**
- Sidebar width: `w-48` to `w-64` — match to content density
- Main content: `overflow-y-auto` so the sidebar stays fixed while content scrolls
- Page content max-width: `max-w-6xl` for dense dashboards, `max-w-4xl` for settings/forms

### Archetype 3: Marketing page (section-based)

**When to use:** Landing pages, homepages, feature pages. Sequential sections that build a narrative toward conversion.

```tsx
export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

**Section composition rules:**
- Alternate background tones between sections: `bg-background`, `bg-muted/30`, `bg-background`
- Consistent horizontal padding: `px-6` on containers, `max-w-7xl mx-auto` on content
- Vertical padding per section: `py-20` to `py-32`
- Section order: hero → value prop / features → social proof → CTA → footer

### Archetype 4: Centered task/form

**When to use:** Auth pages, onboarding flows, settings pages, checkout. Focus-required task completion.

```tsx
export function TaskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 px-6 py-12">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
```

**Rules:**
- `max-w-md` (448px) for single-column forms — wider than this and the form reads as sparse
- Background tint (`bg-muted/20`) creates depth and focuses attention on the form
- No sidebar, no competing navigation

### Archetype 5: Dashboard (grid-based)

**When to use:** Data-dense views with multiple independent data widgets.

```tsx
export function DashboardPage() {
  return (
    <div className="space-y-6 px-6 py-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
        <div className="flex items-center gap-2">
          <DateRangePicker />
          <ExportButton />
        </div>
      </div>

      {/* Metric row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MainChart />
        </div>
        <div>
          <TopList />
        </div>
      </div>

      {/* Secondary content */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityFeed />
        <RecentTransactions />
      </div>
    </div>
  )
}
```

**Rules:**
- Metric cards always first — establishes the KPI baseline before details
- `lg:col-span-2` for the primary visualization — it earns more space
- Consistent gap (`gap-4` for same-weight elements, `gap-6` between different weight sections)
- Page content max-width can be `max-w-screen-xl` for data-dense dashboards

---

## Composition Principles

### The weight hierarchy rule

Every page must have a clear visual weight hierarchy: one dominant element, secondary elements, and supporting elements. If everything is the same size and weight, nothing has priority.

```
H1 headline:        font-semibold text-2xl text-foreground    ← dominant
Section headings:   font-semibold text-lg text-foreground     ← secondary  
Card titles:        font-medium text-base text-foreground     ← supporting
Body text:          font-normal text-sm text-muted-foreground ← receding
Labels/metadata:    font-normal text-xs text-muted-foreground ← background
```

### The containment rule

Content regions should have a clear containment structure. Do not let content span edge-to-edge at all viewport widths without a max-width constraint. At 1440px wide, a full-width paragraph is unreadable.

| Content type | Max width |
|---|---|
| Reading content (articles, docs) | `max-w-prose` (65ch) or `max-w-2xl` |
| Form pages | `max-w-md` to `max-w-lg` |
| App/dashboard content | `max-w-6xl` to `max-w-7xl` |
| Marketing sections | `max-w-7xl` |
| Full-bleed (hero, feature) | none — but content inside still has max-width |

### The section breathing rule

Sections need vertical breathing room proportional to their importance. More important transitions get more space.

```
Between H2 sections:      48–64px (gap-12 to gap-16)
Between card groups:      24–32px (gap-6 to gap-8)
Between cards in a grid:  16–24px (gap-4 to gap-6)
Between form fields:      16–20px (space-y-4 to space-y-5)
Between inline elements:  8–12px (gap-2 to gap-3)
```

### The visual anchor rule

Every page needs a visual anchor — one element that the eye naturally goes to first. On a marketing page, it's the headline. On a dashboard, it's the primary metric or chart. On a form page, it's the first input. Design around the anchor, not toward decoration.

---

## Quality Benchmarks

A production-grade page composition must:

- Have a clear first-read hierarchy (eye has a path to follow)
- Constrain content width appropriately for content type
- Have consistent horizontal padding throughout (`px-6` minimum, same on all sections)
- Not create horizontal scroll at any standard viewport width
- Have sections with breathing room proportional to their role
- Not place competing CTAs at equal visual weight on the same view

---

## Anti-Patterns

**Full-width everything:** No max-width constraints anywhere. Long text lines at 1440px viewport width are unreadable (>100 characters per line). Metric cards that stretch to fill a 1440px row look absurd.

**Asymmetric margins:** Section A has `px-6`, Section B has `px-8`, Section C has `px-4`. Inconsistent horizontal rhythm makes the page feel unbuilt.

**Cramped page header:** A page title and its actions in a header region with insufficient padding (`h-10 px-4`). The page header establishes the hierarchy for everything below it — it needs appropriate space.

**Missing visual hierarchy:** A dashboard with 12 metric cards all the same size, no primary metric emphasized. Or a settings page with every section the same visual weight as every other.

**Container-within-container padding doubling:** A `p-6` card inside a `p-6` page section, creating 48px of combined padding that makes the content feel extremely inset.
