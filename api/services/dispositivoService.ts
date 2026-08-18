import api from "@/api/axiosConfig";

interface RegistrarDispositivoRequest {
  id_padre: string;
  token_dispositivo: string;
  badge_notificaciones?: number;
}

interface RegistrarDispositivoResponse {
  status: "ok" | "error";
  dispositivo?: {
    id_dispositivos_padre: string;
    id_padre: string;
    token_dispositivo: string;
    badge_notificaciones: number;
  };
  msg?: string;
}

export const DispositivoService = {
  async registrarDispositivo({
    id_padre,
    token_dispositivo,
    badge_notificaciones = 0,
  }: RegistrarDispositivoRequest): Promise<RegistrarDispositivoResponse> {
    return (await api.post<RegistrarDispositivoResponse>("/dispositivos/register", {
      id_padre,
      token_dispositivo,
      badge_notificaciones,
    })) as unknown as RegistrarDispositivoResponse;
  },
};
