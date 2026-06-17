import { useCallback, useEffect, useState } from "react";

import { TareaService } from "@/api/services/tareaService";
import { NotificationsState } from "@/types/mensaje";
import { Tarea } from "@/types/tarea";

const initialNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Configuracion: false,
};

export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);

  const loadTareas = useCallback(async () => {
    const tareasData = await TareaService.getTareas();
    const notificationsData = await TareaService.getNotifications();

    setTareas(tareasData.tareas);
    setNotifications(notificationsData);
    await TareaService.marcarTareasVistas();
  }, []);

  const subirArchivo = useCallback(async (idAsignarTarea: string) => {
    await TareaService.subirArchivo(idAsignarTarea);
  }, []);

  useEffect(() => {
    loadTareas();
  }, [loadTareas]);

  return {
    tareas,
    notifications,
    loadTareas,
    subirArchivo,
  };
}
