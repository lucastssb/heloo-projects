import axios from "axios";
import { parseISO } from 'date-fns';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
