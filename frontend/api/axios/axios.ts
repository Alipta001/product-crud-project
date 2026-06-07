import axios from "axios";

export const BaseURL = 'http://localhost:4000';

console.log("BaseURL:", BaseURL);

export const AxiosInstance = axios.create({
  baseURL: BaseURL,
});