# Component Prompt: [Component Name]

---

## Pre-Generation Decisions

1. **Product context:** (what product is this for — informs palette and surface choices)
2. **Blueprint:** (determines corner radius, density, and surface treatment defaults)
3. **Palette + accent:** (background, border, and text tokens to use)
4. **Required variants:** (list the exact variants this component needs — no more)
5. **Required states:** (enabled, disabled, loading, error, active — only what will be used)
6. **Interactive behavior:** (hover model, focus handling, keyboard behavior)
7. **Accessibility requirements:** (aria roles, keyboard nav, focus visible)

---

## Generation Scaffold

```
Generate a [component name] component for [product name].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]
- Accent: [color and usage — accent on primary variant only unless justified]

**Required variants:**
[List variants explicitly — e.g., primary / secondary / ghost / destructive]

**Required states per variant:**
- Default
- Hover: [describe — opacity shift / border change / background change]
- Focus-visible: ring-2 ring-ring ring-offset-2
- Active/pressed: scale-[0.98] or similar tactile feedback
- Disabled: opacity-50, pointer-events-none
[Add loading, error, etc. only if the component will actually use them]

**Behavior:**
[Describe specific interaction mechanics — e.g., magnetic pull, expand on focus, etc.]

**Constraints:**
- No gradient fills or gradient text
- No glow, outer glow, or colored box-shadow
- No border-radius above rounded-lg unless Blueprint B (Spatial Immersive)
- Focus ring must meet WCAG 2.1 AA contrast

**Code requirements:**
- TypeScript with explicit prop interface
- All imports at the top of the file
- `"use client"` if using hooks or browser APIs
- Named export, not default export
- Include a [ComponentName]Demo export at the bottom showing all variants

**Output the complete component. Do not truncate.**
```

---

## Quality Criteria

Before delivering, verify:

- [ ] All required variants present
- [ ] All required states present and visually distinct
- [ ] Focus ring visible on every interactive variant
- [ ] Disabled state removes interactivity (`pointer-events-none`)
- [ ] No gradient fills or glow effects
- [ ] TypeScript interface covers all props
- [ ] Demo export shows every variant + relevant states
- [ ] Component is self-contained — no missing imports

---

## Anti-Patterns to Avoid

- Gradient fills on primary variant ("it looks more premium") — it doesn't
- Glow effects on hover or focus — these are decorative, not functional
- Variants that are slight color tweaks of each other with no functional distinction
- Animated entrance on a component that will be mounted within a page — entrance animation belongs on the page, not the atom
- Missing disabled state — every interactive component needs it
