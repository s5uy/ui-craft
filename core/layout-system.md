# Layout System

Layout is the skeleton a specialist designer tunes for days. AI defaults collapse to "centered hero / three-column cards / two-column features" and the result is immediately recognizable as generated. This file defines how to lay out a page so it reads as authored, not assembled.

Read universal + the direction you locked. Ignore the other three.

---

## Universal Principles

### 1. Grid is a contract
Pick a grid before you place anything. Every element sits on the grid. Exceptions are intentional, not accidental.

- Marketing sites: **12-column grid**, 1200-1440px max, 24-32px gutter
- Dashboards: **12-column grid**, full-width, 16-24px gutter
- Editorial: **6-column grid** (wider columns), 1100-1280px max
- Mobile: **4-column grid**, 16-20px gutter, 16px side padding

Tailwind config:
```ts
// tailwind.config.ts
theme: {
  extend: {
    screens: { '2xl': '1440px' },
    maxWidth: { 'container': '1240px' },
    spacing: { 'section': 'clamp(5rem, 10vh, 10rem)' }
  }
}
```

### 2. Section rhythm: dense → breathe → dense
Alternate dense sections (feature lists, comparison tables, pricing grids) with breathing sections (single headline + quote, single image, empty-ish whitespace). Two dense in a row = fatigue. Two breathing in a row = empty.

```
[ Dense hero w/ CTA ] → [ Quote — sparse ] → [ Feature dense grid ] → [ Full-bleed image ] → [ Dense pricing ] → [ FAQ sparse ] → [ Dense CTA + footer ]
```

### 3. Vertical rhythm is as important as horizontal
Section padding should vary by content importance. Don't use the same `py-24` everywhere.

| Section role | Vertical padding |
|---|---|
| Hero | 120-200px top, 80-120px bottom (asymmetric) |
| Primary feature sections | 100-160px |
| Secondary sections | 80-120px |
| Between-section accents (quote, logo rail) | 60-100px |
| Footer | 80-140px top |

### 4. Whitespace is content
Empty space carries weight. Use `max-w-*` narrower than the container on hero copy. Leave a full grid column of air on one side of the headline. Don't feel obligated to fill every row.

### 5. Alignment is a decision
Every page decides: center-aligned, left-aligned, or asymmetric. Pick one; commit.

- **Center-aligned** — safe default, reads as consumer marketing. VP and EL only.
- **Left-aligned** — editorial, designer-portfolio. DE default, TM common.
- **Asymmetric** (intentional offset within grid) — signature of craft. DE and EL.

Mixing center + left on a single page without reason looks accidental.

### 6. Content density per breakpoint
- **Desktop ≥1280px:** full density, 3-4 column grids
- **Tablet 768-1280px:** reduce to 2-column grids, increase type size proportionally
- **Mobile <768px:** single column, reduce section padding by 30-40%, never reduce hero type below 48px

### 7. Container is the frame, not the content
Set container max-width + horizontal padding on an outer wrapper. Inner content can break the container (full-bleed images, sticky marquee rails). Don't nest `max-w-7xl` inside `max-w-7xl`.

```tsx
// Layout pattern
<main>
  <section className="px-6 md:px-8 lg:px-12">
    <div className="max-w-container mx-auto">
      {/* content sits on grid */}
    </div>
  </section>

  <section className="full-bleed relative">
    {/* breaks container, e.g., hero image or marquee */}
  </section>
</main>
```

---

## TM — Technical-Minimal Layout

### Container & grid
- Max-width: **1240px** desktop, 1120px optimum
- Grid: 12-column, 24px gutter
- Horizontal padding: `px-6 md:px-8 lg:px-12`

### Section padding
- Hero: `pt-32 pb-24` (128px top / 96px bottom)
- Primary sections: `py-24` (96px) on mobile, `py-32` (128px) desktop
- Between-section: `py-16` to `py-20`

### Signature patterns
1. **Left-aligned hero with right-side visual**
   ```tsx
   <section className="pt-32 pb-24">
     <div className="max-w-container mx-auto px-8 grid grid-cols-12 gap-6 items-center">
       <div className="col-span-12 lg:col-span-6">
         <Eyebrow>◆ Deploy platform</Eyebrow>
         <h1 className="text-hero mt-6">Ship faster. <span className="font-mono">Debug</span> smarter.</h1>
         <p className="text-muted text-lg mt-6 max-w-[52ch]">...</p>
         <div className="flex gap-3 mt-10"><CTA /><SecondaryCTA /></div>
       </div>
       <div className="col-span-12 lg:col-span-6">
         <TerminalPanel />
       </div>
     </div>
   </section>
   ```

2. **Feature tablist replacing 3-col grid** (the #1 TM anti-cliché move)
   ```tsx
   <section className="py-32">
     <div className="max-w-container mx-auto px-8">
       <Eyebrow>◆ Platform</Eyebrow>
       <h2 className="text-4xl mt-6 max-w-[24ch]">Everything you need to ship.</h2>
       {/* Tabs with content panels instead of 3 icon cards */}
       <FeatureTablist items={features} className="mt-16" />
     </div>
   </section>
   ```

3. **Quote break between dense sections** — single 32-48px quote, left-aligned, mono attribution label
   ```tsx
   <section className="py-20">
     <div className="max-w-container mx-auto px-8 grid grid-cols-12">
       <blockquote className="col-start-2 col-span-10 lg:col-start-3 lg:col-span-8">
         <p className="text-3xl tracking-tight">"We replaced a 14-person infra team with this."</p>
         <footer className="mt-6 text-xs font-mono uppercase tracking-wider text-muted">
           Sarah K. — Staff Eng, Fintech unicorn
         </footer>
       </blockquote>
     </div>
   </section>
   ```

4. **Logo marquee between sections** — single row, scrolling horizontal
5. **Three-section pricing strip with a "most popular" tier** — middle tier raised 8px, accent border
6. **Footer as dense mono sitemap** — 4-5 columns of uppercase mono links at 11px

### What fails TM layout
- Centered hero with centered body + two centered CTAs — generic SaaS default, rewrite as left-aligned
- Three-column icon feature grid — the #1 cliché; use tablist or columned comparison
- Equal-padded sections throughout — rhythm collapses
- No max-width on body text — reads as unconfigured
- Full-bleed hero image filling viewport — wrong direction, that's EL

---

## DE — Design-Engineer Layout

### Container & grid
- Max-width: **1120px** (narrower — content-led)
- Grid: 12-column, 32px gutter (more air)
- Horizontal padding: `px-6 md:px-10 lg:px-16`

### Section padding
- Hero: `pt-28 pb-36` (dramatic asymmetric)
- Primary sections: `py-40` (160px) — DE breathes more than TM
- Between-section: `py-24` to `py-28`

### Signature patterns

1. **Asymmetric hero** — headline offset from center, metadata far-right, CTA left-aligned
   ```tsx
   <section className="pt-28 pb-36 relative">
     <div className="max-w-container mx-auto px-10 grid grid-cols-12 gap-8">
       <div className="col-span-1 text-xs uppercase tracking-[0.2em] font-mono text-muted pt-4">
         01
       </div>
       <h1 className="col-span-8 text-hero font-medium leading-[1.05] tracking-[-0.02em]">
         Building <em className="font-serif font-normal">interfaces</em> for thought.
       </h1>
       <div className="col-span-3 flex flex-col items-end text-right text-xs uppercase tracking-wider font-mono text-muted">
         <div>2024 — Now</div>
         <div className="mt-1">Vercel × Self</div>
       </div>
     </div>
   </section>
   ```

2. **Feature grid as tabled rows** — not cards. Think financial-times-table, with hairline dividers
   ```tsx
   <section className="py-40">
     <div className="max-w-container mx-auto px-10">
       <h2 className="text-4xl font-medium max-w-[20ch]">The tools we built.</h2>
       <div className="mt-16 divide-y divide-[oklch(0.92_0_0)]">
         {features.map(f => (
           <div key={f.id} className="grid grid-cols-12 gap-8 py-10">
             <span className="col-span-1 text-xs uppercase tracking-[0.2em] font-mono text-muted">
               {f.index}
             </span>
             <h3 className="col-span-4 text-2xl font-medium">{f.title}</h3>
             <p className="col-span-6 text-muted leading-relaxed">{f.description}</p>
             <a className="col-span-1 text-xs uppercase tracking-wider text-right group">
               Read <span className="inline-block group-hover:translate-x-1 transition">→</span>
             </a>
           </div>
         ))}
       </div>
     </div>
   </section>
   ```

3. **Hairline-divided sections** — no background color changes, just a single `border-t` between sections
4. **Project/case-study gallery as left-column index + right-column preview** — hover on left highlights right
5. **Sitemap footer in mono** — all uppercase, all 11px, tracked `0.2em`, 4-5 columns

### What fails DE layout
- Cards with shadow — DE uses borders and whitespace, not elevation
- Symmetric centered layout — DE is asymmetric or committed-left
- Icon grids — replace with numbered indexed rows
- Background-color sections — DE uses a consistent background; rhythm comes from type and whitespace

---

## VP — Vibrant-Playful Layout

### Container & grid
- Max-width: **1280-1440px** (wider — visuals are big)
- Grid: 12-column, 24px gutter, but often broken by chunky cards
- Horizontal padding: `px-6 md:px-10 lg:px-12`

### Section padding
- Hero: `pt-24 pb-32` with heavy product visual
- Primary sections: `py-28` to `py-36`
- Color-blocked sections can extend to `py-44`

### Signature patterns

1. **Hero with oversized product visual** — product takes 55-65% of viewport height, copy below or beside
   ```tsx
   <section className="pt-20 pb-32 overflow-hidden">
     <div className="max-w-container mx-auto px-8 text-center">
       <Eyebrow variant="pill">New: version 4</Eyebrow>
       <h1 className="text-hero mt-8 font-bold">
         The browser <em className="font-serif italic font-medium bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 text-transparent">for everyone</em>.
       </h1>
       <p className="text-lg text-muted mt-6 max-w-[52ch] mx-auto">...</p>
       <div className="flex justify-center gap-3 mt-10">
         <CTA />
       </div>
       <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
         <ProductHero className="mt-20 mx-auto max-w-[1100px]" />
       </motion.div>
     </div>
   </section>
   ```

2. **Color-blocked feature sections** — each feature section owns a bg color (peach, mint, lavender, butter)
   ```tsx
   <section className="py-36 bg-[oklch(0.95_0.04_60)]"> {/* peach */}
     <div className="max-w-container mx-auto px-8 grid grid-cols-12 gap-6 items-center">
       <div className="col-span-12 lg:col-span-5">
         <h3 className="text-4xl font-bold">Meet on your schedule.</h3>
         <p className="text-muted mt-6">...</p>
       </div>
       <div className="col-span-12 lg:col-span-7">
         <ChunkyProductCard className="rounded-3xl" />
       </div>
     </div>
   </section>
   ```

3. **Gradient card stack** — feature tiles as 3-4 distinct gradient cards (pink→orange, cyan→violet, etc.)
4. **Big testimonial with giant display type** — quote at 48-64px, centered, pull-quote treatment
5. **Chunky pricing cards** — `rounded-3xl`, `p-10`, friendlier than TM pricing

### What fails VP layout
- Restrained sections with no color — reads as underdressed TM
- Small product visuals — VP hero is visual-first
- TM-style dense text sections — VP paragraphs breathe more

---

## EL — Editorial-Luxury Layout

### Container & grid
- **Often no container** — type goes edge-to-edge with `px-8` or `px-12`
- Or max-width: **1440-1680px** (generous) with centered content
- Grid: varies — sometimes 12-col, sometimes single column with full-bleed breaks

### Section padding
- Hero: `pt-40 pb-56` (200-300px scale)
- Primary sections: `py-44` to `py-56`
- Chapter sections (sticky locks): `100vh` each, no padding

### Signature patterns

1. **Full-viewport hero** — giant headline centered or edge-aligned, minimal chrome
   ```tsx
   <section className="min-h-screen flex items-center justify-center px-8">
     <div className="max-w-[1400px] w-full">
       <span className="block text-sm uppercase tracking-[0.2em] text-muted mb-8 font-mono">— Chapter 01 —</span>
       <h1 className="text-[clamp(5rem,20vw,18rem)] font-semibold leading-[0.85] tracking-[-0.055em]">
         Think different.
       </h1>
     </div>
   </section>
   ```

2. **Sticky chapter sections** — each section locks to viewport as you scroll through it
3. **Full-bleed product pin** — product image centered in viewport, scroll rotates/scales it
4. **Horizontal scroll gallery** — 4-6 images stretched across a 400vh container
5. **Two-up editorial spread** — image left (full-bleed to container edge), text right with massive whitespace
   ```tsx
   <section className="py-40">
     <div className="grid grid-cols-12 gap-0">
       <div className="col-span-12 lg:col-span-7">
         <img src="/product-1.jpg" className="w-full aspect-[4/5] object-cover" />
       </div>
       <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col justify-center px-8 lg:px-12 py-16">
         <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted">— Material</span>
         <h3 className="text-5xl font-medium mt-6 leading-[1.05] tracking-[-0.02em]">Aluminum. Glass. Silicon.</h3>
         <p className="text-muted text-lg mt-6 max-w-[40ch]">...</p>
       </div>
     </div>
   </section>
   ```

6. **No feature grid** — EL doesn't do feature tiles. Each "feature" gets its own chapter section.

### What fails EL layout
- Feature tile grids — EL doesn't tile features
- `max-w-2xl` containers on giant hero type — EL display breaks container, fluid vw
- Short sections (py-16) — EL padding is 160-300px
- Content in every grid column — EL leaves 40-60% of the grid empty on hero sections

---

## Cross-Direction: Hero Patterns (Do-This-Instead Library)

Replace the default AI hero with a direction-appropriate pattern.

| Anti-pattern | TM replacement | DE replacement | VP replacement | EL replacement |
|---|---|---|---|---|
| Centered headline + subhead + 2 CTAs | Left-aligned + terminal on right | Asymmetric w/ mono metadata | Centered w/ product visual + italic serif word | Giant 20vw headline, product below |
| 3-column icon features | Feature tablist w/ panels | Indexed numbered rows | Gradient card stack | Chapter sections |
| Testimonial carousel | Single quote, mono attribution | Asymmetric quote, serif italic | Pull-quote at 48px, color bg | Full-viewport quote |
| Pricing 3-tier grid | TM pricing w/ savings pill | Pricing as table | Chunky rounded-3xl cards | Single-tier or 2-tier editorial |
| Newsletter CTA | Inline form in footer | Inline form + mono confirm | Full-width color section | Full-viewport subscribe section |

---

## Grid Discipline — The Specialist Difference

A designer-specialist tunes these constantly. AI defaults don't. Go do them:

1. **Check every text block has a width cap** — never `w-full` on prose
2. **Check every section has asymmetric vertical padding** — 128/96 beats 128/128
3. **Check every hero has whitespace on at least 2 sides** — not filled corner-to-corner
4. **Check one-off full-bleed images break the container gracefully** — no double gutters
5. **Check mobile breakpoints reduce padding more than size** — 96px desktop → 60px mobile

---

## The Blank-Page Test

Before shipping, delete all text and all images. Show the page as empty boxes. Can you still read the page's structure and rhythm from the box sizes alone? If yes → layout is specialist-caliber. If no → rebuild the rhythm before adding content back.
