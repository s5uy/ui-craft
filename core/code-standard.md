# Code Standard

All code output must meet production quality. The goal is that a senior engineer could drop it directly into a codebase without cleanup.

---

## Completeness Rules

**No truncation.** Every code output must be complete. Do not use:
- `// ... rest of component`
- `// add more items here`
- `// rest here`
- `{/* ... */}`
- Ellipsis in code blocks
- Comments that stand in for actual implementation

If a component is too large for one response, split it into logical sub-components and provide each one completely.

**All imports must be included.** Every import — React, Framer Motion, Lucide icons, shadcn primitives, Next.js modules, local components — must be present in the output.

**State must be implemented.** If a component has interactive state, implement it. Do not describe what state would look like; write it.

---

## TypeScript Rules

- All component props must have explicit TypeScript interfaces or type definitions
- No `any` types unless explicitly required and commented
- Event handler types must be explicit (`React.MouseEvent<HTMLButtonElement>` not just `any`)
- Function return types should be explicit for exported functions
- `as` casting should be used sparingly and only when genuinely necessary

```ts
// Good
interface CardProps {
  title: string
  description: string
  href?: string
  variant?: 'default' | 'elevated'
}

// Bad
const Card = ({ title, description, href, variant }: any) => {
```

---

## Component Architecture Rules

**One responsibility per component.** A component that handles layout, data fetching, and complex interaction logic is doing too much. Split it.

**Meaningful names.** Component names should describe what the component is, not where it lives or what it renders generically.

```ts
// Good
<MetricRail />
<CommandSurface />
<HeroScene />
<PricingToggle />

// Bad
<Section1 />
<TopArea />
<TheCard />
<MainThing />
```

**`"use client"` only when required.** Add it only to components that use:
- `useState` or `useReducer`
- `useEffect`
- Browser APIs
- Framer Motion animations (client-side)
- Event handlers

Do not add it as a default to every component.

**Avoid monolithic files.** When a UI has multiple distinct regions (hero, navigation, feature section, footer), each should be its own component. A single 800-line file is a failure of architecture.

---

## Tailwind Rules

**Organize classes logically.** Group related Tailwind classes:

```tsx
// Good — layout, spacing, appearance, typography, interaction
className="flex items-center gap-3 px-4 py-2 rounded-lg bg-neutral-900 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"

// Bad — random order
className="text-sm hover:bg-neutral-800 flex px-4 bg-neutral-900 font-medium rounded-lg text-white items-center py-2 transition-colors gap-3"
```

**No magic numbers in inline styles when Tailwind covers it.** Prefer Tailwind utilities over `style={{ marginTop: '24px' }}`.

**Use CSS variables for design tokens that change.** Dynamic values (colors, spacing) that respond to theme or context should use CSS variables, not Tailwind class switching.

**Avoid excessive conditional class logic.** Use `cn()` (clsx/tailwind-merge) for conditional class merging — do not build class strings with ternaries inline.

```ts
// Good
className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "elevated" && "elevated-classes"
)}

// Bad
className={`base-classes ${isActive ? 'active-classes' : ''} ${variant === 'elevated' ? 'elevated-classes' : ''}`}
```

---

## Framer Motion Rules

- Import from `"framer-motion"`, not `"motion/react"` unless that's what the project uses
- Use `variants` for complex multi-state animations — avoid duplicating `initial/animate` across many children
- `AnimatePresence` is required for exit animations — do not omit it and expect exit to work
- Use `useReducedMotion()` hook to respect system accessibility preferences on important animations
- Do not put animation logic in JSX attributes when it belongs in `variants` objects

---

## Next.js Rules

- Use `next/image` for all images — not `<img>` tags in Next.js projects
- Use `next/link` for internal navigation
- `"use client"` belongs at the top of the file, before imports
- Server Components are the default — only opt into client when required
- Dynamic imports (`next/dynamic`) should be used for heavy components that are not needed immediately

---

## shadcn Conventions

When building components that should integrate with shadcn:

- Place reusable primitives in `/components/ui`
- Place page-level compositions in `/components` or `/app`
- Use `cn()` from `/lib/utils` for class merging
- Follow the shadcn `variant` pattern for component variants using `class-variance-authority` (cva)
- Export the component and its props types

```ts
// shadcn-style component structure
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        ghost: "ghost-classes",
      },
      size: {
        default: "size-default",
        sm: "size-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
```

---

## Folder Placement Defaults

| Content type | Location |
|---|---|
| Reusable UI primitives | `/components/ui` |
| Page-level compositions | `/components` or `/app/(pages)` |
| Custom hooks | `/components/hooks` or `/hooks` |
| Utility functions | `/lib` |
| Type definitions | `/types` or co-located with component |
| Constants | `/lib/constants` |

When in doubt: co-location (putting types/hooks next to the component) is better than premature centralization.
