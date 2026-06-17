import { useEffect, useState } from "react";

import { SessionStorage } from "@/api/storage/sessionStorage";

export function useSelectedAlumnoName() {
  const [name, setName] = useState("Alumno");

  useEffect(() => {
    let mounted = true;

    const loadName = async () => {
      const session = await SessionStorage.getSession();

      if (mounted && session.selectedAlumnoName) {
        setName(session.selectedAlumnoName);
      }
    };

    loadName();

    return () => {
      mounted = false;
    };
  }, []);

  return name;
}
