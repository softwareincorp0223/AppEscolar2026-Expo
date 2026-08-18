import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

import { Perfil } from "@/types/perfil";

const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";

function hasLogo(logo?: string | null) {
  return Boolean(logo && logo !== "El archivo no se pudo subir");
}

function getLogoUri(logo: string) {
  return `${FILES_BASE_URL}/${logo}`;
}

export default function PerfilSummary({ perfil }: { perfil: Perfil }) {
  const logo = perfil.instituto.logo;

  return (
    <View className="-mt-12 mx-5 items-center rounded-xl bg-white p-5 shadow" style={{ elevation: 4 }}>
      {hasLogo(logo) ? (
        <Image
          source={{ uri: getLogoUri(logo) }}
          className="h-24 w-24 rounded-full bg-[#E8F1FF]"
          resizeMode="contain"
        />
      ) : (
        <View className="h-24 w-24 items-center justify-center rounded-full bg-[#E8F1FF]">
          <FontAwesome name="institution" size={42} color="#0D6EFD" />
        </View>
      )}

      <View className="mt-4 items-center">
        <Text className="text-xl font-bold text-[#212529]">
          {perfil.instituto.nombre}
        </Text>
        <View className="mt-1 flex-row items-center">
          <FontAwesome name="envelope-o" size={14} color="#6C757D" />
          <Text className="ml-2 text-[#6C757D]">{perfil.instituto.correo}</Text>
        </View>
      </View>
    </View>
  );
}
