import React, { FC } from 'react';
import { UploadCloud, X, FileText, Film, Music, Archive, File, FileSpreadsheet, ImageIcon } from "lucide-react"

export interface FilePreviewProps {
    file: File;
}
const FilePreview: FC<FilePreviewProps> = ({ file }) => {
    const type = file.type || "" // Default to empty string if type is undefined

    if (type === "text/csv" || type.includes("excel") || type.includes("spreadsheet"))
        return <FileSpreadsheet className="h-6 w-6" />
    if (type.startsWith("image/")) return <ImageIcon className="h-6 w-6" />
    if (type.startsWith("video/")) return <Film className="h-6 w-6" />
    if (type.startsWith("audio/")) return <Music className="h-6 w-6" />
    if (type === "application/pdf") return <FileText className="h-6 w-6" />
    if (type.includes("zip") || type.includes("compressed")) return <Archive className="h-6 w-6" />

    return <File className="h-6 w-6" />
};

export default FilePreview;