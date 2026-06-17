export interface PerfilPadre {
  nombre: string;
  apellido: string;
  correo: string;
}

export interface PerfilInstituto {
  nombre: string;
  correo: string;
  logo: string;
  descripcion: string;
}

export interface Perfil {
  padre: PerfilPadre;
  instituto: PerfilInstituto;
}
