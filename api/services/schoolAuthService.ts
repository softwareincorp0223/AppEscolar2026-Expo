import systemApi from "../systemApi";

export interface SchoolUser {
  id: string;
  correo: string;
  tipo: "usuario";
  sid_rol?: string | null;
  sid_instituto?: string | null;
  privilegios?: string[];
  permisos_configurados?: boolean;
}

interface LoginSchoolResponse {
  mensaje: string;
  token: string;
  usuario: SchoolUser;
}

interface ResetPasswordResponse {
  message?: string;
}

export const loginSchoolUser = async (
  correo: string,
  contrasena: string
): Promise<LoginSchoolResponse> => {
  try {
    return await systemApi.post<
      LoginSchoolResponse,
      LoginSchoolResponse,
      { correo: string; contrasena: string; tipo: "usuario" }
    >("/auth/login", {
      correo: correo.trim(),
      contrasena,
      tipo: "usuario",
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "No fue posible iniciar sesion"
    );
  }
};

export const resetSchoolPassword = async (
  correo: string
): Promise<ResetPasswordResponse> => {
  try {
    return await systemApi.post<
      ResetPasswordResponse,
      ResetPasswordResponse,
      { correo: string }
    >("/auth/restaurar-contrasena", {
      correo: correo.trim(),
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "No fue posible recuperar la contrasena"
    );
  }
};
