import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Calificacion } from "@/types/calificacion";

const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";
const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";

interface CalificacionCardProps {
  calificacion: Calificacion;
  onDownloadReport: (idAlumno: string, ciclo?: string) => void;
}

function getAlumnoImageUri(foto: Calificacion["foto"]) {
  if (!foto || foto === 0 || foto === "El archivo no se pudo subir") {
    return DEFAULT_AVATAR;
  }

  return `${FILES_BASE_URL}/${foto}`;
}

export default function CalificacionCard({
  calificacion,
  onDownloadReport,
}: CalificacionCardProps) {
  return (
    <View className="mx-5 mb-5 bg-white shadow" style={{ elevation: 4 }}>
      <View className="flex-row">
        <View className="p-5">
          <Image
            source={{ uri: getAlumnoImageUri(calificacion.foto) }}
            className="h-[50px] w-[50px] rounded-full"
          />
        </View>

        <View className="flex-1 pt-5">
          <Text className="text-left text-lg text-[#212529]">
            Ciclo Escolar:
          </Text>
          <Text className="mt-1 font-bold text-[#212529]">
            {calificacion.ciclo}
          </Text>
        </View>
      </View>

      <View className="flex-row px-5 pb-8">
        <View className="flex-1">
          <Text className="text-base text-[#212529]">Nivel:</Text>
          <Text className="text-[#212529]">{calificacion.nombre_nivel}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-base text-[#212529]">Grado:</Text>
          <Text className="text-[#212529]">{calificacion.nombre_grado}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-base text-[#212529]">Grupo:</Text>
          <Text className="text-[#212529]">{calificacion.nombre_grupo}</Text>
        </View>
      </View>

      <View className="-mt-5 mb-4 flex-row justify-center">
        <TouchableOpacity
          activeOpacity={0.75}
          className="w-[250px] flex-row items-center justify-center rounded-md border border-[#11452D] px-5 py-1.5"
          onPress={() =>
            onDownloadReport(calificacion.id_alumno, calificacion.ciclo)
          }
        >
          <FontAwesome name="file-pdf-o" size={15} color="#11452D" />
          <Text className="ml-2 text-center text-[15px] text-[#11452D]">
            REPORTE PDF
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
