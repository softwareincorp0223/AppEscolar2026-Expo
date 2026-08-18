import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="pages/login" />
        <Stack.Screen name="pages/login-attendance" />
        <Stack.Screen name="pages/forgot-attendance" />
        <Stack.Screen name="pages/qr-attendance" />
        <Stack.Screen name="pages/details" />
        <Stack.Screen name="pages/messages" />
        <Stack.Screen name="pages/tasks" />
        <Stack.Screen name="pages/follow-ups" />
        <Stack.Screen name="pages/grades" />
        <Stack.Screen name="pages/calendar" />
        <Stack.Screen name="pages/attendance" />
        <Stack.Screen name="pages/profile" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
