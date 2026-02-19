import axoisServer from "@/lib/axios-server";


export const login = async (email: string, password: string) => {
    try {
        const res = await axoisServer.post(`/api/auth/login`, { email, password })
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}