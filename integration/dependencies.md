# Dependencies

Reference for all packages used in ui-craft output.

---

## Core

| Package | Version | Purpose |
|---|---|---|
| `next` | 14+ | Framework |
| `react` | 18+ | UI library |
| `typescript` | 5+ | Type safety |
| `tailwindcss` | 3+ | Utility CSS |
| `tailwindcss-animate` | 1+ | shadcn animation utilities |

## UI Components

| Package | Version | Purpose |
|---|---|---|
| `@radix-ui/*` | latest | Primitive UI components (via shadcn) |
| `class-variance-authority` | 0.7+ | CVA for variant management |
| `clsx` | 2+ | Class name utility |
| `tailwind-merge` | 2+ | Merge Tailwind classes without conflicts |
| `lucide-react` | 0.400+ | Icons |

## Animation

| Package | Version | Purpose |
|---|---|---|
| `framer-motion` | 11+ | Animation library |

## Forms

| Package | Version | Purpose |
|---|---|---|
| `react-hook-form` | 7+ | Form state management |
| `zod` | 3+ | Schema validation |
| `@hookform/resolvers` | 3+ | RHF + Zod integration |

## Notifications

| Package | Version | Purpose |
|---|---|---|
| `sonner` | 1+ | Toast notifications |

## Fonts

| Package | Version | Purpose |
|---|---|---|
| (built-in) | — | `next/font` for font loading |

---

## Install Command

```bash
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers sonner class-variance-authority clsx tailwind-merge
```

---

## Version Notes

- **framer-motion 11+** uses the new `motion` API. Import from `"framer-motion"` directly.
- **Next.js 14+** uses the App Router by default. All server components are default; add `"use client"` only when needed.
- **tailwindcss v3**: if using v4 (alpha/beta), the config structure differs — verify before assuming v3 patterns apply.
