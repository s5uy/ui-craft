# Pattern: Sticky Section Lock (Chapter Sections)

**Direction:** EL (primary)
**Role:** Section sticks to viewport as user scrolls through it, with its content crossfading between chapter states. Signature EL narrative device.

---

## Component

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Chapter {
  label: string;       // chapter index e.g., "01"
  heading: string;
  description: string;
  visual: React.ReactNode;
}

interface StickyChaptersProps {
  chapters: Chapter[];
  sectionName?: string;   // e.g., "Materials"
}

export function StickyChapters({ chapters, sectionName }: StickyChaptersProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Total height: 100vh per chapter + 50vh buffer
  const height = `${chapters.length * 100 + 50}vh`;

  return (
    <section ref={ref} style={{ height }} className="relative bg-[var(--bg-0)]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="relative">
            {sectionName && (
              <span className="block text-[11px] uppercase tracking-[0.3em] font-mono text-[var(--text-muted)] mb-8">
                {sectionName}
              </span>
            )}
            <div className="relative h-[320px]">
              {chapters.map((chapter, i) => {
                const start = i / chapters.length;
                const end = (i + 1) / chapters.length;
                const fadeIn = start + 0.02;
                const fadeOut = end - 0.05;

                const opacity = useTransform(
                  scrollYProgress,
                  prefersReduced
                    ? [0, 1]
                    : [start, fadeIn, fadeOut, end],
                  prefersReduced ? [1, 1] : [0, 1, 1, 0]
                );
                const y = useTransform(
                  scrollYProgress,
                  [start, fadeIn, fadeOut, end],
                  prefersReduced ? [0, 0, 0, 0] : [30, 0, 0, -30]
                );

                return (
                  <motion.div
                    key={i}
                    style={{ opacity, y }}
                    className="absolute inset-0"
                  >
                    <span className="block text-[11px] uppercase tracking-[0.3em] font-mono text-[var(--text-muted)] mb-4">
                      — {chapter.label}
                    </span>
                    <h3 className="text-4xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.03em]">
                      {chapter.heading}
                    </h3>
                    <p className="text-[var(--text-secondary)] mt-6 max-w-[44ch] text-lg leading-relaxed">
                      {chapter.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Visual side */}
          <div className="relative h-[60vh] lg:h-[70vh]">
            {chapters.map((chapter, i) => {
              const start = i / chapters.length;
              const end = (i + 1) / chapters.length;
              const fadeIn = start + 0.02;
              const fadeOut = end - 0.05;

              const opacity = useTransform(
                scrollYProgress,
                [start, fadeIn, fadeOut, end],
                [0, 1, 1, 0]
              );
              const scale = useTransform(
                scrollYProgress,
                [start, fadeIn, fadeOut, end],
                prefersReduced ? [1, 1, 1, 1] : [1.08, 1, 1, 0.96]
              );

              return (
                <motion.div
                  key={i}
                  style={{ opacity, scale }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {chapter.visual}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Chapter progress dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {chapters.map((_, i) => {
            const start = i / chapters.length;
            const end = (i + 1) / chapters.length;
            const scale = useTransform(
              scrollYProgress,
              [start, (start + end) / 2, end],
              [0.6, 1.4, 0.6]
            );
            const opacity = useTransform(
              scrollYProgress,
              [start - 0.05, start, end, end + 0.05],
              [0.3, 1, 1, 0.3]
            );

            return (
              <motion.div
                key={i}
                style={{ scale, opacity }}
                className="w-2 h-2 rounded-full bg-[var(--text-primary)]"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

## Usage

```tsx
<StickyChapters
  sectionName="Materials"
  chapters={[
    {
      label: "01",
      heading: "Aluminum.",
      description: "Machined from a single block. No seams. No fasteners. Just one continuous surface.",
      visual: <img src="/aluminum.jpg" className="w-full h-full object-cover rounded-sm" />,
    },
    {
      label: "02",
      heading: "Glass.",
      description: "Corning Gorilla Glass Victus 2, sourced from Kentucky. 0.7mm thickness. Edge-chamfered.",
      visual: <img src="/glass.jpg" className="w-full h-full object-cover rounded-sm" />,
    },
    {
      label: "03",
      heading: "Silicon.",
      description: "Our own A1 chip. 4nm process. 18 billion transistors. Fabbed in Taiwan, packaged in Arizona.",
      visual: <img src="/silicon.jpg" className="w-full h-full object-cover rounded-sm" />,
    },
  ]}
/>
```

---

## Tuning

- **Height calculation** — `chapters.length * 100 + 50vh` gives each chapter one viewport plus a short exit buffer
- **Fade windows** — tight (0.05) for snap-feel, wider (0.1) for languid crossfade
- **Scale range on visuals** — `[1.08, 1, 1, 0.96]` gives entry-scale-up + exit-shrink, filmic
- **Reduced-motion override** — flattens all transforms, shows one chapter at a time

## When to use
- EL product detail sections (features as chapters)
- EL case-study deep-dives
- EL storytelling — brand narratives unfolding over scroll

## When NOT to use
- Short content (1-2 chapters — not worth the pin)
- TM / DE / VP — other directions use different section vocabularies
- Mobile on short viewports (< 600px height) — crashes; add a mobile fallback
