# Pattern: Horizontal Scroll Gallery

**Direction:** EL (primary), DE (variant — portfolio)
**Role:** Horizontal-scrolling gallery driven by vertical scroll. Shows 4-8 images/cases in a cinematic horizontal sweep.

---

## Component

```tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface GalleryItem {
  image: string;
  alt: string;
  title?: string;
  caption?: string;
  year?: string;
}

interface HorizontalGalleryProps {
  items: GalleryItem[];
  sectionLabel?: string;
  heading?: string;
}

export function HorizontalGallery({ items, sectionLabel, heading }: HorizontalGalleryProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Move horizontally across (100 / items.length)% of total width per item
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced
      ? ["0%", "0%"]
      : ["0%", `-${(items.length - 1) * (100 / items.length)}%`]
  );

  // Section height = one viewport per item + header
  const height = `${items.length * 100}vh`;

  return (
    <section ref={ref} style={{ height }} className="relative bg-[var(--bg-0)]">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {(sectionLabel || heading) && (
          <div className="px-6 lg:px-12 pt-16 pb-8">
            {sectionLabel && (
              <span className="block text-[11px] uppercase tracking-[0.3em] font-mono text-[var(--text-muted)] mb-4">
                {sectionLabel}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-[-0.03em] max-w-4xl">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="flex-1 flex items-center">
          <motion.div
            style={{ x: translateX }}
            className="flex gap-8 lg:gap-16 px-6 lg:px-12"
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{ width: "min(70vw, 900px)" }}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {(item.title || item.caption || item.year) && (
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      {item.title && (
                        <h3 className="text-xl font-medium tracking-[-0.01em]">
                          {item.title}
                        </h3>
                      )}
                      {item.caption && (
                        <p className="text-[var(--text-muted)] text-sm mt-1 max-w-[40ch]">
                          {item.caption}
                        </p>
                      )}
                    </div>
                    {item.year && (
                      <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[var(--text-muted)]">
                        {item.year}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[160px] h-[1px] bg-[var(--border-hairline)]">
          <motion.div
            className="h-full bg-[var(--text-primary)]"
            style={{
              width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          />
        </div>
      </div>
    </section>
  );
}
```

## Usage

```tsx
<HorizontalGallery
  sectionLabel="— Selected Work"
  heading="Projects we've been proud to ship."
  items={[
    { image: "/case1.jpg", alt: "Foundry — deploy platform", title: "Foundry", caption: "A deploy platform for engineers who hate YAML.", year: "2024" },
    { image: "/case2.jpg", alt: "Aubergine — design system", title: "Aubergine", caption: "Multi-brand design system spanning 40+ products.", year: "2024" },
    { image: "/case3.jpg", alt: "Cove — travel app", title: "Cove", caption: "A travel app for slow travellers.", year: "2023" },
    { image: "/case4.jpg", alt: "Kiln — baking workbook", title: "Kiln", caption: "A workbook for bread obsessives.", year: "2023" },
    { image: "/case5.jpg", alt: "Pillar — AI eval", title: "Pillar", caption: "Evaluating LLM safety at scale.", year: "2022" },
  ]}
/>
```

---

## Mobile fallback

On narrow viewports, drop the pin + translate and let it scroll horizontally as a native swipe-gallery:

```tsx
<div className="lg:hidden overflow-x-auto snap-x snap-mandatory -mx-6 px-6 flex gap-4">
  {items.map((item, i) => (
    <div key={i} className="shrink-0 snap-center" style={{ width: "80vw" }}>
      {/* ... */}
    </div>
  ))}
</div>
<section ref={ref} className="hidden lg:block ...">
  {/* pin-based desktop version above */}
</section>
```

---

## Tuning

- **Item width** — `70vw` works for 4-5 items; for more items, reduce to `50vw` so more show at rest
- **Gap** — `64px` (lg:gap-16) feels editorial. Tighter gaps (32px) feel energetic.
- **Aspect ratio** — `4/5` portrait for luxury products; `16/10` wide for case-studies

## When to use
- EL storefront galleries
- EL portfolios with strong photography
- DE agency "Selected Work"
- High-end fashion/beauty brand look-books

## When NOT to use
- Without strong imagery — looks empty
- Very small viewports (drop to native horizontal scroll)
- TM / VP — use different patterns (logo marquee for TM, gradient card stack for VP)
