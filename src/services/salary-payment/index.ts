import { IAddSalaryPayment } from '@/types/salary-payment';
import httpService from '../axios';
import axios from "axios";

const useSalaryPayments = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/salary-payment`;

    const getAll = async (year: string, month?: string) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        const query: any = {
            year
        };

        if (month) {
            query['month'] = month;
        }

        console.log('query', query);
        
        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch payments");
        }
    }

    const getByEmployee = async (id: string, year: string, month?: string) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        const query: any = {
            year
        };

        if (month) {
            query['month'] = month;
        }

        try {
            const res = await instance.get(`${url}/employee/${id}`, { params: query })
            return res.data
        } catch (e) {
            console.log(e)
            throw new Error("Failed to fetch payments");
        }
    };

    const add = async (payment: IAddSalaryPayment) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, payment);
            return res.data;
        } catch (error) {
            console.error("Error adding payment:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };


    return { getByEmployee, getAll, add };
}

export default useSalaryPayments;
