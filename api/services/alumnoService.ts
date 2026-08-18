import api from "@/api/axiosConfig";
import { Alumno, SeleccionarAlumnoResponse } from "@/types/alumno";

export const AlumnoService = {
  async getAlumnosByPadre(idPadre: string): Promise<Alumno[]> {
    const response = (await api.get<Alumno[]>("/alumnos", {
      params: { id_padre: idPadre },
    })) as unknown as Alumno[];

    return Array.isArray(response) ? response : [];
  },

  async seleccionarAlumno(
    sidAlumno: string,
    idPadre?: string
  ): Promise<SeleccionarAlumnoResponse> {
    const response = (await api.post<SeleccionarAlumnoResponse>("/alumnos/select", {
      sid_alumno: sidAlumno,
      id_padre: idPadre,
    })) as unknown as SeleccionarAlumnoResponse;

    return response ?? { status: "success" };
  },
};
