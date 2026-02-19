import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { IEmployee } from "@/types/employee";

export const getAllEmployees = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/employees', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch employees");
    }
}

export const getEmployeeById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/employees/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch employees");
    }
}

export const addEmployee = async (employee: Partial<IEmployee>) => {
    try {
        const res = await axiosClient.post('/api/employees/add', employee);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add employee");
    }
}

export const updateEmployee = async (id: string, employee: Partial<IEmployee>) => {
    try {
        const res = await axiosClient.put(`/api/employees/${id}`, employee);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update employee");
    }
}
