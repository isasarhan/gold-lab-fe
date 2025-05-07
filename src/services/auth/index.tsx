import { IUser } from '@/types/user';
import httpService from '../axios';
import axios from 'axios';

const useAuth = () => {
    const instance = httpService.instance
    let url = `/auth`;
    const login = async (email: string, password: string) => {

        try {
            const res = await instance.post(`${url}/login`, { email, password })
            return res.data;
        } catch (error) {
            console.error("Error adding event:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }
    };
    const register = async (user: Partial<IUser>) => {
        try {
            const res = await instance.post(`${url}/register`, user)
            return res.data;
        } catch (error) {
            console.error("Error adding event:", error);

            let errorMessage = "An unexpected error occurred";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            throw new Error(errorMessage);
        }

    };
    return { login, register };
}

export default useAuth;
