import { z } from "zod";

export const createEmployeeSchema = () => z.object({
    name: z.string().min(2, "name must be at least 2 characters"),
    email: z.email("Invalid email address").optional(),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    position: z.string().min(2, "position must be at least 2 characters"),
    salary: z.coerce.number<number>(),
});

export type EmployeeValues = z.infer<ReturnType<typeof createEmployeeSchema>>;
