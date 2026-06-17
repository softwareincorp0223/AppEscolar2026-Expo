import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TareaCard from "@/components/tareas/TareaCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";
import { useTareas } from "@/hooks/useTareas";

const statusBadges = [
  { label: "Pendiente", className: "border-gray-500 text-gray-500" },
  { label: "Enviado", className: "border-green-600 text-green-600" },
  { label: "Revisado", className: "border-blue-600 text-blue-600" },
  { label: "Observacion", className: "border-red-600 text-red-600" },
];

export default function Tasks() {
  const { tareas, notifications, loadTareas, subirArchivo } = useTareas();
  const alumnoName = useSelectedAlumnoName();

  const handleUpload = async (idAsignarTarea: string) => {
    await subirArchivo(idAsignarTarea);
    Alert.alert(
      "Subir archivo",
      `Carga simulada para la tarea asignada ${idAsignarTarea}.`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        <ScrollView className="flex-1">
          <View className="mx-5 my-2.5 rounded-md bg-white p-3">
            <Text className="text-center text-lg font-bold text-[#212529]">
              Tareas
            </Text>
            <View className="mt-2.5 flex-row flex-wrap justify-center">
              {statusBadges.map((badge) => (
                <Text
                  key={badge.label}
                  className={`m-1 rounded-md border px-2 py-1 text-xs ${badge.className}`}
                >
                  {badge.label}
                </Text>
              ))}
            </View>
          </View>

          {tareas.map((tarea) => (
            <TareaCard
              key={tarea.id_tareas}
              tarea={tarea}
              onUpload={handleUpload}
            />
          ))}
        </ScrollView>

        <AppMenu
          currentScreen="Tareas"
          notifications={notifications}
          onReload={loadTareas}
        />
      </View>
    </SafeAreaView>
  );
}
