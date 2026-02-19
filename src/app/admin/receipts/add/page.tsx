import Title from "@/components/common/title";
import AddReceiptModule from "@/modules/admin/receipts/add";
import { getAllCustomers } from "@/network/external/customers";

export const dynamic = "force-dynamic";

const AddRecieptsPage = async () => {
  const data = await getAllCustomers({ pageSize: 100 });
  return (
    <>
      <Title text="New Receipt" />
      <AddReceiptModule customers={data.data} />
    </>
  );
};

export default AddRecieptsPage;
