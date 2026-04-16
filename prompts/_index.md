# Prompt Templates — Index

Reusable generation scaffolds for common UI output requests. Each prompt template provides: context framing, pre-generation decision requirements, a generation scaffold, quality criteria, and anti-patterns to reject.

---

## How to Use

1. Find the prompt template closest to your request
2. Fill in the variables (marked with `[brackets]`)
3. Answer the pre-generation decision questions before generating
4. Use the generation scaffold as the structure for output
5. Verify output against quality criteria before delivering

---

## Pages

Full-page generation scaffolds. Use when building an entire route.

| File | Page type | Key decisions |
|---|---|---|
| `pages/homepage.md` | Marketing / landing page | Blueprint, palette, CTA goal |
| `pages/dashboard.md` | App dashboard | Density, primary metric, navigation layout |
| `pages/pricing-page.md` | Pricing and plans | Tiers, billing toggle, recommended tier |
| `pages/auth-page.md` | Login / signup / forgot | OAuth providers, brand weight |
| `pages/settings-page.md` | User / account settings | Section structure, density |

## Sections

Section-level scaffolds. Use when adding a section to an existing page.

| File | Section type | Key decisions |
|---|---|---|
| `sections/hero-section.md` | Hero / above-the-fold | Layout (centered/split), social proof type |
| `sections/feature-section.md` | Feature grid / list | Layout variant, icon usage |
| `sections/testimonial-section.md` | Social proof / testimonials | Static grid vs. other, quote depth |
| `sections/footer.md` | Page footer | Link structure, brand presence |

## Components

Component-level scaffolds. Use when generating a specific UI component.

| File | Component type | Key decisions |
|---|---|---|
| `components/button-system.md` | Full button variant system | Blueprint, variant count |
| `components/form-system.md` | Complete form with validation | Fields, validation library |
| `components/toast-system.md` | Toast notification system | Library (Sonner vs. custom) |
| `components/upload-component.md` | File upload with full lifecycle | File types, size limit, multi-file |
| `components/search-bar.md` | Search with results | Async vs. local, result grouping |

## Refinement

Transformation prompts. Use when fixing or upgrading existing AI-generated output.

| File | Transformation | What it does |
|---|---|---|
| `refinement/de-slop.md` | Remove AI clichés | Strips gradients, glows, generic patterns |
| `refinement/de-gradient.md` | Gradient removal | Targeted gradient replacement |
| `refinement/de-glow.md` | Glow removal | Targeted glow effect removal |
| `refinement/tighten-hierarchy.md` | Improve visual hierarchy | Scale, weight, contrast corrections |
| `refinement/production-ready.md` | Demo → production | Removes placeholder content, fixes code quality |

## Adaptation

Reference component adaptation workflows.

| File | Workflow | Use when |
|---|---|---|
| `adaptation/adapt-reference.md` | Adapt a reference component | Working from a Class A/B reference component |
| `adaptation/shadcn-integration.md` | Integrate with shadcn | Adding to an existing shadcn project |
