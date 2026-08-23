export interface Calificacion {
  id_evaluacion: string;
  id_alumno: string;
  foto?: string | number | null;
  ciclo: string;
  nombre_nivel: string;
  nombre_grado: string;
  nombre_grupo: string;
}
