# Upload Patterns

---

## Mental Model

A file upload component manages the full lifecycle of a file: selection → validation → preview → upload → status. Every state must be communicated clearly — the user must always know what they can do, what is happening, and what has happened. Upload components fail when they handle the default case (successful file drop) and nothing else.

---

## Anatomy

| Part | Role | Required? |
|---|---|---|
| Drop zone | Drag target + click-to-browse trigger | Yes |
| Active drag state | Visual feedback during drag-over | Yes |
| File preview | Shows selected file(s) | Yes |
| File name + size | Identifies the file | Yes |
| Remove button | Cancel selection | Yes |
| Upload progress | % complete during upload | Yes (async uploads) |
| Success state | Upload complete confirmation | Yes |
| Error state | Upload failed with reason | Yes |
| File type hint | What files are accepted | Yes |
| Size limit hint | Maximum file size | Yes |

---

## Implementation

### Single file upload with preview

```tsx
"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, X, File, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type UploadStatus = "idle" | "dragging" | "selected" | "uploading" | "success" | "error"

interface UploadedFile {
  file: File
  preview?: string
  progress: number
  error?: string
}

interface FileUploadProps {
  accept?: string
  maxSizeMB?: number
  onUpload: (file: File) => Promise<string>  // returns URL on success
  onSuccess?: (url: string) => void
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUpload({ accept = "image/*", maxSizeMB = 10, onUpload, onSuccess }: FileUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const maxBytes = maxSizeMB * 1024 * 1024

  const validateFile = (file: File): string | null => {
    if (maxBytes && file.size > maxBytes) {
      return `File exceeds ${maxSizeMB}MB limit (${formatBytes(file.size)})`
    }
    return null
  }

  const processFile = useCallback(async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setUploadedFile({ file, progress: 0, error: validationError })
      setStatus("error")
      return
    }

    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined

    setUploadedFile({ file, preview, progress: 0 })
    setStatus("uploading")

    try {
      const url = await onUpload(file)
      setUploadedFile((prev) => prev ? { ...prev, progress: 100 } : null)
      setStatus("success")
      onSuccess?.(url)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed"
      setUploadedFile((prev) => prev ? { ...prev, error: message } : null)
      setStatus("error")
    }
  }, [onUpload, onSuccess, maxBytes, maxSizeMB])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setStatus("idle")
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [processFile])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setStatus("dragging")
  }

  const handleDragLeave = () => setStatus("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleRemove = () => {
    if (uploadedFile?.preview) URL.revokeObjectURL(uploadedFile.preview)
    setUploadedFile(null)
    setStatus("idle")
    if (inputRef.current) inputRef.current.value = ""
  }

  // Show file preview when a file is selected/uploading/done
  if (uploadedFile) {
    return (
      <div className="rounded-lg border border-border bg-background p-4">
        <div className="flex items-center gap-3">
          {/* Preview or file icon */}
          {uploadedFile.preview ? (
            <img
              src={uploadedFile.preview}
              alt="Preview"
              className="h-10 w-10 rounded object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
              <File className="h-5 w-5 text-muted-foreground" />
            </div>
          )}

          {/* File info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {uploadedFile.file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(uploadedFile.file.size)}
            </p>
          </div>

          {/* Status + remove */}
          <div className="flex items-center gap-2">
            {status === "uploading" && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {status === "success" && (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            )}
            {status === "error" && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
            <button
              onClick={handleRemove}
              disabled={status === "uploading"}
              className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Upload progress */}
        {status === "uploading" && (
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-300"
              style={{ width: `${uploadedFile.progress}%` }}
            />
          </div>
        )}

        {/* Error message */}
        {uploadedFile.error && (
          <p className="mt-2 text-xs text-destructive">{uploadedFile.error}</p>
        )}
      </div>
    )
  }

  // Drop zone
  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          status === "dragging"
            ? "border-ring bg-accent/5"
            : "border-border hover:border-muted-foreground/40 hover:bg-muted/30"
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {status === "dragging" ? "Drop to upload" : "Drop a file or click to browse"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {accept.replace("image/*", "PNG, JPG, GIF, WebP")} up to {maxSizeMB}MB
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="sr-only"
      />
    </div>
  )
}
```

---

## Integration Notes

**`URL.createObjectURL`:** Always call `URL.revokeObjectURL` when removing a preview to prevent memory leaks. This is done in the `handleRemove` callback above.

**Upload progress:** Real upload progress requires the XHR `progress` event or a custom fetch implementation with progress tracking. If using `fetch`, simulate progress based on timing or omit the progress bar.

**Multiple files:** For multi-file upload, maintain an array of `UploadedFile` states. Use the same `processFile` function per file, tracking each independently.

**File type validation:** Server-side validation is required in addition to client-side `accept`. Never rely solely on the `accept` attribute.

---

## Quality Benchmarks

A production-grade upload component must:

- Show a clear drag-over state (border color change, background tint)
- Show the file name and size after selection
- Have a remove/cancel button available after file selection
- Show upload progress for async uploads
- Show a clear success or error state after upload completes
- Handle the error state with a specific message
- Enforce the file size limit client-side with a clear error

---

## Anti-Patterns

**Invisible drop zone:** A drop zone with no border and only text — no visual indication of where to drag. The dashed border is the affordance.

**No remove button:** A file upload where the user cannot deselect the file after selecting it. The remove button is required.

**Generic "Upload failed" error:** When an upload fails, the error message must say why. "File too large", "Unsupported format", "Server error — please try again" — not "Upload failed."

**Blocking the form on upload:** Disabling the submit button while upload is in progress for a non-blocking upload (e.g., the URL can be entered after the fact). Only block form submission if the upload result is required for form submission.
