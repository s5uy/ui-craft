# Adaptation Prompt: Adapt a Reference Component

Use when working from a reference component (from a library, design showcase, or inspiration source). This prompt extracts what's valuable and replaces what's wrong.

---

## Pre-Adaptation

Before generating, classify the reference component:

**Class A** (strong interaction, good surface): Use the pattern directly, replace surface tokens
**Class B** (good interaction, poor surface): Extract interaction model only, rebuild surface
**Class C** (demo/decorative, no real function): Reject entirely, identify the functional need and address it differently

---

## Generation Scaffold (Class A or B)

```
Adapt this reference component for [product name].

**Reference component description:** [describe what it does — the interaction model and mechanics]

**What to PRESERVE from the reference:**
- [List specific interaction behaviors, motion patterns, state management, keyboard handling worth keeping]

**What to REPLACE:**
- All gradient backgrounds → [solid palette color]
- All glow/shadow effects → removed
- All hard-coded colors → CSS variable tokens from target palette
- [Any specific surface elements to change]

**Target context:**
- Blueprint: [chosen]
- Palette: [chosen]
- Accent: [color]

**Surface replacement rules:**
- Background: [target palette background token]
- Border: `border-border` or [specific value]
- Text: `text-foreground` / `text-muted-foreground`
- Interactive states: hover via `hover:bg-muted`, focus via `ring-2 ring-ring`
- Border radius: [rounded-md / rounded-lg / rounded-none per blueprint]

**Accessibility requirements:**
- Focus ring must be visible via `focus-visible:ring-2 focus-visible:ring-ring ring-offset-2`
- All custom interactive elements need appropriate `role` and `aria-*` attributes
- Color cannot be the sole state differentiator

**Code requirements:**
- TypeScript with explicit prop interfaces
- All imports present
- `"use client"` if hooks or browser APIs are used

**Output the complete adapted component. Preserve all interaction mechanics from the reference; replace all surface styling.**
```

---

## For Class C (Reject)

```
The reference component [describe it] is a demo/decorative component. Do not adapt it.

**What functional need was it addressing?** [identify the real need]

**Alternative approach:** [describe a functional, production-appropriate solution]

Generate [the alternative] for [product name] instead.
```
