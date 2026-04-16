# Command Palette Patterns

---

## Mental Model

The command palette is a keyboard-first, global search and action surface. It allows power users to navigate anywhere, execute any action, and find any content without leaving the keyboard. It is not a search box styled to look impressive — it is a functional layer that must respond instantly, organize results intelligently, and communicate exactly what each result does.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Overlay backdrop | Visual separation from page, closes on click-outside | Yes |
| Dialog container | Focused surface containing the palette | Yes |
| Search input | Query entry, autofocuses on open | Yes |
| Result groups | Organize results by category | Yes (when results span multiple types) |
| Group label | Category header | Yes (when groups present) |
| Result item | Individual action/destination | Yes |
| Result icon | Visual type signal | Situational |
| Keyboard shortcut hint | Shows available keyboard actions | Situational |
| Empty state | No results message | Yes |
| Loading state | Results being fetched | Yes (if async) |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Closed | Default | Not in DOM or `display: none` |
| Open | Keyboard shortcut (⌘K / Ctrl+K) or trigger | Overlay fades in, dialog slides up slightly |
| Result hovered | Mouse enter | `bg-muted` highlight on item |
| Result selected | Keyboard ↑/↓ | `bg-accent/10 text-accent` or `bg-muted` highlight |
| Executing | Enter on result | Item briefly highlights, dialog closes |
| Empty | No query match | Clear "No results" message, no decorative empty state |
| Loading | Async search in progress | Subtle loading indicator — not a spinner, a pulsing bar or dimmed results |

---

## Implementation

### Core command palette

```tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Search, ArrowRight, LayoutDashboard, FolderOpen, Users, Settings } from "lucide-react"

interface CommandItem {
  id: string
  label: string
  description?: string
  group: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const allItems: CommandItem[] = [
    {
      id: "dashboard",
      label: "Go to Dashboard",
      group: "Navigation",
      icon: LayoutDashboard,
      action: () => { router.push("/dashboard"); onClose() },
      keywords: ["home", "overview"],
    },
    {
      id: "projects",
      label: "Go to Projects",
      group: "Navigation",
      icon: FolderOpen,
      action: () => { router.push("/projects"); onClose() },
    },
    {
      id: "team",
      label: "Manage Team",
      group: "Navigation",
      icon: Users,
      action: () => { router.push("/team"); onClose() },
    },
    {
      id: "settings",
      label: "Open Settings",
      group: "Settings",
      icon: Settings,
      action: () => { router.push("/settings"); onClose() },
    },
  ]

  const filtered = query.trim() === ""
    ? allItems
    : allItems.filter((item) => {
        const q = query.toLowerCase()
        return (
          item.label.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.keywords?.some((k) => k.toLowerCase().includes(q))
        )
      })

  // Group filtered results
  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  const flatResults = Object.values(groups).flat()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "Escape") { onClose(); return }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === "Enter" && flatResults[selectedIndex]) {
        flatResults[selectedIndex].action()
      }
    },
    [open, flatResults, selectedIndex, onClose]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  if (!open) return null

  let globalIndex = 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative w-full max-w-lg rounded-xl border border-border bg-background shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            placeholder="Search commands..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            Object.entries(groups).map(([groupLabel, items]) => (
              <div key={groupLabel}>
                <p className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                  {groupLabel}
                </p>
                {items.map((item) => {
                  const index = globalIndex++
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                        index === selectedIndex
                          ? "bg-muted text-foreground"
                          : "text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1">{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border px-1 font-mono">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border px-1 font-mono">↵</kbd> select
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Opening the palette (global trigger)

```tsx
// In a layout or root component
"use client"

import { useEffect, useState } from "react"
import { CommandPalette } from "@/components/command-palette"

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

---

## Integration Notes

**With shadcn:** The `cmdk` package (which shadcn's Command primitive wraps) provides excellent keyboard navigation logic. Use `Command`, `CommandInput`, `CommandGroup`, `CommandItem` from shadcn if available in the project — they handle ARIA roles and keyboard navigation correctly.

**With Next.js:** The router action (`router.push`) must happen after the palette closes to avoid state conflicts. Always call `onClose()` before or alongside the navigation action.

**TypeScript interface:**
```tsx
interface CommandItem {
  id: string
  label: string
  description?: string
  group: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  items?: CommandItem[]  // allow external override
}
```

---

## Quality Benchmarks

A production-grade command palette must:

- Autofocus the search input when opened
- Respond to keyboard navigation (↑↓ for selection, Enter to execute, Escape to close) without any mouse interaction
- Close when clicking outside the dialog
- Reset query and selection index when re-opened
- Prevent body scroll when open
- Show a clear empty state when no results match
- Handle groups correctly — keyboard selection must track across group boundaries continuously

---

## Anti-Patterns

**The glowing search overlay:** A spotlight glow, gradient ring, or blur halo around the search input. This is a Class C demo pattern. The command palette earns attention through functionality, not light effects.

**No keyboard navigation:** Generating a command palette that requires mouse interaction is a fundamental failure. If `ArrowDown`, `ArrowUp`, and `Enter` don't work, it is not a command palette.

**Flat result list (no grouping):** When results span multiple types (navigation, actions, settings, content), grouping is required. An undifferentiated flat list is hard to scan.

**Sluggish animation:** The palette must appear in under 150ms. Users who trigger it with ⌘K expect instant response. Delayed animations — even 300ms — feel broken in this context.

**Including decorative items:** Every item in the palette must do something real. "✨ Make it magical" buttons or placeholder items degrade the tool's authority.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark overlay `bg-black/70`, dialog `bg-[#111111]`, border `border-white/10`, monospace input, green accent selected state |
| Spatial Immersive | `backdrop-blur-md` on overlay, dialog with large radius `rounded-2xl`, generous padding, minimal keyboard hint |
| Editorial Brutalism | No border-radius, black border, full-contrast selected state (inversion), no backdrop blur — hard overlay |
| Enterprise Neutral | Standard implementation as shown; blue-600 selected state; gray-50 dialog background |
| Editorial Warm | Warm off-white dialog `#FAF9F6`, warm border, stone-foreground text, warm muted backgrounds |
