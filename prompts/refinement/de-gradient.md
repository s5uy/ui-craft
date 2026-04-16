# Refinement Prompt: De-Gradient

Targeted gradient removal. Use when output has gradients but is otherwise well-structured — a surgical fix rather than a full de-slop.

---

## Gradient Removal Prompt

```
Remove all decorative gradients from this component. Replace each with the correct flat alternative. Do not change anything else.

**Existing code:**
[paste the existing code here]

**Gradient replacement rules:**
- Background gradients → solid background from the target palette (`bg-zinc-950`, `bg-background`, `bg-muted/30`)
- Gradient text (`bg-clip-text text-transparent`) → `text-foreground` or tonal contrast
- Gradient borders (1px wrapper technique) → solid `border border-primary` or `border border-border`
- Gradient dividers (`via-transparent hr`) → `<hr className="border-border" />`
- Gradient card backgrounds → `bg-card` or `bg-muted/30`
- Gradient button fills → solid `bg-primary`
- Gradient glow divs (`absolute blur-3xl bg-purple-500/20`) → remove entirely, no replacement

**Do not add any new visual effects to compensate. The flat version is the target.**

**Output the complete de-gradiented code.**
```

---

## Quick Reference: Gradient → Flat

| Gradient pattern | Flat replacement |
|---|---|
| `from-purple-900 via-slate-900 to-slate-900` | `bg-zinc-950` or `bg-background` |
| `from-blue-50 to-indigo-50` (light card) | `bg-muted/30` |
| `from-blue-400 to-purple-600 bg-clip-text` | `text-foreground` |
| `from-violet-600 to-indigo-600` (button) | `bg-primary` |
| `from-transparent via-border to-transparent` (hr) | `border-border` |
| `bg-purple-500/20 blur-3xl` (ambient) | remove |
| `p-[1px] bg-gradient-to-br` (border wrapper) | `border-2 border-primary` |
