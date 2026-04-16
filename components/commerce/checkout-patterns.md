# Checkout Patterns

---

## Mental Model

Checkout is the highest-stakes form flow in e-commerce and SaaS. Every additional field, every unclear error, every moment of uncertainty is a conversion failure. The design must minimize cognitive load, maximize trust signals, and make forward progress the obvious and easy path.

---

## Implementation

### Multi-step checkout form

```tsx
"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckoutStep = "contact" | "payment" | "review"

const steps: Array<{ id: CheckoutStep; label: string }> = [
  { id: "contact", label: "Contact" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
]

interface OrderSummaryProps {
  items: Array<{ name: string; price: number; quantity: number }>
  subtotal: number
  tax: number
  total: number
}

function OrderSummary({ items, subtotal, tax, total }: OrderSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-5 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Order summary</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="text-foreground">
              {item.name} <span className="text-muted-foreground">×{item.quantity}</span>
            </span>
            <span className="font-mono tabular-nums text-foreground">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border pt-3 space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-mono tabular-nums text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-mono tabular-nums text-foreground">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className="text-foreground">Total</span>
          <span className="font-mono tabular-nums text-foreground">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

function StepIndicator({ currentStep }: { currentStep: CheckoutStep }) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isDone = i < currentIndex
        const isCurrent = i === currentIndex
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
                isDone ? "bg-emerald-600 text-white" :
                isCurrent ? "bg-foreground text-background" :
                "bg-muted text-muted-foreground"
              )}>
                {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={cn(
                "mt-1 text-xs",
                isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "mx-2 mb-5 h-px w-12",
                i < currentIndex ? "bg-emerald-600" : "bg-border"
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function CheckoutFlow({ orderSummary }: { orderSummary: OrderSummaryProps }) {
  const [step, setStep] = useState<CheckoutStep>("contact")

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-foreground">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-8">
            <StepIndicator currentStep={step} />
          </div>

          {step === "contact" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Contact information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-foreground">First name</label>
                  <input className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-foreground">Last name</label>
                  <input className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">Email</label>
                <input type="email" className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button
                onClick={() => setStep("payment")}
                className="mt-2 flex w-full items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Continue to payment →
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Payment</h2>
                <button onClick={() => setStep("contact")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Back
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                Payment form handled by Stripe — secure card entry.
              </p>
              <div className="rounded-md border border-border bg-background p-4 text-sm text-muted-foreground">
                Stripe Elements mount point
              </div>
              <button
                onClick={() => setStep("review")}
                className="flex w-full items-center justify-center rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Review order →
              </button>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Review your order</h2>
                <button onClick={() => setStep("payment")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Back
                </button>
              </div>
              <div className="rounded-md border border-border bg-muted/20 px-5 py-4">
                <p className="text-sm text-muted-foreground">Review details shown here</p>
              </div>
              <button className="flex w-full items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
                Place order — ${orderSummary.total.toFixed(2)}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                By placing your order you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-6 h-fit">
          <OrderSummary {...orderSummary} />
        </div>
      </div>
    </div>
  )
}
```

---

## Quality Benchmarks

- Order summary visible at all steps (sticky on desktop)
- Step indicator shows progress and which steps are complete
- "Back" button available at every step after the first
- Place order button shows the total price to remove last-moment uncertainty
- All prices use `font-mono tabular-nums` and consistent decimal places
- Legal copy (terms) present near the final submit button

---

## Anti-Patterns

**No order summary:** Hiding the order summary until the final step. Users need to see what they're buying throughout the flow.

**Final button says only "Place order":** Include the total in the button label: `"Place order — $49.00"`. This prevents hesitation from uncertainty.

**No back navigation:** Users must be able to revisit previous steps without starting over.
