# Metric Patterns

---

## Mental Model

Metric components communicate measured quantities and their change over time. They must answer three questions instantly: what is being measured, what is the current value, and is it moving in the right direction. Every design decision should serve these three questions — anything else is noise.

The most important typographic rule for metrics: monospaced, tabular-figure numbers. Proportional fonts cause numerals to shift width as values change, creating visual jitter. Use `font-mono` and `tabular-nums` on all metric values.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Label | Names what is measured | Yes |
| Value | The current measurement | Yes |
| Unit | What the number means (`$`, `%`, `ms`, `req/s`) | Yes if ambiguous |
| Delta | Change vs. comparison period | Recommended |
| Comparison period | What the delta compares against | Yes (when delta present) |
| Sparkline | Trend visualization | Situational |
| Loading state | Data being fetched | Yes |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Loading | Data pending | Skeleton placeholder |
| Loaded positive delta | Value up vs. prior period | Green delta text + up arrow |
| Loaded negative delta | Value down vs. prior period | Red delta text + down arrow |
| Loaded neutral | No change or N/A | Muted gray delta |
| Error | Data unavailable | Muted "—" value, error indicator |
| Hover (clickable) | Mouse over | Subtle background on the card, cursor-pointer |

---

## Implementation

### Standard metric card

```tsx
interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  delta?: {
    value: string
    direction: "up" | "down" | "neutral"
    label?: string  // e.g., "vs last month"
    isPositiveGood?: boolean  // default true — determines semantic color
  }
  loading?: boolean
}

export function MetricCard({ label, value, unit, delta, loading }: MetricCardProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="h-3 w-20 rounded bg-muted animate-pulse" />
        <div className="mt-3 h-8 w-32 rounded bg-muted animate-pulse" />
        <div className="mt-2 h-3 w-24 rounded bg-muted animate-pulse" />
      </div>
    )
  }

  const isPositive = delta?.isPositiveGood !== false
    ? delta?.direction === "up"
    : delta?.direction === "down"

  const deltaColor = delta?.direction === "neutral"
    ? "text-muted-foreground"
    : isPositive
    ? "text-emerald-600"
    : "text-red-600"

  const deltaIcon = delta?.direction === "up" ? "↑" : delta?.direction === "down" ? "↓" : "→"

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-mono text-3xl font-semibold tabular-nums text-foreground">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-muted-foreground">{unit}</span>
        )}
      </div>
      {delta && (
        <p className={`mt-1.5 flex items-center gap-1 text-sm font-medium ${deltaColor}`}>
          <span className="font-mono tabular-nums">
            {deltaIcon} {delta.value}
          </span>
          {delta.label && (
            <span className="font-normal text-muted-foreground text-xs">
              {delta.label}
            </span>
          )}
        </p>
      )}
    </div>
  )
}
```

### Metric row (compact, for dashboards)

```tsx
interface MetricRowProps {
  label: string
  value: string | number
  unit?: string
  delta?: string
  deltaDirection?: "up" | "down" | "neutral"
  isPositiveGood?: boolean
}

export function MetricRow({
  label,
  value,
  unit,
  delta,
  deltaDirection = "neutral",
  isPositiveGood = true,
}: MetricRowProps) {
  const isPositive = isPositiveGood ? deltaDirection === "up" : deltaDirection === "down"
  const deltaColor = deltaDirection === "neutral"
    ? "text-muted-foreground"
    : isPositive
    ? "text-emerald-600"
    : "text-red-600"

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        {delta && (
          <span className={`font-mono text-xs tabular-nums ${deltaColor}`}>
            {deltaDirection === "up" ? "↑" : deltaDirection === "down" ? "↓" : ""}{delta}
          </span>
        )}
        <span className="font-mono text-sm font-medium tabular-nums text-foreground">
          {typeof value === "number" ? value.toLocaleString() : value}
          {unit && <span className="ml-0.5 text-xs text-muted-foreground">{unit}</span>}
        </span>
      </div>
    </div>
  )
}
```

### Metric grid (dashboard layout)

```tsx
interface DashboardMetricsProps {
  metrics: MetricCardProps[]
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <MetricCard key={i} {...metric} />
      ))}
    </div>
  )
}

// Usage
const metrics: MetricCardProps[] = [
  {
    label: "Monthly Revenue",
    value: "$84,320",
    delta: { value: "+12.4%", direction: "up", label: "vs last month" },
  },
  {
    label: "Active Users",
    value: "12,847",
    delta: { value: "+3.1%", direction: "up", label: "vs last month" },
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    delta: { value: "-0.3%", direction: "down", label: "vs last month", isPositiveGood: false },
  },
  {
    label: "Avg. Response Time",
    value: "142",
    unit: "ms",
    delta: { value: "+18ms", direction: "up", label: "vs last week", isPositiveGood: false },
  },
]
```

---

## Integration Notes

**`tabular-nums` is non-negotiable.** Add it to every metric value via `font-variant-numeric: tabular-nums` or Tailwind's `tabular-nums` class. Without it, numbers shift width as they update, causing visual instability.

**Number formatting:** Use `toLocaleString()` for numbers over 1,000. Never display `84320` — display `84,320`. For currency, include the symbol. For percentages, include `%`.

**`isPositiveGood` flag:** Some metrics are good when they go down (error rate, churn, cost, latency). Always pass this context — do not assume up=green.

**TypeScript interface:**
```tsx
interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  delta?: {
    value: string           // formatted string: "+12.4%", "−$230", "+18ms"
    direction: "up" | "down" | "neutral"
    label?: string          // "vs last month"
    isPositiveGood?: boolean // default: true
  }
  loading?: boolean
  href?: string             // if the metric card is clickable
}
```

---

## Quality Benchmarks

A production-grade metric component must:

- Use `tabular-nums` on all numeric values
- Use `toLocaleString()` for any number over 999
- Communicate delta direction through both color and directional symbol (not color alone)
- Handle the loading state with a skeleton of appropriate dimensions
- Handle the error/unavailable state with a graceful `—` placeholder
- Have `isPositiveGood` logic — never hardcode "up=good"

---

## Anti-Patterns

**Proportional font for numbers:** Using a proportional typeface like Inter for metric values causes columns of numbers to misalign and creates visual instability when values update. Always use monospace or enable tabular figures.

**Color alone for delta direction:** Relying on red/green without a directional arrow or text symbol is an accessibility failure. Users with color blindness cannot differentiate the states.

**Decorative chart backgrounds:** Adding a soft sparkline gradient fill that extends behind the entire card, making the background tinted. The chart is informational — it should not become a background decoration.

**Oversized display numbers:** Making metric values 64px or 72px to fill space. Metric cards should be compact — the value should be readable, not monumental. 28–36px is the right range.

**Unlabeled units:** `142` means nothing. `142ms` is a latency. `142` per what? Always include the unit if there's any ambiguity.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark card `bg-[#111111]`, monospace label uppercase, large mono value, semantic delta colors (`text-green-400` / `text-red-400`), tight `p-4` |
| Spatial Immersive | Generous `p-6`, large value display, minimal delta indicator, dark tonal card surface |
| Editorial Brutalism | `border-2 border-black rounded-none`, bold label, very large value `text-5xl`, no background fill |
| Enterprise Neutral | Standard `p-4 rounded-md shadow-sm`, conventional colors, `text-2xl` value |
| Editorial Warm | Warm border, warm muted label, `text-2xl` value, warm emerald/red delta colors |
