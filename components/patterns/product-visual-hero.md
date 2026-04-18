# Pattern: Product-Visual Hero (VP)

**Direction:** VP (primary)
**Role:** Hero section where the product visual dominates. 55-65% of viewport is the product — scrolling, floating, or animated.

---

## Component

```tsx
"use client";
import { motion } from "framer-motion";

interface ProductVisualHeroProps {
  eyebrow?: string;
  headline: React.ReactNode;  // allow JSX for italic-serif accents
  description: string;
  ctas: Array<{ label: string; href: string; primary?: boolean }>;
  visual: React.ReactNode;
  float?: boolean;             // perpetual y float on visual
}

export function ProductVisualHero({
  eyebrow,
  headline,
  description,
  ctas,
  visual,
  float = true,
}: ProductVisualHeroProps) {
  return (
    <section className="pt-20 pb-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-1)] border border-[var(--border-weak)] text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.18_145)] animate-pulse" />
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.98] tracking-[-0.03em] mt-8 max-w-5xl mx-auto"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg lg:text-xl text-[var(--text-secondary)] mt-6 max-w-[52ch] mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
        >
          {ctas.map((cta, i) => (
            <motion.a
              key={i}
              href={cta.href}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={
                cta.primary
                  ? "px-7 py-3.5 bg-[var(--text-primary)] text-[var(--bg-0)] rounded-full font-semibold shadow-[0_16px_32px_-12px_rgba(0,0,0,0.3)]"
                  : "px-7 py-3.5 border border-[var(--border-strong)] rounded-full font-semibold"
              }
            >
              {cta.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-[1100px] mx-auto"
        >
          {float ? (
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {visual}
            </motion.div>
          ) : (
            visual
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

## Usage

```tsx
<ProductVisualHero
  eyebrow="New — version 4"
  headline={
    <>
      The browser{" "}
      <em className="font-serif italic font-medium bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 text-transparent">
        for everyone
      </em>
    </>
  }
  description="A browser that thinks like you do. Organize tabs like files. Pin your favorites. Focus when you need to."
  ctas={[
    { label: "Download for Mac", href: "/download", primary: true },
    { label: "Watch the video", href: "/video" },
  ]}
  visual={
    <img
      src="/hero-product.png"
      alt="Product screenshot"
      className="w-full rounded-2xl shadow-[0_48px_96px_-24px_rgba(0,0,0,0.25)]"
    />
  }
/>
```

---

## The italic-serif accent word

The single most VP-distinctive type move. One word of the hero is rendered in an italic serif face, often with a gradient fill.

```tsx
<em className="font-serif italic font-medium bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 text-transparent">
  effortless
</em>
```

Use Google Font `Instrument Serif` for most VP italic accents — the contrast between bold sans and italic serif is the VP brand.

---

## What makes this VP, not AI slop

- Product visual is the star, not the headline
- Headline includes at least one italic-serif accent word
- CTAs are `rounded-full`, not `rounded-md`
- Perpetual ±10px float on visual is allowed (ONE motion loop per page)
- Primary CTA has soft halation shadow
- `eyebrow` uses a live pulse dot (VP pill) not mono square

## When NOT to use
- TM / DE / EL — other directions have their own hero vocabularies
- Without a real product visual — VP collapses without strong imagery
