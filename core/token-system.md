# Canonical Token System

Every site this skill ships **must** be built on a token system. Inline hex values are a failure mode. Copy one of the starters below, then theme it — do not invent ad-hoc colors.

The system below is the one Foundry uses. It is the reference. Use it exactly unless the recipe tells you otherwise.

---

## Dark Technical (default for developer tools, SaaS, dashboards)

```css
:root {
  /* Backgrounds — 3 depths */
  --bg:        #0b0e13;
  --bg-elev:   #11151c;
  --bg-elev-2: #161b24;
  --surface:   #1a2029;

  /* Borders — 2 strengths */
  --line:        rgba(255, 255, 255, 0.07);
  --line-strong: rgba(255, 255, 255, 0.12);

  /* Text — 4 tones */
  --fg:        #e8edf5;
  --fg-dim:    #a4aebd;
  --fg-muted:  #6b7689;
  --fg-faint:  #434c5c;

  /* Accent — OKLCH + derived */
  --accent:      oklch(0.88 0.14 155);   /* mint */
  --accent-ink:  #061208;                /* text on accent backgrounds */
  --accent-soft: color-mix(in oklab, var(--accent) 18%, transparent);

  /* Semantic */
  --danger: oklch(0.72 0.18 25);
  --warn:   oklch(0.82 0.14 75);
  --info:   oklch(0.78 0.12 240);

  /* Radius — 5 steps */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  /* Density multiplier */
  --density: 1;

  /* Typography families */
  --font-display: 'Inter Tight', ui-sans-serif, system-ui, sans-serif;
  --font-body:    'Inter Tight', ui-sans-serif, system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  --font-serif:   'Instrument Serif', Georgia, serif;

  /* Layout */
  --maxw: 1240px;
}
```

### Accent theme variants (swap with one data attribute)

```css
[data-accent="violet"] { --accent: oklch(0.78 0.18 295); --accent-ink: #0a0512; }
[data-accent="amber"]  { --accent: oklch(0.84 0.16 75);  --accent-ink: #1a1000; }
[data-accent="sky"]    { --accent: oklch(0.82 0.13 230); --accent-ink: #05111a; }
[data-accent="rose"]   { --accent: oklch(0.78 0.16 15);  --accent-ink: #1a0609; }
[data-accent="mint"]   { --accent: oklch(0.88 0.14 155); --accent-ink: #061208; }
```

### Radius variants

```css
[data-radius="none"]   { --radius-sm: 0;  --radius-md: 0;  --radius-lg: 0;  --radius-xl: 0;  --radius-xs: 0; }
[data-radius="small"]  { --radius-sm: 3px;  --radius-md: 5px;  --radius-lg: 8px;  --radius-xl: 12px; }
[data-radius="medium"] { /* defaults */ }
[data-radius="large"]  { --radius-sm: 10px; --radius-md: 16px; --radius-lg: 22px; --radius-xl: 30px; }
```

### Density variants

```css
[data-density="compact"]     { --density: 0.8; }
[data-density="comfortable"] { --density: 1; }
[data-density="spacious"]    { --density: 1.25; }

section { padding: calc(96px * var(--density)) 0; }
```

---

## Paper Editorial (warm light mode for content, blogs, docs)

```css
:root {
  --bg:        #fbfaf7;
  --bg-elev:   #ffffff;
  --bg-elev-2: #f3f1ec;
  --surface:   #efece6;

  --line:        rgba(20, 14, 8, 0.08);
  --line-strong: rgba(20, 14, 8, 0.14);

  --fg:       #1b1510;
  --fg-dim:   #4a4038;
  --fg-muted: #7a6f63;
  --fg-faint: #a89e91;

  --accent:      oklch(0.55 0.15 35);   /* warm terracotta */
  --accent-ink:  #fff7ef;
  --accent-soft: color-mix(in oklab, var(--accent) 14%, transparent);

  --font-display: 'Instrument Serif', 'Source Serif Pro', Georgia, serif;
  --font-body:    'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
}
```

---

## High-Trust Enterprise (B2B sober neutral)

```css
:root {
  --bg:        #fafafa;
  --bg-elev:   #ffffff;
  --bg-elev-2: #f4f4f5;
  --surface:   #eeeeef;

  --line:        rgba(9, 9, 11, 0.08);
  --line-strong: rgba(9, 9, 11, 0.14);

  --fg:       #09090b;
  --fg-dim:   #3f3f46;
  --fg-muted: #71717a;
  --fg-faint: #a1a1aa;

  --accent:      oklch(0.42 0.15 260);  /* deep trusted blue */
  --accent-ink:  #ffffff;
  --accent-soft: color-mix(in oklab, var(--accent) 10%, transparent);
}
```

---

## Tailwind equivalents

If the target stack is Tailwind, map tokens to CSS variables in `globals.css`, then reference them via `bg-[var(--bg)]` or extend the theme in `tailwind.config`:

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg: 'var(--bg)',
      'bg-elev': 'var(--bg-elev)',
      'bg-elev-2': 'var(--bg-elev-2)',
      line: 'var(--line)',
      'line-strong': 'var(--line-strong)',
      fg: 'var(--fg)',
      'fg-dim': 'var(--fg-dim)',
      'fg-muted': 'var(--fg-muted)',
      'fg-faint': 'var(--fg-faint)',
      accent: 'var(--accent)',
      'accent-ink': 'var(--accent-ink)',
      'accent-soft': 'var(--accent-soft)',
    },
    borderRadius: {
      xs: 'var(--radius-xs)',
      sm: 'var(--radius-sm)',
      DEFAULT: 'var(--radius-md)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
    },
    fontFamily: {
      sans: ['var(--font-body)'],
      display: ['var(--font-display)'],
      mono: ['var(--font-mono)'],
      serif: ['var(--font-serif)'],
    },
  },
},
```

---

## Typography baseline (copy as-is)

```css
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  line-height: 1.5;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.02em;
}
h1 { font-size: clamp(44px, 6vw,   84px); line-height: 0.98; letter-spacing: -0.035em; }
h2 { font-size: clamp(32px, 3.6vw, 52px); line-height: 1.02; letter-spacing: -0.030em; }
h3 { font-size: 22px; line-height: 1.2; }
h4 { font-size: 16px; line-height: 1.3; }
p  { margin: 0; color: var(--fg-dim); }

.mono     { font-family: var(--font-mono); }
.serif-it { font-family: var(--font-serif); font-style: italic; font-weight: 400; }

::selection { background: var(--accent-soft); color: var(--fg); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: var(--radius-sm); }
```

---

## The Eyebrow Primitive (required on every section)

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.eyebrow .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px color-mix(in oklab, var(--accent) 60%, transparent);
}
```

```html
<div class="eyebrow"><span class="dot"></span> Realtime · Edge-first</div>
```

---

## Shadow System (diffuse, negative spread)

```css
/* Cards and panels */
--shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px var(--line);
--shadow-elev: 0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset;
--shadow-float: 0 30px 80px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02);

/* Accent button — the only place color goes in a shadow */
--shadow-primary: 0 1px 0 color-mix(in oklab, var(--accent) 60%, white 20%) inset,
                  0 6px 24px -10px var(--accent);
```

Never use a hard-edged shadow like `0 4px 0 black` unless you are intentionally building a retro/brutalist UI.

---

## Rules

1. No hex outside this file and the recipe files. Every component references tokens.
2. Derive accent states with `color-mix(in oklab, ...)` — never hand-tuned tints.
3. When the user asks for "another color theme," add a `[data-accent="..."]` row — do not duplicate the whole palette.
4. When scaling typography responsively, always use `clamp()` on h1/h2. Fixed px for h3/h4 is fine.
5. The density multiplier is not optional. Every site gets one. It costs nothing and makes retrofitting free.
