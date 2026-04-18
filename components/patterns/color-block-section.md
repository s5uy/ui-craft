# Pattern: Color-Block Section

**Direction:** VP (primary)
**Role:** Full-width section where the background is a confident flat color. Each feature section owns a color. Inspired by Arc, Clerk, Campsite, Cal.com.

---

## Component

```tsx
"use client";
import { motion } from "framer-motion";

interface ColorBlockSectionProps {
  bgColor: string;           // e.g., "oklch(0.95 0.04 60)" for peach
  eyebrow?: string;
  heading: string;
  description: string;
  visual: React.ReactNode;
  textColor?: string;        // default dark
  reverse?: boolean;         // visual on left?
  padding?: string;          // tailwind class
}

export function ColorBlockSection({
  bgColor,
  eyebrow,
  heading,
  description,
  visual,
  textColor = "oklch(0.15 0 0)",
  reverse = false,
  padding = "py-28 lg:py-36",
}: ColorBlockSectionProps) {
  return (
    <section
      className={padding}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}
          >
            {eyebrow && (
              <span className="text-xs uppercase tracking-widest font-bold opacity-70">
                {eyebrow}
              </span>
            )}
            <h3 className="text-4xl lg:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mt-4">
              {heading}
            </h3>
            <p className="text-lg opacity-80 leading-relaxed mt-6 max-w-[40ch]">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.1 }}
            className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

## Usage

```tsx
<>
  <ColorBlockSection
    bgColor="oklch(0.94 0.05 45)"  // peach
    eyebrow="Speed"
    heading="Fast. Even when your wifi isn't."
    description="Local-first by default. Every change is instant. Sync happens in the background."
    visual={<SpeedAnimationVisual />}
  />
  <ColorBlockSection
    bgColor="oklch(0.93 0.05 160)"  // mint
    eyebrow="Teams"
    heading="See what your team is doing — in real time."
    description="Multiplayer cursors. Live avatars. Shared selection states. It feels like working in the same room."
    visual={<TeamCursorsVisual />}
    reverse
  />
  <ColorBlockSection
    bgColor="oklch(0.93 0.05 290)"  // lavender
    eyebrow="Privacy"
    heading="End-to-end encrypted. By default."
    description="Your data never touches our servers unencrypted. Not us, not Google, not anyone."
    visual={<LockVisual />}
  />
  <ColorBlockSection
    bgColor="oklch(0.96 0.08 85)"  // butter
    eyebrow="Cross-platform"
    heading="One app. Every device."
    description="Mac, Windows, Linux, iOS, Android, Web. Your work follows you."
    visual={<DevicesVisual />}
    reverse
  />
</>
```

---

## Palette set (VP signature — 4-6 bg colors)

```css
/* Warm */
--bg-peach:    oklch(0.94 0.05 45);
--bg-butter:   oklch(0.96 0.08 85);
--bg-coral:    oklch(0.92 0.06 20);

/* Cool */
--bg-mint:     oklch(0.93 0.05 160);
--bg-sky:      oklch(0.93 0.06 230);
--bg-lavender: oklch(0.93 0.05 290);

/* Accent */
--bg-rose:     oklch(0.92 0.07 355);
--bg-sage:     oklch(0.92 0.04 140);
```

Use 3-4 of these across a site. Don't use all 8 — color chaos.

---

## Rhythm rules

- **Alternate reverse** — visual left, then visual right, then left — creates scanning rhythm
- **Between two color-block sections, insert a neutral section** — pricing, testimonials, newsletter on the base bg color
- **Never color-block more than 4 sections in a row** — the eye fatigues
- **Match text color to bg:** light bgs (peach, butter, mint) = dark text. Deep bgs (sky, rose) = may flip to white text

---

## When to use
- VP feature deep-dives (the heart of VP marketing pages)
- VP "How it works" sections
- Consumer app "What you can do" sections

## When NOT to use
- TM / DE — destroys the restraint premise
- EL — EL uses full-bleed photography, not flat color-blocks
- Information-dense content (color bgs reduce readability of long paragraphs)
