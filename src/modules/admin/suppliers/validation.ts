import { z } from "zod";

const supplierSchema = z.object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    weight: z.coerce.number(),
    cash: z.coerce.number(),
    silver: z.coerce.number(),
    description: z.string().optional(),
});

export { supplierSchema };
