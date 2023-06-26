import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";

export const taskRepository = AppDataSource.getRepository(Task);
