import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import SeguimientoCard from "@/components/seguimientos/SeguimientoCard";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useSeguimientos } from "@/hooks/useSeguimientos";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";

export default function FollowUps() {
  const { seguimientos, atributos, notifications, loading, loadSeguimientos } =
    useSeguimientos();
  const alumnoName = useSelectedAlumnoName();
  const { refreshing, onRefresh } = usePullToRefresh(loadSeguimientos);
  const showSkeleton = loading && !refreshing && seguimientos.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        {showSkeleton ? (
          <ListSkeleton count={5} />
        ) : (
          <FlatList
            data={seguimientos}
            keyExtractor={(seguimiento) => seguimiento.id_seguimiento}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 12 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#0D6EFD"
                colors={["#0D6EFD"]}
              />
            }
            ListHeaderComponent={
              <View className="mx-5 my-2.5 rounded-md bg-white px-4 py-3">
                <Text className="text-center text-lg font-bold text-[#212529]">
                  Seguimientos
                </Text>
                <Text className="mt-1 text-center text-sm text-[#6C757D]">
                  Resumen de observaciones y puntos del dia
                </Text>
              </View>
            }
            ListEmptyComponent={
              <EmptyState message="No se encontraron seguimientos." />
            }
            renderItem={({ item }) => (
              <SeguimientoCard seguimiento={item} atributos={atributos} />
            )}
          />
        )}

        <AppMenu
          currentScreen="Seguimientos"
          notifications={notifications}
          onReload={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}
