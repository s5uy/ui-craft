# Component Prompt: Button System

---

## Generation Scaffold

```
Generate a complete button component system for [product name].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]
- Accent color: [hex or CSS variable]

**Required variants:**
- primary: filled, highest hierarchy
- secondary: outlined/bordered
- ghost: no background/border
- destructive: danger actions only
- link: text-only, underline on hover

**Required sizes:**
- sm: h-8, text-xs
- md: h-9, text-sm (default)
- lg: h-11, text-base

**Required states for all variants:**
- default, hover, focus-visible (ring), active/pressed, disabled, loading (spinner + disabled)

**Implementation:** use CVA (class-variance-authority) for variant management

**TypeScript interface:**
- variant, size as VariantProps
- loading?: boolean
- asChild?: boolean (Radix Slot pattern if needed)

**Focus ring:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` — never suppressed

**Output the complete Button component with CVA variants and TypeScript.**
```
