import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CalendarSelect from "@/components/calendario/CalendarSelect";
import EventoCard from "@/components/calendario/EventoCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import { useCalendario } from "@/hooks/useCalendario";
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
    updateFilter,
    clearFilter,
  } = useCalendario();
  const alumnoName = useSelectedAlumnoName();

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
        <ScrollView className="flex-1">
          <View className="mx-5 my-2.5 rounded-md bg-white p-3">
            <Text className="text-center text-lg font-bold text-[#212529]">
              Calendario
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

          {eventos.map((evento) => (
            <EventoCard key={evento.id_evento} evento={evento} />
          ))}

          {eventos.length === 0 && (
            <View className="mx-5 rounded-md bg-white p-4">
              <Text className="text-center text-[#6C757D]">
                No hay eventos para el filtro seleccionado.
              </Text>
            </View>
          )}
        </ScrollView>

        <AppMenu
          currentScreen="Calendario"
          notifications={notifications}
          onReload={loadEventos}
        />
      </View>
    </SafeAreaView>
  );
}
