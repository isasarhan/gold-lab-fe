import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { IِAddInvoice } from "@/types/invoice";

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

export const addInvoice = async (invoice: Partial<IِAddInvoice>) => {
    try {
        const res = await axiosClient.post('/api/invoices/add', invoice);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add Invoice");
    }
}

export const updateInvoice = async (id: string, invoice: Partial<IِAddInvoice>) => {
    try {
        const res = await axiosClient.put(`/api/invoices/${id}`, invoice);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update Invoice");
    }
}

export const deleteInvoice = async (id: string) => {
    try {
        const res = await axiosClient.delete(`/api/invoices/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to delete Invoice");
    }
}
