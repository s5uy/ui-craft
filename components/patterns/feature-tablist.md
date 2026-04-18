# Pattern: Feature Tablist with Rich Preview

The default replacement for the 3-col icon feature grid. A vertical tablist on the left, a rich preview panel on the right that swaps content per tab.

---

## JSX

```jsx
function Features() {
  const tabs = [
    {
      id: 'preview',
      label: 'Preview every branch',
      blurb: 'Push code. Get a live URL. Share with anyone.',
      panel: <PreviewPanel />,
    },
    {
      id: 'rollback',
      label: 'Roll back in seconds',
      blurb: 'One click or one keyboard shortcut. Done before the pager fires.',
      panel: <RollbackPanel />,
    },
    {
      id: 'observe',
      label: 'Observe p99 in context',
      blurb: 'Logs, traces, and metrics pinned to the commit that caused them.',
      panel: <ObservePanel />,
    },
    {
      id: 'scale',
      label: 'Scale to the edge',
      blurb: 'Deploy to 312 points of presence without changing a single line of code.',
      panel: <ScalePanel />,
    },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find(t => t.id === active);

  return (
    <div className="feature-box">
      <div className="tablist" role="tablist" aria-orientation="vertical">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            className="tab"
            onClick={() => setActive(t.id)}
          >
            <span className="ico">◆</span>
            <div>
              <strong>{t.label}</strong>
              <small>{t.blurb}</small>
            </div>
          </button>
        ))}
      </div>
      <div className="tabpanel" role="tabpanel">
        <div className="tabpanel-head">
          <h3>{current.label}</h3>
          <p>{current.blurb}</p>
        </div>
        {current.panel}
      </div>
    </div>
  );
}
```

The panels themselves should be **real-looking UI**: a small chart with data, a mini table with rows, a code snippet with tabs. Anything dense and specific. Do not fill the panel with a single icon or placeholder text.

---

## CSS

```css
.feature-box {
  display: grid; grid-template-columns: 280px 1fr;
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  overflow: hidden;
  min-height: 560px;
  background: var(--bg-elev);
}
@media (max-width: 900px) { .feature-box { grid-template-columns: 1fr; } }

.tablist {
  display: flex; flex-direction: column;
  border-right: 1px solid var(--line);
  padding: 12px; gap: 2px;
}
@media (max-width: 900px) {
  .tablist {
    flex-direction: row; overflow-x: auto;
    border-right: 0; border-bottom: 1px solid var(--line);
  }
}

.tab {
  text-align: left; padding: 14px;
  border-radius: var(--radius-md); color: var(--fg-dim);
  display: grid; grid-template-columns: 18px 1fr;
  gap: 12px; align-items: start;
  position: relative;
  background: transparent; border: 0; cursor: pointer;
}
.tab:hover { color: var(--fg); background: rgba(255,255,255,0.02); }
.tab[aria-selected="true"] { background: rgba(255,255,255,0.05); color: var(--fg); }
.tab[aria-selected="true"]::before {
  content: ""; position: absolute;
  left: -12px; top: 12px; bottom: 12px; width: 2px;
  background: var(--accent); border-radius: 2px;
}
.tab strong {
  display: block; font-weight: 500; font-size: 14px;
}
.tab small {
  display: block; color: var(--fg-muted); font-size: 12px;
  margin-top: 2px; line-height: 1.4;
}
.tab .ico { color: var(--accent); margin-top: 2px; }

.tabpanel {
  padding: 32px;
  display: flex; flex-direction: column; gap: 20px;
  position: relative;
}
.tabpanel-head h3 { font-size: 24px; letter-spacing: -0.02em; }
.tabpanel-head p { margin-top: 8px; max-width: 54ch; color: var(--fg-dim); }
```

---

## Rules

- **4–6 tabs maximum.** More gets unwieldy, fewer doesn't justify a tablist.
- **Each tab label is a verb + object.** "Preview every branch," not "Previews."
- **Each tab blurb is one sentence.** If you need two sentences you do not yet have the point.
- **The preview panel must contain real-looking UI** — a chart, a table, a code block, a terminal. Not a lone icon or headline.
- **The 2px accent bar on the selected tab** is the key visual cue. Do not replace with a background highlight alone.
- **Do not use this pattern if you only have 2 features.** Use two alternating feature rows instead.

## The failure this pattern replaces

```
┌─────────┬─────────┬─────────┐
│  [icon] │  [icon] │  [icon] │
│ Title 1 │ Title 2 │ Title 3 │
│ 1 sent. │ 1 sent. │ 1 sent. │
└─────────┴─────────┴─────────┘
```

The 3-col icon grid says "AI landing page" in 3 seconds. The tablist says "senior designer."
