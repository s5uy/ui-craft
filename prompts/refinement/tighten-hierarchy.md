# Refinement Prompt: Tighten Hierarchy

Fix visual hierarchy issues in existing UI. Use when a component or page feels flat, undifferentiated, or unclear about what the user should look at first.

---

## When to Use

- All text is approximately the same size and weight
- The page/component has no obvious visual anchor (the "most important thing")
- Primary and secondary actions appear equally weighted
- Section headings don't clearly differentiate from body text
- Metadata and primary content appear at the same visual level
- Everything is `text-gray-600` — no range from prominent to receding

---

## Hierarchy Diagnosis

Before refining, map the current hierarchy:

1. What should the user read/notice FIRST? (the hierarchy peak)
2. What should they read SECOND? (primary content)
3. What is SUPPORTING information? (secondary, muted)
4. What is METADATA? (labels, timestamps, captions — should recede)
5. What is the PRIMARY ACTION? (must be visually dominant over secondary actions)

---

## Refinement Prompt

```
Fix the visual hierarchy of this component. Do not change the content or layout — only adjust typography, color weights, and element prominence.

**Existing code:**
[paste the existing code here]

**Current hierarchy problems:**
[describe the specific issues: "all text is the same size", "primary CTA is same weight as cancel button", etc.]

**Desired hierarchy:**
1. Most prominent: [describe]
2. Primary content: [describe]
3. Supporting: [describe]
4. Metadata/muted: [describe]
5. Primary action: [describe]

**Hierarchy tools to use (in order of priority):**
1. **Scale contrast:** Primary text at 2–3 scale steps above secondary. Headlines `text-xl`/`text-2xl`, body `text-sm`, labels `text-xs`.
2. **Weight contrast:** Headings `font-semibold`, body `font-normal`, metadata `font-normal text-muted-foreground`.
3. **Tonal contrast:** Primary content `text-foreground`, secondary `text-muted-foreground`, metadata at `text-muted-foreground/60`.
4. **Action hierarchy:** Primary button filled (`bg-foreground text-background`), secondary outlined (`border border-border`), tertiary text-only.
5. **Spacing as hierarchy:** More space above higher-hierarchy elements. Section headings have more space above them than below.

**Rules:**
- Do not add gradients, glows, or color effects to establish hierarchy
- Do not change the layout structure
- Use only scale, weight, tone, and spacing to fix hierarchy
- Every change must move toward the hierarchy map above

**Output the complete refined code.**
```

---

## Hierarchy Reference Table

| Role | Size | Weight | Color |
|---|---|---|---|
| Page title / H1 | `text-2xl` to `text-4xl` | `font-semibold` | `text-foreground` |
| Section heading / H2 | `text-xl` to `text-2xl` | `font-semibold` | `text-foreground` |
| Card title / H3 | `text-base` to `text-lg` | `font-semibold` or `font-medium` | `text-foreground` |
| Body text | `text-sm` to `text-base` | `font-normal` | `text-foreground` |
| Secondary description | `text-sm` | `font-normal` | `text-muted-foreground` |
| Label / eyebrow | `text-xs` | `font-medium` uppercase | `text-muted-foreground/60` |
| Metadata / timestamp | `text-xs` | `font-normal` | `text-muted-foreground` |
| Disabled / decorative | `text-xs` to `text-sm` | `font-normal` | `text-muted-foreground/40` |

---

## Common Hierarchy Fixes

**The flat card:** All text in a card is `text-sm text-gray-600`. Fix: card title to `font-semibold text-foreground`, description to `text-sm text-muted-foreground`, metadata to `text-xs text-muted-foreground`.

**The competing CTAs:** Two filled buttons. Fix: primary to `bg-foreground text-background`, secondary to `border border-border text-foreground hover:bg-muted`.

**The undifferentiated form:** Form labels and helper text are the same size and color. Fix: labels to `text-sm font-medium text-foreground`, helper to `text-xs text-muted-foreground`.

**The monotone section heading:** Section heading is `text-lg text-gray-700` — barely distinguishable from body text. Fix: `text-2xl font-semibold tracking-tight text-foreground` with increased margin above.
