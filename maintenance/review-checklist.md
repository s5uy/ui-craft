# Review Checklist

Run this checklist before merging any new content into the repo.

---

## For All Content Types

- [ ] File is in the correct directory (see `categorization-rules.md`)
- [ ] File name follows naming conventions (see `naming-conventions.md`)
- [ ] File is referenced in the relevant `_index.md`
- [ ] No placeholder content (`TODO`, `[placeholder]`, lorem ipsum)
- [ ] No duplicate content (grep for key phrases before adding)
- [ ] Content is specific, not generic ("use appropriate colors" is not acceptable guidance)

---

## For Component Pattern Files

- [ ] Mental model is clear and specific (not "this component shows content")
- [ ] Anatomy table covers all meaningful parts
- [ ] All interaction states documented (default, hover, focus, disabled, loading as applicable)
- [ ] At least one complete, runnable code example (no `// ...` truncation)
- [ ] TypeScript interface is explicit (no `any`)
- [ ] Quality benchmarks are verifiable, not vague
- [ ] Anti-patterns are specific to this component type
- [ ] Blueprint-specific notes cover all 5 blueprints

---

## For Blueprint Files

- [ ] Visual traits include specific values (not "dark background" — `#050505`)
- [ ] Motion tone includes specific timing values
- [ ] Component vocabulary shows how standard components look in this context
- [ ] Anti-patterns describe what would violate this blueprint specifically
- [ ] Example products are real, recognizable products

---

## For Palette Files

- [ ] All hex values are specific and accurate
- [ ] Variation axes describe how to adjust within the family
- [ ] Accent compatibility table covers recommended and avoid cases
- [ ] Example instances use complete palettes (all roles filled)
- [ ] Blueprint affinity table covers all 5 blueprints

---

## For Code Examples

- [ ] TypeScript strict mode compatible (no implicit any, no missing types)
- [ ] All imports present
- [ ] No placeholder content — realistic dummy data
- [ ] All states implemented (loading, error, empty where applicable)
- [ ] Responsive (mobile breakpoints handled)
- [ ] No gradient backgrounds or gradient text
- [ ] No glow effects
- [ ] Focus rings present on all interactive elements
- [ ] README present with design decisions documented

---

## For Prompt Templates

- [ ] Pre-generation decisions are specific and answerable
- [ ] Generation scaffold has clear `[variable]` placeholders
- [ ] Quality criteria checklist is verifiable
- [ ] Anti-patterns listed are specific to this prompt type

---

## The One Question

After reviewing: **Does this content meet the quality bar of a public repo maintained by a principal-level design systems team?**

If no: revise before merging.
