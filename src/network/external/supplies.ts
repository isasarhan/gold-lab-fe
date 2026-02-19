import axiosClient from "@/lib/axios-client";
import axoisServer from "@/lib/axios-server";
import { ISupply } from "@/types/supply";

export const getAllSupplies = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/supplies', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Supplies");
    }
}

export const getSupplyById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/supplies/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Supplies");
    }
}

export const addSupply = async (supply: Partial<ISupply>) => {
    try {
        const res = await axiosClient.post(`/api/supplies/add`, supply);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Supplies");
    }
}
export const addSupplyBulk = async (supplies: Partial<Omit<ISupply, '_id'>>[]) => {
    try {
        const res = await axiosClient.post(`/api/supplies/add/bulk`, supplies);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Supplies");
    }
}

export const updateSupply = async (id: string, Supply: Partial<ISupply>) => {
    try {
        const res = await axiosClient.put(`/api/supplies/${id}`, Supply);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Supplies");
    }
}

export const deleteSupply = async (id: string) => {
    try {
        const res = await axiosClient.delete(`/api/supplies/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Supplies");
    }
}