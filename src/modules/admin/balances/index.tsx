'use client'
import Table from '@/components/common/table';
import { balanceColumns } from '@/components/columns/balances-columns';
import { Card } from '@/components/ui/card';
import { BalancessSort, IBalance, IBalanceTotals } from '@/types/balance';
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
                <Table
                    data={data.data}
                    columns={balanceColumns}
                    page={data.page}
                    pages={data.pages}
                    total={data.total}
                    sortOptions={Object.values(BalancessSort).map((op) => ({
                        label: op, value: op
                    }))}
                />
            </div>

        </div>
    );
};

export default BalancesModule;