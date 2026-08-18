import { router } from "expo-router";
import { RefreshControl, ScrollView, View } from "react-native";

import AlumnosList from "@/components/alumnos/AlumnosList";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { useAlumnos } from "@/hooks/useAlumnos";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { Alumno } from "@/types/alumno";

export default function Details() {
  const { alumnos, loading, reloadAlumnos, selectAlumno } = useAlumnos();
  const { refreshing, onRefresh } = usePullToRefresh(reloadAlumnos);
  const showSkeleton = loading && !refreshing && alumnos.length === 0;

  const handleAlumnoPress = async (alumno: Alumno) => {
    const selected = await selectAlumno(alumno);

    if (selected) {
      router.replace("/pages/messages" as never);
    }
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
          contentContainerClassName="flex-grow justify-center"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0D6EFD"
              colors={["#0D6EFD"]}
            />
          }
        >
          <EmptyState message="No se encontraron alumnos vinculados." />
        </ScrollView>
      )}
    </View>
  );
}
