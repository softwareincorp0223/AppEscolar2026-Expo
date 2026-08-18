import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TareaCard from "@/components/tareas/TareaCard";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";
import { useTareas } from "@/hooks/useTareas";

const statusBadges = [
  { label: "Pendiente", className: "border-gray-500 text-gray-500" },
  { label: "Enviado", className: "border-green-600 text-green-600" },
  { label: "Revisado", className: "border-blue-600 text-blue-600" },
  { label: "Observacion", className: "border-red-600 text-red-600" },
];

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

const canUploadTask = (estatus?: string | null) => {
  const normalizedStatus = String(estatus || "")
    .trim()
    .toLowerCase();
  return normalizedStatus === "pendiente" || normalizedStatus === "observacion";
};

export default function Tasks() {
  const {
    tareas,
    notifications,
    loadTareas,
    loadMoreTareas,
    loading,
    loadingMore,
    subirArchivo,
  } = useTareas();
  const alumnoName = useSelectedAlumnoName();
  const [uploadingTaskId, setUploadingTaskId] = useState<string | null>(null);
  const { refreshing, onRefresh } = usePullToRefresh(loadTareas);
  const showSkeleton = loading && !refreshing && tareas.length === 0;

  const handleUpload = async (idAsignarTarea: string) => {
    try {
      const tarea = tareas.find(
        (item) => item.id_asignar_tarea === idAsignarTarea,
      );

      if (!canUploadTask(tarea?.estatus_tarea)) {
        Alert.alert(
          "Tarea ya enviada",
          "Esta tarea ya fue enviada y no permite subir otro archivo.",
        );
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const archivo = result.assets[0];

      if (archivo.size && archivo.size > MAX_UPLOAD_SIZE) {
        Alert.alert(
          "Archivo muy grande",
          "El archivo debe pesar 5 MB o menos.",
        );
        return;
      }

      setUploadingTaskId(idAsignarTarea);

      await subirArchivo(idAsignarTarea, {
        uri: archivo.uri,
        name: archivo.name,
        mimeType: archivo.mimeType,
        size: archivo.size,
      });

      Alert.alert("Tarea enviada", "Tu archivo se subio correctamente.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo subir la tarea.";

      Alert.alert("Error", message);
    } finally {
      setUploadingTaskId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        {showSkeleton ? (
          <ListSkeleton count={5} />
        ) : (
          <FlatList
            data={tareas}
            keyExtractor={(tarea) => tarea.id_asignar_tarea || tarea.id_tareas}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 12 }}
            onEndReached={loadMoreTareas}
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
            }
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator className="py-4" color="#0D6EFD" />
              ) : null
            }
            ListEmptyComponent={
              <EmptyState message="No se encontraron tareas." />
            }
            renderItem={({ item: tarea }) => (
              <TareaCard
                tarea={tarea}
                uploading={uploadingTaskId === tarea.id_asignar_tarea}
                onUpload={handleUpload}
              />
            )}
          />
        )}

        <AppMenu
          currentScreen="Tareas"
          notifications={notifications}
          onReload={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}
