import { z } from "zod";
import { Role } from "@/types/user";
import { CustomerType } from "@/types/customer";


const AddCustomerSchema = z.object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    location: z.string().min(2, "Username must be at least 2 characters"),
    type: z.nativeEnum(CustomerType).default(CustomerType.Retailer).optional(),
});

export { AddCustomerSchema };
