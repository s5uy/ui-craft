# Button Patterns

---

## Mental Model

Buttons communicate the actions available to the user and their relative importance. The visual hierarchy of buttons on any given surface must exactly match the intention hierarchy: the most important action is visually dominant, secondary actions recede, destructive actions are clearly distinct.

A button system is not a set of pretty shapes. It is a hierarchy communication tool.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Label | Action description | Yes |
| Leading icon | Visual reinforcement of action type | No — use only when it genuinely clarifies |
| Trailing icon | Direction/state signal (loading, external) | No |
| Background/border | Variant hierarchy signal | Yes |
| Focus ring | Keyboard navigation accessibility | Yes |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Default | — | Full color, full opacity |
| Hover | Mouse enter | Slight background darkening (`/90` or `hover:bg-primary/90`) |
| Focus | Keyboard Tab | Visible ring: `ring-2 ring-ring ring-offset-2` |
| Active/Pressed | Mouse down | Slightly darker than hover state |
| Disabled | `disabled` prop | `opacity-50 cursor-not-allowed pointer-events-none` |
| Loading | Action in progress | Spinner replacing or preceding label, button disabled |

---

## The Variant Hierarchy

Every button system must define a clear hierarchy. Each level carries a specific weight and is used in specific contexts.

### Primary — the dominant action

```tsx
<button className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
  Deploy
</button>
```

**Usage:** One per view maximum (the most important action). CTAs, form submission, confirmation.

### Secondary — important but not dominant

```tsx
<button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
  Cancel
</button>
```

**Usage:** Alternatives to primary actions, non-destructive secondary operations.

### Ghost — low visual weight

```tsx
<button className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
  View details
</button>
```

**Usage:** Tertiary actions, inline contextual actions in tables or cards where a border would add too much visual weight.

### Destructive — irreversible actions

```tsx
<button className="inline-flex items-center justify-center rounded-md bg-destructive px-5 py-2.5 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
  Delete project
</button>
```

**Usage:** Delete, remove, revoke, purge. Must never appear as the default action — always requires a confirmation step for irreversible operations.

### Link — lowest visual weight

```tsx
<button className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
  Learn more
</button>
```

**Usage:** Navigation-like actions within content, help/documentation links, "see all" in compact contexts.

---

## Implementation — Using CVA

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border border-input bg-background text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-5",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  children: React.ReactNode
}

export function Button({ variant, size, loading, disabled, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
```

---

## Integration Notes

**With shadcn:** If the project has shadcn's Button component, extend it rather than creating a new one. Add missing variants to the existing CVA definition.

**Focus rings:** Never `outline-none` without a replacement. The `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` chain is the minimum.

**TypeScript interface:**
```tsx
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean  // if using Radix Slot
}
```

---

## Quality Benchmarks

A production-grade button system must:

- Have visible focus rings on all variants under `:focus-visible`
- Communicate the `loading` state — never leave the user wondering if their click registered
- Have the destructive variant clearly distinguishable from the primary variant at a glance
- Handle long label text gracefully — no overflow, wrapping only when `w-full` is intended
- Have consistent height across variants of the same size (avoid variants that change padding enough to shift adjacent element alignment)
- Never use `cursor-pointer` globally — only on interactive elements

---

## Anti-Patterns

**Every action uses the primary (filled) variant:** Three blue-filled buttons in a row is not a hierarchy, it's a confusion. One primary maximum per context.

**Shadow on hover for "depth":** `hover:shadow-lg` or a glow effect on hover is Class C decoration. The hover state should be a subtle color change only.

**Icon with no label for ambiguous actions:** An icon-only button (`<Button size="icon">`) is valid for universal icons (close X, edit pencil) in clear contexts. Never for actions that require context to understand.

**Rounded-full on standard buttons:** Pills (`rounded-full`) on buttons signal consumer app or marketing site. In product UIs, `rounded-md` is the correct default.

**Gradient fill on primary CTA:** The primary button does not need a gradient to stand out. If the hierarchy requires the primary CTA to be visually distinct, the fix is reducing the weight of surrounding elements — not adding decoration to the button.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | `rounded` (tight), primary uses semantic green `bg-green-500/10 text-green-400 border border-green-500/20` or solid white on dark; `h-8 px-3 text-xs` standard size |
| Spatial Immersive | `rounded-lg` generous, primary uses `bg-white text-black` on dark, or `bg-zinc-900 text-white` on light; larger size `h-10 px-6` common |
| Editorial Brutalism | `rounded-none`, primary is full black `bg-black text-white`, hover inverts to `bg-white text-black border border-black` |
| Enterprise Neutral | `rounded-md` standard, primary `bg-blue-600 text-white hover:bg-blue-700`, conventional implementation |
| Editorial Warm | `rounded-md`, primary `bg-stone-900 text-stone-50`, minimal color — no accent in buttons unless a single accent system is active |
