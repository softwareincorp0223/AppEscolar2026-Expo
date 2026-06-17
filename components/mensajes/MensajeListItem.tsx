import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Mensaje } from "@/types/mensaje";

const MESSAGE_ICON_BASE_URL =
  "https://aplicacionescolar.com/sistema/assets/img/Tipo mensaje";

interface MensajeListItemProps {
  mensaje: Mensaje;
  onPress: (mensaje: Mensaje) => void;
}

export default function MensajeListItem({ mensaje, onPress }: MensajeListItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.78}
      className="mx-5 mb-2.5 flex-row items-center rounded-md bg-white px-3 py-3"
      onPress={() => onPress(mensaje)}
    >
      {mensaje.icono ? (
        <Image
          source={{ uri: `${MESSAGE_ICON_BASE_URL}/${mensaje.icono}` }}
          className="h-10 w-10 rounded-full bg-[#EFF4FF]"
          resizeMode="contain"
        />
      ) : (
        <View className="h-10 w-10 items-center justify-center rounded-full bg-[#EFF4FF]">
          <FontAwesome name="envelope" size={18} color="#0D6EFD" />
        </View>
      )}

      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-bold text-[#212529]" numberOfLines={1}>
          {mensaje.tipo_mensaje || "Mensaje"}
        </Text>
        <Text className="mt-0.5 text-[14px] text-[#495057]" numberOfLines={2}>
          {mensaje.asunto || "Sin asunto"}
        </Text>
      </View>

      <FontAwesome name="angle-right" size={22} color="#ADB5BD" />
    </TouchableOpacity>
  );
}
