# Component Prompt: Toast System

---

## Generation Scaffold

```
Generate a toast notification system for [product name].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]

**Library preference:** Sonner (default) / custom (if Sonner unavailable)

**Toast types required:** success, error, warning, info

**Duration:** success/info: 4000ms, warning: 5000ms, error: 6000ms

**Position:** bottom-right (default) / bottom-center (mobile-first)

**Styling:** neutral `bg-background border border-border` surface, semantic icon per type, no colored backgrounds

**For Sonner implementation:**
- Toaster in root layout with `toastOptions.classNames` matching the design system
- Wrapper utility at `lib/toast.ts` with typed `success`, `error`, `warning`, `info`, `promise` methods
- Include a promise variant example for async operations

**For custom implementation:**
- AnimatePresence with `mode="popLayout"` from Framer Motion
- Enter: `opacity: 0, y: 8, scale: 0.98` → `opacity: 1, y: 0, scale: 1` (200ms)
- Exit: `opacity: 0, y: -4, scale: 0.98` (150ms)
- Auto-dismiss per type duration, pause on hover

**Output the complete toast system including Toaster placement and usage examples.**
```
