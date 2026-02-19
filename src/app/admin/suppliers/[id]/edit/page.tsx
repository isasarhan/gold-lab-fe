import Title from "@/components/common/title";
import { getAuth } from "@/lib/auth";
import EditSupplierModule from "@/modules/admin/suppliers/edit";
import { getSupplierById } from "@/network/external/supplier";

import React, { FC } from "react";

export interface EditSupplierPageProps {
  params: Promise<{ id: string }>;
}

const EditSupplierPage: FC<EditSupplierPageProps> = async ({ params }) => {
  const { id } = await params;
  const supplier = await getSupplierById(id);
  return (
    <>
      <Title text="Edit Supplier" goBack={true} />
      <EditSupplierModule supplier={supplier} />
    </>
  );
};

export default EditSupplierPage;
