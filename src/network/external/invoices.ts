import axoisServer from "@/lib/axios-server";

export const getAllInvoices = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/invoices', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Invoices");
    }
}

export const getInvoiceById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/invoices/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Invoices");
    }
}