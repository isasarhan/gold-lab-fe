import { IBalance, IBalanceTotals, IBalanceUpdate } from '@/types/balance';
import httpService from '../axios';
import axios from "axios";

const useBalances = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/balances`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch balances");
        }
    }
    const getTotal = async (): Promise<IBalanceTotals> => {
        try {
            httpService.assignToken(token!)
            const res = await instance.get(`${url}/total`);
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch balances");
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

    const add = async (balance: Partial<IBalance>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, balance);
            return res.data;
        } catch (error) {
            console.error("Error adding balance:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const update = async (id: string, balance: Partial<IBalanceUpdate>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, balance);
            return res.data;
        } catch (error) {
            console.error("Error adding balance:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };

    return { getById, getAll, getTotal, add, update };
}

export default useBalances;
