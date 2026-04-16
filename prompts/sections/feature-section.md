# Section Prompt: Feature Section

---

## Generation Scaffold

```
Generate a feature section for [product name].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]

**Layout variant:** [icon-grid / alternating / feature-list]

**Features:**
[For each feature, provide: name, benefit description (outcome-focused), icon name from lucide-react]

Feature 1:
- Name: [name]
- Description: [what the user gets — not what the feature does]
- Icon: [lucide icon name]
- Size: [primary/secondary — for alternating layout]

[repeat for each feature]

**Section heading:** "[outcome-focused heading, not 'Features']"
**Section subheading (optional):** "[clarifies the theme]"

**Anti-patterns:**
- No colored icon blobs (no `bg-blue-100 rounded-xl` containers)
- No gradient on cards or section background
- Feature descriptions must describe user outcomes, not feature names
- If icon-grid: icons bare on neutral backgrounds or no containers
- If alternating: primary features have product visual placeholder

**Output the complete feature section component.**
```

---

## Layout Selection Guide

| Use case | Layout |
|---|---|
| 6–9 equal-weight features | Icon grid (3-col) |
| 2–4 primary features with visuals | Alternating split |
| Many specific technical capabilities | Feature list (text only) |
| Mixed primary + supporting | Alternating primary + grid secondary |
