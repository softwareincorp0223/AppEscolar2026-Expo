import {
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CalificacionCard from "@/components/calificaciones/CalificacionCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { useCalificaciones } from "@/hooks/useCalificaciones";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";

export default function Grades() {
  const {
    calificaciones,
    notifications,
    loading,
    loadCalificaciones,
    getReporteBoletaUrl,
  } = useCalificaciones();
  const alumnoName = useSelectedAlumnoName();
  const { refreshing, onRefresh } = usePullToRefresh(loadCalificaciones);
  const showSkeleton = loading && !refreshing && calificaciones.length === 0;

  const handleDownloadReport = async (idAlumno: string, ciclo?: string) => {
    try {
      const url = getReporteBoletaUrl(idAlumno, ciclo);
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "No se pudo abrir el reporte PDF.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0D6EFD"
              colors={["#0D6EFD"]}
            />
          }
        >
          <View className="mx-5 my-2.5 rounded-md bg-white p-3">
            <Text className="text-center text-lg font-bold text-[#212529]">
              Calificaciones
            </Text>
          </View>

          {showSkeleton ? (
            <ListSkeleton count={5} fill={false} />
          ) : calificaciones.length > 0 ? (
            calificaciones.map((calificacion) => (
              <CalificacionCard
                key={calificacion.id_evaluacion}
                calificacion={calificacion}
                onDownloadReport={handleDownloadReport}
              />
            ))
          ) : (
            <EmptyState message="No se encontraron calificaciones." />
          )}
        </ScrollView>

        <AppMenu
          currentScreen="Calificaciones"
          notifications={notifications}
          onReload={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}
