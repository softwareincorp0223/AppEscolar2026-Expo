import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface ListSkeletonProps {
  count?: number;
  avatar?: boolean;
  fill?: boolean;
}

export default function ListSkeleton({
  count = 4,
  avatar = false,
  fill = true,
}: ListSkeletonProps) {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <View className={`${fill ? "flex-1 " : ""}px-5 pt-2.5`}>
      {Array.from({ length: count }).map((_, index) => (
        <Animated.View
          key={index}
          className="mb-3 rounded-lg bg-white p-3"
          style={{ opacity }}
        >
          <View className="flex-row items-center">
            {avatar && (
              <View className="mr-3 h-[50px] w-[50px] rounded-full bg-[#DEE2E6]" />
            )}

            <View className="flex-1">
              <View className="h-4 w-8/12 rounded bg-[#DEE2E6]" />
              <View className="mt-2 h-3 w-5/12 rounded bg-[#E9ECEF]" />
            </View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}
