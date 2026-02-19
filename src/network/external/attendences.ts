import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { IAttendence } from "@/types/employee";

export const getAllAttendences = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/attendences', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch attendences");
    }
}

export const getAttendenceById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/attendences/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch attendences");
    }
}

export const addAttendence = async (attendence: Partial<IAttendence>) => {
    try {
        const res = await axiosClient.post('/api/attendences/add', attendence);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add attendence");
    }
}

export const updateAttendence = async (id: string, attendence: Partial<IAttendence>) => {
    try {
        const res = await axiosClient.put(`/api/attendences/${id}`, attendence);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update attendence");
    }
}

export const uploadAttendenceXlsx = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axiosClient.post('/api/attendences/upload', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to upload attendence file");
    }
}
