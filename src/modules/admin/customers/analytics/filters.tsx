'use client'
import { FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { years } from '@/lib/dates';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC } from 'react';

export interface CustomerInvoicesPropsAnalyticsFilter { }

const YearlyAnalyticsFilter: FC<CustomerInvoicesPropsAnalyticsFilter> = () => {
    const pathName = usePathname()
    const router = useRouter()
    const handleChange = (value: string) => {
        const params = new URLSearchParams();
        params.append("year", value);

        router.push(`${pathName}?${params.toString()}`);
    }
    return (
            <Select onValueChange={handleChange} defaultValue={`${new Date().getFullYear()}`} >
                    <SelectTrigger>
                        <SelectValue placeholder={'select a year'} />
                    </SelectTrigger>
                <SelectContent className='gap-0'>
                    {years.map((option) => (
                        <SelectItem key={option} value={`${option}`} className='p-0 gap-0 m-0'>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>    
    );
};

export default YearlyAnalyticsFilter;