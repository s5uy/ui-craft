# Full-Site Generation Protocol

This is the discipline for producing a complete, Foundry-quality site from a **single prompt**. Follow it in order. Do not skip steps. Do not generate code until step 5.

The reason most AI-generated sites fail is not lack of components — it is the absence of a token system, section rhythm, and specific copy. This protocol forces all three before the first line of JSX.

---

## Step 0 — Classify the Ask

Read the prompt once and answer silently:

1. **Surface class:** marketing landing / product homepage / dashboard shell / editorial / auth / pricing-only
2. **Audience class:** developer-technical / B2B-enterprise / consumer / creative-editorial / regulated (finance/health)
3. **Emotional register (pick one):** calm · severe · warm · confident · clinical · playful · cinematic
4. **Density class:** sparse (consumer) / comfortable (marketing) / dense (technical)

If any of these is ambiguous and the user's prompt does not force an answer, **invent a specific product** rather than hedging. "A deploy platform for staff engineers who hate YAML" beats "a SaaS product."

---

## Step 1 — Pick a Recipe

Go to `recipes/_index.md`. Pick the recipe whose surface × audience × register match. **Do not blend recipes on the first pass.** Blending is a Phase-2 move.

The recipe tells you:
- Which blueprint
- Which palette family
- Section order (including optional/required sections)
- Which interactive patterns apply
- Voice direction for copy

Open that recipe file in full. Read it before moving on.

---

## Step 2 — Commit to a Token System

Copy the token block from `core/token-system.md` into the design. **Do not invent colors inline.** Every color, radius, and spacing value in the final output must be a CSS custom property or Tailwind token — no raw hex in component styles.

Required token tiers:
- **Backgrounds:** 3 depths minimum (`--bg`, `--bg-elev`, `--bg-elev-2`)
- **Borders:** 2 strengths (`--line`, `--line-strong`)
- **Text:** 4 tones (`--fg`, `--fg-dim`, `--fg-muted`, `--fg-faint`)
- **Accent:** 1 OKLCH value + soft-mix + ink
- **Radius:** 5 steps (xs → xl)
- **Density:** multiplier variable (`--density`) controlling section padding

If you cannot name the tier for a color, the design does not yet have a system.

---

## Step 3 — Draft the Copy Before the Layout

Write every piece of visible copy before generating JSX. This includes:

- Hero eyebrow (e.g., `v4.2 · Realtime previews for every branch`)
- Hero headline (≤8 words, point of view, not a feature list)
- Hero subhead (one sentence naming the audience and the specific pain)
- Three hero metrics with realistic numbers and units (`99.99%` / `38ms` / `1,200+ teams`)
- Primary + secondary CTA labels (verbs — "Start free" / "Watch 2-min tour", never "Learn more")
- 4–8 feature titles, each with a one-sentence payoff
- Customer/logo list (12+ invented but plausible names)
- Pricing tier names and two-line descriptions
- FAQ: 6 questions the actual target user would ask — objections, not marketing prompts
- Footer columns with realistic link labels

Keep the copy as a pre-generation scratchpad. If any line could apply to 500 other products, rewrite it. See `core/content-standard.md`.

**Voice gate:** read your own copy back. If it sounds like a marketing template, the site will too.

---

## Step 4 — Architect the Section Rhythm

List the sections in order with their structural role. Every section needs:

- **Eyebrow** — mono-font label with the glowing accent dot
- **Heading** — clamp()-scaled, negative letter-spacing
- **Specific body** — not a restated heading
- **A reason for being here** — if a section has no reason beyond "landing pages usually have one," cut it

Rhythm rule: alternate density. After a dense section (terminal, feature grid, stats), the next section should be quieter (editorial block, single CTA, quote). Never two dense sections in a row.

**Minimum viable complete site** (marketing): Nav → Hero → Logo rail → Feature block (primary) → How it works → Stats → Pricing → FAQ → CTA banner → Footer. Cut anything you cannot make specific.

---

## Step 5 — Generate

Now write the code. Constraints:

- All tokens from step 2 are applied — no hardcoded hex
- All copy from step 3 is in place — no `lorem`, no `Feature 1`
- Every section has the eyebrow + heading + body pattern
- Scroll reveal on every below-fold section (12px translate, 700ms ease)
- Mono font on every label, metric, eyebrow, kbd hint, status
- At least one signature interactive component (command palette, terminal, comparison slider, tweaks panel — see `components/patterns/`)
- Nav has backdrop blur + scroll-triggered border
- Box shadows use negative spread (diffuse, not hard-edged)
- No glow except on live/active status indicators
- Complete file, no truncation, no `// rest of sections here`

If the output would exceed a single file reasonably, split into logical modules (`Nav`, `Hero`, `Features`, `Pricing`, etc.) and return **all of them**. Partial is a failure — the user asked for a site, not a skeleton.

---

## Step 6 — Validate Against the Foundry Bar

Before responding, check every item in `site-examples/foundry.md` → "The Replication Checklist." If any item fails, fix it before sending. Do not weaken the checklist to fit the output.

Final self-test: if this were dropped into `site1/` next to `Foundry.html`, would it feel like it belonged to the same designer? If you hesitate, the answer is no.

---

## Failure Signals

If you find yourself doing any of these, stop and restart from step 2:

- Using default Tailwind colors (`slate-900`, `blue-600`) as the palette
- Writing `// TODO: add more features` or stubbing sections
- Generating fewer than 6 sections for a marketing page
- Writing copy like "Powerful features for modern teams"
- Adding a large radial gradient blob behind the hero headline
- Using identical cards in a three-column grid as the primary feature layout
- Skipping the eyebrow pattern on any section
- Using `flex items-center justify-center text-center` as the hero layout

These are the AI-slop signatures. The protocol exists to prevent them.
