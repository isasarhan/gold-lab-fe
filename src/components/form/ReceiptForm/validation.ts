import { Currency } from "@/types/receipts";
import { z } from "zod";


export const createReceiptSchema = () => z.object({
    customer: z.string().min(2, "Customer must be at least 2 characters"),
    invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
    weight: z.coerce.number<number>({ error: "Should be a number" }),
    cash: z.coerce.number<number>({ error: "Should be a number" }),
    karat: z.coerce.number<number>({ error: "Should be a number" }),
    date: z.date(),
    description: z.string().optional(),
    currency: z.nativeEnum(Currency).default(Currency.Usd).optional(),
});

export type ReceiptValues = z.infer<ReturnType<typeof createReceiptSchema>>;
