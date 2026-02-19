import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { IOrder } from "@/types/invoice";

export const getAllOrders = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/orders', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch orders");
    }
}

export const getOrderById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/orders/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch order");
    }
}

export const addOrder = async (order: Partial<IOrder>) => {
    try {
        const res = await axiosClient.post('/api/orders/add', order);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add order");
    }
}

export const updateOrder = async (id: string, order: Partial<IOrder>) => {
    try {
        const res = await axiosClient.put(`/api/orders/${id}`, order);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update order");
    }
}

export const deleteOrder = async (id: string, query?: { invoiceId: string }) => {
    try {
        const res = await axiosClient.delete(`/api/orders/${id}`, { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to delete order");
    }
}
