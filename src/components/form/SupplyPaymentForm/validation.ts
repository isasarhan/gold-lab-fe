import { ItemType, Karat } from "@/types/invoice";
import { Currency } from "@/types/receipts";
import { z } from "zod";


export const createSupplyPaymentSchema = () => z.object({
    supplier: z.string().min(2, "Payment must be at least 2 characters"),
    invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
    weight: z.coerce.number<number>({ error: "Should be a number" }),
    cash: z.coerce.number<number>({ error: "Should be a number" }),
    karat: z.coerce.number<number>({ error: "Should be a number" }),
    currency: z.enum(Currency).default(Currency.Other).optional(),
    date: z.date(),
    description: z.string().optional(),
});

export type SupplyPaymentValues = z.infer<ReturnType<typeof createSupplyPaymentSchema>>;
