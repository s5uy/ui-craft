# Pattern: Eyebrow Label

The small mono-font label that sits above every section heading, usually with a glowing accent dot. Non-negotiable — every section in every recipe gets one.

---

## JSX

```jsx
function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="dot" />
      {children}
    </div>
  );
}

// Usage:
<Eyebrow>v4.2 · Realtime previews for every branch</Eyebrow>
<Eyebrow>Features</Eyebrow>
<Eyebrow>How it works</Eyebrow>
<Eyebrow>Pricing</Eyebrow>
```

---

## CSS

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.eyebrow .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px color-mix(in oklab, var(--accent) 60%, transparent);
}
```

---

## Rules

- **Every section gets one.** No exceptions. The rhythm across the page depends on it.
- **Content length: 1–6 words max.** Long eyebrows read as sub-headings and dilute the pattern.
- **Allowed content types:**
  - Simple category: `Features`, `Pricing`, `FAQ`
  - Version + tagline: `v4.2 · Realtime previews`
  - Section + context: `Changelog · Week 42`
- **Keep the dot.** It is the single decorative accent on the page and it anchors the accent color. Removing it breaks the visual system.
- **Mono font, never body font.** If your stack doesn't have a mono font configured, fix the stack before writing the eyebrow.
