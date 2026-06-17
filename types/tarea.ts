export type TareaStatus = "pendiente" | "enviado" | "revisado" | "observacion";

export interface Tarea {
  id_tareas: string;
  sid_grupo: string;
  sid_materia: string;
  sid_instituto: string;
  id_asignar_tarea: string;
  nombre_tarea: string;
  instrucciones_tarea: string;
  fecha_creacion: string;
  estatus_tarea: TareaStatus;
  observacion_tarea: string;
  archivos_tarea: string[];
  url_tarea: string[];
}
