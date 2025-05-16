'use client'
import React, { FC, useState } from 'react';
import { FileUpload } from "@/components/common/file-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download } from 'lucide-react';
export interface EmployeeAttendeceUploadModuleProps { }

const EmployeeAttendeceUploadModule: FC<EmployeeAttendeceUploadModuleProps> = () => {
    const [files, setFiles] = useState<File[]>([])

    const handleUpload = async (files: File[]) => {

        const formData = new FormData();
        formData.append("file", files[0]); // if using FileInterceptor('files')

        const response = await axios.post("http://localhost:5000/api/attendences/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return
    }
    return (
        <main className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className='flex justify-between' >
                            <span>File Upload</span>
                            <Link href={'/files/employee-attendence-sample-sheet.xlsx'} download>
                                <Button><Download /> Download Sample Excel</Button>
                            </Link>
                        </div>
                    </CardTitle>
                    <CardDescription>Upload files with drag and drop, including CSV and Excel spreadsheets</CardDescription>
                </CardHeader>
                <CardContent>
                    <FileUpload
                        value={files}
                        onChange={setFiles}
                        onUpload={handleUpload}
                        maxFiles={5}
                        maxSize={5 * 1024 * 1024} // 5MB
                    />
                </CardContent>
            </Card>
        </main>
    );
};

export default EmployeeAttendeceUploadModule;