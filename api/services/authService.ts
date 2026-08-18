import phpApi from "../phpApi";

interface LoginWithQRResponse {
  status: "ok" | "error";
  id_padre?: string;
  sid_instituto?: string;
  msg?: string;
}

interface LoginWithQRRequest {
  codigo_qr: string;
}

export const loginWithQR = async (
  codigoQR: string
): Promise<LoginWithQRResponse> => {
  try {
    const response = await phpApi.post<
      LoginWithQRResponse,
      LoginWithQRResponse,
      LoginWithQRRequest
    >("/padre.php?accion=iniciar_sesion_qr", {
      codigo_qr: codigoQR.trim(),
    });

    return response;
  } catch (error: any) {
    console.error(
      "Error al iniciar sesión con QR:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.msg ||
        error.message ||
        "Error al iniciar sesión con QR"
    );
  }
};