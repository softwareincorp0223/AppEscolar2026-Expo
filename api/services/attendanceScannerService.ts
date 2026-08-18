import api from "../axiosConfig";
import phpApi from "../phpApi";

export interface AttendanceScanStudent {
  id_alumno: string;
  nombre: string;
  apellido: string;
  matricula: string;
  sid_instituto?: string;
  [key: string]: unknown;
}

export interface AttendanceScanResponse {
  status: "ok" | "error";
  msg?: string;
  id_asistencia?: string;
  alumno?: AttendanceScanStudent;
}

export const registerAttendanceByQR = async ({
  codigoQR,
  sidUsuario,
  sidInstituto,
}: {
  codigoQR: string;
  sidUsuario: string;
  sidInstituto?: string | null;
}): Promise<AttendanceScanResponse> => {
  try {
    const phpResponse = await phpApi.post<
      AttendanceScanResponse,
      AttendanceScanResponse,
      { codigo_qr: string }
    >("/alumno.php?accion=asistencia_qr", {
      codigo_qr: codigoQR.trim(),
    });

    if (phpResponse.status !== "ok" || !phpResponse.alumno?.id_alumno) {
      throw new Error(phpResponse.msg || "QR no encontrado");
    }

    const response = await api.post<
      AttendanceScanResponse,
      AttendanceScanResponse,
      {
        alumno: AttendanceScanStudent;
        sid_usuario: string;
        sid_instituto?: string | null;
      }
    >("/asistencias/registrar-qr", {
      alumno: phpResponse.alumno,
      sid_usuario: sidUsuario,
      sid_instituto: sidInstituto || undefined,
    });

    if (response.status !== "ok") {
      throw new Error(response.msg || "No se pudo registrar la asistencia");
    }

    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.msg ||
        error.message ||
        "No se pudo registrar la asistencia"
    );
  }
};
