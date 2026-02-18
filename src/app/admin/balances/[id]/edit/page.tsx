import Title from "@/components/common/title";
import EditBalanceModule from "@/modules/admin/balances/edit";
import { getBalanceById } from "@/network/external/balances";
import React, { FC } from "react";

export interface EditBalancePageProps {
  params: Promise<{ id: string }>;
}

const EditBalancePage: FC<EditBalancePageProps> = async ({ params }) => {
  const { id } = await params;
  const balance = await getBalanceById(id);

  return (
    <>
      <Title text={`Edit Balance for ${balance.customer.name}`} goBack={true} />
      <EditBalanceModule balance={balance} />
    </>
  );
};

export default EditBalancePage;
