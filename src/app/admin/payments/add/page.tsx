import Title from "@/components/common/title";
import AddPaymentModule from "@/modules/admin/payments/add";
import { getAllSuppliers } from "@/network/external/supplier";

export const dynamic = "force-dynamic";

const AddPaymentPage = async () => {
  const data = await getAllSuppliers();
  return (
    <>
      <Title text="New Payment" />
      <AddPaymentModule suppliers={data} />
    </>
  );
};

export default AddPaymentPage;
