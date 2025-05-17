import { IAddSupplyPayment } from '@/types/supply-payments';
import httpService from '../axios';
import axios from "axios";

const useSupplyPayments = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/supply-payments`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {            
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch supplyPayments");
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

    const add = async (supplie: Partial<IAddSupplyPayment>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, supplie);
            return res.data;
        } catch (error) {
            console.error("Error adding supplie:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const addMany = async (supplyPayments: Partial<IAddSupplyPayment[]>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add/bulk`, supplyPayments);
            return res.data;
        } catch (error) {
            console.error("Error adding supplyPayments:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const update = async (id: string, supplie: Partial<IAddSupplyPayment>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, supplie);
            return res.data;
        } catch (error) {
            console.error("Error adding supplie:", error);

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
            throw new Error("Failed to delete supplyPayments");
        }
    }

    return { getById, getAll, add, addMany, update, remove };
}

export default useSupplyPayments;
