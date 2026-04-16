# UI Craft

A premium UI/UX generation skill for Claude. Produces interfaces that feel handcrafted, restrained, and production-ready — not assembled from AI defaults.

---

## Installation

### Current Installation Method (npm)

**Install globally:**
```bash
# Install CLI globally
npm install -g @s5uy/ui-craft

# Go to your project
cd /path/to/your/project

# Install for your AI assistant
ui-craft init --ai claude      # Claude Code
ui-craft init --ai cursor      # Cursor
ui-craft init --ai windsurf    # Windsurf
ui-craft init --ai antigravity # Antigravity
ui-craft init --ai copilot     # GitHub Copilot
ui-craft init --ai kiro        # Kiro
ui-craft init --ai codex       # Codex CLI
ui-craft init --ai qoder       # Qoder
ui-craft init --ai roocode     # Roo Code
ui-craft init --ai gemini      # Gemini CLI
ui-craft init --ai trae        # Trae
ui-craft init --ai opencode    # OpenCode
ui-craft init --ai continue    # Continue
ui-craft init --ai codebuddy   # CodeBuddy
ui-craft init --ai droid       # Droid (Factory)
ui-craft init --ai kilocode    # KiloCode
ui-craft init --ai warp        # Warp
ui-craft init --ai augment     # Augment
ui-craft init --ai all         # All assistants
```

**Or use npx (no installation needed):**
```bash
npx @s5uy/ui-craft@latest init --ai [assistant-name]
```

After installation, restart your AI assistant and the skill will be automatically available.

---

## What This Does

When active, this skill reshapes how Claude approaches UI and frontend generation. It encodes a principal-level design philosophy, a palette selection framework, component adaptation judgment, and production-quality engineering standards.

The result is output that could plausibly have come from a senior product designer and frontend engineer at a high-end product company — not from an AI pattern-matching against common design trends.

---

## What Makes It Different

Most AI UI generation defaults to the same visual vocabulary:
- Purple-blue gradient heroes
- Three-column icon card grids
- Glowing CTA buttons
- Spotlight hover cards
- Generic SaaS layouts

This skill explicitly rejects those defaults. It replaces them with:
- A 9-question design decision model that establishes a point of view before generating anything
- A restraint-first aesthetic: neutral palettes, strong typography, earned motion
- Palette selection based on product type, audience, and emotional register — not presets
- Component adaptation that separates interaction quality from surface styling
- Anti-pattern guidance that prevents the most common AI output failures

---

## Capabilities

| Task | Quality target |
|---|---|
| Landing pages / homepages | Blueprint-specific, palette-matched, hierarchy-first |
| SaaS dashboards | Data-first, non-decorative, believable UI |
| Auth pages | Brand-aligned, focused, no VFX showcase |
| Pricing sections | Credible, scannable, sober |
| Settings pages | Document-layout discipline, clear form hierarchy |
| Hero sections | Typographic-first, atmospheric without gimmicks |
| Feature sections | Structured without icon-grid defaults |
| Navigation | Justified structure, not template-applied |
| Buttons / CTAs | Tactile, crafted, with real interaction states |
| Form systems | Calm, readable, premium |
| Upload components | Full drag-drop-preview-remove flow |
| Toast systems | Product-native, semantic, polished |
| Search bars | Precise, utility-first, no glow ornamentation |
| Component adaptation | Interaction preserved, surface redesigned |

---

## Stack

All generated code assumes:
- **React** + **Next.js**
- **Tailwind CSS**
- **TypeScript**
- **shadcn** component conventions
- **Framer Motion** for animation
- **Lucide React** for icons

---

## Repository Structure

```
ui-craft/
├── SKILL.md              # Entry point — behavioral router
├── core/                 # Stable design philosophy and rules
├── decisions/            # Design judgment frameworks
├── blueprints/           # Style direction systems (A–E)
├── palettes/             # Adaptive palette selection system
├── components/           # Component pattern references
├── anti-patterns/        # What to avoid and why
├── prompts/              # Reusable generation scaffolds
├── integration/          # shadcn/Tailwind/Next.js setup guidance
├── examples/             # Complete working reference implementations
└── maintenance/          # Governance and contribution rules
```

See `maintenance/` for how to add new content to any directory.

---

## Core Philosophy

**Hierarchy first.** The user must immediately know what this is, why it matters, where to look first, and what to do next.

**Typography carries the design.** Hierarchy, contrast, and richness come from type before color or effects.

**Gradients are not a default.** A premium design survives with almost no gradient usage. Gradients require explicit justification.

**Restraint is part of quality.** A strong design often comes from what is omitted. Do not add sections, effects, or flourishes unless they clearly improve the interface.

**Anti-AI-slop is non-negotiable.** The output must not be recognizable as AI-generated from its visual patterns.

---

## Quality Standard

Every output is validated against:
- Does this feel specific to this product, not generic?
- Does this avoid common AI-generated layout patterns?
- Does the hierarchy feel sharp?
- Does the motion feel premium, not noisy?
- Does the code feel like a senior engineer wrote it?
- Would this feel credible next to Vercel, Linear, or Stripe?

---

## Extending This Skill

See `maintenance/` for how to:
- Add a new component pattern
- Add a new palette family
- Add a new blueprint (style direction)
- Add a new prompt template
- Add a new working example

All additions follow the conventions defined in `maintenance/naming-conventions.md` and `maintenance/categorization-rules.md`.
