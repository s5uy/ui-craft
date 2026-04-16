# Typography System

Typography is the primary design tool. Hierarchy, contrast, rhythm, and richness should come from type before anything else. If the typography is working, the design requires less color, fewer effects, and less decoration to succeed.

---

## Typography as Hierarchy

The user should be able to read the hierarchy of a page from the typography alone, with all color removed.

Hierarchy in type is created through:
- **Size** — scale difference between heading levels should be meaningful, not incremental
- **Weight** — contrast between body (400), emphasis (500–600), and headline (700–800) creates levels
- **Opacity/tone** — primary text vs. secondary text vs. muted text through color opacity
- **Spacing** — tighter tracking for headlines, relaxed tracking for display text, standard for body
- **Line length** — narrow columns for editorial pull quotes, wider for body, full-width for display
- **Case** — uppercase for labels and metadata, mixed case for headings and body

If these tools are working, the user knows what is a heading, what is metadata, what is body text, what is a label — without needing color to explain it.

---

## Scale Contrast

Typography scales should have meaningful contrast between levels, not incremental steps.

**Too incremental (weak):**
- `text-base` → `text-lg` → `text-xl` → `text-2xl`

**Strong contrast:**
- Body: `text-sm` or `text-base` (14px / 16px)
- Subheading: `text-xl` (20px)
- Section heading: `text-3xl` (30px)
- Hero headline: `text-6xl–text-8xl` (60–96px)

The jump from body to hero should feel dramatic. The size difference is doing hierarchy work that color and effects don't need to do.

---

## Weight Strategy

Use weight deliberately. Avoid using bold for every heading — weight contrast only works when there is genuine contrast.

**Typical weight hierarchy:**
- Display/hero: `font-bold` or `font-extrabold` (700–800)
- Section headings: `font-semibold` (600)
- Subheadings, labels: `font-medium` (500)
- Body text: `font-normal` (400)
- Muted/supporting: `font-normal` at lower opacity

**In dark themes:** Consider using lighter weights at large sizes. `font-light` or `font-thin` at display scale on dark backgrounds creates an elegant, controlled feel that heavy weights don't.

---

## Tone Hierarchy

Create text hierarchy through color/opacity levels, not just size and weight.

| Role | Recommended treatment |
|---|---|
| Primary text (headings, key content) | Full contrast: `#FAFAFA` (dark) or `#111` (light) |
| Secondary text (supporting copy) | 75–80% opacity: `rgba(255,255,255,0.75)` |
| Muted text (metadata, labels, hints) | 45–55% opacity: `rgba(255,255,255,0.5)` |
| Disabled text | 25–30% opacity |

Four tones is usually sufficient. Using the same full-contrast color for everything flattens hierarchy.

---

## Line Length Discipline

Line length affects readability and the editorial feel of a page.

- **Body text:** 60–75 characters (45–50rem). This is the ideal reading width.
- **Editorial/longform:** can go to 80ch in specific contexts
- **Marketing copy:** often shorter — 40–55ch for punchy fragments
- **Display/hero text:** can wrap at full container width; short lines are often intentional

**Common mistake:** stretching body text to full container width in a marketing layout. This destroys readability and makes the copy feel unprofessional.

Use `max-w-prose` (65ch) or explicit `max-w-[52ch]` on body text columns.

---

## Tracking (Letter Spacing)

Tracking adjustments are subtle but meaningful.

| Context | Tracking |
|---|---|
| Display/hero headlines | `-0.02em` to `-0.04em` (tight) |
| Section headings | `-0.01em` to `0` |
| Body text | `0` (default) |
| All-caps labels | `0.08em` to `0.12em` (wide) |
| Monospace/code | Default monospace tracking |

Uppercase labels without tracking look cramped. Display headlines with default tracking look amateurish. Both are common AI output failures.

---

## Density as a Design Tool

Typography density creates rhythm on the page. Areas of dense text against areas of large open type create visual energy.

**Dense text regions:**
- Body paragraphs
- Feature lists
- Metadata and labels

**Open type regions:**
- Hero headlines
- Section intros
- Pull quotes

Place these in tension. A page that is all dense text reads as a document. A page that is all large open type reads as empty. The contrast between them makes both more effective.

---

## Typeface Strategy

Typefaces are product decisions. Choose based on product context:

| Context | Direction |
|---|---|
| Technical/developer tools | Monospace accents + geometric sans body |
| Enterprise SaaS | Neutral geometric sans (Inter, DM Sans) |
| Editorial/content | Serif headings + humanist sans body |
| Consumer product | Rounded geometric sans |
| Luxury/fashion | High-contrast serif, tight tracking |
| Data-dense | Tabular-numeral monospace for metrics |

**Default when unspecified:** Inter or similar neutral geometric sans. Reliable, legible, system-native on many platforms. Not interesting, but not wrong.

**When to use a serif:** When the product needs warmth, credibility, or editorial authority. Not as a trend choice.

**When to mix:** Heading serif + body sans is a classic editorial combination. Sans + monospace accents is effective in technical products. Do not mix more than two typefaces without strong rationale.

---

## Typography and Palette Interdependence

A neutral-cool palette needs strong typographic weight contrast to avoid feeling cold and flat. A warm neutral palette can use slightly lower weight contrast because the warmth does some of that work. A monochrome palette entirely depends on type for hierarchy — if the type is weak, the palette cannot compensate.

When selecting a palette, evaluate: does the typographic system support this palette's requirements?

---

## Common Failures in AI Output

- **Heading every section with the same size and weight** — no hierarchy, just repetition
- **Using bold for everything that needs emphasis** — weight contrast disappears
- **Full-width body text** — destroys readability on wide screens
- **No tracking on all-caps labels** — looks compressed and unprofessional
- **Default tracking on large display headlines** — looks loose and unintentional
- **Same text color throughout** — no tonal hierarchy, everything competes
- **Serif headings + serif body without care** — reads as a school essay, not product design
