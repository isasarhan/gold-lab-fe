'use client'
import React, { FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface SortFilterProps {
    options: { label: string, value: string }[];
}

const SortFilter: FC<SortFilterProps> = ({ options }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (sort: any) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('sort', sort);
        router.push(`${pathname}?${params.toString()}`);

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Filter /></DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                    <DropdownMenuItem onClick={() => handleFilter(option.value)}>{option.label}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortFilter;