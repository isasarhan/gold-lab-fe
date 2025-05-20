import { IAttendence } from '@/types/employee';
import httpService from '../axios';
import axios from "axios";
import { getAxiosError } from '@/lib/getErrorMessage';

const useAttendences = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/attendences`;

    const getAll = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(url, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch attendences");
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

    const add = async (attendence: Partial<IAttendence>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.post(`${url}/add`, attendence);
            return res.data;
        } catch (error) {
            console.error("Error adding attendence:", error);

            throw new Error(getAxiosError(error));
        }
    };
    const update = async (id: string, attendence: Partial<IAttendence>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.put(`${url}/${id}`, attendence);
            return res.data;
        } catch (error) {
            console.error("Error adding attendence:", error);

            throw new Error(getAxiosError(error));
        }
    };
    
    const uploadXlsx = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await instance.post(`${url}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return res.data;
        } catch (error) {
            
            throw new Error(getAxiosError(error));
        }
    }

    return { getById, getAll, add, update, uploadXlsx };
}

export default useAttendences;
