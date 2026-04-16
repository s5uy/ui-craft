# Contributing to UI Craft

---

## What This Repo Is

A behavioral system for Claude that produces premium, production-quality UI. Every addition must meet the quality bar of content written by a principal-level design systems team. Generic guidance, placeholder content, and vague principles have no place here.

---

## Before You Contribute

Read these files first:

1. `SKILL.md` — understand what this skill does and how it works
2. `core/philosophy.md` — understand the aesthetic target
3. `core/quality-bar.md` — understand the quality standard
4. `maintenance/categorization-rules.md` — understand where content belongs
5. `maintenance/naming-conventions.md` — understand naming standards

---

## Types of Contributions

### High value

- **Component pattern files** — detailed, production-quality patterns for component types not yet covered
- **Blueprint files** — new aesthetic direction for a genuinely distinct product category
- **Palette family files** — new family for a character not covered by existing 7 families
- **Industry files** — new industry not in the current 7
- **Example implementations** — complete, runnable, excellent quality demonstrations
- **Anti-pattern documentation** — specific, named failure modes with clear fixes

### Medium value

- **Refinement of existing files** — making existing content more specific, correcting errors
- **Prompt templates** — scaffolds for common generation tasks
- **Integration guidance** — setup patterns for common project configurations

### Low value / do not submit

- Typo fixes without substantive content changes
- Adding generic guidance that doesn't improve on existing content
- Adding content that duplicates what exists
- Examples that don't meet the quality bar

---

## Contribution Process

1. **Verify the gap exists** — search the repo before adding. Grep for the concept you're adding to ensure it doesn't already exist.

2. **Use the correct template** — every directory has a `_template.md`. Copy it. Fill it completely.

3. **Meet the quality bar** — run the checklist in `maintenance/review-checklist.md`.

4. **Update the index** — every new file must be referenced in its directory's `_index.md`.

5. **No placeholders** — if you can't fill a section, don't submit yet. Incomplete content is worse than no content.

---

## Quality Bar (Non-Negotiable)

Content must be:

- **Specific** — "use `font-mono tabular-nums` on all numeric values" not "make numbers look good"
- **Complete** — code examples are runnable, not truncated
- **Honest** — anti-patterns must name real, specific failure modes, not hypothetical ones
- **Defensible** — every guideline must have a reason that can be articulated

The test: would a senior designer or engineer find this content useful, or would they find it generic?

---

## What This Repo Is Not

This is not a component library. It is not a collection of templates. It is not a showcase of visual effects. Content that belongs in a component library, a CSS framework, or a design inspiration gallery does not belong here.
