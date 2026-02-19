import axoisServer from "@/lib/axios-server";

export const findTotalYearRevenue = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/analytics/customer/revenue/year', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch customers");
    }
}

export const findTotalYearPayments = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/analytics/customer/receipts', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch customers");
    }
}