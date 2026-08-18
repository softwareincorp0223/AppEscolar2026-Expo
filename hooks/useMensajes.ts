import { useCallback, useEffect, useState } from "react";

import { MensajeService, MensajesData } from "@/api/services/mensajeService";
import { NotificationsState } from "@/types/mensaje";

const PAGE_SIZE = 50;

const initialData: MensajesData = {
  mensajes: [],
  archivosAdjuntos: [],
  links: [],
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

export function useMensajes() {
  const [data, setData] = useState<MensajesData>(initialData);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMensajes = useCallback(async () => {
    setLoading(true);

    try {
      const mensajesData = await MensajeService.getMensajes(PAGE_SIZE, 0);
      await MensajeService.marcarMensajesVistos();
      const notificationsData = await MensajeService.getNotifications();

      setData(mensajesData);
      setHasMore(Boolean(mensajesData.pagination?.hasMore));
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreMensajes = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const nextData = await MensajeService.getMensajes(
        PAGE_SIZE,
        data.mensajes.length
      );

      setData((current) => ({
        mensajes: [...current.mensajes, ...nextData.mensajes],
        archivosAdjuntos: [
          ...current.archivosAdjuntos,
          ...nextData.archivosAdjuntos,
        ],
        links: [...current.links, ...nextData.links],
        pagination: nextData.pagination,
      }));
      setHasMore(Boolean(nextData.pagination?.hasMore));
    } finally {
      setLoadingMore(false);
    }
  }, [data.mensajes.length, hasMore, loadingMore]);

  const responderMensaje = useCallback(
    async (idMensaje: string, respuesta: "si" | "no") => {
      const response = await MensajeService.responderMensaje(idMensaje, respuesta);

      setData((current) => ({
        ...current,
        mensajes: current.mensajes.map((mensaje) =>
          mensaje.id_mensaje === idMensaje
            ? { ...mensaje, respuesta_rapida: response.respuesta }
            : mensaje
        ),
      }));

      return response;
    },
    []
  );

  useEffect(() => {
    loadMensajes();
  }, [loadMensajes]);

  return {
    ...data,
    notifications,
    loadMensajes,
    loadMoreMensajes,
    hasMore,
    loading,
    loadingMore,
    responderMensaje,
  };
}
