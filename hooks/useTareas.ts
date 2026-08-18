import { useCallback, useEffect, useState } from "react";

import { TareaService, TareaUploadFile } from "@/api/services/tareaService";
import { NotificationsState } from "@/types/mensaje";
import { Tarea } from "@/types/tarea";

const PAGE_SIZE = 20;

const initialNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Perfil: false,
};

export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadTareas = useCallback(async () => {
    setLoading(true);

    try {
      const tareasData = await TareaService.getTareas(PAGE_SIZE, 0);
      await TareaService.marcarTareasVistas();
      const notificationsData = await TareaService.getNotifications();

      setTareas(tareasData.tareas);
      setHasMore(Boolean(tareasData.pagination?.hasMore));
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreTareas = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const tareasData = await TareaService.getTareas(PAGE_SIZE, tareas.length);
      setTareas((current) => [...current, ...tareasData.tareas]);
      setHasMore(Boolean(tareasData.pagination?.hasMore));
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, tareas.length]);

  const subirArchivo = useCallback(
    async (idAsignarTarea: string, archivo: TareaUploadFile) => {
      const response = await TareaService.subirArchivo(idAsignarTarea, archivo);

      setTareas((current) =>
        current.map((tarea) =>
          tarea.id_asignar_tarea === idAsignarTarea
            ? {
                ...tarea,
                estatus_tarea: "enviado",
                archivo_respuesta: response.tarea?.archivo,
              }
            : tarea
        )
      );

      return response;
    },
    []
  );

  useEffect(() => {
    loadTareas();
  }, [loadTareas]);

  return {
    tareas,
    notifications,
    loadTareas,
    loadMoreTareas,
    hasMore,
    loading,
    loadingMore,
    subirArchivo,
  };
}
