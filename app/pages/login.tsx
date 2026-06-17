import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";

import { loginWithQR } from "@/api/services/authService";
import { SessionStorage } from "@/api/storage/sessionStorage";

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

  const goToAlumnos = async (idPadre = "padre-demo") => {
    await SessionStorage.saveSession({ id: idPadre });
      router.replace("/pages/details" as never);
  };

  const handleBarCodeRead = async (scanResult: { data?: string }) => {
    if (scanSuccessful) return;

    const data = scanResult?.data;

    if (!data) return;

    setScanSuccessful(true);

    try {
      const response = await loginWithQR(data);
      await goToAlumnos(response?.id_padre ?? response?.id ?? "padre-demo");
    } catch {
      await goToAlumnos();
      Alert.alert(
        "Modo demo",
        "No se pudo conectar al servidor, se cargaran alumnos de prueba."
      );
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-blue-600 justify-center items-center">
        <Text className="text-white text-2xl font-bold">Cargando...</Text>
      </View>
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-600">
        <Text className="text-white mb-4">
          Necesitamos acceso a la camara
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-emerald-500 px-6 py-2 rounded-lg"
        >
          <Text className="text-white">Permitir camara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-600">
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-white text-lg font-bold text-center">
          Escanea tu codigo QR para ingresar
        </Text>
      </View>

      <View className="flex-[3] justify-center items-center">
        <CameraView
          style={{ width: windowWidth, height: 350 }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarCodeRead}
        />
      </View>

      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-white text-center">
          Al escanear el codigo aceptas nuestros terminos.
        </Text>

        <TouchableOpacity
          onPress={() => goToAlumnos()}
          className="bg-emerald-500 mt-4 py-2 px-6 rounded-lg"
        >
          <Text className="text-white text-sm">Ver alumnos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginNativa;
