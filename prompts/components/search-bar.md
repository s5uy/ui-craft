# Component Prompt: Search Bar

---

## Generation Scaffold

```
Generate a search component for [product name / search context].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]

**Search type:**
- [x] Inline search with dropdown results (standard)
- [ ] Global command palette (see navigation/command-palette-patterns.md)

**Result configuration:**
- Source: [async API / local filter / hybrid]
- Debounce: [200ms default for async, 50ms for local]
- Result fields: [title, subtitle?, category?, href?]
- Grouping: [by category / flat list]
- Max results shown: [5–8]

**States required:**
- Default (empty) — search icon, placeholder text
- Typing — live filtering / async loading indicator
- Results — dropdown list, keyboard navigable
- No results — clear message
- Loading — inline spinner (not replacing search icon)

**Anti-patterns:**
- No spotlight glow on focus
- No oversized search bar (`py-4 text-lg`) — use `py-2 text-sm` standard
- No backdrop blur on results dropdown
- Results dropdown must be `position: absolute` (doesn't push page content)

**Output the complete search component with [async / local] result handling.**
```
