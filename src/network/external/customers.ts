import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { ICustomer } from "@/types/customer";

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

export const getCustomerTypesAnalytics = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/customers/types', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch customers");
    }
}

export const addCustomer = async (customer: Partial<ICustomer>) => {
    try {
        const res = await axiosClient.post('/api/customers/add', customer);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add customer");
    }
}

export const updateCustomer = async (id: string, customer: Partial<ICustomer>) => {
    try {
        const res = await axiosClient.put(`/api/customers/${id}`, customer);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update customer");
    }
}
