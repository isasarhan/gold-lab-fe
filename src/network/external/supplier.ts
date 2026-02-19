import axiosClient from "@/lib/axios-client";
import axoisServer from "@/lib/axios-server";
import { ISupplier } from "@/types/supplier";

export const getAllSuppliers = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/suppliers', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Suppliers");
    }
}

export const getSupplierById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/suppliers/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Suppliers");
    }
}

export const addSupplier = async (supplier: Partial<ISupplier>) => {
    try {
        const res = await axiosClient.post(`/api/suppliers/add`, supplier);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Suppliers");
    }
}

export const updateSupplier = async (id: string, supplier: Partial<ISupplier>) => {
    try {
        const res = await axiosClient.put(`/api/suppliers/${id}`, supplier);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Suppliers");
    }
}

export const deleteSupplier = async (id: string) => {
    try {
        const res = await axiosClient.delete(`/api/suppliers/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Suppliers");
    }
}