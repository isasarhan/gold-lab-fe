import axoisServer from "@/lib/axios-server";
import axios from "axios";
import { IBalance, IBalanceUpdate } from "@/types/balance";
import axiosClient from "@/lib/axios-client";

export const getAllBalances = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/balances', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}

export const getBalancesTotal = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/balances/total', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}

export const getBalanceById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/balances/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}

export const addBalance = async (balance: Partial<IBalance>) => {
    try {
        const res = await axiosClient.post('/api/balances/add', balance);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}

export const updateBalance = async (id: string, balance: Partial<IBalanceUpdate>) => {
    try {
        const res = await axiosClient.put(`/api/balances/${id}`, balance);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Balances");
    }
}