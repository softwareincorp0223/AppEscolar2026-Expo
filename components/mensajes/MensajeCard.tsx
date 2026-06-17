import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

import { ArchivoAdjunto, LinkItem, Mensaje } from "@/types/mensaje";

const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";
const MESSAGE_ICON_BASE_URL =
  "https://aplicacionescolar.com/sistema/assets/img/Tipo mensaje";

interface MensajeCardProps {
  mensaje: Mensaje;
  archivosAdjuntos: ArchivoAdjunto[];
  links: LinkItem[];
  onRespond: (idMensaje: string, respuesta: "si" | "no") => void;
}

export default function MensajeCard({
  mensaje,
  archivosAdjuntos,
  links,
  onRespond,
}: MensajeCardProps) {
  const archivos = archivosAdjuntos.filter(
    (archivo) => archivo.sid_mensaje === mensaje.id_mensaje && archivo.url
  );
  const mensajeLinks = links.filter(
    (link) => link.sid_mensaje === mensaje.id_mensaje && link.url
  );

  return (
    <View className="mx-5 mb-2.5 overflow-hidden rounded-lg bg-white">
      <View className="m-3 mb-2 flex-row items-center rounded-lg bg-[#4885DF] p-2">
        {mensaje.icono ? (
          <Image
            source={{ uri: `${MESSAGE_ICON_BASE_URL}/${mensaje.icono}` }}
            className="h-[30px] w-[30px] rounded-full bg-white"
          />
        ) : (
          <View className="h-[30px] w-[30px] items-center justify-center rounded-full bg-white">
            <FontAwesome name="envelope" size={16} color="#4885DF" />
          </View>
        )}

        <View className="ml-3 flex-1">
          <Text className="font-bold text-white" numberOfLines={1}>
            {mensaje.tipo_mensaje}
          </Text>
          <Text className="text-xs text-white" numberOfLines={1}>
            {mensaje.fecha_envio} {mensaje.hora_envio}
          </Text>
        </View>
      </View>

      <View className="px-4 pb-4">
        <Text className="p-1 text-[15px] font-bold text-[#212529]">
          Asunto:
          <Text className="font-normal leading-6"> {mensaje.asunto}</Text>
        </Text>

        <Text className="p-1 text-[15px] font-bold text-[#212529]">
          Mensaje:
        </Text>
        <Text className="p-1 text-[15px] leading-6 text-[#212529]">
          {mensaje.mensaje}
        </Text>

        {archivos.length > 0 && (
          <>
            <Text className="p-1 text-[15px] font-bold text-[#212529]">
              Archivos Adjuntos:
            </Text>
            {archivos.map((archivo) => (
              <TouchableOpacity
                key={archivo.id_archivo_mensaje ?? `${mensaje.id_mensaje}-${archivo.url}`}
                onPress={() => Linking.openURL(`${FILES_BASE_URL}/${archivo.url}`)}
              >
                <Text className="p-1 text-[#6C757D] underline">
                  {archivo.url}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {mensajeLinks.length > 0 && (
          <>
            <Text className="p-1 text-[15px] font-bold text-[#212529]">
              Links:
            </Text>
            {mensajeLinks.map((link) => (
              <TouchableOpacity
                key={link.id_url ?? `${mensaje.id_mensaje}-${link.url}`}
                onPress={() => Linking.openURL(link.url)}
              >
                <Text className="p-1 text-[#6C757D] underline">{link.url}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {mensaje.respuesta_rapida && (
          <View className="mt-2 flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.75}
              className="flex-row items-center rounded-md border border-[#11452D] px-5 py-1.5"
              onPress={() => onRespond(mensaje.id_mensaje, "si")}
            >
              <FontAwesome name="check" size={15} color="#11452D" />
              <Text className="ml-2 text-[15px] text-[#11452D]">Si</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              className="flex-row items-center rounded-md border border-[#DC3545] px-5 py-1.5"
              onPress={() => onRespond(mensaje.id_mensaje, "no")}
            >
              <FontAwesome name="times" size={15} color="#DC3545" />
              <Text className="ml-2 text-[15px] text-[#DC3545]">No</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
