# Bento Grid Patterns

---

## Mental Model

A bento grid is a CSS grid layout where items span different numbers of columns and rows, creating a magazine-like mosaic. The irregular spans are intended to communicate hierarchy — larger items are more important than smaller items. 

Bento grids fail when the spans are chosen for visual variety rather than content hierarchy. If every item is roughly equal in importance and you are only varying the spans for aesthetic reasons, use a regular grid instead.

Use a bento grid only when:
1. You have content with genuinely different importance levels that map to different sizes
2. You have content with genuinely different visual footprints (some items need images, some are text-only)
3. The irregular layout creates a clear "reading order" that matches content priority

---

## Implementation

### Standard 3-column bento

```tsx
interface BentoItem {
  id: string
  title: string
  description: string
  size: "sm" | "md" | "lg"  // maps to grid span
  visual?: React.ReactNode
  tag?: string
}

const spanMap = {
  lg: "col-span-2 row-span-2",
  md: "col-span-2 row-span-1",
  sm: "col-span-1 row-span-1",
}

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid auto-rows-[200px] grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`${spanMap[item.size]} overflow-hidden rounded-xl border border-border bg-card`}
        >
          {item.visual ? (
            <div className="relative h-full">
              <div className="absolute inset-0">{item.visual}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 p-5">
                {item.tag && (
                  <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.tag}
                  </span>
                )}
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col p-5">
              {item.tag && (
                <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                  {item.tag}
                </span>
              )}
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
```

---

## Quality Benchmarks

- Large spans (`col-span-2` or `row-span-2`) are earned by content importance, not assigned randomly
- The grid has no more than 2–3 distinct span sizes — more creates visual chaos
- On mobile, all items collapse to single-column (`grid-cols-1` at base, `grid-cols-3` at `lg:`)
- Items with images must have accessible alt text on the image or descriptive text content

---

## Anti-Patterns

**Random span assignment:** Six feature cards with spans `[2,1,1,2,1,2]` that were chosen to "look interesting" rather than to reflect feature importance. If the spans don't reflect hierarchy, use a regular grid.

**Gradient/glow backgrounds on every cell:** Each cell having its own gradient background (`bg-gradient-to-br from-blue-900 to-purple-900`, etc.). The 2023 bento grid trend is defined by this pattern. It is immediately recognizable as templated design.

**More than 9 items in a bento:** Large bento grids become visually overwhelming. 4–8 items is the practical range for a bento that communicates hierarchy clearly.
