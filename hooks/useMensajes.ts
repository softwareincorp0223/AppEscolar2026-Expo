import { useCallback, useEffect, useState } from "react";

import { MensajeService, MensajesData } from "@/api/services/mensajeService";
import { NotificationsState } from "@/types/mensaje";

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
  Configuracion: false,
};

export function useMensajes() {
  const [data, setData] = useState<MensajesData>(initialData);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);

  const loadMensajes = useCallback(async () => {
    const mensajesData = await MensajeService.getMensajes();
    const notificationsData = await MensajeService.getNotifications();

    setData(mensajesData);
    setNotifications(notificationsData);
    await MensajeService.marcarMensajesVistos();
  }, []);

  const responderMensaje = useCallback(
    async (idMensaje: string, respuesta: "si" | "no") => {
      await MensajeService.responderMensaje(idMensaje, respuesta);
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
    responderMensaje,
  };
}
