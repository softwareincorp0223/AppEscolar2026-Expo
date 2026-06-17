import { useCallback, useEffect, useState } from "react";

import {
  SeguimientoService,
  SeguimientosData,
} from "@/api/services/seguimientoService";
import { NotificationsState } from "@/types/mensaje";

const initialData: SeguimientosData = {
  seguimientos: [],
  atributos: [],
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

export function useSeguimientos() {
  const [data, setData] = useState<SeguimientosData>(initialData);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);

  const loadSeguimientos = useCallback(async () => {
    const seguimientosData = await SeguimientoService.getSeguimientos();
    const notificationsData = await SeguimientoService.getNotifications();

    setData(seguimientosData);
    setNotifications(notificationsData);
    await SeguimientoService.marcarSeguimientosVistos();
  }, []);

  useEffect(() => {
    loadSeguimientos();
  }, [loadSeguimientos]);

  return {
    ...data,
    notifications,
    loadSeguimientos,
  };
}
