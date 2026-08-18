import { ActivityIndicator, Text, View } from "react-native";

interface ScreenLoaderProps {
  message?: string;
}

export default function ScreenLoader({
  message = "Cargando informacion...",
}: ScreenLoaderProps) {
  return (
    <View className="flex-1 items-center justify-center px-6 py-10">
      <ActivityIndicator size="large" color="#0D6EFD" />
      <Text className="mt-3 text-center text-sm font-semibold text-[#6C757D]">
        {message}
      </Text>
    </View>
  );
}
