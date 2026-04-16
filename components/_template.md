# [Component Name] Patterns

<!-- Copy this template when adding a new component pattern file. Fill every section. Delete comments. -->

---

## Mental Model

[1-2 sentences on what this component fundamentally is and what it communicates to the user. What job does it do? What does it signal?]

---

## Anatomy

[List the required structural parts of this component. Be specific — not "container and content" but the actual named parts. For each part, note its role.]

| Part | Role | Required? |
|---|---|---|
| [Part name] | [What it communicates/does] | Yes/No |

---

## Interaction States

[Document every state the component must handle. For each state, describe the visual treatment and what triggers it.]

| State | Trigger | Visual treatment |
|---|---|---|
| Default | — | [Description] |
| Hover | Mouse enter | [Description] |
| Focus | Keyboard navigation | [Description] |
| Active/Pressed | Mouse/touch down | [Description] |
| Disabled | `disabled` prop | [Description] |
| [Additional states] | [Trigger] | [Description] |

---

## Implementation

[Core implementation guidance — the non-obvious decisions that produce quality output. Include complete, working code examples for the primary pattern.]

```tsx
// Primary pattern — [name it]
[complete working code]
```

### Variants

[If the component has meaningful variants, document each with a brief description and code example.]

```tsx
// Variant: [name]
[code]
```

---

## Integration Notes

**With shadcn:** [How does this component relate to shadcn primitives? Use directly? Adapt? Build from scratch?]

**With Tailwind:** [Any non-obvious Tailwind patterns or utilities critical to this component?]

**With Framer Motion:** [Does this component use motion? If so, what pattern?]

**TypeScript interface:**
```tsx
interface [ComponentName]Props {
  // [required props]
}
```

---

## Quality Benchmarks

A production-grade [component name] must:

- [Benchmark 1 — a specific, verifiable quality bar]
- [Benchmark 2]
- [Benchmark 3]
- [Accessibility: what WCAG criteria apply?]

---

## Anti-Patterns

**[Anti-pattern name]:** [What AI typically does wrong here, and why it fails.]

**[Anti-pattern name]:** [...]

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | [How this component looks/behaves in Command Center context] |
| Spatial Immersive | [Spatial Immersive context] |
| Editorial Brutalism | [Brutalism context] |
| Enterprise Neutral | [Enterprise context] |
| Editorial Warm | [Warm editorial context] |
