# Motion Patterns

Cross-cutting patterns that apply regardless of design direction. These are structural — the scaffolding that holds motion together at the page and component level.

---

## Orchestrated Page Entrance

The full above-fold entrance sequence. Everything enters in reading order, with overlapping timing.

```tsx
// Entrance timeline (ms from page load):
// 0ms    — logo fades in
// 100ms  — nav links stagger in
// 300ms  — hero headline starts
// 600ms  — hero subtext
// 800ms  — CTA button
// 1000ms — hero image / illustration

const DELAY = {
  logo: 0,
  nav: 0.1,
  headline: 0.3,
  sub: 0.6,
  cta: 0.8,
  image: 1.0,
};

// Usage — each element gets its own delay:
<motion.h1
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: DELAY.headline }}
/>
```

**Rule:** animate, not whileInView for above-fold. `whileInView` fires when the element enters the viewport, which is instant on load — use `animate` with delays so the sequence plays in order.

---

## Scroll Reveal Variants

Beyond basic fade-up.

**Blur-in (editorial, EL):**
```tsx
<motion.p
  initial={{ opacity: 0, filter: 'blur(8px)' }}
  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Scale-from-small (VP cards):**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.92 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ type: 'spring', stiffness: 180, damping: 14 }}
/>
```

**Slide from left (feature rows):**
```tsx
<motion.div
  initial={{ opacity: 0, x: -24 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
/>
// Alternate side for right-aligned feature:
initial={{ opacity: 0, x: 24 }}
```

**Clip-path curtain (DE, TM):**
```tsx
<motion.div
  initial={{ clipPath: 'inset(0 100% 0 0)' }}
  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Image scale-from-large (EL — enters zoomed, settles):**
```tsx
<motion.img
  initial={{ scale: 1.12, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true, margin: '-200px' }}
  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

---

## AnimatePresence: Exit Patterns

`AnimatePresence` wraps components that mount/unmount. The `exit` prop defines leaving state.

**Modal enter/exit (scale + fade):**
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
    />
  )}
</AnimatePresence>
```

**Toast / notification (slide + fade from corner):**
```tsx
<AnimatePresence mode="popLayout">
  {toasts.map(toast => (
    <motion.div
      key={toast.id}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      layout
    />
  ))}
</AnimatePresence>
```

**Page transition (content swap):**
```tsx
<AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
  />
</AnimatePresence>
```

**`mode` options:**
- `"wait"` — exit finishes before enter starts. Best for page transitions. Avoids visual overlap.
- `"sync"` — enter and exit overlap. Faster-feeling. Use for toasts, dropdowns.
- `"popLayout"` — removes exiting element from layout flow immediately (like opacity:0 instantly). For lists where position should close up fast.

**Exit timing rule:** Exit transitions must be faster than enter transitions. A 600ms enter → 200-250ms exit. Symmetric duration makes exits feel slow and sluggish.

---

## Hover State Coordination

Parent hover triggers child animation — useful for cards, links, list items.

**CSS variable approach (most performant):**
```tsx
<div className="group">
  <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
</div>
```

**Framer Motion parent → child:**
```tsx
const card = {
  rest: {},
  hover: {}
};
const arrow = {
  rest: { x: 0 },
  hover: { x: 6, transition: { type: 'spring', stiffness: 400, damping: 20 } }
};

<motion.div variants={card} initial="rest" whileHover="hover">
  <p>Read more</p>
  <motion.span variants={arrow}>→</motion.span>
</motion.div>
```

**Cursor position on card (CSS custom properties — zero JS overhead on idle):**
```tsx
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};
```

---

## Stagger Choreography Variants

**Radial stagger (from center outward — VP grid):**
```tsx
// Calculate distance from center and use it as stagger delay
const getRadialDelay = (index: number, total: number, cols: number) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const centerRow = Math.floor((total / cols) / 2);
  const centerCol = Math.floor(cols / 2);
  const dist = Math.sqrt((row - centerRow) ** 2 + (col - centerCol) ** 2);
  return dist * 0.06; // 60ms per unit distance
};
```

**Cascade (each row staggers, then items within row stagger — data tables, grids):**
```tsx
// Row delay + item delay within row
const rowDelay = rowIndex * 0.08;
const itemDelay = colIndex * 0.04;
// Total delay = rowDelay + itemDelay
transition={{ delay: rowDelay + itemDelay }}
```

**Reverse stagger on exit (list items exit from bottom):**
```tsx
// On exit, reverse the stagger by making delay = (total - index) * staggerDelay
exit={{ opacity: 0, y: 12, transition: { delay: (items.length - index) * 0.04, duration: 0.2 } }}
```

---

## Drag and Release

```tsx
function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
      dragElastic={0.15}          // 0 = hard stop, 1 = fully elastic
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }} // snap-back physics
      whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
      style={{ cursor: 'grab' }}
    />
  );
}
```

**Drag-to-dismiss (mobile drawer pattern):**
```tsx
function BottomSheet({ onClose }) {
  const controls = useAnimationControls();
  const y = useMotionValue(0);

  const handleDragEnd = async (_: PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      await controls.start({ y: '100%', transition: { duration: 0.25 } });
      onClose();
    } else {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } });
    }
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0 }}
      style={{ y }}
      animate={controls}
      onDragEnd={handleDragEnd}
      dragElastic={{ top: 0, bottom: 0.3 }}
    />
  );
}
```

---

## Loading → Content Transitions

Skeleton to real content without layout shift.

```tsx
// Pattern: render skeleton and content in same DOM position, swap with AnimatePresence
function ContentLoader({ isLoading, children }) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0"
          >
            <Skeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Layout-aware transition (height changes when content loads):**
```tsx
<motion.div layout transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}>
  {isLoading ? <Skeleton /> : <Content />}
</motion.div>
```

---

## Scroll-Linked Parallax (Safe Range)

Parallax is easy to overdo. These ranges won't cause motion sickness.

```tsx
function SafeParallax({ children, speed = 0.15 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // speed 0.1–0.2 = subtle. 0.3+ = too much on laptops.
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);
  const ySmooth = useSpring(y, { stiffness: 60, damping: 20 });

  return <motion.div ref={ref} style={{ y: ySmooth }}>{children}</motion.div>;
}

// Usage — only on images and decorative elements, never on text
<SafeParallax speed={0.12}>
  <img src="/hero-image.jpg" />
</SafeParallax>
```

**Never parallax:** body text, navigation, interactive elements, anything the user needs to read while scrolling.

---

## Shared Element Transitions (layoutId)

Framer Motion's `layoutId` morphs the element between its two rendered positions — no routing library needed.

```tsx
// List view
{items.map(item => (
  <motion.div layoutId={`card-${item.id}`} onClick={() => setSelected(item.id)} key={item.id}>
    <motion.img layoutId={`img-${item.id}`} src={item.image} />
    <motion.h3 layoutId={`title-${item.id}`}>{item.title}</motion.h3>
  </motion.div>
))}

// Detail view (renders when selected !== null)
{selected && (
  <motion.div layoutId={`card-${selected.id}`} className="fixed inset-0 z-50">
    <motion.img layoutId={`img-${selected.id}`} className="w-full" />
    <motion.h3 layoutId={`title-${selected.id}`} className="text-4xl">{...}</motion.h3>
  </motion.div>
)}
```

**Layout transition config:**
```tsx
// Wrap the whole page in LayoutGroup for cross-component shared transitions
<LayoutGroup>
  <ListPage />
  <DetailPage />
</LayoutGroup>

// Set transition for all layout animations
<motion.div layout transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
```

**Gotcha:** `layoutId` breaks if the element is unmounted before the transition completes. Wrap exit-to elements in `AnimatePresence` to prevent this.
