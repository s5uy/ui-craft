# AI Slop Gallery

The complete taxonomy of recognizable AI UI output. These are the patterns that make a UI immediately identifiable as machine-generated. Every item in this gallery has a characteristic appearance, a reason it's AI-default, and a replacement approach.

---

## Category 1: Color and Surface Failures

### The Purple-Blue Hero Gradient

**Appearance:** A hero section with `bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900` (or similar). White text, large headline, glowing CTA button.

**Why AI generates it:** It learned from hundreds of SaaS landing pages from 2018–2023 that used this pattern when it was trendy.

**Why it fails:** It looks identical to thousands of other products. It communicates no product identity. The gradient is decoration that substitutes for actual design thinking.

**The fix:** Dark solid background (`#09090B` or `#18181B`). Typography does the hierarchy. Color appears only through semantic use or a single restrained accent.

---

### The Pastel Feature Cards

**Appearance:** Feature grid where each card has a different pastel background — one soft blue, one soft purple, one soft green, one soft orange. Each with a white icon inside a circle.

**Why AI generates it:** Colorful variety signals "vibrant, engaging product" in training data.

**Why it fails:** The multiple colors compete with each other and with any accent color in the UI. The variety communicates nothing — blue card does not mean something different from green card. The eye has no path.

**The fix:** All cards same surface color. Icon without blob background, or minimal neutral icon container. Color differentiation only where meaning is differentiated.

---

### The Glassmorphism Panel

**Appearance:** Cards or modals with `backdrop-blur-lg bg-white/10 border border-white/20` floating over a gradient background.

**Why AI generates it:** Glassmorphism was a design trend that appeared frequently in training data, especially for "modern" or "premium" designs.

**Why it fails:** Glassmorphism requires a carefully designed background to work. When generated without the right background, the blur reveals random page content behind it, which is visually chaotic. The pattern also performs poorly (GPU-intensive blur on every panel) and looks dated quickly.

**The fix:** Solid surface on solid or lightly tinted background. If depth is needed, use background tonal contrast (a slightly elevated `bg-card` vs. `bg-background`), not blur effects.

---

### The Gradient Text Headline

**Appearance:** `<h1>` with `bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent`.

**Why AI generates it:** Learned from landing pages that use gradient text as a "premium" signal.

**Why it fails:** This is the single most recognizable AI UI pattern. It appears on roughly half of all AI-generated landing pages. It also reduces text legibility (inconsistent contrast across the gradient) and looks like a template.

**The fix:** `text-foreground` for the primary headline. Tonal variation (`text-foreground` / `text-muted-foreground`) within a headline for secondary phrases. No gradient on text.

---

## Category 2: Layout Failures

### The Centered Icon Grid

**Appearance:** A features section with 3 or 6 cards in a centered grid. Each card has: colored icon in a rounded square, bold title, 2-line description. All cards identical in size and weight.

**Why AI generates it:** This is the default feature section structure in virtually every UI kit and template in existence.

**Why it fails:** When all features are the same visual weight, none is primary. The layout communicates "we have features" without communicating "this feature is why you should buy this." It's been overused to the point of invisibility.

**The fix:** Alternating feature layout (copy + visual), or a feature list without icons, or a bento grid where primary features take more space. If using a grid, remove the icon blobs.

---

### The Testimonial Carousel

**Appearance:** A section with 3 quote cards in a carousel/slider. Each has a name, title, avatar photo, and 2–3 sentence quote. Auto-plays or has navigation dots.

**Why AI generates it:** Testimonial sections appear on most marketing sites; carousels are a common pattern for fitting multiple in a small space.

**Why it fails:** Users do not wait for a carousel to cycle through content. The hidden slides might as well not exist. The carousel interaction is also often broken on mobile. The result: one quote, presented with unnecessary complexity and motion.

**The fix:** Show 2–3 testimonials in a static grid. No carousel. No auto-play. Let the user read all quotes simultaneously.

---

### The Bento Overload

**Appearance:** A "features" section that is a CSS grid of 6–9 cards with different spans, different background colors, screenshots, and decorative elements — designed to look like a product screenshot from a design portfolio.

**Why AI generates it:** Bento grid layouts appeared heavily in design inspiration content in 2023–2024, and AI absorbed the aesthetic.

**Why it fails:** When overused, the bento grid is visual complexity in service of no hierarchy. The irregular spans suggest hierarchy that doesn't exist. The decorative cards compete with the informational ones.

**The fix:** Use a bento grid only when the content genuinely maps to different importance levels. Primary features get larger spans. Decorative or social-proof elements get smaller spans. Do not span for visual interest — span for hierarchy.

---

## Category 3: Component Failures

### The Glowing CTA Button

**Appearance:** Primary button with `shadow-[0_0_30px_rgba(99,102,241,0.5)]` or similar — a colored glow radiating from the button.

**Why AI generates it:** Glowing elements appeared in numerous "premium" UI kits and dark-mode design systems.

**Why it fails:** The glow is a border that doesn't stop — it bleeds into the surrounding content, creating visual noise rather than focus. It also looks like a screenshot effect, not a production UI element.

**The fix:** Solid filled button, `hover:bg-primary/90`. Distinctiveness through contrast, not light effects.

---

### The Typewriter Hero Text

**Appearance:** A hero headline where words appear one by one (or letter by letter) with a cursor blinking at the end.

**Why AI generates it:** Typewriter effects are a well-known animation library demo pattern that AI associates with "impressive" UI.

**Why it fails:** It delays the user from reading the core value proposition. While the animation runs, the user is waiting, not learning. It also reads as technical demo, not product UI.

**The fix:** Static headline. If the headline has a rotating value prop (showing multiple audience segments), use a vertical slide swap that cycles through complete phrases — not character-by-character.

---

### The Floating Badge Constellation

**Appearance:** Around a product screenshot or hero visual, 4–8 small badge/chip components are positioned at angles — `"99.9% uptime"`, `"SOC 2 Certified"`, `"< 50ms latency"` — floating outside the natural layout grid.

**Why AI generates it:** Seen in premium SaaS landing pages; AI associates floating badges with "social proof" and "features."

**Why it fails:** Elements positioned outside the grid at arbitrary angles create visual disorder. Each badge is a distraction from the primary content. The information is real but the presentation is cargo-culting.

**The fix:** Trust metrics in a clean horizontal row below the hero, or in a dedicated trust/social-proof section. Never floating.

---

## Category 4: Motion Failures

### The Per-Element Page Load Stagger

**Appearance:** Every element on the page — header, hero, cards, footer — animates in with individual delays: 0ms, 100ms, 200ms, 300ms, 400ms…

**Why AI generates it:** Staggered animations appear in Framer Motion examples and are associated with "polished" UI in training data.

**Why it fails:** The cumulative delay means the user waits 400ms+ for the last element to appear. Multiplied across a page with 20+ elements, users see content appearing piecemeal for a second or more after the page loads. This feels broken, not polished.

**The fix:** Animate sections as units, not individual elements. Above-the-fold content: no animation (instant visibility). Below-the-fold sections: a single subtle entrance as they scroll into view.

---

### The Idle Loop Animation

**Appearance:** Background elements that animate continuously — rotating geometric shapes, pulsing gradient blobs, floating particles — regardless of user interaction.

**Why AI generates it:** Animated backgrounds appear in "impressive" portfolio and product demos.

**Why it fails:** Continuous background animation distracts from content permanently. It also causes accessibility issues (violates WCAG 2.3.3 for users with vestibular disorders). And it kills battery life on mobile.

**The fix:** No continuous idle animations. Motion responds to user interaction only.

---

## Category 5: Typography Failures

### The Multiline Gradient Display Heading

**Appearance:** A large `text-6xl` or `text-7xl` heading spanning 2-3 lines, with the first line in regular text color and the last line in gradient text.

**Why AI generates it:** Combining large display type with gradient text is a compounded "premium" signal.

**Why it fails:** Each failure compounds — large gradient type is even more immediately recognizable as AI output than standard gradient text.

**The fix:** Large display type in a single weight and color. Hierarchy through scale and weight contrast, not color effects.

---

### The Body Text at `text-gray-400`

**Appearance:** Body text using `text-gray-400` or `text-slate-400` on white/light backgrounds — extremely low contrast muted text used as "minimalist" styling.

**Why AI generates it:** Light gray text is associated with "minimal" and "sophisticated" UI in training data.

**Why it fails:** `text-gray-400` on white is approximately 3.6:1 contrast — below the WCAG AA requirement of 4.5:1 for normal text. It is both an accessibility failure and, in practice, hard to read in anything other than perfect lighting conditions.

**The fix:** `text-muted-foreground` using a properly calibrated token that passes WCAG AA. On white, this is approximately `#6B7280` or darker.
