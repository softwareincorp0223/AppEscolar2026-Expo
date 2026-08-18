import api from "@/api/axiosConfig";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { Asistencia } from "@/types/asistencia";
import { NotificationsState } from "@/types/mensaje";

export interface AsistenciasData {
  asistenciasHoy?: Asistencia[];
  asistencias: Asistencia[];
  pagination?: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
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
  async getAsistencias(limit = 20, offset = 0): Promise<AsistenciasData> {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      return (await api.get<AsistenciasData>("/asistencias", {
        params: { sid_alumno: sidAlumno, limit, offset },
      })) as unknown as AsistenciasData;
    } catch {
      return {
        asistencias: dummyResponse.fila,
      };
    }
  },

  async marcarAsistenciasVistas() {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      await api.post("/asistencias/marcar-vistos", { sid_alumno: sidAlumno });
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
