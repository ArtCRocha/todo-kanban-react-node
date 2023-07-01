import { Request, Response } from "express";
import { columnRepository } from "../repositories/columnRepository";

export class ColumnController {
  async allColumns(req: Request, res: Response) {
    const columns = await columnRepository.find({
      select: {
        id: true,
        name: true,
        order: true,
      },
      order: {
        order: "ASC",
      },
    });

    try {
      res.status(200).json(columns);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getColumnById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const column = await columnRepository.findOneBy({ id: Number(id) });
      res.status(200).json(column);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createColumn(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }

    try {
      const newColumn = columnRepository.create({ name });

      await columnRepository.save(newColumn);

      const column = await columnRepository.find({
        where: {
          name: name,
        },
        relations: {
          tasks: true,
        },
      });

      return res.status(201).json(column);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateColumn(req: Request, res: Response) {
    const { name, order } = req.body;
    const { id } = req.params;

    try {
      await columnRepository.update(id, { name, order });

      const columnUpdated = await columnRepository.findOneBy({
        id: Number(id),
      });

      return res.status(200).json(columnUpdated);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteColumn(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const columnDeleted = await columnRepository.findOneBy({
        id: Number(id),
      });

      await columnRepository.delete(id);

      return res.status(202).json({
        message: `Coluna ${columnDeleted?.name} deletada com sucesso`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
