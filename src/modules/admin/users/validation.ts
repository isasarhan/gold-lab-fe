import { z } from "zod";
import { Role } from "@/types/user";


const AddUserSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    name: z.string().min(2, "First name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    isSuperAdmin: z.boolean().optional(),
    isApproved: z.boolean().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    profileUrl: z.string().optional(),
    role: z.nativeEnum(Role).default(Role.User).optional(),
});

export { AddUserSchema };
