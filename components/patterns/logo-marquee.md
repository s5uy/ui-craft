# Pattern: Logo Marquee

Horizontal scrolling strip of customer/client names. Used directly under the hero for social proof. Fades at the edges via `mask-image`.

---

## JSX

```jsx
function LogoMarquee() {
  const brands = [
    'Nomad Labs', 'Northwind', 'Obsidian', 'Helios', 'Parallax', 'Quadrant',
    'Rally', 'Lumen', 'Stratus', 'Umbra', 'Veridian', 'Atlas',
  ];
  // duplicate for seamless loop
  const row = [...brands, ...brands];

  return (
    <div className="marquee" aria-label="Customers">
      <div className="marquee-track">
        {row.map((b, i) => (
          <span key={i} className="marquee-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 12a8 8 0 0116 0 8 8 0 01-16 0zm4-2h8" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
```

---

## CSS

```css
.marquee {
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 20px 0;
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
}
.marquee-track {
  display: flex; gap: 64px;
  width: max-content;
  animation: marq 40s linear infinite;
  align-items: center;
}
.marquee-item {
  font-family: var(--font-display);
  font-size: 20px; letter-spacing: -0.02em;
  color: var(--fg-muted);
  display: inline-flex; align-items: center; gap: 10px;
  white-space: nowrap;
}
@keyframes marq { to { transform: translateX(-50%); } }
```

---

## Rules

- **12 brands minimum** to feel full. Duplicate the array for seamless scroll.
- **Use plain SVG marks or wordmarks**, not raster logos. Raster customer logos on landing pages look like slop; hand-drawn marks read as intentional.
- **Fade at the edges.** The `mask-image` is the quality signal — without it, the marquee looks cheap.
- **Slow enough to read.** 40s full loop is the sweet spot; 20s reads as nervous, 80s reads as frozen.
- **Pause on hover** is nice but optional — only add if it doesn't break the infinite loop seamlessly.
