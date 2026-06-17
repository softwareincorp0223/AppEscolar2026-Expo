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
  Configuracion: false,
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
    return dummyResponse;
  },

  async logout() {
    await SessionStorage.clearSession();
  },

  async getNotifications(): Promise<NotificationsState> {
    return emptyNotifications;
  },
};
