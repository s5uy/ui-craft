# Table Patterns

---

## Mental Model

A data table is a precision scanning tool. Users approach it with a question — "show me all active projects sorted by last modified" — and the table's job is to answer that question as efficiently as possible. Every design decision must serve scanning speed, not visual interest.

Tables fail when they prioritize visual polish over data legibility.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Column headers | Name and sort controls | Yes |
| Sort indicator | Shows current sort column and direction | Yes if sortable |
| Rows | One row per data record | Yes |
| Cell content | The data | Yes |
| Row selection | Checkbox for bulk operations | Situational |
| Empty state | No records message | Yes |
| Loading state | Skeleton while data fetches | Yes |
| Pagination / infinite scroll | Navigation through large datasets | Yes for >50 rows |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Default row | — | `bg-background` or alternating `bg-muted/30` |
| Hover | Mouse over row | `bg-muted/50` |
| Selected | Checkbox checked | `bg-accent/5 border-l-2 border-l-accent` |
| Sort active | Column sorted | Column header bold/accented, sort arrow visible |
| Loading | Data fetch | Skeleton rows |
| Empty | No records | Centered empty state below header |

---

## Implementation

### Standard data table

```tsx
"use client"

import { useState } from "react"
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  width?: string
  align?: "left" | "right" | "center"
}

interface TableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
}

type SortDirection = "asc" | "desc" | null

export function DataTable<T extends { id: string }>({
  columns,
  data,
  loading,
  emptyMessage = "No records found.",
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"))
      if (sortDir === "desc") setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey]
    const bv = b[sortKey]
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir === "asc" ? cmp : -cmp
  })

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground/70",
                  col.sortable && "cursor-pointer select-none hover:text-foreground",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.width
                )}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="flex items-center gap-1.5">
                  {col.label}
                  {col.sortable && (
                    <span className="text-muted-foreground/40">
                      {sortKey === col.key && sortDir === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : sortKey === col.key && sortDir === "desc" ? (
                        <ArrowDown className="h-3 w-3" />
                      ) : (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn(
                      "px-4 py-3 text-foreground",
                      col.align === "right" && "text-right tabular-nums font-mono",
                      col.align === "center" && "text-center"
                    )}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
```

### Table usage example

```tsx
interface Project {
  id: string
  name: string
  status: "active" | "paused" | "draft"
  deployments: number
  lastDeployed: string
}

const statusBadge = {
  active: <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Active</span>,
  paused: <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Paused</span>,
  draft: <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">Draft</span>,
}

const columns: Column<Project>[] = [
  { key: "name", label: "Project", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (val) => statusBadge[val as Project["status"]],
  },
  {
    key: "deployments",
    label: "Deployments",
    sortable: true,
    align: "right",
    render: (val) => String(val),
  },
  {
    key: "lastDeployed",
    label: "Last deployed",
    sortable: true,
    render: (val) => (
      <span className="text-muted-foreground">{String(val)}</span>
    ),
  },
]
```

---

## Integration Notes

**Row height:** `py-3` (48px effective) for comfortable data tables. `py-2` or `py-2.5` for dense tables where information density is prioritized. Never go below `py-2`.

**Numeric columns:** Right-align all numeric data. Add `tabular-nums font-mono` for numbers that are compared across rows (currency, counts, percentages).

**Status badges:** Use semantic colors (emerald for active/success, amber for warning/paused, red for error/failed, gray for neutral/draft). Do not use accent color for status badges — it depletes the accent's signal value.

**`colSpan` for empty/loading:** The empty and loading states must use `colSpan={columns.length}` so they span the full table width correctly.

---

## Quality Benchmarks

A production-grade data table must:

- Have visible column headers with sort indicators on sortable columns
- Have a loading state (skeleton rows) while data loads
- Have an empty state with a clear message (not just blank space)
- Right-align all numeric/monetary data
- Use `tabular-nums` on numeric columns for alignment consistency
- Handle long text values with truncation (not overflow) — `truncate max-w-[200px]`
- Have hover state on rows to confirm clickability (if rows are clickable)

---

## Anti-Patterns

**No column headers:** A table without labeled column headers forces users to infer what each column means from the data alone.

**Zebra striping at full opacity:** Alternating row backgrounds at `bg-gray-50` (full opacity) creates visual noise. If zebra striping is used, keep it very subtle: `bg-muted/30` maximum.

**Left-aligned numbers:** Money, counts, and percentages right-aligned against a right edge creates columns that are easy to scan vertically. Left-aligned numbers are harder to compare.

**Status as text only:** Writing "Active" without a badge or color signal makes status harder to scan than a color-coded badge. The status column should use a visually distinct badge.

**Truncating key identifiers:** Truncating the primary identifier (project name, user name, document title) creates a table where you can't tell what you're looking at. Give identifier columns enough width.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark background, `border-white/8` cell borders, `text-xs` row height `py-2`, monospace data, semantic status colors |
| Spatial Immersive | Avoid dense tables — this blueprint is not suited for data density; use only for simple lists |
| Editorial Brutalism | `border-2 border-black`, `border-black` cell borders, no background tint on headers, bold column headers |
| Enterprise Neutral | Standard implementation, `shadow-sm`, compact `py-2.5` row height, this is the canonical context |
| Editorial Warm | Warm borders, warm header background `bg-[#F5F3EF]`, warm text colors throughout |
