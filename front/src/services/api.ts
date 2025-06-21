import axios from "axios";
import { parseCookies } from "nookies";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const { loja_token: cookies } = parseCookies();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + cookies,
  },
});

export default api;
