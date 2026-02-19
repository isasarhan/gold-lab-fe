import { useState, type FC } from "react";
import { ReceiptValues } from "./validation";
import { Card } from "@/components/ui/card";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";
import FormAutocomplete from "@/components/common/form/autocomplete";
import FormDate from "@/components/common/form/date";
import FormSelect from "@/components/common/form/select";
import ConfirmDialog from "@/components/common/discard-dialog";
import FormTextArea from "@/components/common/form/textarea";
import { parseReceiptKarat } from "@/lib/parseKarat";
import { UseFormReturn } from "react-hook-form";
import { Currency } from "@/types/receipts";
import { ICustomer } from "@/types/customer";
import ReceiptTable from "@/modules/admin/receipts/components/receipt-table";

interface ReceiptFormProps {
  isLoading?: boolean;
  form: UseFormReturn<ReceiptValues>;
  onSubmit: (receipts: ReceiptValues[]) => void | Promise<void>;
  onError?: (error: any) => void;
  customers: ICustomer[];
}
const ReceiptForm: FC<ReceiptFormProps> = ({
  form,
  customers,
  onSubmit,
  onError,
  isLoading,
}) => {
  const { control, handleSubmit, reset } = form;
  const [receipts, setReceipts] = useState<ReceiptValues[]>([]);

  const addToReceipts = async (data: ReceiptValues) => {
    reset({
      customer: data.customer,
      date: data.date,
      invoiceNb: data.invoiceNb,
      karat: 995,
      currency: Currency.Usd,
    });
    setReceipts((prev) => [...prev, data]);
  };
  const handleEditReceipt = (receipt: ReceiptValues, index: number) => {
    setReceipts((prevReceipts) => prevReceipts.filter((_, i) => i !== index));
    reset(receipt);
  };
  const handleDeleteReceipt = (index: number) => {
    setReceipts((prevReceipts) => prevReceipts.filter((_, i) => i !== index));
  };
  const handleDiscardReceipt = () => {
    setReceipts([]);
    reset({
      karat: 995,
    });
  };
  const getTotals = () => {
    return receipts.reduce(
      (total, receipt) => {
        return {
          gold:
            total.gold +
            (receipt?.weight
              ? receipt?.weight * parseReceiptKarat(receipt.karat!)
              : 0),
          cash: total.cash + (receipt?.cash || 0),
        };
      },
      { gold: 0, cash: 0 },
    );
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(addToReceipts, onError)}
        className="space-y-3"
      >
        <Card className="p-5">
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-start lg:w-1/3 ">
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
            <div className="flex items-end lg:w-1/3">
              <FormInput
                control={control}
                name="weight"
                label="Weight"
                defaultValue={0}
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex items-end lg:w-1/3">
              <FormInput
                control={control}
                name="karat"
                label="Karat"
                placeholder="Enter price per weight"
              />
            </div>
            <div className="flex items-end lg:w-1/3">
              <FormInput
                control={control}
                name="cash"
                label="Cash"
                defaultValue={0}
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex items-end lg:w-1/6">
              <FormSelect
                control={control}
                name="currency"
                label="Currency"
                defaultValue={Currency.Usd}
                placeholder="Select Type"
                options={Object.values(Currency).map((currency) => ({
                  label: currency,
                  value: currency,
                }))}
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
                onConfirm={handleDiscardReceipt}
                text="Discard Receipt"
                title="Discard Receipt"
                description="Are you sure you want to discard receipt?"
              >
                <Button type="button" variant={"destructive"}>
                  Discard Receipt
                </Button>
              </ConfirmDialog>
              <Button
                type="button"
                onClick={() => onSubmit(receipts)}
                loading={isLoading}
              >
                Save Receipt
              </Button>
            </div>
          </div>
        </Card>
        <Card className="flex lg:gap-10 lg:flex-row px-3 justify-center ">
          <div className="flex items-center gap-5 justify-center text-center">
            <span className="font-semibold">Total Weight:</span>
            <span>{getTotals().gold.toFixed(2)} gr</span>
          </div>
          <div className="flex items-center gap-5 justify-center text-center">
            <span className="font-semibold">Total Cash:</span>
            <span>{getTotals().cash.toFixed(2)} $</span>
          </div>
        </Card>
        <ReceiptTable
          receipts={receipts}
          onDelete={handleDeleteReceipt}
          onEdit={handleEditReceipt}
        />
      </form>
    </>
  );
};

export default ReceiptForm;
