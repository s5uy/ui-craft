# Component Triage System

When given a reference component to adapt, classify it before doing anything else. The classification determines the adaptation strategy.

---

## Triage Classes

### Class A — Strong Production Patterns

The interaction logic, structure, and integration patterns are solid. These are worth adapting directly into the design system.

**Characteristics:**
- Clean hook separation (logic not buried in JSX)
- Clear state model
- Real utility — solves a genuine UX problem
- Integration-ready (sensible props, standard event model)
- The value is in the behavior, not the visual effect

**Common Class A components:**
- Image upload surfaces with drag-and-drop, preview, and remove flows
- Toast notification systems with clean enter/exit behavior
- Typewriter/reveal text when used sparingly and without theatrical effects
- Pricing toggles (monthly/annual) with clean state
- Command palette / search with keyboard navigation
- Toggle and switch components with polished state transitions
- Skeleton loaders that handle loading states correctly

**Adaptation strategy:**
- Preserve the interaction logic entirely
- Preserve the hook/state model
- Restyle the surface to match the design system (neutral palette, no glow, no gradient)
- Normalize prop APIs if they are inconsistent
- Replace inline SVGs with Lucide icons where appropriate

---

### Class B — Good Interaction, Bad Styling

The interaction idea is strong. The surface treatment is not — it relies on effects that read as AI-generated or component-demo aesthetics.

**Characteristics:**
- The interaction pattern is useful
- The visual treatment is: glowing, gradient-heavy, or demo-oriented
- If the glow and gradients were removed, the component would still work and be valuable

**Common Class B components:**
- Spotlight/glow cards (good focus mechanic, bad lighting effect)
- Animated gradient border cards (good emphasis idea, wrong execution)
- Search bars with glow wrappers (good search interaction, bad surface treatment)
- Auth cards with dramatic lighting (good layout, excessive effect)
- Pricing sections with cosmic or glow backgrounds (good tier structure, bad atmosphere)
- Dashboard panels with gradient headers (good data layout, bad decoration)
- "Glass" cards with overdone blur (good layering idea, blown out)

**Adaptation strategy:**
- Extract the interaction model and preserve it completely
- Redesign the surface: remove glow, replace gradients with tonal neutrals
- Keep the structural composition (how elements are positioned relative to each other)
- Preserve hover/focus behavior but reduce its intensity
- The result should feel like "this but for a real product"

---

### Class C — Demo Theatrics

These components exist to demonstrate visual capabilities, not to solve UI problems. The value is primarily visual spectacle.

**Characteristics:**
- Impressive in isolation, unusable in context
- The entire value proposition is the visual effect
- Removing the effect leaves nothing of substance
- Designed for a component showcase, not a product

**Common Class C components:**
- Full-screen effect showcases with rotating gradients
- Multi-layer conic gradient wrappers used as backgrounds
- Decorative starfield or sparkle systems that overwhelm content
- Hue-cycling animated glow halos
- Cursor-following particle systems
- Components where the entire "interaction" is a visual spectacle with no functional output
- Search bars where the glow animation IS the feature

**Adaptation strategy:**
- Do not adapt these directly
- Identify the narrow useful idea (if any): the layout skeleton? a single interaction affordance?
- Extract only that narrow idea and redesign from scratch
- Reject the visual vocabulary entirely

---

## Category-Specific Adaptation Rules

### Spotlight and Glow Cards

Keep:
- The structural layout of the card
- Pointer-reactive lighting if extremely restrained (maximum: subtle brightness shift on hover)
- The content hierarchy inside the card

Reject:
- Radial gradient following cursor position at full intensity
- Hue-rotating borders
- Giant blur halos
- Multiple glowing cards competing on the same page

Replace with:
- Subtle border on hover (opacity 0.15 → 0.35)
- Mild shadow lift
- Background tone shift (neutral-800 → neutral-750 on hover in dark UI)

---

### Animated Gradient Borders

Keep (rarely):
- The intent to emphasize a primary/featured element

Reject:
- Animated gradient border as default card treatment
- Gradient borders on multiple elements
- Rainbow or multi-hue cycling borders

Replace with:
- Static higher-contrast border on the featured element
- Subtle accent-color edge on the selected/active state
- Inset shadow at the border position

---

### Glowing Search Bars

Keep:
- Compact layout
- Icon placement (search icon left, keyboard shortcut right)
- Keyboard shortcut affordance
- The interaction (focus state, clear button, result dropdown)

Reject:
- Conic gradient overlay behind the search field
- Animated glow mask on focus
- Decorative filter icon in its own glowing chamber
- The entire overbuilt animation wrapper

Redesign as:
- Clean input with border + subtle shadow on focus
- Neutral background, slightly elevated surface on focus
- One precise focus response (border color + mild shadow lift)

---

### Image Upload Surfaces

These are Class A. Preserve fully:
- Drag-and-drop zone with visual feedback (dashed border highlight on drag-over)
- File input indirection (hidden `<input type="file">` behind a styled zone)
- Preview with remove/reset flow
- File metadata display (name, size, type)
- Loading/progress states
- Error states (invalid file type, size limit)
- Hook separation (upload logic in a hook, not embedded in JSX)

Improve:
- Empty state copy (be specific about what types/sizes are accepted)
- Hover/focus polish (consistent with the design system)
- Error state typography

---

### Pricing Sections

Keep:
- Toggle behavior (monthly/annual with animated state transition)
- Tier hierarchy (3 tiers, clear feature differentiation)
- CTA placement
- The concept of a featured/recommended plan with visual emphasis

Reject:
- Glowing cosmic backgrounds behind the pricing cards
- Sparkle effects
- Gradient table headers
- Overbuilt featured card glow systems

The featured plan needs only:
- Slightly elevated surface (`bg-neutral-800` vs `bg-neutral-850` in dark mode)
- Stronger border (`border-neutral-500` vs `border-neutral-700` for others)
- Subtle badge ("Most popular" or "Recommended") — not glowing, not animated
- Tighter CTA emphasis

---

### Typewriter / Text Reveal Components

Use sparingly. Strong for:
- Hero headline moments where the product identity builds
- Terminal/command-line product UI where it is native to the metaphor
- Onboarding sequences where revealing information incrementally is purposeful

Weak when:
- Applied to every section heading
- Made too fast (becomes noise) or too slow (frustrating)
- Used where a static headline would be more confident
- The reveal adds nothing because the revealed text is mundane

If a typewriter effect is present: check whether removing it makes the headline stronger. Often it does.

---

### Toasts / Feedback

These are Class A. Preserve:
- Enter/exit animation (fade + slight translate)
- Semantic color use (success, error, warning, info)
- Action button within the toast (undo, dismiss, view)
- Stacking behavior for multiple toasts

Improve:
- Make copy specific and actionable, not generic ("File uploaded" vs "Changes saved successfully")
- Ensure icon + text hierarchy is correct (icon at the same weight level as title)
- Ensure the dismiss affordance is visible but not dominant

---

## The Adaptation Output Checklist

For every adapted component, verify:

- [ ] Interaction logic is fully preserved
- [ ] State model is correct and complete
- [ ] Surface treatment is neutral-first (no glow, no gradient dependency)
- [ ] Props are typed with explicit TypeScript interfaces
- [ ] Imports are correct and complete
- [ ] Component is placed in the correct folder (`/components/ui` for primitives)
- [ ] Hook logic is separated from render logic where appropriate
- [ ] All interaction states are handled (empty, hover, focus, loading, error, success)
- [ ] Component passes the quality bar
