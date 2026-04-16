# Section Prompt: [Section Name]

---

## Pre-Generation Decisions

1. **Product context:** (what is the product, who is the user)
2. **Blueprint:** (determines spacing, corner radius, surface treatment)
3. **Palette:** (determines background, text, and border tokens)
4. **Accent:** (color + where it appears — do not default to accent on everything)
5. **Layout variant:** (available variants for this section type)
6. **Content inputs:** (the specific copy, data, or items that populate this section)
7. **Animation:** none / subtle entrance / scroll-triggered

---

## Generation Scaffold

```
Generate a [section name] section for [product name].

**Product context:** [one sentence — what the product is, who uses it]

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]
- Accent: [color and usage rule]

**Layout:** [chosen variant]

**Content:**
[Provide the actual content inputs — headlines, body copy, items, data. Do not ask Claude to invent them unless you want generic output.]

**Behavior:**
- Animation: [none / entrance fade / scroll-triggered stagger]
- Interactive states: [hover effects if applicable]

**Constraints:**
- No gradient backgrounds or fills
- No glow or drop-shadow decoration
- No decorative icon containers with colored backgrounds
- Responsive: stack on mobile, [layout] on md:

**Output the complete section component. All imports present. TypeScript throughout.**
```

---

## Quality Criteria

Before delivering, verify:

- [ ] Section content is product-specific, not generic filler
- [ ] Visual hierarchy is clear — one dominant element per section
- [ ] Accent appears at most once in the section, on the highest-priority element
- [ ] No gradient backgrounds or text gradients
- [ ] No glow effects
- [ ] All interactive elements have hover/focus states
- [ ] Responsive layout works at mobile and desktop

---

## Anti-Patterns to Avoid

- Centered icon grids with gradient-filled icon containers
- Section headings that are questions ("Ready to get started?")
- Decorative dividers, blobs, or background shapes
- Animation on every element — animate the section entrance, not each atom
- Copy that names the feature rather than describing the outcome
