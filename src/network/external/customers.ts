import axoisServer from "@/lib/axios-server";

export const getAllCustomers = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/customers', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch customers");
    }
}

export const getCustomerById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/customers/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch customers");
    }
}