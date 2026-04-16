# Sidebar Patterns

---

## Mental Model

The sidebar is a persistent navigation layer for multi-section applications. It communicates the full scope of what the application can do and orients the user within that scope. A well-designed sidebar is scannable at a glance, not read top-to-bottom. Its active state must be immediately obvious without study.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| App brand/logo | Identity, home/root link | Yes |
| Section groups | Organize links by domain | Situational (only if 7+ links) |
| Nav links | Section wayfinding | Yes |
| Active indicator | "You are here" | Yes |
| Nested links | Sub-section navigation | Situational |
| Bottom actions | User menu, help, settings | Situational |
| Collapse trigger | Width toggle on desktop | Situational |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Default link | Not active | `text-muted-foreground`, no background |
| Hover | Mouse enter | `bg-muted/50`, `text-foreground` |
| Active | Current route match | `bg-muted`, `text-foreground`, `font-medium` |
| Active (accent) | Current route + accent needed | `bg-accent/10`, `text-accent`, `font-medium` |
| Focus | Keyboard | Visible focus ring |
| Group expanded | Trigger click | Nested links visible below parent |
| Collapsed sidebar | Toggle | Shows icons only, labels hidden |

---

## Implementation

### Standard app sidebar

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Team", href: "/team", icon: Users },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
]

const secondaryNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
]

interface SidebarProps {
  user: {
    name: string
    email: string
  }
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
        isActive
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {item.label}
    </Link>
  )
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-56 flex-col border-r border-border bg-background">
      {/* Brand */}
      <div className="flex h-12 items-center border-b border-border px-4">
        <Link href="/dashboard" className="text-sm font-semibold text-foreground">
          Acme
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-0.5">
          {primaryNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>

      {/* Secondary nav + user */}
      <div className="border-t border-border p-2">
        <div className="space-y-0.5 mb-2">
          {secondaryNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        {/* User row */}
        <div className="flex items-center gap-2.5 rounded-md px-2.5 py-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
```

### Sidebar with section groups

```tsx
interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Projects", href: "/projects", icon: FolderOpen },
    ],
  },
  {
    label: "Manage",
    items: [
      { label: "Team", href: "/team", icon: Users },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
]

// In the nav section:
<nav className="flex-1 overflow-y-auto p-2 space-y-4">
  {navGroups.map((group) => (
    <div key={group.label}>
      <p className="mb-1 px-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
        {group.label}
      </p>
      <div className="space-y-0.5">
        {group.items.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </div>
    </div>
  ))}
</nav>
```

---

## Integration Notes

**With shadcn:** The `Sheet` component handles mobile sidebar overlays. Use it for `< md` viewports. On desktop, the sidebar is a fixed-width aside.

**With Next.js:** Wrap the sidebar in a layout component that persists across route changes. Use `usePathname()` at the sidebar level rather than passing active state as props.

**Layout pattern:**
```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={currentUser} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
```

**TypeScript interface:**
```tsx
interface SidebarProps {
  user: {
    name: string
    email: string
    avatarUrl?: string
  }
  className?: string
}
```

---

## Quality Benchmarks

A production-grade sidebar must:

- Show the active state unambiguously without requiring color to be the sole signal (weight + background together)
- Handle truncated long labels gracefully (`truncate` on link text)
- Remain vertically scrollable if links exceed viewport height (`overflow-y-auto` on nav)
- Have a minimum link height of 36px for comfortable clicking (`py-2` on text-sm)
- Work keyboard-only with visible focus states throughout
- Not show more than 10–12 links before grouping or collapsing

---

## Anti-Patterns

**Accent color on all icons:** Making every nav icon the accent color creates visual noise. Icons should be `text-muted-foreground` by default; only the active item's icon should use foreground or accent.

**Heavy background tints:** Using `bg-accent/20` or heavier for the active state makes the sidebar feel cluttered. `bg-muted` is sufficient — the weight + background combination reads clearly without color saturation.

**Section label overuse:** Adding section labels (`WORKSPACE`, `MANAGE`) to fewer than 6 links creates needless visual complexity. Use section groups only when there are 7+ links with genuine categorical separation.

**Dividers between every link:** Every link having a border-bottom creates a visually dense, grid-like sidebar that is harder to scan. Use spacing and grouping, not borders.

**Logo at 24px+ height in sidebar header:** The sidebar brand should be compact — matching the header height. Oversized logos compete with the navigation content.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark background `#0F0F0F`, `w-48` tight width, monospace labels, icons `text-gray-500` default, `text-green-400` active, no background tint — active uses text color only + left border |
| Spatial Immersive | `w-64`, generous `py-2.5` links, active state through text weight only — no background tints that disrupt the dark atmospheric surface |
| Editorial Brutalism | `w-56`, uppercase tracking labels, `rounded-none`, active state full inversion `bg-foreground text-background` |
| Enterprise Neutral | `w-56` standard, `bg-gray-50` sidebar background, `text-blue-600` active link, `bg-blue-50` active background — the most conventional form |
| Editorial Warm | `w-52`, warm surface background `#F5F3EF`, `text-stone-900` active, subtle warm `bg-stone-100` active tint |
