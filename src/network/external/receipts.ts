import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { IِAddReceipt } from "@/types/receipts";

export const getAllReceipts = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/receipts', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch receipts");
    }
}

export const getReceiptById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/receipts/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch receipt");
    }
}

export const addReceipt = async (receipt: Partial<IِAddReceipt>) => {
    try {
        const res = await axiosClient.post('/api/receipts/add', receipt);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add receipt");
    }
}

export const addReceiptBulk = async (receipts: Partial<IِAddReceipt[]>) => {
    try {
        const res = await axiosClient.post('/api/receipts/add/bulk', receipts);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add receipts");
    }
}

export const updateReceipt = async (id: string, receipt: Partial<IِAddReceipt>) => {
    try {
        const res = await axiosClient.put(`/api/receipts/${id}`, receipt);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update receipt");
    }
}

export const deleteReceipt = async (id: string) => {
    try {
        const res = await axiosClient.delete(`/api/receipts/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to delete receipt");
    }
}
