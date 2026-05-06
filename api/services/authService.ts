import api from "../axiosConfig";

export const loginWithQR = async (qr: string) => {
  return await api.post("/padre.php", {
    accion: "iniciar_sesion_qr",
    codigo_qr: qr,
  });
};