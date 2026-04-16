"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Types ---

type ToastType = "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextValue {
  toast: (options: Omit<Toast, "id">) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
  dismiss: (id: string) => void
}

// --- Context ---

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

// --- Config ---

const MAX_TOASTS = 5
const DEFAULT_DURATION = 4000

const typeConfig: Record<
  ToastType,
  { icon: React.ReactNode; borderColor: string; iconColor: string }
> = {
  success: {
    icon: <CheckCircle className="h-4 w-4" />,
    borderColor: "border-l-emerald-500",
    iconColor: "text-emerald-500",
  },
  error: {
    icon: <XCircle className="h-4 w-4" />,
    borderColor: "border-l-red-500",
    iconColor: "text-red-500",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    borderColor: "border-l-amber-500",
    iconColor: "text-amber-500",
  },
  info: {
    icon: <Info className="h-4 w-4" />,
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-500",
  },
}

// --- Individual Toast Item ---

interface ToastItemProps {
  toast: Toast
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const remainingRef = useRef(toast.duration ?? DEFAULT_DURATION)
  const startTimeRef = useRef<number | null>(null)

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()
    timerRef.current = setTimeout(() => {
      onDismiss(toast.id)
    }, remainingRef.current)
  }, [toast.id, onDismiss])

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      if (startTimeRef.current) {
        remainingRef.current -= Date.now() - startTimeRef.current
      }
    }
  }, [])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [startTimer])

  const handleMouseEnter = () => {
    setIsPaused(true)
    pauseTimer()
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    startTimer()
  }

  const config = typeConfig[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex w-[360px] items-start gap-3 overflow-hidden rounded-lg border border-l-4 bg-background p-4 shadow-md",
        config.borderColor
      )}
    >
      {/* Icon */}
      <span className={cn("mt-0.5 shrink-0", config.iconColor)}>
        {config.icon}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{toast.description}</p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded-sm text-muted-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

// --- Toast Container ---

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// --- Provider ---

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((options: Omit<Toast, "id">) => {
    const id = crypto.randomUUID()
    setToasts((prev) => {
      const next = [...prev, { ...options, id }]
      return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next
    })
  }, [])

  const success = useCallback(
    (title: string, description?: string) => toast({ type: "success", title, description }),
    [toast]
  )
  const error = useCallback(
    (title: string, description?: string) => toast({ type: "error", title, description }),
    [toast]
  )
  const warning = useCallback(
    (title: string, description?: string) => toast({ type: "warning", title, description }),
    [toast]
  )
  const info = useCallback(
    (title: string, description?: string) => toast({ type: "info", title, description }),
    [toast]
  )

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

// --- Demo usage ---

export function ToastDemo() {
  const { success, error, warning, info, toast } = useToast()

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-8">
      <button
        onClick={() => success("Changes saved", "Your profile has been updated.")}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Success
      </button>

      <button
        onClick={() => error("Payment failed", "Check your card details and try again.")}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Error
      </button>

      <button
        onClick={() => warning("Session expiring", "You'll be logged out in 5 minutes.")}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Warning
      </button>

      <button
        onClick={() => info("Update available", "Version 2.4.0 is ready to install.")}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Info
      </button>

      <button
        onClick={() =>
          toast({
            type: "success",
            title: "File uploaded",
            description: "report-q4-2024.pdf has been processed.",
            action: { label: "View file", onClick: () => console.log("View file") },
          })
        }
        className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        With action
      </button>
    </div>
  )
}
