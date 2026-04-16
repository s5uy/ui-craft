# Navbar Patterns

---

## Mental Model

The navbar is a persistent wayfinding layer that communicates: where you are, where you can go, and what the most important global action is. It should take up as little visual weight as possible while remaining fully functional. It is not a branding surface.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Logo / wordmark | Brand identity, home link | Yes |
| Primary nav links | Top-level section wayfinding | Yes (unless single-page) |
| Active state indicator | "You are here" signal | Yes |
| Primary CTA | Global conversion action | Situational |
| Secondary actions | Search, notifications, user menu | Situational |
| Mobile menu trigger | Opens navigation on small screens | Yes (if links present) |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Default | Page load | Links at secondary text weight/color |
| Link hover | Mouse enter | Subtle background or text color shift toward primary |
| Active link | Current route matches link href | Background tint + text weight increase, accent color text |
| Focus | Keyboard Tab | Visible focus ring on each interactive element |
| Mobile menu open | Hamburger trigger | Full-width dropdown or slide-in panel |
| Scrolled | Window scrollY > threshold | Optional: add border-bottom, slightly reduce padding |

---

## Implementation

### Standard top navbar (light mode)

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="text-sm tracking-tight">Acme</span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors md:block"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
```

### App navbar (authenticated, with user menu)

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavbarProps {
  user: {
    name: string
    email: string
    avatarUrl?: string
  }
}

const appLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Settings", href: "/settings" },
]

export function AppNavbar({ user }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex h-12 items-center gap-6 px-6">
        <Link href="/dashboard" className="text-sm font-semibold text-foreground">
          Acme
        </Link>

        <nav className="flex flex-1 items-center gap-0.5">
          {appLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* User menu trigger */}
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
          {user.name.charAt(0).toUpperCase()}
        </button>
      </div>
    </header>
  )
}
```

---

## Integration Notes

**With shadcn:** Use `NavigationMenu` for mega-menus or complex dropdown nav structures. For simple link lists, build directly — the NavigationMenu primitive is heavier than needed.

**With Next.js:** Always use `next/link` for internal links. Use `usePathname()` from `next/navigation` for active state detection. Match on `pathname.startsWith(link.href + "/")` to correctly activate parent routes.

**With Framer Motion:** Navbar itself should not animate on scroll — the border-bottom appearance on scroll can use a CSS transition (`transition-all duration-200`) rather than Framer Motion.

**TypeScript interface:**
```tsx
interface NavLink {
  label: string
  href: string
  external?: boolean
}

interface NavbarProps {
  links?: NavLink[]
  cta?: {
    label: string
    href: string
  }
}
```

---

## Quality Benchmarks

A production-grade navbar must:

- Have a visible active state that unambiguously shows current location
- Have a focus ring on every interactive element via `:focus-visible`
- Work keyboard-only: Tab through all links and CTAs in order
- Have a minimum touch target of 44×44px on mobile (pad links generously)
- Remain legible at all viewport widths without overflow or wrapping issues
- Not obscure page content at narrow widths (mobile menu must overlay, not push)

---

## Anti-Patterns

**The floating glassmorphism pill:** A blur-background rounded pill navbar floating in the middle of the page. Looks like a portfolio demo, not a product. Use a full-width border-bottom navbar.

**Accent color on every nav link:** Making all nav links the accent color degrades the signal value of the active state. Links should be muted by default; only the active link earns the accent treatment.

**Logo oversizing:** Logos larger than 24–28px height waste the navbar's vertical space budget and compete with the content below. Keep it proportionate.

**Underline active state:** Underline-based active states are weak — they sit at the bottom of the text and are easy to miss. Background tints or left-border indicators are stronger.

**Animating every nav item on hover:** Per-item entrance animations or scale effects on hover add visual noise. Transitions for color/background are sufficient.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | `h-10` or `h-11`, tight padding, monospace logo, no backdrop blur — solid background `#0F0F0F`, sharp border-bottom `border-white/10` |
| Spatial Immersive | `h-16`, generous horizontal padding, backdrop blur on scroll only, minimal active state (weight change, no background tint) |
| Editorial Brutalism | Full-width, no border-radius on items, uppercase tracking on links, active state via border-bottom or full inversion |
| Enterprise Neutral | `h-12`, gray-100 background in app context, blue-600 active accent, tight link spacing |
| Editorial Warm | `h-14`, warm off-white background, subtle warm-tinted border-bottom, active link uses warm dark text + slight background |
