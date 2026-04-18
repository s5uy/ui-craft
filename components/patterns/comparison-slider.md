# Pattern: Comparison Slider (before / after)

Two stacked UI mocks with a draggable vertical handle. The "after" layer is clipped with `clip-path` driven by a CSS variable — no React DOM gymnastics.

---

## JSX

```jsx
function ComparisonSlider() {
  const [split, setSplit] = useState(50);
  const ref = useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSplit(pct);
  };

  return (
    <div
      className="compare"
      ref={ref}
      style={{ '--split': `${split}%` }}
      onPointerMove={(e) => e.buttons === 1 && onMove(e)}
    >
      <div className="layer before">
        <span className="label l">Before</span>
        <div className="ui-mock">
          <div className="bar w70" /><div className="bar w40" />
          <div className="row">
            <div className="card-mock"><div className="bar w90" /><div className="bar w55" /></div>
            <div className="card-mock"><div className="bar w90" /><div className="bar w30" /></div>
          </div>
        </div>
      </div>
      <div className="layer after">
        <span className="label r">After</span>
        <div className="ui-mock after-style">
          <div className="bar w70" /><div className="bar w40" />
          <div className="row">
            <div className="card-mock"><div className="bar w90" /><div className="bar w55" /></div>
            <div className="card-mock"><div className="bar w90" /><div className="bar w30" /></div>
          </div>
          <span className="glint">+34% conversion</span>
        </div>
      </div>
      <div
        className="handle"
        onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
        onPointerMove={(e) => e.buttons === 1 && onMove(e)}
      >
        <span className="grab">⟷</span>
      </div>
    </div>
  );
}
```

---

## CSS

```css
.compare {
  position: relative; aspect-ratio: 16/10;
  border: 1px solid var(--line-strong); border-radius: var(--radius-lg);
  overflow: hidden; background: #0a0d12; user-select: none;
  touch-action: none;
}
.compare .layer {
  position: absolute; inset: 0; padding: 32px;
  display: flex; flex-direction: column; gap: 12px;
}
.compare .layer.before { background: #0d1117; }
.compare .layer.after {
  background: linear-gradient(180deg, #0b1018, #0a0e15);
  clip-path: inset(0 0 0 var(--split, 50%));
}
.compare .handle {
  position: absolute; top: 0; bottom: 0; width: 2px;
  background: var(--accent); left: var(--split, 50%);
  transform: translateX(-50%);
  cursor: ew-resize;
}
.compare .handle .grab {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--accent); color: var(--accent-ink);
  display: grid; place-items: center;
  box-shadow: 0 0 0 4px rgba(0,0,0,0.3), 0 6px 24px -6px var(--accent);
  font-size: 12px;
}
.compare .label {
  position: absolute; top: 12px; padding: 3px 8px;
  font-family: var(--font-mono); font-size: 10.5px;
  letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid var(--line-strong);
  background: rgba(0,0,0,0.5); border-radius: 4px;
  color: var(--fg-dim);
}
.compare .label.l { left: 12px; }
.compare .label.r { right: 12px; }

.ui-mock { display: flex; flex-direction: column; gap: 10px; height: 100%; }
.ui-mock .bar { height: 10px; border-radius: 3px; background: rgba(255,255,255,0.04); }
.ui-mock .bar.w70 { width: 70%; }
.ui-mock .bar.w40 { width: 40%; }
.ui-mock .bar.w90 { width: 90%; }
.ui-mock .bar.w30 { width: 30%; }
.ui-mock .bar.w55 { width: 55%; }
.ui-mock .row { display: flex; gap: 10px; flex: 1; }
.ui-mock .card-mock {
  flex: 1; border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.03); padding: 10px;
  display: flex; flex-direction: column; gap: 6px;
}
.ui-mock.after-style .card-mock {
  border: 1px solid var(--line-strong);
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
}
.ui-mock.after-style .bar {
  background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
}
.ui-mock .glint {
  margin-top: auto; align-self: flex-start;
  padding: 4px 8px; background: var(--accent); color: var(--accent-ink);
  border-radius: 4px; font-family: var(--font-mono); font-size: 11px;
}
```

---

## Rules

- **Use real UI mocks on both sides, not images.** The mock approach is what makes this feel like it belongs in the product system.
- **Before/after labels are mono, tiny, in the corners.** Not giant display type.
- **A concrete gain (`+34% conversion`, `-60% cold start`) on the "after" side** sells the difference. Without it, the slider is decorative.
- **Do not animate the handle auto-sliding.** Let the user discover it. Interactivity is the point.
