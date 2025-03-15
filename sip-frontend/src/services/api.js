import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
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
