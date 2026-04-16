# Spacing Systems

---

## Mental Model

Spacing communicates relationship. Elements that are closer together are related; elements further apart are separate. Every spacing decision encodes a semantic meaning — a grouping, a separation, a hierarchy. Arbitrary or inconsistent spacing creates pages that feel unorganized, even when the components themselves are well-designed.

Spacing is one of the primary tools of design hierarchy — it is not decoration, it is structure.

---

## The Tailwind Spacing Scale

Tailwind's default scale provides sufficient granularity. Use it consistently rather than inventing intermediate values.

| Token | px | Use |
|---|---|---|
| `space-0.5` | 2px | Inline icon-text gaps, very tight adjacent elements |
| `space-1` | 4px | Tag/badge internal padding, small icon gaps |
| `space-1.5` | 6px | Form field label-to-input gap |
| `space-2` | 8px | Button internal gap (icon + label), list item internal spacing |
| `space-2.5` | 10px | Nav link padding, compact list items |
| `space-3` | 12px | Card internal padding (compact), table cell padding |
| `space-4` | 16px | Standard card padding, form field spacing, section subdivision |
| `space-5` | 20px | Standard card padding (comfortable), list item spacing |
| `space-6` | 24px | Section subdivision, between-card gap in dense grids |
| `space-8` | 32px | Major section subdivisions within a page |
| `space-10` | 40px | Section margins within a layout |
| `space-12` | 48px | Between major sections on a page |
| `space-16` | 64px | Section padding (compact) |
| `space-20` | 80px | Section padding (standard) |
| `space-24` | 96px | Section padding (generous) |
| `space-32` | 128px | Section padding (editorial/immersive) |

---

## Density Levels

### Compact (developer tools, admin, data-dense)

```
Page padding:          px-4 to px-6
Section padding:       py-4 to py-8
Between sections:      gap-4 to gap-6
Card padding:          p-3 to p-4
Table row height:      py-2 to py-2.5 (32–40px)
Form field gap:        space-y-3
Between nav items:     space-y-0.5 to space-y-1
```

### Standard (most SaaS, marketing, product)

```
Page padding:          px-6
Section padding:       py-12 to py-20
Between sections:      gap-6 to gap-8
Card padding:          p-4 to p-5
Table row height:      py-3 (44–48px)
Form field gap:        space-y-4 to space-y-5
Between nav items:     space-y-1
```

### Generous (editorial, immersive, premium)

```
Page padding:          px-6 to px-8
Section padding:       py-24 to py-32
Between sections:      gap-12 to gap-16
Card padding:          p-6 to p-8
Table row height:      py-4 (56px+)
Form field gap:        space-y-6
Between nav items:     space-y-1.5 to space-y-2
```

---

## Spacing Rules

### Rule 1: Same-group items are closer than different-group items

```tsx
// WRONG — no spacing difference between label and unrelated content
<div className="space-y-4">
  <label>Project name</label>
  <input />
  <label>Description</label>
  <textarea />
  <button>Submit</button>
</div>

// RIGHT — label close to its input, more space between groups
<div className="space-y-5">
  <div className="space-y-1.5">
    <label>Project name</label>
    <input />
  </div>
  <div className="space-y-1.5">
    <label>Description</label>
    <textarea />
  </div>
  <div className="pt-2">
    <button>Submit</button>
  </div>
</div>
```

### Rule 2: Spacing scales with content weight

Headings and major sections get more space above them than below — the space above separates them from the previous section, the space below connects them to their content.

```tsx
// MORE space above heading, LESS space below (connects to content)
<section className="mt-16">
  <h2 className="mb-4 text-2xl font-semibold">Section title</h2>
  <p className="text-muted-foreground">Content that belongs to this section.</p>
</section>
```

### Rule 3: Page-level padding is consistent

Every section of a marketing page uses the same horizontal padding (`px-6`). The section content uses the same max-width wrapper. Never mix `px-4` and `px-8` across sections — it creates a jittery horizontal rhythm.

### Rule 4: Consistent gaps in grids

All cards in a grid use the same gap. Don't use `gap-4` for the metric row and `gap-6` for the chart row and `gap-8` for the secondary row in the same dashboard. Pick one gap for each semantic level and apply it consistently.

---

## Common Spacing Mistakes

**Padding inside padding:** A section with `p-8` containing a card with `p-6` creates 56px of combined padding around inner content. The effective inner padding is too large; the visual hierarchy suffers.

**Equal spacing everywhere:** Using `space-y-6` uniformly throughout a form, between field groups, between fields within a group, and between the form and its submit button. The lack of spacing variation means there are no grouping signals.

**Tight hero, spacious body:** A hero section with `py-8` followed by a features section with `py-24`. The visual rhythm is broken. Major sections need consistent vertical padding.

**Mobile padding collapse:** Generous `px-12` on desktop that collapses to `px-4` on mobile — creating a visual discontinuity as the viewport changes. Use `px-6` as the consistent base and let the max-width constraint create the centering effect on large screens.
