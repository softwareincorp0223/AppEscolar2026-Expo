import { resetSchoolPassword } from "@/api/services/schoolAuthService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotAttendance = () => {
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!correo.trim()) {
      Alert.alert("Correo requerido", "Ingresa tu correo electronico.");
      return;
    }

    try {
      setLoading(true);
      const response = await resetSchoolPassword(correo.trim());

      Alert.alert(
        "Correo enviado",
        response.message || "Se envio una contrasena provisional a tu correo.",
        [{ text: "Aceptar", onPress: () => router.back() }]
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible recuperar la contrasena";

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-teal-600"
    >
      <TouchableOpacity
        className="absolute top-12 left-5 z-10 h-11 w-11 rounded-full bg-white/15 justify-center items-center"
        activeOpacity={0.85}
        disabled={loading}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View className="flex-[1.2] justify-end items-center px-6 pb-8">
        <View className="w-20 h-20 rounded-full bg-white/20 justify-center items-center mb-5">
          <Ionicons name="mail" size={40} color="#ffffff" />
        </View>

        <Text className="text-white text-3xl font-bold text-center">
          Recuperar acceso
        </Text>

        <Text className="text-white/80 text-base text-center mt-2">
          Recibe una contrasena provisional
        </Text>
      </View>

      <View className="flex-[2.8] bg-white rounded-t-[35px] px-6 pt-10">
        <Text className="text-gray-800 text-2xl font-bold">
          Olvide mi contrasena
        </Text>

        <Text className="text-gray-500 mt-2 mb-8">
          Ingresa el correo de tu cuenta escolar.
        </Text>

        <View className="mb-7">
          <Text className="text-gray-700 font-semibold mb-2">
            Correo electronico
          </Text>

          <TextInput
            value={correo}
            onChangeText={setCorreo}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            className="w-full h-14 bg-gray-100 rounded-xl px-4 text-gray-800 border border-gray-200"
          />
        </View>

        <TouchableOpacity
          onPress={handleReset}
          disabled={loading}
          activeOpacity={0.85}
          className={`h-14 rounded-xl justify-center items-center ${
            loading ? "bg-teal-400" : "bg-teal-600"
          }`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white text-base font-bold">
              Enviar contrasena
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotAttendance;
