import httpService from '../axios';

const useAnalytics = ({ token }: { token: string | undefined }) => {
    const instance = httpService.instance
    const url = `/analytics`;

    const findTotalYearRevenue = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(`${url}/customer/revenue/year`, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch analytics");
        }
    }
    const findTotalYearPayments = async (query?: Record<string, any>) => {
        if (!token) return;

        if (!httpService.assignToken(token)) return null;

        try {
            const res = await instance.get(`${url}/customer/receipts`, { params: query });
            return res.data;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch analytics");
        }
    }



    return { findTotalYearRevenue,findTotalYearPayments };
}

export default useAnalytics;
