import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

import { PerfilInstituto } from "@/types/perfil";

export default function SchoolInfoCard({
  instituto,
}: {
  instituto: PerfilInstituto;
}) {
  return (
    <View className="mx-5 mt-5 rounded-xl bg-white p-5 shadow" style={{ elevation: 3 }}>
      <Text className="mb-4 text-lg font-bold text-[#212529]">
        Informacion de la escuela
      </Text>

      <InfoRow icon="building-o" label="Nombre" value={instituto.nombre} />
      <InfoRow icon="envelope-o" label="Correo" value={instituto.correo} />
      <InfoRow
        icon="info-circle"
        label="Descripcion"
        value={instituto.descripcion}
      />
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View className="mb-3 flex-row items-start">
      <View className="mt-0.5 w-6 items-center">
        <FontAwesome name={icon} size={16} color="#0D6EFD" />
      </View>
      <View className="ml-2 flex-1">
        <Text className="font-bold text-[#6C757D]">{label}</Text>
        <Text className="mt-0.5 text-[#212529]">{value}</Text>
      </View>
    </View>
  );
}
