# Toggle, Checkbox, and Radio Patterns

---

## Mental Model

Toggles, checkboxes, and radios are binary and multi-state selection controls. They must communicate their current state unambiguously without relying on color alone. A toggle that only uses green/gray to distinguish on/off fails for users with color blindness.

---

## Implementation

### Toggle switch

```tsx
"use client"

import { cn } from "@/lib/utils"

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  id: string
}

export function Toggle({ checked, onChange, label, description, disabled, id }: ToggleProps) {
  return (
    <div className="flex items-start gap-3">
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-foreground" : "bg-input"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
      {(label || description) && (
        <label htmlFor={id} className="cursor-pointer space-y-0.5">
          {label && <p className="text-sm font-medium text-foreground">{label}</p>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </label>
      )}
    </div>
  )
}
```

### Checkbox

```tsx
import { Check, Minus } from "lucide-react"

interface CheckboxProps {
  checked: boolean | "indeterminate"
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  id: string
}

export function Checkbox({ checked, onChange, label, disabled, id }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        id={id}
        role="checkbox"
        aria-checked={checked === "indeterminate" ? "mixed" : checked}
        onClick={() => !disabled && onChange(checked === true ? false : true)}
        disabled={disabled}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked
            ? "border-foreground bg-foreground text-background"
            : "border-input bg-background"
        )}
      >
        {checked === "indeterminate" ? (
          <Minus className="h-2.5 w-2.5" />
        ) : checked ? (
          <Check className="h-2.5 w-2.5" />
        ) : null}
      </button>
      {label && (
        <label htmlFor={id} className="cursor-pointer text-sm text-foreground">
          {label}
        </label>
      )}
    </div>
  )
}
```

---

## Quality Benchmarks

- Toggle must use `role="switch"` and `aria-checked` for screen reader support
- Checkbox must use `role="checkbox"` with `aria-checked="mixed"` for indeterminate state
- State must be communicated through shape/position change in addition to color (toggle thumb position, checkmark presence)
- Focus ring must be visible via `focus-visible:ring-2`
- `disabled` prop must set both visual state and `aria-disabled`

---

## Anti-Patterns

**Color as the only state signal:** A toggle that only changes from gray to green — no position change, no shape change. Users with color blindness cannot determine state. The thumb position is the primary signal; color is reinforcing.

**Missing `aria-checked`:** A toggle visually built from a `<div>` with no ARIA attributes. Screen readers announce it as a generic element with no state.
