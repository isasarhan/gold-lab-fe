import { PaymentTypeEnum } from "@/types/salary-payment";
import { z } from "zod";

const AddSalaryPayment = z.object({
    employee: z.string().min(2, "employee must be at least 2 characters"),
    date: z.date(),
    month: z.string(),
    year: z.string(),
    amount: z.coerce.number(),
    type: z.nativeEnum(PaymentTypeEnum).default(PaymentTypeEnum.Monthly),
    description: z.string().optional(),
});

export { AddSalaryPayment };
