# Premium Toast — Design Decisions

Blueprint: Any (palette-agnostic)
Pattern: Clean hierarchy, polished enter/exit animation

---

## What This Demonstrates

A toast notification system built from scratch with Framer Motion — not a wrapper around Sonner, but a direct implementation that shows what the pattern looks like at the component level. Four semantic types (success, error, warning, info), clean typography hierarchy, and enter/exit motion that feels intentional.

---

## Design Decisions

### Why build this instead of using Sonner?

Two reasons:

1. **This example demonstrates the pattern.** When you need to understand how a toast *works* — hierarchy, motion, state management — you need to read it, not configure it. Sonner is the production choice; this is the learning artifact.

2. **Full control over the exit animation.** `AnimatePresence mode="popLayout"` handles reflow correctly as toasts are dismissed — items above shift down smoothly rather than jumping. Sonner handles this internally; this shows you how.

### Typography hierarchy inside the toast

```
title        — text-sm font-medium text-foreground
description  — text-sm text-muted-foreground
```

The title carries the semantic content ("Payment failed"). The description provides resolution ("Check your card details and try again"). They are different weights and colors, not just sizes. Never make them the same visual weight.

### Left border, not background fill

Semantic color lives in the left border (`border-l-4`), not the background. Background stays `bg-background`. This keeps the component legible in any palette — it doesn't fight the page surface color, and the accent reads as signal, not decoration.

Anti-pattern avoided: colored backgrounds (`bg-green-50`, `bg-red-50`) look like form validation states, not toasts. They feel heavy and dated.

### Enter from bottom-right, exit toward bottom-right

```tsx
initial={{ opacity: 0, y: 16, scale: 0.96 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: 8, scale: 0.96 }}
```

The y offset on enter gives the appearance of rising into place. Exit collapses slightly downward — it doesn't disappear in place (flat fade), and it doesn't fly off screen. The `scale: 0.96` softens the transition.

Duration is 0.2s enter, 0.15s exit — toasts are peripheral UI; they shouldn't demand attention on arrival or linger on departure.

### Auto-dismiss with pause-on-hover

4000ms default duration. Mouse over pauses the timer. This is the correct pattern for toasts that contain actionable information — "View in account" links, undo buttons — the user can read without racing the timer.

### `mode="popLayout"` on AnimatePresence

When a toast is dismissed, items above it shift down into the vacated space. `mode="popLayout"` animates that reflow rather than jumping. Critical for stacks of 2+ toasts.

---

## What Was Deliberately Excluded

- **Progress bar** — adds visual noise; the hover-to-pause pattern is sufficient feedback
- **Icon animations** (spinning, pulsing) — the icon communicates type; it doesn't need to perform
- **Gradient border** — see gradient policy; a solid 4px left border achieves the same semantic signal
- **Colored background** — explained above
- **Maximum 5 toasts** — the stack cap prevents overwhelming the user; oldest is removed when 5 is reached
