# Adaptation Prompt: shadcn Integration

Use when adding new UI to an existing project that uses shadcn/ui.

---

## Generation Scaffold

```
Generate [component/page] for a Next.js project using shadcn/ui.

**Project context:**
- shadcn components installed: [list: Button, Input, Card, etc.]
- tailwind.config.ts uses CSS variables: yes (standard shadcn setup)
- Path alias: `@/` for `src/` or root

**Design system:**
- Blueprint: [chosen]
- Palette: mapped to shadcn CSS variables (below)

**shadcn CSS variable mapping:**
- `--background`: [value from palette]
- `--foreground`: [value]
- `--card`: [value]
- `--muted`: [value]
- `--muted-foreground`: [value]
- `--border`: [value]
- `--ring`: [accent color for focus rings]
- `--primary`: [accent color]
- `--primary-foreground`: [text on primary]
- `--destructive`: `#DC2626`
- `--destructive-foreground`: `#FFFFFF`

**Component usage rules:**
- Use shadcn `Button` for all buttons — add missing variants to existing CVA rather than creating parallel component
- Use shadcn `Input`, `Label`, `Textarea` for form primitives
- Use shadcn `Card`, `CardHeader`, `CardContent`, `CardFooter` for structured cards
- Use shadcn `Dialog` for modals
- Use shadcn `DropdownMenu` for dropdown menus
- Build directly (without shadcn primitives) when the component has no shadcn equivalent or when shadcn's primitive is heavier than needed (e.g., simple list items)

**Folder placement:**
- Reusable components: `components/ui/[component-name].tsx`
- Feature-specific components: `components/[feature]/[component-name].tsx`
- Page components: `app/[route]/page.tsx`

**Do not:**
- Create a second Button component alongside shadcn's Button
- Hard-code hex values that should be CSS variables
- Use `className` overrides that fight shadcn's default styles — extend CVA instead

**Output the complete component using shadcn primitives where appropriate.**
```

---

## Common shadcn Extension Patterns

### Adding a variant to Button

```tsx
// In components/ui/button.tsx — extend the existing CVA definition
const buttonVariants = cva(
  "...", // keep existing base
  {
    variants: {
      variant: {
        // existing variants...
        default: "...",
        destructive: "...",
        outline: "...",
        secondary: "...",
        ghost: "...",
        link: "...",
        // ADD new variant here:
        brand: "bg-brand text-brand-foreground hover:bg-brand/90",
      },
      // ...
    }
  }
)
```

### Adding a custom token

```css
/* In globals.css, inside :root */
:root {
  /* existing shadcn vars */
  --background: 0 0% 100%;
  /* add custom token: */
  --brand: 221 83% 53%;
  --brand-foreground: 0 0% 100%;
}

.dark {
  /* dark mode values */
  --brand: 217 91% 65%;
}
```
