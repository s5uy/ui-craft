"use client"

import { useCallback, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, CheckCircle, AlertCircle, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Types ---

type UploaderState = "idle" | "dragging" | "selected" | "uploading" | "success" | "error"

interface UploadedFile {
  file: File
  previewUrl: string
}

interface ImageUploaderProps {
  /** Called with the File when the user confirms upload */
  onUpload: (file: File) => Promise<void>
  /** Accepted MIME types */
  accept?: string[]
  /** Max file size in bytes */
  maxSize?: number
  className?: string
}

const DEFAULT_ACCEPT = ["image/jpeg", "image/png", "image/webp"]
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024 // 5MB

// --- Component ---

export function ImageUploader({
  onUpload,
  accept = DEFAULT_ACCEPT,
  maxSize = DEFAULT_MAX_SIZE,
  className,
}: ImageUploaderProps) {
  const [state, setState] = useState<UploaderState>("idle")
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)

  // --- Validation ---

  const validate = (file: File): string | null => {
    if (!accept.includes(file.type)) {
      return `File must be ${accept.map((t) => t.split("/")[1].toUpperCase()).join(", ")}`
    }
    if (file.size > maxSize) {
      return `File must be under ${Math.round(maxSize / 1024 / 1024)}MB`
    }
    return null
  }

  // --- File handling ---

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validate(file)
      if (validationError) {
        setError(validationError)
        setState("error")
        return
      }

      const previewUrl = URL.createObjectURL(file)
      setUploaded({ file, previewUrl })
      setError(null)
      setState("selected")
    },
    [accept, maxSize]
  )

  const handleRemove = () => {
    if (uploaded) {
      URL.revokeObjectURL(uploaded.previewUrl)
    }
    setUploaded(null)
    setProgress(0)
    setError(null)
    setState("idle")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleUpload = async () => {
    if (!uploaded) return

    setState("uploading")
    setProgress(0)

    // Simulate progress — replace with real XMLHttpRequest or fetch progress in production
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return p + 10
      })
    }, 150)

    try {
      await onUpload(uploaded.file)
      clearInterval(progressInterval)
      setProgress(100)
      setState("success")
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.")
      setState("error")
    }
  }

  // --- Drag handlers ---

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounterRef.current++
    if (state === "idle") setState("dragging")
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounterRef.current--
    if (dragCounterRef.current === 0 && state === "dragging") {
      setState("idle")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounterRef.current = 0

    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      inputRef.current?.click()
    }
  }

  const openPicker = () => inputRef.current?.click()

  // --- Render ---

  return (
    <div className={cn("w-full max-w-md", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept.join(",")}
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Upload image"
      />

      <AnimatePresence mode="wait">
        {/* Idle / Dragging */}
        {(state === "idle" || state === "dragging") && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="button"
            tabIndex={0}
            aria-label="Upload image — click or drag and drop"
            onClick={openPicker}
            onKeyDown={handleKeyDown}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-8 py-12 text-center transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              state === "dragging"
                ? "border-primary/60 bg-muted/50"
                : "border-border bg-background hover:border-primary/40 hover:bg-muted/30"
            )}
          >
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
              state === "dragging" ? "bg-primary/10" : "bg-muted"
            )}>
              <Upload className={cn(
                "h-5 w-5 transition-colors",
                state === "dragging" ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {state === "dragging" ? "Drop to upload" : "Click to upload or drag and drop"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                JPEG, PNG, WebP — up to {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>
          </motion.div>
        )}

        {/* Selected */}
        {state === "selected" && uploaded && (
          <motion.div
            key="selected"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border bg-background"
          >
            {/* Preview */}
            <div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
              <img
                src={uploaded.previewUrl}
                alt="Preview"
                className="h-full w-full object-contain"
              />
              <button
                onClick={handleRemove}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                aria-label="Remove selected file"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* File info + upload action */}
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {uploaded.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(uploaded.file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                onClick={handleUpload}
                className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Upload
              </button>
            </div>
          </motion.div>
        )}

        {/* Uploading */}
        {state === "uploading" && uploaded && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="rounded-lg border border-border bg-background p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {uploaded.file.name}
                </p>
                <div className="mt-2">
                  <div
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Upload progress"
                    className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                  >
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                    {progress}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success */}
        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-3 rounded-lg border border-border bg-background px-8 py-10 text-center"
          >
            <CheckCircle className="h-10 w-10 text-emerald-500" />
            <div>
              <p className="text-sm font-medium text-foreground">Upload complete</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {uploaded?.file.name} has been uploaded.
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="mt-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              Upload another
            </button>
          </motion.div>
        )}

        {/* Error */}
        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-3 rounded-lg border border-border bg-background px-8 py-10 text-center"
          >
            <AlertCircle className="h-10 w-10 text-red-500" />
            <div>
              <p className="text-sm font-medium text-foreground">Upload failed</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{error}</p>
            </div>
            <button
              onClick={handleRemove}
              className="mt-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- Demo usage ---

export function ImageUploaderDemo() {
  const handleUpload = async (file: File) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1800))
    console.log("Uploaded:", file.name)
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center bg-background p-8">
      <ImageUploader onUpload={handleUpload} />
    </div>
  )
}
