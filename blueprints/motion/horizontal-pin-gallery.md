# Blueprint: Horizontal Pin Gallery

A horizontal track of panels that advances as the user scrolls vertically. The section pins to the viewport; scrolling drives the horizontal movement. Apple product pages, Stripe, The Browser Company use this.

---

## When to use
- Product feature walkthroughs (step 1 → 2 → 3 with scroll pacing)
- Portfolio or case study galleries with wide images
- Sequential storytelling where order matters and you want to control pacing
- EL or TM sites where a horizontal narrative creates visual contrast

## When NOT to use
- Content that doesn't benefit from sequential left-to-right order
- Mobile — horizontal pin galleries are nearly impossible to make feel right on touch. Collapse to a vertical scroll on mobile.
- When the user needs to compare items side-by-side — use a static grid instead
- Short content (2-3 panels) — doesn't justify the scroll height commitment

---

## Full Implementation (Framer Motion)

```tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Panel {
  id: string;
  label: string;
  description: string;
  image?: string;
  accent?: string;
}

interface HorizontalPinGalleryProps {
  panels: Panel[];
  panelWidth?: string; // CSS value e.g. '80vw', '60vw'
}

export function HorizontalPinGallery({
  panels,
  panelWidth = '70vw',
}: HorizontalPinGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Each panel gets 1 viewport height of scroll distance
  const sectionHeight = `${panels.length * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map 0→1 scroll to horizontal translate
  // Total width = (panels.length - 1) panels worth of movement
  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(panels.length - 1) * 100 / panels.length}%`]
  );

  // Spring smoothing for cinematic feel (reduce for snappier panel steps)
  const x = useSpring(xRaw, { stiffness: 80, damping: 20, mass: 1 });

  return (
    <section ref={containerRef} style={{ height: sectionHeight }} className="relative">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Progress indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {panels.map((_, i) => (
            <PanelDot key={i} index={i} total={panels.length} scrollProgress={scrollYProgress} />
          ))}
        </div>

        {/* Track */}
        <motion.div
          style={{ x }}
          className="flex"
          // Total track width covers all panels
          style={{ x, width: `${panels.length * 100}vw` }}
        >
          {panels.map((panel, i) => (
            <div
              key={panel.id}
              className="flex-shrink-0 h-screen flex items-center justify-center px-12"
              style={{ width: panelWidth, marginRight: `calc(100vw - ${panelWidth})` }}
            >
              <PanelContent panel={panel} index={i} scrollProgress={scrollYProgress} total={panels.length} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PanelContent({
  panel,
  index,
  scrollProgress,
  total,
}: {
  panel: Panel;
  index: number;
  scrollProgress: any;
  total: number;
}) {
  const panelStart = index / total;
  const panelEnd = (index + 1) / total;

  const opacity = useTransform(
    scrollProgress,
    [panelStart, panelStart + 0.05, panelEnd - 0.05, panelEnd],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.div style={{ opacity }} className="w-full">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-xs font-mono text-[var(--fg-tertiary)] uppercase tracking-[0.1em]">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.05]">
            {panel.label}
          </h2>
          <p className="text-[var(--fg-secondary)] text-lg leading-relaxed max-w-sm">
            {panel.description}
          </p>
        </div>
        {panel.image && (
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--surface-2)]">
            <img src={panel.image} alt={panel.label} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PanelDot({ index, total, scrollProgress }: { index: number; total: number; scrollProgress: any }) {
  const panelStart = index / total;
  const panelEnd = (index + 1) / total;
  const scale = useTransform(scrollProgress, [panelStart, (panelStart + panelEnd) / 2, panelEnd], [0.6, 1, 0.6]);
  const opacity = useTransform(scrollProgress, [panelStart, (panelStart + panelEnd) / 2, panelEnd], [0.3, 1, 0.3]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-1.5 h-1.5 rounded-full bg-[var(--fg-primary)]"
    />
  );
}
```

---

## Stepped Variant (Snap between panels)

For a more discrete, panel-by-panel feel — the gallery snaps to each panel instead of scrolling smoothly.

```tsx
// Replace the spring smoothing with a stepped useTransform:
const xRaw = useTransform(scrollYProgress, (progress) => {
  const panelIndex = Math.round(progress * (panels.length - 1));
  const targetX = -(panelIndex / panels.length) * 100;
  return `${targetX}%`;
});

// Then spring-smooth the snapped value for a satisfying settle
const x = useSpring(xRaw, { stiffness: 200, damping: 24 });
```

---

## Mobile fallback (required)

```tsx
'use client';
import { useEffect, useState } from 'react';

export function AdaptiveGallery({ panels }: { panels: Panel[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    mq.addEventListener('change', e => setIsMobile(e.matches));
    return () => mq.removeEventListener('change', () => {});
  }, []);

  if (isMobile) {
    return (
      <div className="space-y-24 px-6 py-24">
        {panels.map(panel => (
          <div key={panel.id} className="space-y-4">
            <h2 className="text-3xl font-semibold">{panel.label}</h2>
            <p className="text-[var(--fg-secondary)]">{panel.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return <HorizontalPinGallery panels={panels} />;
}
```

---

## Performance notes

- `useSpring` on the scroll-linked `x` value means Framer's spring runs on the compositor-aware animation loop — it doesn't block the main thread.
- Avoid putting heavy images in all panels — only load the adjacent panels with `loading="eager"`, rest with `loading="lazy"`.
- The section height must be tall enough that the user has a comfortable scroll distance per panel. `100vh` per panel is the minimum.
- For 10+ panels, the total section becomes very tall. Consider a GSAP ScrollTrigger implementation instead — more control over panel locking.

---

## GSAP alternative (for more control)

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray('.panel');

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none', // linear — easing applied by ScrollTrigger scrub
  scrollTrigger: {
    trigger: '.horizontal-section',
    pin: true,
    scrub: 1.5, // 1.5s lag for cinematic smoothness
    end: () => `+=${document.querySelector('.horizontal-section').offsetWidth}`,
  },
});
```

---

## Direction fit

| Direction | Adjustment |
|-----------|-----------|
| EL | Perfect. Slow spring (stiffness: 60, damping: 18), generous scroll height. |
| TM | Works. Tighter spring, numbered step indicators, restrained panel content. |
| DE | Works for portfolio case studies. Use numbered steps, monospace labels. |
| VP | Possible but panels need strong visual variety or it reads as a carousel. |
