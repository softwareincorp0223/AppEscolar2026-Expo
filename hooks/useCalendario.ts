import { useCallback, useEffect, useMemo, useState } from "react";

import { CalendarioService } from "@/api/services/calendarioService";
import { CalendarFilter, EventoCalendario } from "@/types/calendario";
import { NotificationsState } from "@/types/mensaje";

const PAGE_SIZE = 10;

const initialNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Perfil: false,
};

export function useCalendario() {
  const [eventos, setEventos] = useState<EventoCalendario[]>([]);
  const [filter, setFilter] = useState<CalendarFilter>({
    month: null,
    year: null,
  });
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadEventos = useCallback(async (nextFilter = filter) => {
    setLoading(true);

    try {
      const calendarioData = await CalendarioService.getEventos(
        nextFilter,
        PAGE_SIZE,
        0
      );
      await CalendarioService.marcarEventosVistos();
      const notificationsData = await CalendarioService.getNotifications();

      setEventos(calendarioData.eventos);
      setHasMore(Boolean(calendarioData.pagination?.hasMore));
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const loadMoreEventos = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const calendarioData = await CalendarioService.getEventos(
        filter,
        PAGE_SIZE,
        eventos.length
      );
      setEventos((current) => [...current, ...calendarioData.eventos]);
      setHasMore(Boolean(calendarioData.pagination?.hasMore));
    } finally {
      setLoadingMore(false);
    }
  }, [eventos.length, filter, hasMore, loadingMore]);

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
    loadMoreEventos,
    hasMore,
    loading,
    loadingMore,
    updateFilter,
    clearFilter,
  };
}
