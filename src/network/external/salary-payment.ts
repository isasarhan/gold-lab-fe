import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { IAddSalaryPayment } from "@/types/salary-payment";

export const getAllSalaryPayments = async (year: string, month?: string) => {
    const query: Record<string, any> = { year };
    if (month) query['month'] = month;

    try {
        const res = await axoisServer.get('/api/salary-payment', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch salary payments");
    }
}

export const getSalaryPaymentsByEmployee = async (id: string, year: string, month?: string) => {
    const query: Record<string, any> = { year };
    if (month) query['month'] = month;

    try {
        const res = await axoisServer.get(`/api/salary-payment/employee/${id}`, { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch salary payments");
    }
}

export const addSalaryPayment = async (payment: IAddSalaryPayment) => {
    try {
        const res = await axiosClient.post('/api/salary-payment/add', payment);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add salary payment");
    }
}
