import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsistenciaCard from "@/components/asistencias/AsistenciaCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import { useAsistencias } from "@/hooks/useAsistencias";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";

export default function Attendance() {
  const { asistencias, notifications, loadAsistencias } = useAsistencias();
  const alumnoName = useSelectedAlumnoName();

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        <ScrollView className="flex-1">
          <View className="mx-5 my-2.5 rounded-md bg-white p-3">
            <Text className="text-center text-lg font-bold text-[#212529]">
              Asistencias
            </Text>
          </View>

          {asistencias.map((asistencia) => (
            <AsistenciaCard
              key={asistencia.id_asistencia}
              asistencia={asistencia}
            />
          ))}
        </ScrollView>

        <AppMenu
          currentScreen="Asistencias"
          notifications={notifications}
          onReload={loadAsistencias}
        />
      </View>
    </SafeAreaView>
  );
}
