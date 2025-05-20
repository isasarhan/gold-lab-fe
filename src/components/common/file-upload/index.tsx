"use client"

import { UploadCloud, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"
import FilePreview from "./file-icon"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "../loading-spinner"

type FileWithPreview = File & {
    preview?: string
    progress?: number
    error?: string
}

type FileUploadProps = {
    onUpload: (file: File) => Promise<void>
    maxFiles?: number
    maxSize?: number
    disabled?: boolean
    className?: string
}

export function FileUpload({
    onUpload,
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024, // 5MB
    disabled = false,
    className,
}: FileUploadProps) {
    const [file, setFile] = useState<FileWithPreview | null>()
    const [isUploading, setIsUploading] = useState(false)
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    console.log('file', file);
    
    const onClickUploader = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.click();
        }
    };

    const handleUpload = () => {
        if (!file) return
        try {
            setIsUploading(true)
            onUpload(file).then(()=>{
                setFile(null)
            })
        } catch (e) {
            console.log(e);
        }
        finally {
            setTimeout(()=>{
                setIsUploading(false)
            },2000)
        }
    }

    const handleOpenUpload = (event: any) => {        
        const file = event.target.files[0];        
        const newFiles =
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                progress: 0,
            })
        setFile(newFiles)
    };

    return (
        <>
            <div onClick={onClickUploader}
                className={cn(
                    "flex flex-col items-center justify-center rounded-lg border  border-dashed p-6 transition-colors",
                    "border-primary/50 mb-4",
                    (disabled || isUploading) && "cursor-not-allowed opacity-60",
                    className,
                )}>
                < div className="flex flex-col items-center justify-center text-center">
                    <UploadCloud className="mb-2 h-10 w-10 text-muted-foreground" />
                    <div className="mb-2 text-sm font-medium">
                        <span className="font-semibold">Click to upload</span>
                    </div>
                    <input hidden ref={hiddenInputRef} type="file" onChange={handleOpenUpload}
                    />
                </div>
            </div >
            {file && !isUploading &&
                <div>
                    <div className="p-2 rounded-md border border-primary/50  flex gap-3 mb-3">
                        {(file.type && file.type.startsWith("image/") && file.preview ? (
                            <div className="h-10 w-10 overflow-hidden   ">
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
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-muted"><FilePreview file={file} /></div>
                        ))}
                        <div className="w-full flex justify-between items-center">
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium">{file?.name}</p>
                                <p className="text-xs text-muted-foreground">{(file?.size! / 1024).toFixed(1)} KB</p>
                            </div>
                            <div><XIcon className="cursor-pointer lg:me-3" onClick={() => setFile(null)} /></div>
                        </div>
                    </div>
                    <Button onClick={handleUpload}>Upload</Button>
                </div>
            }
            {isUploading && <LoadingSpinner size="md" />}
        </>
    )
}
