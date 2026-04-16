# Page Prompt: Auth Page

---

## Pre-Generation Decisions

1. **Auth type:** sign in / sign up / forgot password / reset password
2. **OAuth providers:** none / GitHub / Google / both / other
3. **Brand weight:** minimal (form-only) / standard (logo + form) / split (brand panel + form)
4. **Required fields:** (for signup) email only / email + password / email + password + name / other
5. **Blueprint:** typically Enterprise Neutral or Editorial Warm for auth

---

## Generation Scaffold

```
Generate a complete [sign in / sign up] page for [product name].

**Design system:**
- Blueprint: [Enterprise Neutral / Editorial Warm]
- Palette: [neutral-cool / neutral-warm / high-trust]
- Layout: centered form (max-w-sm) with muted background

**Form configuration:**
- Fields: [list all required fields]
- OAuth: [GitHub / Google / none]
- Validation: client-side with inline error messages per field
- Loading state: button shows spinner + "Signing in..." during submission

**Content:**
- Product name: [name]
- Form title: "[Sign in to your account / Create your account]"
- Alt action: "[Don't have an account? Sign up / Already have an account? Sign in]"
- Submit button: "[Sign in / Get started]"
- Trust note (below form): [e.g., "No credit card required." / "Free 14-day trial."]

**Auth rules:**
- Error messages must be specific — never "Something went wrong"
- Password field must have visibility toggle
- Email field: `autoComplete="email"`, Password: `autoComplete="current-password"` (signin) or `autoComplete="new-password"` (signup)
- "Forgot password?" link adjacent to password label on sign in form

**Code requirements:**
- `"use client"` directive
- `useState` for field values, loading, showPassword
- `onSubmit` prop for form submission (not inline — let parent handle auth)
- Explicit TypeScript interface

**Output the complete auth page component.**
```

---

## Quality Criteria

- [ ] `autoComplete` attributes on all fields
- [ ] Password visibility toggle
- [ ] Loading state prevents double-submit
- [ ] Error messages at form level (auth failure) and field level (validation)
- [ ] "Forgot password?" link on sign in form, adjacent to password label
- [ ] No decorative gradient background
- [ ] Max-w-sm form container centered in a muted background
