# Pattern: Pricing Toggle

Monthly/yearly pill with a savings badge. Used whenever a pricing section offers both cadences. The savings pill is what makes it feel product-grade instead of generic.

---

## JSX

```jsx
function PricingToggle({ value, onChange }) {
  return (
    <div className="pricing-toggle">
      <button
        className={value === 'monthly' ? 'on' : ''}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </button>
      <button
        className={value === 'yearly' ? 'on' : ''}
        onClick={() => onChange('yearly')}
      >
        Yearly
        <span className="savings">Save 20%</span>
      </button>
    </div>
  );
}
```

---

## CSS

```css
.pricing-toggle {
  display: inline-flex; padding: 4px;
  border: 1px solid var(--line); border-radius: 999px;
  background: var(--bg-elev);
}
.pricing-toggle button {
  padding: 8px 16px; font-size: 13px; color: var(--fg-dim);
  border-radius: 999px; display: inline-flex; align-items: center; gap: 8px;
  border: 0; background: transparent; cursor: pointer;
}
.pricing-toggle button.on {
  background: var(--surface);
  color: var(--fg);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 0 0 1px var(--line);
}
.pricing-toggle .savings {
  font-family: var(--font-mono); font-size: 10.5px;
  padding: 2px 6px; border-radius: 4px;
  background: var(--accent-soft);
  color: var(--accent);
  letter-spacing: 0.04em;
}
```

---

## Rules

- **Yearly must actually save something.** Fake discount pills erode trust. Pick a real discount (15%, 20%, 25%) and apply it to the prices.
- **The "Save X%" pill uses `--accent-soft`.** Never hardcode the tint.
- **Keep it a pill, not a checkbox or a full switch component.** The pill shape reads as segmented, which matches the behavior.
- **The featured plan's price changes when toggled.** Do not leave both prices visible simultaneously "for reassurance" — it breaks the mechanism.
