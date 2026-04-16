# The Restraint Checklist

"What to remove" is the most important decision framework in premium UI design. AI models naturally additive in their approach, layering aesthetics until a design becomes noise. Premium design subtracts until only the essential structure remains.

Before generating or finalizing any UI output, run it through this checklist. If an element does not pass its test, remove it.

---

## 1. The Container Test

Does this content actually need a box around it?

- **❌ Remove the background/border if:** It only contains text and sits in an otherwise spacious layout.
- **❌ Remove the background/border if:** It creates "boxes within boxes" (more than 2 levels deep).
- **✅ Keep the container if:** It needs to be visually distinct as an interactive unit (e.g., a card you can click in its entirety) or if it isolates content over a visually noisy background.

**Alternative:** Group elements purely using white space and typography alignment.

## 2. The Color Test

Does this color convey specific meaning, or is it just "because it looked boring"?

- **❌ Remove the color if:** It serves no semantic purpose (success/warning) and doesn't represent the core brand identity.
- **❌ Remove the color if:** It is the *secondary* decorative color competing with the primary.
- **✅ Keep the color if:** It highlights the primary conversion action, indicates state (active, error), or is required for data visualization.

**Alternative:** Return the element to the monochrome foundation. Use contrast (text shade) instead of hue.

## 3. The Shadow Test

Does this shadow indicate physical interaction or just trying to look "premium"?

- **❌ Remove the soft drop shadow if:** The element is static and cannot be interacted with.
- **❌ Remove the soft drop shadow if:** It is applied to a text element.
- **✅ Keep the shadow if:** It's a modal, dropdown, or popover sitting above the primary layout (z-index elevation).
- **✅ Keep the shadow if:** It strictly appears on `hover` or `active` states to indicate physics.

**Alternative:** Use a subtle border (`border-border/40`) to define the edge cleanly without adding visual mud.

## 4. The Gradient Test

Is this gradient structurally necessary?

- **❌ Remove the gradient if:** It's applied to a button, a card background, or a navigation bar.
- **❌ Remove the gradient if:** It uses the default "purple-to-pink" or "blue-to-cyan" SaaS tropes.
- **✅ Keep the gradient if:** It is explicitly a brand motif, heavily constrained to a specific hero graphic, or used functionally (e.g., fading text out with a gradient mask).

**Alternative:** Solid colors, refined borders, and precise typography.

## 5. The Label Test

Is this label insulting the user's intelligence?

- **❌ Remove the label if:** The icon or context makes it explicitly clear (e.g., text saying "Search" inside a search input next to a magnifying glass icon—use a placeholder instead).
- **❌ Remove the label if:** It restates the obvious (e.g., a massive heading saying "Categories" right above a list of categories).
- **✅ Keep the label if:** The form field or data point is complex, ambiguous, or requires explicit instruction.

**Alternative:** Let the UI patterns speak for themselves.

## 6. The Rounding Test

Are the corners rounded out of habit?

- **❌ Reduce the radius if:** Everything on the screen is `rounded-2xl` or `rounded-full`, creating a bubbly toy-like aesthetic.
- **✅ Standardize the radius:** Pick *one* standard (e.g., `rounded-md`) and apply it ruthlessly. 

**Alternative:** Structure the design around sharp lines and right angles. It often feels more serious and professional.
