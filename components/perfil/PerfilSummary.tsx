import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

import { Perfil } from "@/types/perfil";

const DEFAULT_BACKGROUND =
  "https://aplicacionescolar.com/webview/public/assets/img/fondo-config.png";
const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";

function getLogoUri(logo: string) {
  if (!logo) return DEFAULT_BACKGROUND;
  return `${FILES_BASE_URL}/${logo}`;
}

export default function PerfilSummary({ perfil }: { perfil: Perfil }) {
  return (
    <View className="-mt-12 mx-5 items-center rounded-xl bg-white p-5 shadow" style={{ elevation: 4 }}>
      <Image
        source={{ uri: getLogoUri(perfil.instituto.logo) }}
        className="h-24 w-24 rounded-full bg-[#E8F1FF]"
        resizeMode="contain"
      />

      <View className="mt-4 items-center">
        <Text className="text-xl font-bold text-[#212529]">
          {perfil.padre.nombre} {perfil.padre.apellido}
        </Text>
        <View className="mt-1 flex-row items-center">
          <FontAwesome name="envelope-o" size={14} color="#6C757D" />
          <Text className="ml-2 text-[#6C757D]">{perfil.padre.correo}</Text>
        </View>
      </View>
    </View>
  );
}
