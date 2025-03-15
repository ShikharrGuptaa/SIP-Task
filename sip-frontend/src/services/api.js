import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API = axios.create({
  baseURL: process.env.BACKEND_URL,
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
