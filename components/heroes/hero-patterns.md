# Hero Patterns

---

## Mental Model

The hero section has one job: communicate what the product does and for whom, then direct the user to the most important action. Every visual element in the hero must serve this communication. Elements that don't serve it — decorative gradients, animated blobs, 3D product mockups floating in space — reduce the clarity of the message.

The hero is not the place to demonstrate design skill. It is the place to demonstrate product clarity.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Eyebrow / badge | Context signal, category, or news hook | No — only when genuinely useful |
| Headline | Primary value proposition | Yes |
| Subheadline | Clarify who it's for + what they get | Yes |
| Primary CTA | The main action | Yes |
| Secondary CTA | Alternative lower-commitment action | Situational |
| Social proof signal | Trust accelerant (number, logos, quote) | Situational — strong when present |
| Product visualization | What the product looks like | Situational |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Default | Page load | Static — hero content does not animate automatically |
| CTA hover | Mouse enter on primary button | Slight background darkening (`hover:bg-primary/90`) |
| Scroll | User scrolls | Hero fades or remains — no parallax on text |

**Hero content should not animate on page load.** The content is the message — making it appear via animation delays its communication. Optional exception: very subtle `opacity: 0 → 1` over 400ms for above-the-fold polish. Never `y: 40 → 0` on the headline — it obscures the content during the reveal.

---

## Implementation

### Standard centered hero

```tsx
export function Hero() {
  return (
    <section className="px-6 py-20 text-center md:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Eyebrow — omit if no meaningful context to add */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Now in public beta
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Ship production-ready UI,{" "}
          <span className="text-muted-foreground">without the boilerplate</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          A design system and component library built for teams who need polished, accessible
          interfaces without months of custom engineering.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/signup"
            className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Get started free
          </a>
          <a
            href="/docs"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            View documentation
          </a>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-sm text-muted-foreground">
          Trusted by{" "}
          <span className="font-medium text-foreground">2,400+ engineering teams</span>
        </p>
      </div>
    </section>
  )
}
```

### Left-aligned hero with product visualization

```tsx
export function HeroSplit() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Copy block */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Analytics that help you understand what's working
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            See exactly which campaigns drive revenue, which channels retain users, and where
            your funnel loses people — in one place.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href="/signup"
              className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Start free trial
            </a>
            <a
              href="/demo"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
            >
              See a demo →
            </a>
          </div>
        </div>

        {/* Product visualization — plain, no decorative chrome */}
        <div className="rounded-xl border border-border bg-muted/30 aspect-video overflow-hidden">
          {/* Actual screenshot, video, or static component preview */}
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Product screenshot
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Minimal editorial hero (content-first products)

```tsx
export function HeroEditorial() {
  return (
    <section className="px-6 py-24 md:py-36">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
          The weekly brief for product teams
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          5-minute reads on product design, growth, and the decisions that move metrics.
          Written for people who ship things.
        </p>
        <form className="mt-10 flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          12,400 subscribers. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
```

---

## Integration Notes

**With Next.js:** Use `<Link>` for CTAs that navigate within the app. For true landing pages where these are anchor links, `<a>` is correct.

**With Framer Motion:** If animation is used, apply it only to the content block as a whole, not to individual words or letters. Staggered text reveals are Class C behavior.

```tsx
// Acceptable — whole content block fades in
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
>
  {/* hero content */}
</motion.div>
```

**TypeScript interface:**
```tsx
interface HeroProps {
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  eyebrow?: string
  socialProof?: string
}
```

---

## Quality Benchmarks

A production-grade hero must:

- Communicate the core value proposition in one reading pass (under 5 seconds)
- Have a single dominant visual hierarchy: headline → subheadline → CTA
- Have the primary CTA visually distinct from every other element
- Be readable without JavaScript executing (no content hidden until animation completes)
- Have proper heading hierarchy: `<h1>` for the main headline, nothing else on the page using `<h1>`
- Load the above-the-fold content without layout shift

---

## Anti-Patterns

See `heroes/hero-anti-patterns.md` for the full catalog. Key summary:

**Gradient headline:** Text with gradient fill (`bg-clip-text text-transparent bg-gradient-to-r`) is the single most overused AI pattern. It signals demo code, not production UI.

**Animated blob background:** CSS radial-gradient blobs that animate in the background (pulsing, floating). Decorative noise that competes with the message.

**Multiple competing CTAs:** Three or more equally weighted buttons. The user's eye has no clear next step. One primary (filled), one secondary (outlined or text), maximum.

**"Everything above the fold" cramming:** Testimonials, logo clouds, feature bullets, and pricing all in the hero section. The hero has one job.

**Oversized product screenshot with decorative chrome:** A browser frame floating at an angle, surrounded by gradient, with multiple colored badges. The product visualization should help the user understand the product — not showcase the designer's compositing skills.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark bg, tight padding (`py-16`), no product visualization in hero, headline `text-white font-mono` or tight grotesque, CTA uses semantic green |
| Spatial Immersive | Very generous padding (`py-36` or more), large headline (`text-6xl`+), dark background, minimal copy, cinematic entrance animation (whole block, slow) |
| Editorial Brutalism | Left-aligned, oversized headline (`text-7xl`+ display), uppercase eyebrow, hard-bordered CTA, no product visualization — type is the hero |
| Enterprise Neutral | Split layout (copy left, screenshot right), `py-20`, clean typography, blue-600 primary CTA |
| Editorial Warm | Center or left aligned, generous line height, serif option for headline, email input as CTA common, warm off-white background |
