# Input Patterns

---

## Mental Model

Form inputs are the primary mechanism through which users give information to a system. Their design must prioritize two things: the user knows exactly what information is expected, and the user knows exactly whether their input is valid. Everything else is secondary.

Input design fails when it sacrifices legibility for visual polish.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Label | Describes what information is requested | Yes — never use placeholder-only |
| Input field | Receives user input | Yes |
| Placeholder | Provides example/hint format | No — use sparingly |
| Helper text | Contextual guidance below field | Situational |
| Error message | Specific description of what went wrong | Yes (when error state) |
| Required indicator | Signals mandatory fields | Yes (when form has optional fields) |
| Leading icon | Visual type hint | Situational |

---

## Interaction States

| State | Trigger | Visual treatment |
|---|---|---|
| Default | — | `border-border bg-background text-foreground` |
| Focus | User clicks or tabs in | `ring-2 ring-ring border-ring` outline |
| Filled | Has value | Same as default — no special treatment |
| Hover | Mouse over | Subtle border darkening `hover:border-border/80` |
| Error | Validation fails | Red border + error message below |
| Disabled | `disabled` prop | `opacity-50 cursor-not-allowed bg-muted` |
| Read-only | `readOnly` prop | `bg-muted cursor-default`, selectable text |

---

## Implementation

### Standard text input

```tsx
interface InputFieldProps {
  id: string
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  helperText,
  error,
  required,
  disabled,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        aria-invalid={error ? "true" : undefined}
        className={`
          block w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground
          placeholder:text-muted-foreground/60
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
          disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted
          transition-colors
          ${error ? "border-destructive focus:ring-destructive" : "border-border hover:border-border/80"}
        `}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
```

### Textarea

```tsx
interface TextareaFieldProps {
  id: string
  label: string
  placeholder?: string
  helperText?: string
  error?: string
  required?: boolean
  rows?: number
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextareaField({
  id,
  label,
  placeholder,
  helperText,
  error,
  required,
  rows = 4,
  value,
  onChange,
}: TextareaFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={error ? "true" : undefined}
        className={`
          block w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground
          placeholder:text-muted-foreground/60 resize-y
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
          transition-colors
          ${error ? "border-destructive focus:ring-destructive" : "border-border hover:border-border/80"}
        `}
      />
      {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
      {!error && helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  )
}
```

### Select

```tsx
interface SelectFieldProps {
  id: string
  label: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
  error?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function SelectField({
  id,
  label,
  options,
  placeholder = "Select an option",
  error,
  required,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={error ? "true" : undefined}
        className={`
          block w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
          transition-colors
          ${error ? "border-destructive" : "border-border hover:border-border/80"}
        `}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
    </div>
  )
}
```

### Input with leading icon

```tsx
import { Mail } from "lucide-react"

interface IconInputProps extends Omit<InputFieldProps, "onChange"> {
  icon: React.ComponentType<{ className?: string }>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function IconInput({ icon: Icon, id, label, ...props }: IconInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          id={id}
          className="block w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          {...props}
        />
      </div>
    </div>
  )
}
```

---

## Integration Notes

**With shadcn:** Use shadcn's `Input`, `Textarea`, `Select`, `Label` primitives as the base. Wrap them with the label/error/helper pattern shown above. Never use shadcn's `FormField` without React Hook Form unless the form is simple enough to not need it.

**With React Hook Form:**
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  // ...
}
```

---

## Quality Benchmarks

A production-grade input must:

- Have a `<label>` element associated with the input via `for`/`id` — never placeholder-only
- Display error messages adjacent to the relevant field with `role="alert"` for screen reader announcement
- Have a visible focus ring that works without mouse input
- Handle the disabled state: visual + functional (`disabled` attribute, not just styled)
- Not lose user input on error (keep the value, show the message)
- Have sufficient contrast for placeholder text (use `text-muted-foreground/60`, not lower)

---

## Anti-Patterns

**Placeholder as label:** Using `placeholder="Email address"` instead of a visible `<label>`. When the user types, the placeholder disappears — they can no longer see what field they're filling. This is an accessibility failure.

**Floating label:** The pattern where the label starts inside the input and floats up on focus. Visually clever, practically problematic — the label is invisible (or tiny) when the field is filled, making it hard for users to review their input.

**Error message without field association:** Error text below the input with no `aria-describedby` link. Screen readers announce input fields without the error context.

**Focus ring suppression:** `focus:outline-none` or `focus:ring-0` without replacement. Never suppress the default focus ring without providing a custom one.

**Oversized input fields:** Setting `h-12` or `h-14` on text inputs for "spacious feel" wastes form real estate. Standard `h-9` or `h-10` is correct.

---

## Blueprint-Specific Notes

| Blueprint | Adaptation |
|---|---|
| Command Center | Dark input: `bg-[#0A0A0A] border-white/10 text-gray-100`, focus ring uses blue-400 or white, tight `h-8 py-1.5 px-3` |
| Spatial Immersive | `rounded-lg` generous, subtle border, `h-10`, focus ring accent-colored |
| Editorial Brutalism | `border-2 border-black rounded-none`, `h-10`, no background fill beyond white |
| Enterprise Neutral | Standard implementation, `h-9 rounded-md`, blue focus ring |
| Editorial Warm | Warm border `#DDD8CC`, `bg-[#FDFCF9]` background, warm placeholder color |
