import axios from "axios";

//export const MOBILE_API_BASE_URL = "http://192.168.100.11:4000/api/mobile"; // backend Node mobile local
export const MOBILE_API_BASE_URL = "https://aplicacionescolar.com/sistema/api/mobile"; // backend Node mobile

// instancia base
const api = axios.create({
  baseURL: MOBILE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor request (por si luego metes token)
api.interceptors.request.use(
  async (config) => {
    // aquí luego puedes agregar token
    // const token = await AsyncStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor response
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("API ERROR:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
