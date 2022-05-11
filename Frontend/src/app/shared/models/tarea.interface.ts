
export interface Tarea {
  usuarioId: string;
  prioridad_tarea: string;
  tipo_tarea: string;
  descripcion_tarea: string;
  propietario_tarea: string;
}

export interface TareaResponse extends Tarea {
  id: number;
  prioridad_tarea: string;
  tipo_tarea: string;
  descripcion_tarea: string;
  propietario_tarea: string;
}
