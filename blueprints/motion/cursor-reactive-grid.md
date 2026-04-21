# Blueprint: Cursor-Reactive Grid

A grid of cells that respond to cursor proximity — cells near the cursor brighten, scale, or gain a tint. The cursor never touches the cells directly; proximity does the work. Feels alive and engineered.

**Seen on:** Vercel homepage grid, Linear features grid, shadcn/ui landing

---

## When to use
- Feature grid (6-12 items) where hover state alone isn't enough
- Logo grids or technology grids where you want ambient interactivity
- Any dark-background section where lighting effects read well
- DE or TM hero/feature sections that need a "craft" signal without theatrics

## When NOT to use
- Light backgrounds — the lighting glow reads poorly
- Mobile-first products — cursor tracking is pointer-only
- More than 16 cells — computation overhead at scale
- If the grid items themselves need complex hover states — don't layer

---

## Full Implementation

```tsx
'use client';
import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Cell {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface CursorReactiveGridProps {
  cells: Cell[];
  columns?: number;
  proximityRadius?: number; // px — how far cursor influence reaches
}

export function CursorReactiveGrid({
  cells,
  columns = 4,
  proximityRadius = 160,
}: CursorReactiveGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => setMousePos(null), []);

  return (
    <div
      ref={gridRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="grid gap-px"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {cells.map(cell => (
        <GridCell
          key={cell.id}
          cell={cell}
          mousePos={mousePos}
          proximityRadius={proximityRadius}
          gridRef={gridRef}
        />
      ))}
    </div>
  );
}

function GridCell({
  cell,
  mousePos,
  proximityRadius,
  gridRef,
}: {
  cell: Cell;
  mousePos: { x: number; y: number } | null;
  proximityRadius: number;
  gridRef: React.RefObject<HTMLDivElement>;
}) {
  const cellRef = useRef<HTMLDivElement>(null);

  // Calculate distance from cursor to cell center
  const getProximity = (): number => {
    if (!mousePos || !cellRef.current || !gridRef.current) return 0;
    const gridRect = gridRef.current.getBoundingClientRect();
    const cellRect = cellRef.current.getBoundingClientRect();
    const cellCenterX = cellRect.left - gridRect.left + cellRect.width / 2;
    const cellCenterY = cellRect.top - gridRect.top + cellRect.height / 2;
    const dist = Math.sqrt(
      (mousePos.x - cellCenterX) ** 2 + (mousePos.y - cellCenterY) ** 2
    );
    return Math.max(0, 1 - dist / proximityRadius);
  };

  const proximity = getProximity();

  return (
    <motion.div
      ref={cellRef}
      className="relative flex flex-col gap-3 p-6 bg-[var(--surface-1)] border border-[var(--border-weak)]"
      animate={{
        scale: 1 + proximity * 0.02,
        // Subtle brightness via background opacity
        backgroundColor: `oklch(from var(--surface-1) calc(l + ${proximity * 0.06}) c h)`,
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{
        '--glow-opacity': proximity,
      } as React.CSSProperties}
    >
      {/* Radial glow that follows proximity */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: mousePos
            ? `radial-gradient(circle at ${
                mousePos.x - (cellRef.current?.getBoundingClientRect().left ?? 0) +
                (gridRef.current?.getBoundingClientRect().left ?? 0)
              }px ${
                mousePos.y - (cellRef.current?.getBoundingClientRect().top ?? 0) +
                (gridRef.current?.getBoundingClientRect().top ?? 0)
              }px, oklch(0.75 0.1 var(--accent-hue) / ${proximity * 0.12}) 0%, transparent 60%)`
            : 'none',
        }}
      />
      {cell.icon && <div className="w-8 h-8 text-[var(--fg-secondary)]">{cell.icon}</div>}
      <p className="text-sm font-medium text-[var(--fg-primary)]">{cell.label}</p>
    </motion.div>
  );
}
```

---

## Simpler CSS-Only Variant (Spotlight Grid)

If you only need the spotlight effect (no scale, no proximity math), this is zero-JS on idle and uses only CSS custom properties:

```tsx
'use client';
import { useRef } from 'react';

export function SpotlightGrid({ cells }: { cells: Cell[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    gridRef.current?.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    gridRef.current?.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={gridRef}
      onMouseMove={handleMouseMove}
      className="spotlight-grid grid grid-cols-4 gap-px"
    >
      {cells.map(cell => (
        <div key={cell.id} className="spotlight-cell relative p-6">
          {/* Radial spot — positioned relative to grid, clipped by cell */}
          <div className="spotlight-cell__glow pointer-events-none absolute inset-0 overflow-hidden" />
          {cell.label}
        </div>
      ))}
    </div>
  );
}
```

```css
.spotlight-grid {
  --mx: -999px;
  --my: -999px;
}

.spotlight-cell {
  background: var(--surface-1);
  position: relative;
  overflow: hidden;
}

.spotlight-cell__glow::after {
  content: '';
  position: absolute;
  /* Position is offset from cell's own origin to track grid-relative cursor */
  left: calc(var(--mx) - var(--cell-x, 0px) - 200px);
  top: calc(var(--my) - var(--cell-y, 0px) - 200px);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    oklch(0.75 0.12 var(--accent-hue) / 0.1) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 300ms;
}

.spotlight-grid:hover .spotlight-cell__glow::after {
  opacity: 1;
}
```

**Note:** The CSS-only variant needs each cell to know its own offset from the grid — best computed once on mount with `getBoundingClientRect` and stored as a CSS custom property. The JS-based variant above is easier to get right.

---

## Performance notes

- `proximity` is recalculated per cell per mouse event — for 16+ cells, throttle to 60fps with `requestAnimationFrame`
- Use `MotionValue` instead of state for very high cell counts to bypass React re-renders
- `scale` on `motion.div` uses GPU — safe
- Avoid animating `background-color` directly — use `opacity` on a pseudo-element or overlay div instead

---

## Direction fit

| Direction | Adjustment |
|-----------|-----------|
| TM | Tone down scale to 1.01, glow opacity 0.06, subtle |
| DE | Full implementation above — this is the DE signature |
| VP | Increase scale to 1.04, add border glow, more color |
| EL | Don't use — EL doesn't do cursor interaction on grids |
