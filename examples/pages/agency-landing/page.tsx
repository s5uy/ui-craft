"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Work data ────────────────────────────────────────────────────────────────

const WORK = [
  {
    client: "Arbor",
    type: "Brand identity",
    year: "2024",
    description: "Complete visual identity for a sustainable materials startup — wordmark, packaging system, and digital brand guidelines.",
    span: "col-span-8",
    aspect: "aspect-[16/10]",
    bg: "bg-zinc-100",
  },
  {
    client: "Tessera",
    type: "Product design",
    year: "2024",
    description: "End-to-end design for a B2B procurement tool. Information architecture, component system, and design-to-dev handoff.",
    span: "col-span-4",
    aspect: "aspect-[4/5]",
    bg: "bg-zinc-200",
  },
  {
    client: "Ostara",
    type: "Brand + web",
    year: "2023",
    description: "Brand positioning and landing site for a Series A fintech. Designed to close enterprise deals, not impress designers.",
    span: "col-span-5",
    aspect: "aspect-[5/4]",
    bg: "bg-zinc-150",
  },
  {
    client: "Vantage Labs",
    type: "Design system",
    year: "2023",
    description: "200-component design system built in parallel with an engineering team. Figma tokens to Tailwind in three months.",
    span: "col-span-7",
    aspect: "aspect-[7/4]",
    bg: "bg-zinc-100",
  },
]

const SERVICES = [
  ["Brand identity", "Visual systems", "Logo + wordmark"],
  ["Product design", "UX research", "Prototyping"],
  ["Design systems", "Component libraries", "Tokens + documentation"],
  ["Web design", "Landing pages", "Marketing sites"],
]

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-sm font-semibold tracking-tight">
          Fieldwork
        </a>

        <div className="flex items-center gap-8 text-sm">
          {["Work", "Studio", "Services", "Journal"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-black/40 transition-opacity hover:text-black"
              style={{ transition: "color 0ms" }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="text-black transition-opacity hover:text-black/60"
          >
            Start a project →
          </a>
        </div>
      </nav>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            Brand & product design studio
          </span>
        </div>

        <h1
          className="font-black leading-none tracking-tighter text-black"
          style={{ fontSize: "clamp(56px, 10vw, 128px)" }}
        >
          We design
          <br />
          <span className="text-black/20">things that</span>
          <br />
          work.
        </h1>

        <hr className="mt-16 border-black/10" />
      </div>
    </section>
  )
}

// ─── Work grid ────────────────────────────────────────────────────────────────

function WorkImage({ bg, aspect }: { bg: string; aspect: string }) {
  return (
    <div className={cn("group relative overflow-hidden", aspect)}>
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]",
          bg
        )}
      />
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-60" />
    </div>
  )
}

function WorkGrid() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-12 gap-4">
          {WORK.map((project, i) => (
            <motion.div
              key={project.client}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={cn("group cursor-pointer", project.span)}
            >
              <WorkImage bg={project.bg} aspect={project.aspect} />
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{project.client}</p>
                  <p className="text-xs text-black/40">{project.type} — {project.year}</p>
                </div>
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-black/20 transition-colors group-hover:text-black" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────────

function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="border-t border-black/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-3 gap-16">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xs uppercase tracking-widest text-black/40">Studio</span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="col-span-2"
          >
            <p className="mb-6 text-2xl font-semibold leading-snug tracking-tight">
              Fieldwork is a six-person studio in Berlin. We take on twelve projects a year.
            </p>
            <p className="text-base leading-relaxed text-black/60">
              Founded in 2018 by designers who had spent years at product companies. We are not a consultancy that scales. We work closely with founders and product teams who want the same partner from kickoff to handoff — not a rotating team of juniors.
            </p>
            <p className="mt-4 text-base leading-relaxed text-black/60">
              Our work is split between brand identity for early-stage companies and product design for teams that need to ship without accumulating design debt.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Services ──────────────────────────────────────────────────────────────────

function Services() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="border-t border-black/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-black/40">Services</span>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {SERVICES.map((group, i) => (
            <motion.div
              key={group[0]}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <p className="mb-3 text-sm font-semibold">{group[0]}</p>
              {group.slice(1).map((item) => (
                <p key={item} className="text-sm text-black/45">{item}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

function Testimonial() {
  return (
    <section className="border-t border-black/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-3 gap-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-black/40">Client</span>
          </div>
          <div className="col-span-2">
            <blockquote>
              <p className="text-xl font-semibold leading-snug tracking-tight">
                "They understood the product better than most of our own team by week two. The design system they built has held up through eighteen months of feature development without modification."
              </p>
              <footer className="mt-6">
                <p className="text-sm font-medium">Marcus Johansson</p>
                <p className="text-sm text-black/45">CTO, Tessera</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="border-t border-black/10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-black/40">New projects</p>
            <h2
              className="font-black leading-none tracking-tighter text-black"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              Start a project.
            </h2>
          </div>

          <div className="pb-2 text-right">
            <a
              href="mailto:hello@fieldwork.design"
              className="text-sm font-medium underline underline-offset-4 hover:opacity-60"
            >
              hello@fieldwork.design
            </a>
            <p className="mt-1 text-xs text-black/40">Currently booking Q3 2024</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-black/10 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <span className="text-xs text-black/30">© 2024 Fieldwork Studio GmbH, Berlin</span>
        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Are.na"].map((link) => (
            <a key={link} href="#" className="text-xs text-black/30 hover:text-black">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgencyLanding() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />
      <main className="pt-14">
        <Hero />
        <WorkGrid />
        <About />
        <Services />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
