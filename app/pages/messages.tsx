import { useState } from "react";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MensajeDetailCard from "@/components/mensajes/MensajeDetailCard";
import MensajeListItem from "@/components/mensajes/MensajeListItem";
import AppHeader from "@/components/navigation/AppHeader";
import AppMenu from "@/components/navigation/AppMenu";
import { useMensajes } from "@/hooks/useMensajes";
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
    responderMensaje,
  } = useMensajes();
  const alumnoName = useSelectedAlumnoName();

  const handleRespond = async (idMensaje: string, respuesta: "si" | "no") => {
    try {
      await responderMensaje(idMensaje, respuesta);
      Alert.alert("Mensaje enviado", "Tu respuesta ha sido enviada correctamente.");
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
        {selectedMensaje ? (
          <ScrollView className="flex-1 pt-2.5">
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
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 12 }}
            initialNumToRender={12}
            maxToRenderPerBatch={10}
            windowSize={7}
            renderItem={({ item }) => (
              <MensajeListItem mensaje={item} onPress={setSelectedMensaje} />
            )}
          />
        )}

        <AppMenu
          currentScreen="Mensajes"
          notifications={notifications}
          onReload={loadMensajes}
        />
      </View>
    </SafeAreaView>
  );
}
