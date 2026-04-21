# Motion Library Selection

The library you pick determines what's easy and what's painful. Pick wrong and you're fighting the tool.

---

## Decision Flowchart

```
Are you in React?
├── YES →
│   Do you need scroll-linked animation, gestures, or shared-element transitions?
│   ├── YES → Framer Motion (covers 90% of React motion needs)
│   └── NO →
│       Is it a simple hover / reveal / loop?
│       ├── YES → Pure CSS (zero JS overhead)
│       └── NO →
│           Is it a complex multi-step timeline or SVG morph?
│           └── YES → GSAP inside a useEffect (reach for GSAP selectively)
└── NO →
    Is it page-level transition in Astro / Next.js MPA?
    ├── YES → View Transitions API
    └── NO → GSAP (works everywhere, no framework coupling)
```

---

## Framer Motion

**Use when:**
- You're in React and need anything beyond static CSS
- Gestures (drag, hover with cursor tracking, tap feedback)
- `layoutId` shared-element morphs (card → modal, list → detail)
- Scroll-linked values (`useScroll`, `useTransform`, `useSpring`)
- Physics springs that respond to gesture velocity
- `AnimatePresence` for mount/unmount transitions

**Don't use when:**
- The animation is a simple CSS hover — Framer overhead isn't worth it for `transition: transform 150ms`
- You're in a non-React environment
- You need complex SVG morphing — GSAP MorphSVGPlugin is better
- Bundle size is critical and you're only doing one simple reveal

**Install:**
```bash
npm install framer-motion
```

**Core imports:**
```tsx
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';
```

**Performance note:** Framer Motion animates on the JS thread by default for spring physics. For scroll-linked values, it batches internally. Still: keep animated property count low, don't animate layout-triggering props.

---

## GSAP + ScrollTrigger

**Use when:**
- Complex multi-step timeline sequences (10+ elements with precise choreography)
- SVG stroke animation, path morphing (with MorphSVGPlugin)
- Scroll storytelling with precise scrub control across unrelated DOM nodes
- Non-React environments or server-rendered pages
- You need `stagger` across a large grid (GSAP's stagger is more powerful than Framer's)
- ScrollTrigger pinning with multi-step scenes is cleaner than Framer's sticky patterns

**Don't use when:**
- You're already using Framer Motion for the same project — mixing creates complexity and bundle bloat
- The project is simple (GSAP setup is heavier than Framer for basic reveals)
- You need React lifecycle integration — wrapping GSAP in `useEffect`/`useLayoutEffect` is boilerplate

**Install:**
```bash
npm install gsap
```

**Core setup in React:**
```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedSection() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        y: 40, opacity: 0, stagger: 0.08, duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el.current, start: 'top 80%' }
      });
    }, el);
    return () => ctx.revert(); // cleanup is critical
  }, []);

  return <div ref={el}><div className="reveal-item">...</div></div>;
}
```

**ScrollTrigger pinning (GSAP's biggest advantage over Framer):**
```js
ScrollTrigger.create({
  trigger: '.scene',
  start: 'top top',
  end: '+=300%',
  pin: true,
  scrub: 1, // 1s lag creates cinematic smoothness
  onUpdate: (self) => {
    gsap.set('.product', { rotateY: self.progress * 360 });
  }
});
```

---

## Pure CSS

**Use when:**
- Hover transitions (color, border, shadow, scale, translate)
- Simple reveals triggered by IntersectionObserver + class toggle
- Looping keyframe animations (status pulse, loading spinners, subtle float)
- Performance-critical surfaces where JS overhead matters (above-the-fold, high-density lists)
- `prefers-reduced-motion` is the only concern

**Don't use when:**
- You need physics (springs)
- Animation depends on runtime values (cursor position, scroll progress)
- You need coordinated stagger across many elements

**Pattern — IntersectionObserver reveal:**
```ts
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // once only
    }
  });
}, { threshold: 0.15, rootMargin: '-50px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
}
```

---

## View Transitions API

**Use when:**
- Page-level transitions in Next.js App Router or Astro
- Shared-element transitions between routes without a full SPA (using `view-transition-name`)
- You want progressive enhancement (sites still work without animation for unsupported browsers)
- MPA architecture where Framer layoutId isn't available

**Don't use when:**
- You're in a full Framer Motion app — use `layoutId` instead, it's more precise
- The transition needs physics-based spring behavior
- Safari compatibility is critical (View Transitions are Chromium-first; Safari support is partial)

**Setup in Next.js:**
```ts
// next.config.js
experimental: { viewTransition: true }
```

```tsx
// In component
import { unstable_ViewTransition as ViewTransition } from 'react';

<ViewTransition name="hero-image">
  <img src={product.image} />
</ViewTransition>
```

**Native CSS shared element:**
```css
.product-card { view-transition-name: product-1; }
/* On the detail page: */
.product-detail-image { view-transition-name: product-1; }
/* Browser automatically morphs between the two on navigation */
```

---

## What NOT to reach for

| Library | Skip because |
|---------|-------------|
| React Spring | Framer Motion covers all its use cases with better DX in 2025 |
| Anime.js | GSAP is strictly more powerful for the same use case |
| AOS / Wow.js | Observer-based class toggle in vanilla JS is cleaner with less magic |
| Lottie (for UI animation) | Heavy runtime for motion you could do in CSS/Framer; fine for complex icon animation |
| Rive | Excellent for complex character/interactive animation, overkill for UI motion |
