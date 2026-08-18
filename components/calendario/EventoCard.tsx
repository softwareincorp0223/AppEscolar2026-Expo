import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

import { EventoCalendario } from "@/types/calendario";
import { formatTime } from "@/utils/date";

const monthFormatter = new Intl.DateTimeFormat("es-MX", {
  month: "short",
});

const weekdayFormatter = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
});

function formatEventDate(fechaEvento: string) {
  const date = new Date(`${fechaEvento}T00:00:00`);
  return {
    day: date.getDate(),
    month: monthFormatter.format(date).replace(".", ""),
    weekday: weekdayFormatter.format(date),
    year: date.getFullYear(),
  };
}

export default function EventoCard({ evento }: { evento: EventoCalendario }) {
  const date = formatEventDate(evento.fecha_evento);

  return (
    <View className="mx-5 mb-4 overflow-hidden rounded-md bg-white shadow" style={{ elevation: 3 }}>
      <View className="flex-row">
        <View className="w-[82px] items-center justify-center bg-[#0D6EFD] px-3 py-4">
          <Text className="text-center text-[26px] font-bold text-white">
            {date.day}
          </Text>
          <Text className="text-center text-xs font-bold uppercase text-white">
            {date.month}
          </Text>
          <Text className="mt-1 text-center text-[11px] text-white/90">
            {date.year}
          </Text>
        </View>

        <View className="flex-1 p-4">
          <View className="flex-row items-start justify-between">
            <Text className="flex-1 pr-3 text-[15px] font-bold capitalize text-[#495057]" numberOfLines={1}>
              {date.weekday}
            </Text>
            <View className="flex-row items-center rounded-md bg-[#E8F1FF] px-2 py-1">
              <FontAwesome name="clock-o" size={12} color="#0D6EFD" />
              <Text className="ml-1 text-xs font-bold text-[#0D6EFD]">
                {formatTime(evento.hora)}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-lg font-bold text-[#212529]" numberOfLines={2}>
            {evento.nombre_evento}
          </Text>

          <View className="mt-3 flex-row items-center">
            <View className="h-8 w-8 items-center justify-center rounded-md bg-[#F1F6FF]">
              <FontAwesome name="calendar-check-o" size={15} color="#0D6EFD" />
            </View>
            <Text className="ml-2 flex-1 text-sm text-[#6C757D]" numberOfLines={1}>
              Actividad programada
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
