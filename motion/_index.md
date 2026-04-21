# Motion System

The motion infrastructure layer. Builds on `core/motion-standard.md` (universal law + per-direction vocabularies).

## Files

| File | Purpose |
|------|---------|
| [libraries.md](libraries.md) | Framer Motion vs GSAP vs CSS vs View Transitions — decision flowchart and code |
| [primitives.md](primitives.md) | Duration scale, spring presets, easing catalog, stagger calculator, MotionValue composition |
| [patterns.md](patterns.md) | Scroll-reveal variants, exit patterns, stagger choreography, drag, loading, shared-element |
| [performance.md](performance.md) | Compositor thread rules, will-change, INP budget, 120fps, bundle size, pre-ship checklist |

## Signature Blueprints

See `blueprints/motion/` for complete, production-ready set-pieces with full code.

## Reading order

1. `core/motion-standard.md` — lock your design direction and motion vocabulary
2. `motion/libraries.md` — pick your tool
3. `motion/primitives.md` — import the token system
4. `motion/patterns.md` — pick patterns as needed
5. `blueprints/motion/` — add a signature move if the section warrants it
6. `motion/performance.md` — run the pre-ship checklist
