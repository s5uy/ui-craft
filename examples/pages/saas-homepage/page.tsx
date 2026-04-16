"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, BarChart2, ChevronRight, LineChart, TrendingUp, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-border/60 bg-background/95 backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold tracking-tight">Meridian</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#metrics" className="transition-colors hover:text-foreground">Metrics</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          <a href="#" className="transition-colors hover:text-foreground">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-sm">Sign in</Button>
          <Button size="sm" className="bg-blue-600 text-sm text-white hover:bg-blue-700">
            Start free
          </Button>
        </div>
      </nav>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-3xl"
      >
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Analytics infrastructure
        </p>

        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          Track the metrics{" "}
          <span className="text-blue-600">that matter</span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-xl text-muted-foreground">
          Meridian connects to your data sources and surfaces what's actually driving growth — without the dashboard sprawl.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="h-12 bg-blue-600 px-8 text-base text-white hover:bg-blue-700"
          >
            Start for free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" size="lg" className="h-12 px-8 text-base">
            See how it works
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Dashboard preview */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-20 w-full max-w-4xl"
      >
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <DashboardPreview />
        </div>
      </motion.div>
    </section>
  )
}

// ─── Dashboard preview (static UI mock) ──────────────────────────────────────

function DashboardPreview() {
  const bars = [42, 68, 54, 75, 61, 88, 72, 95, 83, 79, 91, 87]

  return (
    <div className="p-6">
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Weekly active users</p>
          <p className="text-2xl font-semibold tabular-nums tracking-tight">24,891</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          <TrendingUp className="h-3 w-3" />
          +12.4% vs last week
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex h-24 items-end gap-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-t-sm",
              i === bars.length - 1 ? "bg-blue-600" : "bg-border"
            )}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      {/* Metric row */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
        {[
          { label: "Avg. session", value: "4m 12s" },
          { label: "Conversion", value: "3.8%" },
          { label: "Retention D7", value: "61%" },
        ].map((m) => (
          <div key={m.label}>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: LineChart,
    heading: "Funnel clarity",
    body: "See where users drop off before they leave. Meridian maps every path through your product and surfaces the moments that kill conversion.",
  },
  {
    icon: Users,
    heading: "Cohort intelligence",
    body: "Compare behavior across signup date, acquisition channel, plan tier, or any custom attribute. No SQL required.",
  },
  {
    icon: Zap,
    heading: "Real-time event stream",
    body: "Every user action, as it happens. Filter by property, build segments on the fly, and watch your product respond to a feature launch live.",
  },
  {
    icon: TrendingUp,
    heading: "Retention modeling",
    body: "Seven-day and thirty-day retention surfaces which features actually build habits — not just sessions.",
  },
]

function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What Meridian does
          </p>
          <h2 className="max-w-lg text-3xl font-semibold tracking-tight md:text-4xl">
            Analysis that answers real questions
          </h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card">
                <feature.icon className="h-4.5 w-4.5 text-foreground" />
              </div>
              <h3 className="mb-2 text-base font-semibold">{feature.heading}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: 4200, suffix: "+", label: "Companies tracking with Meridian" },
  { value: 2800000000, suffix: "", label: "Events processed this month" },
  { value: 99, suffix: ".97%", label: "Ingest uptime, trailing 12 months" },
  { value: 140, suffix: "ms", label: "Median query time, p50" },
]

function Metrics() {
  return (
    <section id="metrics" className="border-y border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="mb-1 text-3xl font-semibold tabular-nums tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

function Testimonial() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
            "We cut our analytics setup from three weeks to one afternoon. Meridian ingests our events, segments our users, and tells us what's working — we stopped guessing."
          </p>
          <footer className="mt-8">
            <p className="text-sm font-medium">Priya Mehta</p>
            <p className="text-sm text-muted-foreground">Head of Product, Archetype Labs</p>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For solo builders and early-stage products.",
    features: [
      "Up to 500K events/month",
      "7-day data retention",
      "3 saved reports",
      "Email support",
    ],
    cta: "Start free",
    primary: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "For teams that need real retention and funnel data.",
    features: [
      "Up to 10M events/month",
      "90-day data retention",
      "Unlimited saved reports",
      "Cohort analysis",
      "Slack alerts",
    ],
    cta: "Start free trial",
    primary: true,
  },
  {
    name: "Scale",
    price: "$149",
    period: "/month",
    description: "For high-volume products with compliance requirements.",
    features: [
      "Unlimited events",
      "1-year data retention",
      "Custom event schemas",
      "SSO + SAML",
      "SLA + priority support",
    ],
    cta: "Contact sales",
    primary: false,
  },
]

function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Simple, predictable pricing
          </h2>
          <p className="mt-3 text-muted-foreground">No per-seat fees. No hidden event taxes.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={cn(
                "flex flex-col rounded-xl border p-6",
                plan.primary
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-border bg-card"
              )}
            >
              <p className={cn("text-xs font-semibold uppercase tracking-widest", plan.primary ? "text-blue-100" : "text-muted-foreground")}>
                {plan.name}
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tabular-nums">{plan.price}</span>
                <span className={cn("text-sm", plan.primary ? "text-blue-200" : "text-muted-foreground")}>{plan.period}</span>
              </div>
              <p className={cn("mt-2 text-sm", plan.primary ? "text-blue-100" : "text-muted-foreground")}>
                {plan.description}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className={cn("h-1 w-1 rounded-full", plan.primary ? "bg-blue-200" : "bg-muted-foreground")} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "mt-8 w-full",
                  plan.primary
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold">Meridian</span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {["Privacy", "Terms", "Security", "Status", "Docs"].map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © 2024 Meridian Analytics, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SaasHomepage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Metrics />
        <Testimonial />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
