# Page Prompt: Settings Page

---

## Pre-Generation Decisions

1. **Settings scope:** user account / workspace / organization / application
2. **Section list:** [profile, security, notifications, billing, team, integrations, etc.]
3. **Layout:** sidebar navigation / tab navigation / single scrollable page
4. **Density:** standard for most, compact for dense data (billing history, API keys)
5. **Destructive zone:** yes (delete account, leave workspace) / no

---

## Generation Scaffold

```
Generate a complete settings page for [product name].

**Design system:**
- Blueprint: Enterprise Neutral (default for settings)
- Palette: neutral-cool

**Layout:** [sidebar nav / tabs / single page]

**Sections to include:**
1. Profile — [name, email, avatar, bio]
2. Security — [password change, 2FA, sessions]
3. Notifications — [email preferences, in-app preferences]
4. [Additional sections as needed]

**Design rules:**
- Settings should feel dense and functional — `max-w-2xl` for form content
- Each section: clear heading (`text-lg font-semibold`), description (`text-sm text-muted-foreground`), horizontal rule between sections
- Form fields: standard input patterns with labels and helper text
- Save button per section (not one global save), with saved/loading/error states
- Destructive actions (delete account) at the bottom, visually separated, `destructive` variant button

**Destructive zone (if applicable):**
- Section label: "Danger zone"
- Red/destructive border treatment
- Action button: destructive variant
- Confirmation required (dialog with confirmation text input for permanent deletions)

**Code requirements:**
- Complete TypeScript with explicit interfaces
- State per section for save loading/success
- Each section independently saveable

**Output the complete settings page.**
```

---

## Quality Criteria

- [ ] Each section has its own save button with loading state
- [ ] Destructive actions are visually separated and require confirmation
- [ ] Form fields have labels, not just placeholders
- [ ] Settings sections have clear headings and brief descriptions
- [ ] `max-w-2xl` or similar constraint on form content — not full-width
