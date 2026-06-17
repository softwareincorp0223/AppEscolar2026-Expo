import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

import { Asistencia } from "@/types/asistencia";

const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";
const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";

function getAlumnoImageUri(foto: Asistencia["foto"]) {
  if (!foto || foto === 0 || foto === "El archivo no se pudo subir") {
    return DEFAULT_AVATAR;
  }

  return `${FILES_BASE_URL}/${foto}`;
}

export default function AsistenciaCard({
  asistencia,
}: {
  asistencia: Asistencia;
}) {
  const isSalida = asistencia.tipo === "salida";
  const color = isSalida ? "#DC3545" : "green";
  const label = isSalida ? "Salida" : "Entrada";
  const borderClass = isSalida ? "border-red-600" : "border-green-600";
  const textClass = isSalida ? "text-red-600" : "text-green-600";

  return (
    <View className="mx-5 mb-5 bg-white shadow" style={{ elevation: 4 }}>
      <View className="flex-row">
        <View className="p-5">
          <Image
            source={{ uri: getAlumnoImageUri(asistencia.foto) }}
            className="h-[50px] w-[50px] rounded-full"
          />
        </View>

        <View className="flex-1 items-start p-5">
          <Text className="text-left text-lg text-[#212529]">
            {asistencia.nombre} {asistencia.apellido} - {asistencia.matricula}
          </Text>
          <Text className="mt-1 font-bold text-[#212529]">
            {asistencia.fecha_ingreso} {asistencia.hora}
          </Text>

          <View
            className={`mt-5 w-[120px] flex-row items-center justify-center rounded-[10px] border px-5 py-1.5 ${borderClass}`}
          >
            <FontAwesome name="check" size={isSalida ? 12 : 15} color={color} />
            <Text className={`ml-2 text-[15px] ${textClass}`}>{label}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
