import { IOrder } from '@/types/invoice';
import httpService from '../axios';
import axios from "axios";

const useOrders = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/orders`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch orders");
        }
    }

    const getById = async (id: string) => {
        if (!token) return
        return httpService.assignToken(token) ? await instance.get(`${url}/${id}`).then((res) => {
            return res.data
        }).catch((e) => {
            console.log(e)
            throw new Error(e)
        }) : null
    };

    const add = async (order: Partial<IOrder>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, order);
            return res.data;
        } catch (error) {
            console.error("Error adding order:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const update = async (id: string, order: Partial<IOrder>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, order);
            return res.data;
        } catch (error) {
            console.error("Error adding order:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const remove = async (id: string, query?: { invoiceId: string }) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.delete(`${url}/${id}`, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to delete orders");
        }
    }

    return { getById, getAll, add, update, remove };
}

export default useOrders;
