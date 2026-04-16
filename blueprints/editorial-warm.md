# Blueprint: Editorial Warm

## Overview

**Mood:** Warm, readable, content-led, human-paced, considered

**Best for:**
- Long-form content platforms and blogs
- Documentation sites and knowledge bases
- Developer-focused writing and tutorials
- Personal portfolios with a writing-first identity
- Newsletter archives and publication sites
- Product landing pages for software with a strong writing culture
- Changelog pages and release notes

**Not for:**
- Dense data interfaces
- Transactional or task-completion-heavy products
- Products where speed and efficiency are the primary values
- Marketing pages that need high visual impact

---

## Visual Traits

Reading is the primary activity. Every layout decision optimizes for legibility, pacing, and sustained focus. The visual language is calm and grounded — not antiseptic, not dramatic.

Warmth is achieved through off-white backgrounds (cream, warm gray, paper tones), warm text colors (near-black with a brown or red undertone rather than pure neutral gray), and generous spacing that lets text breathe.

Typography dominates. Images are used purposefully — to illustrate, not to decorate. UI chrome is minimal — navigation, table of contents, footer — and stays out of the way.

The hierarchy is clear but unhurried. Section headings are well-sized but not oversized. The scale contrast is moderate — this is a reading experience, not a marketing page. Nothing should distract from the text.

The palette trends toward paper, ink, and natural light — not screen-glow.

---

## Suggested Palette

**Warm light mode (primary):**

**Background:** `#FDFCF9` (warm white, near-cream)
**Surface:** `#F7F5F0` (warm gray-50, parchment-like)
**Panel:** `#EFECE5`
**Border:** `#DDD9CF`
**Border subtle:** `#E8E5DD`
**Primary text:** `#1C1917` (stone-900 — warm near-black)
**Secondary text:** `#78716C` (stone-500)
**Muted text:** `#A8A29E` (stone-400)
**Accent:** `#DC2626` (a warm ink red) or `#2563EB` (a cool reference blue) or `#059669`
**Code background:** `#F3F1EB`

**Warm dark mode:**

**Background:** `#18160F` (very dark warm brown)
**Surface:** `#221F16`
**Panel:** `#2C2920`
**Border:** `#3D3828`
**Primary text:** `#F5F0E8` (warm off-white)
**Secondary text:** `#A09880`
**Muted text:** `#6B6455`
**Accent:** `#F87171` (warm red-300 — softer for dark mode)

**Palette logic:** Stone and warm gray neutrals have a slight yellow-red undertone that reads as "paper" rather than "screen." This is the key distinction — cool grays (zinc, slate) feel digital and efficient. Stone and warm grays feel like print, like books, like considered reading. The difference is subtle but significant for sustained reading contexts.

The accent is used primarily for links and interactive elements — not as a decorative color. Inline links should be visible but not loud.

---

## Typography Direction

**Reading-first typography. The typeface choice matters more in this blueprint than in any other.**

**Primary typeface options:**
- **Long-form reading:** Georgia (system), Charter, or a quality web serif (Source Serif, Crimson Pro, Lora). Serifs improve readability for sustained long-form content.
- **Technical documentation:** A clean humanist sans (Inter, DM Sans) — serifs can feel out of place in code-heavy docs.
- **Hybrid:** Serif headings + sans body is a classic editorial combination with broad applicability.

**Body text:** 17–19px, `font-normal`, `leading-7` to `leading-8` (generous line height). `max-w-prose` (65ch) or `max-w-[68ch]` always. Never full-width body text in a content layout.

**Headings:**
- H1: 32–40px, `font-bold` or `font-semibold`, `leading-tight`
- H2: 24–28px, `font-semibold`
- H3: 18–20px, `font-semibold`
- Do not make headings dramatically large (no 60px+ in content pages)

**Code:** Monospaced (JetBrains Mono, Fira Code, or system monospace). Inline code: slightly warm background (`#F3F1EB`), same text color, no border needed. Code blocks: full-width, dark background (even in light mode — the contrast helps code stand out as a distinct mode of reading).

**Footnotes and captions:** 13–14px, secondary text color.

**Blockquotes:** Left border in accent color, slightly indented, italic or slightly larger.

---

## Spacing Logic

Generous. The page should breathe like a well-typeset book.

- Body container max-width: 680–740px (centered)
- Between paragraphs: `mb-5` to `mb-6` (20–24px)
- Between heading and following content: `mt-8 mb-4` (32px top, 16px bottom)
- Between H2 sections: `mt-12 mb-4` (48px above)
- Around code blocks: `my-6` (24px)
- Page-level horizontal padding on mobile: 20–24px

The generous spacing between sections creates a sense of chapters or distinct ideas. Each section can be absorbed before the next arrives.

A table of contents sidebar should be positioned with `sticky top-24` and not wider than 240px. It should feel like a quiet guide, not a navigation panel.

---

## Motion Tone

**Minimal and unobtrusive.** The user is reading. Do not interrupt.

- No scroll-triggered reveal animations on body content — body paragraphs should not fade in as the user scrolls
- Table of contents active state: smooth scroll highlight transition, `duration-200`
- Code copy button: `opacity-0 → opacity-100` on code block hover, `duration-150`
- External link indicators: no animation, just a consistent visual treatment
- Image lightbox: `duration-250` fade, `scale-97 → scale-100`
- Search: instant results, no transition

The one motion that is appropriate: smooth scrolling to anchor links, and a subtle active state transition in the table of contents as the user scrolls through sections.

---

## Surface Treatment

Paper-like and flat. The surface should recede — content is everything.

- Background is barely off-white with warm undertone
- Panels (callouts, sidenotes, code blocks) are slightly warmer or darker than the background
- No shadows on content elements — inline content uses background + border for separation
- No glass effects, no elevated floating panels (except for modals/dialogs)
- Callout/note boxes: `border-l-4` in accent color + warm background tint

**Code block treatment:** Dark background, light monospaced text, no border, subtle syntax highlighting. The visual contrast between dark code blocks and warm white body creates a clear rhythm that guides the reading experience.

**Image treatment:** Full-width within the text container, or constrained to text-column width. Optional caption in small muted text below. No rounded corners on editorial images (it softens the authority). Or consistent `rounded-sm` if the brand calls for it — but decide once and apply everywhere.

---

## Component Vocabulary

- `<ProseLayout />` — centered content column with optional sidebar TOC
- `<TableOfContents />` — sticky sidebar with scroll-spy active states
- `<CodeBlock />` — syntax-highlighted code block with copy button
- `<Callout />` — bordered informational/warning/tip box
- `<InlineCode />` — styled inline code span
- `<BlogPostHeader />` — title, date, author, reading time, tag chips
- `<TagChip />` — small categorical label
- `<RelatedPosts />` — 2–3 article recommendations after post body
- `<AuthorCard />` — author bio block with avatar
- `<SearchModal />` — Cmd+K search for documentation or blog
- `<Breadcrumb />` — hierarchical location indicator for docs

---

## Anti-Patterns for This Blueprint

**Large display headlines on content pages.** A 96px hero headline above a blog post or documentation article is wrong. This blueprint's type scale should be moderate — it is a reading experience, not a product launch.

**Full-width body text.** Body text that stretches to the full container width (1200px+) is unreadable. Always constrain to `max-w-prose`. This is the single most common failure mode in content layouts.

**Animation on body content.** Scroll-triggered fade-in on paragraphs is especially wrong in this blueprint. The user is reading — making text appear only as they scroll creates friction, not delight.

**Cool or neutral grays on a warm palette.** If the background is `#FDFCF9`, using `text-gray-500` (which has a blue undertone) creates a dissonant combination. Stay within the warm neutral family throughout.

**Decorative imagery.** Images in content should be purposeful — screenshots, diagrams, photographs that illustrate a point. Decorative stock photography for visual filler is wrong here.

**Busy navigation.** A content site's navigation should be minimal — logo, a few top-level links, search. A full mega-menu or feature-heavy navbar dominates the reading context.

---

## Example Products

- **Stripe Docs** — readable typography, warm surfaces, excellent code block treatment
- **Every.to** — content-first, editorial typography, warm palette
- **Basecamp's blog** — reading-optimized, sparse chrome, text-first
