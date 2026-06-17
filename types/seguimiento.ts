export interface Seguimiento {
  id_seguimiento: string;
  fecha_registro: string;
  fecha: string;
  observacion: string;
}

export interface SeguimientoAtributo {
  id_atributo?: string;
  sid_seguimiento: string;
  nombre: string;
  icono: string;
  valor_atributo: string;
}
