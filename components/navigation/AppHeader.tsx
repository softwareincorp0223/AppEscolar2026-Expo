import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppHeaderProps {
  alumno?: string;
  loading?: boolean;
}

export default function AppHeader({ alumno = "", loading = false }: AppHeaderProps) {
  const isNameTooLong = alumno.length > 25;

  return (
    <SafeAreaView edges={[]} className="bg-[#0D6EFD]">
      <View className="flex-row items-center bg-[#0D6EFD] px-4 py-2.5">
        <Image
          source={{
            uri: "https://aplicacionescolar.com/sistema/assets/img/logo_app_escolar.png",
          }}
          className="h-10 w-10"
          resizeMode="contain"
        />

        {loading ? (
          <ActivityIndicator color="#fff" size="small" className="flex-1" />
        ) : (
          <View className={`flex-1 items-center justify-center ${isNameTooLong ? "px-2" : ""}`}>
            <Text
              className={`font-bold text-white ${isNameTooLong ? "text-[13px]" : "text-lg"}`}
              numberOfLines={1}
            >
              {alumno}
            </Text>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.75}
          className="ml-2 rounded-md p-1.5"
          onPress={() => router.push("/pages/details" as never)}
        >
          <FontAwesome name="user" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
