'use client'
import { IInvoice, IOrder } from '@/types/invoice';
import React, { FC } from 'react';
import OrderTable from '../components/order-table';
import { Card, CardContent } from '@/components/ui/card';
import { dateFormatter } from '@/lib/dateFormatter';
import { Badge } from '@/components/ui/badge';
import useOrders from '@/services/orders';
import { useUserContext } from '@/providers/UserProvider';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export interface ViewInvoiceModuleProps {
  invoice: IInvoice;
}
const ViewInvoiceModule: FC<ViewInvoiceModuleProps> = ({ invoice }) => {
  const { token } = useUserContext()
  const router = useRouter()
  const { remove } = useOrders({ token })
  const handleEditOrder = async (data: IOrder, index: number) => {

  }
  const handleDeleteOrder = async (index: number, value?: IOrder) => {
    try {
      await remove(value?._id!, { invoiceId: invoice._id! }).then(() => {
        toast.success("Order removed successfully!");
        router.refresh()
      })

    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="text-center text-sm font-medium">
            Customer Name: <span className="font-semibold">{invoice.customer.name}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center text-sm font-medium">
            Invoice #: <span className="font-semibold">{invoice.invoiceNb}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center text-sm font-medium">
            Date: <span className="font-semibold">{dateFormatter(invoice.date.toString())}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center text-sm font-medium">
            Total Orders: <Badge className="font-semibold">{invoice.orders.length}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center text-sm font-medium">
            Total Weight: <Badge className="font-semibold">{invoice.totalWeight?.toFixed(2)}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center text-sm font-medium">
            Total Cash: <Badge className="font-semibold">{invoice.totalCash?.toFixed(2)}</Badge>
          </CardContent>
        </Card>
      </div>
      <OrderTable orders={invoice.orders} onDelete={handleDeleteOrder} onEdit={handleEditOrder} />
    </div>
  );
};

export default ViewInvoiceModule;