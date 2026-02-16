import { z } from "zod";

export const creatBalanceSchema = () => z.object({
    gold: z.coerce.number<number>({ error: "Should be a number" }),
    cash: z.coerce.number<number>({ error: "Should be a number" }),
});

export type BalanceValues = z.infer<ReturnType<typeof creatBalanceSchema>>;
