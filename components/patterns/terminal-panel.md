# Pattern: Terminal Panel

Animated terminal with tab switching and typed-out scripts. The signature hero component for developer tools.

---

## JSX

```jsx
function Terminal() {
  const scripts = [
    [
      { t: 'cmd', text: 'foundry deploy --prod' },
      { t: 'dim', text: '→ building 4 services in parallel…' },
      { t: 'ok',  text: '✓ api-gateway         1.8s  edge/global' },
      { t: 'ok',  text: '✓ auth-worker         2.1s  edge/global' },
      { t: 'ok',  text: '✓ billing-svc         2.4s  region/us-east-1' },
      { t: 'ok',  text: '✓ webhooks            1.2s  edge/global' },
      { t: 'dim', text: '→ running smoke tests (47)…' },
      { t: 'out', text: '  47/47 passed · 99th p95 142ms' },
      { t: 'ok',  text: '◉ promoted to production · 00:06.3' },
      { t: 'out', text: '  https://foundry-next.app' },
    ],
    [
      { t: 'cmd', text: 'foundry logs --follow --svc billing-svc' },
      { t: 'dim', text: '◷ 14:02:11  POST /v1/invoices     201  18ms' },
      { t: 'dim', text: '◷ 14:02:11  GET  /v1/subs/u_9fa   200   6ms' },
      { t: 'warn',text: '◷ 14:02:12  retrying stripe.webhook (1/3)' },
      { t: 'ok',  text: '◷ 14:02:12  POST /v1/charges      200  94ms' },
      { t: 'dim', text: '◷ 14:02:13  GET  /health          200   2ms' },
      { t: 'ok',  text: '◷ 14:02:14  stripe.webhook ack    200  31ms' },
    ],
    [
      { t: 'cmd', text: 'foundry rollback --to v247 --yes' },
      { t: 'dim', text: '→ diffing traffic · current v251 → target v247' },
      { t: 'out', text: '  canary 5% → 25% → 50% → 100%' },
      { t: 'ok',  text: '✓ healthy at 5%  (errors: 0.00%)' },
      { t: 'ok',  text: '✓ healthy at 25% (errors: 0.01%)' },
      { t: 'ok',  text: '✓ healthy at 50% (errors: 0.00%)' },
      { t: 'ok',  text: '◉ fully shifted · 00:42.1' },
    ],
  ];
  const tabs = ['~/foundry-next', 'logs', 'rollback'];

  const [active, setActive] = useState(0);
  const [lines, setLines] = useState([]);
  const [charI, setCharI] = useState(0);
  const [lineI, setLineI] = useState(0);

  useEffect(() => { setLines([]); setLineI(0); setCharI(0); }, [active]);

  useEffect(() => {
    const script = scripts[active];
    if (lineI >= script.length) {
      const t = setTimeout(() => setActive(a => (a + 1) % scripts.length), 2400);
      return () => clearTimeout(t);
    }
    const line = script[lineI];
    if (charI < line.text.length) {
      const delay = line.t === 'cmd' ? 22 : 4;
      const t = setTimeout(() => setCharI(c => c + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines(ls => [...ls, line]);
      setLineI(i => i + 1);
      setCharI(0);
    }, line.t === 'cmd' ? 220 : 60);
    return () => clearTimeout(t);
  }, [charI, lineI, active]);

  const current = scripts[active][lineI];
  const currentText = current ? current.text.slice(0, charI) : '';

  return (
    <div className="terminal">
      <div className="term-head">
        <div className="term-dots"><span/><span/><span/></div>
        <div className="term-tabs">
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`term-tab ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', opacity: 0.6 }}>bash · zsh</span>
      </div>
      <div className="term-body">
        {lines.map((l, i) => (
          <div className="term-line" key={i}>
            {l.t === 'cmd' && <span className="prompt">$</span>}
            <span className={l.t}>{l.text}</span>
          </div>
        ))}
        {current && (
          <div className="term-line">
            {current.t === 'cmd' && <span className="prompt">$</span>}
            <span className={current.t}>{currentText}</span>
            <span className="caret"/>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## CSS

```css
.terminal {
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, #0e131a 0%, #0a0e14 100%);
  box-shadow: 0 30px 80px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02);
  overflow: hidden;
  position: relative;
}
.terminal::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(600px 200px at 50% -20%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%);
  pointer-events: none;
}
.term-head {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-bottom: 1px solid var(--line);
  font-family: var(--font-mono); font-size: 12px; color: var(--fg-muted);
}
.term-dots { display: flex; gap: 6px; }
.term-dots span { width: 10px; height: 10px; border-radius: 50%; background: #2a3140; }
.term-tabs { display: flex; gap: 2px; margin-left: 16px; }
.term-tab {
  padding: 4px 10px; font-size: 11.5px; font-family: var(--font-mono);
  border-radius: 4px; color: var(--fg-muted); cursor: pointer;
  background: none; border: 0;
}
.term-tab.active { background: rgba(255,255,255,0.06); color: var(--fg); }
.term-body {
  padding: 18px 20px; font-family: var(--font-mono); font-size: 13px;
  line-height: 1.7; min-height: 360px;
}
.term-line { display: flex; gap: 10px; align-items: baseline; }
.term-line .prompt { color: var(--fg-muted); user-select: none; }
.term-line .cmd  { color: var(--fg); }
.term-line .out  { color: var(--fg-dim); }
.term-line .ok   { color: var(--accent); }
.term-line .err  { color: var(--danger); }
.term-line .warn { color: var(--warn); }
.term-line .dim  { color: var(--fg-muted); }

.caret {
  display: inline-block; width: 8px; height: 15px;
  background: var(--accent); margin-left: 2px; vertical-align: middle;
  animation: caret 1s steps(1) infinite;
}
@keyframes caret { 50% { opacity: 0; } }
```

---

## Adaptation

- **Change the scripts** to match the product. Keep the line types: `cmd`, `dim`, `ok`, `err`, `warn`, `out`.
- **Keep 3 tabs** minimum. The tab switching is what makes the hero feel alive.
- **Do not shorten scripts below 6 lines.** A 3-line script feels demo-shallow.
- **Do not remove the blinking caret.** It is the one continuous motion in the hero and it anchors the eye.
- **Do not add colored neon glow** beyond the single radial `::before` already present.

## Common failure modes

- ❌ A static pre-block styled as a terminal (no typing animation)
- ❌ Every line the same color (kills semantic reading)
- ❌ Tabs that are decorative (non-functional — must actually swap content)
- ❌ Mono font swapped for Inter (terminals are always monospaced)
