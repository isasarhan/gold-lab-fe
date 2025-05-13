import { ItemType, Karat } from "@/types/invoice";
import { z } from "zod";

const AddOrderSchema = z.object({
    customer: z.string().min(2, "customer must be at least 2 characters"),
    weight: z.number(),
    karat: z.nativeEnum(Karat).default(Karat.K18).optional(),
    perGram: z.number(),
    perItem: z.number(),
    invoiceNb: z.string().min(2, "invoice # must be at least 2 characters"),
    type: z.nativeEnum(ItemType).default(ItemType.LAZER).optional(),
    quantity: z.number(),
    description: z.string().min(2, "description must be at least 2 characters"),
    date: z.date(),
});

export const AddInvoiceSchema = z.object({
  customer: z.string().min(2, "Customer must be at least 2 characters"),
  invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
  orders: AddOrderSchema,
  totalWeight: z.number(),
  totalCash: z.number(),
  date: z.date(),
});

export { AddOrderSchema, };
