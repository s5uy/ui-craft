# Chart Patterns

---

## Mental Model

Charts communicate trends, comparisons, and distributions in a visual form that would be harder to extract from a table. A chart earns its complexity only when the visual representation genuinely accelerates understanding. If the key insight can be communicated by a single number + delta, use a metric card — not a chart.

---

## Core Rules

**No 3D charts.** 3D perspective distorts proportions and makes values harder to compare accurately. Flat charts are more accurate and more accessible.

**Semantic colors for data series.** Chart colors are semantic — they distinguish data categories. They must be clearly distinguishable and pass WCAG AA contrast. Use consistent colors across the dashboard: if Series A is always blue, it must be blue in every chart.

**Always label axes.** A chart without axis labels requires the user to infer what the values represent. Y-axis: unit (e.g., `Revenue ($)`). X-axis: time period or category label.

**Tooltips are required for precise values.** The visual encoding gives approximate values; the tooltip gives exact values. Both are required.

---

## Implementation (Recharts)

### Line chart — time series

```tsx
"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface DataPoint {
  date: string
  value: number
}

interface LineChartCardProps {
  title: string
  data: DataPoint[]
  valuePrefix?: string
  valueSuffix?: string
}

function CustomTooltip({ active, payload, label, valuePrefix = "", valueSuffix = "" }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-mono text-sm font-medium tabular-nums text-foreground">
        {valuePrefix}{payload[0].value.toLocaleString()}{valueSuffix}
      </p>
    </div>
  )
}

export function LineChartCard({ title, data, valuePrefix = "", valueSuffix = "" }: LineChartCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${valuePrefix}${v.toLocaleString()}${valueSuffix}`}
            width={48}
          />
          <Tooltip content={<CustomTooltip valuePrefix={valuePrefix} valueSuffix={valueSuffix} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--foreground))"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: "hsl(var(--foreground))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

### Bar chart — comparison

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function BarChartCard({ title, data }: { title: string; data: DataPoint[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="hsl(var(--foreground))" radius={[2, 2, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

---

## Quality Benchmarks

- Axis labels present with units
- Custom tooltip component that matches the UI's design language
- No 3D effects
- Chart colors use CSS variables (not hard-coded hex) for dark/light mode compatibility
- `ResponsiveContainer` wrapping all charts for correct responsive sizing
- Accessible via keyboard if interaction is required (`tabIndex` on chart container)

---

## Anti-Patterns

**Hard-coded hex in chart colors:** `stroke="#6366f1"` in a chart that needs to work in both light and dark mode. Use `hsl(var(--foreground))` and `hsl(var(--muted-foreground))` pattern or a defined color scale.

**Gradient fill under line chart:** A gradient area fill beneath the line, `fill="url(#gradient)"`. The gradient adds visual noise without adding information. If an area chart is needed, use a solid low-opacity fill (`fillOpacity={0.1}`).

**Missing tooltips:** Users need exact values from charts. A chart without tooltips forces users to estimate from axis lines.

**3D pie chart:** 3D perspective on pie charts causes visual distortion where the front slice appears larger than its actual proportion. Use a flat donut or bar chart instead.
