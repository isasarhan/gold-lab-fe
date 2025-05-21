import { ItemType, Karat } from "@/types/invoice";
import { Currency } from "@/types/receipts";
import { z } from "zod";



export const AddPaymentSchema = z.object({
  supplier: z.string().min(2, "Payment must be at least 2 characters"),
  invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
  weight: z.coerce.number().optional().default(0),
  cash: z.coerce.number().optional().default(0),
  karat: z.coerce.number().optional().default(750),
  currency: z.nativeEnum(Currency).default(Currency.Other).optional(),
  date: z.date(),
  description: z.string().optional(),
});
