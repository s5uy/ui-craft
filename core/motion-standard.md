# Motion Standard

Motion is the single fastest way to make a site feel Figma-specialist-caliber. Done right, it reads as craft. Done wrong, it reads as demo theatrics.

This file defines:
1. **Universal motion law** — applies to all directions
2. **Per-direction motion vocabularies** — each direction has its own physics, durations, curves
3. **Canonical snippets** — copy-paste Framer Motion and CSS
4. **Anti-patterns** — what breaks motion craft

Use universal + the direction you locked from `core/design-directions.md`. Don't cross-mix motion vocabularies.

**Extended motion system:**
- `motion/libraries.md` — Framer Motion vs GSAP vs CSS vs View Transitions: when to reach for each
- `motion/primitives.md` — named duration scale, spring presets, easing catalog, stagger calculator, MotionValue composition
- `motion/patterns.md` — scroll-reveal variants, exit patterns, stagger choreography, drag, loading transitions, shared-element
- `motion/performance.md` — compositor thread rules, `will-change` discipline, INP budget, 120fps, bundle size
- `blueprints/motion/` — signature set-pieces: text-mask-reveal, kinetic-scroll-type, cursor-reactive-grid, horizontal-pin-gallery, shared-element-morph, svg-draw-in

---

## Universal Motion Law

### 1. Motion must justify itself
Remove the animation. Does the UI become harder to understand, less trustworthy, or cheaper-feeling? If no → delete. If yes → keep.

### 2. Every motion has an origin
Motion should reveal origin. Scroll reveal from 16px below = content arrives from below. Fade-in from nothing = content has no physical presence. Choose origin; don't default to fade.

### 3. Motion hierarchy matches content hierarchy
The most important thing on the page gets the most considered motion — NOT the most motion. Hero gets a letter-stagger. Secondary section gets a 500ms fade-up. Footer gets nothing.

### 4. `prefers-reduced-motion` required
Every scroll reveal, every transition, every auto-play must check:
```ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
Reduced-motion users get the final state immediately. No exceptions.

### 5. Motion is either tactile or cinematic, never both in one project
- **Tactile** — physics-based, responds to cursor/touch (hover scale, drag, magnetic, spring)
- **Cinematic** — time-based, scroll-linked, director-authored (reveals, pins, cross-fades)

TM and DE lean tactile. EL leans cinematic. VP mixes but picks a primary. If you blend both heavily, the page feels chaotic.

### 6. No perpetual motion
No floating loops. No pulsing glows. No spinning gradients. An element that moves forever pulls the user's attention forever. Ban.

### 7. 60fps or don't ship it
Use `transform` and `opacity` only for animated properties. Avoid animating `width`, `height`, `top`, `box-shadow`, `background`. Compositor-safe or it stutters on low-end hardware.

---

## Canonical Easing Curves

Name them. Use them consistently.

```css
/* Store as CSS custom properties */
--ease-out-expo:    cubic-bezier(0.22, 1, 0.36, 1);      /* cinematic deceleration, EL default */
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);       /* smooth deceleration, TM default */
--ease-out-cubic:   cubic-bezier(0.33, 1, 0.68, 1);      /* gentle deceleration, DE default */
--ease-in-out:      cubic-bezier(0.65, 0, 0.35, 1);      /* symmetric, for UI state */
--ease-spring-soft: linear(0, 0.02, 0.08, 0.2, 0.38, 0.58, 0.76, 0.88, 0.96, 1); /* sprung feel without JS */
```

In Framer Motion:
```ts
export const ease = {
  outExpo:  [0.22, 1, 0.36, 1],
  outQuart: [0.25, 1, 0.5, 1],
  outCubic: [0.33, 1, 0.68, 1],
  inOut:    [0.65, 0, 0.35, 1],
} as const;
```

---

## TM — Technical-Minimal Motion

### Character
Restrained. Every motion is 300–700ms, small translate, one easing curve. Motion is *quiet confidence*. Feels like the engineers considered each frame.

### Durations
- Tactile hover: 150ms
- Small element reveal: 400ms
- Section reveal: 600ms
- Hero entrance: 700ms (max)

### Easing
Use `--ease-out-quart` (`[0.25, 1, 0.5, 1]`) almost everywhere. TM is consistent to a fault.

### Translate distance
- Small: 8px
- Medium: 12px
- Large: 16px
- Never more than 20px for scroll reveal

### Spring physics
Banned except for drag and magnetic. Regular reveals are bezier.

### Canonical snippets

**Section reveal:**
```tsx
<motion.section
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
>
```

**Staggered list (feature tiles, metrics):**
```tsx
const container = { visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};
```

**Button hover (subtle, 1.02):**
```tsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.15, ease: "easeOut" }}
```

**Nav scroll-trigger border:**
```tsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
// className uses scrolled ? "border-b border-[var(--border-weak)] backdrop-blur-md" : ""
```

**Live status dot pulse (only TM motion loop allowed):**
```css
.status-live::before {
  content: '';
  position: absolute; inset: -4px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.3;
  animation: pulse-ring 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
}
```

### What fails TM motion
- Spring physics on section reveals — too bouncy, breaks restraint
- Translate > 24px — too theatrical
- Multiple easing curves — TM uses ONE
- Any parallax beyond 4-8px — breaks document-feel
- Color animation on hover — subtle only, or not at all

---

## DE — Design-Engineer Motion

### Character
Motion IS the craft signal. Every interaction is tuned. Physics-based springs are the default. Micro-interactions on every interactive element — not for show, but because the designer-engineer considered them.

### Durations
- Tactile hover: responsive (physics, not duration)
- Small reveal: 500ms
- Section reveal: 700ms
- Hero letter stagger: 1000ms total (20-30ms per letter)
- Number scramble: 900-1200ms

### Easing
- Reveals: `--ease-out-expo` (dramatic deceleration matches DE restraint)
- Tactile: `spring, stiffness: 260, damping: 24` (controlled bounce)
- UI state: `spring, stiffness: 400, damping: 30` (snappy, no visible bounce)

### Canonical snippets

**Letter-stagger hero (the DE signature):**
```tsx
const text = "Building interfaces for thought.";
const words = text.split(" ");

<h1 className="text-hero">
  {words.map((word, wi) => (
    <span key={wi} className="inline-block mr-[0.25em]">
      {word.split("").map((char, ci) => (
        <motion.span
          key={ci}
          initial={{ opacity: 0, y: "0.4em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: (wi * 4 + ci) * 0.025,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  ))}
</h1>
```

**Magnetic button (DE signature):**
```tsx
function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >{children}</motion.button>
  );
}
```

**Cursor spotlight on card (DE signature):**
```tsx
function SpotlightCard({ children }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={handleMove} className="spotlight-card">
      {children}
    </div>
  );
}
/* CSS */
.spotlight-card {
  position: relative; overflow: hidden;
}
.spotlight-card::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(400px circle at var(--mx) var(--my),
    oklch(0.98 0 0 / 0.08), transparent 40%);
  pointer-events: none;
  opacity: 0; transition: opacity 0.2s;
}
.spotlight-card:hover::before { opacity: 1; }
```

**Number scramble (DE signature):**
```tsx
function ScrambleNumber({ value, duration = 1000 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        // Scramble random numbers until 70%, then settle to target
        if (t < 0.7) {
          setDisplay(Math.floor(Math.random() * value));
        } else {
          setDisplay(Math.floor(eased * value));
        }
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className="tabular-nums">{display.toLocaleString()}</span>;
}
```

**Arrow-nudge link:**
```tsx
<a className="group inline-flex items-center gap-1">
  Read case study
  <motion.span
    className="inline-block"
    initial={{ x: 0 }}
    whileHover={{ x: 4 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  >→</motion.span>
</a>
```
Or with CSS:
```css
.link-arrow svg { transition: transform 200ms var(--ease-out-cubic); }
.link-arrow:hover svg { transform: translateX(4px); }
```

**View transitions (Next.js / native):**
```tsx
// Use next/link with experimental view transitions
// Or Framer Motion layoutId for shared-element transitions
<motion.div layoutId="card-1" /* from list */ />
<motion.div layoutId="card-1" /* on detail page */ />
```

### What fails DE motion
- No micro-interactions — DE without them reads as TM
- Heavy easing on everything — DE is surgical, one specific curve per interaction type
- Bounce springs on scroll reveals — reveals are bezier; bounce is for tactile only
- Motion without justification — DE motion is craft, not decoration

---

## VP — Vibrant-Playful Motion

### Character
Bouncy, confident, tactile. Motion is part of the brand personality — sprung, slightly exaggerated, delightful. Stiffness down, damping down, feel high.

### Durations
- Hover: spring (physics-native)
- Reveal: 600ms
- Section: 800ms
- Hero entrance: 1000ms with heavy stagger

### Easing
- Primary: `spring, stiffness: 180, damping: 12` (VP signature — visibly bouncy)
- Secondary: `spring, stiffness: 220, damping: 18` (calmer, still physical)
- Tactile: `spring, stiffness: 300, damping: 15`

### Canonical snippets

**Bouncy hover (VP signature, 1.04-1.06 scale):**
```tsx
<motion.button
  whileHover={{ scale: 1.04, rotate: -1 }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
>
```

**Card stack with pronounced stagger:**
```tsx
const container = { visible: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 180, damping: 14 }
  }
};
```

**Floating hero art (carefully controlled — not infinite):**
```tsx
<motion.img
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  // NOTE: This is the ONE perpetual motion allowed in VP — only on
  // large hero product visuals, only with ±8px range, never on text.
/>
```

**Gradient blob morph (VP hero background, tasteful):**
```tsx
<motion.div
  className="absolute inset-0 -z-10 opacity-40"
  style={{
    background: 'radial-gradient(circle at var(--bx) var(--by), var(--accent-warm), transparent 60%)'
  }}
  animate={{
    '--bx': ['30%', '70%', '30%'],
    '--by': ['40%', '60%', '40%']
  } as any}
  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
/>
```

**Click confetti (on primary CTA, one-shot):**
```tsx
import confetti from 'canvas-confetti';
<button onClick={() => {
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.8 },
    colors: ['#f97316', '#ec4899', '#8b5cf6', '#22c55e']
  });
}}>Get started</button>
```

**Rotating card on hover:**
```tsx
<motion.div
  whileHover={{ rotate: -2, y: -4 }}
  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
  className="p-10 rounded-3xl"
>
```

### What fails VP motion
- TM-duration reveals (600ms with zero spring) — feels business-casual, not playful
- No stagger delta — VP stagger should be visible (100-150ms between items)
- Hover scale 1.02 — too subtle for VP, should be 1.04-1.06
- Straight easing on everything — VP loves physics

---

## EL — Editorial-Luxury Motion

### Character
Slow, cinematic, scroll-linked. Motion is director-authored, not user-responsive. Sections lock on scroll, products rotate as you scroll, images cross-fade. Feels like a Wes Anderson camera move.

### Durations
- Hover: 400-600ms (unusually slow)
- Reveal: 1000-1400ms
- Section: 1200ms
- Hero entrance: 1600ms with heavy scale change

### Easing
- Primary: `--ease-out-expo` (`[0.22, 1, 0.36, 1]`)
- Secondary: custom slow-in-slow-out `[0.4, 0, 0.2, 1]`
- NEVER spring physics — EL is not bouncy

### Canonical snippets

**Giant type reveal on hero:**
```tsx
<motion.h1
  initial={{ opacity: 0, y: 60, scale: 1.02 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
  className="text-[clamp(5rem,20vw,18rem)] font-semibold leading-[0.85] tracking-[-0.055em]"
>
  Think different.
</motion.h1>
```

**Scroll-linked product pin (the EL signature):**
```tsx
function ProductPin() {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  return (
    <section ref={sectionRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.img src="/product.png" style={{ rotate, scale }} />
      </div>
    </section>
  );
}
```

**Sticky section lock with cross-fade:**
```tsx
function StickyChapter({ chapters }) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  return (
    <section ref={containerRef} style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {chapters.map((ch, i) => {
          const start = i / chapters.length;
          const end = (i + 1) / chapters.length;
          const opacity = useTransform(scrollYProgress, [start - 0.1, start, end - 0.1, end], [0, 1, 1, 0]);
          return (
            <motion.div key={i} style={{ opacity }} className="absolute inset-0">
              {ch.content}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
```

**Image scale-up on viewport entry:**
```tsx
<motion.img
  initial={{ scale: 1.12, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true, margin: '-200px' }}
  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Slow horizontal scroll gallery:**
```tsx
function HorizontalGallery({ items }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  return (
    <section ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16">
          {items.map(item => <div key={item.id} className="w-[60vw] shrink-0">{...}</div>)}
        </motion.div>
      </div>
    </section>
  );
}
```

**Word-by-word reveal on editorial headline (not letter — too busy for EL):**
```tsx
const words = "A quieter computer.".split(" ");
{words.map((word, i) => (
  <motion.span
    key={i}
    className="inline-block mr-[0.25em]"
    initial={{ opacity: 0, y: '0.5em' }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
  >{word}</motion.span>
))}
```

### What fails EL motion
- Fast reveals (400ms) — breaks the slow cinematic premise
- Spring physics anywhere — EL doesn't bounce
- Small translate (8-12px) — EL translate is 40-80px on hero
- Feature tile hover scales — EL doesn't do feature tiles
- Any motion on body text — EL body is still; motion reserved for display and imagery

---

## Global Do-Not-Do List

These break motion craft regardless of direction:

1. **Floating blobs, pulsing orbs, rotating gradients in background** — none of these read as motion design. Delete.
2. **Animated gradient borders on buttons** — signature of AI slop. Delete.
3. **Scroll parallax > 20px** — legibility killer; nauseating on laptops.
4. **Auto-playing carousels without pause** — accessibility violation.
5. **Modal that slides from off-screen** — use scale + fade; slides are consumer-app tropes.
6. **Loading spinners on sub-200ms waits** — use optimistic UI.
7. **Typewriter effect on hero body text** — demo-theater trope.
8. **Transition on color only** — weak. Pair with border, weight, or translate.
9. **Same easing for reveal and exit** — exits should be faster, symmetric in feel but not duration.
10. **Ignoring `prefers-reduced-motion`** — hard fail.

---

## Motion Performance Checklist

Before shipping:
- [ ] All animated properties are `transform` or `opacity`
- [ ] `will-change` used sparingly, only on actively animating elements
- [ ] Reveals use `once: true` in viewport config (don't re-trigger on scroll up)
- [ ] IntersectionObserver cleaned up on unmount
- [ ] `prefers-reduced-motion` short-circuits animation
- [ ] Custom cursor effects don't trigger layout/paint
- [ ] No more than 2-3 simultaneous complex animations in viewport

If any checkbox is unchecked, the motion is not production-ready — fix before shipping.
