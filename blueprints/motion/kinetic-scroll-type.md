# Blueprint: Kinetic Scroll Type

Words scale and shift opacity as the user scrolls through them — lines that are in the "reading zone" are full opacity and scale, lines above and below are faded and smaller. Feels like a teleprompter, or a scroll-driven manifesto. Apple TV+, Stripe, and Cosmos use this.

---

## When to use
- Manifesto or "why we exist" section on a brand or editorial site
- Long value proposition you want to pace the reader through
- EL or DE homepage where the copy *is* the product moment
- When you want the user to slow down and read, not skim

## When NOT to use
- Short copy (fewer than 4-5 lines) — the effect needs scroll distance to build rhythm
- SaaS feature lists — too poetic for functional copy
- VP direction — bouncy + kinetic type is a contradiction
- Any section where the user needs to read and interact simultaneously

---

## Full Implementation

```tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface KineticTypeProps {
  lines: string[];
  className?: string;
}

export function KineticType({ lines, className }: KineticTypeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section takes (lines.length * 1.5) viewport heights of scroll space
  const sectionHeight = `${lines.length * 150}vh`;

  return (
    <section
      ref={containerRef}
      style={{ height: sectionHeight }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className={`max-w-4xl px-6 space-y-2 ${className ?? ''}`}>
          {lines.map((line, index) => (
            <KineticLine
              key={index}
              line={line}
              index={index}
              total={lines.length}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function KineticLine({
  line,
  index,
  total,
  containerRef,
}: {
  line: string;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Each line has a "focus window" as scroll progress passes through it
  const focusStart = index / total;
  const focusEnd = (index + 1) / total;
  const buffer = 0.5 / total; // overlap buffer for smooth transition

  // Opacity: fades in before focus, full at focus, fades out after
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, focusStart - buffer),
      focusStart,
      focusEnd,
      Math.min(1, focusEnd + buffer),
    ],
    [0.15, 1, 1, 0.15]
  );

  // Scale: smaller when not in focus
  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, focusStart - buffer),
      focusStart,
      focusEnd,
      Math.min(1, focusEnd + buffer),
    ],
    [0.92, 1, 1, 0.92]
  );

  // Slight y shift: lines above the focus slide up, below slide down
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, focusStart - buffer), focusStart, focusEnd, Math.min(1, focusEnd + buffer)],
    [12, 0, 0, -12]
  );

  return (
    <motion.p
      style={{ opacity, scale, y }}
      className="text-[clamp(1.5rem,4vw,3.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--fg-primary)] origin-left"
    >
      {line}
    </motion.p>
  );
}
```

**Usage:**
```tsx
<KineticType
  lines={[
    "We started with one question.",
    "Why does software feel like work?",
    "It doesn't have to.",
    "We built something different.",
    "Something that gets out of the way.",
  ]}
/>
```

---

## Variant — Word-level kinetic (more granular, more dramatic)

Instead of line-level, each word has its own focus window. Reads like a scroll-driven poem.

```tsx
function KineticWords({ text }: { text: string }) {
  const words = text.split(' ');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });

  return (
    <section ref={containerRef} className="relative" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen flex items-center">
        <p className="text-[clamp(2rem,6vw,5rem)] font-semibold flex flex-wrap gap-x-[0.3em] gap-y-2 px-12">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            return (
              <motion.span key={i} style={{ opacity }} className="text-[var(--fg-primary)]">
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
```

**Note:** Calling `useTransform` inside a `.map()` is valid in React — hooks are called in the same order every render as long as the `words` array is stable (not derived from state that changes).

---

## Performance notes

- `useScroll` returns a `MotionValue` — scroll-linked opacity and scale bypass React's render cycle entirely. Zero re-renders on scroll.
- Each line has its own `useTransform` — fine for 5-10 lines. For 20+ lines, measure first.
- `origin-left` on scale keeps text anchored to its left edge — prevents the visual jump of center-origin scaling.
- `sticky` + tall parent = the section pins correctly across all browsers without GSAP.
- On mobile, consider reducing scroll height (`* 100vh`) or disabling the effect entirely below `768px`.

```tsx
// Responsive: disable on small screens
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;

if (prefersReducedMotion || isMobile) {
  // Render all lines at full opacity, no sticky
  return <div>{lines.map(l => <p key={l}>{l}</p>)}</div>;
}
```

---

## Direction fit

| Direction | Adjustment |
|-----------|-----------|
| EL | Perfect fit. Slow, cinematic, director-paced. |
| DE | Works for "about / philosophy" pages. Use tighter timing. |
| TM | Use only for a single manifesto section, not throughout. |
| VP | Don't use — too solemn for VP's energy. |
