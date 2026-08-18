import { Text, View } from "react-native";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <View className="mx-5 rounded-md bg-white p-4">
      <Text className="text-center text-[#6C757D]">{message}</Text>
    </View>
  );
}
