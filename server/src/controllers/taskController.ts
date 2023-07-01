import { Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";

export class TaskController {
  async allTasks(req: Request, res: Response) {
    const { id } = req.params;

    const tasks = await taskRepository.find({
      where: {
        status: id,
      },
      order: {
        order: "ASC",
      },
    });

    try {
      res.status(200).json(tasks);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getTaskById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const task = await taskRepository.findOneBy({ id: Number(id) });
      res.status(200).json(task);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createTask(req: Request, res: Response) {
    const { name, description, status, column } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }

    try {
      const newTask = taskRepository.create({
        name,
        description,
        status,
        column,
      });

      await taskRepository.save(newTask);

      return res.status(201).json(newTask);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updatetask(req: Request, res: Response) {
    const { name, description, status, column, order } = req.body;
    const { id } = req.params;

    try {
      await taskRepository.update(id, {
        name,
        description,
        status,
        column,
        order,
      });

      const taskUpdated = await taskRepository.findOneBy({
        id: Number(id),
      });

      return res.status(200).json(taskUpdated);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const taskDeleted = await taskRepository.findOneBy({
        id: Number(id),
      });

      await taskRepository.delete(id);

      return res.status(202).json({
        message: `tarefa ${taskDeleted?.name} deletada com sucesso`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
