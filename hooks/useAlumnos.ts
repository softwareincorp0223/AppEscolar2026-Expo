import { useCallback, useEffect, useState } from "react";

import { AlumnoService } from "@/api/services/alumnoService";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { Alumno } from "@/types/alumno";

export function useAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  const loadAlumnos = useCallback(async () => {
    try {
      const { id } = await SessionStorage.getSession();

      if (!id) return;

      const alumnosByPadre = await AlumnoService.getAlumnosByPadre(id);
      setAlumnos(alumnosByPadre);
    } catch (error) {
      console.error("Error al cargar alumnos:", error);
    }
  }, []);

  const selectAlumno = useCallback(
    async (alumno: Alumno) => {
      try {
        await SessionStorage.saveSelectedAlumno(
          alumno.id_alumno,
          alumno.sid_instituto,
          `${alumno.nombre} ${alumno.apellido}`.trim()
        );

        const apiData = await AlumnoService.seleccionarAlumno(alumno.id_alumno);

        if (apiData.status !== "success") {
          console.warn("No se pudo seleccionar al alumno:", apiData);
          return false;
        }

        await SessionStorage.updateGrupoAndPadre(
          apiData.sid_grupo,
          apiData.id_padre
        );

        return true;
      } catch (error) {
        console.error("Error al seleccionar alumno:", error);
        return false;
      }
    },
    []
  );

  useEffect(() => {
    loadAlumnos();
  }, [loadAlumnos]);

  return {
    alumnos,
    reloadAlumnos: loadAlumnos,
    selectAlumno,
  };
}
