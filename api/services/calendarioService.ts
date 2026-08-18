import api from "@/api/axiosConfig";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { EventoCalendario, CalendarFilter } from "@/types/calendario";
import { NotificationsState } from "@/types/mensaje";

export interface CalendarioData {
  eventos: EventoCalendario[];
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

const sortEventosByLatest = (eventos: EventoCalendario[]) => {
  return [...eventos].sort((a, b) => {
    const dateA = `${a.fecha_evento || ""} ${a.hora || ""}`;
    const dateB = `${b.fecha_evento || ""} ${b.hora || ""}`;

    return dateB.localeCompare(dateA);
  });
};

const dummyResponse = {
  respuesta: "consulta",
  modulo: "evento",
  fila: [
    {
      id_evento: "evt-001",
      nombre_evento: "Junta con padres de familia",
      fecha_evento: "2026-06-12",
      hora: "08:30:00",
    },
    {
      id_evento: "evt-002",
      nombre_evento: "Festival de verano",
      fecha_evento: "2026-06-20",
      hora: "10:00:00",
    },
    {
      id_evento: "evt-003",
      nombre_evento: "Entrega de trabajos finales",
      fecha_evento: "2026-07-04",
      hora: "09:15:00",
    },
    {
      id_evento: "evt-004",
      nombre_evento: "Suspension de labores",
      fecha_evento: "2026-05-27",
      hora: "07:00:00",
    },
  ] satisfies EventoCalendario[],
};

export const CalendarioService = {
  async getEventos(
    filter?: CalendarFilter,
    limit = 10,
    offset = 0
  ): Promise<CalendarioData> {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      const response = (await api.get<CalendarioData>("/calendario", {
        params: {
          sid_alumno: sidAlumno,
          month: filter?.month,
          year: filter?.year,
          limit,
          offset,
        },
      })) as unknown as CalendarioData;

      return {
        ...response,
        eventos: sortEventosByLatest(response.eventos ?? []),
      };
    } catch {
      const eventos = dummyResponse.fila.filter((evento) => {
        if (!filter?.month || !filter?.year) return true;

        const date = new Date(`${evento.fecha_evento}T00:00:00`);
        return date.getMonth() + 1 === filter.month && date.getFullYear() === filter.year;
      });

      return { eventos: sortEventosByLatest(eventos) };
    }
  },

  async marcarEventosVistos() {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      await api.post("/calendario/marcar-vistos", { sid_alumno: sidAlumno });
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
