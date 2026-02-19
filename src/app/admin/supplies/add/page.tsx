import Title from "@/components/common/title";
import AddSupplyModule from "@/modules/admin/supplies/add";
import { getAllSuppliers } from "@/network/external/supplier";

export const dynamic = "force-dynamic";
import { FC } from "react";

export interface AddSupplyPageProps {}

const AddSupplyPage: FC<AddSupplyPageProps> = async () => {
  const data = await getAllSuppliers();
  return (
    <>
      <Title text="New Supply" />
      <AddSupplyModule suppliers={data} />
    </>
  );
};

export default AddSupplyPage;
