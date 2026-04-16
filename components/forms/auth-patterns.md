# Auth Patterns

---

## Mental Model

Authentication forms are the first experience a user has with a product's interface. They establish trust before the user has seen anything else. The design must communicate: this is a secure, professional product that will handle your account carefully. Every element that undermines that signal — decorative gradients, oversized branding, confusing form structure — reduces conversion and trust simultaneously.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Logo | Identity — establishes where the user is | Yes |
| Form title | Contextual heading ("Sign in" vs "Create account") | Yes |
| Input fields | Email, password, name | Yes |
| Submit button | Primary action | Yes |
| Alt action link | Switch between sign in / sign up | Yes |
| Error message | Specific auth failure detail | Yes |
| OAuth providers | Alternative authentication | Situational |
| Password visibility toggle | Usability | Recommended |
| Remember me / Stay signed in | Session preference | Situational |
| Forgot password link | Recovery entry point | Yes (on sign in) |

---

## Implementation

### Sign in form

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

interface SignInFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  error?: string
  loading?: boolean
}

export function SignInForm({ onSubmit, error, loading }: SignInFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(email, password)
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Logo */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block text-lg font-semibold text-foreground">
          Acme
        </Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-foreground hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Global error */}
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            placeholder="you@company.com"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {/* OAuth divider + providers */}
      <div className="mt-6">
        <div className="relative flex items-center gap-3">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 border-t border-border" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {/* GitHub icon */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {/* Google icon placeholder */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## Integration Notes

**Page layout:** Auth pages should use the centered task layout (`flex min-h-screen items-center justify-center bg-muted/20`). No sidebar, no competing navigation.

**With Next.js Auth.js (next-auth):** Use `signIn()` and `signOut()` from `next-auth/react`. Wrap in `SessionProvider` at root layout.

**Error messages:** Never display "Wrong password" — always "Email or password is incorrect." Don't reveal whether the email exists.

**`autoComplete` attributes:** Always set `autoComplete="email"` and `autoComplete="current-password"`. This enables password manager integration and is required for good UX.

---

## Quality Benchmarks

A production-grade auth form must:

- Have `autoComplete` attributes on all inputs for password manager support
- Have a visible loading state during submission (prevents double-submission)
- Show error messages at the form level (for auth failures) and field level (for validation)
- Have a password visibility toggle
- Work correctly on mobile with `inputMode="email"` on email fields
- Never reveal whether an email address exists in the system

---

## Anti-Patterns

**Full-page gradient background:** Auth pages with `bg-gradient-to-br from-purple-900 to-indigo-900` as the full-page background. Trust is communicated by restraint — clean, neutral, professional surfaces.

**Oversized logo:** A `h-16` or `h-20` logo at the top of the auth card that dominates the visual real estate. The logo should be modest — `h-7` or `h-8`.

**Missing "Forgot password" link:** Placing the "Forgot password?" link anywhere other than adjacent to the password field. It must be immediately discoverable at the moment of failure.

**Hiding the error:** Subtle `text-xs text-muted-foreground` error messages that users miss. Auth errors must be clearly visible — `text-destructive` with an icon.

**Split-screen decorative panel:** A 50% decorative image panel on the left (abstract shapes, gradient, product screenshot) with the form on the right. This is a common admin template pattern that adds no value and looks like a template.
