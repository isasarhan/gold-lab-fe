import { IDailyWorkflow } from '@/types/daily-workflow';
import httpService from '../axios';
import axios from "axios";

const useDailyWorkflow = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/daily-workflow`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch Daily Work flow");
        }
    }
    const getByDate = async (date: string) => {
        if (!token) return

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(`${url}/date/${date}`);
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch Daily Work flow");
        }
    };
    const getById = async (id: string) => {
        if (!token) return

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(`${url}/${id}`);
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch Daily Work flow");
        }
    };
    const add = async (customer: Partial<IDailyWorkflow>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, customer);
            return res.data;
        } catch (error) {
            console.error("Error adding customer:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const update = async (id: string, report: Partial<IDailyWorkflow>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, report);
            return res.data;
        } catch (error) {
            console.error("Error adding report:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };


    return { getAll, getByDate, add, getById, update };
}

export default useDailyWorkflow;
