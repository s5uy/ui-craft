# Component Adaptation Rules

When working from a reference component (from a library, design system, or inspiration source), the adaptation process is not "copy and restyle." It is a structured extraction of what works, combined with disciplined rejection of what doesn't.

---

## The Adaptation Mindset

Reference components often have correct interaction mechanics with poor surface styling — or occasionally, impressive visual style with technically weak interaction patterns. The goal is to extract the interaction quality and apply it to a surface that fits the target aesthetic and palette.

Never clone surface aesthetics wholesale. Surface aesthetics are often the most context-dependent and least transferable aspect of a reference component.

---

## Pre-Adaptation Questions

Before adapting any component, answer these:

1. **What does this component do that is correct?** Name the specific interaction behaviors, motion patterns, or state management that work well.
2. **What does this component do that is aesthetic decoration?** Name the specific visual choices that are about visual appeal rather than function.
3. **What class is this component?** (Class A — use the pattern; Class B — adapt interaction, replace surface; Class C — reject entirely) See `decisions/component-triage.md` for classification criteria.
4. **What blueprint context will this live in?** The same component adapted for Command Center looks and behaves very differently than adapted for Editorial Warm.
5. **What palette context?** Accent color, surface hierarchy, border style all depend on palette.

---

## Class-Based Adaptation Protocols

### Class A: Strong Production Component

*Definition: The component has correct interaction mechanics, accessible markup, good state handling, and surface styling that either fits the target context or can be swapped with minimal structural change.*

**Protocol:**
1. Use the component's interaction and state logic directly
2. Replace surface tokens (colors, radii, shadows) to match target palette
3. Audit the TypeScript interface for any `any` types or missing state
4. Verify focus ring implementation
5. Remove any decorative elements not tied to function (glow effects, unnecessary animations)

**What stays:** Component logic, state management, accessibility attributes, animation timing
**What goes:** Specific color values, glow effects, gradient backgrounds, decorative transforms

### Class B: Good Interaction, Poor Surface

*Definition: The interaction model and mechanics are correct but the visual styling is either generic AI output, inconsistent with the target context, or actively harmful (gradients, glow, excessive effects).*

**Protocol:**
1. Extract the interaction model and motion pattern only — do not copy any styling
2. Rebuild the component surface from scratch using target palette and blueprint
3. Preserve: event handlers, state transitions, animation timing values (not animation effects)
4. Replace: all className styling, all decorative motion, all color choices

**Example:** A spotlight search component has excellent keyboard navigation, result grouping logic, and focus management — but uses a glowing border and gradient background. Extract the navigation logic. Rebuild the surface as a clean bordered overlay on the target palette.

### Class C: Demo Component — Reject

*Definition: The component's primary purpose is visual demonstration or trend performance. The interaction mechanics are either absent, trivial, or wrong. The component is fundamentally decorative.*

**Common Class C components:**
- Typewriter text animations used as UI elements
- Particle/constellation backgrounds
- Spotlight/cursor-glow effects
- Glassmorphism panels without functional purpose
- 3D card tilt effects (unless there is genuine spatial reasoning behind it)
- Animated gradient text used as headings
- Noise/grain texture overlays

**Protocol:**
1. Do not adapt. Do not include.
2. Identify what functional need the component was attempting to address (e.g., "animate the hero headline")
3. Address that need through a legitimate, functional pattern instead

---

## Surface Adaptation Rules

When replacing the surface styling of a Class B component:

### Colors

- Replace all hard-coded color values with semantic tokens from the target palette
- Do not preserve any gradients unless they pass the 3-condition gradient test in `core/gradient-policy.md`
- Accent color appears only on elements that meet the scarcity rule from `palettes/accents/`

### Borders and Separation

- Replace glow-based separation with actual borders or background contrast
- Border style follows blueprint context: sharp in Brutalism, subtle in Spatial Immersive, clean in Enterprise Neutral
- Use `border-border` or the palette-specific border token, not hard-coded hex

### Shadows

- Remove all colored/glow shadows
- In Enterprise Neutral or High-trust contexts: subtle single-axis shadows only (`shadow-sm`, `shadow-md`)
- In Command Center: no shadows — depth through background tonal layering
- In Spatial Immersive: shadows only on elevated surfaces (modals, dropdowns), very diffuse
- In Editorial Brutalism: hard shadows (`shadow-[4px_4px_0_0_theme(colors.gray.900)]`) or none

### Border Radius

- Match blueprint convention:
  - Command Center: `rounded` or `rounded-md` (tight, technical)
  - Spatial Immersive: `rounded-lg` to `rounded-2xl` (generous but not bubbly)
  - Editorial Brutalism: `rounded-none` or `rounded-sm` (hard edges)
  - Enterprise Neutral: `rounded-md` (functional, moderate)
  - Editorial Warm: `rounded-md` to `rounded-lg` (approachable)

---

## Animation Adaptation Rules

When adapting motion from a reference component:

**Preserve:**
- Timing values that create responsive, tactile feel (under 200ms for micro-interactions)
- Easing curves that create physicality (ease-out for entering, ease-in for exiting)
- Stagger timing for list/grid reveals

**Replace:**
- Any animation that calls attention to itself rather than serving the interaction
- Spring animations with excessive bounce (damping under 15, stiffness over 300)
- Any animation on an element the user didn't interact with
- Page-load animations that delay content visibility

**Reference `core/motion-standard.md` for all timing defaults.**

---

## Accessibility Adaptation Rules

Every adapted component must preserve or improve accessibility. Specifically:

- `focus-visible` ring must be present and visible — use accent color or strong neutral
- All interactive elements must have appropriate ARIA roles if not native HTML
- `aria-disabled` on disabled states, not just visual graying
- Color must not be the sole differentiator for any state (use shape, text, or icon in addition)
- Keyboard navigation must work completely for interactive components

If the reference component has no focus ring, you must add one. If it has an invisible focus ring (e.g., `outline-none` without replacement), you must replace it.

---

## Output Quality Check

After adapting any component, verify:

- [ ] All props have explicit TypeScript types (no `any`)
- [ ] All imports are present and correct
- [ ] No placeholder content (lorem ipsum, `TODO`, `placeholder text`)
- [ ] Focus ring is visible and correct
- [ ] Hover state is implemented
- [ ] Disabled state is implemented if applicable
- [ ] No gradient survives unless it passed the 3-condition test
- [ ] No glow effect (box-shadow with blur, text-shadow for decoration)
- [ ] Accent color used only where justified by scarcity rule
- [ ] `"use client"` present if component uses hooks or browser APIs
