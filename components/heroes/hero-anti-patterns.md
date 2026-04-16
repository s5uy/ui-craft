# Hero Anti-Patterns

The AI-generated hero is the single most recognizable artifact of low-effort UI generation. These are the specific patterns that produce it — and what to do instead.

---

## The Gradient Headline

**What it looks like:**
```tsx
// DON'T
<h1 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
  Build faster, ship smarter
</h1>
```

**Why it fails:** The gradient headline is the calling card of AI-generated landing pages. It signals: "this was generated in 10 seconds." Beyond the aesthetic problem, it also reduces legibility — text on a gradient has inconsistent contrast and is harder to read.

**The fix:** Strong typographic hierarchy through weight and contrast. The headline earns visual distinction through scale and weight, not color effects.
```tsx
// DO
<h1 className="text-5xl font-semibold tracking-tight text-foreground">
  Build faster, ship smarter
</h1>
```

If you want tonal variation in the headline, use foreground/muted-foreground contrast:
```tsx
<h1 className="text-5xl font-semibold tracking-tight">
  <span className="text-foreground">Build faster,</span>{" "}
  <span className="text-muted-foreground">ship smarter</span>
</h1>
```

---

## The Animated Gradient Blob Background

**What it looks like:**
```tsx
// DON'T
<section className="relative overflow-hidden">
  <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl animate-pulse" />
  <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
  {/* hero content */}
</section>
```

**Why it fails:** The blobs provide no information. They add visual noise that competes with the content the user needs to read. They also create foreground/background contrast issues — placing text over a shifting background degrades legibility.

**The fix:** A clean, solid background. The hierarchy and visual interest come from typography and composition — not from light effects behind the content.

---

## The "Purple Gradient Card" Layout

**What it looks like:** The entire hero is a large rounded-2xl card with a dark-to-purple gradient background, white text, and a 3D-rotated product screenshot floating at 15 degrees.

**Why it fails:** The card treatment adds visual weight without meaning. The gradient makes it feel like an advertisement rather than a product. The tilted screenshot is a shorthand for "this is a demo" not "this is a real product."

**The fix:** No card container for the hero. Full-width section with solid background. Product screenshot flat and framed naturally (browser chrome or none) at natural perspective.

---

## Three Primary CTAs

**What it looks like:**
```tsx
// DON'T
<div className="flex gap-3">
  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Get Started</button>
  <button className="bg-purple-600 text-white px-6 py-3 rounded-lg">View Demo</button>
  <button className="bg-gray-700 text-white px-6 py-3 rounded-lg">Read Docs</button>
</div>
```

**Why it fails:** Three equally-weighted CTAs create decision paralysis. None of them is clearly "the thing to do." The user's eye bounces between them without resolution.

**The fix:** One primary (filled), one secondary (outlined or text-link). The hierarchy communicates: "this is the main action, here is an alternative if you're not ready."
```tsx
// DO
<div className="flex items-center gap-3">
  <a href="/signup" className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90">
    Get started free
  </a>
  <a href="/demo" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
    See a demo →
  </a>
</div>
```

---

## The Staggered Word Reveal

**What it looks like:**
```tsx
// DON'T
const words = ["Build", "faster,", "ship", "smarter"]
{words.map((word, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    {word}{" "}
  </motion.span>
))}
```

**Why it fails:** Word-by-word reveals delay the user's ability to read the headline. The animation calls attention to itself rather than the content. It also performs poorly at 60fps on mid-range hardware when multiple elements are transitioning simultaneously.

**The fix:** If animation is desired, animate the whole headline as a unit with a very short enter:
```tsx
// DO — if animation is justified
<motion.h1
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
>
  Build faster, ship smarter
</motion.h1>
```

Or: no animation at all. Static heroes load faster and communicate immediately.

---

## The Feature-Stuffed Hero

**What it looks like:** Hero headline + sub + CTA + feature grid with 6 icon cards + customer logo bar + testimonial quote + pricing preview — all above the fold.

**Why it fails:** The hero section's job is to get the user to understand the core value and take the primary action. Adding features, social proof, and pricing to the hero creates a content hierarchy that has no peak — everything competes equally.

**The fix:** The hero is three elements: headline, sub, CTA. Social proof can be a single line of supporting text (`Trusted by 2,400 teams`) or a strip of logos immediately below. Feature grids come after the hero in their own section.

---

## The Decorative Background Grid

**What it looks like:** A CSS grid pattern (`background-image: linear-gradient(...)` repeating) or dot grid covering the hero background — often with a radial gradient fade toward the center.

**Why it fails:** It is pure decoration. It adds visual complexity without communicating anything. Combined with text, it can reduce legibility. It also directly contradicts the gradient policy.

**The fix:** Solid background. If texture is genuinely needed for the product's identity (e.g., a developer tool where a grid reference makes sense), a very subtle, very low-opacity grid that does not visually compete with the content.

---

## Floating 3D Product Screenshot

**What it looks like:** A product screenshot rendered at perspective angle (`transform: perspective(1000px) rotateX(10deg) rotateY(-15deg)`), often with multiple colored shadows and decorative chrome.

**Why it fails:** The tilt is a convention for "look how polished this demo is." Real products show product screenshots flat and legibly. The tilt obscures the actual product, which is what the user cares about. It also looks substantially worse at most viewport sizes.

**The fix:** Flat screenshot with a clean border and neutral background. Or no screenshot — copy and CTA only, with a link to a demo.

---

## The Badge Constellation

**What it looks like:** Around the product screenshot, 4–8 floating badge/chip elements with icons and labels (`"200ms response time"`, `"99.9% uptime"`, `"SOC 2 Certified"`) arranged at angles around the image.

**Why it fails:** Floating elements at arbitrary positions create visual disorder. The information is real but the presentation is decorative. Each badge adds complexity without hierarchy.

**The fix:** If social proof statistics are valuable, place them as a row of clean metric items below the hero or within a trust section. Never floating.
