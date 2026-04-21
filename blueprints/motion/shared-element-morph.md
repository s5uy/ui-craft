# Blueprint: Shared Element Morph

A card in a list expands to fill the screen, with the card's image, title, and container morphing seamlessly into the full-screen detail view. The motion creates continuity — the user never loses spatial context. Framer Motion's `layoutId` makes this possible without any position tracking.

**Seen on:** iOS App Store, Linear (issue expand), Framer.com portfolio pieces

---

## When to use
- Work/case study listings that expand to detail
- Product cards that expand to a product page
- Team member cards to bios
- Any list → detail navigation where preserving spatial context matters

## When NOT to use
- Long lists (50+ items) — layout animations can struggle with many mounted items
- When the detail view has very different content from the card — morph implies they're "the same thing"
- Simple data tables — this pattern is for visual, media-rich cards
- Routes where the list unmounts on navigation (different URL, full page load) — use View Transitions API instead

---

## Full Implementation (same-page expand)

```tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  body: string;
}

interface WorkGalleryProps {
  items: WorkItem[];
}

export function WorkGallery({ items }: WorkGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.find(i => i.id === selectedId);

  return (
    <LayoutGroup>
      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map(item => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className="cursor-pointer rounded-2xl overflow-hidden bg-[var(--surface-2)] group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ willChange: 'transform' }}
          >
            <motion.div layoutId={`image-${item.id}`} className="aspect-[4/3]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-5">
              <motion.p
                layoutId={`category-${item.id}`}
                className="text-xs font-mono text-[var(--fg-tertiary)] uppercase tracking-widest mb-1"
              >
                {item.category}
              </motion.p>
              <motion.h3
                layoutId={`title-${item.id}`}
                className="text-lg font-semibold text-[var(--fg-primary)]"
              >
                {item.title}
              </motion.h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Detail */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />

            {/* Expanded card */}
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-50 overflow-y-auto rounded-3xl bg-[var(--surface-1)]"
              style={{ maxWidth: '900px', margin: '0 auto' }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white backdrop-blur-sm"
                aria-label="Close"
              >
                ×
              </button>

              <motion.div layoutId={`image-${selectedItem.id}`} className="aspect-video w-full">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="p-8 space-y-4">
                <motion.p
                  layoutId={`category-${selectedItem.id}`}
                  className="text-xs font-mono text-[var(--fg-tertiary)] uppercase tracking-widest"
                >
                  {selectedItem.category}
                </motion.p>
                <motion.h2
                  layoutId={`title-${selectedItem.id}`}
                  className="text-3xl font-semibold text-[var(--fg-primary)]"
                >
                  {selectedItem.title}
                </motion.h2>

                {/* Non-shared content fades in after morph settles */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="prose prose-neutral max-w-none"
                >
                  <p className="text-[var(--fg-secondary)] leading-relaxed">{selectedItem.body}</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
```

---

## Cross-route variant (Next.js App Router)

When the detail is on a different URL, use the View Transitions API or Framer Motion with `next-view-transitions`.

```tsx
// app/work/page.tsx — list
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WorkList({ items }: { items: WorkItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(item => (
        <Link href={`/work/${item.id}`} key={item.id}>
          <motion.div layoutId={`card-${item.id}`} className="...">
            <motion.img layoutId={`image-${item.id}`} src={item.image} />
            <motion.h3 layoutId={`title-${item.id}`}>{item.title}</motion.h3>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

// app/work/[id]/page.tsx — detail
export default function WorkDetail({ item }: { item: WorkItem }) {
  return (
    <motion.div layoutId={`card-${item.id}`} className="max-w-4xl mx-auto">
      <motion.img layoutId={`image-${item.id}`} src={item.image} className="w-full aspect-video object-cover" />
      <motion.h1 layoutId={`title-${item.id}`} className="text-4xl">{item.title}</motion.h1>
    </motion.div>
  );
}
```

**Note:** Cross-route `layoutId` requires the element to exist in the DOM on both pages during the transition. With Next.js App Router's parallel routes or `@modal` slots, this works. With full page navigations, use View Transitions API instead.

---

## Layout transition tuning

```tsx
// Default layout transition — spring
<motion.div layout transition={{ type: 'spring', stiffness: 300, damping: 30 }} />

// Bezier for more controlled morphs (EL)
<motion.div layout transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />

// Separate position vs size transitions
<motion.div
  layout
  transition={{
    layout: { type: 'spring', stiffness: 250, damping: 25 },
    opacity: { duration: 0.2 }
  }}
/>
```

---

## Performance notes

- `layoutId` is Framer Motion's most GPU-intensive feature — it measures DOM, calculates deltas, and applies transforms. Avoid on lists with 50+ items.
- `LayoutGroup` is required when layoutId elements are in different parts of the component tree.
- The backdrop and card are two separate elements so the backdrop can fade without affecting the morph timing.
- `willChange: 'transform'` on the card list items avoids the first-frame jump when the expansion starts.
- Scroll position resets when the modal opens — use `overflow: hidden` on `<body>` while expanded to prevent background scroll.

```tsx
// Prevent background scroll when expanded
useEffect(() => {
  if (selectedId) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [selectedId]);
```

---

## Direction fit

| Direction | Adjustment |
|-----------|-----------|
| DE | Perfect fit. This IS the DE interaction pattern. |
| TM | Works for portfolio/case study sections. Keep morph subtle (bezier, not spring). |
| EL | Use slow bezier (1s, outExpo). No hover scale on cards. |
| VP | Add bouncy spring to expansion, rounded corners go extra large. |
