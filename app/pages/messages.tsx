import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MensajeDetailCard from "@/components/mensajes/MensajeDetailCard";
import MensajeListItem from "@/components/mensajes/MensajeListItem";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { useMensajes } from "@/hooks/useMensajes";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { useSelectedAlumnoName } from "@/hooks/useSelectedAlumnoName";
import { Mensaje } from "@/types/mensaje";

export default function Messages() {
  const [selectedMensaje, setSelectedMensaje] = useState<Mensaje | null>(null);
  const {
    mensajes,
    archivosAdjuntos,
    links,
    notifications,
    loadMensajes,
    loadMoreMensajes,
    loading,
    loadingMore,
    responderMensaje,
  } = useMensajes();
  const alumnoName = useSelectedAlumnoName();
  const { refreshing, onRefresh } = usePullToRefresh(loadMensajes);
  const showSkeleton = loading && !refreshing && mensajes.length === 0;

  const handleRespond = async (idMensaje: string, respuesta: "si" | "no") => {
    try {
      const response = await responderMensaje(idMensaje, respuesta);

      setSelectedMensaje((current) =>
        current?.id_mensaje === idMensaje
          ? { ...current, respuesta_rapida: response.respuesta }
          : current,
      );

      Alert.alert(
        "Mensaje enviado",
        "Tu respuesta ha sido enviada correctamente.",
      );
    } catch {
      Alert.alert("Error", "No se pudo enviar la respuesta.");
    }
  };

  const renderListHeader = () => (
    <View className="mx-5 mb-2.5 rounded-md bg-white p-3">
      <Text className="text-center text-lg font-bold text-[#212529]">
        Mensajes
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <AppHeader alumno={alumnoName} />

      <View className="flex-[7] bg-[#F7F3F9]">
        {showSkeleton ? (
          <ListSkeleton count={6} avatar />
        ) : selectedMensaje ? (
          <ScrollView
            className="flex-1 pt-2.5"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#0D6EFD"
                colors={["#0D6EFD"]}
              />
            }
          >
            <MensajeDetailCard
              mensaje={selectedMensaje}
              archivosAdjuntos={archivosAdjuntos}
              links={links}
              onBack={() => setSelectedMensaje(null)}
              onRespond={handleRespond}
            />
          </ScrollView>
        ) : (
          <FlatList
            data={mensajes}
            keyExtractor={(mensaje) => mensaje.id_mensaje}
            ListHeaderComponent={renderListHeader}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator className="py-4" color="#0D6EFD" />
              ) : null
            }
            ListEmptyComponent={
              <EmptyState message="No se encontraron mensajes." />
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#0D6EFD"
                colors={["#0D6EFD"]}
              />
            }
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 12 }}
            initialNumToRender={12}
            maxToRenderPerBatch={10}
            windowSize={7}
            onEndReached={loadMoreMensajes}
            onEndReachedThreshold={0.4}
            renderItem={({ item }) => (
              <MensajeListItem mensaje={item} onPress={setSelectedMensaje} />
            )}
          />
        )}

        <AppMenu
          currentScreen="Mensajes"
          notifications={notifications}
          onReload={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}
