export interface Alumno {
  id_alumno: string;
  sid_instituto: string;
  nombre: string;
  apellido: string;
  matricula: string;
  foto?: string | number | null;
  mensajes_no_leidos?: number | boolean | string | null;
  seguimiento_no_leidos?: number | boolean | string | null;
  tareas_no_leidas?: number | boolean | string | null;
  evaluacion_no_leidos?: number | boolean | string | null;
  asistencia_no_leidas?: number | boolean | string | null;
}

export interface SeleccionarAlumnoResponse {
  status: string;
  sid_grupo?: string;
  id_padre?: string;
}
