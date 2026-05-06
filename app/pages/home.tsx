import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";

import { loginWithQR } from "@/api/services/authService";

const LoginNativa = () => {
  const [scanSuccessful, setScanSuccessful] = useState(false);
  const [loading, setLoading] = useState(true);

  const [permission, requestPermission] = useCameraPermissions();

  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleBarCodeRead = async ({ data }: any) => {
    if (scanSuccessful) return;

    try {
      const response = await loginWithQR(data);
      console.log("response QR");
      console.log(response);

      // luego activas esto
      /*
      if (response?.status === "success") {
        setScanSuccessful(true);
        navigation.navigate("DetallesAlumno" as never);
      }
      */
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar al servidor");
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
          Necesitamos acceso a la cámara
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-emerald-500 px-6 py-2 rounded-lg"
        >
          <Text className="text-white">Permitir cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-600">
      
      {/* HEADER */}
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-white text-lg font-bold text-center">
          Escanea tu código QR para ingresar
        </Text>
      </View>

      {/* CAMERA */}
      <View className="flex-[3] justify-center items-center">
        <CameraView
          style={{ width: windowWidth, height: 350 }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarCodeRead}
        />
      </View>

      {/* FOOTER */}
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-white text-center">
          Al escanear el código aceptas nuestros términos.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("login_qr_escuelas" as never)}
          className="bg-emerald-500 mt-4 py-2 px-6 rounded-lg"
        >
          <Text className="text-white text-sm">
            Scanner Escuelas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginNativa;