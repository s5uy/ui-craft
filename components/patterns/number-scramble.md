# Pattern: Number Scramble

**Direction:** DE (primary), TM (variant — cleaner count-up)
**Role:** Metric that scrambles random digits before settling on the target. Signature DE craft move.

---

## Component

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

interface ScrambleNumberProps {
  value: number;
  duration?: number;    // total animation ms
  format?: (n: number) => string;
  className?: string;
  threshold?: number;   // intersection observer threshold
}

export function ScrambleNumber({
  value,
  duration = 1200,
  format = (n) => n.toLocaleString(),
  className = "",
  threshold = 0.4,
}: ScrambleNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(format(value));
      setPlayed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        setPlayed(true);

        const start = performance.now();
        const scrambleDur = duration * 0.65;
        const settleDur = duration * 0.35;

        const tick = (now: number) => {
          const elapsed = now - start;

          if (elapsed < scrambleDur) {
            // Scramble phase — random digits, right length
            const magnitude = Math.pow(10, String(value).length);
            const rand = Math.floor(Math.random() * magnitude);
            setDisplay(format(rand));
            requestAnimationFrame(tick);
          } else if (elapsed < duration) {
            // Settle phase — ease toward target
            const t = (elapsed - scrambleDur) / settleDur;
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(format(Math.floor(eased * value)));
            requestAnimationFrame(tick);
          } else {
            setDisplay(format(value));
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, played, format, threshold]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  );
}
```

## Usage

```tsx
<div className="grid grid-cols-3 gap-8">
  <div>
    <ScrambleNumber value={74000000} className="text-6xl font-medium" />
    <div className="text-xs uppercase tracking-[0.2em] font-mono text-muted mt-2">
      Users reached
    </div>
  </div>
  <div>
    <ScrambleNumber
      value={142}
      format={(n) => `${n}ms`}
      className="text-6xl font-medium"
    />
    <div className="text-xs uppercase tracking-[0.2em] font-mono text-muted mt-2">
      P95 latency
    </div>
  </div>
  <div>
    <ScrambleNumber
      value={99.97}
      format={(n) => `${n.toFixed(2)}%`}
      className="text-6xl font-medium"
    />
    <div className="text-xs uppercase tracking-[0.2em] font-mono text-muted mt-2">
      Uptime
    </div>
  </div>
</div>
```

---

## TM variant (clean count-up, no scramble)

For TM restraint, skip the scramble phase — just a smooth count-up:

```tsx
// Replace the tick function with:
const tick = (now: number) => {
  const t = Math.min((now - start) / duration, 1);
  const eased = 1 - Math.pow(1 - t, 3);
  setDisplay(format(Math.floor(eased * value)));
  if (t < 1) requestAnimationFrame(tick);
};
```

---

## Accessibility
- Always use `tabular-nums` so digit width stays fixed — prevents layout shift
- Reduced-motion users get the final value immediately
- Consider `aria-live="off"` — the animation is visual only, screen readers should get final value

---

## When to use
- DE portfolio stats ("74M users reached")
- DE agency site metrics
- TM: customer counts, revenue, ARR, users in a dedicated metrics section

## When NOT to use
- Prices (jarring — prices should be static and authoritative)
- Dates or times
- More than 3-4 numbers visible at once (attention tax)
