import { ItemType, Karat } from "@/types/invoice";
import { z } from "zod";

export const createOrderSchema = () => z.object({
    customer: z.string().min(2, "customer must be at least 2 characters"),
    weight: z.coerce.number<number>({ error: "Should be a number" }),
    karat: z.enum(Karat).default(Karat.K18).optional(),
    perGram: z.coerce.number<number>({ error: "Should be a number" }),
    perItem: z.coerce.number<number>({ error: "Should be a number" }),
    invoiceNb: z.string().min(2, "invoice # must be at least 2 characters"),
    type: z.enum(ItemType).default(ItemType.LAZER).optional(),
    quantity: z.coerce.number<number>({ error: "Should be a number" }),
    description: z.string().optional(),
    date: z.date(),
});

export const createInvoiceSchema = () => z.object({
    customer: z.string().min(2, "Customer must be at least 2 characters"),
    invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
    orders: createOrderSchema(),
    totalWeight: z.coerce.number<number>({ error: "Should be a number" }),
    totalCash: z.coerce.number<number>({ error: "Should be a number" }),
    date: z.date(),
});

export type OrderValues = z.infer<ReturnType<typeof createOrderSchema>>;
export type InvoiceValues = z.infer<ReturnType<typeof createInvoiceSchema>>;
