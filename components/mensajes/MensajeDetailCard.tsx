import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

import { ArchivoAdjunto, LinkItem, Mensaje } from "@/types/mensaje";
import { formatDate, formatTime } from "@/utils/date";
import HtmlMessageView from "./HtmlMessageView";

const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";
const MESSAGE_ICON_BASE_URL =
  "https://aplicacionescolar.com/sistema/assets/img/Tipo mensaje";

const isYes = (value?: string | null) =>
  ["si", "sí", "1", "true"].includes(String(value || "").trim().toLowerCase());

const isNo = (value?: string | null) =>
  ["no", "0", "false"].includes(String(value || "").trim().toLowerCase());

const formatRespuesta = (value?: string | null) => {
  if (isYes(value)) return "Si";
  if (isNo(value)) return "No";
  return value || "";
};

interface MensajeDetailCardProps {
  mensaje: Mensaje;
  archivosAdjuntos: ArchivoAdjunto[];
  links: LinkItem[];
  onBack: () => void;
  onRespond: (idMensaje: string, respuesta: "si" | "no") => void;
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <View className="mb-2">
      <Text className="text-[13px] font-bold text-[#495057]">{label}</Text>
      <Text className="mt-0.5 text-[15px] leading-6 text-[#212529]">{value}</Text>
    </View>
  );
}

export default function MensajeDetailCard({
  mensaje,
  archivosAdjuntos,
  links,
  onBack,
  onRespond,
}: MensajeDetailCardProps) {
  const archivos = archivosAdjuntos.filter(
    (archivo) => archivo.sid_mensaje === mensaje.id_mensaje && archivo.url
  );
  const mensajeLinks = links.filter(
    (link) => link.sid_mensaje === mensaje.id_mensaje && link.url
  );
  const permiteRespuestaRapida = isYes(mensaje.permite_respuesta_rapida);
  const tieneRespuesta = isYes(mensaje.respuesta_rapida) || isNo(mensaje.respuesta_rapida);

  return (
    <View className="mx-5 mb-4 overflow-hidden rounded-md bg-white">
      <View className="flex-row items-center bg-[#0D6EFD] px-3 py-2.5">
        <TouchableOpacity
          activeOpacity={0.75}
          className="mr-2 h-8 w-8 items-center justify-center rounded-md"
          onPress={onBack}
        >
          <FontAwesome name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>

        {mensaje.icono ? (
          <Image
            source={{ uri: `${MESSAGE_ICON_BASE_URL}/${mensaje.icono}` }}
            className="h-7 w-7 rounded-full bg-white"
            resizeMode="contain"
          />
        ) : (
          <View className="h-7 w-7 items-center justify-center rounded-full bg-white">
            <FontAwesome name="envelope" size={14} color="#0D6EFD" />
          </View>
        )}

        <Text className="ml-2 flex-1 text-[15px] font-bold text-white" numberOfLines={1}>
          {mensaje.tipo_mensaje || "Mensaje"}
        </Text>
        <Text className="text-xs text-white" numberOfLines={1}>
          {formatDate(mensaje.fecha_envio)} {formatTime(mensaje.hora_envio)}
        </Text>
      </View>

      <View className="px-4 py-4">
        <DetailRow label="Asunto" value={mensaje.asunto || "Sin asunto"} />

        <View className="mb-2">
          <Text className="text-[13px] font-bold text-[#495057]">Mensaje</Text>
          <HtmlMessageView html={mensaje.mensaje} />
        </View>

        <View className="my-2 h-px bg-[#E9ECEF]" />

        <DetailRow label="Grupo" value={mensaje.nombre_grupo} />
        <DetailRow label="Periodo" value={mensaje.periodo} />

        <View className="mt-4">
          <Text className="text-[13px] font-bold text-[#495057]">
            Archivos adjuntos
          </Text>
          {archivos.length > 0 ? (
            archivos.map((archivo) => (
              <TouchableOpacity
                key={archivo.id_archivo_mensaje ?? `${mensaje.id_mensaje}-${archivo.url}`}
                className="mt-2 flex-row items-center"
                onPress={() => Linking.openURL(`${FILES_BASE_URL}/${archivo.url}`)}
              >
                <FontAwesome name="paperclip" size={14} color="#0D6EFD" />
                <Text className="ml-2 flex-1 text-[15px] text-[#0D6EFD] underline">
                  {archivo.url}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="mt-2 text-[15px] text-[#212529]">Sin archivos adjuntos</Text>
          )}
        </View>

        <View className="mt-4">
          <Text className="text-[13px] font-bold text-[#495057]">Links</Text>
          {mensajeLinks.length > 0 ? (
            mensajeLinks.map((link) => (
              <TouchableOpacity
                key={link.id_url ?? `${mensaje.id_mensaje}-${link.url}`}
                className="mt-2 flex-row items-center"
                onPress={() => Linking.openURL(link.url)}
              >
                <FontAwesome name="link" size={14} color="#0D6EFD" />
                <Text className="ml-2 flex-1 text-[15px] text-[#0D6EFD] underline">
                  {link.url}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="mt-2 text-[15px] text-[#212529]">Sin links</Text>
          )}
        </View>

        <View className="mt-5 rounded-md bg-[#F1F3F5] p-3">
          <Text className="text-[13px] font-bold text-[#495057]">Respuesta rapida</Text>
          {tieneRespuesta ? (
            <View className="mt-3 self-start rounded-md bg-white px-3 py-2">
              <Text className="text-[15px] font-bold text-[#0D6EFD]">
                Respondiste: {formatRespuesta(mensaje.respuesta_rapida)}
              </Text>
            </View>
          ) : permiteRespuestaRapida ? (
            <View className="mt-3 flex-row gap-3">
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
          ) : (
            <Text className="mt-3 text-[15px] text-[#212529]">No hay respuesta rapida</Text>
          )}
        </View>
      </View>
    </View>
  );
}
