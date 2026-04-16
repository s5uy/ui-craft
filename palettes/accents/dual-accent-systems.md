# Dual Accent Systems

Two accent colors. High risk. Requires the strict 80/20 hierarchy rule.

---

## Why Dual Accents Are Risky

Standard AI generation often applies multiple colors with equal weight, creating a "carnival" effect where the interface competes with itself. Elements scream for attention simultaneously, destroying hierarchy and increasing cognitive load.

Dual accents are only permissible when the product *structurally requires* two distinct categories of interaction that must be visually separated at an instant glance.

## The 80/20 Rule

When using two accents, they must never carry equal weight.
You must establish a **Primary Accent** (80% usage) and a **Secondary Accent** (20% usage).

### Primary Accent
- Used for the primary conversion action (e.g., "Submit Order")
- Used for global navigation states that require brand presence
- Carries the main brand identity

### Secondary Accent
- Used exclusively for a specific class of secondary action that needs differentiation but shouldn't compete with the primary conversion
- Often used to designate a specific domain or context within a larger app (e.g., Marketing vs. Analytics areas)
- Must be mathematically distant from the primary accent on the color wheel to ensure clear differentiation

## When to Use Dual Accents

**1. Platform Ecosystems:** The primary accent is the brand; the secondary accent delineates a specific sub-product (e.g., Google Workspace).
**2. Bifurcated User Flows:** A system with two radically different modes (e.g., "Trading" vs "Account Settings").
**3. Real/Demo Dualities:** Distinguishing "live data" interactions from "test mode" interactions.

## How to Implement

- **Never** place the primary and secondary accent buttons adjacent to each other.
- **Never** blend the two accents into a gradient.
- **Always** ensure the secondary accent is slightly desaturated or darker than the primary, artificially lowering its visual volume.

## The Failure Mode

**The Clown Car:** Using a primary blue and a secondary orange, and distributing them 50/50 across cards, badges, and buttons. 

**The Fix:** Strip the secondary color from all structural elements. Demote it to only the specific interactive elements that require contextual differentiation. Return the rest of the interface to the neutral foundation.
