import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const taskRoutes = Router();

taskRoutes.get("/tasks", new TaskController().allTasks);
taskRoutes.get("/tasks/:id", new TaskController().getTaskById);
taskRoutes.post("/tasks", new TaskController().createTask);
taskRoutes.patch("/tasks/:id", new TaskController().updatetask);
taskRoutes.delete("/tasks/:id", new TaskController().deleteTask);

export default taskRoutes;
