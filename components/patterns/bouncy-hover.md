# Pattern: Bouncy Hover Primitives

**Direction:** VP (primary)
**Role:** Spring-physics hover patterns that define VP's tactile feel. A reusable set of motion primitives.

---

## Primitives

### Bouncy Button
```tsx
"use client";
import { motion } from "framer-motion";

export function BouncyButton({
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Bouncy Card
```tsx
export function BouncyCard({
  children,
  className = "",
  tiltRotation = 0,
  ...props
}: React.ComponentProps<typeof motion.div> & { tiltRotation?: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02, rotate: tiltRotation }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### Bouncy Icon (wiggle on hover)
```tsx
export function WiggleIcon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ rotate: [-5, 5, -3, 3, 0] }}
      transition={{ duration: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

### Springy Link Arrow
```tsx
export function SpringyArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover="hover"
      className={`inline-flex items-center gap-1 font-semibold ${className}`}
    >
      {children}
      <motion.span
        variants={{
          hover: { x: 6, rotate: -8, scale: 1.2 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
        className="inline-block"
      >
        →
      </motion.span>
    </motion.a>
  );
}
```

### Pop-in Badge
```tsx
export function PopInBadge({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
```

### Confetti CTA
```tsx
"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function ConfettiCTA({
  children,
  className = "",
  colors = ["#f97316", "#ec4899", "#8b5cf6", "#22c55e"],
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    const btn = ref.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors,
        startVelocity: 30,
        gravity: 0.8,
      });
    }
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
```

---

## Usage patterns

```tsx
<BouncyButton className="px-6 py-3 bg-black text-white rounded-full font-semibold">
  Get started
</BouncyButton>

<BouncyCard className="rounded-3xl p-10 bg-gradient-to-br from-orange-400 to-pink-500" tiltRotation={-2}>
  <h3>Card content</h3>
</BouncyCard>

<SpringyArrowLink href="/features">
  See all features
</SpringyArrowLink>

<ConfettiCTA
  className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg"
  onClick={() => router.push("/signup")}
>
  Start free
</ConfettiCTA>
```

---

## VP tuning reference

| Primitive | Stiffness | Damping | Scale range |
|---|---|---|---|
| Button (hover) | 300 | 15 | 1.04 |
| Button (tap) | 300 | 15 | 0.94-0.96 |
| Card (hover) | 200 | 12 | 1.02 |
| Card (lift) | — | — | y: -6 |
| Icon wiggle | bezier | — | rotate cycle |
| Link arrow | 400 | 12 | x: 6 |
| Badge pop-in | 300 | 15 | 0.5 → 1 |

Adjust per component — VP is visibly bouncy, but not clown-bouncy.

---

## Accessibility

All bouncy primitives must honor `prefers-reduced-motion`:

```tsx
const shouldReduceMotion = useReducedMotion(); // from framer-motion

const hoverProps = shouldReduceMotion
  ? {}
  : { whileHover: { scale: 1.04, y: -2 }, whileTap: { scale: 0.94 } };

<motion.button {...hoverProps} />
```

## When NOT to use
- TM / DE / EL — each direction has its own motion feel
- Dense data tables or dashboards (distracting)
- Navigation items (bouncing nav is chaotic)
