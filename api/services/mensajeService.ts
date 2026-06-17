import { ArchivoAdjunto, LinkItem, Mensaje, NotificationsState } from "@/types/mensaje";

export interface MensajesData {
  mensajes: Mensaje[];
  archivosAdjuntos: ArchivoAdjunto[];
  links: LinkItem[];
}

const emptyNotifications: NotificationsState = {
  Mensajes: false,
  Tareas: false,
  Seguimientos: false,
  Calificaciones: false,
  Calendario: false,
  Asistencias: false,
  Configuracion: false,
};

const dummyResponse = {
  respuesta: "mensajes_aplicacion",
  modulo: "mensajes",
  respuesta_rapida: [],
  mensajes_programados: null,
  comparar_hora: null,
  hora_actual: "12:09",
  mensajes_programados_validar: null,
  datos: [
    {
      id_mensaje: "yw91r3bixc",
      receptor: "3",
      sid_usuario_emisor: "jz1oq",
      tipo_mensaje: "Circular",
      asunto: "La Fiesta del Siglo",
      mensaje:
        "Estimados padres de familia, compartimos la circular correspondiente al evento La Fiesta del Siglo. Favor de revisar los archivos adjuntos.",
      fecha_envio: "2026-05-07",
      hora_envio: "11:34",
      icono: "",
      respuesta_rapida: "",
    },
    {
      id_mensaje: "gtdjmw9dsy",
      receptor: "3",
      sid_usuario_emisor: "jz1oq",
      tipo_mensaje: "Aviso",
      asunto: "LA FIESTA DEL SIGLO",
      mensaje:
        "Recordatorio importante sobre la organizacion y detalles del evento escolar. Consulta el archivo adjunto para mas informacion.",
      fecha_envio: "2026-05-08",
      hora_envio: "09:15",
      icono: "",
      respuesta_rapida: "",
    },
    {
      id_mensaje: "qobveu3y1c",
      receptor: "3",
      sid_usuario_emisor: "phj8l",
      tipo_mensaje: "Mensaje",
      asunto: "Informacion general",
      mensaje:
        "Mensaje informativo enviado desde el modulo escolar para validar el listado de mensajes en la aplicacion.",
      fecha_envio: "2026-05-09",
      hora_envio: "12:09",
      icono: "",
      respuesta_rapida: "",
    },
  ],
  datos_archivo: [
    {
      id_archivo_mensaje: "tjp1g",
      sid_mensaje: "yw91r3bixc",
      url: "Circular_La_Fiesta_del_Siglo_3",
    },
    {
      id_archivo_mensaje: "l9wg2",
      sid_mensaje: "yw91r3bixc",
      url: "WhatsApp_Image_2026-05-07_at_11.34.04_AM",
    },
    {
      id_archivo_mensaje: "jam9m",
      sid_mensaje: "gtdjmw9dsy",
      url: "LA_FIESTA_DEL_SIGLO",
    },
  ],
  datos_url: [
    {
      id_url: "tvu4a",
      sid_mensaje: "yw91r3bixc",
      url: "",
    },
    {
      id_url: "8tq8n",
      sid_mensaje: "gtdjmw9dsy",
      url: "",
    },
    {
      id_url: "qr93i",
      sid_mensaje: "qobveu3y1c",
      url: "",
    },
  ],
};

export const MensajeService = {
  async getMensajes(): Promise<MensajesData> {
    return {
      mensajes: dummyResponse.datos,
      archivosAdjuntos: dummyResponse.datos_archivo,
      links: dummyResponse.datos_url,
    };
  },

  async responderMensaje(_idMensaje: string, _respuesta: "si" | "no") {
    return;
  },

  async marcarMensajesVistos() {
    return;
  },

  async getNotifications(): Promise<NotificationsState> {
    return emptyNotifications;
  },
};
