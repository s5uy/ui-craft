# Dashboard Patterns

---

## Mental Model

A dashboard is a decision-support surface. Its job is to give the user enough context about the current state of their system or product that they can determine what (if anything) requires action. Everything on a dashboard must be there because it informs a decision — not because it can be there.

Dashboard design fails in two ways: too much information (user can't determine what matters) and too little (user can't get the context they need). The right density is the minimum needed for the decisions the user must make.

---

## Dashboard Composition Rules

### Rule 1: Establish hierarchy before detail

The first visual region a user sees should answer "is everything OK?" — a high-level status, key metrics, or a health indicator. Details (tables, charts, feeds) come below.

### Rule 2: Group by decision type

Organize dashboard widgets by what decision they support, not by data type. Revenue + users + churn together (growth health). Error rate + latency + uptime together (system health). Don't mix operational and strategic data in the same visual group.

### Rule 3: Time range must be visible

Every dashboard that shows changing data must have a visible time range indicator. "Last 30 days," "this week," "today" — the user must always know what period the data covers.

### Rule 4: Empty = loading or unavailable — never ambiguous

If a widget has no data, it shows either a skeleton (loading) or an explicit empty state message. It never shows a blank area.

---

## Implementation

### Dashboard page structure

```tsx
"use client"

import { useState } from "react"

type DateRange = "today" | "7d" | "30d" | "90d"

const dateRangeOptions: Array<{ value: DateRange; label: string }> = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
]

export function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>("30d")

  return (
    <div className="space-y-6 px-6 py-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Overview</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Track performance and monitor key metrics
          </p>
        </div>
        {/* Date range selector */}
        <div className="flex items-center rounded-md border border-border bg-background p-0.5">
          {dateRangeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDateRange(opt.value)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                dateRange === opt.value
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Total Revenue" value="$84,320" delta={{ value: "+12.4%", direction: "up", label: "vs last period" }} />
        <MetricCard label="Active Users" value="12,847" delta={{ value: "+3.1%", direction: "up" }} />
        <MetricCard label="Conversion Rate" value="3.2%" delta={{ value: "-0.2%", direction: "down", isPositiveGood: true }} />
        <MetricCard label="Churn Rate" value="1.8%" delta={{ value: "-0.4%", direction: "down", isPositiveGood: false }} />
      </div>

      {/* Primary visualization + secondary list */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Revenue over time</h2>
              <span className="text-xs text-muted-foreground">{dateRangeOptions.find(o => o.value === dateRange)?.label}</span>
            </div>
            {/* Chart component goes here */}
            <div className="h-48 flex items-center justify-center text-sm text-muted-foreground border border-dashed border-border rounded-md">
              Revenue chart
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Top sources</h2>
            {/* Top sources list */}
            <div className="space-y-3">
              {[
                { source: "Organic search", value: "42%", amount: "$35,414" },
                { source: "Direct", value: "28%", amount: "$23,610" },
                { source: "Email", value: "18%", amount: "$15,178" },
                { source: "Social", value: "12%", amount: "$10,118" },
              ].map((item) => (
                <div key={item.source} className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground truncate">{item.source}</p>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-foreground/30"
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 shrink-0 text-right">
                    <p className="font-mono text-sm tabular-nums text-foreground">{item.amount}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary data */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
          </div>
          <div className="p-5">
            {/* Activity feed */}
            <p className="text-sm text-muted-foreground">Activity feed placeholder</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Recent transactions</h2>
          </div>
          <div className="p-5">
            {/* Transaction list */}
            <p className="text-sm text-muted-foreground">Transaction list placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Quality Benchmarks

A production-grade dashboard must:

- Show a visible time range for all time-varying data
- Have the most important metrics in the first viewport
- Group related metrics/widgets visually
- Handle loading and empty states for every widget independently
- Use `tabular-nums font-mono` on all numeric values
- Have the primary visualization span more columns than secondary widgets

---

## Anti-Patterns

**12 metric cards of equal size:** A 3×4 grid of identical metric cards with no visual hierarchy. Maximize to 4 primary metrics in a row; use secondary sections for lower-priority data.

**Chart without axis labels:** A line chart with no Y-axis labels, no units, and no time axis. Users cannot understand scale without labels.

**Widgets that don't handle empty state:** A "Recent transactions" widget that shows blank when there are no transactions. Every widget must have an empty state.

**Dark widgets on light dashboard:** Mixing dark-background chart cards with light-background metric cards in the same view. All widgets should share the same surface treatment.
