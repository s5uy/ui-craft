# Anti-Patterns — Index

This directory documents the most common AI UI generation failures. Each file covers a specific failure mode: what it looks like, why it happens, why it fails, and what to do instead.

These are not guidelines. They are named failure modes — each one produces recognizable, low-quality output that signals "AI made this."

---

## The Catalog

| File | Failure Mode | Trigger phrase |
|---|---|---|
| `ai-slop-gallery.md` | The complete taxonomy of AI UI clichés | "Make it look premium" |
| `gradient-abuse.md` | Decorative gradients used as hierarchy substitutes | "Add some color" |
| `glow-dependency.md` | Glow effects, neon borders, and light bleed | "Make it pop" |
| `generic-layouts.md` | Predictable, interchangeable page structures | "Build a landing page" |
| `fake-premium.md` | Visual tricks that mimic premium without being premium | "Make it feel luxurious" |
| `component-demo-aesthetics.md` | Components designed to impress in screenshots, not production | "Add a spotlight card" |

---

## How to Use

When reviewing generated output, scan for patterns in this catalog. If a pattern is present:

1. Identify which anti-pattern file it belongs to
2. Read the "The Fix" section for the replacement approach
3. Remove the offending element entirely — do not try to "tone it down"

"Toned-down" AI slop is still AI slop. The fix is removal and replacement, not reduction.

---

## The Recognition Rule

If you can identify what the element is trying to signal ("this is supposed to make it feel modern/premium/energetic") and that signal is being carried by a visual effect rather than by honest composition, it is an anti-pattern.

Honest composition: hierarchy through scale, weight, contrast, and space.
Visual effects: gradients, glows, shadows, blurs, animations that serve no interactive purpose.
