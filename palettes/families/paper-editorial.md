# Palette Family: Paper Editorial

## Character

Off-white reading surfaces with ink-like text — the digital translation of quality print. Optimized for sustained reading and content consumption. Communicates: authority, thoughtfulness, and the weight of considered words. The off-white base is warmer and richer than screen white, reducing eye strain and creating the psychological association with physical reading materials: books, journals, quality publications.

---

## Foundation Range

### Light variant (primary — this family is light-mode-first)

| Role | Hex | Notes |
|---|---|---|
| Background | `#FAF9F6` | Warm off-white — barely cream |
| Surface | `#FFFFFF` | Cards, elevated panels |
| Surface reading | `#F5F3EF` | Long-form content column background |
| Code background | `#F2F0EA` | Inline code and code block background |
| Border | `#E6E2D8` | Default separation |
| Border subtle | `#EDE9E0` | De-emphasized |
| Border rule | `#D8D3C8` | Horizontal rules, section dividers |
| Primary text | `#18170F` | Very dark warm black — ink quality |
| Secondary text | `#6B6557` | Warm mid-tone |
| Muted text | `#9C9484` | Labels, captions, metadata |
| Disabled text | `#C8C2B4` | |

### Dark variant (inverted editorial)

| Role | Hex | Notes |
|---|---|---|
| Background | `#16140C` | Dark warm, not pure black |
| Surface | `#1E1C12` | Slightly lighter panels |
| Panel | `#28261A` | Cards, code blocks |
| Border | `rgba(250,245,220,0.09)` | Warm-tinted borders |
| Border subtle | `rgba(250,245,220,0.05)` | |
| Primary text | `#F5F0E0` | Warm off-white — parchment |
| Secondary text | `rgba(245,240,224,0.62)` | |
| Muted text | `rgba(245,240,224,0.38)` | |
| Code text | `#E8E2CC` | Slightly dimmer |

---

## Variation Axes

**More cream (warmer, more analog):** Increase warmth: background `#FBF8F1`, surface reading `#F4F0E5`. Evokes older paper, vintage publications. Use for content with an archival or classical character.

**Less cream (more neutral, broader appeal):** Reduce warmth: background `#FAFAFA`, border `#E8E6E0`. Still slightly warm but less obviously so. Use when a full warm palette risks feeling too styled.

**Higher contrast (newspaper-like):** Darken text to pure `#0A0908` and borders to `#D4CFC3`. Tighter, more intense reading feel. Use for long-form content where sustained focus is required.

**Sepia (maximum warmth):** Background `#F8F3E3`, surface `#F0E9D2`, text `#2C2416`. Creates a distinctly analog, archival quality. Use sparingly — in most contexts this is too warm.

---

## Accent Compatibility

Paper editorial backgrounds require accents with enough contrast to be readable while feeling intentional rather than decorative.

| Accent | Hex | Notes |
|---|---|---|
| Link red | `#C41A1A` | Classic editorial link color — ink, deliberate |
| Reference blue | `#1D4ED8` | Academic, informational — the standard link color |
| Forest green | `#166534` | Natural, grounded, well-read |
| Ink blue-black | `#1E293B` | Near-neutral accent for minimal color usage |
| Amber | `#92400E` | Warm, craft, annotation-like |
| Teal | `#0F766E` | Fresh contrast against warm paper base |

**Avoid:**
- Bright or saturated accents — they break the reading atmosphere
- Multiple accent colors — content typography uses consistent link color throughout
- Accent on section headings as decoration — links only

---

## Typography Interaction

Typography is more critical in this family than in any other. The reading experience IS the product.

**Serif vs. sans:** For long-form reading, a quality serif adds authority and readability (Georgia, Source Serif 4, Crimson Pro, Lora). For technical documentation with code, a neutral sans (Inter) may be more appropriate. For hybrid: serif headings + sans body is a classic editorial choice.

**Body text sizing:** 17–19px. Never smaller. Reading comfort at this scale on a warm background is the foundation.

**Line height:** Generous — `leading-7` to `leading-8` (1.75–2.0). Content that feels compressed is harder to read and signals poor editorial judgment.

**Line length:** Strict `max-w-prose` (65ch) or `max-w-[68ch]`. Full-width body text in a reading context is an inexcusable error.

**Code blocks:** Dark background even in light mode — `#1E1C12` or `#282620`. The dark code block against warm white creates a strong visual rhythm that signals mode changes in technical content.

**Footnotes and captions:** 13–14px, secondary text color, slightly tighter tracking.

---

## Density Guidance

Paper editorial is a low-density family. It is optimized for one thing: comfortable, sustained reading.

- **Body column:** Centered, max 680–740px wide, generous vertical spacing
- **Between paragraphs:** 20–24px
- **Between H2 sections:** 48–64px
- **Code blocks:** 24px vertical margin above and below
- **Page chrome (nav, footer):** Minimal — should not compete with content

This is not a family for data-dense interfaces. If the product requires both reading and data, use a different family for the data sections and apply editorial warm only to content regions.

---

## Example Instances

### Instance 1: Long-Form Publication
```
background:     #FAF9F6
surface:        #FFFFFF
surface-reading: #F5F3EF
border:         #E6E2D8
text-primary:   #18170F
text-secondary: #6B6557
text-muted:     #9C9484
code-bg:        #F2F0EA
accent:         #C41A1A
```

### Instance 2: Technical Documentation
```
background:     #FAFAFA
surface:        #FFFFFF
surface-reading: #F6F5F2
border:         #E4E0D8
text-primary:   #1A1814
text-secondary: #6E6860
text-muted:     #9E9890
code-bg:        #1E1C12
code-text:      #E8E2CC
accent:         #1D4ED8
```

### Instance 3: Dark Editorial Archive
```
background:     #16140C
surface:        #1E1C12
panel:          #28261A
border:         rgba(250,245,220,0.09)
text-primary:   #F5F0E0
text-secondary: rgba(245,240,224,0.62)
text-muted:     rgba(245,240,224,0.36)
accent:         #D97706
```

---

## When to Use

- Long-form content platforms, newsletters, and blogs
- Documentation sites for technical products
- Knowledge bases and wikis
- Changelog and release notes pages
- Any interface where reading is the primary activity

---

## When NOT to Use

- Interactive, task-completion-heavy products
- Dashboards or data-heavy interfaces
- Products requiring high visual energy or brand boldness
- Marketing pages needing strong visual impact
- Consumer apps where the user is in "doing" mode rather than "reading" mode

---

## Blueprint Affinity

| Blueprint | Compatibility | Notes |
|---|---|---|
| Command Center | None | Incompatible — wrong density and register |
| Spatial Immersive | Low | Spatial Immersive is atmospheric, not reading-focused |
| Editorial Brutalism | Medium | Brutalism light mode can use a paper-adjacent base, but usually higher contrast |
| Enterprise Neutral | Low | Too warm and reading-focused for enterprise utility |
| Editorial Warm | High | This is the most specific palette family for Editorial Warm — they are purpose-matched |
