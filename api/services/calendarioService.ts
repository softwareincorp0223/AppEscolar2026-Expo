import { EventoCalendario, CalendarFilter } from "@/types/calendario";
import { NotificationsState } from "@/types/mensaje";

export interface CalendarioData {
  eventos: EventoCalendario[];
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
  async getEventos(filter?: CalendarFilter): Promise<CalendarioData> {
    const eventos = dummyResponse.fila.filter((evento) => {
      if (!filter?.month || !filter?.year) return true;

      const date = new Date(`${evento.fecha_evento}T00:00:00`);
      return date.getMonth() + 1 === filter.month && date.getFullYear() === filter.year;
    });

    return { eventos };
  },

  async marcarEventosVistos() {
    return;
  },

  async getNotifications(): Promise<NotificationsState> {
    return emptyNotifications;
  },
};
