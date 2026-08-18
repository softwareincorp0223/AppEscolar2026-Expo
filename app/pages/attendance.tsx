import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsistenciaCard from "@/components/asistencias/AsistenciaCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { useAsistencias } from "@/hooks/useAsistencias";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";

export default function Attendance() {
  const {
    asistenciasHoy,
    asistencias,
    notifications,
    loadAsistencias,
    loadMoreAsistencias,
    loading,
    loadingMore,
  } = useAsistencias();
  const alumnoName = useSelectedAlumnoName();
  const { refreshing, onRefresh } = usePullToRefresh(loadAsistencias);
  const showSkeleton =
    loading &&
    !refreshing &&
    asistencias.length === 0 &&
    asistenciasHoy.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        {showSkeleton ? (
          <ListSkeleton count={5} />
        ) : (
          <FlatList
            data={asistencias}
            keyExtractor={(asistencia) => asistencia.id_asistencia}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 12 }}
            onEndReached={loadMoreAsistencias}
            onEndReachedThreshold={0.4}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#0D6EFD"
                colors={["#0D6EFD"]}
              />
            }
            ListHeaderComponent={
              <>
                <View className="mx-5 my-2.5 rounded-md bg-white p-3">
                  <Text className="text-center text-lg font-bold text-[#212529]">
                    Asistencias
                  </Text>
                </View>

                <View className="mx-5 mb-2.5 rounded-md bg-[#E8F1FF] p-3">
                  <Text className="text-center text-base font-bold text-[#0D6EFD]">
                    Hoy
                  </Text>
                </View>

                {asistenciasHoy.length > 0 ? (
                  asistenciasHoy.map((asistencia) => (
                    <AsistenciaCard
                      key={asistencia.id_asistencia}
                      asistencia={asistencia}
                      highlighted
                    />
                  ))
                ) : (
                  <View className="mx-5 mb-5 rounded-md bg-white p-4">
                    <Text className="text-center text-[#6C757D]">
                      No hay asistencias registradas hoy.
                    </Text>
                  </View>
                )}

                <View className="mx-5 mb-2.5 rounded-md bg-white p-3">
                  <Text className="text-center text-base font-bold text-[#212529]">
                    Historial
                  </Text>
                </View>
              </>
            }
            ListEmptyComponent={
              <EmptyState message="No se encontraron asistencias." />
            }
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator className="py-4" color="#0D6EFD" />
              ) : null
            }
            renderItem={({ item }) => <AsistenciaCard asistencia={item} />}
          />
        )}

        <AppMenu
          currentScreen="Asistencias"
          notifications={notifications}
          onReload={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}
