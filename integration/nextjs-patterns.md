# Next.js Patterns

Next.js-specific patterns for ui-craft output.

---

## App Router Defaults

**Server components are default.** `page.tsx`, `layout.tsx`, and all components are server components unless marked `"use client"`.

**When to add `"use client"`:**
- Component uses React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Component uses browser APIs (`window`, `document`, `localStorage`)
- Component uses event handlers that require interactivity
- Component uses context that requires client-side state

**When NOT to add `"use client"`:**
- Component just renders HTML/JSX
- Component receives data as props from a server component
- Component only uses `className`, `style`, `children` props

---

## Component Classification

```tsx
// SERVER COMPONENT — no "use client", can be async
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetchDashboardData()  // direct server-side data fetch
  return <Dashboard data={data} />
}

// CLIENT COMPONENT — has interactivity
// components/dashboard/date-range-selector.tsx
"use client"
import { useState } from "react"
export function DateRangeSelector({ onChange }: { onChange: (range: string) => void }) {
  const [selected, setSelected] = useState("30d")
  // ...
}
```

---

## `next/link` and `next/image`

Always use framework primitives for navigation and images:

```tsx
// WRONG
<a href="/dashboard">Dashboard</a>
<img src="/logo.png" alt="Logo" />

// RIGHT
import Link from "next/link"
import Image from "next/image"

<Link href="/dashboard">Dashboard</Link>
<Image src="/logo.png" alt="Logo" width={120} height={32} />
```

`next/image` requires `width` and `height` props (or `fill` for layout-filling images). For dynamic images:

```tsx
<div className="relative aspect-video overflow-hidden rounded-lg">
  <Image
    src={imageUrl}
    alt={altText}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

---

## Metadata

```tsx
// app/layout.tsx or app/[route]/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard — Acme",
  description: "Monitor your key metrics and track performance.",
}
```

Dynamic metadata:
```tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = await getProject(params.id)
  return {
    title: `${project.name} — Acme`,
  }
}
```

---

## Error Handling

```tsx
// app/error.tsx — global error boundary
"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="...">Try again</button>
    </div>
  )
}

// app/not-found.tsx — 404 page
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Link href="/" className="...">Go home</Link>
    </div>
  )
}
```

---

## Loading States

```tsx
// app/dashboard/loading.tsx — shown while page.tsx is loading
export default function Loading() {
  return (
    <div className="space-y-6 px-6 py-6">
      <div className="h-7 w-32 rounded bg-muted animate-pulse" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-5 space-y-3">
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            <div className="h-8 w-28 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Route Handlers (API Routes)

```tsx
// app/api/[route]/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  
  try {
    const data = await fetchData(query)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // process body
  return NextResponse.json({ success: true }, { status: 201 })
}
```
