# Pattern: Animated Counter

Numeric value that counts up from 0 when it enters the viewport. Used in hero metric rows and Stats sections.

---

## JSX

```jsx
function Counter({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);

  const rendered = decimals > 0
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();

  return <span ref={ref}>{rendered}{suffix}</span>;
}

// Usage:
<Counter to={99.99} decimals={2} suffix="%" />
<Counter to={38} />
<Counter to={1200} />+
```

---

## Rules

- **1200ms is the right duration.** Shorter feels twitchy, longer feels stalled.
- **Use `easeOutCubic` curve.** Linear count-up feels mechanical.
- **Use `toLocaleString()` for integers.** `1,247` reads better than `1247`.
- **Use `toFixed(N)` for decimals.** `99.99%` not `99.9900000%`.
- **One-shot.** Do not re-animate on scroll-back. Disconnect the observer after first fire.
- **Do not animate currencies while the `$` prefix is already visible.** `$0 → $2,847,392` reads fine because the `$` is static.
- **Put Counter inside a span, wrap suffix outside it** if the suffix is `ms`, `%`, `k`, `+`, etc. Mono font on the whole metric cell.
