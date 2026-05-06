import api from "../axiosConfig";

export const loginWithQR = async (qr: string) => {
  // 🔹 simulación real de request
  return await api.post("/padre.php", {
    codigo_qr: qr,
  });
};

export const getProfileQR = async (qr: string) => {
  // 🔹 simulación real de request
  return await api.get("/padre.php", {
    params: {
      codigo_qr: qr,
    }
  });
};