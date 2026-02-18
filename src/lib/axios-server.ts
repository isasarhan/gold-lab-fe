import axios from "axios";
import { cookies } from "next/headers";

const axoisServer = axios.create({ baseURL: process.env.NEXT_PUBLIC_API });
axoisServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  return config;
});

export default axoisServer;
