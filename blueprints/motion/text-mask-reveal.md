# Blueprint: Text Mask Reveal

Text slides in from behind a clipping plane — like a curtain lifting. The text exists in full before you see it; the clip-path reveals it. Premium, restraint-forward, works in every direction.

**Seen on:** Linear, Vercel, Resend, Stripe

---

## When to use
- Hero headline (H1) on page load
- Section headline that signals a transition to new content
- Any moment where you want "arrival" to feel intentional, not just an appear

## When NOT to use
- Body paragraph text — only headlines and large display type
- Inside dense UI (dashboards, product UI) — this is a marketing/hero pattern
- If the site already has a letter-stagger hero — don't double up; pick one

---

## Variants

### Variant A — Line-by-line reveal (recommended)

Each line of the headline reveals independently, staggered. Feels like a typesetting machine.

```tsx
'use client';
import { motion } from 'framer-motion';

interface TextMaskRevealProps {
  lines: string[];
  delay?: number; // seconds before sequence starts
  className?: string;
}

export function TextMaskReveal({ lines, delay = 0, className }: TextMaskRevealProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => <div key={i}>{line}</div>)}
      </div>
    );
  }

  return (
    <div className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden" aria-hidden>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.1,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
```

**Usage:**
```tsx
<TextMaskReveal
  lines={["We make software", "that thinks."]}
  delay={0.2}
  className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
/>
```

**How it works:** Each line wraps in an `overflow-hidden` container. The text starts at `y: 110%` — fully below the container's clipping edge. It slides up into view. The container clips the tail. The result: text appears to emerge from beneath a line.

---

### Variant B — Word-by-word reveal (EL editorial)

Slower. Each word reveals with a blur-and-rise. Feels like the site is thinking.

```tsx
export function EditorialReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <p className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '120%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
```

---

### Variant C — Clip-path wipe (horizontal, DE/TM)

The text is already in place; a clip-path opens from left to right revealing it. More graphic than the vertical slide.

```tsx
export function WipeReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Performance notes

- `y: '110%'` and `clipPath` are transform/paint-free on compositor. Safe.
- `overflow-hidden` on the wrapper is required — without it the text slides into view from below visibly.
- `aria-label` on the container + `aria-hidden` on individual word/line spans ensures screen readers see the full text once, not letter by letter.

---

## Direction fit

| Direction | Recommended variant | Duration adjustment |
|-----------|-------------------|-------------------|
| TM | A (line-by-line) | 0.6s, minimal stagger |
| DE | A or C (wipe) | 0.7s, sharp ease |
| EL | B (word-by-word) | 1.0-1.2s, slow |
| VP | A with spring | `type: 'spring', stiffness: 180, damping: 14` |
