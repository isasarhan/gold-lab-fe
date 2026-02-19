import axoisServer from "@/lib/axios-server";

export const getAllUsers = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/users', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Users");
    }
}

export const getUserById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/users/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Users");
    }
}