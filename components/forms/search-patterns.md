# Search Patterns

---

## Mental Model

A search bar is a query input. Its job is to accept a query and return matching results — as accurately and quickly as possible. The design must make the input affordance obvious, the results scannable, and the interaction feel instant.

Every decoration added to a search bar — glows, spotlights, oversized animations — delays the user's ability to search and signals that the designer cared more about impressiveness than usability.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Input field | Accepts the query | Yes |
| Search icon | Signals input type | Yes |
| Placeholder | Example query | Recommended |
| Clear button | Remove current query | Yes (when field is filled) |
| Loading indicator | Query in progress | Yes (for async search) |
| Results list | Matches for current query | Yes |
| No results state | When nothing matches | Yes |
| Keyboard shortcut hint | Discoverability | Situational |

---

## Implementation

### Standard inline search

```tsx
"use client"

import { useState, useRef } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
  loading?: boolean
  className?: string
}

export function SearchInput({
  onSearch,
  placeholder = "Search...",
  loading,
  className,
}: SearchInputProps) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onSearch(e.target.value)
  }

  const handleClear = () => {
    setValue("")
    onSearch("")
    inputRef.current?.focus()
  }

  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full rounded-md border border-border bg-background py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
```

### Search with dropdown results

```tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  subtitle?: string
  category: string
  href: string
}

interface SearchWithResultsProps {
  onSearch: (query: string) => Promise<SearchResult[]>
  placeholder?: string
}

export function SearchWithResults({ onSearch, placeholder = "Search..." }: SearchWithResultsProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await onSearch(query)
        setResults(res)
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }, 200)  // 200ms debounce

    return () => clearTimeout(timer)
  }, [query, onSearch])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          onFocus={() => results.length > 0 && setOpen(true)}
        />
      </div>

      {open && (
        <div className="absolute top-full z-50 mt-1.5 w-full min-w-[320px] rounded-lg border border-border bg-background shadow-lg overflow-hidden">
          {results.length === 0 && !loading ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <a
                    href={result.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">
                      {result.category}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
```

---

## Integration Notes

**Debounce:** Always debounce async search queries — 150–250ms is the right range. Under 150ms creates too many requests; over 300ms feels sluggish.

**With shadcn cmdk:** For global command palette / search, use the Command component from shadcn which wraps cmdk. For inline search within a page or component, build directly as shown above.

**Keyboard navigation on results:** If the dropdown has more than 5 results and users need to navigate by keyboard, add `↑/↓` navigation with a `selectedIndex` state. See `navigation/command-palette-patterns.md` for the pattern.

---

## Quality Benchmarks

A production-grade search must:

- Debounce async requests (never fire a request per keystroke)
- Show a loading indicator during async queries — not a spinner replacing the search icon, but an inline spinner that doesn't shift the layout
- Show a clear "no results" message (not blank space)
- Have a clear button when the field has content
- Close results when clicking outside
- Be fully navigable by keyboard if the results are an interactive list

---

## Anti-Patterns

**The spotlight glow search bar:** A search bar with a radial gradient emanating from the input, `backdrop-blur`, and glowing borders. See `anti-patterns/component-demo-aesthetics.md`. Remove all of it.

**No debounce on async search:** Firing a network request on every keystroke creates unnecessary load and produces race conditions where older responses overwrite newer ones.

**Hiding the clear button:** Users expect to be able to clear a search field. If the input doesn't have a clear button, they'll try `Escape` or triple-click and delete. Add the clear button.

**Full-width results that push page content:** A search results dropdown should overlay the page content (`position: absolute`) — it should never be `position: relative` and push content down.

**Oversized search bar:** A `py-4 text-lg` search bar in the middle of a page, styled to look like a hero element. Unless search is the primary product interaction (a search engine, a command interface), the search bar should be compact and functional.
