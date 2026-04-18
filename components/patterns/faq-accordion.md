# Pattern: FAQ Accordion

CSS-driven open/close. No JS height measurement. Uses `max-height` transition + a plus-to-x icon rotation.

---

## JSX

```jsx
function FAQ({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq">
      {items.map((it, i) => (
        <div className="faq-item" key={i} data-open={open === i}>
          <button
            className="faq-q"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{it.q}</span>
            <span className="faq-icon" aria-hidden>+</span>
          </button>
          <div className="faq-a">
            <div className="faq-a-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Example items:
const items = [
  { q: 'How is this different from Vercel?',
    a: 'We run your workloads on your own cloud accounts. You keep ownership of the VPC, the IAM, and the data plane. We provide the control plane, the scheduler, and the observability layer.' },
  { q: 'What happens when a deploy fails at 3am?',
    a: 'Failures roll back automatically. You get a Slack alert with the deploy ID, the failing check, and the rollback status. No pager duty required for rollbacks.' },
  { q: 'Can we self-host?',
    a: 'The control plane runs as a Helm chart on any Kubernetes cluster. We publish the charts publicly and support air-gapped deployments on Enterprise.' },
  { q: 'Is my data encrypted at rest?',
    a: 'Yes — AES-256 at rest, TLS 1.3 in transit, customer-managed keys on Enterprise. SOC 2 Type II and ISO 27001 certified.' },
  { q: 'What is your SLA?',
    a: '99.95% monthly uptime on Pro, 99.99% on Enterprise with single-digit-minute credits for any miss. See status.foundry.dev for historical data.' },
  { q: 'Do you support multi-region?',
    a: 'Every deployment is multi-region by default. Traffic shifts automatically on region degradation. You pick primary/secondary in the project settings.' },
];
```

---

## CSS

```css
.faq { display: flex; flex-direction: column; gap: 4px; }
.faq-item {
  border-top: 1px solid var(--line);
  overflow: hidden;
}
.faq-item:last-child { border-bottom: 1px solid var(--line); }

.faq-q {
  width: 100%; padding: 20px 4px;
  display: flex; justify-content: space-between; align-items: center; gap: 20px;
  font-size: 16px; color: var(--fg); text-align: left;
  background: transparent; border: 0; cursor: pointer;
}
.faq-q:hover { color: var(--fg); }

.faq-icon {
  width: 22px; height: 22px; display: grid; place-items: center;
  font-family: var(--font-mono); font-size: 16px;
  color: var(--fg-muted);
  transition: transform .25s ease, color .25s;
}
.faq-item[data-open="true"] .faq-icon {
  transform: rotate(45deg);
  color: var(--accent);
}

.faq-a {
  max-height: 0; overflow: hidden;
  transition: max-height .3s ease;
}
.faq-item[data-open="true"] .faq-a {
  max-height: 320px;
}
.faq-a-inner {
  padding: 0 4px 24px;
  color: var(--fg-dim);
  font-size: 15px;
  max-width: 70ch;
  line-height: 1.6;
}
```

---

## Content Rules

- **Write 6 questions minimum.** Fewer feels unfinished.
- **Questions must sound like real objections** from the target user. For developer tools: "How is this different from X?" / "What happens at the edge case of Y?" / "Can we self-host?"
- **Answers are 1–3 sentences.** No bullet lists. No essays.
- **First letter of answer is often a verb, not "We/Our".** "We believe…" is weaker than "Every deployment is multi-region by default."
- **Do not write marketing questions like "Why should I choose Foundry?"** — that is a softball the product writes to itself and it screams "generic FAQ."
