# Blueprint: SVG Draw-In

SVG strokes that draw themselves — paths that appear to trace themselves when they enter the viewport. Works on any SVG: diagrams, logos, flow charts, icons, illustrations. Feels precise and engineered. Purely CSS-driveable.

**Seen on:** Linear's architecture diagrams, Stripe's payment flow illustrations, technical landing pages

---

## When to use
- Architecture or flow diagrams that explain how the product works
- Logo reveal on hero entrance
- Technical illustrations on developer tool or B2B sites
- Any decorative SVG where "drawing in" adds meaning (it builds before your eyes)

## When NOT to use
- Filled SVGs — only works on strokes. Filled shapes need a clip-path reveal instead.
- Complex paths with many subpaths — timing becomes hard to control
- Decorative SVGs that don't add meaning — if the draw-in doesn't help explain something, use a static image
- VP direction — too technical for playful/consumer contexts

---

## How it works

SVG paths have `stroke-dasharray` and `stroke-dashoffset` attributes. Set `dasharray` equal to the path's total length, and `dashoffset` equal to that same length — the stroke is invisible (fully offset). Animate `dashoffset` to `0` — the stroke draws in. This is a pure transform-free animation but it doesn't trigger layout — only paint on SVG elements (acceptable).

---

## CSS Implementation (simplest, no JS)

```css
/* Set once per SVG */
.draw-path {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  animation: draw 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-play-state: paused; /* starts paused, triggered by class */
}

.in-view .draw-path {
  animation-play-state: running;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .draw-path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
```

```tsx
// Trigger via IntersectionObserver
useEffect(() => {
  const el = svgRef.current;
  if (!el) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      el.classList.add('in-view');
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(el);
  return () => observer.disconnect();
}, []);
```

---

## Getting `pathLength` values

**Option A — Use Framer Motion's `pathLength` (no manual calculation):**
```tsx
import { motion } from 'framer-motion';

// Framer handles dasharray/dashoffset internally — pathLength 0→1
<motion.path
  d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
  stroke="var(--fg-primary)"
  strokeWidth={2}
  fill="none"
  initial={{ pathLength: 0, opacity: 0 }}
  whileInView={{ pathLength: 1, opacity: 1 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{
    pathLength: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    opacity: { duration: 0.3 },
  }}
/>
```

**Option B — Get exact length from the DOM (for CSS approach):**
```tsx
useEffect(() => {
  document.querySelectorAll('.draw-path').forEach(path => {
    const length = (path as SVGPathElement).getTotalLength();
    (path as HTMLElement).style.setProperty('--path-length', `${length}`);
  });
}, []);
```

---

## Full Multi-Path Diagram (staggered draw-in)

```tsx
'use client';
import { motion } from 'framer-motion';

interface DiagramPath {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
}

interface SVGDiagramProps {
  paths: DiagramPath[];
  width: number;
  height: number;
  viewBox?: string;
  className?: string;
}

export function SVGDiagram({ paths, width, height, viewBox, className }: SVGDiagramProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden
    >
      {paths.map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.strokeWidth ?? 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReducedMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            pathLength: {
              duration: path.duration ?? 1.2,
              delay: path.delay ?? i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 0.2,
              delay: path.delay ?? i * 0.15,
            },
          }}
        />
      ))}
    </svg>
  );
}
```

**Usage:**
```tsx
<SVGDiagram
  width={600}
  height={400}
  paths={[
    { d: 'M 50 200 L 200 200', delay: 0 },        // horizontal line
    { d: 'M 200 200 L 200 80', delay: 0.2 },       // vertical up
    { d: 'M 200 80 L 400 80', delay: 0.4 },        // horizontal right
    { d: 'M 400 80 L 400 200', delay: 0.6 },       // vertical down
    { d: 'M 400 200 L 550 200', delay: 0.8 },      // horizontal right
    // Circle at end node
    { d: 'M 550 190 A 10 10 0 1 1 549.999 190', delay: 1.0, strokeWidth: 2 },
  ]}
/>
```

---

## Logo Draw-In (hero entrance)

For SVG logos on load:

```tsx
export function LogoDrawIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-label="Company logo">
      {/* Each path element draws in with a small delay after the previous */}
      <motion.path
        d="M 0 20 L 40 20 M 20 0 L 20 40" // example cross shape
        stroke="var(--fg-primary)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      <motion.text
        x="50" y="26"
        fill="var(--fg-primary)"
        fontSize="18"
        fontWeight="600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        acme
      </motion.text>
    </svg>
  );
}
```

---

## Scroll-linked draw-in (EL / GSAP approach)

Instead of viewport entry, the path draws as you scroll past it — more cinematic.

```tsx
function ScrollDrawPath({ d }: { d: string }) {
  const ref = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <motion.path
      ref={ref}
      d={d}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      style={{ pathLength: scrollYProgress }}
    />
  );
}
```

```js
// GSAP ScrollTrigger alternative (more control over scrub speed):
gsap.to('.diagram-path', {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.diagram-section',
    start: 'top 60%',
    end: 'bottom 40%',
    scrub: 2,
  }
});
```

---

## Performance notes

- `pathLength` in Framer Motion avoids the need to manually call `getTotalLength()` — it sets `strokeDasharray` and `strokeDashoffset` internally.
- `stroke-dashoffset` animation is compositor-safe in most browsers (SVG elements painted on GPU layer when possible).
- For very long paths or many simultaneous draws, use CSS animation instead of JS spring — lower overhead.
- Measure: if you see paint rectangles growing in DevTools during draw, the SVG is triggering repaints — this is expected and acceptable for SVG; just cap simultaneous draws to 3-4.

---

## Direction fit

| Direction | Adjustment |
|-----------|-----------|
| TM | Perfect. Clean, engineered. Use hairline strokes (0.5-1px). |
| DE | Excellent. Draw-in on architecture or flow diagrams. |
| EL | Use scroll-linked variant, slow draw (2-3s). |
| VP | Possible for illustrations — add a color fill fade-in after stroke completes. |
