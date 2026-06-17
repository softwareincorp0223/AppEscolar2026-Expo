import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/pages/login" as never);
    }, 2000); // tiempo del loader (ms)

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#0D6EFD]">
      <Image
        source={{
          uri: "https://ik.imagekit.io/softwareincorp/Asset%202-8.png?updatedAt=1757634423341", 
        }}
        style={{ width: 150, height: 150, marginBottom: 24 }}
        resizeMode="contain"
      />

      {/* LOADER */}
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
