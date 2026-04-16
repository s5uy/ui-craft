# Pricing Patterns

---

## Mental Model

A pricing section's job is to make the right tier obvious and the decision easy. It is a conversion tool, not a feature showcase. The hierarchy must communicate: here are the options, here is the one most people choose, here is what you get for each.

Every element that doesn't serve that hierarchy should be removed.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Billing toggle | Monthly/annual switch | Yes if offering annual discount |
| Tier cards | One card per pricing tier | Yes |
| Tier name | Identifies the plan | Yes |
| Price | Clear, prominent number | Yes |
| Price period | "/month", "/year" | Yes |
| Annual savings callout | Highlights discount | Yes (when annual toggle is present) |
| Feature list | What's included | Yes |
| Primary CTA | Subscribe/start button per tier | Yes |
| Recommended badge | Visual hierarchy signal | Yes (on the middle/recommended tier) |
| Trust note | Below the cards — refund, no credit card, etc. | Recommended |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Monthly billing | Default | Monthly prices shown |
| Annual billing | Toggle click | Annual prices shown, discount visible |
| Recommended tier | Always | Elevated visual treatment (border, background, badge) |
| CTA hover | Mouse over | Slight background change per button pattern |
| Feature tooltip | Hover on ambiguous feature | Tooltip with clarification |

---

## Implementation

### Three-tier pricing (standard SaaS)

```tsx
"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingTier {
  id: string
  name: string
  monthlyPrice: number | null  // null = custom/enterprise
  annualPrice: number | null
  description: string
  features: string[]
  cta: string
  ctaHref: string
  recommended?: boolean
}

const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "For individuals and small projects",
    features: [
      "Up to 3 projects",
      "5 GB storage",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get started free",
    ctaHref: "/signup",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 23,
    description: "For growing teams that need more",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Advanced analytics",
      "Priority email support",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start free trial",
    ctaHref: "/signup?plan=pro",
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "For large organizations with custom needs",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "SLA guarantee",
      "Dedicated support",
      "SSO / SAML",
      "Custom contracts",
    ],
    cta: "Contact sales",
    ctaHref: "/contact",
  },
]

function formatPrice(price: number | null, annual: boolean): string {
  if (price === null) return "Custom"
  if (price === 0) return "Free"
  return `$${annual ? tiers.find((t) => t.annualPrice === price)?.annualPrice ?? price : price}`
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start free. Scale as you grow.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                !annual ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                annual ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const price = annual ? tier.annualPrice : tier.monthlyPrice
            return (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-xl border p-6",
                  tier.recommended
                    ? "border-foreground bg-foreground text-background shadow-xl"
                    : "border-border bg-card"
                )}
              >
                {tier.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background ring-2 ring-background">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={cn(
                    "font-semibold",
                    tier.recommended ? "text-background" : "text-foreground"
                  )}>
                    {tier.name}
                  </h3>
                  <p className={cn(
                    "mt-1 text-sm",
                    tier.recommended ? "text-background/70" : "text-muted-foreground"
                  )}>
                    {tier.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={cn(
                      "font-mono text-4xl font-semibold tabular-nums",
                      tier.recommended ? "text-background" : "text-foreground"
                    )}>
                      {price === null ? "Custom" : price === 0 ? "Free" : `$${price}`}
                    </span>
                    {price !== null && price > 0 && (
                      <span className={cn(
                        "text-sm",
                        tier.recommended ? "text-background/70" : "text-muted-foreground"
                      )}>
                        /mo
                      </span>
                    )}
                  </div>
                  {annual && tier.monthlyPrice && tier.annualPrice && tier.monthlyPrice !== tier.annualPrice && (
                    <p className={cn(
                      "mt-1 text-xs",
                      tier.recommended ? "text-background/60" : "text-muted-foreground"
                    )}>
                      Billed annually (${tier.annualPrice * 12}/yr)
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        tier.recommended ? "text-background" : "text-emerald-600"
                      )} />
                      <span className={tier.recommended ? "text-background/90" : "text-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.ctaHref}
                  className={cn(
                    "block rounded-lg px-5 py-2.5 text-center text-sm font-medium transition-colors",
                    tier.recommended
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            )
          })}
        </div>

        {/* Trust note */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          No credit card required. Cancel anytime. All plans include a 14-day free trial.
        </p>
      </div>
    </section>
  )
}
```

---

## Integration Notes

**TypeScript interface:**
```tsx
interface PricingTier {
  id: string
  name: string
  monthlyPrice: number | null  // null = custom/enterprise
  annualPrice: number | null
  description: string
  features: string[]
  cta: string
  ctaHref: string
  recommended?: boolean
}
```

**With Next.js:** CTA links should use `<Link>` for internal navigation. For external payment links (Stripe, Paddle), use `<a>`.

---

## Quality Benchmarks

A production-grade pricing section must:

- Make the recommended tier visually distinct without requiring color alone (use elevation, border, scale)
- Show the annual savings as an absolute amount or percentage — not just a different number
- Have the price in a large, readable monospace font with `tabular-nums`
- Include a trust note (no credit card, trial period, cancel anytime) — this directly impacts conversion
- Work correctly at all viewport widths (stack cards on mobile, 2-col on tablet, 3-col on desktop)
- Have a single CTA per tier with clear differentiation (free tier vs. paid trial vs. contact sales)

---

## Anti-Patterns

**Four or more tiers:** Beyond three tiers, pricing becomes a decision matrix that users can't parse. Consolidate or use a comparison table for complex pricing.

**Gradient backgrounds on the recommended card:** A purple-to-blue gradient on the "Pro" card is a Class C pattern. The recommended tier earns its distinction through elevation and contrast, not color effects.

**Feature lists with checkmarks for everything:** If every tier has a checkmark for every feature and the difference is just in limits, show the limits clearly (`5 projects` vs. `Unlimited`) rather than all-checkmarks-plus-footnotes.

**Ambiguous pricing:** "Starting at $29" with no clarity on what drives the final price. Pricing must be specific. If truly variable, say "Custom — contact sales."

**Missing the "what happens after the trial" explanation:** If there's a free trial, users need to know when it ends and what they're signing up for. Burying this creates trust issues.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark cards `bg-[#111111] border-white/10`, monospace prices, recommended tier uses `border-green-500/30 bg-green-500/5`, feature checkmarks in green |
| Spatial Immersive | Generous padding, large price display, minimal feature list, dark background cards, recommended tier with elevated shadow |
| Editorial Brutalism | `border-2 border-black rounded-none`, recommended tier full black `bg-black text-white`, hard shadow on recommended |
| Enterprise Neutral | Standard implementation, blue CTA buttons, clean tabular layout |
| Editorial Warm | Warm card surfaces, serif potential for tier names, forest green checkmarks |
