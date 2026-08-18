import { useCallback, useEffect, useState } from "react";

import {
  AsistenciaService,
  AsistenciasData,
} from "@/api/services/asistenciaService";
import { Asistencia } from "@/types/asistencia";
import { NotificationsState } from "@/types/mensaje";

const PAGE_SIZE = 20;

const initialData: AsistenciasData = {
  asistenciasHoy: [],
  asistencias: [],
};

const initialNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Perfil: false,
};

export function useAsistencias() {
  const [asistencias, setAsistencias] = useState<Asistencia[]>(
    initialData.asistencias
  );
  const [asistenciasHoy, setAsistenciasHoy] = useState<Asistencia[]>(
    initialData.asistenciasHoy ?? []
  );
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadAsistencias = useCallback(async () => {
    setLoading(true);

    try {
      const asistenciasData = await AsistenciaService.getAsistencias(PAGE_SIZE, 0);
      await AsistenciaService.marcarAsistenciasVistas();
      const notificationsData = await AsistenciaService.getNotifications();

      setAsistenciasHoy(asistenciasData.asistenciasHoy ?? []);
      setAsistencias(asistenciasData.asistencias);
      setHasMore(Boolean(asistenciasData.pagination?.hasMore));
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreAsistencias = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const asistenciasData = await AsistenciaService.getAsistencias(
        PAGE_SIZE,
        asistencias.length
      );
      setAsistencias((current) => [
        ...current,
        ...asistenciasData.asistencias,
      ]);
      setHasMore(Boolean(asistenciasData.pagination?.hasMore));
    } finally {
      setLoadingMore(false);
    }
  }, [asistencias.length, hasMore, loadingMore]);

  useEffect(() => {
    loadAsistencias();
  }, [loadAsistencias]);

  return {
    asistenciasHoy,
    asistencias,
    notifications,
    loadAsistencias,
    loadMoreAsistencias,
    hasMore,
    loading,
    loadingMore,
  };
}
