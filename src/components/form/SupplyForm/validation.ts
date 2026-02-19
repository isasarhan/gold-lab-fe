

import { ItemType, Karat } from "@/types/invoice";
import { z } from "zod";


export const createSupplySchema = () => z.object({
    supplier: z.string().min(2, "supplier must be at least 2 characters"),
    invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
    weight: z.coerce.number<number>({ error: "Should be a number" }),
    perGram: z.coerce.number<number>({ error: "Should be a number" }),
    karat: z.enum(Karat).default(Karat.K18).optional(),
    type: z.enum(ItemType).default(ItemType.Other).optional(),
    date: z.date(),
    description: z.string().optional(),
});

export type SupplyValues = z.infer<ReturnType<typeof createSupplySchema>>;
