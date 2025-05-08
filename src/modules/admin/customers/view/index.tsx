import { ICustomer } from '@/types/customer';
import React, { FC } from 'react';

export interface CustomerModuleProps {
    customer: ICustomer
}

const ViewCustomerModule: FC<CustomerModuleProps> = ({ customer }) => {
  return (
    <div>
      Hello CustomerModule
    </div>
  );
};

export default ViewCustomerModule;