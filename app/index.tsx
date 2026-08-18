import { SchoolSessionStorage } from "@/api/storage/schoolSessionStorage";
import { SessionStorage } from "@/api/storage/sessionStorage";
import { registerParentDeviceForPushNotifications } from "@/utils/pushNotifications";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";

export default function Index() {
  useEffect(() => {
    let active = true;

    const validateSession = async () => {
      const schoolSession = await SchoolSessionStorage.getSession();
      const session = await SessionStorage.getSession();

      if (!active) return;

      if (schoolSession.user?.id) {
        router.replace("/pages/qr-attendance" as never);
        return;
      }

      if (session.idPadre) {
        await registerParentDeviceForPushNotifications(session.idPadre);
      }

      if (!active) return;

      router.replace(
        (session.idPadre ? "/pages/details" : "/pages/login") as never
      );
    };

    validateSession();

    return () => {
      active = false;
    };
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
