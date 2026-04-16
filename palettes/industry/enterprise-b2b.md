# Industry Palette: Enterprise B2B SaaS

## Industry Context

Enterprise B2B software is purchased by teams to manage complex organizational workflows (HR, Supply Chain, ERP, Large-scale CRM). Users do not choose to use these tools; they are required to. The primary concern is data density, cross-departmental clarity, and long-term maintainability. 

---

## Default AI Archetype (What to Avoid)

AI often misinterprets "enterprise" as "boring" and generates low-contrast, entirely gray interfaces devoid of structure. Alternatively, it tries to make a complex CRM look like a simple consumer app.
- **The Cliché:** Entirely flat gray-on-gray interfaces with an arbitrary blue accent and excessive white space that drastically reduces information density.
- **Why it fails:** It fails to handle the reality of enterprise data. Users need to see complex tables and dense forms without scrolling endlessly.

---

## Recommended Palette Families

### 1. Neutral Cool
**Why it works:** The absolute workhorse for the enterprise. It looks professional, integrates visually with most operating systems, and scales infinitely. It provides enough structural gray variation to build complex navigation hierarchies.

### 2. High Trust
**Why it works:** For legal, compliance, and large financial ERPs. It is conservative and stable, ensuring the buyer that the software is a safe, institutional-grade choice.

### 3. Monochrome Systems
**Why it works:** Stripping out color in highly complex forms and tables forces the designer to rely entirely on layout, border structure, and typography, which usually results in a much better enterprise UI.

---

## Accent Strategy

- **Functional Color is King:** Enterprise tools live or die by status indicators (Active, Pending, Failed, Draft). These functional colors must be distinct and used consistently.
- **Demoted Primary Accent:** The brand accent color should be restricted to the active navigation state, primary CTAs, and focus rings. Never use it for large background areas or decorative headers.

---

## Typography Integration

- **Scale:** Compact. Use `text-sm` (14px) and `text-xs` (12px) liberally for data tables and dense forms. Minimize vertical padding.
- **Hierarchy:** Strong reliance on font weight (e.g., `font-medium` or `font-semibold`) rather than color or size to distinguish field labels from data inputs.

---

## Anti-Patterns

- 🚫 **Excessive Whitespace:** A consumer app might want `p-8` on a card, but an enterprise app needs `p-4` or `p-3` to keep data visible above the fold.
- 🚫 **Decorative Shadows or Glows:** Enterprise tools need to look like tools. Heavy drop shadows and glows make the interface feel slow, fragile, and bloated.
- 🚫 **Rounding:** Excessive corner rounding (e.g., `rounded-xl`) wastes space and feels inappropriately playful. Stick to `rounded` or `rounded-md`.
