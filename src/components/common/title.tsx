'use client'

import type { FC, ElementType } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface TitleProps {
    text: string;
    goBack?: boolean;
    buttonText?: string;
    url?: string;
}

const Title: FC<TitleProps> = ({ text, goBack = false, url, buttonText }) => {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center mb-3 p-3">
            <div className="flex items-center gap-3">
                {goBack && (
                    <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
                )}
                <div className="text-3xl font-bold">{text}</div>
            </div>

            {url && (
                <Button onClick={() => router.push(url)} className="flex items-center gap-2 justify-center">
                    {buttonText}
                    <PlusCircle />
                </Button>
            )}
        </div>
    );
};

export default Title;
