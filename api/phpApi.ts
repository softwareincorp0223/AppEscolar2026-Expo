import axios from "axios";

const phpApi = axios.create({
  baseURL: "https://aplicacionescolar.com/sistema/php",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

phpApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("PHP API ERROR:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default phpApi;
