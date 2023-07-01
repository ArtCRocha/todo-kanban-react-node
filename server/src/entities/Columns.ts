import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";

@Entity("columns")
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];

  @Column()
  @Generated("increment")
  order: number;
}
