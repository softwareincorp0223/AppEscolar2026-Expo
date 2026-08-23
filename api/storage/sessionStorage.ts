import AsyncStorage from "@react-native-async-storage/async-storage";

interface Session {
  id?: string;
  idPadre?: string;
  sidAlumno?: string;
  sidInstituto?: string;
  sidGrupo?: string;
  selectedAlumnoName?: string;
}

const SESSION_KEY = "app_escolar_session";
let currentSession: Session = {};

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
    () => AsyncStorage.setItem(SESSION_KEY, JSON.stringify(currentSession)),
    undefined
  );
};

export const SessionStorage = {
  async getSession(): Promise<Session> {
    if (Object.keys(currentSession).length > 0) {
      return currentSession;
    }

    const storedSession = await runStorage(
      () => AsyncStorage.getItem(SESSION_KEY),
      null
    );

    if (!storedSession) {
      return currentSession;
    }

    try {
      currentSession = JSON.parse(storedSession) as Session;
    } catch {
      currentSession = {};
      await runStorage(() => AsyncStorage.removeItem(SESSION_KEY), undefined);
    }

    return currentSession;
  },

  async saveSession(session: Partial<Session>) {
    currentSession = {
      ...currentSession,
      ...session,
    };

    await persistSession();
  },

  async replaceSession(session: Session) {
    currentSession = { ...session };
    await persistSession();
  },

  async saveSelectedAlumno(
    sidAlumno: string,
    sidInstituto: string,
    selectedAlumnoName?: string
  ) {
    currentSession = {
      ...currentSession,
      sidAlumno,
      sidInstituto,
      selectedAlumnoName,
    };

    await persistSession();
  },

  async updateGrupoAndPadre(
    sidGrupo?: string,
    idPadre?: string
  ) {
    currentSession = {
      ...currentSession,
      sidGrupo,
      idPadre,
    };

    await persistSession();
  },

  async clearSession() {
    currentSession = {};
    await runStorage(() => AsyncStorage.removeItem(SESSION_KEY), undefined);
  },
};
