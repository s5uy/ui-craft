# Pattern: Cursor Spotlight

**Direction:** DE (primary), TM (secondary — subtle variant)
**Role:** Radial light that follows the cursor on feature cards. Signature Design-Engineer craft signal.

---

## Component

```tsx
"use client";
import { useRef, useCallback } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  size?: number;      // spotlight radius in px
  intensity?: number; // 0-1
}

export function SpotlightCard({
  children,
  className = "",
  size = 400,
  intensity = 0.08,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`spotlight-card group relative overflow-hidden border border-[var(--border-hairline)] rounded-xl p-8 ${className}`}
      style={{
        "--spot-size": `${size}px`,
        "--spot-intensity": intensity,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
```

## CSS

```css
.spotlight-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: radial-gradient(
    var(--spot-size) circle at var(--mx, 50%) var(--my, 50%),
    oklch(0.98 0 0 / var(--spot-intensity)),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
}

.spotlight-card:hover::before {
  opacity: 1;
}

/* Dark mode override — reduce intensity */
@media (prefers-color-scheme: dark) {
  .spotlight-card::before {
    background: radial-gradient(
      var(--spot-size) circle at var(--mx, 50%) var(--my, 50%),
      oklch(0.98 0 0 / calc(var(--spot-intensity) * 0.5)),
      transparent 40%
    );
  }
}
```

## Group usage (whole card-row spotlight)

For a row of 3 cards that share ONE cursor-following light (more advanced DE pattern):

```tsx
function SpotlightRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className="spotlight-row grid grid-cols-3 gap-4">
      {children}
    </div>
  );
}
```

With CSS:
```css
.spotlight-row {
  position: relative;
  isolation: isolate;
}
.spotlight-row::before {
  content: "";
  position: absolute; inset: 0;
  pointer-events: none; z-index: -1;
  background: radial-gradient(600px circle at var(--mx) var(--my), oklch(0.98 0 0 / 0.04), transparent 50%);
}
```

---

## When to use
- DE feature sections (numbered indexed rows OR card grids)
- DE portfolio case study tiles
- TM: subtle variant (intensity 0.04) on token-display cards only — don't overuse

## When NOT to use
- Mobile (add `@media (hover: hover)` guard)
- VP sites — too subtle for VP vocabulary
- EL sites — EL doesn't do cursor effects
