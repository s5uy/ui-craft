# Responsive Patterns

---

## Mental Model

Responsive design is not "make it work on mobile" as an afterthought. It is designing for the correct experience at each viewport — which sometimes means different layouts, different content priority, and different interaction patterns. The primary question at each breakpoint: what does the user need to accomplish here, and what is the best layout for that task at this viewport width?

---

## Breakpoint Reference

Tailwind defaults (use consistently):

| Prefix | Min width | Typical context |
|---|---|---|
| (none) | 0px | Mobile portrait (320–480px) |
| `sm:` | 640px | Mobile landscape / small tablet |
| `md:` | 768px | Tablet portrait |
| `lg:` | 1024px | Desktop (small) |
| `xl:` | 1280px | Desktop (standard) |
| `2xl:` | 1536px | Desktop (large) |

Most designs need: mobile base + `md:` + `lg:`. `sm:` is needed for specific elements (e.g., side-by-side buttons at 640px). `xl:` and `2xl:` for max-width containment and very large screen adjustments.

---

## Core Responsive Patterns

### Navigation: Sidebar to top bar

```tsx
// Sidebar hides on mobile, shows on md+
<div className="flex h-screen overflow-hidden">
  <aside className="hidden md:flex md:w-56 md:flex-col border-r border-border">
    <Sidebar />
  </aside>
  <div className="flex flex-1 flex-col overflow-hidden">
    {/* Mobile nav in header */}
    <header className="flex h-12 items-center border-b border-border px-4 md:px-6">
      <button className="md:hidden mr-3" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>
      {/* rest of header */}
    </header>
    <main className="flex-1 overflow-y-auto">
      {/* page content */}
    </main>
  </div>
</div>
```

### Grid: 1-col → 2-col → 3-col

```tsx
// Feature grid
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {features.map(f => <FeatureCard key={f.id} {...f} />)}
</div>

// Metric cards
<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  {metrics.map(m => <MetricCard key={m.label} {...m} />)}
</div>

// Dashboard grid
<div className="grid gap-6 lg:grid-cols-3">
  <div className="lg:col-span-2">{/* primary widget */}</div>
  <div>{/* secondary widget */}</div>
</div>
```

### Buttons: Stack to row

```tsx
// Stacked on mobile, inline on sm+
<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
  <button className="w-full sm:w-auto ...">Primary action</button>
  <button className="w-full sm:w-auto ...">Secondary action</button>
</div>
```

### Typography: Scale down on mobile

```tsx
<h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl tracking-tight">
  Product headline
</h1>

<h2 className="text-2xl font-semibold md:text-3xl tracking-tight">
  Section heading
</h2>
```

### Padding: Consistent base, expand on larger screens

```tsx
// Section padding
<section className="px-4 py-16 md:px-6 md:py-20 lg:py-24">

// Card padding
<div className="p-4 md:p-5 lg:p-6">
```

---

## Mobile-Specific Considerations

**Touch targets:** Minimum 44×44px. Increase padding on mobile for tap targets:
```tsx
<button className="py-2.5 px-4 md:py-2 md:px-3 text-sm ...">
  Action
</button>
```

**Input `font-size: 16px` on mobile:** iOS zooms the viewport when an input's font size is below 16px. Use `text-base` (16px) on inputs on mobile, or ensure Tailwind base styles prevent the zoom behavior:
```tsx
<input className="text-base md:text-sm ..." />
```

**Table on mobile:** Wide tables must handle narrow viewports. Options:
1. Horizontal scroll: `overflow-x-auto` on the table container
2. Card view on mobile: render each row as a card at mobile width
3. Column priority: hide low-priority columns on mobile with `hidden md:table-cell`

---

## Quality Benchmarks

A production-grade responsive implementation must:

- Not overflow horizontally at any standard viewport width (320px → 1920px)
- Have touch targets of 44px minimum on mobile
- Not have 16px+ font size zoom on iOS for inputs
- Have a functional mobile navigation (sidebar hidden, mobile menu accessible)
- Not use `overflow-x: hidden` on body to hide accidental overflow (this masks layout bugs)

---

## Anti-Patterns

**Desktop-only tables:** A data table with no mobile handling — shows horizontal overflow on narrow screens. Always add `overflow-x-auto` to the table container.

**Same font size at all breakpoints:** `text-6xl` headlines look appropriate at 1280px and enormous at 375px. Scale type with viewport using responsive classes.

**Hidden content as mobile strategy:** Using `hidden md:block` to hide entire content sections on mobile. Mobile users need the content — it needs a different layout, not to be hidden.

**`hover:` styles as the only interactive state:** On touch devices, hover never fires. Interactive elements need `active:` states in addition to `hover:` for tactile feedback on touch.
