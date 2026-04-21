# Motion Blueprint Gallery

Signature animations. Each is a complete, production-ready set-piece — full code, decision criteria, performance notes.

These are the moves that separate "nice React site" from "Awwwards nominee."

---

## Available Blueprints

| Blueprint | Effect | Best direction | Difficulty |
|-----------|--------|----------------|-----------|
| [text-mask-reveal.md](text-mask-reveal.md) | Text slides in through a moving clip-path | TM, DE, EL | Low |
| [kinetic-scroll-type.md](kinetic-scroll-type.md) | Words scale/blur as you scroll past them | EL | Medium |
| [cursor-reactive-grid.md](cursor-reactive-grid.md) | Grid cells react to cursor proximity | DE, TM | Medium |
| [horizontal-pin-gallery.md](horizontal-pin-gallery.md) | Horizontal scroll gallery driven by vertical scroll | EL, TM | Medium |
| [shared-element-morph.md](shared-element-morph.md) | Card expands to full-screen detail seamlessly | DE, TM | Medium |
| [svg-draw-in.md](svg-draw-in.md) | SVG strokes draw themselves in on scroll | TM, DE | Low |

---

## How to pick

**One hero set-piece per page.** These animations are expensive in attention — use one per page section maximum.

- Above-fold hero → `text-mask-reveal` or `kinetic-scroll-type`
- Feature/product showcase → `cursor-reactive-grid` or `horizontal-pin-gallery`
- Portfolio/work listing → `shared-element-morph`
- Technical/diagram sections → `svg-draw-in`

Never stack two signature animations in adjacent sections. The second one always feels cheap.
