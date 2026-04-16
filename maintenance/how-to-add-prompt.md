# How to Add a Prompt Template

---

## When to Add a Prompt Template

Add a prompt template when:
- A generation task is requested frequently enough that a reusable scaffold adds efficiency
- The task has non-obvious pre-generation decisions that should be captured
- There are specific anti-patterns for this task type that should be explicitly rejected

---

## Process

### Step 1: Identify the correct directory

| Prompt type | Directory |
|---|---|
| Full page generation | `prompts/pages/` |
| Section generation | `prompts/sections/` |
| Component generation | `prompts/components/` |
| Refinement / transformation | `prompts/refinement/` |
| Reference adaptation workflow | `prompts/adaptation/` |

### Step 2: Create the file

```
prompts/[directory]/[target-name].md
```

### Step 3: Required sections

Every prompt template must include:

1. **When to Use** — specific conditions, not vague
2. **Pre-Generation Decisions** — questions to answer BEFORE generating
3. **Generation Scaffold** — the actual prompt template with `[variable]` placeholders
4. **Quality Criteria** — verifiable checklist, not vague principles
5. **Anti-Patterns** (for component/page prompts) — what to explicitly reject

### Step 4: Update `prompts/_index.md`

Add entry to the correct table with: file, what it generates, key decisions.

---

## Prompt Quality Bar

A good prompt template:
- Has specific, answerable pre-generation questions (not "what kind of design do you want?")
- Has a generation scaffold that can be filled in under 2 minutes
- Has a quality criteria checklist that takes under 1 minute to run through
- Produces meaningfully better output than generating without the template

If the template doesn't improve output quality over an unstructured prompt, it's not worth the overhead.
