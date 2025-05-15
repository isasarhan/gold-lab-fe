import { z } from "zod";


const AddEmployeeSchema = z.object({
    name: z.string().min(2, "name must be at least 2 characters"),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    position: z.string().min(2, "position must be at least 2 characters"),
    salary: z.coerce.number(),
});

export { AddEmployeeSchema };
