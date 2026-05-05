import "@/global.css";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Ruta principal */}
        <Stack.Screen name="pages/home" options={{ title: "Home" }} />

        {/* Aquí puedes agregar más pantallas */}
        <Stack.Screen name="pages/details" options={{ title: "Details" }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}