"use client"

import { useDropzone } from "react-dropzone"
import { UploadCloud, X, FileText, Film, Music, Archive, File, FileSpreadsheet, ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useCallback, useEffect, useState } from "react"

type FileWithPreview = File & {
  preview?: string
  progress?: number
  error?: string
}

type FileUploadProps = {
  value?: File[]
  onChange?: (files: File[]) => void
  onUpload?: (files: File[]) => Promise<void>
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
  disabled?: boolean
  className?: string
}

export function FileUpload({
  value = [],
  onChange,
  onUpload,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    "application/pdf": [".pdf"],
    "text/plain": [".txt"],
    "text/csv": [".csv"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/msword": [".doc"],
  },
  disabled = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Sync with external value if provided
  useEffect(() => {
    if (value && value.length > 0) {
      setFiles(
        value.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            progress: 100,
          }),
        ),
      )
    }
  }, [value])

  // Clean up previews
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [files])

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((rejected) => {
          const file = rejected.file as FileWithPreview
          const errors = rejected.errors.map((e: any) => e.message).join(", ")
          file.error = errors
          setFiles((prev) => [...prev, file])
        })
      }

      // Handle accepted files
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          progress: 0,
        }),
      )

      // Limit the number of files
      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles)
      setFiles(updatedFiles)

      if (onChange) {
        onChange(updatedFiles)
      }
    },
    [files, maxFiles, onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept,
    disabled: disabled || isUploading || files.length >= maxFiles,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      const file = newFiles[index]
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
      newFiles.splice(index, 1)

      if (onChange) {
        onChange(newFiles)
      }

      return newFiles
    })
  }

  const handleUpload = async () => {
    if (!onUpload || files.length === 0 || isUploading) return

    setIsUploading(true)

    try {
      // Simulate progress updates
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((file) => ({
            ...file,
            progress: Math.min((file.progress || 0) + 10, 90),
          })),
        )
      }, 300)

      await onUpload(files)

      clearInterval(interval)

      // Set all files to 100% progress
      setFiles((prev) =>
        prev.map((file) => ({
          ...file,
          progress: 100,
        })),
      )
    } catch (error) {
      console.error("Upload failed:", error)

      // Mark files as failed
      setFiles((prev) =>
        prev.map((file) => ({
          ...file,
          error: "Upload failed",
        })),
      )
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (file: File) => {
    const type = file.type || "" // Default to empty string if type is undefined

    if (type === "text/csv" || type.includes("excel") || type.includes("spreadsheet"))
      return <FileSpreadsheet className="h-6 w-6" />
    if (type.startsWith("image/")) return <ImageIcon className="h-6 w-6" />
    if (type.startsWith("video/")) return <Film className="h-6 w-6" />
    if (type.startsWith("audio/")) return <Music className="h-6 w-6" />
    if (type === "application/pdf") return <FileText className="h-6 w-6" />
    if (type.includes("zip") || type.includes("compressed")) return <Archive className="h-6 w-6" />

    return <File className="h-6 w-6" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors",
          isDragActive
            ? "border-primary/50 bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          (disabled || isUploading || files.length >= maxFiles) && "cursor-not-allowed opacity-60",
          className,
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center text-center">
          <UploadCloud className="mb-2 h-10 w-10 text-muted-foreground" />
          <div className="mb-2 text-sm font-medium">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </div>
          <p className="text-xs text-muted-foreground">
            {Object.entries(accept)
              .map(([key, values]) => {
                if (key === "image/*") return "Images"
                if (key === "application/pdf") return "PDFs"
                if (key === "text/plain") return "Text files"
                return values.join(", ")
              })
              .join(", ")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Up to {maxFiles} {maxFiles === 1 ? "file" : "files"}, max {(maxSize / (1024 * 1024)).toFixed(0)}MB each
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className={cn(
                "flex items-center gap-2 rounded-md border p-2",
                file.error && "border-destructive bg-destructive/10",
              )}
            >
              {file.type && file.type.startsWith("image/") && file.preview ? (
                <div className="h-10 w-10 overflow-hidden rounded">
                  <img
                    src={file.preview || "/placeholder.svg"}
                    alt={file.name}
                    className="h-full w-full object-cover"
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview!)
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">{getFileIcon(file)}</div>
              )}

              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>

                {file.error ? (
                  <p className="text-xs text-destructive">{file.error}</p>
                ) : file.progress !== undefined && file.progress < 100 ? (
                  <Progress value={file.progress} className="h-1 w-full" />
                ) : null}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeFile(index)}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}

          {onUpload && (
            <Button
              type="button"
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading || files.some((f) => f.error)}
              className="mt-2"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
