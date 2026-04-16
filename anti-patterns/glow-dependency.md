# Glow Dependency

Glow effects — colored box shadows, neon borders, and light bleed — are the second most recognizable AI-generated UI artifact after gradient text. This file documents every form of glow misuse and the correct alternatives.

---

## What Counts as a Glow

Any `box-shadow` with a non-zero blur and a non-black/transparent color is a glow. Examples:

```css
/* All of these are glow effects */
box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
box-shadow: 0 0 20px #6366f1;
box-shadow: 0 4px 24px rgba(139, 92, 246, 0.4);
box-shadow: inset 0 0 40px rgba(99, 102, 241, 0.1);

/* In Tailwind */
shadow-[0_0_30px_rgba(99,102,241,0.5)]
shadow-indigo-500/50
```

Text shadows for decorative text are also glow effects:
```css
text-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
```

---

## Glow Failure Modes

### The Glowing CTA Button

**Pattern:**
```tsx
// WRONG
<button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)]">
  Get started
</button>
```

**Why it's generated:** Glowing buttons appear in premium UI kits and "futuristic" design systems.

**Why it fails:** The glow bleeds into surrounding content, creating visual noise. It reads as a screenshot effect — like the button has been Photoshopped in — not as a production UI element. The glow increases on hover, rewarding the hover with more noise.

**Fix:**
```tsx
// RIGHT — hover through background change only
<button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors hover:bg-indigo-700">
  Get started
</button>
```

---

### The Neon Accent Border

**Pattern:**
```tsx
// WRONG
<div className="rounded-xl border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] p-6">
  {/* content */}
</div>
```

**Why it's generated:** Neon-bordered cards appear in cyberpunk-adjacent design aesthetics and dark-mode UI kits.

**Why it fails:** The glow creates the impression that the border is radiating light. This reads as a demo or portfolio piece. It is also inappropriate for most product contexts — the only product context where it can be justified is a Command Center / deep-technical UI with explicit neon aesthetic intent.

**Fix:**
```tsx
// RIGHT — border without glow
<div className="rounded-xl border border-indigo-500/40 p-6 bg-indigo-950/20">
  {/* content */}
</div>
// Or, for standard content:
<div className="rounded-xl border border-border p-6">
  {/* content */}
</div>
```

---

### The Input Focus Glow

**Pattern:**
```tsx
// WRONG
<input className="focus:shadow-[0_0_0_3px_rgba(99,102,241,0.4)] focus:border-indigo-500" />
```

**Why it's generated:** Some UI component libraries use a glow instead of a clean ring for focus states.

**Why it fails:** `box-shadow` with blur radius for focus is imprecise compared to `ring`. It also bleeds into adjacent form fields in tightly spaced forms.

**Fix:**
```tsx
// RIGHT — clean ring, no blur
<input className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-ring" />
```

---

### The Card Hover Glow

**Pattern:**
```tsx
// WRONG
<div className="group rounded-xl border border-border p-5 transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:border-indigo-500/50 cursor-pointer">
```

**Why it's generated:** Glow on hover appears in countless "interactive card" examples to signal clickability.

**Why it fails:** The glow creates a light halo effect that draws the eye away from the card's content. It signals "this is a demo card" rather than "this is a production list item."

**Fix:**
```tsx
// RIGHT — hover through background and border change, no glow
<div className="group rounded-xl border border-border p-5 transition-colors hover:bg-muted/30 hover:border-muted-foreground/20 cursor-pointer">
```

---

### The Glow Divider Line

**Pattern:**
```tsx
// WRONG
<div className="h-px bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
```

**Why it's generated:** Neon dividers appear in cyberpunk and "futuristic" design systems as decorative separators.

**Why it fails:** A glowing horizontal line is pure decoration with no functional purpose. It signals aesthetic posturing.

**Fix:**
```tsx
// RIGHT
<hr className="border-border" />
```

---

### The Ambient Background Glow

**Pattern:**
```tsx
// WRONG
<section className="relative overflow-hidden">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-3xl" />
  {/* content */}
</section>
```

**Why it's generated:** Ambient background glows appear in nearly every AI-generated hero section and "atmospheric" product section.

**Why it fails:** The glow provides no information — it exists to make the background feel "designed." It creates variable contrast conditions for any text placed over it. And it is visually indistinguishable from the generic AI output pattern.

**Fix:** Remove entirely. Solid background. If depth is needed, use a surface tonal change (a section with `bg-muted/30` instead of `bg-background`).

---

### The Glow on Active Nav

**Pattern:**
```tsx
// WRONG
<a className={cn(
  "flex items-center gap-2 px-3 py-2 rounded-md",
  isActive && "bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]"
)}>
```

**Why it's generated:** Glowing active states appear in sidebar navigation kits for admin dashboards.

**Why it fails:** The active state's job is to communicate location, not to create a visual spectacle. A clean `bg-muted text-foreground font-medium` communicates active state clearly without any glow.

**Fix:**
```tsx
// RIGHT
isActive && "bg-muted text-foreground font-medium"
```

---

## Glow Removal Checklist

When reviewing for glow effects:

- [ ] Any `shadow-[0_0_*]` custom shadow (zero x, zero y = centered glow)
- [ ] Any `shadow-*-500/50` or similar Tailwind colored shadow utilities
- [ ] Any `blur-3xl` or `blur-2xl` on a colored div used as background effect
- [ ] `text-shadow` in CSS or inline styles
- [ ] Focus states using `shadow` instead of `ring`
- [ ] Any shadow where the color is not black/transparent

**The only legitimate shadows:**
- `shadow-sm`, `shadow-md` on elevated surfaces (cards, modals) — these are black/transparent, not colored
- Single-axis shadows for depth (`shadow-[0_2px_4px_rgba(0,0,0,0.08)]`) — legitimate depth signal
