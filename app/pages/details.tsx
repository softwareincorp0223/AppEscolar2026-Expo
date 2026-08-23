import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { PerfilService } from "@/api/services/perfilService";
import AlumnosList from "@/components/alumnos/AlumnosList";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { useAlumnos } from "@/hooks/useAlumnos";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { Alumno } from "@/types/alumno";
import { navigateToParentLogin } from "@/utils/navigation";

export default function Details() {
  const { alumnos, loading, reloadAlumnos, selectAlumno } = useAlumnos();
  const { refreshing, onRefresh } = usePullToRefresh(reloadAlumnos);
  const showSkeleton = loading && !refreshing && alumnos.length === 0;

  useFocusEffect(
    useCallback(() => {
      void reloadAlumnos();
    }, [reloadAlumnos])
  );

  const handleAlumnoPress = async (alumno: Alumno) => {
    const selected = await selectAlumno(alumno);

    if (selected) {
      router.replace("/pages/messages" as never);
    }
  };

  const handleLogout = async () => {
    await PerfilService.logout();
    navigateToParentLogin();
  };

  return (
    <View className="flex-1 bg-[#0D6EFD] p-5">
      {showSkeleton ? (
        <View className="flex-1 justify-center">
          <ListSkeleton count={4} avatar fill={false} />
        </View>
      ) : alumnos.length > 0 ? (
        <AlumnosList
          data={alumnos}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onSelectAlumno={handleAlumnoPress}
        />
      ) : (
        <ScrollView
          contentContainerClassName="flex-grow justify-between py-6"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0D6EFD"
              colors={["#0D6EFD"]}
            />
          }
        >
          <View className="flex-1 justify-center">
            <EmptyState message="No se encontraron alumnos vinculados." />
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            className="mx-5 rounded-xl bg-white p-4 shadow"
            style={{ elevation: 3 }}
            onPress={handleLogout}
          >
            <Text className="text-center text-lg font-bold text-red-600">
              Cerrar sesion
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
