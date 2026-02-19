import axoisServer from "@/lib/axios-server";
import axiosClient from "@/lib/axios-client";
import { IDailyWorkflow } from "@/types/daily-workflow";

export const getAllDailyWorkflows = async (query?: Record<string, any>) => {
    try {
        const res = await axoisServer.get('/api/daily-workflow', { params: query });
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Daily Workflows");
    }
}

export const getDailyWorkflowByDate = async (date: string) => {
    try {
        const res = await axoisServer.get(`/api/daily-workflow/date/${date}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Daily Workflow");
    }
}

export const getDailyWorkflowById = async (id: string) => {
    try {
        const res = await axoisServer.get(`/api/daily-workflow/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch Daily Workflow");
    }
}

export const addDailyWorkflow = async (workflow: Partial<IDailyWorkflow>) => {
    try {
        const res = await axiosClient.post('/api/daily-workflow/add', workflow);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to add Daily Workflow");
    }
}

export const updateDailyWorkflow = async (id: string, workflow: Partial<IDailyWorkflow>) => {
    try {
        const res = await axiosClient.put(`/api/daily-workflow/${id}`, workflow);
        return res.data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update Daily Workflow");
    }
}
