# Pattern: Chunky Pricing

**Direction:** VP (primary)
**Role:** Pricing cards with rounded-3xl, confident color, bouncy hover. Friendlier counterpart to TM's pricing-toggle pattern.

---

## Component

```tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Tier {
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  accent?: string;    // tier-specific color
}

interface ChunkyPricingProps {
  tiers: Tier[];
  eyebrow?: string;
  heading?: string;
}

export function ChunkyPricing({ tiers, eyebrow, heading }: ChunkyPricingProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {(eyebrow || heading) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
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

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full bg-[var(--bg-1)] relative">
            <button
              onClick={() => setBilling("monthly")}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                billing === "monthly" ? "text-[var(--bg-0)]" : "text-[var(--text-secondary)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                billing === "yearly" ? "text-[var(--bg-0)]" : "text-[var(--text-secondary)]"
              }`}
            >
              Yearly
              <span className="text-[10px] px-2 py-0.5 bg-[oklch(0.78_0.16_145)] text-black rounded-full font-bold">
                SAVE 20%
              </span>
            </button>
            <motion.div
              className="absolute inset-y-1 rounded-full bg-[var(--text-primary)]"
              initial={false}
              animate={{
                left: billing === "monthly" ? 4 : "calc(50% + 0px)",
                right: billing === "monthly" ? "calc(50% + 0px)" : 4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl p-10 ${
                tier.featured
                  ? "bg-[var(--text-primary)] text-[var(--bg-0)] lg:scale-105 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.3)]"
                  : "bg-[var(--bg-1)] border border-[var(--border-weak)]"
              }`}
              style={{
                borderColor: tier.featured && tier.accent ? tier.accent : undefined,
              }}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[oklch(0.78_0.16_145)] text-black text-xs font-bold uppercase tracking-wider">
                  Most popular
                </span>
              )}

              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <p className={`mt-2 ${tier.featured ? "opacity-80" : "text-[var(--text-secondary)]"}`}>
                {tier.description}
              </p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-bold tabular-nums">${tier.price[billing]}</span>
                <span className={tier.featured ? "opacity-70" : "text-[var(--text-muted)]"}>
                  /mo
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`mt-8 w-full py-3 rounded-full font-semibold transition-colors ${
                  tier.featured
                    ? "bg-[var(--bg-0)] text-[var(--text-primary)] hover:bg-[var(--bg-1)]"
                    : "bg-[var(--text-primary)] text-[var(--bg-0)] hover:opacity-90"
                }`}
              >
                {tier.cta}
              </motion.button>

              <ul className="mt-8 space-y-3">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm">
                    <Check
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: tier.accent || "oklch(0.72 0.18 145)" }}
                    />
                    <span className={tier.featured ? "opacity-90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
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
<ChunkyPricing
  eyebrow="Pricing"
  heading="Simple pricing for every scale."
  tiers={[
    {
      name: "Starter",
      description: "For you and up to 3 friends",
      price: { monthly: 0, yearly: 0 },
      cta: "Get started — free",
      features: ["Up to 3 users", "5 projects", "1GB storage", "Community support"],
    },
    {
      name: "Pro",
      description: "For growing teams",
      price: { monthly: 12, yearly: 9 },
      cta: "Start 14-day trial",
      featured: true,
      accent: "oklch(0.72 0.18 25)",
      features: ["Unlimited users", "Unlimited projects", "100GB storage", "Priority support", "Advanced integrations", "SSO"],
    },
    {
      name: "Business",
      description: "For large organizations",
      price: { monthly: 32, yearly: 26 },
      cta: "Contact sales",
      features: ["Everything in Pro", "Unlimited storage", "Dedicated CSM", "SOC2 + HIPAA", "Custom contracts"],
    },
  ]}
/>
```

---

## Key VP signatures in this pattern
- `rounded-3xl` (24px) on every card
- `p-10` generous padding
- Featured tier raised via `scale-105` AND deeper shadow
- Bouncy spring hover on all cards and CTA
- Toggle uses spring animation, not instant snap
- "SAVE 20%" pill in a confident green — celebratory
- Most-popular pill uses the same celebratory color

## When NOT to use
- TM / DE / EL — use each direction's own pricing treatment
- More than 3 tiers visible at once (mobile especially)
