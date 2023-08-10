import { Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";

export class TaskController {
  async allTasks(req: Request, res: Response) {
    const { id } = req.params;

    const tasks = await taskRepository.find({
      where: {
        status: Number(id),
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
    const { name, description, status, column } = req.body;
    const { id } = req.params;

    try {
      await taskRepository.update(id, {
        name,
        description,
        status,
        column,
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

  async changeOrder(req: Request, res: Response) {
    const { id, source_status, destination_status, destination_index } =
      req.body;

    try {
      const sourceTasks = await taskRepository.find({
        where: {
          status: source_status,
        },
        order: {
          order: "ASC",
        },
      });

      const destinationTasks = await taskRepository.find({
        where: {
          status: destination_status,
        },
        order: {
          order: "ASC",
        },
      });

      const sourceTask = sourceTasks.find((x) => x.id === id);

      const destinationTask = sourceTasks.find((x) => x.id === id);

      if (source_status === destination_status) {
        if (sourceTask) {
          sourceTasks.splice(sourceTasks.indexOf(sourceTask), 1);

          sourceTasks.splice(destination_index, 0, sourceTask);

          sourceTasks.forEach((item, index) => {
            item.order = index + 1;
          });

          await taskRepository.save(sourceTasks);

          return res.status(200).json(sourceTasks);
        }
      } else {
        if (destinationTask) {
          destinationTask.status = destination_status;

          destinationTasks.splice(destination_index, 0, destinationTask);

          destinationTasks.forEach((item, index) => {
            item.order = index + 1;
          });

          await taskRepository.save(destinationTasks);

          return res.status(200).json(destinationTasks);
        }
      }
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
