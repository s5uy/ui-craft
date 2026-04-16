# Single Accent Systems

One accent color. Maximum discipline. This is the default and strongest accent strategy for the majority of products.

---

## Why One Accent

When an interface uses one accent color consistently, every instance of it becomes meaningful. The user learns: "when I see this color, something requires my attention or action."

When an interface uses two or three accent colors, the user must learn what each one means — or, more commonly, stops reading any meaning into color at all and treats it as decoration. Decoration does not serve hierarchy.

One accent color is not a limitation. It is a discipline that makes the accent work harder.

---

## The Scarcity Principle

An accent color earns its power from scarcity. The fewer places it appears, the more each appearance matters.

**High-scarcity targets (where the accent should appear):**
- Primary CTA buttons
- Active navigation state (the page the user is on)
- The most important interactive element in each view
- Focus rings on form elements (accessibility-critical)
- Active/selected state in data tables or lists
- Key metric callouts in data-dense UIs

**Where the accent should NOT appear (unless carefully justified):**
- Section headings or page titles
- Background panels or surface tones
- Decorative borders on non-interactive elements
- Hover states on every element (not every hover needs accent color)
- Body text
- Icons in non-interactive contexts
- Navigation links that are not active

If the accent appears on more than ~15% of the visible UI at any given time, it is overused.

---

## Choosing the Accent

The accent color must be chosen for the product context, not for its general attractiveness.

### By product type

| Product type | Recommended accent direction |
|---|---|
| B2B SaaS, admin | Restrained blue (`#2563EB`, `#1D4ED8`) |
| Developer tool | Subtle accent — muted blue, electric blue, or almost-neutral |
| Consumer app (neutral) | Contextual — match the brand's personality |
| Financial / compliance | Institutional blue, conservative teal |
| Healthcare | Teal, accessible green, conservative blue |
| Creative / agency | Single bold ink (red, cobalt, amber) |
| Monitoring / alerting | Semantic green or blue (avoid alert colors as primary accent) |
| Editorial / content | Link color only — often warm red or reference blue |

### Contrast requirements

The accent must pass WCAG AA contrast against every background it appears on:
- White buttons with colored text: 4.5:1 minimum
- Colored buttons with white/dark text: 4.5:1 minimum
- Interactive links in body text: 4.5:1 against the body background

Test: don't assume a blue that looks fine in design passes the contrast ratio.

### The "Does it feel arbitrary?" test

If you can swap the accent color for a different one without the product feeling wrong, the accent has not been chosen carefully enough. A good accent color should feel like it belongs to the product, not like it was picked from a color wheel.

---

## Applying the Accent — Rules

### Primary CTA

The primary CTA is the highest-priority use of the accent. It should be visually distinct from every other element on the page.

```tsx
// Primary button — the accent earns its place here
<button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-5 py-2.5 rounded-lg font-medium text-sm">
  Get started
</button>
```

### Active state

The active/selected state in navigation, tabs, or lists is the second most important use.

```tsx
// Active nav item
<a className={cn(
  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
  isActive
    ? "bg-blue-50 text-blue-700 font-medium"  // accent application
    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
)}>
```

### Focus rings

Focus rings must use the accent. This is non-negotiable for accessibility.

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Links

Links in body text should use the accent color, slightly adjusted for the reading context. Consider using `text-blue-700` (darker) for light backgrounds rather than the full `text-blue-600` primary accent.

### Data emphasis

In metrics or data displays, one key number or indicator can use the accent to signal primary importance.

---

## Accent Tone Variations

One accent color can create a full range of interactive states through lightness variations:

```
Accent-50:   Very light tint — hover backgrounds, selected row tints
Accent-100:  Light tint — tag/badge backgrounds
Accent-200:  Soft — disabled accent elements
Accent-600:  Primary — the canonical accent
Accent-700:  Hover state on colored buttons
Accent-800:  Active/pressed state
Accent-900:  Dark text on tinted backgrounds
```

These variations count as one accent system. They are all derived from the same hue.

---

## What to Avoid

**Don't use the accent for every hover state.** Many hover states should be neutral — a gray background shift, a border color change, a shadow lift. Reserve accent color for states that communicate selection or primary action.

**Don't tint headers or panels with the accent.** `bg-blue-50` on a section header is a common pattern that makes the accent feel cheap and overused. Use neutral tones for surface backgrounds.

**Don't use accent color as decoration.** Accent-colored dividers between sections, accent-colored icon backgrounds on feature cards, accent-colored quote marks — these uses degrade the signal value of the accent.

**Don't use the accent to create "energy."** If a section feels lifeless, the answer is better composition and typography — not adding accent color to inject visual interest.
