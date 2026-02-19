import { PaymentTypeEnum } from "@/types/salary-payment";
import { z } from "zod";

export const createSalaryPaymentSchema = () => z.object({
    employee: z.string().min(2, "employee must be at least 2 characters"),
    date: z.date(),
    month: z.string(),
    year: z.string(),
    amount: z.coerce.number<number>({ error: "Should be a number" }),
    type: z.enum(PaymentTypeEnum),
    description: z.string().optional(),
});

export type SalaryPaymentValues = z.infer<ReturnType<typeof createSalaryPaymentSchema>>;
