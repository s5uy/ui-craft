# Pattern: Giant Display Hero

**Direction:** EL (primary)
**Role:** Hero with 20vw fluid display type. The signature EL moment. Used by Apple, Teenage Engineering, Nothing, Rhode.

---

## Component

```tsx
"use client";
import { motion } from "framer-motion";

interface GiantDisplayHeroProps {
  chapterLabel?: string;     // e.g., "— 01 —"
  text: string;              // the hero text
  textAfter?: React.ReactNode;  // optional continuation line
  subheading?: string;
  cta?: { label: string; href: string };
  variant?: "center" | "left" | "edge";
  minHeight?: string;
}

export function GiantDisplayHero({
  chapterLabel,
  text,
  textAfter,
  subheading,
  cta,
  variant = "center",
  minHeight = "100vh",
}: GiantDisplayHeroProps) {
  const alignClasses = {
    center: "items-center justify-center text-center",
    left: "items-center justify-start text-left",
    edge: "items-end justify-start text-left",
  }[variant];

  const words = text.split(" ");

  return (
    <section
      className={`relative flex ${alignClasses} px-6 lg:px-12 py-24`}
      style={{ minHeight }}
    >
      <div className={`${variant === "center" ? "max-w-[1400px] w-full" : "w-full"}`}>
        {chapterLabel && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[11px] uppercase tracking-[0.3em] font-mono text-[var(--text-muted)] mb-8 lg:mb-12"
          >
            {chapterLabel}
          </motion.span>
        )}

        <h1
          className="font-semibold leading-[0.85] tracking-[-0.055em]"
          style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}
          aria-label={text}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "0.5em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.08em]"
              aria-hidden="true"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {textAfter && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            {textAfter}
          </motion.div>
        )}

        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 text-lg lg:text-xl text-[var(--text-secondary)] max-w-[48ch] leading-relaxed"
            style={variant === "center" ? { marginLeft: "auto", marginRight: "auto" } : undefined}
          >
            {subheading}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-10 ${variant === "center" ? "flex justify-center" : ""}`}
          >
            <a
              href={cta.href}
              className="inline-flex items-center gap-2 text-base font-medium group"
            >
              {cta.label}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 ease-[cubic-bezier(0.22,1,0.36,1)]">
                →
              </span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

## Usage

```tsx
<GiantDisplayHero
  chapterLabel="— Chapter 01"
  text="Think different."
  subheading="A computer that thinks about you, not the other way around."
  cta={{ label: "Watch the film", href: "/film" }}
  variant="center"
/>
```

## Usage — multi-line with accent

```tsx
<GiantDisplayHero
  chapterLabel="— 2026"
  text="A quieter computer."
  textAfter={
    <span className="font-serif italic text-[var(--text-secondary)] text-2xl lg:text-4xl">
      ...and a louder thought.
    </span>
  }
  cta={{ label: "See the device", href: "/device" }}
  variant="left"
/>
```

## Usage — edge variant (Apple-style bottom-left)

```tsx
<GiantDisplayHero
  text="MacBook Air."
  subheading="Light. Forever changed."
  variant="edge"
  minHeight="90vh"
/>
```

---

## Why the numbers matter

- `clamp(4rem, 20vw, 18rem)` — hero scales with viewport; 20vw on desktop ~ 280px, drops to ~64px on mobile
- `leading-[0.85]` — ultra-tight line-height so stacked words pack together
- `tracking-[-0.055em]` — extreme negative tracking is the EL signature
- `font-semibold` (600) — Apple hero weight; avoid 700+ which reads as shouting
- Word-by-word reveal at 80ms/word (not letter-by-letter like DE) — EL cadence is slower and more editorial

---

## Accessibility

- Real `<h1>` with `aria-label` holding the complete text
- Individual word spans `aria-hidden="true"`
- `prefers-reduced-motion` should skip the stagger; all words appear at once

## When to use
- EL hero on product sites, hardware launches, editorial brand pages
- Launch/teaser pages
- E-commerce EL storefronts

## When NOT to use
- TM / DE / VP — each has its own hero scale
- When the copy is long (breaks the "one giant idea" premise)
- Short viewport users — make sure subheading is still visible
