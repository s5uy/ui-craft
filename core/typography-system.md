# Typography System

Typography is the primary tool for making a site look Figma-specialist-quality. Before you add a single color, a single shadow, or a single motion, the type system needs to be doing 60% of the design work.

This file defines:
1. **Universal principles** — apply to every direction
2. **Per-direction type systems** — concrete copy-paste configs for TM, DE, VP, EL
3. **Failure modes per direction** — how type quietly kills a design

Read the universal section + the section matching your locked direction from `core/design-directions.md`. Ignore the other three on a given generation.

---

## Universal Principles

### 1. Hierarchy without color

Remove all color from your design. Can you still read the hierarchy? If not, your type system is broken. Fix type before adding color.

Hierarchy comes from, in priority order:
1. **Size** — must be meaningful, not incremental (see Scale Contrast below)
2. **Weight** — 3 weights max per page (e.g., 400 / 500 / 700)
3. **Tone** — 4 levels of foreground opacity (primary / secondary / muted / faint)
4. **Tracking** — tight on display, wide on all-caps labels
5. **Case** — all-caps for labels/eyebrows/kbd, sentence for body and headings
6. **Face** — sans for body, mono for labels/technical, serif for editorial contrast

### 2. Scale contrast is dramatic, not incremental

A weak scale: `text-base → text-lg → text-xl → text-2xl → text-3xl`. Every step is a 15–20% jump. The eye does not register the hierarchy.

A strong scale: `text-sm → text-xl → text-4xl → text-7xl`. Each level at least 1.5x the previous. The jump from body to display should feel architectural, not arithmetic.

Use a modular scale, not Tailwind defaults alone. Recommended ratios:
- **TM:** 1.25 (major third) — restrained
- **DE:** 1.333 (perfect fourth) — classical
- **VP:** 1.414 (augmented fourth) — energetic
- **EL:** 1.618 (golden ratio) or higher — dramatic

### 3. Line length discipline

| Context | Line length |
|---|---|
| Body prose | 60–75 characters (`max-w-[65ch]`) |
| Marketing copy | 40–55 characters |
| Display / hero | no max — intentionally short fragments |
| Editorial longform | 70–80 characters |

Full-width body text on a 1400px container is unreadable. Put every paragraph in a width-constrained column.

### 4. Tracking per role

| Role | Tracking |
|---|---|
| Display 48px+ | `-0.02em` to `-0.04em` |
| Heading 24–48px | `-0.015em` to `-0.02em` |
| Body | `0` |
| All-caps label 11–13px | `0.08em` to `0.12em` |
| Monospace | default |

Default tracking on large display type = amateurish. No tracking on all-caps labels = compressed.

### 5. Four tonal levels minimum

Every direction defines four levels of foreground:
- **Primary** — headings, key content
- **Secondary** — supporting copy, body
- **Muted** — metadata, labels, hints
- **Faint** — disabled, deemphasized

If you only use 2 (black + gray), hierarchy flattens. If you use 6+, hierarchy muddles.

### 6. Font-face budget

- **Minimum:** 1 face (a versatile sans — risky, works only for DE)
- **Typical:** 2 faces (display sans + mono accent, OR body sans + serif display)
- **Maximum:** 3 faces (display serif + body sans + mono) — any more and the page loses coherence

---

## TM — Technical-Minimal Type System

### Stack

```css
--font-sans: "Geist Sans", "Inter", system-ui, sans-serif;
--font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
```

Install:
- **Geist Sans + Mono** (free from Vercel): `npm i geist`
- Fallback: Inter + JetBrains Mono (Google Fonts)

### Scale (ratio 1.25 + fluid display)

```css
--text-xs:   11px;   /* labels, kbd, timestamp */
--text-sm:   13px;   /* secondary body, captions */
--text-base: 15px;   /* body default */
--text-md:   17px;   /* lead paragraph */
--text-lg:   20px;   /* section eyebrow description */
--text-xl:   24px;   /* small headings */
--text-2xl:  32px;   /* section headings */
--text-3xl:  48px;   /* sub-hero */
--text-hero: clamp(2.5rem, 5.5vw, 5rem);  /* hero display */
```

### Weights

- Display: `font-weight: 500` (medium) — restraint
- Headings: `font-weight: 600` (semibold)
- Body: `font-weight: 400`
- Labels (mono uppercase): `font-weight: 500`

**Never use 700 or 800 in TM.** Bold is a VP/EL signature; it breaks TM restraint.

### Tracking

```css
.display { letter-spacing: -0.025em; }
.heading { letter-spacing: -0.015em; }
.body    { letter-spacing: 0; }
.label   { letter-spacing: 0.08em; text-transform: uppercase; }
.mono    { letter-spacing: 0; }
```

### Tone hierarchy

```css
--text-primary:   oklch(0.98 0 0);
--text-secondary: oklch(0.78 0 0);
--text-muted:     oklch(0.58 0 0);
--text-faint:     oklch(0.42 0 0);
```

### Signature TM type moves

1. **Mono label on every section** — `<span class="mono uppercase text-xs text-muted tracking-wider">◆ Features</span>`
2. **Mono inside display type** — `<h1>Deploy <code class="font-mono">edge</code> functions</h1>` — mono word is a brand device
3. **Tabular nums on metrics** — `font-variant-numeric: tabular-nums` for counter patterns
4. **kbd shortcuts visible in hero** — `<kbd class="font-mono text-xs border px-1.5 py-0.5 rounded">⌘K</kbd>`

### Failure modes

- Using `text-6xl` for display — too large for TM's voice. TM hero caps around `5rem` / 80px.
- Bold weights on hero — breaks restraint.
- Serif in headings — wrong direction, that's DE or EL.

---

## DE — Design-Engineer Type System

### Stack

```css
--font-display: "Inter Display", "Geist Sans", system-ui, sans-serif;
--font-body:    "Inter", system-ui, sans-serif;
--font-mono:    "Geist Mono", "JetBrains Mono", monospace;
--font-serif:   "GT Sectra", "Tiempos Headline", Georgia, serif;  /* optional accent */
```

Install:
- **Inter Display** from `rsms.me/inter/` or Google Fonts Inter with display optical size
- Serif accent optional — use only for quotes, ampersands, or single-word emphasis

### Scale (ratio 1.333 perfect fourth)

```css
--text-xs:   11px;
--text-sm:   13px;
--text-base: 14px;   /* DE body is slightly smaller than TM */
--text-md:   15px;
--text-lg:   18px;
--text-xl:   22px;
--text-2xl:  30px;
--text-3xl:  42px;
--text-4xl:  58px;
--text-hero: clamp(3rem, 7vw, 6.5rem);
```

### Weights

- Display: `font-weight: 500` (medium — DE signature)
- Headings: `font-weight: 500` or `600`
- Body: `font-weight: 400`
- Labels: `font-weight: 500`
- Light accents: `font-weight: 300` on specific display callouts

DE is the direction where `font-weight: 500` display type is a specific taste signature. It's visibly medium-weight — confident but not shouting.

### Tracking

```css
.display { letter-spacing: -0.02em; }
.heading { letter-spacing: -0.015em; }
.body    { letter-spacing: -0.005em; }  /* DE body is slightly tracked */
.label   { letter-spacing: 0.1em; text-transform: uppercase; }
```

### Tone hierarchy (light mode dominant)

```css
/* Paper palette */
--text-primary:   oklch(0.15 0 0);
--text-secondary: oklch(0.35 0 0);
--text-muted:     oklch(0.55 0 0);
--text-faint:     oklch(0.70 0 0);

/* Graphite palette */
--text-primary-dark:   oklch(0.96 0 0);
--text-secondary-dark: oklch(0.75 0 0);
--text-muted-dark:     oklch(0.55 0 0);
--text-faint-dark:     oklch(0.40 0 0);
```

### Signature DE type moves

1. **Letter-stagger hero** — hero headline reveals letter-by-letter at 20–30ms per letter
2. **Number scramble** — metrics scramble from random digits to final value on viewport entry
3. **Mono sitemap footer** — the entire footer in 11px uppercase mono with tracked-wide spacing
4. **Arrow-in-link** — `Read case study <span>→</span>` with arrow that translates 2-4px on hover
5. **Asymmetric alignment** — headlines left-aligned, intros indented, metadata right-aligned in the same section
6. **Mixed weight in single headline** — `<h1><span class="font-medium">Building</span> <span class="font-light italic font-serif">interfaces</span> <span class="font-medium">for thought</span></h1>`

### Failure modes

- Using font-weight 700 — breaks the medium-weight DE signature
- Centered hero — DE is left-aligned or deliberately asymmetric
- Using mono on every label — DE uses mono sparingly; overused mono reads as TM
- Adding a color accent to type — DE type is monochromatic

---

## VP — Vibrant-Playful Type System

### Stack

```css
--font-display: "Mona Sans", "Satoshi", "Söhne Breit", system-ui, sans-serif;
--font-body:    "Inter", "Söhne", system-ui, sans-serif;
--font-accent:  "Instrument Serif", "GT Super Display", serif;  /* for italic hero words */
--font-mono:    "JetBrains Mono", monospace;
```

Install:
- **Mona Sans** (free, from GitHub's type team) or **Satoshi** (Fontshare) for display
- **Instrument Serif** (Google Fonts) for italic serif accent on hero — huge VP signature
- Mono is used less in VP than TM/DE

### Scale (ratio 1.414 augmented fourth)

```css
--text-xs:   12px;
--text-sm:   14px;
--text-base: 16px;   /* VP body is larger, friendlier */
--text-lg:   18px;
--text-xl:   24px;
--text-2xl:  34px;
--text-3xl:  48px;
--text-4xl:  68px;
--text-hero: clamp(3.5rem, 9vw, 8rem);
```

### Weights

- Display: `font-weight: 700` (bold) — VP loves bold
- Heading: `font-weight: 600`
- Body: `font-weight: 400`
- Callouts: `font-weight: 800`
- Italic serif accents at 700

VP is the direction that earns bold type. It's friendly, it's confident, it's shouting *a little bit* — and that's on-brand.

### Tracking

```css
.display { letter-spacing: -0.03em; }  /* tight on big bold type */
.heading { letter-spacing: -0.015em; }
.body    { letter-spacing: 0; }
.label   { letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600; }
```

### Tone hierarchy (light mode default)

```css
--text-primary:   oklch(0.15 0 0);
--text-secondary: oklch(0.40 0 0);
--text-muted:     oklch(0.55 0 0);
--text-faint:     oklch(0.70 0 0);
```

### Signature VP type moves

1. **Mixed-face hero** — bold sans + italic serif accent: `<h1><span class="font-bold">Make it</span> <em class="font-serif italic font-medium">effortless</em></h1>`
2. **Gradient text on ONE word** — applied to a single hero word, never the whole headline (e.g., Arc's "The browser <span class="gradient">for everyone</span>")
3. **Oversized numbers as section labels** — `<span class="text-[160px] font-bold opacity-10">01</span>` behind a section heading
4. **Emoji-adjacent punctuation** — tasteful use of arrows, sparkles as typographic elements (`→` `✶` `●`)
5. **Pull quotes at 36-48px** — testimonials in large display sizes, not small italic

### Failure modes

- Using TM restraint on display sizes — VP hero is 68-128px
- Forgetting the italic serif accent — VP loses 30% of its signature without it
- Using mono everywhere — that's TM
- Gradient on every word — reserve it for ONE hero word

---

## EL — Editorial-Luxury Type System

### Stack

```css
--font-display: "SF Pro Display", "Neue Haas Grotesk Display", "GT America", system-ui, sans-serif;
--font-body:    "Söhne", "SF Pro Text", system-ui, sans-serif;
--font-serif:   "Tiempos Headline", "GT Sectra Display", "NYT Cheltenham", serif;  /* for editorial brands */
--font-mono:    "JetBrains Mono", monospace;  /* rarely used in EL */
```

Face choice depends on sub-direction:
- **Apple-style EL:** SF Pro Display or Neue Haas Grotesk Display
- **Editorial-print EL (magazine, agency):** Tiempos Headline or similar editorial serif
- **Luxury-brand EL (fashion, hospitality):** GT America or Söhne Breit for display

### Scale (ratio 1.618 golden — dramatic)

```css
--text-xs:   12px;
--text-sm:   14px;
--text-base: 16px;
--text-lg:   20px;
--text-xl:   28px;
--text-2xl:  44px;
--text-3xl:  72px;
--text-4xl:  120px;
--text-hero: clamp(5rem, 20vw, 18rem);  /* THIS is the EL hero scale */
```

**EL hero type is 20vw fluid.** That means on a 1440px screen, the hero is 288px. On a phone, it's 80px. This scale is non-negotiable — if the hero isn't giant, it isn't EL.

### Weights

- Display: `font-weight: 600` (semibold) or `500` (medium) — Apple hero is 600
- Heading: `font-weight: 500`
- Body: `font-weight: 400`
- Light display accents: `font-weight: 200` or `300` (`font-thin`, `font-extralight`) — used for contrast against giant semibold type

### Tracking

```css
.display { letter-spacing: -0.04em; }  /* tight — EL signature */
.display-xl { letter-spacing: -0.055em; }  /* even tighter on 20vw type */
.heading { letter-spacing: -0.025em; }
.body    { letter-spacing: -0.003em; }
.label   { letter-spacing: 0.15em; text-transform: uppercase; }  /* wide tracking labels */
```

### Tone hierarchy

EL is often monochrome. The full 4-level hierarchy may compress to 2-3.

```css
/* Light */
--text-primary:   oklch(0.12 0 0);
--text-secondary: oklch(0.40 0 0);
--text-muted:     oklch(0.55 0 0);

/* Dark */
--text-primary-dark:   oklch(0.97 0 0);
--text-secondary-dark: oklch(0.70 0 0);
--text-muted-dark:     oklch(0.50 0 0);
```

### Signature EL type moves

1. **20vw hero** — `<h1 class="text-[clamp(5rem,20vw,18rem)] font-semibold leading-[0.85] tracking-[-0.055em]">Think different.</h1>`
2. **Extreme scale contrast** — 288px hero next to 16px body, nothing in between
3. **One-word-per-line display** — hero that stacks words vertically, each 20vw
4. **Numbered chapters** — `<span class="text-[14px] uppercase tracking-[0.2em] font-mono">— 01 —</span>` above giant headline
5. **Centered OR edge-aligned** — EL commits. No timid left-indent. Either dead-center or pushed to viewport edge.
6. **Tight leading on display** — `line-height: 0.85` or `0.9` on giant display (negative space between lines becomes structural)

### Failure modes

- Using `text-6xl` for hero — that's TM hero size. EL hero is 5-10x larger.
- Adding ornament to display type (strikethrough, underline gradients) — EL is silent
- Decorating the giant type with color — EL display is monochrome
- Using multiple display weights — pick one (semibold 600 OR medium 500) and commit

---

## Cross-Direction Type Rules

Apply to all four:

1. **Mono never on body.** Mono is a label face. Body copy in mono reads as CRT terminal screenshot.
2. **Italic sparingly.** One italic moment per viewport max.
3. **Uppercase only on short labels.** All-caps on paragraphs is illegible.
4. **Numerals need tabular-nums on metrics.** `font-variant-numeric: tabular-nums` prevents jitter in counters.
5. **Fallback fonts matter.** Specify full fallback chains — system fonts load before custom fonts, and the mid-load flash must still look designed.
6. **Font-display: swap** for custom fonts — never block render for type.
7. **Letter-spacing and line-height are a pair.** Tighter tracking needs slightly tighter leading. Looser tracking needs looser leading. Tune together.

---

## Recommended Default Per Direction (copy-paste block)

Include the matching `<style>` or Tailwind config block in the site's root layout.

### TM default
```css
:root {
  --font-sans: "Geist Sans", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv11";
}
.text-hero { font-size: clamp(2.5rem, 5.5vw, 5rem); letter-spacing: -0.025em; font-weight: 500; line-height: 1.05; }
.text-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }
```

### DE default
```css
:root {
  --font-display: "Inter Display", "Geist Sans", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-serif: "GT Sectra", "Tiempos Headline", Georgia, serif;
  font-family: var(--font-body);
  font-feature-settings: "ss01", "cv11", "cv02";
}
.text-hero { font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6.5rem); letter-spacing: -0.02em; font-weight: 500; line-height: 1.0; }
.text-serif-accent { font-family: var(--font-serif); font-weight: 400; font-style: italic; }
```

### VP default
```css
:root {
  --font-display: "Mona Sans", "Satoshi", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-accent: "Instrument Serif", serif;
  font-family: var(--font-body);
}
.text-hero { font-family: var(--font-display); font-size: clamp(3.5rem, 9vw, 8rem); letter-spacing: -0.03em; font-weight: 700; line-height: 0.95; }
.text-accent-italic { font-family: var(--font-accent); font-style: italic; font-weight: 500; }
```

### EL default
```css
:root {
  --font-display: "SF Pro Display", "Neue Haas Grotesk Display", "GT America", system-ui, sans-serif;
  --font-body: "Söhne", "SF Pro Text", system-ui, sans-serif;
  font-family: var(--font-body);
}
.text-hero { font-family: var(--font-display); font-size: clamp(5rem, 20vw, 18rem); letter-spacing: -0.055em; font-weight: 600; line-height: 0.85; }
.text-chapter-label { font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
```

---

## The Final Test

Strip all color. Does the page read?
- **TM:** hierarchy clear from mono labels + weight + size
- **DE:** hierarchy clear from size + asymmetric alignment + face mixing
- **VP:** hierarchy clear from bold weight + size + face contrast
- **EL:** hierarchy clear from extreme scale contrast alone

If the answer is no, the type system is broken. Fix type before adding color, motion, or effects.
