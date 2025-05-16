import { IِAddReceipt } from '@/types/receipts';
import httpService from '../axios';
import axios from "axios";

const useReceipts = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/receipts`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch receipts");
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

    const add = async (receipt: Partial<IِAddReceipt>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, receipt);
            return res.data;
        } catch (error) {
            console.error("Error adding receipt:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const addMany = async (receipts: Partial<IِAddReceipt[]>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add/bulk`, receipts);
            return res.data;
        } catch (error) {
            console.error("Error adding receipts:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const update = async (id: string, receipt: Partial<IِAddReceipt>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, receipt);
            return res.data;
        } catch (error) {
            console.error("Error adding receipt:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const remove = async (id: string) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.delete(`${url}/${id}`);
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to delete orders");
        }
    }

    return { getById, getAll, add, addMany, update, remove };
}

export default useReceipts;
