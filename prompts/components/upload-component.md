# Component Prompt: Upload Component

---

## Generation Scaffold

```
Generate a file upload component for [product name / upload context].

**Design system:**
- Blueprint: [chosen]
- Palette: [chosen]

**Upload configuration:**
- File types accepted: [e.g., "image/*", ".pdf,.doc,.docx", "*"]
- Max file size: [X]MB
- Multiple files: [yes/no]
- Upload type: [immediate async upload / form attachment (no upload until submit)]

**Lifecycle states required:**
1. Idle — drop zone with instructions
2. Drag active — drop zone highlight (border color change, muted background)
3. File selected — preview row with name, size, remove button
4. Uploading — progress bar, spinner, disabled remove
5. Success — checkmark indicator, optional uploaded URL display
6. Error — specific error message (file too large / wrong type / server error)

**File preview:**
- Images: `URL.createObjectURL` thumbnail preview, `URL.revokeObjectURL` on remove
- Non-images: file icon + name + size

**`onUpload` prop signature:** `(file: File) => Promise<string>` (returns URL on success)

**Required props interface:**
- accept: string
- maxSizeMB: number
- onUpload: (file: File) => Promise<string>
- onSuccess?: (url: string) => void

**Anti-patterns:**
- No invisible drop zone (must have dashed border)
- Error message must be specific ("File exceeds 10MB limit", not "Upload failed")
- Memory cleanup: `URL.revokeObjectURL` on file removal
- Remove button must work in selected state

**Output the complete upload component.**
```
