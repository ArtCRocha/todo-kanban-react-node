import { Router } from "express";
import { ColumnController } from "../controllers/columnController";

const columnRoutes = Router();

columnRoutes.get("/columns", new ColumnController().allColumns);
columnRoutes.get("/columns/:id", new ColumnController().getColumnById);
columnRoutes.post("/columns", new ColumnController().createColumn);
columnRoutes.patch("/columns/:id", new ColumnController().updateColumn);
columnRoutes.patch("/columns/order/:id", new ColumnController().changeOrder);
columnRoutes.delete("/columns/:id", new ColumnController().deleteColumn);

export default columnRoutes;
