import SummaryCard from '@/components/common/summary-card';
import { Card } from '@/components/ui/card';
import { IBalanceTotals } from '@/types/balance';
import { Banknote, TrendingUp, User, Weight } from 'lucide-react';
import React, { FC } from 'react';
import CustomerPieChart from './customer-pie-chart';
import CustomersModule from '../customers';
import { ICustomer } from '@/types/customer';

export interface AdminDashboardModuleProps {
    balanceTotal: IBalanceTotals,
    customersAnalytics: { _id: string, count: number }[]
    customers: {
        data: ICustomer[];
        total: number;
        page: number;
        pages: number;
    }
}

const AdminDashboardModule: FC<AdminDashboardModuleProps> = ({ balanceTotal, customersAnalytics, customers }) => {
    return (
        <div className='flex flex-col gap-5'>
            <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 relative'>
                <SummaryCard title='Debit Gold in Market'
                    icon={<Weight size={22} />}
                    positive={true}
                    symbol='gr'
                    value={`${balanceTotal.totalGoldPositive.toFixed(2)}`} />

                <SummaryCard title='Debit Cash in Market'
                    icon={<Weight size={22} />}
                    positive={false}
                    value={`${balanceTotal.totalGoldNegative.toFixed(2)}`} />

                <SummaryCard title='Debit Cash in Market'
                    icon={<Banknote size={25} />}
                    positive={true}
                    value={`$ ${balanceTotal.totalCashPositive.toFixed(2)}`} />

                <SummaryCard title='Credit Cash in Market'
                    icon={<Banknote size={25} />}
                    positive={false}
                    value={`$ ${balanceTotal.totalCashNegative.toFixed(2)}`} />
            </div>
            <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 relative items-center '>
                <CustomerPieChart customersAnalytics={customersAnalytics} />
                <div className='col-span-3'>
                    <CustomersModule data={customers}/>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardModule;