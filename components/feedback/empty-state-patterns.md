# Empty State Patterns

---

## Mental Model

An empty state communicates that a list, table, or container has no content yet. It must answer two questions: why is this empty, and what should the user do next? Every empty state without a clear next action is a dead end.

Empty states are opportunities for guidance, not for decoration.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Icon or illustration | Visual type signal | Recommended (icon, not illustration) |
| Title | Explains the empty condition | Yes |
| Description | Context and next step | Yes |
| Primary action | The thing to do to get out of the empty state | Situational (yes if one exists) |

---

## Implementation

### Standard empty state

```tsx
import { FolderOpen } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon = FolderOpen, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
```

### Empty state for tables

```tsx
export function TableEmptyState({ message = "No records found." }: { message?: string }) {
  return (
    <tr>
      <td colSpan={100} className="py-12 text-center">
        <p className="text-sm text-muted-foreground">{message}</p>
      </td>
    </tr>
  )
}
```

### Search empty state

```tsx
export function SearchEmptyState({ query }: { query: string }) {
  return (
    <div className="py-12 text-center">
      <p className="text-sm font-medium text-foreground">No results for &ldquo;{query}&rdquo;</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Try different keywords or check your spelling.
      </p>
    </div>
  )
}
```

---

## Quality Benchmarks

- Title must describe the specific empty condition (`"No projects yet"` not `"Nothing here"`)
- Description must explain why and ideally point to a next action
- Icon should be contextually relevant to the content type, not generic
- If an action exists to fill the empty state, it must be present and prominent

---

## Anti-Patterns

**Illustration as primary content:** Custom SVG illustration (person looking through telescope, empty inbox with dove) as the primary empty state element. Illustrations are expensive to maintain, inconsistent across teams, and don't communicate faster than a good icon + title.

**No action:** An empty state with a title and description but no CTA when there is a logical next step. If the user can create a project to fill an empty projects list, the empty state must have a "New project" button.

**Generic "Nothing here":** A title that provides no context. Always make the empty state title specific: `"No active projects"`, `"No results for 'search query'"`, `"No team members yet"`.
