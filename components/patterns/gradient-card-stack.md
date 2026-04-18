# Pattern: Gradient Card Stack

**Direction:** VP (primary — the VP signature)
**Role:** Feature tiles as 3-4 distinct two-tone gradient cards. Replaces both the icon grid AND the tablist with color-forward identity.

---

## Component

```tsx
"use client";
import { motion } from "framer-motion";

interface GradientCard {
  title: string;
  description: string;
  gradient: string;      // CSS gradient
  foreground: string;    // text color
  icon?: React.ReactNode;
  href?: string;
}

interface GradientCardStackProps {
  cards: GradientCard[];
  eyebrow?: string;
  heading?: string;
}

export function GradientCardStack({ cards, eyebrow, heading }: GradientCardStackProps) {
  return (
    <section className="py-24 lg:py-36 bg-[var(--bg-0)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {(eyebrow || heading) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {eyebrow && (
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[var(--bg-1)] rounded-full mb-6">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-4xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.03em]">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href || "#"}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 14,
                delay: i * 0.1,
              }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative overflow-hidden rounded-3xl p-8 min-h-[280px] flex flex-col justify-between"
              style={{
                background: card.gradient,
                color: card.foreground,
              }}
            >
              {card.icon && (
                <div className="text-4xl mb-4 opacity-90">{card.icon}</div>
              )}

              <div>
                <h3 className="text-2xl font-bold leading-tight">{card.title}</h3>
                <p className="mt-3 opacity-80 leading-relaxed">{card.description}</p>
              </div>

              {card.href && (
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  Learn more
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Usage

```tsx
<GradientCardStack
  eyebrow="What you get"
  heading="Everything in one friendly app."
  cards={[
    {
      title: "Fast by default",
      description: "Optimistic UI, local-first sync, instant interactions.",
      gradient: "linear-gradient(135deg, oklch(0.72 0.18 25), oklch(0.78 0.15 45))",
      foreground: "#fff",
      href: "/speed",
    },
    {
      title: "Made for teams",
      description: "Real-time collaboration. See your teammates' cursors.",
      gradient: "linear-gradient(135deg, oklch(0.68 0.17 270), oklch(0.72 0.16 210))",
      foreground: "#fff",
      href: "/teams",
    },
    {
      title: "Plays well",
      description: "Integrations with Slack, Linear, Notion, and more.",
      gradient: "linear-gradient(160deg, oklch(0.74 0.17 355), oklch(0.76 0.16 55))",
      foreground: "#fff",
      href: "/integrations",
    },
    {
      title: "Privacy-first",
      description: "End-to-end encrypted. Your data stays yours.",
      gradient: "linear-gradient(120deg, oklch(0.80 0.12 320), oklch(0.82 0.10 180))",
      foreground: "oklch(0.2 0 0)",
      href: "/privacy",
    },
  ]}
/>
```

---

## Curated gradient palette (VP signature)

Keep to 3-4 gradients per site for coherence:

```css
/* Warm set */
--grad-sunset:  linear-gradient(135deg, oklch(0.72 0.18 25),  oklch(0.78 0.15 45));
--grad-peach:   linear-gradient(135deg, oklch(0.80 0.14 40),  oklch(0.85 0.10 60));
--grad-coral:   linear-gradient(120deg, oklch(0.74 0.17 355), oklch(0.76 0.16 55));

/* Cool set */
--grad-ocean:   linear-gradient(135deg, oklch(0.68 0.17 270), oklch(0.72 0.16 210));
--grad-mint:    linear-gradient(135deg, oklch(0.82 0.14 160), oklch(0.78 0.12 190));
--grad-candy:   linear-gradient(120deg, oklch(0.80 0.12 320), oklch(0.82 0.10 180));

/* Neutral-warm */
--grad-butter:  linear-gradient(135deg, oklch(0.95 0.08 85),  oklch(0.90 0.10 60));
--grad-cream:   linear-gradient(135deg, oklch(0.96 0.04 80),  oklch(0.93 0.06 70));
```

Use `text-white` on warm/cool gradients, `text-[oklch(0.2 0 0)]` on butter/cream.

---

## What makes this VP, not AI slop

| AI slop | VP (correct) |
|---|---|
| Purple-blue fog behind hero text | Discrete cards WITH gradients AS surfaces |
| Mesh / animated gradient | Static two-tone, crafted combos |
| Same gradient everywhere | 3-4 distinct palette combos |
| Gradient text on headings | Gradient surfaces, mostly text stays flat |
| Random pastel combos | Palette-aware warm set OR cool set, not mixed |

---

## When to use
- VP feature sections (primary use)
- VP "What you get" / "Why choose us" sections
- VP product variant showcases

## When NOT to use
- More than once per page — dilutes the moment
- TM / DE / EL — these directions reject gradient devices
- For anything dense / info-rich (gradients reduce readability for long text)
