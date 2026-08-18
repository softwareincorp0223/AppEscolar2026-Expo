export interface Mensaje {
  id_mensaje: string;
  receptor?: string;
  sid_usuario_emisor?: string;
  tipo_mensaje: string;
  asunto: string;
  mensaje: string;
  fecha_envio: string;
  fecha_fin?: string;
  hora_envio: string;
  icono?: string;
  destinatarios?: string;
  eliminado?: string;
  leido?: string;
  mensaje_programado?: string;
  nombre_grupo?: string | null;
  periodo?: string;
  repetir?: string;
  respuesta_rapida?: string;
  permite_respuesta_rapida?: string;
  sid_alumno?: string;
  sid_alumno_mensaje?: string | null;
  sid_extracurricular?: string;
  sid_extracurricular_mensaje?: string | null;
  sid_grado?: string;
  sid_grado_mensaje?: string | null;
  sid_grupo?: string;
  sid_grupo_mensaje?: string | null;
  sid_instituto?: string;
  sid_nivel?: string;
  sid_nivel_mensaje?: string | null;
  sid_tipo?: string;
}

export interface ArchivoAdjunto {
  id_archivo_mensaje?: string;
  sid_mensaje: string;
  url: string;
}

export interface LinkItem {
  id_url?: string;
  sid_mensaje: string;
  url: string;
}

export type MenuScreen =
  | "Mensajes"
  | "Tareas"
  | "Seguimientos"
  | "Calificaciones"
  | "Calendario"
  | "Asistencias"
  | "Perfil";

export type NotificationsState = Record<MenuScreen, boolean> & {
  Configuracion?: boolean;
};
