import api from "@/api/axiosConfig";
import { Alumno, SeleccionarAlumnoResponse } from "@/types/alumno";

const alumnosDemo: Alumno[] = [
  {
    id_alumno: "1",
    sid_instituto: "instituto-demo",
    nombre: "Sofia",
    apellido: "Martinez",
    matricula: "A-2026-001",
    foto: null,
    mensajes_no_leidos: 1,
  },
  {
    id_alumno: "2",
    sid_instituto: "instituto-demo",
    nombre: "Mateo",
    apellido: "Martinez",
    matricula: "A-2026-002",
    foto: null,
    tareas_no_leidas: 0,
  },
];

export const AlumnoService = {
  async getAlumnosByPadre(idPadre: string): Promise<Alumno[]> {
    try {
      const response = (await api.post<Alumno[]>("/padre.php", {
        accion: "obtener_alumnos",
        id_padre: idPadre,
      })) as unknown as Alumno[];

      return Array.isArray(response) ? response : alumnosDemo;
    } catch (error) {
      return alumnosDemo;
    }
  },

  async seleccionarAlumno(
    sidAlumno: string
  ): Promise<SeleccionarAlumnoResponse> {
    try {
      const response = (await api.post<SeleccionarAlumnoResponse>("/padre.php", {
        accion: "seleccionar_alumno",
        sid_alumno: sidAlumno,
      })) as unknown as SeleccionarAlumnoResponse;

      return response ?? { status: "success" };
    } catch (error) {
      return {
        status: "success",
        sid_grupo: "grupo-demo",
        id_padre: "padre-demo",
      };
    }
  },
};
