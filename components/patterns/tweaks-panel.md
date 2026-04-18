# Pattern: Tweaks Panel

Floating bottom-right panel that live-switches `[data-accent]`, `[data-radius]`, `[data-density]` on the document. Costs nothing because the tokens already exist. Delivers an enormous quality signal — it tells the viewer the whole site is a design system, not a hardcoded layout.

---

## JSX

```jsx
function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState('mint');
  const [radius, setRadius] = useState('medium');
  const [density, setDensity] = useState('comfortable');

  useEffect(() => {
    document.body.dataset.accent = accent;
    document.body.dataset.radius = radius;
    document.body.dataset.density = density;
  }, [accent, radius, density]);

  const accents = ['mint', 'violet', 'amber', 'sky', 'rose'];
  const radii   = ['none', 'small', 'medium', 'large'];
  const denses  = ['compact', 'comfortable', 'spacious'];

  return (
    <div className={`tweaks ${open ? 'open' : ''}`}>
      <button className="tweaks-toggle" onClick={() => setOpen(o => !o)} aria-label="Theme tweaks">
        <span className="tweaks-dot" />
      </button>
      {open && (
        <div className="tweaks-panel">
          <div className="tweaks-row">
            <span className="tweaks-label">Accent</span>
            <div className="tweaks-options">
              {accents.map(a => (
                <button
                  key={a}
                  className={`accent-chip ${accent === a ? 'on' : ''}`}
                  data-accent-chip={a}
                  onClick={() => setAccent(a)}
                  aria-label={a}
                />
              ))}
            </div>
          </div>
          <div className="tweaks-row">
            <span className="tweaks-label">Radius</span>
            <div className="tweaks-options">
              {radii.map(r => (
                <button key={r} className={`seg ${radius === r ? 'on' : ''}`} onClick={() => setRadius(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="tweaks-row">
            <span className="tweaks-label">Density</span>
            <div className="tweaks-options">
              {denses.map(d => (
                <button key={d} className={`seg ${density === d ? 'on' : ''}`} onClick={() => setDensity(d)}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## CSS

```css
.tweaks {
  position: fixed; right: 20px; bottom: 20px;
  z-index: 80;
}
.tweaks-toggle {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--bg-elev);
  border: 1px solid var(--line-strong);
  display: grid; place-items: center; cursor: pointer;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.6);
}
.tweaks-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}
.tweaks-panel {
  position: absolute; right: 0; bottom: 54px;
  width: 260px; padding: 14px;
  background: var(--bg-elev);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.6);
  display: flex; flex-direction: column; gap: 14px;
}
.tweaks-row { display: flex; flex-direction: column; gap: 8px; }
.tweaks-label {
  font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--fg-muted);
}
.tweaks-options { display: flex; gap: 6px; flex-wrap: wrap; }

.accent-chip {
  width: 22px; height: 22px; border-radius: 50%;
  border: 2px solid transparent;
  background: transparent; cursor: pointer;
}
.accent-chip[data-accent-chip="mint"]   { background: oklch(0.88 0.14 155); }
.accent-chip[data-accent-chip="violet"] { background: oklch(0.78 0.18 295); }
.accent-chip[data-accent-chip="amber"]  { background: oklch(0.84 0.16 75);  }
.accent-chip[data-accent-chip="sky"]    { background: oklch(0.82 0.13 230); }
.accent-chip[data-accent-chip="rose"]   { background: oklch(0.78 0.16 15);  }
.accent-chip.on { border-color: var(--fg); }

.seg {
  padding: 4px 10px; font-size: 11.5px; font-family: var(--font-mono);
  border: 1px solid var(--line); border-radius: var(--radius-sm);
  color: var(--fg-muted); background: transparent; cursor: pointer;
}
.seg.on { background: var(--accent-soft); color: var(--fg); border-color: color-mix(in oklab, var(--accent) 40%, var(--line-strong)); }
```

---

## Rules

- **Only ship this if the token system supports it.** All three variables must already cascade. See `core/token-system.md`.
- **Default states: `accent=mint`, `radius=medium`, `density=comfortable`.**
- **Do not hide it on mobile.** It's a quality signal — let people play with it on any device.
- **Do not persist to localStorage by default.** The panel is a preview tool. Persist only if the product is a configurator.
