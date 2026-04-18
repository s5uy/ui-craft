# Recipe: AI Product — Dark Technical

For AI model pages, agent platforms, inference APIs, LLM tooling, eval harnesses.

---

## Scope

**Use for:**
- Foundation model launches
- AI agent or orchestration platforms
- Inference/hosting APIs
- Eval, observability, safety tooling for LLMs
- Fine-tuning or distillation products

**Not for:**
- Consumer chatbot apps (warmer palette; `consumer-product-warm.md` with AI tweaks)
- AI-powered productivity apps (lean `b2b-saas-sober.md`)

---

## Design System

- **Blueprint:** Spatial Immersive × Command Center
- **Palette:** Dark Technical from `core/token-system.md`
- **Accent default:** sky (`oklch(0.82 0.13 230)`) — cooler than mint, signals "model not tool"
- **Typography:** Inter Tight + JetBrains Mono + Instrument Serif (italic) used once for a quote from a researcher
- **Signature pattern:** a live `ChatPromptPanel` with streaming tokens — see `components/patterns/` (or scraped `aichats.md`)

---

## Section Order

| # | Section | Job |
|---|---|---|
| 1 | Nav | Brand + docs / pricing / changelog + Cmd+K + API key button |
| 2 | Hero | Split: left = headline + subhead + CTA + 3 capability chips (context window, latency, eval score). Right = streaming chat panel. |
| 3 | Benchmarks | 3–5 eval tables or bar charts with realistic scores vs named competitors (GPT-4, Claude, Llama). Mono font on all numbers. |
| 4 | Capabilities | Tablist or alternating 2-col: code, reasoning, vision, tool use, long context — each with a concrete demo snippet. |
| 5 | API surface | Code-first block with tabs (Python / TypeScript / curl). Show a real-looking request + streaming response. |
| 6 | Safety / reliability | Short, sober section. 3–4 facts: red-teaming process, rate limits, retention policy, region availability. |
| 7 | Pricing | Usage-based: input token / output token / cached token rows in a mono table. Not 3 tiers. |
| 8 | FAQ | Latency, context window, fine-tuning availability, data retention, BAA/SOC2, streaming. |
| 9 | CTABanner | Single line: "Start building. 10M tokens free." |
| 10 | Footer | Same as developer-tool recipe. Include a model version / status pill in the brand block. |

---

## Voice Cues

- Specific: context window, tokens/sec, p50 latency, tool use, JSON mode, streaming, function calling
- Numbers: `200K context`, `41 tok/s`, `$3/M in / $15/M out`, `87.3% on SWE-bench Verified`
- Forbidden: "harness the power of AI", "intelligence at scale", "the future of work", "magical"
- Favor: "the model that doesn't hallucinate benchmarks", "built for production, tested in eval"

---

## Failure Signals

- ❌ Hero has a glowing brain icon, purple gradient, or any "AI aesthetic" visual cliché
- ❌ Benchmarks are invented round numbers (`95%`, `100x`, `10x faster`)
- ❌ Pricing is "Contact us" with no per-token table
- ❌ No code snippet anywhere on the page
- ❌ Copy uses "magic," "powered by AI," or "next generation"
