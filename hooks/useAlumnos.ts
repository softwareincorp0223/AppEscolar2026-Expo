import { useCallback, useEffect, useState } from "react";

import { AlumnoService } from "@/api/services/alumnoService";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { Alumno } from "@/types/alumno";

export function useAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAlumnos = useCallback(async () => {
    setLoading(true);

    try {
      const { idPadre } = await SessionStorage.getSession();

      if (!idPadre) {
        setAlumnos([]);
        return;
      }

      const alumnosByPadre = await AlumnoService.getAlumnosByPadre(idPadre);
      setAlumnos(alumnosByPadre);
    } catch (error) {
      console.error("Error al cargar alumnos:", error);
      setAlumnos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectAlumno = useCallback(
    async (alumno: Alumno) => {
      try {
        const { idPadre } = await SessionStorage.getSession();

        const apiData = await AlumnoService.seleccionarAlumno(
          alumno.id_alumno,
          idPadre
        );

        if (apiData.status !== "success") {
          console.warn("No se pudo seleccionar al alumno:", apiData);
          return false;
        }

        await SessionStorage.saveSelectedAlumno(
          alumno.id_alumno,
          alumno.sid_instituto,
          `${alumno.nombre} ${alumno.apellido}`.trim()
        );

        await SessionStorage.updateGrupoAndPadre(
          apiData.sid_grupo,
          apiData.id_padre ?? idPadre
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
    loading,
    reloadAlumnos: loadAlumnos,
    selectAlumno,
  };
}
