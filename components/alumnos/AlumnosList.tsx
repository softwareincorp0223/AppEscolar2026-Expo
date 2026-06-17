import React, { memo, useCallback } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Alumno } from "@/types/alumno";

const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg";
const FILES_BASE_URL = "https://aplicacionescolar.com/sistema/archivos";

interface AlumnosListProps {
  data: Alumno[];
  onSelectAlumno: (alumno: Alumno) => void;
}

function getAlumnoImageUri(foto: Alumno["foto"]) {
  if (!foto || foto === 0 || foto === "El archivo no se pudo subir") {
    return DEFAULT_AVATAR;
  }

  return `${FILES_BASE_URL}/${foto}`;
}

function hasNotifications(alumno: Alumno) {
  return Boolean(
    alumno.mensajes_no_leidos ||
      alumno.seguimiento_no_leidos ||
      alumno.tareas_no_leidas ||
      alumno.evaluacion_no_leidos ||
      alumno.asistencia_no_leidas
  );
}

function AlumnosList({ data, onSelectAlumno }: AlumnosListProps) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.8, 420);

  const renderItem: ListRenderItem<Alumno> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onSelectAlumno(item)}
        className="my-2.5 rounded-[10px] bg-white p-2.5 shadow"
        style={{ width: cardWidth, elevation: 5 }}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: getAlumnoImageUri(item.foto) }}
            className="h-[50px] w-[50px] rounded-full"
          />
          <View className="ml-2.5 flex-1">
            <Text className="text-base font-bold text-black" numberOfLines={1}>
              {item.nombre} {item.apellido}
            </Text>
            <Text className="text-xs text-black" numberOfLines={1}>
              {item.matricula}
            </Text>
          </View>
        </View>

        {hasNotifications(item) && (
          <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-600" />
        )}
      </TouchableOpacity>
    ),
    [cardWidth, onSelectAlumno]
  );

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_alumno}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow items-center justify-center py-5"
      />
    </View>
  );
}

export default memo(AlumnosList);
