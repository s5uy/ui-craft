# Refinement Prompt: Production-Ready

Convert demo-quality or AI-generated code into production-quality code. This prompt addresses code quality, completeness, and correctness — not just visual styling.

---

## When to Use

- The output uses placeholder content (`lorem ipsum`, `TODO`, `// ...`, `placeholder text`)
- Props are typed as `any` or missing TypeScript interfaces
- Component is incomplete (truncated, missing states, missing imports)
- Code would cause TypeScript errors in a real project
- Loading, error, and empty states are missing
- Focus rings are suppressed (`outline-none` without replacement)

---

## Pre-Conversion Audit

Check for each:

- [ ] Missing imports (`React`, `useState`, component imports, icon imports)
- [ ] `any` types on props or function arguments
- [ ] Placeholder content (lorem ipsum, `example@email.com`, `John Doe`)
- [ ] `TODO` or `// ...` comments indicating incomplete code
- [ ] Missing loading state
- [ ] Missing error state
- [ ] Missing empty state (for lists, tables)
- [ ] `outline-none` without `focus-visible:ring-2` replacement
- [ ] Hard-coded color values instead of Tailwind/CSS variable tokens
- [ ] `onClick={() => {}}` empty handlers
- [ ] Missing `"use client"` on components that use hooks
- [ ] Missing `aria-*` attributes on interactive non-native elements
- [ ] Non-functional form (no `onSubmit`, no validation)

---

## Conversion Prompt

```
Convert this component to production quality. Fix all code quality issues — do not change visual design.

**Existing code:**
[paste the existing code here]

**Issues to fix:**
[list specific issues from the audit above]

**Project context:**
- TypeScript: strict mode
- Framework: Next.js 14 App Router
- Components: shadcn/ui (if applicable)
- Forms: React Hook Form + Zod (if applicable)
- State: [local state / Zustand / etc.]

**Production quality requirements:**
1. All imports present and correct
2. All props explicitly typed — no `any`
3. All placeholder content replaced with realistic dummy data that matches the component's use case
4. All interactive states implemented: hover, focus, active, disabled, loading
5. All data-dependent states: loading skeleton, error message, empty state
6. Focus rings present on all interactive elements via `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
7. `"use client"` directive present if component uses hooks or browser APIs
8. `aria-label` on icon-only buttons, `aria-expanded` on toggles, `role` on custom interactive elements
9. Form submission handling: `onSubmit`, `preventDefault`, loading state, error handling
10. No truncated code — output the complete, runnable component

**Output the complete production-ready code. Do not truncate or use `// ...` placeholders.**
```

---

## TypeScript Interface Requirements

Every component must have an explicit prop interface:

```tsx
// WRONG
function Component({ title, data, onClick }: any) {}
function Component({ title, data, onClick }) {}  // implicit any

// RIGHT
interface ComponentProps {
  title: string
  data: DataItem[]
  onClick: (id: string) => void
  className?: string
}

function Component({ title, data, onClick, className }: ComponentProps) {}
```

## Realistic Placeholder Content Requirements

| Component type | Content requirement |
|---|---|
| User names | Real first/last names (`Sarah Chen`, `Marcus Webb`) |
| Email addresses | Realistic domains (`sarah@acme.com`, not `test@test.com`) |
| Dates | Realistic relative dates (`Mar 14, 2024`, `2 days ago`) |
| Numbers | Contextually accurate (`$84,320`, `12,847 users`, not `1234` or `99999`) |
| Company names | Specific recognizable companies or plausible fictional ones |
| Descriptions | Product-relevant, specific copy — never lorem ipsum |

---

## Quality Check After Conversion

- [ ] TypeScript compiles with zero errors in strict mode
- [ ] All imports resolve
- [ ] No placeholder text, lorem ipsum, or `TODO` remains
- [ ] Loading, error, and empty states all present for data-dependent components
- [ ] Focus rings visible on all interactive elements
- [ ] `"use client"` present where required
- [ ] No empty `onClick` handlers — all point to prop functions or have meaningful implementations
- [ ] Component renders without props that have no defaults (required props are explicitly required in the interface)
