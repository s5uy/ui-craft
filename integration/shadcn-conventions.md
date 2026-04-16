# shadcn Conventions

How ui-craft output integrates with shadcn/ui projects.

---

## The Core Rule

**Extend, don't parallel.** Never create a second `Button` component alongside shadcn's `Button`. Always extend the existing shadcn primitive. If the shadcn primitive doesn't have the variant you need, add it to the CVA definition in `components/ui/button.tsx`.

---

## Extending Existing Components

### Adding a variant

```tsx
// components/ui/button.tsx — add to existing CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ...",
        // ADD: new variant alongside existing ones
        brand: "bg-brand text-brand-foreground hover:bg-brand/90",
        soft: "bg-primary/10 text-primary hover:bg-primary/20",
      },
    }
  }
)
```

### Adding a size

```tsx
size: {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-8 text-base",
  icon: "h-9 w-9",
  // ADD: compact size for dense UIs
  xs: "h-7 rounded px-2 text-xs",
},
```

---

## CSS Variables vs. Hard-coded Colors

**Always use CSS variables.** Never hard-code hex values in component className — they won't respond to palette changes or dark mode.

```tsx
// WRONG
<div className="bg-[#1E293B] text-[#F8FAFC] border-[#334155]">

// RIGHT
<div className="bg-background text-foreground border-border">
// or shadcn semantic:
<div className="bg-card text-card-foreground">
```

For accent colors:
```tsx
// WRONG
<button className="bg-blue-600 hover:bg-blue-700">

// RIGHT
<button className="bg-primary hover:bg-primary/90 text-primary-foreground">
```

---

## When to Use shadcn vs. Build from Scratch

| Component | Use shadcn? | Notes |
|---|---|---|
| Button | Yes — extend CVA | Add variants, don't recreate |
| Input, Label, Textarea | Yes | Use directly |
| Select | Yes (shadcn Select) | Better than native `<select>` for complex cases |
| Simple native select | No — use `<select>` | Native is fine for simple selects |
| Dialog / Modal | Yes | Radix handles a11y |
| Dropdown Menu | Yes | Radix handles a11y |
| Card | Yes for structured cards | OK to use plain `<div>` for simple cards |
| Table | Yes for base, build rows | Use `Table`, `TableHeader`, etc. for structure |
| Command palette | Yes — shadcn Command (cmdk) | Best option for keyboard nav |
| Toast | Yes — shadcn Sonner | Best option |
| Custom animation component | No — build | Framer Motion directly |
| Simple flex/grid layout | No — build | `<div className="flex...">` is fine |

---

## Form Integration Pattern

shadcn + React Hook Form + Zod:

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
})

type FormData = z.infer<typeof schema>

export function ExampleForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Sarah Chen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="sarah@acme.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}
```
