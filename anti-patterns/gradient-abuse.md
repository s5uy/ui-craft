# Gradient Abuse

Decorative gradients are the most visible marker of AI-generated UI. This file documents every form of gradient misuse, why each fails, and the correct alternative. Reference `core/gradient-policy.md` for the acceptance test.

---

## The Gradient Acceptance Test (Summary)

A gradient is only acceptable if ALL THREE conditions are met:
1. It encodes data or meaningful state (not decoration)
2. No flat alternative achieves the same visual result
3. It passes WCAG AA contrast at every point along its range

If any condition fails, remove the gradient entirely. There is no "reduced gradient" — there is gradient or no gradient.

---

## Gradient Failure Modes

### Hero Section Background Gradient

**Pattern:**
```tsx
// WRONG
<section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
```

**Why it's generated:** Dark gradient backgrounds are a near-universal pattern in AI-generated hero sections. The AI associates them with "modern, dark, premium" UI.

**Why it fails:** The gradient provides no information. It exists to make the section feel "designed." It directly violates the gradient policy. It also looks identical across hundreds of products.

**Fix:** Solid background. `bg-[#09090B]` or `bg-zinc-950` on dark. `bg-background` on light. The typographic hierarchy and composition communicate the design quality — not the background color transition.

---

### Card Background Gradient

**Pattern:**
```tsx
// WRONG
<div className="bg-gradient-to-br from-blue-950 to-indigo-950 rounded-xl p-6">
```

**Why it's generated:** Card gradients are used to "add visual interest" to otherwise neutral cards.

**Why it fails:** The gradient is pure decoration. The card's job is to contain information, not to be visually interesting. The gradient also creates variable contrast conditions — text that passes contrast at one end may fail at the other.

**Fix:** `bg-card` or `bg-muted/30`. Surface elevation through border, tonal background difference, or shadow — not gradient fill.

---

### Text Gradient (Gradient Headline)

**Pattern:**
```tsx
// WRONG
<h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
  Build the future
</h1>
```

**Why it's generated:** Gradient text appears across thousands of marketing pages and design systems. It is perhaps the single most common AI-generated visual pattern.

**Why it fails:** Text contrast is inconsistent across the gradient — the transition point may fall below 4.5:1. The pattern is immediately recognizable as template-originated. It degrades readability.

**Fix:**
```tsx
// RIGHT
<h1 className="text-foreground text-5xl font-semibold tracking-tight">
  Build the future
</h1>

// RIGHT — when tonal variation is needed
<h1 className="text-5xl font-semibold tracking-tight">
  <span className="text-foreground">Build</span>{" "}
  <span className="text-muted-foreground">the future</span>
</h1>
```

---

### Button Gradient Fill

**Pattern:**
```tsx
// WRONG
<button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg px-6 py-3">
  Get started
</button>
```

**Why it's generated:** Gradient buttons appear in UI kits as "premium CTA" variants.

**Why it fails:** The gradient adds visual noise without adding hierarchy information. The flat solid color version is visually cleaner and more authoritative.

**Fix:**
```tsx
// RIGHT
<button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium text-sm transition-colors">
  Get started
</button>
```

---

### Border Gradient (Gradient Border Card)

**Pattern:**
```tsx
// WRONG
<div className="rounded-xl p-[1px] bg-gradient-to-br from-purple-500 to-pink-500">
  <div className="rounded-xl bg-card p-6">
    {/* content */}
  </div>
</div>
```

**Why it's generated:** Gradient borders appear in component library demos as a way to "highlight" featured or selected items.

**Why it fails:** The gradient border uses the same visual vocabulary as glow effects — it signals "this was designed for a screenshot," not "this is production UI." The 1px wrapper technique is also fragile across border-radius and viewport sizes.

**Fix:** A solid-color accent border when selection/highlight state is needed:
```tsx
// RIGHT
<div className="rounded-xl border-2 border-primary bg-card p-6">
  {/* selected card content */}
</div>
```

---

### Section Separator Gradient

**Pattern:**
```tsx
// WRONG
<div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
```

**Why it's generated:** Fading horizontal rules appear in design inspiration content as an "elegant" separator.

**Why it fails:** This is decoration that adds visual complexity to what should be a clean structural separator. The fade effect doesn't communicate anything.

**Fix:**
```tsx
// RIGHT
<hr className="border-border" />
// OR just use spacing — a horizontal rule is not always needed
```

---

### Sidebar/Navigation Gradient

**Pattern:**
```tsx
// WRONG
<aside className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen">
```

**Why it's generated:** Gradient sidebars appear in admin dashboard templates.

**Why it fails:** The gradient adds no information. The sidebar's visual role is established by its position and border/shadow — not by a background gradient.

**Fix:** `bg-sidebar` or `bg-card` solid background. Separation from main content via `border-r border-border`.

---

### Progress/Loading Gradient Shimmer

**Pattern:**
```tsx
// WRONG — decorative shimmer background on skeleton
<div className="h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
```

**Why it's generated:** Gradient shimmer skeletons appear in many popular UI libraries.

**Why it fails:** The gradient shimmer exists purely for visual polish. A solid muted background with opacity pulse communicates the loading state equally well without the gradient.

**Fix:**
```tsx
// RIGHT
<div className="h-4 w-full rounded bg-muted animate-pulse" />
```

---

## Checklist: Gradient Removal

When reviewing any generated output for gradient removal:

- [ ] `bg-gradient-to-*` — any occurrence outside of genuine data encoding
- [ ] `from-* via-* to-*` classes — any decorative use
- [ ] `bg-clip-text text-transparent` — gradient text
- [ ] `p-[1px]` wrapper with gradient parent — gradient border
- [ ] `via-transparent` separator — fading rule
- [ ] `background-image: linear-gradient(...)` in inline styles
- [ ] Animated gradient backgrounds (`@keyframes` or animated position)

Every one of these should be removed unless it passes all three conditions of the gradient acceptance test.
