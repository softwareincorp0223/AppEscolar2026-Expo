export type AsistenciaTipo = "entrada" | "salida";

export interface Asistencia {
  id_asistencia: string;
  foto?: string | number | null;
  nombre: string;
  apellido: string;
  matricula: string;
  fecha_ingreso: string;
  hora: string;
  tipo: AsistenciaTipo;
}
