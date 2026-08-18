import { loginWithQR } from "@/api/services/authService";
import { SessionStorage } from "@/api/storage/sessionStorage";
import {
  configureAndroidNotificationChannel,
  registerParentDeviceForPushNotifications,
  requestNotificationPermission,
} from "@/utils/pushNotifications";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const LoginNativa = () => {
  const [scanSuccessful, setScanSuccessful] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prepareNotifications = async () => {
      try {
        await configureAndroidNotificationChannel();
        await requestNotificationPermission();
      } catch (error) {
        console.warn("No fue posible preparar notificaciones:", error);
      }
    };

    prepareNotifications();
  }, []);

  const goToAlumnos = async (
    idPadre: string,
    sidInstituto: string
  ) => {
    await SessionStorage.saveSession({
      id: idPadre,
      idPadre,
      sidInstituto,
    });

    await registerParentDeviceForPushNotifications(idPadre);

    router.replace("/pages/details" as never);
  };

  const handleBarCodeRead = async (scanResult: { data?: string }) => {
    console.log(scanResult.data);

    if (scanSuccessful) return;

    const codigoQR = scanResult?.data?.trim();

    if (!codigoQR) {
      return;
    }

    setScanSuccessful(true);

    try {
      const response = await loginWithQR(codigoQR);


      if (!response.id_padre || !response.sid_instituto) {
        throw new Error("La respuesta del servidor está incompleta");
      }

      await goToAlumnos(
        response.id_padre,
        response.sid_instituto
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible iniciar sesión con el código QR";

      Alert.alert("Código QR inválido", message, [
        {
          text: "Intentar nuevamente",
          onPress: () => setScanSuccessful(false),
        },
      ]);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-blue-600 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />

        <Text className="text-white text-2xl font-bold mt-4">
          Cargando...
        </Text>
      </View>
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-600 px-5">
        <Text className="text-white mb-4 text-center">
          Necesitamos acceso a la cámara para escanear el código QR.
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          className="bg-emerald-500 px-6 py-2 rounded-lg"
        >
          <Text className="text-white">
            Permitir cámara
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-600">
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-white text-lg font-bold text-center">
          Escanea tu código QR para ingresar
        </Text>
      </View>

      <View className="flex-[3] justify-center items-center">
        <CameraView
          style={{
            width: windowWidth,
            height: 350,
          }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={
            scanSuccessful ? undefined : handleBarCodeRead
          }
        />

        {scanSuccessful && (
          <View className="absolute inset-0 bg-black/40 justify-center items-center">
            <ActivityIndicator
              size="large"
              color="#ffffff"
            />

            <Text className="text-white font-bold mt-3">
              Validando código...
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1 items-center px-5 pt-5">
        <Pressable
          className="bg-teal-600 mb-4 py-2 px-6 rounded-lg"
          onPress={() => router.push("/pages/login-attendance")}
        >
          <Text className="text-white">Scanner Escuelas</Text>
        </Pressable>

        <Text className="text-white text-center">
          Al escanear el código aceptas nuestros términos y condiciones.
        </Text>

        {scanSuccessful && (
          <TouchableOpacity
            onPress={() => setScanSuccessful(false)}
            className="bg-white/20 mt-4 py-2 px-6 rounded-lg"
          >
            <Text className="text-white text-sm">
              Escanear nuevamente
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LoginNativa;
