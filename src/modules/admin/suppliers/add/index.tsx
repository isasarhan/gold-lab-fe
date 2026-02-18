"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useUserContext } from "@/providers/UserProvider";
import useSuppliers from "@/services/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import SupplierForm from "@/components/form/SupplierForm";
import {
  createSupplierSchema,
  SupplierValues,
} from "@/components/form/SupplierForm/validation";

const AddSupplierModule = () => {
  const { token } = useUserContext();
  const { add } = useSuppliers({ token });

  const supplierForm = useForm({
    mode: "onBlur",
    resolver: zodResolver(createSupplierSchema()),
  });

  const handleError = (e: any) => {
    console.error("error---------", e);
    toast.error("Missing or Invalid fields!");
  };

  const handleSubmit = async (data: SupplierValues) => {
    try {
      await add(data).then(() => {
        supplierForm.reset();
      });
      toast.success("Supplier added successfully!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Fill in the details to create a new supplier
        </CardDescription>
      </CardHeader>
      <SupplierForm
        form={supplierForm}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </Card>
  );
};

export default AddSupplierModule;
