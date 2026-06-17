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
  Configuracion: false,
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
    return {
      calificaciones: dummyResponse.fila,
    };
  },

  async getReporteBoletaUrl(idEvaluacion: string) {
    return `https://aplicacionescolar.com/sistema/php/pdf/reporte_boleta_dummy_${idEvaluacion}.pdf`;
  },

  async marcarCalificacionesVistas() {
    return;
  },

  async getNotifications(): Promise<NotificationsState> {
    return emptyNotifications;
  },
};
