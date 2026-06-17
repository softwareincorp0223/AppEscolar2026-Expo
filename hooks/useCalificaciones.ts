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
  Configuracion: false,
};

export function useCalificaciones() {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(
    initialData.calificaciones
  );
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);

  const loadCalificaciones = useCallback(async () => {
    const calificacionesData =
      await CalificacionService.getCalificaciones();
    const notificationsData = await CalificacionService.getNotifications();

    setCalificaciones(calificacionesData.calificaciones);
    setNotifications(notificationsData);
    await CalificacionService.marcarCalificacionesVistas();
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
    loadCalificaciones,
    getReporteBoletaUrl,
  };
}
