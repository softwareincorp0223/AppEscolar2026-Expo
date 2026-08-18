import api from "@/api/axiosConfig";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { NotificationsState } from "@/types/mensaje";
import { Tarea, TareaStatus } from "@/types/tarea";

export interface TareasData {
  tareas: Tarea[];
  pagination?: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface TareaUploadFile {
  uri: string;
  name: string;
  mimeType?: string;
  size?: number;
}

interface SubirTareaResponse {
  status: "success" | "error";
  msg?: string;
  tarea?: {
    id_asignar_tarea: string;
    estatus_tarea: TareaStatus;
    archivo?: string;
  };
}

const normalizeStatus = (status?: string | null): TareaStatus => {
  const value = String(status || "").trim().toLowerCase();

  if (value === "enviado" || value === "entregado") return "enviado";
  if (value === "revisado") return "revisado";
  if (value === "observacion") return "observacion";
  return "pendiente";
};

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
  respuesta: "consulta_id",
  modulo: "tareas",
  id: ["m3x6t", "sfny8", "k6leo", "91ctt", "4mgnm", "v0m8a"],
  fila: [
    {
      id_tareas: "m3x6t",
      sid_grupo: "trkdv",
      sid_materia: "l9jnx",
      sid_instituto: "ew7hs",
      id_asignar_tarea: "h3m4g7k2aa",
      nombre_tarea: "MATEMATICAS MATERNAL",
      instrucciones_tarea:
        "<p>Resolver la actividad de conteo del cuaderno.</p><p><strong>Fecha de entrega:</strong> Lunes 08 de Abril.</p>",
      fecha_creacion: "2024-04-05 09:30:00",
      estatus_tarea: "pendiente",
      observacion_tarea: "",
      archivos_tarea: [],
      url_tarea: [""],
    },
    {
      id_tareas: "sfny8",
      sid_grupo: "trkdv",
      sid_materia: "61jis",
      sid_instituto: "ew7hs",
      id_asignar_tarea: "uu98xq12bb",
      nombre_tarea: "LECTURA MATERNAL",
      instrucciones_tarea:
        "<p>Leer en casa el cuento asignado y comentar los personajes principales.</p>",
      fecha_creacion: "2024-04-06 11:10:00",
      estatus_tarea: "revisado",
      observacion_tarea: "",
      archivos_tarea: ["lectura_maternal.pdf"],
      url_tarea: [""],
    },
    {
      id_tareas: "k6leo",
      sid_grupo: "trkdv",
      sid_materia: "l9jnx",
      sid_instituto: "ew7hs",
      id_asignar_tarea: "p5a7nn88cc",
      nombre_tarea: "ACTIVIDAD SENSORIAL",
      instrucciones_tarea:
        "<p>Traer material reciclado para actividad sensorial.</p>",
      fecha_creacion: "2024-04-08 08:45:00",
      estatus_tarea: "observacion",
      observacion_tarea: "Falto agregar evidencia fotografica de la actividad.",
      archivos_tarea: [],
      url_tarea: ["https://aplicacionescolar.com"],
    },
    {
      id_tareas: "91ctt",
      sid_grupo: "trkdv",
      sid_materia: "61jis",
      sid_instituto: "ew7hs",
      id_asignar_tarea: "r7l2tt45dd",
      nombre_tarea: "TRAZOS",
      instrucciones_tarea:
        "<p>Practicar trazos verticales y horizontales en la libreta roja.</p>",
      fecha_creacion: "2024-04-09 12:20:00",
      estatus_tarea: "pendiente",
      observacion_tarea: "",
      archivos_tarea: [],
      url_tarea: [""],
    },
    {
      id_tareas: "4mgnm",
      sid_grupo: "trkdv",
      sid_materia: "61jis",
      sid_instituto: "ew7hs",
      id_asignar_tarea: "cxhopxtkhj",
      nombre_tarea: "ESPANOL MATERNAL",
      instrucciones_tarea:
        "<p>Hola buenos d&iacute;as.</p>\r\n\r\n<p><strong>TAREA</strong>: Identifica, menciona y colorea las frutas.</p>\r\n\r\n<p><strong>Fecha de entrega:</strong> Viernes 12 de Abril.</p>\r\n\r\n<p><em>La carpeta roja asignada es donde se van a estar guardando las tareas lo que resta del ciclo escolar, por lo tanto hay que cuidarla. </em></p>\r\n",
      fecha_creacion: "2024-04-10 10:26:10",
      estatus_tarea: "enviado",
      observacion_tarea: "",
      archivos_tarea: [],
      url_tarea: [""],
    },
    {
      id_tareas: "v0m8a",
      sid_grupo: "trkdv",
      sid_materia: "l9jnx",
      sid_instituto: "ew7hs",
      id_asignar_tarea: "z9x8c7v6ee",
      nombre_tarea: "COLORES",
      instrucciones_tarea:
        "<p>Identificar objetos de color rojo, azul y amarillo dentro de casa.</p>",
      fecha_creacion: "2024-04-11 13:05:00",
      estatus_tarea: "pendiente",
      observacion_tarea: "",
      archivos_tarea: [],
      url_tarea: [""],
    },
  ] satisfies Tarea[],
};

export const TareaService = {
  async getTareas(limit = 20, offset = 0): Promise<TareasData> {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      const response = (await api.get<TareasData>("/tareas", {
        params: { sid_alumno: sidAlumno, limit, offset },
      })) as unknown as TareasData;

      return {
        ...response,
        tareas: (response.tareas || []).map((tarea) => ({
          ...tarea,
          estatus_tarea: normalizeStatus(tarea.estatus_tarea),
        })),
      };
    } catch {
      return {
        tareas: dummyResponse.fila,
      };
    }
  },

  async subirArchivo(
    idAsignarTarea: string,
    archivo: TareaUploadFile
  ): Promise<SubirTareaResponse> {
    const { sidAlumno } = await SessionStorage.getSession();
    const formData = new FormData();

    formData.append("sid_alumno", sidAlumno || "");
    formData.append("archivo", {
      uri: archivo.uri,
      name: archivo.name,
      type: archivo.mimeType || "application/octet-stream",
    } as unknown as Blob);

    const response = (await api.post<SubirTareaResponse>(
      `/tareas/${idAsignarTarea}/respuesta`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )) as unknown as SubirTareaResponse;

    if (response.status !== "success") {
      throw new Error(response.msg || "No se pudo subir la tarea");
    }

    return response;
  },

  async marcarTareasVistas() {
    try {
      const { sidAlumno } = await SessionStorage.getSession();
      await api.post("/tareas/marcar-vistos", { sid_alumno: sidAlumno });
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
