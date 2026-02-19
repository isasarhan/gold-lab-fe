import Title from "@/components/common/title";
import SuppliersModule from "@/modules/admin/suppliers";
import { getAllSuppliers } from "@/network/external/supplier";

const SuppliersPage = async () => {
  const data = await getAllSuppliers();
  return (
    <>
      <Title text="All Suppliers" />
      <SuppliersModule suppliers={data} />
    </>
  );
};

export default SuppliersPage;
