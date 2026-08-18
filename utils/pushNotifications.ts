import { DispositivoService } from "@/api/services/dispositivoService";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const ANDROID_CHANNEL_ID = "default";

const getProjectId = () => {
  return (
    Constants.easConfig?.projectId ||
    Constants.expoConfig?.extra?.eas?.projectId
  );
};

export const configureAndroidNotificationChannel = async () => {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: "Notificaciones",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#2563EB",
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
};

export const requestNotificationPermission = async () => {
  const existingPermission = await Notifications.getPermissionsAsync();

  if (
    existingPermission.status === Notifications.PermissionStatus.GRANTED ||
    existingPermission.granted
  ) {
    return true;
  }

  const requestedPermission = await Notifications.requestPermissionsAsync();

  return (
    requestedPermission.status === Notifications.PermissionStatus.GRANTED ||
    requestedPermission.granted
  );
};

export const getExpoPushToken = async () => {
  await configureAndroidNotificationChannel();

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return null;

  const projectId = getProjectId();
  if (!projectId) {
    console.warn("No se encontro projectId de EAS para obtener ExpoPushToken");
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });

  return token.data;
};

export const registerParentDeviceForPushNotifications = async (
  idPadre?: string
) => {
  if (!idPadre) return null;

  try {
    const token = await getExpoPushToken();
    if (!token) return null;

    await DispositivoService.registrarDispositivo({
      id_padre: idPadre,
      token_dispositivo: token,
      badge_notificaciones: 0,
    });

    return token;
  } catch (error) {
    console.warn("No fue posible registrar notificaciones push:", error);
    return null;
  }
};
