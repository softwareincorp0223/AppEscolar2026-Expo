import React from "react";
import { Text, View } from "react-native";

import { EventoCalendario } from "@/types/calendario";

const monthFormatter = new Intl.DateTimeFormat("es-MX", {
  month: "long",
  year: "numeric",
});

function formatEventDate(fechaEvento: string) {
  const date = new Date(`${fechaEvento}T00:00:00`);
  return {
    day: date.getDate(),
    monthYear: monthFormatter.format(date),
  };
}

function formatHour(hour: string) {
  const [hours = "00", minutes = "00"] = hour.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

export default function EventoCard({ evento }: { evento: EventoCalendario }) {
  const date = formatEventDate(evento.fecha_evento);

  return (
    <View className="mx-5 mb-5 bg-white shadow" style={{ elevation: 4 }}>
      <View className="flex-row">
        <View className="w-[118px] items-center justify-center bg-[#0D6EFD] p-5">
          <Text className="text-center text-[25px] text-white">{date.day}</Text>
          <Text className="text-center capitalize text-white">
            {date.monthYear}
          </Text>
          <Text className="text-center text-white">{formatHour(evento.hora)}</Text>
        </View>

        <View className="flex-1 p-5">
          <Text className="text-lg font-bold text-[#212529]">Evento:</Text>
          <Text className="mt-1 text-[#212529]">{evento.nombre_evento}</Text>
        </View>
      </View>
    </View>
  );
}
