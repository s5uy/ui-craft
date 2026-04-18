# Pattern: Magnetic Button

**Direction:** DE (primary), VP (tuned variant)
**Role:** Button that gently follows the cursor within its hit area. Signature Design-Engineer detail that signals craft.

---

## Component (Framer Motion)

```tsx
"use client";
import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number; // 0-1, default 0.3
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      <motion.span
        style={{ x: useSpring(x, { stiffness: 150, damping: 15 }), y: useSpring(y, { stiffness: 150, damping: 15 }) }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
```

## Usage

```tsx
<MagneticButton
  className="px-6 py-3 bg-[var(--fg)] text-[var(--bg)] rounded-full font-medium"
  strength={0.25}
>
  Read case study →
</MagneticButton>
```

## VP variant (bouncier)

```tsx
// For Vibrant-Playful, use stronger spring and larger pull
const x = useSpring(0, { stiffness: 300, damping: 12 });
const y = useSpring(0, { stiffness: 300, damping: 12 });
// strength = 0.4 instead of 0.3
```

---

## Accessibility

The magnetic movement must not affect focus/click targets. The button's *actual* bounding box (for click and keyboard) is the static element — only the visual is offset.

For `prefers-reduced-motion`:
```tsx
const prefersReducedMotion = typeof window !== "undefined"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  return <button className={className} onClick={onClick}>{children}</button>;
}
```

---

## When to use
- Primary CTA on DE hero
- Footer "Get in touch" button in DE portfolios
- VP feature card hover (tuned stronger)

## When NOT to use
- More than 2 magnetic buttons visible at once — chaotic
- On dense navigation items — distracting
- On touch devices — feature-detect `hover: hover`
- TM sites — breaks restraint
- EL sites — too playful for EL
