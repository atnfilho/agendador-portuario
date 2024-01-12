import axios from "axios";
import * as https from "https";
import { getSession } from "next-auth/react";
import apiUrl from "../../config";

const api = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 10 * 10000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  withCredentials: false
});


api.interceptors.request.use(async (config) => {
  
  const session: any = await getSession();
  if(session) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
}, undefined)


export default api;
