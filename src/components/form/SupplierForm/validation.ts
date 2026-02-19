import { z } from "zod";


export const createSupplierSchema = () => z.object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    weight: z.coerce.number<number>({ error: "Should be a number" }),
    cash: z.coerce.number<number>({ error: "Should be a number" }),
    silver: z.coerce.number<number>({ error: "Should be a number" }),
    description: z.string().optional(),
});

export type SupplierValues = z.infer<ReturnType<typeof createSupplierSchema>>;
