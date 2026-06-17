import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import SeguimientoCard from "@/components/seguimientos/SeguimientoCard";
import { useSeguimientos } from "@/hooks/useSeguimientos";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";

export default function FollowUps() {
  const { seguimientos, atributos, notifications, loadSeguimientos } =
    useSeguimientos();
  const alumnoName = useSelectedAlumnoName();

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        <ScrollView className="flex-1">
          <View className="mx-5 my-2.5 rounded-md bg-white p-3">
            <Text className="text-center text-lg font-bold text-[#212529]">
              Seguimientos
            </Text>
          </View>

          {seguimientos.map((seguimiento) => (
            <SeguimientoCard
              key={seguimiento.id_seguimiento}
              seguimiento={seguimiento}
              atributos={atributos}
            />
          ))}
        </ScrollView>

        <AppMenu
          currentScreen="Seguimientos"
          notifications={notifications}
          onReload={loadSeguimientos}
        />
      </View>
    </SafeAreaView>
  );
}
