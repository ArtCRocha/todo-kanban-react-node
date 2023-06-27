import express from "express";
import taskRoutes from "./taskRoutes";
import columnRoutes from "./columnRoutes";
import cors from "cors";
type Express = any;

export default function routes(app: Express) {
  app.use(express.json(), cors(), taskRoutes, columnRoutes);
}
