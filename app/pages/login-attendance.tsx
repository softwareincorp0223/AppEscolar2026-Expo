import { loginSchoolUser } from "@/api/services/schoolAuthService";
import { SchoolSessionStorage } from "@/api/storage/schoolSessionStorage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

const LoginCorreo = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const validateSession = async () => {
      const session = await SchoolSessionStorage.getSession();

      if (active && session.user?.id) {
        router.replace("/pages/qr-attendance" as never);
      }
    };

    validateSession();

    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Ingresa tu correo y contrasena.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginSchoolUser(correo.trim(), password);

      await SchoolSessionStorage.saveSession({
        token: response.token,
        user: response.usuario,
      });

      router.replace("/pages/qr-attendance" as never);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No fue posible iniciar sesion";

      Alert.alert("Error al iniciar sesion", message);
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
        onPress={() => router.replace("/pages/login" as never)}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View className="flex-[1.3] justify-end items-center px-6 pb-8">
        <View className="w-20 h-20 rounded-full bg-white/20 justify-center items-center mb-5">
          <Ionicons name="person" size={42} color="#ffffff" />
        </View>

        <Text className="text-white text-3xl font-bold text-center">
          Bienvenido
        </Text>

        <Text className="text-white/80 text-base text-center mt-2">
          Inicia sesion para continuar
        </Text>
      </View>

      <View className="flex-[2.7] bg-white rounded-t-[35px] px-6 pt-10">
        <Text className="text-gray-800 text-2xl font-bold">
          Iniciar sesion
        </Text>

        <Text className="text-gray-500 mt-2 mb-8">
          Ingresa tus datos de acceso
        </Text>

        <View className="mb-5">
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

        <View className="mb-3">
          <Text className="text-gray-700 font-semibold mb-2">
            Contrasena
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Ingresa tu contrasena"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            editable={!loading}
            className="w-full h-14 bg-gray-100 rounded-xl px-4 text-gray-800 border border-gray-200"
          />
        </View>

        <TouchableOpacity
          className="self-end mb-7"
          disabled={loading}
          onPress={() => router.push("/pages/forgot-attendance" as never)}
        >
          <Text className="text-teal-600 font-semibold">
            Olvidaste tu contrasena?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
          className={`h-14 rounded-xl justify-center items-center ${
            loading ? "bg-teal-400" : "bg-teal-600"
          }`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-white text-base font-bold">
              Iniciar sesion
            </Text>
          )}
        </TouchableOpacity>

        <View className="mt-8 items-center">
          <Text className="text-gray-400 text-sm text-center">
            App Escolar
          </Text>

          <Text className="text-gray-400 text-xs text-center mt-1">
            Acceso seguro a tu cuenta
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginCorreo;
