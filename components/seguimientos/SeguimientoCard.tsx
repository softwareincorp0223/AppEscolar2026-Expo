import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";

import {
  Seguimiento,
  SeguimientoAtributo,
} from "@/types/seguimiento";

const STICKER_BASE_URL = "https://aplicacionescolar.com/sistema/assets/img/sticker";

interface SeguimientoCardProps {
  seguimiento: Seguimiento;
  atributos: SeguimientoAtributo[];
}

export default function SeguimientoCard({
  seguimiento,
  atributos,
}: SeguimientoCardProps) {
  const { width } = useWindowDimensions();
  const itemWidth = Math.max((width - 60) / 3, 88);
  const seguimientoAtributos = atributos.filter(
    (atributo) => atributo.sid_seguimiento === seguimiento.id_seguimiento
  );

  return (
    <View className="mx-5 mb-5 rounded-[10px] bg-white p-5 shadow" style={{ elevation: 4 }}>
      <Text className="text-xl text-[#0D6EFD]">
        {seguimiento.fecha_registro}
      </Text>

      <View className="mt-2.5 flex-row flex-wrap">
        {seguimientoAtributos.map((atributo) => (
          <View
            key={atributo.id_atributo ?? `${seguimiento.id_seguimiento}-${atributo.nombre}`}
            className="mb-2.5 mr-1 items-center"
            style={{ width: itemWidth }}
          >
            <Text className="text-center text-[#6C757D]" numberOfLines={1}>
              {atributo.nombre}
            </Text>

            {atributo.icono ? (
              <Image
                source={{ uri: `${STICKER_BASE_URL}/${atributo.icono}` }}
                className="my-1 h-[50px] w-[50px]"
                resizeMode="contain"
              />
            ) : (
              <View className="my-1 h-[50px] w-[50px] items-center justify-center rounded-full bg-[#E8F1FF]">
                <FontAwesome name="smile-o" size={28} color="#0D6EFD" />
              </View>
            )}

            <Text className="text-center text-[#6C757D]">
              {atributo.valor_atributo}
            </Text>
          </View>
        ))}
      </View>

      <Text className="text-[#6C757D]">{seguimiento.fecha}</Text>

      {seguimiento.observacion && (
        <View className="ml-2.5 pt-4">
          <Text className="text-[15px] font-bold text-[#6C757D]">
            Observacion:
          </Text>
          <Text className="text-[#6C757D]">{seguimiento.observacion}</Text>
        </View>
      )}
    </View>
  );
}
