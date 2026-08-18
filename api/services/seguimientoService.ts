import api from "@/api/axiosConfig";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { NotificationsState } from "@/types/mensaje";
import { Seguimiento, SeguimientoAtributo } from "@/types/seguimiento";

export interface SeguimientosData {
  seguimientos: Seguimiento[];
  atributos: SeguimientoAtributo[];
}

const emptyNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Perfil: false,
};

const dummyResponse = {
  respuesta: "seguimientos_aplicacion",
  modulo: "seguimiento",
  datos: [
    {
      id_seguimiento: "seg-001",
      fecha_registro: "2026-06-03",
      fecha: "Registro diario",
      observacion: "Excelente participacion durante la actividad grupal.",
    },
    {
      id_seguimiento: "seg-002",
      fecha_registro: "2026-06-04",
      fecha: "Seguimiento de conducta",
      observacion: "",
    },
    {
      id_seguimiento: "seg-003",
      fecha_registro: "2026-06-05",
      fecha: "Seguimiento academico",
      observacion: "Reforzar instrucciones de trabajo en casa.",
    },
  ] satisfies Seguimiento[],
  atributos: [
    {
      id_atributo: "atr-001",
      sid_seguimiento: "seg-001",
      nombre: "Conducta",
      icono: "feliz.svg",
      valor_atributo: "Muy bien",
    },
    {
      id_atributo: "atr-002",
      sid_seguimiento: "seg-001",
      nombre: "Participacion",
      icono: "estrella.svg",
      valor_atributo: "Alta",
    },
    {
      id_atributo: "atr-003",
      sid_seguimiento: "seg-001",
      nombre: "Alimentos",
      icono: "comida.svg",
      valor_atributo: "Completo",
    },
    {
      id_atributo: "atr-004",
      sid_seguimiento: "seg-002",
      nombre: "Conducta",
      icono: "neutral.svg",
      valor_atributo: "Regular",
    },
    {
      id_atributo: "atr-005",
      sid_seguimiento: "seg-002",
      nombre: "Descanso",
      icono: "descanso.svg",
      valor_atributo: "Bien",
    },
    {
      id_atributo: "atr-006",
      sid_seguimiento: "seg-003",
      nombre: "Atencion",
      icono: "idea.svg",
      valor_atributo: "En proceso",
    },
    {
      id_atributo: "atr-007",
      sid_seguimiento: "seg-003",
      nombre: "Trabajo",
      icono: "lapiz.svg",
      valor_atributo: "Pendiente",
    },
  ] satisfies SeguimientoAtributo[],
};

export const SeguimientoService = {
  async getSeguimientos(): Promise<SeguimientosData> {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      return (await api.get<SeguimientosData>("/seguimientos", {
        params: { sid_alumno: sidAlumno },
      })) as unknown as SeguimientosData;
    } catch {
      return {
        seguimientos: dummyResponse.datos,
        atributos: dummyResponse.atributos,
      };
    }
  },

  async marcarSeguimientosVistos() {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      await api.post("/seguimientos/marcar-vistos", { sid_alumno: sidAlumno });
    } catch {}
  },

  async getNotifications(): Promise<NotificationsState> {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      return (await api.get<NotificationsState>("/notificaciones", {
        params: { sid_alumno: sidAlumno },
      })) as unknown as NotificationsState;
    } catch {
      return emptyNotifications;
    }
  },
};
