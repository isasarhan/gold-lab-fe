import { Role } from "@/types/user"
import * as z from "zod"


export const formSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    isSuperAdmin: z.boolean().optional(),
    isApproved: z.boolean().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    profileUrl: z.string().optional(),
    role: z.nativeEnum(Role).default(Role.User).optional(),

})
