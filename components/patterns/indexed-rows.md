# Pattern: Indexed Rows (Feature Table)

**Direction:** DE (primary), TM (variant)
**Role:** Replaces the three-column icon feature grid with numbered, hairline-divided rows. Swiss-grid feature presentation — dense, confident, editorial.

---

## Component

```tsx
"use client";
import { motion } from "framer-motion";

interface FeatureRow {
  index: string;  // "01", "02", etc.
  title: string;
  description: string;
  href?: string;
}

interface IndexedRowsProps {
  items: FeatureRow[];
  label?: string;  // section eyebrow
  heading: string;
}

export function IndexedRows({ items, label = "— Features", heading }: IndexedRowsProps) {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-10">
        {label && (
          <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-[var(--text-muted)] block mb-6">
            {label}
          </span>
        )}
        <h2 className="text-4xl lg:text-5xl font-medium leading-[1.05] tracking-[-0.02em] max-w-[24ch]">
          {heading}
        </h2>

        <div className="mt-16 lg:mt-20 border-t border-[var(--border-hairline)]">
          {items.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group grid grid-cols-12 gap-4 lg:gap-8 py-8 lg:py-10 border-b border-[var(--border-hairline)]"
            >
              <span className="col-span-2 lg:col-span-1 text-[11px] uppercase tracking-[0.2em] font-mono text-[var(--text-muted)] pt-1">
                {item.index}
              </span>

              <h3 className="col-span-10 lg:col-span-4 text-xl lg:text-2xl font-medium leading-[1.15] tracking-[-0.01em]">
                {item.title}
              </h3>

              <p className="col-span-12 lg:col-span-6 text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>

              {item.href && (
                <a
                  href={item.href}
                  className="col-span-12 lg:col-span-1 text-[11px] uppercase tracking-[0.2em] font-mono text-right self-start mt-2 lg:mt-1 flex items-center justify-end gap-1 hover:opacity-60 transition-opacity"
                >
                  Read
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Usage

```tsx
<IndexedRows
  label="— Platform"
  heading="Everything you need to ship."
  items={[
    {
      index: "01",
      title: "Preview deployments.",
      description: "Every branch gets a production-like URL. Share with stakeholders before merging.",
      href: "/docs/previews",
    },
    {
      index: "02",
      title: "Edge caching.",
      description: "Cache at 70+ edge locations. Revalidate on-demand, on-write, or on-interval.",
      href: "/docs/cache",
    },
    {
      index: "03",
      title: "Type-safe env.",
      description: "Environment variables validated at build time. No more 3am production misconfigs.",
      href: "/docs/env",
    },
    {
      index: "04",
      title: "Unified logs.",
      description: "Structured logs across all services. Query with SQL, trace with OTEL.",
      href: "/docs/logs",
    },
  ]}
/>
```

---

## TM variant

For TM, switch hairline borders to panel borders and add a subtle hover bg-shift:

```tsx
className="group grid grid-cols-12 gap-4 py-8 border-b border-[var(--border-weak)] hover:bg-[var(--bg-1)] transition-colors"
```

---

## Styling tokens required

```css
--border-hairline: oklch(0.92 0 0 / 0.8);  /* DE light */
--text-muted:      oklch(0.55 0 0);
--text-secondary:  oklch(0.40 0 0);
```

Dark-mode (for DE graphite):
```css
--border-hairline-dark: oklch(0.22 0 0 / 0.9);
```

---

## Why this replaces icon grids

Three-column icon feature grids are the #1 AI-output cliché. Every AI UI defaults to them. Indexed rows:
- Take less horizontal space (work on narrow viewports naturally)
- Allow longer description copy
- Feel editorial and authored, not assembled
- Match DE's Swiss-grid rigor
- Scale to any number of features (3, 5, 7, 12)

---

## When to use
- DE marketing feature sections
- TM sites where you want to escape the tablist-or-grid binary
- Portfolio "Selected Work" lists
- E-commerce spec sheets

## When NOT to use
- VP sites — too sober, doesn't match VP color-block rhythm
- EL sites — EL uses chapter sections, not feature tables
- When each feature genuinely needs a visual (use feature tablist or gradient cards instead)
