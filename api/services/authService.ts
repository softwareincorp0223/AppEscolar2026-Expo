import api from "../axiosConfig";

interface LoginWithQRResponse {
  id?: string;
  id_padre?: string;
}

export const loginWithQR = async (qr: string) => {
  const response = await api.post<LoginWithQRResponse>("/padre.php", {
    accion: "iniciar_sesion_qr",
    codigo_qr: qr,
  });

  return response as unknown as LoginWithQRResponse;
};
