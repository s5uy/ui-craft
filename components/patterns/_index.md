# Interactive Patterns — Copy-Paste Library

These are the signature interactive patterns extracted from the Foundry reference site. They are **the reason** a page reads as premium rather than generic. Every recipe in `recipes/` pulls from here.

**Rule:** when a recipe lists a signature pattern, do not improvise a lesser version. Copy the pattern. Adapt copy and data only.

---

## The Patterns

| Pattern | File | When to use |
|---|---|---|
| Terminal panel with animated scripts | [`terminal-panel.md`](terminal-panel.md) | Hero of a developer tool; any section that should show "the product actually does something" |
| Command palette (⌘K) | [`command-palette.md`](command-palette.md) | Every developer-tool and dashboard site. Wire globally. |
| Comparison slider (before/after) | [`comparison-slider.md`](comparison-slider.md) | Showing migration stories, before-after UIs, old-way-vs-new-way |
| Feature tablist with rich preview | [`feature-tablist.md`](feature-tablist.md) | The feature section — default replacement for the 3-col icon grid |
| Pricing toggle with savings pill | [`pricing-toggle.md`](pricing-toggle.md) | Any pricing section that offers monthly/yearly |
| FAQ accordion (CSS-only open/close) | [`faq-accordion.md`](faq-accordion.md) | Every FAQ section |
| Scroll reveal observer | [`scroll-reveal.md`](scroll-reveal.md) | Every below-the-fold section |
| Logo marquee | [`logo-marquee.md`](logo-marquee.md) | Social-proof rail under the hero |
| Eyebrow label with accent dot | [`eyebrow.md`](eyebrow.md) | Top of every section |
| Tweaks panel (live theme switcher) | [`tweaks-panel.md`](tweaks-panel.md) | Optional but a huge quality signal — ship it when you can |
| Animated number counter | [`counter.md`](counter.md) | Hero metrics, stats sections |
| Drag-and-drop pipeline | [`drag-pipeline.md`](drag-pipeline.md) | HowItWorks section when the product involves steps |
| Hover card (avatar → profile) | [`hover-card.md`](hover-card.md) | Testimonials, team, contributors |
| Toast notifications | [`toast.md`](toast.md) | Any app-shell or interactive landing that acknowledges actions |
| Status pill | [`status-pill.md`](status-pill.md) | Dashboards, pricing plans, active-state indicators |
| Mega menu | [`mega-menu.md`](mega-menu.md) | Nav bar with a Products or Solutions dropdown |

---

## Usage Rules

1. **Never re-invent.** If a pattern exists here, copy it. Inventing a lesser version of a pattern that is already solved is what makes AI output feel assembled.
2. **Adapt copy and data, not structure.** Change the terminal scripts, not the terminal component. Change the FAQ questions, not the accordion mechanism.
3. **Keep the mono font on labels.** Every pattern here uses `var(--font-mono)` on labels, timestamps, kbd hints, metrics. Do not silently switch to body font.
4. **Keep the glow restraint.** The patterns here only glow on the eyebrow dot and the live-status indicator. Do not add glows to cards, buttons, or borders.
5. **Keep the token references.** Every color in these files is a CSS custom property. Do not hardcode hex.
