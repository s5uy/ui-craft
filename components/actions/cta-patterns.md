# CTA Section Patterns

---

## Mental Model

A CTA (call-to-action) section is a concentrated conversion moment. It exists to give the user who has read enough a clear, frictionless next step. The design must do one thing: make the action obvious and compelling. Everything else — backgrounds, decorative elements, secondary copy — must serve that single goal or be removed.

---

## Implementation

### Simple centered CTA

```tsx
export function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join 12,000+ teams already using Acme. No credit card required.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/signup"
            className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Start for free
          </a>
          <a
            href="/demo"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
          >
            See a demo →
          </a>
        </div>
      </div>
    </section>
  )
}
```

### Tinted background CTA (section closer)

```tsx
export function CTABanner() {
  return (
    <section className="mx-6 mb-16 rounded-xl border border-border bg-muted/40 px-8 py-12 text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Start shipping better UI today
      </h2>
      <p className="mt-3 text-muted-foreground">
        Free plan available. Upgrade when you&apos;re ready.
      </p>
      <a
        href="/signup"
        className="mt-6 inline-flex rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
      >
        Create free account
      </a>
    </section>
  )
}
```

---

## Quality Benchmarks

- Single primary CTA — one thing for the user to do
- Action copy describes the outcome, not the click: `"Start free trial"` not `"Click here"`
- Social proof near the CTA (user count, trial terms, no-credit-card note) to reduce friction
- No gradient, no glow on the CTA section background

---

## Anti-Patterns

**Gradient section background:** A dark-to-gradient CTA section is the canonical AI landing page closer. Remove it — solid background or tinted muted surface.

**"Get Started" without context:** Action copy that says only "Get Started" without any indication of what starts, or what it costs. Add friction-reducing context in the button label or directly below: `"Start free 14-day trial"`.

**Competing CTAs at equal weight:** Two filled buttons side by side. One primary (filled), one text link maximum.
