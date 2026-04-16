# Toast Patterns

---

## Mental Model

A toast notification is a transient message that communicates the result of an action the user just took. It exists to close the feedback loop: "that thing you did — here is whether it worked." It is not a general-purpose notification system, not a marketing channel, and not a persistent alert.

Toasts are temporary by design. If the information must persist, use a different pattern (inline error, banner, or notification center).

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Icon | Semantic type signal (success, error, info, warning) | Recommended |
| Title | Brief outcome statement | Yes |
| Description | Optional clarifying detail | No |
| Dismiss button | Manual close | Yes (for non-auto-dismissing toasts) |
| Action link | Undo, view, or navigate to result | Situational |
| Stack position | Where toasts appear and stack | Yes (one consistent position) |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Entering | Toast triggered | Slides in from edge + fades in (150–250ms) |
| Active | Displaying | Full opacity, visible |
| Hover | Mouse over toast | Pause auto-dismiss timer |
| Active with progress | Auto-dismiss enabled | Optional thin progress bar at bottom |
| Exiting | Timer complete or dismissed | Slides out + fades (150–200ms) |

---

## Implementation

### Core toast (using Sonner)

Sonner is the standard for React toast systems — use it. Do not build a custom toast from scratch unless there is a specific technical requirement.

```tsx
// lib/toast.ts — thin wrapper for consistent defaults
import { toast as sonnerToast } from "sonner"

export const toast = {
  success: (title: string, description?: string) =>
    sonnerToast.success(title, { description }),

  error: (title: string, description?: string) =>
    sonnerToast.error(title, {
      description,
      duration: 6000,  // errors stay longer
    }),

  warning: (title: string, description?: string) =>
    sonnerToast.warning(title, { description }),

  info: (title: string, description?: string) =>
    sonnerToast(title, { description }),

  promise: <T>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) => sonnerToast.promise(promise, messages),
}
```

```tsx
// In root layout — configure Toaster once
import { Toaster } from "sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "bg-background border border-border shadow-md text-foreground text-sm",
              title: "font-medium text-foreground",
              description: "text-muted-foreground text-xs",
              actionButton: "text-xs font-medium",
              cancelButton: "text-xs text-muted-foreground",
              success: "border-emerald-200",
              error: "border-red-200",
              warning: "border-amber-200",
            },
          }}
        />
      </body>
    </html>
  )
}
```

```tsx
// Usage anywhere in the app
import { toast } from "@/lib/toast"

// After saving
const handleSave = async () => {
  try {
    await saveProject(data)
    toast.success("Project saved", "Your changes have been saved.")
  } catch (err) {
    toast.error("Save failed", "Unable to save your changes. Please try again.")
  }
}

// With undo action — using Sonner's action API
sonnerToast.success("Item deleted", {
  description: "The item has been removed.",
  action: {
    label: "Undo",
    onClick: () => restoreItem(itemId),
  },
})

// Promise pattern for async operations
toast.promise(deployProject(projectId), {
  loading: "Deploying...",
  success: "Deployment complete",
  error: "Deployment failed",
})
```

### Custom toast (when Sonner can't be used)

```tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const styles = {
  success: "text-emerald-600",
  error: "text-red-600",
  warning: "text-amber-600",
  info: "text-blue-600",
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const Icon = icons[toast.type]

  useEffect(() => {
    const duration = toast.type === "error" ? 6000 : 4000
    const timer = setTimeout(() => onDismiss(toast.id), duration)
    return () => clearTimeout(timer)
  }, [toast.id, toast.type, onDismiss])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex w-80 items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 shadow-md"
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", styles[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  )
}

export function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  )
}
```

---

## Integration Notes

**With shadcn:** If the project has `sonner` installed (shadcn recommends it), use the `Toaster` from shadcn's `sonner` integration and style it with the `toastOptions.classNames` API.

**Positioning:** Bottom-right is the standard for web applications. Bottom-center is acceptable for mobile-first products. Top-right is acceptable but competes with navigation. Top-center is used for transient system-level announcements. Pick one and use it consistently.

**Stacking:** Sonner handles stacking automatically. For custom implementations, limit to 3 visible toasts maximum — add new toasts to the stack, dismiss the oldest if the limit is exceeded.

---

## Quality Benchmarks

A production-grade toast system must:

- Use distinct semantic icons for each type (success/error/warning/info) — color alone is insufficient
- Auto-dismiss after a type-appropriate duration (success: 4s, error: 6s, warning: 5s, info: 4s)
- Pause the auto-dismiss timer on hover
- Provide a visible dismiss button
- Announce to screen readers via `role="status"` (info/success) or `role="alert"` (error/warning)
- Stack gracefully when multiple toasts appear
- Have enter/exit animations under 250ms

---

## Anti-Patterns

**Toast for non-action feedback:** Using a toast to announce "Welcome back!" on page load is misusing the pattern. Toasts are for action results — the user did something and this is the outcome.

**Error toast without detail:** `toast.error("Something went wrong")` gives the user no actionable information. Error toasts must say what went wrong and, if possible, what the user can do.

**Persistent toasts:** Auto-dismissing toasts that don't dismiss, or toasts with no dismiss button. If information must persist, use a banner or alert component.

**Animated entrance that takes over the screen:** A toast that slides in from the top with a 600ms animation while the page content shifts. Toast entrance animations should be subtle and fast — under 250ms, from the position where the toast will live.

**Colored backgrounds:** `bg-emerald-50` or `bg-red-50` toast backgrounds. The semantic type is communicated by the icon and text. The toast surface should be neutral (`bg-background`) with a subtle semantic border.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark surface `bg-[#1A1A1A]`, `border-white/10`, monospace font-mono title, semantic icon colors, tight compact padding |
| Spatial Immersive | `rounded-xl`, `bg-zinc-900`, subtle shadow, generous `px-5 py-4`, minimal — just icon + title |
| Editorial Brutalism | `rounded-none border-2 border-black`, `bg-white`, hard positioning, no animation (instant show/hide) |
| Enterprise Neutral | Standard implementation, `rounded-md`, conventional colors, `shadow-sm` |
| Editorial Warm | Warm background `bg-[#FAF9F6]`, warm border `#E6E2D8`, `rounded-md` |
