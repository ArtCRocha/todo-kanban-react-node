import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ColumnEntity } from "./Columns";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "column" })
  column: ColumnEntity;

  @Column()
  @Generated("increment")
  order: number;
}
