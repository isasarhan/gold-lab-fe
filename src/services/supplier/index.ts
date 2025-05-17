import { ISupplier } from '@/types/supplier';
import httpService from '../axios';
import axios from "axios";

const useSuppliers = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/suppliers`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch suppliers");
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

    const add = async (supplier: Partial<ISupplier>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, supplier);
            return res.data;
        } catch (error) {
            console.error("Error adding supplier:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const update = async (id: string, supplier: Partial<ISupplier>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, supplier);
            return res.data;
        } catch (error) {
            console.error("Error adding supplier:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };

    return { getById, getAll, add, update };
}

export default useSuppliers;
