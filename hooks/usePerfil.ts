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
  Perfil: false,
};

export function usePerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [notifications, setNotifications] =
    useState<NotificationsState>(initialNotifications);
  const [loading, setLoading] = useState(true);

  const loadPerfil = useCallback(async () => {
    setLoading(true);

    try {
      const perfilData = await PerfilService.getPerfil();
      const notificationsData = await PerfilService.getNotifications();

      setPerfil(perfilData.perfil);
      setNotifications(notificationsData);
    } finally {
      setLoading(false);
    }
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
    loading,
    loadPerfil,
    logout,
  };
}
