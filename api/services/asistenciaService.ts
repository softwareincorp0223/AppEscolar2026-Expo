import { Asistencia } from "@/types/asistencia";
import { NotificationsState } from "@/types/mensaje";

export interface AsistenciasData {
  asistencias: Asistencia[];
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
  respuesta: "consulta_asistencias_app",
  modulo: "asistencia",
  fila: [
    {
      id_asistencia: "asis-001",
      foto: 0,
      nombre: "Sofia",
      apellido: "Martinez",
      matricula: "A-2026-001",
      fecha_ingreso: "2026-06-03",
      hora: "07:58",
      tipo: "entrada",
    },
    {
      id_asistencia: "asis-002",
      foto: 0,
      nombre: "Sofia",
      apellido: "Martinez",
      matricula: "A-2026-001",
      fecha_ingreso: "2026-06-03",
      hora: "13:05",
      tipo: "salida",
    },
    {
      id_asistencia: "asis-003",
      foto: "El archivo no se pudo subir",
      nombre: "Mateo",
      apellido: "Martinez",
      matricula: "A-2026-002",
      fecha_ingreso: "2026-06-04",
      hora: "08:02",
      tipo: "entrada",
    },
    {
      id_asistencia: "asis-004",
      foto: "El archivo no se pudo subir",
      nombre: "Mateo",
      apellido: "Martinez",
      matricula: "A-2026-002",
      fecha_ingreso: "2026-06-04",
      hora: "13:00",
      tipo: "salida",
    },
  ] satisfies Asistencia[],
};

export const AsistenciaService = {
  async getAsistencias(): Promise<AsistenciasData> {
    return {
      asistencias: dummyResponse.fila,
    };
  },

  async marcarAsistenciasVistas() {
    return;
  },

  async getNotifications(): Promise<NotificationsState> {
    return emptyNotifications;
  },
};
