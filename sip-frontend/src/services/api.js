import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const getNextSIPDate = async (data) =>
  API.get("/sip/next-instalment", {
    params: data,
  });
export const getInstalmentDate = async (data) =>
  API.get("/sip/get-instalment-date", {
    params:data,
  });
export const addHoliday = async (data) => API.post("/holidays/add", data);
