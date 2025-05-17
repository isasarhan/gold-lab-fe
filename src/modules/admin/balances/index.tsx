'use client'
import Table, { Column } from '@/components/common/table';
import { Card } from '@/components/ui/card';
import { IBalance, IBalanceTotals } from '@/types/balance';
import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';
export interface BalancesModuleProps {
    data: {
        data: IBalance[];
        total: number;
        page: number;
        pages: number;
    }
    total: IBalanceTotals
}
const BalancesModule: FC<BalancesModuleProps> = ({ data, total }) => {

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
            value: 'gold',
            render: (value: IBalance) => (
                <span>{value.gold.toFixed(2)}</span>
            )

        },
        {
            label: 'Cash',
            value: 'cash',
            render: (value: IBalance) => (
                <span>{value.cash.toFixed(2)}</span>
            )
        },
        {
            label: 'Edit',
            render: (value: IBalance) => (
                <div className='flex justify-center items-center w-full'>
                    <Link href={`/admin/balances/${value._id}/edit`}><Pen size={20} /> </Link>
                </div>
            )
        },

    ]

    return (
        <div className='flex flex-col gap-3 pb-7'>
            <div className="flex flex-col lg:flex-row gap-6 ">
                <Card className="w-full p-6 gap-0">
                    <div className="flex justify-between lg:flex-row flex-col gap-3">
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
                    <div className="flex justify-between lg:flex-row flex-col gap-3">

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
                <Table data={data.data} columns={column} page={data.page} pages={data.pages} total={data.total}/>
            </div>

        </div>
    );
};

export default BalancesModule;