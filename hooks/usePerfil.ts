import { useCallback, useEffect, useState } from "react";

import { PerfilService } from "@/api/services/perfilService";
import { NotificationsState } from "@/types/mensaje";
import { Perfil } from "@/types/perfil";

const initialNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Configuracion: false,
};

export function usePerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);

  const loadPerfil = useCallback(async () => {
    const perfilData = await PerfilService.getPerfil();
    const notificationsData = await PerfilService.getNotifications();

    setPerfil(perfilData.perfil);
    setNotifications(notificationsData);
  }, []);

  const logout = useCallback(async () => {
    await PerfilService.logout();
  }, []);

  useEffect(() => {
    loadPerfil();
  }, [loadPerfil]);

  return {
    perfil,
    notifications,
    loadPerfil,
    logout,
  };
}
