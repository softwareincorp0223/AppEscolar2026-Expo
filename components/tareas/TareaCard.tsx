import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

import { Tarea, TareaStatus } from "@/types/tarea";
import { htmlToText } from "@/utils/html";

const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";

interface TareaCardProps {
  tarea: Tarea;
  onUpload: (idAsignarTarea: string) => void;
}

const statusConfig: Record<
  TareaStatus,
  { label: string; border: string; text: string; icon: string }
> = {
  pendiente: {
    label: "Pendiente",
    border: "border-gray-500",
    text: "text-gray-500",
    icon: "gray",
  },
  enviado: {
    label: "Enviado",
    border: "border-green-600",
    text: "text-green-600",
    icon: "green",
  },
  revisado: {
    label: "Revisado",
    border: "border-blue-600",
    text: "text-blue-600",
    icon: "blue",
  },
  observacion: {
    label: "Obs...",
    border: "border-red-600",
    text: "text-red-600",
    icon: "red",
  },
};

export default function TareaCard({ tarea, onUpload }: TareaCardProps) {
  const archivos = tarea.archivos_tarea.filter(Boolean);
  const urls = tarea.url_tarea.filter(Boolean);
  const status = statusConfig[tarea.estatus_tarea] ?? statusConfig.pendiente;

  return (
    <View
      className="mx-5 mb-5 rounded-[10px] border-l-4 border-[#0D6EFD] bg-white p-5 shadow"
      style={{ elevation: 4 }}
    >
      <View>
        <Text className="text-[23px] text-[#0D6EFD]">
          {tarea.nombre_tarea}
        </Text>
        <Text className="text-xs text-[#6C757D]">{tarea.fecha_creacion}</Text>
      </View>

      <Text className="mt-2.5 text-[15px] leading-6 text-[#212529]">
        {htmlToText(tarea.instrucciones_tarea)}
      </Text>

      {archivos.length > 0 && (
        <View className="mt-2.5">
          <Text className="text-[15px] font-bold text-[#212529]">
            Archivos Adjuntos:
          </Text>
          {archivos.map((archivo) => (
            <TouchableOpacity
              key={`${tarea.id_tareas}-${archivo}`}
              onPress={() => Linking.openURL(`${FILES_BASE_URL}/${archivo}`)}
            >
              <Text className="mt-1 text-[#6C757D] underline">{archivo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {urls.length > 0 && (
        <View className="mt-2.5">
          <Text className="text-[15px] font-bold text-[#212529]">URL:</Text>
          {urls.map((url) => (
            <TouchableOpacity
              key={`${tarea.id_tareas}-${url}`}
              onPress={() => Linking.openURL(url)}
            >
              <Text className="mt-1 text-[#6C757D] underline">{url}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View className="mx-1 mt-5 flex-row justify-between">
        <TouchableOpacity
          activeOpacity={0.75}
          className="w-[120px] flex-row items-center justify-center rounded-[10px] border border-[#11452D] px-4 py-1.5"
          onPress={() => onUpload(tarea.id_asignar_tarea)}
        >
          <FontAwesome name="upload" size={13} color="#11452D" />
          <Text className="ml-2 text-[13px] text-[#11452D]">Subir</Text>
        </TouchableOpacity>

        <View
          className={`w-[120px] flex-row items-center justify-center rounded-[10px] border px-4 py-1.5 ${status.border}`}
        >
          <FontAwesome name="check" size={12} color={status.icon} />
          <Text className={`ml-2 text-[13px] ${status.text}`}>
            {status.label}
          </Text>
        </View>
      </View>

      {tarea.estatus_tarea === "observacion" && tarea.observacion_tarea && (
        <View className="ml-2.5 pt-4">
          <Text className="text-[15px] font-bold text-[#6C757D]">
            Observacion:
          </Text>
          <Text className="text-[#6C757D]">{tarea.observacion_tarea}</Text>
        </View>
      )}
    </View>
  );
}
