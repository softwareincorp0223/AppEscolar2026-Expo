import { useCallback, useEffect, useState } from "react";

import {
  AsistenciaService,
  AsistenciasData,
} from "@/api/services/asistenciaService";
import { Asistencia } from "@/types/asistencia";
import { NotificationsState } from "@/types/mensaje";

const initialData: AsistenciasData = {
  asistencias: [],
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

export function useAsistencias() {
  const [asistencias, setAsistencias] = useState<Asistencia[]>(
    initialData.asistencias
  );
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);

  const loadAsistencias = useCallback(async () => {
    const asistenciasData = await AsistenciaService.getAsistencias();
    const notificationsData = await AsistenciaService.getNotifications();

    setAsistencias(asistenciasData.asistencias);
    setNotifications(notificationsData);
    await AsistenciaService.marcarAsistenciasVistas();
  }, []);

  useEffect(() => {
    loadAsistencias();
  }, [loadAsistencias]);

  return {
    asistencias,
    notifications,
    loadAsistencias,
  };
}
