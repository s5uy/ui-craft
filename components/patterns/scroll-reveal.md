# Pattern: Scroll Reveal

Gentle fade + translate on scroll. Required on every below-fold section. Implemented via IntersectionObserver + a class toggle — never a per-element motion library setup.

---

## Hook

```jsx
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
```

Call `useReveal()` once at the app root. Add `className="reveal"` to any element that should animate in. Optionally stagger via inline style:

```jsx
<div className="reveal">First</div>
<div className="reveal" style={{ transitionDelay: '.08s' }}>Second</div>
<div className="reveal" style={{ transitionDelay: '.16s' }}>Third</div>
```

---

## CSS

```css
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .7s ease, transform .7s ease;
}
.reveal.in {
  opacity: 1;
  transform: none;
}
```

---

## Rules

- **12px translate. 700ms ease.** Not 40px. Not 300ms. These values feel premium; larger/faster values feel theatrical.
- **Do not reveal elements above the fold.** The hero is visible on first paint. Never wait to fade it in.
- **Stagger delays max 150ms between items.** Anything more feels slow.
- **Do not combine with scale or rotate.** Translate + opacity only.
- **One-shot.** After `.in` is added, unobserve. Never replay on scroll-back.

## Framer Motion equivalent (if the stack requires it)

```jsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-40px' }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
>
  {children}
</motion.div>
```
