# Image Uploader — Design Decisions

Blueprint: Enterprise Neutral
Pattern: Full drag-drop-preview-remove lifecycle

---

## What This Demonstrates

A complete file upload component that handles every state: idle, drag-over, file selected with preview, uploading with progress, success, and error. Nothing is mocked — the lifecycle is real and every state transition is handled.

---

## Design Decisions

### State machine, not boolean flags

```tsx
type UploaderState = "idle" | "dragging" | "selected" | "uploading" | "success" | "error"
```

Modeling the uploader as an explicit state machine (not `const [isDragging, setIsDragging] = useState(false)` + `const [isUploading, setIsUploading] = useState(false)` + ...) prevents impossible states — you can never be both uploading and dragging. Each state renders a distinct UI. Transitions are explicit.

### `URL.createObjectURL` for preview

```tsx
const previewUrl = URL.createObjectURL(file)
```

This creates a blob URL for immediate, synchronous preview without reading the file as base64. The corresponding `URL.revokeObjectURL(previewUrl)` in `handleRemove` prevents memory leaks. This is the correct pattern — not `FileReader.readAsDataURL`.

### Drag events: `onDragEnter` + `onDragOver` + `onDragLeave` + `onDrop`

All four are required for correct drag behavior:
- `onDragEnter` / `onDragOver` must call `e.preventDefault()` to allow the drop
- `onDragLeave` fires when crossing child element boundaries — handled by checking `e.relatedTarget` is outside the container
- `onDrop` calls `e.preventDefault()` and reads `e.dataTransfer.files`

Missing any of these produces broken behavior on different browsers.

### Validation before state transition

File type and size are validated synchronously before transitioning to `"selected"`. The error message is specific: "File must be JPEG, PNG, or WebP under 5MB" not "Invalid file." The user knows what to fix.

### Upload zone: dashed border, not colored background

The drop target is indicated by a dashed border and a subtle `bg-muted/50` on drag-over. A solid colored background (the common pattern) is too aggressive — it creates a jarring state change for what may be a brief cursor pass. The dashed border reads as "place here" without shouting.

### Progress bar: determinate, not spinner

During upload, a real progress bar updates as the upload proceeds. An indeterminate spinner is appropriate only when progress genuinely cannot be measured. For file uploads with `XMLHttpRequest` (or fetch with `ReadableStream`), progress is measurable. Show it.

### Image preview: contain, not cover

```tsx
<img src={previewUrl} alt="Preview" className="h-full w-full object-contain" />
```

`object-contain` for user-uploaded images — the preview should show the full image, not a cropped thumbnail. Use `object-cover` only when you own the image and know the aspect ratio.

---

## What Was Deliberately Excluded

- **Multiple file selection** — this component handles one file; multi-file complicates the state machine and is a separate pattern
- **Cropping UI** — out of scope; cropping is a separate concern
- **Upload to a real API** — the `uploadFile` function is injectable; the component doesn't own the transport
- **Drag from one component to another** — this handles drag from OS, not between components

---

## Accessibility

- Drop zone has `role="button"` and `tabIndex={0}` for keyboard access
- `onKeyDown` on the drop zone triggers file picker on Enter/Space
- Hidden `<input type="file">` is the actual file input — the drop zone is a visual affordance
- Progress bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- All interactive states have visible focus rings
