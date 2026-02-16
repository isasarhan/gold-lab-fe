"use client";
import { Card } from "@/components/ui/card";
import { useUserContext } from "@/providers/UserProvider";
import useBalances from "@/services/balances";
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

export interface EditBalanceModuleProps {
  balance: IBalance;
}

const EditBalanceModule: FC<EditBalanceModuleProps> = ({ balance }) => {
  const { token } = useUserContext();
  const { update } = useBalances({ token });

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
      await update(balance._id!, {
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
