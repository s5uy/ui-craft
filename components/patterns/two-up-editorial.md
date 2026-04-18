# Pattern: Two-Up Editorial Spread

**Direction:** EL (primary), DE (variant)
**Role:** Full-bleed image on one side + offset text on the other. The editorial feature-section archetype — replaces feature cards entirely for EL.

---

## Component

```tsx
"use client";
import { motion } from "framer-motion";

interface TwoUpEditorialProps {
  image: string;
  alt: string;
  label?: string;
  heading: string;
  description: string;
  footnote?: string;
  reverse?: boolean;         // image right?
  imageAspect?: string;      // e.g., "4/5", "3/4"
  textPosition?: "top" | "center" | "bottom";
}

export function TwoUpEditorial({
  image,
  alt,
  label,
  heading,
  description,
  footnote,
  reverse = false,
  imageAspect = "4/5",
  textPosition = "center",
}: TwoUpEditorialProps) {
  const justify = {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end",
  }[textPosition];

  return (
    <section className="py-32 lg:py-44">
      <div className="grid grid-cols-12 gap-0">
        {/* Image — full-bleed to one edge */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className={`col-span-12 lg:col-span-7 relative ${reverse ? "lg:col-start-6" : "lg:col-start-1"} overflow-hidden`}
        >
          <img
            src={image}
            alt={alt}
            style={{ aspectRatio: imageAspect }}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Text block — offset with dramatic whitespace */}
        <div
          className={`col-span-12 lg:col-span-4 flex flex-col ${justify} px-6 lg:px-12 py-16 lg:py-0 ${
            reverse ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-9"
          }`}
        >
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] uppercase tracking-[0.3em] font-mono text-[var(--text-muted)] mb-6"
            >
              {label}
            </motion.span>
          )}

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl lg:text-6xl font-semibold leading-[1.0] tracking-[-0.035em]"
          >
            {heading}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-[var(--text-secondary)] leading-relaxed mt-8 max-w-[44ch]"
          >
            {description}
          </motion.p>

          {footnote && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-[11px] uppercase tracking-[0.25em] font-mono text-[var(--text-muted)] mt-16"
            >
              {footnote}
            </motion.span>
          )}
        </div>
      </div>
    </section>
  );
}
```

## Usage

```tsx
<>
  <TwoUpEditorial
    image="/material-aluminum.jpg"
    alt="Machined aluminum"
    label="— Material 01"
    heading="Aluminum. Glass. Silicon."
    description="Three materials. One object. Nothing else."
    footnote="Anodized in Malmö. Assembled in Shenzhen."
    imageAspect="4/5"
  />

  <TwoUpEditorial
    image="/process-machining.jpg"
    alt="Precision machining"
    label="— Process 02"
    heading="Milled to 0.01mm."
    description="Each unit spends 17 hours on a 5-axis CNC. The tolerance is tighter than the seams on a Leica camera."
    reverse
    imageAspect="3/4"
  />
</>
```

---

## DE variant

For DE portfolios, pair a smaller image (8-col instead of 7) with numbered metadata:

```tsx
<section className="py-28">
  <div className="max-w-[1120px] mx-auto px-10 grid grid-cols-12 gap-8">
    <div className="col-span-1 text-[11px] uppercase tracking-[0.2em] font-mono text-muted">
      02
    </div>
    <div className="col-span-7">
      <img src="..." className="w-full aspect-[4/3] object-cover" />
    </div>
    <div className="col-span-4 flex flex-col justify-center">
      <h3 className="text-2xl font-medium">Aubergine — Design System</h3>
      <p className="text-muted mt-4 text-sm leading-relaxed">
        Multi-brand DS for 40+ products across 12 teams.
      </p>
      <span className="text-[11px] uppercase tracking-wider font-mono text-muted mt-8">
        2024 — Vercel
      </span>
    </div>
  </div>
</section>
```

---

## Tuning

- **Image column width** — 7/12 for dramatic EL; 8/12 for editorial balance
- **Whitespace gap** — the gap between image and text column is the magic. Default pattern leaves an empty column (col-span-1 as breathing room)
- **Image aspect** — `4/5` for product, `3/4` for portraits, `16/10` for scenes, `1/1` for detail

## When to use
- EL feature-deep-dives
- EL materials / process / craftsmanship sections
- E-commerce product detail spreads
- Editorial case-studies

## When NOT to use
- Text-only content (need an image)
- TM / VP — these use feature cards and color blocks, not editorial spreads
