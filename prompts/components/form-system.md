# Component Prompt: Form System

---

## Generation Scaffold

```
Generate a complete form for [form purpose — e.g., "new project creation", "contact request", "user profile"].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]

**Form fields:**
[List each field with: field name, type (text/email/password/select/textarea/checkbox), required/optional, validation rule]

Field 1: [name], type: [type], [required/optional], validation: [rule]
Field 2: ...

**Submit action:** "[button label]" — calls `onSubmit(data: FormData)` prop

**Validation library:** React Hook Form + Zod (default)

**Zod schema:** generate from field list above

**Error display:** inline below each field, `role="alert"`, `text-xs text-destructive`

**Loading state:** submit button disabled + spinner during submission

**Success state:** [form clears + success message / redirect / toast notification]

**TypeScript:** FormData type derived from Zod schema (`z.infer<typeof schema>`)

**Required anti-patterns to avoid:**
- No placeholder-as-label
- No `any` types
- No empty `onSubmit` handler
- All fields must have `<label>` elements

**Output the complete form component.**
```
