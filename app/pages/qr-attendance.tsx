import { registerAttendanceByQR } from "@/api/services/attendanceScannerService";
import { SchoolSessionStorage } from "@/api/storage/schoolSessionStorage";
import AutoDismissModal from "@/components/ui/AutoDismissModal";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type AttendanceFeedback = {
  title: string;
  description: string;
  showCloseButton?: boolean;
  duration?: number;
};

const QRAttendance = () => {
  const [scanSuccessful, setScanSuccessful] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidUsuario, setSidUsuario] = useState("");
  const [sidInstituto, setSidInstituto] = useState<string | null | undefined>();
  const [feedback, setFeedback] = useState<AttendanceFeedback | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const isProcessingScanRef = useRef(false);
  const lastScannedCodeRef = useRef<string | null>(null);

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const loadSession = async () => {
      const session = await SchoolSessionStorage.getSession();

      if (!session.user?.id) {
        router.replace("/pages/login-attendance" as never);
        return;
      }

      setSidUsuario(session.user.id);
      setSidInstituto(session.user.sid_instituto);
      setLoading(false);
    };

    loadSession();
  }, []);

  const closeFeedback = () => {
    setFeedback(null);
    setScanSuccessful(false);
  };

  const handleLogout = async () => {
    await SchoolSessionStorage.clearSession();
    router.replace("/pages/login-attendance" as never);
  };

  const handleBarCodeRead = async (scanResult: { data?: string }) => {
    if (scanSuccessful || isProcessingScanRef.current) return;

    console.log("scanResult.data");
    console.log(scanResult.data);
    

    const codigoQR = scanResult?.data?.trim();
    if (!codigoQR || !sidUsuario) return;
    if (codigoQR === lastScannedCodeRef.current) return;

    isProcessingScanRef.current = true;
    lastScannedCodeRef.current = codigoQR;
    setScanSuccessful(true);

    try {
      const response = await registerAttendanceByQR({
        codigoQR,
        sidUsuario,
        sidInstituto,
      });

      const alumno = response.alumno;
      const nombre = [alumno?.nombre, alumno?.apellido].filter(Boolean).join(" ");
      const matricula = alumno?.matricula ? `Matricula: ${alumno.matricula}` : "";

      setFeedback({
        title: "Asistencia registrada",
        description: [nombre || "Alumno registrado", matricula]
          .filter(Boolean)
          .join("\n"),
        showCloseButton: false,
        duration: 2000,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible registrar la asistencia";

      setFeedback({
        title: "QR invalido",
        description: message,
        showCloseButton: true,
        duration: 2000,
      });
    } finally {
      isProcessingScanRef.current = false;
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-teal-600 justify-center items-center">
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
      <View className="flex-1 justify-center items-center bg-teal-600 px-5">
        <Text className="text-white mb-4 text-center">
          Necesitamos acceso a la camara para escanear el codigo QR.
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
    <View className="flex-1 bg-teal-600">
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-white text-lg font-bold text-center">
          Escanear codigo QR del alumno
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
          onBarcodeScanned={scanSuccessful ? undefined : handleBarCodeRead}
        />

        {scanSuccessful && !feedback && (
          <View className="absolute inset-0 bg-black/40 justify-center items-center">
            <ActivityIndicator size="large" color="#ffffff" />

            <Text className="text-white font-bold mt-3">
              Registrando asistencia...
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1 justify-end items-center px-5 pb-10">
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.85}
          className="border border-white bg-transparent py-3 px-8 rounded-xl"
        >
          <Text className="text-white font-semibold">Cerrar sesion</Text>
        </TouchableOpacity>
      </View>

      <AutoDismissModal
        visible={!!feedback}
        title={feedback?.title || ""}
        description={feedback?.description}
        duration={feedback?.duration}
        showCloseButton={feedback?.showCloseButton}
        onClose={closeFeedback}
      />
    </View>
  );
};

export default QRAttendance;
