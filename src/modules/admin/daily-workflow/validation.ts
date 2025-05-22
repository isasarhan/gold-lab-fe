import { z } from "zod";
import { Sector } from "@/types/daily-workflow";
import { Karat } from "@/types/invoice";


const dailyReportSchema = z.object({
    date: z.date(),
    from: z.nativeEnum(Sector),
    to: z.nativeEnum(Sector),
    karat: z.nativeEnum(Karat),
    weight: z.coerce.number(),
    quantity: z.coerce.number().optional(),
    description: z.string().optional(),
});

export { dailyReportSchema as AddDailyReportSchema };
