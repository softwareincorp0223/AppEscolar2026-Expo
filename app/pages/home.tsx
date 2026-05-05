import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Home Screen</Text>

      <Button
        title="Go to Details"
        onPress={() => router.push("/pages/details")}
      />
    </View>
  );
}