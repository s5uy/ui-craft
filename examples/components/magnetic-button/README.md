# Magnetic Button — Design Decisions

Blueprint: Any (palette-agnostic)
Pattern: Tactile hover effect, no glow

---

## What This Demonstrates

A button that responds to cursor proximity with a subtle magnetic pull — the label shifts toward the cursor on hover, then snaps back on leave. The effect is tactile without being decorative.

---

## Design Decisions

### Why magnetic, not glow?

Glow is visual noise. It adds light where there's no light source, creates artificial depth that competes with layout hierarchy, and looks cheap at any scale. Magnetic pull is behavioral — it communicates interactivity through motion, not decoration.

The rule: hover effects should answer "is this interactive?" not "how impressive is this?"

### Spring physics, not duration/ease

```tsx
transition={{ type: "spring", stiffness: 400, damping: 25 }}
```

Duration-based easing feels mechanical on interactive elements. Spring physics feels responsive — it follows the cursor and snaps back with natural deceleration. The specific values matter: `stiffness: 400` is snappy but not harsh; `damping: 25` prevents oscillation.

### Proximity detection, not just hover

The effect activates at 60px from center, not on `mouseenter`. This gives the pull a "reach" that feels physical. The translation is capped at ±20px — enough to feel like pull, not enough to break the layout.

### No scale transform

Scale on hover is a crutch. It signals importance through size rather than interaction quality. The magnetic effect communicates hover state without changing the element's footprint.

### Label and icon move together

Both the text label and any icon translate as a unit. Splitting them (e.g., only the arrow moves) creates a disjointed effect that reads as animation for animation's sake.

---

## What Was Deliberately Excluded

- **Background gradient on hover** — violates gradient policy; background stays `bg-primary`
- **Box shadow pulse / glow** — see `anti-patterns/glow-dependency.md`
- **Scale increase** — see decision above
- **Color flash** — transition uses opacity shift only for pressed state, no color transition
- **Cursor: pointer override** — buttons already get pointer cursor

---

## Accessibility

- Focus state is fully preserved: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Magnetic effect is input-method-specific — keyboard/focus navigation receives no motion, preserving usability
- No reduced-motion consideration needed for this pattern since it's pointer-triggered only; if `prefers-reduced-motion` is a concern for your target audience, disable the transform on `useReducedMotion()`
