# Functional Accents

No decorative accent color. Color used only for semantic meaning — success, warning, error, and selection state. The neutral system carries all hierarchy and organization; color exists exclusively as a communication signal.

---

## When This Is the Right Strategy

Functional-only accent is the correct choice when:

**The product is data-dense and color must mean something.** In monitoring dashboards, financial terminals, and analytics platforms, a non-semantic accent introduces ambiguity. If blue appears both as the "informational" state color and as the decorative CTA color, users must learn to distinguish two uses of blue — cognitive overhead that serves no one.

**The product is a professional tool where formality matters.** In legal, compliance, or high-stakes clinical software, decorative color reads as frivolous. The product gains authority from its restraint.

**The neutral palette is strong enough to carry hierarchy without color help.** If the typography, spacing, and surface layering are doing their jobs, color is not required for hierarchy.

**The brand identity is defined by its restraint.** Some products — particularly developer tools and minimal SaaS — gain distinctiveness from using less color than their competitors.

---

## The Semantic Color Set

Every product using functional accents must have a consistent, complete semantic color set. Define it once, apply it everywhere.

### Standard semantic set

```
Positive / Success:
  primary:    #059669  (emerald-600)
  subtle:     #D1FAE5  (emerald-100) — background tints
  text:       #065F46  (emerald-800) — text on light backgrounds

Warning:
  primary:    #D97706  (amber-600)
  subtle:     #FEF3C7  (amber-100)
  text:       #92400E  (amber-800)

Danger / Error:
  primary:    #DC2626  (red-600)
  subtle:     #FEE2E2  (red-100)
  text:       #991B1B  (red-800)

Info / Neutral-active:
  primary:    #2563EB  (blue-600)
  subtle:     #DBEAFE  (blue-100)
  text:       #1E40AF  (blue-800)
```

In dark mode, shift the primary values one step lighter for contrast:
```
Success:  #34D399  (emerald-400)
Warning:  #FCD34D  (amber-300)
Danger:   #F87171  (red-400)
Info:     #60A5FA  (blue-400)
```

### Consistency rule

If success is emerald-600 in the data table status badges, it must be emerald-600 in the toast notifications, in the form validation messages, and in the metric delta indicators. Any deviation undermines the semantic vocabulary.

---

## Interactive States Without Accent Color

Without a decorative accent, interactive states need other signals:

### Buttons (no accent)

```tsx
// Primary action — uses contrast and surface elevation, not accent color
<button className="bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950 transition-colors px-5 py-2.5 rounded-lg font-medium text-sm">
  Deploy
</button>

// Secondary action
<button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors px-5 py-2.5 rounded-lg font-medium text-sm">
  Cancel
</button>
```

### Navigation active state (no accent)

```tsx
// Active state through weight + surface, not color
<a className={cn(
  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
  isActive
    ? "bg-gray-100 text-gray-900 font-semibold"
    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-normal"
)}>
```

### Focus rings (exception — can use a neutral)

Focus rings must still be visible. In a no-accent system, use a strong neutral:

```css
:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.5);  /* dark mode: rgba(255,255,255,0.5) */
  outline-offset: 2px;
}
```

Or use the `info` semantic color for focus rings — it is the one semantic color that can serve a dual purpose without ambiguity.

---

## What Functional Accents Requires of Typography and Composition

When color is removed from hierarchy duties, everything else must work harder:

**Typography must do more:** Weight contrast, scale contrast, and tonal opacity differences must create clear hierarchy. `font-semibold` headings vs. `font-normal` body vs. `text-gray-400` metadata. These distinctions must be crisp.

**Spacing must be deliberate:** Grouping through proximity becomes the primary organizational tool. Related elements are close; unrelated elements have more breathing room.

**Surface treatment must be precise:** Panel backgrounds, border visibility, and tonal separation need to be thoughtfully calibrated — they are doing the work that color might otherwise do.

If these systems are weak, the removal of color will make the product feel flat and undifferentiated. Functional accents work only when the non-color systems are strong.

---

## Products That Use This Well

- **Linear** — near-monochrome UI, semantic color only for priority/status indicators
- **GitHub** — semantic colors for CI status, diff colors, PR status; neutral for navigation and chrome
- **Terminal / CLI interfaces** — output colors are semantic (error red, success green); UI chrome is monochrome
