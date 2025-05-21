import React, { FC } from 'react';
import { Card } from '../ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';
export interface SummaryCardProps {
    title: string;
    symbol?: string;
    icon?: React.ReactNode;
    value: string | number;
    positive?: boolean
}
const SummaryCard: FC<SummaryCardProps> = ({ title, icon, value, symbol, positive = true }) => {
    return (
            <Card className='lg:p-5 p-2 text-center'>
                <div className='flex flex-col gap-8'>
                    <div className='flex justify-between items-center pt-3.5 relative'>
                        <span className='font-semibold'>{title}</span>
                        <span>{icon}</span>
                    </div>
                    <div className='flex justify-between items-center flex-col lg:flex-row'>
                        <span className='font-bold lg:text-3xl text-xl '>
                            {value} <span className='text-lg'>{symbol}</span> 
                        </span>
                        <span>
                            {positive ?
                                <TrendingUp size={55} className='opacity-15 dark:opacity-40' /> :
                                <TrendingDown size={55} className='opacity-15 dark:opacity-40' />
                            }
                        </span>
                    </div>
                </div>
            </Card>
    );
};

export default SummaryCard;