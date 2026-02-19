import { useState, type FC } from "react";
import { OrderValues } from "./validation";
import { Card } from "@/components/ui/card";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";
import FormAutocomplete from "@/components/common/form/autocomplete";
import { ICustomer } from "@/types/customer";
import FormDate from "@/components/common/form/date";
import FormSelect from "@/components/common/form/select";
import ConfirmDialog from "@/components/common/discard-dialog";
import { IOrder, ItemType, Karat } from "@/types/invoice";
import FormTextArea from "@/components/common/form/textarea";
import OrderTable from "@/modules/admin/invoices/components/order-table";
import { parseInvoiceKarat } from "@/lib/parseKarat";
import { UseFormReturn } from "react-hook-form";

interface InvoiceFormProps {
  isLoading?: boolean;
  form: UseFormReturn<OrderValues>;
  onSubmit: (orders: OrderValues[]) => void | Promise<void>;
  onError?: (error: any) => void;
  customers: ICustomer[];
}
const InvoiceForm: FC<InvoiceFormProps> = ({
  form,
  customers,
  onSubmit,
  onError,
  isLoading,
}) => {
  const { control, handleSubmit, watch } = form;
  const [orders, setOrders] = useState<IOrder[]>([]);

  const handleEditOrder = (order: IOrder, index: number) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    form.reset(order);
  };
  const handleDeleteOrder = (index: number) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };
  const handleDiscardInvoice = () => {
    setOrders([]);
    form.reset({
      karat: Karat.K18,
    });
  };
  const addToOrder = async (data: OrderValues) => {
    form.setValue("weight", 0);
    setOrders((prev) => [...prev, data]);
  };

  const getTotals = () => {
    return orders.reduce(
      (total, order) => {
        return {
          gold:
            total.gold + (order.weight * parseInvoiceKarat(order.karat!)) / 995,
          cash:
            total.cash +
            (order.weight * order.perGram + order.quantity * order.perItem),
        };
      },
      { gold: 0, cash: 0 },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(addToOrder, onError)} className="space-y-3">
        <Card className="p-5">
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div className="flex items-start lg:w-1/3">
              <FormAutocomplete
                control={control}
                name="customer"
                label="Customer"
                placeholder="Select customer"
                options={customers.map((customer) => ({
                  key: customer._id,
                  value: customer._id!,
                  label: customer.name,
                }))}
              />
            </div>
            <div className="flex lg:w-1/3 ">
              <FormInput
                control={control}
                name="invoiceNb"
                label="Invoice #"
                placeholder="Enter invoice #"
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormDate
                control={control}
                name="date"
                label="Date"
                defaultValue={new Date()}
                placeholder="Pick a date"
              />
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex lg:w-1/3">
              <FormSelect
                control={control}
                name="type"
                label="Type"
                placeholder="Select Type"
                options={Object.values(ItemType).map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormInput
                control={control}
                name="quantity"
                label="Quantity"
                defaultValue={1}
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormSelect
                control={control}
                name="karat"
                label="Karat"
                defaultValue={watch("karat")}
                placeholder="Select Type"
                options={Object.values(Karat).map((karat) => ({
                  label: karat,
                  value: karat,
                }))}
              />
            </div>
          </div>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex lg:w-1/3">
              <FormInput
                control={control}
                name="weight"
                label="Weight"
                defaultValue={0}
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormInput
                control={control}
                name="perGram"
                label="Per Gram"
                placeholder="Enter price per weight"
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormInput
                control={control}
                name="perItem"
                label="Per Item"
                defaultValue={0}
                placeholder="Enter price per Item"
              />
            </div>
          </div>
          <FormTextArea
            control={control}
            name="description"
            label="Description"
            placeholder="Enter description"
          />

          <div className="flex justify-between flex-col lg:flex-row">
            <div className="mb-3 lg:mb-0">
              <Button variant={"secondary"} type="submit">
                Add
              </Button>
            </div>
            <div className="flex gap-3">
              <ConfirmDialog
                onConfirm={handleDiscardInvoice}
                text="Discard Invoice"
                title="Discard Invoice"
                description="Are you sure you want to discard invoice?"
              >
                <Button type="button" variant={"destructive"}>
                  Discard Invoice
                </Button>
              </ConfirmDialog>
              <Button
                type="button"
                onClick={() => onSubmit(orders)}
                loading={isLoading}
              >
                Save Invoice
              </Button>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col gap-4 lg:flex-row lg:gap-10 px-3 py-4 justify-center items-center">
          <div className="flex items-center gap-5 justify-center text-center">
            <span className="font-semibold">Total Weight:</span>
            <span>{getTotals().gold.toFixed(2)} gr</span>
          </div>
          <div className="flex items-center gap-5 justify-center text-center">
            <span className="font-semibold">Total Cash:</span>
            <span>{getTotals().cash.toFixed(2)} $</span>
          </div>
        </Card>
        <OrderTable
          orders={orders}
          onDelete={handleDeleteOrder}
          onEdit={handleEditOrder}
        />
      </form>
    </>
  );
};

export default InvoiceForm;
