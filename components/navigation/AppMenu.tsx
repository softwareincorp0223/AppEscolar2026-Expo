import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MenuScreen, NotificationsState } from "@/types/mensaje";

interface MenuItem {
  screen: MenuScreen;
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
}

interface AppMenuProps {
  currentScreen: MenuScreen;
  notifications: NotificationsState;
  onReload?: () => void;
}

const menuItems: MenuItem[] = [
  { screen: "Mensajes", icon: "comments", label: "Mensajes" },
  { screen: "Tareas", icon: "list", label: "Tareas" },
  { screen: "Seguimientos", icon: "smile-o", label: "Seguimientos" },
  { screen: "Calificaciones", icon: "star", label: "Calificaciones" },
  { screen: "Calendario", icon: "calendar", label: "Calendario" },
  { screen: "Asistencias", icon: "address-book", label: "Asistencias" },
  { screen: "Configuracion", icon: "cog", label: "Configuracion" },
];

export default function AppMenu({
  currentScreen,
  notifications,
  onReload,
}: AppMenuProps) {
  const handlePress = (screen: MenuScreen) => {
    if (screen === "Mensajes") {
      router.push("/pages/messages" as never);
    }

    if (screen === "Tareas") {
      router.push("/pages/tasks" as never);
    }

    if (screen === "Seguimientos") {
      router.push("/pages/follow-ups" as never);
    }

    if (screen === "Calificaciones") {
      router.push("/pages/grades" as never);
    }

    if (screen === "Calendario") {
      router.push("/pages/calendar" as never);
    }

    if (screen === "Asistencias") {
      router.push("/pages/attendance" as never);
    }

    if (screen === "Configuracion") {
      router.push("/pages/profile" as never);
    }

    onReload?.();
  };

  return (
    <SafeAreaView edges={[]} className="bg-[#0D6EFD]">
      <View className="flex-row items-end justify-around border-t border-white/40 bg-[#0D6EFD] py-2">
        {menuItems.map(({ screen, icon, label }) => (
          <TouchableOpacity
            key={screen}
            activeOpacity={0.7}
            className="items-center justify-center p-1"
            onPress={() => handlePress(screen)}
          >
            <View className="relative">
              <FontAwesome name={icon} size={18} color="#fff" />
              {notifications[screen] && (
                <View className="absolute -right-2 -top-1 h-2.5 w-2.5 rounded-full border border-white bg-red-600" />
              )}
            </View>

            {currentScreen === screen && (
              <Text className="mt-1 text-center text-[11px] text-white">
                {label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
