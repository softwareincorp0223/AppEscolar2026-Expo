import api from "../axiosConfig";
import phpApi from "../phpApi";
import { AsistenciaTipo } from "@/types/asistencia";

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
  tipo?: AsistenciaTipo;
  alumno?: AttendanceScanStudent;
}

type AttendanceQRRequest = {
  codigoQR: string;
  sidUsuario: string;
  sidInstituto?: string | null;
};

const getAttendanceScanErrorMessage = (error: any) =>
  error.response?.data?.msg ||
  error.message ||
  "No se pudo registrar la asistencia";

export const getStudentByAttendanceQR = async (
  codigoQR: string
): Promise<AttendanceScanStudent> => {
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

    return phpResponse.alumno;
  } catch (error: any) {
    throw new Error(getAttendanceScanErrorMessage(error));
  }
};

export const registerResolvedAttendanceByQR = async ({
  alumno,
  sidUsuario,
  sidInstituto,
}: {
  alumno: AttendanceScanStudent;
  sidUsuario: string;
  sidInstituto?: string | null;
}): Promise<AttendanceScanResponse> => {
  try {
    const response = await api.post<
      AttendanceScanResponse,
      AttendanceScanResponse,
      {
        alumno: AttendanceScanStudent;
        sid_usuario: string;
        sid_instituto?: string | null;
      }
    >("/asistencias/registrar-qr", {
      alumno,
      sid_usuario: sidUsuario,
      sid_instituto: sidInstituto || undefined,
    });

    if (response.status !== "ok") {
      throw new Error(response.msg || "No se pudo registrar la asistencia");
    }

    return response;
  } catch (error: any) {
    throw new Error(getAttendanceScanErrorMessage(error));
  }
};

export const registerAttendanceByQR = async ({
  codigoQR,
  sidUsuario,
  sidInstituto,
}: AttendanceQRRequest): Promise<AttendanceScanResponse> => {
  try {
    const alumno = await getStudentByAttendanceQR(codigoQR);

    return await registerResolvedAttendanceByQR({
      alumno,
      sidUsuario,
      sidInstituto,
    });
  } catch (error: any) {
    throw new Error(getAttendanceScanErrorMessage(error));
  }
};
