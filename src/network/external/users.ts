import axiosClient from "@/lib/axios-client";
import axoisServer from "@/lib/axios-server";
import { IUser } from "@/types/user";

export const getAllUsers = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/users', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Users");
    }
}

export const getUserById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/users/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Users");
    }
}

export const addUser = async (user: Partial<IUser>) => {
    try {
        const res = await axiosClient.post(`/api/users/add`, user);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Users");
    }
}

export const updateUser = async (id: string, user: Partial<IUser>) => {
    try {
        const res = await axiosClient.put(`/api/users/${id}`, user);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Users");
    }
}

export const deleteUser = async (id: string) => {
    try {
        const res = await axiosClient.delete(`/api/users/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Users");
    }
}