# Project Setup

New project setup for ui-craft compatible output.

---

## Recommended Stack

```
Framework:      Next.js 14+ (App Router)
Language:       TypeScript (strict mode)
Styling:        Tailwind CSS v3+
Components:     shadcn/ui
Icons:          lucide-react
Animation:      framer-motion
Forms:          react-hook-form + zod
Notifications:  sonner
Fonts:          next/font (Google Fonts or local)
```

---

## Quick Start

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest my-project --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-project

# Initialize shadcn
npx shadcn@latest init

# Install additional dependencies
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers sonner class-variance-authority

# Optional — forms with validation
npm install @hookform/resolvers
```

## shadcn Init Options

When running `npx shadcn@latest init`:
- Style: Default (New York is also acceptable)
- Base color: match your palette family (Slate for neutral-cool, Stone for neutral-warm, Gray for monochrome, Zinc for deep-technical)
- CSS variables: Yes (required for palette customization)

---

## tsconfig.json (strict mode)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Tailwind Configuration

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      // shadcn color tokens are added here by `shadcn init`
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

---

## Essential shadcn Components to Install

```bash
# Core UI primitives
npx shadcn@latest add button input label textarea select

# Layout
npx shadcn@latest add card separator

# Overlays
npx shadcn@latest add dialog dropdown-menu sheet tooltip

# Navigation
npx shadcn@latest add navigation-menu

# Forms
npx shadcn@latest add form checkbox radio-group switch

# Feedback
npx shadcn@latest add badge progress skeleton

# Data
npx shadcn@latest add table

# Command
npx shadcn@latest add command

# Notifications
npx shadcn@latest add sonner
```

---

## Font Setup (next/font)

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## globals.css — Palette Token Setup

After `shadcn init`, customize the CSS variables in `globals.css` to match your target palette. Example for neutral-cool palette:

```css
@layer base {
  :root {
    --background: 210 20% 98%;       /* #F8FAFC */
    --foreground: 215 28% 17%;       /* #1E293B */
    --card: 0 0% 100%;
    --card-foreground: 215 28% 17%;
    --muted: 210 17% 95%;            /* #F1F5F9 */
    --muted-foreground: 215 14% 47%; /* #64748B */
    --border: 214 16% 88%;           /* #E2E8F0 */
    --input: 214 16% 88%;
    --ring: 221 83% 53%;             /* blue-600 */
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --destructive: 0 72% 51%;        /* red-600 */
    --destructive-foreground: 0 0% 100%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222 47% 6%;        /* zinc-950 */
    --foreground: 213 17% 90%;
    --card: 222 47% 9%;
    --muted: 217 33% 12%;
    --muted-foreground: 215 14% 58%;
    --border: 217 33% 17%;
    --ring: 217 91% 65%;             /* blue-400 */
    --primary: 217 91% 65%;
  }
}
```
