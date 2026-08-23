import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

import {
  Seguimiento,
  SeguimientoAtributo,
} from "@/types/seguimiento";

interface SeguimientoCardProps {
  seguimiento: Seguimiento;
  atributos: SeguimientoAtributo[];
}

export default function SeguimientoCard({
  seguimiento,
  atributos,
}: SeguimientoCardProps) {
  const seguimientoAtributos = atributos.filter(
    (atributo) => atributo.sid_seguimiento === seguimiento.id_seguimiento
  );
  const date = new Date(`${seguimiento.fecha_registro}T00:00:00`);
  const day = Number.isNaN(date.getTime())
    ? seguimiento.fecha_registro
    : String(date.getDate()).padStart(2, "0");
  const month = Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("es-MX", { month: "short" })
        .format(date)
        .replace(".", "");

  return (
    <View className="mx-5 mb-4 overflow-hidden rounded-md bg-white shadow" style={{ elevation: 3 }}>
      <View className="flex-row items-center border-b border-[#E9ECEF] px-4 py-4">
        <View className="h-[28px] w-[28px] items-center justify-center rounded-md bg-[#E8F1FF]">
          <FontAwesome name="calendar-o" size={18} color="#0D6EFD" />
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-lg font-bold text-[#212529]" numberOfLines={1}>
            {day} {month}
          </Text>
          <Text className="mt-0.5 text-sm text-[#6C757D]" numberOfLines={1}>
            Seguimiento diario
          </Text>
        </View>
      </View>

      <View className="p-4">
        {seguimientoAtributos.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {seguimientoAtributos.map((atributo) => (
              <View
                key={atributo.id_atributo ?? `${seguimiento.id_seguimiento}-${atributo.nombre}`}
                className="mb-3 w-[48%] flex-row items-center rounded-md border border-[#E1E7EF] bg-white p-2.5"
              >
                <View className="h-12 w-12 items-center justify-center rounded-md bg-[#F1F6FF]">
                  {atributo.icono ? (
                    <Image
                      source={{ uri: `${atributo.icono}` }}
                      className="h-9 w-9"
                      resizeMode="contain"
                    />
                  ) : (
                    <FontAwesome name="check" size={18} color="#0D6EFD" />
                  )}
                </View>

                <View className="ml-2 flex-1">
                  <Text className="text-[14px] font-bold text-[#212529]" numberOfLines={1}>
                    {atributo.nombre}
                  </Text>
                  <View className="mt-1 self-start rounded-md bg-[#E8F1FF] px-2 py-1">
                    <Text className="text-xs font-bold text-[#0D6EFD]" numberOfLines={1}>
                      {atributo.valor_atributo}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="rounded-md bg-[#F8FAFC] px-3 py-3">
            <Text className="text-center text-sm text-[#6C757D]">
              Sin atributos asignados.
            </Text>
          </View>
        )}

        {seguimiento.observacion ? (
          <View className="mt-2 border-t border-[#E9ECEF] pt-4">
            <View className="flex-row items-start">
              <View className="h-11 w-11 items-center justify-center rounded-md bg-[#E8F1FF]">
                <FontAwesome name="commenting-o" size={20} color="#0D6EFD" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[15px] font-bold text-[#212529]">
                  Observacion
                </Text>
                <Text className="mt-1 text-[15px] leading-6 text-[#212529]">
                  {seguimiento.observacion}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="mt-2 border-t border-[#E9ECEF] pt-4">
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-md bg-[#E8F1FF]">
                <FontAwesome name="commenting-o" size={20} color="#0D6EFD" />
              </View>
              <Text className="ml-3 flex-1 text-[15px] text-[#6C757D]">
                Sin observaciones adicionales.
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
