import express from "express";
import taskRoutes from "./taskRoutes";
import columnRoutes from "./columnRoutes";
type Express = any;

export default function routes(app: Express) {
  app.use(express.json(), taskRoutes, columnRoutes);
}
