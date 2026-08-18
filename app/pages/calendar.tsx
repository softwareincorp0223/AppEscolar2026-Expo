import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CalendarSelect from "@/components/calendario/CalendarSelect";
import EventoCard from "@/components/calendario/EventoCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { useCalendario } from "@/hooks/useCalendario";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
].map((label, index) => ({ label, value: index + 1 }));

const currentYear = new Date().getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1].map((year) => ({
  label: String(year),
  value: year,
}));

export default function Calendar() {
  const {
    eventos,
    filter,
    notifications,
    hasActiveFilter,
    loadEventos,
    loadMoreEventos,
    loading,
    loadingMore,
    updateFilter,
    clearFilter,
  } = useCalendario();
  const alumnoName = useSelectedAlumnoName();
  const { refreshing, onRefresh } = usePullToRefresh(loadEventos);
  const showSkeleton = loading && !refreshing && eventos.length === 0;

  const handleMonthChange = (month: number) => {
    updateFilter({ ...filter, month });
  };

  const handleYearChange = (year: number) => {
    updateFilter({ ...filter, year });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        {showSkeleton ? (
          <ListSkeleton count={5} />
        ) : (
          <FlatList
            data={eventos}
            keyExtractor={(evento) => evento.id_evento}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 12 }}
            onEndReached={loadMoreEventos}
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
              <View className="mx-5 my-2.5 rounded-md bg-white px-4 py-3">
                <Text className="text-center text-lg font-bold text-[#212529]">
                  Calendario
                </Text>
                <Text className="mt-1 text-center text-sm text-[#6C757D]">
                  Eventos proximos y actividades escolares
                </Text>

                <View className="mt-3 flex-row gap-2">
                  <CalendarSelect
                    label="Mes"
                    placeholder="Seleccionar mes"
                    value={filter.month}
                    options={months}
                    onChange={handleMonthChange}
                  />
                  <CalendarSelect
                    label="Ano"
                    placeholder="Seleccionar ano"
                    value={filter.year}
                    options={years}
                    onChange={handleYearChange}
                  />
                </View>

                {hasActiveFilter && (
                  <TouchableOpacity
                    activeOpacity={0.75}
                    className="mt-3 self-center rounded-md border border-[#0D6EFD] px-4 py-2"
                    onPress={clearFilter}
                  >
                    <Text className="text-sm font-bold text-[#0D6EFD]">
                      Ver todos
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            }
            ListEmptyComponent={
              <EmptyState message="No se encontraron eventos." />
            }
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator className="py-4" color="#0D6EFD" />
              ) : null
            }
            renderItem={({ item }) => <EventoCard evento={item} />}
          />
        )}

        <AppMenu
          currentScreen="Calendario"
          notifications={notifications}
          onReload={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}
