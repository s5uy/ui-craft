# Pattern: Product Pin Scroll

**Direction:** EL (primary)
**Role:** Product image pinned to viewport center; rotates, scales, or pans as the user scrolls through it. The EL signature cinematic moment.

---

## Component

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ProductPinScrollProps {
  image: string;
  alt: string;
  caption?: string;
  chapterLabel?: string;
  heading?: string;
  description?: string;
  rotation?: number;           // degrees of rotation across scroll
  scaleStart?: number;
  scaleEnd?: number;
  height?: string;             // container height — defaults to 300vh
}

export function ProductPinScroll({
  image,
  alt,
  caption,
  chapterLabel,
  heading,
  description,
  rotation = 60,
  scaleStart = 0.8,
  scaleEnd = 1.1,
  height = "300vh",
}: ProductPinScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [-rotation / 2, rotation / 2]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReduced ? [1, 1, 1] : [scaleStart, 1, scaleEnd]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      style={{ height }}
      className="relative bg-[var(--bg-0)]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.img
          src={image}
          alt={alt}
          style={{ rotate, scale }}
          className="max-h-[75vh] w-auto object-contain"
          loading="lazy"
        />

        {(chapterLabel || heading || description) && (
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute bottom-12 left-0 right-0 px-6 lg:px-12 text-center"
          >
            {chapterLabel && (
              <span className="block text-[11px] uppercase tracking-[0.3em] font-mono text-[var(--text-muted)] mb-4">
                {chapterLabel}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.03em] max-w-3xl mx-auto leading-[1.05]">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-[var(--text-secondary)] mt-4 max-w-[52ch] mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {caption && (
          <span className="absolute top-8 right-8 text-[11px] uppercase tracking-[0.2em] font-mono text-[var(--text-muted)]">
            {caption}
          </span>
        )}
      </div>
    </section>
  );
}
```

## Usage

```tsx
<ProductPinScroll
  image="/product-hero.png"
  alt="The device, rotating"
  chapterLabel="— Chapter 02"
  heading="Precision, at every angle."
  description="Machined from a single block of aluminum. 0.01mm tolerance across every surface."
  caption="A1 / Aluminum / 2026"
  rotation={80}
  scaleStart={0.75}
  scaleEnd={1.15}
  height="350vh"
/>
```

---

## Variants

### Pan-horizontal variant (scroll → x translate)
```tsx
const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
<motion.img style={{ x, scale }} />
```

### 3D model sequence (frames as you scroll)
For a true 360° rotation, use a frame-sequence of pre-rendered product images:
```tsx
const frame = useTransform(
  scrollYProgress,
  [0, 1],
  [0, totalFrames - 1]
);
const currentFrame = useMotionValueEvent(frame, "change", (latest) => {
  setImageIndex(Math.floor(latest));
});
```

### Multi-chapter: three products pin in sequence
```tsx
// Each gets its own 100vh window of scroll progress
const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 1, 0]);
const opacity2 = useTransform(scrollYProgress, [0.3, 0.35, 0.65, 0.7], [0, 1, 1, 0]);
const opacity3 = useTransform(scrollYProgress, [0.65, 0.7, 1], [0, 1, 1]);
```

---

## Performance notes

- Product images should be ≤600KB, WebP or AVIF
- If using frame sequences, preload all frames before pin begins
- Use `will-change: transform` on the pinned image (remove after scroll exits)
- Test on low-end hardware — pin sections must stay at 60fps

---

## When to use
- EL hardware product launches (Teenage Engineering, Analogue, Nothing style)
- EL luxury/fashion product pages
- Editorial brand sites showcasing a single product

## When NOT to use
- When you don't have high-quality product photography — looks amateur with stock
- Short viewport users (lock a minimum height of 400vh)
- TM / DE / VP — other directions have their own hero vocabularies
- More than twice per page — the dramatic effect degrades on repetition
