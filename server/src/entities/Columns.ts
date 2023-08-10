import {
  Column,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";

@Entity("columns")
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @OneToOne(() => Task, (task) => task.column, {
    cascade: true,
  })
  tasks: Task[];

  @Column()
  @Generated("increment")
  order: number;
}
