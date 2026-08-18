import api from "@/api/axiosConfig";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { NotificationsState } from "@/types/mensaje";
import { Perfil } from "@/types/perfil";

export interface PerfilData {
  perfil: Perfil;
}

const emptyNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Perfil: false,
};

const dummyResponse: PerfilData = {
  perfil: {
    padre: {
      nombre: "Angel",
      apellido: "Martinez",
      correo: "angel.martinez@example.com",
    },
    instituto: {
      nombre: "Instituto App Escolar",
      correo: "contacto@appescolar.com",
      logo: "logo_app_escolar.png",
      descripcion:
        "Comunidad educativa enfocada en mantener comunicacion clara entre escuela y familia.",
    },
  },
};

export const PerfilService = {
  async getPerfil(): Promise<PerfilData> {
    try {
      const { idPadre } = await SessionStorage.getSession();

      return (await api.get<PerfilData>("/perfil", {
        params: { id_padre: idPadre },
      })) as unknown as PerfilData;
    } catch {
      return dummyResponse;
    }
  },

  async logout() {
    await SessionStorage.clearSession();
  },

  async getNotifications(): Promise<NotificationsState> {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      return (await api.get<NotificationsState>("/notificaciones", {
        params: { sid_alumno: sidAlumno },
      })) as unknown as NotificationsState;
    } catch {
      return emptyNotifications;
    }
  },
};
