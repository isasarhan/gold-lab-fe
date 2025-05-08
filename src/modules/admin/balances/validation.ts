import { z } from "zod";


const EditBalanceSchema = z.object({
    gold: z.preprocess((val) => Number(val), z.number().refine(val => !isNaN(val), {
      message: "Gold must be a valid number",
    })),
    cash: z.preprocess((val) => Number(val), z.number().refine(val => !isNaN(val), {
      message: "Cash must be a valid number",
    })),
  });
  
export { EditBalanceSchema };
