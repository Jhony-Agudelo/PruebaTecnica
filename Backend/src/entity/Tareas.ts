import { Entity, PrimaryGeneratedColumn, Unique, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
@Unique(["id"])
export class Tareas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  prioridad_tarea: string;

  @Column()
  @IsNotEmpty()
  tipo_tarea: string;

  @Column()
  @IsNotEmpty()
  descripcion_tarea: string;

  @Column()
  @IsNotEmpty()
  propietario_tarea: string;
}
