# Pattern: Command Palette (⌘K)

Overlay-based command menu bound to Cmd/Ctrl+K. Grouped results. Keyboard-navigable. This is the single strongest quality signal on a developer-tool site — ship it even if the user didn't ask.

---

## JSX

```jsx
function CommandPalette({ open, onClose }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const items = [
    { group: 'Pages',   label: 'Go to Dashboard',    tag: '⏎', action: () => {} },
    { group: 'Pages',   label: 'Open Deployments',   tag: '⏎', action: () => {} },
    { group: 'Pages',   label: 'View Environments',  tag: '⏎', action: () => {} },
    { group: 'Actions', label: 'Create new project',  tag: 'N', action: () => {} },
    { group: 'Actions', label: 'Invite teammates',    tag: 'I', action: () => {} },
    { group: 'Actions', label: 'Roll back last deploy', tag: 'R', action: () => {} },
    { group: 'Recent',  label: 'foundry-next (main)', tag: '↗', action: () => {} },
    { group: 'Recent',  label: 'billing-svc',         tag: '↗', action: () => {} },
  ];

  const filtered = items.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));
  const groups = ['Pages', 'Actions', 'Recent'];

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
    if (open) { setQ(''); setIdx(0); }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter')     { filtered[idx]?.action(); onClose(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, filtered, idx, onClose]);

  return (
    <div className={`cmdk-overlay ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Type a command or search…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setIdx(0); }}
        />
        <div className="cmdk-list">
          {groups.map(g => {
            const rows = filtered.filter(i => i.group === g);
            if (!rows.length) return null;
            return (
              <div key={g}>
                <div className="cmdk-group-label">{g}</div>
                {rows.map((r, i) => {
                  const global = filtered.indexOf(r);
                  return (
                    <div
                      key={i}
                      className="cmdk-item"
                      aria-selected={global === idx}
                      onMouseEnter={() => setIdx(global)}
                      onClick={() => { r.action(); onClose(); }}
                    >
                      <span>{r.label}</span>
                      <span className="tag">{r.tag}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="cmdk-footer">
          <span>↑↓ navigate</span>
          <span>⏎ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}

// Bind globally:
function useCmdK(setOpen) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setOpen]);
}
```

---

## CSS

```css
.cmdk-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: color-mix(in oklab, #000 60%, transparent);
  backdrop-filter: blur(6px);
  opacity: 0; pointer-events: none;
  transition: opacity .18s;
  display: grid; place-items: flex-start center;
  padding-top: 14vh;
}
.cmdk-overlay.open { opacity: 1; pointer-events: auto; }

.cmdk {
  width: min(640px, 92vw);
  background: var(--bg-elev);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 100px -20px rgba(0,0,0,0.7);
  overflow: hidden;
  transform: translateY(-6px) scale(0.98);
  transition: transform .18s ease;
}
.cmdk-overlay.open .cmdk { transform: none; }

.cmdk-input {
  width: 100%; padding: 16px 18px; font-size: 15px;
  background: transparent; border: 0; border-bottom: 1px solid var(--line);
  color: var(--fg); outline: none;
  font-family: var(--font-body);
}
.cmdk-list { max-height: 360px; overflow-y: auto; padding: 6px; }
.cmdk-group-label {
  font-family: var(--font-mono);
  font-size: 10.5px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--fg-muted);
  padding: 10px 10px 4px;
}
.cmdk-item {
  display: flex; align-items: center; gap: 12px;
  padding: 9px 10px; border-radius: var(--radius-sm);
  color: var(--fg-dim); font-size: 13.5px; cursor: pointer;
}
.cmdk-item[aria-selected="true"],
.cmdk-item:hover { background: rgba(255,255,255,0.05); color: var(--fg); }
.cmdk-item .tag {
  margin-left: auto; font-size: 11px;
  color: var(--fg-muted); font-family: var(--font-mono);
}
.cmdk-footer {
  display: flex; gap: 14px; align-items: center;
  padding: 10px 14px; border-top: 1px solid var(--line);
  font-size: 11.5px; color: var(--fg-muted); font-family: var(--font-mono);
}
```

---

## Rules

- **Every command palette must be keyboard-navigable.** ArrowUp/Down, Enter, Esc. Non-negotiable.
- **Group results** (Pages / Actions / Recent). Do not show a flat list.
- **Mono font on group labels and shortcut hints.** Body font on the item labels themselves.
- **Show a shortcut hint column on every row.** Even if most rows show `⏎`.
- **The nav search trigger must say `⌘K`** — not "Search." Teach the user the shortcut exists.
