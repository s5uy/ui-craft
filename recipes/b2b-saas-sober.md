# Recipe: B2B SaaS — Sober Enterprise

For B2B operations software: analytics, admin, finance, HR, billing, procurement, security.

---

## Scope

**Use for:**
- Ops platforms (Ramp, Mercury, Brex feel)
- Analytics / BI / reporting tools
- Admin and internal-tool products
- Compliance, security, audit platforms
- Billing, procurement, vendor management

**Not for:**
- Developer tools (use `developer-tool-dark.md`)
- Consumer apps (use `consumer-product-warm.md`)

---

## Design System

- **Blueprint:** Enterprise Neutral with restrained Spatial Immersive motion
- **Palette:** High-Trust Enterprise from `core/token-system.md` (light default, offer dark toggle)
- **Accent default:** deep blue `oklch(0.42 0.15 260)` — never Tailwind `blue-600`
- **Typography:** Inter for UI + Inter Display for headings + JetBrains Mono for metrics
- **Motion:** minimal — reveal only, no parallax, no cinematic
- **Signature pattern:** a realistic `DashboardPreview` component in the hero (not a screenshot image — a real rendered React snippet with plausible data)

---

## Section Order

| # | Section | Job |
|---|---|---|
| 1 | Nav | Brand + Product dropdown + Customers + Pricing + Log in + primary CTA. No Cmd+K here — this audience doesn't expect it. |
| 2 | Hero | Left-heavy: eyebrow + headline + subhead + CTA. Right = rendered dashboard preview with real-looking tables, one chart. |
| 3 | LogoBar | Named customers. Mix well-known neutral brand logos with plausible B2B names. |
| 4 | ProblemStatement | A short editorial section: one sentence ("Finance teams spend 12 hours a week in spreadsheets.") with a supporting paragraph. |
| 5 | Features | 4–6 features as alternating 2-col rows (image + text). Not a 3-col grid. |
| 6 | CustomerStory | A full-width quote block with company name, logo, specific outcome ("cut month-end close from 9 days to 2"). |
| 7 | Integrations | A grid of partner logos — real products: Slack, Salesforce, HubSpot, Workday, Netsuite, Stripe, Xero. |
| 8 | Pricing | 3 tiers. Feature comparison table below. No yearly toggle unless the product actually offers discount. |
| 9 | FAQ | Security-heavy: SOC2, GDPR, data residency, admin controls, SSO, audit log. |
| 10 | CTABanner | Two CTAs: "Book a demo" (primary) + "Start free trial" (secondary). Booking demos is the real conversion for this audience. |
| 11 | Footer | Full 5-column: Product / Solutions (by industry) / Resources / Company / Legal. |

---

## Voice Cues

- Allowed: "close the books 4x faster," "audit-ready by default," "SOC 2 Type II," "approved by your CFO"
- Forbidden: "disruption," "revolutionary," "magic," "unleash," informal second person ("you're gonna love this")
- Tone: confident, measured, specific. Sound like a vendor your CFO would sign a check to.

---

## Failure Signals

- ❌ Hero uses a dark background (B2B trust wants light)
- ❌ Any animated gradient, glow, or playful motion
- ❌ Pricing CTA is "Sign up" — should be "Book a demo" or "Start trial"
- ❌ No SOC2 / security language anywhere
- ❌ Customer logos are invented cute names — this audience expects real brands
