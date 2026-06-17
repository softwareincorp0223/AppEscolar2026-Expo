export interface EventoCalendario {
  id_evento: string;
  nombre_evento: string;
  fecha_evento: string;
  hora: string;
}

export interface CalendarFilter {
  month: number | null;
  year: number | null;
}
