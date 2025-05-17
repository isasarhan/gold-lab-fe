import { ItemType, Karat } from "@/types/invoice";
import { z } from "zod";



export const AddSupplySchema = z.object({
  supplier: z.string().min(2, "supplier must be at least 2 characters"),
  invoiceNb: z.string().min(2, "Invoice # must be at least 2 characters"),
  weight: z.coerce.number(),
  perGram: z.coerce.number(),
  karat: z.nativeEnum(Karat).default(Karat.K18).optional(),
  type: z.nativeEnum(ItemType).default(ItemType.Other).optional(),
  date: z.date(),
  description: z.string().optional(),
});
