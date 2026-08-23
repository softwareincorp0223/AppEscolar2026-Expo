import axios from "axios";

const phpApi = axios.create({
  baseURL: "https://aplicacionescolar.com/apiAppEscolarv2/",
  //baseURL: "http://192.168.100.11/apiAppEscolarv2/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
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
