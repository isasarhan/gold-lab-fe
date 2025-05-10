'use client'
import type { FC } from 'react';
import { Card } from '../ui/card';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface TitleProps {
    text: string
    goBack?: boolean
}

const Title: FC<TitleProps> = ({ text, goBack = false }) => {
    const router = useRouter()
    return (
        <Card className='mb-3 p-5'>
            <div className="flex items-center gap-3">
                {goBack && <ArrowLeft className='cursor-pointer' onClick={() => router.back()} />}
                <div className='text-xl'>{text}</div>
            </div>
        </Card>
    );
}

export default Title;
