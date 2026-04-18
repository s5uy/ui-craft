# Pattern: Letter-Stagger Hero

**Direction:** DE (primary)
**Role:** Hero headline that reveals letter-by-letter with staggered motion. Signature Design-Engineer reveal.

---

## Component

```tsx
"use client";
import { motion } from "framer-motion";

interface LetterStaggerProps {
  text: string;
  className?: string;
  delay?: number;
  letterDelay?: number;
  letterDuration?: number;
}

export function LetterStaggerHero({
  text,
  className = "",
  delay = 0,
  letterDelay = 0.025,
  letterDuration = 0.6,
}: LetterStaggerProps) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((char, ci) => {
            const idx = letterIndex++;
            return (
              <motion.span
                key={`${wi}-${ci}`}
                initial={{ opacity: 0, y: "0.5em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: letterDuration,
                  delay: delay + idx * letterDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}
```

## Usage

```tsx
<LetterStaggerHero
  text="Building interfaces for thought."
  className="text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.02em]"
/>
```

---

## Mixed-face version (DE signature)

Letter stagger with a serif italic accent word:

```tsx
export function MixedStaggerHero() {
  const segments = [
    { text: "Building", face: "sans", weight: 500 },
    { text: "interfaces", face: "serif-italic", weight: 400 },
    { text: "for thought.", face: "sans", weight: 500 },
  ];

  let idx = 0;
  return (
    <h1 className="text-[clamp(3rem,7vw,6.5rem)] leading-[1.0] tracking-[-0.02em]">
      {segments.map((seg, si) => {
        const chars = seg.text.split("");
        return (
          <span
            key={si}
            className={`inline-block mr-[0.25em] ${
              seg.face === "serif-italic"
                ? "font-serif italic font-normal"
                : "font-medium"
            }`}
          >
            {chars.map((char, ci) => {
              const i = idx++;
              return (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0, y: "0.5em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.025,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
```

---

## Accessibility

The `aria-label` on the `<h1>` holds the complete text. Letter spans have `aria-hidden`. Screen readers get the whole headline as one unit, not letter-by-letter.

For `prefers-reduced-motion`:
```tsx
// At top of component
const prefersReduced = typeof window !== "undefined"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced) {
  return <h1 className={className}>{text}</h1>;
}
```

---

## Tuning

- `letterDelay = 0.025` — default DE rhythm. Feels authored, not mechanical.
- Faster (0.015) → subtle, almost whole-word. Use for secondary headings.
- Slower (0.04) → dramatic, draws focus. Use sparingly.
- `letterDuration = 0.6` — matches DE's cinematic ease-out expo curve.

---

## When to use
- DE hero headline (primary use)
- DE portfolio name on about page
- Rarely: DE section intro on marquee sections

## When NOT to use
- On body text — always annoying
- Multiple times per page — the first one is the moment; repeats devalue it
- On TM / VP / EL — other directions have their own hero motion vocabularies
- On text that changes (e.g., React state updates) — re-runs the animation on every re-render
