import { auth } from "@/auth";
import axios from "axios";

const axoisServer = axios.create({ baseURL: process.env.NEXT_PUBLIC_API });
axoisServer.interceptors.request.use(async (config) => {
  const session = await auth()

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
  }
  return config;
});

export default axoisServer;
