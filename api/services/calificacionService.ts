import api from "@/api/axiosConfig";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { Calificacion } from "@/types/calificacion";
import { NotificationsState } from "@/types/mensaje";

export interface CalificacionesData {
  calificaciones: Calificacion[];
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

const dummyResponse = {
  respuesta: "consulta_id",
  modulo: "calificacion",
  fila: [
    {
      id_evaluacion: "eval-2026-01",
      foto: 0,
      ciclo: "2025-2026",
      nombre_nivel: "Preescolar",
      nombre_grado: "Maternal",
      nombre_grupo: "A",
    },
    {
      id_evaluacion: "eval-2026-02",
      foto: "El archivo no se pudo subir",
      ciclo: "2025-2026",
      nombre_nivel: "Preescolar",
      nombre_grado: "Maternal",
      nombre_grupo: "B",
    },
  ] satisfies Calificacion[],
};

export const CalificacionService = {
  async getCalificaciones(): Promise<CalificacionesData> {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      return (await api.get<CalificacionesData>("/calificaciones", {
        params: { sid_alumno: sidAlumno },
      })) as unknown as CalificacionesData;
    } catch {
      return {
        calificaciones: dummyResponse.fila,
      };
    }
  },

  async getReporteBoletaUrl(idEvaluacion: string): Promise<string> {
    try {
      const response = (await api.get<{ url: string }>(
        `/calificaciones/${idEvaluacion}/boleta`
      )) as unknown as { url: string };

      return response.url;
    } catch {
      return `https://aplicacionescolar.com/sistema/php/pdf/reporte_boleta_dummy_${idEvaluacion}.pdf`;
    }
  },

  async marcarCalificacionesVistas() {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      await api.post("/calificaciones/marcar-vistos", { sid_alumno: sidAlumno });
    } catch {}
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
