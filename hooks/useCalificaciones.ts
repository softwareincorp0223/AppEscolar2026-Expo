import { useCallback, useEffect, useState } from "react";

import {
  CalificacionService,
  CalificacionesData,
} from "@/api/services/calificacionService";
import { Calificacion } from "@/types/calificacion";
import { NotificationsState } from "@/types/mensaje";

const initialData: CalificacionesData = {
  calificaciones: [],
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

export function useCalificaciones() {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(
    initialData.calificaciones
  );
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);
  const [loading, setLoading] = useState(true);

  const loadCalificaciones = useCallback(async () => {
    setLoading(true);

    try {
      const calificacionesData =
        await CalificacionService.getCalificaciones();
      await CalificacionService.marcarCalificacionesVistas();
      const notificationsData = await CalificacionService.getNotifications();

      setCalificaciones(calificacionesData.calificaciones);
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  }, []);

  const getReporteBoletaUrl = useCallback(async (idEvaluacion: string) => {
    return CalificacionService.getReporteBoletaUrl(idEvaluacion);
  }, []);

  useEffect(() => {
    loadCalificaciones();
  }, [loadCalificaciones]);

  return {
    calificaciones,
    notifications,
    loading,
    loadCalificaciones,
    getReporteBoletaUrl,
  };
}
