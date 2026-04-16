# Blueprint: Enterprise Neutral

## Overview

**Mood:** Trustworthy, systematic, sober, information-dense, efficient

**Best for:**
- B2B SaaS products targeting businesses rather than consumers
- Admin panels and management interfaces
- Internal tools and operations software
- Compliance-adjacent products (legal, HR, finance, security)
- Products where the buyer is a procurement team or IT department
- Multi-step workflows with high information density
- Settings, billing, and account management pages

**Not for:**
- Consumer-facing products where warmth and approachability are required
- Creative or artistic contexts
- Products that need to signal disruption or bold vision
- Startup marketing pages where brand differentiation matters

---

## Visual Traits

The defining quality is **systematic reliability**. Every element is where users expect it. The hierarchy is clear without being dramatic. Nothing surprises — and that is the intention. Trust in enterprise contexts comes from predictability.

Light mode is the default for this blueprint. Enterprise users work in well-lit offices on large monitors. Dark mode is a feature, not the primary expression.

Layout is structured and grid-based. Sidebars are persistent. Navigation is consistent. Tables are a primary content type. Forms are a primary interaction type. The page feels like a professional instrument — not a consumer app, not a marketing site.

Color usage is conservative. Neutral grays with one functional accent (usually a restrained blue or a muted teal). Semantic status colors are precise and consistent throughout the product. No decorative color.

Typography is workmanlike rather than expressive — readable at density, consistent in hierarchy, never calling attention to itself.

---

## Suggested Palette

**Light mode (primary):**

**Background:** `#F9FAFB` (gray-50)
**Surface:** `#FFFFFF`
**Surface subtle:** `#F3F4F6` (gray-100)
**Border:** `#E5E7EB` (gray-200)
**Border subtle:** `#F3F4F6` (gray-100)
**Primary text:** `#111827` (gray-900)
**Secondary text:** `#6B7280` (gray-500)
**Muted text:** `#9CA3AF` (gray-400)
**Accent:** `#2563EB` (blue-600) — or `#0891B2` (cyan-600) for a less common feel
**Accent hover:** `#1D4ED8` (blue-700)
**Positive:** `#059669` (emerald-600)
**Warning:** `#D97706` (amber-600)
**Danger:** `#DC2626` (red-600)

**Dark mode (secondary):**

**Background:** `#111827` (gray-900)
**Surface:** `#1F2937` (gray-800)
**Surface subtle:** `#374151` (gray-700)
**Border:** `#374151` (gray-700)
**Primary text:** `#F9FAFB`
**Secondary text:** `#9CA3AF`
**Accent:** `#3B82F6` (blue-500)

**Palette logic:** This blueprint uses standard Tailwind gray + blue not because they're exciting but because they're correct for the context. Enterprise users recognize and trust this visual language. A restrained cyan or slate blue can provide differentiation within the convention. Do not attempt to make this palette "premium" with clever neutrals — the conventionality IS the product decision.

---

## Typography Direction

**Workmanlike, consistent, readable at density.**

**Typeface:** Inter is ideal — designed for readability at small sizes, has tabular variants, optimized for UI. System UI stack is also acceptable. Do not use display or expressive typefaces.

**Scale:**
- Page headings: 20–24px, `font-semibold`
- Section headings: 16–18px, `font-semibold`
- Table headers: 12px, `font-medium`, uppercase with `tracking-wide`
- Body text: 14px, `font-normal`
- Labels and captions: 12–13px, `font-normal` or `font-medium`
- Metadata and timestamps: 12px, secondary text color

**Weight contrast:** Moderate, not dramatic. `font-semibold` for headings, `font-normal` for body. No heavy weight headlines — this is not a marketing page.

**Tabular figures:** Use `font-variant-numeric: tabular-nums` on all numeric data — tables, metrics, financial figures.

---

## Spacing Logic

Efficient, not generous. Every pixel is productive.

- Page-level padding: 24–32px horizontal, 24–32px top
- Section spacing: 32–48px between major sections
- Form group spacing: 20–24px between field groups, 16px between fields
- Table row height: 40–48px
- Card padding: 16–20px

Sidebar width: 240–260px (fixed) or 64px (icon-only collapsed state).

The layout must feel like it fits on one screen where possible. Enterprise users resist scrolling through sparse content. Dense information, well-organized, is the target.

---

## Motion Tone

**Minimal and functional.** Animation exists only to prevent disorientation during state transitions. It does not create atmosphere.

- Sidebar collapse/expand: `duration-200` slide
- Tab switching: `duration-150` opacity fade
- Modal open/close: `duration-200` fade + `scale-98 → scale-100`
- Toast appearance: `duration-200` slide from top-right
- Table row actions: `duration-100` background color fade on hover
- Page transitions: none, or `duration-150` opacity only

Do not use scroll-triggered reveals, staggered entrance animations, or any motion that is not directly triggered by a user action or data update. Enterprise users are in task-completion mode — decorative motion creates cognitive friction.

---

## Surface Treatment

**Clean, elevated, systematic.**

Light surfaces with subtle separation:
- White panels on gray-50 backgrounds — visible but quiet separation
- 1px gray-200 borders — consistent, not decorative
- Subtle drop shadows on modals and dropdowns: `0 4px 16px rgba(0,0,0,0.08)` — not flat, but not dramatic
- Active/selected states: blue-50 background with blue-600 left border accent (the classic admin pattern)

No glass effects. No frosted surfaces. No gradient headers. The surface treatment is utilitarian — it organizes, separates, and signals state without calling attention to itself.

**Focus states must be explicit** for accessibility: `outline: 2px solid blue-600; outline-offset: 2px`. Never remove focus rings.

---

## Component Vocabulary

- `<AdminLayout />` — persistent sidebar + header + main content area
- `<DataTable />` — sortable, filterable, paginated table with column resizing
- `<FilterBar />` — search + multi-select filter chips + sort dropdown
- `<StatusBadge />` — compact semantic status indicator (active, pending, error, archived)
- `<FormSection />` — labeled group of form fields with consistent spacing
- `<BreadcrumbNav />` — location indicator for deep navigation hierarchies
- `<ConfirmDialog />` — destructive action confirmation modal
- `<EmptyState />` — empty table/list state with CTA
- `<PaginationBar />` — table pagination with page size selector
- `<InlineEdit />` — click-to-edit table cell or field
- `<CommandBar />` — global search/command interface (Cmd+K)
- `<PermissionGate />` — UI element that reflects role-based access state

---

## Anti-Patterns for This Blueprint

**Trying to make it "premium."** Enterprise Neutral does not need to look exciting — it needs to look trustworthy and efficient. Adding subtle gradients, glass panels, or refined spacing in an attempt to "elevate" the aesthetic often just breaks the systematic reliability that users depend on.

**Dark mode as the primary expression.** Most enterprise tools are used in daylight, in browser, by users who have not changed any preferences. Design light mode first, dark mode as a secondary option.

**Expressive typography.** A display serif or a bold headline treatment is wrong here. Nothing should draw attention to the typography itself.

**Inconsistent status colors.** In an enterprise product, if "active" is green in the user table, it must be green everywhere. If you use amber for "pending" in one place and blue for "pending" in another, the product has failed.

**Sparse spacing as a luxury signal.** Large spacing that leaves most of the screen empty is wrong for this context. Users are managing real data and need density. Generous spacing reads as an incomplete product.

**Decorative empty states.** Empty states in enterprise tools should be actionable ("Add your first user →") not illustrated with whimsical art. Friendly illustration is wrong for the trust register.

---

## Example Products

- **GitHub** — dense, systematic, consistent status language, navigation-heavy
- **Notion** — information density with consistent component language
- **Stripe Dashboard** — clean enterprise UI, consistent form patterns, strong data tables
