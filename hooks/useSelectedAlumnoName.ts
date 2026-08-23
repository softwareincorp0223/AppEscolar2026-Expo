import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { SessionStorage } from "@/api/storage/sessionStorage";

export function useSelectedAlumnoName() {
  const [name, setName] = useState("Alumno");

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const loadName = async () => {
        const session = await SessionStorage.getSession();

        if (mounted) {
          setName(session.selectedAlumnoName || "Alumno");
        }
      };

      loadName();

      return () => {
        mounted = false;
      };
    }, [])
  );

  return name;
}
