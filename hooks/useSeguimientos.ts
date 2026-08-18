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
  Perfil: false,
};

export function useSeguimientos() {
  const [data, setData] = useState<SeguimientosData>(initialData);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);
  const [loading, setLoading] = useState(true);

  const loadSeguimientos = useCallback(async () => {
    setLoading(true);

    try {
      const seguimientosData = await SeguimientoService.getSeguimientos();
      await SeguimientoService.marcarSeguimientosVistos();
      const notificationsData = await SeguimientoService.getNotifications();

      setData(seguimientosData);
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSeguimientos();
  }, [loadSeguimientos]);

  return {
    ...data,
    notifications,
    loading,
    loadSeguimientos,
  };
}
