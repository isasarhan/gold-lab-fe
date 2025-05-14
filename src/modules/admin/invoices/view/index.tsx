import { IInvoice } from '@/types/invoice';
import React, { FC } from 'react';
export interface ViewInvoiceModuleProps {
  invoice: IInvoice;
}
const ViewInvoiceModule: FC<ViewInvoiceModuleProps> = ({invoice}) => {
  return (
    <div>
      Hello ViewInvoiceModule
    </div>
  );
};

export default ViewInvoiceModule;