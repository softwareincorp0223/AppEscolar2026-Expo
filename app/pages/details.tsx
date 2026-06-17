import { router } from "expo-router";
import { View } from "react-native";

import AlumnosList from "@/components/alumnos/AlumnosList";
import { useAlumnos } from "@/hooks/useAlumnos";
import { Alumno } from "@/types/alumno";

export default function Details() {
  const { alumnos, selectAlumno } = useAlumnos();

  const handleAlumnoPress = async (alumno: Alumno) => {
    await selectAlumno(alumno);
    router.replace("/pages/messages" as never);
  };

  return (
    <View className="flex-1 bg-[#0D6EFD] p-5">
      <AlumnosList data={alumnos} onSelectAlumno={handleAlumnoPress} />
    </View>
  );
}
