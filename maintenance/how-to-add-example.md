# How to Add an Example

---

## Example Quality Bar

Examples must be excellent. A mediocre example is worse than no example — it calibrates output to a lower standard. Before adding an example, it must:

- Represent the target quality level (what a principal engineer + senior designer would ship)
- Be complete and runnable (no placeholders, no truncation)
- Demonstrate the correct palette, blueprint, and composition choices for its product type
- Include a README with explicit design decisions and what was deliberately avoided

---

## Process

### Step 1: Choose the example type

**Page example** — a complete route (`page.tsx`) demonstrating an entire page
- Use for: full layout patterns, complex multi-component compositions
- Directory: `examples/pages/[product-type]-[page-type]/`

**Component example** — a self-contained component file
- Use for: complex interactive patterns, specific premium effects (magnetic button, etc.)
- Directory: `examples/components/[component-name]/`

### Step 2: Create the directory

```
examples/pages/[product-type]-[page-type]/
  README.md
  page.tsx

examples/components/[component-name]/
  README.md
  [component-name].tsx
```

### Step 3: Write the README first

The README must document:
- Blueprint used and why
- Palette used and why
- Key design decisions (3–5 specific choices made)
- What was deliberately avoided (and why — reference specific anti-patterns)
- Dependencies required

### Step 4: Write the component/page

Requirements:
- Complete TypeScript, strict mode compatible
- All imports present
- No placeholder content — realistic dummy data
- All interactive states implemented
- Responsive
- No gradient backgrounds, no glow effects
- Passes the quality bar checklist from `core/quality-bar.md`

### Step 5: Update `examples/_index.md`

Add entry with: directory, description, blueprint used, palette used.
