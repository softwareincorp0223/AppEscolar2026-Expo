import AsyncStorage from "@react-native-async-storage/async-storage";
import type { SchoolUser } from "../services/schoolAuthService";

interface SchoolSession {
  token?: string;
  user?: SchoolUser;
}

const SCHOOL_SESSION_KEY = "app_escolar_school_session";
let currentSession: SchoolSession = {};

const runStorage = async <T>(operation: () => Promise<T>, fallback: T) => {
  try {
    return await operation();
  } catch (error) {
    console.warn("AsyncStorage no esta disponible en este runtime:", error);
    return fallback;
  }
};

const persistSession = async () => {
  await runStorage(
    () => AsyncStorage.setItem(SCHOOL_SESSION_KEY, JSON.stringify(currentSession)),
    undefined
  );
};

export const SchoolSessionStorage = {
  async getSession(): Promise<SchoolSession> {
    if (Object.keys(currentSession).length > 0) {
      return currentSession;
    }

    const storedSession = await runStorage(
      () => AsyncStorage.getItem(SCHOOL_SESSION_KEY),
      null
    );

    if (!storedSession) return currentSession;

    try {
      currentSession = JSON.parse(storedSession) as SchoolSession;
    } catch {
      currentSession = {};
      await runStorage(() => AsyncStorage.removeItem(SCHOOL_SESSION_KEY), undefined);
    }

    return currentSession;
  },

  async saveSession(session: SchoolSession) {
    currentSession = session;
    await persistSession();
  },

  async clearSession() {
    currentSession = {};
    await runStorage(() => AsyncStorage.removeItem(SCHOOL_SESSION_KEY), undefined);
  },
};
