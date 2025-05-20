'use client'
import React, { FC } from 'react';
import { FileUpload } from "@/components/common/file-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useUserContext } from '@/providers/UserProvider';
import useAttendences from '@/services/attendence';
export interface EmployeeAttendeceUploadModuleProps { }

const EmployeeAttendeceUploadModule: FC<EmployeeAttendeceUploadModuleProps> = () => {

    const { token } = useUserContext()
    const { uploadXlsx } = useAttendences({ token })

    const handleUpload = async (file: File) => {
        try {
            await uploadXlsx(file);
            toast.success("employees' attendencees added successfully!");
        } catch (e: any) {
            toast.error(e.message);
        }
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