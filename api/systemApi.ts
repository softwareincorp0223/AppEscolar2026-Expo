import axios from "axios";

const systemApi = axios.create({
  baseURL: "http://192.168.100.11:4000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

systemApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("SYSTEM API ERROR:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default systemApi;
