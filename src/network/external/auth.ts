import axoisServer from "@/lib/axios-server";
import { IUser } from "@/types/user";

export const login = async (email: string, password: string) => {
    try {
        const res = await axoisServer.post(`/api/auth/login`, { email, password })
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to login");
    }
}

export const register = async (user: Partial<IUser>) => {
    try {
        const res = await axoisServer.post(`/api/auth/register`, user);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to register");
    }
}
