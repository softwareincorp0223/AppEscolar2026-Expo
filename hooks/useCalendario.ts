import { useCallback, useEffect, useMemo, useState } from "react";

import { CalendarioService } from "@/api/services/calendarioService";
import { CalendarFilter, EventoCalendario } from "@/types/calendario";
import { NotificationsState } from "@/types/mensaje";

const initialNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Configuracion: false,
};

export function useCalendario() {
  const [eventos, setEventos] = useState<EventoCalendario[]>([]);
  const [filter, setFilter] = useState<CalendarFilter>({
    month: null,
    year: null,
  });
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);

  const loadEventos = useCallback(async (nextFilter = filter) => {
    const calendarioData = await CalendarioService.getEventos(nextFilter);
    const notificationsData = await CalendarioService.getNotifications();

    setEventos(calendarioData.eventos);
    setNotifications(notificationsData);
    await CalendarioService.marcarEventosVistos();
  }, [filter]);

  const updateFilter = useCallback(
    async (nextFilter: CalendarFilter) => {
      setFilter(nextFilter);
      await loadEventos(nextFilter);
    },
    [loadEventos]
  );

  const clearFilter = useCallback(async () => {
    const emptyFilter = { month: null, year: null };
    setFilter(emptyFilter);
    await loadEventos(emptyFilter);
  }, [loadEventos]);

  useEffect(() => {
    loadEventos();
  }, [loadEventos]);

  const hasActiveFilter = useMemo(
    () => Boolean(filter.month && filter.year),
    [filter.month, filter.year]
  );

  return {
    eventos,
    filter,
    notifications,
    hasActiveFilter,
    loadEventos,
    updateFilter,
    clearFilter,
  };
}
