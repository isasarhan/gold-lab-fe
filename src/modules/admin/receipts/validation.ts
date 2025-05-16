import { ItemType, Karat } from "@/types/invoice";
import { Currency } from "@/types/receipts";
import { z } from "zod";



export const AddReceiptSchema = z.object({
  customer: z.string().min(2, "Customer must be at least 2 characters"),
  invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
  weight: z.coerce.number().optional(),
  cash: z.coerce.number().optional(),
  karat: z.coerce.number().optional(),
  date: z.date(),
  description: z.string().optional(),
  currency: z.nativeEnum(Currency).default(Currency.Usd).optional(),
});

