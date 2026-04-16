# Motion Standard

Motion is required when it improves clarity, hierarchy, or feel. Motion is prohibited when it exists for its own sake.

The test: remove the animation. Does the interface become harder to understand, harder to use, or feel noticeably cheaper? If yes, the animation earns its place. If no, it does not belong.

---

## Required Defaults

These behaviors should be present unless explicitly justified otherwise.

### Scroll Reveal

Main sections and their primary content should enter with smooth motion as they scroll into view.

**Default pattern:**
```ts
// Framer Motion standard reveal
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
```

Variations:
- Content-heavy sections: `y: 24`, `duration: 0.6`
- Small components: `y: 12`, `duration: 0.35`
- Large hero elements: `y: 32`, `duration: 0.7`, with stagger on children

The easing `[0.25, 0.1, 0.25, 1]` is a slightly cinematic ease-out. It decelerates into position rather than bouncing. Use it as the default. Reserve spring physics for explicitly tactile interactions.

### Staggered Children

Lists, grid items, metric clusters, feature cards, and any repeated content should stagger, not appear simultaneously.

**Default stagger:**
```ts
// Parent container
variants={{
  visible: { transition: { staggerChildren: 0.07 } }
}}

// Child items
variants={{
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}}
```

Stagger values:
- Dense grids: `0.04–0.06s`
- Feature sections: `0.07–0.1s`
- Large hero elements: `0.12–0.18s`

### Tactile Hover

Buttons, cards, and interactive UI elements should respond physically to hover and press.

**Buttons:**
```ts
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.15, ease: "easeOut" }}
```
Pair with CSS: subtle shadow lift on hover (`box-shadow` transition), border color shift.

**Cards:**
```ts
whileHover={{ y: -2 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```
Pair with CSS: `box-shadow` deepens slightly.

**Interactive list items:**
Background tone shift on hover. No translate needed — the color response is sufficient.

---

## When to Restrict Motion

Some components should not have scroll-triggered reveal:

- **Sticky navigation** — enters once, stays
- **Inline form elements** — input fields do not animate on reveal
- **Data tables** — rows do not stagger on scroll
- **Toast notifications** — use enter/exit animations, not scroll reveals
- **Modals and sheets** — use dedicated enter/exit, not scroll-linked motion

---

## Specific Component Patterns

### Modal and Sheet Entrance
```ts
// Modal backdrop
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.18 }}

// Modal panel
initial={{ opacity: 0, scale: 0.97, y: 8 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.97, y: 8 }}
transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
```

### Toast Entrance/Exit
```ts
initial={{ opacity: 0, y: 8, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -4, scale: 0.98 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```

### Dropdown Menu
```ts
initial={{ opacity: 0, y: -4, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -4, scale: 0.98 }}
transition={{ duration: 0.15 }}
```

### Page Transition (Next.js)
```ts
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.25 }}
```

---

## What to Avoid

### Constant floating
Do not apply `animate={{ y: [0, -8, 0] }}` floating loops to elements. They compete for attention continuously and exhaust the user.

### Pulsing backgrounds
Animated radial gradients, pulsing glows, and rotating conic gradients in backgrounds are decoration, not motion design. Remove them.

### Exaggerated scroll parallax
Heavy parallax effects (50px+ translate) degrade legibility and performance. Subtle parallax (8–16px) is occasionally justified.

### Motion on every element
Not everything should animate. Navigation items, footer links, form labels, body text — these should not have scroll-triggered reveals. Reserve motion for primary content, heroes, and key interactive elements.

### Spring physics for standard reveals
`type: "spring"` is appropriate for tactile interactions (drag, press, magnetic). It is not appropriate for standard scroll reveals — it creates an overly bouncy, demo-like feel. Use bezier easing for reveals.

### Cursor-following effects
Magnetic effects, cursor trails, and pointer-tracking backgrounds are rarely warranted outside of portfolio or agency contexts. They slow down the product feel and distract from content.

---

## Motion Hierarchy

Use animation density to reinforce visual hierarchy:

- **Hero elements** — longest duration, most pronounced movement
- **Primary content** — medium duration, clean translate
- **Secondary content** — shorter duration, smaller translate
- **UI chrome** (nav, footer, labels) — minimal or no animation

The most important element on the page should have the most considered motion. Not the most motion — the most *considered* motion.
