# Component Demo Aesthetics

Component demo aesthetics are visual patterns that look impressive in a component library screenshot or design portfolio but perform poorly in production UIs. They are optimized for the moment of demonstration, not for the sustained use context of a real product.

---

## What Makes Something "Demo Aesthetic"

A component has demo aesthetics when:
- It draws attention to itself as a designed artifact rather than to the content/function it serves
- It looks better in a screenshot than in a running product
- Its primary purpose is to impress viewers of a gallery or design portfolio
- It sacrifices usability, performance, or clarity for visual spectacle

---

## Specific Patterns

### The Spotlight Search Bar

**What it looks like:**
A large search bar (often full-width or very wide) with a glowing border, a spotlight/radial gradient emanating from the focus state, a floating magnifying glass icon, and a keyboard shortcut badge (⌘K).

```tsx
// WRONG
<div className="relative">
  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-xl" />
  <input
    className="relative w-full rounded-2xl border border-violet-500/30 bg-black/50 px-6 py-4 text-lg shadow-[0_0_60px_rgba(139,92,246,0.3)] backdrop-blur-sm placeholder:text-white/30 focus:shadow-[0_0_80px_rgba(139,92,246,0.5)] focus:border-violet-400/60"
    placeholder="Search or type a command..."
  />
</div>
```

**Why it fails in production:** The glow/spotlight effect is visible before the user has interacted with the element. It creates permanent background noise. It also typically looks worse on light backgrounds (which many products use) and almost always conflicts with the surrounding page's palette.

**What production search looks like:**
```tsx
// RIGHT
<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <input
    className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
    placeholder="Search..."
  />
</div>
```

---

### The Bento Grid Feature Showcase

**What it looks like:**
A section with irregular grid spans, dark cards with gradient accents, tiny mockup screenshots, animated elements, and colored backgrounds — designed to look like a design portfolio's hero section.

**Why it fails in production:** Bento grids require content that fits the irregular spans. AI-generated bento content is almost always fabricated to fit the layout rather than the layout being designed around real content. When you swap in real product content, the layout breaks. It's also a pattern so strongly associated with 2023–2024 design portfolio trends that it quickly looks dated.

**The rule:** Use a bento grid only when you have content that genuinely maps to different importance levels, and you can justify why each item has its specific span based on content hierarchy — not visual interest.

---

### The Animated Counter / Number Reveal

**What it looks like:**
Statistics that count up from 0 to their final value as they scroll into view: "0... 10... 50... 100... 10,000,000 users."

**Why it fails in production:** Users do not wait for the counter to finish. By the time the animation completes, the user has scrolled past. The animation is designed to capture attention in a component demo — in production, it delays the communication of the actual number.

**The right approach:** Static numbers. `10,000,000+`. If a count-up animation is genuinely desired, it should complete in under 800ms so the user always sees the final value quickly.

---

### The "Live" Status Indicators with Excessive Pulse

**What it looks like:**
```tsx
// WRONG — excessive, always-pulsing indicators
<span className="flex items-center gap-2">
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
  </span>
  Online
</span>
```

**Why it fails:** The pinging/expanding ring animation (`animate-ping`) is a CSS animation that runs indefinitely. On a dashboard with multiple components all using this pattern, the screen is filled with continuously pulsing dots. This creates visual noise and can trigger accessibility concerns for users with vestibular disorders (violates WCAG 2.3.3).

**When pulsing is appropriate:** A single, prominent live status indicator — e.g., a recording indicator, a single "system is live" indicator at the top of a monitoring dashboard. One instance, contextually critical.

**For standard status indicators:**
```tsx
// RIGHT — static dot with semantic color
<span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
  Online
</span>
```

---

### The Oversized Icon

**What it looks like:**
Feature cards, hero sections, or "how it works" steps where icons are `h-12 w-12` or `h-16 w-16` — large enough that the icon is the dominant visual element rather than the content it supports.

**Why it fails:** Large icons draw the eye before the content. In a grid of cards, the icons compete with each other. The visual hierarchy becomes: icon → title → description, when it should be title → description (with the icon as supporting detail, if present at all).

**The rule:** Icons should support content, not precede it. In most production contexts, `h-4 w-4` to `h-5 w-5` is the right size for inline icons. Section icons (like in feature lists) should be `h-5 w-5` or `h-6 w-6` maximum. Icons at `h-10 w-10`+ are demo aesthetics.

---

### The Dark Card with Colorful Glow Background

**What it looks like:**
A dark card with an absolute-positioned colored circle behind it using `blur-3xl`:
```tsx
// WRONG
<div className="relative rounded-2xl bg-zinc-900 p-6">
  <div className="absolute -inset-1 rounded-2xl bg-violet-600/20 blur-2xl -z-10" />
  <h3>Feature name</h3>
</div>
```

**Why it fails:** This is the component demo equivalent of ambient glow. It looks impressive in a Figma mockup against a clean white background. In production, surrounded by other elements, the glow bleeds into adjacent content and creates visual noise. It also signals "this was designed for screenshots."

**The fix:** `bg-card border border-border` — no glow, no ambient effect. The card's value is its content.

---

### The Frosted Glass Everything

**What it looks like:**
Every surface — cards, navbars, sidebars, modals, tooltips — uses `backdrop-blur bg-white/10 border border-white/20`. The entire UI is translucent.

**Why it fails:**
1. Performance: Each blurred surface triggers a GPU repaint area. Multiple blurred layers degrade rendering performance significantly.
2. Legibility: Text on a blurred background that shows random page content has inconsistent contrast.
3. Context: Frosted glass requires a visually interesting background to work. On a flat background, it's just a slightly transparent surface with blur overhead.
4. Overuse: When everything is frosted glass, nothing is special about being frosted glass.

**The rule:** One frosted glass instance maximum per page, in a context where the content behind it genuinely enhances the UI (navbar over a hero image, modal over a spatial background).

---

## The Meta-Pattern

All of these share the same root cause: **optimizing for the demo rather than the product**.

Demo optimization asks: "Does this look impressive in a screenshot?" Product optimization asks: "Does this help the user accomplish their task?"

These questions have different answers. When AI generates from a corpus that includes design portfolios, UI showcases, and component library demos, it learns to optimize for demo impressiveness. The cure is explicitly instructing it to optimize for production use.
