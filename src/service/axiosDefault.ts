import axios from "axios";
import * as https from "https";
import apiUrl from "../../config";



const axiosDefault = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 10 * 10000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
});


export default axiosDefault;
