# Card Patterns

---

## Mental Model

A card is a contained unit of related information. Its surface treatment should be the minimum needed to create visual separation from its background — not a stage for decoration. The card's visual weight must be proportional to the weight of the information it contains.

The most common card mistake: making the card visually heavier than its content warrants.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Surface | Contains and separates the content | Yes |
| Border or background contrast | Defines the card edge | Yes (one or the other) |
| Header area | Title + key identifier | Situational |
| Content area | Primary information | Yes |
| Footer area | Actions, metadata, secondary info | Situational |
| Interactive overlay | Hover state for clickable cards | Yes if card is clickable |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Default (static) | — | Background + border, no shadow |
| Default (clickable) | — | Background + border, subtle shadow |
| Hover (clickable) | Mouse enter | Slight border lightening or shadow increase, `cursor-pointer` |
| Focus (clickable) | Keyboard | `focus-visible:ring-2 focus-visible:ring-ring` on the link/button wrapper |
| Selected | User selects | Accent-tinted border or background |
| Loading | Data pending | Skeleton replaces content |

---

## Implementation

### Static content card

```tsx
interface CardProps {
  title: string
  description: string
  meta?: string
}

export function Card({ title, description, meta }: CardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      {meta && (
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
          {meta}
        </p>
      )}
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
```

### Clickable card (link wrapper)

```tsx
import Link from "next/link"

interface ClickableCardProps {
  title: string
  description: string
  href: string
  meta?: string
}

export function ClickableCard({ title, description, href, meta }: ClickableCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-border bg-card p-5 transition-colors hover:border-border/80 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {meta && (
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
          {meta}
        </p>
      )}
      <h3 className="font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Link>
  )
}
```

### Card with actions footer

```tsx
interface ActionCardProps {
  title: string
  description: string
  status: "active" | "paused" | "draft"
  onEdit: () => void
  onDelete: () => void
}

const statusConfig = {
  active: { label: "Active", className: "text-emerald-600 bg-emerald-50" },
  paused: { label: "Paused", className: "text-amber-600 bg-amber-50" },
  draft: { label: "Draft", className: "text-muted-foreground bg-muted" },
}

export function ActionCard({ title, description, status, onEdit, onDelete }: ActionCardProps) {
  const { label, className: statusClass } = statusConfig[status]

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card">
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusClass}`}>
            {label}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
        <button
          onClick={onEdit}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm font-medium text-destructive transition-colors hover:text-destructive/80"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
```

### Metric card

```tsx
interface MetricCardProps {
  label: string
  value: string
  change?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
  description?: string
}

export function MetricCard({ label, value, change, description }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
        {label}
      </p>
      <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      {change && (
        <p className={`mt-1.5 text-sm font-medium ${
          change.direction === "up"
            ? "text-emerald-600"
            : change.direction === "down"
            ? "text-red-600"
            : "text-muted-foreground"
        }`}>
          {change.direction === "up" ? "↑" : change.direction === "down" ? "↓" : "→"}{" "}
          {change.value}
        </p>
      )}
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
```

---

## Integration Notes

**With shadcn:** The shadcn `Card`, `CardHeader`, `CardContent`, `CardFooter` primitives are excellent for complex cards. For simple cards, inline Tailwind is cleaner.

**With Framer Motion:** Clickable cards can use a subtle hover lift:
```tsx
import { motion } from "framer-motion"

<motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
  {/* card content */}
</motion.div>
```
This must be used sparingly. Not every card needs motion.

**TypeScript:** Define specific prop interfaces per card type — avoid catch-all `data: any` patterns.

---

## Quality Benchmarks

A production-grade card must:

- Have clear visual separation from its background (border or background contrast — not both unless the design specifically requires layering)
- Handle variable-length content without breaking layout (no fixed heights that clip)
- Have a minimum clickable area of the full card for clickable variants (not just the title)
- Show a loading state if the card data is fetched asynchronously
- Use `tabular-nums` on any numerical data displayed as a metric

---

## Anti-Patterns

**Heavy shadow as the primary separator:** `shadow-xl` on every card creates visual heaviness. Cards should feel part of the page, not floating above it. `shadow-sm` maximum for static cards. No colored or glow shadows.

**Gradient backgrounds on cards:** `bg-gradient-to-br from-blue-50 to-purple-50` on card surfaces is decoration. Card backgrounds should be neutral surface colors.

**Icon blobs on feature cards:** A colored circle (`bg-blue-100`) with an icon inside it, placed at the top of each feature card. This is the `icon-in-blob` pattern from AI feature sections — it adds decoration without meaning. Use the icon directly or omit it.

**Equal-height grid with truncated content:** Forcing equal card heights with `overflow-hidden` or `line-clamp-2` to make a grid look tidy — but cutting off meaningful content. If content varies in length, let cards vary in height or create layouts that accommodate it.

**Border + shadow + background tint simultaneously:** Three methods of separation at once. Each additional separator reduces the signal value of all others.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | `bg-[#111111] border border-white/8`, no shadow, tight padding `p-4`, metric values in monospace with semantic color delta indicators |
| Spatial Immersive | Tonal card without border (`bg-zinc-900` on `bg-zinc-950`), generous `p-6`, `rounded-xl`, very subtle shadow only on elevated modals |
| Editorial Brutalism | `border-2 border-black`, `rounded-none`, `bg-white`, hard shadow `shadow-[4px_4px_0_0_#000]` or no shadow, no background variation |
| Enterprise Neutral | `bg-white border border-gray-200 rounded-md shadow-sm`, conventional, standard `p-4` or `p-5` |
| Editorial Warm | `bg-[#FFFFFF] border border-[#E6E2D8]`, warm border, `rounded-md`, slightly generous `p-5` padding, warm muted text |
