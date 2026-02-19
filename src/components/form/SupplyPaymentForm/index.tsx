import { useState, type FC } from "react";
import { SupplyPaymentValues } from "./validation";
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
import PaymentsTable from "@/modules/admin/payments/components/payments-table";
import { Currency } from "@/types/receipts";
import { ISupplier } from "@/types/supplier";

interface SupplyPaymentFormProps {
  isLoading?: boolean;
  form: UseFormReturn<SupplyPaymentValues>;
  onSubmit: (payments: SupplyPaymentValues[]) => void | Promise<void>;
  onError?: (error: any) => void;
  suppliers: ISupplier[];
}
const SupplyPaymentForm: FC<SupplyPaymentFormProps> = ({
  form,
  suppliers,
  onSubmit,
  onError,
  isLoading,
}) => {
  const { control, handleSubmit, reset } = form;
  const [payments, setPayments] = useState<SupplyPaymentValues[]>([]);

  const addToPayments = async (data: SupplyPaymentValues) => {
    reset({
      supplier: data.supplier,
      date: data.date,
      invoiceNb: data.invoiceNb,
    });
    setPayments((prev) => [...prev, data]);
  };

  const handleEditReceipt = (receipt: SupplyPaymentValues, index: number) => {
    setPayments((prevReceipts) => prevReceipts.filter((_, i) => i !== index));
    reset(receipt);
  };

  const handleDeleteReceipt = (index: number) => {
    setPayments((prevReceipts) => prevReceipts.filter((_, i) => i !== index));
  };
  const handleDiscardReceipt = () => {
    setPayments([]);
    reset({
      currency: Currency.Usd,
      karat: 995,
    });
  };

  const getTotals = () => {
    return payments.reduce(
      (total, payment) => {
        return {
          gold:
            total.gold +
            (payment?.weight
              ? payment?.weight * parseReceiptKarat(payment.karat!)
              : 0),
          cash: total.cash + (payment?.cash || 0),
        };
      },
      { gold: 0, cash: 0 },
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(addToPayments, onError)}
        className="space-y-3"
      >
        <Card className="p-5">
          <div className="flex gap-3">
            <div className="flex items-start w-1/3">
              <FormAutocomplete
                control={control}
                name="supplier"
                label="supplier"
                placeholder="Select supplier"
                options={suppliers.map((supplier) => ({
                  key: supplier._id,
                  value: supplier._id!,
                  label: supplier.name,
                }))}
              />
            </div>
            <div className="flex w-1/3 ">
              <FormInput
                control={control}
                name="invoiceNb"
                label="Invoice #"
                placeholder="Enter invoice #"
              />
            </div>
            <div className="flex w-1/3">
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
          <div className="flex gap-3">
            <div className="flex items-end w-1/3">
              <FormInput
                control={control}
                name="weight"
                label="Weight"
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex items-end w-1/3">
              <FormInput
                control={control}
                name="karat"
                label="Karat"
                placeholder="Enter karat"
              />
            </div>
            <div className="flex items-end w-1/3">
              <FormInput
                control={control}
                name="cash"
                label="Cash"
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex items-end w-1/6">
              <FormSelect
                control={control}
                name="currency"
                label="Currency"
                placeholder="Select Type"
                options={Object.values(Currency).map((cur) => ({
                  label: cur,
                  value: cur,
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

          <div className="flex justify-between">
            <div>
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
                onClick={() => onSubmit(payments)}
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
        <PaymentsTable
          payments={payments}
          onDelete={handleDeleteReceipt}
          onEdit={handleEditReceipt}
        />
      </form>
    </>
  );
};

export default SupplyPaymentForm;
