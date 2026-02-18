import axoisServer from "@/lib/axios-server";

export const getAllBalances = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/balances', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}

export const getBalancesTotal = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/balances/total', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}

export const getBalanceById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/balances/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}