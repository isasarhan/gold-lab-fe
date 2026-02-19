import { useState, type FC } from "react";
import { Card } from "@/components/ui/card";
import FormInput from "@/components/common/form/input";
import { Button } from "@/components/ui/button";
import FormAutocomplete from "@/components/common/form/autocomplete";
import FormDate from "@/components/common/form/date";
import FormSelect from "@/components/common/form/select";
import ConfirmDialog from "@/components/common/discard-dialog";
import FormTextArea from "@/components/common/form/textarea";
import { parseInvoiceKarat } from "@/lib/parseKarat";
import { UseFormReturn } from "react-hook-form";
import { ISupplier } from "@/types/supplier";
import { ItemType, Karat } from "@/types/invoice";
import SuppliesTable from "@/modules/admin/supplies/components/supplies-table";
import { SupplyValues } from "./validation";

interface SupplyFormProps {
  isLoading?: boolean;
  form: UseFormReturn<SupplyValues>;
  onSubmit: (payments: SupplyValues[]) => void | Promise<void>;
  onError?: (error: any) => void;
  suppliers: ISupplier[];
}
const SupplyForm: FC<SupplyFormProps> = ({
  form,
  suppliers,
  onSubmit,
  onError,
  isLoading,
}) => {
  const { control, handleSubmit, reset } = form;
  const [supplies, setSupplies] = useState<SupplyValues[]>([]);

  const addSupply = async (data: SupplyValues) => {
    form.reset({
      supplier: data.supplier,
      date: data.date,
      invoiceNb: data.invoiceNb,
    });
    setSupplies((prev) => [...prev, data]);
  };
  const handleEditReceipt = (receipt: SupplyValues, index: number) => {
    setSupplies((prevReceipts) => prevReceipts.filter((_, i) => i !== index));
    form.reset(receipt);
  };
  const handleDeleteReceipt = (index: number) => {
    setSupplies((prevReceipts) => prevReceipts.filter((_, i) => i !== index));
  };
  const handleDiscardReceipt = () => {
    setSupplies([]);
    form.reset({
      karat: Karat.K18,
    });
  };
  const getTotals = () => {
    return supplies.reduce(
      (total, supply) => {
        return {
          gold:
            total.gold +
            (supply.weight * parseInvoiceKarat(supply.karat!)) / 995,
          cash: total.cash + supply.weight * supply.perGram,
        };
      },
      { gold: 0, cash: 0 },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(addSupply, onError)} className="space-y-3">
        <Card className="p-5">
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div className="flex items-start lg:w-1/3">
              <FormAutocomplete
                control={form.control}
                name="supplier"
                label="Supplier"
                placeholder="Select supplier"
                options={suppliers.map((supplier) => ({
                  key: supplier._id,
                  value: supplier._id!,
                  label: supplier.name,
                }))}
              />
            </div>
            <div className="flex lg:w-1/3 ">
              <FormInput
                control={form.control}
                name="invoiceNb"
                label="Invoice #"
                placeholder="Enter invoice #"
              />
            </div>
            <div className="flex lg:w-1/3">
              <FormDate
                control={form.control}
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
                control={form.control}
                name="weight"
                label="Weight"
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex items-end lg:w-1/3">
              <FormSelect
                control={form.control}
                name="karat"
                label="Karat"
                placeholder="Select Karat"
                options={Object.values(Karat).map((karat) => ({
                  label: karat,
                  value: karat,
                }))}
              />
            </div>
            <div className="flex items-end lg:w-1/3">
              <FormInput
                control={form.control}
                name="perGram"
                label="Per Gram"
                placeholder="Enter quantity"
              />
            </div>
            <div className="flex items-end lg:w-1/6">
              <FormSelect
                control={form.control}
                name="type"
                label="Type"
                placeholder="Select Type"
                options={Object.values(ItemType).map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </div>
          </div>
          <FormTextArea
            control={form.control}
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
                onClick={() => onSubmit(supplies)}
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
        <SuppliesTable
          supplies={supplies}
          onDelete={handleDeleteReceipt}
          onEdit={handleEditReceipt}
        />
      </form>
    </>
  );
};

export default SupplyForm;
