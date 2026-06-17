import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CalificacionCard from "@/components/calificaciones/CalificacionCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import { useCalificaciones } from "@/hooks/useCalificaciones";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";

export default function Grades() {
  const {
    calificaciones,
    notifications,
    loadCalificaciones,
    getReporteBoletaUrl,
  } = useCalificaciones();
  const alumnoName = useSelectedAlumnoName();

  const handleDownloadReport = async (idEvaluacion: string) => {
    try {
      const url = await getReporteBoletaUrl(idEvaluacion);
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "No se pudo abrir el reporte PDF.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        <ScrollView className="flex-1">
          <View className="mx-5 my-2.5 rounded-md bg-white p-3">
            <Text className="text-center text-lg font-bold text-[#212529]">
              Calificaciones
            </Text>
          </View>

          {calificaciones.map((calificacion) => (
            <CalificacionCard
              key={calificacion.id_evaluacion}
              calificacion={calificacion}
              onDownloadReport={handleDownloadReport}
            />
          ))}
        </ScrollView>

        <AppMenu
          currentScreen="Calificaciones"
          notifications={notifications}
          onReload={loadCalificaciones}
        />
      </View>
    </SafeAreaView>
  );
}
