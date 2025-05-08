'use client'

import SearchInput from '@/components/common/searchInput';
import Table, { Column } from '@/components/common/table';
import { Card } from '@/components/ui/card';
import { IBalance, IBalanceTotals } from '@/types/balance';
import { Eye, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
export interface BalancesModuleProps {
    balaces: IBalance[];
    total: IBalanceTotals
}
const BalancesModule: FC<BalancesModuleProps> = ({ balaces = [], total }) => {
    const [filteredBalaces, setFilteredBalaces] = useState<IBalance[]>(balaces)
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (balaces)
            setFilteredBalaces(balaces)
    }, [balaces])

    const handleSearch = (query: string) => {
        router.push(`${pathName}?query=${query}`)
    }
    const column: Column[] = [
        {
            label: 'Customer',
            value: 'name',
            render: (value: IBalance) => (
                <div className='flex justify-center items-center w-full'>
                    {value.customer.name}
                </div>
            )
        },
        {
            label: 'Gold',
            value: 'gold'
        },
        {
            label: 'Cash',
            value: 'cash'
        },
        {
            label: 'Edit',
            render: (value: IBalance) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/balances/${value._id}/edit`}><Pen size={20} /> </Link>
                </div>
            )
        },
        {
            label: 'Delete',
            render: (value: IBalance) => (
                <div className='flex justify-center items-center w-full'>
                    <Trash size={20} />
                </div>
            )
        },
    ]

    return (
        <div className='flex flex-col gap-3 pb-7'>
            <SearchInput className='w-full' handleSearch={handleSearch} />
            <div className="flex flex-col lg:flex-row gap-6 ">
                <Card className="w-full p-6 gap-0">
                    <div className="flex justify-between">

                        <span>Gold In Market</span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Debit + :</span>
                            <span className="text-lg font-semibold text-yellow-700">{total.totalGoldPositive}gr</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Credit - :</span>
                            <span className="text-lg font-semibold text-yellow-900">{total.totalGoldNegative}gr</span>
                        </div>
                    </div>
                </Card>
                <Card className="w-full p-6 gap-0">
                    <div className="flex justify-between">

                        <span>Cash In Market</span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Debit + :</span>
                            <span className="text-lg font-semibold text-green-700">{total.totalCashPositive}$</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Credit - :</span>
                            <span className="text-lg font-semibold text-red-700">{total.totalCashNegative}$</span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="w-full">
                <Table data={filteredBalaces} column={column} />
            </div>

        </div>
    );
};

export default BalancesModule;