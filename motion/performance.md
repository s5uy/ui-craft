# Motion Performance

Animations that stutter or cause jank destroy the craft signal immediately. Every animation must pass these checks before it ships.

---

## The Compositor Thread Rule

The GPU compositor can animate exactly two CSS properties without involving the CPU:
- `transform` (translate, scale, rotate, skew)
- `opacity`

Everything else triggers layout or paint on the main thread.

**Never animate these:**
```css
/* Each of these triggers layout recalculation — guaranteed jank */
width, height, top, left, right, bottom
margin, padding
border-width
font-size
```

**Never animate these (triggers paint):**
```css
background-color   /* use opacity on a pseudoelement instead */
box-shadow         /* use opacity on a ::after shadow instead */
border-color
color              /* exception: text-color changes are rarely performance-critical */
```

**Pattern — animate shadow without layout/paint:**
```css
/* Instead of animating box-shadow directly: */
.card {
  position: relative;
}
.card::after {
  content: '';
  position: absolute; inset: 0;
  border-radius: inherit;
  box-shadow: 0 8px 32px oklch(0 0 0 / 0.2);
  opacity: 0;
  transition: opacity 300ms ease;
}
.card:hover::after { opacity: 1; }
```

---

## `will-change` Discipline

`will-change` tells the browser to promote an element to its own compositor layer before animation starts — eliminating the initial frame stutter.

**Use it:**
```css
/* Only on elements that will animate within the current render */
.animated-element {
  will-change: transform, opacity;
}
```

**Remove it after animation completes:**
```tsx
// In Framer Motion — Framer handles this automatically for whileHover/whileInView
// For manual animations:
el.addEventListener('animationend', () => {
  el.style.willChange = 'auto';
});
```

**Never use on everything:**
```css
/* This pattern destroys performance — forces GPU layer for every element */
* { will-change: transform; } /* Don't do this */
```

**Layer budget:** Each `will-change` element creates a GPU texture. On mobile, GPU memory is limited. Aim for fewer than 10 simultaneously promoted elements per page.

---

## INP Budget (Interaction to Next Paint)

Google's Core Web Vitals replaced FID with INP. Target: **<200ms** for all interactions.

Animation can blow the INP budget by blocking the main thread during the response to a user event.

**What eats INP budget:**
- Starting a complex GSAP timeline on click (JS execution before paint)
- Running heavy JavaScript in a `whileTap` handler
- Animating non-compositor properties (layout/paint on interaction)
- Large `useLayoutEffect` running synchronously on interaction

**Pattern — defer heavy work after interaction feedback:**
```tsx
const handleClick = () => {
  // 1. Give immediate visual feedback (< 16ms)
  setIsPressed(true);

  // 2. Defer heavy work until after frame is painted
  requestAnimationFrame(() => {
    setTimeout(() => {
      runExpensiveOperation();
    }, 0);
  });
};
```

**Pattern — optimistic UI (never wait for server for motion):**
```tsx
const handleAddToCart = async () => {
  // Start animation immediately — don't wait for API
  setCount(prev => prev + 1);
  animateBadge();

  // Fire and handle error after
  try {
    await api.addToCart(itemId);
  } catch {
    setCount(prev => prev - 1); // revert
  }
};
```

---

## 120fps on ProMotion Displays

MacBook Pro and iPhone Pro displays run at 120Hz. At 60fps animations look fine. At 120fps, they look smooth as butter — or if your animation is poorly implemented, the jank is more visible.

**What breaks 120fps:**
- JavaScript that runs per-frame and takes >8ms (120fps frame budget)
- `requestAnimationFrame` with heavy computation inside
- CSS animations that trigger paint (as above)
- GSAP ticker with expensive math per frame

**What helps 120fps:**
- Framer Motion's internal batching already respects `requestAnimationFrame`
- CSS `transform` and `opacity` run on GPU at any refresh rate
- `useSpring` values are computed internally — low overhead
- GSAP with `transform`-only props: already GPU-optimized

**Measurement:**
```js
// Chrome DevTools → Performance panel → ⚙ Settings → Enable "High refresh rate mode"
// Then record — frame bars should be ≤ 8.33ms at 120fps
```

---

## Framer Motion Bundle Size

Full Framer Motion import (not tree-shaken): ~45kb gzipped.

**Reduce bundle when only using specific features:**
```tsx
// Instead of importing from 'framer-motion' directly (full bundle):
import { motion } from 'framer-motion';

// Use m (alias) + LazyMotion for code splitting:
import { LazyMotion, domAnimation, m } from 'framer-motion';

function App() {
  return (
    <LazyMotion features={domAnimation}> {/* loads async */}
      <m.div animate={{ opacity: 1 }} />
    </LazyMotion>
  );
}
// domAnimation = ~17kb gzipped (covers 90% of use cases)
// domMax = ~25kb gzipped (adds drag, layout animations)
```

**When to use LazyMotion:** Any public-facing marketing page where initial load matters. Skip for internal tools/dashboards where users are logged in.

---

## Scroll Performance

**Passive scroll listeners:**
```js
// Always passive — prevents scroll jank
window.addEventListener('scroll', handler, { passive: true });
```

**Framer Motion `useScroll` is passive by default.** No action needed.

**Custom cursor / cursor-follow pattern (common source of jank):**
```tsx
// BAD — setState on every mousemove triggers React re-render per frame
const [pos, setPos] = useState({ x: 0, y: 0 });
const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY }); // re-renders at 60fps

// GOOD — MotionValue bypasses React render cycle
const cursorX = useMotionValue(0);
const cursorY = useMotionValue(0);
const handleMove = (e) => {
  cursorX.set(e.clientX);
  cursorY.set(e.clientY);
};
// Framer updates the DOM directly, no re-render
```

**Large scroll-linked scenes:**
```tsx
// Throttle expensive computations in scroll handlers
const throttledHandler = useCallback(
  throttle((progress: number) => {
    expensiveComputation(progress);
  }, 16), // 16ms = ~60fps cap on expensive work
  []
);
```

---

## Simultaneous Animation Count

**Rule:** Max 3-4 complex animations active in the viewport at the same time.

Complex = spring physics, scroll-linked MotionValue, or IntersectionObserver-triggered.

Simple = CSS `transition` on hover — these don't count (GPU only).

**Detection — if you see this in DevTools, you have too many:**
- Frequent "Recalculate Style" blocks in Performance trace
- Main thread > 50% busy during scroll
- Frame time spikes > 16ms without scroll jank

---

## Pre-ship Checklist

```
□ All animated properties are transform or opacity
□ will-change present on scroll-animated elements; removed after animation ends
□ prefers-reduced-motion short-circuits ALL animation (final state immediately)
□ Scroll listeners are passive
□ Cursor-follow uses MotionValue, not useState
□ IntersectionObserver instances are disconnected in cleanup
□ AnimatePresence wraps all conditionally-rendered animated elements
□ whileInView uses once: true (never re-animates on scroll-up)
□ No more than 3-4 complex animations simultaneously in viewport
□ Exit transitions are faster than enter transitions
□ Tested on a mid-range Android device (not just MacBook)
```
