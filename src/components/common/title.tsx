'use client'
import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface TitleProps {
    text: string
    goBack?: boolean
}

const Title: FC<TitleProps> = ({ text, goBack = false }) => {
    const router = useRouter()
    return (
        <div className='mb-3 p-3'>
            <div className="flex items-center gap-3 mb-3">
                {goBack && <ArrowLeft className='cursor-pointer' onClick={() => router.back()} />}
                <div className='text-3xl font-bold'>{text}</div>
            </div>
        </div>
    );
}

export default Title;
