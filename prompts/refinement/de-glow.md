# Refinement Prompt: De-Glow

Targeted glow effect removal. Use when output has glow-based shadows, neon borders, or ambient light effects.

---

## Glow Removal Prompt

```
Remove all glow effects from this component. Replace with flat, production-appropriate alternatives.

**Existing code:**
[paste the existing code here]

**Glow removal rules:**
- Colored box-shadow (`shadow-[0_0_*_rgba(*)]`) → remove shadow entirely
- Tailwind colored shadows (`shadow-indigo-500/50`) → remove entirely  
- `backdrop-blur` on non-functional panels → remove blur, keep solid background
- `blur-3xl`/`blur-2xl` decorative colored divs → remove entirely
- Focus glow (`shadow-[0_0_0_3px_rgba(*)]`) → replace with `ring-2 ring-ring ring-offset-2`
- Neon borders (`border-indigo-500 shadow-[0_0_20px_*]`) → keep border, remove shadow
- Text shadow for decoration → remove

**Legitimate shadows to KEEP:**
- `shadow-sm`, `shadow-md` on cards and modals (black/transparent, no color)
- `shadow-lg` on dropdowns and overlays
- Single-axis depth shadows: `shadow-[0_2px_4px_rgba(0,0,0,0.08)]`

**Output the complete de-glowed code.**
```

---

## Quick Reference: Glow → Flat

| Glow pattern | Flat replacement |
|---|---|
| `shadow-[0_0_30px_rgba(99,102,241,0.5)]` | remove |
| `shadow-indigo-500/50` | remove |
| `focus:shadow-[0_0_0_3px_rgba(*)]` | `focus-visible:ring-2 focus-visible:ring-ring ring-offset-2` |
| `blur-3xl bg-purple-500/20` (ambient div) | remove element |
| `backdrop-blur bg-white/10` (decorative) | `bg-card` |
| `border-violet-500 shadow-[0_0_20px_*]` | `border-violet-500` (keep border, no shadow) |
