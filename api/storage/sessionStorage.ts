interface Session {
  id?: string;
  sidAlumno?: string;
  sidInstituto?: string;
  sidGrupo?: string;
  idPadre?: string;
  selectedAlumnoName?: string;
}

let currentSession: Session = {
  id: "padre-demo",
};

export const SessionStorage = {
  async getSession() {
    return currentSession;
  },

  async saveSession(session: Session) {
    currentSession = {
      ...currentSession,
      ...session,
    };
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
  },

  async updateGrupoAndPadre(sidGrupo?: string, idPadre?: string) {
    currentSession = {
      ...currentSession,
      sidGrupo,
      idPadre,
    };
  },

  async clearSession() {
    currentSession = {};
  },
};
