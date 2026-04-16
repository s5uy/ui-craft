"use client"

import { useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  /** Proximity radius in px — how close cursor must be to activate pull */
  radius?: number
  /** Max translation in px — how far the button content can move */
  strength?: number
}

export function MagneticButton({
  children,
  className,
  onClick,
  disabled = false,
  type = "button",
  radius = 60,
  strength = 20,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 400, damping: 25 })
  const y = useSpring(0, { stiffness: 400, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    if (distance < radius) {
      const pull = (radius - distance) / radius
      x.set(distanceX * pull * (strength / radius))
      y.set(distanceY * pull * (strength / radius))
    }
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
        "transition-colors hover:bg-primary/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-[0.98]",
        className
      )}
    >
      <motion.span
        className="relative flex items-center gap-2"
        style={{ x, y }}
      >
        {children}
      </motion.span>
    </button>
  )
}

// --- Demo usage ---

import { ArrowRight } from "lucide-react"

export function MagneticButtonDemo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 bg-background p-12">
      {/* Primary action */}
      <MagneticButton>
        Get started
        <ArrowRight className="h-4 w-4" />
      </MagneticButton>

      {/* Larger, more pronounced pull */}
      <MagneticButton radius={80} strength={28} className="h-12 px-8 text-base">
        Start free trial
        <ArrowRight className="h-4 w-4" />
      </MagneticButton>

      {/* Disabled state — no magnetic effect */}
      <MagneticButton disabled>
        Unavailable
      </MagneticButton>
    </div>
  )
}
