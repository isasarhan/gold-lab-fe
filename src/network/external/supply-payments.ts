import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { ISupplyPayment } from "@/types/supply-payments";

export const getAllSupplyPayments = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/supply-payments', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch supply payments");
    }
}

export const getSupplyPaymentById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/supply-payments/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch supply payment");
    }
}

export const addSupplyPayment = async (payment: Partial<ISupplyPayment>) => {
    try {
        const res = await axiosClient.post('/api/supply-payments/add', payment);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add supply payment");
    }
}

export const addSupplyPaymentBulk = async (payments: Partial<ISupplyPayment[]>) => {
    try {
        const res = await axiosClient.post('/api/supply-payments/add/bulk', payments);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add supply payments");
    }
}

export const updateSupplyPayment = async (id: string, payment: Partial<ISupplyPayment>) => {
    try {
        const res = await axiosClient.put(`/api/supply-payments/${id}`, payment);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update supply payment");
    }
}

export const deleteSupplyPayment = async (id: string) => {
    try {
        const res = await axiosClient.delete(`/api/supply-payments/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to delete supply payment");
    }
}
