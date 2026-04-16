# Design Decision Model

Run through all nine questions before generating any UI. The answers determine blueprint, palette, layout, component choices, and what to avoid. Do not skip this. Do not generate defaults first and rationalize decisions afterward.

---

## The Nine Questions

### 1. What kind of product, brand, or company is this?

Establish the product category before anything else:

- **SaaS product** — B2B or B2C? Self-serve or sales-led? Developer-facing or non-technical?
- **Agency or studio** — Creative services, consultancy, design, development?
- **Consumer app** — Mobile-first? Social? Productivity? Entertainment?
- **Enterprise platform** — Internal tools, compliance-heavy, multi-user, admin-heavy?
- **Content/media** — Editorial, publication, documentation?
- **Ecommerce** — DTC brand, marketplace, catalog?
- **Technical tool** — CLI, API product, infrastructure, developer experience?

The product category sets constraints on everything else. An enterprise compliance tool and a consumer lifestyle app have almost nothing in common in terms of visual approach.

---

### 2. Who is the audience?

Define the specific user, not just a demographic:

- **Technical sophistication** — developers who read code, non-technical users who need hand-holding, or mixed?
- **Usage context** — work tool used for hours daily, consumer app used in moments, or reference resource?
- **Trust expectations** — does the user need to trust this product with money, data, or health?
- **Visual literacy** — users who can parse dense UI vs. users who need explicit guidance?
- **Device context** — desktop-first, mobile-first, or genuinely equal?

A design that works for a developer tool will feel cold and alienating to a consumer audience. A design that works for a consumer app will feel frivolous to an enterprise buyer.

---

### 3. What should this feel like emotionally?

Pick a primary emotional register and two supporting qualities:

| Primary | Supporting examples |
|---|---|
| Calm | Clear, assured, steady |
| Energetic | Dynamic, motivating, fast |
| Severe | Precise, uncompromising, focused |
| Warm | Approachable, human, inviting |
| Authoritative | Trustworthy, established, serious |
| Playful | Light, creative, unexpected |
| Technical | Exact, monospaced, data-driven |

The emotional register determines: color temperature, type weight choices, spacing density, animation energy, and surface treatment.

---

### 4. What layout system best fits the content?

Match the layout to the information structure, not to a template:

- **Editorial layout** — for content-first, reading-oriented, or story-driven pages
- **Dashboard grid** — for data-dense, multi-panel, monitoring interfaces
- **Asymmetric composition** — for marketing pages that need visual energy and non-formula structure
- **Document layout** — for settings, forms, configuration, step-based flows
- **Canvas/spatial** — for product demos, interactive showcases, feature spotlights
- **Hybrid** — marketing top + app screenshot + feature detail is common for SaaS homepages

The layout system determines column structure, spacing logic, and how sections relate to each other.

---

### 5. What makes this design specific rather than generic?

This is the most important question.

Identify the one or two things that will make this interface feel designed for *this* product, not for any product:

- Is it the palette choice? (Near-black with a single acid green accent for a monitoring tool)
- Is it the typographic approach? (Tabular monospace for metrics in a financial product)
- Is it the structural choice? (Horizontal scrolling timeline on a project management page)
- Is it the motion? (Magnetic button behavior that matches a spatial/creative brand)
- Is it the information hierarchy? (Metric rails instead of card grids for a dashboard)

If you cannot name at least one specific decision, the design will default to generic. Name it first, then build around it.

---

### 6. What should be removed to avoid filler?

Ask: what sections, effects, or elements are present by default convention that this specific product does not need?

Common filler to consider removing:
- Testimonials section — does this product actually benefit from social proof in this context?
- Pricing section — is this a page where pricing belongs?
- Feature icon grid — is this the best way to present these features, or just the easiest?
- Footer nav — does this page need a full sitemap in the footer?
- Hero animation — is there a scroll animation in the hero because it helps, or because it looks impressive?

Every section must earn its place. The question is not "what should I add?" but "what can I remove?"

---

### 7. What would a real designer choose NOT to do here?

Think about the three most tempting visual decisions for this product type and actively reconsider them:

- **For SaaS homepage:** The gradient hero background. The glowing CTA button. The three-column icon grid.
- **For dashboard:** The identical card grid. The gradient header. The decorative chart.
- **For auth page:** The full-screen decorative panel. The animated background. The gradient button.
- **For pricing page:** The glowing featured plan card. The sparkle effects. The gradient table header.

Name the temptations explicitly before generating. Then reject them if they are not genuinely justified.

---

### 8. Which effects are tempting but should be rejected?

Be specific. Name the exact effects being rejected for this design:

- "I will not use a spotlight gradient behind the hero headline"
- "I will not use animated gradient borders on the pricing cards"
- "I will not use a mesh gradient in the background"
- "I will not use a glowing CTA button with pulsing animation"

This is a commitment. It prevents the "well, just a little glow" drift that corrupts AI output quality.

---

### 9. Which one or two interaction ideas are actually worth keeping?

From all the possible interaction patterns, identify the one or two that genuinely add value for this product:

- **Worth keeping for a marketing site:** Scroll-triggered section reveals + magnetic CTA button
- **Worth keeping for a dashboard:** Live data pulse on metrics + expandable sidebar
- **Worth keeping for an uploader:** Drag-and-drop with preview + animated file list entry
- **Worth keeping for an auth form:** Focus-state input animation + subtle success state

Do not add interactions because they are impressive. Add them because they serve the user's task or reinforce the product's character.

---

## Using the Answers

Once all nine questions are answered:

1. Select the blueprint (see `decisions/blueprint-selection.md`)
2. Select the palette family (see `palettes/_selection-logic.md`)
3. Identify the specific differentiating design decision (Question 5)
4. Document what is being rejected (Questions 7 and 8)
5. Generate the output

The answers should appear in the **[VISION]** section of the response.
