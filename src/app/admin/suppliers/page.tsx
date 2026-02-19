import Title from "@/components/common/title";
import SuppliersModule from "@/modules/admin/suppliers";
import { getAllSuppliers } from "@/network/external/supplier";

import React, { FC } from "react";

export interface SuppliersPageProps {}

const SuppliersPage: FC<SuppliersPageProps> = async () => {
  const data = await getAllSuppliers();
  return (
    <>
      <Title
        text="All Suppliers"
        buttonText="Add Supplier"
        url="/admin/suppliers/add"
      />
      <SuppliersModule suppliers={data} />
    </>
  );
};

export default SuppliersPage;
