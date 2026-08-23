import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppMenu from "@/components/navigation/AppMenu";
import PerfilSummary from "@/components/perfil/PerfilSummary";
import SchoolInfoCard from "@/components/perfil/SchoolInfoCard";
import EmptyState from "@/components/ui/EmptyState";
import ListSkeleton from "@/components/ui/ListSkeleton";
import { usePerfil } from "@/hooks/usePerfil";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { navigateToParentLogin } from "@/utils/navigation";

const HEADER_BACKGROUND =
  "https://ik.imagekit.io/2fqivufug/tipo_mensaje/fondo-config.png";

export default function Profile() {
  const { perfil, notifications, loading, loadPerfil, logout } = usePerfil();
  const { refreshing, onRefresh } = usePullToRefresh(loadPerfil);
  const showSkeleton = loading && !refreshing && !perfil;

  const handleLogout = async () => {
    await logout();
    Alert.alert("Sesion cerrada", "Sesion cerrada correctamente.");
    navigateToParentLogin();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D6EFD]">
      <View className="flex-[7] bg-[#F7F3F9]">
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0D6EFD"
              colors={["#0D6EFD"]}
            />
          }
        >
          <ImageBackground
            source={{ uri: HEADER_BACKGROUND }}
            resizeMode="cover"
            className="h-44 justify-center"
          >
            <TouchableOpacity
              activeOpacity={0.75}
              className="absolute left-4 top-7 h-10 w-10 items-center justify-center rounded-full bg-black/20"
              onPress={() => router.back()}
            >
              <FontAwesome name="arrow-left" size={20} color="white" />
            </TouchableOpacity>

            <Text className="text-center text-2xl font-bold text-white">
              Perfil
            </Text>
          </ImageBackground>

          {showSkeleton ? (
            <ListSkeleton count={3} avatar fill={false} />
          ) : perfil ? (
            <>
              <PerfilSummary perfil={perfil} />
              <SchoolInfoCard instituto={perfil.instituto} />

              <TouchableOpacity
                activeOpacity={0.75}
                className="mx-5 mt-5 rounded-xl bg-white p-5 shadow"
                style={{ elevation: 3 }}
                onPress={handleLogout}
              >
                <Text className="text-center text-lg font-bold text-red-600">
                  Cerrar Sesion
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <EmptyState message="No se encontro informacion del perfil." />
          )}
        </ScrollView>

        <AppMenu
          currentScreen="Perfil"
          notifications={notifications}
          onReload={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}
