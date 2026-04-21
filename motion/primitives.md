# Motion Primitives

Named tokens for duration, easing, and spring physics. Use these instead of inline numbers so motion stays consistent across the project and design direction.

Import the tokens once. Reference them everywhere.

---

## Duration Scale

```ts
// motion/tokens.ts
export const duration = {
  instant:  100,  // cursor follow, color on hover
  fast:     150,  // micro-interaction, button tap, tooltip
  quick:    200,  // dropdown open, badge update
  standard: 300,  // small reveal, popover, toggle
  moderate: 400,  // card reveal, modal enter
  prominent: 600, // section reveal, hero sub-element
  dramatic:  800, // hero entrance, page-level transition
  cinematic: 1200, // EL reveal, scroll-set-piece
  epic:      1600, // EL hero, maximum — never on repeat
} as const;
```

**Rule:** Don't invent durations outside this scale. If something feels off, use the adjacent step, not a custom value.

---

## Easing Catalog

```ts
// motion/tokens.ts — Framer Motion format (bezier arrays)
export const ease = {
  // Decelerations — element entering the frame
  outExpo:  [0.22, 1, 0.36, 1],      // Cinematic, dramatic. EL default.
  outQuart: [0.25, 1, 0.5, 1],       // Clean, smooth. TM default.
  outCubic: [0.33, 1, 0.68, 1],      // Gentle. DE secondary reveals.
  outQuint: [0.23, 1, 0.32, 1],      // Similar to outExpo, slightly softer.

  // UI state — bidirectional transitions
  inOut:     [0.65, 0, 0.35, 1],     // Modal, drawer, tab content switch.
  inOutSoft: [0.4, 0, 0.2, 1],       // EL slow-in-slow-out.

  // Accelerations — element leaving the frame
  inCubic:  [0.32, 0, 0.67, 0],      // Elements exiting; exits must be faster than enters.

  // Sharp — UI micro-interaction
  sharp:    [0.4, 0, 0.6, 1],        // Toggle state, checkbox, switch.
} as const;

// CSS custom property equivalents
// --ease-out-expo:   cubic-bezier(0.22, 1, 0.36, 1)
// --ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1)
// --ease-out-cubic:  cubic-bezier(0.33, 1, 0.68, 1)
// --ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1)
// --ease-sharp:      cubic-bezier(0.4, 0, 0.6, 1)
```

**GSAP equivalents:**
| Token | GSAP ease string |
|-------|----------------|
| outExpo | `'expo.out'` |
| outQuart | `'quart.out'` |
| outCubic | `'cubic.out'` |
| inOut | `'power2.inOut'` |
| inCubic | `'cubic.in'` |

---

## Spring Presets

Named springs for Framer Motion. Physics, not duration. Springs terminate when velocity reaches zero — don't pair with `duration`.

```ts
export const spring = {
  // Snappy — no visible bounce. UI state changes (toggle, dropdown, tooltip).
  snappy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 32,
    mass: 1,
  },

  // Tight — fast settle with micro-tail. Button hover, badge pop.
  tight: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 28,
    mass: 1,
  },

  // Settled — controlled with a barely-visible bounce. DE hover, card interact.
  settled: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 24,
    mass: 1,
  },

  // Bouncy — visible bounce. VP signature. Hover cards, button scale.
  bouncy: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
    mass: 1,
  },

  // Floaty — slow settle, dreamy. DE hero elements, VP floating art.
  floaty: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 10,
    mass: 1.2,
  },

  // Magnetic — for cursor-follow elements. High stiffness, low damping = responsive with tail.
  magnetic: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 15,
    mass: 1,
  },
} as const;
```

**Spring behavior reference:**

| Preset | Stiffness | Damping | Feel | Direction fit |
|--------|-----------|---------|------|--------------|
| snappy | 500 | 32 | Instant, no tail | TM, all |
| tight | 400 | 28 | Quick with micro-tail | DE, TM |
| settled | 260 | 24 | Confident, subtle bounce | DE |
| bouncy | 180 | 12 | Playful, visible bounce | VP |
| floaty | 80 | 10 | Slow, dreamy | VP hero, DE hero |
| magnetic | 200 | 15 | Cursor-responsive | DE, TM |

**Tuning rule:** Raise stiffness to speed up. Raise damping to reduce bounce. Never touch mass unless you specifically want inertia.

---

## Stagger Calculator

```ts
// How to calculate stagger delay for a group
// Target: group completes in ≤ 700ms total

// staggerDelay = (totalDuration - itemDuration) / (itemCount - 1)
// For 8 items, 400ms item duration, 700ms total:
// staggerDelay = (700 - 400) / 7 = ~43ms → round to 40ms

export const stagger = {
  tight:    0.04,  // 40ms — dense grids (12+ items)
  standard: 0.06,  // 60ms — feature tiles, metric rows (6-10 items)
  loose:    0.10,  // 100ms — cards, testimonials (3-6 items)
  dramatic: 0.15,  // 150ms — VP hero items (2-4 items)
} as const;
```

**Container + item pattern:**
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.standard, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.prominent / 1000, ease: ease.outQuart } }
};

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(i => <motion.li key={i.id} variants={item}>{...}</motion.li>)}
</motion.ul>
```

---

## MotionValue Composition

Scroll-linked animation via `useScroll` + `useTransform`.

```tsx
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

function ScrollLinked() {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'] // [when section bottom enters viewport, when section top exits]
  });

  // Raw transform: maps scroll 0→1 to output range
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);     // parallax
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]); // fade in/out
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]); // scale up

  // Add spring smoothing for tactile feel
  const ySmooth = useSpring(y, { stiffness: 100, damping: 20 });

  return <motion.div style={{ y: ySmooth, opacity, scale }} />;
}
```

**Common input/output pairs:**

```ts
// Rotate on scroll (product showcase)
const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

// Text blur-in (editorial)
const filter = useTransform(scrollYProgress, [0, 0.3], ['blur(12px)', 'blur(0px)']);

// Horizontal translate (gallery pan)
const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

// Clip-path reveal (mask reveal)
const clipPath = useTransform(
  scrollYProgress,
  [0, 0.5],
  ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
);
```

**Chaining MotionValues:**
```tsx
// Chain: scrollProgress → y position → spring-smoothed y
const { scrollYProgress } = useScroll({ target: ref });
const rawY = useTransform(scrollYProgress, [0, 1], [100, -100]);
const y = useSpring(rawY, { stiffness: 80, damping: 20 });
// y is now a spring-smoothed version of the scroll-linked value
```

---

## Transition Shortcuts

Composing from primitives:

```ts
// Use these as transition prop on motion.*
export const transition = {
  // Section scroll reveal — most common
  reveal: { duration: 0.6, ease: ease.outQuart },

  // Hero entrance
  hero: { duration: 0.8, ease: ease.outExpo },

  // Hover micro (button, link)
  hover: { duration: 0.15, ease: 'easeOut' },

  // Exit (faster than enter)
  exit: { duration: 0.25, ease: ease.inCubic },

  // UI state (modal, dropdown)
  ui: { duration: 0.3, ease: ease.inOut },

  // Cinematic (EL reveals)
  cinematic: { duration: 1.4, ease: ease.outExpo },
} as const;
```

Usage:
```tsx
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={transition.reveal}
/>
```
