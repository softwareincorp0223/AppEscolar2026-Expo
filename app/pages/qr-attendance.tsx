import {
  getStudentByAttendanceQR,
  registerResolvedAttendanceByQR,
} from "@/api/services/attendanceScannerService";
import { SchoolSessionStorage } from "@/api/storage/schoolSessionStorage";
import { AsistenciaTipo } from "@/types/asistencia";
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

const QR_READ_DEBOUNCE_MS = 900;
const STUDENT_EXIT_COOLDOWN_MS = 30 * 1000;
const FEEDBACK_DURATION_MS = 2500;

type AttendanceFeedback = {
  title: string;
  description: string;
  variant: "success" | "warning" | "error";
};

const QRAttendance = () => {
  const [scanInProgress, setScanInProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidUsuario, setSidUsuario] = useState("");
  const [sidInstituto, setSidInstituto] = useState<string | null | undefined>();
  const [feedback, setFeedback] = useState<AttendanceFeedback | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const isProcessingScanRef = useRef(false);
  const qrReadDebounceRef = useRef<Record<string, number>>({});
  const studentCooldownRef = useRef<Record<string, number>>({});

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

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      setFeedback(null);
    }, FEEDBACK_DURATION_MS);

    return () => clearTimeout(timer);
  }, [feedback]);

  const handleLogout = async () => {
    await SchoolSessionStorage.clearSession();
    router.replace("/pages/login-attendance" as never);
  };

  const getStudentName = (alumno?: { nombre?: string; apellido?: string }) =>
    [alumno?.nombre, alumno?.apellido].filter(Boolean).join(" ");

  const getAttendanceLabel = (tipo?: AsistenciaTipo) => {
    if (tipo === "entrada") return "Entrada registrada";
    if (tipo === "salida") return "Salida registrada";
    return "Asistencia registrada";
  };

  const isQrDebounced = (codigoQR: string) => {
    const now = Date.now();
    const lastReadAt = qrReadDebounceRef.current[codigoQR] ?? 0;

    if (now - lastReadAt < QR_READ_DEBOUNCE_MS) {
      return true;
    }

    qrReadDebounceRef.current[codigoQR] = now;
    return false;
  };

  const isStudentInCooldown = (studentId: string) => {
    const now = Date.now();
    const blockedUntil = studentCooldownRef.current[studentId] ?? 0;

    if (blockedUntil <= now) {
      delete studentCooldownRef.current[studentId];
      return false;
    }

    return true;
  };

  const markStudentCooldown = (studentId: string) => {
    studentCooldownRef.current[studentId] =
      Date.now() + STUDENT_EXIT_COOLDOWN_MS;
  };

  const handleBarCodeRead = async (scanResult: { data?: string }) => {
    if (isProcessingScanRef.current) return;

    const codigoQR = scanResult?.data?.trim();
    if (!codigoQR || !sidUsuario) return;
    if (isQrDebounced(codigoQR)) return;

    isProcessingScanRef.current = true;
    setScanInProgress(true);

    try {
      const alumno = await getStudentByAttendanceQR(codigoQR);
      const nombre = getStudentName(alumno);
      const matricula = alumno.matricula ? `Matricula: ${alumno.matricula}` : "";

      if (isStudentInCooldown(alumno.id_alumno)) {
        setFeedback({
          title: "Salida aun no disponible",
          description: [
            nombre || "Alumno registrado",
            "Espera un momento antes de registrar la salida.",
          ]
            .filter(Boolean)
            .join("\n"),
          variant: "warning",
        });

        return;
      }

      const response = await registerResolvedAttendanceByQR({
        alumno,
        sidUsuario,
        sidInstituto,
      });

      const responseAlumno = response.alumno ?? alumno;

      if (!response.tipo || response.tipo === "entrada") {
        markStudentCooldown(responseAlumno.id_alumno);
      }

      setFeedback({
        title: getAttendanceLabel(response.tipo),
        description: [
          getStudentName(responseAlumno) || nombre || "Alumno registrado",
          matricula,
        ]
          .filter(Boolean)
          .join("\n"),
        variant: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible registrar la asistencia";

      setFeedback({
        title: "QR invalido",
        description: message,
        variant: "error",
      });
    } finally {
      isProcessingScanRef.current = false;
      setScanInProgress(false);
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
          onBarcodeScanned={handleBarCodeRead}
        />

        {scanInProgress && (
          <View className="absolute inset-0 bg-black/40 justify-center items-center">
            <ActivityIndicator size="large" color="#ffffff" />

            <Text className="text-white font-bold mt-3">
              Registrando asistencia...
            </Text>
          </View>
        )}

        {feedback && (
          <View
            className={`absolute left-5 right-5 top-5 rounded-xl px-5 py-4 shadow-lg ${
              feedback.variant === "success"
                ? "bg-emerald-600"
                : feedback.variant === "warning"
                  ? "bg-amber-500"
                  : "bg-red-600"
            }`}
          >
            <Text className="text-white text-lg font-bold text-center">
              {feedback.title}
            </Text>

            <Text className="text-white text-base text-center mt-1">
              {feedback.description}
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

    </View>
  );
};

export default QRAttendance;
