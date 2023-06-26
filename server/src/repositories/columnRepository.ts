import { AppDataSource } from "../data-source";
import { ColumnEntity } from "../entities/Columns";

export const columnRepository = AppDataSource.getRepository(ColumnEntity);
