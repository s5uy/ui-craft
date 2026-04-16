# Feature Section Patterns

---

## Mental Model

A feature section communicates the specific capabilities of a product and why they matter. Its job is to shift the user from "I understand what this is" (the hero's job) to "I understand how this helps me." Each feature item must answer: what does it do, and what outcome does that enable?

Feature sections fail when they describe features rather than benefits, when they fill space with decoration rather than meaning, and when icon-grid layouts flattens all features to equal visual weight.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Section heading | Frames the group of features | Yes |
| Section subheading | Clarifies the benefit theme | Situational |
| Feature items | Individual capability descriptions | Yes |
| Item title | Names the feature clearly | Yes |
| Item description | Explains the user benefit | Yes |
| Item icon | Visual type signal | Situational — only when it adds meaning |
| Visual (screenshot, diagram) | Shows the feature in action | For primary/hero features only |

---

## Layout Patterns

### Pattern 1: Icon grid (3-col)

Best for: 6–9 features of equal weight, no single feature is more important than others.

```tsx
interface FeatureItem {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const features: FeatureItem[] = [
  {
    title: "Real-time collaboration",
    description: "Multiple team members can edit simultaneously without conflicts. Changes propagate in under 50ms.",
    icon: Users,
  },
  // ...
]

export function FeatureGrid({ features }: { features: FeatureItem[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Everything your team needs
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Built for the workflows that matter, not the ones that look good in demos.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 2: Feature alternating (large features, 2-col split)

Best for: 2–4 primary features, each deserving visual space and a screenshot/diagram.

```tsx
interface PrimaryFeature {
  label: string
  title: string
  description: string
  bullets: string[]
  visual: React.ReactNode  // screenshot, diagram, or component preview
  visualLeft?: boolean
}

export function FeatureAlternating({ feature, index }: { feature: PrimaryFeature; index: number }) {
  const isEven = index % 2 === 0

  return (
    <div className={`grid items-center gap-16 lg:grid-cols-2 ${isEven ? "" : "lg:[&>*:first-child]:order-2"}`}>
      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground/60">
          {feature.label}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          {feature.title}
        </h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        <ul className="mt-6 space-y-2.5">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-muted/30 aspect-video overflow-hidden">
        {feature.visual}
      </div>
    </div>
  )
}

export function FeatureAlternatingSection({ features }: { features: PrimaryFeature[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-24">
        {features.map((feature, i) => (
          <FeatureAlternating key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  )
}
```

### Pattern 3: Feature list (no icons)

Best for: Many specific, text-heavy features, developer tools, or contexts where icons would add no clarity.

```tsx
export function FeatureList({ categories }: { categories: Array<{ label: string; items: string[] }> }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-3xl font-semibold tracking-tight text-foreground">
          Full capability list
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.label}>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                {category.label}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Quality Benchmarks

A production-grade feature section must:

- Have feature descriptions that name a user benefit, not just a feature name (`"See exactly where users drop off"` not `"Funnel analytics"`)
- Use icons only when they add meaning — a generic puzzle-piece icon adds nothing
- Have a clear visual hierarchy between the section heading and feature items
- Not place more than 9 items in a flat grid without grouping
- Not use icon backgrounds that are more visually prominent than the feature content

---

## Anti-Patterns

**The icon blob:** A rounded square with a gradient background (`bg-gradient-to-br from-blue-400 to-purple-600`) containing a white icon. This is the canonical AI feature section pattern. The colored blob draws more attention than the feature description.

**Feature names as descriptions:** `"Advanced Analytics"`, `"Real-time Sync"`, `"Smart Search"` — three words that describe the feature category, not what the user gets. Replace with outcomes: `"Know what's working before the sprint ends"`.

**Equal weight for 9 features:** A 3×3 grid of identical feature cards with no primary/secondary hierarchy. If one feature is the product's key differentiator, it should be visually larger or in a different layout.

**Truncated descriptions:** Using `line-clamp-2` to keep cards equal height, cutting off descriptions mid-sentence. Let descriptions breathe — and accept variable card heights.

**Filler icons:** Using generic icons from a library (lightbulb, rocket, star) that could mean anything. If the icon doesn't specifically represent the feature, omit it.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | No icons on features, tight list format, monochrome, function-first copy |
| Spatial Immersive | Large alternating layout with generous spacing, product visuals as the hero of each feature |
| Editorial Brutalism | Bold text-only, large feature numbers or labels, no icons, high contrast section dividers |
| Enterprise Neutral | Standard 3-col grid, neutral icons, clear benefit language, conventional layout |
| Editorial Warm | List format or alternating, serif feature headings, warm surface cards, minimal icons |
