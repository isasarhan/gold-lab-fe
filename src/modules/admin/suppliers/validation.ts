import { z } from "zod";

const AddSupplierSchema = z.object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    gold: z.coerce.number(),
    cash: z.coerce.number(),
    silver: z.coerce.number(),
    description: z.string().min(2, "Username must be at least 2 characters"),
});

export { AddSupplierSchema };
