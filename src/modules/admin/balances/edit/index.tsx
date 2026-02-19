"use client";
import { Card } from "@/components/ui/card";
import { IBalance } from "@/types/balance";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BalanceForm from "@/components/form/BalanceForm";
import {
  BalanceValues,
  creatBalanceSchema,
} from "@/components/form/BalanceForm/validation";
import { updateBalance } from "@/network/external/balances";

export interface EditBalanceModuleProps {
  balance: IBalance;
}

const EditBalanceModule: FC<EditBalanceModuleProps> = ({ balance }) => {
  const balanceForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(creatBalanceSchema()),
    defaultValues: {
      ...balance,
    },
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSubmit = async (data: BalanceValues) => {
    try {
      await updateBalance(balance._id!, {
        customer: balance.customer._id,
        gold: data.gold,
        cash: data.cash,
      });
      toast.success("Balance updated successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <Card>
      <BalanceForm
        onSubmit={handleSubmit}
        form={balanceForm}
        onError={handleError}
      />
    </Card>
  );
};

export default EditBalanceModule;
