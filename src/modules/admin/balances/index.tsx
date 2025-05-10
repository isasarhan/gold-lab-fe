'use client'

import Table, { Column } from '@/components/common/table';
import { Card } from '@/components/ui/card';
import { IBalance, IBalanceTotals } from '@/types/balance';
import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';
export interface BalancesModuleProps {
    balaces: IBalance[];
    total: IBalanceTotals
}
const BalancesModule: FC<BalancesModuleProps> = ({ balaces = [], total }) => {

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
            <div className="flex flex-col lg:flex-row gap-6 ">
                <Card className="w-full p-6 gap-0">
                    <div className="flex justify-between">

                        <span>Gold In Market</span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Debit + :</span>
                            <span className="text-lg font-semibold text-yellow-700">{total.totalGoldPositive.toFixed(2)}gr</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Credit - :</span>
                            <span className="text-lg font-semibold text-yellow-900">{total.totalGoldNegative.toFixed(2)}gr</span>
                        </div>
                    </div>
                </Card>
                <Card className="w-full p-6 gap-0">
                    <div className="flex justify-between">

                        <span>Cash In Market</span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Debit + :</span>
                            <span className="text-lg font-semibold text-green-700">{total.totalCashPositive.toFixed(2)}$</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">Credit - :</span>
                            <span className="text-lg font-semibold text-red-700">{total.totalCashNegative.toFixed(2)}$</span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="w-full">
                <Table data={balaces} columns={column} />
            </div>

        </div>
    );
};

export default BalancesModule;