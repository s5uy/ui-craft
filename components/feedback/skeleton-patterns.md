# Skeleton Patterns

---

## Mental Model

Skeleton screens are structural placeholders that show the layout of content before it loads. They manage the user's perception of wait time by showing shape and structure immediately — giving the eye something to latch on to while the data arrives. A good skeleton is shaped like the real content it replaces; a bad skeleton is a generic bar that bears no relationship to what will appear.

---

## Implementation

### Base skeleton primitive

```tsx
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden="true"
    />
  )
}
```

### Card skeleton

```tsx
export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border p-5">
      <Skeleton className="h-3 w-16" />          {/* meta label */}
      <Skeleton className="mt-3 h-5 w-3/4" />    {/* title */}
      <Skeleton className="mt-2 h-3.5 w-full" /> {/* description line 1 */}
      <Skeleton className="mt-1.5 h-3.5 w-5/6" />{/* description line 2 */}
      <div className="mt-4 flex items-center gap-2">
        <Skeleton className="h-7 w-16 rounded-full" /> {/* tag */}
        <Skeleton className="h-7 w-12 rounded-full" /> {/* tag */}
      </div>
    </div>
  )
}
```

### Table skeleton

```tsx
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="border-b border-border">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={`h-4 ${i === 0 ? "w-3/4" : i === columns - 1 ? "w-12" : "w-1/2"}`} />
        </td>
      ))}
    </tr>
  )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} columns={columns} />
      ))}
    </>
  )
}
```

### Metric card skeleton

```tsx
export function MetricCardSkeleton() {
  return (
    <div className="rounded-lg border border-border p-5">
      <Skeleton className="h-3 w-20" />       {/* label */}
      <Skeleton className="mt-3 h-8 w-28" />  {/* value */}
      <Skeleton className="mt-2 h-3 w-16" />  {/* delta */}
    </div>
  )
}
```

### User list skeleton

```tsx
export function UserRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <Skeleton className="h-8 w-8 rounded-full" />   {/* avatar */}
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-32" />            {/* name */}
        <Skeleton className="h-3 w-48" />              {/* email */}
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />  {/* role badge */}
    </div>
  )
}
```

---

## Quality Benchmarks

A production-grade skeleton must:

- Match the visual structure of the content it replaces (not generic bars)
- Use `aria-hidden="true"` so screen readers skip the skeleton
- Use `animate-pulse` at standard speed (not customized to be faster/slower)
- Have the same outer container dimensions as the loaded content to prevent layout shift
- Be replaced entirely when content loads (not mixed with content)

---

## Anti-Patterns

**Generic equal-width bars:** All skeleton lines are the same width (`w-full`). Real content has varying line lengths. Vary the widths to match the expected content structure.

**Skeleton that changes layout on load:** If the skeleton uses a fixed height and the real content is taller, the page shifts on load. Size the skeleton to match the expected content dimensions.

**Skeletons with heavy visual effects:** `animate-pulse` at default speed is sufficient. Custom shimmer animations with `animate-[shimmer_1.5s_infinite]` and gradient backgrounds are decoration added to a loading state — unnecessary complexity.

**No skeleton at all (blank area):** Showing an empty container while content loads with no visual placeholder. The user has no idea if the content is loading or if it errored.
